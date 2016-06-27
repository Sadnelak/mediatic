'use strict';

console.info('================================================================');
console.info('=== Initialisation du server ===================================');
console.info('================================================================');

//Lets require/import the HTTP module
var express = require('express');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
var btoa = require('btoa');

const PORT=8090;
var texteFields = ['nom','prenom'];

var data = {};
(function(data, texteFields){
	
	var medias = [];
	var adherents = [];
	
	function getAge(strDate, full){
		if(full){
			var date = new Date(strDate);
			var today = new Date();
			return today.getTime() - date.getTime();
		} else {
			var date = new Date(strDate);
			var today = new Date();
			var age = today.getFullYear()-date.getFullYear();
			if(today.getMonth()<date.getMonth() || (today.getMonth()==date.getMonth() && today.getDate()<date.getDate())){age--;}
			return age;
		}
	}
	
	function getRetour(date, type){
		var d = new Date(date);
		if(type=='Livre'){
			d.setMonth(d.getMonth() + 1);
		} else {
			d.setDate(d.getDate() + 15);
		}
		return formatDate(d);
	}
	
	function formatDate(date){
		return date.getFullYear()
				+'-'
				+((date.getMonth()+1)<10?'0':'')+(date.getMonth()+1)
				+'-'
				+(date.getDate()<10?'0':'')+date.getDate()
				+'T'
				+(date.getHours()<10?'0':'')+date.getHours()
				+':'
				+(date.getMinutes()<10?'0':'')+date.getMinutes()
				+':'
				+(date.getSeconds()<10?'0':'')+date.getSeconds()
				+'.000Z';
	}
	
	var idMedia=0;
	function createMedia(titre, auteur, type){
		var media = {};
		media.id = idMedia++;
		media.titre = titre;
		media.auteur = auteur;
		media.type = type;
		media.emprunteur = undefined;
		media.emprunteurs = [];
		media.retour = undefined;
		medias.push(media);
		return media;
	}
	
	var idAdherent=0;
	function createAdherent(nom, prenom, date_naissance, email, adresse, cotisation){
		var adherent = {};
		adherent.id = idAdherent++;
		adherent.nom = nom;
		adherent.prenom = prenom;
		adherent.date_naissance = date_naissance;
		adherent.email = email;
		adherent.adresse = adresse,
		adherent.cotisation = cotisation,
		adherent.age = getAge(date_naissance),
		adherent.emprunt = [];
		adherent.nombre_media = 0;
		adherents.push(adherent);
		return adherent;
	}
		
	function createLocation(idAdherent, idMedia, date){
		var adherent = adherents[adherents.findIndex(function(item){
			return item.id == idAdherent;
		})];
		if(adherent==undefined){
			return -10;
		}

		var media = medias[medias.findIndex(function(item){
			return item.id == idMedia;
		})];
		if(media==undefined){
			return -20;
		}

		var retour = getRetour(date, media.type)
		if(getAge(retour, true)<0){
			media.emprunteur = adherent;
			media.retour = retour;
			adherent.emprunt.push({
				media : media,
				depart : date,
				retour : retour
			});
		}
		media.emprunteurs.push({
			adherent : adherent,
			depart : date,
			retour : retour
		});
		return {
			adherent:simpleAdherent(adherent),
			media:simpleMedia(media),
			depart:date,
			retour:retour
		};
	}
	
	function simpleAdherent(adherent){
		if(adherent==undefined){
			return undefined;
		}
		return {
			id : adherent.id,
			nom : adherent.nom,
			prenom : adherent.prenom,
			date_naissance : adherent.date_naissance,
			email : adherent.email,
			adresse : adherent.adresse,
			cotisation : adherent.cotisation,
			age : adherent.age,
			nombre_media : adherent.emprunt.length
		};
	}
	
	function doubleAdherent(item){
		if(item==undefined){
			return undefined;
		}
		return {
			id : item.id,
			nom : item.nom,
			prenom : item.prenom,
			date_naissance : item.date_naissance,
			email : item.email,
			adresse : item.adresse,
			cotisation : item.cotisation,
			age : getAge(item.date_naissance),
			emprunt : simpleMedias(item.emprunt),
			nombre_media : item.emprunt.length
		};
	}
	
	function simpleAdherents(adherents){
		return adherents.map(function(item){
			return {
				adherent : simpleAdherent(item.adherent),
				depart : item.depart,
				retour : item.retour
			};
		});
	}
	
	function simpleMedia(media){
		if(media==undefined){
			return undefined;
		}
		return {
			id : media.id,
			titre : media.titre,
			auteur : media.auteur,
			type : media.type
		};
	}
	
	function doubleMedia(item){
		if(item==undefined){
			return undefined;
		}
		return {
			id : item.id,
			titre : item.titre,
			auteur : item.auteur,
			type : item.type,
			emprunteur : simpleAdherent(item.emprunteur),
			emprunteurs : simpleAdherents(item.emprunteurs),
			retour : item.retour,
		};
	}
	
	function simpleMedias(medias){
		return medias.map(function(item){
			return {
				media : simpleMedia(item.media),
				depart : item.depart,
				retour : item.retour
			};
		});
	}
	
	data.getAdherents = function(filtres, tri, page){
		return adherents.filter(function(item,index){
			filtres.id = filtres.id ||'';
			return ((item.id===undefined && filtres.id=='') 
					||  (item.id!==undefined && (''+item.id).indexOf(filtres.id)!=-1));
		}).filter(function(item,index){
			filtres.nom = filtres.nom ||'';
			return ((item.nom===undefined && filtres.nom=='') 
					||  (item.nom!==undefined && item.nom.indexOf(filtres.nom)!=-1));
		}).filter(function(item,index){
			filtres.prenom = filtres.prenom ||'';
			return ((item.prenom===undefined && filtres.prenom=='') 
					||  (item.prenom!==undefined && item.prenom.indexOf(filtres.prenom)!=-1));
		}).filter(function(item,index){
			filtres.email = filtres.email ||'';
			return ((item.email===undefined && filtres.email=='') 
					||  (item.email!==undefined && item.email.indexOf(filtres.email)!=-1));
		}).filter(function(item,index){
			filtres.texte = filtres.texte ||'';
			return (filtres.texte=='' || texteFields.reduce(function(previous, field){
														return (previous || (item[field].indexOf(filtres.texte)!=-1));
													}, false));
		}).sort(function(item1,item2){
			if (item1[tri] > item2[tri]){
				return 1;
			} else if (item1[tri] < item2[tri]){
				return -1;
			} else {return 0;}
		}).filter(function(item,index){
			return ((page==-1) 
					|| (   (index< ((page+1)*10)) 
						&& (index>=( page   *10))));
		}).map(function(item){
			return doubleAdherent(item);
		});
	}
	data.getMedias = function(filtres, tri, page){
		return medias.filter(function(item,index){
			filtres.titre = filtres.titre ||'';
			return ((item.titre===undefined && filtres.titre=='') 
					|| (item.titre!==undefined && item.titre.indexOf(filtres.titre)!=-1));
		}).filter(function(item,index){
			filtres.auteur = filtres.auteur ||'';
			return ((item.auteur===undefined && filtres.auteur=='') 
					|| (item.auteur!==undefined && item.auteur.indexOf(filtres.auteur)!=-1));
		}).filter(function(item,index){
			filtres.type = filtres.type ||'';
			return ((item.type===undefined && filtres.type=='') 
					||  (item.type!==undefined && (item.type==filtres.type || ''==filtres.type)));
		}).sort(function(item1,item2){
			if (item1[tri] > item2[tri]){
				return 1;
			} else if (item1[tri] < item2[tri]){
				return -1;
			} else {
				return 0;
			}
		}).filter(function(item,index){
			return ((page==-1) 
					|| (   (index< (page+1)*10) 
						&& (index>=(page   *10))));
		}).map(function(item){
			return doubleMedia(item);
		});
	}

	data.getAdherent = function(id){
		return doubleAdherent(adherents[adherents.findIndex(function(item){
			return item.id == id;
		})]);
	};
	data.getMedia = function(id){
		return doubleMedia(medias[medias.findIndex(function(item){
			return item.id == id;
		})]);
	};
	
	data.setAdherent = function(id, adherent){
		var src = adherents[adherents.findIndex(function(item){
			return item.id == id;
		})];
		src.nom = adherent.nom;
		src.prenom = adherent.prenom;
		src.date_naissance = adherent.date_naissance;
		src.email = adherent.email;
		src.adresse = adherent.adresse;
		src.age = getAge(adherent.date_naissance);
//		src.cotisation = adherent.cotisation;
	}
	data.setMedia = function(id, media){
		var src = medias[medias.findIndex(function(item){
			return item.id == id;
		})];
		src.titre = media.titre;
		src.auteur = media.auteur;
		src.type = media.type;
	};
	
	data.createAdherent = function(object){
		return createAdherent(object.nom, object.prenom, object.date_naissance, object.email, object.adresse, object.cotisation);
	}
	data.createMedia = function(object){
		return createMedia(object.titre, object.auteur, object.type);
	}
	
	data.existAdherent = function(id){
		return -1!=adherents.findIndex(function(item){
			return item.id == id;
		})
	};
	data.existMedia = function(id){
		return -1!=medias.findIndex(function(item){
			return item.id == id;
		})
	};

	data.existDate = function(date){
		return !isNaN(new Date(date));
	};
	data.emprunte = function(id_adherent, id_media, depart){
		return createLocation(id_adherent, id_media, depart);
	};
	
	createMedia("Lanfeust de Troy",                 "Arleston - Tarquin",         "Livre");
	createMedia("Lanfeust des étoiles",             "Arleston - Tarquin",         "Livre");
	createMedia("Troll de Troy",                    "Arleston - Mourier",         "Livre");
	createMedia("Thorgal",                          "G. Rosinski - J. Van Hamme", "Livre");
	createMedia("Thorgal",                          "Eric Mouquet",               "CD");
	createMedia("Star Wars - épisodes I",           "Georges Lucas",              "DVD");
	createMedia("Star Wars - épisodes II",          "Georges Lucas",              "DVD");
	createMedia("Star Wars - épisodes III",         "Georges Lucas",              "DVD");
	createMedia("Star Wars - épisodes IV",          "Georges Lucas",              "DVD");
	createMedia("Star Wars - épisodes V",           "Georges Lucas",              "DVD");
	createMedia("Star Wars - épisodes VI",          "Georges Lucas",              "DVD");
	createMedia("La petite maison dans la prairie", "Laura Ingalss Wilder",       "Livre");
	for(var i=0;i<50;i++){
		createMedia("La petite maison dans la prairie - Saison "+(i+1), "Michael Landon", "DVD");
	}

	createAdherent("Nicolède", "Maitre",    "1902-02-28T00:00:00.000Z", "maitre@troy.com", {"ligne1":"3eme maison","ligne2":"chambre du père","codepostal":"3-333","ville":"Eckmul"}, {"debut":"2016-01-01T00:00:00.000Z","fin":"2017-01-01T00:00:00.000Z","montant":2});
	createAdherent("Nicolède", "Cian",      "1995-06-15T00:00:00.000Z", "cian@troy.com",   {"ligne1":"3eme maison","ligne2":"chambre de Cian","codepostal":"3-333","ville":"Eckmul"}, {"debut":"2016-01-01T00:00:00.000Z","fin":"2017-01-01T00:00:00.000Z","montant": 20});
	createAdherent("Nicolède", "Cixi",      "1998-07-12T21:00:00.000Z", "cixi@troy.com",   {"ligne1":"3eme maison","ligne2":"chambre de Cixi","codepostal":"3-333","ville":"Eckmul"}, {"debut":"2016-01-01T00:00:00.000Z","fin":"2017-01-01T00:00:00.000Z","montant":2});
	createAdherent("Or Azur",  "Chevalier", "1993-11-01T00:00:00.000Z",  undefined,        {},                                                                                        {});

	var d1 = new Date();d1.setYear(2015);
	var d2 = new Date();d2.setMonth(d2.getMonth()-2);
	var d3 = new Date();d3.setDate(d3.getDate()-5);
	createLocation(1, 0, formatDate(d1));
	createLocation(0, 0, formatDate(d2));
	createLocation(0, 0, formatDate(d3));
	
})(data, texteFields);

