module.exports = new Module(
    function () {

        function Register() {

        }

        Register.cache                 = "";

        Register.moduleStringContainer = {};

        Register.addModule = function (moduleName, moduleReference) {
            if (undefined === Register.moduleStringContainer[moduleName]) {
                Register.moduleStringContainer[moduleName] = Contour.Core.ClientScript.PublishParser.parse(moduleReference);
            }
        };

        Register.printAll = function () {
            if ("" !== Register.cache) {
                return Register.cache;
            }

            Register.cache += "(function () {";
            for (var i in Register.moduleStringContainer) {
                Register.cache += "\n" + i + " = " +  Register.moduleStringContainer[i];
            }
            Register.cache += "}.call(window))";

            return Register.cache;
        };

        return Register;
    }
);