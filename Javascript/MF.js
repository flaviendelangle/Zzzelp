function Initialisation_MF(zone_2, donnees, lieu) {
	console.log(donnees);
	if(typeof lieu == "undefined") {
		lieu = '/';
	}
	Preparation_donnees();
	donnees.trie = { croissant : false, mode : 'TDC' };
	Application_rangs();
	donnees.organisation = ze_Analyser_chaine(Recuperation_chaine());
	donnees.pseudos.sort(Fonction_trie);
	var alliances = Creation_tableau_alliances();
	if(donnees.mode_MF != 'chasse') {
		Creation_tableau_RC();
		Affichage_menu_options(document.querySelector('.tableau_options_RC').rows);
	}
	Creation_tableau_options();
	Creation_tableau_MF(alliances);
	Creation_total_chasses();
	Creation_ligne_lancement();
	Actualisation_MF(donnees);
	Affichage_menu_options(document.querySelector('.tableau_options_MF').rows);
	
	
	function Creation_tableau_alliances() {
		var alliances = {};
		for(var joueur in donnees.joueurs) {
			if(typeof alliances[donnees.joueurs[joueur].alliance] == 'undefined') {
				alliances[donnees.joueurs[joueur].alliance] = { nombre : 1, TDC : donnees.joueurs[joueur].TDC };
			}
			else {
				alliances[donnees.joueurs[joueur].alliance].nombre ++;
				alliances[donnees.joueurs[joueur].alliance].TDC += donnees.joueurs[joueur].TDC;
			}
		}
		var tableau = document.createElement('table');
		tableau.setAttribute('class', 'tableau_alliances_MF tableau_ombre animated fadeIn');
		var ligne = tableau.insertRow(0),
			TAG = document.createElement('th'),
			TDC = document.createElement('th'),
			nombre = document.createElement('th'),
			visible = document.createElement('th');
		TAG.innerHTML = 'TAG';
		TDC.innerHTML = 'TDC';
		nombre.innerHTML = 'Nb';
		ligne.appendChild(TAG);
		ligne.appendChild(TDC);
		ligne.appendChild(nombre);
		ligne.appendChild(visible);
		for(var alliance in alliances) {
			var ligne = tableau.insertRow(-1),
				TAG = ligne.insertCell(0),
				TDC = ligne.insertCell(1),
				nombre = ligne.insertCell(2),
				visible = ligne.insertCell(3),
				lien = document.createElement('a');
				checkbox = document.createElement('input');
			ligne.dataset.alliance = alliance;
			TDC.innerHTML = ze_Nombre(alliances[alliance].TDC);
			nombre.innerHTML = ze_Nombre(alliances[alliance].nombre);
			lien.href = 'http://zzzelp.fr/traceur/alliance?serveur=' + donnees.serveur + '&alliance=' + alliance;
			lien.setAttribute('target', '_BLANK');
			lien.innerHTML = alliance;
			checkbox.type = 'checkbox';
			checkbox.setAttribute('checked', 'checked');
			checkbox.onchange = function onchange(event) { Gestion_affichage_joueurs() };
			TAG.appendChild(lien);
			visible.appendChild(checkbox);
		}
		zone_2.appendChild(tableau);
		return alliances;
	}

	function Creation_tableau_options() {
		var options = new Array(
					{ id : 'capa_flood', nom : 'Nombre d\'unités', valeur : ze_Nombre(parseInt(donnees.nombre_unites)), type : 'text', class : 'input_tableau input_haut',  },
					{ id : 'vitesse_attaque', nom : 'Vitesse d\'attaque', valeur : ze_Nombre(parseInt(donnees.vitesse_attaque)), type : 'text', class : 'input_niveau input_haut' },
					{ id : 'affichage_hdp', nom : 'Voir les HDP', valeur : '', type : 'checkbox', checked : true }
						),
			tableau = document.createElement('table'),
			ligne = tableau.insertRow(0),
			cell = document.createElement('th');
		tableau.setAttribute('class', 'tableau_options_MF tableau_ombre animated fadeIn');
		cell.setAttribute('colspan', '2');
		cell.innerHTML = 'OPTIONS DU MULTIFLOOD';
		cell.onclick = function onclick() {Affichage_menu_options(document.querySelector('.tableau_options_MF').rows); }
		ligne.appendChild(cell);
		for(var i=0; i<options.length; i++) {
			var ligne = tableau.insertRow(i+1),
				entete = ligne.insertCell(0),
				choix = ligne.insertCell(1),
				input = document.createElement('input');
			entete.innerHTML = options[i].nom + ' : ';
			input.type = options[i].type;
			input.value = options[i].valeur;
			input.setAttribute('id', options[i].id);
			if(options[i].class) {
				input.setAttribute('class', options[i].class);
			}
			if(options[i].checked) {
				input.setAttribute('checked', options[i].checked);
			}
			if(options[i].type = 'text') {
				input.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this) ;return false};
			}
			input.onchange = function onchange(event) { Modifier_parametre(this.id) };
			choix.appendChild(input);
		}
		zone_2.appendChild(tableau);
	}

	function Creation_tableau_RC() {
		console.log('OK');
		var zone_RC = document.createElement('div'),
			tableau = document.createElement('table'),
			options = new Array(
					{ nom : 'Début', id : 'debut', type : 'text', class : 'input_tableau' },
					{ nom : 'Fin', id : 'fin', type : 'text', class : 'input_tableau' },
					{ nom : 'Alliances', id : 'alliances', type : 'text', class : 'input_tableau' },
					{ nom : 'Joueurs', id : 'joueurs', type : 'text', class : 'input_tableau' },
					{ nom : 'HOF minimum', id : 'HOF_min', type : 'text', class : 'input_court'},
					{ nom : 'HOF maximum', id : 'HOF_max', type : 'text', class : 'input_court'}
							),
			tries = new Array(
					{ nom : 'Temporel', valeur : 'date' },
					{ nom : 'Années tuées', valeur : 'HOF' }
							);
		tableau.className = 'tableau_options_RC tableau_ombre animated fadeIn';

		var ligne = tableau.insertRow(0),
			cell = document.createElement('th');
		cell.setAttribute('colspan', '2');
		cell.innerHTML = 'OPTIONS COMBATS';
		cell.onclick = function onclick() {Affichage_menu_options(document.querySelector('.tableau_options_RC').rows); }
		ligne.appendChild(cell);

		for(var i=0; i<options.length; i++) {
			var ligne = tableau.insertRow(-1),
				label = ligne.insertCell(0),
				valeur = ligne.insertCell(1),
				input = document.createElement('input');

			label.innerHTML = options[i].nom + ' :';
			input.type = options[i].type;
			input.id = options[i].id + '_RC';
			input.className = options[i].class + ' input_haut';
			valeur.appendChild(input);
		}

		var ligne = tableau.insertRow(-1),
			entete = ligne.insertCell(0),
			valeur = ligne.insertCell(1),
			select = document.createElement('select');
		for(var i=0; i<tries.length; i++) {
			var option = document.createElement('option');
			option.innerHTML = tries[i].nom;
			option.value = tries[i].valeur;
			select.appendChild(option);
		}
		select.id = 'ordre_trie_RC';
		entete.innerHTML = 'Ordre des combats :';
		valeur.appendChild(select);

		var ligne = tableau.insertRow(-1),
			cell = ligne.insertCell(0),
			bouton = document.createElement('a');
		cell.appendChild(bouton);
		cell.setAttribute('colspan', '2');
		bouton.innerHTML = 'Actualiser';
		bouton.className = 'bouton';
		bouton.onclick = function onclick(event) { BDD_Combats(zone_RC);}

		zone_RC.appendChild(tableau);
		zone_2.appendChild(zone_RC);
		autocompletion(document.querySelector('#alliances_RC'), { mode : 'alliance', serveur : ze_Analyser_URL('serveur'), multiple : true });
		autocompletion(document.querySelector('#joueurs_RC'), { mode : 'joueur', serveur : ze_Analyser_URL('serveur'), multiple : true });
		document.querySelector('#HOF_min_RC').onkeyup = function onkeyup(event) {ze_Ajout_espaces(this);}
		document.querySelector('#HOF_max_RC').onkeyup = function onkeyup(event) {ze_Ajout_espaces(this);}
		rome(document.querySelector('#debut_RC'), { initialValue: Generation_date_rome(7) });
		rome(document.querySelector('#fin_RC'), { initialValue: Generation_date_rome(0) });

		document.querySelector('#alliances_RC').value = 'ZOO';

		BDD_Combats(zone_RC);
	}

	function BDD_Combats(zone_RC) {
		if(document.querySelectorAll('#zone_combats_MF').length > 0) {
			ze_Supprimer_element(document.querySelector('#zone_combats_MF'));
		}
		var xdr = ze_getXDomainRequest(),
			zone = document.createElement('div');
		zone.id = 'zone_combats_MF';
		zone.setAttribute('style', 'width: 90%;max-width: 720px;margin: auto;max-height: 350px;overflow-y: auto;box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.65);background: rgba(150,150,150,0.5);');
		zone_RC.appendChild(zone);
		xdr.onload = function() {
			var combats = JSON.parse(xdr.responseText);
			console.log(combats);
			for(var i=0; i<combats.length; i++) {
				var data = combats[i],
					message = document.createElement('div'),
					entete_message = document.createElement('div'),
					contenu_message = document.createElement('div'),
					date_message = document.createElement('span'),
					coordonnees_message = document.createElement('span');
				console.log(data);
				message.className = 'post_guerre';
				entete_message.className = 'entete_message';
				message.appendChild(entete_message);

				contenu_message.className = 'contenu_message';
				message.appendChild(contenu_message);
				contenu_message.setAttribute('style', 'display:none');
				entete_message.setAttribute('style', 'cursor:pointer');
				entete_message.onclick = function onclick(event) {
					this.nextSibling.style.display = (this.nextSibling.style.display == 'none') ? '' : 'none';
				}
				var analyse = JSON.parse(data.analyse),
					RC = data.RC.replace(/"Membre.php\?Pseudo=(.*?)"/g, 'http://' + ze_Analyser_URL('serveur') + '.fourmizzz.fr/Membre.php?Pseudo=$1'),
					zone_analyse = Generation_zone_analyse(data);
				
				var corps_message = document.createElement('div');
				corps_message.innerHTML = RC;
					contenu_message.appendChild(corps_message);
					contenu_message.appendChild(ze_Creer_zone_analyse(RC.split('<br>'), analyse, false, true));
					message.dataset.type_data = 'combat_' + ((data.position == 'defenseur') ? 'def' : 'att');

				var titre = (analyse.rebellion ? 'Rebellion' : ((data.mode == 'flood') ? 'Flood' : 'RC')) + ' ';
				titre += 'de ' + ((data.attaquant != '') ? data.attaquant : 'inconnu') + ' ';
				titre += (analyse.rebellion ? 'chez ' : 'sur ') + ((data.defenseur != '') ? data.defenseur : 'inconnu');
							
				if(!analyse.rebellion) {
					titre += ' - ' + ['TDC', 'Dôme', 'Loge'][analyse.lieu];
				}
				coordonnees_message.innerHTML = titre;
				date_message.innerHTML = ze_Generation_date_v1(data.date_RC, true);
				entete_message.appendChild(coordonnees_message);
				entete_message.appendChild(date_message);
				zone.appendChild(message);
			}
		}
		console.log(document.querySelector('#debut_RC'));
		xdr.open("GET", url_zzzelp + '/guerre_data?mode=bddcombats&serveur=' + donnees.serveur + '&debut=' + ze_Timestamp_input(document.querySelector('#debut_RC').value) + '&fin=' + ze_Timestamp_input(document.querySelector('#fin_RC').value) + '&alliances=' + document.querySelector('#alliances_RC').value + '&joueurs=' + document.querySelector('#joueurs_RC').value + '&HOF_mini=' + document.querySelector('#HOF_min_RC').value + '&HOF_maxi=' + document.querySelector('#HOF_max_RC').value + '&ordre=' + document.querySelector('#ordre_trie_RC').value);
		xdr.send();		


	}

	function Creation_tableau_MF() {
		var entetes_communes = new Array(
				{ id : 'chef', nom : '', nom_court : '', triable : true },
				{ id : 'pseudo', nom : 'Pseudo', nom_court : 'Pseudo', triable : true },
				{ id : 'alliance', nom : 'Alliance', nom_court : 'Ally', triable : true },
				{ id : 'rang', nom : 'Rang', nom_court : 'Rang', triable : true },
				{ id : 'TDC_actuel', nom : 'Terrain actuel', nom_court : 'Actuel', triable : true },
				{ id : 'distance', nom : 'Distance', nom_court : 'Distance', triable : true },
				{ id : 'arrivee', nom : 'Arrivée', nom_court : 'Arrivée', triable : true },
				{ id : 'TDC_arrivé', nom : 'Terrain arrivé', nom_court : 'Impact', triable : true },
				{ id : 'TDC_final', nom : 'Terrain final', nom_court : 'Final', triable : true }
						),
			entetes_chasse = new Array(
				{ id : 'chasses', nom : 'Chasses', nom_court : 'Chasses', triable : false },
				{ id : 'validation', nom : '', nom_court : '', triable : false }
						),
			entetes_guerre = new Array(
				{ id : 'niveaux', nom : 'Niveaux', nom_court : 'Niveaux', triable : false },
				{ id : 'armee', nom : 'Armée', nom_court : 'Armée', triable : false },
				{ id : 'modif', nom : 'Modif', nom_court : 'Modif', triable : false},
				{ id : 'validation', nom : '', nom_court : '', triable : false }
						);
		var tableau = document.createElement('table'),
			ligne = tableau.insertRow(0),
			entetes = entetes_communes.concat((donnees.mode_MF == 'chasse') ? entetes_chasse : entetes_guerre);
		tableau.className = 'tableau_MF tableau_ombre animated fadeIn';
		tableau.dataset.mode = donnees.mode_MF;
		for(var i=0; i<entetes.length; i++) {
			var cell = document.createElement('th'),
				entier = document.createElement('span'),
				raccourci = document.createElement('span');
			cell.id = 'colonne_' + entetes[i].id;
			entier.innerHTML = entetes[i].nom;
			raccourci.innerHTML = entetes[i].nom_court;
			cell.appendChild(entier);
			cell.appendChild(raccourci);
			ligne.appendChild(cell);
			if(entetes[i].triable) {
				cell.dataset.triable = 1;
				cell.onclick = function onclick(event) { Trie_MF(this.cellIndex); return false };
			}
		}
		var tout_cocher = document.createElement('input'),
			menu_cocher = document.createElement('div'),
			options = new Array(
							{ nom : 'Tout cocher', valeur : 'tout' },
							{ nom : 'Floods chaîne', valeur : 'chaine' }
								);
		for(var alliance in alliances) {
			options.push({ nom : 'Joueurs ' + alliance, valeur : 'alliance_' + alliance });
		}
		tout_cocher.type = 'checkbox';
		menu_cocher.className = 'menu_cocher';
		//tout_cocher.onchange = function onchange(event) { Cocher_tous_les_membres(tout_cocher.checked); return false };
		for(var i=0; i<options.length; i++) {
			var ligne = document.createElement('span'),
				label = document.createElement('span');
				checkbox = document.createElement('input');
			ligne.className = 'option_cocher_MF';
			label.innerHTML = '<label for="cocher_' + options[i].valeur + '">' + options[i].nom + '</label>';
			label.className = 'entete_option_cocher_MF';
			checkbox.type = 'checkbox';
			checkbox.id = 'cocher_' + options[i].valeur;
			checkbox.onchange = function onchange(event) {Cocher_groupe_cases(this.id) };
			ligne.appendChild(label);
			ligne.appendChild(checkbox);
			menu_cocher.appendChild(ligne);
		}
		cell.appendChild(tout_cocher);
		cell.appendChild(menu_cocher);
		zone_2.appendChild(tableau);
	}
	
	function Trie_MF(k) {
		var colonnes = new Array('chef', 'pseudo', 'alliance', 'rang', 'TDC', 'distance', 'distance', 'TDC_2', 'TDC_3', 'chasse'),
			ordre_defaut = new Array(false, true, true, true, false, true, true, false, false, true);
		donnees.trie = { croissant : ((donnees.trie.mode == colonnes[k]) ? !donnees.trie.croissant : true), mode : colonnes[k] };
		donnees.pseudos.sort(Fonction_trie);
		Actualisation_MF();
	}

	function Cocher_tous_les_membres(coche) {
		var lignes = document.querySelector('.tableau_MF').rows;
		for(var i=1; i<lignes.length; i++) {
			if(lignes[i].cells[10].querySelectorAll('input').length > 0) {
				lignes[i].cells[10].querySelector('input').checked = coche;
			}
		}
	}
	
	function Cocher_groupe_cases(modif) {
		//On décoche les cases nécessaires
		var options = document.querySelectorAll('.option_cocher_MF input[type*="checkbox"]');
		if(modif == 'cocher_tout') {
			for(var i=0; i<options.length; i++) {
				if(options[i].id != modif) {
					options[i].checked = false;
				}
			}
		}
		else {
			document.querySelector('#cocher_tout').checked = false;
		}
		
		//On applique les règles choisies
		Cocher_tous_les_membres(false);
		if(document.querySelector('#cocher_tout').checked) {
			Cocher_tous_les_membres(true);
		}
		if(document.querySelector('#cocher_chaine').checked) {
			var lignes = document.querySelector('.tableau_MF').rows;
			for(var i=1; i<lignes.length; i++) {
				if(lignes[i].cells[lignes[i].cells.length-1].querySelectorAll('input').length > 0) {
					var avant = false;
					for(var pseudo in donnees.organisation) {
						if(pseudo == donnees.pseudo) {
							avant = true;
						}
						else if(pseudo == lignes[i].dataset.pseudo && (avant || donnees.joueurs[pseudo].role == 'chasseur')) {
							lignes[i].cells[lignes[i].cells.length-1].querySelector('input').checked = true;

						}
					}
				}
			}
		}
		var alliances = document.querySelectorAll('input[id*="cocher_alliance_"]'),
			lignes = document.querySelector('.tableau_MF').rows;
		for(var i=0; i<alliances.length; i++) {
			if(alliances[i].checked) {
				for(var j=1; j<lignes.length; j++) {
					if(lignes[j].cells[lignes[j].cells.length-1].querySelectorAll('input').length > 0 && donnees.joueurs[lignes[j].dataset.pseudo].alliance == alliances[i].id.replace('cocher_alliance_', '')) {
							lignes[j].cells[lignes[j].cells.length-1].querySelector('input').checked = true;
					}
				}
			}
		}
		
	}
	
	function Application_rangs() {
		donnees.rangs_actuels = {};
		for(var i=0; i<donnees.rangs.length; i++) {
			donnees.rangs[i].alliances = (donnees.rangs[i].alliances == "*") ? null : donnees.rangs[i].alliances.replace(/ /g, '').split(',');
			if(donnees.rangs[i].mode < 2) {
				donnees.rangs[i].regle = donnees.rangs[i].regle.replace(/ /g, '').split(',');
			}
		}
		for(var i=0; i<donnees.pseudos.length; i++) {
			var pseudo = donnees.pseudos[i],
				rang = donnees.joueurs[donnees.pseudos[i]].rang;

			//Mode pseudos
			for(var n=0; n<donnees.rangs.length; n++) {
				var active = false;
				for(var j=0; j<3; j++) {
					if(donnees.rangs[n].alliances == null || (donnees.alliances[j] != '' && in_array(donnees.alliances[j], donnees.rangs[n].alliances))) {
						active = true;
					}
				}
				if(active) {
					if(donnees.rangs[n].mode == 0 && in_array(pseudo, donnees.rangs[n].regle)) {
						Appliquer_rang(donnees.pseudos[i], donnees.rangs[n].rang_affiche, donnees.rangs[n].couleur, donnees.rangs[n].ne_pas_flooder, donnees.rangs[n].role);
					}
				}
			}
			//Mode Alliances
			for(var n=0; n<donnees.rangs.length; n++) {
				var active = false;
				for(var j=0; j<3; j++) {
					if(donnees.rangs[n].alliances == null || (donnees.alliances[j] != '' && in_array(donnees.alliances[j], donnees.rangs[n].alliances))) {
						active = true;
					}
				}
				if(active) {
					if(donnees.rangs[n].mode == 1 && in_array(donnees.joueurs[donnees.pseudos[i]].alliance, donnees.rangs[n].regle)) {
						Appliquer_rang(donnees.pseudos[i], donnees.rangs[n].rang_affiche, donnees.rangs[n].couleur, donnees.rangs[n].ne_pas_flooder, donnees.rangs[n].role);
					}
				}
			}
			//Mode Regex
			for(var n=0; n<donnees.rangs.length; n++) {
				var active = false;
				for(var j=0; j<3; j++) {
					if(donnees.rangs[n].alliances == null || (donnees.alliances[j] != '' && in_array(donnees.alliances[j], donnees.rangs[n].alliances))) {
						active = true;
					}
				}
				if(active) {
					if(donnees.rangs[n].mode == 2 && rang.match(new RegExp(donnees.rangs[n].regle))) {
						var rep = new RegExp(donnees.rangs[n].regle).exec(rang);
						var resultat = donnees.rangs[n].rang_affiche;
						for(var t=1;t<rep.length; t++) {
							resultat = resultat.replace('$' + (t), rep[t]);
						}
						Appliquer_rang(donnees.pseudos[i], resultat, donnees.rangs[n].couleur, donnees.rangs[n].ne_pas_flooder, donnees.rangs[n].role);			
					}
				}
			}
			//Mode Mot contenu
			for(var n=0; n<donnees.rangs.length; n++) {
				var active = false;
				for(var j=0; j<3; j++) {
					if(donnees.rangs[n].alliances == null || (donnees.alliances[j] != '' && in_array(donnees.alliances[j], donnees.rangs[n].alliances))) {
						active = true;
					}
				}
				if(active) {
					if(donnees.rangs[n].mode == 3 && ~rang.indexOf(donnees.rangs[n].regle)) {
						Appliquer_rang(donnees.pseudos[i], donnees.rangs[n].rang_affiche, donnees.rangs[n].couleur, donnees.rangs[n].ne_pas_flooder, donnees.rangs[n].role);
					}
				}
			}
		}
	}
	
	function Appliquer_rang(pseudo, rang, couleur, NPF, role) {
		if(NPF == "1") {
			donnees.joueurs[pseudo].NPF = true;
		}
		if(!donnees.joueurs[pseudo].rang_fait) {
			donnees.joueurs[pseudo].rang_fait = true;
			donnees.rangs_actuels[pseudo] = { rang : rang, couleur : couleur };
		}
		donnees.joueurs[pseudo].role = role;
	}
	
	function Recuperation_chaine() {
		var roles = {
				grenier : new Array(),
				passeur : new Array(),
				chasseur : new Array(),
					};
		for(var pseudo in donnees.joueurs) {
			if(donnees.joueurs[pseudo].role && in_array(donnees.joueurs[pseudo].role, ['grenier', 'passeur', 'chasseur'])) {
				roles[donnees.joueurs[pseudo].role].push({pseudo : pseudo, rang : donnees.rangs_actuels[pseudo].rang, TDC : donnees.joueurs[pseudo].TDC });
			}
		}
		return roles;
	}
	
	function Creation_total_chasses() {
		var n = 0;
		for(var i=0; i<donnees.chasses.length; i++) {
			n += parseInt(donnees.chasses[i].valeur);
		}
		var total = document.createElement('div');
		total.innerHTML = 'Chasses en cours : ' + ze_Nombre(n) + 'cm²';
		total.className = 'ligne_total_chasses animated fadeIn';
		zone_2.appendChild(total);
	}

	function Creation_ligne_lancement() {
		var barre = document.createElement('div'),
			bouton_flood = document.createElement('a'),
			bouton_sonde = document.createElement('a');
		barre.setAttribute('class', 'barre_boutons  animated fadeIn');
		bouton_flood.setAttribute('class', 'bouton');
		bouton_flood.innerHTML = 'Calcul floods';
		bouton_sonde.onclick = function onclick(event) { Charger_Zzzelpfloods('sonde') };
		bouton_sonde.setAttribute('class', 'bouton');
		bouton_sonde.innerHTML = 'Calcul sondes';
		bouton_flood.onclick = function onclick(event) { Charger_Zzzelpfloods('classique') };
		barre.appendChild(bouton_flood);
		barre.appendChild(bouton_sonde);
		zone_2.appendChild(barre);
	}

	function Charger_Zzzelpfloods(mode) {
		var lien = document.createElement('a');
		lien.innerHTML = 'Retour au tableau';
		lien.setAttribute('class', 'bouton');
		lien.onclick = function onclick(event) {Retour_au_MF() };
		document.querySelector('.zone_lien').appendChild(lien);
		zone_2.style.display = 'none';
		donnees.coordonnees = new Array({});
		donnees.variations = new Array();
		donnees.coordonnees[0][donnees.pseudo] = donnees.joueurs[donnees.pseudo];
		for(var i=0; i<donnees.pseudos.length; i++) {
			if(document.querySelector('.tableau_MF').rows[i+1].cells[document.querySelector('.tableau_MF').rows[i+1].cells.length-1].querySelectorAll('input').length > 0 && document.querySelector('.tableau_MF').rows[i+1].cells[document.querySelector('.tableau_MF').rows[i+1].cells.length-1].querySelectorAll('input')[0].checked) {
				donnees.coordonnees[0][donnees.pseudos[i]] = donnees.joueurs[donnees.pseudos[i]];
			}
			else {
				donnees.coordonnees[0][donnees.pseudos[i]] = donnees.joueurs[donnees.pseudos[i]];
				donnees.coordonnees[0][donnees.pseudos[i]].active = 'NON';
			}
		}
		for(var i=0; i<donnees.variations_bis.length; i++) {
			donnees.variations.push([donnees.variations_bis[i]]);
		}
		donnees.theme = 'zzzelp';
		donnees.mode = mode;
		donnees.options = true;
		donnees.resume = true;
		donnees.lancement_zzzelp = true;
		document.body.scrollTop = 0;
		Generation_floods(document.querySelector('.zone_floods'), donnees);
	}
	
	function Retour_au_MF() {
		ze_Supprimer_element(document.querySelector('.zone_lien a'));
		ze_Supprimer_element(document.querySelector('.zone_zzzelpfloods'));
		zone_2.style.display = '';
	}

	function Actualisation_MF(donnees) {
		Nettoyage_tableau_principal();
		Actualisation_tableau_principal();
		Gestion_affichage_joueurs();
	}
	
	function Nettoyage_tableau_principal() {
		if(document.querySelector('.tableau_MF') && document.querySelector('.tableau_MF').rows.length > 1) {
			console.log('Nettoyage du Multiflood');
			var longueur = document.querySelector('.tableau_MF').rows.length;
			for(var i=1; i<longueur; i++) {
				ze_Supprimer_element(document.querySelector('.tableau_MF').rows[1]);
			}
		}
	}
		
	function Actualisation_tableau_principal() {
		donnees.TDCs = Calcul_TDC_variations();
		for(var i=0; i<donnees.pseudos.length; i++) {
			if(in_array(donnees.joueurs[donnees.pseudos[i]].alliance, ['LFM', 'FPMC', 'EB']) && in_array('FCGB', donnees.alliances) && !donnees.rangs_actuels[donnees.pseudos[i]]) {
				donnees.pseudos.splice(i, 1);
				i-=1;
			}
		}
		for(var i=0; i<donnees.pseudos.length; i++) {
			var ligne = document.querySelector('.tableau_MF').insertRow(i+1),
				grade = ligne.insertCell(0),
				pseudo = ligne.insertCell(1),
				alliance = ligne.insertCell(2),
				rang = ligne.insertCell(3),
				TDC_actuel = ligne.insertCell(4),
				distance = ligne.insertCell(5),
				arrivee = ligne.insertCell(6),
				TDC_arrive = ligne.insertCell(7),
				TDC_final = ligne.insertCell(8);
			if(donnees.mode_MF == 'chasse') {
				var chasses = ligne.insertCell(9);
			}
			else if(donnees.mode_MF == 'guerre') {
				var niveaux = ligne.insertCell(9),
					armee = ligne.insertCell(10),
					modif = ligne.insertCell(11);
			}

			ligne.onmouseenter = function onmouseenter(event) {
				var percent = 0.2,
					color = this.style.background;
				this.dataset.couleur = color;
				var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
				this.style.background = "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
			}

			ligne.onmouseleave = function onmouseleave(event) {
				this.style.background = this.dataset.couleur;
			}

			var	validation = ligne.insertCell(-1);
			ligne.dataset.pseudo = donnees.pseudos[i];
			Creation_cellule_grade(donnees.pseudos[i], i);
			Creation_cellule_pseudo(donnees.pseudos[i], i);
			Creation_cellule_alliance(donnees.pseudos[i], i);
			Creation_cellule_rang(donnees.pseudos[i], i);
			Creation_cellule_TDC(0, i, donnees.joueurs[donnees.pseudos[i]].TDC);
			Creation_cellule_distance(i, donnees.pseudos[i]);
			Creation_cellule_arrivee(i, donnees.pseudos[i]);
			Creation_cellule_TDC(1, i, donnees.TDCs[donnees.pseudos[i]][0]);
			Creation_cellule_TDC(2, i, donnees.TDCs[donnees.pseudos[i]][1]);
			if(donnees.mode_MF == 'chasse') {
				Creation_cellule_chasses(i, donnees.pseudos[i]);
			}
			else if(donnees.mode_MF == 'guerre') {
				Creation_menu_niveaux(i, donnees.pseudos[i]);
				Creation_menu_armee(i, donnees.pseudos[i]);
				Creation_cellule_edit_guerre(i, donnees.pseudos[i], donnees.joueurs[donnees.pseudos[i]].TDC);
			}
			Creation_cellule_validation(i, donnees.pseudos[i]);
			Creation_menu_variation(donnees.pseudos[i], donnees.TDCs[donnees.pseudos[i]], i);
		}
	}

	function Creation_cellule_grade(pseudo, i) {
		if(donnees.joueurs[pseudo].chef == 'true') {
			var image = document.createElement('img');
			image.src = lieu + 'Images/chef.png';
			image.title = 'Chef de l\'une de vos alliances';
			document.querySelector('.tableau_MF').rows[i+1].cells[0].appendChild(image);
		}
	}

	function Creation_cellule_pseudo(pseudo, i) {
		var lien = document.createElement('a');
		lien.href = 'http://' + donnees.serveur + '.fourmizzz.fr/Membre.php?Pseudo=' + pseudo;
		lien.innerHTML = (pseudo.length > 17) ? pseudo.substr(0,14) + '...' : pseudo;
		lien.setAttribute('target', '_BLANK');
		document.querySelector('.tableau_MF').rows[i+1].cells[1].appendChild(lien);
	}

	function Creation_cellule_alliance(pseudo, i) {
		var lien = document.createElement('a');
		lien.href = 'http://' + donnees.serveur + '.fourmizzz.fr/classementAlliance.php?alliance=' + donnees.joueurs[pseudo].alliance;
		lien.innerHTML = donnees.joueurs[pseudo].alliance;
		lien.setAttribute('target', '_BLANK');
		document.querySelector('.tableau_MF').rows[i+1].cells[2].appendChild(lien);
	}

	function Creation_cellule_rang(pseudo, i) {
		if(pseudo == donnees.pseudo)  {
			document.querySelector('.tableau_MF').rows[i+1].dataset.chargeur = 'true';
		}
		if(donnees.rangs_actuels[pseudo]) {
			document.querySelector('.tableau_MF').rows[i+1].cells[3].innerHTML = donnees.rangs_actuels[pseudo].rang;
			if(pseudo != donnees.pseudo)  {
				document.querySelector('.tableau_MF').rows[i+1].style.background = '#' + donnees.rangs_actuels[pseudo].couleur;	
			}
		}
	}

	function Creation_cellule_TDC(n, i, TDC) {
		var TDC_complet = document.createElement('span'),
			TDC_raccourci = document.createElement('span'),
			variation = document.createElement('span');
		TDC_complet.innerHTML = ze_Nombre(TDC);
		TDC_complet.setAttribute('class', 'TDC_complet');
		TDC_raccourci.innerHTML = ze_Nombre_raccourci(TDC, 3);
		TDC_raccourci.setAttribute('class', 'TDC_raccourci');
		variation.setAttribute('class', 'variation_TDC');
		document.querySelector('.tableau_MF').rows[i+1].cells[((n>0) ? (6+n) : 4)].appendChild(TDC_complet);
		document.querySelector('.tableau_MF').rows[i+1].cells[((n>0) ? (6+n) : 4)].appendChild(TDC_raccourci);
		document.querySelector('.tableau_MF').rows[i+1].cells[((n>0) ? (6+n) : 4)].appendChild(variation);
		if(n ==  1) {
			var modification = document.createElement('input');
			modification.type = 'text';
			modification.value = ze_Nombre(TDC);
			modification.setAttribute('class', 'input_tableau modification_TDC');
			modification.setAttribute('style', 'display:none');
			modification.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this); return false}
			document.querySelector('.tableau_MF').rows[i+1].cells[((n>0) ? (6+n) : 4)].appendChild(modification);
		}
	}

	function Creation_cellule_distance(i, joueur) {
		var distance = parseInt(donnees.joueurs[joueur].distance);
		document.querySelector('.tableau_MF').rows[i+1].cells[5].innerHTML = distance
		document.querySelector('.tableau_MF').rows[i+1].cells[5].dataset.distance = (distance < 100) ? 'proche' : ((distance < 300) ? 'moyen' : 'loin');
	}

	function Creation_cellule_arrivee(i, joueur) {
		var arrivee = ze_Calcul_temps_trajet(donnees.joueurs[joueur].distance, donnees.vitesse_attaque);
		donnees.joueurs[joueur].arrivee = time() + arrivee;
		document.querySelector('.tableau_MF').rows[i+1].cells[6].innerHTML = ze_Date_MF(arrivee);
	}

	function Creation_cellule_chasses(k, joueur) {
		for(var i=0; i<donnees.chasses.length; i++) {
			if(donnees.chasses[i].pseudo == joueur) {
				var chasse_complet = document.createElement('span'),
					chasse_raccourci = document.createElement('span');
				chasse_complet.setAttribute('class', 'chasse_complet');
				chasse_raccourci.setAttribute('class', 'chasse_raccourci');
				chasse_complet.innerHTML = ze_Nombre(parseInt(donnees.chasses[i].valeur)) + ' (' + ze_Generation_date_v1(parseInt(donnees.chasses[i].date),true,false,false) + ')';
				chasse_raccourci.innerHTML = ze_Nombre_raccourci(parseInt(donnees.chasses[i].valeur), 3) + ' (' + ze_Generation_date_v1(parseInt(donnees.chasses[i].date),true,false,false) + ')';
				document.querySelector('.tableau_MF').rows[k+1].cells[9].appendChild(chasse_complet);
				document.querySelector('.tableau_MF').rows[k+1].cells[9].appendChild(chasse_raccourci);
				break;
			}
		}
	}

	function Creation_menu_niveaux(i, joueur) {
		var	niveaux = new Array(
						{ raccourci : 'TDP', valeur : donnees.joueurs[joueur].donnees_guerre['tdp'] },
						{ raccourci : 'Armes', valeur : donnees.joueurs[joueur].donnees_guerre['armes'] },
						{ raccourci : 'Bouclier', valeur : donnees.joueurs[joueur].donnees_guerre['bouclier'] },
						{ raccourci : 'Dôme', valeur : donnees.joueurs[joueur].donnees_guerre['dome'] },
						{ raccourci : 'Loge', valeur : donnees.joueurs[joueur].donnees_guerre['loge'] },
						{ raccourci : 'VA', valeur : donnees.joueurs[joueur].donnees_guerre['vitesse_attaque'] }
							),
			entete = document.createElement('div'),
			zone_niveaux = document.createElement('div'),
			img = document.createElement('img');

		entete.setAttribute('class', 'entete_liste_unites');
		img.src = 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png';
		document.querySelector('.tableau_MF').rows[i+1].cells[9].setAttribute('class', 'menu_unites');
		zone_niveaux.setAttribute('class', 'liste_unites');
		for(var j=0; j<niveaux.length; j++) {
			var unite = document.createElement('div'),
				nombre = document.createElement('span'),
				tag = document.createElement('span');
			unite.setAttribute('class', 'ligne_unite');
			nombre.innerHTML = niveaux[j].valeur;
			tag.innerHTML = '<strong>' + niveaux[j].raccourci + '</strong>';
			zone_niveaux.appendChild(unite);
			unite.appendChild(nombre);
			unite.appendChild(tag);
		}
		document.querySelector('.tableau_MF').rows[i+1].cells[9].appendChild(entete);
		entete.appendChild(img);
		document.querySelector('.tableau_MF').rows[i+1].cells[9].appendChild(zone_niveaux);
	}

	function Creation_menu_armee(i, joueur) {
		var armee = new Array();
		for(var k=0; k<14; k++) {
			armee.push(parseInt(donnees.joueurs[joueur].donnees_guerre[unites.TAGs[k]]));
		}
		var stats = new Array(
						{ raccourci : 'att', valeur : ze_Calcul_attaque_AB(armee, parseInt(donnees.joueurs[joueur].donnees_guerre.armes)) },
						{ raccourci : 'def', valeur : ze_Calcul_defense_AB(armee, parseInt(donnees.joueurs[joueur].donnees_guerre.armes)) },
						{ raccourci : 'vie TDC', valeur : ze_Calcul_vie_AB(armee, 0, 0, parseInt(donnees.joueurs[joueur].donnees_guerre.bouclier)) },
						{ raccourci : 'vie dôme', valeur : ze_Calcul_vie_AB(armee, 1, parseInt(donnees.joueurs[joueur].donnees_guerre.dome), parseInt(donnees.joueurs[joueur].donnees_guerre.bouclier)) },
						{ raccourci : 'vie loge', valeur : ze_Calcul_vie_AB(armee, 2, parseInt(donnees.joueurs[joueur].donnees_guerre.loge), parseInt(donnees.joueurs[joueur].donnees_guerre.bouclier)) }
							),
			entete = document.createElement('div'),
			nombre_complet = document.createElement('span'),
			nombre_raccourci = document.createElement('span'),			
			zone_unites = document.createElement('div'),
			img = document.createElement('img');
		nombre_complet.className = 'armee_complet';
		nombre_raccourci.className = 'armee_raccourci';	
		nombre_complet.innerHTML = ze_Nombre(ze_Calcul_capa_flood(armee));
		nombre_raccourci.innerHTML = ze_Nombre_raccourci(ze_Calcul_capa_flood(armee), 3);	
		entete.appendChild(nombre_complet);
		entete.appendChild(nombre_raccourci);
		entete.setAttribute('class', 'entete_liste_unites');
		img.src = url_zzzelp + '/Images/fourmis.png';
		document.querySelector('.tableau_MF').rows[i+1].cells[10].setAttribute('class', 'menu_unites');
		zone_unites.setAttribute('class', 'liste_unites');
		for(var j=0; j<stats.length; j++) {
			var unite = document.createElement('div'),
				nombre_complet = document.createElement('span'),
				nombre_raccourci = document.createElement('span'),
				tag = document.createElement('span');
			unite.setAttribute('class', 'ligne_unite');
			nombre_complet.className = 'armee_complet';
			nombre_raccourci.className = 'armee_raccourci';
			nombre_complet.innerHTML = ze_Nombre(stats[j].valeur);
			nombre_raccourci.innerHTML = ze_Nombre_raccourci(stats[j].valeur, 3);
			tag.innerHTML = '<strong>' + stats[j].raccourci + '</strong>';
			zone_unites.appendChild(unite);
			unite.appendChild(nombre_complet);
			unite.appendChild(nombre_raccourci);
			unite.appendChild(tag);
		}
		for(var k=0; k<14; k++) {
			var unite = document.createElement('div'),
				nombre_complet = document.createElement('span'),
				nombre_raccourci = document.createElement('span'),
				tag = document.createElement('span');
			unite.setAttribute('class', 'ligne_unite');
			nombre_complet.className = 'armee_complet';
			nombre_raccourci.className = 'armee_raccourci';
			nombre_complet.innerHTML = ze_Nombre(armee[k]);
			nombre_raccourci.innerHTML = ze_Nombre_raccourci(armee[k], 3);
			tag.innerHTML = unites.TAGs[k];
			zone_unites.appendChild(unite);
			unite.appendChild(nombre_complet);
			unite.appendChild(nombre_raccourci);
			unite.appendChild(tag);
		}
		document.querySelector('.tableau_MF').rows[i+1].cells[10].appendChild(entete);
		entete.appendChild(img);
		document.querySelector('.tableau_MF').rows[i+1].cells[10].appendChild(zone_unites);
	}

	function Creation_cellule_edit_guerre(i, joueur, TDC) {
		var image = document.createElement('img');
		image.src = lieu + 'Images/edit.png';
		image.title = 'Modifier les informations';
		image.setAttribute('style', 'cursor:pointer');
		image.dataset.TDC = TDC;
		image.onclick = function onclick(event) {ze_Modal_guerre(this.parentNode.parentNode.dataset.pseudo, this.dataset.TDC)}
		document.querySelector('.tableau_MF').rows[i+1].cells[11].appendChild(image);		
	}

	function Creation_cellule_validation(i, pseudo) {
		if(!donnees.joueurs[pseudo].NPF && pseudo != donnees.pseudo && donnees.joueurs[donnees.pseudo].TDC <= 2*donnees.joueurs[pseudo].TDC && donnees.joueurs[pseudo].TDC <= donnees.joueurs[donnees.pseudo].TDC*3) {
			var check = document.createElement('input');
			check.type = 'checkbox';
			document.querySelector('.tableau_MF').rows[i+1].cells[document.querySelector('.tableau_MF').rows[i+1].cells.length-1].appendChild(check);
		}
	}

	function Creation_menu_variation(pseudo, TDCs, k) {
		console.log(donnees.joueurs[pseudo])
		var ex_TDC = donnees.joueurs[pseudo].TDC,
			debut = 0;
		for(n=0; n<2; n++) {
			if(TDCs[n] != ex_TDC) {
				fait = true;
				var image = document.createElement('img'),
					menu = document.createElement('div'),
					total = 0;
				image.src = (TDCs[n] > donnees.joueurs[pseudo].TDC) ? lieu + 'Images/Fleche_haut.png' : lieu + 'Images/Fleche_bas.png';
				menu.setAttribute('class', 'menu_variations');
				document.querySelector('.tableau_MF').rows[k+1].cells[7+n].className = 'TDC_varie';
				document.querySelector('.tableau_MF').rows[k+1].cells[7+n].querySelector('.variation_TDC').appendChild(image);
				document.querySelector('.tableau_MF').rows[k+1].cells[7+n].querySelector('.variation_TDC').appendChild(menu);
				for(var i=debut; i<donnees.variations_bis.length; i++) {
					if(n == 0 && donnees.variations_bis[i].date >= donnees.joueurs[pseudo].arrivee) {
						debut = i;
						break;
					}
					if(donnees.variations_bis[i].attaquant == pseudo || donnees.variations_bis[i].cible == pseudo) {
						var variation = document.createElement('div'),
							joueur = document.createElement('span'),
							TDC = document.createElement('span'),
							heure = document.createElement('span'),
							lien = document.createElement('a'),
							date = ze_Generation_date_precise(donnees.variations_bis[i].date);
						variation.setAttribute('class', 'ligne_variation' + (donnees.variations_bis[i].possible ? '' : ' flood_annule'));

						var joueur_flood = ((donnees.variations_bis[i].attaquant == pseudo) ? donnees.variations_bis[i].cible : donnees.variations_bis[i].attaquant);
						lien.innerHTML = (joueur_flood.length > 10) ? joueur_flood.substr(0,10) : joueur_flood;
						lien.href = 'http://' + donnees.serveur + '.fourmizzz.fr/Membre.php?pseudo=' + ((donnees.variations_bis[i].attaquant == pseudo) ? donnees.variations_bis[i].cible : donnees.variations_bis[i].attaquant)
						lien.setAttribute('target', '_BLANK');
						menu.appendChild(variation);
						variation.appendChild(joueur);
						joueur.appendChild(lien);
						TDC.innerHTML = ((donnees.variations_bis[i].attaquant == pseudo) ? '+' : '-') + ze_Nombre_raccourci(parseInt(donnees.variations_bis[i].valeur), 3);
						variation.appendChild(TDC);
						heure.innerHTML = date.substr(0, date.length - 3);
						variation.appendChild(heure);
						joueur.setAttribute('class', 'span_1');
						TDC.setAttribute('class', 'span_2');
						heure.setAttribute('class', 'span_3');
						total += ((donnees.variations_bis[i].attaquant == pseudo) ? 1 : -1) * donnees.variations_bis[i].valeur;
					}
				}
				var variation = document.createElement('div'),
					joueur = document.createElement('span'),
					TDC = document.createElement('span'),
					heure = document.createElement('span'),
					gras = document.createElement('a');
				variation.setAttribute('class', 'ligne_variation');
				gras.innerHTML = 'TOTAL :';
				menu.appendChild(variation);
				variation.appendChild(joueur);
				joueur.appendChild(gras);
				TDC.innerHTML = (total > 0 ? '+' : '-') + ze_Nombre_raccourci(Math.abs(total), 3);
				variation.appendChild(TDC);
				heure.innerHTML = '';
				variation.appendChild(heure);
				joueur.setAttribute('class', 'span_1');
				TDC.setAttribute('class', 'span_2');
				heure.setAttribute('class', 'span_3');
			}
			ex_TDC = TDCs[n];	
		}
	}

	function Preparation_donnees() {
		donnees.modifications = new Array();
		for(var i=0; i<donnees.pseudos.length; i++) {
			if(donnees.joueurs[donnees.pseudos[i]].alliance.length == 0) {
				donnees.joueurs[donnees.pseudos[i]].alliance = 'SA';
			}
			donnees.joueurs[donnees.pseudos[i]].x = parseInt(donnees.joueurs[donnees.pseudos[i]].x);
			donnees.joueurs[donnees.pseudos[i]].y = parseInt(donnees.joueurs[donnees.pseudos[i]].y);
			donnees.joueurs[donnees.pseudos[i]].TDC = parseInt(donnees.joueurs[donnees.pseudos[i]].TDC);
			donnees.joueurs[donnees.pseudos[i]].distance = ze_Calcul_distance(donnees.joueurs[donnees.pseudos[i]].x, donnees.joueurs[donnees.pseudos[i]].y, donnees.joueurs[donnees.pseudo].x, donnees.joueurs[donnees.pseudo].y);
		}
	}

	function Affichage_menu_options(lignes) {
		var display = lignes[1].style.display;
		for(var i=1; i<lignes.length; i++) {
			lignes[i].style.display = (display == 'none') ? '' : 'none';
		}
	}

	function Calcul_TDC_variations() {
		var TDCs = {};
		for(var i=0; i<donnees.pseudos.length; i++) {
			TDCs[donnees.pseudos[i]] = new Array(donnees.joueurs[donnees.pseudos[i]].TDC, donnees.joueurs[donnees.pseudos[i]].TDC);
		}
		if(donnees.variations_bis) {
			for(var i=0; i<donnees.variations_bis.length; i++) {
				donnees.variations_bis[i].valeur = parseInt(donnees.variations_bis[i].valeur);
				donnees.variations_bis[i].possible = true;
				if(donnees.pseudos.indexOf(donnees.variations_bis[i].attaquant) == -1 || donnees.pseudos.indexOf(donnees.variations_bis[i].cible) == -1) {
					if(donnees.pseudos.indexOf(donnees.variations_bis[i].attaquant) == -1) {
						var valeur = ze_Majoration(donnees.variations_bis[i].valeur, TDCs[donnees.variations_bis[i].cible]) ;
					}
					else if(donnees.pseudos.indexOf(donnees.variations_bis[i].cible) == -1) {
						var valeur = ze_Majoration(donnees.variations_bis[i].valeur, TDCs[donnees.variations_bis[i].attaquant])
					}
					var	arrivee_1 = time(),
						arrivee_2 = time();
				}
				else {
					var	valeur = Flood_en_cours_possible(donnees.variations_bis[i], TDCs),
						arrivee_1 = time() + ze_Calcul_temps_trajet(donnees.joueurs[donnees.variations_bis[i].attaquant].distance, donnees.vitesse_attaque),
						arrivee_2 = time() + ze_Calcul_temps_trajet(donnees.joueurs[donnees.variations_bis[i].cible].distance, donnees.vitesse_attaque);
					donnees.variations_bis[i].possible = (valeur == 0) ? false : true;
					if(donnees.variations_bis[i].date <= arrivee_1) {
						TDCs[donnees.variations_bis[i].attaquant][0] += valeur;
					}
					if(donnees.variations_bis[i].date <= arrivee_2) {
						TDCs[donnees.variations_bis[i].cible][0] -= valeur;
					}
					TDCs[donnees.variations_bis[i].attaquant][1] += valeur;
					TDCs[donnees.variations_bis[i].cible][1] -= valeur;
				}
			}
		}
		return TDCs;
	}

		
	function Flood_en_cours_possible(flood, TDCs) {
		if(donnees.pseudos.indexOf(flood.attaquant) == -1) {
			return parseInt(ze_Majoration(flood.valeur, TDCs[flood.cible][1]*0.2));
		}
		else if(donnees.pseudos.indexOf(flood.cible) == -1) {
			return parseInt(ze_Majoration(flood.valeur, TDCs[flood.attaquant][1]*0.2));
		}
		else if(TDCs[flood.attaquant][1] <= 2*TDCs[flood.cible][1] && TDCs[flood.cible][1] <= TDCs[flood.attaquant][1]*3) {
			return parseInt(ze_Majoration(flood.valeur, TDCs[flood.cible][1]*0.2));
		}
		else {
			return 0;
		}
	}

	function Modifier_parametre(option) {
		if(option == 'affichage_hdp') {
			Gestion_affichage_joueurs();
		}
		else if(option == 'capa_flood') {
			donnees.nombre_unites = parseInt(document.querySelector('#capa_flood').value.replace(/ /g, ''));
		}
		else if(option == 'vitesse_attaque') {
			donnees.vitesse_attaque = parseInt(document.querySelector('#vitesse_attaque').value.replace(/ /g, ''));
			Actualisation_MF();
		}
	}

	function Gestion_affichage_joueurs() {
		var lignes = document.querySelector('.tableau_MF').rows;
		for(var i=1; i<lignes.length; i++) {
			var chargeur = (lignes[i].dataset.pseudo == donnees.pseudo),
				alliance_visible = document.querySelector('.tableau_alliances_MF tr[data-alliance*="' + donnees.joueurs[lignes[i].dataset.pseudo].alliance + '"]').cells[3].querySelector('input').checked,
				hdp_visible = document.querySelector('#affichage_hdp').checked,
				a_porte = (parseInt(donnees.joueurs[donnees.pseudo].TDC) <= 2*parseInt(donnees.joueurs[lignes[i].dataset.pseudo].TDC) && parseInt(donnees.joueurs[lignes[i].dataset.pseudo].TDC) <= parseInt(donnees.joueurs[donnees.pseudo].TDC)*3);
			if(chargeur || ((hdp_visible || (!hdp_visible && a_porte)) && alliance_visible)) {	
				lignes[i].style.display = '';
			}
			else {
				lignes[i].style.display = 'none';
			}
		}
		
	}

	function Fonction_trie(a,b) {
		if(donnees.trie.mode == 'TDC_2') {
			var val_a = donnees.TDCs[a][0],	
				val_b = donnees.TDCs[b][0];
		}
		else if(donnees.trie.mode == 'TDC_3') {
			var val_a = donnees.TDCs[a][1],	
				val_b = donnees.TDCs[b][1];
		}
		else if(donnees.trie.mode == 'rang') {
			var val_a = donnees.organisation[a] ? donnees.organisation[a].numero : 10000,
				val_b = donnees.organisation[b] ? donnees.organisation[b].numero : 10001;
		}
		else {
			var val_a = (donnees.trie.mode == 'pseudo') ? a : donnees.joueurs[a][donnees.trie.mode],
				val_b = (donnees.trie.mode == 'pseudo') ? b : donnees.joueurs[b][donnees.trie.mode];
		}
		if(val_a < val_b) {
			return (donnees.trie.croissant ? -1 : 1);
		}
		else if(val_a > val_b) {
			return (donnees.trie.croissant ? 1 : -1);
		}
		if(donnees.joueurs[a].TDC < donnees.joueurs[b].TDC) {
			return 1;
		}
		else if(donnees.joueurs[a].TDC > donnees.joueurs[b].TDC) {
			return -1;
		}
		return 0;
	}

	function ze_Date_MF(secondes) {
		var date = new Date((time() + secondes)*1000);
		return ((date.getHours() >= 10) ? date.getHours()  : ("0" + date.getHours())) + ':' + ((date.getMinutes() >= 10) ? date.getMinutes()  : ("0" + date.getMinutes()))
	}
}