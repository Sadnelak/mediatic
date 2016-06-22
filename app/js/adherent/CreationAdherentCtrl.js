'use strict';

angular
.module('adherent')
.controller('CreationAdherentCtrl', function($scope,$location,ServiceAuth){


			$scope.adherent={};
			$scope.adherent.cotisation={};

			$scope.ajoutAdherent = function(){
				console.log($scope.adherent);
				var champsARemplir = undefined;
				if ($scope.adherent.nom===undefined || $scope.adherent.nom==='') {
					champsARemplir=champsARemplir+"le nom, "
				}
				if ($scope.adherent.prenom===undefined || $scope.adherent.prenom==='') {
					champsARemplir=champsARemplir+"le prenom, "
				}
				if ($scope.adherent.date_naissance===undefined || $scope.adherent.date_naissance==='') {
					champsARemplir=champsARemplir+"la date de naissance, "
				}
				if ($scope.adherent.email===undefined || $scope.adherent.email==='') {
					champsARemplir=champsARemplir+"l'email, "
				}



			};
			

			$scope.calculAge = function(){
				if ($scope.adherent != undefined && $scope.adherent.dateNaissance!= undefined){

					$scope.verif($scope.adherent.dateNaissance);

					if ($scope.adherent.dateNaissance.annee!=undefined && $scope.adherent.dateNaissance.mois!=undefined && $scope.adherent.dateNaissance.jour!=undefined){

						var dateNaissance = new Date($scope.adherent.dateNaissance.annee,$scope.adherent.dateNaissance.mois-1,$scope.adherent.dateNaissance.jour);

						var age = ((new Date().getTime() - dateNaissance.getTime()) / 31536000000).toFixed(0);

						$scope.adherent.date_naissance=dateNaissance;
						console.log(age);
						$scope.adherent.age=age;


					}
				}

			};
			


			$scope.calculFinAbonnement = function(){
				if ($scope.adherent != undefined && $scope.adherent.dateCotisation!= undefined){

					$scope.verif($scope.adherent.dateCotisation);

					if ($scope.adherent.dateCotisation.annee!=undefined && $scope.adherent.dateCotisation.mois!=undefined && $scope.adherent.dateCotisation.jour!=undefined){

						var dateCotisation = new Date($scope.adherent.dateCotisation.annee,$scope.adherent.dateCotisation.mois-1,$scope.adherent.dateCotisation.jour);

						var finAbonnement = new Date($scope.adherent.dateCotisation.annee +1,$scope.adherent.dateCotisation.mois-1,$scope.adherent.dateCotisation.jour);

						$scope.adherent.cotisation.debut=dateCotisation;
						$scope.adherent.cotisation.fin=finAbonnement;

						console.log(finAbonnement);
						$scope.adherent.dateFinAbonnement=finAbonnement.getDate() +"-"+(finAbonnement.getMonth()+1) +"-"+finAbonnement.getFullYear();


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