var blacklist = /.project|.md$|.*\.git.*|.*\.settings.*|.*node_modules.*/;
var requireDirectory = require('require-directory')
    Contour          = {};


module.exports = requireDirectory(module, __dirname, blacklist);
