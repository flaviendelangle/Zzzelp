function ZzzelpDataAnalyser(area, source) {

	this.defaultMode = 'variations';

	this.prepareVariables(source);
	this.createArea(area);
}


ZzzelpDataAnalyser.options = new Array(
	{ 
		nom 	: 'Alliances', 
		id 		: 'alliances', 
		type 	: 'text', 
		modes 	: ['correspondances', 'variations']
	},
	{ 
		nom 	: 'Joueurs', 
		id 		: 'joueurs', 
		type 	: 'text', 
		modes 	: ['correspondances', 'variations']
	},
	{ 
		nom 	: 'Alliance(s)', 
		id 		: 'alliance', 
		type 	: 'text', 
		modes 	: ['alliances'],
		needed  : true
	},
	{ 
		nom 	: 'Joueur(s)', 
		id 		: 'joueur', 
		type 	: 'text', 
		modes 	: ['joueurs'],
		needed  : true
	},
	{ 
		nom 	: 'Valeur min', 
		id 		: 'valeur_min', 
		type 	: 'text', 
		modes	: ['correspondances', 'variations', 'joueurs', 'alliances']
	},
	{ 
		nom 	: 'Valeur max', 
		id 		: 'valeur_max', 
		type 	: 'text', 
		modes 	: ['correspondances', 'variations', 'joueurs', 'alliances']
	},
	{ 
		nom 	: 'Alliances différentes', 
		id 		: 'alliances_diff', 
		type 	: 'checkbox', 
		modes 	: ['correspondances', 'joueurs', 'alliances']
	},
	{ 
		nom 	: 'Variations non résolues', 
		id 		: 'variations_inconnues', 
		type 	: 'checkbox', 
		modes 	: ['variations', 'joueurs', 'alliances']
	}					
);

ZzzelpDataAnalyser.anchors = new Array(
	{
		nom		: 'Floods trouvés',
		id 		: 'ancre_principale',
		mode 	: 'correspondances'
	},
	{
		nom 	: 'Variations',
		id 		: 'ancre_imports_manuels',
		mode 	: 'variations'
	},
	{
		nom 	: 'Joueurs',
		id 		: 'ancre_sondes',
		mode 	: 'joueurs'
	},
	{
		nom 	: 'Alliances',
		id 		: 'ancre_zzzelpscript',
		mode 	: 'alliances'
	}
);

ZzzelpDataAnalyser.correspondancesRows = new Array(
	{ nom : ''			, ID : 'details' 	},
	{ nom : 'Attaquant'	, ID : 'attaquant' 	},
	{ nom : 'TAG'		, ID : 'TAG_att' 	},
	{ nom : 'Défenseur'	, ID : 'defenseur' 	},
	{ nom : 'TAG'		, ID : 'TAG_def' 	},
	{ nom : 'Date mini'	, ID : 'date_mini' 	},
	{ nom : 'Date maxi'	, ID : 'date_maxi' 	},
	{ nom : 'Valeur'	, ID : 'valeur' 	}
);

ZzzelpDataAnalyser.variationsRows = new Array(
	{ 
		nom : ''			, ID : 'resolu', 
		zone : 'neutre'		, important : 1 
	},
	{ 
		nom : ''			, ID : 'resolu', 
		zone : 'neutre'		, important : 1 
	},
	{ 
		nom : 'Pseudo'		, ID : 'attaquant', 
		zone : 'neutre'		, important : 1 
	},
	{ 
		nom : 'TAG'			, ID : 'TAG_att', 
		zone : 'neutre'		, important : 0 
	},
	{ 
		nom : 'Date mini'	, ID : 'date_mini', 
		zone : 'neutre'		, important : 0 
	},
	{ 
		nom : 'Date maxi'	, ID : 'date_maxi', 
		zone : 'neutre'		, important : 1 
	},
	{ 
		nom : 'TDC avant'	, ID : 'valeur', 
		zone : 'neutre', 	important : 1 
	},
	{ 
		nom : 'TDC après'	, ID : 'valeur', 
		zone : 'neutre'		, important : 1 
	},
	{ 
		nom : 'Ecart'		, ID : 'valeur', 
		zone : 'neutre'		, important : 1 
	},
	{ 
		nom : ''			, ID : 'details', 
		zone : 'neutre'		, important : 2 
	}
);

