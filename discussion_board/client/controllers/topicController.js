//=======================================================
//client side: topicsController
//=======================================================
App.controller('topicsController', function($scope, $routeParams, topicsFactory, postsFactory, commentsFactory)
{
	//need to set a cookie to keep track of the user logged in

	//=======================================================
	//FUNCTION TO SET COOKIE (from w3schools)
	//http://www.w3schools.com/js/js_cookies.asp
	//=======================================================
	function setCookie(cname, cvalue, exdays)
	{
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	//=======================================================
	//The parameters of the function above are the name of the cookie (cname), 
	//the value of the cookie (cvalue), and the number of days until the cookie should expire (exdays).
	//The function sets a cookie by adding together the cookiename, the cookie value, and the expires string.
	//=======================================================

	//=======================================================
	//FUNCTION TO GET COOKIE (from w3schools)
	//http://www.w3schools.com/js/js_cookies.asp
	//=======================================================
	function getCookie(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++)
		{
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
		return "";
	}
	//=======================================================
	//Take the cookiename as parameter (cname).
	//Create a variable (name) with the text to search for (cname + "=").
	//Split document.cookie on semicolons into an array called ca (ca = document.cookie.split(';')).
	//Loop through the ca array (i=0;i<ca.length;i++), and read out each value c=ca[i]).
	//If the cookie is found (c.indexOf(name) == 0), return the value of the cookie (c.substring(name.length,c.length).
	//If the cookie is not found, return "".
	//=======================================================

	//=======================================================
	//FUNCTION TO CHECK COOKIE (from w3schools)
	//http://www.w3schools.com/js/js_cookies.asp
	//=======================================================
	function checkCookie()
	{
		var username=getCookie("username");
		if (username!="")
		{
			return username;
		}
		else 
		{
			window.location.assign("/");
			console.log('no cookie');
		}
		// else
		// {
		// 	username = prompt("Please enter your name:", "");
		// 	if (username != "" && username != null)
		// 	{
		// 		setCookie("username", username, 30);
		// 	}
		// }
	}
	//=======================================================
	//The parameters of the function above are the name of the cookie (cname), 
	//the value of the cookie (cvalue), and the number of days until the cookie should expire (exdays).
	//The function sets a cookie by adding together the cookiename, the cookie value, and the expires string.
	//=======================================================
	
	var user = checkCookie();

	$scope.topicdata = [];
	console.log($routeParams.id);
	var id = $routeParams.id;
	var getTopic = function(id)
	{
		topicsFactory.getTopicById(id, function(data)
		{
			$scope.topicdata= data;
		});
	}

	getTopic(id);

	$scope.posts = [];

	var getPostListById = function(id)
	{
		postsFactory.getPostsById(id, function(data)
		{
			$scope.posts = data;
			console.log($scope.posts);
			$scope.comments = [];

			function getCommentListByPostId(id)
			{
				commentsFactory.getCommentsByPostId(id, function(data)
				{
					$scope.comments[id] = data;
					console.log('hey', $scope.comments[id][0]);
				})
			}
			console.log('what is len', $scope.posts.length);

			// var counter = [];
			for (var i=0; i < $scope.posts.length; i++)
			{
				$scope.comments[$scope.posts[i]._id] = [];
				getCommentListByPostId([$scope.posts[i]._id]);
				// console.log($scope.posts[i]._id);
				// console.log($scope.posts[i].comments);
				// counter.push(getCommentListByPostId($scope.posts[i]._id));
			}

			/*
			for (var i=0; i < $scope.posts.length; i++)
			{
				$scope[comment[i]] = [];
			}
			var getCommentListByPostId = function(id, i)
			{
				var i = i;
				commentsFactory.getCommentsByPostId(id, function(data)
				{
					$scope[comment[i]] = data;
				})
			}
			for (var i=0; i < $scope.posts.length; i++)
			{
				getCommentListByPostId($scope.posts[i], i);
			}*/
		})
	}
			

	getPostListById(id);

	// for (var i in $scope.posts)
	// {
	// 	for (var j in $scope.posts[i].comments)
	// 	{
	// 		$scope.posts[i].comments[j]
	// 	}
	// }

	// $scope.comments = [];

	
	

	$scope.logout = function() 
	{
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		window.location.assign("/");
		console.log('logging out');
	}

	$scope.addPost = function()
	{
		console.log($scope.newPost);
		console.log('this is id', id);
		$scope.newPost.topic_id = id;
		$scope.newPost.author = user;
		$scope.newPost.up_votes = 0;
		$scope.newPost.down_votes = 0;
		postsFactory.addPost($scope.newPost, function(){
			getPostListById(id);
		})
	}
	$scope.newComment = {};
	$scope.addComment = function(post_id, $index)
	{
		console.log($scope.newComment[$index]);
		$scope.newComment[$index].author = user;
		$scope.newComment[$index].post_id = post_id;
		commentsFactory.addComment($scope.newComment[$index], function(){
			getPostListById(id);
		})
	}

	$scope.upVote = function(post_id)
	{
		console.log('topics controller up vote', post_id)
		postsFactory.upVotePost(post_id, function(){
			
		});
	}

});
