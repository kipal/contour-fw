module.exports = (function (AbstractServer, FrontendReqHandler) {
    'use strict';

    function Server(port) {
        AbstractServer.call(this, port, new FrontendReqHandler());
    }

    return Server;
}(
    require(__dirname + '/../Http/AbstractServer.js'),
    require(__dirname + '/ResponseHandler.js')
));
// TODO include method implement