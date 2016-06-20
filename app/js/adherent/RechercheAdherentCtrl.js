angular
		.module('adherent')
		.controller('RechercheAdherentCtrl', function($scope){
			
			/*Données adhérents*/
			$scope.listeAdherents=[
			    {identifiant:'IceWizard',
			     nomPrenom:'Joubert Brian',
			     dateNaissance:'1984-09-20',
			     aJourCotis:false,
			     nbMedias:2},                   
			    {identifiant:'ChocophileBenj',
			     nomPrenom:'Chauvet Benjamin',
			     dateNaissance:'1992-06-16',
			     aJourCotis:true,
			     nbMedias:0},
			    {identifiant:'Patriiick',
			     nomPrenom:'Bruel Patrick',
			     dateNaissance:'1959-05-14',
			     aJourCotis:false,
			     nbMedias:3},
			     {identifiant:'FelixLeChat',
			     nomPrenom:'Clarté Felix',
			     dateNaissance:'1988-03-23',
			     aJourCotis:false,
			     nbMedias:1},
			     {identifiant:'Nihalee',
			     nomPrenom:'Nihal Nidalee',
			     dateNaissance:'2013-06-18',
			     aJourCotis:true,
			     nbMedias:5},
			     {identifiant:'DaronCameroun',
			     nomPrenom:'Song Alexandre',
			     dateNaissance:'1987-09-09',
			     aJourCotis:false,
			     nbMedias:4},
			     {identifiant:'UltimateWind',
			     nomPrenom:'Freewind Rina',
			     dateNaissance:'2010-06-15',
			     aJourCotis:true,
			     nbMedias:8}
			];
			
			/*Cotisation*/
			$scope.chaineAJourCotis = function(adherent){
				if (adherent.aJourCotis == true)
					return "Oui";
				else
					return "Non";
			};
			
			/*Tri*/
			$scope.cleStockee='';
			
			$scope.triCle = function(cle,desc){
				return function(a,b){
					return desc ? ~~(a[cle] < b[cle]):
								 ~~(a[cle] > b[cle]);
				};
			}
	
			$scope.trier = function(cle){
				if ($scope.cleStockee == cle){
					$scope.listeAdherents.sort($scope.triCle(cle,true));
					$scope.cleStockee = '';
					return;
				}
				else{
					$scope.listeAdherents.sort($scope.triCle(cle,false));
					$scope.cleStockee = cle;
				}
			}
			
			/*MAJ variables de recherche*/
			$scope.majVariableRecherche = function(){
				$scope.rechercheNomPrenom = $scope.champNomPrenom;
				$scope.rechercheIdentifiant = $scope.champIdentifiant;
			}
			
			
				
				
		
			
			
		});