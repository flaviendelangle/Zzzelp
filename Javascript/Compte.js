function Modifier_parametre_fond(valeur, zone) {
	var inputs = document.querySelectorAll('#parametres_' + zone + ' input[id*="input_"]');
	for(var i=0; i<inputs.length; i++) {
		inputs[i].disabled = !(inputs[i].id == 'input_' + valeur);
	}
}			
			
function Lancement_creation_theme() {
	document.querySelector('#nouveau_theme').style.display = (document.querySelector('#check_nouveau_theme').checked ? 'block' : 'none');
}

function Previsualisation_theme() {
	document.querySelector('.zone_previsualisation').style.display = 'block';
	
	document.body.style.background = ((document.querySelector('#mode_nouveau_fond').value == 'image') ? 'url("' + document.querySelector('#parametres_nouveau #input_image').value + '")' : '#' + document.querySelector('#parametres_nouveau #input_unie').value);
	
	var couleur = HEXtoRGB('#' + document.querySelectorAll('#entete_table input')[0].value, document.querySelectorAll('#entete_table input')[1].value),
		cells = document.querySelectorAll('.zone_previsualisation th');
	for(var i=0; i<cells.length; i++) {
		cells[i].style.background = couleur;
	}
	var couleur = HEXtoRGB('#' + document.querySelectorAll('#texte_entete input')[0].value, document.querySelectorAll('#texte_entete input')[1].value),
		cells = document.querySelectorAll('.zone_previsualisation .entete_cadre');
	for(var i=0; i<cells.length; i++) {
		cells[i].style.color = couleur;
	}
	document.querySelector('.zone_previsualisation .zone_largeur_courte').style.background = HEXtoRGB('#' + document.querySelectorAll('#fond_contenu input')[0].value, document.querySelectorAll('#fond_contenu input')[1].value);
	document.querySelector('.zone_previsualisation .zone_lisible').style.background = HEXtoRGB('#' + document.querySelectorAll('#fond_lisible input')[0].value, document.querySelectorAll('#fond_lisible input')[1].value);

	//BOUTONS
	var c1 = HEXtoRGB('#' + document.querySelectorAll('#couleur_1_bouton input')[0].value, document.querySelectorAll('#couleur_1_bouton input')[1].value),
		c2 = HEXtoRGB('#' + document.querySelectorAll('#couleur_2_bouton input')[0].value, document.querySelectorAll('#couleur_2_bouton input')[1].value),
		color = HEXtoRGB('#' + document.querySelectorAll('#texte_bouton input')[0].value, document.querySelectorAll('#texte_bouton input')[1].value),
		ombre = HEXtoRGB('#' + document.querySelectorAll('#ombre_bouton input')[0].value, document.querySelectorAll('#ombre_bouton input')[1].value),
		css = '.zone_previsualisation .bouton{box-shadow:inset 0px 1px 0px 0px ' + ombre + ', 2px 2px 2px 0 rgba(0,0,0,0.4);background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, ' + c2 + '), color-stop(1, ' + c1 + '));background:-moz-linear-gradient(top, ' + c2 + ' 5%, ' + c1 + ' 100%);background:-webkit-linear-gradient(top, ' + c2 + ' 5%, ' + c1 + ' 100%);background:-o-linear-gradient(top, ' + c2 + ' 5%, ' + c1 + ' 100%);background:-ms-linear-gradient(top, ' + c2 + ' 5%, ' + c1 + ' 100%);background:linear-gradient(to bottom, ' + c2 + ' ?> 5%, ' + c1 + ' 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'' + c2 + '\', endColorstr=\'' + c1 + '\',GradientType=0);background-color:' + c2 + ';color:' + color + ';}.zone_previsualisation .bouton:hover {background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, ' + c1 + '), color-stop(1, ' + c2 + '));background:-moz-linear-gradient(top, ' + c1 + ' 5%, ' + c2 + ' 100%);background:-webkit-linear-gradient(top, ' + c1 + ' 5%, ' + c2 + ' 100%);background:-o-linear-gradient(top, ' + c1 + ' 5%, ' + c2 + ' 100%);background:-ms-linear-gradient(top, ' + c1 + ' 5%, ' + c2 + ' 100%);background:linear-gradient(to bottom, ' + c1 + ' 5%, ' + c2 + ' 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'' + c1 + '\', endColorstr=\'' + c2 + '\',GradientType=0);background-color:' + c1 + ';}';
	if(document.querySelectorAll('#style_boutons').length > 0) {
		ze_Supprimer_element(document.querySelector('#style_boutons'));
	}
	style=document.createElement('style');
	if (style.styleSheet) {
		style.styleSheet.cssText=css;
	}
	else {
		style.appendChild(document.createTextNode(css));
	}
	style.setAttribute('id', 'style_boutons');
	document.getElementsByTagName('head')[0].appendChild(style);
}


