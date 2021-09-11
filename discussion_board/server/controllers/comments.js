// comments controller (Server side)
// routes get processed here, use comment model (instance of Schema) to query database
// http response from DB is sent as pure JSON to appropriate front end factory
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

module.exports = (function() 
{
	return {
		addComment: function(req, res)
		{
			var comment = new Comment(req.body);
			comment._post = req.body.post_id;
			comment.save(function(err, comment)
			{
				if(err)
				{
					res.json({status:'failed', err:err})
				}
				else 
				{
					Post.findOne({_id: req.body.post_id}, function(err, Post)
					{
						console.log('this is Post:', Post);
						Post.comments.push(comment._id)
						Post.save(function(err, post)
						{
							if(err)
	  						{
	  							res.json({status:'failed', err:err})
	  						}
	  						else
	  						{
  								// res.json({status:'success'})
			  					User.update({username: req.body.author}, {$inc: { comments: 1 }}, {multi: true}, function(err1, record1)
					  			{
					  				if(err)
					  				{
					  					res.json({status:'failed', err:err1})
					  				}
					  				else
					  				{
					  					res.json({status:'success'})
					  				}
					  			})
	  						}
						})
					})
				}
			})
		},
		getCommentsByPostId: function(req, res)
		{
			console.log('posts controll', req.params.id);
			Comment.find({ _post: req.params.id}, function(err, results){
				if(err) {
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		getTopicById: function(req, res)
		{
			console.log('server control', req.params.id);
			Topic.find({ _id: req.params.id}, function (err, results) {
				if (err){
					console.log('ERR');
				} else {
					res.json(results);
				}
			})
		}
	}
})();