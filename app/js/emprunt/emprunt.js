angular.module('emprunt',['ngRoute']);

angular.module('emprunt').config(function($routeProvider){
	
	$routeProvider.when('/emprunt',{
		controller : 'EmpruntCtrl',
		templateUrl : 'partials/emprunt.html'
	});
	
	
	

});