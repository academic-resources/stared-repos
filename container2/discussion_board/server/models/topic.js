//=======================================================
//topic model
//=======================================================
var mongoose = require('mongoose');
// Topic Schema
var TopicSchema = new mongoose.Schema({
	title: {type: String, trim: true },
	description: {type: String, trim: true},
	category: {type: String},
	author: {type: String, trim:true},
	posts: {type: Number},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

mongoose.model('Topic', TopicSchema);
TopicSchema.path('title').required(true, "Topic field is required");
TopicSchema.path('description').required(true, "Description field is required");
TopicSchema.path('category').required(true, "Category field is required");