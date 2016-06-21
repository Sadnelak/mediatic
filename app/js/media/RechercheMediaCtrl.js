angular.module('media').controller('RechercheMediaCtrl', 
	['$scope',
	 '$window','$location','TriService','RequeteMedia', 
	 function($scope, $window,$location, TriService,RequeteMedia){
		
		$scope.listeMedias = [];
		
		var taille = 0;
		console.log('Avant toute requête, taille = '+taille);
		
		RequeteMedia.getMRechercheT().then(
			function(taille){
				RequeteMedia.getMRecherche().then(
					function(data){
						var tableau = [];
						for(var i = 0; i < taille; i++){
							//console.log(data[i].titre+" "+data[i].auteur+" "+data[i].type);
							tableau.push({
								titre:data[i].titre,
								auteur:data[i].auteur,
								type:data[i].type,
								id:i,
								emprunteurs:[''],
								dateRetour:'2001-01-01'});
						}
						$scope.listeMedias = tableau;
					},function(reason){
						console.log('Echec insertion données !');
					})
			},function(reason){
				console.log('Taille indisponible !');
			}
		);
			
		/*Tri*/
		$scope.cleStockee='';
		$scope.trier = function(cle){
			TriService.trier(cle,$scope,$scope.listeMedias);
		}
			
		/*MAJ variables de recherche*/
		$scope.majVariableRecherche = function(){
			$scope.rechercheAuteur = $scope.champAuteur;
			$scope.rechercheTitre = $scope.champTitre;
			$scope.rechercheType = $scope.selectType;
		}
		
		/*Tentative d'accéder à l'ajout*/
		$scope.droits = true;
		$scope.tenterAccesCreation = function(){
			if($scope.droits)
				$location.path('/creation_media');
			else
				console.log('Vous n\'avez pas les droits pour ajouter un nouveau média.');
		}
		
		
	}]);