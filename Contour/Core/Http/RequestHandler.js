module.exports = new Contour.ClientScript.Module(
    function () {

        function RequestHandler() {

            var httpRequest = new XMLHttpRequest();

            this.send = function (request) {
                if (!(request instanceof Contour.Core.Http.Request)) {
                    console.log("hát nem megyen.")
                    return false;
                }

                httpRequest.onreadystatechange = function() {
                    if (4 === httpRequest.readyState) {

                        request.setResponse(JSON.parse(httpRequest.responseText));
                    }
                };

                httpRequest.open("POST", "/q", true);
                httpRequest.send(request.toJSON());
            };
        }

        return RequestHandler;
    }
).setName("Core.Http.RequestHandler").signUp();