function ZzzelpArmy(unites, niveaux, mode) {
	
	var armee = this;
	this.mode = (typeof mode == 'undefined') ? 'armee' : 'chasse';
	this.length = (this.mode == 'armee') ? 14 : 17;
	
	this.unites = (unites ? unites : ZzzelpArmy.getEmptyArmee(this.length));
	this.niveaux = (niveaux ? niveaux : this.getDefaultLevels());
}

ZzzelpArmy.prototype.new_armee = function() {
	return new ZzzelpArmy(ZzzelpArmy.getEmptyArmee(this.length), this.niveaux);
};

ZzzelpArmy.prototype.copy = function() {
	return new ZzzelpArmy(JSON.parse(JSON.stringify(this.unites)), JSON.parse(JSON.stringify(this.niveaux)));
};

ZzzelpArmy.prototype.extraction_armee = function (n) {
	var armee_2 = this.new_armee(),
		i = 0, k = 0;
	while (i<n) {
		if(i + this.unites[this.length-1-k] <= n) {
			i += this.unites[this.length-1-k];
			armee_2.unites[this.length-1-k] = this.unites[this.length-1-k];
		}
		else {
			armee_2.unites[this.length-1-k] = n - i;
			i = n;
		}
		k++;
	}
	return armee_2;
};

ZzzelpArmy.prototype.armeePostCombat = function(morts) {
	return this.extraction_armee(this.getCapaFlood() - morts);	
};

ZzzelpArmy.prototype.noXP = function() {
	var a = this.unites,
		unites = [a[0]+a[1]+a[2],0,0,a[3]+a[4]+a[9],0,a[5]+a[6],0,a[7]+a[8],0,0,a[10]+a[11],0,a[12]+a[13],0];
	return new ZzzelpArmy(unites, this.niveaux);
};

ZzzelpArmy.prototype.XP = function(JSN) {
	return JSN ? this.XPavecJSN() : this.XPsansJSN();
};

ZzzelpArmy.prototype.XPavecJSN = function() {
	var a = this.unites,
		unites = [0,0,a[0]+a[1]+a[2],0,0,0,a[5]+a[6],0,a[7]+a[8],a[3]+a[4]+a[9],0,a[10]+a[11],0,a[12]+a[13]];
	return new ZzzelpArmy(unites, this.niveaux);
};

ZzzelpArmy.prototype.XPsansJSN = function() {
	var a = this.unites,
		unites = [a[0],0,a[1]+a[2],0,0,0,a[5]+a[6],0,a[7]+a[8],a[3]+a[4]+a[9],0,a[10]+a[11],0,a[12]+a[13]];
	return new ZzzelpArmy(unites, this.niveaux);
};

ZzzelpArmy.prototype.isXP = function() {
	for(var i=0; i<this.length; i++) {
		if(ZzzelpArmy.unites_XP && this.getUnite(i) > 0) {
			return false;
		}
	}
	return true;
};

ZzzelpArmy.prototype.isNull = function() {
	return (this.getCapaFlood() === 0);
};

ZzzelpArmy.prototype.isDead = function(kill) {
	return (this.getCapaFlood() <= kill);
};

ZzzelpArmy.prototype.getUnite = function(unite) {
	return this.unites[unite];
};

ZzzelpArmy.prototype.setUnite = function(unite, valeur) {
	this.unites[unite] = valeur;
};

ZzzelpArmy.prototype.addUnite = function(unite, valeur) {
	this.unites[unite] += valeur;
};

ZzzelpArmy.prototype.getAttaqueHB = function() {
	var attaque = 0,
		coeffs = ZzzelpArmy.attaque;
	for(var i=0;i<this.length;i++) {
		attaque += this.unites[i]*coeffs[i];
	}
	return attaque;
};

ZzzelpArmy.prototype.getVieHB = function() {
	var vie = 0,
		coeffs = ZzzelpArmy.vie;
	for(var i=0;i<this.length;i++) {
		vie += this.unites[i]*coeffs[i];
	}
	return vie;
};

