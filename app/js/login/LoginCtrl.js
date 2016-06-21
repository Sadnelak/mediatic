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
			
			$scope.isConnected = false;
						
			$scope.submit = function(){
				
				if ($scope.user===undefined||$scope.user.username===undefined||$scope.user.password===undefined){
					alert("Remplissez les champs d'identification");
				}else{
					ServiceAuth.connect(
							$scope.user.username, 
							 $scope.user.password
						).then (function(resultat) {
							console.log(resultat);
							if(resultat == true){
								$scope.isConnected = true;
							}
						}, function() {
							console.error('error');
							return [];
						});
									
				}
			}
			$scope.logout = function(){
				$scope.isConnected = false;
				$scope.user.username = '';
				$scope.user.password = '';
			}
			
		}]);