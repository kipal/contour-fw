module.exports = (function (AbstractServer) {
    'use strict';

    function Server(port) {
        AbstractServer.call(this, port);
    }

    return Server;
}(require(__dirname + '/../Http/AbstractServer.js')));
// TODO include method implement