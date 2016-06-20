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
				tableau.sort(this.triCle(cle,true));
				$scope.cleStockee = '';
				return;
			}
			else{
				tableau.sort(this.triCle(cle,false));
				$scope.cleStockee = cle;
			}
		}
		
		return TriService;
	
	});