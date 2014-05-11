/*******************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Nándor Kiss
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/
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

).dep("Contour.Core.Http.ResponseHandler", "Contour.Core.Http.Response", "Contour.Core.Http.Request");
