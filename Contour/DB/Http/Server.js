module.exports = new Module(
    function (AbstractServer) {
        'use strict';

        function Server(port, reqHandler) {
            AbstractServer.call(this, port, reqHandler);
        }

        return Server;
    }
).dep("Contour.Core.Http.AbstractServer");