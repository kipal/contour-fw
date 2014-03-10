var check = function(path){
  if (path.match(/node_modules/)) {

      return false;
  } else if (path.match(/\.settings/)) {

      return false;
  } else if(path.match(/.project/)) {

      return false;
  } else if(path.match(/(\.xml)|(\.md)/)) {

      return false;
  } else if(path.match(/\.git.*/)) {

      return false;
  } else if(path.match(/\package\.json/)) {

      return false;
  } else if(path.match(/Util\.js/)) {

      return false;
  } else {

      return true;
  }
};
var Contour          = {
        Core : {
            Util : require(__dirname + '/Contour/Core/Util.js')
        }
    },
    requireDirectory = require('require-directory');

tmpModule = requireDirectory(module, __dirname, check).Contour;

// TODO need outsourcing
function extendDeep(parent, child, force) {
    var toStr = Object.prototype.toString,
        astr = "[object Array]";

    child = child || {};

    force = force || false;

    for (var i in parent) {
        if (undefined !== child[i]) {
            child[i] = extendDeep(parent[i], child[i], force);
        } else if (typeof parent[i] === 'object') {
            child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
            extendDeep(parent[i], child[i]);
        } else {
            child[i] = parent[i];
        }
    }

    return child;
}

Contour = extendDeep(tmpModule, Contour);
//console.log(Contour);

module.exports = Contour;
