// app.js has discussion board module
var App = angular.module('myApp', ['ngRoute']);

App.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		title: "Login and Registration",
		templateUrl: 'partials/discussion/login.html'
	})
	.when('/dashboard', {
		title: "Main Dashboard",
		templateUrl: 'partials/discussion/dashboard.html'
	})
	.when('/topic/:id', {
		title: "Topic",
		templateUrl: 'partials/discussion/topic.html'
	})
	.when('/user/:id', {
		title: "User Profile",
		templateUrl: 'partials/discussion/user.html'
	})
	.otherwise({
		redirectTo: '/'
	})

}]);

/*App.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);*/