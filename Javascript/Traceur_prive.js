function InitialiserTraceur() {
	var options = new Array(
					{ nom : 'Alliances', id : 'alliances', type : 'text', modes : new Array('correspondances', 'variations') },
					{ nom : 'Joueurs', id : 'joueurs', type : 'text', modes : new Array('correspondances', 'variations') },
					{ nom : 'Alliance', id : 'alliance', type : 'text', modes : new Array('alliances') },
					{ nom : 'Joueur', id : 'joueur', type : 'text', modes : new Array('joueurs') },
					{ nom : 'Valeur min', id : 'valeur_min', type : 'text', modes : new Array('correspondances', 'variations', 'joueurs', 'alliances') },
					{ nom : 'Valeur max', id : 'valeur_max', type : 'text', modes : new Array('correspondances', 'variations', 'joueurs', 'alliances') },
					{ nom : 'Alliances différentes', id : 'alliances_diff', type : 'checkbox', modes : new Array('correspondances', 'joueurs', 'alliances') },
					{ nom : 'Variations non résolues', id : 'variations_inconnues', type : 'checkbox', modes : new Array('variations', 'joueurs', 'alliances') }					
						);
		ancres = document.querySelectorAll('.ancre');
	for(var i=0; i<options.length; i++) {
		var ligne = document.createElement('div'),
			span = document.createElement('span'),
			input = document.createElement('input');
		ligne.className = 'ligne_cadre_structure';
		ligne.id = 'ligne_' + options[i].id;
		span.innerHTML = options[i].nom;
		input.type = options[i].type;
		input.id = options[i].id;
		if(options[i].type == 'text') {
			input.className = 'input_haut';
		}
		ligne.appendChild(span);
		ligne.appendChild(input);
		document.querySelector('#options_traceur').insertBefore(ligne, document.querySelector('#options_traceur .bouton').parentNode);
	}
	autocompletion(document.querySelector('#alliances'), { mode : 'alliance', serveur : ze_Analyser_URL('serveur'), multiple : true });
	autocompletion(document.querySelector('#joueurs'), { mode : 'joueur', serveur : ze_Analyser_URL('serveur'), multiple : true });
	autocompletion(document.querySelector('#alliance'), { mode : 'alliance', serveur : ze_Analyser_URL('serveur'), multiple : false });
	autocompletion(document.querySelector('#joueur'), { mode : 'joueur', serveur : ze_Analyser_URL('serveur'), multiple : false });
	document.querySelector('#valeur_min').onkeyup = function onkeyup(event) {ze_Ajout_espaces(this);}
	document.querySelector('#valeur_max').onkeyup = function onkeyup(event) {ze_Ajout_espaces(this);}
	rome(document.querySelector('#debut'), { initialValue: Generation_date_rome(1) });
	rome(document.querySelector('#fin'), { initialValue: Generation_date_rome(0) });

	for(var i=0; i<ancres.length; i++) {
		ancres[i].onclick = function onkeyup(event) {Generation_traceur_Zzzelp(this.dataset.mode, options);}
	}

	for(var i=0; i<options.length; i++) {
		var valeur = ze_Analyser_URL(options[i].id);
		if(valeur != '') {
			if(options[i].type == 'checkbox') {
				document.querySelector('#' + options[i].id).checked = (valeur == '1');
			}
			else {
				document.querySelector('#' + options[i].id).value = valeur;
			}
		}
	}
	document.querySelector('.ancre[data-mode="' + ((ze_Analyser_URL('mode') != '') ? ze_Analyser_URL('mode') : 'correspondances') + '"]').click()
	document.querySelector('.bouton').onclick = function onclick(event) {Generation_traceur_Zzzelp(document.querySelector('#options_traceur').dataset.mode, options)}
}

function Generation_date_rome(jours) {
	var date = new Date((time()-86400*jours)*1000);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}

