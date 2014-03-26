module.exports = new Module(
    function () {
        'use strict';

        function Util () {
            this.extendDeep = function (parent, child, force) {
                var toStr = Object.prototype.toString,
                astr = "[object Array]";

                child = child || {};

                force = force || false;

                for (var i in parent) {
                    if (undefined !== child[i] && !force) {
                        child[i] = this.extendDeep(parent[i], child[i], force);
                    } else if (typeof parent[i] === 'object') {
                        child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
                        this.extendDeep(parent[i], child[i]);
                    } else {
                        child[i] = parent[i];
                    }
                }

                return child;
            };

            this.include = function (moduleName) {
                moduleName = moduleName.split('.');
            };
        };

        return new Util();
    }
);