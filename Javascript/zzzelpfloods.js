var url_zzzelp = 'http://zzzelp.fr',
	lieux = new Array('TDC', 'Dôme', 'Loge'),
	caracteres = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
	mode = (~document.location.href.indexOf('fourmizzz.fr')) ? 'fourmizzz' : 'zzzelp';


function Generation_floods(zone, donnees) {
	if(document.querySelectorAll('.zone_zzzelpfloods').length === 0) {
		var pseudos = Preparation_donnees(donnees);
		if(!donnees.sondes) {
			donnees.sondes = [
						[{ unite : 0, valeur : Math.pow(10, String(parseInt(donnees.nombre_unites/100000)).length) }],
						[{ unite : 0, valeur : 1 }]
							];
		}
		if(!donnees.antisonde) {
			donnees.antisonde = [
						[{ unite : 0, valeur : 1 }],
						[{ unite : 0, valeur : Math.pow(10, String(parseInt(donnees.nombre_unites/100000)).length) }]
							];
		}
		donnees.sondes[0].valeur = parseInt(donnees.sondes[0].valeur);
		donnees.sondes[1].valeur = parseInt(donnees.sondes[1].valeur);
		donnees.antisonde[0].valeur = parseInt(donnees.antisonde[0].valeur);
		donnees.antisonde[1].valeur = parseInt(donnees.antisonde[1].valeur);		
		Initialisation_interface(pseudos);
	}
	
	
	/*
	FONCTIONS PRELEMINAIRES
	* - Preparation_donnees
	* - Initialisation_interface
	* - Generation_nom_theme
	*/
	function Preparation_donnees(donnees) {
		var pseudos = new Array();
		for(var joueur in donnees.coordonnees[0]) {
			donnees.coordonnees[0][joueur].TDC_actuel = donnees.coordonnees[0][joueur].TDC;
			if(typeof donnees.coordonnees[0][joueur].active == 'string' && donnees.coordonnees[0][joueur].active == 'NON') {
			}
			else {
				donnees.coordonnees[0][joueur].distance = ze_Calcul_distance(parseInt(donnees.coordonnees[0][donnees.pseudo].x), parseInt(donnees.coordonnees[0][donnees.pseudo].y), parseInt(donnees.coordonnees[0][joueur].x), parseInt(donnees.coordonnees[0][joueur].y));
				pseudos.push(joueur);
			}
		}
		var coordonnees = donnees.coordonnees[0];
		pseudos.sort(function (a,b) {
						if(donnees.coordonnees[0][a].distance === donnees.coordonnees[0][b].distance) {
							return 0;
						}
						return (donnees.coordonnees[0][a].distance < donnees.coordonnees[0][b].distance) ? -1 : 1;
					});
		return pseudos;
	}
	
	function Initialisation_interface(pseudos) {
		var zone_zzzelpfloods = document.createElement('div');
		zone_zzzelpfloods.setAttribute('class', 'zone_zzzelpfloods');
		zone_zzzelpfloods.setAttribute('id', Generation_nom_theme());
		zone.appendChild(zone_zzzelpfloods);
		if(donnees.options) {
			Creation_tableau_options();
		}
		var floods_annules = document.createElement('div');
		floods_annules.setAttribute('id', 'floods_annules');
		zone_zzzelpfloods.appendChild(floods_annules);
		for(var i=0; i<pseudos.length; i++) {
			if(pseudos[i] != donnees.pseudo) {
				Creation_tableau_flood(pseudos[i], donnees.coordonnees[0][pseudos[i]]);
			}
		}
		if(donnees.resume) {
			Creation_tableau_resume();
		}
		var lancement = document.createElement('div');
		lancement.innerHTML = 'Lancer';
		lancement.setAttribute('class', 'bouton_lancement');
		lancement.onclick = function onclick(event) { Lancer_floods(); return false; }
		zone_zzzelpfloods.appendChild(lancement);
		var contact = document.createElement('a');
		contact.setAttribute('class', 'lien_contact');
		contact.setAttribute('target', '_BLANK');
		contact.href = url_zzzelp + '/contact/redaction';
		//contact.innerHTML = 'Reporter un bug, une erreur';
		zone_zzzelpfloods.appendChild(contact);
		Actualisation_floods(true);
		Actualiser_heures_arrivee();
	}
	
	function Generation_nom_theme() {
		if(donnees.theme) {
			return 'theme_' + donnees.theme;
		}
		else {
			return 'theme_fourmizzz';
		}
	}
	
	
	
	
	
	/*
	FONCTIONS PRINCIPALES
	* - Actualisation_floods
	* - Creation_tableau_flood
	* - Calcul_CF_initiale
	* - 
	*/

	function Calcul_variations_TDC_externes(debut, fin, joueur, valeurs) {
		donnees.coordonnees[0][donnees.pseudo].TDC_actuel = valeurs.TDC_attaquant;
		if(donnees.variations) {
			for(i=0; i<donnees.variations.length; i++) {
				if(donnees.variations[i][0].date >= debut && donnees.variations[i][0].date <= fin) {
					donnees.variations[i].valeur = parseInt(donnees.variations[i].valeur); 
					var	valeur = Flood_externe_possible(donnees.variations[i][0]);
					if(donnees.coordonnees[0][donnees.variations[i][0].attaquant]) {
						donnees.coordonnees[0][donnees.variations[i][0].attaquant].TDC_actuel += valeur;
					}
					if(donnees.coordonnees[0][donnees.variations[i][0].cible]) {
						donnees.coordonnees[0][donnees.variations[i][0].cible].TDC_actuel -= valeur;
					}
					if(valeur == -1 && valeurs.floods_annules.indexOf(i) == -1) {
						valeurs.floods_annules.push(i);
					}
				}
			}
		}
		valeurs.TDC_cible = donnees.coordonnees[0][joueur].TDC_actuel;
		valeurs.TDC_attaquant = donnees.coordonnees[0][donnees.pseudo].TDC_actuel;
		return valeurs;
	}

		
	function Flood_externe_possible(flood) {
		if(donnees.coordonnees[0][flood.cible] && donnees.coordonnees[0][flood.attaquant]) {
			if(donnees.coordonnees[0][flood.attaquant].TDC_actuel <= 2*donnees.coordonnees[0][flood.cible].TDC_actuel && donnees.coordonnees[0][flood.cible].TDC_actuel <= donnees.coordonnees[0][flood.attaquant].TDC_actuel*3) {
				return parseInt(ze_Majoration(flood.valeur, donnees.coordonnees[0][flood.cible].TDC_actuel*0.2));
			}
			else {
				return 0;
			}
		}
		else {
			return flood.valeur;
		}
	}
	
	function Actualisation_floods(primaire) {
		if(~document.location.href.indexOf('fourmizzz.fr')) { //MAJ des paramètres en cache
			var parametres = JSON.parse(localStorage['zzzelp_parametres_' + ze_serveur]);
			parametres.parametres.zzzelpfloods.parametres.zzzelpfloods_stockage.active = Lancement_via_Zzzelp();
			parametres.parametres.zzzelpfloods.parametres.zzzelpfloods_antisonde.active = Placement_antisonde();
			if(typeof donnees.aide_relance != 'undefined') {
				parametres.parametres.zzzelpfloods.parametres.zzzelpfloods_relance.active = Aide_relance();
				parametres.zzzelpfloods_prive.mode_relance = Valeur_aide_relance();
			}
			if(typeof donnees.anti_synchro != 'undefined') {
				parametres.parametres.zzzelpfloods.parametres.zzzelpfloods_antisynchro.active = Anti_synchronisation();
				parametres.zzzelpfloods_prive.seconde = Valeur_anti_synchronisation();
			}
			console.log(parametres);
			localStorage['zzzelp_parametres_' + ze_serveur] = JSON.stringify(parametres);
		}
		for(var joueur in donnees.coordonnees[0]) {
			donnees.coordonnees[0][joueur].TDC_actuel = donnees.coordonnees[0][joueur].TDC;
		}
		if(typeof donnees.aide_relance != 'undefined') {
			document.querySelector('#choix_aide_relance').disabled = !Aide_relance();
		}
		if(typeof donnees.anti_synchro != 'undefined') {
			document.querySelector('#seconde_anti_synchro').disabled = !Anti_synchronisation();	
		}
		var valeurs = { 
					nombre_unites : Calcul_CF_initiale(), 
					TDC_attaquant : parseInt(donnees.coordonnees[0][donnees.pseudo].TDC), 
					TDC_cible : 0, 
					TDC_attaquant_depart : parseInt(donnees.coordonnees[0][donnees.pseudo].TDC), 
					marge : -1, 
					floods : [], 
					floods_annules : [] 
						},
			ancien_temps = time();
		for(var t=0; t<pseudos.length; t++) {
			if(pseudos[t] != donnees.pseudo) {
				var ID = parseInt(donnees.coordonnees[0][pseudos[t]].ID);
				valeurs.TDC_cible = parseInt(donnees.coordonnees[0][pseudos[t]].TDC);
				valeurs = Calcul_variations_TDC_externes(ancien_temps, time() + donnees.coordonnees[0][pseudos[t]].temps, pseudos[t], valeurs);
				var mode = document.querySelector('.optimisation_' + ID).dataset.mode_opti,
					ancien_temps = donnees.coordonnees[0][pseudos[t]].temps;
				Affichage_mode_courant(ID, mode);
				if(mode != 'inconnu') { 
					Nettoyer_tableau(ID);
				}
				document.querySelector('#TDC_depart_' + ID).innerHTML = ze_Nombre(valeurs.TDC_attaquant);
				if(mode == 'classique' || mode == 'armee_debut' || mode == 'armee_fin') {
					document.querySelector('#TDC_depart_' + ID).innerHTML = ze_Nombre(valeurs.TDC_attaquant);
					document.querySelectorAll('.optimisation_' + ID + ' tr')[1].cells[2].innerHTML = ze_Nombre(valeurs.TDC_cible);
					valeurs.floods = [];
					valeurs.marge = -1;
					valeurs.armee_debut = (mode == 'armee_debut');
					valeurs.armee_fin = (mode == 'armee_fin');
					var valeurs = Optimisation_flood(valeurs);
					Insertion_optimisation_flood(ID, valeurs);
				}
				else if(mode == 'armee_complete') {
					valeurs.floods = [ze_Majoration(valeurs.nombre_unites, valeurs.TDC_cible*0.2)];
					valeurs.armee_complete = 0;
					valeurs.nombre_unites -= ze_Majoration(valeurs.nombre_unites, valeurs.TDC_cible*0.2);
					Insertion_optimisation_flood(ID, valeurs);
				}
				else if(mode == 'armee_complete_sonde') {
					Validation_sonde_manuelle(ID, 0, 1,donnees.sondes[0].unite, donnees.sondes[0].nombre, false);
					valeurs.floods = [ze_Majoration(valeurs.nombre_unites, valeurs.TDC_cible*0.2)];
					valeurs.armee_complete = 0;
					valeurs.nombre_unites -= ze_Majoration(valeurs.nombre_unites, valeurs.TDC_cible*0.2);
					Insertion_optimisation_flood(ID, valeurs);
					
				}
				else if(mode == 'TDC_attaquant' || mode == 'TDC_cible') {
					Preparation_TDC_voulu(mode, ID);
				}
				else if(mode == 'TDC_attaquant_validation' || mode == 'TDC_cible_validation') {
					document.querySelector('#TDC_depart_' + ID).innerHTML = ze_Nombre(valeurs.TDC_attaquant);
					valeurs.floods = [];
					var valeur = parseInt(document.querySelector('.optimisation_' + ID).dataset.TDCvoulu);
					valeurs.marge = (mode == 'TDC_attaquant_validation') ? (valeur - valeurs.TDC_attaquant) : (valeurs.TDC_cible - valeur),
					valeurs = Optimisation_flood(valeurs),
					Insertion_optimisation_flood(ID, valeurs);
				}
				else if(mode == 'serie_attaques') {
					Preparation_serie_attaques(ID);
				}
				else if(mode == 'serie_attaques_validation') {
					document.querySelector('#TDC_depart_' + ID).innerHTML = ze_Nombre(valeurs.TDC_attaquant);
					var nombre = parseInt(document.querySelector('.optimisation_' + ID).dataset.nombreattaques),
						valeur = parseInt(document.querySelector('.optimisation_' + ID).dataset.valeurattaques);
					valeurs.floods = [];
					for(var i=0; i<nombre; i++) {
						if(valeurs.nombre_unites >= valeur) {
							valeurs.floods.push(valeur);
							valeurs.nombre_unites -= valeur;
						}
						else if(valeurs.nombre_unites > 0) {
							valeurs.floods.push(valeurs.nombre_unites);
							valeurs.nombre_unites = 0;
						}
					}
					Insertion_optimisation_flood(ID, valeurs);
				}
				else if(mode == 'sonde') {
					Validation_sonde_manuelle(ID, 0, 1, donnees.sondes[0].unite, donnees.sondes[0].valeur, false);
					Validation_sonde_manuelle(ID, 0, 2, donnees.sondes[1].unite, donnees.sondes[1].valeur, false);
				}
				else if(mode == 'manuel') {
					document.querySelector('#TDC_depart_' + ID).innerHTML = ze_Nombre(valeurs.TDC_attaquant);
					Initialisation_mode_manuel_joueur(ID);
				}
				else if(mode == 'inconnu') {
					var lignes = document.querySelectorAll('.optimisation_' + ID + ' tr');
					for(var i=2;i<lignes.length;i++) {
						if(lignes[i].className != 'ligne_preparation' && lignes[i].className != 'ligne_sonde') {
							var colonnes = lignes[i].cells,
							valeur_prise = (valeurs.TDC_attaquant <= 2*valeurs.TDC_cible && valeurs.TDC_cible <= valeurs.TDC_attaquant*3) ? (ze_Majoration(parseInt(colonnes[0].innerHTML.replace(/ /g, "")), valeurs.TDC_cible*0.2)) : 0;
							valeurs.nombre_unites -= parseInt(colonnes[0].innerHTML.replace(/ /g, ""));
							valeurs.TDC_attaquant = valeurs.TDC_attaquant + valeur_prise;
							valeurs.TDC_cible = valeurs.TDC_cible - valeur_prise;
							colonnes[1].innerHTML = ze_Nombre(valeurs.TDC_attaquant);
							colonnes[2].innerHTML = ze_Nombre(valeurs.TDC_cible);
						}
					}
				}
				Calcul_variations_TDC_externes(((ancien_temps) ? ancien_temps : 0), 1000000, pseudos[t], valeurs);
			}
		}
		if(document.querySelectorAll('[data-type="armee_complete"]').length > 0) {
		}
		var floods = document.querySelectorAll('[data-type="armee_complete"]');
		for(var i=0; i<floods.length; i++) {
			if(i==0) {
					floods[i].cells[0].innerHTML = ze_Nombre(parseInt(floods[i].cells[0].innerHTML.replace(/ /g, '')) + parseInt(valeurs.nombre_unites));
			}
			else {
				floods[i].dataset.type = 'attaque';
			}
		}
		if(primaire) {
			Actualisation_floods(false);
		}
		else if(donnees.lancement_auto) {
			Lancer_floods();
		}
		Actualisation_tableau_resume();
		Affichage_floods_annules(valeurs.floods_annules);
	}
	
	
	function Affichage_mode_courant(ID, mode) {
		var modes = document.querySelectorAll('.optimisation_' + ID + ' td')[4].querySelectorAll('.ligne_mode');
		for(var i=0; i<modes.length; i++) {
			if(modes[i].querySelectorAll('img').length > 0) {
				ze_Supprimer_element(modes[i].querySelector('img'));
			}
		}
		if(mode != 'impossible') {
			if(mode.match(new RegExp('(.*)_validation'))) {
				mode = new RegExp('(.*)_validation').exec(mode)[1];
			}
			var span = document.querySelectorAll('.optimisation_' + ID + ' td')[4].querySelectorAll('[data-mode="' + mode + '"] span')[1],
				img = document.createElement('img');
			img.src = url_zzzelp + '/Images/icone_attaque.gif';
			span.appendChild(img);
		}
	}
	
	function Affichage_floods_annules(floods) {
		var zone = document.querySelector('#floods_annules'),
			anciennes = zone.querySelectorAll('.ligne_flood_annule');
		for(var i=0; i<anciennes.length; i++) {
			ze_Supprimer_element(anciennes[i]);
		}
		for(var i=0; i<floods.length; i++) {
			var flood = document.createElement('div');
			flood.setAttribute('class', 'ligne_flood_annule');
			flood.innerHTML = 'Annulation n°' + (zone.querySelectorAll('.ligne_flood_annule').length + 1) + ' : ' + ze_Nombre(donnees.variations[floods[i]][0].valeur) + ' cm2 de ' + donnees.variations[floods[i]][0].attaquant + ' sur ' + donnees.variations[floods[i]][0].cible;
			zone.appendChild(flood);
		}
	}

	function Creation_tableau_flood(joueur, donnees_joueur, valeurs) {
		var modes = [
						{nom : 'Choix du mode', valeur : 'false' },
						{nom : 'Optimisation classique', valeur : 'classique'},
						{nom : 'TDC voulu attaquant', valeur : 'TDC_attaquant'},
						{nom : 'TDC voulu cible', valeur : 'TDC_cible'},
						{nom : 'Optimisation + armée au début', valeur : 'armee_debut'},
						{nom : 'Optimisation + armée en fin', valeur : 'armee_fin'},
						{nom : 'Série d\'attaques identiques', valeur : 'serie_attaques' },
						{nom : 'Attaque classique', valeur : 'armee_complete'},
						{nom : 'Sonde + Attaque classique', valeur : 'armee_complete_sonde'},
						{nom : 'Sondes Dôme + Loge', valeur : 'sonde' },
						{nom : 'Manuel', valeur : 'inconnu' }
					];
		var manuels = [
						{nom : 'Type de ligne à ajouter', valeur : 'false' },
						{nom : 'Flood manuel', valeur : 'manuel'},
						{nom : 'Sonde manuelle', valeur : 'sonde'}
					]
		var tableau_joueur = document.createElement('table');
		tableau_joueur.dataset.nfloods = 0;
		if(donnees.coordonnees[0][donnees.pseudo].TDC > 2*donnees_joueur.TDC || donnees_joueur.TDC > donnees.coordonnees[0][donnees.pseudo].TDC*3) {
			tableau_joueur.dataset.mode_opti = 'impossible';
		}
		else if(donnees.mode) {
			tableau_joueur.dataset.mode_opti = donnees.mode;
		}
		else {
			tableau_joueur.dataset.mode_opti = 'classique';
		}
		tableau_joueur.setAttribute('ID', 'optimisation_zzzelpfloods');
		tableau_joueur.setAttribute('class', 'optimisation_' + donnees_joueur.ID);
		document.querySelector('.zone_zzzelpfloods').appendChild(tableau_joueur);
		ligne = tableau_joueur.insertRow(0);
		cell = ligne.insertCell(0);
		var temps_trajet = parseInt(ze_Calcul_temps_trajet(donnees_joueur.distance, donnees.vitesse_attaque));
		donnees.coordonnees[0][joueur].temps = temps_trajet;
		var zone_duree = document.createElement('span');
		zone_duree.innerHTML = temps_trajet;
		zone_duree.setAttribute('class', 'invisible');
		zone_duree.setAttribute('id', 'duree_attaque');
		var zone_arrivee = document.createElement('span');
		zone_arrivee.setAttribute('class', 'heure_arrivee');
		cell.appendChild(zone_duree);
		cell.appendChild(zone_arrivee);
		cell = ligne.insertCell(1);
		var lien_joueur = document.createElement('a');
		lien_joueur.href = 'http://' + donnees.serveur + '.fourmizzz.fr/Membre.php?Pseudo=' + donnees.pseudo;
		lien_joueur.setAttribute('target', '_blank');
		lien_joueur.innerHTML = donnees.pseudo;
		cell.appendChild(lien_joueur);
		cell = ligne.insertCell(2);
		var lien_joueur = document.createElement('a');
		lien_joueur.href = 'http://' + donnees.serveur + '.fourmizzz.fr/Membre.php?Pseudo=' + joueur;
		lien_joueur.setAttribute('target', '_blank');
		lien_joueur.innerHTML = joueur;
		cell.appendChild(lien_joueur);
		if(tableau_joueur.dataset.mode_opti != 'impossible') {
			cell = ligne.insertCell(3);
			cell.setAttribute('class', 'menu_modes');
			var ajout = document.createElement('img'),
				zone_liens = document.createElement('div');
			ajout.src = url_zzzelp + '/Images/plus.png';
			zone_liens.setAttribute('class', 'liste_modes');
			for(var p=0; p<manuels.length; p++) {
				var zone_lien = document.createElement('div'),
					choisi = document.createElement('span'),
					contenu = document.createElement('span');
				contenu.innerHTML = manuels[p].nom;
				zone_lien.setAttribute('class', 'ligne_mode');
				zone_lien.dataset.mode = manuels[p].valeur;
				if(p > 0) {
					zone_lien.setAttribute('class', 'ligne_mode');
					zone_lien.onclick = function onclick(event) {Application_choix_ajout_attaque(donnees_joueur.ID, this.dataset.mode); return false }
				}
				else {
					zone_lien.setAttribute('class', 'entete_mode');
				}
				zone_lien.appendChild(contenu);
				zone_lien.appendChild(choisi);
				zone_liens.appendChild(zone_lien);
			}
			cell.appendChild(ajout);
			cell.appendChild(zone_liens);
			cell = ligne.insertCell(4);
			cell.setAttribute('class', 'menu_modes');
			var edit = document.createElement('img'),
				zone_liens = document.createElement('div');
			edit.src = url_zzzelp + '/Images/edit.png';
			zone_liens.setAttribute('class', 'liste_modes');
			for(var p=0; p<modes.length; p++) {
				var zone_lien = document.createElement('div'),
					choisi = document.createElement('span'),
					contenu = document.createElement('span');
				contenu.innerHTML = modes[p].nom;
				zone_lien.dataset.mode = modes[p].valeur;
				if(p > 0) {
					zone_lien.setAttribute('class', 'ligne_mode');
					zone_lien.onclick = function onclick(event) {Nettoyer_tableau(donnees_joueur.ID);Application_choix_mode_joueur(donnees_joueur.ID, this.dataset.mode); return false }
				}
				else {
					zone_lien.setAttribute('class', 'entete_mode');
				}
				zone_lien.appendChild(contenu);
				zone_lien.appendChild(choisi);
				zone_liens.appendChild(zone_lien);
			}
			cell.appendChild(edit);
			cell.appendChild(zone_liens);
		}
		else {
			cell = ligne.insertCell(3);
			cell.setAttribute('colspan', '2');
			var intouchable = document.createElement('span');
			intouchable.innerHTML = 'Joueur HDP';
			intouchable.setAttribute('class', 'joueur_intouchable');
			cell.appendChild(intouchable);	
		}
			
		ligne = tableau_joueur.insertRow(1);
		cell = ligne.insertCell(0);
		cell.innerHTML = 'TDC départ : ';
		cell = ligne.insertCell(1);
		cell.setAttribute('ID', 'TDC_depart_' + donnees_joueur.ID);
		cell.innerHTML = '0';
		cell = ligne.insertCell(2);
		cell.innerHTML = ze_Nombre(donnees_joueur.TDC);
		cell = ligne.insertCell(3);
		cell = ligne.insertCell(4);
	}
	
	function Actualiser_heures_arrivee() {
		var tableaux = document.querySelectorAll('#optimisation_zzzelpfloods');
		for(var l=0; l<tableaux.length; l++) {
			tableaux[l].querySelector('.heure_arrivee').innerHTML = ze_Generation_date_precise((~document.location.href.indexOf('fourmizzz.fr') ? time_fzzz() : time()) + parseInt(tableaux[l].querySelector('#duree_attaque').innerHTML));
		}
		setTimeout(Actualiser_heures_arrivee, 1000);
	}
	
	function Calcul_CF_initiale() {
		var capa_flood = parseInt(donnees.nombre_unites),
			sondes = document.querySelectorAll('#nombre_sonde');
		for(var i=0;i<sondes.length;i++) {
			capa_flood -= parseInt(sondes[i].innerHTML.replace(/ /g, ''));
		}
		if(Placement_antisonde()) {
			console.log(donnees);
			capa_flood -= parseInt(donnees.antisonde[0].valeur);
			capa_flood -= parseInt(donnees.antisonde[1].valeur);
		}
		return capa_flood;
	}
	
	
	
	
	
	/*
	INITIALISATION DES MODES
	* - Reinitialiser_mode_joueur
	* - Initialisation_mode_manuel_joueur
	* - Application_choix_mode_joueur
	*/

	function Reinitialiser_mode_joueur(ID) {
		document.querySelector('.optimisation_' + ID).dataset.mode_opti = 'manuel';
		var lignes = document.querySelectorAll('.optimisation_' + ID + ' tr');
		Nettoyer_tableau(ID);
		Initialisation_mode_manuel_joueur(ID);
		Actualisation_floods(true);
	}
	
	function Application_choix_mode_joueur(ID, valeur) {
		if(valeur == 'inconnu') {
			Nettoyer_tableau(ID);
		}
		document.querySelectorAll('.optimisation_' + ID + ' td')[3].querySelector('img').onclick = function onclick(event) {Ajout_ligne(ID); return false;}
		document.querySelector('.optimisation_' + ID).dataset.mode_opti = valeur;
		Actualisation_floods(true);
	}
	
	function Preparation_TDC_voulu(mode, ID) {
		var tableau = document.querySelector('.optimisation_' + ID),
			ligne = tableau.insertRow(2);
		var cell = ligne.insertCell(0),
			input = document.createElement('input');
		input.type = 'text';
		input.placeholder = 'TDC voulu pour ' + ((mode == 'TDC_attaquant') ? 'l\'attaquant' : 'la cible');
		input.setAttribute('id', 'TDC_voulu');
		input.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this);return false;}
		cell.appendChild(input);
		cell.setAttribute('colspan', '5');
		var validation = document.createElement('img');
		validation.src = url_zzzelp + '/Images/valider.png';
		validation.onclick = function onclick(event) {Validation_TDC_voulu(mode, ID); return false;}
		validation.setAttribute('class', 'preparation_libre');
		cell.appendChild(validation);
	}
	
	function Preparation_serie_attaques(ID) {
		var tableau = document.querySelector('.optimisation_' + ID),
			ligne = tableau.insertRow(-1),
			cell = ligne.insertCell(0),
			nombre = document.createElement('input'),
			texte_1 = document.createElement('span'),
			valeur = document.createElement('input'),
			texte_2 = document.createElement('span'),
			validation = document.createElement('img');
		tableau.dataset.nfloods = parseInt(tableau.dataset.nfloods) + 1;
		ligne.dataset.numero = tableau.dataset.nfloods;
		cell.setAttribute('colspan', '5');
		nombre.type = 'text';
		nombre.setAttribute('class', 'petit_input');
		texte_1.innerHTML = 'attaques de';
		valeur.type = 'text';
		valeur.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this);return false;}
		texte_2.innerHTML = ' unités';
		validation.src = url_zzzelp + '/Images/valider.png';
		validation.onclick = function onclick(event) {Validation_serie_attaques(ID); return false;}
		validation.setAttribute('class', 'preparation_libre');
		cell.appendChild(nombre);
		cell.appendChild(texte_1);
		cell.appendChild(valeur);
		cell.appendChild(texte_2);
		cell.appendChild(validation);
	}
	
	function Validation_TDC_voulu(mode, ID) {
		document.querySelector('.optimisation_' + ID).dataset.mode_opti = mode + '_validation';
		document.querySelector('.optimisation_' + ID).dataset.TDCvoulu = parseInt(document.querySelector('.optimisation_' + ID + ' #TDC_voulu').value.replace(/ /g,""));
		Actualisation_floods(true);
	}
	
	function Validation_serie_attaques(ID) {
		document.querySelector('.optimisation_' + ID).dataset.mode_opti = 'serie_attaques_validation';
		document.querySelector('.optimisation_' + ID).dataset.nombreattaques = parseInt(document.querySelectorAll('.optimisation_' + ID + ' input')[0].value);
		document.querySelector('.optimisation_' + ID).dataset.valeurattaques = parseInt(document.querySelectorAll('.optimisation_' + ID + ' input')[1].value.replace(/ /g, ''));
		Actualisation_floods(true);
	}
	
	
	/* 
	 * FONCTIONS DE CREATION D'UNE LIGNE DE FLOOD
	*/

	function Insertion_optimisation_flood(ID, valeurs) {
		for(var k=0; k<valeurs.floods.length; k++) {
			Creation_ligne_flood(ID, valeurs, k, 0);
		}
	}
	
	function Creation_ligne_flood(ID, valeurs, k) {
		var tableau = document.querySelector('.optimisation_' + ID);
		tableau.dataset.nfloods = parseInt(tableau.dataset.nfloods) + 1;
		if(valeurs.manuel) {
			ligne = tableau.insertRow(valeurs.manuel);
		}
		else {	
			ligne = tableau.insertRow(-1);
		}
		ligne.dataset.numero = tableau.dataset.nfloods;
		ligne.dataset.type = (valeurs.armee_complete == k) ? 'armee_complete' : 'attaque';
		cell = ligne.insertCell(0);
		cell.innerHTML = ze_Nombre(valeurs.floods[k]);
		var i = ligne.dataset.numero;
		for(var t=1;t<ligne.rowIndex;t++) {
			if(tableau.rows[t].className != 'ligne_sonde') {
				ancien_att = parseInt(tableau.rows[t].cells[1].innerHTML.replace(/ /g,"")),
				ancien_def = parseInt(tableau.rows[t].cells[2].innerHTML.replace(/ /g,""));
			}
		}
		if(ancien_att <= 2*ancien_def && ancien_def <= ancien_att*3) {
			valeur_flood = ze_Majoration(valeurs.floods[k], ancien_def*0.2);
			cell = ligne.insertCell(1);
			cell.setAttribute('class', 'TDC_attaquant');
			if(valeur_flood == -2) {
				valeur_flood = ancien_def*0.2;
			}
			cell.innerHTML = ze_Nombre(ancien_att + valeur_flood);
			cell = ligne.insertCell(2);
			cell.innerHTML =  ze_Nombre(ancien_def - valeur_flood);
		}
		else {
			cell = ligne.insertCell(1);
			cell.setAttribute('class', 'TDC_attaquant');
			cell.innerHTML = ze_Nombre(ancien_att);
			cell = ligne.insertCell(2);
			cell.innerHTML =  ze_Nombre(ancien_def);
		}
		cell = ligne.insertCell(3);
		Inserer_lieu(cell, ID, ligne.dataset.numero);
		cell = ligne.insertCell(4);
		Inserer_liens_modifs(cell, ID, ligne.dataset.numero);
	}
	
	function Inserer_lieu(cell, ID, i) {
		var lieu = document.createElement('span');
		lieu.innerHTML = 'TDC';
		lieu.setAttribute('class', 'lieu');
		lieu.onclick = function onclick(event) {Modifier_lieu(ID, i); return false };
		cell.appendChild(lieu);
	}
	
	function Inserer_liens_modifs(cell, ID, i) {
		var liens = [
						{ lien_image : 'suppression.png', action : 'supprimer', title : 'Supprimer la ligne' },
						{ lien_image : 'edit.png', action : 'modifier', title : 'Modifier la ligne' }
					],
			img = document.createElement('img'),
			zone_liens = document.createElement('div');
		cell.setAttribute('class', 'menu_options');
		img.src = url_zzzelp + '/Images/quitter.png';
		zone_liens.setAttribute('class', 'liste_options');
		for(var k=0; k<liens.length; k++) {
			zone_lien = document.createElement('div');
			zone_lien.setAttribute('title', liens[k].title);
			zone_lien.setAttribute('class', 'zone_lien_option');
			zone_lien.dataset.action = liens[k].action;
			img_lien = document.createElement('img');
			img_lien.src = url_zzzelp + '/Images/' + liens[k].lien_image;
			zone_lien.onclick = function onclick(event) { Application_option_ligne(this.dataset.action, ID, i) };
			zone_liens.appendChild(zone_lien);
			zone_lien.appendChild(img_lien);
		}
		cell.appendChild(img);
		cell.appendChild(zone_liens);
	}
	
	
	/*
	 * FONCTIONS AJOUT MANUEL D'UNE LIGNE
	*/	
	function Application_choix_ajout_attaque(ID, valeur) {	
		if(valeur == 'manuel') {
			Insertion_preparation_flood(ID, 0, -1);
		}
		else if(valeur == 'sonde') {
			var lieu = (document.querySelectorAll('.optimisation_' + ID + ' .ligne_sonde').length == 0) ? 1 : 2,
				nombre = ((document.querySelectorAll('.optimisation_' + ID + ' .ligne_sonde').length == 0) ? donnees.sondes[0].valeur : donnees.sondes[1].valeur),
				unite = (document.querySelectorAll('.optimisation_' + ID + ' .ligne_sonde').length == 0) ? donnees.sondes[0].unite : donnees.sondes[1].unite;	
			Insertion_preparation_sonde(ID, lieu, nombre, unite, -1);
		}
	}
	
	function Insertion_preparation_flood(ID, valeur, place) {
		var tableau = document.querySelector('.optimisation_' + ID);
		tableau.dataset.nfloods = parseInt(tableau.dataset.nfloods) + 1;
		tableau.dataset.mode_opti = 'inconnu';
		var ligne = tableau.insertRow(place),
			cell = ligne.insertCell(0);
		ligne.setAttribute('class', 'ligne_preparation');
		ligne.dataset.numero = parseInt(tableau.dataset.nfloods);
		cell.setAttribute('colspan', '3');
		var entree = document.createElement('input');
		entree.type = 'text';
		entree.placeholder = 'entrer la valeur du flood';
		entree.value = (valeur == 0) ? '' : ze_Nombre(valeur);
		cell.appendChild(entree);
		entree.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this); return false;};
		var validation = document.createElement('img');
		validation.src = url_zzzelp + '/Images/valider.png';
		validation.onclick = function onclick(event) {Validation_flood_manuel(ID, ligne.dataset.numero); return false;}
		validation.setAttribute('class', 'preparation_libre');
		document.querySelectorAll('.optimisation_' + ID + ' [data-numero="' + ligne.dataset.numero + '"] td')[0].appendChild(validation);
		cell = ligne.insertCell(1);
		Inserer_lieu(cell, ID, ligne.dataset.numero);
		cell = ligne.insertCell(2);
		Inserer_liens_modifs(cell, ID, ligne.dataset.numero);
	}
	
	function Validation_flood_manuel(ID, n) {
		var valeur = parseInt(document.querySelectorAll('.optimisation_' + ID + ' [data-numero="' + n + '"] input')[0].value.replace(/ /g,"")),
			index = document.querySelector('.optimisation_' + ID + ' [data-numero="' + n + '"]').rowIndex;
		Suppression_flood(ID, n);
		var valeurs = { nombre_unites : donnees.nombre_unites, TDC_attaquant : donnees.coordonnees[0][donnees.pseudo].TDC, TDC_cible : 'inconnu', marge : -1, floods : [valeur], manuel:index};
		Creation_ligne_flood(ID, valeurs, 0);
		Actualisation_floods(true);
	}

	/*
	 * TABLEAUX UNIQUES (RESUME + OPTIONS)
	*/
	
	function Creation_tableau_options() {
		var tableau = document.createElement('table'),
			options = [
						{ titre : 'Stockage sur Zzzelp', ID : 'lancement_zzzelp', auto : donnees.lancement_zzzelp },
						{ titre : 'Replacer l\'antisonde', ID : 'placer_antisonde', auto : donnees.placer_antisonde }
					];
		if(typeof donnees.aide_relance != 'undefined') {
			options.push({ titre : 'Prévenir du retour', ID : 'aide_relance', auto : donnees.aide_relance, valeur : donnees.valeur_aide_relance });
		}
		if(typeof donnees.anti_synchro != 'undefined') {
			options.push({ titre : 'Lancer en fin de minute', ID : 'anti_synchro', auto : donnees.anti_synchro, valeur : donnees.seconde_renvoi });			
		}
		tableau.setAttribute('id', 'tableau_option');
		document.querySelector('.zone_zzzelpfloods').appendChild(tableau);
		var ligne = tableau.insertRow(0),
			cell = ligne.insertCell(0),
			lien = document.createElement('a');
		cell.onclick = function onclick(event) {Affichage_options(); return false };
		cell.setAttribute('colspan', '2');
		lien.innerHTML = 'Options du module';
		cell.appendChild(lien);
		for(var i=0; i<options.length; i++) {
			var ligne = tableau.insertRow(-1);
			ligne.setAttribute('style', 'display:none');
			ligne.insertCell(0).innerHTML = options[i].titre;
			var cell = ligne.insertCell(1),
				choix = document.createElement('input');
			choix.type = 'checkbox';
			choix.setAttribute('id', options[i].ID);
			choix.checked = options[i].auto;
			choix.onchange = function onchange(event) { Actualisation_floods(true); return false; }
			cell.appendChild(choix);
			if(options[i].ID == 'anti_synchro') {
				var ligne = tableau.insertRow(-1),
					cell = ligne.insertCell(0);
					choix = document.createElement('select');
				ligne.setAttribute('style', 'display:none');
				cell.setAttribute('colspan', '2');
				choix.disabled = !options[i].auto;
				choix.id = 'seconde_anti_synchro';
				for(var j=55;j<61;j++) {
					var option = document.createElement('option');
					option.value = j%60;
					option.innerHTML = j + 'ème seconde'
					choix.appendChild(option);
				}
				cell.appendChild(choix);
				choix.value = options[i].valeur;
				choix.onchange = function onchange(event) { Actualisation_floods(true); return false; }
			}
			else if(options[i].ID == 'aide_relance') {
				var ligne = tableau.insertRow(-1),
					cell = ligne.insertCell(0);
					choix = document.createElement('select'),
					possibilites = new Array('Toutes les attaques', 'L\'attaque principale');
				ligne.setAttribute('style', 'display:none');
				cell.setAttribute('colspan', '2');
				choix.disabled = !options[i].auto;
				choix.id = 'choix_aide_relance';
				for(var j=0; j<possibilites.length; j++) {
					var option = document.createElement('option');
					option.value = j+1;
					option.innerHTML = possibilites[j];
					choix.appendChild(option);
				}
				cell.appendChild(choix);
				choix.value = options[i].valeur;
				choix.onchange = function onchange(event) { Actualisation_floods(true); return false; }
			}
		}
	}
	
	function Affichage_options() {
		var mode = (document.querySelectorAll('#tableau_option tr')[1].style.display == 'none') ? '' : 'none',
			lignes = document.querySelectorAll('#tableau_option tr');
		for(var i=1; i<lignes.length; i++) {
			lignes[i].style.display = mode;
		}
	}
	
	function Creation_tableau_resume() {
		var tableau = document.createElement('table'),
			ligne = tableau.insertRow(0);
		ligne.insertCell(0).innerHTML = 'TDC floodé :';
		ligne.insertCell(1).innerHTML = '0' 
		var ligne = tableau.insertRow(1);
		ligne.insertCell(0).innerHTML = 'Nombre de floods : ';
		ligne.insertCell(1).innerHTML = '0' 
		var ligne = tableau.insertRow(2);
		ligne.insertCell(0).innerHTML = 'Nombre de sondes : ';
		ligne.insertCell(1).innerHTML = '0' 
		tableau.setAttribute('id', 'resume_floods');
		document.querySelector('.zone_zzzelpfloods').appendChild(tableau);
	}
	
	function Actualisation_tableau_resume() {
		if(document.querySelector('#resume_floods')) {
			var lignes = document.querySelectorAll('#resume_floods tr');
			if(document.querySelectorAll('.TDC_attaquant').length > 0) {
				lignes[0].cells[1].innerHTML = ze_Nombre(parseInt(document.querySelectorAll('.TDC_attaquant')[document.querySelectorAll('.TDC_attaquant').length - 1].innerHTML.replace(/ /g,"")) - parseInt(document.querySelectorAll('td[id*="TDC_depart"]')[0].innerHTML.replace(/ /g,"")));
			}
			else {
				lignes[0].cells[1].innerHTML = 0;
			}
			lignes[1].cells[1].innerHTML = document.querySelectorAll('.TDC_attaquant').length;
			lignes[2].cells[1].innerHTML = document.querySelectorAll('.ligne_sonde').length;
		}
	}

	function Modifier_lieu(ID, i) {
		var lieu = document.querySelector('.optimisation_' + ID + ' [data-numero="' + i + '"] .lieu').innerHTML;
		document.querySelector('.optimisation_' + ID + ' [data-numero="' + i + '"] .lieu').innerHTML = (lieux.indexOf(lieu) == 2) ? 'TDC' : lieux[lieux.indexOf(lieu) + 1];
	}
	
	function Application_option_ligne(action, ID, n) {
		if(action == 'supprimer') {
			Suppression_flood(ID, n);
		}
		else if(action == 'modifier') {
			var ligne = document.querySelector('.optimisation_' + ID + ' [data-numero="' + n + '"]'),
				classe = ligne.className;
			document.querySelector('.optimisation_' + ID).dataset.mode_opti = 'inconnu';
			ligne.setAttribute('class', 'ligne_preparation');
			if(classe == 'ligne_sonde') {
				var nombre = parseInt(ligne.querySelector('#nombre_sonde').innerHTML.replace(/ /g, '')),
					unite = ZzzelpScriptArmee.TAGs.indexOf(ligne.querySelector('#unite_sonde').innerHTML),
					lieu = lieux.indexOf(ligne.querySelector('.lieu').innerHTML),
					place = ligne.rowIndex;
				ze_Supprimer_element(ligne);
				Insertion_preparation_sonde(ID, lieu, nombre, unite, place);
			}
			else {
				var valeur = ligne.querySelector('td').innerHTML.replace(/ /g, ''),
					place = ligne.rowIndex;
				ze_Supprimer_element(ligne);
				Insertion_preparation_flood(ID, valeur, place);
			}
		}
		Actualisation_floods();
	}
	
	function Suppression_flood(ID, n) {
		ze_Supprimer_element(document.querySelector('.optimisation_' + ID + ' [data-numero="' + n + '"]'));
		document.querySelector('.optimisation_' + ID).dataset.mode_opti = 'inconnu';
		Actualisation_floods(true);
	}
	
	function Nettoyer_tableau(ID) {
		var lignes = document.querySelectorAll('.optimisation_' + ID + ' tr');
		for(var i=2;i<lignes.length;i++) {
			lignes[i].parentNode.removeChild(lignes[i]);
		}
	}
	
	function Lancement_via_Zzzelp() {
		return document.querySelector('#lancement_zzzelp') && document.querySelector('#lancement_zzzelp').checked;
	}
	
	function Placement_antisonde() {
		return document.querySelector('#placer_antisonde') && document.querySelector('#placer_antisonde').checked;
	}
	
	function Aide_relance() {
		return document.querySelector('#aide_relance') && document.querySelector('#aide_relance').checked;
	}
	
	function Valeur_aide_relance() {
		return document.querySelector('#choix_aide_relance') ? parseInt(document.querySelector('#choix_aide_relance').value) : 1;
	}
	
	function Anti_synchronisation() {
		return document.querySelector('#anti_synchro') && document.querySelector('#anti_synchro').checked;
	}
	
	function Valeur_anti_synchronisation() {
		return document.querySelector('#seconde_anti_synchro') ? parseInt(document.querySelector('#seconde_anti_synchro').value) : 58;
	}
	
	/*
	 * GESTION DES SONDES
	*/
	
	function Insertion_preparation_sonde(ID, lieu, nombre, unite, place) {
		var tableau = document.querySelector('.optimisation_' + ID);
		tableau.dataset.nfloods = parseInt(tableau.dataset.nfloods) + 1;
		tableau.dataset.mode_opti = 'inconnu';
		var ligne = tableau.insertRow(place),
			cell = ligne.insertCell(0);
		ligne.setAttribute('class', 'ligne_preparation');
		ligne.dataset.numero = parseInt(tableau.dataset.nfloods);
		var	input = document.createElement('input');
		ligne.setAttribute('class', 'ligne_preparation');
		cell.setAttribute('colspan', '3');
		input.type = 'text';
		input.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this);return false;}
		input.value = ze_Nombre(nombre);
		ligne.cells[0].appendChild(input);
		var choix = document.createElement('select');
		ligne.cells[0].appendChild(choix);
		for(var i=0;i<ZzzelpScriptArmee.TAGs.length;i++) {
			var option = document.createElement('option');
			option.value = i;
			option.innerHTML = ZzzelpScriptArmee.TAGs[i];
			choix.appendChild(option);
		}
		var validation = document.createElement('img');
		validation.src = url_zzzelp + '/Images/valider.png';
		cell = ligne.insertCell(1);
		Inserer_lieu(cell, ID, ligne.dataset.numero);
		cell = ligne.insertCell(2);
		Inserer_liens_modifs(cell, ID, ligne.dataset.numero);		
		ligne.querySelector('.lieu').innerHTML = lieux[lieu];
		validation.onclick = function onclick(event) {Validation_sonde_manuelle(ID, parseInt(ligne.dataset.numero), lieux.indexOf(ligne.querySelector('.lieu').innerHTML), choix.value, parseInt(input.value.replace(/ /g, '')), true); return false;}
		validation.setAttribute('class', 'preparation_libre');
		ligne.cells[0].appendChild(validation);
		choix.value = unite;
	}
	
	function Validation_sonde_manuelle(ID, n, lieu, unite, nombre, nettoyage) {
		if(!nettoyage) {
			var tableau = document.querySelector('.optimisation_' + ID);
			tableau.dataset.nfloods = parseInt(tableau.dataset.nfloods) + 1;
			var ligne = tableau.insertRow(-1);
			ligne.dataset.numero = tableau.dataset.nfloods;
			var	cell = ligne.insertCell(0);
			cell.setAttribute('colspan', '3');
			cell = ligne.insertCell(1);
			Inserer_lieu(cell, ID, ligne.dataset.numero);
			cell = ligne.insertCell(2);
			Inserer_liens_modifs(cell, ID, ligne.dataset.numero);
			var n = parseInt(ligne.dataset.numero);
		}
		document.querySelector('.optimisation_' + ID + ' [data-numero="' + n + '"]').setAttribute('class', 'ligne_sonde');
		var cell = document.querySelectorAll('.optimisation_' + ID + ' [data-numero="' + n + '"] td')[0],
			valeur = document.createElement('span');
		if(nettoyage) {
			ze_Supprimer_element(cell.querySelector('img'));
			ze_Supprimer_element(cell.querySelector('select'));
			ze_Supprimer_element(cell.querySelector('input'));
		}
		cell.innerHTML = 'Sonde de ';
		valeur.innerHTML = ze_Nombre(nombre) + ' ';
		valeur.setAttribute('id', 'nombre_sonde');
		cell.appendChild(valeur);
		var nom_unite = document.createElement('span');
		nom_unite.innerHTML = ZzzelpScriptArmee.TAGs[unite]
		nom_unite.setAttribute('id', 'unite_sonde');
		cell.appendChild(nom_unite);
		document.querySelectorAll('.optimisation_' + ID + ' [data-numero="' + n + '"] td')[1].querySelector('.lieu').innerHTML = lieux[lieu];
		
	}
	
	/*
	 * LANCEMENT DES FLOODS
	*/
	
	function Lancer_floods() {
		var URL = '[',
			vide = true;
			
		for(var t=0; t<pseudos.length; t++) { //Encodage des attaques
			if(pseudos[t] != donnees.pseudo && document.querySelectorAll('.optimisation_' + donnees.coordonnees[0][pseudos[t]].ID + ' tr').length > 2) {
				var URL_2 = '';
				var lignes = document.querySelectorAll('.optimisation_' + donnees.coordonnees[0][pseudos[t]].ID + ' tr');
				for(var i=2; i<lignes.length; i++) {
					if(lignes[i].className == 'ligne_sonde') {
						vide = false;
						var nombre = ze_Base_10_36(parseInt(lignes[i].querySelector('#nombre_sonde').innerHTML.replace(/ /g, ''))),
							unite = ze_Base_10_36(ZzzelpScriptArmee.TAGs.indexOf(lignes[i].querySelector('#unite_sonde').innerHTML)),
							lieu = parseInt(lieux.indexOf(lignes[i].querySelector('.lieu').innerHTML)) + 1;
						URL_2 += ((URL_2 == '')? '' : ';') + '1' + nombre + ',' + unite + ',' + lieu;
					}
					else if(lignes[i].dataset.type != 'hors_opti') {
						vide = false;
						var valeur = ((lignes[i].dataset.type  == 'armee_complete') ? '-1' : ze_Base_10_36(lignes[i].querySelector('td').innerHTML.replace(/ /g, ''))),
							lieu = parseInt(lieux.indexOf(lignes[i].querySelector('.lieu').innerHTML)) + 1;
						URL_2 += ((URL_2 == '')? '' : ';') + '0' + valeur + ',' + lieu;
					}
				}
				URL += (URL_2 != '') ? (((URL == '[') ? '' : ':') + URL_2 + ';' + ze_Base_10_36(donnees.coordonnees[0][pseudos[t]].ID) + ';' + ze_Base_10_36(donnees.coordonnees[0][pseudos[t]].temps) + ';' + pseudos[t]) : '';
			}
		}
		URL += ']&s=' + donnees.serveur;
		if(Placement_antisonde()) {
			URL += '&as=[' + ze_Base_10_36(donnees.antisonde[0].unite) + ',' + ze_Base_10_36(donnees.antisonde[0].valeur) + ',' + ze_Base_10_36(donnees.antisonde[1].unite) + ',' + ze_Base_10_36(donnees.antisonde[1].valeur) + ']';
		}
		if(Anti_synchronisation()) {
			var seconde_att = Valeur_anti_synchronisation()*1000,
				seconde_duree = parseInt(((1-Math.exp(-donnees.coordonnees[0][pseudos[1]].distance/350))*7.375*Math.pow(0.9,donnees.vitesse_attaque))*86400000)%60000;
			URL += '&sec=' + ((seconde_att + 60000 - seconde_duree)%60000);
		}
		URL = 'http://' + donnees.serveur + '.fourmizzz.fr/Armee.php?fl=' + URL;
		if(donnees.token && donnees.token.length > 0) {
			URL += '&token=' + donnees.token;
		}
		if(Aide_relance()) {
			URL += '&relance=' + Valeur_aide_relance();
		}
		if(Lancement_via_Zzzelp()) {
			URL += '&lz';
		}
		else {
			URL += '&lf';
		}
		if(vide) {
			alert('Aucune attaque à envoyer');
		}
		else {
			if(donnees.stockage_parametres_zzzelp) {
				Stockage_parametres_Zzzelp(URL, 1);
			}
			else {
				document.location.href = URL;
			}
		}
	}
	
	function Stockage_parametres_Zzzelp(URL, mode) {
		var parametres = new Array(
							Lancement_via_Zzzelp() ? 1 : 0,
							Placement_antisonde() ? 1 : 0
		);
		if(typeof donnees.aide_relance != 'undefined') {
			parametres.push(Aide_relance() ? 1 : 0);
			parametres.push(Valeur_aide_relance());
		}
		else {
			parametres.push(0);
			parametres.push(0);			
		}
		if(typeof donnees.anti_synchro != 'undefined') {
			parametres.push(Anti_synchronisation() ? 1 : 0);
			parametres.push(Valeur_anti_synchronisation());	
		}
		else {
			parametres.push(0);
			parametres.push(0);				
		}
		var niveaux = '';
		for(var i=0; i<parametres.length; i++) {
			niveaux += ((niveaux == '') ? '' : ',') + parametres[i];
		}
		new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'niveaux_script?lieu=zzzelpfloods&niveaux=[' + niveaux + ']&', force : mode },
			{ success : function(valeurs) {
				document.location.href = URL;
			}, authentication_issue : function() {
				Stockage_parametres_Zzzelp(URL, 2);
			}
		});
	}
	
	/*
	 * OPTIMISATION AUTOMATIQUE
	*/
	function Calcul_flood(valeurs, flood) {
		if(flood == -2) {
			valeurs.armee_complete = valeurs['floods'].length;
			flood = Math.floor(valeurs.TDC_cible * 0.2);
		}
		valeurs.TDC_cible -= flood
		valeurs.TDC_attaquant += flood;
		valeurs.nombre_unites -= flood;
		valeurs.marge -= flood;
		valeurs['floods'].push(flood);
		return valeurs;
	}
	
	function Optimisation_flood(valeurs) {
		var valeurs_2 = JSON.parse(JSON.stringify(valeurs));
		valeurs_2.marge = -1;
		if(valeurs.TDC_attaquant <= 2*valeurs.TDC_cible && valeurs.TDC_cible <= valeurs.TDC_attaquant*3) {
			if (valeurs.marge == -1) {
				while (valeurs.TDC_attaquant < Math.floor(valeurs.TDC_cible*1.4) && valeurs.nombre_unites >= valeurs.TDC_cible*0.2) {
					(valeurs.floods.length == 0 && valeurs.armee_debut) ? (valeurs = Calcul_flood(valeurs, -2)) : (valeurs = Calcul_flood(valeurs, Math.floor(valeurs.TDC_cible * 0.2)));
				}
				valeurs.marge = Math.floor((valeurs.TDC_cible*2 - valeurs.TDC_attaquant)/3);
				if (valeurs.nombre_unites >= valeurs.marge) {
					if(valeurs.floods.length == 0 && valeurs.armee_debut) {
						valeurs = Calcul_flood(valeurs, -2);
					}
					else {
						valeurs = Calcul_flood(valeurs, valeurs.marge);
						if(valeurs.armee_fin) {
							valeurs = Calcul_flood(valeurs, -2);
						}
						else if (valeurs.nombre_unites >= valeurs.TDC_cible*0.2) {
							valeurs = Calcul_flood(valeurs, Math.floor(valeurs.TDC_cible * 0.2));
						}
						else {
							valeurs = Calcul_flood(valeurs, valeurs.nombre_unites);
						}
					}
				}
				else if (valeurs.nombre_unites > 0) {
					valeurs = Calcul_flood(valeurs, valeurs.nombre_unites);
				}
			}
			else if (valeurs.marge > 0) {
				while (valeurs.marge > valeurs.TDC_cible*0.2 && valeurs.TDC_attaquant < Math.floor(valeurs.TDC_cible*1.4) && valeurs.nombre_unites >= valeurs.TDC_cible*0.2) {
					valeurs = Calcul_flood(valeurs, Math.floor(valeurs.TDC_cible * 0.2));
				}
				if (valeurs.marge > valeurs.TDC_cible*0.36) {
					return Optimisation_flood(valeurs_2)
				}
				else if (valeurs.marge <= valeurs.TDC_cible*0.2 && valeurs.nombre_unites >= valeurs.marge) {
					valeurs = Calcul_flood(valeurs, valeurs.marge);
				}
				else if (valeurs.marge > valeurs.TDC_cible*0.2 && valeurs.nombre_unites >= valeurs.marge) {
					marge_2 = Math.floor((valeurs.TDC_cible*2-valeurs.TDC_attaquant)/3);
					valeurs = Calcul_flood(valeurs, marge_2);
					valeurs = Calcul_flood(valeurs, valeurs.marge);
				}
				else if (capa_flood > 0) {
					valeurs = Calcul_flood(valeurs, valeurs.nombre_unites);
				}
			}
		}
		return valeurs;
	}
}




