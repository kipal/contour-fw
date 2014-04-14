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
/*
            this.getResponse = function (dbHandler, body, requestEndFunc) {
                if (
                    undefined === this[body.method]
                    || !(this[body.method] instanceof Function)
                ) {
                    var msg = "Not found '" + body['method'] + "' method!";
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
*/
        }

        ResponseHandler.prototype             = AbstractResponseHandler;
        ResponseHandler.prototype.constructor = ResponseHandler;

        return ResponseHandler;
    }

).dep("Contour.Core.Http.AbstractResponseHandler", "Contour.Core.Http.Response", "Contour.Core.Http.Request");