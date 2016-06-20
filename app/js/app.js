angular.module('mediatic', ['ngRoute', 'login', 'adherent', 'media']);

angular
	.module('mediatic')
	.config(function($routeProvider,$httpProvider){

		
		$httpProvider.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
		$routeProvider.otherwise('/login');
		
		
	});