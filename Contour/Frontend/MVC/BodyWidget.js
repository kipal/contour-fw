module.exports = new Contour.ClientScript.Module(
    function (BaseWidget, CommonWidget) {
        function Widget() {

            // TODO documentWidget legyen a parent.
            BaseWidget.call(this, document.getElementsByTagName("body")[0]);
        }

        Widget.prototype             = BaseWidget.prototype;
        Widget.prototype.constructor = BaseWidget;

        return Widget;
}).setName("Frontend.MVC.BodyWidget")
.setDependencies(["Core.MVC.Widget", "Frontend.MVC.CommonWidget"])
.dep("Contour.Core.MVC.Widget", "Contour.Frontend.MVC.CommonWidget")
.signUp();