Contour.ClientScript = {};
Contour.ClientScript.Parser   = require("./Core/ClientScript/Parser.js").getReference();
Contour.ClientScript.Register = new require("./Core/ClientScript/Register.js").getReference()(new Contour.ClientScript.Parser());
Contour.ClientScript.Module   = new require("./Core/ClientScript/Module.js").getReference()(new Contour.ClientScript.Register());

console.log("Contour.ClientScript on!\n");

console.log("\nContour module loading...");
module.exports = requireDir(module, __dirname);
console.log("Contour modules are loaded.\n");