/*
 * Exécutée sur la page Armee de Fourmizzz pour répartir les unités entre les différents floods
 * Génère ensuite les URL pour chaque attaque et exécute la 1ère attaque
*/


function LancementZzzelpflood(valeurs) {
	if(!valeurs) {
		valeurs = Analyse_URL();
	};
	
	valeurs.armee = ZzzelpScriptArmee.getArmee(document, 0);
	valeurs = Calcul_armee_dispo(valeurs);
	valeurs = Calcul_unites_sondes(valeurs);
	valeurs = Calcul_unites_floods(valeurs);
	console.log(valeurs);
	Envoi_attaques(valeurs);
	
	function Analyse_URL() {
		localStorage['zzzelp_aide_relance_' + ze_serveur] = JSON.stringify(new Array());
		var lancements = ze_Analyser_URL('fl'),
			valeurs = {schemas : new Array(), interface : true};
		lancements = lancements.substr(1, lancements.length - 2).split(':');
		for(var i=0; i<lancements.length; i++) {
			var floods = lancements[i].split(';'),
				ID = ze_Base_36_10(floods[floods.length - 3]),
				temps = ze_Base_36_10(floods[floods.length - 2]),
				pseudo = floods[floods.length - 1];
			for(var n=0; n<floods.length - 3; n++) {
				var flood = floods[n].substr(1, floods[n].length - 1).split(',');
				if(floods[n].substr(0,1) == 0) { // On a un flood
					valeurs.schemas.push({mode : 'flood', valeur : (flood[0] == '-1') ? -1 : ze_Base_36_10(flood[0]), lieu : flood[1], ID : ID, pseudo : pseudo, duree : temps});
				}
				else { // On a une sonde
					valeurs.schemas.push({mode : 'sonde', nombre : ze_Base_36_10(flood[0]), lieu : flood[2], unite : ze_Base_36_10(flood[1]), ID : ID, pseudo : pseudo, duree : temps });
				}
			}
		}
		if(ze_Analyser_URL('sec')) {
			valeurs.seconde = parseInt(ze_Analyser_URL('sec'));
		}
		else {
			valeurs.seconde = -1;
		}
		if(ze_Analyser_URL('relance')) {
			valeurs.relance = parseInt(ze_Analyser_URL('relance'));
		}
		else {
			valeurs.relance = -1;
		}
		return valeurs;
	}
	
	function Calcul_armee_dispo(valeurs) {
		valeurs.armee_floods = valeurs.armee;
		valeurs.antisonde = new Array();
		valeurs.etape_antisonde = 0;
		if(ze_Analyser_URL('as')) {
			var antisonde = ze_Analyser_URL('as').substr(1, ze_Analyser_URL('as').length - 2).split(',');
			for(var i=0; i<2; i++) {
				var unite = ze_Base_36_10(antisonde[2*i]),
					nombre = ze_Base_36_10(antisonde[2*i+1]);
				valeurs.antisonde.push(new Array(unite, ze_Majoration(nombre, valeurs.armee_floods[unite])));
				valeurs.armee_floods[unite] -= (valeurs.armee_floods[unite] > nombre) ? nombre : valeurs.armee_floods[unite];
			}
		}
		return valeurs;
	}
	
	function Calcul_unites_sondes(valeurs) {
		for(var i=0; i<valeurs.schemas.length; i++) {
			if(valeurs.schemas[i].mode == 'sonde') {
				var unites_sonde = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
					manquantes = valeurs.schemas[i].nombre;
				for(var n=valeurs.schemas[i].unite; n<valeurs.schemas[i].unite + 14; n++) {
					if(valeurs.armee_floods[n%14] > manquantes) {
						unites_sonde[n%14] = manquantes;
					}
					else {
						unites_sonde[n%14] = valeurs.armee_floods[n%14];
					}
					manquantes -= unites_sonde[n%14];
					valeurs.armee_floods[n%14] -= unites_sonde[n%14];
				}
				valeurs.schemas[i].unites = unites_sonde;
			}
		}
		return valeurs;
	}
	
	function Calcul_unites_floods(valeurs) {
		var aide_relance = new Array(),
			pseudos_pris = new Array();
		for(var i=0; i<valeurs.schemas.length; i++) {
			if(valeurs.schemas[i].mode == 'flood') {
				if(valeurs.relance == 2 && (aide_relance.length == 0 || valeurs.schemas[i].valeur > valeurs.schemas[aide_relance[0]].valeur)) {
					aide_relance[0] = i;
				}
				else if(valeurs.relance == 1 && !in_array(valeurs.schemas[i].pseudo, pseudos_pris)) {
					aide_relance.push(i);
					pseudos_pris.push(valeurs.schemas[i].pseudo);
				}
				 if(valeurs.schemas[i].valeur >= 0) {
					var unites_flood = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
						manquantes = valeurs.schemas[i].valeur;
					for(var n=0; n<14; n++) {
						if(valeurs.armee_floods[n] > manquantes) {
							unites_flood[n] = manquantes;
						}
						else {
							unites_flood[n] = valeurs.armee_floods[n];
						}
						manquantes -= unites_flood[n];
						valeurs.armee_floods[n] -= unites_flood[n];
					}
					valeurs.schemas[i].unites = unites_flood;	
				}
			}
		}
		for(var i=0; i<valeurs.schemas.length; i++) {
			if(valeurs.schemas[i].mode == 'flood' && valeurs.schemas[i].valeur == -1) {
				valeurs.schemas[i].unites = valeurs.armee_floods;	
				valeurs.armee_floods = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);			
			}
		}
		for(var i=0; i<valeurs.schemas.length; i++) {
			valeurs.schemas[i].aide_relance = in_array(i, aide_relance);
		}
		return valeurs;
	}
	
	function Stockage_liens(valeurs) {
		var liens = new Array();
		for(var i=0; i<valeurs.schemas.length; i++) {		
			liens.push('/ennemie.php?unites=[' + (valeurs.schemas[i].unites) + ']&lieu=' + valeurs.schemas[i].lieu + '&Attaquer=' + valeurs.schemas[i].ID + '&mode=' + valeurs.schemas[i].mode + '&lieu=' + (parseInt(valeurs.schemas[i].lieu)+1) + '&s=' + ze_Analyser_URL('s') + '&n=' + (i+1) + '&z=' + (document.location.href.substr(-3, 3) == '&lz') + ((i == valeurs.schemas.length - 1 && valeurs.antisonde.length > 0) ? '&as=[' + valeurs.antisonde[0][0] + ',' + valeurs.antisonde[0][1] + ',' + valeurs.antisonde[1][0] + ',' + valeurs.antisonde[1][1] + ']': ''));
		}
		for(var i=0; i<valeurs.antisonde.length; i++) {
			if(i ==0) {
				liens.push('/Armee.php?dlz=true&paz');
			}
			if(valeurs.antisonde[i][1] > 0) {
				liens.push('/Armee.php?antisonde=[' + i + ',' + valeurs.antisonde[i][0] + ',' + valeurs.antisonde[i][1] + ']&paz');
			}
		}
		localStorage['attaques_zzzelpfloods_' + ze_Analyser_URL('s')] = JSON.stringify(liens);
		localStorage['index_attaque_zzzelp'] = 1;
		document.location.href = 'http://' + ze_Analyser_URL('s') + '.fourmizzz.fr' + liens[0];
	}
	
	function Generation_tableau_attaques(valeurs) {
		var titre = document.createElement('h1');
		titre.innerHTML = 'Aperçu des attaques';
		titre.setAttribute('style', 'text-align:center');
		document.querySelector('body').appendChild(titre);
		
		var tableau = document.createElement('table'),
			ligne = tableau.insertRow(0);
		tableau.setAttribute('style', 'margin: 50px auto;border-collapse: collapse;background:white');
		var cell = ligne.insertCell(0);
		cell.setAttribute('style', 'width : 100px');
		for(var i=0; i<14; i++) {
			var cell = ligne.insertCell(i+1);
			cell.innerHTML = ZzzelpScriptArmee.TAGs[i];
			cell.setAttribute('style', 'width : 100px');
		}
		for(var i=0; i<valeurs.schemas.length; i++) {
			var ligne = tableau.insertRow(i+1);
			var cell = ligne.insertCell(0);
			cell.setAttribute('style', 'height:2em');
			cell.innerHTML = 'Attaque ' + i;
			for(var n=0; n<14; n++) {
				ligne.insertCell(n+1).innerHTML = valeurs.schemas[i].unites[n];
			}
		}
		var ligne = tableau.insertRow(-1);
		ligne.insertCell(0).innerHTML = 'Reste';
		for(var i=0; i<14; i++) {
			ligne.insertCell(i+1).innerHTML = valeurs.armee_floods[i];
		}
		document.querySelector('body').appendChild(tableau);
	}

	function Envoi_attaques(valeurs) {
		ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : 'ennemie.php?Attaquer=' + valeurs.schemas[0].ID + '&lieu=0' },
			{ success : function(contenu) {
				var tokens = new Array(new RegExp('<input type="hidden" name="t" id="t" value="(.*)"/>').exec(contenu)[1], document.querySelector('#t').value),
					zone = document.createElement('div'),
					tableau = document.createElement('table'),
					ligne = tableau.insertRow(0);
					stockage_zzzelp = (document.location.href.substr(-3, 3) == '&lz');
				var sdam_zone = document.querySelector('#sd_showhidecopy');
				if(sdam_zone) {
					ze_Supprimer_element(sdam_zone);
					ze_Supprimer_element(document.querySelector('#sd_tablecopy'));
					ze_Supprimer_element(document.querySelector('#Sdversion'));
				}
				
				ze_Supprimer_element(document.querySelector('.pas_sur_telephone'));
				ze_Supprimer_element(document.querySelector('.simulateur'));
				ze_Supprimer_element(document.querySelector('.simulateur'));
				
				zone.setAttribute('class', 'zone_zzzelpfloods');
				zone.setAttribute('id', 'theme_fourmizzz');
				tableau.setAttribute('id', 'lancement_zzzelp');
				tableau.setAttribute('class', 'tableau_recap');
				tableau.dataset.lancement_fini = 0;
				ligne.insertCell(0).innerHTML = 'Cible';
				ligne.insertCell(1).innerHTML = 'Type';
				ligne.insertCell(2).innerHTML = 'Unités';
				ligne.insertCell(3).innerHTML = 'Envoyé';
				ligne.insertCell(4).innerHTML = 'Stocké';
				for(var i=0; i<valeurs.schemas.length; i++) {
					var ligne = tableau.insertRow(-1),
						cell = ligne.insertCell(0),
						cell2 = ligne.insertCell(1),
						cell3 = ligne.insertCell(2),
						cell4 = ligne.insertCell(3),
						cell5 = ligne.insertCell(4);
					cell.setAttribute('style', 'font-weight:bold;');
					cell.innerHTML = ze_Lien_profil(valeurs.schemas[i].pseudo) + ' :';
					cell2.innerHTML = (valeurs.schemas[i].mode == 'flood') ? 'Flood' : 'Sonde';
					
					var entete = document.createElement('div'),
						zone_unites = document.createElement('div'),
						img = document.createElement('img');
					entete.innerHTML = ze_Nombre(array_sum(valeurs.schemas[i].unites));
					entete.setAttribute('class', 'entete_liste_unites');
					img.src = url_zzzelp + '/Images/fourmis.png';
					cell3.setAttribute('class', 'menu_unites');
					zone_unites.setAttribute('class', 'liste_unites');
					var unite = document.createElement('div'),
						nombre = document.createElement('span'),
						tag = document.createElement('span');			
					unite.setAttribute('class', 'ligne_unite');
					nombre.innerHTML = ze_Nombre(array_sum(valeurs.schemas[i].unites));
					tag.innerHTML = 'unités'
					zone_unites.appendChild(unite);
					unite.appendChild(nombre);
					unite.appendChild(tag);
					for(var k=0; k<14; k++) {
						var unite = document.createElement('div'),
							nombre = document.createElement('span'),
							tag = document.createElement('span');			
						unite.setAttribute('class', 'ligne_unite');
						nombre.innerHTML = ze_Nombre(valeurs.schemas[i].unites[k]);
						tag.innerHTML = ZzzelpScriptArmee.TAGs[k];
						zone_unites.appendChild(unite);
						unite.appendChild(nombre);
						unite.appendChild(tag);
					}
					cell3.appendChild(entete);
					entete.appendChild(img);
					cell3.appendChild(zone_unites);				
					
					
					cell4.setAttribute('style', 'color:red;');
					cell5.setAttribute('style', ((stockage_zzzelp && valeurs.schemas[i].mode == 'flood') ? 'color:red;' : ''));
					cell4.innerHTML = 'NON';
					cell5.innerHTML = (stockage_zzzelp && valeurs.schemas[i].mode == 'flood') ? 'NON' : '-';	
				}
				if(valeurs.antisonde.length > 0) {
					var ligne = tableau.insertRow(-1),
						cell = ligne.insertCell(0);
					cell.setAttribute('colspan', '5');
					cell.innerHTML = 'Antisonde non placée';
					cell.setAttribute('style', 'color:red;font-weight:bold;text-align:center');
					cell.id = 'placement_antisonde';
				}
				if(valeurs.seconde > -1) {
					var ligne = tableau.insertRow(-1),
						cell = ligne.insertCell(0);
					cell.setAttribute('colspan', '5');
					cell.innerHTML = '<span id="attente_lancement_zzzelp"></span> secondes avant le lancement';
					cell.setAttribute('style', 'font-weight:bold;text-align:center');
				}
				zone.appendChild(tableau);
				document.querySelector('center').insertBefore(zone, document.querySelector('center br'));
				Lancement_floods(valeurs, tokens, 1);
			}
		});
	}

	function Lancement_floods(valeurs, tokens, n) {
		if(valeurs.schemas.length > 0) {
			if(valeurs.seconde == -1 || parseInt(valeurs.seconde/1000) == (new Date(time_fzzz()*1000)).getSeconds() || n > 1) {
				if(valeurs.seconde > -1 && n == 1) {
					ze_Supprimer_element(document.querySelector('#attente_lancement_zzzelp').parentNode.parentNode)
				}
				var flood = valeurs.schemas[0],
					xdr = ze_getXDomainRequest();
				valeurs.schemas.shift();
				if(flood.aide_relance) {
					var stockages = JSON.parse(localStorage['zzzelp_aide_relance_' + ze_serveur]);
					stockages.push({ pseudo : flood.pseudo, retour : time_fzzz() + flood.duree, id : +new Date() });
					localStorage['zzzelp_aide_relance_' + ze_serveur] = JSON.stringify(stockages);
				}
				xdr.onload = function() {				
					var en_cours = new RegExp('<h3([^!]+)').exec(xdr.responseText)[1].split('- Vous allez attaquer'),
						dernier = { retour : 0, ID : 0, heure : '', pseudo : '', alliance : '' };
					for(var k=0; k<en_cours.length;k++) {
						if(en_cours[k].match(new RegExp('Pseudo=(.*)">(.*)alliance=(.*)">(.*)id="attaque_([0-9]+)">(.*) </span><script language="JavaScript">reste\\(([0-9]+)'))) {
							var donnees = new RegExp('Pseudo=(.*)">(.*)alliance=(.*)">(.*)id="attaque_([0-9]+)">(.*) </span><script language="JavaScript">reste\\(([0-9]+)').exec(en_cours[k]);
							if(parseInt(donnees[5]) > dernier.ID) {
								dernier = { retour : parseInt(donnees[7]), ID : parseInt(donnees[5]), heure : donnees[6], pseudo : donnees[1], alliance : donnees[3] };
							}
						}
					}
					document.querySelector('center').innerHTML += '- Vous allez attaquer <span class="gras"><a href="Membre.php?Pseudo=' + dernier.pseudo + '">' + dernier.pseudo + '</a>(<a href="classementAlliance.php?alliance=' + dernier.alliance + '">' + dernier.alliance + '</a>)</span> dans <span class="gras" id="attaque_' + dernier.ID + '">' + dernier.heure + '</span> - <a href="/Armee.php?annuler=' + dernier.ID + '">Annuler</a>';
					var script = document.createElement('script');
					script.setAttribute('language', 'JavaScript');
					script.innerHTML = 'reste(' + dernier.retour + ', "attaque_' + dernier.ID + '");';
					document.querySelector('center').appendChild(script);
					document.querySelector('center').appendChild(document.createElement('br'));
					document.querySelector('#lancement_zzzelp').rows[n].cells[3].style.color = 'green';
					document.querySelector('#lancement_zzzelp').rows[n].cells[3].innerHTML = 'OUI';
					Stockage_flood_Zzzelp(valeurs, flood, tokens, n, 1);
				}
				var texte = '';
				for(var k=0; k<14; k++) {
					if(flood.unites[k] != 0) {
						texte += ((texte != '')? '&' : '') + 'unite' + ZzzelpScriptArmee.ID[k] + '=' + flood.unites[k];
					}
				}
				xdr.open('POST', 'http://' + ze_serveur + '.fourmizzz.fr/ennemie.php?Attaquer=' + flood.ID + '&lieu=' + flood.lieu, true);
				xdr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xdr.send(texte + '&lieu=' + flood.lieu + '&ChoixArmee=1&t=' + tokens[0]);
			}
			else {
				setTimeout(function() {Lancement_floods(valeurs, tokens, n)},1);
				document.querySelector('#attente_lancement_zzzelp').innerHTML = parseInt((valeurs.seconde/1000 - (new Date(time_fzzz()*1000)).getSeconds() + 60)%60)
			}
		}
		else if(valeurs.antisonde.length > 0) {
			Placement_antisonde_Ajax(valeurs.antisonde, tokens[1], 1);
		}
		else {
			document.querySelector('#lancement_zzzelp').dataset.lancement_fini = 1;
		}
	}
	
	function Stockage_flood_Zzzelp(donnees, flood, tokens, n, mode) {
		if(document.location.href.substr(-3, 3) == '&lz' && document.querySelector('#lancement_zzzelp').rows[n].cells[1].innerHTML == 'Flood') {
			new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'floods_script?unites=[' + flood.unites + ']&cible=' + flood.ID + '&', force : mode },
				{ success : function(valeurs) {
					document.querySelector('#lancement_zzzelp').rows[n].cells[4].style.color = 'green';
					document.querySelector('#lancement_zzzelp').rows[n].cells[4].innerHTML = 'OUI';					
					Lancement_floods(donnees, tokens, (n+1));
				}, authentication_issue : function() {
					Stockage_flood_Zzzelp(donnees, flood, tokens, n, 2);
				}
			});
		}
		else {
			Lancement_floods(donnees, tokens, (n+1));
		}
	}
}

