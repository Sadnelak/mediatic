"use strict";
angular
	.module('login')
	.value('UrlConnection', {basic : "http://192.168.10.27:8090",
							adherent : "http://192.168.10.27:8090/resource/adherent.recherche",
							login : "http://192.168.10.27:8090/resource/connexion.login"});