console.info('Définition du serveur.');
// Fonction de parsage du body
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Fonction de vérification de la connexion
function checkConnexion(req, res, next){
	var authorization = req.headers['authorization'];
	var checkOK = logins.filter(function(item){
		return authorization == item.code;
	}); 
	if(checkOK.length===0){
		console.info('', req.route.path, ' : Mauvaise connexion');
		res.writeHead(403, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({message:'Mauvaise connexion.'}));
		res.end();
	} else {
		req.user = checkOK[0];
		next();
	};
}
//
function createObjectPost(req, res, next){
	if(req.body===undefined){
		console.info('', req.route.path, ' => ERREUR (no params)');
		res.writeHead(412, {'Content-Type': 'application/json'});
		res.write('{"message":"Parametre login et mdp requis"}');
		res.end();
		return;
	}
	req.object = req.body;
	for(var key in req.object){
		if(key.indexOf('{')!=-1){
			req.object = JSON.parse(key);
			break;
		}
	}
	next();
}
//
function createObjectGet(req, res, next){
	if(req.query===undefined){
		console.info('', req.route.path, ' => ERREUR (no params)');
		res.writeHead(412, {'Content-Type': 'application/json'});
		res.write('{"message":"Parametre requis"}');
		res.end();
		return;
	}
	req.object = req.query;
	for(var key in req.object){
		if(key.indexOf('{')!=-1){
			req.object = JSON.parse(key);
			break;
		}
	}
	next();
}
//
function checkChampsExclus(champs){
	return function(req, res, next){
		for(var key in champs){
			if(req.object[key]!==undefined){
				console.info('', req.route.path, ' : Mauvaise demande');
				res.writeHead(412, {'Content-Type': 'application/json'});
				res.write(JSON.stringify({message:'Mauvaise demande : l\'objet ne doit pas avoir de champs '+champs[key]+'.'}));
				res.end();
				return;
			}
		}
		next();
	}
}
//
function checkChampsRequis(champs){
	return function(req, res, next){
		for(var key in champs){
			if((req.object[key]===undefined)||(req.object[key]==='')){
				console.info('', req.route.path, ' : Mauvaise demande');
				res.writeHead(412, {'Content-Type': 'application/json'});
				res.write(JSON.stringify({message:'Mauvaise demande : l\'objet doit avoir un champ '+champs[key].nom+'.'}));
				res.end();
				return;
			}
			if(champs[key].values!=undefined){
				var nb = champs[key].values.filter(function(value){
					return value===req.object[key];
				}).length;
				if(nb===0){
					console.info('', req.route.path, ' : Mauvaise demande');
					res.writeHead(412, {'Content-Type': 'application/json'});
					res.write(JSON.stringify({message:'Mauvaise demande : le champ '+champs[key].nom+' doit avoir sa valeur dans '+champs[key].values}));
					res.end();
					return;
				}
			}
			if(champs[key].format==='date'){
				var date = req.object[key];
				var regDate = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z)?");
				if(!regDate.test(date)){
					console.info('', req.route.path, ' : Mauvaise demande');
					res.writeHead(412, {'Content-Type': 'application/json'});
					res.write(JSON.stringify({message:'Mauvaise demande : le champ '+champs[key].nom+' doit être de format date AAAA-MM-JJThh:mm:ss.nnnZ'}));
					res.end();
					return;
				}
			}
			if(champs[key].format==='adresse'){
				var adresse = req.object[key];
				if((adresse.ligne1===undefined) || (adresse.ligne2===undefined) || (adresse.codepostal===undefined) ||  (adresse.ville===undefined)){
					console.info('', req.route.path, ' : Mauvaise demande');
					res.writeHead(412, {'Content-Type': 'application/json'});
					res.write(JSON.stringify({message:'Mauvaise demande : le champ '+champs[key].nom+' doit être de format adresse (ligne1 / ligne2 / codepostal / ville)'}));
					res.end();
					return;
				}
			}
		}
		next();
	}
}
// 
function checkExistsMedia(req, res, next){
	var item = data.getMedia(req.object.id);
	if(item==undefined){
		console.info('', req.route.path, ' : Mauvaise demande');
		res.writeHead(404, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({message:'Mauvaise demande : le média est inconnu'}));
		res.end();
		return;
	}
	next();
}
// 
function checkExistsAdherent(req, res, next){
	var item = data.getAdherent(req.object.id);
	if(item==undefined){
		console.info('', req.route.path, ' : Mauvaise demande');
		res.writeHead(404, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({message:'Mauvaise demande : l\'adhérent est inconnu'}));
		res.end();
		return;
	}
	next();
}
//
function checkDefault(champ, value){
	return function(req, res, next){
		req.object[champ] = (req.object[champ]===undefined?value:req.object[champ]);
		next();
	}
}
//
var app = express();
app.use(function(req, res, next){
	try {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Request-Method', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
		res.setHeader('Access-Control-Allow-Headers', 'Authorization');
		next();
	} catch(err){
		console.error('    Erreur 500', err);
		res.writeHead(500, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({message:err}));
		res.end();
	}
});

