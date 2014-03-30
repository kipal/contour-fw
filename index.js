module.exports = (function (config) {
    'use strict';

    global.requireDir = require("require-directory");

    global.Contour    = {
        basePath : __dirname + "/Contour"
    };

    global.Contour.deepExtend(require("./Contour/"));
});
