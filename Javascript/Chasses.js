function Affichage_options_avancees(classe) {
	var options = document.querySelectorAll('.' + classe);
	for(var i=0; i<options.length; i++) {
		options[i].style.display = ((options[i].style.display == 'block') ? 'none' : 'block');
	}
}

function Modification_ordre_prio_XP(el, mode) {
	var lignes = document.querySelectorAll('.priorites_XP');
	for(var i=0; i<lignes.length; i++) {
		if(lignes[i] == el) {
			var index = i + (mode ? -1 : 2);
		}
	}
	var div = document.createElement('div'),
		numero = document.createElement('span');
		span = document.createElement('span'),
		img_1 = document.createElement('img'),
		img_2 = document.createElement('img');
	div.setAttribute('class', 'ligne_cadre_structure priorites_XP ligne_cache');
	div.setAttribute('style', 'display:' + el.style.display);
	span.innerHTML = el.querySelectorAll('span')[1].innerHTML;
	img_1.setAttribute('src', "/Images/Fleche_haut.png");
	img_1.setAttribute('onclick', "Modification_ordre_prio_XP(this.parentNode, true)")
	img_2.setAttribute('src', "/Images/Fleche_bas.png");
	img_2.setAttribute('onclick', "Modification_ordre_prio_XP(this.parentNode, false)")
	div.appendChild(numero);
	div.appendChild(span);
	div.appendChild(img_1);
	div.appendChild(img_2);
	document.querySelectorAll('.zone_opaque')[2].insertBefore(div, lignes[index]);
	ze_Supprimer_element(el);
	
	var lignes = document.querySelectorAll('.priorites_XP');
	for(var i=0; i<lignes.length; i++) {
		lignes[i].querySelector('span').innerHTML = (i+1) + ' - ';
	}
}

function Changement_serveur() {
	var serveur = document.querySelector('#serveur').value;
	var niv = niveaux[serveur];
	document.querySelector('#armes').value = niv[1];
	document.querySelector('#bouclier').value = niv[0];
	document.querySelector('#vitesse_chasse').value = niv[2];
	document.querySelector('#TDC_depart').value = ze_Nombre(TDCs[serveur]);
	document.querySelector('#TDC_retour').value = ze_Nombre(TDCs[serveur]);
}

function Chargement_armee() {
	var releve = document.querySelector('#releve_armee').value;
	if(releve != "") {
		var armee = ze_Analyse_armee(releve);
		for(var i=0;i<14;i++) {
			document.querySelector('#unite_' +  (i+1)).value = ze_Nombre(armee[i]);
		}
		$('#popup_chasse').popUpWindow({
			action: "close",
		});
		document.querySelector('#releve_armee').value = "";
	}
}	

function Importer_armee() {
	var serveur = document.querySelector('#serveur').value;
	document.location.href = "http://" + serveur + ".fourmizzz.fr/Armee.php?icz";
}

function Changement_mode(mode, actif) {
	var modes = new Array('', 'classique', 'TDC_voulu', 'FDF_voulu', 'Date_retour'),
		lignes = document.querySelectorAll('#zone_options_specifiques .ligne_cache');
	for(var n=0; n<lignes.length; n++) {
		if(~lignes[n].className.indexOf('option_' + modes[mode]) && actif) {
			lignes[n].style.display = 'block';
		}
		else {
			lignes[n].style.display = 'none';
		}
	}
}

function MAJ_nombre_chasses() {
	var VC = parseInt(document.querySelector('#vitesse_chasse').value),
		select = document.querySelector('#nombre_chasses'),
		options = select.querySelectorAll('option');
		actuel = select.value;
	for(var i=0; i<options.length; i++) {
		ze_Supprimer_element(options[i]);
	}
	for(var i=1; i<VC+2; i++) {
		var option = document.createElement('option');
		option.value = i;
		option.innerHTML = i;
		select.appendChild(option);
	}
	if(actuel != '' && actuel <= i) {
		select.value = actuel;
	}
	else {
		document.querySelector('#nombre_chasses').value = VC + 1;
	}
	console.log('MAJ nombre chasses manuel');
}

