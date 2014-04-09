module.exports = new Module(
    function (register) {

        function ClientScriptModule(moduleReference) {
            var moduleName   = "",
                dependencies = [],
                visibility   = "public";

            this.out = function (config) {
                if (undefined !== config["name"]) {
                    moduleName = config.name;
                }

                if (undefined !== config["dep"]) {
                    dependencies = config.dep;
                }

                if (undefined !== config["visibility"]) {
                    visibility = config.visibility;
                }

                if (undefined !== config["callback"]) {
                    this.callback(config.callback);
                }

                return this;
            };

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

            this.signUp = function (config) {
                if (undefined !== config) {
                    this.out(config);
                }

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