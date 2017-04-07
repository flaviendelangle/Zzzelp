function Creation_graphiques(section, n) {
	var alliances =  (ze_Analyser_URL('alliances') === '' || ze_Analyser_URL('alliances') == '[]') ? [] : ze_Analyser_URL('alliances').substr(1,ze_Analyser_URL('alliances').length-2).replace(/ /g, '').split(',');
	if(section === '') {
		section = document.querySelector('.ancre[data-selected="1"').dataset.section;
	}
	document.querySelector('.barre_pex').style.display = (section == 'generales') ? '' : 'none';
	var sections = document.querySelectorAll('.barre_nav .ancre');
	for(var i=0; i<sections.length; i++) {
		sections[i].dataset.selected = (sections[i].dataset.section == section) ? '1' : '0';
	}
	ze_Supprimer_element(document.querySelector('.zone_stats'));
	var div = document.createElement('div');
	div.className = 'grid grid-pad zone_stats animated fadeInRight';
	document.querySelector('.main').appendChild(div);
	console.log('Génération des statistiques');

	var armees2 = [];
	for(var pseudo in armees) {
		if(alliances.length === 0 || in_array(armees[pseudo].alliance, alliances)) {
			var armee = JSON.parse(JSON.stringify(armees[pseudo]));
			armee.armee = new ZzzelpScriptArmee(armees[pseudo].armee, { armes : 0, bouclier : 0, lieu : 0, niveau_lieu : 0 });
			armees2[pseudo] = armee;
		}
	}

	if(section == 'generales') {
		Statistique_armee_joueur(armees2, 'HOF', n);
		Statistique_armee_joueur(armees2, 'attaque', n);
		Statistique_armee_joueur(armees2, 'défense', n);
		Statistique_armee_joueur(armees2, 'vie', n);
		Statistique_armee_joueur(armees2, 'capa_flood', n);
	}
	else if(section == 'composition') {
		Interface_composition_armee(armees2);
	}
}

function Creation_zone(id) {
	var div = document.createElement('div');
	div.id = id;
	document.querySelector('.zone_stats').appendChild(div);
}

function Trie_joueurs(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}


