"use strict";
angular
	.module('login')
	.factory('RequeteLogin', function ($http, $routeParams, UrlConnection) {
		
		var promise = $http.get(UrlConnection.adherent).then(function(resultat){
			console.log(resultat.data)
			return resultat.data;
		}, function (){
			console.error('error');
			return[];
		});
		
		
		
		var s = {}	
		s.getList = function(){
			return promise;
		};
		s.postUser = function(monUser){
			var promise2 = $http.post(UrlConnection.login, monUser).then(function(resultat2){
				console.log(resultat2.data);
				console.log(resultat2);
				return resultat2;
			}, function (){
				console.error('error');
				return[];
			});
		}
		return s;
	});
