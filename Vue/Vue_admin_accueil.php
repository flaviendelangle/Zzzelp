<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<?=HTMLGenerique::get_header() ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp(); ?>
			</div>
			<div class="main">
				<div class="grid grid-pad grid_separee">
					<div class="col-1-4">
						<div class="ancre" id="ancre_principale" onclick="Initialisation_admin('validations')">
							Validations
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" id="ancre_imports_manuels" onclick="Initialisation_admin('utilisateurs')">
							Utilisateurs
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" id="ancre_sondes" onclick="Initialisation_admin('nettoyage')">
							Nettoyage
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" id="ancre_zzzelpscript">
							News
						</div>
					</div>
				</div>
				<div class="grid grid-pad" id="zone_admin">
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/ZzzelpScript/Analyseurs.js"></script>
		<script src="/ZzzelpScript/Armee.js"></script>
		<script>

Initialisation_admin(ze_Analyser_URL('mode'));

function Initialisation_admin(mode) {
	window.history.pushState('', '', url_zzzelp + 'admin/accueil?mode=' + mode);
	var xdr = ze_getXDomainRequest(),
		modes = {
			validations : { fonction : Onglet_validations, ajax : true },
			utilisateurs : { fonction : Onglet_utilisateurs, ajax : false },
			nettoyage : { fonction : Onglet_nettoyage, ajax : false },
			releves : { fonction : Onglet_releves, ajax : true }
				};
	if(modes[mode].ajax) {
		xdr.onload = function() {
			document.querySelector('#zone_admin').innerHTML = '';
			modes[mode].fonction(JSON.parse(xdr.responseText));
		};
		xdr.open("GET", url_site + "admin/data?mode=" + mode,true);
		xdr.send(null);	
	}
	else {
		document.querySelector('#zone_admin').innerHTML = '';
		modes[mode].fonction();
	}
}

function Onglet_validations(valeurs) {
	Dernieres_validations(valeurs.dernieres_validations);
	A_valider(valeurs.a_valider);
}

function Onglet_utilisateurs(valeurs) {
	var zone = Creer_zone(2, 'zone_largeur_courte'),
		ligne_pseudo_zzzelp = document.createElement('div'),
		ligne_resultats_zzzelp = document.createElement('div'),
		ligne_separateur = document.createElement('div'),
		ligne_pseudo_fourmizzz = document.createElement('div'),
		ligne_resultats_fourmizzz = document.createElement('div'),
		ligne_serveur = document.createElement('div'),
		ligne_validation = document.createElement('div'),
		input_zzzelp = document.createElement('input'),
		input_fourmizzz = document.createElement('input'),
		select_serveur = document.createElement('select'),
		span_fourmizzz = document.createElement('span'),
		span_zzzelp = document.createElement('span'),
		span_serveur = document.createElement('span'),
		bouton = document.createElement('a');
	span_zzzelp.innerHTML = 'Pseudo Zzzelp : ';
	span_fourmizzz.innerHTML = 'Pseudo Fourmizzz : ';
	ligne_separateur.innerHTML = '<center><b>ou</b></center>';
	input_zzzelp.setAttribute('autocomplete', 'off');
	input_zzzelp.className = 'input_large';
	input_zzzelp.type = 'text';
	input_zzzelp.id = 'pseudo_zzzelp';
	input_zzzelp.onkeyup = function onkeyup(event) {Autocomplete_admin('zzzelp', this.value, null)}
	input_fourmizzz.setAttribute('autocomplete', 'off');
	input_fourmizzz.className = 'input_large';
	input_fourmizzz.type = 'text';
	input_fourmizzz.id = 'pseudo_fourmizzz';
	input_fourmizzz.onkeyup = function onkeyup(event) {Autocomplete_admin('fourmizzz', this.value, document.querySelector('#serveur').value)}

	ligne_resultats_zzzelp.className = 'recherche_ajax';
	ligne_resultats_zzzelp.setAttribute('style', 'z-index:-1');
	ligne_resultats_zzzelp.id = 'resultats_pseudos_zzzelp';
	ligne_resultats_fourmizzz.className = 'recherche_ajax';
	ligne_resultats_fourmizzz.setAttribute('style', 'z-index:-1');
	ligne_resultats_fourmizzz.id = 'resultats_pseudos_fourmizzz';

	span_serveur.innerHTML = 'Serveur : ';
	select_serveur.id = 'serveur';
	for(var serveur in ze_serveurs_full) {
		var option = document.createElement('option');
		option.value = serveur;
		option.innerHTML = ze_serveurs_full[serveur];
		select_serveur.appendChild(option);
	}
 	bouton.innerHTML = 'Accéder au profil';
 	bouton.className = 'bouton';
 	bouton.onclick = function onclick(event) {Afficher_profil_joueur()}

 	ligne_pseudo_zzzelp.className = 'ligne_cadre_structure';
 	ligne_separateur.className = 'ligne_cadre_structure';
 	ligne_pseudo_fourmizzz.className = 'ligne_cadre_structure';
 	ligne_serveur.className = 'ligne_cadre_structure';
 	ligne_validation.className = 'ligne_cadre_structure';

	ligne_pseudo_zzzelp.appendChild(span_zzzelp);
	ligne_pseudo_zzzelp.appendChild(input_zzzelp);
	ligne_pseudo_fourmizzz.appendChild(span_fourmizzz);
	ligne_pseudo_fourmizzz.appendChild(input_fourmizzz);
	ligne_serveur.appendChild(span_serveur);
	ligne_serveur.appendChild(select_serveur);
	ligne_validation.appendChild(bouton);
	zone.appendChild(ligne_pseudo_zzzelp);
	zone.appendChild(ligne_resultats_zzzelp);
	zone.appendChild(ligne_separateur);
	zone.appendChild(ligne_pseudo_fourmizzz);
	zone.appendChild(ligne_resultats_fourmizzz);
	zone.appendChild(ligne_serveur);
	zone.appendChild(ligne_validation);
}

