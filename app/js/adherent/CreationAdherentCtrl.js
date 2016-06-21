'use strict';

angular
.module('adherent')
.controller('CreationAdherentCtrl', function($scope,$location,ServiceAuth){


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
				console.log(date);
				
				if (date.jour<0 || date.jour >31 || typeof(date.jour)!="number" || !Number.isInteger(date.jour)) {
					console.log(date);	
					date.jour=undefined;
				}else{console.log("ok");}


				if (date.mois<0 || date.mois >12 || typeof(date.mois)!="number" || !Number.isInteger(date.mois)) {
					console.log(date);
					date.mois=undefined;
				}else{console.log("ok");}


				if (typeof(date.annee)!="number" || !Number.isInteger(date.annee)) {
					console.log(date);
					date.annee=undefined;
				}else{console.log("ok");}

			};
		/*	$scope.verifConnect = function(){
				console.log("function");
				if (!ServiceAuth.isConnected()) {
					$location.path('#');
					console.log("not co");
				}else{console.log("co");}
			}
*/

		});