angular
		.module('adherent')
		.controller('RechercheAdherentCtrl', 
			['$scope','$window','$location','TriService','RequeteAdherent' ,                              
            function($scope,$window,$location,TriService,RequeteAdherent){
				
			if($scope.isConnected){
				
				console.log("[RechercheAdherentCtrl]");
				//Remarque : code repris de RechercheMedia et transformé.  
				RequeteAdherent.getARechercheT().then(
						function(taille){
							RequeteAdherent.getARecherche().then(
								function(data){
									var tableau = [];
									for(var i = 0; i < taille; i++){
										//splitter = data[i].date_naissance.split("T");
										tableau.push({
											id:''+data[i].id,
											nom:data[i].nom,
											prenom:data[i].prenom,
											dateNaissance:(data[i].date_naissance.split("T"))[0],//splitter[0],
											aJourCotis:true,
											nbMedias:0
										});
									}
									$scope.listeAdherents = tableau;
								},function(reason){
									console.log('Echec insertion données !');
								});		
						},function(reason){
							console.log('Taille indisponible !');
						}
					);
				
				/*Cotisation*/
				$scope.chaineAJourCotis = function(adherent){
					if (adherent.aJourCotis == true)
						return "Oui";
					else
						return "Non";
				};
			}				
			
			
			/*Tri*/
			$scope.cleStockee='';
			$scope.trier = function(cle){
				TriService.trier(cle,$scope,$scope.listeAdherents);
			}
			
			/*MAJ variables de recherche*/
			$scope.majVariableRecherche = function(){
				$scope.rechercheNom = $scope.champNom;
				$scope.rechercheIdentifiant = $scope.champIdentifiant;
			}
			
			/*Tentative d'accéder à l'ajout*/
			$scope.droits = true;
			$scope.tenterAccesCreation = function(){
				if($scope.droits)
					$location.path('/creation_adherent');
				else
					console.log('Vous n\'avez pas les droits pour ajouter un nouvel adhérent.');
			}
			
		}]).filter('startsWith',function(){
			return function(input,pseudo){
				if(input===undefined){
					return undefined;
				}
				return input.filter(function(adherent){
					return (pseudo === undefined) || (adherent.identifiant.match(new RegExp("^"+pseudo,'i'))); //'^'+
				});
			}
		});