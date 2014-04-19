module.exports = new Contour.ClientScript.Module(
    function () {
        function Request(api, method, params) {
            this.api    = api;
            this.method = method;
            this.params = params;
        }

        Request.parse = function (raw) {
            if (undefined === raw || null === raw || "" === raw) {
                throw 'Empty request!';
            }

            var content = JSON.parse(raw),
                req = new Request();

            if (
                undefined === content['api']
                || undefined === content['method']
            ) {
                throw ("Not standard request: " + raw);
            }

            req.api    = content.api;
            req.method = content.method;
            req.params = content.params;

            return req;
        };

        return Request;
    }
).signUp({
    name : "Core.Http.Request"
});