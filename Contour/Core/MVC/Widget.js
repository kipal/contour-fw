module.exports = new Contour.ClientScript.Module(
    function (BaseController) {
        function Widget(parentDom, parentWidget) {

            var subWidgets = [];

            this.createView = function () {
                Contour.Core.MVC.View.call(parentDom, this.actions);
            }.call(this);

            this.getView = function () {
                return parentDom;
            };
            // TODO csinálni egy függvényt, ami ezt automatikusan vizsgálja. (lateBind)
            if (undefined === this.actions) {
                this.actions = {};
            }

            if (undefined === this.run) {
                this.run = function () {
                    throw 'Widget::run is abstract!';
                };
            }

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
}).dep("Contour.Core.MVC.Controller").setDependencies("Core.MVC.Controller").setName("Core.MVC.Widget").signUp();