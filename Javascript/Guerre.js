if(document.location.pathname == '/Membre.php' && ~url.indexOf('&modal_zzzelp')) {
	var pseudo = document.querySelector('center h2').innerHTML,
		TDC = parseInt(document.querySelector('.tableau_score').rows[1].cells[1].innerHTML.replace(/ /g, ''));
	new ZzzelpScriptModalGuerre(pseudo, TDC);	
}

function ZzzelpScriptModalGuerre(pseudo, TDC) {

	var guerre = this;

	this.pseudo = pseudo;
	this.TDC = TDC;

	this.init = function() {
		if(~url.indexOf('fourmizzz.fr/')) {
			guerre.getTDCUser();
			guerre.serveur = ze_serveur;
		}
		else {
			guerre.load(1);
			guerre.serveur = donnees.serveur;
		}
	};

	this.addSpacesInput = function(input) {
		input.onkeyup = function onkeyup(event) {
			ze_Ajout_espaces(this);
		};		
	};

	this.getTDCUser = function() {
		new ZzzelpAjax(({ method : 'GET', domain : 'fourmizzz', url : 'Membre.php?Pseudo=' + guerre.pseudo, addDOM : true }),
			{ success : function(zone_page) {
				guerre.TDC = parseInt(zone_page.querySelector('.tableau_score').rows[1].cells[1].innerHTML.replace(/ /g, ''));
				guerre.load(1);
			}
		});
	};


	this.load = function(mode) {
		new ZzzelpAjax( ZzzelpScriptModalGuerre.chooseAjaxParam({ method : 'GET', force : mode, url : 'mode=joueur' }, guerre.pseudo),
			{ success : function(valeurs) {
				guerre.main(valeurs);
			}, authentication_issue : function() {
				guerre.load(2);
			}
		});
	};

	this.main = function(valeurs) {
		console.log(valeurs);
		guerre.valeurs = valeurs;
		guerre.createZone();
		guerre.createActionBar();
		guerre.createAlert();
		guerre.zone.appendChild(guerre.createZoneGenerality(true));
		guerre.zone.appendChild(new ZzzelpScriptZoneData(valeurs, guerre.pseudo, false).getZone());
		guerre.zone.appendChild(guerre.createZoneConversation(false));
		guerre.zone.appendChild(Generation_zone_combat(pseudo, valeurs, false));
		guerre.zone.appendChild(new ZzzelpScriptAideSynchro(guerre.pseudo, pseudo, valeurs, TDC, false).getZone());
	};
				
	this.createZone = function() {
		var fond = document.createElement('div'),
			fenetre = document.createElement('div'),
			entete = document.createElement('header'),
			contenu = document.createElement('div'),
			barre_boutons = document.createElement('div'),
			bouton_quitter = document.createElement('img');
		entete.innerHTML = 'Données de ' + pseudo;
		barre_boutons.className = 'zzzelp_modal_boutons';
		fond.className = 'modal_zzzelp';
		bouton_quitter.src = ZzzelpScript.url + '/Images/close.png';
		bouton_quitter.onclick = function onclick(event) {
			ze_Supprimer_element(fond);
		};
		barre_boutons.appendChild(bouton_quitter);
		fenetre.appendChild(barre_boutons);

		fond.dataset.pseudo = pseudo;
		fond.dataset.serveur = (~url.indexOf('fourmizzz.fr/')) ? ze_serveur : donnees.serveur;
		contenu.className = 'zzzelp_contenu_modal ';

		fond.appendChild(fenetre);
		fenetre.appendChild(entete);
		fenetre.appendChild(contenu);
		document.body.appendChild(fond);

		this.zone = contenu;
	};

	this.createActionBar = function() {
		var barre_actions = document.createElement('div'),
			liens = new Array(
				{ nom : 'Traceur Complet', url : ZzzelpScript.url + '/traceur/nouveau?serveur=' + guerre.serveur + '&mode=joueurs&joueur=' + guerre.pseudo },
				{ nom : 'Profil Fourmizzz', url : 'http://' + guerre.serveur + '.fourmizzz.fr/Membre.php?Pseudo=' + guerre.pseudo }
		);
		barre_actions.setAttribute('style', 'text-align: center;');
		for(var i=0; i<liens.length; i++) {
			var lien = document.createElement('a');
			lien.innerHTML = liens[i].nom;
			lien.href = liens[i].url;
			lien.target = '_BLANK';
			lien.className = 'bouton_guerre';
			lien.setAttribute('style', 'display: inline-block;width: 160px;margin-' + ((i === 0) ? 'right' : 'left') + ': 5px;');
			barre_actions.appendChild(lien);
		}
		guerre.zone.appendChild(barre_actions);
	};

	this.createAlert = function() {
		var alerte = document.createElement('div'),
			contenu_alerte = document.createElement('span'),
			input_alerte = document.createElement('input'),
			modifier = document.createElement('img');
		alerte.setAttribute('style', 'text-align: center;');
		if(guerre.valeurs.niveaux.alerte === '') {
			contenu_alerte.innerHTML = 'Aucune alerte concernant ce joueur';
			contenu_alerte.dataset.vide = '1';
		}
		else {
			contenu_alerte.innerHTML = guerre.valeurs.niveaux.alerte;
			contenu_alerte.dataset.vide = '0';
		}
		contenu_alerte.className = 'zzzelp_alerte_guerre';
		modifier.src = ZzzelpScript.url + '/Images/edit.png';
		modifier.setAttribute('style', 'height: 20px;padding-left: 10px;cursor: pointer;');
		modifier.onclick = function onclick(event) {
			guerre.saveAlert(this, input_alerte, contenu_alerte);
		};
		input_alerte.setAttribute('style', 'width: 80%;max-width: 350px;height: 2em;display:none');
		input_alerte.value = guerre.valeurs.niveaux.alerte;

		alerte.appendChild(contenu_alerte);
		alerte.appendChild(input_alerte);
		alerte.appendChild(modifier);	
		guerre.zone.appendChild(alerte);
	};

	this.saveAlert = function(img, input_alerte, contenu_alerte) {
		if(~img.src.indexOf('edit')) {
			img.src = ZzzelpScript.url + '/Images/valider.png';
			input_alerte.style.display = '';
			contenu_alerte.style.display = 'none';
		}
		else {
			img.src = ZzzelpScript.url + '/Images/edit.png';
			var form = new FormData();
			form.append('alerte', input_alerte.value);
			new ZzzelpAjax( ZzzelpScriptModalGuerre.chooseAjaxParam({ data : form, method : 'POST', url : 'mode=stockage_alerte' }, guerre.pseudo),
				{ success : function(valeurs) {
					contenu_alerte.innerHTML = (input_alerte.value.length === 0) ? 'Aucune alerte concernant ce joueur' : input_alerte.value;
					contenu_alerte.dataset.vide = (input_alerte.value.length === 0) ? '1' : '0';
					input_alerte.style.display = 'none';
					contenu_alerte.style.display = '';
				}
			});
		}
	};

	this.createZoneGenerality = function(afficher) {
		var unites = [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			date_maxi = new Date((guerre.valeurs.derniere_montee.date + guerre.valeurs.derniere_montee.incertitude)*1000),
			incertitude;
		for(var i=0; i<14; i++) {
			unites[i] = guerre.valeurs.niveaux[ZzzelpArmy.TAGs[i]];
		}
		if(guerre.valeurs.derniere_montee.incertitude > 0) {
			incertitude = ' - ' + ((date_maxi.getHours() >= 10) ? date_maxi.getHours()  : ("0" + date_maxi.getHours())) + 'h';
			incertitude += (date_maxi.getMinutes() >= 10) ? date_maxi.getMinutes()  : ("0" + date_maxi.getMinutes());
		}
		else {
			incertitude = '';
		}
		var zone = document.createElement('div'),
			entete_general = document.createElement('div'),
			zone_general = document.createElement('div'),
			cadre = document.createElement('div'),
			informations = new Array(
				{ nom : 'Temps de trajet', valeur : ze_Secondes_date(guerre.valeurs.temps_trajet, true) },
				{ nom : 'Dernière montée', valeur : ze_Generation_date_v1(guerre.valeurs.derniere_montee.date) + incertitude }
		);
		entete_general.className = 'entete_menu_cache';
		entete_general.innerHTML = ' Informations importantes ';
		entete_general.onclick = function onclick(event) {
			this.nextSibling.style.display = (this.nextSibling.style.display == 'none') ? '' : 'none';
		};
		cadre.setAttribute('style', 'padding: 10px 0;margin:auto;width:420px;max-width: 80%;border:1px solid black;');
		zone_general.className = 'zzzelp_section_fenetre';
		zone_general.setAttribute('style', 'display:' + (afficher ? '' : 'none'));

		cadre.appendChild(guerre.ligneDead());		



		for(i=0; i<informations.length; i++) {
			ligne = document.createElement('div');
			var	label = document.createElement('span'),
				valeur = document.createElement('span');
			ligne.className = 'ligne_cadre_structure';
			valeur.className = 'input_fige';
			label.innerHTML = informations[i].nom + ' :';
			valeur.innerHTML = informations[i].valeur;
			ligne.appendChild(label);
			ligne.appendChild(valeur);
			cadre.appendChild(ligne);
		}

		for(var stat in guerre.valeurs.resume_armee) {
			var donnee = guerre.valeurs.resume_armee[stat],
				element = document.createElement('span');
			incertitude = ((guerre.valeurs.niveaux[donnee.prerequis] === 0 && guerre.valeurs.niveaux_probables[donnee.prerequis] > 0) ? ' ?' : '');
			element.innerHTML = stat + ' : ' + ze_Nombre_raccourci(donnee.valeur, 3) + incertitude;
			element.setAttribute('style', 'width:130px;text-align:center;display:inline-block;color:' + donnee.couleur);
			cadre.appendChild(element);
		}
		zone_general.appendChild(cadre);
		zone.appendChild(entete_general);
		zone.appendChild(zone_general);
		return zone;		
	};

	this.ligneDead = function() {
		var ligne = document.createElement('div'),
			contenu_dead = document.createElement('span'),
			input_dead = document.createElement('input'),
			checkbox_dead = document.createElement('input'),
			modifier = document.createElement('img');
		ligne.setAttribute('style', 'text-align: center;');
		if(guerre.valeurs.niveaux.dead === '0') {
			date = ze_Generation_date_v1(time());
			contenu_dead.innerHTML = 'Joueur encore en vie !';
			contenu_dead.setAttribute('style', 'font-weight:bold;color:#FF0000');
			contenu_dead.dataset.vide = '1';
		}
		else {
			date = ze_Generation_date_v1(this.valeurs.niveaux.date_dead);
			contenu_dead.innerHTML = 'DEAD le ' + date;
			contenu_dead.setAttribute('style', 'font-weight:bold;color:#2E8B57');
			contenu_dead.dataset.vide = '0';
			checkbox_dead.checked = true;
		}
		contenu_dead.className = 'zzzelp_alerte_guerre';
		modifier.src = ZzzelpScript.url + '/Images/edit.png';
		modifier.setAttribute('style', 'height: 20px;padding-left: 10px;cursor: pointer;');
		modifier.onclick = function onclick(event) {
			guerre.saveDead(this, input_dead, contenu_dead, checkbox_dead);
		};
		input_dead.setAttribute('style', 'width: 80%;max-width: 150px;height: 2em;display:none');
		input_dead.value = date;
		checkbox_dead.setAttribute('style', 'display:none');
		checkbox_dead.type = 'checkbox';

		ligne.appendChild(contenu_dead);
		ligne.appendChild(input_dead);
		ligne.appendChild(checkbox_dead);
		ligne.appendChild(modifier);

		return ligne;
	};

	this.saveDead = function(img, input_dead, contenu_dead, checkbox_dead) {
		if(~img.src.indexOf('edit')) {
			img.src = ZzzelpScript.url + '/Images/valider.png';
			input_dead.style.display = '';
			checkbox_dead.style.display = '';
			contenu_dead.style.display = 'none';
		}
		else {
			img.src = ZzzelpScript.url + '/Images/edit.png';
			var form = new FormData(),
				dead;
			if(checkbox_dead.checked) {
				dead = ze_Date_to_timestamp_v1(input_dead.value);
				if(dead === 0) {
					return;
				}
			}
			else {
				dead = 0;
			}
			form.append('dead', checkbox_dead.checked);
			form.append('date_dead', dead);
			new ZzzelpAjax( ZzzelpScriptModalGuerre.chooseAjaxParam({ data : form, method : 'POST', url : 'mode=stockage_dead' }, guerre.pseudo),
				{ success : function(valeurs) {
					if(dead > 0) {
						contenu_dead.innerHTML = 'DEAD le ' + ze_Generation_date_v1(dead);
						contenu_dead.setAttribute('style', 'font-weight:bold;color:#2E8B57');
					}
					else {
						contenu_dead.innerHTML = 'Joueur encore en vie';
						contenu_dead.setAttribute('style', 'font-weight:bold;color:#F0000');
					}
					input_dead.style.display = 'none';
					checkbox_dead.style.display = 'none';
					contenu_dead.style.display = '';
				}
			});
		}
	};

	this.createZoneConversation = function(afficher) {
		var zone = document.createElement('div'),
			titre_conversation = document.createElement('div'),
			zone_conversation = document.createElement('div');
	
		zone_conversation.setAttribute('style', 'display:' + (afficher ? '' : 'none'));
				
		zone_conversation.className = 'conversation_zzzelp zzzelp_section_fenetre';
		titre_conversation.className = 'entete_menu_cache';
		titre_conversation.innerHTML = ' Conversation et rapports ';
		titre_conversation.onclick = function onclick(event) {
			this.nextSibling.style.display = (this.nextSibling.style.display == 'none') ? '' : 'none';
		};

		zone.appendChild(titre_conversation);
		zone.appendChild(zone_conversation);

		guerre.createZoneConversationOptions(zone_conversation);
		guerre.createZoneConversationAddData(zone_conversation);
		for(l=0; l<guerre.valeurs.messages.length; l++) {
			zone_conversation.appendChild(new ZzzelpScriptMessageGuerre(guerre.valeurs.messages[l], guerre.valeurs.messages[l].type).ligne_message, guerre.pseudo);
		}

		return zone;	
	};

	this.createZoneConversationOptions = function(zone_conversation) {
		var menu_options = document.createElement('div'),
			titre_options = document.createElement('div'),
			contenu_options = document.createElement('div');options = new Array(
			{ titre : 'Afficher les messages', id : 'message' },
			{ titre : 'Afficher les combats en attaque', id : 'combat_att' },
			{ titre : 'Afficher les combats en défense', id : 'combat_def' },
			{ titre : 'Afficher les floods', id : 'flood' },
			{ titre : 'Afficher les résultats du traceur', id : 'traceur' }
		);
		menu_options.className = 'options_guerre';
		titre_options.innerHTML = 'Options';
		titre_options.className = 'titre_options_guerre';
		contenu_options.className = 'contenu_options_guerre';

		for(var i=0; i<options.length; i++) {
			var ligne = document.createElement('div'),
				span = document.createElement('span'),
				checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.checked = 1;
			checkbox.dataset.categorie = options[i].id;
			ligne.dataset.active = 1;
			span.innerHTML = options[i].titre + ' :';
			ligne.appendChild(span);
			ligne.appendChild(checkbox);
			guerre.eventConversation(ligne);
			contenu_options.appendChild(ligne);
		}
		menu_options.appendChild(titre_options);
		menu_options.appendChild(contenu_options);
		zone_conversation.appendChild(menu_options);
	};

	this.eventConversation = function(ligne) {
		ligne.onclick = function onclick(event) {
			var lignes = document.querySelectorAll('.post_guerre');
			this.querySelector('input').checked = (this.dataset.active === 0);
			this.dataset.active = (parseInt(this.dataset.active) + 1)%2;
			for(var n=0; n<lignes.length; n++) {
				lignes[n].style.display = document.querySelector('.contenu_options_guerre input[data-categorie="' + lignes[n].dataset.type_data + '"]').checked ? '' : 'none';
			}
		};
	};

	this.eventButtonConversationType = function(button) {
		button.onclick = function onclick(event) {
			var type = document.querySelector('.nouveau_' + this.dataset.type),
				autre = document.querySelector('.nouveau_' + this.dataset.autre);
			type.style.display = (type.style.display === '') ? 'none' : '';
			autre.style.display = 'none';
		};
	};

	this.createZoneConversationAddData = function(zone_conversation) {
		var type_donnees = new Array(
				{ mode : 'messages', type : 'message', nouveau : 'Ecrire un message' },
				{ mode  : 'combats', type : 'combat', nouveau : 'Importer un RC' }
			),
			nouveaux = document.createElement('div'),
			nouvelles_donnees = document.createElement('div');
		for(i=0; i<type_donnees.length; i++) {
			var	bouton = document.createElement('a');				
			bouton.className = 'bouton_guerre';
			bouton.innerHTML = type_donnees[i].nouveau;
			bouton.dataset.type = type_donnees[i].type;
			bouton.dataset.autre = type_donnees[(i+1)%2].type;
			guerre.eventButtonConversationType(bouton);
			nouvelles_donnees.appendChild(bouton);
		}
		zone_conversation.appendChild(nouvelles_donnees);
		var nouveau_message = new ZzzelpScriptZoneEdition('create', pseudo).zone,
			nouveau_combat = document.createElement('div'),
			analyse_combat = document.createElement('div'),
			textarea = document.createElement('textarea'),
			bouton_combat = document.createElement('div');
		nouveaux.className = 'conversation';
		nouvelles_donnees.className = 'barre_boutons';
		nouveau_combat.className = 'nouveau_combat conversation';
		textarea.setAttribute('placeholder', 'Copiez votre Rapport de Combat ici');
		bouton_combat.className = 'bouton_guerre';
		bouton_combat.innerHTML = 'Analyser';
		bouton_combat.setAttribute('style', 'width:100px');
		bouton_combat.onclick = function onclick(event) {
			analyse_combat.innerHTML = '';
			var donnees = new ZzzelpScriptRC(guerre.pseudo).HOF(textarea.value, true);
			for(var n=0; n<donnees.length; n++) {
				analyse_combat.appendChild(donnees[n].zone);
			}
		};
		nouveau_combat.appendChild(textarea);
		nouveau_combat.appendChild(bouton_combat);
		nouveau_combat.setAttribute('style', 'display:none');
		nouveau_message.setAttribute('style', 'display:none');
		nouveaux.appendChild(nouveau_combat);
		nouveaux.appendChild(nouveau_message);
		nouveaux.appendChild(analyse_combat);
		zone_conversation.appendChild(nouvelles_donnees);
		zone_conversation.appendChild(nouveaux);
	};

	this.init();

}

ZzzelpScriptModalGuerre.chooseAjaxParam = function(param, pseudo) {
	if(~url.indexOf('fourmizzz.fr/')) {
		param.url = 'guerre_script?cible=' + pseudo + '&' + param.url + '&';
		param.domain = 'zzzelp';
		
	}
	else {
		param.url = 'guerre_data?serveur=' + donnees.serveur + '&cible=' + pseudo + '&' + param.url + '&';
		param.domain = 'zzzelp_interne';
	}
	return param;
};

ZzzelpScriptModalGuerre.areLevelsSure = function(niveaux, niveaux_probables, prerequis) {
	for(var i=0; i<prerequis.length; i++) {
		if(!ZzzelpScriptModalGuerre.isLevelSure(niveaux[prerequis[i]], niveaux_probables[prerequis[i]])) {
			return false;
		}
	}
	return true;
};

ZzzelpScriptModalGuerre.isLevelSure = function(niveau, niveau_probable) {
	return (parseInt(niveau) !== 0 || niveau_probable === 0);
};

function ZzzelpScriptZoneData(valeurs, pseudo, afficher, Scallback) {

	var that = this;

	this.afficher = afficher;
	this.pseudo = pseudo;
	this.valeurs = valeurs;
	this.Scallback = Scallback;

	this.init = function() {
		var zone = document.createElement('div'),
			entete_armee = document.createElement('div'),
			zone_armee = document.createElement('div');
		entete_armee.className = 'entete_menu_cache';
		entete_armee.innerHTML = ' Armée et niveaux ';
		entete_armee.onclick = function onclick(event) {
			this.nextSibling.style.display = (this.nextSibling.style.display == 'none') ? '' : 'none';
		};
		zone_armee.setAttribute('style', 'display:' + (that.afficher ? '' : 'none'));
		zone_armee.className = 'zzzelp_section_fenetre';

		zone.appendChild(entete_armee);
		zone.appendChild(zone_armee);

		that.createImportArmee(zone_armee);
		that.createArmee(zone_armee);
		that.createNiveaux(zone_armee);
		that.createDate(zone_armee);
		that.createMAJ(zone_armee);	


		that.zone_armee = zone_armee;
		that.zone = zone;
	};

	this.createImportArmee = function(zone_armee) {
		var ligne_preparation_analyse = document.createElement('div'),
			bouton = document.createElement('a'),
			ligne_analyse = document.createElement('div'),
			champ_analyse = document.createElement('textarea'),
			ligne_bouton_analyse = document.createElement('div'),
			bouton_analyse = document.createElement('a');
		ligne_preparation_analyse.className = 'ligne_cadre_structure ligne_armee';
		ligne_preparation_analyse.setAttribute('style', 'height:auto');
		bouton.setAttribute('style', 'width: 180px;');
		bouton.className = 'bouton_guerre';
		bouton.innerHTML = 'Importer une armée';
		bouton.onclick = function onclick(event) {
			ligne_preparation_analyse.style.display = 'none';
			ligne_analyse.style.display = '';
			ligne_bouton_analyse.style.display = '';
		};
		ligne_analyse.className = 'ligne_cadre_structure ligne_armee';
		ligne_analyse.setAttribute('style', 'height:auto;display:none;');
		ligne_bouton_analyse.className = 'ligne_cadre_structure ligne_armee';
		ligne_bouton_analyse.setAttribute('style', 'height:auto;display:none;');
		champ_analyse.setAttribute('style', 'width: 250px;margin: auto;display: block;height: 70px;');
		bouton_analyse.setAttribute('style', 'width: 170px;');
		bouton_analyse.className = 'bouton_guerre';
		bouton_analyse.innerHTML = 'Importer';
		bouton_analyse.onclick = function onclick(event) {
			var armee = ZzzelpArmy.analyse(champ_analyse.value),
				inputs = document.querySelectorAll('.ligne_armee .input_tableau[data-donnee="armee"]');
			for(var i=0; i<14; i++) {
				inputs[i].value = ze_Nombre(armee.getUnite(i));
			}
			ligne_preparation_analyse.style.display = '';
			ligne_analyse.style.display = 'none';
			ligne_bouton_analyse.style.display = 'none';
		};

		ligne_preparation_analyse.appendChild(bouton);
		ligne_analyse.appendChild(champ_analyse);
		ligne_bouton_analyse.appendChild(bouton_analyse);

		zone_armee.appendChild(ligne_preparation_analyse);
		zone_armee.appendChild(ligne_analyse);
		zone_armee.appendChild(ligne_bouton_analyse);
	};

	this.createArmee = function(zone_armee) {
		for(var i=0; i<14; i++) {
			var ligne_unite = document.createElement('div'),
				span = document.createElement('span'),
				input = document.createElement('input');
			ligne_unite.className = 'ligne_cadre_structure ligne_armee';
			span.innerHTML = ZzzelpArmy.noms_pluriel[i] + ' :';
			input.type = 'text';
			input.dataset.donnee = 'armee';
			that.addSpacesInput(input);
			input.className = 'input_haut input_tableau';
			input.value = ze_Nombre(parseInt(that.valeurs.niveaux[ZzzelpArmy.TAGs[i]]));
			ligne_unite.appendChild(span);
			ligne_unite.appendChild(input);
			zone_armee.appendChild(ligne_unite);
		}
	};

	this.createNiveaux = function(zone_armee) {
		niveaux = new Array(
			{ nom : 'Armes', id : 'armes' },
			{ nom : 'Bouclier', id : 'bouclier' },
			{ nom : 'Dôme', id : 'dome' },
			{ nom : 'Loge Impériale', id : 'loge' },
			{ nom : 'Temps de ponte', id : 'tdp' },
			{ nom : 'Vitesse d\'attaque', id : 'vitesse_attaque' },
			{ nom : 'Vitesse de chasse', id : 'vitesse_chasse' }
		);

		for(var i=0; i<niveaux.length; i++) {
			var ligne_niveau = document.createElement('div'),
				span = document.createElement('span'),
				input = document.createElement('input');
			ligne_niveau.className = 'ligne_cadre_structure ligne_armee';
			span.innerHTML = niveaux[i].nom + ' :';
			input.dataset.nom = niveaux[i].id;
			input.type = 'text';
			input.className = 'input_haut input_niveau';
			input.value = that.valeurs.niveaux[niveaux[i].id];
			ligne_niveau.appendChild(span);
			ligne_niveau.appendChild(input);
			zone_armee.appendChild(ligne_niveau);	
		}
	};

	this.createDate = function(zone_armee) {
		var ligne_date = document.createElement('div'),
			span = document.createElement('span'),
			input = document.createElement('input');
		ligne_date.className = 'ligne_cadre_structure ligne_armee';
		span.innerHTML = 'MAJ de l\'armée :';
		span.id = 'entete_date_MAJ_armee';
		input.className = 'input_haut input_tableau';
		input.id = 'date_MAJ_armee';
		input.value = (that.valeurs.niveaux.date_armee > 0) ? ze_Generation_date_v1(that.valeurs.niveaux.date_armee, true) : '';
		input.placeholder = ze_Generation_date_v1(time(), true);
		ligne_date.appendChild(span);
		ligne_date.appendChild(input);
		zone_armee.appendChild(ligne_date);
	};

	this.createMAJ = function(zone_armee) {
		var ligne = document.createElement('div'),
			bouton = document.createElement('a');
		ligne.className = 'ligne_cadre_structure ligne_armee';
		ligne.setAttribute('style', 'height:auto');
		bouton.setAttribute('style', 'width: 100px');
		bouton.className = 'bouton_guerre';
		bouton.innerHTML = 'Enregistrer';

		bouton.onclick = function onclick(event) {
			var date = ze_Date_to_timestamp_v1(document.querySelector('#date_MAJ_armee').value),
				armee = new ZzzelpArmy(undefined, {}),
				niveaux = '',
				elements = zone_armee.querySelectorAll('.ligne_armee input[type="text"]');
			for(var j=0; j<elements.length; j++) {
				if(j<14) {
					armee.setUnite(j, parseInt(elements[j].value.replace(/ /g, '')));
				}
				niveaux += ((niveaux === '' ) ? '' : ',') + elements[j].value.replace(/ /g, '');
			}
			if(date > 0 || armee.getCapaFlood() === 0) {
				var data = { method : 'GET', url : 'mode=MAJ_niveaux&niveaux=[' + niveaux + ']&date_armee=' + date };
				new ZzzelpAjax( ZzzelpScriptModalGuerre.chooseAjaxParam(data, that.pseudo), {
					success : function(valeurs) {
						if(that.Scallback) {
							that.Scallback();
						}
					}
				});
			}
			else {
				document.querySelector('#entete_date_MAJ_armee').style.color = 'red';
				document.querySelector('#entete_date_MAJ_armee').style.fontWeight = 'bold';
			}	
		};
		ligne.appendChild(bouton);
		zone_armee.appendChild(ligne);
	};

	this.addSpacesInput = function(input) {
		input.onkeyup = function onkeyup(event) {
			ze_Ajout_espaces(this);
		};		
	};

	this.getZone = function() {
		return that.zone;
	};

	this.getZoneContenu = function() {
		return that.zone_armee;
	};


	this.init();
}

function ZzzelpScriptZoneEdition(action, pseudo, contenu, ID) {

	var edition = this;

	this.action = action;
	this.pseudo = pseudo;
	this.contenu = contenu;
	this.ID = ID;
	this.raccourcis = new Array(
		{ nom : 'gras', 	title : 'Gras', 			img : 'http://s1.fourmizzz.fr/images/BBCode/bold.png', 		balise : 'b' },
		{ nom : 'italic', 	title : 'Italique', 		img : 'http://s1.fourmizzz.fr/images/BBCode/italic.png',	balise : 'i' },
		{ nom : 'souligne', title : 'Souligné', 		img : 'http://s1.fourmizzz.fr/images/BBCode/underline.png', balise : 'u' }, 
		{ nom : 'centrer', 	title : 'Centrer', 			img : ZzzelpScript.url + '/Images/center.png',					balise : 'center' },
		{ nom : 'droite', 	title : 'Aligner à droite', img : ZzzelpScript.url + '/Images/right.png',						balise : 'right' }, 
		{ nom : 'img', 		title : 'Image', 			img : 'http://s1.fourmizzz.fr/images/BBCode/picture.png',	balise : 'img' }, 
		{ nom : 'url', 		title : 'Lien', 			img : 'http://s1.fourmizzz.fr/images/BBCode/link.png',		balise : 'url' },
		{ nom : 'player', 	title : 'Pseudo', 			img : 'http://s1.fourmizzz.fr/images/BBCode/membre.gif',	balise : 'player' },
		{ nom : 'ally', 	title : 'Alliance', 		img : 'http://s1.fourmizzz.fr/images/BBCode/groupe.gif',	balise : 'ally' },
		{ nom : 'citation', title : 'Citation',			img : 'http://s1.fourmizzz.fr/images/BBCode/citation.png',	balise : 'quote'}
	);

	this.main = function() {
		var zone = document.createElement('div'),
			barre = document.createElement('span'),
			texte = document.createElement('textarea'),
			bouton_envoi = document.createElement('div'),
			zone_erreur = document.createElement('span');
		if(this.contenu) {
			texte.value = this.contenu;
		}
		zone.className = 'nouveau_message';
		zone.dataset.pseudo = this.pseudo;
		barre.className = 'barre_nouveau_message';
		bouton_envoi.className = 'bouton_guerre';
		bouton_envoi.innerHTML = (action == 'create') ? 'Envoyer' : 'Modifier';
		bouton_envoi.setAttribute('style', 'width:120px');
		bouton_envoi.onclick = function onclick(event) {
			edition.send(zone, this.action, this.ID);
		};
		zone_erreur.className = 'zzzelp_zone_erreur';
		for(var k=0; k<edition.raccourcis.length; k++) {
			var raccourci = document.createElement('img');
			if(in_array(edition.raccourcis[k].nom, ['player', 'ally'])) {
				raccourci.setAttribute('height', '15px');
			}
			raccourci.src = edition.raccourcis[k].img;
			raccourci.title = edition.raccourcis[k].title;
			raccourci.dataset.balise = k;
			this.addEventRaccourci(raccourci);
			barre.appendChild(raccourci);
		}
		zone.appendChild(barre);
		zone.appendChild(texte);
		zone.appendChild(zone_erreur);
		zone.appendChild(bouton_envoi);
		this.zone = zone;
	};

	this.addEventRaccourci = function(raccourci) {
		raccourci.onclick = function onclick(event) {
			var balise = raccourcis[event.path[0].dataset.balise].balise;
			if(balise == 'url') {
				if(get_Selection(texte) === '' || get_Selection(texte).substring(0,4) == 'http') {
					var lien = get_Selection(texte);
					MAJ_selection(texte, '[url=' + lien + ']' + lien + '[/url]', true);
					var p1 = get_SelectionLimite(texte, true) + 5 + lien.length + 1;
					var p2 = get_SelectionLimite(texte, false) - 6;
					MAJ_position_curseur(texte, p1, p2);
				} 
				else {
					MAJ_selection(texte, '[url=]'+get_Selection(texte)+'[/url]', true);
					var p = get_SelectionLimite(texte, true) + 5;
					MAJ_position_curseur(texte, p, p);
				}
			}
			else {
				var debut = get_SelectionLimite(texte, true) - balise.length - 2;
				var fin = get_SelectionLimite(texte, false) + balise.length + 3;
				if(texte.value.substring(debut, get_SelectionLimite(texte, true)) == '['+balise+']' && texte.value.substring(get_SelectionLimite(texte, false), fin) == '[/'+balise+']') {
					texte.value = texte.value.substring(0,debut) + get_Selection(texte) + texte.value.substring(fin);
					MAJ_position_curseur(texte, debut, get_Selection(texte, false));
				} 
				else {
					MAJ_selection(texte, '['+balise+']' + get_Selection(texte) + '[/'+balise+']', true);
					MAJ_position_curseur(texte, get_SelectionLimite(texte, true) + 2 + balise.length, get_SelectionLimite(texte, false) - 3 - balise.length);
				}
			}
		};		
	};

	this.get_SelectionLimite = function(input, debut) {
		var emplacement = debut ? input.selectionStart : input.selectionEnd;
		if(typeof emplacement != 'undefined') {
			return emplacement;
		}
	};

	this.get_Selection = function(input) {
		if (input.setSelectionRange)
			return input.value.substring(input.selectionStart, input.selectionEnd);
		else if (document.selection) {
			input.focus();
			return document.selection.createRange().text;
		}
	};

	this.MAJ_position_curseur = function(input, debut, fin) {
		fin = fin || debut; 	
		input.focus();
		if (input.setSelectionRange)
			input.setSelectionRange(debut, fin);
		else if (document.selection) {
			var range = input.createTextRange();
			range.moveStart('character', debut);
			range.moveEnd('character', - input.value.length + fin);
			range.select();
		}
	};

	this.MAJ_selection = function(input, str, keep) {
		input.focus();
		var start = get_SelectionLimite(input, true);
		var stop = get_SelectionLimite(input, false);
		var end = start + str.length;
		var scrollPos = input.scrollTop;
		input.value = input.value.substring(0, start) + str + input.value.substring(stop);
		if(keep) {
			MAJ_position_curseur(input, start, end);
		}
		else {
			MAJ_position_curseur(input, end);
		}
		input.scrollTop = scrollPos;
	};

	this.send = function(zone, action, ID) {
		var message = zone.querySelector('textarea').value;
		if(message === '') {
			zone.querySelector('.zzzelp_zone_erreur').innerHTML = 'Votre message est vide';
		}
		else {
			var form = new FormData();
			form.append('pseudo', zone.dataset.pseudo);
			form.append('contenu', message);
			var data = {
					method : 'POST',
					force : 1,
					url : 'mode=stockage_message&action=' + action + ((typeof ID == 'undefined') ? '' : '&ID_message=' + ID),
					data : form
			};
			zone.querySelector('.zzzelp_zone_erreur').innerHTML = '';
			new ZzzelpAjax( ZzzelpScriptModalGuerre.chooseAjaxParam(data, edition.pseudo),
				{ success : function(data) {
					var message;
					if(action == 'create') {
						zone.querySelector('textarea').value = '';
						if(document.querySelectorAll('.conversation_zzzelp .post_guerre').length > 0) {
							message = new ZzzelpScriptMessageGuerre(data, 'message', edition.pseudo).ligne_message;
							var	el = document.querySelector('.conversation_zzzelp .post_guerre');
							document.querySelector('.conversation_zzzelp').insertBefore(message, el);
						}
						else {
							document.querySelector('.conversation_zzzelp').appendChild(new ZzzelpScriptMessageGuerre(data, 'message', edition.pseudo).ligne_message);
						}
					}
					else {
						message = document.querySelector('.post_guerre[data-numero="' + ID + '"]');
						message.querySelector('.zzzelp_corps_message').style.display = '';
						message.querySelector('.zzzelp_barre_edit').style.display = '';
						message.querySelector('.zzzelp_corps_message').innerHTML = ze_BBcode_to_HTML(message.querySelector('textarea').value);
						ze_Supprimer_element(message.querySelector('.nouveau_message'));
					}
				}
			});	
		}
	};

	this.main();
}

function ZzzelpScriptMessageGuerre(data, type, pseudo) {

	this.data = data;
	this.type = type;
	this.pseudo = pseudo;

	var message = this;

	this.main = function() {
		var ligne_message = document.createElement('div'),
			entete_message = document.createElement('div'),
			contenu_message = document.createElement('div'),
			date_message = document.createElement('span'),
			coordonnees_message = document.createElement('span');

		ligne_message.className = this.type + '_guerre post_guerre';
		entete_message.className = 'entete_message';
		ligne_message.appendChild(entete_message);
		if(this.type != 'RC' || this.data.mode == 'RC') {
			contenu_message.className = 'contenu_message';
			ligne_message.appendChild(contenu_message);
			contenu_message.setAttribute('style', 'display:none');
			entete_message.setAttribute('style', 'cursor:pointer');
			entete_message.onclick = function onclick(event) {
				this.nextSibling.style.display = (this.nextSibling.style.display == 'none') ? '' : 'none';
			};
		}

		entete_message.appendChild(coordonnees_message);
		entete_message.appendChild(date_message);
		
		this.ligne_message = ligne_message;
		this.contenu_message = contenu_message;
		this.coordonnees_message = coordonnees_message;
		this.date_message = date_message;

		if(this.type == 'message') {
			this.createMessage();
		}
		else if(this.type == 'RC') {
			this.createRC();
		}
		else if(this.type == 'variation') {
			this.createVariation();
		}
		else if(this.type == 'correspondance') {
			this.createCorrespondance();
		}
	};

	this.createMessage = function() {
		if(this.data.gestion) {
			var barre_modif = document.createElement('div'),
				bouton_edit = document.createElement('img'),
				bouton_delete = document.createElement('img');
			barre_modif.className = 'zzzelp_barre_edit';
			bouton_edit.src = ZzzelpScript.url + '/Images/edit.png';
			bouton_delete.src = ZzzelpScript.url + '/Images/suppression.png';
			bouton_edit.onclick = function onclick(event) {
				message.edit(message.dataset.numero, 'modifier');
			};
			bouton_delete.onclick = function onclick(event) {
				message.edit(message.dataset.numero, 'supprimer');
			};

			barre_modif.appendChild(bouton_edit);
			barre_modif.appendChild(bouton_delete);
			message.contenu_message.appendChild(barre_modif);
		}
		var corps_message = document.createElement('div');
		corps_message.className = 'zzzelp_corps_message';
		corps_message.innerHTML = ze_BBcode_to_HTML(this.data.contenu, this.data.serveur);
		message.coordonnees_message.innerHTML = this.data.posteur + ' - ' + this.data.alliance;
		message.date_message.innerHTML = ze_Generation_date_v1(this.data.date_stockage, true);
		message.ligne_message.dataset.type_data = 'message';
		message.ligne_message.dataset.numero = this.data.ID;
		message.ligne_message.dataset.pseudo = this.data.posteur;
		message.contenu_message.appendChild(corps_message);
	};

	this.createRC = function() {
		var analyse = JSON.parse(this.data.analyse),
			RC = this.data.RC.replace(/"Membre.php\?Pseudo=(.*?)"/g, 'http://' + ze_Analyser_URL('serveur') + '.fourmizzz.fr/Membre.php?Pseudo=$1'),
			zone_analyse = this.zoneAnalyse(this.data);
		if(this.data.mode == 'RC') {
			var corps_message = document.createElement('div'),
				analyseur = new ZzzelpScriptRC(message.pseudo);
			corps_message.innerHTML = RC;
			message.contenu_message.appendChild(corps_message);
			message.contenu_message.appendChild(analyseur.prepareZoneHOF(analyse, RC));
			message.ligne_message.dataset.type_data = 'combat_' + ((this.data.position == 'defenseur') ? 'def' : 'att');
		}
		else {
			message.ligne_message.dataset.type_data = 'flood';
		}
		var titre = (analyse.rebellion ? 'Rebellion' : ((this.data.mode == 'flood') ? 'Flood' : 'RC')) + ' ';
		if(this.data.position_joueur == 'attaquant') {
			titre += (analyse.rebellion ? 'chez ' : 'sur ') + ((this.data.defenseur !== '') ? this.data.defenseur : 'inconnu');
		}
		else {
			titre += 'de ' + ((this.data.attaquant !== '') ? this.data.attaquant : 'inconnu');
		}
		if(!analyse.rebellion) {
			titre += ' - ' + ((this.data.mode == 'RC') ? ['TDC', 'Dôme', 'Loge'][analyse.lieu] : ze_Nombre(analyse.valeur) + ' cm²');
		}
		message.coordonnees_message.innerHTML = titre;
		message.date_message.innerHTML = ze_Generation_date_v1(this.data.date_RC, true);		
	};

	this.createVariation = function() {
		message.coordonnees_message.innerHTML = 'Traceur : Variation';
		message.date_message.innerHTML = ze_Generation_date_v1(this.data.date_mini, true);
		var lignes = new Array(
							{ titre : 'Position de ' + this.data.pseudo, valeur : (parseInt(this.data.valeur_apres) > parseInt(this.data.valeur_avant)) ? 'Attaquant' : 'Défenseur' },
							{ titre : 'Date minimale', valeur : ze_Generation_date_v1(this.data.date_mini, true) },
							{ titre : 'Date maximale', valeur : ze_Generation_date_v1(this.data.date_maxi, true) },
							{ titre : 'Valeur de la variation', valeur : ze_Nombre(Math.abs(parseInt(this.data.valeur_apres) - parseInt(this.data.valeur_avant))) },
							{ titre : 'TDC avant la variation', valeur : ze_Nombre(parseInt(this.data.valeur_avant)) },
							{ titre : 'TDC après la variation', valeur : ze_Nombre(parseInt(this.data.valeur_apres)) }
						);
		for(var i=0; i<lignes.length; i++) {
			var ligne = document.createElement('div'),
				span = document.createElement('span'),
				input = document.createElement('span');
			ligne.className = 'ligne_cadre_structure';
			span.innerHTML = lignes[i].titre + ' :';
			input.innerHTML =	lignes[i].valeur;
			input.className = 'input_fige';
			ligne.appendChild(span);
			ligne.appendChild(input);
			message.contenu_message.appendChild(ligne);
		}
		message.ligne_message.dataset.type_data = 'traceur';		
	};

	this.createCorrespondance = function() {
		var lignes;
		if(this.data.cible !== '') {
			message.coordonnees_message.innerHTML = 'Traceur : Attaque ' + ((this.data.attaquant == this.data.pseudo) ? (' sur ' + this.data.cible) : ' de ' + this.data.attaquant);
			lignes = new Array(
				{ titre : 'Position de ' + this.data.pseudo, valeur : (this.data.attaquant == this.data.pseudo) ? 'Attaquant' : 'Défenseur' },
				{ titre : 'Date minimale', valeur : ze_Generation_date_v1(this.data.date_mini, true) },
				{ titre : 'Date maximale', valeur : ze_Generation_date_v1(this.data.date_maxi, true) },
				{ titre : 'Valeur de la variation', valeur : ze_Nombre(parseInt(this.data.valeur)) },
				{ titre : 'TDC de ' + this.data.attaquant + ' avant', valeur : ze_Nombre(parseInt(this.data.TDC_avant_att)) },
				{ titre : 'TDC de ' + this.data.attaquant + ' après', valeur : ze_Nombre(parseInt(this.data.TDC_apres_att)) },
				{ titre : 'TDC de ' + this.data.cible + ' avant', valeur : ze_Nombre(parseInt(this.data.TDC_avant_def)) },
				{ titre : 'TDC de ' + this.data.cible + ' après', valeur : ze_Nombre(parseInt(this.data.TDC_apres_def)) }
			);		
		}
		else {
			message.coordonnees_message.innerHTML = 'Chasse de ' + ze_Nombre(parseInt(this.data.valeur)) + ' cm²';
			lignes = new Array(
				{ titre : 'Date minimale', valeur : ze_Generation_date_v1(this.data.date_mini, true) },
				{ titre : 'Date maximale', valeur : ze_Generation_date_v1(this.data.date_maxi, true) },
				{ titre : 'Valeur de la variation', valeur : ze_Nombre(parseInt(this.data.valeur)) },
				{ titre : 'TDC de ' + this.data.attaquant + ' avant', valeur : ze_Nombre(parseInt(this.data.TDC_avant_att)) },
				{ titre : 'TDC de ' + this.data.attaquant + ' après', valeur : ze_Nombre(parseInt(this.data.TDC_apres_att)) }
			);
		}		
		message.date_message.innerHTML = ze_Generation_date_v1(this.data.date_mini, true);
		for(var i=0; i<lignes.length; i++) {
			var ligne = document.createElement('div'),
				span = document.createElement('span'),
				input = document.createElement('span');
			ligne.className = 'ligne_cadre_structure';
			span.innerHTML = lignes[i].titre + ' :';
			input.innerHTML =	lignes[i].valeur;
			input.className = 'input_fige';
			ligne.appendChild(span);
			ligne.appendChild(input);
			message.contenu_message.appendChild(ligne);
		}
		message.ligne_message.dataset.type_data = 'traceur';		
	};

	this.edit = function(ID, action) {
		var ligne_message = document.querySelector('.post_guerre[data-numero="' + ID + '"]');
		if(action == 'modifier') {
			var contenu = ligne_message.querySelector('.contenu_message'), 
				corps = ligne_message.querySelector('.zzzelp_corps_message'),
				barre = ligne_message.querySelector('.zzzelp_barre_edit');
			corps.style.display = 'none';
			barre.style.display = 'none';
			contenu.appendChild(new ZzzelpScriptZoneEdition('edit', ligne_message.dataset.pseudo, ze_HTML_to_BBcode(corps.innerHTML), ligne_message.dataset.numero).zone);
		}
		else if(action == 'supprimer') {
			var data = { method : 'GET', force : mode, url : 'mode=stockage_message&action=delete&ID_message=' + ID + '&' };
			new ZzzelpAjax( ZzzelpScriptModalGuerre.chooseAjaxParam(data, message.pseudo),
				{ success : function(valeurs) {
					ze_Supprimer_element(ligne_message);
				}
			});		
		}
	};

	this.zoneAnalyse = function(data) {
		var zone = document.createElement('div'),
			donnees = [];
		return zone;
	};

	this.main();
}


function Generation_zone_combat(pseudo, valeurs, afficher, FI) {
	FI = (typeof FI == 'undefined') ? false : FI;
	var zone = document.createElement('div'),
		entete_combat = document.createElement('div'),
		zone_combat = document.createElement('div'),
		zone_loge = document.createElement('div');
	if(!FI) {
		entete_combat.className = 'entete_menu_cache';
		entete_combat.innerHTML = ' Préparer un combat ';
		entete_combat.onclick = function onclick(event) {
			this.nextSibling.style.display = (this.nextSibling.style.display == 'none') ? '' : 'none';
		};
		zone.appendChild(entete_combat);
	}
	zone_combat.setAttribute('style', 'display:' + (afficher ? '' : 'none'));
	zone_combat.className = 'zzzelp_section_fenetre';

	zone_combat.appendChild(Generation_zone_combat_lieu(pseudo, valeurs, valeurs.simulations.dome, 'Simulation'));
	zone_combat.appendChild(Generation_zone_combat_lieu(pseudo, valeurs, valeurs.optimisations.dome, 'Optimisation'));
	zone_combat.appendChild(Generation_zone_combat_lieu(pseudo, valeurs, valeurs.simulations.loge, 'Simulation'));
	zone_combat.appendChild(Generation_zone_combat_lieu(pseudo, valeurs, valeurs.optimisations.loge, 'Optimisation'));

	zone.appendChild(zone_combat);
	return zone;

	function Generation_zone_combat_lieu(pseudo, valeurs, simulation, mode) {
		var zone = document.createElement('div'),
			entete = document.createElement('div'),
			zone_RC = document.createElement('div');
		entete.innerHTML = '<span>' + mode + ' en ' + ((simulation.lieu == 1) ? 'Dôme' : 'Loge') + '</span><span><a target="_BLANK" href="' + ZzzelpScript.url + '/' + simulation.url + '">Modifier la simulation</a>';
		if(simulation.erreur !== null) {
			zone_RC.innerHTML = simulation.erreur;
		}
		else {
			var warnings = document.createElement('div'),
				contenu_RC = document.createElement('div'),
				niveaux = new Array(
								{ nom : 'Armes', id : 'armes' },
								{ nom : 'Bouclier', id : 'bouclier' },
								{ nom : ((simulation.lieu == 1) ? 'Dôme' : 'Loge'), id : ((simulation.lieu == 1) ? 'dome' : 'loge') }
						);
			warnings.setAttribute('style', 'font-style: italic;color: red;line-height: 2em;text-align: center;');
			for(var i=0; i<niveaux.length; i++) {
				if(valeurs.niveaux[niveaux[i].id] === '0' && valeurs.niveaux_probables[niveaux[i].id] > 0) {
					warnings.innerHTML += 'Niveau de ' + niveaux[i].nom + ' inconnu, Zzzelp a utilisé un ' + niveaux[i].nom + ' ' + valeurs.niveaux_probables[niveaux[i].id] + '<br>';
				}
			}
			contenu_RC.innerHTML = simulation.RC;
			zone_RC.appendChild(warnings);
			zone_RC.appendChild(contenu_RC);
		}
		zone.className = 'simulation_RC';
		entete.className = 'entete_simulation_RC';
		zone_RC.className = 'contenu_simulation_RC';
		zone_RC.setAttribute('style', 'display:none');
		entete.setAttribute('style', 'cursor:pointer');
		entete.onclick = function onclick(event) {
			this.nextSibling.style.display = (this.nextSibling.style.display == 'none') ? '' : 'none';
		};
		zone.appendChild(entete);
		zone.appendChild(zone_RC);
		return zone;
	}
}




function ZzzelpScriptAideSynchro(utilisateur, pseudo, valeurs, TDC, afficher, FI) {
	var that = this;

	this.FI = (typeof FI == 'undefined') ? false : FI;
	this.zone_modal = this.FI ? document.querySelector('#forum') : document.querySelector('.modal_zzzelp');
	this.pseudo = pseudo;
	this.serveur = that.zone_modal.dataset.serveur;

	this.main = function() {
		if(that.serveur == 's1') {
			that.alliances_conflit = new Array('ZOO', 'CDF', 'FP', '-NBW-', 'SFNL', 'RdFB', '-VIP');
		}
		else if(that.serveur == 's2') {
			that.alliances_conflit = new Array('FCGB', 'OS');
		}
		else {
			that.alliances_conflit = [];
		}
		that.createZone();
		that.step1();
		that.step2();
		that.step3();
	};

	this.createZone = function() {
		var zone = document.createElement('div'),
			titre_synchro = document.createElement('div'),
			zone_synchro = document.createElement('div');

		zone_synchro.id = 'zone_synchro_guerre';
		zone_synchro.setAttribute('style', 'display:' + (afficher ? '' : 'none'));
		zone_synchro.className = 'zzzelp_section_fenetre';
		if(!FI) {
			titre_synchro.className = 'entete_menu_cache';
			titre_synchro.innerHTML = ' Aide pour synchroniser ';
			titre_synchro.onclick = function onclick(event) {
				this.nextSibling.style.display = (this.nextSibling.style.display == 'none') ? '' : 'none';
			};
			zone.appendChild(titre_synchro);
		}
		zone.appendChild(zone_synchro);	

		this.zone = zone;
		this.zone_synchro = zone_synchro;
	};

	this.step1 = function() {
		var zone_parametres = document.createElement('div'),
			entete_sonde = document.createElement('div'),
			textarea = document.createElement('textarea'),
			bouton = document.createElement('a'),
			parametres = new Array(
				{ nom : 'Temps de ponte', valeur : valeurs.niveaux.tdp, id : 'tdp_synchro', type : 'input_niveau' }
		);
		entete_sonde.innerHTML = 'Etapes 1 : Calcul de l\'heure de départ';
		entete_sonde.setAttribute('style', 'font-weight:bold;line-height: 3em;');

		zone_parametres.className = 'zzzelp_parametres_synchro';

		for(var i=0; i<parametres.length; i++) {
			var ligne = document.createElement('div'),
				span = document.createElement('span'),
				input = document.createElement('input');
			ligne.className = 'zzzelp_parametres_tdp';
			span.innerHTML = parametres[i].nom + ' :';
			input.value = parametres[i].valeur;
			input.className = 'input_haut ' + parametres[i].type;
			input.id = parametres[i].id;
			ligne.appendChild(span);
			ligne.appendChild(input);
			zone_parametres.appendChild(ligne);
		}

		textarea.setAttribute('placeholder', 'Sonde suivant le départ de son armée');
		textarea.setAttribute('style', 'width: 60%;height: 200px;margin: auto;display: block;');
		bouton.className = 'bouton_guerre';
		bouton.innerHTML = 'Calculer le départ';
		bouton.setAttribute('style', 'width: 170px;');

		bouton.onclick = function onclick(event) {
			var donnees = new ZzzelpScriptRC(that.pseudo).HOF(textarea.value, true);
			if(donnees.length > 0) {
				var depart = donnees[0].valeurs.date - donnees[0].valeurs.defenseur.armee.statistiques.HOF * Math.pow(0.9, parseInt(that.zone_synchro.querySelector('#tdp_synchro').value));
				that.zone_synchro.querySelector('#heure_depart_synchro').value = ze_Generation_date_v1(depart, true, true);
			}
		};

		that.zone_synchro.appendChild(entete_sonde);
		that.zone_synchro.appendChild(zone_parametres);
		that.zone_synchro.appendChild(textarea);
		that.zone_synchro.appendChild(bouton);
	};

	this.step2 = function() {
		var zone_parametres = document.createElement('div'),
			entete_parametres = document.createElement('div'),
			zone_synchro_2 = document.createElement('div'),
			parametres = new Array(
				{ nom : 'Heure du départ', valeur : ze_Generation_date_v1(time(), true, true), id : 'heure_depart_synchro', type : 'input_tableau' },
				{ nom : 'Terrain du joueur', valeur : ze_Nombre(parseInt(TDC)), id : 'TDC_joueur', type : 'input_tableau' },
				{ nom : 'Alliances attaquables', valeur : that.alliances_conflit, id : 'alliances_attaquables', type : 'input_tableau' },
				{ nom : 'Vitesse d\'attaque', valeur : valeurs.niveaux.vitesse_attaque, id : 'vitesse_attaque_synchro', type : 'input_niveau' }
		);
		entete_parametres.innerHTML = 'Etapes 2 : Calcul des cibles potentielles';
		entete_parametres.setAttribute('style', 'font-weight:bold;line-height: 3em;');

		that.zone_synchro.appendChild(entete_parametres);
		zone_parametres.className = 'zzzelp_parametres_synchro';
		zone_synchro_2.className = 'zzzelp_synchro_etape_2';

		for(var i=0; i<parametres.length; i++) {
			var ligne = document.createElement('div'),
				span = document.createElement('span'),
				input = document.createElement('input');
			ligne.className = 'ligne_cadre_structure';
			span.innerHTML = parametres[i].nom + ' :';
			input.value = parametres[i].valeur;
			input.className = 'input_haut ' + parametres[i].type;
			input.id = parametres[i].id;
			ligne.appendChild(span);
			ligne.appendChild(input);
			zone_parametres.appendChild(ligne);
		}

		that.zone_synchro.appendChild(zone_parametres);

		var bouton = document.createElement('a');
		bouton.className = 'bouton_guerre';
		bouton.setAttribute('style', 'width: 100px;');
		bouton.innerHTML = 'Calculer';
		bouton.onclick = function onclick(event) {
			var depart = ze_Date_to_timestamp_v1(document.querySelector('#heure_depart_synchro').value);
			if(~url.indexOf('fourmizzz.fr/')) {
				var alliances = that.zone_modal.querySelector('#alliances_attaquables').value.replace(/ /g, '').split(',');
				that.getTDCTarget(depart, that.getRetourSynchro, alliances, true);
			}
			else {
				that.getRetourSynchro(donnees.joueurs, depart);
			}
		};
		that.zone_synchro.appendChild(bouton);
		that.zone_synchro.appendChild(zone_synchro_2);

		autocompletion(zone_parametres.querySelector('#alliances_attaquables'), { mode : 'alliance', serveur : that.serveur, multiple : true });
	};

	this.step3 = function() {
		var zone_parametres = document.createElement('div'),
			entete_parametres = document.createElement('div'),
			parametres = new Array(
				{ nom : 'Heure de l\'impact', valeur : ze_Generation_date_v1(time(), true, true), id : 'heure_impact_synchro', type : 'input_tableau' },
				{ nom : 'Alliances pouvant aider', valeur : that.alliances_conflit, id : 'alliances_alliees_synchro', type : 'input_tableau' },
				{ nom : 'Vitesse d\'attaque', valeur : 0, id : 'vitesse_attaque_synchro_2', type : 'input_niveau' }
		);
		entete_parametres.innerHTML = 'Etapes 3 : Calcul des joueurs pouvant l\'avoir :';
		entete_parametres.setAttribute('style', 'font-weight:bold;line-height: 3em;');
	
		that.zone_synchro.appendChild(entete_parametres);

		zone_parametres.className = 'zzzelp_parametres_synchro';

		for(var i=0; i<parametres.length; i++) {
			var ligne = document.createElement('div'),
				span = document.createElement('span'),
				input = document.createElement('input');
			ligne.className = 'ligne_cadre_structure';
			span.innerHTML = parametres[i].nom + ' :';
			input.value = parametres[i].valeur;
			input.className = 'input_haut ' + parametres[i].type;
			input.id = parametres[i].id;
			ligne.appendChild(span);
			ligne.appendChild(input);	
			zone_parametres.appendChild(ligne);
		}

		var continuer = document.createElement('div');
		continuer.innerHTML = 'Calculer';
		continuer.setAttribute('style', 'width:150px');
		continuer.className = 'bouton_guerre';
		continuer.id = 'zzzelp_bouton_synchro';
		continuer.onclick = function onclick(event) {
			var depart = ze_Date_to_timestamp_v1(document.querySelector('#heure_impact_synchro').value);
			if(~url.indexOf('fourmizzz.fr/')) {
				var alliances = that.zone_modal.querySelector('#alliances_alliees_synchro').value.replace(/ /g, '').split(',');
				that.getTDCTarget(depart, that.getHeureLancementSynchro, alliances, FI);
			}
			else {
				that.getHeureLancementSynchro(donnees.joueurs, depart);
			}
		};
			
		that.zone_synchro.appendChild(zone_parametres);
		that.zone_synchro.appendChild(continuer);

		var zone_etape_3 = document.createElement('div');
		zone_etape_3.className = 'zzzelp_synchro_etape_3';
		zone_etape_3.dataset.pseudo = ''; //ligne.cells[0].innerHTML;
		zone_etape_3.dataset.impact = ''; //ligne.dataset.retour;
		that.zone_synchro.appendChild(zone_etape_3);

		autocompletion(zone_parametres.querySelector('#alliances_alliees_synchro'), { mode : 'alliance', serveur : that.serveur, multiple : true });	
	};

	this.getTDCTarget = function(depart, fonction, alliances, FI) {
		new ZzzelpAjax(({ method : 'GET', domain : 'fourmizzz', url : 'Membre.php?Pseudo=' + that.zone_modal.dataset.pseudo, addDOM : true }),
			{ success : function(zone_page) {
				var pseudo = that.zone_modal.dataset.pseudo,
					TDC = parseInt(zone_page.querySelector('.tableau_score').rows[1].cells[1].innerHTML.replace(/ /g, '')),
					alliance = zone_page.querySelector('.boite_membre table a').innerHTML,
					coordonnees = new RegExp('x=([0-9]+) et y=([0-9]+)').exec(zone_page.querySelector('a[href*="carte2.php?x="]').innerHTML),
					joueurs = {};
				joueurs[pseudo] = { 
						TDC : TDC, 
						alliance : alliance, 
						x : parseInt(coordonnees[1]), 
						y : parseInt(coordonnees[2]) 
				};
				that.getTDCPlayers(joueurs, depart, 1, fonction, alliances);
			}
		});
	};

	this.getOldTDCPlayers = function(joueurs, depart, n, fonction, attaque) {
		var utilisateur = that.zone_modal.dataset.pseudo,
			contentType = 'application/x-www-form-urlencoded';
			data = 'etat=tous&terrain_max=' + parseInt(joueurs[utilisateur].TDC * (attaque ? 3 : 2));
		data += '&fourmiliere_attaquable=true&terrain_min=' + parseInt(joueurs[utilisateur].TDC / (attaque ? 2 : 3)) + '&page=' + n;
		new ZzzelpAjax(({ method : 'POST', domain : 'fourmizzz', url : 'ennemie.php', addDOM : true, data : data, contentType : contentType }),
			{ success : function(zone_page) {
				var pseudo;
				if(zone_page.querySelectorAll('#tabEnnemie').length > 0) {
					var lignes = zone_page.querySelector('#tabEnnemie').rows;
					for(var i=1; i<lignes.length; i++) {
						pseudo = lignes[i].cells[1].querySelector('a').innerHTML;
						if(pseudo != utilisateur) {
							joueurs[pseudo] = {
								alliance : ((lignes[i].cells[0].querySelectorAll('a').length > 0) ? lignes[i].cells[0].querySelector('a').innerHTML : ''),
								TDC : parseInt(lignes[i].cells[3].innerHTML.replace(/ /g, ''))
										};
						}
					}
					that.getTDCPlayers(joueurs, depart, (n+1), fonction, attaque, utilisateur);
				}
				else {
					var pseudos = [];
					for (pseudo in joueurs) {
						pseudos.push(pseudo);
					}
					new ZzzelpScriptCoordonnees(pseudos, [], function(coordonnees) {
						fonction(joueurs, depart, coordonnees);
					});
				}
			}
		});
	};

	this.getTDCPlayers = function(joueurs, depart, n, fonction, alliances) {
		new ZzzelpScriptTraceur({ alliances : alliances, joueurs : [] }, function(valeurs) {
			var joueur;
			for(var i=0; i<valeurs.alliances.length; i++) {
				var alliance = valeurs.alliances[i].alliance;
				for(var j=0; j<valeurs.alliances[i].valeurs.length; j++) {
					joueur = valeurs.alliances[i].valeurs[j];
					valeurs.joueurs.push({ pseudo : joueur.pseudo, TDC : joueur.TDC, alliance : alliance });
				}
			}
			var pseudos = [];
			for(i=0; i<valeurs.joueurs.length; i++) {
				joueur = valeurs.joueurs[i];
				pseudos.push(joueur.pseudo);
				if(joueur.pseudo != utilisateur) {
					joueurs[joueur.pseudo] = {
						alliance : joueur.alliance,
						TDC : joueur.TDC
					};
				}
			}
			new ZzzelpScriptCoordonnees(pseudos, [], function(coordonnees) {
				fonction(joueurs, depart, coordonnees);
			});
		});	
	};

	that.getRetourSynchro = function(joueurs, depart, coordonnees) {
		var pseudo;
		if(~url.indexOf('fourmizzz.fr/')) {
			for(pseudo in joueurs) {
				var placement = coordonnees[pseudo];
				joueurs[pseudo].x = placement.x;
				joueurs[pseudo].y = placement.y;
			}
		}
		var utilisateur = that.pseudo,
			VA = parseInt(document.querySelector('#vitesse_attaque_synchro').value),
			alliances = that.zone_modal.querySelector('#alliances_attaquables').value.replace(/ /g, ''),
			possibles = [],
			TDC_1 = joueurs[utilisateur].TDC, TDC_2;
		alliances = (alliances in ['', '*']) ? [] : alliances.split(',');
		for(pseudo in joueurs) {
			TDC_2 = joueurs[pseudo].TDC;
			if(pseudo != utilisateur && TDC_2 < TDC_1 * 3 && TDC_2 > TDC_1 / 2) {
				if(alliances.length === 0 || (joueurs[pseudo].alliance !== '' && ~alliances.indexOf(joueurs[pseudo].alliance))) {
					var distance = ze_Calcul_distance(joueurs[utilisateur].x, joueurs[utilisateur].y, joueurs[pseudo].x, joueurs[pseudo].y),
						duree = ze_Calcul_temps_trajet(distance, VA);
					possibles.push({ pseudo : pseudo, alliance : joueurs[pseudo].alliance, duree : duree, retour : (depart + duree), TDC : joueurs[pseudo].TDC });
				}
			}
		}
		console.log(possibles);
		possibles.sort(function (a, b) {
		    if (a.duree > b.duree)
		      return 1;
		    if (a.duree < b.duree)
		      return -1;
		    return 0;
		});

		document.querySelector('.zzzelp_synchro_etape_2').innerHTML = '';
		document.querySelector('.zzzelp_synchro_etape_3').innerHTML = '';

		if(possibles.length === 0) {
			document.querySelector('.zzzelp_synchro_etape_2').innerHTML = '<center>Aucune cible ne correspond</center>';
		}
		else {
			that.createTableTargetRetour(possibles);
			document.querySelector('#heure_impact_synchro').value = ze_Generation_date_v1(possibles[0].retour, true, true);
		}
	};

	this.createTableTargetRetour = function(possibles) {
		var tableau = document.createElement('table'),
			entete = tableau.insertRow(0),
			colonnes = new Array(
				{ nom : 'Pseudo' },
				{ nom : 'Alliance' },
				{ nom : 'Trajet' },
				{ nom : 'Impact' },
				{ nom : '' }
		);
		tableau.id = 'zzzelp_tableau_synchro';
		for(var i=0; i<colonnes.length; i++) {
			var colonne = document.createElement('th');
			colonne.innerHTML = colonnes[i].nom;
			entete.appendChild(colonne);
		}
		for(i=0; i<possibles.length; i++) {
			var ligne = tableau.insertRow(-1),
				pseudo = ligne.insertCell(0),
				alliance = ligne.insertCell(1),
				duree = ligne.insertCell(2),
				retour = ligne.insertCell(3),
				cocher = ligne.insertCell(4),
				radio_button = document.createElement('input');
			ligne.dataset.retour = possibles[i].retour;
			ligne.dataset.TDC = possibles[i].TDC;
			pseudo.innerHTML = possibles[i].pseudo;
			alliance.innerHTML = possibles[i].alliance;
			duree.innerHTML = ze_Secondes_date(possibles[i].duree);
			retour.innerHTML = ze_Generation_date_precise(possibles[i].retour);
			radio_button.type = 'radio';
			radio_button.name = 'zzzelp_radio_synchro';
			that.addEventHeureLancement(radio_button);
			cocher.appendChild(radio_button);
		}
		document.querySelector('.zzzelp_synchro_etape_2').appendChild(tableau);
		tableau.querySelector('input[type="radio"]').checked = true;		
	};

	this.addEventHeureLancement = function(radio_button) {
		radio_button.onclick = function onclick(event) {
			document.querySelector('#heure_impact_synchro').value = ze_Generation_date_v1(this.parentNode.parentNode.dataset.retour, true, true);
		};		
	};

	this.getHeureLancementSynchro = function(joueurs, depart, coordonnees) {
		var pseudo, duree;
		if(~url.indexOf('fourmizzz.fr/')) {
			for(pseudo in joueurs) {
				var placement = coordonnees[pseudo];
				joueurs[pseudo].x = placement.x;
				joueurs[pseudo].y = placement.y;
			}
		}
		var utilisateur = that.zone_modal.dataset.pseudo,
			retour = ze_Date_to_timestamp_v1(document.querySelector('#heure_impact_synchro').value),
			VA = parseInt(document.querySelector('#vitesse_attaque_synchro_2').value),
			alliances = that.zone_modal.querySelector('#alliances_alliees_synchro').value.replace(/ /g, ''),
			possibles = [],
			TDC_1 = joueurs[utilisateur].TDC, TDC_2;
		alliances = (alliances in ['', '*']) ? [] : alliances.split(',');
		for(pseudo in joueurs) {
			TDC_2 = joueurs[pseudo].TDC;
			if(pseudo != utilisateur && TDC_2 < TDC_1 * 2 && TDC_2 > TDC_1 / 3) {
				if(alliances.length === 0 || (joueurs[pseudo].alliance !== '' && joueurs[pseudo].alliance in alliances)) {
					var distance = ze_Calcul_distance(joueurs[utilisateur].x, joueurs[utilisateur].y, joueurs[pseudo].x, joueurs[pseudo].y);
					duree = ze_Calcul_temps_trajet(distance, VA);
					if((retour - duree) > time()) {
						possibles.push({ 
							pseudo : pseudo, 
							alliance : joueurs[pseudo].alliance, 
							duree : duree, 
							lancement : (retour - duree), 
							TDC : joueurs[pseudo].joueur
						});
					}
				}
			}
		}
		possibles.sort(function (a, b) {
		    if (a.duree > b.duree)
		      return 1;
		    if (a.duree < b.duree)
		      return -1;
		    return 0;
		});

		document.querySelector('.zzzelp_synchro_etape_3').innerHTML = '';

		if(possibles.length === 0) {
			document.querySelector('.zzzelp_synchro_etape_3').innerHTML = '<center>Aucun allié ne peut arriver à temps</center>';
		}
		else {
			var tableau = document.createElement('table'),
				entete = tableau.insertRow(0),
				colonnes = new Array(
								{ nom : 'Pseudo' },
								{ nom : 'Alliance' },
								{ nom : 'Trajet' },
								{ nom : 'Lancement' }
							);
			tableau.id = 'zzzelp_tableau_synchro_2';
			for(var i=0; i<colonnes.length; i++) {
				var colonne = document.createElement('th');
				colonne.innerHTML = colonnes[i].nom;
				entete.appendChild(colonne);
			}
			for(i=0; i<possibles.length; i++) {
				var ligne = tableau.insertRow(-1);
				pseudo = ligne.insertCell(0);
				var	alliance = ligne.insertCell(1);
				duree = ligne.insertCell(2);
				var	lancement = ligne.insertCell(3);
				pseudo.innerHTML = possibles[i].pseudo;
				alliance.innerHTML = possibles[i].alliance;
				duree.innerHTML = ze_Secondes_date(possibles[i].duree);
				lancement.innerHTML = ze_Generation_date_precise(possibles[i].lancement);
			}
			document.querySelector('.zzzelp_synchro_etape_3').appendChild(tableau);
		}
	};

	this.getZone = function() {
		return this.zone;
	};


	this.main();
}

function ze_Ajout_raccourci_modal_profil() {
	document.querySelector('.boite_membre a[href*="commerce.php"]').parentNode.innerHTML = '- <a onclick="ze_Modal_guerre(\'' + document.querySelector('center h2').innerHTML + '\');return false" href="">Aide de guerre Zzzelp</a><br>' + document.querySelector('.boite_membre a[href*="commerce.php"]').parentNode.innerHTML;
}

function MAJ_niveau_joueur(pseudo, nom, valeur, img) {
	var url_ajax = 'guerre_script?mode=stockage_niveau&cible=' + pseudo + '&niveau=' + nom + '&valeur=' + valeur + '&';
	new ZzzelpAjax({ method : 'GET', domain : 'zzzelp', url : url_ajax },
		{ success : function(valeurs) {
			img.src = ZzzelpScript.url + '/Images/valider.png';
		}
	});
}

function FIGuerre(mode, variable) {
	var obj = this;

	var p = 'Bienvenue dans le guide d\'utilisation de ce forum de guerre amélioré.\n\n\n[b]Maintien des posts à jour :[/b]\n\n';
	p += 'Les sujets concernant un joueur adverse vont se mettre automatiquement à jour quand un utilisateur ayant ZzzelpScript les visitera. ';
	p += 'Il est donc important de ne [b]JAMAIS[/b] modifier manuellement ces posts ou même les renommer. ';
	p += 'Si vous n’avez pas ZzzelpScript, postez simplement vos modifications à appliquer dans un nouveau message et un autre joueur s’occupera de les rapporter sur Zzzelp.\n\n\n\n';
	p += '[b]Import des combats à partir de la messagerie (ZzzelpScript requis) :[/b]\n\n';
	p += 'Si vous avez ZzzelpScript d’actif, le simple fait d’ouvrir un combat dans la messagerie devrait suffire à le stocker sur le forum. ';
	p += 'Je vous conseille cependant de vérifier de temps en temps que c’est bien le cas.\n\n\n\n';
	p += '[b]Tri des posts (ZzzelpScript requis) :[/b]\n\n';
	p += 'Si vous avez ZzzelpScript d’actif, vous devriez être capable de trier les posts selon les conditions suivantes :\n';
	p += '-	Dernier message\n-	Ordre alphabétique\n-	Force de Frappe\n-	Vie en dôme\n-	Vie en loge\n\n\n\n';
	p += '[b]Statistiques du conflit :[/b]\n\n';
	p += 'Le post [i]Statistiques du conflit[/i] recense un certain nombre de valeurs permettant de mieux évaluer l’avancement du conflit. ';
	p += 'Ce post se met à jour en un clic grâce à Zzzelp.';
	p += 'Pour que les données récoltées soient les plus précises possibles, essayez de bien rentrer les pseudos des combats sur les outils de guerre. ';
	p += 'Si les combats ont été importés automatiquement, ceux-ci sont déjà rentrés.\n';
	p += 'Là encore merci de ne pas éditer manuellement ce post.\n\n\n';
	p += 'Bonne guerre,\n\ndelangle';

	this.nom_cache = 'zzzelp_' + ze_serveur + '_creation_FI_guerre';
	this.nom_cache_trie = 'zzzelp_' + ze_serveur + '_trie_FI_guerre';
	this.regexp_titre = {
		en_vie : '(.*) FDF : ([0-9GTM]+) (\\? |)/ OSD : ([0-9GTM]+) (\\? |)/ OSL : ([0-9GTM]+) (\\? |)/',
		dead : '(.*) DEAD le (.*)'
	};
	this.special_posts = new Array(
		{ 
			id : 'statistiques_guerre',
			title : 'Statistiques du conflit', 
			content : '\n[center][b]Ne jamais modifier manuellement ![/b][/center]\n\nAucune statistique pour l\'instant.\n' 
		},
		{ 
			id : 'liste_morts',
			title : 'Liste des morts', 
			content : 'A tenir manuellement à jour avec la liste des joueurs morts pendant la guerre.\n\n[b]Liste des morts alliés :[/b]\n\n\n[b]Liste des morts ennemis :[/b]\n\n'
		},
		{
			id : 'fonctionnement_FI',
			title : 'Fonctionnement du forum de guerre',
			content : p
		}
	);
	this.copy_special_posts = JSON.parse(JSON.stringify(this.special_posts));
	this.special_posts_en_cours = '';
	this.parametres = ZzzelpScript.parameters('FI_guerre');
	this.topic_actif = 0;
	this.combats_cache = [];

	this.add_param = function(parametre, valeur) {
		var valeurs = (typeof localStorage[obj.nom_cache] == 'undefined') ? {} : JSON.parse(localStorage[obj.nom_cache]);
		valeurs[parametre] = valeur;
		localStorage[obj.nom_cache] = JSON.stringify(valeurs);
	};

	this.get_param = function(parametre) {
		var valeurs = JSON.parse(localStorage[obj.nom_cache]);
		return valeurs[parametre];
	};

	this.pop = function(parametre) {
		var valeurs = JSON.parse(localStorage[obj.nom_cache]),
			valeur = valeurs[parametre].pop();	
		localStorage[obj.nom_cache] = JSON.stringify(valeurs);	
		return valeur;
	};

	this.initialize_FIZzzelp = function() {
		console.log('Stockage sur Zzzelp');
		var valeurs = localStorage[obj.nom_cache],
			form = new FormData();
		form.append('valeurs', valeurs);

		var url_ajax = 'guerre_script?mode=stockage_FI&';
		new ZzzelpAjax({ method : 'POST', domain : 'zzzelp', url : url_ajax, data : form }, {});
	};

	this.update_FIZzzelp = function(xdr, mode) {
		xajax.processResponse(xdr.responseXML);
		var page = ze_getBody(xdr.responseText),
			zone_page = document.createElement('div');
		zone_page.setAttribute('id','contenu_zzzelp');
		zone_page.setAttribute('style','display:none');
		zone_page.innerHTML = page;
		document.querySelector('body').appendChild(zone_page);	
		var lignes = zone_page.querySelector('.tab_triable').rows,
			pseudo = '',
			ID = 0;
		for(var i=1; i<lignes.length-1; i+=2) {
			var ID_temp = lignes[i].querySelector('input[type="checkbox"]').value;
			if(ID_temp > ID) {
				pseudo = new RegExp('([^ ]+) ').exec(lignes[i].querySelector('.topic_forum').innerHTML)[1];
				ID = ID_temp;
			}
		}
		var form = new FormData();
		form.append('ID', ID);
		form.append('pseudo', pseudo);
		form.append('ID_forum', obj.ID_forum);
		var url_ajax = 'guerre_script?mode=add_player_FI&';
		new ZzzelpAjax({ method : 'POST', domain : 'zzzelp', url : url_ajax },
			{ success : function(valeurs) {
				ze_Inserer_message('Joueur ajouté avec succès', 3000);
			}, authentication_issue : function(valeurs) {
				obj.update_FIZzzelp(pseudo, 2);
			}
		});
	};

	this.generation_main_post = function(valeurs, creation) {
		var txt = '\n[center][player]' + valeurs.niveaux.pseudo + '[/player][/center]\n\n',
			titre = valeurs.niveaux.pseudo + ' ', i;
		txt += '[url=/Membre.php?Pseudo=' + valeurs.niveaux.pseudo + '&modal_zzzelp]Accéder à son profil Zzzelp (ZzzelpScript nécessaire)[/url]';
		txt += '\n[i]Dernière MAJ : ' + ze_Generation_date_v1(time_fzzz()) + '[/i]\n\n';
		txt += '[b]Statistiques :[/b]\n';
		for(var stat in valeurs.resume_armee) {
			var donnee = valeurs.resume_armee[stat];
			txt += stat + ' : ' + ze_Nombre(donnee.valeur);
			titre += stat + ' : ' + ze_Nombre_raccourci(donnee.valeur, 3);
			if(!ZzzelpScriptModalGuerre.areLevelsSure(valeurs.niveaux, valeurs.niveaux_probables, donnee.prerequis)) {
				txt += ' ? (estimation : ';
				for(i=0; i<donnee.prerequis.length; i++) {
					if(!ZzzelpScriptModalGuerre.isLevelSure(valeurs.niveaux[donnee.prerequis[i]], valeurs.niveaux_probables[donnee.prerequis[i]])) {
						txt += donnee.prerequis[i] + ' ' + valeurs.niveaux_probables[donnee.prerequis[i]] + ' ';
					}
				}
				txt += ')';
				titre += ' ?';
			}
			txt += '\n';
			titre += ' / ';
		}
		if(valeurs.niveaux.dead == '1') {
			titre = valeurs.niveaux.pseudo + ' DEAD le ' + ze_Generation_date_v1(valeurs.niveaux.date_dead);
		}
		txt += '\n\n[b]Niveaux :[/b]\n';
		var niveaux = { tdp : 'Temps de ponte', armes : 'Armes', bouclier : 'Bouclier', dome : 'Dôme', loge : 'Loge', vitesse_attaque : 'Vitesse d\'attaque', vitesse_chasse : 'Vitesse de chasse'};
		for(var niv in niveaux) {
			txt += niveaux[niv] + ' : ' + valeurs.niveaux[niv] + '\n';
		}
		if(valeurs.niveaux.date_armee === 0) {
			txt += '\n\nArmée inconnue';
		}
		else {
			var date = valeurs.niveaux.date_armee > 0 ? ze_Generation_date_v1(valeurs.niveaux.date_armee) : 'jamais';
			txt += '\n\n[b]Armée (' + date + ')[/b] :\n';
			for(i=0; i<14; i++) {
				txt += ZzzelpArmy.TAGs[i] + ' : ' + ze_Nombre(parseInt(valeurs.niveaux[ZzzelpArmy.TAGs[i]])) + '\n';
			}
		}
		txt += '\n\n[b]Guide d\'utilisation :[/b][i]\n1) Gardez au maximum ZzzelpScript activé afin de stocker automatiquement vos combats sur Zzzelp\n2) Ne renommez JAMAIS un sujet[/i]\n';
		
		var hash = SHA256(JSON.stringify([valeurs.niveaux, valeurs.armee])),
			ex_hash;
		if(!creation) {
			ex_hash = document.querySelector('#forum font[color="#d7c384"]') ? document.querySelector('#forum font[color="#d7c384"]').innerHTML : '';
		}
		if(!creation && hash == ex_hash) {
			return undefined;
		}
		else {
			console.log('MAJ DU POST');
			txt += '[color=#d7c384]' + hash + '[/color]';
			return { contenu : txt, titre : titre };	
		}
	};

	this.create_player_subject = function(valeurs_temp, mode) {
		var valeurs = obj.generation_main_post(valeurs_temp, (mode != 'modification'));
		if(typeof valeurs != 'undefined') {
			var sujet = valeurs.titre,
				contenu = valeurs.contenu,
				variables;
			if(mode == 'creation' || mode == 'ajout') {
				variables = { 
					cat : (mode == 'creation' ? obj.get_param('ID_forum') : obj.ID_forum), 
					sujet : sujet, 
					message : contenu, 
					modifiable : 'envoyer', 
					send : 'Envoyer', 
					type : 'normal' 
				};
				obj.envoiXajax('envoiNouveauSujet', variables, mode);
			}
			else {
				variables = { 
					IDTopic : obj.topic_actif, 
					sujet : sujet, 
					message : contenu, 
					modifiable : 'envoyer', 
					send : 'Envoyer' 
				};
				obj.envoiXajax('envoiEditTopic', variables, 'modification');
			}
		}
		else if(mode == 'modification') {
			obj.customize_player_post(valeurs_temp.niveaux.pseudo);
		}
	};

	this.get_dataZzzelp = function(pseudo, mode, mode_action) {
		var url_ajax = 'guerre_script?mode=joueur_light&cible=' + pseudo + '&';
		new ZzzelpAjax({ method : 'GET', domain : 'zzzelp', url : url_ajax },
			{ success : function(valeurs) {
				obj.data_guerre = valeurs;
				obj.create_player_subject(valeurs, mode_action);
			}, authentication_issue : function(valeurs) {
				obj.get_dataZzzelp(pseudo, 2, mode_action);
			}
		});
	};

	this.envoiXajax = function(mode, variables, suite) {
		var data = new FormData(),
			variables_str = '';
		for(var el in variables) {
			variables_str += ((variables_str === '') ? '' : '&') + el + '=' + encodeURIComponent(variables[el]);
		}
		data.append('xajax', mode);
		data.append('xajaxr', new Date().getTime()-10000000);
		data.append('xajaxargs[]', '<xjxquery><q>' + variables_str + '</q></xjxquery>');
		new ZzzelpAjax({ method : 'POST', domain : 'fourmizzz', url : 'alliance.php?forum_menu', addDOM : false, data : data },
			{ success : function(valeurs, ajax) {
				if(suite == 'creation') {
					obj.creation_FI(ajax.xdr);
				}
				else if(suite == 'ajout') {
					obj.update_FIZzzelp(ajax.xdr);
				}
				else if(suite == 'modification') {
					xajax.processResponse(ajax.xdr.responseXML);
					obj.customize_player_post(obj.pseudo_actif);
				}			
			}
		});
	};

	this.creation_FI = function(variable) {
		var page, zone_page, i;
		if(typeof variable == 'string') {
			localStorage.removeItem(obj.nom_cache);
			obj.add_param('TAG', variable);
			obj.envoiXajax('ajoutCategorie', { nom : 'Guerre ' + variable }, 'creation');
		}
		else if(this.special_posts.length > 0) {
			if(typeof obj.get_param('ID_forum') == 'undefined') {
				console.log('OK');
				console.log(variable);
				this.storeIDForumCreation(variable);
			}
			var message = this.special_posts.pop();
			this.special_posts_en_cours = message.id;
			this.envoiXajax('envoiNouveauSujet', { 
				cat : obj.get_param('ID_forum'),
				sujet : message.title, 
				message : message.content, 
				modifiable : 'envoyer', 
				type : 'important', 
				send : 'Envoyer' 
			}, 'creation');
		}
		else if(typeof obj.get_param('joueurs') == 'undefined') {
			new ZzzelpAjax(({ method : 'GET', domain : 'fourmizzz', url : 'classementAlliance.php?alliance=' + this.get_param('TAG'), addDOM : true }),
				{ success : function(zone_page) {
					var liens = zone_page.querySelectorAll('#tabMembresAlliance a[href*="Membre.php"');
					var joueurs = [];
					for(i=0; i<liens.length; i++) {
						joueurs.push(liens[i].innerHTML);
					}
					obj.add_param('joueurs', joueurs);
					obj.get_dataZzzelp(obj.pop('joueurs'), 1, 'creation');
				}
			});
		}
		else if(obj.get_param('joueurs').length > 0) {
			obj.get_dataZzzelp(obj.pop('joueurs'), 1, 'creation');
		}
		else {
			page = ze_getBody(variable.responseText);
			zone_page = document.createElement('div');
			zone_page.setAttribute('id','contenu_zzzelp');
			zone_page.innerHTML = page;
			document.querySelector('body').appendChild(zone_page);	
			var lignes = zone_page.querySelector('.tab_triable').rows,
				sujets_joueurs = {},
				posts_speciaux = {};
			
			for(i=1; i<lignes.length-1; i+=2) {
				var ID = lignes[i].querySelector('input[type="checkbox"]').value;
				if(lignes[i].querySelectorAll('img[title="Important"]').length > 0) {
					var titre = lignes[i].querySelector('a').innerHTML;
					for(var j=0; j<this.copy_special_posts.length; j++) {
						if(titre == this.copy_special_posts[j].title) {
							posts_speciaux[this.copy_special_posts[j].id] = ID;
						}
					}
				}
				else {
					var pseudo = new RegExp('([^ ]+) ').exec(lignes[i].querySelector('.topic_forum').innerHTML)[1];
					sujets_joueurs[pseudo] = ID;
				}
			}
			obj.add_param('sujets_joueurs', sujets_joueurs);
			obj.add_param('posts_speciaux', posts_speciaux);
			obj.initialize_FIZzzelp();
		}
	};

	this.storeIDForumCreation = function(variable) {
		page = ze_getBody(variable.responseText);
		zone_page = document.createElement('div');
		zone_page.setAttribute('id','contenu_zzzelp');
		zone_page.setAttribute('style','display:none');
		zone_page.innerHTML = page;
		document.querySelector('body').appendChild(zone_page);
		var categories = zone_page.querySelectorAll('form[id*="cat"]'),
			ID_cat = 0;
		for(i=0; i<categories.length; i++) {
			var ID_temp = parseInt(categories[i].id.replace('cat', ''));
			if(ID_cat < ID_temp) {
				ID_cat = ID_temp;
			}
		}
		ze_Supprimer_element(zone_page);
		obj.add_param('ID_forum', ID_cat);		
	};

	this.get_PostSpecialFI = function(ID_forum, ID_role) {
		for(var i=0; i<obj.parametres.length; i++) {
			if(obj.parametres[i].ID_forum == ID_forum) {
				var ID_posts_speciaux = obj.parametres[i].ID_posts_speciaux;
				for(var role in ID_posts_speciaux) {
					if(ID_posts_speciaux[role] == ID_role) {
						return role;
					}
				}
			}
		}
		return undefined;		
	};

	this.get_PseudoFI = function(ID_forum, ID_joueur) {
		for(var i=0; i<obj.parametres.length; i++) {
			if(obj.parametres[i].ID_forum == ID_forum) {
				var ID_joueurs = obj.parametres[i].ID_joueurs;
				for(var pseudo in ID_joueurs) {
					if(ID_joueurs[pseudo] == ID_joueur) {
						return pseudo;
					}
				}
			}
		}
		return undefined;
	};

	this.get_IDFI = function(joueur) {
		for(var i=0; i<obj.parametres.length; i++) {
			var ID_joueurs = obj.parametres[i].ID_joueurs;
			for(var pseudo in ID_joueurs) {
				if(pseudo == joueur) {
					return ID_joueurs[pseudo];
				}
			}
		}
		return undefined;
	};

	this.is_FIZzzelp = function(ID_forum) {
		for(var i=0; i<obj.parametres.length; i++) {
			if(obj.parametres[i].ID_forum == ID_forum) {
				return true;
			}
		}
		return false;
	};

	this.add_watcher = function(ex_ID) {
		obj.ID_forum = parseInt(new RegExp('forum([0-9]+) ').exec(document.querySelector('.ligne_paire[class*="forum"]').className)[1]);
		if(document.querySelectorAll('.messageForum div[id*="editTopic"]').length > 0) {
			var ID = parseInt(document.querySelector('.messageForum div[id*="editTopic"]').id.replace('editTopic', '')),
				pseudo = obj.get_PseudoFI(obj.ID_forum, ID),
				role_post = obj.get_PostSpecialFI(obj.ID_forum, ID);
			if(ex_ID != ID) {
				ex_ID = ID;
				obj.topic_actif = ID;
				if(typeof pseudo != 'undefined') {
					obj.pseudo_actif = pseudo;
					obj.get_dataZzzelp(pseudo, 1, 'modification');
				}
				else if(role_post == 'statistiques_guerre') {
					obj.add_button_MAJ_statistiques();
				}
			}

		}
		else if(document.querySelector('#form_cat') && obj.is_FIZzzelp(obj.ID_forum)) {
			ex_ID = 0;
			obj.customize_summary();
		}
		setTimeout(function(){
			obj.add_watcher(ex_ID);
		}, 100);
	};

	this.initialize_Parametres = function() {
		for(var i=0; i<obj.parametres.length; i++) {
			obj.parametres[i].ID_joueurs = JSON.parse(obj.parametres[i].ID_joueurs);
			obj.parametres[i].ID_posts_speciaux = JSON.parse(obj.parametres[i].ID_posts_speciaux);
		}
	};

	this.main = function(mode, variable) {
		obj.initialize_Parametres();
		if(mode == 'creation') {
			obj.creation_FI(variable);
		}
		else if (document.location.pathname == '/alliance.php' && ~url.indexOf('forum_menu')) {
			obj.add_watcher(0);
		}
	};

	this.add_RC_cache = function(RC, valeurs) {
		obj.combats_cache.push({ RC : RC, valeurs : valeurs });
	};

	this.update_FI = function() {
		var analyse1 = obj.combats_cache[0].valeurs,
			pseudo = (analyse1.position == 'attaquant') ? analyse1.defenseur.pseudo : analyse1.attaquant.pseudo,
			ID = obj.get_IDFI(pseudo),
			contenu = '';
		for(var i=0; i<obj.combats_cache.length; i++) {
			var combat = obj.combats_cache[i];
			for(var j=0; j<combat.RC.length; j++) {
				contenu += ze_HTML_to_BBcode(combat.RC[j], true) + '\n';
			}
			if(i != obj.combats_cache.length) {
				contenu += '\n\n';
			}
		}
		if(typeof ID != 'undefined') {
			var variables = { topic : ID, message : contenu, send : 'Envoyer' };
			obj.envoiXajax('envoiNouveauMessage', variables, 'modification');
		}
	};

	this.analyse_titles = function() {
		var lignes = document.querySelectorAll('.topic_forum'),
			classements = [], valeurs;
		for(var i=0; i<lignes.length;i++) {
			lignes[i].parentNode.parentNode.dataset.ordre_fzzz = i;
			if(lignes[i].innerHTML.match(obj.regexp_titre.en_vie)) {
				valeurs = new RegExp(obj.regexp_titre.en_vie).exec(lignes[i].innerHTML);
				classements.push({ 
					ligne : lignes[i], 
					FDF : (valeurs[2] == "0" ? 0 : ze_Nombre_complet(valeurs[2])),
					OSD : (valeurs[4] == "0" ? 0 : ze_Nombre_complet(valeurs[4])),
					OSL : (valeurs[6] == "0" ? 0 : ze_Nombre_complet(valeurs[6])),
					alpha : valeurs[1],
					dead : false
				});
 			}
			if(lignes[i].innerHTML.match(obj.regexp_titre.dead)) {
				valeurs = new RegExp(obj.regexp_titre.dead).exec(lignes[i].innerHTML);
				classements.push({ 
					ligne : lignes[i], 
					date_dead : ze_Date_to_timestamp_v1(valeurs[2]),
					alpha : valeurs[1],
					dead : true
				});
 			}
		}
		for(i=0; i<classements.length; i++) {
			var FDF= 1,
				OSD = 1,
				OSL = 1,
				alpha = 1;
				date_dead = 1;
			for(var j=0; j<classements.length; j++) {
				if(i != j) {
					if(classements[i].alpha.toUpperCase() > classements[j].alpha.toUpperCase()) {
						alpha ++;
					}
					if(!classements[j].dead && !classements[i].dead) {
						if(classements[i].FDF < classements[j].FDF) {
							FDF ++;
						}
						if(classements[i].OSD < classements[j].OSD) {
							OSD ++;
						}
						if(classements[i].OSL < classements[j].OSL) {
							OSL ++;
						}
					}
					else if(classements[j].dead && classements[i].dead && classements[i].date_dead < classements[j].date_dead) {
						date_dead ++;					
					}
				}
			}
			classements[i].ligne.parentNode.parentNode.dataset.FDF = FDF;
			classements[i].ligne.parentNode.parentNode.dataset.OSD = OSD;
			classements[i].ligne.parentNode.parentNode.dataset.OSL = OSL;
			classements[i].ligne.parentNode.parentNode.dataset.alpha = alpha;
			classements[i].ligne.parentNode.parentNode.dataset.date_dead = date_dead;
			classements[i].ligne.parentNode.parentNode.dataset.dead = classements[i].dead ? 1 : 0;
		}
	};

	this.sort_FI = function(critere) {
		var lignes_temp = document.querySelectorAll('.topic_forum'),
			lignes = [],
			tableau = document.querySelector('#forum table tbody');
		for(var i=0; i<lignes_temp.length;i++) {
			if(lignes_temp[i].innerHTML.match(obj.regexp_titre)) {
				var ligne = lignes_temp[i].parentNode.parentNode;
				lignes.push({ ligne_1 : ligne, ligne_2 : ligne.parentNode.rows[ligne.rowIndex + 1]});
			}
		}
		lignes = obj.quick_sort_FI(lignes, critere);
		for(i=0; i<lignes.length; i++) {
			tableau.insertBefore(lignes[i].ligne_1, tableau.rows[tableau.rows.length-1]);
			tableau.insertBefore(lignes[i].ligne_2, tableau.rows[tableau.rows.length-1]);
		}
		obj.appy_color_lines();
	};

	this.quick_sort_FI = function(lignes, critere) {
		if(lignes.length < 2) {
			return lignes;
		}
		var petit = [],
			grand = [],
			is_critere_armee = ~['FDF', 'OSD', 'OSL'].indexOf(critere),
			ligne_A = lignes[0].ligne_1;
		for(var k=1; k<lignes.length; k++) {
			var ligne_B = lignes[k].ligne_1;
			if(!is_critere_armee || (ligne_B.dataset.dead === '0' && ligne_A.dataset.dead === '0')) {
				if(parseInt(ligne_B.dataset[critere]) < parseInt(ligne_A.dataset[critere])) {
					petit.push(lignes[k]);
				}
				else {
					grand.push(lignes[k]);
				}
			}
			else if(ligne_A.dataset.dead === '0' && ligne_B.dataset.dead == '1') {
				grand.push(lignes[k]);
			}
			else if(ligne_B.dataset.dead === '0' && ligne_A.dataset.dead == '1') {
				petit.push(lignes[k]);
			}
			else {
				if(parseInt(ligne_B.dataset.date_dead) < parseInt(ligne_A.dataset.date_dead)) {
					petit.push(lignes[k]);
				}
				else {
					grand.push(lignes[k]);
				}

			}
		}
		var res_1 = obj.quick_sort_FI(petit, critere).concat([lignes[0]], obj.quick_sort_FI(grand, critere));
		return res_1;
	};

	this.show_matching_subjects = function(query) {
		query = query.toUpperCase();
		var sujets = document.querySelectorAll('.topic_forum');
		for(var i=0; i<sujets.length; i++) {
			var ligne = sujets[i].parentNode.parentNode;
			if(~sujets[i].innerHTML.toUpperCase().indexOf(query)) {
				ligne.style.display = '';
				ligne.nextSibling.style.display = '';
			}
			else {
				ligne.style.display = 'none';
				ligne.nextSibling.style.display = 'none';
			}
		}
		obj.appy_color_lines();
	};

	this.appy_color_lines = function() {
		var tableau = document.querySelector('#forum table tbody');
		for(i=1; i<tableau.rows.length-1; i+=2) {
			tableau.rows[i].className = (i%4 == 1) ? '' : 'ligne_paire';
			tableau.rows[i+1].className = (i%4 == 1) ? '' : 'ligne_paire';
		}		
	};


	this.customize_summary = function() {
		if(document.querySelectorAll('#zzzelp_ajout_joueur_FI').length === 0) {
			obj.analyse_titles();
			var form = document.querySelector('#form_cat'),
				ligne_ajout = document.createElement('div'),
				label_ajout = document.createElement('span'),
				input_ajout = document.createElement('input'),
				img_ajout = document.createElement('img');
			ligne_ajout.id = 'zzzelp_ajout_joueur_FI';
			ligne_ajout.setAttribute('style', 'ligne-height:3em;');
			input_ajout.type = 'text';
			label_ajout.innerHTML = 'Ajouter un joueur : ';
			img_ajout.src = ZzzelpScript.url + 'Images/valider.png';
			img_ajout.setAttribute('style', 'width: 25px;vertical-align: middle;margin-left: 5px;cursor:pointer;');
			img_ajout.onclick = function onclick(event) {
				new ZzzelpAjax(({ method : 'GET', domain : 'fourmizzz', url : 'Membre.php?Pseudo=' + input_ajout.value, addDOM : true }),
					{ success : function(zone_page) {
						if(zone_page.querySelectorAll('.boite_membre').length > 0) {
							var pseudo = document.querySelector('center h2').innerHTML;
							if(typeof obj.get_IDFI(pseudo) == 'undefined') {
								ze_Supprimer_element(ligne_ajout);
								obj.get_dataZzzelp(pseudo, 1, 'ajout');
							}
						}
					}
				});		
			};

			ligne_ajout.appendChild(label_ajout);
			ligne_ajout.appendChild(input_ajout);
			ligne_ajout.appendChild(img_ajout);
			form.appendChild(ligne_ajout);

			var search_bar = document.createElement('input');
			search_bar.setAttribute('style', 'float:right;width:160px;margin-right:15px;');
			search_bar.placeholder = 'Rechercher un sujet';
			search_bar.onkeyup = function onkeyup(event) {
				obj.show_matching_subjects(this.value);	
			};
			document.querySelector('#forum').insertBefore(search_bar, document.querySelector('#forum div[onclick*="xajax_NouveauSujet"]').nextSibling);

			var select_trie = document.createElement('select'),
				options = new Array(
					{ nom : 'Tri : Dernier message', valeur : 'ordre_fzzz' },
					{ nom : 'Tri : Ordre alphabétique', valeur : 'alpha'},
					{ nom : 'Tri : Force de Frappe', valeur : 'FDF' },
					{ nom : 'Tri : Vie en dôme', valeur : 'OSD' },
					{ nom : 'Tri : Vie en loge', valeur : 'OSL' }
				);
			select_trie.setAttribute('style', 'float:right;');
			select_trie.onchange = function onchange(event) {
				localStorage.setItem(obj.nom_cache_trie, this.value);
				obj.sort_FI(this.value);
			};
			for(var i=0; i<options.length; i++) {
				var option = document.createElement('option');
				option.innerHTML = options[i].nom;
				option.value = options[i].valeur;
				select_trie.appendChild(option);
			}
			document.querySelector('#forum').insertBefore(select_trie, document.querySelector('#forum div[onclick*="xajax_NouveauSujet"]').nextSibling);
			var ex_trie = localStorage.getItem(obj.nom_cache_trie);
			if(ex_trie !== null) {
				obj.sort_FI(ex_trie);
				select_trie.value = ex_trie;
			}
		}
	};

	obj.customize_player_post = function(pseudo) {
		document.querySelector('#forum').dataset.pseudo = pseudo;
		document.querySelector('#forum').dataset.serveur = ze_serveur;
		var messages = document.querySelectorAll('.messageForum'),
			cell_entete = document.createElement('div'),
			cell_contenu = document.createElement('div'),
			zone_contenu = document.createElement('div');
		cell_entete.className = 'auteurForum';
		cell_contenu.className = 'messageForum';
		cell_entete.innerHTML = '<b>Aide Zzzelp</b>';
		cell_contenu.setAttribute('style', 'text-align: center;');

		var bouton_combat = document.createElement('a'),
			bouton_aide_synchro = document.createElement('a');
		bouton_combat.setAttribute('style', 'display: inline-block;width: 190px;margin-right: 5px;');
		bouton_aide_synchro.setAttribute('style', 'display: inline-block;width: 190px;margin-left: 5px;');
		bouton_combat.className = 'bouton_guerre';
		bouton_aide_synchro.className = 'bouton_guerre';
		bouton_combat.innerHTML = 'Préparer un combat';
		bouton_aide_synchro.innerHTML = 'Aide pour synchroniser';
		bouton_combat.onclick = function onclick(event) {
			zone_contenu.innerHTML = '';
			zone_contenu.appendChild(Generation_zone_combat(pseudo, obj.data_guerre, true, true));
			return false;
		};
		bouton_aide_synchro.onclick = function onclick(event) {
			new ZzzelpAjax(({ method : 'GET', domain : 'fourmizzz', url : 'Membre.php?Pseudo=' + pseudo, addDOM : true }),
				{ success : function(zone_page) {
					var TDC = parseInt(zone_page.querySelector('.tableau_score').rows[1].cells[1].innerHTML.replace(/ /g, ''));
					zone_contenu.innerHTML = '';
					zone_contenu.appendChild(new ZzzelpScriptAideSynchro(gpseudo, pseudo, obj.data_guerre, TDC, true, true).getZone());
				}
			});
			return false;
		};
		cell_contenu.appendChild(bouton_combat);
		cell_contenu.appendChild(bouton_aide_synchro);
		cell_contenu.appendChild(zone_contenu);

		document.querySelector('#forum').insertBefore(cell_entete, document.querySelector('#forum div[onclick*="xajax_repondre"]'));
		document.querySelector('#forum').insertBefore(cell_contenu, document.querySelector('#forum div[onclick*="xajax_repondre"]'));
		document.querySelector('#forum').insertBefore(document.createElement('hr'), document.querySelector('#forum div[onclick*="xajax_repondre"]'));

		obj.add_button_edit_post(pseudo);
	};

	this.add_button_edit_post = function(pseudo) {
		var img = document.querySelector('div[id*="editTopic"] img[src*="crayon"]');
		img.parentNode.onclick = function() {
			if(confirm('Etes-vous certains de vouloir editer manuellement ce sujet ?')) {
				xajax_editTopic(obj.topic_actif);
			}
			return false;
		};
		var bouton_edit = document.createElement('a');
		bouton_edit.setAttribute('style', 'display:block;width:190px;margin:20px auto;');
		bouton_edit.className = 'bouton_guerre';
		bouton_edit.innerHTML = 'Modifier les données';
		bouton_edit.onclick = function onclick(event) {
			var Scallback = function() {
				obj.get_dataZzzelp(pseudo, 1, 'modification');
			};
			firstPost.innerHTML = '';
			firstPost.appendChild(new ZzzelpScriptZoneData(obj.data_guerre, pseudo, true, Scallback).getZoneContenu());
		};
		var firstPost = document.querySelector('.messageForum  div');
		firstPost.insertBefore(bouton_edit, firstPost.querySelector('a[href*="Membre.php"]').parentNode);
	};

	this.add_button_MAJ_statistiques = function() {
		var img = document.querySelector('div[id*="editTopic"] img[src*="crayon"]');
		img.src = ZzzelpScript.url + 'Images/refresh.png';
		img.setAttribute('style', 'height:15px');
		img.parentNode.onclick = function onclick(event) {
			obj.update_Statistiques_guerre(1);
			return false;
		};
	};

	this.update_Statistiques_guerre = function(mode) {
		var url_ajax = 'guerre_script?mode=statistiques_FI&ID_forum=' + obj.ID_forum + '&';
		new ZzzelpAjax({ method : 'GET', domain : 'zzzelp', force : mode, url : url_ajax },
			{ success : function(valeurs) {
				var sujet = document.querySelector('#forum h2').innerHTML;
				variables = { 
					IDTopic : obj.topic_actif, 
					sujet : sujet, 
					message : valeurs.replace(/<br>/gi, '\n'), 
					important : 'on',
					modifiable : 'envoyer', 
					send : 'Envoyer' 
				};
				obj.envoiXajax('envoiEditTopic', variables, 'modification');
			}, authentication_issue : function(valeurs) {
				obj.update_Statistiques_guerre(2);
			}
		});
	};

	obj.main(mode, variable);

}

if(typeof ze_serveur != 'undefined') {
	FI_guerre = new FIGuerre();
}