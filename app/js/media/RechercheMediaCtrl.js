angular.module('media').controller('RechercheMediaCtrl', 
	['$scope',
	 '$window','TriService', 
	 function($scope, $window, TriService){
		
		
		/*Données adhérents*/
		$scope.listeMedias=[{
			titre:"Nihal de la Terre du Vent",
			type:"Livre",
			auteur:"Troisi Licia",
			emprunteur:"ChocophileBenj",
			dateRetour:"1992-06-16"
		},{
			titre:"La Ouache",
			type:"CD",
			auteur:"Matmatah",
			emprunteur:"IceWizard",
			dateRetour:"1992-07-18"
		},{
			titre:"Game Over",
			type:"Livre",
			auteur:"Midam",
			emprunteur:"UltimateWind",
			dateRetour:"1992-07-25"
		},{
			titre:"Alors regarde",
			type:"CD",
			auteur:"Burel Patrick",
			emprunteur:"Patriiick",
			dateRetour:"1992-11-10"
		},{
			titre:"Avatar",
			type:"DVD",
			auteur:"Cameron James",
			emprunteur:"DaronCameroun",
			dateRetour:"1995-03-02"
		},
		{
			titre:"Le petit cheval de manège",
			type:"DVD",
			auteur:"Les Films du Plat Pays",
			emprunteur:"FelixLeChat",
			dateRetour:"1995-03-04"
		}
		];
		
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
		$scope.droits = false;
		$scope.tenterAccesCreation = function(){
			if($scope.droits)
				$window.location.href = "/index.html";
			else
				console.log('Vous n\'avez pas les droits pour ajouter un nouveau média.');
		}
		
		
	}]);