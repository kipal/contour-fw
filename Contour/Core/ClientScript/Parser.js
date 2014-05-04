/*******************************************************************************
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Nándor Kiss
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/
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
