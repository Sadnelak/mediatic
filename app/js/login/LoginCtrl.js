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
			 
		function($scope, $routeParams, $http, RequeteLogin, UrlConnection, RequeteMedia){
				
				
				
				$scope.submit = function(){
					
					if ($scope.user===undefined||$scope.user.username===undefined||$scope.user.password===undefined){
						alert("go fuck yourself");
					}else{
						var verifConnection = RequeteLogin.postCLogin({
							login : $scope.user.username, 
							mdp : $scope.user.password
						});
						
						verifConnection.then(function(resultat2) {
							if (resultat2 && $scope.user.username =="admin"){
								$scope.idConnectee ="admin";
								
								
							}else if (resultat2 && $scope.user.username =="aze"){
								$scope.idConnectee ="utilisateur";
								
							}else{
								console.log("t'as pas les droits !")
							}						
						});
				}		
			
		}}]);


/*
 * var authdata = Base64.encode(username+':'+password);
 * 
 * 
 * 
 * $http.defaults.headers.common['Authorization']='Basic'+authdata;
 */