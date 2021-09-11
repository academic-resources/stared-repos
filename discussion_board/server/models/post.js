// post model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//=======================================================
//PostSchema
//=======================================================
var PostSchema = new mongoose.Schema({
	content: {type: String, trim: true},
	topic_id: {type: String, trim: true}, // should this instead be a reference to topics table?
	author: {type: String, trim: true},
	up_votes: {type: Number},
	down_votes: {type: Number},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

mongoose.model('Post', PostSchema);
PostSchema.path('content').required(true, "Post content field is required");