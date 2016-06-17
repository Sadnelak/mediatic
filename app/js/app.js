angular.module('mediatic', ['ngRoute', 'login', 'adherent', 'media']);

angular
	.module('mediatic')
	.config(function($routeProvider){
		
		$routeProvider.otherwise('/login');

		
	});