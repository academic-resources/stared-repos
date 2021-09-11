var mongoose = require('mongoose');

var fs = require('fs');

mongoose.connect('mongodb://localhost/FullMean_discussionBoard');

// require all of the model files in the models folder
var models_path = __dirname + "/../models";

//=======================================================
//check models path, connects all model files ending in.js
//=======================================================
fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('js') > 0) {
		require(models_path + '/' + file);
	}
});
