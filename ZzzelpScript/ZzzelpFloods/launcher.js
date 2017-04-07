var ZzzelpFloodsLauncher = function(data) {

	if(data) {
		this.parseData(data);
	}
	else {
		this.parseURL();
	}
	
	this.armee = ZzzelpArmy.getArmee(document, 0).unites;
	this.getAvailableArmy();
	this.getSondesUnits();
	this.getAttacksUnits();
	
	console.log(this);

	this.getToken();

};

ZzzelpFloodsLauncher.prototype.parseData = function(data) {
	for(var el in data) {
		this[el] = data[el];
	}
};

ZzzelpFloodsLauncher.prototype.parseURL = function() {
	localStorage.setItem('zzzelp_aide_relance_' + ze_serveur, '[]');

	var lancements = ze_Analyser_URL('fl');
	lancements = lancements.substr(1, lancements.length - 2).split(':');

	this.schemas = [];
	this.interface = true;
	
	for(var i=0; i<lancements.length; i++) {
		this.parseURLLine(lancements[i]);
	}
	if(ze_Analyser_URL('sec')) {
		this.seconde = parseInt(ze_Analyser_URL('sec'));
	}
	else {
		this.seconde = -1;
	}
	if(ze_Analyser_URL('relance')) {
		this.relance = parseInt(ze_Analyser_URL('relance'));
	}
	else {
		this.relance = -1;
	}
};

ZzzelpFloodsLauncher.prototype.parseURLLine = function(line) {
	var floods = line.split(';'),
		ID = ze_Base_36_10(floods[floods.length - 3]),
		temps = ze_Base_36_10(floods[floods.length - 2]),
		pseudo = floods[floods.length - 1];

	for(var n=0; n<floods.length - 3; n++) {
		var flood = floods[n].substr(1, floods[n].length - 1).split(',');
		if(floods[n].substr(0,1) === '0') {
			this.schemas.push({
				mode : 'flood',
				valeur : (flood[0] == '-1') ? -1 : ze_Base_36_10(flood[0]), lieu : flood[1],
				ID : ID,
				pseudo : pseudo,
				duree : temps
			});
		}
		else {
			this.schemas.push({
				mode : 'sonde',
				nombre : ze_Base_36_10(flood[0]), lieu : flood[2],
				unite : ze_Base_36_10(flood[1]),
				ID : ID,
				pseudo : pseudo,
				duree : temps
			});
		}
	}
};

ZzzelpFloodsLauncher.prototype.getAvailableArmy = function() {
	this.armee_floods = this.armee;
	this.antisondes = [];
	this.etape_antisondes = 0;

	if(ze_Analyser_URL('as')) {
		var antisondes = ze_Analyser_URL('as').substr(1, ze_Analyser_URL('as').length - 2).split(',');
		for(var i=0; i<2; i++) {
			var unite = ze_Base_36_10(antisondes[2*i]),
				nombre = ze_Base_36_10(antisondes[2*i+1]);
			this.antisondes.push([unite, ze_Majoration(nombre, this.armee_floods[unite])]);
			this.armee_floods[unite] -= (this.armee_floods[unite] > nombre) ? nombre : this.armee_floods[unite];
		}
	}
};

ZzzelpFloodsLauncher.prototype.getSondesUnits = function() {
	for(var i=0; i<this.schemas.length; i++) {
		if(this.schemas[i].mode == 'sonde') {
			var unites_sonde = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
				manquantes = this.schemas[i].nombre;
			for(var n=this.schemas[i].unite; n<this.schemas[i].unite + 14; n++) {
				if(this.armee_floods[n%14] > manquantes) {
					unites_sonde[n%14] = manquantes;
				}
				else {
					unites_sonde[n%14] = this.armee_floods[n%14];
				}
				manquantes -= unites_sonde[n%14];
				this.armee_floods[n%14] -= unites_sonde[n%14];
			}
			this.schemas[i].unites = unites_sonde;
		}
	}
};

ZzzelpFloodsLauncher.prototype.getAttacksUnits = function() {
	var aide_relance = [],
		pseudos_pris = [];
	for(var i=0; i<this.schemas.length; i++) {
		if(this.schemas[i].mode == 'flood') {
			if(this.relance == 2 && (aide_relance.length === 0 || this.schemas[i].valeur > this.schemas[aide_relance[0]].valeur)) {
				aide_relance[0] = i;
			}
			else if(this.relance == 1 && !in_array(this.schemas[i].pseudo, pseudos_pris)) {
				aide_relance.push(i);
				pseudos_pris.push(this.schemas[i].pseudo);
			}
			 if(this.schemas[i].valeur >= 0) {
				var unites_flood = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
					manquantes = this.schemas[i].valeur;
				for(var n=0; n<14; n++) {
					if(this.armee_floods[n] > manquantes) {
						unites_flood[n] = manquantes;
					}
					else {
						unites_flood[n] = this.armee_floods[n];
					}
					manquantes -= unites_flood[n];
					this.armee_floods[n] -= unites_flood[n];
				}
				this.schemas[i].unites = unites_flood;   
			}
		}
	}
	for(i=0; i<this.schemas.length; i++) {
		if(this.schemas[i].mode == 'flood' && this.schemas[i].valeur == -1) {
			this.schemas[i].unites = this.armee_floods;   
			this.armee_floods = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);          
		}
	}
	for(i=0; i<this.schemas.length; i++) {
		this.schemas[i].aide_relance = in_array(i, aide_relance);
	}
};

