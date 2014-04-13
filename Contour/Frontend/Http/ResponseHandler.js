module.exports = new Module(
    function (AbstractResponseHandler, Response, Request) {
        'use strict';

        function ResponseHandler(currentServiceRegister) {
            AbstractResponseHandler.call(this);

            this.getResponse = function (path, request) {
                switch (path) {
                    case '/':

                        return this.handleFirstRequest();
                    case '/contour':

                        return this.handleContourRequest();
                    case '/app':

                        return this.handleAppRequest();
                    case ResponseHandler.baseRequestEnd:

                        return this.handleOtherRequest(Request.parse(request));
                }
            };

            this.handleFirstRequest = function () {
                return new Response().setHeader({"Content-Type" : "text/html"}).setBody(
                    '<!DOCTYPE html>'
                        + '<html>'
                            + '<head>'
                                + '<script src="/contour"></script>'
                                + '<script src="/app"></script>'
                            + '</head>'
                            + '<body>'
                            + '</body>'
                        + '</html>'
                );
            };

            this.handleContourRequest = function () {
                return new Response().setHeader({"Content-Type" : "text/javascript"}).setBody(Contour.ClientScript.Module.getRegister().printAll());
            };

            this.handleAppRequest     = function () {
                return new Response().setHeader({"Content-Type" : "text/javascript"}).setBody(currentServiceRegister.printAll());
            };

            this.handleOtherRequest = function (request) {

                return new Response().setBody(Router.getResponse(request));
            };
        }

        ResponseHandler.baseRequestEnd = '/q';

        return ResponseHandler;
    }

).dep("Contour.Core.Http.AbstractResponseHandler", "Contour.Core.Http.Response", "Contour.Core.Http.Request");