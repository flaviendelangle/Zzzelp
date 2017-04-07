function ZzzelpMultiflood(area, data) {

	this.data = data;
	this.area = area;
	this.sortOrder = {
		croissant : false,
		mode : 'TDC'
	};

	this.prepareData();
	this.createInterface();
	this.update();

	console.log(this);
}

ZzzelpMultiflood.rolesChaine = ['grenier', 'passeur', 'chasseur'];

ZzzelpMultiflood.rows = {
	basic : new Array(
		{ 
			id : 'chef'				, nom : '', 
			nom_court : ''			, triable : true 
		},
		{ 
			id : 'pseudo'			, nom : 'Pseudo', 
			nom_court : 'Pseudo'	, triable : true 
		},
		{ 
			id : 'alliance'			, nom : 'Alliance', 
			nom_court : 'Ally'		, triable : true 
		},
		{ 
			id : 'rang'				, nom : 'Rang', 
			nom_court : 'Rang'		, triable : true 
		},
		{ 
			id : 'TDC_actuel'		, nom : 'Terrain actuel', 
			nom_court : 'Actuel'	, triable : true 
		},
		{ 
			id : 'distance'			, nom : 'Distance', 
			nom_court : 'Distance', triable : true 
		},
		{ 
			id : 'arrivee'			, nom : 'Arrivée', 
			nom_court : 'Arrivée'	, triable : true 
		},
		{ 
			id : 'TDC_arrivé'		, nom : 'Terrain arrivé', 
			nom_court : 'Impact'	, triable : true 
		},
		{ 
			id : 'TDC_final'		, nom : 'Terrain final', 
			nom_court : 'Final'		, triable : true 
		}
	),
	hunt : new Array(
		{ 
			id : 'chasses'			, nom : 'Chasses', 
			nom_court : 'Chasses'	, triable : false 
		},
		{ 
			id : 'validation'		, nom : '', 
			nom_court : ''			, triable : false 
		}
	),
	war : new Array(
		{ 
			id : 'niveaux'			, nom : 'Niveaux', 
			nom_court : 'Niveaux'	, triable : false 
		},
		{ 
			id : 'armee'			, nom : 'Armée', 
			nom_court : 'Armée'		, triable : false 
		},
		{ 
			id : 'modif'			, nom : 'Modif', 
			nom_court : 'Modif'		, triable : false
		},
		{ 
			id : 'validation'		, nom : '', 
			nom_court : ''			, triable : false 
		}
	)
};

ZzzelpMultiflood.prototype.prepareData = function() {
	this.prepareKeys();
	this.prepareHunts();
	this.applyRanks();
	this.organization = new ZzzelpScriptChaine().analyse(this.getRoles());
	this.usernames.sort(this.sortingFunction.bind(this));
	this.getAlliances();
};

ZzzelpMultiflood.prototype.prepareKeys = function() {
	for(var key in this.data) {
		this[key] = this.data[key];
	}
	this.modifications = [];
	this.usernames = [];
	for(var username in this.players) {
		this.usernames.push(username);
		this.players[username].NPF = false;
		this.prepareDataPlayer(username, this.players[username]);
	}
};

ZzzelpMultiflood.prototype.prepareDataPlayer = function(username, data) {
	if(data.alliance.length === 0) {
		this.players[username].alliance = 'SA';
	}
	this.players[username].x = parseInt(data.x);
	this.players[username].y = parseInt(data.y);
	this.players[username].TDC = parseInt(data.TDC);
	this.players[username].distance = ze_Calcul_distance(
		this.players[username].x, 
		this.players[username].y, 
		this.players[this.username].x, 
		this.players[this.username].y
	);
};

ZzzelpMultiflood.prototype.prepareHunts = function() {
	for(var i=0; i<this.chasses.length; i++) {
		var chasse = this.chasses[i];
		if(this.players[chasse.pseudo].hunt === undefined) {
			this.players[chasse.pseudo].hunt = chasse;
		}
	}
};

ZzzelpMultiflood.prototype.applyRanks = function() {
	var rank;
	this.appliedRanks = {};

	for(var i=0; i<this.ranks.length; i++) {
		rank = this.ranks[i];
		if(rank.alliances == "*") {
			this.ranks[i].alliances = null;
		}
		else {
			var alliances = rank.alliances.replace(/ /g, '').split(',');
			this.ranks[i].alliances = alliances;
		}
		if(rank.mode < 2) {
			this.ranks[i].regle = rank.regle.replace(/ /g, '').split(',');
		}
	}
	for(var username in this.players) {
		rank = this.players[username].rang;
		this.applyRanksUsername(username);
		this.applyRanksAlliance(username);
		this.applyRanksRegexp(username, rank);
		this.applyRanksContent(username, rank);
	}
};

ZzzelpMultiflood.prototype.applyRanksUsername = function(username) {
	var rank;
	for(var n=0; n<this.ranks.length; n++) {
		rank = this.ranks[n];
		if(this.areRankAlliancesCompatible(rank.alliances)) {
			if(rank.mode === '0' && in_array(username, rank.regle)) {
				this.applyRank(
					username,
					rank.rang_affiche,
					rank.couleur,
					rank.ne_pas_flooder,
					rank.role
				);
			}
		}
	}	
};