function Onglet_nettoyage() {
	var sections = new Array(
						{ nom : 'Nettoyage de ZzzelpScript', id : 'zzzelpscript' },
						{ nom : 'Correction des pseudos Fourmizzz', id : 'pseudos' },
						{ nom : 'Nettoyage des chasses', id : 'chasses' },
						{ nom : 'Archivage des floods anciens', id : 'floods' },
						{ nom : 'Suppression des TDC anciens', id : 'TDC' }
					),
		zone = Creer_zone(1, 'zone_largeur_courte');
	for(var i=0; i<sections.length; i++) {
		var ligne = document.createElement('div'),
			titre = document.createElement('span'),
			valeur = document.createElement('img');
		ligne.className = 'ligne_cadre_structure';
		titre.innerHTML = sections[i].nom + ' :';
		valeur.src = '/Images/icon-cross.png';
		ligne.dataset.fait = 0;
		ligne.dataset.donnee = sections[i].id;
		ligne.appendChild(titre);
		ligne.appendChild(valeur);
		zone.appendChild(ligne);
	}
	Lancement_nettoyage();
}

function Onglet_releves(valeurs) {
	console.log(valeurs);
	var entete_CA = Creer_zone(3, 'zone_invisible'),
		entete_FI = Creer_zone(3, 'zone_invisible'),
		entete_MP = Creer_zone(3, 'zone_invisible'),
		zone_CA = Creer_zone(1, 'zone_invisible'),
		zone_FI = Creer_zone(1, 'zone_invisible'),
		zone_MP = Creer_zone(1, 'zone_invisible'),
		bouton_CA = document.createElement('div'),
		bouton_FI = document.createElement('div'),
		bouton_MP = document.createElement('div');
	bouton_CA.id = "ancre_principale";
	bouton_FI.id = "ancre_principale";
	bouton_MP.id = "ancre_principale";
	bouton_CA.className = 'ancre';
	bouton_FI.className = 'ancre';
	bouton_MP.className = 'ancre';
	bouton_CA.onclick = function onclick(event) {
		zone_CA.style.display = '';
		zone_FI.style.display = 'none';
		zone_MP.style.display = 'none';
	}
	bouton_FI.onclick = function onclick(event) {
		zone_CA.style.display = 'none';
		zone_FI.style.display = '';
		zone_MP.style.display = 'none';
	}
	bouton_MP.onclick = function onclick(event) {
		zone_CA.style.display = 'none';
		zone_FI.style.display = 'none';
		zone_MP.style.display = '';
	}
	bouton_CA.innerHTML = 'Relevés CA';
	bouton_FI.innerHTML = 'Relevés FI';
	bouton_MP.innerHTML = 'Relevés MP';
	entete_CA.appendChild(bouton_CA);
	entete_FI.appendChild(bouton_FI);
	entete_MP.appendChild(bouton_MP);

	zone_CA.setAttribute('style', 'display:none');
	zone_MP.setAttribute('style', 'display:none');

	for(var i=0; i<valeurs.CA.length; i++) {
		var releve = valeurs.CA[i],
			zone = document.createElement('div'),
			entete = document.createElement('div'),
			contenu = document.createElement('div');
		zone.className = 'zone_contenu';
		zone.setAttribute('style', 'box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.65); border: 1px solid rgba(0, 0, 0, 0.40);padding:15px;margin: 30px 15px;');
		entete.innerHTML = '<b>' + releve.alliance + ' (' + releve.serveur + ') - '  + ze_Generation_date_v1(releve.date_synchro) + '</b>';
		contenu.innerHTML = releve.contenu.replace(/\n/g, '<br>');
		contenu.setAttribute('style', 'display:none');
		entete.onclick = function onclick(event) {this.nextSibling.style.display = (this.nextSibling.style.display == 'none' ? '' : 'none');}
		zone.appendChild(entete);
		zone.appendChild(contenu);
		zone_CA.appendChild(zone);
	}

	for(var i=0; i<valeurs.FI.length; i++) {
		try {
			var releve = valeurs.FI[i],
				zone = document.createElement('div'),
				entete = document.createElement('div'),
				contenu = document.createElement('div'),
				thread = JSON.parse(releve.contenu);
			zone.className = 'zone_contenu';
			zone.setAttribute('style', 'box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.65); border: 1px solid rgba(0, 0, 0, 0.40);padding:15px;margin: 30px 15px;');
			entete.innerHTML = '<b>' + releve.alliance + ' (' + releve.serveur + ') - '  + ze_Generation_date_v1(releve.date_synchro) + ' - ' + thread.titre + ' (' + thread.categorie + ')</b>';
			contenu.setAttribute('style', 'display:none');

			for(var j=0; j<thread.messages.length; j++) {
				var message = thread.messages[j],
					cadre = document.createElement('div');
				cadre.innerHTML = '<b>' + message.auteur + ' - ' + message.date + '</b></br>' + message.contenu.replace(/<img src="images\/(.*?)">/g, '<img src="http://s1.fourmizzz.fr/images/$1">') + '<br><br><hr>';
				cadre.setAttribute('style', 'margin : 25px');
				contenu.appendChild(cadre);
			}
		}
		catch(e) {
			
		}

		entete.onclick = function onclick(event) {this.nextSibling.style.display = (this.nextSibling.style.display == 'none' ? '' : 'none');}
		zone.appendChild(entete);
		zone.appendChild(contenu);
		zone_FI.appendChild(zone);
	}

	for(var i=0; i<valeurs.MP.length; i++) {
		var releve = valeurs.MP[i],
			zone = document.createElement('div'),
			entete = document.createElement('div'),
			contenu = document.createElement('div');
		zone.className = 'zone_contenu';
		zone.setAttribute('style', 'box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.65); border: 1px solid rgba(0, 0, 0, 0.40);padding:15px;margin: 30px 15px;');
		entete.innerHTML = '<b>' + releve.alliance + ' (' + releve.serveur + ') - '  + ze_Generation_date_v1(releve.date_synchro) + '</b>';
		contenu.innerHTML = ze_BBcode_to_HTML(releve.contenu)
		contenu.setAttribute('style', 'display:none');
		entete.onclick = function onclick(event) {this.nextSibling.style.display = (this.nextSibling.style.display == 'none' ? '' : 'none');}
		zone.appendChild(entete);
		zone.appendChild(contenu);
		zone_MP.appendChild(zone);
	}
}
 
