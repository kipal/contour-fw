module.exports = new Contour.ClientScript.Module(
    function () {
        function Request(api, method, params) {
            this.api    = api;
            this.method = method;
            this.params = params;
        }

        return Request;
    }
).signUp({
    name : "Frontend.Http.Request"
});