ZzzelpMultiflood.prototype.applyRanksAlliance = function(username) {
	var rank,
		alliance = this.players[username].alliance;
	for(var n=0; n<this.ranks.length; n++) {
		rank = this.ranks[n];
		if(this.areRankAlliancesCompatible(rank.alliances)) {
			if(rank.mode == '1' && in_array(alliance, rank.regle)) {
				this.applyRank(
					username, 
					rank.rang_affiche, 
					rank.couleur, 
					rank.ne_pas_flooder, 
					rank.role
				);
			}
		}
	}	
};

ZzzelpMultiflood.prototype.applyRanksRegexp = function(username, actualRank) {
	var rank, regExp;
	for(var n=0; n<this.ranks.length; n++) {
		rank = this.ranks[n];
		if(this.areRankAlliancesCompatible(rank.alliances)) {
			regExp = new RegExp(rank.regle);
			if(rank.mode == '2' && actualRank.match(regExp)) {
				var result = regExp.exec(actualRank),
					finalRank = rank.rang_affiche;
				for(var i=1;i<result.length; i++) {
					finalRank = finalRank.replace('$' + (i), result[i]);
				}
				this.applyRank(
					username, 
					finalRank, 
					rank.couleur, 
					rank.ne_pas_flooder, 
					rank.role
				);			
			}
		}
	}	
};

ZzzelpMultiflood.prototype.applyRanksContent = function(username, actualRank) {
	var rank;
	for(n=0; n<this.ranks.length; n++) {
		rank = this.ranks[n];
		if(this.areRankAlliancesCompatible(rank.alliances)) {
			if(rank.mode == '3' && ~actualRank.indexOf(rank.regle)) {
				this.applyRank(
					username, 
					rank.rang_affiche, 
					rank.couleur, 
					rank.ne_pas_flooder, 
					rank.role
				);
			}
		}
	}	
};

ZzzelpMultiflood.prototype.areRankAlliancesCompatible = function(alliances) {
	if(alliances === null) {
		return true;
	}
	for(i=0; i<3; i++) {
		if(this.alliances[i] !== '' && in_array(this.alliances[i], alliances)) {
			return true;
		}
	}
	return false;
};

ZzzelpMultiflood.prototype.applyRank = function(username, rank, color, NPF, role) {
	if(NPF == "1") {
		this.players[username].NPF = true;
	}
	if(!this.players[username].rankApplied) {
		this.players[username].rankApplied = true;
		this.appliedRanks[username] = { 
			rank 	: rank,
			color 	: color
		};
	}
	this.players[username].role = role;
};

ZzzelpMultiflood.prototype.getRoles = function() {
	var data,
		roles = {
			grenier 	: [],
			passeur 	: [],
			chasseur 	: [],	
	};
	for(var username in this.players) {
		data = this.players[username];
		if(data.role && in_array(data.role, ZzzelpMultiflood.rolesChaine)) {
			roles[data.role].push({
				pseudo 	: username,
				rang 	: this.appliedRanks[username].rank,
				TDC 	: data.TDC
			});
		}
	}
	return roles;
};

ZzzelpMultiflood.prototype.sortingFunction = function(a,b) {
	var valueA, valueB;
	if(this.sortOrder.mode == 'TDC_2') {
		valueA = this.TDCs[a][0];
		valueB = this.TDCs[b][0];
	}
	else if(this.sortOrder.mode == 'TDC_3') {
		valueA = donnees.TDCs[a][1];
		valueB = donnees.TDCs[b][1];
	}
	else if(this.sortOrder.mode == 'rang') {
		valueA = this.organisation[a] ? this.organisation[a].numero : 10000;
		valueB = this.organisation[b] ? this.organisation[b].numero : 10001;
	}
	else if(this.sortOrder.mode == 'pseudo') {
		valueA = a;
		valueB = b;
	}
	else {
		valueA = this.players[a][this.sortOrder.mode];
		valueB = this.players[b][this.sortOrder.mode];
	}
	if(valueA < valueB) {
		return (this.sortOrder.croissant ? -1 : 1);
	}
	else if(valueA > valueB) {
		return (this.sortOrder.croissant ? 1 : -1);
	}
	if(this.players[a].TDC < this.players[b].TDC) {
		return 1;
	}
	else if(this.players[a].TDC > this.players[b].TDC) {
		return -1;
	}
	return 0;
};

ZzzelpMultiflood.prototype.getAlliances = function() {
	var alliances = {},
		data;
	for(var username in this.players) {
		data = this.players[username];
		if(typeof alliances[data.alliance] == 'undefined') {
			alliances[data.alliance] = { 
				nombre 	: 1, 
				TDC 	: data.TDC 
			};
		}
		else {
			alliances[data.alliance].nombre ++;
			alliances[data.alliance].TDC += data.TDC;
		}
	}
	this.alliances = ZzzelpUtils.array.sort(alliances, 'TDC');
};

