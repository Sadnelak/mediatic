angular.module('media').controller('VisualisationMediaCtrl', 
	['$scope',
	 '$routeParams',
	 'RequeteMedia',
	 function($scope, $routeParams, RequeteMedia){
		
		$scope.maFct=function(){
			return RequeteMedia.getMAccession($routeParams.ref).then(
				function(resultat){
					$scope.media = resultat.data;
				}, function (){
					console.error('Erreur');
				}
			);
		};
	}]);