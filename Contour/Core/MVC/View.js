module.exports = new Contour.ClientScript.Module(
    function () {
        function View(actions) {

            for (var i in actions) {
                if (actions.hasOwnProperty(i)) {
                    this[i] = actions[i];
                }
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

            this.addStyle = function (selector, describeObj) {
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

        return View;
}).setName("Core.MVC.View").signUp();