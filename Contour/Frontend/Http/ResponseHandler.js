module.exports = new Module(
    function (AbstractResponseHandler, Response, Request) {
        'use strict';

        function ResponseHandler(currentServiceRegister, router) {
            AbstractResponseHandler.call(this);

            this.getResponse = function (path, request, out) {
                var result = {};
                switch (path) {
                    case '/':

                        result = this.handleFirstRequest();
                        break;
                    case '/contour':

                        result = this.handleContourRequest();
                        break;
                    case '/app':

                        result = this.handleAppRequest();
                        break;
                    case ResponseHandler.baseRequestEnd:

                        return this.handleOtherRequest(Request.parse(request), out);
                    case '/favicon.ico':
                        result = this.redirectToFavicon();
                        break;
                    default:
                        result = new Response();
                        result.setHeader({
                            "Content-Type" : "text/javascript"
                        });
                        result.setBody({
                            "error" : "Untreated request!"
                        });
                }

                out.header(result.statusCode, result.header);
                out.body(result.body);
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

            this.redirectToFavicon    = function () {
                var resp = new Response();
                resp.statusCode = 302;
                resp.setHeader({
                    'Location': '/static/favicon.ico'
                });

                return resp;
            };

            this.handleOtherRequest = function (request, out) {

                return new Response().setBody(router.getResponse(request, out));
            };
        }

        ResponseHandler.baseRequestEnd = '/q';

        return ResponseHandler;
    }

).dep("Contour.Core.Http.AbstractResponseHandler", "Contour.Core.Http.Response", "Contour.Core.Http.Request");