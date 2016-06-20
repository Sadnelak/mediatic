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

angular.module('media').factory(
		'RequeteMedia',
		function($http, $routeParams, UrlConnection) {

			var s = {};
			
			s.getMRecherche = function() {
				var promise = $http.get(UrlConnection.mRecherche).then(
						function(resultat) {
							console.log(resultat.data)
							return resultat.data;
						}, function() {
							console.error('error');
							return [];
						});

			};

			s.getMRechercheT = function() {
				var promise = $http.get(UrlConnection.mRechercheT).then(
						function(resultat) {
							console.log(resultat.data)
							return resultat.data;
						}, function() {
							console.error('error');
							return [];
						});

			};
			
			s.getMAccession = function() {
				var promise = $http.get(UrlConnection.mAccession).then(
						function(resultat) {
							console.log(resultat.data)
							return resultat.data;
						}, function() {
							console.error('error');
							return [];
						});

			};
			
			s.postMCreation = function(monMedia) {
				var promise2 = $http.post(UrlConnection.mCreation, monMedia)
						.then(function(resultat2) {
							console.log(resultat2.data);
							console.log(resultat2);
							return promise2;
						}, function() {
							console.error('error');
							return [];
						});
				return promise2;
			}
			
			s.postMModification = function(monMedia) {
				var promise2 = $http.post(UrlConnection.mCreation, monMedia)
						.then(function(resultat2) {
							console.log(resultat2.data);
							console.log(resultat2);
							return resultat2;
						}, function() {
							console.error('error');
							return [];
						});
			}
	
			
			return s;
		});
