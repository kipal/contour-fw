module.exports = new Contour.ClientScript.Module(
    function (AbstractWidget, ReqHandler) {
        function CommonWidget(parentDom, parentWidget) {
            this.sendRequest = function (request, respCallback) {
                ReqHandler.getInstance().sendRequest(request, respCallback);
            };

            AbstractWidget.call(this, parentDom, parentWidget);
        }

        CommonWidget.prototype             = AbstractWidget.prototype;
        CommonWidget.prototype.constructor = CommonWidget;

        return CommonWidget;
    }
).out({
    name : "Frontend.MVC.CommonWidget",
    dep  : ["Core.MVC.Widget", "Frontend.Http.RequestHandler"]
})
.dep("Contour.Core.MVC.Widget", "Contour.Frontend.Http.RequestHandler")
.signUp();