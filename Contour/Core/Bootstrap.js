module.exports = new Contour.ClientScript.Module(
    function () {

        function Bootstrap() {
            var config = {};

            // TODO ellenőrzés, hogy megvannak egy megfelelő kulcsok.
            this.setConfig = function (configVar) {
                if (isValidConfig(configVar)) {
                    config = configVar;
                }
            };

            var isValidConfig = function (configVar) {
                return true;
            };

            this.getConfig = function (key) {
                if (undefined === key) {

                    return config;
                } else {

                    return config[key];
                }
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
).setName("Core.Bootstrap").signUp();