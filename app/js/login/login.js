"use strict";
angular.module('login', ['ngRoute']);

angular.module('login').config(function($routeProvider){
	
	$routeProvider.when('/login', {
		controller : 'LoginCtrl',
		templateUrl : 'partials/login.html'
	});
	
});
