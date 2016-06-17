
//service.SetCredentials = function(username,password){
	var authdata = Base64.encode(username+':'+password);
	
//	$rootScope.globals = {
//			currentUser: {
//				username: username,
//				authdata
//			}
//	}
//};

$http.defaults.headers.common['Authorization']='Basic'+authdata;