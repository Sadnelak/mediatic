angular
		.module('adherent')
		.controller('RechercheAdherentCtrl', 
			['$scope','$window','TriService' ,                              
            function($scope,$window,TriService){
				
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
			$scope.trier = function(cle){
				//console.log(TriService.bonjour(cle));
				TriService.trier(cle,$scope,$scope.listeAdherents);
			}
			
			
			
			//TriService.trier($scope);
			
			/*
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
			}*/
			
			
			/*MAJ variables de recherche*/
			$scope.majVariableRecherche = function(){
				$scope.rechercheNomPrenom = $scope.champNomPrenom;
				$scope.rechercheIdentifiant = $scope.champIdentifiant;
			}
			
			/*Tentative d'accéder à l'ajout*/
			$scope.droits = false;
			$scope.tenterAccesCreation = function(){
				if($scope.droits)
					$window.location.href = "/index.html";
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