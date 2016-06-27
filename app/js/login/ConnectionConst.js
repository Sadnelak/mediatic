(function(){
"use strict";

var basique = "http://192.168.10.19:8090";

angular
	.module('login')
	.value('UrlConnection', {basic : basique,
							
							mRecherche : basique + "/resource/media.recherche",//get
							mRechercheT : basique + "/resource/media.recherche.taille",//get
							mAccession : basique + "/resource/media.accession",//get
							mCreation : basique + "/resource/media.creation",//post
							mModification : basique + "/resource/media.modification",//post
							aRecherche : basique + "/resource/adherent.recherche",//get
							aRechercheT : basique + "/resource/adherent.recherche.taille",//get
							aAccession : basique + "/resource/adherent.accession",//get
							aCreation : basique + "/resource/adherent.creation",//post
							aModification : basique + "/resource/adherent.modification",//post
							eAjout : basique + "/resource/emprunt.ajout",//post
							cLogin : basique + "/resource/connexion.login",//post
							cRight : basique + "/resource/connexion.right",});//get
							
})()