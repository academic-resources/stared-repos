//=======================================================
//topicsFactory -- get topic
//=======================================================
App.factory('topicsFactory', function($http)
{
	var factory = {};

	factory.getTopicById = function (id, callback)
	{
		$http.get('/getTopicById/' + id).success(function(output){ callback(output); });
	}

	return factory;
});