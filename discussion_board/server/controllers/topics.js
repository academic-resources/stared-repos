// topics controller (Server side)
// routes get processed here, use topic model (instance of Schema) to query database
// http response from DB is sent as pure JSON to appropriate front end factory
var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

module.exports = (function() 
{
	return {
		addTopic: function(req, res)
		{
			var topic = new Topic(req.body);
  			topic.save(function(err, record){
  				if(err)
  				{
  					res.json({status:'failed', err:err})
  				}
  				else
  				{
  					// res.json({status:'success'})
  					User.update({username: req.body.author}, {$inc: { topics: 1 }}, {multi: true}, function(err1, record1)
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
		},
		getTopic: function(req, res)
		{
			Topic.find({}, function(err, results){
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