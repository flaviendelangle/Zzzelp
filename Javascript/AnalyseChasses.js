function ze_Analyse_chasses(contenu) {
	var rapports = Separation_chasses(contenu),
		donnees = new Array();
	for(var n=0; n<rapports.length; n++) {
		if(rapports[n].length > 3) {
			donnees.push(Analyse_chasse(rapports[n]));
		}
	}
	var valeurs = Analyse_donnees(donnees);
	Mise_en_page_chasses(donnees, valeurs);
}

function Separation_chasses(contenu) {
	var lignes = contenu.split('\n'),
		rapports = new Array(),
		rapport = new Array();
	for(var i=0; i<lignes.length; i++) {
		if(~lignes[i].indexOf('Troupes en attaque')) {
			rapports.push(rapport);
			rapport = new Array();
		}
		rapport.push(lignes[i]);
	}
	rapports.push(rapport);
	return rapports;
}

function Analyse_chasse(lignes) {
	var valeurs = {
			morts_att : new Array(),
			morts_def : new Array(),
			degats_att : new Array(),
			degats_def : new Array(),
			unites_XP : new Array(),
				}
	for(var i=0; i<lignes.length; i++) {
		var ligne = lignes[i];
		if(ligne.match(new RegExp('Troupes en attaque( |):( |)([^.]+)'))) {
			valeurs.armee = ze_Analyse_armee(new RegExp('Troupes en attaque( |):( |)([^.]+)').exec(ligne)[3]);
		}
		else if(ligne.match(new RegExp('Troupes en défense( |):( |)([^.]+)'))) {
			var unites = new RegExp('Troupes en défense( |):( |)([^.]+)').exec(ligne)[3].split(','),
				armee_def = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
			for(var j=0; j<unites.length; j++) {
				var data_unite = new RegExp('([0-9 ]+)(.*)').exec(unites[j]);
				if(~unites_chasses.noms_pluriel.indexOf(data_unite[2].trim())) {
					armee_def[unites_chasses.noms_pluriel.indexOf(data_unite[2].trim())] = parseInt(data_unite[1].replace(/ /g, ""));
				}
				else {
					armee_def[unites_chasses.noms_singulier.indexOf(data_unite[2].trim())] = parseInt(data_unite[1].replace(/ /g, ""));	
				}
			}
			valeurs.ennemis = armee_def;
		}
		else if(ligne.match(new RegExp('Vous infligez ([ 0-9]+)\\(\\+([ 0-9]+)\\) dégâts et tuez ([ 0-9]+)ennemie|ennemies'))) {
			var variables = new RegExp('Vous infligez ([ 0-9]+)\\(\\+([ 0-9]+)\\) dégâts et tuez ([ 0-9]+)ennemie|ennemies').exec(ligne);
			valeurs.morts_def.push(parseInt(variables[3].replace(/ /g, '')));
			valeurs.degats_att.push({ HB : parseInt(variables[1].replace(/ /g, '')), bonus : parseInt(variables[2].replace(/ /g, ''))});
		}
		else if(ligne.match(new RegExp('ennemie inflige ([ 0-9]+)\\(\\+([ 0-9]+)\\) dégâts à vos fourmis et en tue ([ 0-9]+)'))) {
			var variables = new RegExp('ennemie inflige ([ 0-9]+)\\(\\+([ 0-9]+)\\) dégâts à vos fourmis et en tue ([ 0-9]+)').exec(ligne);
			valeurs.morts_att.push(parseInt(variables[3].replace(/ /g, '')));
			valeurs.degats_def.push({ HB : parseInt(variables[1].replace(/ /g, '')), bonus : parseInt(variables[2].replace(/ /g, ''))});
		}
		else if(ligne.match(new RegExp('- ([0-9 ]+) ([^\/]+) sont devenues des ([^\/]+)'))) {
			var variables = new RegExp('- ([0-9 ]+) ([^\/]+) sont devenues des ([^\/]+)').exec(ligne);
			valeurs.unites_XP.push({ avant : variables[2], apres : variables[3], nombre : parseInt(variables[1].replace(/ /g, ''))});
		}
		else if(ligne.match(new RegExp('Vos chasseuses ont conquis ([0-9 ]+) cm(²|2), les carcasses des prédateurs vous rapportent ([0-9 ]+)'))) {
			var variables = new RegExp('Vos chasseuses ont conquis ([0-9 ]+) cm(²|2), les carcasses des prédateurs vous rapportent ([0-9 ]+)').exec(ligne);
			valeurs.TDC_chasse = parseInt(variables[1].replace(/ /g, ''));
			valeurs.nourriture = parseInt(variables[3].replace(/ /g, ''));
		}
	}
	valeurs.armes = Calcul_armes(valeurs.degats_att[0]);
	valeurs.bouclier = Calcul_bouclier(valeurs.morts_att[0], valeurs.armee, Calcul_degats_chasse(valeurs.ennemis));
	valeurs.armee_apres = ze_Extraction_armee(valeurs.armee, array_sum(valeurs.armee) - array_sum(valeurs.morts_att));
	valeurs.ennemis_apres = ze_Extraction_armee(valeurs.ennemis, array_sum(valeurs.ennemis) - array_sum(valeurs.morts_def));
	valeurs.replique = Calcul_replique(valeurs.armee, valeurs.ennemis, valeurs.armes);
	valeurs = Etude_XP(valeurs);
	return valeurs;
}