ZzzelpFloodsLauncher.prototype.getToken = function() {
	var self = this;
	new ZzzelpAjax({ method : 'GET', domain : 'fourmizzz', url : 'ennemie.php?Attaquer=' + this.schemas[0].ID + '&lieu=0' }, { 
		success : self.createTable.bind(self)
	});	
};

ZzzelpFloodsLauncher.prototype.createTable = function(contenu) {
	var ligne, cell;
	this.tokens = tokens = new Array(new RegExp('<input type="hidden" name="t" id="t" value="(.*)"/>').exec(contenu)[1], document.querySelector('#t').value);
	
    var zone = document.createElement('div');
	this.table = document.createElement('table');
	this.clean();
	
	zone.className = 'zone_zzzelpfloods';
	zone.id = 'theme_fourmizzz';
	this.table.id = 'lancement_zzzelp';
	this.table.className = 'tableau_recap';
	this.table.dataset.lancement_fini = 0;

	this.createFirstLine();

	for(var i=0; i<this.schemas.length; i++) {
		this.createLine(this.schemas[i]);   
	}
	if(this.antisondes.length > 0) {
		this.createAntisondesLine();
	}
	if(this.seconde > -1) {
		this.createSecondLaunchLine();
	}
	zone.appendChild(this.table);
	document.querySelector('center').insertBefore(zone, document.querySelector('center br'));
	this.send(1);
};

ZzzelpFloodsLauncher.prototype.clean = function() {
    var sdam_zone = document.querySelector('#sd_showhidecopy');
    if(sdam_zone) {
        ze_Supprimer_element(sdam_zone);
        ze_Supprimer_element(document.querySelector('#sd_tablecopy'));
        ze_Supprimer_element(document.querySelector('#Sdversion'));
    }
    
    ze_Supprimer_element(document.querySelector('.pas_sur_telephone'));
    ze_Supprimer_element(document.querySelector('.simulateur'));
    ze_Supprimer_element(document.querySelector('.simulateur'));    
};

ZzzelpFloodsLauncher.prototype.createFirstLine = function() {
	var ligne = this.table.insertRow(0);
	ligne.insertCell(0).innerHTML = 'Cible';
	ligne.insertCell(1).innerHTML = 'Type';
	ligne.insertCell(2).innerHTML = 'Unités';
	ligne.insertCell(3).innerHTML = 'Envoyé';
	ligne.insertCell(4).innerHTML = 'Stocké';
};

ZzzelpFloodsLauncher.prototype.createLine = function(schema) {
	var stockage_zzzelp = (document.location.href.substr(-3, 3) == '&lz'),
		ligne = this.table.insertRow(-1),
		cell = ligne.insertCell(0),
		cell2 = ligne.insertCell(1),
		cell3 = ligne.insertCell(2),
		cell4 = ligne.insertCell(3),
		cell5 = ligne.insertCell(4);

	cell.setAttribute('style', 'font-weight:bold;');
	cell.innerHTML = ze_Lien_profil(schema.pseudo) + ' :';
	cell2.innerHTML = (schema.mode == 'flood') ? 'Flood' : 'Sonde';
	
	var zone_unites = document.createElement('div');
	cell3.className = 'menu_unites';
	zone_unites.className = 'liste_unites';
	zone_unites.appendChild(this.createUniteCell(array_sum(schema.unites)));
	for(var k=0; k<14; k++) {
		zone_unites.appendChild(this.createUniteLine(schema.unites[k], k));
	}
	cell3.appendChild(this.createUnitHeader(array_sum(schema.unites)));
    cell3.appendChild(zone_unites);
	
	cell4.setAttribute('style', 'color:red;');
	cell5.setAttribute('style', ((stockage_zzzelp && schema.mode == 'flood') ? 'color:red;' : ''));
	cell4.innerHTML = 'NON';
	cell5.innerHTML = (stockage_zzzelp && schema.mode == 'flood') ? 'NON' : '-'; 
};

