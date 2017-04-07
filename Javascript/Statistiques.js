
Changement_section((window.location.hash ? window.location.hash.replace('#','') : 'floods'));

function Changement_section(section) {
	document.querySelector('#debut').disabled = (section == 'zzzelp');
	document.querySelector('#fin').disabled = (section == 'zzzelp');
	document.querySelector('#section_actuelle').value = section;
	window.history.pushState('', '', ZzzelpScript.url + 'statistiques?serveur=' + ze_Analyser_URL('serveur') + '&alliance=' + ze_Analyser_URL('alliance') + '#' + document.querySelector('#section_actuelle').value);
	var sections = document.querySelectorAll('.ancre[id*="ancre_"]');
		chargements = {
			floods : new Array(
							{ id : 'floods', longueur : 3, fonction : Total_floods }
								),
			convois : new Array(
							{ id : 'convois', longueur : 5, fonction : Total_convois },
							{ id : 'retard_convois_envoye', longueur : 1, fonction : Retards_convois },
							{ id : 'retard_convois_recu', longueur : 1, fonction : Retards_convois }
								),
			membres : new Array(
							{ id : 'tdp', longueur : 1, fonction : Classement_tdp },
							{ id : 'ouvrieres', longueur : 1, fonction : Evolution_ouvrieres }/*,
							{ id : 'niveaux', longueur : 1, fonction : Variations_niveaux }*/
								),
			zzzelp : new Array(
							{ id : 'general', longueur : 2, fonction : Statistiques_generales },
							{ id : 'chargements_MF', longueur : 1, fonction : Chargements_MF },
							{ id : 'inscriptions', longueur : 1, fonction : Inscriptions_Zzzelp }
								)
					};
	for(var i=0; i<sections.length; i++) {
		sections[i].style.color = ((section == sections[i].id.replace('ancre_', '')) ? 'white' : 'black')
	}
	Nettoyer_stats();
	localStorage['zzzelp_graph_charge'] = 1;
	var k = 0;
	for(var i=0; i<chargements[section].length; i++) {
		Generation_statistiques(chargements[section][i], (k+1));
		k += chargements[section][i].longueur;
	}
}

function Nettoyer_stats() {
	var zones = document.querySelectorAll('.zone_stats div[class*="col-"]');
	for(var i=0; i<zones.length; i++) {
		ze_Supprimer_element(zones[i]);
	}
	var zones = document.querySelectorAll('.zone_stats');
	for(var i=1; i<zones.length; i++) {
		ze_Supprimer_element(zones[i]);
	}
		
}
function Generation_zone_graph(n, taille) {
	var ex_zones = document.querySelectorAll('.zone_stats')[document.querySelectorAll('.zone_stats').length - 1].querySelectorAll('div[class*="col-"]'),
		total = 0;
	for(var i=0; i<ex_zones.length; i++) {
		var fraction = ex_zones[i].className.split('-');
		total += parseInt(fraction[1])/parseInt(fraction[2]);
	}
	if(total > 0.95) {
		var conteneur = document.createElement('div');
		conteneur.className = 'grid grid-pad zone_stats';
		document.querySelector('.main').appendChild(conteneur);
	}
	else {
		var conteneur = document.querySelectorAll('.zone_stats')[document.querySelectorAll('.zone_stats').length - 1];
	}
	var zone = document.createElement('div'),
		sous_zone = document.createElement('div');
	zone.className = "col-" + taille;
	sous_zone.id = 'graph_' + n;
	sous_zone.setAttribute('style', 'margin-bottom:20px');
	zone.appendChild(sous_zone);
	conteneur.appendChild(zone);
}

function Generation_statistiques(donnee, n) {
	var xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		if(~xdr.responseText.indexOf('{') || ~xdr.responseText.indexOf('[')) {
			var donnees = JSON.parse(xdr.responseText);
			Preparation_creation_zone_graphique(donnee, n, donnee.longueur, donnees);
		}
		else {
			setTimeout(function(){localStorage['zzzelp_graph_charge'] = n+donnee.longueur; }, 1);
		}
	}
	console.log('GET', url_site + 'statistiques_data?section=' + donnee.id + '&serveur=' + ze_Analyser_URL('serveur') + '&alliance=' + ze_Analyser_URL('alliance') + '&debut=' + ze_Timestamp_input(document.querySelector('#debut').value) + '&fin=' + ze_Timestamp_input(document.querySelector('#fin').value) + (donnee.pseudo ? '&pseudo=' + donnee.pseudo : '') + (donnee.recu ? '&recu=' + donnee.recu : ''));
	xdr.open('GET', url_site + 'statistiques_data?section=' + donnee.id + '&serveur=' + ze_Analyser_URL('serveur') + '&alliance=' + ze_Analyser_URL('alliance') + '&debut=' + ze_Timestamp_input(document.querySelector('#debut').value) + '&fin=' + ze_Timestamp_input(document.querySelector('#fin').value) + (donnee.pseudo ? '&pseudo=' + donnee.pseudo : '') + (donnee.recu ? '&recu=' + donnee.recu : ''), true);
	xdr.send();
}

