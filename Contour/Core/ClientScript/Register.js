module.exports = new Module(
    function (parser) {

        function Register(rootName) {

            var moduleStringContainer = {
                    "private" : {},
                    "public"  : {}
            };

            var addModule = function (visibility, moduleName, moduleReference, dependencies) {
                if (undefined === moduleStringContainer[visibility][moduleName]) {
                    moduleStringContainer[visibility][moduleName] = parser.parse(moduleReference, dependencies);
                }
            };

            var printAll = function (visibility, container) {
                var result = '';

                switch (visibility) {
                    case "public" :
                        visibility = "this.";
                        break;
                    case "private":
                        visibility = "var ";
                    default:
                        break;
                }

                for (var i in container) {
                    if (container.hasOwnProperty(i)) {
                        result += "\n    " + visibility + i + " = " +  container[i] + "\n";
                    }
                }

                return result;
            };

            this.cache                 = "";

            this.addPrivateModule      = function (moduleName, moduleReference, dependencies) {
                addModule("private", moduleName, moduleReference, dependencies);
            };

            this.addPublicModule       = function (moduleName, moduleReference, dependencies) {
                addModule("public", moduleName, moduleReference, dependencies);
            };

            this.printAll              = function () {
                if ("" !== this.cache) {
                    return this.cache;
                }

                this.cache += "window." + rootName + " = (function () {";

                this.cache += printAll("private", moduleStringContainer["private"]);
                this.cache += printAll("public", moduleStringContainer["public"]);


                this.cache += "}());";


                return this.cache;
            };
        }

        return Register;
    }
).dep(false);