function Creation_URL_traceur(mode) {
	var lien = url_zzzelp + 'traceur?serveur=' + ze_Analyser_URL('serveur') + '&mode=' + mode,
		options = document.querySelectorAll('#options_traceur .ligne_cadre_structure');
	for(var i=0; i<options.length-1; i++) {
		if(options[i].style.display != 'none') {
			if(options[i].querySelectorAll('input[type="checkbox"]').length > 0 && options[i].querySelector('input').checked) {
				lien += '&' + options[i].querySelector('input').id + '=1';
			}
			else if(options[i].querySelectorAll('input[type="text"]').length > 0 && options[i].querySelector('input').value != '') {
				lien += '&' + options[i].querySelector('input').id + '=' + encodeURIComponent(options[i].querySelector('input').value);
			}
		}
	}
	window.history.pushState('', '', lien);
}

function Generation_traceur_Zzzelp(mode, options) {
	Creation_URL_traceur(mode)
	var debut = ze_Timestamp_input(document.querySelector('#debut').value),
		fin = ze_Timestamp_input(document.querySelector('#fin').value);
	document.querySelector('#options_traceur').dataset.mode = mode;
	for(var j=0; j<options.length; j++) {
		document.querySelector('#ligne_' + options[j].id).style.display = in_array(mode, options[j].modes) ? '' : 'none';
		options[j].valeur = (options[j].type == 'checkbox') ? (document.querySelector('#' + options[j].id).checked ? '1' : '0') : document.querySelector('#' + options[j].id).value;	
	}
	Recuperation_donnees_traceur(mode, debut, fin, options, 'zzzelp');
}

function Recuperation_donnees_traceur(mode, debut, fin, options, source) {
	var xdr = ze_getXDomainRequest(),
		sous_URL = '',
		modes = {
					correspondances : { fonction : Creation_tableau_correspondances },
					variations : { fonction : Creation_tableau_variations },
					joueurs : { fonction : Creation_tableau_joueurs },
					alliances : { fonction : Creation_tableau_alliances }
				};
	if(typeof options != 'undefined') {
		for(var i=0; i<options.length; i++) {
			sous_URL += '&' + options[i].id + '=' + options[i].valeur;
		}
		sous_URL += '&manuel=1';
	}
	xdr.onload = function() {
		document.querySelector('#donnees_traceur').innerHTML = '';
		modes[mode].fonction(JSON.parse(xdr.responseText), source);
	};
	var lien;
	if(source == 'zzzelp') {
		lien = url_zzzelp + '/traceur_data?mode=' + mode + '&debut=' + debut + '&fin=' + fin + '&serveur=' + ((ze_Analyser_URL('serveur') != '') ? ze_Analyser_URL('serveur') : ze_serveur) + sous_URL;
	}
	else {
		lien = url_zzzelp + '/traceur_script?mode=' + mode +'&debut=' + debut + '&fin=' + fin + '&serveur=' + ((ze_Analyser_URL('serveur') != '') ? ze_Analyser_URL('serveur') : ze_serveur) + sous_URL + '&pseudo=' + gpseudo + '&token=' + getTokenZzzelp();
	}
	console.log(lien);
	xdr.open('GET', lien, true);
	xdr.send();
}

function Creation_tableau_joueurs(valeurs, source) {
	if(source == 'zzzelp' && typeof valeurs.releves != 'undefined') {
		Creation_graphique_TDC(valeurs.releves, valeurs.pseudo)
	}
	Creation_tableau_correspondances(valeurs.correspondances, source);
	Creation_tableau_variations(valeurs.variations, source);
	if(source == 'zzzelp' && typeof valeurs.habitudes != 'undefined') {
		Creation_tableau_habitudes_joueur(valeurs.habitudes, valeurs.pseudo);
	}
}

function Creation_tableau_alliances(valeurs, source) {
	if(source == 'zzzelp' && typeof valeurs.releves != 'undefined') {
		Creation_graphique_TDC(valeurs.releves, valeurs.alliance)
	}
	Creation_tableau_correspondances(valeurs.correspondances);
	Creation_tableau_variations(valeurs.variations, valeurs.alliance);
}