function Simulation() {
	if(document.querySelectorAll('.zone_grand_tableau table').length > 0) {
		ze_Supprimer_element(document.querySelector('.zone_grand_tableau table'));
		ze_Supprimer_element(document.querySelector('.zone_grand_tableau table'));
		ze_Supprimer_element(document.querySelector('.entete_chasses div'));
		ze_Supprimer_element(document.querySelector('.zone_lien a'));
	}
	document.querySelector('.zone_bug').innerHTML = '';
	var message = Verification_donnees();
	if(message == '') {
		var valeurs = { 
						ratio : Recuperation_ratio(),
						type : document.querySelector('#mode_chasse').value
					};
		if(valeurs.type == 1) {
			valeurs.armee = Recuperation_armee_complete();
			valeurs.armee[0] = ze_Minoration(valeurs.armee[0] - parseInt(document.querySelector('#JSN_gardees').value.replace(/ /g, '')), 0);
			if(!document.querySelector('#envoi_unites_XP').checked) {
				valeurs.armee = Retirer_unites_XP(valeurs.armee);
			}
			valeurs = Calcul_TDC_chasse_1(valeurs);
			valeurs = Repartition_unites(valeurs);
		}
		else if(valeurs.type == 2) {
			valeurs.armee = Recuperation_armee_complete();
			valeurs.total_voulu = parseInt(document.querySelector('#TDC_voulu').value.replace(/ /g, ''));
			valeurs = Calcul_TDC_chasse_2(valeurs);
			valeurs = Repartition_unites(valeurs);
		}
		else if(valeurs.type == 3) {
			valeurs = Repartition_armee_FDF_voulue(valeurs);
			valeurs = Repartition_unites(valeurs);
			if(document.querySelector('#reste_fin').checked) {
				Completer_derniere_chasse(valeurs);
			}
		}
		valeurs = Creation_liens(valeurs);
		Construction_tableau_chasses(valeurs);
		console.log('Chasses calculées');
	}
	else {
		console.log(message);
		document.querySelector('.zone_bug').innerHTML = message;
	}
}

function Verification_donnees() {
	var message = '';
	if(Recuperation_TDC_actuel() == 0) {
		message += 'TDC au lancement inconnu<br>';
	}
	if(Recuperation_TDC_retour() == 0) {
		message += 'TDC à l\'arrivée inconnu<br>';
	}
	if(document.querySelector('#mode_chasse').value == 2 && parseInt(document.querySelector('#TDC_voulu').value.replace(/ /g, '')) == 0) {
		message += 'TDC à chasser inconnnu<br>';
	}
	if(document.querySelector('#mode_chasse').value == 3 && parseInt(document.querySelector('#FDF_voulue').value.replace(/ /g, '')) == 0) {
		message += 'FDF à envoyer inconnue<br>';
	}
	return message;
}


function Retirer_unites_XP(armee) {
	var XP = [true, true, false, true, true, true, false, true, false, false, true, false, true, false]
	for (var i=0;i<armee.length;i++) {
		armee[i] = (XP[i] ? armee[i] : 0);
	}
	return armee;
}

function Calcul_armee_envoi(valeurs) {
	var armee_complete = new Array(1000000000,0,0,500000000,0,0,0,0,0,0,500000000,0,0,0),
		armee_2 = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
		prio_XP = Recuperation_prio_XP();

	if(type == 3) {
		for(var i=0; i<prio_XP.length; i++) {
			armee_2[prio_XP[i]] = armee_complete[prio_XP[i]];
		}
	}
	valeurs.armee = armee_2;
	return valeurs;
}

function Recuperation_armee_complete() {
	var lignes = document.querySelectorAll('[id*="unite_"]'),
		res = new Array();
	for(var k=0; k<lignes.length; k++) {
		res.push(parseInt(lignes[k].value.replace(/ /g, '')));
	}
	return res;
}

function Recuperation_armes() {
	return parseInt(document.querySelector('#armes').value);;
}

function Recuperation_bouclier() {
	return parseInt(document.querySelector('#bouclier').value);;
}

function Recuperation_VC() {
	return parseInt(document.querySelector('#vitesse_chasse').value);
}

function Recuperation_TDC_actuel() {
	return parseInt(document.querySelector('#TDC_depart').value.replace(/ /g, ''));
}

function Recuperation_TDC_retour() {
	return parseInt(document.querySelector('#TDC_retour').value.replace(/ /g, ''));
}

