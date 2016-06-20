"use strict";
angular
		.module('login')
		.controller('LoginCtrl',
			['$scope',
			 '$routeParams',
			 '$http',
			 'RequeteLogin',
			 'UrlConnection',
			 'RequeteMedia',
			 'ServiceAuth',
			 
		function($scope, $routeParams, $http, RequeteLogin, UrlConnection, RequeteMedia, ServiceAuth){
				
						
						$scope.submit = function(){
					
					if ($scope.user===undefined||$scope.user.username===undefined||$scope.user.password===undefined){
						alert("go fuck yourself");
					}else{
						ServiceAuth.connect(
							$scope.user.username, 
							 $scope.user.password
						);						
					}
				}		
			
		}]);