function HEXtoRGB(hex, opacity) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return (result ? 'rgba(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ',' + ((opacity == '') ? 0.8 : opacity) + ')' : '');
}		


function Generation_JSON_theme() {
	if(document.querySelector('#nom_theme').value == '') {
		alert('Il faut d\'abord nommer votre thème');
	}
	else {
		var theme = {
				nom : document.querySelector('#nom_theme').value,
				mode_fond : document.querySelector('#mode_nouveau_fond').value,
				valeur_fond : ((document.querySelector('#mode_nouveau_fond').value == 'image') ? 'url("' + document.querySelector('#parametres_nouveau #input_image').value + '")' : '#' + document.querySelector('#parametres_nouveau #input_unie').value),
				entete_table : HEXtoRGB('#' + document.querySelectorAll('#entete_table input')[0].value, document.querySelectorAll('#entete_table input')[1].value),
				texte_entete :  HEXtoRGB('#' + document.querySelectorAll('#texte_entete input')[0].value, document.querySelectorAll('#texte_entete input')[1].value),
				fond_contenu : HEXtoRGB('#' + document.querySelectorAll('#fond_contenu input')[0].value, document.querySelectorAll('#fond_contenu input')[1].value),
				fond_lisible : HEXtoRGB('#' + document.querySelectorAll('#fond_lisible input')[0].value, document.querySelectorAll('#fond_lisible input')[1].value),
				couleur_1_bouton : HEXtoRGB('#' + document.querySelectorAll('#couleur_1_bouton input')[0].value, document.querySelectorAll('#couleur_1_bouton input')[1].value),
				couleur_2_bouton : HEXtoRGB('#' + document.querySelectorAll('#couleur_2_bouton input')[0].value, document.querySelectorAll('#couleur_2_bouton input')[1].value),
				texte_bouton : HEXtoRGB('#' + document.querySelectorAll('#texte_bouton input')[0].value, document.querySelectorAll('#texte_bouton input')[1].value),
				ombre_bouton : HEXtoRGB('#' + document.querySelectorAll('#texte_bouton input')[0].value, document.querySelectorAll('#texte_bouton input')[1].value),		
			}
		var input = document.createElement('input');
		input.type = 'hidden';
		input.value = JSON.stringify(theme);
		input.name = 'creation_theme';
		document.querySelector('form').appendChild(input);
		document.querySelector('form').submit();
	}
}









function Affichage_options_modules() {
	var modules = document.querySelectorAll('#liste_modules input');
	for(var n=0; n<modules.length; n++) {
		if(document.querySelector('#module_' + modules[n].dataset.module)) {
			document.querySelector('#module_' + modules[n].dataset.module).style.display = modules[n].checked ? '' : 'none'
		}
	}
	document.querySelector('.zone_authentification_zzzelpscript').style.height = '';
	document.querySelector('.zone_parametres_zzzelpscript').style.height = '';
	var h1 = document.querySelector('.zone_authentification_zzzelpscript').offsetHeight,
		h2 = document.querySelector('.zone_parametres_zzzelpscript').offsetHeight,
	hauteur = Math.max(h1,h2) + 40;
	document.querySelector('.zone_authentification_zzzelpscript').style.height =  hauteur + 'px';
	document.querySelector('.zone_parametres_zzzelpscript').style.height = hauteur + 'px';
}

