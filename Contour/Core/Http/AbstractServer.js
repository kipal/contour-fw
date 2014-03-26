module.exports = new Module(
     function () {
        'use strict';

        var http = require('http');
        var url  = require('url');

        function Server(port, responseHandler) {
            var isCurrent = false;

            this.setIsCurrent = function (currentVar) {
                isCurrent = currentVar;
            };

            this.getIsCurrent = function () {
                return isCurrent;
            };



            this.start = function () {
                http.createServer(this.handleRequest).listen(port);
            }.bind(this);


            this.handleRequest = function (request, response) {
                var body = '';
                request.on('data', function (chunk) {
                    body += chunk;
                });

                request.on('end', function () {
                    var pathName = url.parse(request.url).pathname,
                        res      = responseHandler.getResponse(pathName, request);

                    if (res) {
                        response.writeHeader(200, res.header);

                        return response.end(res.body);
                    } else {
                        return response.end("Kezeletlen, valószínűleg static!");
                    }

                });
            };

            // TODO outsourcing the function exist check.
            if (
                undefined === responseHandler
                || undefined === responseHandler['getResponse']
                || null === responseHandler['getResponse']
                || 'Function' === typeof responseHandler['getResponse']
            ) {
                throw 'Responsehandler has not getResponse method!';
            }

        };

        return Server;
    }
);

