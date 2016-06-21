(function(){
'use strict';

angular.module('media').controller('VisualisationMediaCtrl', 
	['$scope',
	 '$routeParams',
	 'RequeteMedia',
	 function($scope, $routeParams, RequeteMedia){
		
		if($scope.isConnected){
			
		
			RequeteMedia.getMAccession($routeParams.ref).then(
				function(resultat){
					$scope.media = resultat;
					console.log($scope.media);
				}, function (){
					console.error('Erreur');
				}
			);
			$scope.unlockModifier = function(){
				//verif conncté=admin
						//afficher btn sauver
						//enable les input
				
				
			}
		}
	}]);

})();
