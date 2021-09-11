// users controller (Server side)
// routes get processed here, use User model (instance of Schema) to query database
// http response from DB is sent as pure JSON to appropriate front end factory

var mongoose = require('mongoose');
// piping User Model
var User = mongoose.model('User');
// controller
module.exports = (function()
{
	return {
		checkUserExists: function(req, res)
		{
			User.find({username: req.params.any}, function(err, results)
			{
				if(err)
				{
					console.log(err);
					console.log('none found');
				}
				else
				{
					res.json(results);
					console.log(results);
					console.log('found 1');
				}
			}).limit(1)
		},
		addUser: function(req, res)
		{
			var user = new User(req.body); // create user of type User so now it can call mongo methods on db for error checking
			user.save(function(err, record){
				if(err)
				{
					console.log(err);
					res.json({status: 'failed', err:err}); // send error message back to front end as pure json
				}
				else
				{
					res.json({status: 'success'}); // send success message back to front end as json
				}
			});
		},
		showUser: function(req, res)
		{
			User.find({username: req.params.any}, function(err, results){
				if(err)
				{
					console.log(err);
					res.json({status: 'failed', err:err});
				}
				else
				{
					res.json(results);
				}
			});
		}
	}
})();