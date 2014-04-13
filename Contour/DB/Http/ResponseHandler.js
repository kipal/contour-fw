module.exports = new Module(
    function (AbstractResponseHandler, Response, Request) {
        'use strict';

        function ResponseHandler() {
            AbstractResponseHandler.call(this);

            this.select = function () {
                throw 'Contour.DB.Http.ResponseHandler::select() is an abstract method!';
            };

            this.insert = function () {
                throw 'Contour.DB.Http.ResponseHandler::insert() is an abstract method!';
            };

            this.update = function () {
                throw 'Contour.DB.Http.ResponseHandler::update() is an abstract method!';
            };

            this["delete"] = function () {
                throw 'Contour.DB.Http.ResponseHandler::delete() is an abstract method!';
            };

            return ResponseHandler;
        };

        ResponseHandler.prototype.getResponse = function (path, request) {
            if ("/" !== path) {
                var msg = "The '" + path + "' path is unknown!";
                console.log(msg);

                return new Response().setHeader({"Content-Type" : "text/html"}).setBody(msg);
            }

            try {
                request = Request.parse(request);
            } catch (e) {
                console.log(e);

                return new Response().setBody(undefined, 'The request is not standard!');
            }

            if (
                undefined === this[request.method]
                || !(this[request.method] instanceof Function)
            ) {
                var msg = "Not found '" + request['method'] + "' method!";
                console.log(msg);

                return new Response().setBody(undefined, msg);
            }

            try {

                return new Response().setBody(this[request.method](request.params));
            } catch (e) {
                console.log(e);


                return new Response().setBody(undefined, 'Error in query!');
            }
        };

        ResponseHandler.prototype.query = function (callback) {

        };
    }

).dep("Contour.Core.Http.AbstractResponseHandler", "Contour.Core.Http.Response", "Contour.Core.Http.Request");