function Lancement_nettoyage() {
	if(document.querySelectorAll('.ligne_cadre_structure[data-fait="0"]').length > 0) {
		var ligne = document.querySelector('.ligne_cadre_structure[data-fait="0"]'),
			donnee = ligne.dataset.donnee;
			xdr = ze_getXDomainRequest();
		console.log(donnee);
		xdr.onload = function() {
			console.log(xdr.responseText);
			if(xdr.responseText.trim() == 1) {
				ligne.querySelector('img').src = '/Images/valider.png';
				ligne.dataset.fait = 1;
			}
			Lancement_nettoyage();
		}
		xdr.open("GET", url_zzzelp + "/admin/nettoyage?donnee=" + donnee,true);
		xdr.send(null);	
	}
}

function Afficher_profil_joueur(pseudo_zzzelp, pseudo_fourmizzz, serveur) {
	var xdr = ze_getXDomainRequest();
	if(typeof pseudo_zzzelp == 'undefined') {
		var serveur = document.querySelector('#serveur').value,
			pseudo_fourmizzz = document.querySelector('#pseudo_fourmizzz').value,
			pseudo_zzzelp = document.querySelector('#pseudo_zzzelp').value;
	}
	xdr.onload = function() {
		if(document.querySelectorAll('.zone_utilisateur').length > 0) {
			ze_Supprimer_element(document.querySelector('.zone_utilisateur'));
		}

		var valeurs = JSON.parse(xdr.responseText),
			zone_general = Creer_zone(2, 'zone_largeur_courte'),
			zone = zone_general.parentNode;
		zone.className += ' zone_utilisateur';
		console.log(valeurs);

		/*
			Connexion sur le compte
		*/
		var ligne = document.createElement('div'),
			bouton = document.createElement('a');
		ligne.className = 'ligne_cadre_structure';
		bouton.className = 'bouton';
		bouton.href = url_zzzelp + 'admin/authentification?pseudo=' + valeurs.utilisateur.pseudo;
		bouton.innerHTML = 'Accéder au compte';
		bouton.setAttribute('target', '_BLANK');
		ligne.appendChild(bouton);
		zone_general.appendChild(ligne);

		/*
			Informations sur le compte Zzzelp
		*/
		var lignes = new Array(
							{ nom : 'Pseudo Zzzelp', valeur : valeurs.utilisateur.pseudo },
							{ nom : 'E-mail', valeur : valeurs.utilisateur.mail }
								);

		for(var i=0; i<lignes.length; i++) {
			var ligne = document.createElement('div'),
				label = document.createElement('span'),
				valeur = document.createElement('span');
			ligne.className = 'ligne_cadre_structure';
			valeur.className = 'input_fige';
			label.innerHTML = lignes[i].nom + ' :';
			valeur.innerHTML = lignes[i].valeur;
			ligne.appendChild(label);
			ligne.appendChild(valeur);
			zone_general.appendChild(ligne);			
		}

		/*
			Pseudos Fourmizzz du joueur
		*/
		for(var serveur in ze_serveurs_full) {
			var ligne = document.createElement('div'),
				label = document.createElement('span'),
				valeur = document.createElement('span');
			ligne.className = 'ligne_cadre_structure';
			valeur.className = 'input_fige';
			label.innerHTML = ze_serveurs_full[serveur] + ' :';
			valeur.innerHTML = valeurs.utilisateur.pseudos[serveur].pseudo;
			valeur.setAttribute('style', 'font-weight:bold;color:' + ((valeurs.utilisateur.pseudos[serveur].validation == "1") ? 'green' : 'red'));
			ligne.appendChild(label);
			ligne.appendChild(valeur);
			zone_general.appendChild(ligne);
		}

		/*
			Détail pour chaque serveur
		*/
		for(var serveur in ze_serveurs_full) {
			if(valeurs.utilisateur.pseudos[serveur].validation == "1") {
				var zone_serveur = document.createElement('div'),
					joueur = valeurs.utilisateur.comptes_fzzz[serveur],
					entete = document.createElement('div');
				zone_serveur.className = 'zone_contenu zone_largeur_courte';
				entete.className = 'entete_cadre';
				entete.innerHTML = ze_serveurs_full[serveur] + ' : ' + joueur.pseudo;
				zone_serveur.appendChild(entete);
				/*
					Alliances
				*/
				for(var i=0; i<joueur.alliances.length; i++) {
					var ligne = document.createElement('div'),
						label = document.createElement('span'),
						valeur = document.createElement('span');
					ligne.className = 'ligne_cadre_structure';
					valeur.className = 'input_fige';
					label.innerHTML = 'Alliance ' + joueur.alliances[i].alliance + ' :';
					valeur.innerHTML = ['Non Activé', 'Nouveau', 'Membre', 'Gestionnaire', 'Chef'][joueur.alliances[i].droits];
					ligne.appendChild(label);
					ligne.appendChild(valeur);
					zone_serveur.appendChild(ligne);
				}

				zone.appendChild(zone_serveur);
				zone.appendChild(document.createElement('br'));
				zone.appendChild(document.createElement('br'));
			}
		}
	}
	xdr.open("GET", url_zzzelp + '/admin/data?mode=profil&serveur=' + serveur + '&pseudo_fourmizzz=' + pseudo_fourmizzz + '&pseudo_zzzelp=' + pseudo_zzzelp, true);
	xdr.send(null);	
}