function Analyse_releves(mode, releves) {
	if (releves != '') {
		var xdr = ze_getXDomainRequest();
		xdr.onload = function() {
			Affichage_releves(mode, JSON.parse(xdr.responseText));
		}
		xdr.open('POST', url_site + '/parser_releves', true);
		xdr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xdr.send('releves=' + releves +'&mode=' + mode);
	}
}

function Affichage_releves(mode, donnees) {
	var zone = document.querySelector('#zone_releves_' + mode),
		tableau = document.createElement('table');
	tableau.setAttribute('class', 'tableau_ombre');
	zone.innerHTML = '';
	zone.appendChild(tableau);
	if(mode == 'floods') {
		var	ligne = tableau.insertRow(0),
			pseudo = document.createElement('th'),
			valeur = document.createElement('th'),
			retour = document.createElement('th');
		pseudo.innerHTML = 'Pseudo';
		valeur.innerHTML = 'Valeur';
		retour.innerHTML = 'Retour';
		ligne.appendChild(pseudo);
		ligne.appendChild(valeur);
		ligne.appendChild(retour);
		for(var i=0; i<donnees.length; i++) {
			var ligne = tableau.insertRow(-1),
				pseudo = ligne.insertCell(0),
				valeur = ligne.insertCell(1),
				retour = ligne.insertCell(2),
				input_pseudo = document.createElement('input'),
				input_valeur = document.createElement('input'),
				input_retour = document.createElement('input');
			input_pseudo.setAttribute('class', 'input_releves input_haut');
			input_valeur.setAttribute('class', 'input_releves input_haut');
			input_retour.setAttribute('class', 'input_releves input_haut');
			input_valeur.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this); return false;};
			input_pseudo.value = donnees[i].pseudo;
			input_valeur.value = ze_Nombre(donnees[i].valeur);
			input_retour.value = (donnees[i].retour == 0) ? 'inconnu' : ze_Generation_date_v1(donnees[i].retour);
			input_retour.setAttribute('placeholder', ze_Generation_date_v1(time()));
			pseudo.appendChild(input_pseudo);
			valeur.appendChild(input_valeur);
			retour.appendChild(input_retour);
		}
	}
	else if(mode == 'chasses') {
		var	ligne = tableau.insertRow(0),
			valeur = document.createElement('th'),
			retour = document.createElement('th');
		valeur.innerHTML = 'Valeur';
		retour.innerHTML = 'Retour';
		ligne.appendChild(valeur);
		ligne.appendChild(retour);
		for(var i=0; i<donnees.length; i++) {
			var ligne = tableau.insertRow(-1),
				valeur = ligne.insertCell(0),
				retour = ligne.insertCell(1),
				input_valeur = document.createElement('input'),
				input_retour = document.createElement('input');
			input_valeur.setAttribute('class', 'input_releves input_haut');
			input_retour.setAttribute('class', 'input_releves input_haut');
			input_valeur.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this); return false;};
			input_valeur.value = ze_Nombre(donnees[i].valeur);
			input_retour.value = (donnees[i].retour == 0) ? 'inconnu' : ze_Generation_date_v1(donnees[i].retour);
			input_retour.setAttribute('placeholder', ze_Generation_date_v1(time()));
			valeur.appendChild(input_valeur);
			retour.appendChild(input_retour);
		}
	}
	
	var bouton = document.createElement('a');
	bouton.innerHTML = 'Enregistrer';
	bouton.setAttribute('class', 'bouton' + ((~url.indexOf('MF')) ? '' : (' ' + 'bouton_rouge')));
	bouton.onclick = function onclick(event) {Stocker_releves(mode); return false;};
	zone.appendChild(bouton);
	if(!~url.indexOf('MF')) {
		var	h1 = document.querySelector('#zone_releves_floods').offsetHeight + 50,
			h2 = document.querySelector('#zone_releves_chasses').offsetHeight + 50,
			hauteur = Math.max(h1,h2);
		document.querySelector('#zone_releves_chasses').style.height =  hauteur + 'px';
		document.querySelector('#zone_releves_floods').style.height = hauteur + 'px';
		document.querySelector('.zone_parametres_' + mode).scrollIntoView(true)
	}
}