ZzzelpDataAnalyser.prototype.prepareVariables = function(source) {
	if(source == 'fourmizzz') {
		this.serveur = ze_serveur;
		this.domain = 'zzzelp';
	}
	else {
		this.serveur = ze_Analyser_URL('serveur');
		this.domain = 'zzzelp_interne';
	}
};

ZzzelpDataAnalyser.prototype.createArea = function(parent) {
	var headerArea = document.createElement('div');
	headerArea.appendChild(this.createAnchors());
	headerArea.appendChild(this.createOptionsTable());
	parent.appendChild(headerArea);

	var parentContentArea = document.createElement('div'),
		contentArea = document.createElement('div');
	parentContentArea.className = 'grid grid-pad';
	contentArea.className = 'col-1-1';
	parent.appendChild(parentContentArea);
	parentContentArea.appendChild(contentArea);
	this.contentArea = contentArea;

	this.putOptions();
};

ZzzelpDataAnalyser.prototype.createAnchors = function() {
	var area = document.createElement('div');
	area.className = 'grid grid-pad grid_separee';

	for(var i=0; i<ZzzelpDataAnalyser.anchors.length; i++) {
		var anchor = ZzzelpDataAnalyser.anchors[i],
			element = document.createElement('div'),
			child = document.createElement('div');
		element.className = 'col-1-' + ZzzelpDataAnalyser.anchors.length;
		child.innerHTML = anchor.nom;
		child.className = 'ancre';
		child.id = anchor.id;
		child.dataset.mode = anchor.mode;
		element.appendChild(child);
		area.appendChild(element);
		child.onclick = this.onAnchorClick.bind(this);
	}
	return area;
};

ZzzelpDataAnalyser.prototype.onAnchorClick = function(event) {
	this.mode = event.currentTarget.dataset.mode;
	this.update();
};

ZzzelpDataAnalyser.prototype.createOptionsTable = function() {
	var area_1 = document.createElement('div'),
		area_2 = document.createElement('div'),
		area_3 = document.createElement('div');

	area_1.className = 'grid grid-pad';
	area_2.className = 'col-1-1';
	area_3.className = 'zone_contenu zone_largeur_courte';

	area_1.appendChild(area_2);
	area_2.appendChild(area_3);

	this.optionsTable = area_3;

	return area_1;
};

ZzzelpDataAnalyser.prototype.putOptions = function() {
	this.addDateFields();
	this.addOptionFields();
	this.addButton();
	this.addAutocompletions();
	this.addEvents();

	var mode = ze_Analyser_URL('mode');
	this.mode = ((mode !== undefined) ? mode : this.defaultMode);
	document.querySelector('.ancre[data-mode="' + this.mode + '"]').click();
};

ZzzelpDataAnalyser.prototype.addDateFields = function() {
	var dates = [];
	for(var i=0; i<2; i++) {
		var line = document.createElement('div'),
			span = document.createElement('span'),
			input = document.createElement('input');
		line.className = 'ligne_cadre_structure';
		span.innerHTML = ((i===0) ? 'Début' : 'Fin') + ' :';
		input.type = 'text';
		input.className = 'input_haut';
		input.autocomplete = 'off';
		dates.push(input);
		line.appendChild(span);
		line.appendChild(input);
		this.optionsTable.appendChild(line);
		rome(input, { initialValue: this.getRomeDate(0.2-i*0.2) });
	}
	this.dates = dates;
};

ZzzelpDataAnalyser.prototype.getRomeDate = function(day) {
	var date = new Date((time()-86400*day)*1000);
	return date.getFullYear() + 
				'-' + (date.getMonth() + 1) + 
				'-' + date.getDate() + 
				' ' + date.getHours() + 
				':' + date.getMinutes();
};