ZzzelpMultiflood.prototype.createInterface = function() {
	this.createArea();
	this.createAlliancesTable();
	this.createOptionTable();
	this.createTable();
	this.addHuntAmount();
	this.createLaunchingLine();
	this.createReturnButton();
};

ZzzelpMultiflood.prototype.createArea = function() {
	var mainArea = ZzzelpDOM('div'),
		returnArea = ZzzelpDOM('div'),
		zzzelpFloodsArea = ZzzelpDOM('div');
	this.sections = {
		main 			: mainArea,
		return 			: returnArea,
		zzzelpFloods 	: zzzelpFloodsArea
	};
	this.area.appendChild(mainArea);
	this.area.appendChild(returnArea);
	this.area.appendChild(zzzelpFloodsArea);

	this.sections.return.style.display = 'none';
	this.sections.zzzelpFloods.style.display = 'none';
};

ZzzelpMultiflood.prototype.createAlliancesTable = function() {
	this.allianceOptions = {};
	var table = ZzzelpDOM('table', {
			class : 'tableau_alliances_MF tableau_ombre animated fadeIn'
		}),
		line = table.insertRow(0),
		rows = ['TAG', 'TDC', 'Nb', ''];

	for(var i=0; i<rows.length; i++) {
		var cell = ZzzelpDOM('th');
		cell.innerHTML = rows[i];
		line.appendChild(cell);
	}

	for(var TAG in this.alliances) {
		this.createAllianceLine(table, TAG);
	}
	if(table.rows.length > 4) {
		this.createAllianceExtender(table);
	}
	this.sections.main.appendChild(table);
};

ZzzelpMultiflood.prototype.createAllianceLine = function(table, TAG) {
	var alliance = ZzzelpDOM('td');
	alliance.appendChild(ZzzelpDOM('a', {
		innerHTML 	: TAG,
		target 		: '_BLANK',
		href 		: 'http://zzzelp.fr/traceur/alliance?serveur=' + 
					  this.server + '&alliance=' + TAG,		
	}));

	var TDC = ZzzelpDOM('td', {
			innerHTML	: ze_Nombre(this.alliances[TAG].TDC)
	});

	var population = ZzzelpDOM('td', {
			innerHTML	: ze_Nombre(this.alliances[TAG].nombre)
	});

	var visible = ZzzelpDOM('td'),
		checkbox = ZzzelpDOM('input', {
			type 	: 'checkbox',
			checked : true,
			onchange : this.hideUselessLines.bind(this)
	});
	visible.appendChild(checkbox);

	var line = ZzzelpDOM('tr', {
			data : { alliance : TAG }
		}, [alliance, TDC, population, visible]
	);
	table.appendChild(line);

	this.allianceOptions[TAG] = checkbox;

	if(table.rows.length > 4) {
		line.style.display = 'none';
	}
};

ZzzelpMultiflood.prototype.createAllianceExtender = function(table) {
	var cell = ZzzelpDOM('td', {
			colspan : 4,
			class : 'alliance-extender',
			onclick : this.extendAllianceTable.bind(this)
	});
	for(var i=0; i<3; i++) {
		cell.appendChild(ZzzelpDOM('div'));
	}
	table.appendChild(ZzzelpDOM('tr', {}, [cell]));
	this.alliancesExtended = false;
};

ZzzelpMultiflood.prototype.extendAllianceTable = function(event) {
	this.alliancesExtended = !this.alliancesExtended;
	var i = 0;
	for(var TAG in this.allianceOptions) {
		i++;
		var line = this.allianceOptions[TAG].parentNode.parentNode,
			show = (this.alliancesExtended || i<4);
		line.style.display = show ? '' : 'none';
	}
};

ZzzelpMultiflood.prototype.createOptionTable = function() {
	this.getDefaultOptions();

	var cell = ZzzelpDOM('th', {
			colspan 	: 2,
			innerHTML 	: 'OPTIONS DU MULTIFLOOD',
			onclick 	: this.switchOptionsMode.bind(this)
	});

	var line = ZzzelpDOM('tr', {}, [cell]);

	var	table = ZzzelpDOM('table', {
			class : 'tableau_options_MF tableau_ombre animated fadeIn'
		}, [line]
	);

	for(var key in this.optionsValue) {
		table.appendChild(this.createOptionLine(key, this.optionsValue[key]));
	}

	this.sections.main.appendChild(table);
	this.optionTable = table;
};

ZzzelpMultiflood.prototype.getDefaultOptions = function() {
	this.optionsValue = {
		capa_flood : { 
			nom 	: 'Nombre d\'unités', 
			value 	: ze_Nombre(parseInt(this.capacity)), 
			type 	: 'text', 
			class 	: 'input_tableau input_haut'
		},
		vitesse_attaque : { 
			nom 	: 'Vitesse d\'attaque', 
			value 	: ze_Nombre(parseInt(this.attack_speed)), 
			type 	: 'text', 
			class 	: 'input_niveau input_haut'
		},
		affichage_hdp : { 
			nom 	: 'Voir les HDP', 
			value 	: '', 
			type 	: 'checkbox', 
			checked : true
		}
	};
};

