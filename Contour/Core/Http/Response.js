module.exports = new Contour.ClientScript.Module(
    function () {
        function Response() {

            this.header = {
                "Content-Type" : "application/javascript"
            };

            this.body   = {};
        }

        Response.prototype.setHeader = function (header) {
            this.header = header;

            return this;
        };

        Response.prototype.setBody = function (body) {

            if ("object" === typeof body) {
                this.body = JSON.stringify(body);
            } else {
                this.body = body;
            }

            return this;
        };

        return Response;
    }
).setName("Core.Http.Response").signUp();