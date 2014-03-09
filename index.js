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
  } else {

      return true;
  }
};
var Contour          = {},
    requireDirectory = require('require-directory');

Contour = requireDirectory(module, __dirname, check);

module.exports = Contour;