ZzzelpFloodsLauncher.prototype.createUnitHeader = function(capacity) {
	var	entete = document.createElement('div'),
		img = document.createElement('img');

	entete.innerHTML = ze_Nombre(capacity);
	entete.className = 'entete_liste_unites';
	img.src = ZzzelpScript.url + 'Images/fourmis.png';
	entete.appendChild(img);

	return entete;
};

ZzzelpFloodsLauncher.prototype.createUniteCell = function(capacity) {
	var unite = document.createElement('div'),
		nombre = document.createElement('span'),
		tag = document.createElement('span');    

	unite.className = 'ligne_unite';
	nombre.innerHTML = ze_Nombre(capacity);
	tag.innerHTML = 'unités';

	unite.appendChild(nombre);
	unite.appendChild(tag);

    return unite;
};

ZzzelpFloodsLauncher.prototype.createUniteLine = function(value, index) {
	unite = document.createElement('div');
	nombre = document.createElement('span');
	tag = document.createElement('span');

	unite.className = 'ligne_unite';
	nombre.innerHTML = ze_Nombre(value);
	tag.innerHTML = ZzzelpArmy.TAGs[index];
	unite.appendChild(nombre);
	unite.appendChild(tag);	
	return unite;
};

ZzzelpFloodsLauncher.prototype.createAntisondesLine = function() {
	var ligne = this.table.insertRow(-1);
	cell = ligne.insertCell(0);
	cell.setAttribute('colspan', '5');
	cell.innerHTML = 'Antisondes non placées';
	cell.setAttribute('style', 'color:red;font-weight:bold;text-align:center');
	cell.id = 'placement_antisondes';
};

ZzzelpFloodsLauncher.prototype.createSecondLaunchLine = function() {
	this.waitingLine = this.table.insertRow(-1);
	cell = ligne.insertCell(0);
	cell.setAttribute('colspan', '5');
	cell.innerHTML = '<span id="attente_lancement_zzzelp"></span> secondes avant le lancement';
	cell.setAttribute('style', 'font-weight:bold;text-align:center');
};

ZzzelpFloodsLauncher.prototype.send = function(n) {
	if(this.schemas.length > 0) {
		if(this.seconde == -1 || parseInt(this.seconde/1000) == (new Date(time_fzzz()*1000)).getSeconds() || n > 1) {
			if(this.seconde > -1 && n == 1) {
				ze_Supprimer_element(this.waitingLine);
			}
			var flood = this.schemas[0];
			this.schemas.shift();
			if(flood.aide_relance) {
				var stockages = JSON.parse(localStorage['zzzelp_aide_relance_' + ze_serveur]);
				stockages.push({ pseudo : flood.pseudo, retour : time_fzzz() + flood.duree, id : +new Date() });
				localStorage['zzzelp_aide_relance_' + ze_serveur] = JSON.stringify(stockages);
			}
			var url_ajax = 'ennemie.php?Attaquer=' + flood.ID + '&lieu=' + flood.lieu,
				texte = '';
			for(var k=0; k<14; k++) {
				if(flood.unites[k] !== 0) {
					texte += ((texte !== '')? '&' : '') + 'unite' + ZzzelpArmy.ID[k] + '=' + flood.unites[k];
				}
			}
			texte += '&lieu=' + flood.lieu + '&ChoixArmee=1&t=' + this.tokens[0];

            var self = this;
			new ZzzelpAjax({ method : 'POST', domain : 'fourmizzz', url : url_ajax, data : texte, contentType : "application/x-www-form-urlencoded"}, { 
                success : self.callbackSend.bind(self, flood, n)
			});
		}
		else {
			setTimeout(function() {
				this.send(n);
			}, 1);
			document.querySelector('#attente_lancement_zzzelp').innerHTML = parseInt((this.seconde/1000 - (new Date(time_fzzz()*1000)).getSeconds() + 60)%60);
		}
	}
	else if(this.antisondes.length > 0) {
		ZzzelpFloodsLauncher.placeAntiSondes(this.antisondes, this.tokens[1], 1);
	}
	else {
		document.querySelector('#lancement_zzzelp').dataset.lancement_fini = 1;
	}
};

