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
				//if verifConnect(){
					console.log('[VisualisationMediaCtrl] Coucou !');
					$scope.modifierOK = true;
				//}
						//afficher btn sauver
						//enable les input
			}
			
			$scope.sauver = function(){
				var oeuvreType =!(($scope.media.type===undefined)||($scope.media.type==='') ) ;
				var oeuvreTitre =!(($scope.media.titre===undefined)||($scope.media.titre==='') ) ;
				var oeuvreAuteur =!(($scope.media.auteur===undefined)||($scope.media.auteur==='') ) ;
				var evalOeuvre = (oeuvreAuteur && oeuvreTitre && oeuvreType);
				//var evalOeuvre = true;
				
				if(evalOeuvre){
					console.log("good : ",$scope.media);
					RequeteMedia.postMModification().then(function(result){
						console.log("Super, c'est réussi !");
						console.log("result :", result);
						console.log("result.data :", result.data);
					},function(result){console.log("Aïe aïe aïe, c'est raté !")}
				);
				}else{
					console.log("Evaluation incorrecte !",$scope.media,' - type',$scope.media.type,' - titre',$scope.media.titre,' - auteur',$scope.media.auteur);
				}
			}
		}
	}]);

})();
