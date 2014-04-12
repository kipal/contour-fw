module.exports = new Contour.ClientScript.Module(
    function (Request, Response) {

        // TODO singleton.
        function RequestHandler() {
            var baseRequestEnd = "/* *end* */",
                ajaxRequest    = new XMLHttpRequest();

            ajaxRequest.open("POST", baseRequestEnd, true);

            this.sendRequest = function (request, responseCallback) {
                if (!(request instanceof Request)) {
                    return false;
                }

                ajaxRequest.send(JSON.stringify(request));

                ajaxRequest.onreadystatechange = function() {
                    if (4 == ajaxRequest.readyState) {
                        if (200 == ajaxRequest.status) {
                            responseCallback(ajaxRequest.responseText);
                        } else {
                            console.error("Error in " + JSON.stringify(request) + " request sending.");
                        }
                    }


                }
            };

        }


        return RequestHandler;
    }
).signUp({
    "name"     : "Frontend.Http.RequestHandler",
    "dep"      : ["Frontend.Http.Request", "Core.Http.Response"],
    "callback" : function (moduleStr) {
        responseHandler = require(__dirname + "/ResponseHandler.js").getReference();

        return moduleStr.replace(/\/\* \*end\* \*\//, responseHandler.baseRequestEnd);
    }
}).dep("Contour.Frontend.Http.Request", "Contour.Core.Http.Response");