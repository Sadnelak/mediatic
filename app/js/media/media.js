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
	
	

});