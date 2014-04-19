module.exports = new Contour.ClientScript.Module(
    function () {
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

            this.appendNode = function (element) {

                return this.appendChild(document.createElement(element));
            };

            this.prependNode = function (element) {

                return this.insertBefore(document.createElement(element), this.firstChild);
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
}).setName("Core.MVC.View").signUp();