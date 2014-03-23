module.exports = (function () {
    "use strict";

    function PublishParser() {
    }

    PublishParser.parse = function (text) {

        return PublishParser.parsePublish(
                PublishParser.parsePrivate(text)
        ) + "()";
    };

    PublishParser.parsePrivate = function (text) {
        var privatePattern = /\/\* <private> \*\/(.|\n)*\/\* <\/private> \*\//gm;

        return text.replace(privatePattern, "");
    };

    PublishParser.parsePublish = function (text) {
        return text.replace(/\/\* <publish>/g, "").replace(/<\/publish> \*\//g, "");
    };

    return PublishParser;
}());