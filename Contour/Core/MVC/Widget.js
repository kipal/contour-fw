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
module.exports = new Contour.ClientScript.Module(
    function (BaseController, Util, View) {
        function Widget(parentDom, parentWidget) {

            var subWidgets = [];
            Util.lateBind(
                    'createView',
                    function () {
                        View.call(parentDom, this.actions);
                    }.bind(this),
                    this
            );

            this.createView();

            this.setEvent = function (eventName, fn, bind) {
                this.getView().setEvent(eventName, fn, bind);
            };


            this.getView = function () {
                return parentDom;
            };

            Util.lateBind(
                "run",
                function () {
                    throw 'Widget::run is abstract!';
                },
                this
            );

            this.createSubWidget = function (widgetFunction, subDomainFunction) {
                var tmp = new widgetFunction(subDomainFunction.call(parentDom), this);
                subWidgets.push(tmp);

                return tmp;
            };

            BaseController.call(this);
        }

        Widget.prototype             = BaseController.prototype;
        Widget.prototype.constructor = Widget;


        return Widget;
}).dep("Contour.Core.MVC.Controller", "Contour.Core.Util", "Contour.Frontend.MVC.View")
.setDependencies(["Core.MVC.Controller", "Core.Util", "Frontend.MVC.View"]).setName("Core.MVC.Widget").signUp();
