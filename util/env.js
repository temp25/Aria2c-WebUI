
const ARIA2C_PORT = 6800;
const DEFAULT_NODE_PORT = 3000;

module.exports = {
    ARIA2C_PORT: ARIA2C_PORT,
    RPC_CLIENT_URI: `http://127.0.0.1:${ARIA2C_PORT}/jsonrpc`,
    NODE_SERVER_PORT: process.env.PORT || DEFAULT_NODE_PORT,
}