function Recuperation_prio_XP() {
	var lignes = document.querySelectorAll('.priorites_XP'),
		prio = new Array();
	for(var k=0; k<lignes.length; k++) {
		prio.push(unites['noms_singulier'].indexOf(lignes[k].querySelectorAll('span')[1].innerHTML));
	}
	return prio;
}

function Recuperation_difficulte() {
	return parseInt(document.querySelector('#difficulte').value);
}

function Recuperation_ratio() {
	return [1, 2, 3, 4, 5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10][Recuperation_difficulte()];
}

function Recuperation_perte_chasses(type, num) {
	var pertes = new Array(
					[0.103971824, 0.066805442, 0.036854146, 0.014477073, 0.010067247, 0.008361713, 0.00751662, 0.007060666, 0.006692853, 0.006402339, 0.006090569, 0.0057788, 0.005080623],
					[0.14183641, 0.089382202, 0.065595625, 0.037509208, 0.024982573, 0.018532185, 0.014281932, 0.011725921, 0.010437083, 0.009834768, 0.009339662, 0.008844556, 0.008502895],
					[0.33333334, 0.176739357, 0.113191158, 0.08245817, 0.051342954, 0.036955988, 0.03395735, 0.032083615, 0.026461955, 0.024588162, 0.021774264, 0.018960366, 0.017190797]
				);
	return pertes[type][num];
}

function Calcul_TDC_chasse_1(valeurs) {
	var chasse_mini = 2000,
		nombre_chasses = 0;
	
	if(valeurs.type == 1 && !document.querySelector('#nombre_chasses_auto').checked) {
		nombre_chasses = parseInt(document.querySelector('#nombre_chasses').value)
	}
	else {
		while (Calcul_ratio(Recuperation_TDC_retour(), chasse_mini, nombre_chasses + 1, valeurs.armee) >= valeurs.ratio && nombre_chasses < Recuperation_VC() + 1) {
			nombre_chasses += 1;
		}
	}

	if(valeurs.type == 1 && !document.querySelector('#TDC_chasses_auto').checked) {
		TDC_chasse = parseInt(document.querySelector('#TDC_chasses').value.replace(/ /g, ''));
	}
	else {
		var TDC_chasse = 0;
		for(var i=0; i<11; i++) {
			var n = 1;
			while (Calcul_ratio(Recuperation_TDC_retour(), TDC_chasse + Math.pow(10, 10-i), nombre_chasses, valeurs.armee) >= valeurs.ratio && n < 11) {
				TDC_chasse += Math.pow(10, 10-i);
				n += 1;
			}
		}
	}
	valeurs.nombre = nombre_chasses
	valeurs.valeur = ze_Minoration(TDC_chasse, chasse_mini);
	return valeurs;
}

function Calcul_TDC_chasse_2(valeurs) {
	var nombre_chasses = 0;
	while (Calcul_ratio(Recuperation_TDC_retour(), parseInt(valeurs.total_voulu/(nombre_chasses+1)), nombre_chasses + 1, valeurs.armee) >= valeurs.ratio && nombre_chasses < Recuperation_VC() + 1) {
		nombre_chasses += 1;
	}
	valeurs.nombre = nombre_chasses;
	valeurs.valeur = parseInt(valeurs.total_voulu / nombre_chasses);
	return valeurs;
}

function Repartition_armee_FDF_voulue(valeurs) {
	var vie_tampon = 8000;
	valeurs.armee_tampon = Calcul_tampon(vie_tampon);
	valeurs.armee = Completer_armee(valeurs);
	var valeurs = Calcul_TDC_chasse_1(valeurs);
	while(2*(Recuperation_perte_chasses(2,Recuperation_ratio()) * Difficulte(Recuperation_TDC_retour(), valeurs.valeur, valeurs.nombre) / (10 + Recuperation_bouclier()) * 10) > ze_Calcul_capa_flood(valeurs.armee_tampon)) {
		vie_tampon *= 1.3;
		valeurs.armee_tampon = Calcul_tampon(vie_tampon);
		valeurs.armee = Completer_armee(valeurs);
		var valeurs = Calcul_TDC_chasse_1(valeurs);
	}
	return valeurs;
}

