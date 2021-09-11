// client-side dashboard controller
App.controller('dashboardController', ['$scope', 'dashboardFactory', function($scope, dashboardFactory)
{
	//need to check for cookie to keep track of the user logged in
	//and then need to provide a way to logout and destroy the cookie

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
		if (username == "")
		{
			window.location.assign("/#/login");
			// redirectTo('/dashboard');
		}
		else 
		{
			console.log('cookie found ', username);
			$('#current_user').text(username);
			return username;
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
	
	var user = checkCookie();
	$scope.topics = [];

	var getTopicList = function()
	{
		dashboardFactory.getTopic(function(data){
			$scope.topics = data;
		});
	}

	getTopicList();

	$scope.logout = function()
	{
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		window.location.assign("/");
		console.log("logging out");
	}

	$scope.addTopic = function()
	{
		console.log('dash-controller, addtopic function reached');
		$scope.newTopic.author = user;
		$scope.newTopic.posts = 0;
		dashboardFactory.addTopic($scope.newTopic, function()
		{
			getTopicList();
		});
	}

	$scope.showUser = function(user)
	{
		console.log('in show user');
		dashboardFactory.showUser(user, function()
		{
			window.location.assign("#/user/:id");
		});
	}

	$scope.newUser = {};
}]);