function Statistique_armee_joueur(armees, valeur, n) {
	Creation_zone('graphe_' + valeur);
	var data = [],
		mode = (n === 0) ? 'sans pex' : ((n == 1) ? 'réelles' : 'full pex'),
		titre, resultat;
	if(valeur == 'HOF') {
		titre = 'Années de ponte';
	}
	else if(valeur == 'attaque') {
		titre = 'Forces de frappe';
	}
	else if(valeur == 'défense') {
		titre = 'Défenses';
	}
	else if(valeur == 'vie') {
		titre = 'Vies';
	}
	else if(valeur == 'capa_flood') {
		titre = 'Capacités de flood';
	}
	for(var pseudo in armees) {
		var armee = (n === 0) ? armees[pseudo].armee.noXP() : ((n == 1) ? armees[pseudo].armee : armees[pseudo].armee.XPavecJSN());
		if(valeur == 'HOF') {
			resultat = armee.getHOFAnnees();
		}
		else if(valeur == 'attaque') {
			resultat = armee.getAttaqueHB();
		}
		else if(valeur == 'défense') {
			resultat = armee.getDefenseHB();
		}
		else if(valeur == 'vie') {
			resultat = armee.getVieHB();
		}
		else if(valeur == 'capa_flood') {
			resultat = armee.getCapaFlood();
		}
		data.push({ 
			name : pseudo, 
			y : resultat, 
			color : in_array(armees[pseudo].alliance, ['FCGB', 'ZOO']) ? 'blue' : (in_array(armees[pseudo].alliance, ['ADM', 'ADD']) ? 'green' : 'red'),
			date_MAJ : armees[pseudo].date_MAJ
		});
	}
	data.sort(Trie_joueurs('-y'));
	$(function () {
		$('#graphe_' + valeur).highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text:titre + ' ' + mode
			},
			xAxis: {
				min : 0,
				max : ze_Majoration(25, data.length-1),
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
					text: titre
				}
			},
			legend: {
				enabled: false
			},
			tooltip: {
				formatter: function() {return '<b>' + this.key + '</b><br>' + this.series.name + ' : ' + ze_Nombre(parseInt(this.y)) + '<br>Dernière MAJ : ' + ze_Generation_date_v1(this.point.date_MAJ); }

			},
			scrollbar: {
				enabled:true
			},
			series: [{
				name: titre,
				data: data,
				dataLabels: {
					enabled: true,
					formatter : function() { return this.point.tdp; },
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


function Interface_composition_armee(armees) {
	var pseudos = [];
	for(var pseudo in armees) {
		pseudos.push(pseudo);
	}
	pseudos.sort(function (a, b) {
    	return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	var zone = document.createElement('div'),
		ligne_joueur = document.createElement('div'),
		ligne_stat = document.createElement('div'),
		choix_joueur = document.createElement('span'),
		select_joueur = document.createElement('select'),
		choix_stat = document.createElement('span'),
		select_stat = document.createElement('select'),
		zone_graphe = document.createElement('div'),
		statistiques = {
			HOF : 'Années de ponte',
			attaque : 'Force de frappe',
			defense : 'Défense',
			vie : 'Vie',
			capa_flood : 'Nombre d\'unités'
		};
	zone.className = 'zone_composition_joueur';
	zone_graphe.id = 'graphe_composition_joueur';
	ligne_joueur.className = 'choix_joueur_composition';
	ligne_stat.className = 'choix_stat_composition';
	zone_graphe.setAttribute('style', 'width:700px');
	choix_joueur.innerHTML = 'Armée à analyser :';
	choix_stat.innerHTML = 'Statstique à afficher :';

	for(var i=0; i<pseudos.length; i++) {
		option = document.createElement('option');
		option.innerHTML = pseudos[i];
		select_joueur.appendChild(option);
	}
	for(var stat in statistiques) {
		option = document.createElement('option');
		option.innerHTML = statistiques[stat];
		option.value = stat;
		select_stat.appendChild(option);
	}

	select_joueur.onchange = function() {
		zone.dataset.pseudo = this.value;
		Graphique_composition_joueur(zone.dataset.pseudo, zone.dataset.stat, 1);
	};

	select_stat.onchange = function() {
		zone.dataset.stat = this.value;
		Graphique_composition_joueur(zone.dataset.pseudo, zone.dataset.stat, 1);
	};

	zone.dataset.pseudo = pseudos[0];
	zone.dataset.stat = 'HOF';

	ligne_joueur.appendChild(choix_joueur);
	ligne_joueur.appendChild(select_joueur);
	ligne_stat.appendChild(choix_stat);
	ligne_stat.appendChild(select_stat);
	zone.appendChild(ligne_joueur);
	zone.appendChild(ligne_stat);
	zone.appendChild(zone_graphe);
	document.querySelector('.zone_stats').appendChild(zone);
	Graphique_composition_joueur(pseudos[0], 'HOF', 1);
}

function Graphique_composition_joueur(pseudo, mode, n) {
	var armee = (n === 0) ? armees[pseudo].armee.noXP() : ((n == 1) ? armees[pseudo].armee : ze_Full_XP_avec_JSN(armees[pseudo].armee)),
		statistiques = Statistiques_armee_categories(armee, mode);
	console.log(statistiques);
	$('#graphe_composition_joueur').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
			backgroundColor:'transparent'
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: "Brands",
			colorByPoint: true,
			data: statistiques
		}]
	});
}

function Statistiques_armee_categories(armee, mode) {
	var categories = new Array(
						{ name : 'Naines', unites : [0,1,2] }, 
						{ name : 'Soldates', unites : [3,4,9] }, 
						{ name : 'Concierges', unites : [5,6] }, 
						{ name : 'Artilleuses', unites : [7,8] }, 
						{ name : 'Tanks', unites : [10,11] }, 
						{ name : 'Tueuses', unites : [12,13] }
					),
		statistiques = [], valeur;
	for(var i=0; i<categories.length; i++) {
		var armee2 = armee.new_armee();
		for(var j=0; j<categories[i].unites.length; j++) {
			armee2.setUnite(categories[i].unites[j], armee.getUnite(categories[i].unites[j]));
		}
		if(mode == 'HOF') {
			valeur = armee2.getHOFAnnees();
		}
		else if(mode == 'attaque') {
			valeur = armee2.getAttaqueHB();
		}
		else if(mode == 'defense') {
			valeur = armee2.getDefenseHB();
		}
		else if(mode == 'vie') {
			valeur = armee2.getVieHB();
		}
		else if(mode == 'capa_flood') {
			valeur = armee2.getCapaFlood();
		}
		statistiques.push({
			name : categories[i].name,
			y : valeur
		});
	}
	return statistiques;
}