'use strict';

angular
.module('adherent')
.controller('CreationAdherentCtrl', function($scope){


			//$scope.adherent={};


			$scope.ajoutAdherent = function(){
				console.log($scope.adherent);
			};
			

			$scope.calculAge = function(){
				if ($scope.adherent != undefined && $scope.adherent.dateNaissance!= undefined){

					$scope.verif($scope.adherent.dateNaissance);

					if ($scope.adherent.dateNaissance.annee!=undefined && $scope.adherent.dateNaissance.mois!=undefined && $scope.adherent.dateNaissance.jour!=undefined){

						var dateNaissance = new Date($scope.adherent.dateNaissance.annee,$scope.adherent.dateNaissance.mois-1,$scope.adherent.dateNaissance.jour);

						var age = ((new Date().getTime() - dateNaissance.getTime()) / 31536000000).toFixed(0);


						console.log(age);
						$scope.adherent.age=age;


					}
				}

			};
			
			$scope.verif = function (date){
				date.jour=parseInt(date.jour);
				date.mois=parseInt(date.mois);
				date.annee=parseInt(date.annee);
				
				
				if (date.jour<0 || date.jour >31 || typeof(date.jour)!="number" || !Number.isInteger(date.jour)) {
					
					date.jour=undefined;
				}


				if (date.mois<0 || date.mois >12 || typeof(date.mois)!="number" || !Number.isInteger(date.mois)) {
					
					date.mois=undefined;
				}


				if (typeof(date.annee)!="number" || !Number.isInteger(date.annee)) {
					
					date.annee=undefined;
				}				

			};


		});