function Creation_graphique_TDC(releves, identite) {
	var zone = document.createElement('div');
	zone.id = 'graph_TDC';
	zone.setAttribute('style', 'margin-bottom:20px');
	document.querySelector('#donnees_traceur').appendChild(zone);
	$(function () {
		$('#graph_TDC').highcharts({
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: 'Evolution du TDC'
			},
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: {
					month: '%e. %b',
					year: '%b'
				},
				title: {
					text: 'Date'
				}
			},
			yAxis: {
				title: {
					text: 'Terrain de Chasse'
				},
				min: 0
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br>',
				formatter: function() {return ze_Generation_date_v1(this.x/1000) + ' : ' + ze_Nombre(this.y); }
			},

			plotOptions: {
				spline: {
					marker: {
						enabled: true
					},
				    series: {
				        step: 'right' // or 'center' or 'right'
				    }
				}
			},
			series: [{
				name : 'TDC ' + identite,
				data : releves,
				step: true
			}]
		});
	});
}

function Creation_tableau_correspondances(valeurs, source) {
	var serveur = (ze_Analyser_URL('serveur') != '') ? ze_Analyser_URL('serveur') : ze_serveur,
		colonnes = new Array(
						{ nom : '', ID : 'details' },
						{ nom : 'Attaquant', ID : 'attaquant' },
						{ nom : 'TAG', ID : 'TAG_att' },
						{ nom : 'Défenseur', ID : 'defenseur' },
						{ nom : 'TAG', ID : 'TAG_def' },
						{ nom : 'Date mini', ID : 'date_mini' },
						{ nom : 'Date maxi', ID : 'date_maxi' },
						{ nom : 'Valeur', ID : 'valeur' }
							),
		cache = (source == 'zzzelp' && document.querySelector('#options_traceur').dataset.mode != 'correspondances' && valeurs.length > 20),
		tableau = document.createElement('table'),
		ligne = tableau.insertRow(0);
	tableau.className = 'tableau_ombre simulateur';
	tableau.id = 'tableau_traceur';
	for(var i=0; i<colonnes.length; i++) {
		var cell = document.createElement('th');
		cell.innerHTML = colonnes[i].nom;
		cell.id = 'colonne_' + colonnes[i].ID;
		ligne.appendChild(cell);
	}

	if(cache) {
		var ligne = tableau.insertRow(-1),
			cell = ligne.insertCell(0);
		cell.setAttribute('colspan', '8');
		cell.innerHTML = 'Afficher les correspondances';
		cell.setAttribute('style', 'font-weight:bold;cursor:pointer');
		cell.onclick = function onclick(event) {
			var afficher = (this.innerHTML == 'Afficher les correspondances'),
				lignes = this.parentNode.parentNode.rows;
			this.innerHTML = afficher ? 'Cacher les correspondances' : 'Afficher les correspondances';
			for(var k=2; k<lignes.length; k++) {
				lignes[k].style.display = (afficher ? '' : 'none');
			}
		}
	}
	document.querySelector('#donnees_traceur').appendChild(tableau);
	document.querySelector('#donnees_traceur').appendChild(document.createElement('br'));
	document.querySelector('#donnees_traceur').appendChild(document.createElement('br'));
	
	for(var i=0; i<valeurs.length; i++) {
		var ligne = tableau.insertRow(-1),
			plus = ligne.insertCell(0),
			pseudo_att = ligne.insertCell(1),
			TAG_att = ligne.insertCell(2),
			pseudo_def = ligne.insertCell(3),
			TAG_def = ligne.insertCell(4),
			date_mini = ligne.insertCell(5),
			date_maxi = ligne.insertCell(6),
			valeur = ligne.insertCell(7),
			img = document.createElement('img');
		ligne.style.display = cache ? 'none' : '';
		ligne.dataset.ID = valeurs[i].ID;
		if(typeof galliances != 'undefined' && ((valeurs[i].alliance_att != '' && in_array(valeurs[i].alliance_att, galliances[serveur])) || (valeurs[i].alliance_def != '' && in_array(valeurs[i].alliance_def, galliances[serveur])))) {
			ligne.dataset.alliance = '1';
		}
		if(source == 'zzzelp') {
			img.src = url_zzzelp + '/Images/plus.png';
			img.dataset.detail = '0';
			img.width = '20';
			img.setAttribute('style', 'vertical-align: text-bottom;cursor:pointer');
			img.onclick = function onclick(event) {
				if(this.dataset.detail == '0') {
					this.dataset.detail = '1';
					Charger_details_correspondances(this.parentNode.parentNode);
				}
				else {
					ze_Supprimer_element(this.parentNode.parentNode.nextSibling);
					this.dataset.detail = '0';
				}
			}
			plus.appendChild(img);
		}
		pseudo_att.innerHTML = ze_Lien_profil(valeurs[i].attaquant, serveur);
		TAG_att.innerHTML = ze_Lien_alliance(valeurs[i].alliance_att, serveur);
		pseudo_def.innerHTML = ze_Lien_profil(valeurs[i].cible, serveur);
		TAG_def.innerHTML = ze_Lien_alliance(valeurs[i].alliance_def, serveur);
		date_mini.innerHTML = ze_Generation_date_v1(valeurs[i].date_mini);
		date_maxi.innerHTML = ze_Generation_date_v1(valeurs[i].date_maxi);
		valeur.innerHTML = ze_Nombre(parseInt(valeurs[i].valeur));
	}
}

