/*******************************************************************************
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Nándor Kiss
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/
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
                    var pathName = url.parse(request.url).pathname;

                    responseHandler.getResponse(
                        pathName,
                        body,
                        {
                            body   : function (b) {
                                if ("string" != typeof b) {
                                    b = JSON.stringify(b);
                                }
                                response.end(b);
                            },
                            header : function (s, h) {
                                response.writeHeader(s, h);
                            }
                        }
                    );
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