ZzzelpMultiflood.prototype.createOptionLine = function(id, option) {
	var entete = ZzzelpDOM('td', {
		innerHTML : option.nom + ' : '
	});

	var input = ZzzelpDOM('input', {
			type 	: option.type,
			value 	: option.value,
			id 		: id
	});

	var value = ZzzelpDOM('td', {}, [input]),
		line = ZzzelpDOM('tr', {}, [entete, value]);

	if(option.class) {
		input.className = option.class;
	}
	if(option.checked) {
		input.setAttribute('checked', option.checked);
	}
	if(option.type == 'text') {
		input.onkeyup = function onkeyup(event) {
			ze_Ajout_espaces(this) ;
			return false;
		};
	}
	input.onchange = this.updateOption.bind(this);
	value.appendChild(input);

	return line;
};


ZzzelpMultiflood.prototype.updateOption = function(event) {
	var element = event.currentTarget,
		option = element.id,
		value;

	if(option == 'affichage_hdp') {
		this.optionsValue.affichage_hdp.checked = element.checked;
		this.hideUselessLines();
	}
	else if(option == 'capa_flood') {
		value = parseInt(element.value.replace(/ /g, ''));
		this.optionsValue.capa_flood.value = value;
		this.capacity = value;
	}
	else if(option == 'vitesse_attaque') {
		value = parseInt(element.value.replace(/ /g, ''));
		this.optionsValue.vitesse_attaque.value = value;
		this.attack_speed = value;
		this.update();
	}
};

ZzzelpMultiflood.prototype.switchOptionsMode = function() {
	var lignes = this.optionTable.rows;
	var display = lignes[1].style.display;
	for(var i=1; i<lignes.length; i++) {
		lignes[i].style.display = (display == 'none') ? '' : 'none';
	}
};

ZzzelpMultiflood.prototype.createReturnButton = function() {
	this.sections.return.appendChild(ZzzelpDOM('a', {
		innerHTML 	: 'Retour au tableau',
		class 		: 'bouton',
		onclick 	: this.return.bind(this) 
	}));
};

ZzzelpMultiflood.prototype.createTable = function() {
	this.table = ZzzelpDOM('table', {
		class : 'tableau_MF tableau_ombre animated fadeIn',
		data : {
			mode : donnees.mode_MF
		}
	});
	this.createTableHeader();
	this.sections.main.appendChild(this.table);
};

ZzzelpMultiflood.prototype.createTableHeader = function() {
	var rows, cells = [];
	if(this.mode_MF == 'chasse') {
		rows = ZzzelpMultiflood.rows.basic.concat(ZzzelpMultiflood.rows.hunt);
	}
	else {
		rows = ZzzelpMultiflood.rows.basic.concat(ZzzelpMultiflood.rows.war);
	}
	var cell;
	for(var i=0; i<rows.length; i++) {	
		var row = rows[i],
			entier = ZzzelpDOM('span', {
				innerHTML : row.nom
			}),
			shortcut = ZzzelpDOM('span', {
				innerHTML : row.nom_court
			});
		cell = ZzzelpDOM('th', {
			id : 'colonne_' + row.id
		}, [entier, shortcut]
		);
		if(row.triable) {
			cell.dataset.triable = 1;
			cell.onclick = this.sort.bind(this);
		}
		cells.push(cell);
	}
	this.createCheckingCell(cell);
	this.table.appendChild(ZzzelpDOM('tr', {}, cells));
};

ZzzelpMultiflood.prototype.createCheckingCell = function(cell) {
	var checkboxs = {},
		childs = [],
		options = new Array(
			{ nom : 'Tout cocher'	, valeur : 'all' },
			{ nom : 'Floods chaîne'	, valeur : 'chaine' }
		);
	for(var alliance in this.alliances) {
		options.push({ 
			nom 	: 'Joueurs ' + alliance, 
			valeur 	: 'players_' + alliance 
		});
	}

	for(var i=0; i<options.length; i++) {
		var label = ZzzelpDOM('span', {
				for 		: 'cocher_' + options[i].valeur,
				innerHTML 	: options[i].nom,
				class 		: 'entete_option_cocher_MF'
		});

		var checkbox = ZzzelpDOM('input', {
				type 		: 'checkbox',
				id 			: 'check_' + options[i].valeur,
				onchange 	: function onchange(event) {
					this.select(event.currentTarget.id);
				}.bind(this)
		});
		checkboxs[checkbox.id] = checkbox;

		childs.push(ZzzelpDOM('span', {
				class : 'option_cocher_MF'
			}, [label, checkbox]
		));
	}
	cell.appendChild(checkAll = ZzzelpDOM('input', {
			type : 'checkbox',
	}));
	cell.appendChild(ZzzelpDOM('div', { class : 'menu_cocher' }, childs));

	this.selectOptions = checkboxs;
};

