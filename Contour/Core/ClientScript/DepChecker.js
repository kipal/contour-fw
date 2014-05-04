/*******************************************************************************
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Nándor Kiss
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/
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
