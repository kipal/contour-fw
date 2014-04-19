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
                            responseCallback(ajaxRequest.responseText);
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
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));

                    res.setEncoding('utf8');

                    body = "";
                    res.on('data', function (chunk) {
                        body += chunk;
                    });

                    res.on("end", function() {
                        console.log(body);
                        out.header(200, {"Content-Type" : "text/javascript"});
                        out.body(body);
                    });

                });

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
    "dep"      : ["Core.Http.RequestHandler", "Core.Http.Request", "Core.Http.Response"],
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
}).dep("Contour.Core.Http.RequestHandler", "Contour.Core.Http.Request", "Contour.Core.Http.Response");