function Charger_details_correspondances(correspondance) {
	var xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		var donnees = JSON.parse(xdr.responseText),
			conteneur = correspondance.parentNode.insertRow(correspondance.rowIndex + 1),
			zone = conteneur.insertCell(0);
			tableau = document.createElement('table'),
			colonnes = new Array(
					{ nom : 'Valeur du flood', index : 'valeur', type : 'nombre' },
					{ nom : 'TDC de l\'attaquant avant', index : 'TDC_avant_att', type : 'nombre' },
					{ nom : 'TDC de l\'attaquant après', index : 'TDC_apres_att', type : 'nombre'  },
					{ nom : 'TDC du défenseur avant', index : 'TDC_avant_def', type : 'nombre'  },
					{ nom : 'TDC du défenseur après', index : 'TDC_apres_def', type : 'nombre'  } 
								);
		tableau.className = 'detail_traceur';
		zone.className = 'taille_normale';
		zone.setAttribute('colspan', '7');
		for(var i=0; i<colonnes.length; i++) {
			var ligne = tableau.insertRow(-1),
				titre = ligne.insertCell(0),
				valeur = ligne.insertCell(1);
			titre.innerHTML = colonnes[i].nom + ' : ';
			valeur.innerHTML = (colonnes[i].type == 'nombre') ? ze_Nombre(parseInt(donnees[colonnes[i].index])) : donnees[colonnes[i].index];
		}		
		zone.appendChild(tableau);
	}
	xdr.open('GET', url_zzzelp + 'traceur_data?mode=detail_correspondances&serveur=' + ((ze_Analyser_URL('serveur') != '') ? ze_Analyser_URL('serveur') : ze_serveur) + '&ID=' + correspondance.dataset.ID, true);
	xdr.send();
}