function Calcul_tampon(vie, armee_complete, bonus) {
	if(typeof armee_complete == 'undefined') {
		var armee_complete = Recuperation_armee_complete();
	}
	if(typeof bonus == 'undefined') {
		bonus = true;
	}
	var	armee = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
		i = 0;
	while(ze_Calcul_vie_AB(armee, 0, 0, Recuperation_bouclier()) < vie) {
		if(bonus) {
			armee[i] = ze_Majoration(Math.ceil((vie - ze_Calcul_vie_AB(armee, 0, 0, Recuperation_bouclier()))/ (unites['vie'][i] * (1 + Recuperation_bouclier() * 0.1))) , armee_complete[i]);
		}
		else {
			armee[i] = ze_Majoration(Math.ceil((vie - ze_Calcul_vie_HB(armee))/ (unites['vie'][i])) , armee_complete[i]);
		}
		i++;
	}
	return armee;
}

function Completer_armee(valeurs) {
	var armee_complete = Recuperation_armee_complete(),
		armee = JSON.parse(JSON.stringify(valeurs.armee_tampon)),
		prio_XP = Recuperation_prio_XP(),
		ordre = prio_XP.concat([8,11,13,0,2,9,6]),
		FDF_voulue = parseInt(document.querySelector('#FDF_voulue').value.replace(/ /g, ''));
	for(var i=0; i<14; i++) {
		armee[ordre[i]] += ze_Minoration(ze_Majoration(Math.ceil((FDF_voulue - ze_Calcul_attaque_AB(armee, Recuperation_armes()))/(unites['attaque'][ordre[i]] * (1 + Recuperation_armes() * 0.1))), armee_complete[ordre[i]]), 0);
	}
	return armee;
}

function Repartition_unites(valeurs) {
	var table = Difficultes(Recuperation_TDC_retour(), valeurs.valeur, valeurs.nombre),
		difficulte = Difficulte(Recuperation_TDC_retour(), valeurs.valeur, valeurs.nombre),
		total_armee = JSON.parse(JSON.stringify(valeurs.armee)),
		ordre = Recuperation_prio_XP().concat([13, 11, 9, 8, 6, 2]),
		chasses = new Array();
	for(var n=valeurs.nombre-1; n>=0; n--) {
		var FDF = Math.round((table[n] / difficulte) * ze_Calcul_attaque_HB(valeurs.armee));
		if(document.querySelector('#repartition_unites').value == '1') {
			var	vie = Math.round(8 * Recuperation_perte_chasses(2,Recuperation_difficulte()) * table[n] / (10 + Recuperation_bouclier()) * 20);
			if(Reste_unites_XP(total_armee)) {
				var	armee_chasse = Calcul_tampon(vie, total_armee, false);
			}
			else {
				var diff = 0;
				for(var k=n; k>=0; k--) {
					diff += table[k];
				}
				var armee_chasse = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
				armee_chasse[0] = Math.round(total_armee[0] * table[n] / diff);
			}
			for(var i=0; i<ordre.length; i++) {
				armee_chasse[ordre[i]] = ze_Minoration(ze_Majoration(parseInt((FDF - ze_Calcul_attaque_HB(armee_chasse))/unites['attaque'][ordre[i]]), total_armee[ordre[i]]), 0);
			}
		}
		else {
			var attaque = ze_Calcul_attaque_HB(total_armee),
				armee_chasse = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
			for(var i=0; i<14; i++) {
				armee_chasse[i] = (n > 0) ? Math.ceil(total_armee[i] * FDF / attaque) : total_armee[i];
			}
		}
		for(var i=0; i<14; i++) {
			total_armee[i] -= armee_chasse[i];
		}
		chasses.push(armee_chasse);
	}
	valeurs.chasses = chasses;
	return valeurs;
}

function Reste_unites_XP(armee) {
	var prio = Recuperation_prio_XP();
	for(var i=0; i<prio.length; i++) {
		if(armee[prio[i]] > 0) {
			return true;
		}
	}
	return false;
}

function Completer_derniere_chasse(valeurs) {
	var armee_complete = Recuperation_armee_complete();
	for(var i=0; i<14; i++) {
		valeurs.chasses[0][i] += armee_complete[i] - valeurs.armee[i];
	}
	return valeurs;
}


function Calcul_ratio(TDC_retour, TDC_par_chasse, nombre_chasses, armee) {
	return ze_Calcul_attaque_AB(armee, Recuperation_armes()) / Difficulte(Recuperation_TDC_retour(), TDC_par_chasse, nombre_chasses);
}
	
