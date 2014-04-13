module.exports = new Contour.ClientScript.Module(
    function (Request) {

        function RequestHandler() {

            this.send = function (request, responseCallback) {
                if (!(request instanceof Request)) {
                    throw 'request type is not instance of Contour.Core.Http.Request';
                }

                this.sendRequest(request, responseCallback);
            };
        }

        RequestHandler.prototype.sendRequest = function (request, responseCallback) {
            throw 'RequestHandler::sendRequest() is an abstract method!';
        };

        return RequestHandler;
    }
).dep("Contour.Core.Http.Request").signUp({
    name : "Core.Http.RequestHandler",
    dep  : "Core.Http.Request"
});