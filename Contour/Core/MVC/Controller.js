module.exports = new Contour.ClientScript.Module(
    function (Util) {

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
    }
).dep("Contour.Core.Util")
.out({
    name : "Core.MVC.Controller",
    dep  : "Core.Util"
}).signUp();
