angular.module('media',[]);

angular.module('media').config(function($routeProvider){
	$routeProvider.when('/creationMedia'){
		controller:('CreationMediaController'),
		templateURL('partials/creationMedia.html')
	};
	$routeProvider.when('/rechercheMedia'){
		controller:('RechercheMediaController'),
		templateURL('partials/rechercheMedia.html')
	};
	$routeProvider.when('/visualisationMedia'){
		controller:('VisualisationMediaController'),
		templateURL('partials/visualisationMedia.html')
	};
)