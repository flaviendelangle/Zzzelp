function Ajout_ligne_convois(mode) {
	var longueur = document.querySelectorAll('#' + mode + ' tr').length;
    var cell, ligne;
    var tableau = document.querySelector('#' + mode);
    ligne = tableau.insertRow(longueur-1);
    if(mode == 'priorites') {
		cell = ligne.insertCell(0);
		cell.innerHTML = '<input type="text" placeholder="Convoyeur" class="input_tableau input_haut" name="lanceurs[]">';
		cell = ligne.insertCell(1);
		cell.innerHTML = '<input type="text" placeholder="Cible1,Cible2" class="input_tableau input_haut" name="receveurs[]">';
		cell = ligne.insertCell(2);
		cell.innerHTML = '<img src="/Images/Fleche_haut.png" width="30px" onclick="Switch_prio_convois(this.parentNode.parentNode)">';
		cell.setAttribute('style', 'padding:0');
		cell = ligne.insertCell(3);
		cell.innerHTML = '<img src="/Images/Fleche_bas.png" width="30px" onclick="Switch_prio_convois(this.parentNode.parentNode.nextElementSibling)">';
		cell.setAttribute('style', 'padding:0');
	}
	else if(mode == 'relais') {
		cell = ligne.insertCell(0);
		cell.innerHTML = '<input class="input_tableau input_haut" type="text" name="pseudo_relais[]" placeholder="Pseudo du relais">';
		cell = ligne.insertCell(1);
		cell.innerHTML = '<input class="input_niveau input_haut" type="text" name="nombre_relais[]" value="14">';
	}
    else if(mode == 'multi') {
		cell = ligne.insertCell(0);
		cell.innerHTML = '<input type="text" class="input_semi_court" name="multi_1[]">';
		cell = ligne.insertCell(1);
		cell.innerHTML = '<input type="text" class="input_semi_court" name="multi_2[]">';
	}
    else if(mode == 'compte_plus') {
		cell = ligne.insertCell(0);
		cell.innerHTML = '<input type="text" class="input_semi_court" name="pseudo_compte_plus[]">';
		cell = ligne.insertCell(1);
		cell.innerHTML = '<input type="text" class="input_semi_court" name="valeur_compte_plus[]" id="valeur_compte_plus_' + (longueur-2) + '" onchange="Modification_bonus(' + (longueur-2) + ')" onkeyup="Ajout_espaces(\'valeur_compte_plus_' + (longueur-2) + '\')">';
		cell = ligne.insertCell(2);
		cell.innerHTML = '<a href="#" onClick="Ajout_compte_plus(\'valeur_compte_plus_' + (longueur-2) + '\')"><input type="image" src="/Images/plus.png" width="25"/></a>';
	}
}

function Modification_bonus(n) {
	var revenu = 10000000;
	var cp = parseInt(document.querySelector('#valeur_compte_plus_' + n).value.replace(/ /g,""));
	var cp_final = 0;
	var paliers = [0.6,0.8,100];
	var taxes = [0.3,0.5,0.8];
	for(var i=0;i<3;i++) {
		if(cp > revenu*paliers[i]) {
			cp_final += revenu*paliers[i]*(1-taxes[i]);
			cp -= revenu*paliers[i]
		}
		else {
			cp_final += cp*paliers[i]*(1-taxes[i])
			cp = 0;
		}
	}
	document.querySelector('#bonus_compte_plus_' + n).innerHTML = Nombre(cp_final);
}

function Affichage_parametres() {
	document.querySelector('#formule_tdp').style.display = ((document.querySelector('#formule_repartition').value == 1) ? '' : 'none');
	document.querySelector('#priorites_convois').style.display = ((document.querySelector('#algorithme_optimisation').value == 6) ? '' : 'none');
	document.querySelector('#relais_convois').style.display = ((document.querySelector('#activer_relais_convois').checked) ? '' : 'none');
}



