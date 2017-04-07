/*
CHARGEMENT MF
*/
function Analyse_floods_manuels() {
	var resultats = new Array;
	var floods = document.querySelector('#floods_manuels').value.split("\n");	
	var longueur = floods.length;
	var n = -1;
	document.querySelector('#section_floods_manuels').innerHTML = '<table id="floods"><tr><th id="th">Cible</th><th id="th">Valeur</th><th id="th">Arrivée</th></tr></table>';
	for (var i=0; i<longueur; i++) {
		flood = floods[i];
		if (~flood.indexOf('Vous allez attaquer')) {
			var cible = flood.substr(flood.indexOf('attaquer ',1) + 9,flood.indexOf('(',1) - flood.indexOf('attaquer ',1) - 9);
			retour = flood.substr(flood.indexOf('dans',1) + 5,flood.length - flood.indexOf('dans',1));
			var duree = 0;
			if (~flood.indexOf('jour')) {
				duree += parseInt(retour.substr(0,retour.indexOf('jour',1)).replace(/ /g,"")) * 86400;
				retour = retour.substr(retour.indexOf('jour',1) + 5,retour.length - retour.indexOf('jour',1));
			}
			if (~flood.indexOf('heure')) {
				duree += parseInt(retour.substr(0,retour.indexOf('heure',1)).replace(/ /g,"")) * 3600;
				retour = retour.substr(retour.indexOf('heure',1) + 5,retour.length - retour.indexOf('heure',1));
			}
			if (~flood.indexOf('minute')) {
				duree += parseInt(retour.substr(0,retour.indexOf('minute',1)).replace('s',"").replace(/ /g,""))*60;
				retour = retour.substr(retour.indexOf('minute',1) + 6,retour.length - retour.indexOf('minute',1));		
			}
			if (~flood.indexOf('seconde')) {
				duree += parseInt(retour.substr(0,retour.indexOf('seconde',1)).replace('s',"").replace(/ /g,""));		
			}
			today = new Date();
			arrivee = new Date(today.getTime() + duree*1000);
			if (arrivee.getHours() < 10) {
				heures = "0" + arrivee.getHours();
			}
			else {
				heures = arrivee.getHours();
			}
			if (arrivee.getDate() < 10) {
				jours = "0" + arrivee.getDate();
			}
			else {
				jours = arrivee.getDate();
			}
			if (arrivee.getMinutes() < 10) {
				minutes = "0" + arrivee.getMinutes();
			}
			else {
				minutes = arrivee.getMinutes();
			}
			arrivee = (jours + '/' + ("0" + (arrivee.getMonth() + 1)).slice(-2) + '/' + arrivee.getFullYear() + ' ' + heures	+ ':' + minutes);
			resultats.push([cible, arrivee, 0]);
			n += 1;
		}
		else if (~flood.indexOf('Troupes en attaques')) {
			var capa_flood = 0;
			var unites = flood.substr(21, flood.indexOf('.',1) - 21).split(',');
			var longueur_2 = unites.length;
			for(var k=0;k<longueur_2;k++) {
				var reg = new RegExp("([ 0-9]+) ([a-zA-Z]+)") ;
				rep = reg.exec(unites[k]);
				capa_flood += parseInt(rep[1].replace(/ /g,""));
			}
			resultats[n][2] = capa_flood;
		}
	}
	for(var i=0;i<=n;i++) {
		Ajout_flood_manuel(resultats[n], n);
	}
	document.querySelector('#bouton_import_floods').style.display = "";
}

function Importe_floods_manuels() {
	var inputs = document.querySelectorAll('#floods input');
	var longueur = inputs.length;
	test = false;
	if(longueur >= 3) {
		test = true;
	}
	for(var i=0;i<longueur;i++) {
		if(inputs[i].value == "") {
			test = false;
		}
	}
	if(test) {
		document.querySelector('#ajout_floods_manuels').submit();
	}
	else {
		alert('Données manquantes');
	}
}

