angular.module('media').controller('RechercheMediaCtrl', 
	['$scope',
	 '$window','TriService','RequeteMedia', 
	 function($scope, $window, TriService,RequeteMedia){
		
		
		/*Données médias*/
		/*$scope.listeMedias=[{
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
		];*/
		$scope.listeMedias = [];
		
		var taille = 0;
		console.log('Avant toute requête, taille = '+taille);
		
		RequeteMedia.getMRechercheT().then(function(taille2){console.log('A la recherche de la taille : --- '+taille2+' ---');taille= taille2;},function(reason){console.log('Taille indisponible !')});
		
		console.log('Avant le push, taille = '+taille);
		
		$scope.listeMedias.push(RequeteMedia.getMRecherche().then(function(data){
			var tableau = [];
			console.log('Après le push, taille = '+taille);
			for(var i = 0; i < taille; i++){
				console.log(data[i].titre+" "+data[i].auteur+" "+data[i].type);
				tableau.push({
					titre:data[i].titre,
					auteur:data[i].auteur,
					type:data[i].type,
					emprunteur:'',
					dateRetour:'2001-01-01'});
			}
			return tableau;
		},function(reason){console.log('Echec critique ! ')}));
		
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