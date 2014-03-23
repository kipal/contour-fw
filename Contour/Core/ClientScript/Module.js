module.exports = (function () {
    "use strict";

    function ClientScriptModule(moduleName, moduleReference, dependencies) {
        "use strict";

        Contour.Core.ClientScript.Register.addModule(moduleName, moduleReference);

        if (false === dependencies) {
            return moduleReference;
        }

        if (
                undefined === dependencies
                || null === dependencies
                || 0 != dependencies.length
        ) {
            return moduleReference();
        }

        return moduleReference.apply(this, dependencies);
    }


    return ClientScriptModule;
}());