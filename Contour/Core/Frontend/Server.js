module.exports = (function (AbstractServer) {
    'use strict';

    function Server(port) {
        // TODO extends AbstractResponseHandler

        AbstractServer.call(this, port);
    }
}(Contour.Core.Server));
// TODO include method implement