function Preparation_creation_zone_graphique(donnee, n, longueur, donnees) {
	if(localStorage['zzzelp_graph_charge'] == n || longueur == 0) {
		donnee.fonction(donnees, n);
		localStorage['zzzelp_graph_charge'] = parseInt(localStorage['zzzelp_graph_charge']) + longueur;
	}
	else {
		setTimeout(function(){Preparation_creation_zone_graphique(donnee, n, longueur, donnees); }, 1);
	}
}

function Classement_tdp(valeurs, n) {
	var moyenne = 0;
	for(var i=0; i<valeurs.length; i++) {
		moyenne += valeurs[i].tdp;
	}
	moyenne /= valeurs.length;
	moyenne = 2740*Math.pow(0.9, moyenne);
	Generation_zone_graph(n, '1-1');
	$(function () {
		$('#graph_' + n).highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: 'Temps de ponte ' + ze_Analyser_URL('alliance')
			},
			xAxis: {
				min : 0,
				max : ze_Majoration(25, valeurs.length-1),
				type: 'category',
				labels: {
					rotation: -45,
					style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif'
					}
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Temps de ponte'
				},
				plotLines: [{
					color: 'red',
					value: moyenne, // Insert your average here
					width: '1',
					zIndex: 2 // To not get stuck below the regular plot lines
				}]
			},
			legend: {
				enabled: false
			},
			tooltip: {
				formatter: function() {return 'Temps de ponte : ' + this.point.tdp + ' (' + this.point.y + 'sec)'}

			},
			scrollbar: {
				enabled:true
			},
			series: [{
				name: 'Temps de ponte',
				data: valeurs,
				dataLabels: {
					enabled: true,
					formatter : function() { return this.point.tdp },
					rotation: -90,
					color: '#FFFFFF',
					align: 'right',
					x: 4,
					y: 10,
					style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif',
						textShadow: '0 0 3px black'
					}
				}
			}]
		});
	});
}

function Evolution_ouvrieres(valeurs, n) {
	Generation_zone_graph(n, '1-1');
	valeurs = Trie_ouvrieres(valeurs);
	for(var i=0; i<valeurs.length; i++) {
		valeurs[i].visible = (i < 5);
	}
	$(function () {
		$('#graph_' + n).highcharts({
			chart: {
				type: 'spline',
				zoomType: 'xy'
			},
			title: {
				text: 'Evolution des ouvrières'
			},
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: { // don't display the dummy year
					month: '%e. %b',
					year: '%b'
				},
				title: {
					text: 'Date'
				}
			},
			yAxis: {
				title: {
					text: 'Nombre d\'ouvrières'
				},
				min: 0
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br>',
				formatter: function() {return this.series.name + ' : ' + ze_Nombre(this.y) + ' ouvrières' }
			},

			plotOptions: {
				spline: {
					marker: {
						enabled: true
					}
				}
			},

			series: valeurs
		});
	});
}

function Variations_niveaux(valeurs, n) {
	Generation_zone_graph(n, '1-1');
	var tableau = document.createElement('table'),
		entete = tableau.insertRow(0);
	document.querySelector('#graph_' + n).appendChild(tableau);
	entete.innerHTML = '<th>Pseudo</th><th>TDP</th><th>Champi</th><th>Total</th>';
	for(var i=0; i<valeurs.length; i++) {
		tableau.insertRow(-1).innerHTML = '<td style="text-align:left">' + ze_Lien_profil(valeurs[i].pseudo, ze_Analyser_URL('serveur')) + '</td><td>' + valeurs[i].niveaux.tdp.total + '</td><td>' + valeurs[i].niveaux.champi.total + '</td><td><strong>' + valeurs[i].total + '</strong></td>';
	}
}




