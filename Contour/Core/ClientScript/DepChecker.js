module.exports = new Module(
    function () {
        function DepChecker() {
            var dependencyArray = [];

            this.setDeps = function (depsObj) {
                dependencyArray = depsObj;
            };

            this.sort = function () {
                sortDeps();

                return dependencyArray;
            };

            var sortDeps = function () {
                for (var i = 0; i < dependencyArray.length; i++) {
                    if (0 == dependencyArray[i].dep.length) {
                        continue;
                    }

                    var rightIndex = searchIndexAfterDeps(dependencyArray[i].dep);

                    if (i >= rightIndex) {
                        continue;
                    }

                    dependencyArray = putRightPlace(i, rightIndex, dependencyArray[i]);

                    i--;
                }
            };

            var putRightPlace = function (i, rightIndex, element) {
                dependencyArray.splice(i, 1);

                var firstPart = dependencyArray.slice(0, rightIndex),
                    lastPart  = dependencyArray.slice(rightIndex, dependencyArray.length);

                firstPart.push(element);

                return firstPart.concat(lastPart);
            };

            var searchIndexAfterDeps = function (currentDeps) {
                var maxIndex = 0;

                for (var i = 0; i < currentDeps.length; i++) {

                    for (var j = 0; j < dependencyArray.length; j++) {
                        if (currentDeps[i] == dependencyArray[j].module && maxIndex < j) {
                            maxIndex = j;
                        }
                    }
                }

                return maxIndex;
            }
        }

        return DepChecker;
    }
);