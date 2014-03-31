module.exports = new Module(
    function (register) {

        function ClientScriptModule(moduleReference) {
            var moduleName   = "",
                dependencies = [],
                visibility   = "public";

            this.setName = function (name) {
                moduleName = name;

                return this;
            };

            this.setDependencies = function (deps) {
                dependencies = deps

                return this;
            };

            this.setVisibility = function (v) {
                visibility = v;

                return this;
            };

            this.callback = function (fn) {

                moduleReference.toString = fn.bind(this, Function.prototype.toString.call(moduleReference));

                return this;
            }

            this.signUp = function () {
                switch (visibility) {
                    case "public":
                        register.addPublicModule(moduleName, moduleReference, dependencies);
                        break;
                    case "private":
                    default:
                        register.addPrivateModule(moduleName, moduleReference, dependencies);
                        break;
                }

                return this;
            };

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