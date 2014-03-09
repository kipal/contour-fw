module.exports = (function () {
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

        this.getConfig = function () {
            return config;
        };
    }

    Bootstrap.prototype.run = function () {

    };

    return new Bootstrap();
}());