function Stocker_releves(mode) {
	if(mode == 'floods') {
		var lignes = document.querySelector(((~url.indexOf('MF')) ? '#zone_releves_floods' : '.zone_parametres_' + mode) + ' table').rows,
			releves = new Array(),
			correct = true;
		for(var i=1; i<lignes.length; i++) {
			var inputs = lignes[i].querySelectorAll('input');
			if(!inputs[2].value.match(new RegExp('([ 0-9]{2})\/([ 0-9]{2})\/([ 0-9]{2})( |  )([ 0-9]{2})h([ 0-9]{2})'))) {
				alert('Vérifiez les dates de retour');
				correct = false;
				break;
			}
			else {
				releves.push({ pseudo : inputs[0].value, valeur : parseInt(inputs[1].value.replace(/ /g, '')), retour : ze_Date_to_timestamp_v1(inputs[2].value) });
			}
		}
		if(correct) {
			var xdr = ze_getXDomainRequest();
			xdr.onload = function() {
				var zone = document.createElement('div');
				console.log(xdr.responseText);
				zone.innerHTML = (xdr.responseText == 1) ? 'Stockage réussi' : 'Stockage échoué';
				zone.setAttribute('style', 'font-weight:bold;text-align:center;color:' + ((xdr.responseText == 1) ? 'green' : 'red'));
				document.querySelector('#zone_releves_' + mode).appendChild(zone);
			}
			xdr.open('POST', url_site + '/stockage_floods?serveur=' + serveur, true);
			xdr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xdr.send('releves=' + JSON.stringify(releves));		
		}
	}
	else if(mode == 'chasses') {
		var lignes = document.querySelector('.zone_parametres_' + mode + ' table').rows,
			releves = new Array(),
			correct = true;
		for(var i=1; i<lignes.length; i++) {
			var inputs = lignes[i].querySelectorAll('input');
			if(!inputs[1].value.match(new RegExp('([ 0-9]{2})\/([ 0-9]{2})\/([ 0-9]{2})( |  )([ 0-9]{2})h([ 0-9]{2})'))) {
				alert('Vérifiez les dates de retour');
				correct = false;
				break;
			}
			else {
				releves.push({ valeur : parseInt(inputs[0].value.replace(/ /g, '')), retour : ze_Date_to_timestamp_v1(inputs[1].value) });
			}
		}
		if(correct) {
			var xdr = ze_getXDomainRequest();
			xdr.onload = function() {
				var zone = document.createElement('div');
				zone.innerHTML = (xdr.responseText == 1) ? 'Stockage réussi' : 'Stockage échoué';
				zone.setAttribute('style', 'font-weight:bold;text-align:center;color:' + ((xdr.responseText == 1) ? 'green' : 'red'));
				document.querySelector('#zone_releves_' + mode).appendChild(zone);
			}
			xdr.open('POST', url_site + '/stockage_chasses?serveur=' + serveur, true);
			xdr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xdr.send('releves=' + JSON.stringify(releves));		
		}
	}
}



























