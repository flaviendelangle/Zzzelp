function Chargement_armee() {
	var releve = document.querySelector('#copie_armee').value;
	if(releve !== "") {
		var armee = ZzzelpArmy.analyse(releve);
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
	var armee = Recuperation_armee_pontes(), armee_2,
		tdp = parseInt(document.querySelector('#tdp').value),
		ouvrieres = parseInt(document.querySelector('#unite_ouv').value.replace(/ /g, '')),
		HOF = armee.getHOF() + ouvrieres*60,
		grosse_armee = (HOF > 315360000)
	;document.querySelector('#global_temps').innerHTML = ze_Secondes_date(parseInt(HOF*Math.pow(0.9, tdp)), !grosse_armee);
	document.querySelector('#global_HOF').innerHTML = ze_Secondes_date(HOF, !grosse_armee);

	document.querySelector('#detail_temps_ouv').innerHTML = ze_Secondes_date(parseInt(ouvrieres*60*Math.pow(0.9, tdp)), !grosse_armee) + ' (' + ze_Affichage_pourcentage(1+(ouvrieres*60/HOF)) + '%)';
	document.querySelector('#detail_HOF_ouv').innerHTML = ze_Secondes_date(ouvrieres*60, !grosse_armee) + ' (' + ze_Affichage_pourcentage(1+(ouvrieres*60/HOF)) + '%)';
	for(var i=0; i<14; i++) {
		armee_2 = armee.new_armee();
		armee_2.setUnite(i, armee.getUnite(i));
		var	HOF_2 = armee_2.getHOF();
		document.querySelector('#detail_temps_' + i).innerHTML = ze_Secondes_date(parseInt(HOF_2*Math.pow(0.9, tdp)), !grosse_armee) + ' (' + ze_Affichage_pourcentage(1+(HOF_2/HOF)) + '%)';
		document.querySelector('#detail_HOF_' + i).innerHTML = ze_Secondes_date(HOF_2, !grosse_armee) + ' (' + ze_Affichage_pourcentage(1+(HOF_2/HOF)) + '%)';
	}
	var attaque = armee.getAttaqueAB(),
		defense = armee.getDefenseAB(),
		vie = armee.getVieAB();
	document.querySelector('#global_attaque').innerHTML = ze_Nombre(attaque);
	document.querySelector('#global_defense').innerHTML = ze_Nombre(defense);
	document.querySelector('#global_vie').innerHTML = ze_Nombre(vie);
	for(i=0; i<14; i++) {
		armee_2 = armee.new_armee();
		armee_2.setUnite(i, armee.getUnite(i));
		var	attaque_2 = armee_2.getAttaqueAB(),
			defense_2 = armee_2.getDefenseAB(),
			vie_2 = armee_2.getVieAB();
		if(!armee.isNull()) {
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
	var armee = new ZzzelpArmy();
	for(var i=0; i<14; i++) {
		armee.setUnite(i, parseInt(document.querySelector('#unite_' + i).value.replace(/ /g, '')));
	}
	var bonus = document.querySelector('#compter_bonus').checked,
		lieux = new Array('TDC', 'dome', 'loge');
	if(bonus) {
		armee.setArmes(parseInt(document.querySelector('#niveau_armes').value));
		armee.setBouclier(parseInt(document.querySelector('#niveau_armes').value));
		for(i=0;i<3;i++) {
			if(document.querySelector('#actif_lieu_' + lieux[i]).checked) {
				if(i > 0) {
					armee.setLieu(i);
					armee.setNiveauLieu(parseInt(document.querySelector('#niveau_' + lieux[i]).value));
				}
			}
		}
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