const express = require('express');
const bodyParser = require('body-parser');
const Log = require('./service/LogService');
const jayson = require('jayson');
const utils = require('./service/Util');
const killPort = require('kill-port');
//const cors = require('cors');
const path = require('path');
const basicAuth = require('basic-auth');
const minimist = require('minimist');
const APP_VERSION = 'v1.0';
let authUser, authPassword;

const PORT = process.env.PORT || 3000;
const ARIA2C_PORT = process.env.ARIA2C_PORT || 6800;
const RPC_FEED_INTERVAL = 1000; // Feed data every 1 second
const expressAuthMiddleware = function (req, res, next) {
    var user = basicAuth(req);
    Log.i(`${req.method}\tpath:- ${req.originalUrl}`);
    if(user===undefined || user['name']!==authUser || user['pass']!==authPassword) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Aria2cWebUI"');
        //res.sendFile();
        res.end('Unauthorized');
    } else {
        next();
    }
}
const app = express();

const argv = minimist(process.argv.slice(2), { alias: {H: 'h', h: 'help', V: 'v', v: 'version'} });

const nodeExecName = path.basename(process.argv[0]);
const programName = path.basename(process.argv[1]);

function showUsage() {
    console.log(``);
    console.log(`Usage:\t${nodeExecName} ${programName} [OPTIONS]`);
    console.log(``);
    console.log(`OPTIONS:`);
    console.log(``);
    console.log(`--http-user            Username for basic authentication. (optional)`);
    console.log(`--http-password        Password for basic authentication. (optional)`);
    console.log(`-v / -V / --v / --V    Prints the version of the application and exits`);
    console.log(`-h / -H / --h / -H     Prints this help and exits`);
    console.log(``);
    process.exit(0);
}

function showVersion() {
    console.log(`Aria2c back-end for Web UI ${APP_VERSION}`);
    process.exit(0);
}

if(argv.h || argv.help) {
    // Display help
    showUsage();
} else if(argv.v || argv.version) {
    // Display version
    showVersion();
}

authUser = argv['http-user'];
authPassword = argv['http-password'];

if(authUser!==undefined && authPassword===undefined) {
    throw new Error('Basic Auth: user provided but password is missing. Run with -h for usage');
}

if(authUser===undefined && authPassword!==undefined) {
    throw new Error('Basic Auth: password provided but user is missing. Run with -h for usage');
}

if(authUser && authPassword) {
    console.log('Basic auth provided. Guarding endpoints with it.');
    app.use(expressAuthMiddleware);
} else {
    console.warn('No basic auth provided. Routes will be unsecured');
}

let connections = [];
let feedResponse;

let isTimerInitialized = false;
let aria2cRPCSupportedMethods = [];
let gids = [];

//const appMiddleware = function (req, res, next) {
    //Log.i(`ApplicationID:- ${utils.appId}\nClient IP:- ${utils.ipAddress(req)}\nMethod:- ${req.method}\nPath:- ${req.originalUrl}`);
    //Log.i(`${req.method}\tpath:- ${req.originalUrl}`);
    //next();
//};

/* var allowlist = ['http://localhost:4200']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
} */

app.use(bodyParser.json());

//app.use(appMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

//app.use(cors(corsOptionsDelegate));
//app.options('*', cors(corsOptionsDelegate));

const client = jayson.client.http(`http://127.0.0.1:${ARIA2C_PORT}/jsonrpc`);

makeAria2cRPCRequest('system.listMethods', []);

app.get('/health', function (req, res) {
    res.status(200).json({
        status: 'UP',
        timestamp: utils.timestamp()
    });
});

//app.get('/supportedRPCMethods', cors(corsOptionsDelegate), function (req, res) {
app.get('/supportedRPCMethods', function (req, res) {
    res.status(200).json({
        methods: aria2cRPCSupportedMethods,
        timestamp: utils.timestamp()
    });
});

