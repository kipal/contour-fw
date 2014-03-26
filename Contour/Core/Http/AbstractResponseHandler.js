module.exports = new Module(
    function () {
        'use strict';

        function ResponseHandler() {
            this.getResponse = function () {
                throw 'Abstract method!';
            }
        }

        return ResponseHandler;
    }
);