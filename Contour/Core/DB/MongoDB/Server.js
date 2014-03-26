module.exports = new Module(
    function (AbstractServer) {
        'use strict';

        function MongoDBServer(port, reponseHandler) {
            AbstractServer.call(this, port, reponseHandler);
        }

        MongoDBServer.prototype             = AbstractServer.prototype;
        MongoDBServer.prototype.constructor = MongoDBServer;

        return MongoDBServer;
    }
).dep("Contour.Core.Http.AbstractServer");