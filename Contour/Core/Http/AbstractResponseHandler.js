module.exports = (function () {
    'use strict';

    function ResponseHandler() {
        this.getResponse = function () {
            throw 'Abstract method!';
        }
    }
} ());