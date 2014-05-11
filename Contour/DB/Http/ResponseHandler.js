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
    function (AbstractResponseHandler) {
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

).dep("Contour.Core.Http.ResponseHandler");
