module.exports = (function () {
    "use strict";

    function Register() {

    }

    Register.moduleStringContainer = {};

    Register.addModule = function (moduleName, moduleReference) {
        if (undefined === Register.moduleStringContainer[moduleName]) {
            Register.moduleStringContainer[moduleName] = Contour.Core.ClientScript.PublishParser.parse(moduleReference.toString());
        }
    };

    return Register;
}());