function Ajouter_chasses() {
	var chasses = document.querySelector('#chasses').value.split('- Vos');
	var longueur = chasses.length;
	var valeur = 0;
	var arrivee = false;
	for (var i=0; i<longueur; i++) {
		chasse = chasses[i];
		if (~chasse.indexOf('chasseuses')) {
			valeur += parseInt(chasse.substr(chasse.indexOf('rir',1) + 4,chasse.indexOf('cm2',1) - chasse.indexOf('rir',1)-5).replace(/ /g,""))	
			retour = chasse.substr(chasse.indexOf('dans',1) + 5,chasse.length - chasse.indexOf('dans',1));
			var duree = 0;
			if (~chasse.indexOf('jour')) {
				duree += parseInt(retour.substr(0,retour.indexOf('jour',1)).replace(/ /g,"")) * 86400;
				retour = retour.substr(retour.indexOf('jour',1) + 5,retour.length - retour.indexOf('jour',1));
			}
			if (~chasse.indexOf('heure')) {
				duree += parseInt(retour.substr(0,retour.indexOf('heure',1)).replace(/ /g,"")) * 3600;
				retour = retour.substr(retour.indexOf('heure',1) + 5,retour.length - retour.indexOf('heure',1));
			}
			if (~chasse.indexOf('minute')) {
				duree += parseInt(retour.substr(0,retour.indexOf('minute',1)).replace('s',"").replace(/ /g,""))*60;
				retour = retour.substr(retour.indexOf('minute',1) + 6,retour.length - retour.indexOf('minute',1));		
			}
			if (~chasse.indexOf('seconde')) {
				duree += parseInt(retour.substr(0,retour.indexOf('seconde',1)).replace('s',"").replace(/ /g,""));		
			}
			if(!arrivee) {
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
			}
		}
	}
	document.querySelector('#valeur_chasses').value = Nombre(valeur);
	document.querySelector('#arrivee_chasses').value = (jours + '/' + (arrivee.getMonth()+1) + '/' + arrivee.getFullYear() + ' ' + heures	+ ':' + minutes);
}


function Generation_zone_creation_pack(pack, afficher) {
	document.querySelector('.creation_nouveau_pack').checked = (pack == 0 && afficher);
	document.querySelector('#titre_creation_pack').innerHTML = (pack == 0) ? 'Création' : 'Modification';
	document.querySelector('#titre_creation_pack').dataset.mode = (pack == 0) ? 'creer' : 'modifier';
	document.querySelector('#titre_creation_pack').dataset.ID = pack;
	document.querySelector('#extension_fichier').disabled = (pack > 0);
	document.querySelector('#nom_pack').disabled = (pack > 0);	
	document.querySelector('#nouveau_pack').style.display = afficher ? '' : 'none';
		
	// Nettoyage de la zone
	var ligne = document.querySelector('.ligne_packs[data-numero="Z' + pack + '"]'),
		options = document.querySelectorAll('#categories_nouveau option');
	for(var i=0; i<options.length; i++) {
		options[i].selected = false;
	}
	while(document.querySelectorAll('.anciens_smileys').length > 0) {
		ze_Supprimer_element(document.querySelectorAll('.anciens_smileys')[0].parentNode)
	}
	document.querySelector('#nom_pack').value = '';
	document.querySelector('.pack_public').checked = true;
	document.querySelector('#alliances_nouveau').value = '',
	document.querySelector('#joueurs_nouveau').value = '';
	document.querySelector('#extension_fichier').value = 'gif';
	if(document.querySelector('#etape_smileys').innerHTML == "2") {
		Etape_suivante_smileys(false);
	}
	
	// Application des anciennes valeurs
	if(pack != 0) {
		var categories = ligne.dataset.categories.split(','),
			smileys = document.querySelectorAll('div[data-numero="Z' + pack + '"] img[src*="/Images/Smileys/"]');
		document.querySelector('#nom_pack').value = ligne.dataset.nom;
		document.querySelector('.pack_public').checked = ligne.dataset.public == '1';
		document.querySelector('#alliances_nouveau').value = ligne.dataset.alliances;
		document.querySelector('#joueurs_nouveau').value = ligne.dataset.joueurs;
		document.querySelector('#extension_fichier').value = ligne.dataset.format;
		for(var i=0; i<options.length; i++) {
			options[i].selected = in_array(options[i].value, categories);
		}
		for(var i=0; i<smileys.length; i++) {
			var ligne = document.createElement('div'),
				miniature = document.createElement('img'),
				suppression = document.createElement('img');
			ligne.setAttribute('style', 'min-height: 3em;height: initial;line-height: normal;display:none;width: 100%;');
			ligne.className = 'ligne_cadre_structure etape_2';
			miniature.src = smileys[i].src;
			miniature.setAttribute('style', 'width:auto;height:auto;float:left');
			suppression.src = '/Images/suppression.png';
			suppression.setAttribute('style', 'cursor:pointer');
			suppression.dataset.titre = smileys[i].dataset.titre;
			suppression.className = 'anciens_smileys';
			suppression.onclick = function onclick(event) { ze_Supprimer_element(this.parentNode); }
			ligne.appendChild(suppression);
			ligne.appendChild(miniature);
			document.querySelector('.liste_smileys').appendChild(ligne);
		}
	}

}

