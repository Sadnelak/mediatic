angular.module('adherent', ['ngRoute']);

angular.module('adherent').config(function($routeProvider){
	
	$routeProvider.when('/creation_adherent', {
		controller : 'CreationAdherentCtrl',
		templateUrl : 'partials/creation_adherent.html'
	});
	$routeProvider.when('/recherche_adherent', {
		controller : 'RechercheAdherentCtrl',
		templateUrl : 'partials/recherche_adherent.html'
	});
	$routeProvider.when('/visualisation_adherent', {
		controller : 'VisualisationAdherentCtrl',
		templateUrl : 'partials/visualisation_adherent.html'
	});
	
	
});