angular
	.module('mediatic')
	.service('TriService',function(){
		
		var TriService = {};
		
		TriService.triCle = function(cle,desc){
			return function(a,b){
				return desc ? ~~(a[cle] < b[cle]):
							 ~~(a[cle] > b[cle]);
			};
		}

		TriService.trier = function(cle,$scope,tableau){
			if ($scope.cleStockee == cle){
				console.log('Tri selon',cle,',décroissant');
				tableau.sort(this.triCle(cle,true));
				$scope.cleStockee = '';
				return;
			}
			else{
				console.log('Tri selon',cle,',croissant');
				tableau.sort(this.triCle(cle,false));
				$scope.cleStockee = cle;
			}
		}
		
		return TriService;
	
	});