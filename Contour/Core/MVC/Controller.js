module.exports = new Contour.ClientScript.Module(
    function () {

        function Controller() {

            this.registerEvent = function (elem, event, functionName) {
                if (undefined === this[functionName] || "function" === typeof this[functionName]) {
                    throw 'Not found this function!';
                }

                if ("function" !== typeof elem["on"]) {
                    throw 'Not found on method!';
                }

                elem.on(event, this[functionName]);
            };
        }

        return Controller;
}).setName("Core.MVC.Controller").signUp();