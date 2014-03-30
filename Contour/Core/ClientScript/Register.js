module.exports = new Module(
    function (parser) {

        function Register(rootName) {
            this.cache                 = "";

            this.moduleStringContainer = {};

            this.addModule             = function (moduleName, moduleReference) {
                if (undefined === this.moduleStringContainer[moduleName]) {
                    this.moduleStringContainer[moduleName] = parser.parse(moduleReference);
                }
            };

            this.printAll              = function () {
                if ("" !== this.cache) {
                    return this.cache;
                }

                this.cache += "window." + rootName + " = (function () {";
                for (var i in this.moduleStringContainer) {

                    if (this.moduleStringContainer.hasOwnProperty(i)) {
                        this.cache += "\n" + i + " = " +  this.moduleStringContainer[i];
                    }
                }
                this.cache += "}());";

                return this.cache;
            };
        }

        return Register;
    }
).dep(false);