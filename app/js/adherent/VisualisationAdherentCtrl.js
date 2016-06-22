(function(){
	'use strict';

	angular.module('adherent').controller('VisualisationAdherentCtrl', 
		['$scope',
		 '$routeParams',
		 'RequeteAdherent',
		 function($scope, $routeParams, RequeteAdherent){
			
			if($scope.isConnected){
				$scope.modifierOK = false;
				
				RequeteAdherent.getAAccession($routeParams.ref).then(
					function(resultat){
						$scope.adherent = resultat;
						console.log('Date naissance',resultat.date_naissance);
						console.log(typeof(resultat.date_naissance));
						var maDate = new Date(resultat.date_naissance);
						console.log('Date naissance (vraie date)',maDate,typeof(maDate));
						$scope.adherent.dateNaissance=maDate.getDate()+"-"+(maDate.getMonth()+1) +"-"+maDate.getFullYear();
						console.log($scope.adherent);
					}, function (){
						console.error('Erreur');
					}
				);
				$scope.unlockModifier = function(){
					//verif conncté=admin
					//if verifConnect(){
						console.log('[VisualisationAdherentCtrl] Coucou !');
						$scope.modifierOK = true;
					//}
							//afficher btn sauver
							//enable les input
				}
				$scope.modifier = function(){
					
				}
			}
			
			$scope.sauver = function(){
				var adherentDateNaissance =!(($scope.adherent.date_naissance===undefined)||($scope.adherent.date_naissance==='') ) ;
				var adherentNom =!(($scope.adherent.nom===undefined)||($scope.adherent.nom==='') ) ;
				var adherentPrenom =!(($scope.adherent.prenom===undefined)||($scope.adherent.prenom==='') ) ;
				var evalAdherent = (adherentDateNaissance && adherentNom && adherentPrenom);
				
				if(evalAdherent){
					console.log("good : ",$scope.adherent);
					RequeteAdherent.postAModification($scope.adherent).then(function(result){
						console.log("Super, c'est réussi !");
						console.log("result :", result);
						console.log("result.data :", result.data);
					},function(result){console.log("Aïe aïe aïe, c'est raté !")}
				);
				}else{
					console.log("Evaluation incorrecte !");
				}
			}
			
			
			
		}]);


	
	
	})();
