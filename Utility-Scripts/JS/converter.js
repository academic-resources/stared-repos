#!/usr/bin/env node

/*

Developer: Anuraag Baishya
Created on: 23rd July 2016
Converts Markdown file to HTML file using node.js and showdown.js

*/

var path = require("path"), fs = require("fs"), showdown = require("showdown");
var dirname = process.argv[3] + "/Converted" + (parseInt(Math.random() * 234, 10));
fs.mkdirSync(dirname);

function convert(startPath){	

	if(!fs.existsSync(startPath)){

		console.log(startPath, "doesn't exist");
		return;
	}
	var files = fs.readdirSync(startPath);
	for(var i = 0; i < files.length; i++){

		var filename = path.join(startPath, files[i]);
		var stat = fs.lstatSync(filename);
		if(stat.isDirectory()){

			convert(filename);
		}

		else if(filename.indexOf(".md") >= 0){

			var text = fs.readFileSync(filename, "utf-8");
			var converter = new showdown.Converter();
			var md = converter.makeHtml(text);
			var outputf = filename.split("/").slice(-2).join("/");
			outputf = outputf.replace("/","_");
			outputf = outputf.replace(".md","");
			fs.writeFileSync(dirname + "/" + outputf, md, "utf-8");
		}
	}

}

convert(process.argv[2]);