function Calcul_degats_chasse(armee) {
	var attaque = 0,
		coeffs = [13,19,30,42,50,70,70,115,140,230,700,1200,1400,3000,10000,50000,1000000];
	for(var i=0;i<17;i++) {
		attaque += armee[i]*coeffs[i];
	}
	return attaque;
}

function Calcul_vie_chasse(armee) {
	var vie = 0,
		coeffs = [50,90,100,105,140,200,700,220,450,1000,5000,900,4800,8400,13000,105000,6600000];
	for(var i=0;i<17;i++) {
		vie += armee[i]*coeffs[i];
	}
	return vie;
}

function Calcul_replique(attaquant, defenseur, armes) {
	var attaque = ze_Calcul_attaque_AB(attaquant, armes),
		vie = Calcul_vie_chasse(defenseur);
	if(attaque > vie*3) {
		return 0.1;
	}
	else if(attaque > vie*2) {
		return 0.3;
	}
	else if(attaque > vie*1,5) {
		return 0.5;
	}
	else {
		return 1;
	}
}


function Etude_XP(valeurs) {
	var indices = { 0 :1, 1 : 2, 3 : 4, 4 : 9, 5 : 6, 7 : 8, 10 : 11, 12 : 13 };
	valeurs.XP = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	valeurs.armee_apres_XP = valeurs.armee_apres;
	for(var i=0; i<valeurs.unites_XP.length; i++) {
		var avant = unites.noms_pluriel.indexOf(valeurs.unites_XP[i].avant),
			apres = indices[avant];
		valeurs.XP[avant] = valeurs.unites_XP[i].nombre;
		valeurs.armee_apres_XP[avant] -= valeurs.unites_XP[i].nombre;
		valeurs.armee_apres_XP[apres] += valeurs.unites_XP[i].nombre
	}
	return valeurs
}

function Calcul_armes(degats) {
	return Math.round(10*(degats.bonus/degats.HB));
}

function Calcul_bouclier(morts, armee, degats) {
	var n = morts,
		vie_tuee = 0;
	
	for(var i=0; i<14; i++) {
		if(n > armee[i]) {
			vie_tuee += armee[i]*unites.vie[i];
			n -= armee[i];
		}
		else {
			vie_tuee += n*unites.vie[i];
			n = 0;
		}
	}
	return Math.round(degats/vie_tuee) - 10;
}