function Ajout_flood_manuel(donnees, i) {
    var cell, ligne;
    var tableau = document.querySelector("#floods");
    ligne = tableau.insertRow(-1); 
    cell = ligne.insertCell(0); 
	cell.setAttribute('id', 'td');
    cell.innerHTML = '<input type="text" class="input_large" id="pseudo_' + i + '" name="pseudo[]" value="' + donnees[0] + '">';
    cell = ligne.insertCell(1); 
	cell.setAttribute('id', 'td');
    cell.innerHTML = '<input type="text" class="input_large" id="valeur_' + i + '" name="valeur[]" onkeyup="Ajout_espaces(\'valeur_' + i + '\')" value="' + Nombre(donnees[2]) + '">';
    cell = ligne.insertCell(2); 
	cell.setAttribute('id', 'td');
    cell.innerHTML = '<input type="text" class="input_large" id="arrivee_' + i + '" name="arrivee[]" value="' + donnees[1] + '">';
}









/*
TABLEAU 
*/
function Initialisation_MF() {
	for(var i=0;i<6;i++) {
		if (getCookie(parametres[i]) == 1) {
			document.querySelectorAll('#parametres')[i].checked = true;
		}
		else if(getCookie(parametres[i])) {
			var test = true;
		}
		else if (i == 0 || i == 2 || i == 3 || i == 4) {
			setCookie(parametres[i], 1,365);
			document.querySelectorAll('#parametres')[i].checked = true;
		}
		else {
			setCookie(parametres[i], 0,365);
		}
		Modification_MF(i);
	}
}

function Modification_parametres(i) {
	if(document.querySelectorAll('#parametres')[i].checked == true) {
		setCookie(parametres[i], 1,365);	
	}
	else {
		setCookie(parametres[i], 0,365);	
	}
	Modification_MF(i)
}

function Modification_MF(i) {
	if(parametres[i] == 'joueurs_hdp') {
		Affichage_HDP(getCookie(parametres[i]));
	}
	else {
		Modification_interface(parametres[i],getCookie(parametres[i]));
	}
}

function Affichage_HDP(mode) {
	var tableau = document.querySelector('.tableau_triable');
	if(mode == 0) {
		for (var n=1;n<tableau.rows.length;n++) {
			tableau.rows[n].style.display = "";
		}
	}
	else if(mode == 1) {
		for (var n=1;n<tableau.rows.length;n++) {
			if (!document.querySelector('#case_' + (n-1)) && document.querySelector('#pseudo_' + (n-1)).innerHTML != pseudo_chargeur) {
				tableau.rows[n].style.display = "none";
			}
		}
	}
	else if (mode == 2) {
		var mode_2 = getCookie('joueurs_hdp');
		for (var n=1;n<tableau.rows.length;n++) {
			if ((document.querySelector('#affichage_' + document.querySelector('#alliance_' + (n-1)).innerHTML).checked == false || (!document.querySelector('#case_' + (n-1)) && mode_2 == 1)) && document.querySelector('#pseudo_' + (n-1)).innerHTML != pseudo_chargeur) {
				tableau.rows[n].style.display = "none";
			}
			else if (document.querySelector('#affichage_' + document.querySelector('#alliance_' + (n-1)).innerHTML).checked == true && (mode_2 == 0 || document.querySelector('#case_' + (n-1)))) {
				tableau.rows[n].style.display = "";
			}
		}		
	}
}

function Modification_interface(colonne,mode) {
	var champs = document.querySelectorAll('.' + colonne);
	var longueur = champs.length;
	for (var i=0; i<longueur; i++) {
		if(mode == 0) {
			champs[i].style.display = 'none';
		}
		else {
			champs[i].style.display = '';
		}
	}
}

function Ajout_joueur(n) {
	valeur_case = document.querySelector("#case_"+n).checked
	if (valeur_case == true) {
		var pseudo = document.querySelector("#pseudo_"+n).innerHTML,
			TDC = parseInt(document.querySelector('#tdc_' + n).innerHTML.replace(/ /g,"")),
			ligne = '<div id=donnees_' + n + '><input type="none" name="donnees_' + n + '" value="' + pseudo + ',' + TDC + '"></div>';
		document.querySelector('#joueurs_coches').innerHTML += ligne;
	}
	else if (valeur_case == false) {
		var el = document.querySelector('#donnees_' + n);
		var remElement = (el.parentNode).removeChild(el);
	}
}