ZzzelpDataAnalyser.prototype.addOptionFields = function() {
	var options = [];
	for(var i=0; i<ZzzelpDataAnalyser.options.length; i++) {
		var option = ZzzelpDataAnalyser.options[i],
			line = document.createElement('div'),
			span = document.createElement('span'),
			input = document.createElement('input');
		line.className = 'ligne_cadre_structure';
		line.id = 'ligne_' + option.id;
		span.innerHTML = option.nom;
		input.type = option.type;
		input.id = option.id;
		if(option.type == 'text') {
			input.className = 'input_haut';
		}
		line.appendChild(span);
		line.appendChild(input);
		this.optionsTable.appendChild(line);
		options.push(line);
		/*
		var valeur = ze_Analyser_URL(options[i].id);
		if(valeur !== undefined && valeur !== 'undefined') {
			if(options[i].type == 'checkbox') {
				document.querySelector('#' + options[i].id).checked = (valeur == '1');
			}
			else {
				document.querySelector('#' + options[i].id).value = valeur;
			}
		}
		*/
	}
	this.options = options;
};

ZzzelpDataAnalyser.prototype.addButton = function() {
	var line = document.createElement('div'),
		button = document.createElement('button');
	line.className = 'ligne_cadre_structure';
	button.className = 'bouton';
	button.innerHTML = 'Actualiser';
	button.onclick = this.update.bind(this);
	line.appendChild(button);
	this.optionsTable.appendChild(line);
};

ZzzelpDataAnalyser.prototype.addAutocompletions = function() {
	autocompletion(document.querySelector('#alliances'), {
		mode : 'alliance',
		serveur : ze_Analyser_URL('serveur'),
		multiple : true
	});
	autocompletion(document.querySelector('#joueurs'), {
		mode : 'joueur',
		serveur : ze_Analyser_URL('serveur'),
		multiple : true
	});
	autocompletion(document.querySelector('#alliance'), {
		mode : 'alliance',
		serveur : ze_Analyser_URL('serveur'),
		multiple : true
	});
	autocompletion(document.querySelector('#joueur'), {
		mode : 'joueur',
		serveur : ze_Analyser_URL('serveur'), 
		multiple : true
	});
};

ZzzelpDataAnalyser.prototype.addEvents = function() {
	document.querySelector('#valeur_min').onkeyup = function onkeyup(event) {
		ze_Ajout_espaces(this);
	};
	document.querySelector('#valeur_max').onkeyup = function onkeyup(event) {
		ze_Ajout_espaces(this);
	};
};

ZzzelpDataAnalyser.prototype.update = function() {
	//Creation_URL_traceur(mode)
	var debut = ze_Timestamp_input(this.dates[0].value),
		fin = ze_Timestamp_input(this.dates[1].value);
	for(var i=0; i<ZzzelpDataAnalyser.options.length; i++) {
		var option = ZzzelpDataAnalyser.options[i];
		this.options[i].style.display = in_array(this.mode, option.modes) ? '' : 'none';
	}
	this.retrieve(debut, fin);
};

ZzzelpDataAnalyser.prototype.retrieve = function(debut, fin) {
	if(!this.isRetrievePossible()) {
		this.contentArea.innerHTML = '';
		return false;
	}
	var url;
	if(this.domain == 'zzzelp_interne') {
		url = 'traceur_data?manuel=1';
		for(var i=0; i<ZzzelpDataAnalyser.options.length; i++) {
			var option = ZzzelpDataAnalyser.options[i],
				value,
				input = this.options[i].querySelector('input');
			if(input.type == 'checkbox') {
				value = input.checked ? '1' : '0';
			}
			else {
				value = input.value;
			}
			url += '&' + option.id + '=' + value;
		}
	}
	else {
		url = 'traceur_script?manuel=0';
	}
	url += '&serveur=' + this.serveur;
	url += '&mode=' + this.mode + '&debut=' + debut + '&fin=' + fin;
	new ZzzelpAjax({ method : 'GET', domain : this.domain, url : url }, 
		{ success : function(response) {
			this.contentArea.innerHTML = '';
			this[this.mode](response);
		}.bind(this)
	});
};

