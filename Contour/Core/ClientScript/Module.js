module.exports = new Module(
    function (register) {
        function ClientScriptModule(moduleName, moduleReference, dependencies) {
            "use strict";

            register.addModule(moduleName, moduleReference);

            Module.call(this, moduleReference);
        }

        ClientScriptModule.prototype             = Module.prototype;
        ClientScriptModule.prototype.constructor = ClientScriptModule;

        return ClientScriptModule;
    }
).dep(false);