function ZzzelpRessourcesSender(section, data) {
	this.section = section;
	this.data = data;
	this.convois = 0;

	this.prepareData();
	this.createInterface();
	this.updateConvois();
}

ZzzelpRessourcesSender.modes = {
	free : {
		name : 'Envoyer les ouvrières libres',
	},
	all : {
		name : 'Envoyer toutes les ouvrières'
	},
	manual : {
		name : 'Choisir manuellement la valeur'
	}
};

ZzzelpRessourcesSender.options = {
	total : {
		name 	: 'Total à convoyer',
		class 	: 'input_fige',
	},
	ouvrieres : { 
		name 	: 'Ouvrières',
		class 	: 'input_tableau',
		update 	: true
	},
	field : { 
		name 	: 'TDC actuel',
		class 	: 'input_tableau',
		update 	: true
	},
	etable : { 
		name 	: 'Etable', 
		class 	: 'input_niveau', 
		update 	: true
	},
	convois : {
		name 	: 'Convois',
		class 	: 'input_tableau',
	}
};

ZzzelpRessourcesSender.returnOptionsToZzzelp = function() {
	var url = ZzzelpScript.url + 'convois/preparation?';
	url += 'ressource=' +  ze_Analyser_URL('alliance');
	url += '&serveur=' + ze_serveur;
	url += '&alliance=' + ze_Analyser_URL('alliance');
	url += '&pseudo=' + ze_Analyser_URL('pseudo');
	var	subUrl = '';
	for(var key in ZzzelpRessourcesSender.options) {
		var value = ze_Analyser_URL(key);
		if(value == 'undefined') {
			if(key == 'ouvrieres') {
				value = gouvrieres;
			}
			else if(key == 'field') {
				value = gTDC;
			}
			else if(key == 'etable') {
				value = zzzelp.compte.getEtablePucerons();
			}
		}
		subUrl += '&' + key + '=' + value;
	}
	document.location.href = url + subUrl;
};

ZzzelpRessourcesSender.prototype.prepareData = function() {
	for(var key in this.data) {
		this[key] = this.data[key];
	}
};

ZzzelpRessourcesSender.prototype.createInterface = function() {
	this.area = ZzzelpDOM('div', {
		class : 'zone_contenu zone_largeur_courte'
	});
	this.createHeader();
	this.createModeLine();
	this.createOptionsLines();
	this.createSendLine();

	this.section.appendChild(this.area);

};

ZzzelpRessourcesSender.prototype.createHeader = function() {
	this.area.appendChild(ZzzelpDOM('div', {
		innerHTML 	: 'Préparation convois',
		class 		: 'entete_cadre'
	}));
};

ZzzelpRessourcesSender.prototype.createModeLine = function() {
	var modes = {},
		childs = [];
	for(var key in ZzzelpRessourcesSender.modes) {
		var mode = ZzzelpRessourcesSender.modes[key],
			option = ZzzelpDOM('option', {
				innerHTML  	: mode.name,
				value  		: key
		});
		modes[key] = option;
		childs.push(option);
		if(key == this.mode) {
			option.selected = true;
		}
	}
	var select = ZzzelpDOM('select', {
			onchange : this.updateConvois.bind(this)
		}, childs
	);

	this.area.appendChild(ZzzelpDOM('div', {
			class : 'ligne_cadre_structure select_centre'
		}, [select]
	));
	this.select = select;
	this.modes = modes;
};

ZzzelpRessourcesSender.prototype.createOptionsLines = function() {
	var options = this.getDefaultOptions();
	this.options = {};
	for(var key in options) {
		var option = options[key],
			label = ZzzelpDOM('span', {
				innerHTML : option.name + ' :'
			});

		if(option.class == 'input_fige') {
			input = ZzzelpDOM('span', {
				class 		: 'input_fige',
				innerHTML 	: option.value
			});
			this.options[key] = input;
		}
		else {
			var	childs = [];
			childs.push(ZzzelpDOM('input', {
				class 		: option.class,
				innerHTML 	: option.value,
				type 		: 'text',
				value 		: option.value,
				data 	: {
					option : key
				},
				onkeyup 	: function(event) {
					ze_Ajout_espaces(this);
				},
				onblur 		: this.onChangeOption.bind(this)
			}));	
			childs.push(ZzzelpDOM('img', {
				style 	: 'height:1.2em;margin-left:15px;margin-top:0.8em;' +
						   'cursor:pointer;visibility:' +
						   (option.update ? 'visible' : 'hidden'),
				src 	: ZzzelpScript.url + 'Images/inverser.png',
				data 	: {
					option : key
				},
				onclick : this.retrieveOptionValue.bind(this)
			}));
			input = ZzzelpDOM('span', {
					class 	: 'ligne_inputs'
				}, childs
			);
			this.options[key] = childs[0];
		}
		this.area.appendChild(ZzzelpDOM('div', {
				class : 'ligne_cadre_structure'
			}, [label, input]
		));
	}
};

ZzzelpRessourcesSender.prototype.createSendLine = function() {
	var button = ZzzelpDOM('button', {
			class 		: 'bouton',
			innerHTML 	: 'Lancer le convoi'
	});
	this.area.appendChild(ZzzelpDOM('div', {
			class : 'ligne_cadre_structure'
		}, [button]
	));
};

ZzzelpRessourcesSender.prototype.getDefaultOptions = function() {
	var options = ZzzelpRessourcesSender.options;
	for(var key in options) {
		options[key].value = ze_Nombre(this[key]);
	}
	return options;
};

ZzzelpRessourcesSender.prototype.retrieveOptionValue = function(event) {
	var option = event.currentTarget.dataset.option;
	switch(ZzzelpScript.domain) {
		case 'zzzelp' :
			this.retrieveOptionZzzelp(option);
			break;
		case 'fourmizzz' :
			console.log('TOTO');
			break;
	}
};

ZzzelpRessourcesSender.prototype.retrieveOptionZzzelp = function(option) {
	var url = 'http://' + this.server + '.fourmizzz.fr/construction.php?';
	url += 'ressource=' +  this.ressource;
	url += '&alliance=' + this.alliance;
	url += '&pseudo=' + this.pseudo;

	var subUrl = '';
	for(var key in this.options) {
		var value = (key == option) ? 'undefined' : this[key];
		subUrl += '&' + key + '=' + value;
	}
	document.location.href = url + subUrl + '&zo';
};

ZzzelpRessourcesSender.prototype.onChangeOption = function(event) {
	if(event.currentTarget != this.options.convois) {
		var option = event.currentTarget.dataset.option;
		this[option] = parseInt(event.currentTarget.value.replace(/ /g, ''));
		console.log(this[option]);
		this.updateConvois();
	}
};

ZzzelpRessourcesSender.prototype.updateConvois = function() {
	console.log('OKAY');
	this.mode = this.select.value;
	this.updateDisabledOptions();
	
	if(this.mode != 'manual') {
		var ouvrieresToSend = this.ouvrieres - ((this.mode == 'all') ? 0 : this.field),
			value = (10 + this.etable * 0.5) * ouvrieresToSend;
		this.options.convois.value = ze_Nombre(ze_Majoration(value, this.total));
	}
};

ZzzelpRessourcesSender.prototype.updateDisabledOptions = function() {
	for(var key in this.options) {
		if(key == 'convois') {
			this.options[key].disabled = (this.mode != 'manual');
		}
		else {
			this.options[key].disabled = (this.mode == 'manual');
		}
	}

};
