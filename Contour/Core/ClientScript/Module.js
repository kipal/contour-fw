module.exports = new Module(
    function (register) {

        function ClientScriptModule(moduleName, dependencies, visibility, moduleReference) {
            "use strict";

            // osztaly szerint szetszedni, absztraktalni, majd specializalni
            switch (visibility) {
                case "public":
                    register.addPublicModule(moduleName, moduleReference, dependencies);
                    break;
                case "private":
                default:
                    register.addPrivateModule(moduleName, moduleReference, dependencies);
                    break;
            }

            Module.call(this, moduleReference);
        }

        ClientScriptModule.getRegister = function() {
            return register;
        };

        ClientScriptModule.prototype             = Module.prototype;
        ClientScriptModule.prototype.constructor = ClientScriptModule;

        return ClientScriptModule;
    }
).dep(false);