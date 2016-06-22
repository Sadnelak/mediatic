angular.module('emprunt').controller('EmpruntCtrl',
	['$scope',
	 '$window',
	 '$location',
	 '$http',
	 'TriService',
	 'RequeteMedia',
	 'RequeteAdherent',
	 'RequeteEmprunt',
	 
	 function($scope, $window, $location, $http, TriService, RequeteMedia, RequeteAdherent, RequeteEmprunt  ){
		
		$scope.emprunt = {};
		
		$scope.valideEmprunt = function(){
			if($scope.emprunt.id_media != undefined && $scope.emprunt.id_adherent != undefined){
				console.log($scope.emprunt.id_media, $scope.emprunt.id_adherent);

				console.log($scope.getMRechercheT);
				
				RequeteEmprunt.getEAjout($scope.emprunt).then(function(result){
						console.log("result :", result);
						console.log("result.data :", result.data);
					});
				
			}else{
				console.log("oublie de cochage");
			}
		}
		
		$scope.calculFinAbonnement = function(){
			if ($scope.emprunt != undefined && $scope.emprunt.dateEmprunt!= undefined){

				$scope.verif($scope.emprunt.dateEmprunt);

				if ($scope.emprunt.dateEmprunt.annee!=undefined && $scope.emprunt.dateEmprunt.mois!=undefined && $scope.emprunt.dateEmprunt.jour!=undefined){

					var dateEmprunt = new Date($scope.emprunt.dateEmprunt.annee,$scope.emprunt.dateEmprunt.mois-1,$scope.emprunt.dateEmprunt.jour);
					
					var dureePret{};
					dureePret.livre = 30;
					dureePret.cd = 15;
					dureePret.dvd = 15;
					if()
					var dateEmpruntRetour = new Date($scope.emprunt.dateEmprunt.annee +1,$scope.emprunt.dateEmprunt.mois-1,$scope.emprunt.dateEmprunt.jour);

					$scope.emprunt.cotisation.debut=dateEmprunt.toString();
					$scope.emprunt.cotisation.fin=finAbonnement.toString();

					console.log(finAbonnement);
					$scope.emprunt.dateFinAbonnement=finAbonnement.getDate() +"-"+(finAbonnement.getMonth()+1) +"-"+finAbonnement.getFullYear();


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
		
	
	}]);