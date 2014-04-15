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

            ajaxRequest.open("POST", baseRequestEnd, true);

            this.sendRequest = function (request, responseCallback) {

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

            this.getApi = function (apiName) {
                for (var i in serverConfig.api) {
                    if (apiName === serverConfig.api[i].alias) {

                        return serverConfig[i];
                    }
                }

                return false;
            };

            this.sendRequest = function(request) {
                var config = this.getApi(request.api);

                var options = {
                    host: url,
                    port: 80,
                    path: '/resource?id=foo&bar=baz',
                    method: 'POST'
                };

                http.request(options, function(res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));

                    res.setEncoding('utf8');

                    res.on('data', function (chunk) {
                        console.log('BODY: ' + chunk);
                    });

                }).end();
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