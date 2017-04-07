function Recuperation_armees() {
	var armees = {},
		lieux = new Array('TDC', 'dome', 'loge');
	for(var i=0; i<2; i++) {
		unites = [];
		for(var j=0; j<14; j++) {
			unites.push(parseInt(document.querySelector('#unite_' + i + '_' + j).value.replace(/ /g,"")));
		}
		armees[i === 0 ? 'attaquant' : 'defenseur'] = new ZzzelpScriptArmee(unites, {
			armes : parseInt(document.querySelector('#armes_' + i).value),
			bouclier : parseInt(document.querySelector('#bouclier_' + i).value),	
			lieu : 0	
		});
	}
	armees.attaquant.cochenille = parseInt(document.querySelector('#cochenille_0').value);
	for(i=0;i<3;i++) {
		if(document.querySelector('#actif_lieu_' + lieux[i]).checked) {
			armees.defenseur.niveaux.lieu = i;
			if(i === 0) {
				armees.defenseur.niveaux.niveau_lieu = 0;
			}
			else {
				armees.defenseur.niveaux.niveau_lieu = parseInt(document.querySelector('#lieu_' + lieux[i]).value);
			}
		}
	}
	return armees;
}

function Calcul_XP(serveur) {
	var donnees = Recuperation_armees(),
		form = new FormData();
	donnees.mode = document.querySelector('#mode').value;
	donnees.mode_opti = document.querySelector('#mode_opti').value;
	donnees.position = document.querySelector('#position').value;
	donnees.affichage_XP_simulateur = (document.querySelector('#affichage_XP_simulateur').checked ? 1 : 0);
	donnees.XP_plusieurs_tours = (document.querySelector('#XP_plusieurs_tours').checked ? 1 : 0);

	form.append('donnees', JSON.stringify(donnees));
	var xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		//document.querySelector('#zone_RC').innerHTML = xdr.responseText;
		Analyse_resultats(JSON.parse(xdr.responseText));
	};
	xdr.open("POST", url_site + 'XP_data?origine=simulateur', true);
	xdr.send(form);

}

function Analyse_resultats(donnees) {
	if(donnees.erreur === '') {
		document.querySelector('#zone_RC').innerHTML = '<br><a href="#" class="button button-flat-primary bouton" onClick="prompt(\'Lien du RC : \',\'' + url_site + donnees.url + '\')">Partager</a><br><br>' + donnees.RC;
		localStorage.setItem(donnees_simulateur_combat, JSON.stringify(donnees));
		Insertion_donnees();
		document.querySelector('#armee_avant').innerHTML = 'Avant le combat';
		document.querySelector('#armee_apres').innerHTML = 'Après le combat';
		document.querySelector('#armee_avant').onclick = function onclick(event) {
			document.querySelector('#tableau_combat').dataset.mode = 'avant';Insertion_donnees();
			MAJ_stats_armees('');
		};
		document.querySelector('#armee_apres').onclick = function onclick(event) {
			document.querySelector('#tableau_combat').dataset.mode = 'après';
			Insertion_donnees();MAJ_stats_armees('');
		};
		MAJ_stats_armees('');
	}
	else {
		document.querySelector('#zone_RC').innerHTML = '<div style="  color: red;font-weight: bold;font-size: 1.5em;padding: 20px;">' + donnees.erreur + '</div>';
	}
}

function Inverser_armees() {
	var armees = Recuperation_armees();
	Insertion_donnees([armees.defenseur.unites, armees.attaquant.unites]);
	MAJ_stats_armees("");

}

function Insertion_donnees(armees) {
	if(typeof armees == "undefined") {
		var donnees = JSON.parse(localStorage.getItem(donnees_simulateur_combat));
		if(document.querySelector('#tableau_combat').dataset.mode == 'après') {
			armees = new Array(donnees.armee_att_apres, donnees.armee_def_apres);
		}
		else {
			armees = new Array(donnees.armee_att_avant, donnees.armee_def_avant);
		}
	}
	for(var n=0;n<2;n++) {
		for(i=0;i<14;i++) {
			document.querySelector('#unite_' + n + '_' + i).value = ze_Nombre(parseInt(armees[n][i]));
		}
	}
}

function Modification_mode() {
	var mode = document.querySelector('#mode').value;
	if(mode === 0) {
		document.querySelector('#parametres_simulateur').style.display = "";
		document.querySelector('#parametres_XP').style.display = "none";
	}
	else if(mode == 1) {
		document.querySelector('#parametres_simulateur').style.display = "none";
		document.querySelector('#parametres_XP').style.display = "";
	}
}

function MAJ_stats_armees(ID) {
	if(ID !== "") {
		ze_Ajout_espaces(document.querySelector('#' + ID));
	}
	var armees = Recuperation_armees(),
		joueur;
	for (var n=0;n<2;n++) {
		joueur = (n === 0) ? 'attaquant' : 'defenseur';
		document.querySelector('#attaque_' + n).innerHTML = ze_Nombre(parseInt(armees[joueur].getAttaqueAB()));
		document.querySelector('#defense_' + n).innerHTML = ze_Nombre(parseInt(armees[joueur].getDefenseAB()));
		document.querySelector('#vie_' + n).innerHTML = ze_Nombre(parseInt(armees[joueur].getVieAB()));
	}
}

function Appliquer_armee_serveur(serveur) {
	for(var j=0; j<14; j++) {
		document.querySelector('#unite_0_' + j).value = ze_Nombre(parseInt(armees_fzzz[serveur][j]));
	}
	MAJ_stats_armees("");
}

function Chargement_armee(n) {
	var joueurs = ['attaquant', 'defenseur'],
		releve = document.querySelector('#releve_' + n).value;
	if(releve !== "") {
		var armee = ZzzelpScriptArmee.analyse(releve);
		for(var i=0;i<14;i++) {
			document.querySelector('#unite_' + n + '_' + i).value = ze_Nombre(armee.unites[i]);
		}	
	}
	MAJ_stats_armees("");
	$('#popup_' + joueurs[n]).popUpWindow({
		action: "close",
	});
	document.querySelector('#releve_' + n).value = "";
}	