function Tableau_floods(n, joueurs, pseudos) {
	var tableau = document.createElement('table'),
		entete = tableau.insertRow(0);
	document.querySelector('#graph_' + n).appendChild(tableau);
	pseudos.sort(function(a, b){
		var nameA = joueurs[a] ? joueurs[a].nombre : 0, 
			nameB = joueurs[b] ? joueurs[b].nombre : 0;
		if (nameA < nameB) 
			return 1
		if (nameA > nameB)
			return -1
		return 0 
		});
	entete.innerHTML = '<th>Pseudo</th><th>Nb</th><th>Total</th><th>Moyenne</th><th>Graph</th>';
	var charge = false,
		nombre = 0,
		valeur = 0;
	for(var i=0; i<pseudos.length; i++) {
		if(joueurs[pseudos[i]]) {
			nombre += joueurs[pseudos[i]].nombre;
			valeur += joueurs[pseudos[i]].valeur;
			if(!charge) {
				charge = true;
				Generation_statistiques({ id : 'detail_floods', longueur : 0, pseudo : pseudos[i], fonction : Detail_floods }, (n+1));
			}
			var pseudo = pseudos[i];
			tableau.insertRow(-1).innerHTML = '<td>' + pseudo + '</td><td>' + ze_Nombre(joueurs[pseudo].nombre) + '</td><td><div class="non_tel_2">' + ze_Nombre(joueurs[pseudo].valeur) + '</div><div class="tel_2">' + ze_Nombre_raccourci(joueurs[pseudo].valeur,3) + '</div></td><td><div class="non_tel_2">' + ze_Nombre(parseInt(joueurs[pseudo].valeur / joueurs[pseudo].nombre)) + '</div><div class="tel_2">' + ze_Nombre_raccourci(parseInt(joueurs[pseudo].valeur / joueurs[pseudo].nombre),3) + '</div></td><td><img src="/Images/graphe.png" width="20px" style="cursor:pointer" data-pseudo="' + pseudo + '" id="generation_graphe_' + pseudo.replace(/\./gm, '') + '"></td>';
			document.querySelector('#generation_graphe_' + pseudos[i].replace(/\./gm, '')).onclick = function onclick(event) {Generation_statistiques({ id : 'detail_floods', longueur : 0, pseudo : this.dataset.pseudo, fonction : Detail_floods }, (n+1)) };
		}
	}
	tableau.insertRow(-1).innerHTML = '<td><strong>Total :</strong></td><td><strong>' + ze_Nombre(nombre) + '</strong></td><td><strong><div class="non_tel_2">' + ze_Nombre(valeur) + '</div><div class="tel_2">' + ze_Nombre_raccourci(valeur,3) + '</div></strong></td><td><strong><div class="non_tel_2">' + ze_Nombre(parseInt(valeur / nombre)) + '</div><div class="tel_2">' + ((nombre > 0) ? ze_Nombre_raccourci(parseInt(valeur / nombre),3) : '-') + '</div></strong></td><td></td>';
}

function Detail_floods(valeurs, n) {
	$(function () {
		$('#graph_' + n).highcharts({
			chart: {
				type: 'spline',
				zoomType: 'x'
			},
			title: {
				text: 'Floods de ' + valeurs.pseudo
			},
			xAxis: {
				type: 'datetime',
				labels: {
					overflow: 'justify'
				}
			},
			yAxis: {
				title: {
					text: 'Nombre de floods'
				},
				min: 0,
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null
			},
			tooltip: {
				valueSuffix: ' floods'
			},
			plotOptions: {
				spline: {
					lineWidth: 4,
					states: {
						hover: {
							lineWidth: 5
						}
					},
					marker: {
						enabled: false
					},
					pointInterval: 86400000,
					pointStart: valeurs.premiere_date
				}
			},
			series: [{name : 'Nombre', data : valeurs.nombres}],
			navigation: {
				menuItemStyle: {
					fontSize: '10px'
				}
			}
		});
	});
}


