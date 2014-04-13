module.exports = new Contour.ClientScript.Module(
    function (BaseReqHandler, Response) {

        // TODO singleton.
        function RequestHandler() {
            BaseReqHandler.call(this);

            var baseRequestEnd = "/* *end* */",
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
        }

        RequestHandler.prototype             = BaseReqHandler.prototype;
        RequestHandler.prototype.constructor = RequestHandler;


        return RequestHandler;
    }
).signUp({
    "name"     : "Frontend.Http.RequestHandler",
    "dep"      : ["Core.Http.RequestHandler", "Core.Http.Request", "Core.Http.Response"],
    "callback" : function (moduleStr) {
        responseHandler = require(__dirname + "/ResponseHandler.js").getReference();

        return moduleStr.replace(/\/\* \*end\* \*\//, responseHandler.baseRequestEnd);
    }
}).dep("Contour.Core.Http.RequestHandler", "Contour.Core.Http.Request", "Contour.Core.Http.Response");