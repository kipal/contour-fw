module.exports = (function () {
    'use strict';

    var http = require('http');
    var url  = require('url');

    function Server(port, responseHandler) {
        console.log(responseHandler);
        var isCurrent = false;

        this.setIsCurrent = function (currentVar) {
            isCurrent = currentVar;
        };

        this.getIsCurrent = function () {
            return isCurrent;
        }

        this.start = function () {
            http.createServer(this.handleRequest).listen(port);
        }.bind(this);


        this.handleRequest = function (request, response) {
            var body = '';
            request.on('data', function (chunk) {
                body += chunk;
            });

            request.on('end', function () {
                var pathName = url.parse(request.url).pathname;

                return response.end(responseHandler.getResponse(pathName, request));
            });
        };

    };

    return Server;
}());