ZzzelpDataAnalyser.prototype.isRetrievePossible = function() {
	for(var i=0; i<ZzzelpDataAnalyser.options.length; i++) {
		var option = ZzzelpDataAnalyser.options[i];
		if(option.needed && in_array(this.mode, option.modes)) {
			if(this.options[i].querySelector('input').value === '') {
				return false;
			}
		}
	}
	return true;
};

ZzzelpDataAnalyser.prototype.createDataTable = function(rows) {
	var	area = document.createElement('div'),
		table = document.createElement('table'),
		line = table.insertRow(0);
	table.className = 'tableau_ombre simulateur';
	table.id = 'tableau_traceur';
	for(var i=0; i<rows.length; i++) {
		var cell = document.createElement('th');
		cell.innerHTML = rows[i].nom;
		cell.id = 'colonne_' + rows[i].ID;
		line.appendChild(cell);
	}
	area.setAttribute('style', 'margin-bottom:40px');
	area.appendChild(table);
	this.contentArea.appendChild(area);
	return table;
};

ZzzelpDataAnalyser.prototype.createVisibilityButton = function(mode, table) {
	var line = table.insertRow(-1),
		cell = line.insertCell(0);
	cell.setAttribute('colspan', '8');
	cell.innerHTML = 'Afficher les ' + mode;
	cell.setAttribute('style', 'font-weight:bold;cursor:pointer');
	cell.onclick = function onclick(event) {
		var show = (this.innerHTML == 'Afficher les ' + mode),
			lines = this.parentNode.parentNode.rows;
		this.innerHTML = (show ? 'Cacher' : 'Afficher') + ' les ' + mode;
		for(var k=2; k<lines.length; k++) {
			lines[k].style.display = (show ? '' : 'none');
		}
	};
};

ZzzelpDataAnalyser.prototype.correspondances = function(data) {
	var table = this.createDataTable(ZzzelpDataAnalyser.correspondancesRows);
	var hidden = (
			this.domain == 'zzzelp_interne' && 
			this.mode != 'correspondances' && 
			data.length > 20
	);
	if(hidden) {
		this.createVisibilityButton('correspondances', table);
	}
	for(var i=0; i<data.length; i++) {
		this.createLineCorrespondances(table, data[i], hidden);
	}
};

ZzzelpDataAnalyser.prototype.createLineCorrespondances = function(table, content, hidden) {
	var line = table.insertRow(-1),
		plus = line.insertCell(0),
		pseudo_att = line.insertCell(1),
		TAG_att = line.insertCell(2),
		pseudo_def = line.insertCell(3),
		TAG_def = line.insertCell(4),
		date_mini = line.insertCell(5),
		date_maxi = line.insertCell(6),
		valeur = line.insertCell(7),
		img = document.createElement('img');
	line.style.display = hidden ? 'none' : '';
	line.dataset.ID = content.ID;
	if(false) { // Ligne d'un membre de mon alliance
		ligne.dataset.alliance = '1';
	}
	if(this.domain == 'zzzelp_interne') {
		img.src = ZzzelpScript.url + 'Images/plus.png';
		img.dataset.detail = '0';
		img.width = '20';
		img.setAttribute('style', 'vertical-align: text-bottom;cursor:pointer');
		img.onclick = this.onClickCorrespondance.bind(this);
		plus.appendChild(img);
	}
	pseudo_att.innerHTML = ze_Lien_profil(content.attaquant, this.serveur);
	TAG_att.innerHTML = ze_Lien_alliance(content.alliance_att, this.serveur);
	pseudo_def.innerHTML = ze_Lien_profil(content.cible, this.serveur);
	TAG_def.innerHTML = ze_Lien_alliance(content.alliance_def, this.serveur);
	date_mini.innerHTML = ze_Generation_date_v1(content.date_mini);
	date_maxi.innerHTML = ze_Generation_date_v1(content.date_maxi);
	valeur.innerHTML = ze_Nombre(parseInt(content.valeur));
};

