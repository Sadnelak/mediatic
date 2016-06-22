(function(){
	'use strict';

	angular.module('adherent').controller('VisualisationAdherentCtrl', 
		['$scope',
		 '$routeParams',
		 'RequeteAdherent',
		 function($scope, $routeParams, RequeteAdherent){
			
			if($scope.isConnected){
				
			
				RequeteAdherent.getAAccession($routeParams.ref).then(
					function(resultat){
						$scope.adherent = resultat;
						console.log($scope.adherent);
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
