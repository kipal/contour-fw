module.exports = new Contour.ClientScript.Module(
    function () {
        'use strict';

        function Util () {
            String.prototype.repeat = function(n) {
                return new Array(n + 1).join(this);
            };
        };

        Util.isEmpty = function (o) {
            for (var key in o) {
                if (o.hasOwnProperty(key)) {

                    return false;
                }
            }

            return true;
        };

        Util.deepExtend = function (child, parent) {
            for (var i in parent) {
                if (parent.hasOwnProperty(i)) {
                    if ('object' === typeof parent[i]) {

                        if ('[object Array]' === parent[i].toString()) {
                            child[i] = [];
                        } else {
                            child[i] = {};
                        }

                        child[i].deepExtend(parent[i]);
                    } else {
                        child[i] = parent[i];
                    }
                }
            }
        };

        Util.lateBind = function (key, value, o) {
            if (undefined === o) {
                o = this;
            }

            if (!o.hasOwnProperty(key)) {
                o[key] = value;
            }
        };


        return Util;
    }
).out({"name" : "Core.Util"}).signUp();