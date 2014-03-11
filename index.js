module.exports = (function (config) {
    'use strict';

    if (undefined === global.App) {
        throw 'Not found App!';
    }

    var check = function(path){
        if (path.match(/node_modules/)) {

            return false;
        } else if (path.match(/\.settings/)) {

            return false;
        } else if(path.match(/.project/)) {

            return false;
        } else if(path.match(/(\.xml)|(\.md)/)) {

            return false;
        } else if(path.match(/\.git.*/)) {

            return false;
        } else if(path.match(/\package\.json/)) {

            return false;
        } else if(path.match(/Util\.js/)) {

            return false;
        } else {

            return true;
        }
    };

    global.Contour      = {
        Core : {}
    };

    Contour.Core.Util = require(__dirname + '/Contour/Core/Util.js')(config, Contour);


    var requireDirectory = require('require-directory'),
    tmpModule            = requireDirectory(module, __dirname, check).Contour;

    return Contour.Core.Util.extendDeep(tmpModule, Contour);
});
