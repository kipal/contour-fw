module.exports = new Module(
    function (AbstractServer, FrontendReqHandler) {
        'use strict';

        function Server(port) {
            AbstractServer.call(this, port, new FrontendReqHandler());
        }

        return Server;
    }
).dep("Contour.Core.Http.AbstractServer", "Contour.Core.Http.AbstractResponseHandler");