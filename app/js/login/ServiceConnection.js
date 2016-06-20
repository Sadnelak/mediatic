"use strict";
angular.module('login').factory(
		'RequeteLogin',
		function($http, $routeParams, UrlConnection) {

			
			
			var s = {}
			s.getCRight = function() {
				var promise = $http.get(UrlConnection.cRight).then(
						function(resultat) {
							console.log(resultat.data)
							return promise;
						}, function() {
							console.error('error requete login get');
							return [];
						});

			};
			s.postCLogin = function(monUser) {

				var promise2 = $http.post(UrlConnection.cLogin, monUser).then(
						function(resultat2) {
							console.log("result.data : ",resultat2.data);
							console.log("result : ",resultat2);
							return true;
						}, function() {
							console.error('error requete login post');
							return false;
						});
				return promise2;
			}
			
			
			
			
			return s;
		});




angular.module('login').factory(
		'ServiceAuth',
		function($http, $routeParams, UrlConnection, RequeteLogin) {

			var connect = false;
			var AuthService = {};
			AuthService.isConnected = function(){
				return connect;
			};
			
			AuthService.connect = function(login, password){
				RequeteLogin.postCLogin({login : login, mdp: password}).then(function(response){
					if(response){
						var crypt = 'Basic ' +btoa(login+':'+password);
						connect = true;
						$http.defaults.headers.common['Autorization']=crypt;
						
					}
				});
			};
			AuthService.disconnect = function(){
				connect = false;
				$http.defaults.headers.common['Autorization']='Basic ';
			}
			return AuthService;

});



angular.module('login').factory(
		'RequeteMedia',
		function($http, $routeParams, UrlConnection) {

			var s = {};
			
			s.getMRecherche = function() {
				var promise = $http.get(UrlConnection.mRecherche).then(
						function(resultat) {
							console.log(resultat.data)
							return promise;
						}, function() {
							console.error('error');
							return promise;
						});
				return promise;

			};

			s.getMRechercheT = function() {
				var promise = $http.get(UrlConnection.mRechercheT).then(
						function(resultat) {
							console.log(resultat.data)
							return promise;
						}, function() {
							console.error('error');
							return promise;
						});
				return promise;

			};
			
			s.getMAccession = function() {
				var promise = $http.get(UrlConnection.mAccession).then(
						function(resultat) {
							console.log(resultat.data)
							return promise;
						}, function() {
							console.error('error');
							return promise;
						});
				return promise;

			};
			
			s.postMCreation = function(monMedia) {
				var promise2 = $http.post(UrlConnection.mCreation, monMedia)
						.then(function(resultat2) {
							console.log(resultat2.data);
							console.log(resultat2);
							return promise2;
						}, function() {
							console.error('error');
							return promise2;
						});
				return promise2;
			}
			
			s.postMModification = function(monMedia) {
				var promise2 = $http.post(UrlConnection.mCreation, monMedia)
						.then(function(resultat2) {
							console.log(resultat2.data);
							console.log(resultat2);
							return promise2;
						}, function() {
							console.error('error');
							return promise2;
						});
				return promise2;
			}
	
			
			return s;
		});