function Dernieres_validations(validations) {
	var zone = Creer_zone(2, 'zone_invisible');
		entete = document.createElement('div'),
		tableau = document.createElement('table'),
		ligne = tableau.insertRow(0);
		colonnes = new Array('Pseudo', 'Serveur', 'Validateur', 'Mode', 'Validation');
	entete.className = 'entete_cadre';
	tableau.className = 'tableau_ombre';
	entete.innerHTML = 'Dernières validations';
	for(var i=0; i<colonnes.length; i++) {
		var cell = document.createElement('th');
		cell.innerHTML = colonnes[i];
		ligne.appendChild(cell);
	}
	for(var i=0; i<validations.length; i++) {
		var ligne = tableau.insertRow(-1),
			cell1 = ligne.insertCell(0),
			cell2 = ligne.insertCell(1),
			cell3 = ligne.insertCell(2),
			cell4 = ligne.insertCell(3),
			cell5 = ligne.insertCell(4);
		cell1.innerHTML = ze_Lien_profil(validations[i].valide, validations[i].serveur);
		cell2.innerHTML = validations[i].serveur;
		cell3.innerHTML = validations[i].validateur;
		cell4.innerHTML = validations[i].methode;
		cell5.innerHTML = ze_Generation_date_v1(validations[i].date_validation);
	}
	zone.appendChild(entete);
	zone.appendChild(tableau);
	zone.appendChild(document.createElement('br'));
	zone.appendChild(document.createElement('br'));
}

