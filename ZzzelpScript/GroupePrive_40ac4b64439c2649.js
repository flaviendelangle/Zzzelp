function LoadModule_GroupePrive() {
	switch (document.location.pathname) {
		case "/alliance.php" :
			if(document.querySelectorAll('#formulaireChat').length > 0 && !ComptePlus && ZzzelpScript.parameters('parametres', ['perso', 'perso_page_chat'])) {
				ze_Amelioration_chat_prive('alliance');
			}
			if (~url.indexOf('Description') && ZzzelpScript.parameters('parametres', ['interface_prive', 'traceur_description'])) {
				ze_Affichage_traceur_Zzzelp(galliance, true);
			}
			break;
			
		case "/chat.php" :
			if (!ComptePlus && ZzzelpScript.parameters('parametres', ['perso', 'perso_page_chat'])) {
				ze_Amelioration_chat_prive('general');
			}
			break;
			
		case "/classementAlliance.php" :
			var alliance = ze_Analyser_URL('alliance');
			if (alliance && ZzzelpScript.parameters('parametres', ['interface_prive', 'traceur_description'])) {
				ze_Affichage_traceur_Zzzelp(alliance, true);
			}
			break;
			
		case "/Membre.php" :
			if(ZzzelpScript.parameters('parametres', ['perso', 'perso_page_profil'])) {
				ze_Amelioration_profil();
			}
			break;
	}

}


/* Ajoute le bouton d'auto actualisation du CA */
function ze_Amelioration_chat_prive(lieu) {
	var menu_CA = document.querySelectorAll('#formulaireChat .sur_une_ligne')[1],
		couleurs = new Array('000000', '242424', '331000', '663300', '600000', '8B0000', 'c5130f', 'b21377', '800d55', '4c0833', '4B0082', '9400D3', '4d08f0', '0000FF', '000099', '000031', '004c4c', '007373', '09750c', '084c08'),
		BBCode = {
			gras : 		{ onclick : miseEnForme, title : "Gras", src :"images/BBCode/bold.png" },
			italic : 	{ onclick : miseEnForme, title : "Italique", src : "images/BBCode/italic.png" },
			souligne : 	{ onclick : miseEnForme, title : "Souligné", src :"images/BBCode/underline.png" }, 
			centrer : 	{ onclick : addBalises,  title : "Centrer", src : url_zzzelp + "Images/center.png" },
			right : 	{ onclick : addBalises,  title : "Aligner à droite", src : url_zzzelp + "Images/right.png" }, 
			img : 		{ onclick : miseEnForme, title : "Image", src : "images/BBCode/picture.png" }, 
			url : 		{ onclick : miseEnForme, title : "Lien", src : "images/BBCode/link.png" },
			player : 	{ onclick : miseEnForme, title : "Pseudo", src : "images/BBCode/membre.gif", height : "15" },
			ally : 		{ onclick : miseEnForme, title : "Alliance", src : "images/BBCode/groupe.gif", height : "15" }
		},
		zone_couleurs = document.createElement('div');
	zone_couleurs.id = 'listeCouleur0';
	zone_couleurs.className = 'listeCouleur';
	zone_couleurs.setAttribute('style', 'display:none');
	zone_couleurs.onmouseout = function onmouseout(event) {
		testerCouleur('000000');
	};
	for(var i=0; i<couleurs.length; i++) {
		zone_couleurs.innerHTML += '<img src="images/BBCode/' + couleurs[i] + '.gif" id="' + couleurs[i] + '" onclick="changerCookieCouleur(\'' + couleurs[i] + '\');" onmouseover="testerCouleur(\'' + couleurs[i] + '\');">';
	}

	var bouton_couleur = document.createElement('strong');
	bouton_couleur.setAttribute('style', 'cursor:pointer;color: rgb(0, 0, 255);');
	bouton_couleur.title = "Couleur";
	bouton_couleur.id = 'boutonCouleur';
	bouton_couleur.innerHTML = 'A';
	bouton_couleur.onclick = function onclick(event) {
		appliquerCouleurChat();
	};


	var zone_BBCode = document.createElement('span');
	zone_BBCode.setAttribute('style', 'cursor:pointer;position:relative;top:3px');
	for(var code in BBCode) {
		var bouton = document.createElement('img');
		bouton.title = BBCode[code].title;
		bouton.src = BBCode[code].src;
		bouton.setAttribute('style', 'margin-left:4px');
		if(BBCode[code].height) {
			bouton.height = BBCode[code].height;
		}
		ze_Ajout_event_chat(bouton, code, BBCode[code]);
		zone_BBCode.appendChild(bouton);
	}
	menu_CA.appendChild(bouton_couleur);
	menu_CA.appendChild(zone_BBCode);
	document.querySelector('#' + ((lieu == 'alliance')?'alliance':'centre')).insertBefore(zone_couleurs, document.querySelector('#chatAlliance'));
	document.querySelector('#formulaireChat').action = '#';
	document.querySelector('#inputCouleur').value = ((ze_readCookie('cookieCouleurChat') === null) ? '000000' : ze_readCookie('cookieCouleurChat'));
	document.querySelector('#boutonCouleur').style.color = '#' + ((ze_readCookie('cookieCouleurChat') === null) ? '000000' : ze_readCookie('cookieCouleurChat'));
	document.querySelector('#message').focus();
}