function Analyse_donnees(donnees) {
	var valeurs = {
			armee_avant : new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
			armee_apres : new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
			armee_apres_XP : new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
			unites_XP : new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
			armes : donnees[0].armes,
			bouclier : donnees[0].bouclier,
			TDC_chasse : 0,
			morts : 0,
			nourriture : 0,
				}
	for(var i=0; i<donnees.length; i++) {
		valeurs.TDC_chasse += donnees[i].TDC_chasse;
		valeurs.morts += array_sum(donnees[i].morts_att);
		valeurs.nourriture += donnees[i].nourriture;
		for(var n=0; n<14; n++) {
			valeurs.armee_avant[n] += donnees[i].armee[n];
			valeurs.armee_apres[n] += donnees[i].armee_apres[n];
			valeurs.armee_apres_XP[n] += donnees[i].armee_apres_XP[n];
			valeurs.unites_XP[n] += donnees[i].XP[n];
		}
	}
	return valeurs;
}

function LOG(val) { console.log(val) }

function Mise_en_page_chasses(donnees, valeurs) {
	//LOG(ze_Nombre(ze_Calcul_annees_HOF(valeurs.armee_apres_XP) -ze_Calcul_annees_HOF(valeurs.armee_avant)));
	if(document.querySelector('#analyse_chasses')) {
		ze_Supprimer_element(document.querySelector('#analyse_chasses'));
	}
	var section = document.createElement('div');
		gains = {
			attaque : ze_Calcul_attaque_AB(valeurs.armee_apres_XP, valeurs.armes) - ze_Calcul_attaque_AB(valeurs.armee_avant, valeurs.armes),
			defense : ze_Calcul_defense_AB(valeurs.armee_apres_XP, valeurs.armes) - ze_Calcul_defense_AB(valeurs.armee_avant, valeurs.armes),
			vie : ze_Calcul_vie_AB(valeurs.armee_apres_XP, 0, 0, valeurs.bouclier) - ze_Calcul_vie_AB(valeurs.armee_avant, 0, 0, valeurs.bouclier),
			HOF : ze_Calcul_annees_HOF(valeurs.armee_apres_XP) - ze_Calcul_annees_HOF(valeurs.armee_avant),
				};
	section.setAttribute('style', 'width:700px;margin : 50px 0');
	section.setAttribute('id', 'analyse_chasses');
	document.querySelector('#resultats_chasses').appendChild(section);
	Inserer_info_generales(valeurs);
	Inserer_gain_chasse(gains);
	Inserer_recap_armee(valeurs);
	Inserer_detail_chasses(donnees);
}

function Inserer_info_generales(valeurs) {
	var tableau = document.createElement('table'),
		lignes = new Array(
			{ nom : 'TDC chassé', valeur : valeurs.TDC_chasse, unite : 'cm²' },
			{ nom : 'Unités perdues', valeur : valeurs.morts, unite : '<img src="http://s2.fourmizzz.fr/images/smiley/worker.png" width="20px">' },
			{ nom : 'Nourriture récoltée', valeur : valeurs.nourriture, unite : '<img src="http://s2.fourmizzz.fr/images/smiley/food.png" width="20px">' }
			
				)
	tableau.setAttribute('style', 'width:400px;margin:0 150px;border:1px solid #ABADB3;margin-bottom:10px');
	for(var i=0; i<lignes.length; i++) {
		var ligne = tableau.insertRow(i),
			entete = ligne.insertCell(0),
			valeur = ligne.insertCell(1);
		entete.innerHTML = lignes[i].nom + ' : ';
		valeur.innerHTML = ze_Nombre(lignes[i].valeur) + ' ' + lignes[i].unite;
		ligne.setAttribute('style', 'height:2em;line-height:2em;');
		entete.setAttribute('style', 'width:170px;padding-left:25px;text-align:left;font-weight:bold');
		valeur.setAttribute('style', 'width:178px;padding-right:25px;text-align:right;');
	}
	document.querySelector('#analyse_chasses').appendChild(tableau);
}

