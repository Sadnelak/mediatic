angular.module('mediatic', ['ngRoute', 'login', 'adherent', 'media', 'emprunt']);

angular
	.module('mediatic')
	.config(function($routeProvider,$httpProvider){

		
		$httpProvider.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
		$routeProvider.otherwise('/login');
		
		
	});