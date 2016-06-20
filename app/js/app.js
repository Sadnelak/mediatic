angular.module('mediatic', ['ngRoute', 'login', 'adherent', 'media']);

angular
	.module('mediatic')
	.config(function($routeProvider,$httpProvider){
		//
//		
//		var connect = false;
//		var AuthService = {};
//		AuthService.isConnected = function(){
//			return connect;
//		};
//		
//		AuthService.connect = function(login, password){
//		RequeteLogin.postCLogin({login, password}).then(function(response){
//			if(response){
//				var crypt = 'basic' +btoa(login+':'+password);
//				connect = true;
//				$http.defaults.headers.common['Autorization']=crypt;
//				
//			}
//		});
//		
//		Service.disconnect = function(){
//			connect = false;
//		}
//		
//		return Authservice;
//		};
//		//
		
		$httpProvider.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
		$routeProvider.otherwise('/login');
		
		
	});