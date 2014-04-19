module.exports = new Contour.ClientScript.Module(
    function () {
        function Response() {

            this.header = {
                "Content-Type" : "application/javascript"
            };

            this.statusCode = 200;

            this.body   = {};
        }

        Response.prototype.setStatusCode = function (statusCode) {
            this.statusCode = statusCode;

            return this;
        };

        Response.prototype.setHeader = function (header) {
            this.header = header;

            return this;
        };

        Response.prototype.setBody = function (body, error) {
            if (!this.header["Content-Type"].match(/application\/javascript/)) {

                this.body = body;
            } else {
                body = {
                        data  : body,
                        error : error
                };

            }

            if ("object" === typeof body) {
                this.body = JSON.stringify(body);
            }

            return this;
        };

        return Response;
    }
).setName("Core.Http.Response").signUp();