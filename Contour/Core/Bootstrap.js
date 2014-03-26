module.exports = new Module(
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

        Bootstrap.prototype.getCurrentServer = function () {
            var serverList = this.getConfig().servers;
            for (var type in serverList) {
                for (var i in serverList[type]) {
                    if (serverList[type][i].getIsCurrent()) {
                        return serverList[type][i];
                    }
                }
            }
        };

        Bootstrap.prototype.run = function () {
            this.getCurrentServer().start();
        };

        return new Bootstrap();
    }
);