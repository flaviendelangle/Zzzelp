function Chargement_armee() {
	var releve = document.querySelector('#copie_armee').value;
	if(releve !== "") {
		var armee = ZzzelpScriptArmee.analyse(releve);
		for(var i=0;i<14;i++) {
			document.querySelector('#unite_' + i).value = ze_Nombre(armee.getUnite(i));
		}	
	}
	if(~document.location.href.indexOf('ponte')) {
		MAJ_Ponte();
	}
	$('#popup_armee').popUpWindow({
		action: "close",
	});
	document.querySelector('#copie_armee').value = "";
}	

function MAJ_Ponte(element) {
	if(typeof element != 'undefined') {
		ze_Ajout_espaces(element);
	}
	var armee = Recuperation_armee_pontes(),
		bonus = document.querySelector('#compter_bonus').checked,
		tdp = parseInt(document.querySelector('#tdp').value),
		lieux = new Array('TDC', 'dome', 'loge'),
		ouvrieres = parseInt(document.querySelector('#unite_ouv').value.replace(/ /g, '')),
		HOF = ze_Calcul_annees_HOF(armee) + ouvrieres*60,
		grosse_armee = (HOF > 315360000);
	document.querySelector('#global_temps').innerHTML = ze_Secondes_date(parseInt(HOF*Math.pow(0.9, tdp)), !grosse_armee);
	document.querySelector('#global_HOF').innerHTML = ze_Secondes_date(HOF, !grosse_armee);

	document.querySelector('#detail_temps_ouv').innerHTML = ze_Secondes_date(parseInt(ouvrieres*60*Math.pow(0.9, tdp)), !grosse_armee) + ' (' + ze_Affichage_pourcentage(1+(ouvrieres*60/HOF)) + '%)';
	document.querySelector('#detail_HOF_ouv').innerHTML = ze_Secondes_date(ouvrieres*60, !grosse_armee) + ' (' + ze_Affichage_pourcentage(1+(ouvrieres*60/HOF)) + '%)';
	for(var i=0; i<14; i++) {
		var armee_2 = Armee_unite(i, armee[i]),
			HOF_2 = ze_Calcul_annees_HOF(armee_2);
		document.querySelector('#detail_temps_' + i).innerHTML = ze_Secondes_date(parseInt(HOF_2*Math.pow(0.9, tdp)), !grosse_armee) + ' (' + ze_Affichage_pourcentage(1+(HOF_2/HOF)) + '%)';
		document.querySelector('#detail_HOF_' + i).innerHTML = ze_Secondes_date(HOF_2, !grosse_armee) + ' (' + ze_Affichage_pourcentage(1+(HOF_2/HOF)) + '%)';
	}
	if(!bonus) {
		var attaque = ze_Calcul_attaque_HB(armee),
			defense = ze_Calcul_defense_HB(armee),
			vie = ze_Calcul_vie_HB(armee),
			armes = 0,
			bouclier = 0,
			lieu = 0,
			niveau_lieu = 0;
		document.querySelector('#global_attaque').innerHTML = ze_Nombre(attaque);
		document.querySelector('#global_defense').innerHTML = ze_Nombre(defense);
		document.querySelector('#global_vie').innerHTML = ze_Nombre(vie);
	}
	else {
		var armes = parseInt(document.querySelector('#niveau_armes').value),
			bouclier = parseInt(document.querySelector('#niveau_armes').value);
		for(var i=0;i<3;i++) {
			if(document.querySelector('#actif_lieu_' + lieux[i]).checked == true) {
				var lieu = i;
				if(i == 0) {
					var niveau_lieu = 0;
				}
				else {
					var niveau_lieu = parseInt(document.querySelector('#niveau_' + lieux[i]).value);
				}
			}
		}
		var attaque = ze_Calcul_attaque_AB(armee, armes),
			defense = ze_Calcul_defense_AB(armee, armes),
			vie = ze_Calcul_vie_AB(armee, lieu, niveau_lieu, bouclier);
		document.querySelector('#global_attaque').innerHTML = ze_Nombre(attaque);
		document.querySelector('#global_defense').innerHTML = ze_Nombre(defense);
		document.querySelector('#global_vie').innerHTML = ze_Nombre(vie);
	}
	for(var i=0; i<14; i++) {
		var armee_2 = Armee_unite(i, armee[i]),
			attaque_2 = ze_Calcul_attaque_AB(armee_2, armes),
			defense_2 = ze_Calcul_defense_AB(armee_2, armes),
			vie_2 = ze_Calcul_vie_AB(armee_2, lieu, niveau_lieu, bouclier);
		if(ze_Calcul_capa_flood(armee) > 0) {
			document.querySelector('#detail_attaque_' + i).innerHTML = ze_Nombre(attaque_2) + ' (' + ze_Affichage_pourcentage(1+(attaque_2/attaque)) + '%)';
			document.querySelector('#detail_defense_' + i).innerHTML = ze_Nombre(defense_2) + ' (' + ze_Affichage_pourcentage(1+(defense_2/defense)) + '%)';
			document.querySelector('#detail_vie_' + i).innerHTML = ze_Nombre(vie_2) + ' (' + ze_Affichage_pourcentage(1+(vie_2/vie)) + '%)';
		}
		else {
			document.querySelector('#detail_attaque_' + i).innerHTML = '0 (0%)';
			document.querySelector('#detail_defense_' + i).innerHTML = '0 (0%)';
			document.querySelector('#detail_vie_' + i).innerHTML = '0 (0%)';
		}
	}
}

function Recuperation_armee_pontes() {
	var armee = new Array();
	for(var i=0; i<14; i++) {
		armee.push(parseInt(document.querySelector('#unite_' + i).value.replace(/ /g, '')));
	}
	return armee;
}

function Armee_unite(i, valeur) {
	var armee = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	armee[i] = valeur;
	return armee;
}

function Affichage_options_avancees(classe) {
	var options = document.querySelectorAll('.' + classe);
	for(var i=0; i<options.length; i++) {
		options[i].style.display = ((options[i].style.display == 'none') ? 'block' : 'none');
	}
}