function A_valider(joueurs) {
	var zone = Creer_zone(2, 'zone_invisible');
		entete = document.createElement('div'),
		colonnes = new Array('Pseudo Fourmizzz', 'Pseudo Zzzelp','');
	entete.className = 'entete_cadre';
	entete.innerHTML = 'Joueurs non validés';
	zone.appendChild(entete);
	for(var serveur in joueurs) {
		var entete_serveur = document.createElement('div'),
			tableau = document.createElement('table'),
			ligne_recherche = tableau.insertRow(0),
			ligne = tableau.insertRow(1),
			cell_recherche = document.createElement('th');
			input = document.createElement('input');
		entete_serveur.className = 'entete_menu_cache';
		entete_serveur.innerHTML = 'Validations ' + serveur;
		entete_serveur.onclick = function onclick(event) {this.nextSibling.style.display = (this.nextSibling.style.display == 'none') ? '' : 'none'}
		tableau.className = 'tableau_ombre';
		tableau.id = 'joueurs_a_valider_' + serveur;
		tableau.setAttribute('style', 'display:none');
		for(var i=0; i<colonnes.length; i++) {
			var cell = document.createElement('th');
			cell.innerHTML = colonnes[i];
			ligne.appendChild(cell);
		}
		input.type = 'text';
		input.dataset.serveur = serveur;
		input.className = 'input_haut';
		input.setAttribute('style', '  margin-bottom: .5em;');
		input.onkeyup = function onkeyup(event) {Afficher_lignes_validations(this);}
		cell_recherche.setAttribute('colspan', '3');
		cell_recherche.appendChild(input);
		ligne_recherche.appendChild(cell_recherche);
		for(var i=0; i<joueurs[serveur].length; i++) {
			var ligne = tableau.insertRow(-1),
				cell1 = ligne.insertCell(0),
				cell2 = ligne.insertCell(1),
				cell3 = ligne.insertCell(2),
				img = document.createElement('img');
			cell1.innerHTML = ze_Lien_profil(joueurs[serveur][i]['pseudo_' + serveur], serveur);
			cell2.innerHTML = joueurs[serveur][i].pseudo;
			img.src = '/Images/valider.png';
			img.height = '25';
			img.dataset.serveur = serveur;
			img.dataset.pseudo = joueurs[serveur][i]['pseudo_' + serveur];
			img.onclick = function onclick(event) {Valider_joueur(this.dataset.serveur, this.dataset.pseudo)};
			cell3.appendChild(img);
		}
		zone.appendChild(entete_serveur);
		zone.appendChild(tableau);
		zone.appendChild(document.createElement('br'));
		zone.appendChild(document.createElement('br'));
	}
}

