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
Contour.ClientScript = {};
Contour.ClientScript.Parser     = require("./Core/ClientScript/Parser.js").getReference();
Contour.ClientScript.DepChecker = require("./Core/ClientScript/DepChecker.js").getReference();
Contour.ClientScript.Register   = require("./Core/ClientScript/Register.js").getReference()(new Contour.ClientScript.Parser(), Contour.ClientScript.DepChecker);
Contour.ClientScript.Module     = require("./Core/ClientScript/Module.js").getReference()(new Contour.ClientScript.Register("Contour"));


console.log("Contour.ClientScript on!\n");

console.log("\nContour module loading...");
module.exports = requireDir(module, __dirname);
console.log("Contour modules are loaded.\n");
