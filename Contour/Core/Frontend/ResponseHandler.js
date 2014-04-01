module.exports = new Module(
    function (AbstractResponseHandler, Response) {
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
                    case '/q':

                        return this.handleOtherRequest(request);
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
                return new Response().setBody(Contour.ClientScript.Module.getRegister().printAll());
            };

            this.handleAppRequest     = function () {
                return new Response().setBody(currentServiceRegister.printAll());
            };

            this.handleOtherRequest = function (request) {
                return  new Response().setBody(request);
            };
        }

        return ResponseHandler;
    }

).dep("Contour.Core.Http.AbstractResponseHandler", "Contour.Core.Http.Response");