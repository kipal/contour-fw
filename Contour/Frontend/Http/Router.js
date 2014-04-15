module.exports = new Module(
    function () {

        function Router(reqHandler) {


            this.getResponse = function(request) {
                if ("frontend" !== request.api) {
                    //TODO na ez hogyan legyen? :)
                }

                return reqHandler.sendRequest(request);
            };
        }

        return Router;
    }
);