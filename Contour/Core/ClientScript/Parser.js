module.exports = new Module(
    function () {

        function Parser() {

            this.composeDeps = function (dependencies) {
                if (false === dependencies) {

                    return ';';
                }

                if ("string" === typeof dependencies) {

                    return "(" + dependencies + ");";
                }

                if (0 < dependencies.length) {

                    return "(" + dependencies.join(", ") + ");";
                }

                return "();";
            };

            this.parse = function (reference, dependencies) {

                return parsePublish(parsePrivate(reference.toString())) + this.composeDeps(dependencies);
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