console.info('Démarage du serveur.');
app.listen(PORT, function(){
	//Callback triggered when server is successfully listening. Hurray!
	console.info("Server listening on: http://192.168.10.12:%s", PORT);
});

console.info('================================================================');
console.info('=== URL en cours de construction ===============================');
console.info('================================================================');

/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/

var mediaFields = ['id','titre','auteur'];
var types = ['CD','DVD','Livre'];
console.info('Create GET /resource/media.recherche');
console.info('  Params : ? page');
console.info('           ? titre');
console.info('           ? auteur');
console.info('           ? type');
console.info('           ? tri : ', mediaFields);
app.get('/resource/media.recherche', 
		checkConnexion, 
		createObjectGet, 
		checkDefault('page', -1),
		checkDefault('tri', mediaFields[0]),
		checkChampsRequis({tri : {nom:'Type', values:mediaFields}}),
		function(req, res) {
	console.info('Call GET /resource/media.recherche');
	res.writeHead(200,{'Content-Type': 'application/json'});
	res.write(JSON.stringify(data.getMedias(req.object, req.object.tri, req.object.page)));
	res.end();
});

console.info('Create GET /resource/media.recherche.taille');
console.info('  Params : ? titre');
console.info('           ? auteur');
console.info('           ? type');
app.get('/resource/media.recherche.taille', 
		checkConnexion, 
		createObjectGet, 
		function(req, res) {
	console.info('Call GET /resource/media.recherche.taille');
	var list = data.getMedias(req.object, undefined, -1);
	res.writeHead(200,{'Content-Type': 'application/json'});
	res.write(JSON.stringify({items:list.length,pages:Math.ceil(list.length/10)}));
	res.end();
});