function Difficulte(TDC_retour, TDC_par_chasse, nombre_chasses) {
	var dDiff = 0;
	for (d = 0; d < nombre_chasses; d++) {
		var dStart = TDC_retour + TDC_par_chasse * d;
		dDiff += ((TDC_par_chasse + dStart * 0.01) * (Math.pow(1.04, (Math.round(Math.log(dStart / 50) / Math.log(Math.pow(10, 0.1)))))) * 3);
	}
	return dDiff;
}

function Difficultes(TDC_retour, TDC_par_chasse, nombre_chasses) {
	var dTabDiff = new Array();
	for (var d = 0; d < nombre_chasses; d++) {
		var dStart = TDC_retour + TDC_par_chasse * d;
		dTabDiff.push((TDC_par_chasse + dStart * 0.01) * (Math.pow(1.04, (Math.round(Math.log(dStart / 50) / Math.log(Math.pow(10, 0.1)))))) * 3);
	}
	return dTabDiff;
}

function Construction_tableau_chasses(valeurs) {
	var zone = document.createElement('div'),
		contenus = new Array(
						['Chasses calculées', valeurs.nombre + '*' + ze_Nombre(valeurs.valeur) + ' cm²'],
						['Total chassé', ze_Nombre(valeurs.nombre * valeurs.valeur) + ' cm²'],
						['Pertes minimales (JSN)', ze_Nombre(parseInt((Recuperation_perte_chasses(0, Recuperation_difficulte())) * Difficulte(Recuperation_TDC_retour(), valeurs.valeur, valeurs.nombre) / (10 + Recuperation_bouclier()) * 10)) ],
						['Pertes moyennes (JSN)', ze_Nombre(parseInt((Recuperation_perte_chasses(1, Recuperation_difficulte())) * Difficulte(Recuperation_TDC_retour(), valeurs.valeur, valeurs.nombre) / (10 + Recuperation_bouclier()) * 10)) ],
						['Pertes maximales (JSN)', ze_Nombre(parseInt((Recuperation_perte_chasses(2, Recuperation_difficulte())) * Difficulte(Recuperation_TDC_retour(), valeurs.valeur, valeurs.nombre) / (10 + Recuperation_bouclier()) * 10)) ],
						['Durée des chasses', ze_Secondes_date(parseInt((Recuperation_TDC_actuel() + valeurs.valeur)*Math.pow(0.9, Recuperation_VC())), false)]
					);
	zone.setAttribute('class', 'zone_contenu zone_largeur_courte');
	for(var i=0; i<contenus.length; i++) {
		var ligne = document.createElement('div'),
			span = document.createElement('span'),
			input = document.createElement('span');
		ligne.setAttribute('class', 'ligne_cadre_structure');
		input.setAttribute('class', 'input_fige');
		span.innerHTML = contenus[i][0] + ' : ';
		input.innerHTML = contenus[i][1];
		ligne.appendChild(span);
		ligne.appendChild(input);
		zone.appendChild(ligne);
	}
	
	document.querySelector('.entete_chasses').appendChild(zone);
	
	
	var tableau = document.createElement('table'),
		tableau_bis = document.createElement('table'),
		ligne = tableau.insertRow(0),
		ligne_bis = tableau_bis.insertRow(0),
		cell = document.createElement('th');
	tableau.setAttribute('class', 'tableau_large_fixe');
	tableau_bis.setAttribute('class', 'tableau_large_scrollable');
	cell.innerHTML = 'Chasse';
	ligne.appendChild(cell);
	for(var n=0; n<14; n++) {
		var cell = document.createElement('th');
		cell.innerHTML = unites.TAGs[n];
		ligne_bis.appendChild(cell);
	}
	for(var i=valeurs.chasses.length-1; i>=0; i--) {
		var ligne = tableau.insertRow(-1),
			ligne_bis = tableau_bis.insertRow(-1),
			cell = ligne.insertCell(0);
		cell.innerHTML = 'Chasse ' + (valeurs.chasses.length - i) + ' : '; 
		for(var n=0; n<14; n++) {
			ligne_bis.insertCell(n).innerHTML = ze_Nombre(valeurs.chasses[i][n]);
		}
	}
	document.querySelectorAll('.insertion_tableau')[0].appendChild(tableau);
	document.querySelectorAll('.insertion_tableau')[1].appendChild(tableau_bis);
	
	var lien = document.createElement('a');
	lien.setAttribute('class', 'bouton');
	lien.innerHTML = 'Lancer';
	lien.href = valeurs.URL;
	document.querySelector('.zone_lien').appendChild(lien);
}

