angular.module('adherent', ['ngRoute']);

angular.module('adherent').config(function($routeProvider){
	
	$routeProvider.when('/adherent', {
		controller : 'AdherentCtrl',
		templateUrl : 'partials/adherent.html'
	});
	
});