function Ajout_lien_smiley(nouveau) {
	if(document.querySelectorAll('#ajout_smiley').length > 0) {
		ze_Supprimer_element(document.querySelector('#ajout_smiley'));
	}
	var ligne = document.createElement('div'),
		input = document.createElement('input'),
		img = document.createElement('img');
	ligne.className = 'ligne_cadre_structure' + (nouveau ? ' etape_2' : '');
	input.type = "file";
	input.accept = '.' + document.querySelector('#extension_fichier').value
	input.setAttribute('style', 'float:left');
	input.className = 'fichier_local_smiley';
	img.src = '/Images/plus.png';
	img.setAttribute('style', 'width:1em;height:1em;margin-top:1em;cursor:pointer');
	img.id = 'ajout_smiley';
	img.onclick = function onclick(event) { Ajout_lien_smiley(nouveau); }
	ligne.appendChild(input);
	ligne.appendChild(img);
	document.querySelector((nouveau ? '#nouveau_pack' : '#modifier_pack') + ' .liste_smileys').appendChild(ligne);
}

function Etape_suivante_smileys(suivant) {
	var etape = parseInt(document.querySelector('#etape_smileys').innerHTML) + (suivant ? 1 : -1);
	if(etape == 2 && document.querySelector('#nom_pack').value == '') {
		ze_Inserer_message('Veuillez rentrer un nom de pack', 3000);
	}
	else {
		if(etape == 2) {
			if(document.querySelectorAll('#ajout_smiley').length == 0) {
				Ajout_lien_smiley(true);
			}
			document.querySelector('#fin_creation_smileys').style.display = '';
			document.querySelector('#suite_creation_smileys').style.display = 'none';
		}
		else if(etape == 1) {
			document.querySelector('#fin_creation_smileys').style.display = 'none';
			document.querySelector('#suite_creation_smileys').style.display = '';
		}
		document.querySelector('#etape_smileys').innerHTML = etape;
		var lignes = document.querySelectorAll('div[class*="etape_"]');
		for(var i=0; i<lignes.length; i++) {
			lignes[i].style.display = ((~lignes[i].className.indexOf('etape_' + etape)) ? '' : 'none');
		}
	}
}

function Uploader_smileys() {
	var donnees = Recuperer_fichiers(true),
		xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		var donnees_brutes = xdr.responseText;
		console.log(donnees_brutes);
		/*if(~donnees_brutes.indexOf('Pris')) {
			ze_Inserer_message('Non de pack non disponible', 3000);
			Etape_suivante_smileys(false);
		}
		else if(~donnees_brutes.indexOf('Vide')) {
			ze_Inserer_message('Aucun smiley sélectionné', 3000);
		}
		else {
			location.reload();
		}*/
	}
	xdr.open('POST', url_zzzelp + '/compte/smileys?mode=' + document.querySelector('#titre_creation_pack').dataset.mode, true);
	xdr.send(donnees);
}