ZzzelpDataAnalyser.prototype.onClickCorrespondance = function(event) {
	var element;
	if(event.currentTarget.dataset.detail == '0') {
		event.currentTarget.dataset.detail = '1';
		element = event.currentTarget.parentNode.parentNode;
		this.getDetailsCorrespondance(element);
	}
	else {
		element = event.currentTarget.parentNode.parentNode.nextSibling;
		ze_Supprimer_element(element);
		event.currentTarget.dataset.detail = '0';
	}
};

ZzzelpDataAnalyser.prototype.getDetailsCorrespondance = function(element) {
	var url = 'traceur_data?mode=detail_correspondances';
	url += '&serveur=' + this.serveur + '&ID=' + element.dataset.ID;
	new ZzzelpAjax({ method : 'GET', domain : this.domain, url : url }, 
		{ success : function(data) {
			var line = element.parentNode.insertRow(element.rowIndex + 1),
				cell_1 = line.insertCell(0),
				cell_2 = line.insertCell(1);
			cell_1.className = 'taille_normale detail_traceur_cell';
			cell_2.className = 'taille_normale detail_traceur_cell';
			cell_1.setAttribute('colspan', '4');
			cell_2.setAttribute('colspan', '4');
			cell_1.appendChild(this.createDetailsCorrespondance(data));
			cell_2.appendChild(this.createAnalyseCorrespondance(data));
		}.bind(this)
	});
};

ZzzelpDataAnalyser.prototype.createDetailsCorrespondance = function(data) {
	var table = document.createElement('table'),
		header = table.insertRow(0),
		rows = 	['', 'Avant', 'Après'],
		line = table.insertRow(0);
	table.className = 'detail_traceur';
	for(var i=0; i<rows.length; i++) {
		var cell = document.createElement('th');
		cell.innerHTML = rows[i];
		line.appendChild(cell);
	}
	for(i=0; i<2; i++) {
		line = table.insertRow(-1);
		var index = (i===0) ? 'att' : 'def',
			label = line.insertCell(0),
			before = line.insertCell(1),
			after = line.insertCell(2);
		label.innerHTML = ((i===0) ? 'Attaquant' : 'Défenseur') + ' :';
		before.innerHTML = ze_Nombre(parseInt(data['TDC_avant_' + index]));
		after.innerHTML = ze_Nombre(parseInt(data['TDC_apres_' + index]));
	}
	return table;
};

ZzzelpDataAnalyser.prototype.createAnalyseCorrespondance = function(data) {
	var table = document.createElement('table'),
		header = table.insertRow(0),
		line = table.insertRow(0),
		avant = data.TDC_avant_def,
		apres = data.TDC_apres_def,
		lines = new Array(
		{ 
			name : 'Part prise', 
			valeur : parseInt(((avant-apres)/avant)*1000)/10 + '%'
		}
	);
	table.className = 'detail_traceur';
	for(var i=0; i<lines.length; i++) {
		line = table.insertRow(-1);
		var	cell1 = line.insertCell(0),
			cell2 = line.insertCell(1);
		cell1.innerHTML = lines[i].name + ' :';
		cell2.innerHTML = lines[i].valeur;
	}
	return table;
};

ZzzelpDataAnalyser.prototype.variations = function(data) {
	var table = this.createDataTable(ZzzelpDataAnalyser.variationsRows);
	var hidden = (
			this.domain == 'zzzelp_interne' && 
			this.mode != 'variations' && 
			data.length > 20
	);
	if(hidden) {
		this.createVisibilityButton('variations', table);
	}	
	for(var i=0; i<data.length; i++) {
		new ZzzelpTraceurVariation(
			data[i],
			table, 
			hidden, 
			this.serveur, 
			this.domain
		);
	}
};

