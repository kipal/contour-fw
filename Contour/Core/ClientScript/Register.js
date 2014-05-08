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
    function (parser, DepSorter) {

        function Register(rootName) {

            parser.register = this;

            var sorter = new DepSorter();

            var moduleStringContainer = {
                "private" : {},
                "public"  : {}
            };

            var initContainer        = {
                "private" : [],
                "public"  : []
            };

            this.getVisibilityOfInitVar = function (variableName) {

                for (var i in initContainer["private"]) {
                    if (variableName === initContainer["private"][i]) {
                        return "private";
                    }
                }

                for (var i in initContainer["public"]) {
                    if (variableName === initContainer["public"][i]) {
                        return "public";
                    }
                }

                for (var i in moduleStringContainer["public"]) {
                    if (variableName === i) {
                        return "public";
                    }
                }

                for (var i in moduleStringContainer["private"]) {
                    if (variableName === i) {
                        return "private";
                    }
                }
                return false;
            };

            var addModuleInit        = function (visibility, moduleName) {
                var pieces = moduleName.split("."),
                    tmp    = "";

                pieces.pop();

                for (var i = 0; i < pieces.length; i++) {
                    tmp += pieces[i] + ".";
                    tmp = tmp.substring(0, tmp.length - 1);

                    if (-1 === initContainer[visibility].indexOf(tmp)) {
                        initContainer[visibility].push(tmp);
                    }

                    tmp += ".";
                }
            };

            var printInit = function () {
                var result = '\n';

                for (var i = 0; i < initContainer["private"].length; i++) {
                    result += "    var " + initContainer["private"][i] + " = {};\n";
                }

                for (var i = 0; i < initContainer["public"].length; i++) {
                    result += "    this." + initContainer["public"][i] + " = {};\n";
                }

                return result;
            };

            var addModule = function (visibility, moduleName, moduleReference, dependencies) {
                addModuleInit(visibility, moduleName);

                if (undefined === moduleStringContainer[visibility][moduleName]) {
                    moduleStringContainer[visibility][moduleName] = {
                            module : moduleReference,
                            dep    : dependencies
                    };
                }
            };

            var printContainer = function (visibility, container) {
                var result = "";

                switch (visibility) {
                    case "public" :
                        visibility = "this.";
                        break;
                    case "private":
                        visibility = "";
                    default:
                        break;
                }
                var deps = [];

                for (var i in container) {
                    if (container.hasOwnProperty(i)) {

                        deps.push({
                            module : i,
                            dep    : container[i].dep instanceof Array ? container[i].dep : [container[i].dep]
                        });
                    }
                }

                sorter.setDeps(deps);
                deps = sorter.sort();

                for (var i = 0; i < deps.length; i++) {
                    moduleName = deps[i].module;
                    result += "\n    " + visibility + moduleName + " = " +  parser.parse(container[moduleName]["module"], container[moduleName]["dep"]) + "\n";
                }

                return result;
            };

            this.cache                 = "";

            this.addPrivateModule      = function (moduleName, moduleReference, dependencies) {
                addModule("private", moduleName, moduleReference, dependencies);
            };

            this.addPublicModule       = function (moduleName, moduleReference, dependencies) {
                addModule("public", moduleName, moduleReference, dependencies);
            };

            this.printAll              = function () {
                if ("" !== this.cache) {
                    return this.cache;
                }

                this.cache += "window." + rootName + " = (new function () {";

                this.cache += printInit();

                this.cache += printContainer("private", moduleStringContainer["private"]);
                this.cache += printContainer("public", moduleStringContainer["public"]);


                this.cache += "}());";


                return this.cache;
            };

            this.getRootName = function () {
                return rootName;
            };
        }

        return Register;
    }
).dep(false);
