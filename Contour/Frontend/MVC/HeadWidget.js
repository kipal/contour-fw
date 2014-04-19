module.exports = new Contour.ClientScript.Module(
    function (BaseWidget, CommonWidget) {
        function Widget() {

            this.setTitle = function (title) {
                document.title = title;
            };

            this.run = function () {

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