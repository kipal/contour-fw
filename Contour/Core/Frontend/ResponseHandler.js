module.exports = (function (AbstractResponseHandler) {
    'use strict';

    function ResponseHandler() {
        AbstractResponseHandler.call(this);

        this.getResponse = function (path, request) {
            switch (path) {
                case '/':

                    return this.handleFirstRequest();
                case '/contour':

                    return this.handleContourRequest();
                case '/app':

                    return this.handleAppRequest();
                case '/q':

                    return this.handleOtherRequest(request);
            }
        };

        this.handleFirstRequest = function () {
            return '<!DOCTYPE html>'
                + '<html>'
                    + '<head>'
                        + '<script src="/contour"></script>'
                        + '<script src="/app"></script>'
                    + '</head>'
                    + '<body>'
                    + '</body>'
                + '</html>';
        };

        this.handleContourRequest = function () {
            return 'TODO contour.toClientScript()';
        };

        this.handleAppRequest     = function () {
            return 'TODO app.toClientScript()';
        };

        this.handleOtherRequest = function (request) {
            return JSON.stringify(request);
        };
    }

    return ResponseHandler;
} (require(__dirname + '/../Http/AbstractResponseHandler.js')));