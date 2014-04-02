module.exports = new Contour.ClientScript.Module(
    function (BaseController) {
        function Widget(parentDom, parentWidget) {
            console.log(parentDom);
            this.render = function () {
                parentDom.innerHTML = this.view.render();
            };

            BaseController.call(this);
        }

        Widget.prototype             = BaseController.prototype;
        Widget.prototype.constructor = Widget;


        return Widget;
}).dep("Contour.Core.MVC.Controller").setDependencies("Core.MVC.Controller").setName("Core.MVC.Widget").signUp();