ZzzelpDataAnalyser.prototype.joueurs = function(data) {
	if(this.domain == 'zzzelp_interne' && typeof data.releves != 'undefined') {
		this.createTDCTable(data.releves, data.pseudo);
	}
	this.correspondances(data.correspondances);
	this.variations(data.variations);
	if(this.domain == 'zzzelp_interne' && typeof data.habitudes != 'undefined') {
		this.createHabitTable(data.habitudes, data.pseudo);
	}
};

ZzzelpDataAnalyser.prototype.alliances = function(data) {
	if(this.domain == 'zzzelp_interne' && typeof data.releves != 'undefined') {
		this.createTDCTable(data.releves, data.alliance);
	}
	this.correspondances(data.correspondances);
	this.variations(data.variations);
};

ZzzelpDataAnalyser.prototype.createGraphArea = function(mode) {
	var area_1 = document.createElement('div'),
		area_2 = document.createElement('div'),
		area_3 = document.createElement('div');
	area_1.setAttribute('style', 'margin-bottom:40px');
	area_2.className = 'zone_contenu zone_invisible';
	area_2.id = 'graph_' + mode;
	area_1.appendChild(area_2);
	area_2.appendChild(area_3);
	this.contentArea.appendChild(area_1);
};

ZzzelpDataAnalyser.prototype.createTDCTable = function(data, identite) {
	this.createGraphArea('TDC');
	console.log(data);
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
				min: data.min,
				max: data.max
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br>',
				formatter: function() {
					return ze_Generation_date_v1(this.x/1000) + ' : ' + ze_Nombre(this.y);
				}
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
			series: data.content
		});
	});
};

ZzzelpDataAnalyser.prototype.createHabitTable = function(data, identite) {
	this.createGraphArea('habitudes');
	$(function () {
		$('#graph_habitudes').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Horaires des variations de ' + identite
	        },
		    xAxis: {
		       categories: [
			       	0,1,2,3,4,5,6,7,8,9,
			       	10,11,12,13,14,15,16,17,18,19,
			       	20,21,22,23
		       	]
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
	            data: data
	        }]
	    });
	});	
};




function ZzzelpTraceurVariation(variation, table, hidden, serveur, domain) {
	this.variation = variation;
	this.serveur = serveur;
	this.domain = domain;
	this.details = false;
	this.createInterface(table, hidden);
}

ZzzelpTraceurVariation.prototype.createInterface = function(table, hidden) {
	var line = table.insertRow(-1),
		plus = line.insertCell(0),
		resolved = line.insertCell(1),
		pseudo = line.insertCell(2),
		TAG = line.insertCell(3),
		date_mini = line.insertCell(4),
		date_maxi = line.insertCell(5),
		TDC_avant = line.insertCell(6),
		TDC_apres = line.insertCell(7),
		ecart = line.insertCell(8),
		details = line.insertCell(9),
		imgResolved = document.createElement('img');

	line.style.display = hidden ? 'none' : '';
	pseudo.innerHTML = ze_Lien_profil(this.variation.pseudo, this.serveur);
	TAG.innerHTML = ze_Lien_alliance(this.variation.alliance, this.serveur);
	date_mini.innerHTML = ze_Generation_date_v1(this.variation.date_mini);
	date_maxi.innerHTML = ze_Generation_date_v1(this.variation.date_maxi);
	TDC_avant.innerHTML = ze_Nombre(parseInt(this.variation.valeur_avant));
	TDC_apres.innerHTML = ze_Nombre(parseInt(this.variation.valeur_apres));
	ecart.innerHTML = ze_Nombre(
						parseInt(this.variation.valeur_apres) - 
					  	parseInt(this.variation.valeur_avant)
					  );

	var imageName = 'pastille_' + (this.variation.resolu == '1' ? 'verte' : 'rouge');
	imgResolved.src = ZzzelpScript.url + 'Images/' + imageName + '.png';
	imgResolved.width = '20';
	resolved.appendChild(imgResolved);

	if(this.variation.resolu === '0') {
		plus.appendChild(this.createDetailsImage());
	}
	this.line = line;
};

