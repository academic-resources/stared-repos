var fileUtils = require ("../build/file-utils");
var File = fileUtils.File;
var SecurityManager = fileUtils.SecurityManager;

/**
 * Default:
 * - CWD: READ and WRITE allowed.
 * - Outside CWD: READ allowed.
 */
var defaultSM = new SecurityManager ();
File.protect (defaultSM);

//CWD
new File ("contains.js").size (function (error, size){
	console.log (size); //Prints: 209 (READ allowed)
});
var f2 = new File ("temp");
f2.removeOnExit (function (error, removed){
	console.log (removed); //Prints: true (WRITE allowed)
});
f2.createNewFile (function (error, created){
	console.log (created); //Prints: true (WRITE allowed)
});

//Outside CWD
var f3 = new File ("../LICENSE");
f3.size (function (error, size){
	console.log (size); //Prints: 1093 (READ allowed)
});
f3.remove (function (error, removed){
	console.log (removed); //Prints: false (WRITE denied)
	console.log (error); //Prints: [Error: Security error, cannot write.]
});