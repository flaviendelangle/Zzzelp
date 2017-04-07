/*
ACCUEIL DES CONVOIS
*/

function Analyse_convois_manuels() {
	document.querySelector('#section_convois_manuels').innerHTML = '<table id="convois"><tr><th>Receveur</th><th>Nourriture</th><th>Matériaux</th></tr></table>';
	var lignes = document.querySelector('#convois_manuels').value.split("\n"),
		n = 0;
	var longueur = lignes.length;
	for(var i=0;i<longueur;i++) {
		var ligne = lignes[i];
		if (~ligne.indexOf('Votre livraison de')) {
			var reg = new RegExp("Votre livraison de ([^\\/]+) nourriture et ([^\\/]+) matériaux est arrivée chez ([^ ^.^\\/]+)") ;
			rep = reg.exec(ligne);
			Ajout_ligne_convois(rep[3], parseInt(rep[1].replace(/ /g,'')), parseInt(rep[2].replace(/ /g,'')), n);
			n+=1;
		}
		else if (~ligne.indexOf('Vous allez livrer')) {
			var reg = new RegExp("Vous allez livrer ([^\\/]+) nourritures et ([^\\/]+) materiaux à ([^\\/]+) dans") ;
			rep = reg.exec(ligne);
			Ajout_ligne_convois(rep[3], parseInt(rep[1].replace(/ /g,'')), parseInt(rep[2].replace(/ /g,'')), n);
			n+=1;		
		}
	}
	document.querySelector('#bouton_analyse').style.display = "none";	
	document.querySelector('#bouton_import_convois').style.display = "";
}

function Ajout_ligne_convois(pseudo, nourriture, materiaux, n) {
    var cell, ligne;
    var tableau = document.querySelector("#convois");
    ligne = tableau.insertRow(-1); 
    cell = ligne.insertCell(0); 
	cell.setAttribute('id', 'td');
    cell.innerHTML = '<input type="text" class="input_tableau input_haut" id="pseudo_' + n + '" name="pseudo[]" value="' + pseudo + '">';
    cell = ligne.insertCell(1); 
	cell.setAttribute('id', 'td');
    cell.innerHTML = '<input type="text" class="input_tableau input_haut" id="nourriture_' + n + '" name="nourriture[]" onkeyup="ze_Ajout_espaces(this)" value="' + ze_Nombre(nourriture) + '">';
    cell = ligne.insertCell(2); 
	cell.setAttribute('id', 'td');
    cell.innerHTML = '<input type="text" class="input_tableau input_haut" id="materiaux_' + n + '" name="materiaux[]" onkeyup="ze_Ajout_espaces(this)" value="' + ze_Nombre(materiaux) + '">';
}

function Importe_convois_manuels() {
	var inputs = document.querySelectorAll('#convois input');
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
		document.querySelector('#ajout_convois_manuels').submit();
	}
	else {
		alert('Données manquantes');
	}
}

/*
LANCEMENT DU CONVOIS 
*/
function MAJ_convois(mode) {
	var convois = (parseInt(document.querySelector('#ouvrieres').value.replace(/ /g,"")) - parseInt(document.querySelector('#TDC').value.replace(/ /g,""))) * (10 + etable_pucerons *0.5);
	if (convois > convois_max) {
		convois = convois_max;
	}
	document.querySelector('#convois').value = Nombre(convois);
	document.querySelector('#' + Recuperer_variable('ressource')).value = convois;
}



/*
DEMANDE DE CONVOIS
*/

function Valider_demande() {
	var valeur = parseInt(document.querySelector('#valeur_demande').value.replace(/ /g, '')),
		date = ze_Date_to_timestamp_v1(document.querySelector('#date_demande').value),
		raison = document.querySelector('#demande_select').value;
		raison_2 = document.querySelector('#demande_raison').value;
	if(valeur == 0) {
		alert('Champ incorrect : Valeur')
	}
	else if(raison == '...Autre' && raison_2 == '') {
		alert('Champ incorrect : Raison')
	}
	else {
		document.location.href = ZzzelpScript.url + 'convois/stockage_demande?serveur=' + ze_Analyser_URL('serveur') + '&alliance=' + ze_Analyser_URL('alliance') + '&ressource=' + ze_Analyser_URL('ressource') + '&valeur=' + valeur + '&date=' + date + '&raison=' + raison + '&raison2=' + raison_2;
	}
}