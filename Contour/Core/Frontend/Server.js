module.exports = new Module(
    function (AbstractServer) {
        'use strict';

        function Server(port, frontendResponseHandler) {
            AbstractServer.call(this, port, frontendResponseHandler);
        }

        return Server;
    }
).dep("Contour.Core.Http.AbstractServer");