function Creation_liens(valeurs) {
	var chasses = '';
	for(var i=valeurs.chasses.length-1; i>=0; i--) {
		var chasse = '';
		for(var n=0; n<14; n++) {
			chasse += ((chasse != '') ? ',' : '') + ze_Base_10_36(valeurs.chasses[i][n]);
		}
		chasses += ((chasses != '') ? '|' : '') + chasse;
	}
	valeurs.URL = 'http://' + document.querySelector('#serveur').value + '.fourmizzz.fr/AcquerirTerrain.php?v=' + valeurs.valeur + '&c=[' + chasses + ']&retour=' + (time() + parseInt((Recuperation_TDC_actuel() + valeurs.valeur)*Math.pow(0.9, Recuperation_VC()))) + '&nlc';
	return valeurs;
}


/*
 * Tente a part d'une chaine de caractère d'extraire les unités du joueur. 
 * Pour l'instant gère les copies de la page armée et de RC
 * str -> array
*/
function ze_Analyse_armee(texte, type) {
    if(typeof type == "undefined") {
		type = 'armee';
	}
	var armee = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	texte = texte.replace(/(Vers le Terrain de Chasse)|(Vers la Fourmilière)|(Vers la Loge Impériale)/gi, '');
	texte = texte.replace(/(Vers le TDC)|(Vers le Fourmilière)|(Vers la Loge)/gi, '');
	texte = texte.replace(/(Vos raiders.*secondes?)|(Vos chasseuses.*secondes?)|(Vous allez attaquer.*secondes?)|(inflige.*\.)|(Arriv.*[0-9]{2}h[0-9]{2})|(\\(s\\))/gi, '');
	texte = texte.replace(/\]/gi, '\n').replace(/\[/gi, '\n');
	texte = texte.split("\n").join(',').split(',');	
	for(var i=0; i<texte.length; i++) {
		var ligne = texte[i].trim();
		if(isNaN(ligne.replace(/ /g, ''))) {
			var id_unite = ze_IDunite(ligne);
			if(~id_unite) {
				unite_tampon = id_unite;
			}
			else if(!isNaN(ligne.replace(/ /g, '').replace(/	/g, ''))) {
				ligne = ligne.split('	');
				console.log(ligne);
				for(var k=0; k<ligne.length; k++) {
					if(ligne[k] != '') {
						armee[unite_tampon] += parseInt(ligne[k].replace(/ /g, ''));
					}
				}
			}
			else if(ligne.match(new RegExp('([0-9 ]+) ([^.]+)'))) {
				var valeurs = new RegExp('([0-9 ]+) ([^.]+)').exec(ligne),
					unite = ze_IDunite(valeurs[2]); 
				armee[unite] += parseInt(valeurs[1].replace(/ /g, ''));
			}
		}
		else if(ligne.length > 0 && ~unite_tampon) {
			armee[unite_tampon] += parseInt(ligne.replace(/ /g, ''));
		}
	}
	return (type == 'armee') ? armee.slice(0,14) : armee;
}

function ze_IDunite(unite) {
	var index = new Array(unites.noms_singulier, unites.noms_pluriel, unites.ex_noms_singulier, unites.ex_noms_pluriel, unites.TAGs);
	for(var n=0; n<index.length; n++) {
		if(in_array(unite, index[n])) {
			return index[n].indexOf(unite);
		}
	}
	return -1;
}



/*
 * Renvoi l'armée d'un joueur a partir de son armée initiale et du nombre de morts qu'il a subi (aucune XP comptée ici)
 * (array, int) -> array
*/
function ze_Extraction_armee(armee, n) {
	var armee_2 = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
		i = 0,
		k = 0;
	while (i<n) {
		if(i + armee[13-k] <= n) {
			i += armee[13-k];
			armee_2[13-k] = armee[13-k];
		}
		else {
			armee_2[13-k] = n - i;
			i = n;
		}
		k++;
	}
	return armee_2;
}

