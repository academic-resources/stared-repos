//=======================================================
//comment model
//=======================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
	content: {type: String, trim: true},
	_post: {type: Schema.ObjectId, ref: 'Post'},
	author: {type: String, trim: true},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}

});

mongoose.model('Comment', CommentSchema);
CommentSchema.path('content').required(true, 'Comment content field cannot be empty');