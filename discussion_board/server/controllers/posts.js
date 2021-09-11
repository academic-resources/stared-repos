// posts controller (Server side)
// routes get processed here, use post model (instance of Schema) to query database
// http response from DB is sent as pure JSON to appropriate front end factory
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');

module.exports = (function()
{
	return {
		addPost: function(req, res)
		{
			var post = new Post(req.body);
			post.save(function(err, record){
				if(err)
				{
					res.json({status: 'failed', err:err});
				}
				else
				{
					User.update({username: req.body.author}, {$inc: {posts: 1}}, {multi: true}, function(err1, record1)
					{
						if(err)
						{
							res.json({status: 'failed', err: err1});
						}
						else
						{
							Topic.update({_id: record.topic_id}, {$inc: {posts: 1}}, {multi: true}, function(err2, record2)
							{
								if(err)
								{
									res.json({status: 'failed', err: err2});
								}
								else
								{
									res.json({status: 'success'});
								}
							});
						}
					});
				}
			});
		},
		getPostsById: function(req, res)
		{
			console.log('posts controller', req.params.id);
			Post.find({ topic_id: req.params.id}, function(err, results){
				if(err) {
					console.log(err);
				} else {
					results.reverse();
					res.json(results);
				}
			});
		},
		getTopicById: function(req, res)
		{
			console.log('server control', req.params.id);
			Topic.find({ _id: req.params.id}, function (err, results) {
				if (err){
					console.log(err);
				} else {
					res.json(results);
				}
			});
		},
		upVotePost: function(req, res)
		{
			console.log(req.params.id);
			console.log('ready to upvote');
			Post.update({_id: req.params.id}, {$inc: { up_votes: 1}}, function(err, results)
			{
				if (err)
				{
					console.log(err);
					res.json({status: 'failed', err: err})
				}
				else 
				{
					res.json(results);	
				}
			});
		}
	}
})();
	
