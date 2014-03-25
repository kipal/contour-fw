module.exports = (function (config) {
    'use strict';

    var check = function(path){
        if (path.match(/node_modules/)) {

            return false;
        } else if (path.match(/\.settings/)) {

            return false;
        } else if(path.match(/.project/)) {

            return false;
        } else if(path.match(/(\.xml)|(\.md)/)) {

            return false;
        } else if(path.match(/\.git/)) {

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
        Core : {
            Util         : {},
            ClientScript : {
                Module        : require(__dirname + '/Contour/Core/ClientScript/Module.js'),
                Register      : require(__dirname + '/Contour/Core/ClientScript/Register.js'),
                PublishParser : require(__dirname + '/Contour/Core/ClientScript/PublishParser.js')
            }
        }
    };

    Contour.Core.Util = require(__dirname + '/Contour/Core/Util.js')(config, Contour);

    var requireDirectory = require('require-directory'),
    tmpModule            = requireDirectory(module, __dirname, check).Contour;

    Contour.currentService = function () {
        return config.serviceRoot.reference;
    };

    Contour.Core.Util.extendDeep(tmpModule, Contour);

    config.serviceRoot.reference = requireDirectory(config.serviceRoot.moduleReference, config.serviceRoot.path, check);

    return Contour;
});