function Recuperer_fichiers(nouveau) {	
	var selections_fichiers = document.querySelectorAll((nouveau ? '#nouveau_pack' : '#modifier_pack') + ' .fichier_local_smiley'),
		options = document.querySelectorAll('#categories_nouveau option'),
		donnees = new FormData();
	donnees.append('nom', document.querySelector('#nom_pack').value);
	donnees.append('format', document.querySelector('#extension_fichier').value);
	donnees.append('public', document.querySelector('.pack_public').checked);
	donnees.append('alliances', document.querySelector('#alliances_nouveau').value);
	donnees.append('joueurs', document.querySelector('#joueurs_nouveau').value);
	for(var i=0; i<selections_fichiers.length; i++) {
		if(selections_fichiers[i].files[0] != undefined) {
			donnees.append('smileys[]', selections_fichiers[i].files[0]);
		}
	}
	if(document.querySelector('#titre_creation_pack').dataset.mode == 'modifier') {
		var anciens = document.querySelectorAll('.anciens_smileys');
		for(var i=0; i<anciens.length; i++) {
			donnees.append('anciens[]', anciens[i].dataset.titre);
		}
		donnees.append('ID', document.querySelector('#titre_creation_pack').dataset.ID);
	}
	for(var i=0; i<options.length; i++) {
		if(options[i].selected) {
			donnees.append('categories[]', options[i].value);
		}
	}
	return donnees;
}

function Trie_ordre_packs_smileys(ordre) {
	var packs = document.querySelectorAll('.ligne_packs'),
		ordre = document.querySelector('#ordre_packs').value.split(',');
	for (var i=1;i<packs.length;i++) {
		ligne = document.querySelectorAll('.ligne_packs')[i];
		j = i;
		while (j > 0 && ordre.indexOf(ligne.dataset.numero) > ordre.indexOf(document.querySelectorAll('.ligne_packs')[j-1].dataset.numero)) {
			Switch_packs(document.querySelectorAll('.ligne_packs')[j], false);
			j--;
		}
	}
}

function Switch_packs(row, actif) {
	if(document.querySelectorAll('.ligne_packs')[0] != row) {
		var sibling = row.previousElementSibling,
			anchor = row.nextElementSibling,
			parent = row.parentNode;
		parent.insertBefore(row, sibling);
	}
	if(actif) {
		Modification_packs_choisis();
	}
}

function Changer_categorie_smileys(categorie) {
	categorie = categorie.replace('entete_', '');
	var packs = document.querySelectorAll('.ligne_packs');
	for(var i=0; i<packs.length; i++) {
		var categories = packs[i].dataset.categories.split(',');
		packs[i].style.display = (in_array(categorie, categories) || categorie == 'tous' || (categorie == 'perso' && packs[i].querySelector('input[type*="checkbox"]').checked)) ? 'inline-block' : 'none';
	}
	document.querySelector('.entete_categories > span[data-actif="1"]').dataset.actif = 0;
	document.querySelector('.entete_categories > span[id="entete_' + categorie + '"]').dataset.actif = 1;
}

function Modification_packs_choisis() {
	ordre = new Array();
	var packs = document.querySelectorAll('.ligne_packs'),
		chaine = '';
	for(var i=packs.length-1; i>-1;i--) {
		if(packs[i].querySelector('input[type*="checkbox"]').checked) {
			packs[i].dataset.actif = '1';
			ordre.push(packs[i].dataset.numero);
			chaine += ((chaine.length == 0) ? '' : ',') + packs[i].dataset.numero;
		}
		else {
			packs[i].dataset.actif = '0';
		}
	}
	document.querySelector('#ordre_packs').value = chaine;
	Trie_ordre_packs_smileys()
}

function Modification_prive_pack(pack) {
	if(pack == 'nouveau') {
		var zone = document.querySelector('#nouveau_pack');
	}
	var actif = zone.querySelector('.pack_public').checked;
	zone.querySelector('.alliances_pack_smileys').disabled = actif;
	zone.querySelector('.joueurs_pack_smileys').disabled = actif;
}
