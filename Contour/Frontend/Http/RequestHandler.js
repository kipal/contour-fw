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
module.exports = new Contour.ClientScript.Module(
    function (BaseReqHandler, Response) {

        var instance = null;

        function RequestHandler() {

            if (instance instanceof RequestHandler) {
                return instance;
            }

            BaseReqHandler.call(this);
            /* <publish>
            var baseRequestEnd = "*end*",
                ajaxRequest    = new XMLHttpRequest();


            this.sendRequest = function (request, responseCallback) {

                ajaxRequest.open("POST", baseRequestEnd, true);
                ajaxRequest.send(JSON.stringify(request));

                ajaxRequest.onreadystatechange = function() {
                    if (4 == ajaxRequest.readyState) {
                        if (200 == ajaxRequest.status) {
                            var respObj;
                            try {
                                respObj = JSON.parse(ajaxRequest.responseText);
                            } catch (e) {
                                respObj = {
                                    "error" : ajaxRequest.responseText
                                };
                            }
                            responseCallback(respObj);
                        } else {
                            console.error("Error in " + JSON.stringify(request) + " request sending.");
                        }
                    }
                };

            };

            var serverConfig = *serverConfig*;

            </publish> */

            instance = this;

            /* <private> */
            var serverConfig = null;
            this.setServerConfig = function(config) {
                serverConfig = config;
            };

            this.getApi = function (aliasName) {
                for (var i in serverConfig.api) {
                    if (aliasName == serverConfig.api[i].alias) {

                        return serverConfig.api[i];
                    }
                }

                return false;
            };

            var http = require("http");

            this.sendApiRequest = function(request, out) {
                var config = this.getApi(request.api);

                var options = {
                    host: config.host,
                    port: config.port,
                    path: '/',
                    method: 'POST',
                    headers: {
                        Host: config.host
                    }
                };

                var apiReq = http.request(options, function(res) {
                    res.setEncoding('utf8');

                    body = "";
                    res.on('data', function (chunk) {
                        body += chunk;
                    });

                    res.on("end", function() {
                        out.header(200, {"Content-Type" : "application/json"});
                        out.body(body);
                    });

                });

                apiReq.on(
                    "error",
                    function(e) {
                        out.header(200, {"Content-Type" : "application/json"});
                        out.body({"error": e});
                    }
                );
                apiReq.write(JSON.stringify(request));
                apiReq.end();
            };


            /* </private> */
        }


        RequestHandler.prototype             = BaseReqHandler.prototype;
        RequestHandler.prototype.constructor = RequestHandler;

        RequestHandler.getInstance = function () {
            return new RequestHandler();
        };

        return RequestHandler;
    }
).signUp({
    "name"     : "Frontend.Http.RequestHandler",
    "dep"      : ["Contour.Core.Http.RequestHandler", "Contour.Core.Http.Request", "Contour.Core.Http.Response"],
    "callback" : function (moduleStr) {
        responseHandler = require(__dirname + "/ResponseHandler.js").getReference();

        var tmp = moduleStr.replace(/\*end\*/, responseHandler.baseRequestEnd);

        var origServerConfig = require(Service.basePath + "/../config/server-config.js");
        var serverConfig     = {};

        for (var i in origServerConfig.api) {
            for (var key in origServerConfig.api[i]){
                switch (key) {
                    case "alias":
                        serverConfig[origServerConfig.api[i]["alias"]] = {
                            methods : origServerConfig.api[i]["methods"]
                        };
                        break;
                }
            }
        }

        return tmp.replace(/\*serverConfig\*/, JSON.stringify(serverConfig, undefined, "    "));
    }
});
