angular.module('mediatic', ['ngRoute', 'login', 'adherent', 'media']);

angular
	.module('mediatic')
	.config(function($routeProvider,$httpProvider){
		
		$httpProvider.defaults.headers.post['content-Type']=undefined;
		$routeProvider.otherwise('/login');

		
	});