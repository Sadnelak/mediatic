angular.module('media').controller('CreationMediaCtrl', 
	['$scope',
	 '$http',
	 function($scope, $http){
		
		
		$scope.ajoutOeuvre = function(){
			if($scope.oeuvre===undefined){
				alert(" not good... you asshole, at least create the object");
			}else{
				var oeuvreType =!( ($scope.oeuvre.type===undefined)||($scope.oeuvre.type==='') ) ;
				var oeuvreTitre =!( ($scope.oeuvre.titre===undefined)||($scope.oeuvre.titre==='') ) ;
				var oeuvreAuteur =!( ($scope.oeuvre.auteur===undefined)||($scope.oeuvre.auteur==='') ) ;
				
				var evalOeuvre = oeuvreAuteur && oeuvreTitre && oeuvreType;
				
				if(evalOeuvre){
					console.log("good : ",$scope.oeuvre);
				}else{
					alert(" not good... you asshole");
				}
			}
		}
			
	}]);
		


//angular
//	.module('mediatic')
//	.directive('maDirective', function() {
//		return function(scope, elm, attrs, ctrl) {
//			ctrl.$validator.monValidateur = function(valeur){
//				...
//				return true/false;
//			}
//		};
//	})