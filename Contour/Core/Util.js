module.exports = (function () {
    'use strict';

    function Util () {
        this.getModule = function (moduleName) {
            return require(__dirname + '/../' + moduleName + '.js');
        };
    };

    return Util;
}());