function makeAria2cRPCRequest(aria2cRPCMethod, aria2cRPCParams, httpResponse = null) {
    client.request(aria2cRPCMethod, aria2cRPCParams, function (err, response) {
        let rpcStatusCode, rpcOutput={};
        if (err) {
            rpcStatusCode = err.code;
            Log.e(err);
        } else {
            rpcStatusCode = 200;
            rpcOutput = response.result;
        }
        if(aria2cRPCMethod == 'system.listMethods') {
            console.log(`Loaded ${response.result.length} RPC methods for Aria2c`);
            aria2cRPCSupportedMethods = response.result;
        } else if(aria2cRPCMethod == 'system.multicall') {
            if(response.result !== undefined) {
                let isAddURIResult = true;
                response.result.forEach(result => {
                    if(typeof result[0] === 'string') {
                        // add gid to GID list
                        gids.push(result[0]);
                    } else {
                        isAddURIResult = false;
                    }
                });
                if(!isAddURIResult) {
                    sendToClient(aria2cRPCMethod, rpcOutput, rpcStatusCode, err);
                }
            }
        } else {
            if(httpResponse !== null) {
                sendToClient(aria2cRPCMethod, rpcOutput, rpcStatusCode, err, httpResponse);
            } else {
                sendToClient(aria2cRPCMethod, rpcOutput, rpcStatusCode, err);
            }
        }
    });
}

function sendToClient(aria2cRPCMethod, rpcOutput, rpcStatusCode, err, httpResponse = null) {
    let output = {
        aria2cRPCMethod: aria2cRPCMethod,
        result: rpcOutput,
        statusCode: rpcStatusCode,
        error: err
    };

    if (httpResponse !== null) {
        httpResponse.status(rpcStatusCode).json(output);
    } else {
        sendData(output);
    }
}

//app.post('/aria2cRPC', cors(corsOptionsDelegate), function (req, res) {
app.post('/aria2cRPC', function (req, res) {
    let statusCode = 200;
    let message;

    let showOutput = req.query.showOutput || false;
    let aria2cRPCMethod = req.body.method;
    let aria2cRPCParams = req.body.params;// Object.assign({}, req.body.params);

    if (aria2cRPCSupportedMethods.includes(aria2cRPCMethod)) {
        message = 'method accepted';
        statusCode = 200;
        makeAria2cRPCRequest(aria2cRPCMethod, aria2cRPCParams, (showOutput ? res : null));
    } else {
        statusCode = 500;
        message = 'method not accepted. See /supportedRPCMethods for further info';
    }

    if(!showOutput) {
        res.status(statusCode).json({
            message: message,
            timestamp: utils.timestamp()
        });
    }

});


//app.get('/aria2cRPCFeed', cors(corsOptionsDelegate), function (req, res) {
app.get('/aria2cRPCFeed', function (req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');

    feedResponse = res;

    if(!isTimerInitialized) {
        setInterval(()=>{
            sendTellActiveData();
        }, RPC_FEED_INTERVAL);
        isTimerInitialized = true;
        Log.i('Feed is initialized');
    }

});

app.get('*', function (req, res) {
    res.sendFile('views/404.html', { root: __dirname });
});

app.post('*', function (req, res) {
    res.sendFile('views/404.html', { root: __dirname });
});

function sendTellActiveData() {
    let tellActiveParamArray = [];
    let tellActiveSubParamArray = [];

    if(gids.length !== 0) {
        gids.forEach(gid => {
            tellActiveSubParamArray.push({
                'methodName': 'aria2.tellStatus',
                'params': [ gid ]
            });
        });
        tellActiveParamArray.push(tellActiveSubParamArray);
    
        makeAria2cRPCRequest('system.multicall', tellActiveParamArray);
    } else {
        console.log('No GIDs available to poll download status');
    }
    
}

function sendData(data) {
    if(feedResponse != undefined) {
        feedResponse.write(`data: ${JSON.stringify(data)}\n\n`);
    }
}

const server = app.listen(PORT, () => {
    Log.i(`Aria2c backend listening on port ${PORT}`);
});

server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

setInterval(() => server.getConnections(
    (err, connections) => Log.i(`${connections} connections currently open`)
), 1800000); // checks the connections currently open for every 30 minutes

//For capturing SIGINT on Windows platform
if (process.platform === 'win32') {
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', function () {
        process.emit('SIGINT');
    });
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
    Log.i('Received kill signal, shutting down gracefully');
    Log.i('Exiting aria2c process');
    killPort(ARIA2C_PORT, 'tcp')
        .then(e => {
            Log.i(e);
            shutDownExpressServer();
        })
        .catch(e => {
            Log.e(e);
            shutDownExpressServer();
        });
}

function shutDownExpressServer() {
    Log.i('Exiting Express server');
    server.close(() => {
        Log.i('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        Log.w('Could not close connections within 30s, forcefully shutting down');
        process.exit(-1);
    }, 30000); // Exit forcefully after 30s

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}