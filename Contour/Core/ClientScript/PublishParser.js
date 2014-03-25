module.exports = (function () {
    "use strict";

    function PublishParser() {
    }

    PublishParser.parse = function (reference) {

        return PublishParser.parsePublish(
                PublishParser.parsePrivate(reference.toString())
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