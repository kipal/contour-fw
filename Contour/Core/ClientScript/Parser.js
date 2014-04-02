module.exports = new Module(
    function () {

        function Parser() {

            this.register = {};

            this.composeDeps = function (dependencies) {
                if (false === dependencies) {

                    return ';';
                }

                if ("string" === typeof dependencies) {

                    if ("public" === this.register.getVisibilityOfInitVar(dependencies)) {
                        dependencies = "this." + dependencies;
                    }

                    return "(" + dependencies + ");";
                }

                if (0 < dependencies.length) {
                    for (var i in dependencies) {
                        if ("public" === this.register.getVisibilityOfInitVar(dependencies[i])) {
                            dependencies[i] = "this." + dependencies[i];
                        }
                    }
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