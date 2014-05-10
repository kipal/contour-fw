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
    function (LinkCreator) {
        function View(actions) {

            this.setEvent = function (eventName, fn) {
                this[eventName] = fn;
            };

            for (var i in actions) {
                if (actions.hasOwnProperty(i)) {
                    this.setEvent(i, actions[i]);
                }
            }

            this.addStyle = View.addStyle;

            this.setContent = function (content) {
                this.innerHTML = content;
            };

            this.appendNode = function (element, moduleName) {
                if (false === moduleName) {
                    return this.appendChild(document.createElement(element));
                }

                if (undefined === moduleName || null === moduleName) {
                    moduleName = View;
                }

                var tmp = this.appendChild(document.createElement(element));
                moduleName.call(tmp);

                return tmp;
            };

            this.prependNode = function (element, moduleName) {
                if (false === moduleName) {
                    return this.insertBefore(document.createElement(element), this.firstChild);
                }

                if (undefined === moduleName || null === moduleName) {
                    moduleName = View;
                }

                var tmp = this.insertBefore(document.createElement(element), this.firstChild);
                moduleName.call(tmp);

                return tmp;
            };

            this.getNodesByTag = function(tagName) {
                return this.getElementsByTagName(tagName);
            };

            this.getFirstNodeByTag = function(tagName) {
                return this.getElementsByTagName(tagName)[0];
            };

            this.getLastNodeByTag = function(tagName) {
                var tmp = this.getElementsByTagName(tagName);

                return tmp[tmp.length - 1];
            };

            this.getImgSrc = LinkCreator.getImgSrc;

            this.getImgSrcForCss = function (path) {
                return "url(" + this.getImgSrc(path) + ")";
            };
        }

        var styleDom = null;

        var styles   = {};

        var cssGenerator = function (selector, describeObj) {
            var result = selector + " {\n";
            for (var i in describeObj) {
                if (describeObj.hasOwnProperty(i)) {
                    result += i + ":" + describeObj[i] + ";\n"
                }
            }
            result += "}\n";

            return result;
        };

        var fillStyleDom = function () {

            styleDom.innerHTML = "";


            for (var i in styles) {
                if (styles.hasOwnProperty(i)) {
                    styleDom.innerHTML += cssGenerator(i, styles[i]);
                }
            }
        };

        View.addStyle = function (selector, describeObj) {
            if (null === styleDom) {
                styleDom = this.appendNode("style");
            }

            if (undefined === styles[selector]) {
                styles[selector] = {};
            }

            for (var i in describeObj) {
                if (describeObj.hasOwnProperty(i)) {
                    styles[selector][i] = describeObj[i];
                }
            }

             fillStyleDom();
        };


        return View;
}).signUp({
    name : "Frontend.MVC.View",
    dep  : ["Contour.Frontend.Http.LinkCreator"]
});