function ze_Ajout_event_chat(bouton, code, valeurs) {
	bouton.onclick = function onclick(event) {
		valeurs.onclick('message', code);
	};
}

function ze_Amelioration_profil() {
	if(!ComptePlus) {
		ze_Initialisation_temps_trajet_profil();
	}
}

function ze_Initialisation_temps_trajet_profil() {
	var pseudo = document.querySelector('center h2').innerHTML;
	new ZzzelpScriptCoordonnees([pseudo], [], function(coordonnees) {
		var vitesse_attaque = zzzelp.compte.getVitesseAttaque(),
			defenseur = coordonnees[pseudo],
			attaquant = coordonnees[gpseudo],
			distance = ze_Calcul_distance(attaquant.x, attaquant.y, defenseur.x, defenseur.y),
			temps_trajet = ze_Calcul_temps_trajet(distance, vitesse_attaque);	
		var ligne = document.querySelector('.boite_membre table').insertRow(-1),
			cell = ligne.insertCell(0);
		cell.setAttribute('style', "text-align : right");
		cell.innerHTML = 'Distance :';
		ligne.insertCell(1).innerHTML = Math.ceil(distance);	
		ligne = document.querySelector('.boite_membre table').insertRow(-1);
		cell = ligne.insertCell(0);
		cell.setAttribute('style', "text-align : right");
		cell.innerHTML = 'Temps de trajet :';
		ligne.insertCell(1).innerHTML = ze_Secondes_date(temps_trajet);		
	});
}

function ze_Affichage_traceur_Zzzelp(alliance, premier) {
	if(premier) {
		var Traceur = document.createElement('script');	
		Traceur.src = url_zzzelp + '/Javascript/Traceur_prive.js';
		Traceur.type = 'text/javascript';
		document.querySelector('head').appendChild(Traceur);
	}
	if(typeof Generation_traceur_Zzzelp == 'undefined') {
		setTimeout(function(){
			ze_Affichage_traceur_Zzzelp(alliance, false);
		},1);
	}
	else {
		ze_Placer_traceur_classement_alliance(alliance);
	}
}

function ze_Placer_traceur_classement_alliance(alliance) {
	var zone = document.createElement('div'),
		entete = document.createElement('div');
	zone.id = 'donnees_traceur';
	zone.setAttribute('style', 'display:none');
	entete.className = 'raccourci_chasse_zzzelp';
	entete.innerHTML = '<a href="" onclick="document.querySelector(\'#donnees_traceur\').style.display = ((document.querySelector(\'#donnees_traceur\').style.display == \'none\') ? \'\' : \'none\');this.innerHTML = ((this.innerHTML == \'Afficher le traceur\') ? \'Masquer le traceur\' : \'Afficher le traceur\');return false;">Afficher le traceur</a>';
	document.querySelector('#centre').appendChild(entete);
	document.querySelector('#centre').appendChild(zone);
	Generation_traceur_Zzzelp('correspondances', [alliance], []);
}

function ze_TraceurPrive() {
	var button = document.querySelector('#zzzelp_synchro_traceur'),
		attente = 67 + Math.random()*38;
	if(button) {
		button.click();
	}
	setTimeout(function(){
		ze_TraceurPrive();
	}, attente*1000);
}

LoadModule_GroupePrive();