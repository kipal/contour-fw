module.exports = new Contour.ClientScript.Module(
    function (AbstractWidget) {
        function CommonWidget(parentDom, parentWidget) {


            AbstractWidget.call(this, parentDom, parentWidget);
        }

        CommonWidget.prototype             = AbstractWidget.prototype;
        CommonWidget.prototype.constructor = CommonWidget;

        return CommonWidget;
    }
).out({
    name : "Frontend.MVC.CommonWidget",
    dep  : "Core.MVC.Widget"
})
.dep("Contour.Core.MVC.Widget")
.signUp();