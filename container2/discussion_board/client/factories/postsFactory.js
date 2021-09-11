//=======================================================
//postsFactory -- get posts
//=======================================================
App.factory('postsFactory', function($http)
{
	var factory = {};

	factory.getPostsById = function (id, callback)
	{
		console.log(id);
		$http.get('/getPostsById/' + id).success(function(output){ callback(output); });
	}

	factory.addPost = function(data, callback)
	{
		console.log('in factory');
		$http.post('/addPost', data).success(function(output){ callback(output); });
	}

	factory.upVotePost = function(data, callback)
	{
		console.log('in factory for up_vote', data);
		$http.post('/upVotePost/' + data).success(function(output) {callback(output); });
	}

	return factory;
});