function Total_floods(valeurs, n) {
	Generation_zone_graph(n, '1-1');
	Generation_zone_graph(n+1, '1-2');
	Generation_zone_graph(n+2, '1-2');
	Tableau_floods(n+1, valeurs.details, valeurs.joueurs);
	$(function () {
		$('#graph_' + n).highcharts({
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: 'Floods de la ' + ze_Analyser_URL('alliance')
			},
			xAxis: [{
				type: 'datetime',
			}],
			yAxis: [{
				min: 0, 
				labels: {
					formatter : function() { return ((this.value < 0) ? '-' : '') + ze_Nombre_raccourci(Math.abs(this.value)) },
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					text: 'TDC floodé',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				}
			}, { 
				title: {
					text: 'Nombre de floods',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				labels: {
					format: '{value}',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				opposite: true
			}],
			tooltip: {
				shared: true
			},
			legend: {
				layout: 'vertical',
				align: 'left',
				x: 120,
				verticalAlign: 'top',
				y: 100,
				floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
			},
			series: [{
				name: 'Nombre',
				type: 'column',
				yAxis: 1,
				pointInterval: 24 * 3600 * 1000,
				pointStart: valeurs.premiere_date,
				data: valeurs.nombre,

			}, {
				name: 'Total floodé',
				type: 'spline',
				pointInterval: 24 * 3600 * 1000,
				pointStart: valeurs.premiere_date,
				data: valeurs.valeur,
				tooltip: {
					valueSuffix: ' cm²',
				}
			}]
		});
	});
}

function Tableau_convois(n, joueurs, pseudos, recu) {
	var tableau = document.createElement('table'),
		entete = tableau.insertRow(0),
		modes = new Array('envoye', 'recu');
	document.querySelector('#graph_' + n).appendChild(tableau);
	pseudos.sort(function(a, b){
		var nameA = joueurs[a] ? joueurs[a].valeur : 0, 
			nameB = joueurs[b] ? joueurs[b].valeur : 0;
		if (nameA < nameB) 
			return 1
		if (nameA > nameB)
			return -1
		return 0 
		});
	entete.innerHTML = '<th>Pseudo</th><th>Nb</th><th>Total</th><th>Moyenne</th><th>Graph</th>';
	var charge = false,
		nombre = 0,
		valeur = 0;
	for(var i=0; i<pseudos.length; i++) {
		if(joueurs[pseudos[i]]) {
			nombre += joueurs[pseudos[i]].nombre;
			valeur += joueurs[pseudos[i]].valeur;
			if(!charge) {
				charge = true;
				Generation_statistiques({ id : 'detail_convois', longueur : 0, pseudo : pseudos[i], recu : recu, fonction : Detail_convois }, (n+1));
			}
			var pseudo = pseudos[i];
			tableau.insertRow(-1).innerHTML = '<td>' + pseudo + '</td><td>' + ze_Nombre(joueurs[pseudo].nombre) + '</td><td><div class="non_tel_2">' + ze_Nombre(joueurs[pseudo].valeur) + '</div><div class="tel_2">' + ze_Nombre_raccourci(joueurs[pseudo].valeur,3) + '</div></td><td><div class="non_tel_2">' + ze_Nombre(parseInt(joueurs[pseudo].valeur / joueurs[pseudo].nombre)) + '</div><div class="tel_2">' + ze_Nombre_raccourci(parseInt(joueurs[pseudo].valeur / joueurs[pseudo].nombre),3) + '</div></td><td><img src="/Images/graphe.png" width="20px" style="cursor:pointer" data-pseudo="' + pseudo + '" data-recu="' + recu + '" id="generation_graphe_' + pseudo.replace(/\./gm, '') + '_' + modes[recu] + '"></td>';
			document.querySelector('#generation_graphe_' + pseudos[i].replace(/\./gm, '') + '_' + modes[recu]).onclick = function onclick(event) {Generation_statistiques({ id : 'detail_convois', longueur : 0, pseudo : this.dataset.pseudo, recu : this.dataset.recu, fonction : Detail_convois }, (n+1)) };
		}
	}
	tableau.insertRow(-1).innerHTML = '<td><strong>Total :</strong></td><td><strong>' + ze_Nombre(nombre) + '</strong></td><td><strong><div class="non_tel_2">' + ze_Nombre(valeur) + '</div><div class="tel_2">' + ze_Nombre_raccourci(valeur,3) + '</div></strong></td><td><strong><div class="non_tel_2">' + ze_Nombre(parseInt(valeur / nombre)) + '</div><div class="tel_2">' + ((nombre > 0) ? ze_Nombre_raccourci(parseInt(valeur / nombre),3) : '-') + '</div></strong></td><td></td>';
}

function Detail_convois(valeurs, n) {
	$(function () {
		$('#graph_' + n).highcharts({
			chart: {
				type: 'spline',
				zoomType: 'x'
			},
			title: {
				text: 'Convois de ' + valeurs.pseudo
			},
			xAxis: {
				type: 'datetime',
				labels: {
					overflow: 'justify'
				}
			},
			yAxis: {
				title: {
					text: 'Ressources'
				},
				min: 0,
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null
			},
			tooltip: {
				valueSuffix: ' mat'
			},
			plotOptions: {
				spline: {
					lineWidth: 4,
					states: {
						hover: {
							lineWidth: 5
						}
					},
					marker: {
						enabled: false
					},
					pointInterval: 86400000,
					pointStart: valeurs.premiere_date
				}
			},
			series: [{name : 'Nombre', data : valeurs.valeurs}],
			navigation: {
				menuItemStyle: {
					fontSize: '10px'
				}
			}
		});
	});
}

function Total_convois(valeurs, n) {
	Generation_zone_graph(n, '1-1');
	Generation_zone_graph(n+1, '1-2');
	Generation_zone_graph(n+2, '1-2');
	Tableau_convois(n+1, valeurs.details.envoye, valeurs.joueurs, 0);
	Generation_zone_graph(n+3, '1-2');
	Generation_zone_graph(n+4, '1-2');
	Tableau_convois(n+3, valeurs.details.recu, valeurs.joueurs, 1);
	$(function () {
		$('#graph_' + n).highcharts({
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: 'Convois de la ' + ze_Analyser_URL('alliance')
			},
			xAxis: [{
				type: 'datetime',
			}],
			yAxis: [{
				min: 0,
				labels: {
					formatter : function() { return ((this.value < 0) ? '-' : '') + ze_Nombre_raccourci(Math.abs(this.value)) },
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				title: {
					text: 'Ressources convoyées',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				}
			}, { 
				title: {
					text: 'Nombre de convois',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				labels: {
					format : '{value}',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				opposite: true
			}],
			tooltip: {
				shared: true
			},
			legend: {
				layout: 'vertical',
				align: 'left',
				x: 120,
				verticalAlign: 'top',
				y: 100,
				floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
			},
			series: [{
				name: 'Nombre',
				type: 'column',
				yAxis: 1,
				pointInterval: 24 * 3600 * 1000,
				pointStart: valeurs.premiere_date,
				data: valeurs.nombre,

			}, {
				name: 'Total convoyé',
				type: 'spline',
				pointInterval: 24 * 3600 * 1000,
				pointStart: valeurs.premiere_date,
				data: valeurs.valeur,
				tooltip: {
					valueSuffix: ' mat'
				}
			}]
		});
	});
}

function Retards_convois(valeurs, n) {
	Generation_zone_graph(n, '1-1');
	valeurs.valeurs = Trie_retards(valeurs.valeurs);
	for(var i=0; i<valeurs.valeurs.length; i++) {
		valeurs.valeurs[i].visible = (i < 5);
	}
	$(function () {
		$('#graph_' + n).highcharts({
			chart: {
				type: 'spline',
				zoomType: 'xy'
			},
			title: {
				text: 'Ressources à ' + (valeurs.recu ? 'recevoir' : 'envoyer')
			},
			xAxis: {
				type: 'datetime',
				labels: {
					overflow: 'justify'
				}
			},
			yAxis: {
				title: {
					text: 'Ressources à ' + (valeurs.recu ? 'recevoir' : 'envoyer')
				},
				min: 0,
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null
			},
			tooltip: {
				valueSuffix: ' mat'
			},
			plotOptions: {
				spline: {
					lineWidth: 4,
					states: {
						hover: {
							lineWidth: 5
						}
					},
					marker: {
						enabled: false
					},
					pointInterval: 86400000,
					pointStart: parseInt(valeurs.premiere_date)
				}
			},
			series: valeurs.valeurs,
			navigation: {
				menuItemStyle: {
					fontSize: '10px'
				}
			}
		});
	});
}












function Statistiques_generales(valeurs, n) {
	Generation_zone_graph(n, '1-2');
	Generation_zone_graph(n+1, '1-2');
	$(function () {
		$('#graph_' + n).highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			title: {
				text: 'Alliances utilisant Zzzelp'
			},
			tooltip: {
				formatter : function() { return '<b>' + this.point.name + '</b> : <br>Nombre d\'alliances : <b>' + this.point.y + '</b><br>Part des alliances : <b>' + (parseInt(this.point.percentage*100)/100) + '%</b>'; }
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						formatter : function() { return '<b>' + this.point.name + '</b> : ' + this.point.y + ' (' + (parseInt(this.point.percentage*100)/100) + '%)'; },
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				type: 'pie',
				name: 'Nombre d\'alliances actives',
				data: valeurs.alliances
			}]
		});
	});


	$(function () {
		$('#graph_' + (n+1)).highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			title: {
				text: 'Joueurs avec une alliance utilisant Zzzelp'
			},
			tooltip: {
				formatter : function() { return '<b>' + this.point.name + '</b> : <br>Nombre de joueurs : <b>' + this.point.y + '</b><br>Part des joueurs : <b>' + (parseInt(this.point.percentage*100)/100) + '%</b>'; }
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						formatter : function() { return '<b>' + this.point.name + '</b> : ' + this.point.y + ' (' + (parseInt(this.point.percentage*100)/100) + '%)'; },
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				type: 'pie',
				name: 'Nombre de joueurs avec une alliance',
				data: valeurs.membres_alliances
			}]
		});
	});
}

