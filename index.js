module.exports = (function (config) {
    'use strict';

    global.requireDir = require("require-directory");

    // ez itt eléggé csúnya. TODO extendDeep
    global.Contour    = {
        basePath : __dirname + "/Contour"
    };

    global.Contour.deepExtend(require("./Contour/"));

    console.log(Contour)
});