ZzzelpFloodsLauncher.prototype.callbackSend = function(flood, n, txt) {
    var en_cours = new RegExp('<h3([^!]+)').exec(txt)[1].split('- Vous allez attaquer'),
        dernier = { retour : 0, ID : 0, heure : '', pseudo : '', alliance : '' };
    for(var k=0; k<en_cours.length;k++) {
        if(en_cours[k].match(new RegExp('Pseudo=(.*)">(.*)alliance=(.*)">(.*)id="attaque_([0-9]+)">(.*) </span><script language="JavaScript">reste\\(([0-9]+)'))) {
            var donnees = new RegExp('Pseudo=(.*)">(.*)alliance=(.*)">(.*)id="attaque_([0-9]+)">(.*) </span><script language="JavaScript">reste\\(([0-9]+)').exec(en_cours[k]);
            if(parseInt(donnees[5]) > dernier.ID) {
                dernier = { retour : parseInt(donnees[7]), ID : parseInt(donnees[5]), heure : donnees[6], pseudo : donnees[1], alliance : donnees[3] };
            }
        }
    }
    var content = '- Vous allez attaquer <span class="gras"><a href="Membre.php?Pseudo=' + dernier.pseudo + '">';
    content += dernier.pseudo + '</a>(<a href="classementAlliance.php?alliance=' + dernier.alliance + '">';
    content += dernier.alliance + '</a>)</span> dans <span class="gras" id="attaque_' + dernier.ID + '">';
    content += dernier.heure + '</span> - <a href="/Armee.php?annuler=' + dernier.ID + '">Annuler</a>';
    document.querySelector('center').innerHTML += content;
    var script = document.createElement('script');
    script.setAttribute('language', 'JavaScript');
    script.innerHTML = 'reste(' + dernier.retour + ', "attaque_' + dernier.ID + '");';
    document.querySelector('center').appendChild(script);
    document.querySelector('center').appendChild(document.createElement('br'));
    document.querySelector('#lancement_zzzelp').rows[n].cells[3].style.color = 'green';
    document.querySelector('#lancement_zzzelp').rows[n].cells[3].innerHTML = 'OUI';
    this.saveOnZzzelp(flood, n, 1);    
};

ZzzelpFloodsLauncher.prototype.saveOnZzzelp = function(flood, n, mode) {
	if(document.location.href.substr(-3, 3) == '&lz' && this.table.rows[n].cells[1].innerHTML == 'Flood') {
        var url_ajax = 'floods_script?unites=[' + flood.unites + ']&cible=' + flood.ID + '&',
            self = this;
		new ZzzelpAjax({ method : 'GET', domain : 'zzzelp', url : url_ajax, force : mode }, { 
            success : this.successCallbackSaveOnZzzelp.bind(self, n),
			authentication_issue : this.errorCallbackSaveOnZzzelp.bind(self, n, flood)
		});
	}
	else {
		this.send(n+1);
	}
};

ZzzelpFloodsLauncher.prototype.successCallbackSaveOnZzzelp = function(n, txt) {
    document.querySelector('#lancement_zzzelp').rows[n].cells[4].style.color = 'green';
    document.querySelector('#lancement_zzzelp').rows[n].cells[4].innerHTML = 'OUI';                 
    this.send(n+1);
};

ZzzelpFloodsLauncher.prototype.errorCallbackSaveOnZzzelp = function(n, flood) {
    this.saveOnZzzelp(flood, n, 2);
};

ZzzelpFloodsLauncher.placeAntiSondes = function(antisondes, token, n, rediriger) {
	var url;
	if(n == 1) {
		new ZzzelpAjax({ method : 'GET', domain : 'fourmizzz', url : 'Armee.php?deplacement=3&t=' + token },
			{ success : function(zone_page, ajax) {
				ZzzelpFloodsLauncher.placeAntiSondes(antisondes, token, n+1, rediriger);
			}
		});
	}
	else if(n == 2) {
		url = 'Armee.php?Transferer=Envoyer&LieuOrigine=3&LieuDestination=1';
		url += '&ChoixUnite=' + ZzzelpArmy.ordre[antisondes[0][0]];
		url += '&nbTroupes=' + antisondes[0][1] + '&t=' + token;
		new ZzzelpAjax({ method : 'GET', domain : 'fourmizzz', url : url },
			{ success : function(zone_page, ajax) {
				ZzzelpFloodsLauncher.placeAntiSondes(antisondes, token, n+1, rediriger);
			}
		});
	}
	else if(n == 3) {
		url = 'Armee.php?Transferer=Envoyer&LieuOrigine=3&LieuDestination=2';
		url += '&ChoixUnite=' + ZzzelpArmy.ordre[antisondes[1][0]];
		url += '&nbTroupes=' + antisondes[1][1] + '&t=' + token;
		new ZzzelpAjax({ method : 'GET', domain : 'fourmizzz', url : url },
			{ success : function(zone_page, ajax) {
				ZzzelpFloodsLauncher.placeAntiSondes(antisondes, token, n+1, rediriger);
			}
		});
	}
	else if(n == 4 && rediriger) {
		document.location.href = 'http://' + ze_serveur + '.fourmizzz.fr/Armee.php';
	}
	else if(n == 4) {
		document.querySelector('#placement_antisondes').innerHTML = 'Antisondes placées';
		document.querySelector('#placement_antisondes').style.color = 'green';
		document.querySelector('#lancement_zzzelp').dataset.lancement_fini = 1;
	}
};

