module.exports = new Module(
    function (AbstractServer) {
        'use strict';

        function MongoDBServer(port) {
            //AbstractServer.call(this, port);
        }

        MongoDBServer.prototype             = AbstractServer.prototype;
        MongoDBServer.prototype.constructor = MongoDBServer;

        return MongoDBServer;
    }
).dep("Contour.Core.Http.AbstractServer");