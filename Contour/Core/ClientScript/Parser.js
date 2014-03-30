module.exports = new Module(
    function () {

        function Parser() {

            this.parse = function (reference) {
                // TODO dep
                return parsePublish(parsePrivate(reference.toString())) + "()";
            };

            var parsePrivate = function (text) {
                var privatePattern = /\/\* <private> \*\/(.|\n)*\/\* <\/private> \*\//gm;

                return text.replace(privatePattern, "");
            };

            var parsePublish = function (text) {
                return text.replace(/\/\* <publish>/g, "").replace(/<\/publish> \*\//g, "");
            };

        }


        return Parser;
    }
);