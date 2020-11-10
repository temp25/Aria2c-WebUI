

function info(message) {
    console.info(message);
}

function error(message) {
    console.error(message);
}

function debug(message) {
    console.debug(message);
}

function warn(message) {
    console.warn(message);
}

function print(message) {
    console.log(message);
}

module.exports = {
    i: info,
    e: error,
    d: debug,
    w: warn,
    p: print
}