ZzzelpArmy.prototype.getDefenseHB = function() {
	var defense = 0,
		coeffs = ZzzelpArmy.defense;
	for(var i=0;i<this.length;i++) {
		defense += this.unites[i]*coeffs[i];
	}
	return defense;
};

ZzzelpArmy.prototype.getCapaFlood = function() {
	var capa_flood = 0;
	for(var i=0;i<this.length;i++) {
		capa_flood += this.unites[i];
	}
	return capa_flood;
};

ZzzelpArmy.prototype.getConsommation = function() {
	var consommation = 0,
		coeffs = ZzzelpArmy.consommation,
		pourcentages = [0.05,0.1,0.15];
	for(var i=0;i<this.length;i++) {
		consommation += this.unites[i]*coeffs[i]*pourcentages[this.niveaux.lieu];
	}
	return parseInt(consommation);
};

ZzzelpArmy.prototype.getHOF = function() {
	var secondes = 0,
		coeffs = ZzzelpArmy.HOF;
	for(var i=0;i<this.length;i++) {
		secondes += this.unites[i]*coeffs[i];
	}
	return secondes;
};

ZzzelpArmy.prototype.getHOFAnnees = function() {
	return parseInt(this.getHOF()/31557600);
};

ZzzelpArmy.prototype.getVieAB = function() {
	if(this.niveaux.lieu === 0) {
		return parseInt(this.getVieHB() * (1+0.1*this.niveaux.bouclier));
	}
	else if(this.niveaux.lieu == 1) {
		return parseInt(this.getVieHB() * (1+0.05*(this.niveaux.niveau_lieu+2) + 0.1*this.niveaux.bouclier));
	}
	else {
		return parseInt(this.getVieHB() * (1+0.15*(this.niveaux.niveau_lieu+2) + 0.1*this.niveaux.bouclier));
	}	
};

ZzzelpArmy.prototype.getAttaqueAB = function() {
	return parseInt(this.getAttaqueHB() * (1+this.niveaux.armes*0.1));
};

ZzzelpArmy.prototype.getDefenseAB = function() {
	return parseInt(this.getDefenseHB() * (1+this.niveaux.armes*0.1));
};

ZzzelpArmy.prototype.getStatistiquesAB = function() {
	return {
		attaque : this.getAttaqueAB(),
		defense : this.getDefenseAB(),
		vie : this.getVieAB(),
		capa_flood : this.getCapaFlood(),
		HOF : this.getHOF()
	};
};

ZzzelpArmy.prototype.logStatistiques = function() {
	this.statistiques = this.getStatistiquesAB();
};

ZzzelpArmy.prototype.getArmes = function() {
	return this.niveaux.armes;
};

ZzzelpArmy.prototype.getBouclier = function() {
	return this.niveaux.bouclier;
};

ZzzelpArmy.prototype.getNiveauLieu = function() {
	return this.niveaux.niveau_lieu;
};

ZzzelpArmy.prototype.getLieu = function() {
	return this.niveaux.lieu;
};

ZzzelpArmy.prototype.getVitesseChasse = function() {
	return this.niveaux.vitesse_chasse;
};

ZzzelpArmy.prototype.getDefaultLevels = function() {
	return {
		armes : 0,
		bouclier : 0,
		lieu : 0,
		niveau_lieu : 0,
		vitesse_chasse : 0
	};
};

ZzzelpArmy.prototype.setArmes = function(niv) {
	this.niveaux.armes = niv;	
};

ZzzelpArmy.prototype.setBouclier = function(niv) {
	this.niveaux.bouclier = niv;
};

ZzzelpArmy.prototype.setNiveauLieu = function(niv) {
	this.niveaux.niveau_lieu = niv;
};

ZzzelpArmy.prototype.setLieu = function(niv) {
	this.niveaux.lieu = niv;
};

ZzzelpArmy.prototype.setVitesseChasse = function(niv) {
	this.niveaux.vitesse_chasse = niv;
};