/* 
 * Renvoi l'armée une fois toute XP y compris les JSN (aucune perte prise en compte) 
 * array -> array
*/
function ze_Full_XP_avec_JSN(armee) {
	return [0,0,armee[0]+armee[1]+armee[2],0,0,0,armee[5]+armee[6],0,armee[7]+armee[8],armee[3]+armee[4]+armee[9],0,armee[10]+armee[11],0,armee[12]+armee[13]]
}

/* 
 * Renvoi l'armée une fois toute XP en dehors des JSN (aucune perte prise en compte)
 * array -> array
*/
function ze_Full_XP_sans_JSN(armee) {
	return [armee[0],0,armee[1]+armee[2],0,0,0,armee[5]+armee[6],0,armee[7]+armee[8],armee[3]+armee[4]+armee[9],0,armee[10]+armee[11],0,armee[12]+armee[13]]
}

/*
 * Renvoi la Force de Frappe de l'armée sans compter les bonus (attaque à Armes 0)
 * array -> int
*/
function ze_Calcul_attaque_HB(armee) {
	var attaque = 0,
		coeffs = [3,5,7,10,15,1,1,30,35,24,55,80,50,55];
	for(var i=0;i<14;i++) {
		attaque += armee[i]*coeffs[i];
	}
	return attaque;
}

/*
 * Renvoi la Vie de l'armée sans compter les bonus (vie en TDC à Bouclier 0)
 * array -> int
*/
function ze_Calcul_vie_HB(armee) {
	var vie = 0,
		coeffs = [8,10,13,16,20,30,40,10,12,27,35,50,50,55];
	for(var i=0;i<14;i++) {
		vie += armee[i]*coeffs[i];
	}
	return vie;
}

/*
 * Renvoi la Défense de l'armée sans compter les bonus (défense à Armes 0)
 * array -> int
*/
function ze_Calcul_defense_HB(armee) {
	var defense = 0,
		coeffs = [2,4,6,9,14,25,35,15,18,23,1,1,50,55];
	for(var i=0;i<14;i++) {
		defense += armee[i]*coeffs[i];
	}
	return defense;
}

/*
 * Renvoi le nombre d'unités de l'armée (équivalent array_sum)
 * array -> int
*/
function ze_Calcul_capa_flood(armee) {
	var capa_flood = 0;
	for(var i=0;i<14;i++) {
		capa_flood += armee[i];
	}
	return capa_flood;
}

/*
 * Renvoi la consommation de l'armée en pommes par jour (0 -> TDC, 1 -> Dôme, 2 -> Loge)
 * (array, int) -> int
*/
function ze_Calcul_consommation_armee(armee, lieu) {
	var consommation = 0,
		coeffs = [16,20,26,30,36,70,100,30,34,44,100,150,80,90],
		pourcentages = [0.05,0.1,0.15];
	for(var i=0;i<14;i++) {
		consommation += armee[i]*coeffs[i]*pourcentages[lieu];
	}
	return parseInt(consommation);
}

/*
 * Renvoi le nombre de secondes de ponte à tdp 0 d'une armée (diviser par 31 536 000 pour avoir le nombre d'années)
 * array -> int
*/
function ze_Calcul_annees_HOF(armee) {
	var secondes = 0,
		coeffs = [300,450,570,740,1000,1410,1410,1440,1520,1450,1860,1860,2740,2740];
	for(var i=0;i<14;i++) {
		secondes += armee[i]*coeffs[i];
	}
	return secondes;
}

/*
 * Renvoi la Vie de l'armée en fonction du lieu et de niveaux de lieu et bouclier (utilise ze_Calcul_vie_HB)
 * (array, int, int, int) -> int
*/
function ze_Calcul_vie_AB(armee, lieu, niveau_lieu, bouclier) {
	if(lieu == 0) {
		return parseInt(ze_Calcul_vie_HB(armee) * (1+0.1*bouclier));
	}
	else if(lieu == 1) {
		return parseInt(ze_Calcul_vie_HB(armee) * (1+0.05*(niveau_lieu+2) + 0.1*bouclier));
	}
	else {
		return parseInt(ze_Calcul_vie_HB(armee) * (1+0.15*(niveau_lieu+2) + 0.1*bouclier));
	}	
}

/*
 * Renvoi la Force de Frappe de l'armée en fonction du niveau d'Armes (utilise ze_Calcul_attaque_HB)
 * (array, int) -> int
*/
function ze_Calcul_attaque_AB(armee, armes) {
	return parseInt(ze_Calcul_attaque_HB(armee) * (1+armes*0.1));
}

