module.exports = new Contour.ClientScript.Module(
    function() {

        function Request(method, params) {

            var response = {};

            this.toJSON = function () {
                return JSON.stringify({
                    method : method,
                    params : params
                });
            };

            this.setResponse = function (r) {
                response = new Contour.Core.Http.Response().setBody(r);

                return this;
            };

            this.getResponse = function () {
                return response;
            };
        }

        return Request;

}).setName("Core.Http.Request").signUp();