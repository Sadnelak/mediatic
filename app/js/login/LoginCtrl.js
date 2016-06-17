"use strict";
angular
		.module('login')
		.controller('LoginCtrl',
			['$scope',
			 '$routeParams',
			 '$http',
			 'RequeteLogin',
			 'UrlConnection',
			 
		function($scope, $routeParams, $http, RequeteLogin, UrlConnection){
				$scope.submit = function(){
					
					console.log(RequeteLogin.postUser($scope.user));
				}
					
			//var authdata = btoa(username+':'+password);
//			var authdata = (username+':'+password);
//			$http.defaults.headers.common['Authorization']='Basic'+authdata;
			
			
			
		}]);


/*
var authdata = Base64.encode(username+':'+password);
	


$http.defaults.headers.common['Authorization']='Basic'+authdata;
*/