ZzzelpArmy.prototype.computeArmes = function(degats) {
	this.niveaux.armes = (degats.HB > 9) ? Math.round(10*(degats.bonus/degats.HB)) : 0;
};

ZzzelpArmy.prototype.computeNiveauxVie = function(morts, degats) {
	var vie_tuee = this.getViePerdue(morts);
	if(vie_tuee > 0) {
		if(this.getLieu() === 0) {
			this.setBouclier(Math.round((((degats.HB + degats.bonus) / vie_tuee) - 1) * 10));
		}
		else {
			this.computeNiveauxVieHorsTDC(morts, degats, vie_tuee);
		}
	}
};

ZzzelpArmy.prototype.computeNiveauxVieHorsTDC = function(morts, degats, vie_tuee) {
	var lieu = this.niveaux.lieu;
	for(var ecart = 0; ecart<5; ecart++) {
		for(i=-1; i<2; i+=2) {
			if(ecart > 0 || i == 1) {
				var bouclier = this.getArmes() + ecart*i,
					niveau_lieu = (((degats.HB + degats.bonus) / vie_tuee) - 1 - bouclier * 0.1) / ((lieu == 1) ? 0.05 : 0.15) - 2;
				if (Math.abs(niveau_lieu - Math.round(niveau_lieu)) < 0.1 && niveau_lieu <= 45) {
					this.setBouclier(bouclier); 
					this.setNiveauLieu(Math.round(niveau_lieu));
					break;
				}
			}
		}
	}
};

ZzzelpArmy.prototype.computeReplique = function(vie_def) {
	var attaque = this.getAttaqueAB();
	if(attaque > vie_def*3) {
		return 0.1;
	}
	else if(attaque > vie_def*2) {
		return 0.3;
	}
	else if(attaque > vie_def*1,5) {
		return 0.5;
	}
	else {
		return 1;
	}
};

ZzzelpArmy.prototype.getViePerdue = function(morts) {
	var vie = 0,
		n = morts;
	for(var i=0;i<this.length;i++) {
		if(n > this.unites[i]) {
			vie += this.unites[i]*ZzzelpArmy.vie[i];
			n -= this.unites[i];
		}
		else if(n > 0) {
			vie += (n+0.5)*(ZzzelpArmy.vie[i]);
			n = 0;
		}
	}
	return vie;
};

ZzzelpArmy.prototype.applyXP = function(XPs) {
	var unites = this.unites.slice(),
		armee_XP = this.copy();
	for(var i=0; i<XPs.length; i++) {
		armee_XP.unites[XPs[i].avant] -= XPs[i].nombre;
		armee_XP.unites[XPs[i].apres] += XPs[i].nombre;
	}
	return armee_XP;
};

ZzzelpArmy.noms_singulier = new Array(
	"Jeune Soldate Naine",
	"Soldate Naine",
	"Naine d’Elite",
	"Jeune Soldate",
	"Soldate",
	"Concierge",
	"Concierge d’élite", 
	"Artilleuse",
	"Artilleuse d’élite",
	"Soldate d’élite",
	"Tank",
	"Tank d’élite",
	"Tueuse","Tueuse d’élite"
);

ZzzelpArmy.noms_pluriel = new Array(
	"Jeunes Soldates Naines", 
	"Soldates Naines", 
	"Naines d’Elites", 
	"Jeunes Soldates", 
	"Soldates", 
	"Concierges", 
	"Concierges d’élites", 
	"Artilleuses", 
	"Artilleuses d’élites", 
	"Soldates d’élites", 
	"Tanks", 
	"Tanks d’élites", 
	"Tueuses",  
	"Tueuses d’élites"
);

ZzzelpArmy.ex_noms_singulier = new Array(
	"Jeune Soldate Naine", 
	"Soldate Naine", 
	"Naine d'Elite", 
	"Jeune Soldate", 
	"Soldate", 
	"Concierge", 
	"Concierge d'élite", 
	"Artilleuse", 
	"Artilleuse d'élite", 
	"Soldate d'élite", 
	"Tank", 
	"Tank d'élite", 
	"Tueuse",  
	"Tueuse d'élite"
);

