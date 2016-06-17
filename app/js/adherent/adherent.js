angular.module('adherent', ['ngRoute']);

angular.module('adherent').config(function($routeProvider){
	
	$routeProvider.when('/creation_adherent', {
		controller : 'AdherentCtrl',
		templateUrl : 'partials/creation_adherent.html'
	});
	$routeProvider.when('/recherche_adherent', {
		controller : 'AdherentCtrl',
		templateUrl : 'partials/recherche_adherent.html'
	});
	$routeProvider.when('/visualisation_adherent', {
		controller : 'AdherentCtrl',
		templateUrl : 'partials/visualisation_adherent.html'
	});
	
	
});