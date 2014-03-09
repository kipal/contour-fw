module.exports = (function () {
    'use strict';

    var http = require('http');
    var url  = require('url');

    function Server(port, responseHandler) {
        var start = function () {
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

        return {
            start : start
        };
    };

    return Server;

}());