ZzzelpMultiflood.prototype.sort = function(k) {
	var id = event.currentTarget.cellIndex,
		rows = new Array(
			'chef', 'pseudo', 'alliance', 'rang', 'TDC',
			'distance', 'distance', 'TDC_2', 'TDC_3', 'chasse'
		),
		defaultOrder = new Array(
			false, true, true, true, 
			false, true, true, false, false, true
		);
	var croissant;
	if(this.sortOrder.mode == rows[id]) {
		croissant = !this.sortOrder.croissant;
	}
	else {
		croissant = defaultOrder[id];
	}
	this.sortOrder = { 
		croissant 	: croissant,
		mode 		: rows[id]
	};
	this.usernames.sort(this.sortingFunction.bind(this));
	this.update();
};

ZzzelpMultiflood.prototype.addHuntAmount = function() {
	var n = 0;
	for(var i=0; i<this.chasses.length; i++) {
		n += parseInt(this.chasses[i].valeur);
	}
	this.sections.main.appendChild(ZzzelpDOM('div', {
		innerHTML 	: 'Chasses en cours : ' + ze_Nombre(n) + 'cm²',
		class 		: 'ligne_total_chasses animated fadeIn'
	}));
};

ZzzelpMultiflood.prototype.createLaunchingLine = function() {
	var flood = ZzzelpDOM('a', {
			innerHTML 	: 'Calcul floods',
			class 		: 'bouton',
			onclick : function onclick(event) {
				this.launchZzzelpFlood('classique');
			}.bind(this)
	});

	var probe = ZzzelpDOM('a', {
			innerHTML 	: 'Calcul sondes',
			class 		: 'bouton',
			onclick : function onclick(event) {
				this.launchZzzelpFlood('sonde');
			}.bind(this)
	});

	this.sections.main.appendChild(ZzzelpDOM('div', {
			class : 'barre_boutons  animated fadeIn'
		}, [flood, probe]
	));
};

ZzzelpMultiflood.prototype.update = function() {
	this.clean();
	this.buildTable();
	this.hideUselessLines();
};

ZzzelpMultiflood.prototype.clean = function() {
	if(this.table && this.table.rows.length > 1) {
		console.log('Nettoyage du Multiflood');
		var longueur = this.table.rows.length;
		for(var i=1; i<longueur; i++) {
			ze_Supprimer_element(this.table.rows[1]);
		}
	}
};
	
ZzzelpMultiflood.prototype.buildTable = function() {
	this.computeFields();
	for(i=0; i<this.usernames.length; i++) {
		var username = this.usernames[i],
			data = this.players[username],
			parameters = {
				server 				: this.server,
				mode 				: this.mode_MF,
				scriptOwner 		: this.username,
				attack_speed 		: this.attack_speed,
				rank 				: this.appliedRanks[username],
				fields 				: this.fields[username],
				scriptOwnerField	: this.players[this.username].TDC,
				floods 				: this.floods
		};
		var instance = new ZzzelpMultifloodLine(username, data, parameters);
		this.players[username].element = instance;
		this.table.appendChild(instance.line);
	}
};

ZzzelpMultiflood.prototype.computeFields = function() {
	this.fields = {};
	for(var username in this.players) {
		this.fields[username] = {
			impact 	: this.players[username].TDC, 
			final 	: this.players[username].TDC
		};
	}
	if(this.floods) {
		var flood, value, possible;
		for(var i=0; i<this.floods.length; i++) {
			this.floods[i].valeur = parseInt(this.floods[i].valeur);
			flood = this.floods[i];
			value = this.getFloodRealValue(flood);
			if(value > 0) {
				this.updateFields(flood.attaquant, value, flood.date);
				this.updateFields(flood.cible, -value, flood.date);
			}
			this.floods[i].possible = (value > 0);
		}
	}
};

ZzzelpMultiflood.prototype.getFloodRealValue = function(flood) {
	var att = this.fields[flood.attaquant],
		def = this.fields[flood.cible],
		indexAtt = this.usernames.indexOf(flood.attaquant),
		indexDef = this.usernames.indexOf(flood.cible);
	if(indexAtt + indexDef == -2) {
		return 0;
	}
	else if(indexAtt == -1) {
		return parseInt(ze_Majoration(flood.valeur, def.final*0.2));
	}
	else if(indexDef == -1) {
		return parseInt(ze_Majoration(flood.valeur, att.final*0.2));
	}
	else if(att.final <= 2*def.final && def.final <= att.final*3) {
		return parseInt(ze_Majoration(flood.valeur, def.final*0.2));
	}
	else {
		return 0;
	}
};

ZzzelpMultiflood.prototype.updateFields = function(username, value, impact) {
	impact = parseInt(impact);
	if(~this.usernames.indexOf(username)) {
		this.fields[username].final += value;
		var distance = this.players[username].distance,
			duration = ze_Calcul_temps_trajet(distance, this.attack_speed),
			userImpact = time() + duration;
		if(userImpact > impact) {
			this.fields[username].impact += value;
		}
	}
};

