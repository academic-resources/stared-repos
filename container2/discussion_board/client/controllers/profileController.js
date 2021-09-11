//=======================================================
//client side: profileController
//=======================================================
App.controller('profileController', function($scope, $routeParams, usersFactory)
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
	
	// var user = checkCookie();

	$scope.userdata = [];
	console.log($routeParams.id);
	var id = $routeParams.id;
	var getUser = function(id)
	{
		usersFactory.getUser(id, function(data)
		{
			$scope.userdata = data;
		});
	}

	getUser(id);

});