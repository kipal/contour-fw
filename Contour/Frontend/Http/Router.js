module.exports = new Module(
    function () {

        function Router(reqHandler) {


            this.getResponse = function(request, out) {
                if ("frontend" !== request.api) {
                    //TODO na ez hogyan legyen? :)
                }

                reqHandler.sendApiRequest(request, out);
            };
        }

        return Router;
    }
);