function Chargements_MF(valeurs, n) {
	Generation_zone_graph(n, '1-1');
	$(function () {
		$('#graph_' + n).highcharts({
			chart: {
				type: 'spline',
				zoomType: 'x'
			},
			title: {
				text: 'Nombre d\'utilisation du Multiflood'
			},
			xAxis: {
				type: 'datetime',
				labels: {
					overflow: 'justify'
				}
			},
			yAxis: {
				title: {
					text: 'Nombre de chargement'
				},
				min: 0,
				minorGridLineWidth: 0,
				gridLineWidth: 0,
				alternateGridColor: null
			},
			tooltip: {
				valueSuffix: ' chargements'
			},
			plotOptions: {
				spline: {
					lineWidth: 4,
					states: {
						hover: {
							lineWidth: 5
						}
					},
					marker: {
						enabled: false
					},
					pointInterval: 86400000,
					pointStart: parseInt(valeurs.premier_jour)
				}
			},
			series: valeurs.donnees,
			navigation: {
				menuItemStyle: {
					fontSize: '10px'
				}
			}
		});
	});
}

function Inscriptions_Zzzelp(valeurs, n) {
	Generation_zone_graph(n, '1-1');
	$(function () {
		$('#graph_' + n).highcharts({
			chart: {
				zoomType: 'x'
			},
			title: {
				text: 'Inscriptions sur Zzzelp'
			},
			xAxis: {
				type: 'datetime',
				minRange: 14 * 24 * 3600000 // fourteen days
			},
			yAxis: {
				title: {
					text: 'Nombre d\'inscriptions'
				}
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				area: {
					fillColor: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
						stops: [
							[0, Highcharts.getOptions().colors[0]],
							[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
						]
					},
					marker: {
						radius: 2
					},
					lineWidth: 1,
					states: {
						hover: {
							lineWidth: 1
						}
					},
					threshold: null
				}
			},

			series: [{
				type: 'area',
				name: 'Inscriptions : ',
				pointInterval: 24 * 3600 * 1000,
				pointStart: parseInt(valeurs.premier_jour),
				data: valeurs.donnees[0].data
			}]
		});
	});
}


function Trie_ouvrieres(valeurs) {
	if(valeurs.length < 2) {
		return valeurs;
	}
	var petit = new Array(),
		grand = new Array();
	for(var n=1; n<valeurs.length; n++) {
		if(valeurs[0].data[valeurs[0].data.length-1][1] > valeurs[n].data[valeurs[n].data.length-1][1]) {
			grand.push(valeurs[n]);
		}
		else {
			petit.push(valeurs[n]);
		}
	}
	return Trie_ouvrieres(petit).concat([valeurs[0]], Trie_ouvrieres(grand));
}

function Trie_retards(valeurs) {
	if(valeurs.length < 2) {
		return valeurs;
	}
	var petit = new Array(),
		grand = new Array();
	for(var n=1; n<valeurs.length; n++) {
		if(valeurs[0].data[valeurs[0].data.length-1] > valeurs[n].data[valeurs[n].data.length-1]) {
			grand.push(valeurs[n]);
		}
		else {
			petit.push(valeurs[n]);
		}
	}
	return Trie_retards(petit).concat([valeurs[0]], Trie_retards(grand));
}

