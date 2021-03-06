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
module.exports = new Contour.ClientScript.Module(
    function () {

        function Bootstrap() {
            var config = {};

            var isValidConfig = function (configVar) {
                return true;
            };

            // TODO ellenőrzés, hogy megvannak egy megfelelő kulcsok.
            this.setConfig = function (configVar) {
                if (isValidConfig(configVar)) {
                    config = configVar;
                }
            };


            this.getConfig = function (key) {
                if (undefined === key) {

                    return config;
                }

                return config[key];
            };
        }

        /* <private> */
        Bootstrap.prototype.setCurrentServer = function (server) {
            this.server = server;
        };

        Bootstrap.prototype.getCurrentServer = function () {
            return this.server;
        };

        Bootstrap.prototype.run = function () {
            if (undefined === this.getCurrentServer()) {
                throw 'Not found current server!';
            }

            this.getCurrentServer().start();
        };
        /* </private> */

        return Bootstrap;
    }
).signUp({
    name : "Core.Bootstrap"
});
