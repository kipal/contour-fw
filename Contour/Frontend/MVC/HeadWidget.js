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
    function (BaseWidget, CommonWidget) {
        function Widget() {

            this.setTitle = function (title) {
                document.title = title;
            };

            this.addBootstrapCss = function () {
                css = this.getView().appendNode("link");
                css.rel  = "stylesheet";
                css.type = "text/css";
                css.href = "static/bootstrap.css";
            };

            this.run = function () {
                this.addBootstrapCss();
            };
            BaseWidget.call(this, document.getElementsByTagName("head")[0]);
        }

        Widget.prototype             = BaseWidget.prototype;
        Widget.prototype.constructor = BaseWidget;

        return Widget;
}).setName("Frontend.MVC.HeadWidget")
.setDependencies(["Core.MVC.Widget", "Frontend.MVC.CommonWidget"])
.dep("Contour.Core.MVC.Widget", "Contour.Frontend.MVC.CommonWidget")
.signUp();
