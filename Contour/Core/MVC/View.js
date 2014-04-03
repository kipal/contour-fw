module.exports = new Contour.ClientScript.Module(
    function () {
        function View(actions) {

            for (var i in actions) {
                if (actions.hasOwnProperty(i)) {
                    this[i] = actions[i];
                }
            }

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