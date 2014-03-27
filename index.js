module.exports = (function (config) {
    'use strict';

    global.requireDir = require("require-directory");

    // ez itt eléggé csúnya. TODO extendDeep
    global.Contour    = {
        basePath : __dirname + "/Contour"
    };

    console.log("Contour module loading...");
        global.Contour = require("./Contour/");
    console.log("Contour modules are loaded.");
});
