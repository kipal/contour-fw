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
    function (register) {

        function ClientScriptModule(moduleReference) {
            var moduleName   = "",
                dependencies = [],
                visibility   = "public";

            this.out = function (config) {
                if (undefined !== config["name"]) {
                    moduleName = config.name;
                }

                if (undefined !== config["dep"]) {
                    dependencies = config.dep;
                }

                if (undefined !== config["visibility"]) {
                    visibility = config.visibility;
                }

                if (undefined !== config["callback"]) {
                    this.callback(config.callback);
                }

                return this;
            };

            this.setName = function (name) {
                moduleName = name;

                return this;
            };

            this.setDependencies = function (deps) {
                dependencies = deps

                return this;
            };

            this.setVisibility = function (v) {
                visibility = v;

                return this;
            };

            this.callback = function (fn) {

                moduleReference.toString = fn.bind(this, Function.prototype.toString.call(moduleReference));

                return this;
            }

            this.signUp = function (config) {
                if (undefined !== config) {
                    this.out(config);
                }

                switch (visibility) {
                    case "public":
                        register.addPublicModule(moduleName, moduleReference, dependencies);
                        break;
                    case "private":
                    default:
                        register.addPrivateModule(moduleName, moduleReference, dependencies);
                        break;
                }

                return this;
            };

            Module.call(this, moduleReference);
        }

        ClientScriptModule.getRegister = function() {
            return register;
        };

        ClientScriptModule.prototype             = Module.prototype;
        ClientScriptModule.prototype.constructor = ClientScriptModule;

        return ClientScriptModule;
    }
).dep(false);
