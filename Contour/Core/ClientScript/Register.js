module.exports = new Module(
    function (parser) {

        function Register(rootName) {

            var moduleStringContainer = {
                    "private" : {},
                    "public"  : {}
            };

            var initContainer        = {
                    "private" : [],
                    "public"  : []
            };

            var addModuleInit        = function (visibility, moduleName) {
                var pieces = moduleName.split("."),
                    tmp    = "";

                pieces.pop();

                for (var i = 0; i < pieces.length; i++) {
                    tmp += pieces[i] + ".";
                    tmp = tmp.substring(0, tmp.length - 1);

                    if (-1 === initContainer[visibility].indexOf(tmp)) {
                        initContainer[visibility].push(tmp);
                    }

                    tmp += ".";
                }
            };

            var printInit = function () {
                var result = '\n';

                for (var i = 0; i < initContainer["private"].length; i++) {
                    result += "    var " + initContainer["private"][i] + " = {};\n";
                }

                for (var i = 0; i < initContainer["public"].length; i++) {
                    result += "    this." + initContainer["public"][i] + " = {};\n";
                }

                return result;
            };

            var addModule = function (visibility, moduleName, moduleReference, dependencies) {
                addModuleInit(visibility, moduleName);

                if (undefined === moduleStringContainer[visibility][moduleName]) {
                    moduleStringContainer[visibility][moduleName] = parser.parse(moduleReference, dependencies);
                }
            };

            var printContainer = function (visibility, container) {
                var result = "";

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

                this.cache += "window." + rootName + " = (new function () {";

                this.cache += printInit();

                this.cache += printContainer("private", moduleStringContainer["private"]);
                this.cache += printContainer("public", moduleStringContainer["public"]);


                this.cache += "}());";


                return this.cache;
            };
        }

        return Register;
    }
).dep(false);