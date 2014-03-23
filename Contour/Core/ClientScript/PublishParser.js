module.exports = (function () {
    "use strict";

    function PublishParser() {
    }

    PublishParser.parse = function (text) {
        var r = /\/\* <private> \*\/(.|\n)*\/\* <\/private> \*\//gm;

        return text.replace(r, "");
    };

    return PublishParser;
}());