ZzzelpMultiflood.prototype.hideUselessLines = function() {
	var showHdp = this.optionsValue.affichage_hdp.checked;
	for(var username in this.players) {
		var data = this.players[username],
			att = parseInt(this.players[this.username].TDC),
			def = parseInt(data.TDC);
		var	ownLine = (username == this.username),
			isAllianceChecked = this.allianceOptions[data.alliance].checked,
			reachable = (att <= 2*def && def <= att*3);

		if(ownLine || ((showHdp || reachable) && isAllianceChecked)) {	
			data.element.line.style.display = '';
		}
		else {
			data.element.line.style.display = 'none';
		}
	}
};

ZzzelpMultiflood.prototype.select = function(mode) {
	this.updateSelectMenu(mode);
	this.selectAll(this.selectOptions.check_all.checked);

	if(this.selectOptions.check_chaine.checked) {
		this.selectChaine();
	}

	for(var TAG in this.alliances) {
		var checkbox = this.selectOptions['check_players_' + TAG];
		this.selectAlliance(TAG, checkbox.checked, false);
	}
};

ZzzelpMultiflood.prototype.selectAll = function(checked) {
	var checkbox;
	for(var username in this.players) {
		checkbox = this.players[username].element.checkbox;
		if(checkbox) {
			checkbox.checked = checked;
		}
	}
};

ZzzelpMultiflood.prototype.selectChaine = function() {
	var players = this.getAttackablePlayersChaine();
	for(var username in players) {
		checkbox = players[username];
		if(checkbox) {
			checkbox.checked = true;
		}
	}
};

ZzzelpMultiflood.prototype.selectAlliance = function(TAG, checked, force) {
	if(checked || force) {
		var checkbox, alliance;
		for(var username in this.players) {
			checkbox = this.players[username].element.checkbox;
			alliance = this.players[username].alliance;
			if(checkbox && alliance == TAG) {
				checkbox.checked = checked;
			}
		}		
	}
};

ZzzelpMultiflood.prototype.updateSelectMenu = function(mode) {
	if(mode == 'check_all') {
		for(var key in this.selectOptions) {
			var checkbox = this.selectOptions[key];
			checkbox.checked = this.selectOptions.check_all.checked;
		}
	}
	else {
		this.selectOptions.check_all.checked = false;
	}
};

ZzzelpMultiflood.prototype.getAttackablePlayersChaine = function() {
	var before,
		players = {};
	for(var username in this.organization) {
		if(username == this.username) {
			before = true;
		}
		else if(before || this.players[username].role == 'chasseur') {
			players[username] = this.players[username].element.checkbox;
		}
	}
	return players;
};

ZzzelpMultiflood.prototype.launchZzzelpFlood = function(mode) {
	this.sections.main.style.display = 'none';
	this.sections.return.style.display = '';
	this.sections.zzzelpFloods.style.display = '';
	document.body.scrollTop = 0;

	if(this.zzzelpfloods) {
		this.zzzelpfloods.destroy();
	}
	else {
		var data = this.prepareDataZzzelpFloods(mode);
		this.zzzelpfloods = new ZzzelpFloods(this.sections.zzzelpFloods, data);
	}
};

ZzzelpMultiflood.prototype.prepareDataZzzelpFloods = function(mode) {
	var data = {
			username 			: this.username,
			capacity 			: this.capacity,
			server 				: this.server,
			attack_speed 		: this.attack_speed,
			method 				: mode,
			coordonnees 		: {},
			variations 			: [],
			theme				: 'zzzelp',
			options 			: true,
			resume				: true,
			lancement_zzzelp	: true
	};
	data.coordonnees[this.username] = this.players[this.username];

	var checkbox,
		dataPlayer;
	for(var username in this.players) {
		dataPlayer = this.players[username];
		checkbox = dataPlayer.element.checkbox;
		if(checkbox && checkbox.checked) {
			data.coordonnees[username] = this.players[username];
		}
		else {
			data.coordonnees[username] = this.players[username];
			data.coordonnees[username].active = 'NON';
		}
	}
	for(i=0; i<this.floods.length; i++) {
		data.variations.push([this.floods[i]]);
	}
	return data;
};

ZzzelpMultiflood.prototype.return = function() {
	this.sections.main.style.display = '';
	this.sections.return.style.display = 'none';
	this.sections.zzzelpFloods.style.display = 'none';
};






function ZzzelpMultifloodLine(username, data, parameters) {
	this.username = username;
	this.data = data;
	this.parameters = parameters;

	this.init();
	this.build();
}

ZzzelpMultifloodLine.prototype.init = function() {
	for(var key in this.data) {
		this[key] = this.data[key];
	}
	for(key in this.parameters) {
		this[key] = this.parameters[key];
	}
};

