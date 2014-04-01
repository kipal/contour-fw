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

            this.getHost = function () {

                var os     = require('os');
                var ifaces = os.networkInterfaces();

                for (var i in ifaces) {
                    for (var j in ifaces[i]) {
                        if (
                            undefined !== ifaces[i][j]["address"]
                            && "IPv4" === ifaces[i][j]["family"]
                            &&  '127.0.0.1' !== ifaces[i][j]["address"]
                        ) {
                            return ifaces[i][j]["address"];
                        }
                    }
                }

                return "semmi";
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
                    var pathName = url.parse(request.url).pathname,
                        res      = responseHandler.getResponse(pathName, body);

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
                //|| undefined === responseHandler['getResponse']
                //|| null === responseHandler['getResponse']
                //|| 'Function' === typeof responseHandler['getResponse']
            ) {
                throw 'Responsehandler has not getResponse method!';
            }

        };

        return Server;
    }
);

