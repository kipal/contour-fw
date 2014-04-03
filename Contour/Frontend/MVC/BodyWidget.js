module.exports = new Contour.ClientScript.Module(
    function (AbstractWidget) {
        function Widget() {

            this.actions = {
                onclick : function () {
                    /* <publish>
                      alert("onclick");
                     </publish> */
                }
            };

            this.run = function () {
                this.getView().innerHTML = "Contour Basic MainWidget!";

            };

            AbstractWidget.call(this, document.getElementsByTagName("body")[0]);
        }

        Widget.prototype             = AbstractWidget.prototype;
        Widget.prototype.constructor = AbstractWidget;

        return Widget;
}).setName("Frontend.MVC.BodyWidget")
.setDependencies("Core.MVC.Widget")
.dep("Contour.Core.MVC.Widget")
.signUp();