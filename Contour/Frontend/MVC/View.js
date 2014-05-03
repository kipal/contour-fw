module.exports = new Contour.ClientScript.Module(
    function (LinkCreator) {
        function View() {

            this.setEvent = function (eventName, fn, forceBind) {
                if (forceBind) {
                    this[eventName] = fn.bind(this);
                } else {
                    this[eventName] = fn.bind(this);
                }
            };
            /*for (var i in actions) {
                if (actions.hasOwnProperty(i)) {
                    this[i] = actions[i];
                }
            }*/

            this.addStyle = View.addStyle;

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
    dep  : ["Frontend.Http.LinkCreator"]
}).dep("Contour.Frontend.Http.LinkCreator");