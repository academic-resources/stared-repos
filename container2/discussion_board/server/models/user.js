//=======================================================
//user model
//=======================================================
var mongoose = require('mongoose');
var validate = require('mongoose-validator');

// custom name validator
var nameValidator = [
	validate({
		validator: 'isLength',
		arguments: [4],
		message: 'Name should be at least 4 characters'
	})
];

// User Schema
var UserSchema = new mongoose.Schema({
	username: 
	{
		type: String,
		trim: true, // trims whitespace from entry
		validate: nameValidator
	},

	topics: 
	{
		type: Number,
		trim: true
	},

	posts: 
	{
		type: Number,
		trim: true
	},

	comments: 
	{
		type: Number,
		trim: true
	},

	created_at: { type: Date, default: Date.now},
	updated_at: { type: Date, default: Date.now}
});

mongoose.model('User', UserSchema);
UserSchema.path('username').required(true, 'Username field is required!');