ZzzelpArmy.ex_noms_pluriel = new Array(
	"Jeunes Soldates Naines", 
	"Soldates Naines", 
	"Naines d'Elites", 
	"Jeunes Soldates", 
	"Soldates", 
	"Concierges", 
	"Concierges d'élites", 
	"Artilleuses", 
	"Artilleuses d'élites", 
	"Soldates d'élites", 
	"Tanks", 
	"Tanks d'élites", 
	"Tueuses",  
	"Tueuses d'élites"
);

ZzzelpArmy.TAGs = new Array('JSN', 'SN', 'NE', 'JS', 'S', 'C', 'CE', 'A', 'AE', 'SE', 'Tk', 'TkE', 'T', 'TE');

ZzzelpArmy.ordre = new Array(
	'unite1', 
	'unite2', 
	'unite3', 
	'unite4', 
	'unite5', 
	'unite6', 
	'unite14', 
	'unite7', 
	'unite8', 
	'unite9',
	'unite10', 
	'unite13', 
	'unite11', 
	'unite12'
);

ZzzelpArmy.attaque = new Array(3,5,7,10,15,1,1,30,35,24,55,80,50,55); 

ZzzelpArmy.vie = new Array(8,10,13,16,20,30,40,10,12,27,35,50,50,55); 

ZzzelpArmy.defense = new Array(2,4,6,9,14,25,35,15,18,23,1,1,50,55);

ZzzelpArmy.HOF = new Array(300,450,570,740,1000,1410,1410,1440,1520,1450,1860,1860,2740,2740);

ZzzelpArmy.ID = new Array(1,2,3,4,5,6,14,7,8,9,10,13,11,12);

ZzzelpArmy.consommation = new Array(16,20,26,30,36,70,100,30,34,44,100,150,80,90);

ZzzelpArmy.unites_XP = new Array(true, true, false, true, true, true, false, true, false, false, true, false, true, false);