/*
 * Renvoi la Défense de l'armée en fonction du niveau d'Armes (utilise ze_Calcul_defense_HB)
 * (array, int) -> int
*/
function ze_Calcul_defense_AB(armee, armes) {
	return parseInt(ze_Calcul_defense_HB(armee) * (1+armes*0.1));
}

/*
 * Renvoi la Force de Frappe de l'armée rencontrée en chasse
 * array -> int
*/
function ze_Calcul_degats_chasse(armee) {
	var attaque = 0,
		coeffs = [13,19,30,42,50,70,70,115,140,230,700,1200,1400,3000,10000,50000,1000000];
	for(var i=0;i<17;i++) {
		attaque += armee[i]*coeffs[i];
	}
	return attaque;
}

/* Renvoi la Vie de l'armée rencontrée en chasse
 * array -> int
*/
function ze_Calcul_vie_chasse(armee) {
	var vie = 0,
		coeffs = [50,90,100,105,140,200,700,220,450,1000,5000,900,4800,8400,13000,105000,6600000];
	for(var i=0;i<17;i++) {
		vie += armee[i]*coeffs[i];
	}
	return vie;
}

var 		unites = {
			noms_singulier : new Array("Jeune Soldate Naine", "Soldate Naine", "Naine d’Elite", "Jeune Soldate", "Soldate", "Concierge", "Concierge d’élite", "Artilleuse", "Artilleuse d’élite", "Soldate d’élite", "Tank", "Tank d’élite", "Tueuse",  "Tueuse d’élite"),
			noms_pluriel : new Array("Jeunes Soldates Naines", "Soldates Naines", "Naines d’Elites", "Jeunes Soldates", "Soldates", "Concierges", "Concierges d’élites", "Artilleuses", "Artilleuses d’élites", "Soldates d’élites", "Tanks", "Tanks d’élites", "Tueuses",  "Tueuses d’élites"),
			ex_noms_singulier : new Array("Jeune Soldate Naine", "Soldate Naine", "Naine d'Elite", "Jeune Soldate", "Soldate", "Concierge", "Concierge d'élite", "Artilleuse", "Artilleuse d'élite", "Soldate d'élite", "Tank", "Tank d'élite", "Tueuse",  "Tueuse d'élite"),
			ex_noms_pluriel : new Array("Jeunes Soldates Naines", "Soldates Naines", "Naines d'Elites", "Jeunes Soldates", "Soldates", "Concierges", "Concierges d'élites", "Artilleuses", "Artilleuses d'élites", "Soldates d'élites", "Tanks", "Tanks d'élites", "Tueuses",  "Tueuses d'élites"),
			TAGs : new Array('JSN', 'SN', 'NE', 'JS', 'S', 'C', 'CE', 'A', 'AE', 'SE', 'Tk', 'TkE', 'T', 'TE'),
			ordre : new Array('unite1', 'unite2', 'unite3', 'unite4', 'unite5', 'unite6', 'unite14', 'unite7', 'unite8', 'unite9', 'unite10', 'unite13', 'unite11', 'unite12'),
			attaque : new Array(3,5,7,10,15,1,1,30,35,24,55,80,50,55), 
			vie : new Array(8,10,13,16,20,30,40,10,12,27,35,50,50,55), 
			defense : new Array(2,4,6,9,14,25,35,15,18,23,1,1,50,55),
			HOF : new Array(300,450,570,740,1000,1410,1410,1440,1520,1450,1860,1860,2740,2740),
			ID : new Array(1,2,3,4,5,6,14,7,8,9,10,13,11,12)
				};
		unites_chasses = {
			noms_singulier : new Array('Petite araignée', 'Araignée', 'Chenille', 'Criquet', 'Guèpe', 'Cigale', 'Dionée', 'Abeille', 'Hanneton', 'Scarabée', 'Lezard', 'Mante religieuse', 'Souris', 'Mulot', 'Alouette', 'Rat', 'Tamanoir'),
			noms_pluriel : new Array('Petites araignées', 'Araignées', 'Chenilles', 'Criquets', 'Guèpes', 'Cigales', 'Dionées', 'Abeilles', 'Hannetons', 'Scarabées', 'Lezards', 'Mantes religieuses', 'Souris', 'Mulots', 'Alouettes', 'Rats', 'Tamanoirs')
		};