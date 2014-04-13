module.exports = new Module(
    function () {
        function Client(driver) {
            this.connect = function () {
                throw 'Contour.DB.Client::connect is abstract!';
            };


        }

        return Client;
    }
);