function Ajout_alliance(mode) {
	var longueur = document.querySelectorAll('#' + mode + ' tr').length;
    var cell, ligne;
    var tableau = document.querySelector('#' + mode);
    ligne = tableau.insertRow(longueur-1); 
	if(mode == 'ennemis') {
		var alliances = document.querySelectorAll('.MP_dispos');
		cell = ligne.insertCell(0);
		cell.innerHTML = '<input type="text" class="input_gauche input_semi_court" name="TAG[]">';
		cell = ligne.insertCell(1);
		cell.innerHTML = '<select name="Type_ennemis[]"><option value="alliance">Alliance</option><option value="joueur">Joueur</option></select>';
		for(var i=0; i<alliances.length ; i++) {
			cell = ligne.insertCell(i+2);
			cell.innerHTML = '<input type="checkbox" name="MF_' + (longueur - 2) + '[]" value="' + alliances[i].dataset.alliance + '">';
		}
	}
	else if(mode == 'rangs') {
		cell = ligne.insertCell(0);
		cell.innerHTML = '<input type="text" class="input_gauche" name="Pseudos[]">';
		cell = ligne.insertCell(1);
		cell.innerHTML = '<input type="text" class="input_tableau" name="Mot_contenus[]">';
		cell = ligne.insertCell(2);
		cell.innerHTML = '<input type="text" class="input_tableau" name="Regex[]">';
		cell = ligne.insertCell(3);
		cell.innerHTML = '<input class="color input_tableau" id="td_couleur_' + (longueur-1) + '" name="Couleurs[]" value="66ff00">';
		cell = ligne.insertCell(4);
		cell.innerHTML = '<input type="text" class="input_tableau" name="Nom_rang[]">';
		cell = ligne.insertCell(5);
		cell.setAttribute('style', 'padding:0');
		cell.innerHTML = '<img src="/Images/Fleche_haut.png" width="30px" onclick="Deplacement_rang(this.parentNode.parentNode.rowIndex, true)">';
		cell = ligne.insertCell(6);
		cell.setAttribute('style', 'padding:0');
		cell.innerHTML = '<img src="/Images/Fleche_bas.png" width="30px" onclick="Deplacement_rang(this.parentNode.parentNode.rowIndex, false)">';
		var col = new jscolor.color(document.querySelector('#td_couleur_' + (longueur-1)));
		col.fromHSV(9,9,9)
	}
}

function Deplacement_rang(n, mode) {
	if(!mode || n > 1) {
		if(mode) {
			n -= 1;
		}
		var ligne = document.querySelector('#rangs').rows[n],
			id_color = ligne.querySelectorAll('input')[3].id,
			color = ligne.querySelectorAll('input')[3].value,
			nouvelle = document.querySelector('#rangs').insertRow(n+2),
			cellules = ligne.cells;
		for(var i=0; i<cellules.length; i++) {
			var cell = nouvelle.insertCell(-1)
			cell.innerHTML = cellules[i].innerHTML;
			cell.setAttribute('style', 'padding:0');
		}
		document.querySelector('#rangs').deleteRow(n);
		var col = new jscolor.color(document.querySelector('#' + id_color));
		//col.fromHSV(9,9,9)
		document.querySelector('#message_info').innerHTML = 'Pensez à enregistrer';
	}
}

function Importer_donnees(section) {
	document.querySelector('#section_actuelle').value = section;
	var xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		console.log(xdr.responseText);
		Tableau_exports(JSON.parse(xdr.responseText));
	}
	xdr.open('GET', url_site + 'exports_data?section=' + section + '&serveur=' + ze_Analyser_URL('serveur') + '&alliance=' + ze_Analyser_URL('alliance') + '&debut=' + ze_Timestamp_input(document.querySelector('#debut').value) + '&fin=' + ze_Timestamp_input(document.querySelector('#fin').value) + '&joueurs=[' + document.querySelector('#joueurs').value + ']', true);
	xdr.send();
}

function Tableau_exports(valeurs) {
	if(document.querySelectorAll('#zone_donnees table').length > 0) {
		ze_Supprimer_element(document.querySelector('#zone_donnees table'))
		ze_Supprimer_element(document.querySelector('#zone_donnees a'))
	}
	var lien = document.createElement('a'),
		tableau = document.createElement('table'),
		entete = tableau.insertRow(0);
	tableau.setAttribute('class', 'tableau_ombre');
	lien.href = url_site + '/Fichiers/' + valeurs.nom_fichier + '.csv';
	lien.innerHTML = 'Télécharger le relevé';
	lien.setAttribute('class', 'bouton bouton_large');
	for(var i=0; i<valeurs.entetes.length; i++) {
		var cell = document.createElement('th');
		cell.innerHTML = valeurs.entetes[i];
		entete.appendChild(cell);
	}
	for(var i=0; i<valeurs.donnees.length; i++) {
		var ligne = tableau.insertRow(-1);
		for(var k=0; k<valeurs.donnees[i].length; k++) {
			var cell = ligne.insertCell(k);
			cell.innerHTML = (in_array(valeurs.entetes[k], ['TDC', 'Valeur'])) ? ze_Nombre(parseInt(valeurs.donnees[i][k])) : valeurs.donnees[i][k];
		}
	}
	document.querySelector('#zone_donnees').appendChild(lien);
	document.querySelector('#zone_donnees').appendChild(tableau);
}







function Switch_prio_convois(row) {
    var sibling = row.previousElementSibling,
        anchor = row.nextElementSibling,
        parent = row.parentNode;
    parent.insertBefore(row, sibling);
}

