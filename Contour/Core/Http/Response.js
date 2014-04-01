module.exports = new Contour.ClientScript.Module(
    function () {
        function Response() {

            this.header = {
                "Content-Type" : "application/javascript"
            };

            this.body   = {
                method : "",
                params : {}
            };
        }

        Response.prototype.setHeader = function (header) {
            this.header = header;

            return this;
        };

        Response.prototype.setBody = function (body) {
            this.body = body;

            return this;
        };

        return Response;
    }
).setName("Core.Http.Response").signUp();