function Creation_tableau_variations(valeurs, source) {
	var serveur = (ze_Analyser_URL('serveur') != '') ? ze_Analyser_URL('serveur') : ze_serveur,
		colonnes = new Array(
						{ nom : '', ID : 'resolu', zone : 'neutre', important : 1 },
						{ nom : 'Pseudo', ID : 'attaquant', zone : 'neutre', important : 1 },
						{ nom : 'TAG', ID : 'TAG_att', zone : 'neutre', important : 0 },
						{ nom : 'Date mini', ID : 'date_mini', zone : 'neutre', important : 0 },
						{ nom : 'Date maxi', ID : 'date_maxi', zone : 'neutre', important : 1 },
						{ nom : 'TDC avant', ID : 'valeur', zone : 'neutre', important : 1 },
						{ nom : 'TDC après', ID : 'valeur', zone : 'neutre', important : 1 },
						{ nom : 'Ecart', ID : 'valeur', zone : 'neutre', important : 1 },
						{ nom : '', ID : 'details', zone : 'neutre', important : 2 }
							),
		cache = (source == 'zzzelp' && document.querySelector('#options_traceur').dataset.mode != 'variations' && valeurs.length > 20),
		tableau = document.createElement('table'),
		ligne = tableau.insertRow(0);
	tableau.className = 'tableau_ombre simulateur';
	tableau.id = 'tableau_traceur';
	for(var i=0; i<colonnes.length; i++) {
		var cell = document.createElement('th');
		cell.innerHTML = colonnes[i].nom;
		cell.dataset.zone = colonnes[i].zone;
		cell.id = 'colonne_' + colonnes[i].ID;
		ligne.appendChild(cell);
	}

	if(cache) {
		var ligne = tableau.insertRow(-1),
			cell = ligne.insertCell(0);
		cell.setAttribute('colspan', '9');
		cell.innerHTML = 'Afficher les variations';
		cell.setAttribute('style', 'font-weight:bold;cursor:pointer');
		cell.onclick = function onclick(event) {
			var afficher = (this.innerHTML == 'Afficher les variations'),
				lignes = this.parentNode.parentNode.rows;
			this.innerHTML = afficher ? 'Cacher les variations' : 'Afficher les variations';
			for(var k=2; k<lignes.length; k++) {
				lignes[k].style.display = (afficher ? '' : 'none');
			}
		}
	}

	document.querySelector('#donnees_traceur').appendChild(tableau);
	document.querySelector('#donnees_traceur').appendChild(document.createElement('br'));
	document.querySelector('#donnees_traceur').appendChild(document.createElement('br'));
	
	
	
	for(var i=0; i<valeurs.length; i++) {
		var ligne = tableau.insertRow(-1),
			resolu = ligne.insertCell(0),
			pseudo = ligne.insertCell(1),
			TAG = ligne.insertCell(2),
			date_mini = ligne.insertCell(3),
			date_maxi = ligne.insertCell(4),
			TDC_avant = ligne.insertCell(5),
			TDC_apres = ligne.insertCell(6),
			ecart = ligne.insertCell(7),
			details = ligne.insertCell(8),
			img = document.createElement('img');
		
		if(typeof galliances != 'undefined' && ((valeurs[i].alliance != '' && in_array(valeurs[i].alliance, galliances[serveur])))) {
			ligne.dataset.alliance = '1';
		}
		
		ligne.style.display = cache ? 'none' : '';
		pseudo.innerHTML = ze_Lien_profil(valeurs[i].pseudo, serveur);
		TAG.innerHTML = ze_Lien_alliance(valeurs[i].alliance, serveur);
		date_mini.innerHTML = ze_Generation_date_v1(valeurs[i].date_mini);
		date_maxi.innerHTML = ze_Generation_date_v1(valeurs[i].date_maxi);
		TDC_avant.innerHTML = ze_Nombre(parseInt(valeurs[i].valeur_avant));
		TDC_apres.innerHTML = ze_Nombre(parseInt(valeurs[i].valeur_apres));
		ecart.innerHTML = ze_Nombre(parseInt(valeurs[i].valeur_apres) - parseInt(valeurs[i].valeur_avant));
		img.src = url_zzzelp + '/Images/' + (valeurs[i].resolu == '1' ? 'pastille_verte' : 'pastille_rouge') + '.png';
					
		img.width = '20';
		resolu.appendChild(img);
	}
}

function Creation_tableau_habitudes_joueur(valeurs, identite) {
	var zone = document.createElement('div');
	zone.id = 'graph_habitudes';
	zone.setAttribute('style', 'margin-bottom:20px');
	document.querySelector('#donnees_traceur').appendChild(zone);
	$(function () {
		$('#graph_habitudes').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Horaires des variations de ' + identite
	        },
		    xAxis: {
		       categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
		    },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Nombre de variations'
	            }
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        },
	        series: [{
	            data: valeurs
	        }]
	    });
	});
}