function Inserer_recap_armee(valeurs) {
	var tableau = document.createElement('table');
	tableau.setAttribute('style', 'width:600px;margin:0 50px;border:1px solid #ABADB3');
	tableau.setAttribute('class', 'tableau_ombre');
		var ligne = tableau.insertRow(0),
			unite = ligne.insertCell(0),
			avant = ligne.insertCell(1),
			diff = ligne.insertCell(2),
			apres = ligne.insertCell(3),
			part_XP = ligne.insertCell(4);
		avant.innerHTML = 'Avant';
		diff.innerHTML = 'Variation';
		apres.innerHTML = 'Après';
		part_XP.innerHTML = '% XP';
		ligne.setAttribute('style', 'height:2em;line-height:2em;text-align:center;font-weight:bold');
		avant.setAttribute('style', 'width:154px;padding-left:10px');
		diff.setAttribute('style', 'width:110px;color:' + ((valeurs.armee_apres_XP[i] > valeurs.armee_avant[i]) ? 'green' : ((valeurs.armee_apres_XP[i] < valeurs.armee_avant[i]) ? 'red' : '')));
		apres.setAttribute('style', 'width:154px;padding-right:10px');
		part_XP.setAttribute('style', 'width:80px;padding-right:10px');
	for(var i=0; i<14; i++) {
		var ligne = tableau.insertRow(i+1);
			unite = ligne.insertCell(0),
			avant = ligne.insertCell(1),
			diff = ligne.insertCell(2),
			apres = ligne.insertCell(3),
			part_XP = ligne.insertCell(4);
		unite.innerHTML = unites.TAGs[i];
		avant.innerHTML = ze_Nombre(valeurs.armee_avant[i]);
		diff.innerHTML = ((valeurs.armee_apres_XP[i] > valeurs.armee_avant[i]) ? '+' : ((valeurs.armee_apres_XP[i] < valeurs.armee_avant[i]) ? '-' : '')) + ze_Nombre(Math.abs(valeurs.armee_apres_XP[i] - valeurs.armee_avant[i]));
		apres.innerHTML = ze_Nombre(valeurs.armee_apres_XP[i]);
		part_XP.innerHTML = ((valeurs.armee_apres[i] > 0) ? (parseInt(10000*valeurs.unites_XP[i]/valeurs.armee_apres[i])/100) : 0 )+ '%';
		ligne.setAttribute('style', 'height:2em;line-height:2em;');
		unite.setAttribute('style', 'width:100px;font-weight:bold');
		avant.setAttribute('style', 'width:154px;text-align:left;padding-left:10px');
		diff.setAttribute('style', 'width:110px;text-align:center;color:' + ((valeurs.armee_apres_XP[i] > valeurs.armee_avant[i]) ? 'green' : ((valeurs.armee_apres_XP[i] < valeurs.armee_avant[i]) ? 'red' : '')));
		apres.setAttribute('style', 'width:154px;text-align:right;padding-right:10px');
		part_XP.setAttribute('style', 'width:80px;text-align:right;padding-right:10px');
	}
	document.querySelector('#analyse_chasses').appendChild(tableau);
}