console.info('Create GET /resource/media.accession');
console.info('  Params : ! id');
app.get('/resource/media.accession', 
		checkConnexion, 
		createObjectGet, 
		checkChampsRequis({id : {nom:'Id'}}),
		checkExistsMedia,
		function(req, res) {
	var item = data.getMedia(req.object.id);
	console.info('Call GET /resource/media.accession');
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(item));
	res.end();
});

console.info('Create POST /resource/media.creation');
app.post('/resource/media.creation', 
			urlencodedParser, 
			checkConnexion, 
			createObjectPost, 
			checkChampsExclus({id:'Id'}),
			checkChampsRequis({
				titre : {nom:'Titre'}, 
				auteur : {nom:'Auteur'}, 
				type : {nom:'Type', values:['Livre', 'CD', 'DVD']}
			}),
			function(req, res) {
	console.info('Call POST /resource/media.creation');
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(data.createMedia(req.object)));
	res.end();
});

console.info('Create POST /resource/media.modification');
app.post('/resource/media.modification', 
		urlencodedParser, 
		checkConnexion, 
		createObjectPost, 
		checkChampsRequis({
			id : {nom:'Id'}, 
			titre : {nom:'Titre'}, 
			auteur : {nom:'Auteur'}, 
			type : {nom:'Type', values:['Livre', 'CD', 'DVD']}
		}),
		checkExistsMedia,
		function(req, res) {
	console.info('Call POST /resource/media.modification');
	res.writeHead(200, {'Content-Type': 'application/json'});
	data.setMedia(req.object.id, req.object);
	res.write(JSON.stringify(data.getMedia(req.object.id)));
	res.end();
});

