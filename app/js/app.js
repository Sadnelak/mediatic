angular.module('mediatic', ['ngRoute']);

angular
	.module('mediatic')
	.config(function($routeProvider){
		
		$routeProvider.otherwise('/loggin');

		
	});