module.exports = new Contour.ClientScript.Module(
    function (BaseController, Util, View) {
        function Widget(parentDom, parentWidget) {

            var subWidgets = [];

            Util.lateBind(
                    'createView',
                    function () {
                        View.call(parentDom, this.actions);
                    }.call(this),
                    this
            );

            this.setEvent = function (eventName, fn, bind) {
                this.getView().setEvent(eventName, fn, bind);
            };


            this.getView = function () {
                return parentDom;
            };

            Util.lateBind(
                "run",
                function () {
                    throw 'Widget::run is abstract!';
                },
                this
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
}).dep("Contour.Core.MVC.Controller", "Contour.Core.Util", "Contour.Frontend.MVC.View")
.setDependencies(["Core.MVC.Controller", "Core.Util", "Frontend.MVC.View"]).setName("Core.MVC.Widget").signUp();