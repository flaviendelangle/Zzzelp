function Calcul_convois() {	
	var pseudos = document.querySelectorAll('#pseudo'),
		TDCs = document.querySelectorAll('#TDC'),
		ecs = document.querySelectorAll('.ec'),
		colonisateurs = document.querySelectorAll('.colonisateur'),
		activations = document.querySelectorAll('#activation'),
		revenus_fixes = document.querySelectorAll('#revenu_fixe'),
		les_bonus = document.querySelectorAll('#bonus');
	var longueur = pseudos.length,
		donnees = '[';
	for(var i=0; i<longueur; i++) {
		var TDC = parseInt(TDCs[i].value.replace(/ /g,"")),
			pseudo = pseudos[i].innerHTML,
			colonisateur = colonisateurs[i].value,
			ec = ecs[i].value,
			revenu_fixe = revenus_fixes[i].value,
			bonus = les_bonus[i].value,
			activation = activations[i].checked;
		if(ec == "") {
			ec = 0;
		}
		if(revenu_fixe == "") {
			revenu_fixe = "NON";
		}
		donnees += pseudo + ',' + TDC + ',' + ec + ',' + colonisateur + ',' + revenu_fixe + ',' + bonus + ',' + activation + '|||';
	}
	donnees += ']';
	if(document.querySelectorAll('#methode_opti').length == 1) {
		var methode = document.querySelector('#methode_opti').value;
	}
	else {
		var methode = -1;
	}
	var xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		console.log(xdr.responseText);
		var donnees_brutes = xdr.responseText;
		document.querySelector('#repartition').innerHTML = donnees_brutes;
	}
	xdr.open('POST', url_site + 'creationconvois_data?mode=zzzelp', true);
	xdr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xdr.send("serveur=" + serveur + "&alliance=" + alliance + "&donnees_joueurs=" + donnees + "&methode=" + methode);
}


function Affichage_etables(joueur) {
	if (joueur == '') {
		pseudos = document.querySelectorAll('#pseudo');
		var longueur = pseudos.length,
			element = null;
		for(var i=0; i<longueur; i++) {
			pseudo = pseudos[i].innerHTML;
			colonisateur = document.querySelector('#colonisateur_' + pseudo.replace('.','')).value;
			if (colonisateur != '') {
				ec = etables_pucerons[colonisateur];
				if (Math.abs(ec) > 0) {
					document.querySelector('#ec_' + pseudo.replace('.','')).value = ec;
				}
			}
		}
	}
	else {
		pseudo = joueur;
		colonisateur = document.querySelector('#colonisateur_' + pseudo).value;		
		if (colonisateur != '') {
			ec = etables_pucerons[colonisateur];
			if (Math.abs(ec) > 0) {
				document.querySelector('#ec_' + pseudo).value = ec;
			}
		}
		else {
			document.querySelector('#ec_' + pseudo).value = '';
		}
	}
}

function Repartition_convois() {
	var tableau = '<table class="tableau_ombre" id="convois"><tr><th id="th">Pseudo</th><th id="th">Valeur</th</tr>';
	var convois = document.querySelector('#liste_convois').value;
	convois = convois.split("\n");
	var longueur = convois.length
	for(var i=0; i<longueur; i++) {
		if (convois[i].indexOf('	',1) == -1) {
			mode = ' ';
		}
		else {
			mode = '	';
		}
		var pseudo = convois[i].substr(0,convois[i].indexOf(mode,1)).replace(/ /g,"");
		var valeur =  convois[i].substr(convois[i].indexOf(mode,1),convois[i].length)
		var valeur = valeur.replace(/ /g,"");
		tableau += '<tr><td id="td"><input class="input_tableau input_haut" id="pseudos" type="text" value=' + pseudo + '></td><td id="td"><input class="input_tableau input_haut" id="valeurs" type="text" value=' + valeur + '></td></tr>';
	}
	tableau += '</table>';
	document.querySelector('#zone_liste_besoins').innerHTML = '<a href="#" class="bouton" onclick="Intervertir()">Interfertir +/-</a>';
	document.querySelector('#zone_liste_besoins').innerHTML += '<a href="#" class="bouton" onclick="Optimiser_convois()">Optimiser les convois</a>';
	document.querySelector('#zone_liste_besoins').innerHTML += tableau;
}


function Intervertir() {
	convois = document.querySelectorAll('#valeurs');
	var length = convois.length
	for(var i=0; i<length; i++) {
		valeur = convois[i].value;
		if (~valeur.indexOf('-')) {
			convois[i].value = valeur.replace('-','');
		}
		else {
			convois[i].value = '-' + valeur;
		}
	}
}

function Optimiser_convois() {
	var pseudos = document.querySelectorAll('#pseudos'),
		valeurs = document.querySelectorAll('#valeurs'),
		longueur = document.querySelectorAll('#pseudos').length;
	var donnees = {};
	for (var i=0;i<longueur;i++) {
		donnees[pseudos[i].value.trim()] = valeurs[i].value;
	}
	if(document.querySelectorAll('#methode_opti').length == 1) {
		var methode = document.querySelector('#methode_opti').value;
	}
	else {
		var methode = -1;
	}
	var xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		var donnees_brutes = xdr.responseText;
		document.querySelector('#resultats_opti').innerHTML = donnees_brutes;
	};
	xdr.open('POST', url_site + '/creationconvois_data?mode=externe', true);
	xdr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xdr.send("serveur=" + serveur + "&alliance=" + alliance + "&donnees_joueurs=" + JSON.stringify(donnees) + "&mode=opti_distances&methode=" + methode);
}