/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/

var adherentFields = ['id','nom','prenom','email'];
console.info('Create GET /resource/adherent.recherche');
console.info('  Params : ? page');
console.info('           ? id');
console.info('           ? nom');
console.info('           ? prenom');
console.info('           ? email');
console.info('           ? texte', texteFields.reduce(function(previous, item){return (previous==undefined?'':previous+', ') + item;}, undefined));
console.info('           ? tri : ', adherentFields.reduce(function(previous, item){return (previous==undefined?'':previous+', ') + item;}, undefined));
app.get('/resource/adherent.recherche', 
		checkConnexion, 
		createObjectGet, 
		checkDefault('page', -1),
		checkDefault('tri', mediaFields[0]),
		checkChampsRequis({tri : {nom:'Type', values:adherentFields}}),
		function(req, res) {
	console.info('Call GET /resource/adherent.recherche');
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(data.getAdherents(req.object, req.object.tri, req.object.page)));
	res.end();
});

console.info('Create GET /resource/adherent.recherche.taille');
console.info('  Params : ? nom');
console.info('           ? prenom');
console.info('           ? email');
app.get('/resource/adherent.recherche.taille', 
		checkConnexion, 
		createObjectGet, 
		function(req, res) {
	console.info('Call GET /resource/adherent.recherche.taille');
	var list = data.getAdherents(req.object, undefined, -1);
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify({items:list.length,pages:Math.ceil(list.length/10)}));
	res.end();
});