function Inserer_gain_chasse(valeurs) {
	var maximum = Rechercher_gain_maximal(valeurs),
		tableau = document.createElement('table'),
		n = 0;
	tableau.setAttribute('style', 'width:600px;margin:10px 50px;border:1px solid #ABADB3');
	tableau.setAttribute('class', 'tableau_ombre');
	for(el in valeurs) {
		var ligne = tableau.insertRow(n),
			cell = ligne.insertCell(0),
			titre = document.createElement('span'),
			gain = document.createElement('span'),
			entete = document.createElement('span');
			largeur = parseInt(Math.abs(valeurs[el]*550)/(maximum*3)) * ((el == 'HOF') ? 0.1 : 1 );
		cell.setAttribute('style', 'text-align:left');
		ligne.setAttribute('style', 'width:600px;height:20px;margin:5px 50px');
		titre.setAttribute('style', 'position:absolute; height:20px; width:400px;z-index:999;font-size:0.9em;line-height:20px;font-weight:bold');
		gain.setAttribute('style', 'height:20px;display:inline-block;font-size:0.9em;line-height:20px;font-weight:bold;overflow:visible');
		entete.setAttribute('style', 'float:right;display:inline-block;margin-right:5px;font-size:0.9em;line-height:20px;font-weight:bold');
		entete.innerHTML = el;
		titre.innerHTML = (el == 'HOF') ? (((valeurs[el] < 0) ? '-' : '+') + ze_Secondes_date(Math.abs(valeurs[el]))) : (((valeurs[el] > 0) ? '+' : '') + ze_Nombre(valeurs[el]));
		cell.appendChild(titre);
		cell.appendChild(gain);
		cell.appendChild(entete);
		gain.style.background = (valeurs[el] > 0) ? 'green' : 'red';
		gain.style.width =  largeur + 'px';
		gain.style.marginLeft = (valeurs[el] > 0) ? '300px' : (300-largeur) + 'px';
		n += 1;

	}
	document.querySelector('#analyse_chasses').appendChild(tableau);
}

function Inserer_detail_chasses(donnees) {
	var tableau = document.createElement('table'),
		ligne = tableau.insertRow(0),
		entete = ligne.insertCell(0),
		terrain = ligne.insertCell(1),
		nourriture = ligne.insertCell(2),
		pertes = ligne.insertCell(3),
		replique = ligne.insertCell(4),
		evolution = ligne.insertCell(5);
	entete.innerHTML = 'Chasse';
	terrain.innerHTML = 'TDC chassé';
	nourriture.innerHTML = 'Nourriture récoltée';
	pertes.innerHTML = 'Unités perdues';
	replique.innerHTML = 'Réplique';
	evolution.innerHTML = '% XP';
	tableau.setAttribute('style', 'width:700px;margin:10px 0px;border:1px solid #ABADB3;text-align:center');
	tableau.setAttribute('class', 'tableau_ombre');
	ligne.setAttribute('style', 'height:2em;line-height:2em;font-weight:bold');
	for(var i=0;i<donnees.length;i++) {
		var ligne = tableau.insertRow(i+1),
			entete = ligne.insertCell(0),
			terrain = ligne.insertCell(1),
			nourriture = ligne.insertCell(2),
			pertes = ligne.insertCell(3),
			replique = ligne.insertCell(4),
			evolution = ligne.insertCell(5);
		ligne.setAttribute('style', 'height:2em;line-height:2em');
		entete.innerHTML = 'Chasse n°' + (i+1);
		terrain.innerHTML = ze_Nombre(donnees[i].TDC_chasse);
		nourriture.innerHTML = ze_Nombre(donnees[i].nourriture);
		pertes.innerHTML = ze_Nombre(array_sum(donnees[i].morts_att));
		replique.innerHTML = (donnees[i].replique * 100) + '%';
		evolution.innerHTML = Recuperation_part_XP_chasse(donnees[i]) + '%';
	}
	document.querySelector('#analyse_chasses').appendChild(tableau);
}

function Recuperation_part_XP_chasse(chasse) {
	for(var n=0; n<14; n++) {
		if(chasse.XP[n] > 0) {
			return parseInt(10000*chasse.XP[n]/chasse.armee_apres[n])/100
		}
	}
	return 0;
}

function Rechercher_gain_maximal(valeurs) {
	var max = 0;
	for(el in valeurs) {
		var val = valeurs[el] * ((el == 'HOF') ? 0.1 : 1 );
		if(Math.abs(val) > max) {
			max = Math.abs(val);
		}
	}
	return max;
}