ZzzelpArmy.getArmee = function(zone, mode) {
	var armee = [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		armees_lieu = [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		],
		tableaux = zone.querySelectorAll('.simulateur'),
		tableau, i;
	for(i=0;i<tableaux.length;i++) {
		if(tableaux[i].rows[0].cells[0].getAttribute('colspan') == '10') {
			tableau = tableaux[i];
		}
	}
	if(tableau) {
		var lignes = tableau.rows;
		for(var n=2;n<lignes.length;n++) {
			if(lignes[n].querySelectorAll('td')[0].querySelectorAll('#Vie').length > 0) {
				break;
			}
			var colonnes = lignes[n].querySelectorAll('td'),
				unite = colonnes[0].querySelector('.pas_sur_telephone');
			if(unite !== null) {
				var index_unite = ZzzelpArmy.noms_singulier.indexOf(unite.innerHTML);
				for(i=1;i<colonnes.length;i++) {
					var contenu = colonnes[i].innerHTML;
					if(~contenu.indexOf('unite') && contenu.indexOf('fleche') == -1) {
						var resultats = new RegExp('(.*),([0-3])' + (ComptePlus ? ',' : '') + '(.*)>([ 0-9]+)<\/span>').exec(contenu);
						try {
							var nombre = parseInt(resultats[4].replace(/ /g,"")),
								lieu = parseInt(resultats[2]);
							armee[index_unite] += nombre;
							armees_lieu[lieu-1][index_unite] += nombre;
						}
						catch(e) {
							console.log('ZzzelpScript : Impossible de récupérer le contenu : ' + contenu);  
						}
					}
				}
			}
		}
	}
	return new ZzzelpArmy((mode === 0) ? armee : armees_lieu);
};

ZzzelpArmy.getArmeeAjax = function(callBack) {
	new ZzzelpAjax({ method : 'GET', domain : 'fourmizzz', url : 'Armee.php', addDOM : true },
		{ success : function(zone_page) {
			callBack(ZzzelpArmy.getArmee(zone_page, 0));
		}
	});
};

ZzzelpArmy.getArmeeReine = function(callBack) {
	new ZzzelpAjax({ method : 'GET', domain : 'fourmizzz', url : 'Reine.php', addDOM : true },
		{ success : function(zone_page) {
			var valeurs = zone_page.querySelectorAll('span[id*="armee_initial"]'),
				armee = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
			for(var i=0; i<valeurs.length; i++) {
				var index = ZzzelpArmy.noms_singulier.indexOf(valeurs[i].parentNode.querySelector('h2').innerHTML);
				if(index >= 0) {
					armee[index] = parseInt(valeurs[i].innerHTML);
				}
			}
			callBack(new ZzzelpArmy(armee));
		}
	});
};

ZzzelpArmy.new_armee_unite = function(n,i, niveaux) {
	var unites = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	unites[i] = n;
	return new ZzzelpArmy(unites, niveaux);
};

/*
 * Tente a part d'une chaine de caractère d'extraire les unités du joueur. 
 * Pour l'instant gère les copies de la page armée et de RC
 * str -> array
*/
ZzzelpArmy.analyse = function(texte) {
	var unites = ZzzelpArmy.getEmptyArmee(14);
	texte = texte.replace(/(Vers le Terrain de Chasse)|(Vers la Fourmilière)|(Vers la Loge Impériale)/gi, '');
	texte = texte.replace(/(Vers le TDC)|(Vers le Fourmilière)|(Vers la Loge)/gi, '');
	texte = texte.replace(/(Vos raiders.*secondes?)|(Vos chasseuses.*secondes?)|(Vous allez attaquer.*secondes?)|(inflige.*\.)|(Arriv.*[0-9]{2}h[0-9]{2})|(\\(s\\))/gi, '');
	texte = texte.replace(/\]/gi, '\n').replace(/\[/gi, '\n');
	texte = texte.replace(/:/gi, ',');
	texte = texte.split("\n").join(',').split(',');	
	for(var i=0; i<texte.length; i++) {
		var ligne = texte[i].trim();
		if(isNaN(ligne.replace(/ /g, ''))) {
			var id_unite = ZzzelpArmy.getIDunite(ligne);
			if(~id_unite) {
				unite_tampon = id_unite;
			}
			else if(!isNaN(ligne.replace(/ /g, '').replace(/	/g, ''))) {
				ligne = ligne.split('	');
				for(var k=0; k<ligne.length; k++) {
					if(ligne[k] !== '') {
						unites[unite_tampon] += parseInt(ligne[k].replace(/ /g, ''));
					}
				}
			}
			else if(ligne.match(new RegExp('([0-9 ]+) ([^.]+)'))) {
				var valeurs = new RegExp('([0-9 ]+) ([^.]+)').exec(ligne),
					unite = ZzzelpArmy.getIDunite(valeurs[2]); 
				unites[unite] += parseInt(valeurs[1].replace(/ /g, ''));
			}
		}
		else if(ligne.length > 0 && ~unite_tampon) {
			unites[unite_tampon] += parseInt(ligne.replace(/ /g, ''));
		}
	}
	var armee = new ZzzelpArmy(unites);
	return armee;
};

ZzzelpArmy.getIDunite = function(unite) {
	var index = new Array(
		'noms_singulier',
		'noms_pluriel',
		'ex_noms_singulier',
		'ex_noms_pluriel',
		'TAGs'
	);
	for(var n=0; n<index.length; n++) {
		if(~ZzzelpArmy[index[n]].indexOf(unite)) {
			return ZzzelpArmy[index[n]].indexOf(unite);
		}
	}
	return -1;
};

ZzzelpArmy.getEmptyArmee = function(length) {
	var armee = [];
	for(var i=0; i<length; i++) {
		armee.push(0);
	}
	return armee;	
};