function Preparer_valeurs() {
	var convois = document.querySelectorAll('#convois_restants .tel_2');
	for(var i=0; i<convois.length; i++) {
		convois[i].innerHTML = ze_Nombre_raccourci(parseInt(convois[i].parentNode.querySelector('.non_tel_2').innerHTML.replace(/ /g,'')), 3);
	}
}

function Action_convois(n, valeur) {
	if(valeur == 'Supprimer') {
		Supprimer_convois(n);
	}
	else if(valeur == 'Modifier') {
		$('#popup_convois_' + n).popUpWindow({action: 'open',size: 'small',});
	}
	else if(valeur == 'Valider') {

	}	
}

function Supprimer_convois(n) {
	if(confirm('Êtes-vous certains de vouloir supprimer ce convois ?')) {
		var ligne = document.querySelector('tr[data-numero*="' + n + '"]'),
			convoyeur = ligne.querySelectorAll('a strong')[0].innerHTML,
			convoye = ligne.querySelectorAll('a strong')[1].innerHTML,
			valeur = parseInt(ligne.querySelector('.non_tel_2').innerHTML.replace(/ /g,''));
		ze_Supprimer_element(ligne);
		Envoi_requete_convois(convoyeur, convoye, valeur, 'supprimer');
	}
}

function Modifier_convois(n) {
	var valeur = parseInt(document.querySelector('#convois_' + n).value.replace(/ /g,''));
	document.querySelector('tr[data-numero*="' + n + '"] .non_tel_2').innerHTML = ze_Nombre(valeur);
	$('#popup_convois_' + n).popUpWindow({action: 'close'});
	var ligne = document.querySelector('tr[data-numero*="' + n + '"]'),
		convoyeur = ligne.querySelectorAll('a strong')[0].innerHTML,
		convoye = ligne.querySelectorAll('a strong')[1].innerHTML,
		valeur = parseInt(ligne.querySelector('.non_tel_2').innerHTML.replace(/ /g,''));
	Envoi_requete_convois(convoyeur, convoye, valeur, 'modifier');
}

function Creer_convois() {
	var ligne = document.querySelector('#convois_restants').insertRow(document.querySelector('#convois_restants').rows.length-1);
	ligne.innerHTML = '<td colspan="3"><input type="text" placeholder="Convoyeur" style="float:left;vertical-align:top" class="input_haut input_court"><input type="text" placeholder="Valeur" style="vertical-align:top" class="input_haut input_semi_court" onkeyup="ze_Ajout_espaces(this)"><input type="text" placeholder="Convoyé" style="float:right;vertical-align:top" class="input_haut input_court"></td><td colspan="2"><img src="/Images/valider.png" style="cursor:pointer" onclick="Valider_creation_convois(' + (document.querySelector('#convois_restants').rows.length-2) + ')"></td>';
	ligne.dataset.numero = document.querySelector('#convois_restants').rows.length-2;
}

function Valider_creation_convois(n) {
	var ligne = document.querySelector('tr[data-numero*="' + n + '"]'),
		convoyeur = ligne.querySelectorAll('input')[0].value,
		convoye = ligne.querySelectorAll('input')[2].value,
		valeur = parseInt(ligne.querySelectorAll('input')[1].value.replace(/ /g,''));
	ligne.innerHTML = '<td><a href="http://' + ze_Analyser_URL('serveur') + '.fourmizzz.fr/Membre.php?Pseudo=' + convoyeur + '" target="_BLANK" ><strong>' + convoyeur + '</strong></a></td>';
	ligne.innerHTML += '<td style="font-weight:bold"><div class="non_tel_2">' + ze_Nombre(valeur) + '</div><div class="tel_2">' + ze_Nombre_raccourci(valeur, 3) + '</div></td>';
	ligne.innerHTML += '<td><a href="http://' + ze_Analyser_URL('serveur') + '.fourmizzz.fr/Membre.php?Pseudo=' + convoye + '" target="_BLANK" ><strong>' + convoye + '</strong></a></td>';
	ligne.innerHTML += '<td><select onchange="Action_convois(' + n + ', this.value)"><option>-</option><option>Supprimer</option><option>Modifier</option><option>Valider</option></select></td>';		
	Envoi_requete_convois(convoyeur, convoye, valeur, 'creer');
}

function Envoi_requete_convois(convoyeur, convoye, valeur, mode) {
	var xdr = ze_getXDomainRequest();
	xdr.open('GET', url_zzzelp + 'update_convois?serveur=' + ze_Analyser_URL('serveur') + '&alliance=' + ze_Analyser_URL('alliance') + '&mode=' + mode + '&convoyeur=' + convoyeur + '&convoye=' + convoye + '&valeur=' + valeur);
    xdr.send(null);	
}