console.info('Create GET /resource/adherent.accession');
console.info('  Params : ! id');
app.get('/resource/adherent.accession', 
		checkConnexion, 
		createObjectGet, 
		checkChampsRequis({id : {nom:'Id'}}),
		checkExistsAdherent,
		function(req, res) {
	console.info('Call GET /resource/adherent.accession');
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(data.getAdherent(req.object.id)));
	res.end();
});

console.info('Create POST /resource/adherent.creation');
app.post('/resource/adherent.creation', 
		urlencodedParser, 
		checkConnexion, 
		createObjectPost, 
		checkChampsExclus({id:'Id'}),
		checkChampsRequis({
			nom : {nom:'Nom'}, 
			prenom : {nom:'Prenom'}, 
			email : {nom:'eMail'}, 
			cotisation : {nom:'Cotisation'}, 
			date_naissance : {nom:'Date Naissance', format: 'date'}, 
			adresse : {nom:'Adresse', format:'adresse'}
		}),
		function(req, res) {
	console.info('Call POST /resource/adherent.creation');
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(data.createAdherent(req.object)));
	res.end();
});

console.info('Create POST /resource/adherent.modification');
app.post('/resource/adherent.modification', 
		urlencodedParser, 
		checkConnexion, 
		createObjectPost, 
		checkChampsRequis({
			id : {nom:'Id'}, 
			nom : {nom:'Nom'}, 
			prenom : {nom:'Prenom'}, 
			email : {nom:'eMail'}, 
			cotisation : {nom:'Cotisation'}, 
			date_naissance : {nom:'Date Naissance', format: 'date'}, 
			adresse : {nom:'Adresse', format:'adresse'}
		}),
		checkExistsAdherent,
		function(req, res) {
	console.info('Call POST /resource/adherent.modification');
	res.writeHead(200, {'Content-Type': 'application/json'});
	data.setAdherent(req.object.id, req.object);
	res.write(JSON.stringify(data.getAdherent(req.object.id)));
	res.end();
});

