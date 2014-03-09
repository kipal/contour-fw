module.exports = (function () {
    'use strict';

    function MongoDBServer(port, reponseHandler) {
        //AbstractServer.call(this, port, reponseHandler);
    }

    //MongoDBServer.prototype             = AbstractServer.prototype;
    MongoDBServer.prototype.constructor = MongoDBServer;

    return MongoDBServer;

}());