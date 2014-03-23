module.exports = new Contour.Core.ClientScript.Module("Server", function () {
    'use strict';

    function MongoDBServer(port, reponseHandler) {
        //AbstractServer.call(this, port, reponseHandler);
    }
    /* <private> */
    var ize;
    /* </private> */
    var mize;

    //MongoDBServer.prototype             = AbstractServer.prototype;
    MongoDBServer.prototype.constructor = MongoDBServer;

    return MongoDBServer;

});