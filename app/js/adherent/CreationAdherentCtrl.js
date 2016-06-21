'use strict';

angular
		.module('adherent')
		.controller('CreationAdherentCtrl', function($scope){
			
			
			//$scope.adherent={};


			$scope.ajoutAdherent = function(){
				console.log($scope.adherent);
			};
			

			$scope.calculAge = function(){
				if ($scope.adherent != undefined && $scope.adherent.dateNaissance!= undefined &&
				 $scope.adherent.dateNaissance.annee!=undefined && $scope.adherent.dateNaissance.mois!=undefined && $scope.adherent.dateNaissance.jour!=undefined){

					var dateNaissance = new Date($scope.adherent.dateNaissance.annee,$scope.adherent.dateNaissance.mois-1,$scope.adherent.dateNaissance.jour);
					
					var age = ((new Date().getTime() - dateNaissance.getTime()) / 31536000000).toFixed(0);


					console.log(age);
					$scope.adherent.age=age;
				}
			};
			
			$scope.verifJour = function (jour){
				if (jour<0 || jour >31){
					return jour=undefined;
				}
			};


		});