ZzzelpMultifloodLine.prototype.build = function() {
	this.line = ZzzelpDOM('tr');
	/*
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
	*/
	//var	validation = ligne.insertCell(-1);
	this.addGradeCell();
	this.addUsernameCell();
	this.addAllianceCell();
	this.addRankCell();
	this.addFieldCell(this.TDC);
	this.addDistanceCell();
	this.addImpactCell();
	this.addFieldCell(this.fields.impact);
	this.addFieldCell(this.fields.final);
	if(this.mode == 'chasse') {
		this.addHuntCell();
	}
	else if(this.mode == 'guerre') {

	}
	this.addLaunchCell();
	/*
	else if(donnees.mode_MF == 'guerre') {
		Creation_menu_niveaux(i, donnees.pseudos[i]);
		Creation_menu_armee(i, donnees.pseudos[i]);
		Creation_cellule_edit_guerre(i, donnees.pseudos[i], this.players[donnees.pseudos[i]].TDC);
	}
	Creation_cellule_validation(i, donnees.pseudos[i]);
	Creation_menu_variation(donnees.pseudos[i], donnees.TDCs[donnees.pseudos[i]], i);
	*/
	this.addVariationMenu();
	this.addEvents();
};

ZzzelpMultifloodLine.prototype.addGradeCell = function() {
	var childs = [];
	if(this.chef == 'true') {
		childs.push(ZzzelpDOM('img', {
			src 	: ZzzelpScript.url + 'Images/chef.png',
			title	: 'Chef de l\'une de vos alliances'
		}));
	}
	this.line.appendChild(ZzzelpDOM('td', {}, childs));
};

ZzzelpMultifloodLine.prototype.addUsernameCell = function() {
	var link = ZzzelpDOM('a', {
			target 	: '_BLANK',
			href 	: 'http://' + this.server + 
				'.fourmizzz.fr/Membre.php?Pseudo=' + this.username
	});
	if(this.username.length > 17) {
		link.innerHTML = this.username.substr(0,14) + '...';
	}
	else {
		link.innerHTML = this.username;
	}
	this.line.appendChild(ZzzelpDOM('td', {}, [link]));
};

ZzzelpMultifloodLine.prototype.addAllianceCell = function() {
	var link = ZzzelpDOM('a', {
			target 	: '_BLANK',
			innerHTML : this.alliance,
			href 	: 'http://' + this.server + 
					  '.fourmizzz.fr/classementAlliance.php?alliance=' +
					  this.alliance
	});

	this.line.appendChild(ZzzelpDOM('td', {}, [link]));
};

ZzzelpMultifloodLine.prototype.addRankCell = function() {
	var cell = this.line.insertCell(-1);
	if(this.username == this.scriptOwner)  {
		this.line.dataset.chargeur = 'true';
	}
	if(this.rank) {
		cell.innerHTML = this.rank.rank;
		if(this.username != this.scriptOwner)  {
			this.line.style.background = '#' + this.rank.color;	
		}
	}
};

ZzzelpMultifloodLine.prototype.addFieldCell = function(field) {
	var fullField = ZzzelpDOM('span', {
			innerHTML 	: ze_Nombre(field),
			class 		: 'TDC_complet'
	});

	var shortField = ZzzelpDOM('span', {
			innerHTML 	: ze_Nombre_raccourci(field, 3),
			class 		: 'TDC_raccourci'
	});

	var variation = ZzzelpDOM('span', {
			class 	: 'variation_TDC'
	});

	this.line.appendChild(ZzzelpDOM('td', {}, 
		[fullField, shortField, variation]
	));
	/*
	if(n ==  1) {
		var modification = document.createElement('input');
		modification.type = 'text';
		modification.value = ze_Nombre(TDC);
		modification.setAttribute('class', 'input_tableau modification_TDC');
		modification.setAttribute('style', 'display:none');
		modification.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this); return false}
		document.querySelector('.tableau_MF').rows[i+1].cells[((n>0) ? (6+n) : 4)].appendChild(modification);
	}*/
};

ZzzelpMultifloodLine.prototype.addDistanceCell = function() {
	var distance = parseInt(this.distance),
		type;
	if(distance < 100) {
		type = 'proche';
	}
	else if(distance < 300) {
		type = 'moyen';
	}
	else {
		type = 'loin';
	}
	this.line.appendChild(ZzzelpDOM('td', {
		data : {
			distance : type
		},
		innerHTML : distance
	}));
};

ZzzelpMultifloodLine.prototype.addImpactCell = function() {
	var impact = ze_Calcul_temps_trajet(this.distance, this.attack_speed);
	this.impact = time() + impact;
	this.line.appendChild(ZzzelpDOM('td', {
		innerHTML : this.formateDate(impact)
	}));
};

ZzzelpMultifloodLine.prototype.addHuntCell = function() {
	var childs = [];
	if(this.hunt !== undefined) {
		var dateInt = parseInt(this.hunt.date),
			dateStr = ze_Generation_date_v1(dateInt, true, false, false),
			fullValue = ze_Nombre(parseInt(this.hunt.valeur)),
			shortValue = ze_Nombre_raccourci(parseInt(this.hunt.valeur), 3);

		childs.push(ZzzelpDOM('span', {
			class 		: 'chasse_complet',
			innerHTML 	: fullValue + ' (' + dateStr + ')'
		}));

		childs.push(ZzzelpDOM('span', {
			class 		: 'chasse_raccourci',
			innerHTML 	: shortValue + ' (' + dateStr + ')'
		}));
	}
	this.line.appendChild(ZzzelpDOM('td', {}, childs));
};

