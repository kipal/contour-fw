module.exports = (function (AbstractResponseHandler) {
    'use strict';

    function Response(header, body) {
        this.header = header;

        this.body   = body;
    }

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
            return new Response(
                {
                    "Content-Type" : "text/html"
                },
                '<!DOCTYPE html>'
                    + '<html>'
                        + '<head>'
                            + '<script src="/contour"></script>'
                            + '<script src="/app"></script>'
                        + '</head>'
                        + '<body>'
                        + '</body>'
                    + '</html>'
            );
        };

        this.handleContourRequest = function () {
            return new Response(
                    {
                        "Content-Type" : "application/javascript"
                    },
                    Contour.Core.ClientScript.Register.printAll()
            );
        };

        this.handleAppRequest     = function () {
            return new Response(
                    {
                        "Content-Type" : "application/javascript"
                    },
                    // Ez nem túl dinamikus így
                    Contour.currentService().ClientScript.Register.printAll()
            );
        };

        this.handleOtherRequest = function (request) {
            return JSON.stringify(
                new Response(
                        {
                            "Content-Type" : "application/javascript"
                        },
                        request
                )
            );
        };
    }

    return ResponseHandler;
} (require(__dirname + '/../Http/AbstractResponseHandler.js')));