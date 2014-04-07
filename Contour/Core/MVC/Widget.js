module.exports = new Contour.ClientScript.Module(
    function (BaseController, Util) {
        function Widget(parentDom, parentWidget) {

            var subWidgets = [];

            this.createView = function () {
                Contour.Core.MVC.View.call(parentDom, this.actions);
            }.call(this);

            this.getView = function () {
                return parentDom;
            };

            Util.lateBind(this, "actions", {});

            Util.lateBind(
                this,
                "run",
                function () {
                    throw 'Widget::run is abstract!';
                }
            );

            this.createSubWidget = function (widgetFunction, subDomainFunction) {
                var tmp = new widgetFunction(subDomainFunction.call(parentDom), this);
                subWidgets.push(tmp);

                return tmp;
            };

            BaseController.call(this);
        }

        Widget.prototype             = BaseController.prototype;
        Widget.prototype.constructor = Widget;


        return Widget;
}).dep("Contour.Core.MVC.Controller").setDependencies(["Core.MVC.Controller", "Core.Util"]).setName("Core.MVC.Widget").signUp();