ZzzelpTraceurVariation.prototype.createDetailsImage = function() {
	var imgPlus = document.createElement('img');
	imgPlus.src = ZzzelpScript.url + 'Images/plus.png';
	imgPlus.width = '20';
	imgPlus.setAttribute('style', 'vertical-align: text-bottom;cursor:pointer');
	imgPlus.onclick = this.onClick.bind(this);
	imgPlus.dataset.id = this.variation.ID;
	return imgPlus;
};

ZzzelpTraceurVariation.prototype.onClick = function(event) {
	if(!this.details) {
		this.details = true;
		this.launchResolver();
	}
	else {
		ze_Supprimer_element(this.resolverLine);
	}
};

ZzzelpTraceurVariation.prototype.launchResolver = function() {
	var line = this.line.parentNode.insertRow(this.line.rowIndex + 1),
		cell = line.insertCell(0),
		table = document.createElement('table');
	cell.className = 'taille_normale detail_traceur_cell';
	cell.setAttribute('colspan', '9');
	cell.appendChild(table);
	this.table = table;

	var v = this.variation;
	v.valeur_avant = parseInt(v.valeur_avant);
	v.valeur_apres = parseInt(v.valeur_apres);
	this.getCompatibleVariations({
		date_mini 	: v.date_mini,
		date_maxi 	: v.date_maxi,
		valeur_min	: Math.min(v.valeur_avant, v.valeur_apres)*0.2,
		valeur_max	: Math.max(v.valeur_avant, v.valeur_apres)*5,
		signe		: ((v.valeur_avant > v.valeur_apres) ? 1 : -1)
	});
};

ZzzelpTraceurVariation.prototype.getCompatibleVariations = function(conditions) {
	var url;
	if(this.domain == 'zzzelp_interne') {
		url = 'traceur_data?manuel=1';
	}
	else {
		url = 'traceur_script?manuel=1';
	}
	for(var key in conditions) {
		if(key != 'ID') {
			url += '&' + key + '=' + conditions[key];
		}		
	}
	url += '&serveur=' + this.serveur;
	url += '&mode=compatible_variations';
	new ZzzelpAjax({ method : 'GET', domain : this.domain, url : url }, 
		{ success : function(response) {
			this.updateTable(response);
		}.bind(this)
	});
};

ZzzelpTraceurVariation.prototype.updateTable = function(variations) {
	this.table.innerHTML = '';
	for(var i=0; i<variations.length; i++) {
		this.createLine(variations[i]);
	}
};

ZzzelpTraceurVariation.prototype.createLine = function(variation) {
	var line = this.table.insertRow(-1),
		pseudo = line.insertCell(0),
		TAG = line.insertCell(1),
		date_mini = line.insertCell(2),
		date_maxi = line.insertCell(3),
		TDC_avant = line.insertCell(4),
		TDC_apres = line.insertCell(5),
		ecart = line.insertCell(6);

	pseudo.innerHTML = ze_Lien_profil(variation.pseudo, this.serveur);
	TAG.innerHTML = ze_Lien_alliance(variation.alliance, this.serveur);
	date_mini.innerHTML = ze_Generation_date_v1(variation.date_mini);
	date_maxi.innerHTML = ze_Generation_date_v1(variation.date_maxi);
	TDC_avant.innerHTML = ze_Nombre(parseInt(variation.valeur_avant));
	TDC_apres.innerHTML = ze_Nombre(parseInt(variation.valeur_apres));
	ecart.innerHTML = ze_Nombre(
						parseInt(variation.valeur_apres) - 
					  	parseInt(variation.valeur_avant)
					  );
};

ZzzelpTraceurVariation.prototype.selectVariation = function() {

};

ZzzelpTraceurVariation.prototype.updateCompatibleVariations = function() {

};




/*

function Creation_URL_traceur(mode) {
	var lien = ZzzelpScript.url + 'traceur?serveur=' + ze_Analyser_URL('serveur') + '&mode=' + mode,
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

*/