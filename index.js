module.exports = (function (config) {
    'use strict';

    global.requireDir = require("require-directory");

    // ez itt eléggé csúnya. TODO extendDeep
    global.Contour    = {
        basePath : __dirname + "/Contour"
    };

    console.log("Module loading...");
        global.Contour = require("./Contour/");
    console.log("Modules are loaded.");


    Contour.currentService = function () {
        return config.serviceRoot.reference;
    };
});