function Placement_antisonde_Ajax(antisonde, token, n, rediriger) {
	if(n == 1) {
		ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : 'Armee.php?deplacement=3&t=' + token },
			{ success : function(zone_page, ajax) {
				Placement_antisonde_Ajax(antisonde, token, n+1, rediriger);
			}
		});
	}
	else if(n == 2) {
		var url = 'Armee.php?Transferer=Envoyer&LieuOrigine=3&LieuDestination=1';
		url += '&ChoixUnite=' + ZzzelpScriptArmee.ordre[antisonde[0][0]];
		url += '&nbTroupes=' + antisonde[0][1] + '&t=' + token;
		ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : url },
			{ success : function(zone_page, ajax) {
				Placement_antisonde_Ajax(antisonde, token, n+1, rediriger);
			}
		});
	}
	else if(n == 3) {
		var url = 'Armee.php?Transferer=Envoyer&LieuOrigine=3&LieuDestination=2';
		url += '&ChoixUnite=' + ZzzelpScriptArmee.ordre[antisonde[1][0]]
		url += '&nbTroupes=' + antisonde[1][1] + '&t=' + token;
		ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : url },
			{ success : function(zone_page, ajax) {
				Placement_antisonde_Ajax(antisonde, token, n+1, rediriger);
			}
		});
	}
	else if(n == 4 && rediriger) {
		document.location.href = 'http://' + ze_serveur + '.fourmizzz.fr/Armee.php';
	}
	else if(n == 4) {
		document.querySelector('#placement_antisonde').innerHTML = 'Antisonde placée';
		document.querySelector('#placement_antisonde').style.color = 'green';
		document.querySelector('#lancement_zzzelp').dataset.lancement_fini = 1;
	}
}

