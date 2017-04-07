
function Initialisation_MF(zone_2, donnees, lieu) {
	if(donnees.mode_MF != 'chasse') {
		Creation_tableau_RC();
		Affichage_menu_options(document.querySelector('.tableau_options_RC').rows);
	}

	function Creation_tableau_RC() {
		var valeur, ligne, label, input, cell, bouton;

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

		ligne = tableau.insertRow(0);
		cell = document.createElement('th');
		cell.setAttribute('colspan', '2');
		cell.innerHTML = 'OPTIONS COMBATS';
		cell.onclick = function onclick() {
			Affichage_menu_options(document.querySelector('.tableau_options_RC').rows);
		};
		ligne.appendChild(cell);

		for(var i=0; i<options.length; i++) {
			ligne = tableau.insertRow(-1);
			label = ligne.insertCell(0);
			valeur = ligne.insertCell(1);
			input = document.createElement('input');

			label.innerHTML = options[i].nom + ' :';
			input.type = options[i].type;
			input.id = options[i].id + '_RC';
			input.className = options[i].class + ' input_haut';
			valeur.appendChild(input);
		}

		ligne = tableau.insertRow(-1);
		entete = ligne.insertCell(0);
		valeur = ligne.insertCell(1);
		select = document.createElement('select');
		for(i=0; i<tries.length; i++) {
			var option = document.createElement('option');
			option.innerHTML = tries[i].nom;
			option.value = tries[i].valeur;
			select.appendChild(option);
		}
		select.id = 'ordre_trie_RC';
		entete.innerHTML = 'Ordre des combats :';
		valeur.appendChild(select);

		ligne = tableau.insertRow(-1);
		cell = ligne.insertCell(0);
		bouton = document.createElement('a');
		cell.appendChild(bouton);
		cell.setAttribute('colspan', '2');
		bouton.innerHTML = 'Actualiser';
		bouton.className = 'bouton';
		bouton.onclick = function onclick(event) {
			BDD_Combats(zone_RC);
		};

		zone_RC.appendChild(tableau);
		zone_2.appendChild(zone_RC);
		autocompletion(document.querySelector('#alliances_RC'), { mode : 'alliance', serveur : ze_Analyser_URL('serveur'), multiple : true });
		autocompletion(document.querySelector('#joueurs_RC'), { mode : 'joueur', serveur : ze_Analyser_URL('serveur'), multiple : true });
		document.querySelector('#HOF_min_RC').onkeyup = function onkeyup(event) {
			ze_Ajout_espaces(this);
		};
		document.querySelector('#HOF_max_RC').onkeyup = function onkeyup(event) {
			ze_Ajout_espaces(this);
		};
		rome(document.querySelector('#debut_RC'), { initialValue: Generation_date_rome(7) });
		rome(document.querySelector('#fin_RC'), { initialValue: Generation_date_rome(0) });

		document.querySelector('#alliances_RC').value = 'FCGB';

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
			for(var i=0; i<combats.length; i++) {
				var data = combats[i],
					message = document.createElement('div'),
					entete_message = document.createElement('div'),
					contenu_message = document.createElement('div'),
					date_message = document.createElement('span'),
					coordonnees_message = document.createElement('span');
				message.className = 'post_guerre';
				entete_message.className = 'entete_message';
				message.appendChild(entete_message);

				contenu_message.className = 'contenu_message';
				message.appendChild(contenu_message);
				contenu_message.setAttribute('style', 'display:none');
				entete_message.setAttribute('style', 'cursor:pointer');
				entete_message.onclick = function onclick(event) {
					this.nextSibling.style.display = (this.nextSibling.style.display == 'none') ? '' : 'none';
				};
				var analyse = JSON.parse(data.analyse),
					RC = data.RC.replace(/"Membre.php\?Pseudo=(.*?)"/g, 'http://' + ze_Analyser_URL('serveur') + '.fourmizzz.fr/Membre.php?Pseudo=$1'),
					zone_analyse = Generation_zone_analyse(data);
				
				var corps_message = document.createElement('div');
				corps_message.innerHTML = RC;
					contenu_message.appendChild(corps_message);
					contenu_message.appendChild(ze_Creer_zone_analyse(RC.split('<br>'), analyse, false, true));
					message.dataset.type_data = 'combat_' + ((data.position == 'defenseur') ? 'def' : 'att');

				var titre = (analyse.rebellion ? 'Rebellion' : ((data.mode == 'flood') ? 'Flood' : 'RC')) + ' ';
				titre += 'de ' + ((data.attaquant !== '') ? data.attaquant : 'inconnu') + ' ';
				titre += (analyse.rebellion ? 'chez ' : 'sur ') + ((data.defenseur !== '') ? data.defenseur : 'inconnu');
							
				if(!analyse.rebellion) {
					titre += ' - ' + ['TDC', 'Dôme', 'Loge'][analyse.lieu];
				}
				coordonnees_message.innerHTML = titre;
				date_message.innerHTML = ze_Generation_date_v1(data.date_RC, true);
				entete_message.appendChild(coordonnees_message);
				entete_message.appendChild(date_message);
				zone.appendChild(message);
			}
		};
		xdr.open("GET", ZzzelpScript.url + '/guerre_data?mode=bddcombats&serveur=' + donnees.server + '&debut=' + ze_Timestamp_input(document.querySelector('#debut_RC').value) + '&fin=' + ze_Timestamp_input(document.querySelector('#fin_RC').value) + '&alliances=' + document.querySelector('#alliances_RC').value + '&joueurs=' + document.querySelector('#joueurs_RC').value + '&HOF_mini=' + document.querySelector('#HOF_min_RC').value + '&HOF_maxi=' + document.querySelector('#HOF_max_RC').value + '&ordre=' + document.querySelector('#ordre_trie_RC').value);
		xdr.send();		
	}

	function Creation_menu_niveaux(i, joueur) {
		var	niveaux = new Array(
				{ raccourci : 'TDP', valeur : this.players[joueur].donnees_guerre.tdp },
				{ raccourci : 'Armes', valeur : this.players[joueur].donnees_guerre.armes },
				{ raccourci : 'Bouclier', valeur : this.players[joueur].donnees_guerre.bouclier },
				{ raccourci : 'Dôme', valeur : this.players[joueur].donnees_guerre.dome },
				{ raccourci : 'Loge', valeur : this.players[joueur].donnees_guerre.loge },
				{ raccourci : 'VA', valeur : this.players[joueur].donnees_guerre.vitesse_attaque }
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
		var armee_TDC = new ZzzelpArmy();
		for(var k=0; k<14; k++) {
			armee_TDC.setUnite(k, parseInt(this.players[joueur].donnees_guerre[ZzzelpArmy.TAGs[k]]));
		}
		armee_TDC.setArmes(parseInt(this.players[joueur].donnees_guerre.armes));
		armee_TDC.setBouclier(parseInt(this.players[joueur].donnees_guerre.bouclier));

		var armee_dome = armee_TDC.copy();
		armee_dome.setLieu(1);
		armee_dome.setNiveauLieu(parseInt(this.players[joueur].donnees_guerre.dome));
		var armee_loge = armee_TDC.copy();
		armee_loge.setLieu(2);
		armee_loge.setNiveauLieu(parseInt(this.players[joueur].donnees_guerre.loge));
		var stats = new Array(
				{ raccourci : 'att', valeur : armee_TDC.getAttaqueAB() },
				{ raccourci : 'def', valeur : armee_TDC.getDefenseAB() },
				{ raccourci : 'vie TDC', valeur : armee_TDC.getVieAB() },
				{ raccourci : 'vie dôme', valeur : armee_dome.getVieAB() },
				{ raccourci : 'vie loge', valeur : armee_loge.getVieAB() }
			),
			entete = document.createElement('div'),
			nombre_complet = document.createElement('span'),
			nombre_raccourci = document.createElement('span'),			
			zone_unites = document.createElement('div'),
			img = document.createElement('img');
		nombre_complet.className = 'armee_complet';
		nombre_raccourci.className = 'armee_raccourci';	
		nombre_complet.innerHTML = ze_Nombre(armee_TDC.getCapaFlood());
		nombre_raccourci.innerHTML = ze_Nombre_raccourci(armee_TDC.getCapaFlood(), 3);	
		entete.appendChild(nombre_complet);
		entete.appendChild(nombre_raccourci);
		entete.setAttribute('class', 'entete_liste_unites');
		img.src = ZzzelpScript.url + '/Images/fourmis.png';
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
			nombre_complet.innerHTML = ze_Nombre(armee_TDC.getUnite(k));
			nombre_raccourci.innerHTML = ze_Nombre_raccourci(armee_TDC.getUnite(k), 3);
			tag.innerHTML = ZzzelpArmy.TAGs[k];
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
		image.onclick = function onclick(event) {
			new ZzzelpScriptModalGuerre(this.parentNode.parentNode.dataset.pseudo, this.dataset.TDC);
		}
		document.querySelector('.tableau_MF').rows[i+1].cells[11].appendChild(image);		
	}
}