/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/

console.info('Create POST /resource/emprunt.ajout');
console.info('  Params : ? id_adherent');
console.info('           ? id_media');
console.info('           ? depart');
app.post('/resource/emprunt.ajout', 
		urlencodedParser, 
		checkConnexion, 
		createObjectPost, 
		checkChampsRequis({
			id_adherent : {nom:'Id Adherent'}, 
			id_media : {nom:'Id Media'}, 
			depart : {nom:'Depart', format: 'date'}, 
		}),
//		data.existAdherent(req.object.id_adherent)
//		data.existMedia(req.object.id_media)
		function(req, res) {
	console.info('Call POST /resource/emprunt.ajout => OK');
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(data.emprunte(req.object.id_adherent, req.object.id_media, req.object.depart)));
	res.end();
});    

/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
var logins = [{
	'login':'admin',
	'mdp' : 'istrateur', 
	'rights' : ["creation-adherent","creation-media"]
},{
	'login':'aze',
	'mdp' : 'aze', 
	'rights' : []
}];
logins.forEach(function(item){
	var authdata = btoa(item.login + ':' + item.mdp);
	item.code = 'Basic ' + authdata;
});
console.info('Create POST /resource/connexion.login');
console.info('  Params : ! login');
console.info('           ! mdp');
console.info('  logins : ', logins.reduce(function(previous, item){
	return (previous==undefined?'':previous+', ') + item.login + '/' + item.mdp;
}, undefined));
app.post('/resource/connexion.login', 
		urlencodedParser, 
		createObjectPost,
		function(req, res) {
	if((req.object.login==undefined)||(req.object.mdp==undefined)){
		console.info('Call POST /resource/connexion.login => ERREUR (bad params)');
		res.writeHead(412, {'Content-Type': 'application/json'});
		res.write('{"message":"Parametre login et mdp requis"}');
		res.end();
	} else if(!logins.reduce(function(previous,item){return previous || ((item.login===req.object.login) && (item.mdp===req.object.mdp))},false)){
		console.info('Call POST /resource/connexion.login => ERREUR (bad connexion)');
		res.writeHead(400, {'Content-Type': 'application/json'});
		res.write('{"message":"Couple login/mpd incorrect"}');
		res.end();
	} else {
		console.info('Call POST /resource/connexion.login => OK');
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write('{"message":"OK"}');
		res.end();
	}
});


console.info('Create GET /resource/connexion.rights');
app.get('/resource/connexion.rights', 
		checkConnexion, 
		function(req, res) {
	console.info('Call GET /resource/connexion.rights');
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.write(JSON.stringify(req.user.rights));
	res.end();
});

/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/

console.info('================================================================');
console.info('=== Serveur Pret !!! ===========================================');
console.info('================================================================');