function Valider_joueur(serveur, pseudo) {
	var xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		ze_Supprimer_element(document.querySelector('img[data-serveur="' + serveur + '"][data-pseudo="' + pseudo + '"]').parentNode.parentNode);
	}
	xdr.open("GET", url_site + 'admin/validation?serveur=' + serveur + '&pseudo=' + pseudo, true);
	xdr.send(null);		
}

function Afficher_lignes_validations(element) {
	var serveur = element.dataset.serveur,
		lignes = document.querySelector('#joueurs_a_valider_' + serveur).rows,
		valeur = element.value;
	for(var i=2; i<lignes.length; i++) {
		var pseudo_fourmizzz = lignes[i].cells[0].querySelector('a').innerHTML,
			pseudo_zzzelp = lignes[i].cells[1].innerHTML;
		lignes[i].style.display = (~pseudo_zzzelp.indexOf(valeur) || ~pseudo_fourmizzz.indexOf(valeur) || valeur == '') ? '' : 'none';
	}
}








function Creer_zone(n, nom_class) {
	var zone = document.createElement('div'),
		zone_2 = document.createElement('div');
	zone.className = 'col-1-' + n;
	zone_2.className = 'zone_contenu ' + nom_class;
	document.querySelector('#zone_admin').appendChild(zone);
	zone.appendChild(zone_2);
	zone.appendChild(document.createElement('br'));
	zone.appendChild(document.createElement('br'));
	return zone_2;
}

function Autocomplete_admin(mode, valeur, serveur) {
	if (valeur.length > 0) {
		var xdr = ze_getXDomainRequest();
		xdr.onload = function() {
			Afficher_liste(JSON.parse(xdr.responseText), mode);
		}
		xdr.open("GET", url_site + "admin/autocomplete?mode=" + mode + "&q=" + valeur + "&serveur=" + serveur,true);
		xdr.send(null);
	}
	else {
		document.querySelector('#resultats_pseudos_' + mode).innerHTML = '';
		document.querySelector('#resultats_pseudos_' + mode).style.zIndex = -1;
	}
}

function Afficher_liste(valeurs, mode) {
	document.querySelector('#resultats_pseudos_' + mode).innerHTML = '';
	for(var i=0;i<valeurs.length;i++) {
		document.querySelector('#resultats_pseudos_' + mode).innerHTML += '<div class="ligne_autocomplete" onclick="Validation_donnees(this.innerHTML, \'' + mode + '\')\">' + valeurs[i] + '</div>';
	}
	if(valeurs.length == 0) {
		document.querySelector('#resultats_pseudos_' + mode).style.zIndex = -1;
	}
	else {
		document.querySelector('#resultats_pseudos_' + mode).style.zIndex = 999;
	}
}

function Validation_donnees(resultat, mode) {
	document.querySelector('#resultats_pseudos_' + mode).innerHTML = '';
	document.querySelector('#pseudo_' + mode).value = resultat;
	document.querySelector('#pseudo_' + mode).focus();
	document.querySelector('#resultats_pseudos_' + mode).style.zIndex = -1;
}

function main() {
	var xdr = ze_getXDomainRequest(),
		analyseur = new ZzzelpScriptRC(),
		v = {};
	xdr.onload = function() {
		var RCs = JSON.parse(xdr.responseText);
		for(var i=0; i<RCs.length; i++) {
			var ligne = RCs[i],
				RC = analyseur.splitRCs(ligne.RC)[0];
			if(~ligne.RC.indexOf('attaque votre')) {
				valeurs = analyseur.parseCombat(RC, false, undefined, false);
			}
			else if(~ligne.RC.indexOf('attaquez')) {
				valeurs = analyseur.parseCombat(RC, false, undefined, true);
			}
			if(valeurs && valeurs.mode == 'RC') {
				valeurs = analyseur.analyse(valeurs);
			}
			v[ligne.ID_RC] = valeurs;
		}
		send(v);
	};
	xdr.open("GET", url_site + "admin/test", true);
	xdr.send(null);
}

function send(v) {
	for(var ID in v) {
		var xdr = ze_getXDomainRequest(),
			form = new FormData();
		form.append('analyse', JSON.stringify(v[ID]));
		form.append('ID_RC', ID);
		delete v[ID];
		xdr.onload = function() {
			console.log(ID + ' stocké');
			console.log(xdr.responseText);
			send(v);
		};
		xdr.open("POST", url_site + "admin/test2", true);
		xdr.send(form);

		break;
	}
}



		</script>
	</body>
</html>













