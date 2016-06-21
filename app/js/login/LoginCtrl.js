"use strict";
angular
		.module('mediatic')
		.controller('LoginCtrl',
			['$scope',
			 '$routeParams',
			 '$http',
			 '$location',
			 'RequeteLogin',
			 'UrlConnection',
			 'RequeteMedia',
			 'ServiceAuth',
			 
		function($scope, $routeParams, $http,$location, RequeteLogin, UrlConnection, RequeteMedia, ServiceAuth){
			
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
			
			$scope.verifConnect = function(){
				console.log("function");
				if (!ServiceAuth.isConnected()) {
					$location.path('#');
					console.log("not co");
				}else{console.log("co");}
			}

		}]);