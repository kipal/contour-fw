module.exports = new Module(
    function (AbstractServer, FrontendReqHandler) {
        'use strict';

        function Server(port, CurrentServiceScriptRegister) {
            AbstractServer.call(this, port, new FrontendReqHandler(CurrentServiceScriptRegister));
        }

        return Server;
    }
).dep("Contour.Core.Http.AbstractServer", "Contour.Core.Frontend.ResponseHandler");