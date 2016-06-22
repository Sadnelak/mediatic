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
							return promise;
						});
				return promise;

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
				return RequeteLogin.postCLogin({login : login, mdp: password}).then(function(response){
					if(response){
						//je suis authentifier
						console.log("SConnection : 57 ",response);
						var crypt = 'Basic ' +btoa(login+':'+password);
						connect = true;
						$http.defaults.headers.common['Authorization']=crypt;
						return true;
					}
					//je ne suis pas authentifier
					return false;
				});
			};
			AuthService.disconnect = function(){
				connect = false;
				$http.defaults.headers.common['Authorization']='Basic ';
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
							console.log(resultat.data);
							return resultat.data;
						}, function() {
							console.error('error');
							console.log("result :", resultat);
							console.log("result :", resultat.data);
							return [];
						});
				return promise;

			};

			s.getMRechercheT = function() {
				var promise = $http.get(UrlConnection.mRechercheT).then(
						function(resultat) {
							console.log('[getMRechercheT] ',resultat.data.items);
							console.log(resultat.data) //objet à 2 variables
							return resultat.data.items;
						}, function() {
							console.error('error');
							return -1;
						});
				return promise;

			};
			
			s.getMAccession = function(ref) {
				var  config = {
						params : {
							id : ref
						}
						
				};
				var promise = $http.get(UrlConnection.mAccession,config).then(
						function(resultat) {
							console.log(resultat.data)
							return resultat.data;
						}, function() {
							console.error('error');
							return {};
						});
				return promise;

			};
			
			s.postMCreation = function(monMedia) {
				var promise2 = $http.post(UrlConnection.mCreation, monMedia)
						.then(function(resultat2) {
							console.log(resultat2.data);
							console.log(resultat2);
							return true;
						}, function() {
							console.error('error');
							return false;
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





angular.module('login').factory(
		'RequeteAdherent',
		function($http, $routeParams, UrlConnection) {

			var s = {};
			
			s.getARecherche = function() {
				var promise = $http.get(UrlConnection.aRecherche).then(
						function(resultat) {
							console.log(resultat.data);
							return resultat.data;
						}, function() {
							console.error('error');
							console.log("result :", resultat);
							console.log("result :", resultat.data);
							return [];
						});
				return promise;

			};

			s.getARechercheT = function() {
				var promise = $http.get(UrlConnection.aRechercheT).then(
						function(resultat) {
							console.log('[getARechercheT]',resultat.data.items)
							return resultat.data.items;
						}, function() {
							console.error('error');
							return -1;
						});
				return promise;

			};
			
			s.getAAccession = function(ref) {
				var  config = {
						params : {
							id : ref
						}	
				};
				var promise = $http.get(UrlConnection.aAccession,config).then(
						function(resultat) {
							console.log(resultat.data)
							return resultat.data;
						}, function() {
							console.error('error');
							return {};
						});
				return promise;
			};
			
			s.postACreation = function(monAdherent) {
				var promise2 = $http.post(UrlConnection.aCreation, monAdherent)
						.then(function(resultat2) {
							console.log(resultat2.data);
							console.log(resultat2);
							return true;
						}, function() {
							console.error('error');
							return false;
						});
				return promise2;
			}
			
			s.postAModification = function(monAdherent) {
				var promise2 = $http.post(UrlConnection.aCreation, monAdherent)
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


