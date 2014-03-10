module.exports.module = (function(Module, Extender, Exception) {
    'use strict';

    var ClientScript = function ClientScript() {
        Module.call(this);

        var createModulePattern = function () {

            var params     = function () {
                var params    = this.getParams(),
                    paramStr  = '',
                    lastComma = -1;

                if (!(params instanceof Object)) {
                    throw new Exception.NotObjectException();
                }

                for (var i in params) {
                    paramStr += params[i] + ', ';
                }

                lastComma = paramStr.lastIndexOf(', ');
                if (-1 !== lastComma) {
                    paramStr = paramStr.replaceAt(lastComma, '');
                }

                return paramStr;
            }.apply(this);

            var variableList = function () {
                var paramList = this.getVariableList(),
                    paramStr  = 'var ',
                    lastComma = -1,
                    tmpValue  = {};

                for(var i in paramList) {
                    tmpValue = JSON.stringify(paramList[i]);

                    paramStr += i + ' = ' + tmpValue + ',';
                }

                lastComma = paramStr.lastIndexOf(',');
                if (-1 !== lastComma) {
                    paramStr = paramStr.replaceAt(lastComma, ';');
                }

                return paramStr;
            }.apply(this);

            var functionList = function () {
                return 'var semmi = function semmi () {};';
            }.apply(this);

            var dependencies = function () {
                return '';
            }.apply(this);

            var modulePattern = 'var ' + this.getModuleName() + ' = (function (' + params + ') {'
                + variableList
                + functionList
                + '} (' + dependencies + '));';

            return modulePattern;
        }.bind(this);

        this.toClientScript = function () {
            return createModulePattern();
        };
    };

    ClientScript.prototype.getModuleName = function () {
        throw new Exception.AbstractMethodException("getModuleName");
    };

    ClientScript.prototype.getParams = function () {
        throw new Exception.AbstractMethodException("getParams");
    };

    ClientScript.prototype.getVariableList = function () {
        throw new Exception.AbstractMethodException("getVariableList");
    };

    Extender.extend(ClientScript, Module);


    return ClientScript;
});