ZzzelpMultifloodLine.prototype.addLaunchCell = function() {
	var childs = [];
	if(!this.NPF && this.username != this.scriptOwner) {
		var att = this.scriptOwnerField,
			def = this.TDC;
		if(att <= 2*def && def <= att*3) {
			var checkbox = ZzzelpDOM('input', {
				type 	: 'checkbox'
			});
			this.checkbox = checkbox;
			childs.push(checkbox);
		}
	}
	this.line.appendChild(ZzzelpDOM('td', {}, childs));
};

ZzzelpMultifloodLine.prototype.addVariationMenu = function() {
	var self = this.username,
		ex_TDC = this.TDC,
		start = 0,
		index = ['impact', 'final'];
	for(n=0; n<2; n++) {
		var cell = this.line.cells[7+n],
			TDC = this.fields[index[n]];
		if(TDC != ex_TDC) {
			cell.className = 'TDC_varie';
			var image = ZzzelpDOM('img', {
					src : ZzzelpScript.url + 'Images/' + 'Fleche_' +
						  ((TDC > this.TDC) ? 'haut' : 'bas') + '.png'
			});
			var menu = ZzzelpDOM('div', {
					class : 'menu_variations'
			});
			cell.querySelector('.variation_TDC').appendChild(image);
			cell.querySelector('.variation_TDC').appendChild(menu);

			var total = 0;
			for(var i=start; i<this.floods.length; i++) {
				var flood = this.floods[i];
				if(n === 0 && parseInt(flood.date) >= this.impact) {
					start = i;
					break;
				}
				if(flood.attaquant == self || flood.cible == self) {
					if(flood.possible) {
						total += (flood.attaquant == self ? 1 : -1) * flood.valeur;
					}
					menu.appendChild(this.getVariationLine(flood));
				}
			}
			menu.appendChild(this.getVariationTotalLine(total));

		}
		ex_TDC = TDC;	
	}
};

ZzzelpMultifloodLine.prototype.getVariationLine = function(flood) {
	var content, attackPlayer;
	if(flood.attaquant == this.username) {
		attackPlayer = flood.cible;
	}
	else {
		attackPlayer = flood.attaquant;
	}
	if(attackPlayer.length > 10) {
		content =  attackPlayer.substr(0,10);
	}
	else {
		content = attackPlayer;
	}
	var isAttacker = (flood.attaquant == this.username),
		link = ZzzelpDOM('a', {
			target 		: '_BLANK',
			innerHTML 	: content,
			href 		: 'http://' + this.server + 
				   	  	  '.fourmizzz.fr/Membre.php?pseudo=' +
					  	  (isAttacker ? flood.cible : flood.attaquant)
		}),
		player = ZzzelpDOM('span', { class : 'span_1' }, [link]);

	var signe = isAttacker ? '+' : '-',
		value = parseInt(flood.valeur),
		TDC = ZzzelpDOM('span', {
			innerHTML 	: signe + ze_Nombre_raccourci(value, 3),
			class 		: 'span_2'
	});

	var date = ze_Generation_date_precise(flood.date),
		heure = ZzzelpDOM('span', {
			innerHTML 	: date.substr(0, date.length - 3),
			class 	  	:'span_3'
	});

	var annule =  (flood.possible ? '' : ' flood_annule'),
		variation = ZzzelpDOM('div', {
			class : 'ligne_variation' + annule
		}, [player, TDC, heure]);

	return variation;
};

ZzzelpMultifloodLine.prototype.getVariationTotalLine = function(total) {
	var gras = ZzzelpDOM('a', {
			innerHTML : 'TOTAL :'
	});

	var joueur = ZzzelpDOM('span', {
			class : 'span_1'	
		}, [gras]
	);

	var signe = (total >= 0 ? '+' : '-'),
		TDC = ZzzelpDOM('span', {
			class 		: 'span_2',
			innerHTML 	: signe + ze_Nombre_raccourci(Math.abs(total), 3)
	});

	var heure = ZzzelpDOM('span', {
			innerHTML 	: '',
			class 		: 'span_3'
	});

	return ZzzelpDOM('div', {
			class : 'ligne_variation'
		}, [joueur, TDC, heure]
	);
};

ZzzelpMultifloodLine.prototype.addEvents = function() {
	this.line.onmouseenter = function onmouseenter(event) {
		var percent = 0.2,
			color = this.style.background;
		this.dataset.couleur = color;
		var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
		this.style.background = "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
	};

	this.line.onmouseleave = function onmouseleave(event) {
		this.style.background = this.dataset.couleur;
	};	
};

ZzzelpMultifloodLine.prototype.formateDate = function(seconds) {
	var date = new Date((time() + seconds)*1000);
	return ((date.getHours() >= 10) ? ''  : '0') + date.getHours() + ':' + 
		   ((date.getMinutes() >= 10) ? '' : '0') + date.getMinutes();
};


function ZzzelpGuerre() {

}

ZzzelpGuerre.prototype.createCombatDatabaseArea = function() {

};







