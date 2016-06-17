angular.module('media',['ngRoute']);

angular.module('media').config(function($routeProvider){
//	$routeProvider.when('/creationMedia',{
//		controller:('CreationMediaCtrl'),
//		templateURL:('partials/creation_media.html')
//	});
//	$routeProvider.when('/rechercheMedia',{
//		controller:('RechercheMediaCtrl'),
//		templateURL:('partials/recherche_media.html')
//	});
//	$routeProvider.when('/visualisationMedia',{
//		controller:('VisualisationMediaCtrl'),
//		templateURL:('partials/visualisation_media.html')
//	});
	$routeProvider.when('/creation_media',{
		controller:'CreationMediaCtrl',
		templateURL:'partials/creation_media.html'
	});
	$routeProvider.when('/recherche_media',{
		controller:'RechercheMediaCtrl',
		templateURL:'partials/recherche_media.html'
	});
	$routeProvider.when('/visualisation_media',{
		controller:'VisualisationMediaCtrl',
		templateURL:'partials/visualisation_media.html'
	});
});



