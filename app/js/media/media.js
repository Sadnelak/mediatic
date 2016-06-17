angular.module('media',['ngRoute']);

angular.module('media').config(function($routeProvider){
	
	$routeProvider.when('/creation_media',{
		controller : 'CreationMediaCtrl',
		templateUrl : 'partials/creation_media.html'
	});
	$routeProvider.when('/recherche_media',{
		controller : 'RechercheMediaCtrl',
		templateUrl : 'partials/recherche_media.html'
	});
	$routeProvider.when('/visualisation_media',{
		controller : 'VisualisationMediaCtrl',
		templateUrl : 'partials/visualisation_media.html'
	});
	
	
//	$routeProvider.when('/creationMedia',{
//		controller : ('CreationMediaCtrl'),
//		templateURL : ('partials/creation_media.html')
//	});
//	$routeProvider.when('/rechercheMedia',{
//		controller : ('RechercheMediaCtrl'),
//		templateURL : ('partials/recherche_media.html')
//	});
//	$routeProvider.when('/visualisationMedia',{
//		controller : ('VisualisationMediaCtrl'),
//		templateURL : ('partials/visualisation_media.html')
//	});
});

//
//
//$routeProvider.when('/creation_adherent', {
//	controller : 'CreationAdherentCtrl',
//	templateUrl : 'partials/creation_adherent.html'
//});
//$routeProvider.when('/recherche_adherent', {
//	controller : 'RechercheAdherentCtrl',
//	templateUrl : 'partials/recherche_adherent.html'
//});
//$routeProvider.when('/visualisation_adherent', {
//	controller : 'VisualisationAdherentCtrl',
//	templateUrl : 'partials/visualisation_adherent.html'
//});