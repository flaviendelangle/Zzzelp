/*
 * Auteur : delangle
 * Version 1.0 (09/2014)
 * Adresse : http://zzzelp.fr/Javascript/base_zzzelp.js
 * 
 * Le but de cette librairie est d'alléger Zzzelp, Zzzelpfloods, ZzzelpScript ainsi que dépendances en évitant les doublons de fonctions classiques
 * Elle est accessible à tous et utilisable sans restriction pour permettre aux développeurs débutant dans les outils Fourmizzz de se concentrer sur leurs outils
*/

/*
 * SECTIONS DE LA LIBRAIRIE :
 * - Variables generales
 * - Fonctions PHP
 * - Fonctions Fourmizzz
 * - Fonctions Zzzelp
 * - Fonctions diverses
 * - Gestion des dates 
 * - Gestion DOM
*/


/*
 * VARIABLES GENERALES
*/


var url =  decodeURIComponent(document.location.href),
	ze_serveurs = new Array('s1', 's2', 's3', 's4', 'test'),
	ze_serveurs_full = {
							s1 : 'Serveur 1',
							s2 : 'Serveur 2',
							s3 : 'Serveur 3',
							s4 : 'Serveur 4',
							test : 'Serveur test'
						};

if(~document.location.href.indexOf('fourmizzz.fr')) {
	ze_serveur = in_array(new RegExp("((http://|)(www|)(.*).|)fourmizzz.fr").exec(url)[4], ze_serveurs) ? new RegExp("((http://|)(www|)(.*).|)fourmizzz.fr").exec(url)[4] : undefined,
	Connecte = document.querySelectorAll('#loginForm').length ? false : true;
}
else if(~document.location.href.indexOf('zzzelp.fr')) {
	url_zzzelp = url_site;
}
if(document.location.href.indexOf('fourmizzz.fr') < 0 || Connecte) {
	if(~document.location.href.indexOf('fourmizzz.fr')) {
		var	gpseudo = document.querySelector('#pseudo').innerHTML,
			galliance = document.querySelector('#tag_alliance').innerHTML,
			gTDC = parseInt(document.querySelector('#quantite_tdc').innerHTML),
			gouvrieres = document.querySelector('#nb_ouvrieres').innerHTML,
			gmateriaux = document.querySelector('#nb_materiaux').innerHTML,
			gadmin = ((gpseudo == 'delangle' && ze_serveur == 's2') || (gpseudo == 'delangle' && in_array(ze_serveur, ['s1', 's3', 's4']))),
			ComptePlus =  document.querySelectorAll('#ligne_ponte').length ? true : false;
		
	}
	var	Constructions = ['Champignonnière', 'Entrepôt de Nourriture', 'Entrepôt de Matériaux', 'Couveuse', 'Solarium', 'Laboratoire', 'Salle d\'analyse', 'Salle de combat', 'Caserne', 'Dôme', 'Loge Impériale', 'Etable à pucerons', 'Etable à cochenilles'],
		Recherches = ['Technique de ponte', 'Bouclier Thoracique', 'Armes', 'Architecture', 'Communication avec les animaux', 'Vitesse de chasse', "Vitesse d'attaque", 'Génétique', 'Acide', 'Poison'],
		gUnitesLongues = ["Jeune Soldate Naine", "Soldate Naine", "Naine d’Elite", "Jeune Soldate", "Soldate", "Concierge", "Concierge d’élite", "Artilleuse", "Artilleuse d’élite", "Soldate d’élite", "Tank", "Tank d’élite", "Tueuse",  "Tueuse d’élite"],	
		unites_chasses = {
			noms_singulier : new Array('Petite araignée', 'Araignée', 'Chenille', 'Criquet', 'Guèpe', 'Cigale', 'Dionée', 'Abeille', 'Hanneton', 'Scarabée', 'Lezard', 'Mante religieuse', 'Souris', 'Mulot', 'Alouette', 'Rat', 'Tamanoir'),
			noms_pluriel : new Array('Petites araignées', 'Araignées', 'Chenilles', 'Criquets', 'Guèpes', 'Cigales', 'Dionées', 'Abeilles', 'Hannetons', 'Scarabées', 'Lezards', 'Mantes religieuses', 'Souris', 'Mulots', 'Alouettes', 'Rats', 'Tamanoirs')
		},
		caracteres = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'),
		admin_zzzelp = {s1 : 'delangle', s2 : 'delangle', s3 : 'delangle', s4 : 'delangle', test : 'delangle', w1 : 'delangle'};
}








 


/*
FONCTIONS PHP
 * - in_array
 * - array_sum
 * - time
 * - str_repeat
 * - addslashes
*/

function in_array(cle, tableau) {
		for(var i in tableau) {
				if(tableau[i] == cle) return true;
		}
		return false;
}

function array_sum(tableau) {
	var n = 0;
	for(var i=0; i<tableau.length; i++) {
		n += parseInt(tableau[i]);
	}
	return n;
}

function time(ms) {
	if(typeof ms == 'undefined') {
		var ms = false;
	}
	return Math.round(+new Date()/(ms ? 1 : 1000));
}

function str_repeat(input, multiplier) {
	var y = '';
	while (true) {
		if (multiplier & 1) {
			y += input;
		}
		multiplier >>= 1;
		if (multiplier) {
			input += input;
		} else {
			break;
		}
	}
	return y;
}

function addslashes(str) {
	return (str + '')
		.replace(/[\\"']/g, '\\$&')
		.replace(/\u0000/g, '\\0');
}

function html_entity_decode(string, quote_style) {
	//  discuss at: http://phpjs.org/functions/html_entity_decode/
	// original by: john (http://www.jd-tech.net)
	//    input by: ger
	//    input by: Ratheous
	//    input by: Nick Kolosov (http://sammy.ru)
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: marc andreu
	//  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// bugfixed by: Onno Marsman
	// bugfixed by: Brett Zamir (http://brett-zamir.me)
	// bugfixed by: Fox
	//  depends on: get_html_translation_table
	//   example 1: html_entity_decode('Kevin &amp; van Zonneveld');
	//   returns 1: 'Kevin & van Zonneveld'
	//   example 2: html_entity_decode('&amp;lt;');
	//   returns 2: '&lt;'

	var hash_map = {},
		symbol = '',
		tmp_str = '',
		entity = '';
	tmp_str = string.toString();

	if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
		return false;
	}

	// fix &amp; problem
	// http://phpjs.org/functions/get_html_translation_table:416#comment_97660
	delete(hash_map['&']);
	hash_map['&'] = '&amp;';

	for (symbol in hash_map) {
		entity = hash_map[symbol];
		tmp_str = tmp_str.split(entity)
			.join(symbol);
	}
	tmp_str = tmp_str.split('&#039;')
		.join("'");

	return tmp_str;
}

function get_html_translation_table(table, quote_style) {
	//  discuss at: http://phpjs.org/functions/get_html_translation_table/
	// original by: Philip Peterson
	//  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// bugfixed by: noname
	// bugfixed by: Alex
	// bugfixed by: Marco
	// bugfixed by: madipta
	// bugfixed by: Brett Zamir (http://brett-zamir.me)
	// bugfixed by: T.Wild
	// improved by: KELAN
	// improved by: Brett Zamir (http://brett-zamir.me)
	//    input by: Frank Forte
	//    input by: Ratheous
	//        note: It has been decided that we're not going to add global
	//        note: dependencies to php.js, meaning the constants are not
	//        note: real constants, but strings instead. Integers are also supported if someone
	//        note: chooses to create the constants themselves.
	//   example 1: get_html_translation_table('HTML_SPECIALCHARS');
	//   returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}

	var entities = {},
		hash_map = {},
		decimal;
	var constMappingTable = {},
		constMappingQuoteStyle = {};
	var useTable = {},
		useQuoteStyle = {};

	// Translate arguments
	constMappingTable[0] = 'HTML_SPECIALCHARS';
	constMappingTable[1] = 'HTML_ENTITIES';
	constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
	constMappingQuoteStyle[2] = 'ENT_COMPAT';
	constMappingQuoteStyle[3] = 'ENT_QUOTES';

	useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
	useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() :
		'ENT_COMPAT';

	if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
		throw new Error('Table: ' + useTable + ' not supported');
		// return false;
	}

	entities['38'] = '&amp;';
	if (useTable === 'HTML_ENTITIES') {
		entities['160'] = '&nbsp;';
		entities['161'] = '&iexcl;';
		entities['162'] = '&cent;';
		entities['163'] = '&pound;';
		entities['164'] = '&curren;';
		entities['165'] = '&yen;';
		entities['166'] = '&brvbar;';
		entities['167'] = '&sect;';
		entities['168'] = '&uml;';
		entities['169'] = '&copy;';
		entities['170'] = '&ordf;';
		entities['171'] = '&laquo;';
		entities['172'] = '&not;';
		entities['173'] = '&shy;';
		entities['174'] = '&reg;';
		entities['175'] = '&macr;';
		entities['176'] = '&deg;';
		entities['177'] = '&plusmn;';
		entities['178'] = '&sup2;';
		entities['179'] = '&sup3;';
		entities['180'] = '&acute;';
		entities['181'] = '&micro;';
		entities['182'] = '&para;';
		entities['183'] = '&middot;';
		entities['184'] = '&cedil;';
		entities['185'] = '&sup1;';
		entities['186'] = '&ordm;';
		entities['187'] = '&raquo;';
		entities['188'] = '&frac14;';
		entities['189'] = '&frac12;';
		entities['190'] = '&frac34;';
		entities['191'] = '&iquest;';
		entities['192'] = '&Agrave;';
		entities['193'] = '&Aacute;';
		entities['194'] = '&Acirc;';
		entities['195'] = '&Atilde;';
		entities['196'] = '&Auml;';
		entities['197'] = '&Aring;';
		entities['198'] = '&AElig;';
		entities['199'] = '&Ccedil;';
		entities['200'] = '&Egrave;';
		entities['201'] = '&Eacute;';
		entities['202'] = '&Ecirc;';
		entities['203'] = '&Euml;';
		entities['204'] = '&Igrave;';
		entities['205'] = '&Iacute;';
		entities['206'] = '&Icirc;';
		entities['207'] = '&Iuml;';
		entities['208'] = '&ETH;';
		entities['209'] = '&Ntilde;';
		entities['210'] = '&Ograve;';
		entities['211'] = '&Oacute;';
		entities['212'] = '&Ocirc;';
		entities['213'] = '&Otilde;';
		entities['214'] = '&Ouml;';
		entities['215'] = '&times;';
		entities['216'] = '&Oslash;';
		entities['217'] = '&Ugrave;';
		entities['218'] = '&Uacute;';
		entities['219'] = '&Ucirc;';
		entities['220'] = '&Uuml;';
		entities['221'] = '&Yacute;';
		entities['222'] = '&THORN;';
		entities['223'] = '&szlig;';
		entities['224'] = '&agrave;';
		entities['225'] = '&aacute;';
		entities['226'] = '&acirc;';
		entities['227'] = '&atilde;';
		entities['228'] = '&auml;';
		entities['229'] = '&aring;';
		entities['230'] = '&aelig;';
		entities['231'] = '&ccedil;';
		entities['232'] = '&egrave;';
		entities['233'] = '&eacute;';
		entities['234'] = '&ecirc;';
		entities['235'] = '&euml;';
		entities['236'] = '&igrave;';
		entities['237'] = '&iacute;';
		entities['238'] = '&icirc;';
		entities['239'] = '&iuml;';
		entities['240'] = '&eth;';
		entities['241'] = '&ntilde;';
		entities['242'] = '&ograve;';
		entities['243'] = '&oacute;';
		entities['244'] = '&ocirc;';
		entities['245'] = '&otilde;';
		entities['246'] = '&ouml;';
		entities['247'] = '&divide;';
		entities['248'] = '&oslash;';
		entities['249'] = '&ugrave;';
		entities['250'] = '&uacute;';
		entities['251'] = '&ucirc;';
		entities['252'] = '&uuml;';
		entities['253'] = '&yacute;';
		entities['254'] = '&thorn;';
		entities['255'] = '&yuml;';
	}

	if (useQuoteStyle !== 'ENT_NOQUOTES') {
		entities['34'] = '&quot;';
	}
	if (useQuoteStyle === 'ENT_QUOTES') {
		entities['39'] = '&#39;';
	}
	entities['60'] = '&lt;';
	entities['62'] = '&gt;';

	// ascii decimals to real symbols
	for (decimal in entities) {
		if (entities.hasOwnProperty(decimal)) {
			hash_map[String.fromCharCode(decimal)] = entities[decimal];
		}
	}

	return hash_map;
}









/*
FONCTIONS FOURMIZZZ
 * - ze_Analyse_armee
 * - ze_Extraction_armee
 * - ze_Full_XP_avec_JSN
 * - ze_Full_XP_sans_JSN
 * - ze_Calcul_attaque_HB
 * - ze_Calcul_vie_HB
 * - ze_Calcul_defense_HB
 * - ze_Calcul_capa_flood
 * - ze_Calcul_consommation_armee
 * - ze_Calcul_annees_HOF
 * - ze_Calcul_vie_AB
 * - ze_Calcul_attaque_AB
 * - ze_Calcul_defense_AB
 * - ze_Calcul_distance
 * - ze_Calcul_temps_trajet
 * - ze_Lien_profil
 * - ze_Lien_alliance
*/


function getToken() {
	var xdr = ze_getXDomainRequest();
	xdr.open("GET", 'http://' + ze_serveur + '.fourmizzz.fr/api.php?getToken', false);
	xdr.send();
	return JSON.parse(xdr.responseText).token;
}



/*
 * Renvoi le tdp actuel du joueur
 * None -> int
*/
function ze_getTDP() {
	return ze_Recuperation_niveau_memoire('construction', 3) + ze_Recuperation_niveau_memoire('construction', 4) + ze_Recuperation_niveau_memoire('laboratoire', 0);
}

/*
 * Renvoi la Force de Frappe de l'armée rencontrée en chasse
 * array -> int
*/
function ze_Calcul_degats_chasse(armee) {
	var attaque = 0,
		coeffs = [13,19,30,42,50,70,70,115,140,230,700,1200,1400,3000,10000,50000,1000000];
	for(var i=0;i<17;i++) {
		attaque += armee[i]*coeffs[i];
	}
	return attaque;
}

/* Renvoi la Vie de l'armée rencontrée en chasse
 * array -> int
*/
function ze_Calcul_vie_chasse(armee) {
	var vie = 0,
		coeffs = [50,90,100,105,140,200,700,220,450,1000,5000,900,4800,8400,13000,105000,6600000];
	for(var i=0;i<17;i++) {
		vie += armee[i]*coeffs[i];
	}
	return vie;
}


/*
 * Renvoi la distance (en unités de Fourmizzz) entre deux joueurs J1(X,Y) et J2(X_2,Y_2)
 * (int, int, int, int) -> int
*/
function ze_Calcul_distance(X, Y, X_2, Y_2) {
	return Math.sqrt(Math.pow(X-X_2,2)+Math.pow(Y-Y_2,2));
}

/*
 * Renvoi le temps de trajet en secondes entre deux joueurs en donnant leur distance et la vitesse d'attaque à utiliser
 * (int, int) -> int
*/
function ze_Calcul_temps_trajet(distance, vitesse_attaque, ms) {
	if(typeof ms == 'undefined' || !ms) {
		return Math.ceil(((1-Math.exp(-distance/350))*7.375*Math.pow(0.9,vitesse_attaque))*86400);
	}
	else {
		return Math.ceil(((1-Math.exp(-distance/350))*7.375*Math.pow(0.9,vitesse_attaque))*86400000);
	}
}


/*
 * Génère le lien vers le profil d'un joueur
 * string -> string
*/
function ze_Lien_profil(pseudo, serveur) {
	if(typeof serveur == "undefined") {
		serveur = ze_serveur;
	}
	return '<a target="_BLANK" href="http://' + serveur + '.fourmizzz.fr/Membre.php?Pseudo=' + pseudo + '">' + pseudo + '</a>';
}

/*
 * Génère le lien vers la description d'une alliance
 * string -> string
*/
function ze_Lien_alliance(TAG, serveur) {
	if(typeof serveur == "undefined") {
		serveur = ze_serveur;
	}
	return '<a target="_BLANK" href="http://' + serveur + '.fourmizzz.fr/classementAlliance.php?alliance=' + TAG + '">' + TAG + '</a>';
}










/*
FONCTIONS ZZZELP
 * - ze_Recuperation_niveau_memoire
 * - ze_Recuperation_coordonnees
 * - ze_Inserer_message
 * - ze_Envoi_chat
 * - ze_Preparation_message
 * - Parametre_ZzzelpScript
 * - ze_Analyser_chaine
 * - Trie_rapide_sous_chaine
*/

/*
 * Récupère un niveau de constrution ou laboratoire en mémoire si ils y sont stockés par ZzzelpScript
 * (str, int) -> int
*/
function ze_Recuperation_niveau_memoire(mode, n) {
	if(localStorage['zzzelp_niveaux_' + mode]) {
		var niveau = localStorage['zzzelp_niveaux_' + mode].split(',')[n];
	}
	else {
		var niveau = 0;
	}
	return ((niveau > 0) ? parseInt(niveau) : 0);
}

/* 
 * Récupère sur Zzzelp les coordonnées d'une liste de joueurs de l'alliances
 * (array, array) -> None
*/
function ze_Recuperation_coordonnees(joueurs, alliances) {
	var coordonnees = localStorage['zzzelp_coordonnees_' + ze_serveur];
	if(coordonnees) {
		coordonnees = JSON.parse(coordonnees);
	}
	else {
		coordonnees = {};
		localStorage['zzzelp_coordonnees_' + ze_serveur] = JSON.stringify(coordonnees);
	}
	var xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		console.log('Coordonnées récupérées');
		console.log(xdr.responseText);
		var new_coordonnees = JSON.parse(xdr.responseText);
		for(var i=0;i<new_coordonnees.length;i++) {
			new_coordonnees[i].pseudo = new_coordonnees[i].pseudo.replace('&deg;', '°');
			coordonnees[new_coordonnees[i].pseudo] = new_coordonnees[i];
		}
		localStorage['zzzelp_coordonnees_' + ze_serveur] = JSON.stringify(coordonnees);
		if(joueurs.length > 0) {
			ze_Recuperation_coordonnees(joueurs, []);
		}
		else {
			console.log('FIN');
		}
	}
	if(joueurs.length > 100) {
		joueurs_2 = joueurs.slice(0,100)
		joueurs = joueurs.slice(100,joueurs.length);
	}
	else {
		joueurs_2 = joueurs;
		joueurs = new Array();
	}
	xdr.open("GET", url_zzzelp + '/coordonnees?serveur=' + ze_serveur + '&alliances=[' + alliances + ']&joueurs=[' + joueurs_2 + ']');
	xdr.send();
}

/*
 * Insère un message informatif en haut de la page
 * str -> None
*/
function ze_Inserer_message(message, duree) {
	if(typeof duree == "undefined") {
		duree = 0;
	}
	var conteneur = document.createElement('div'),
		lien_zzzelp = document.createElement('span'),
		contenu = document.createElement('span');
	conteneur.setAttribute('class', 'message_information_zzzelp');
	lien_zzzelp.setAttribute('class', 'lien_message_zzzelp');
	contenu.setAttribute('class', 'contenu_message_zzzelp');
	contenu.innerHTML = message;
	document.querySelector('body').insertBefore(conteneur, document.querySelector('#centre'));
	conteneur.appendChild(lien_zzzelp);
	conteneur.appendChild(contenu);
	contenu.onmouseover = function onmouseover() {ze_Supprimer_element(conteneur);return false;};
	if(duree != 0) {
		setTimeout(function(){ze_Supprimer_element(conteneur);return false;}, duree);
	}
}

/*
 * Envoi un message sur le chat de son choix
 * str -> None
*/
function ze_Envoi_chat(typeChat) {
	var message = ze_Preparation_message(document.querySelector('#message').value);
	if(message.length > 0) {
		message = (document.querySelector('#inputCouleur').value == '0000000') ? message : ('[color=#' + document.querySelector('#inputCouleur').value + ']' + message + '[/color]');
		$.ajax({
			url : "appelAjax.php",
			type : 'GET',
			data: "actualiserChat="+typeChat+"&message="+encodeURIComponent((message))+"&inputCouleur="+$('#inputCouleur').val()+'&t='+$('#t').val(),
			success : function(data){
				$('#anciensMessages').prepend($('#nouveauxMessages').html());
				$('#nouveauxMessages').html(data.message);
				$('#NonLuMess').html(data.NonLuMess);
				$('#NonLuRapComb').html(data.NonLuRapComb);
				$('#NonLuRapChass').html(data.NonLuRapChass);
			}
		});
		$('#message').val('').focus();
	}
}

/* 
 * Remplace les smileys Zzzelp par les liens des images 
 * str -> str
*/
function ze_Preparation_message(message) {
	var	packs = document.querySelectorAll('[id*="zone_smileys_zzzelp_"]');
	for(var i=0; i<packs.length; i++) {
		var liste = packs[i].querySelectorAll('img');
		for(var j=0; j<liste.length; j++) {
			var regexp = new RegExp('{z' +  packs[i].dataset.numero + '_' + liste[j].dataset.nom + '}', 'g');
			message = message.replace(regexp, '[img]' + liste[j].src + '[/img]');
		}
	}
	return message;
}

/* 
 * Récupère un paramètre du script importé depuis Zzzelp
 * str -> array -> Object
*/
function Parametre_ZzzelpScript(section, optionnels) {
	try {
		var parametres = JSON.parse(localStorage['zzzelp_parametres_' + ze_serveur]);
		if(section == 'parametres') {
			if(parametres.parametres[optionnels[0]].parametres[optionnels[1]].hasOwnProperty('active')) {
				return parametres.parametres[optionnels[0]].parametres[optionnels[1]].active == '1';
			}
			else {
				return parametres.parametres[optionnels[0]].parametres[optionnels[1]].valeur;
			}
		}
		else if(section == 'ghosts') {
			return parametres.ghosts[optionnels[0]];
		}
		else if(section == '*') {
			return parametres;
		}
		else if(in_array(section, ['sondes', 'antisonde', 'donnees_traceur', 'menu', 'menucplus', 'modules', 'smileys', 'membres', 'fichiers', 'traceur_perso', 'version', 'script_prive', 'droits', 'FI_guerre'])) {
			return parametres[section];
		}
		else if(in_array(section, ['zzzelpfloods_test'])) {
			if(typeof parametres['zzzelpfloods_test'] != 'undefined') {
				return parametres['zzzelpfloods_prive'][optionnels[0]];
			}
			else {
				return undefined;
			}
		}
	}
	catch(e) {
		return undefined;
	}
}

/*
 * Transfome une liste de pseudos / rangs en une chaîne organisé
 * Object -> Object
*/
function ze_Analyser_chaine(rangs) {
	var analyses = new Array(
						{ role : 'grenier', regexp : '(convoyeur|grenier|gr)(\\s|)(.*)', place : 3 },
						{ role : 'passeur', regexp : '(passeur|inter|p|finisseur)(\s|)(.*)', place : 3 },
						{ role : 'chasseur', regexp : '(chasseur)', place : 0 }
							),
		chaine = new Array();
	for(var i=0; i<analyses.length; i++) {
		for(var j=0; j<rangs[analyses[i].role].length; j++) {
			var rang = rangs[analyses[i].role][j].rang.toLowerCase(),
				pseudo = rangs[analyses[i].role][j].pseudo,
				TDC = rangs[analyses[i].role][j].TDC;
			if(rang.match(new RegExp(analyses[i].regexp))) {
				var valeurs = new RegExp(analyses[i].regexp).exec(rang);
				chaine.push({ 
					pseudo : pseudo, 
					TDC : TDC, 
					role : analyses[i].role,
					titre : valeurs[1],
					place : ((analyses[i].place > 0) ? valeurs[analyses[i].place] : undefined), 
					rang : rangs[analyses[i].role][j].rang 
				});
			}
		}
	}
	for(var n=0; n<chaine.length; n++) {
		if(chaine[n].place) {
			if(chaine[n].role == 'chasseur') {
				chaine[n].TDC = -1;
				chaine[n].mode = 3;
			}
			if(chaine[n].place.match(new RegExp('([0-9\.]+)(t|g|m|k)'))) {
				chaine[n].TDC = ze_Nombre_complet(chaine[n].place);
				chaine[n].mode = 0; //Rang défini par un niveau de TDC
			}
			else if(chaine[n].place.match(new RegExp('([0-9]+)'))) {
				chaine[n].emplacement = parseInt(new RegExp('([0-9]+)').exec(chaine[n].place)[1]);
				chaine[n].mode = 1; //Rang défini par un numero
			}
			else if(chaine[n].place.match(new RegExp('([a-z]+)'))) {
				chaine[n].emplacement = parseInt(new RegExp('([a-z]+)').exec(chaine[n].place)[1]);
				chaine[n].mode = 2; //Rang défini par une lettre
			}
		}
	}
	//Séparation de la chaine en sous groupes
	var organisation = new Array();
	for(var n=0; n<chaine.length; n++) {
		var trouve = false;
		for(var i=0; i<organisation.length; i++) {
			if(organisation[i].role == chaine[n].role && organisation[i].mode == chaine[n].mode && organisation[i].titre == chaine[n].titre) {
				organisation[i].joueurs.push(chaine[n]);
				trouve = true;
			}
		}
		if(!trouve) {
			organisation.push({ 
				role : chaine[n].role, 
				mode : chaine[n].mode,
				titre : chaine[n].titre,
				joueurs : new Array(chaine[n]) 
			});
		}
	}
	
	//On détermine le sens de chaque groupe et on les range dans l'ordre
	for(var n=0; n<organisation.length; n++) {
		var card = organisation[n].joueurs.length,
			moyenne = 0;
		for(var i=0; i<card; i++) {
			moyenne += organisation[n].joueurs[i].TDC / card;
		}
		organisation[n].TDC_moyen = parseInt(moyenne);
		if(in_array(organisation[n].mode, [1,2])) {
			if(card == 1) {
				var asc = true;
			}
			else {
				if(card < 4) {
					var TDC_rang_bas = (organisation[n].joueurs[0].emplacement > organisation[n].joueurs[card-1].emplacement) ? organisation[n].joueurs[card-1].TDC : organisation[n].joueurs[0].TDC,
						TDC_rang_haut = (organisation[n].joueurs[0].emplacement > organisation[n].joueurs[card-1].emplacement) ? organisation[n].joueurs[0].TDC : organisation[n].joueurs[card-1].TDC;	
				}
				else {
					var hauts = new Array(),
						bas = new Array();
					for(var i=0; i<card; i++) {
						if(hauts.length < 2) {
							hauts.push(i);
						}
						else if(organisation[n].joueurs[i].emplacement > organisation[n].joueurs[hauts[0]].emplacement && organisation[n].joueurs[hauts[0]].emplacement < organisation[n].joueurs[hauts[1]].emplacement) {
							hauts[0] = i;
						}
						else if(organisation[n].joueurs[i].emplacement > organisation[n].joueurs[hauts[1]].emplacement) {
							hauts[1] = i;
						}
						if(bas.length < 2) {
							bas.push(i);
						}
						else if(organisation[n].joueurs[i].emplacement < organisation[n].joueurs[bas[0]].emplacement && organisation[n].joueurs[bas[0]].emplacement > organisation[n].joueurs[bas[1]].emplacement) {
							bas[0] = i;
						}
						else if(organisation[n].joueurs[i].emplacement < organisation[n].joueurs[bas[1]].emplacement) {
							bas[1] = i;
						}
					}
					var TDC_haut_rang = organisation[n].joueurs[hauts[0]].TDC + organisation[n].joueurs[hauts[1]].TDC,
						TDC_bas_rang = organisation[n].joueurs[bas[0]].TDC + organisation[n].joueurs[bas[1]].TDC;
				}
				var asc = (TDC_haut_rang > TDC_bas_rang)
			}
		}
		else {
			var asc = true;
		}
		organisation[n].joueurs = Trie_rapide_sous_chaine(organisation[n].joueurs, asc, (in_array(organisation[n].mode, [1,2]) ? 'emplacement' : 'TDC'));
	}
	organisation.sort(function(a, b){
		if (a.TDC_moyen < b.TDC_moyen) 
			return 1;
		if (a.TDC_moyen > b.TDC_moyen)
			return -1;
		return 0;
		});
	
	//On reconstitue la chaine
	var finale = [],
		n = 1;
	for(var i=0; i<organisation.length; i++) {
		for(var j=0; j<organisation[i].joueurs.length; j++) {
			finale[organisation[i].joueurs[j].pseudo] = { role : organisation[i].joueurs[j].role, rang : organisation[i].joueurs[j].rang, numero : n };
			n+=1;
		}
	}
	return finale;
}

/*
 * Trie une sous-chaine (les passeurs par exemple) par rang décroissant
 * Array -> bool -> str -> Array */
function Trie_rapide_sous_chaine(joueurs, asc, variable) {
	if(joueurs.length < 2) {
		return joueurs;
	}
	var petit = new Array(),
		grand = new Array();
	for(var k=1; k<joueurs.length; k++) {
		if((asc && joueurs[k][variable] > joueurs[0][variable]) || (!asc && joueurs[k][variable] < joueurs[0][variable])) {
			petit.push(joueurs[k]);
		}
		else {
			grand.push(joueurs[k]);
		}
	}
	var res_1 = Trie_rapide_sous_chaine(petit, asc, variable).concat([joueurs[0]], Trie_rapide_sous_chaine(grand, asc, variable));
	return res_1;
}

/* Affiche une fenêtre modale avec l'aide de Zzzelp */
function ze_Lancement_aide_Zzzelp(defaut, mode) {
	var par_defaut = (typeof defaut == 'undefined') ? '' : defaut;
	xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		if(typeof gpseudo != 'undefined') {
			var valeurs = JSON.parse(xdr.responseText).resultats;
			if(valeurs == 'Authentification ratée') {
				ze_Lancement_aide_Zzzelp(defaut, 2);
			}
			else {
				console.log(valeurs);
				ze_Generation_aide(valeurs, par_defaut);				
			}
		}
		else {
			ze_Generation_aide(JSON.parse(xdr.responseText), par_defaut);
		}
	}
	if(typeof gpseudo != 'undefined') {
		lien = url_zzzelp + '/aide_script?serveur=' + ze_serveur + '&pseudo=' + gpseudo + '&token=' + ((mode == 2) ? getToken() : getTokenZzzelp());
	}
	else {
		lien = url_zzzelp + '/aide_data';
	}
	console.log(lien);
	xdr.open('GET', lien, true);
	xdr.send(null);
}

function ze_Generation_aide(aide, par_defaut) {
	var fond = document.createElement('div'),
		fenetre = document.createElement('div'),
		entete = document.createElement('header'),
		titre_sommaire = document.createElement('span'),
		contenu_sommaire = document.createElement('div'),
		barre_boutons = document.createElement('div'),
		bouton_quitter = document.createElement('img'),
		bouton_sommaire = document.createElement('img');
	titre_sommaire.innerHTML = 'Aide de ZzzelpScript';
	titre_sommaire.className = 'zzzelp_titre_FAQ'
	titre_sommaire.dataset.section = 0;
	contenu_sommaire.dataset.section = 0;
	contenu_sommaire.dataset.visible = 1;
	contenu_sommaire.className = 'zzzelp_contenu_modal';
	entete.appendChild(titre_sommaire);
	fond.className = 'modal_zzzelp';

	barre_boutons.className = 'zzzelp_modal_boutons';
	bouton_quitter.src = url_zzzelp + '/Images/close.png';
	bouton_quitter.onclick = function onclick(event) {ze_Supprimer_element(fond);}
	bouton_sommaire.src = url_zzzelp + '/Images/home.png'
	bouton_sommaire.onclick = function onclick(event) {ze_Changer_section_FAQ(0);}
	barre_boutons.appendChild(bouton_quitter);
	barre_boutons.appendChild( document.createTextNode( '\u00A0' ) );
	barre_boutons.appendChild(bouton_sommaire);
	fenetre.appendChild(barre_boutons);

	fond.appendChild(fenetre);
	fenetre.appendChild(entete);
	fenetre.appendChild(contenu_sommaire);
	document.body.appendChild(fond);

	var i=0,
		showed = 0;
	for(var section in aide) {
		console.log(section + '|' + par_defaut);
		i++;
		if(section == par_defaut) {
			showed = i;
		}
		var titre_section = document.createElement('span'),
			lien_section = document.createElement('div'),
			contenu_section = document.createElement('div');
		titre_section.innerHTML = aide[section].titre;
		titre_section.className = 'zzzelp_titre_FAQ'
		titre_section.dataset.section = i;
		titre_section.setAttribute('style', 'display:none');
		contenu_section.className = 'zzzelp_contenu_modal';
		contenu_section.dataset.section = i;
		contenu_section.dataset.visible = 0;
		entete.appendChild(titre_section);
		lien_section.className = 'zzzelp_lien_sommaire';
		lien_section.dataset.section = i;
		lien_section.innerHTML = aide[section].titre;
		lien_section.onclick = function onclick(event) { ze_Changer_section_FAQ(this.dataset.section);}
		contenu_sommaire.appendChild(lien_section);
		fenetre.appendChild(contenu_section);
			
		for(var sous_section in aide[section].contenu) {
			var entete_section = document.createElement('h3');
			entete_section.innerHTML = sous_section;
			contenu_section.appendChild(entete_section);
			for(var question in aide[section].contenu[sous_section]) {
				var lien_question = document.createElement('div'),
					contenu_question = document.createElement('div');
				lien_question.className = 'zzzelp_question_FAQ';
				lien_question.innerHTML = question;
				lien_question.onclick = function onclick(event) { ze_Afficher_question_FAQ(this);}
				contenu_question.setAttribute('style', 'display:none');
				contenu_question.className = 'zzzelp_reponse_FAQ';
				contenu_question.innerHTML = '<p>' + aide[section].contenu[sous_section][question].contenu + '</p>';
				contenu_section.appendChild(lien_question);
				contenu_section.appendChild(contenu_question);
			}
		}
	}
	ze_Changer_section_FAQ(showed);
}

function ze_Changer_section_FAQ(i) {
	var titres = document.querySelectorAll('.zzzelp_titre_FAQ'),
		contenus = document.querySelectorAll('.zzzelp_contenu_modal');
	for(n=0; n<titres.length; n++) {
		titres[n].style.display = (titres[n].dataset.section == i) ? '' : 'none';
		contenus[n].dataset.visible = (contenus[n].dataset.section == i) ? 1 : 0;
	}
}

function ze_Afficher_question_FAQ(element) {
	console.log(element.nextSibling.style.display);
	element.nextSibling.style.display = (element.nextSibling.style.display == 'none') ? '' : 'none';
}

/* Récupère le token si celui-ci existe */
function getTokenZzzelp() {
	if(ze_readCookie('zzzelp_token_' + ze_serveur) === null) {
		ze_eraseCookie('zzzelp_token_' + ze_serveur);
		ze_eraseCookie('zzzelp_date_token_' + ze_serveur);
		return '';
	}
	else {
		return ze_readCookie('zzzelp_token_' + ze_serveur);
	}
}

function ze_AuthErrors() {
	var erreurs = (typeof localStorage['zzzelp_erreurs_' + ze_serveur] == 'undefined') ? new Array() : JSON.parse(localStorage['zzzelp_erreurs_' + ze_serveur]);
	console.log(erreurs);
}

function autocompletion(element, parametres) {
	element.setAttribute('autocomplete', 'off');
	if(element.parentNode.nextSibling != null && element.parentNode.nextSibling.className == 'recherche_ajax') {
		ze_Supprimer_element(element.parentNode.nextSibling);
	}
	var zone_resultats = document.createElement('div');
	zone_resultats.className = 'recherche_ajax';
	zone_resultats.setAttribute('z-index', '-1');
	if(element.parentNode.nextSibling != null) {
		element.parentNode.parentNode.insertBefore(zone_resultats, element.parentNode.nextSibling);
	}
	else {
		element.parentNode.parentNode.appendChild(zone_resultats)
	}

	element.onkeyup = function onkeyup(event) {
		if(parametres.multiple) {
			var valeurs = element.value.split(','),
				valeur = valeurs[valeurs.length -1];
		}
		else {
			var valeur = element.value;
		}
		if (valeur.length > 0) {
			var xdr = ze_getXDomainRequest();
			xdr.onload = function() {
				var donnees = JSON.parse(xdr.responseText);
				zone_resultats.innerHTML = '';
				for(var i=0;i<donnees.length;i++) {
					var ligne = document.createElement('div');
					ligne.className = 'ligne_autocomplete';
					ligne.innerHTML = donnees[i];
					ligne.onclick = function onclick(event) {
						console.log(event);
						var nouveau = event.target.innerHTML;
						if(parametres.multiple) {
							valeurs[valeurs.length -1] = nouveau;
							element.value = valeurs + ',';
						}
						else {
							element.value = nouveau;
						}
						zone_resultats.innerHTML = '';
						element.focus();
						zone_resultats.style.zIndex = -1;
					}
					zone_resultats.appendChild(ligne);
				}
				if(donnees.length == 0) {
					zone_resultats.style.zIndex = -1;
				}
				else {
					zone_resultats.style.zIndex = 999;
				}				
			}
			console.log(url_zzzelp + '/autocomplete?mode=' + parametres.mode + '&serveur=' + parametres.serveur + '&valeur=' + valeur);
			xdr.open("GET", url_zzzelp + '/autocomplete?mode=' + parametres.mode + '&serveur=' + parametres.serveur + '&valeur=' + valeur,true);
			xdr.send(null);
		}
		else {
			zone_resultats.innerHTML = "";
			zone_resultats.style.zIndex = -1;
		}
	}
}






/*
FONCTIONS DIVERSES
 * - ze_Nombre
 * - ze_Nombre_complet
 * - ze_Nombre_raccourci
 * - ze_Ajout_espaces
 * - ze_Analyser_URL
 * - ze_Analyser_URL_2
 * - ze_createCookie
 * - ze_readCookie
 * - ze_eraseCookie
 * - ze_getXDomainRequest
 * - ze_Majoration
 * - ze_Minoration
 * - ze_Base_36_10
 * - ze_Base_10_36
 * - ze_Affichage_pourcentage
*/

/* 
 * Renvoi un nombre correctement mis en page avec les espaces entre les milliers (ne pas utiliser avec des nombres à virgules ou négatifs pour l'instant)
 * int -> str
*/
function ze_Nombre(nbr) {
	if(typeof nbr == 'string') {
		return '0';
	}
	var n = String(nbr),
		decimales = (~n.indexOf('.')) ? n.substr(n.indexOf('.') + 1, n.length - n.indexOf('.') - 1) : '',
		entier = String(Math.abs(parseInt(nbr))),
		signe = (nbr >= 0) ? '' :  '-',
		res = '';
	for(var i=entier.length-1; i>=0; i--) {
		res = (((entier.length - i - 1)%3 == 2 && i != 0) ? ' ' : '') + entier[i] + res;
	}
	for(var i=0; i<decimales.length; i++) {
		res += ((i == 0) ? '.' : '') + ((i%3 == 0 && i != 0) ? ' ' : '') + decimales[i];
		
	}
	return signe + res;
}

/*
 * Supprime la mise en page d'un nombre pour le remettre sous sa forme entière (ex : "10k" -> 10000, "10M3" -> 10300000 ...).
 * Ne fonctionne que pour les nombre ayant une seule lettre (10M30k ne fonctionnera pas)
 * str -> int
*/
function ze_Nombre_complet(n) {
	var multiplicateurs = {'k' : 3, 'K' : 3, 'm' : 6, 'M' : 6, 'g' : 9, 'G' : 9, 't' : 12, 'T' : 12},
		valeurs = new RegExp("([0-9\.]+)([k|m|g|t|K|M|G|T])([0-9]+|)").exec(n);
	return valeurs[1] * Math.pow(10,multiplicateurs[valeurs[2]]) + valeurs[3] * Math.pow(10,multiplicateurs[valeurs[2]]-valeurs[3].length);
}

/*
 * Raccourci un nombre en l'affichant avec une lettre de puissance (ex : 10T, 34k7 ...)
 * int -> str
*/
function ze_Nombre_raccourci(n, precision) {
	if(typeof precision == 'undefined') {
		precision = String(n).length;
	}
	var divis = Math.pow(10, String(n).length - precision);
	n = parseInt(n/divis)*divis;
	n = String(n)
	if(n >= 1000) {
		var multiplicateurs = new Array('', 'k', 'M', 'G', 'T'),
			lettre = multiplicateurs[parseInt((n.length-1)/3)]
			res = n.substr(0, n.length - multiplicateurs.indexOf(lettre)*3) + lettre + n.substr(n.length - multiplicateurs.indexOf(lettre)*3, multiplicateurs.indexOf(lettre)*3);
		for(var i=res.length-1; i>res.indexOf(lettre); i--) {
			if(res[i] == '0') {
				res = res.substr(0, res.length-1);
			}
			else {
				break;
			}
		}
	}
	else {
		var res = n;
	}
	return res;
}

/*
 * Rajoute les espaces à un nombre dans un input (appel via onkeyup par exemple), ne fonctionne qu'avec des entiers positifs
 * objet -> None
*/
function ze_Ajout_espaces(element) {
	if(Math.abs(parseInt(element.value.replace(/ /g,""))) > 0) {
		element.value = ze_Nombre(parseInt(element.value.replace(/ /g,"")));	
	}
	else {
		element.value = 0;
	}
}

/*
 * Renvoi la valeur d'un élément présent dans l'URL actuel de la page
 * str -> str
*/
function ze_Analyser_URL(key, default_) {
	if (default_==null) default_="";
	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	var qs = regex.exec(decodeURIComponent(document.location.href));
	if(qs == null) return default_; else return qs[1];
}

/*
 * Renvoi la valeur d'un élément présent dans un URL autre que celui de la page
 * str -> str
*/
function ze_Analyser_URL_2(url,key, default_) {
			 if (default_==null) default_="";
			 key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			 var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
			 var qs = regex.exec(url);
			 if(qs == null) return default_; else return qs[1];
}

/*
 * Crée un cookie
 * (str, str, int) -> None
*/
function ze_createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; domain=fourmizzz.fr; path=/";
}

/*
 * Renvoi la valeur d'un cookie
 * str -> str
*/
function ze_readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

/*
 * Supprime un cookie
 * str -> None
*/
function ze_eraseCookie(name) {
	ze_createCookie(name,"",-1);
}

/* 
 * Initialisation de l'AJAJX cross-domain 
 * None -> object
*/
function ze_getXDomainRequest() {
	var xdr = null; 
	if (window.XDomainRequest) {
		xdr = new XDomainRequest(); 
	} 
	else if (window.XMLHttpRequest) {
		xdr = new XMLHttpRequest(); 
	} 
	else {
		alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
		} 
	return xdr; 
}

/*
 * Renvoi le nombre a majoré par le nombre b
 * int -> int -> int
*/
function ze_Majoration(a, b) {
	return ((a > b) ? b : a);
}

/*
 * Renvoi le nombre a minoré par le nombre b
 * int -> int -> int
*/
function ze_Minoration(a, b) {
	return ((a < b) ? b : a);
}


/*
 * Convertit un nombre en base 36 en un nombre en base 10
 * string -> int
*/
function ze_Base_36_10(n) {
	var nombre = 0;
	for(var i=n.length-1; i>-1; i--) {
		nombre += parseInt(caracteres.indexOf(n.substr(i,1))) * Math.pow(36, n.length-i-1);
	}
	return nombre;
}

/* 
 * Convertit un nombre en base 10 en un nombre en base 36
 * int -> string
*/
function ze_Base_10_36(n) {
	if(n == 0) {
		return 0;
	}
	var nombre = new Array(),
		res = new String;
	while(n != 0) {
		if(n >= 36) {
			nombre.push(n%36);
			n = parseInt(n/36);
		}
		else {
			nombre.push(n);
			n = 0;
		}
	}
	for(var i=nombre.length-1; i>-1; i--) {
		res += String(caracteres[nombre[i]]);
	}
	return res;
}

/*
 * Met en forme le pourcentage d'un nombre avec le signe
 * int -> string
*/
function ze_Affichage_pourcentage(valeur) {
	return ((valeur > 1) ? ('+' + parseInt((valeur - 1)*100)) : parseInt((valeur - 1)*100));
}

function ze_Calcul_ecart_horaires(decalage) {
	setTimeout(function() {
		var xdr = ze_getXDomainRequest();
		xdr.onload = function() {
			var headers = xdr.getAllResponseHeaders().toLowerCase().split('\n'),
				PC = new Date();
			for(var i=0; i<headers.length; i++) {
				if(headers[i].match(new RegExp('date:(.*), ([0-9]+) (.*) ([0-9]+) ([0-9]+):([0-9]+):([0-9]+) gmt'))) {
					var valeurs = new RegExp('date:(.*), ([0-9]+) (.*) ([0-9]+) ([0-9]+):([0-9]+):([0-9]+) gmt').exec(headers[i]),
						ecart = parseInt(valeurs[6])*60+parseInt(valeurs[7])-PC.getMinutes()*60 - PC.getSeconds();
					console.log(ecart)
					if(ecart > 1800) {
						ecart = ecart - 3600;
					}
					localStorage['zzzelp_ecart_horloge'] = ecart*1000 + decalage*1000*60*60;
				}
			}
		}
		xdr.open("GET", document.location);
		xdr.send(null);
	}, 1000 - (new Date()).getMilliseconds() + 300);
}

function ze_getTimeZone() {
	//document.querySelector('select[name="timezone"]');
	var xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		var page = ze_getBody(xdr.responseText),
			zone_page = document.createElement('div');
		zone_page.setAttribute('id','contenu_zzzelp');
		zone_page.setAttribute('style','display:none');
		zone_page.innerHTML = page;
		document.querySelector('body').appendChild(zone_page);
		var select = zone_page.querySelector('select[name="timezone"]'),
			decalage = parseInt(new RegExp('UTC([0-9+:]+)').exec(select.options[select.selectedIndex].innerHTML)[1].replace(':','.'));
		ze_Calcul_ecart_horaires(decalage);
	}
	xdr.open("GET", 'http://' + ze_serveur + '.fourmizzz.fr/compte.php');
	xdr.send();
}

function time_fzzz() {
	return parseInt((time(true) + parseFloat(localStorage['zzzelp_ecart_horloge']))/1000) + new Date().getTimezoneOffset();
}









/*
GESTION DES DATES
 * - ze_Date_to_timestamp_v1
 * - ze_Date_to_timestamp_v2
 * - ze_Timestamp_input
 * - ze_Secondes_date
 * - ze_Generation_date_v1
 * - ze_Generation_date_precise
*/

/* 
 * Transforme une date au format JJ/MM/AA HH:MM en un timestamp 
 * str -> int
*/
function ze_Date_to_timestamp_v1(date) {
	if(date.match(new RegExp('([0-9]{2})\/([0-9]{2})\/([0-9]{2,4})(( |  | à |)([0-9]{2})(h|:)([0-9]{2})(:([0-9]{2})|)|)'))) {
		var donnees = new RegExp('([0-9]{2})\/([0-9]{2})\/([0-9]{2,4})(( |  | à |)([0-9]{2})(h|:)([0-9]{2})(:([0-9]{2})|)|)').exec(date);
		if(typeof donnees[6] == 'undefined') {
			return Math.round(new Date(2000 + parseInt(donnees[3])%2000, parseInt(donnees[2])-1, parseInt(donnees[1]), 0, 0, 0) / 1000);
		}
		else {
			return Math.round(new Date(2000 + parseInt(donnees[3])%2000, parseInt(donnees[2])-1, parseInt(donnees[1]), parseInt(donnees[6]), parseInt(donnees[8]), ((typeof donnees[10] == 'undefined') ? 0 : parseInt(donnees[10]))) / 1000);
		}
	}
	else {
		return 0;
	}
}

/* 
 * Transforme une date de la nouvelle messagerie en un timestamp
 * str -> int
*/
function ze_Date_to_timestamp_v2(date) {
	
	var jours = new Array('dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi');
	var mois = new Array('janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre');
	var currentTime = new Date();
	var year = currentTime.getFullYear();
	var month = currentTime.getMonth();
	var day_week = currentTime.getDay();
	var day = currentTime.getDate();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	
	
	date = date.trim();
	
	if(date.match(new RegExp('^(à |)([0-2][0-9])h([0-5][0-9])$'))) {
		var val = new RegExp('^(à |)([0-2][0-9])h([0-5][0-9])$').exec(date);
		hours = val[2];
		minutes = val[3];
	}
	else if(date.match(new RegExp('^hier (à |)([0-2][0-9])h([0-5][0-9])$'))) {
		var val = new RegExp('^hier (à |)([0-2][0-9])h([0-5][0-9])$').exec(date);
		day--;
		hours = val[2];
		minutes = val[3];
	}
	else if(date.match(new RegExp('^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi) (à |)([0-2][0-9])h([0-5][0-9])$'))) {
		var val = new RegExp('^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi) (à |)([0-2][0-9])h([0-5][0-9])$').exec(date);
		var m_day = jours.indexOf(val[1]);
		if(m_day <= day_week) {
			day = day - (day_week-m_day);
		}
		else {
			day = day - 7 + m_day - day_week;
		}
		hours = val[3];
		minutes = val[4];
	}
	else if(date.match(new RegExp('^(le |)([0-3][0-9]|[0-9]) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre) (à |)([0-2][0-9])h([0-5][0-9])$'))) {
		var val = new RegExp('^(le |)([0-3][0-9]|[0-9]) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre) (à |)([0-2][0-9])h([0-5][0-9])$').exec(date);
		day = val[2];
		m_month = mois.indexOf(val[3]);
		if(m_month <= month) {
			month = m_month;
		}
		else {
			month = m_month;
			year--;
		}
		
		hours = val[5];
		minutes = val[6];
	}
	else if(date.match(new RegExp('^(le |)([0-3][0-9]|[0-9])/([0-1][0-9])/([0-2][0-9]) (à |)([0-2][0-9])h([0-5][0-9])$'))) {
		var val = new RegExp('^(le |)([0-3][0-9]|[0-9])/([0-1][0-9])/([0-2][0-9]) (à |)([0-2][0-9])h([0-5][0-9])$').exec(date);
		day = val[2];
		month = parseInt(val[3])-1;
		year = parseInt(val[4])+2000;
		
		hours = val[6];
		minutes = val[7];
	}
	day = parseInt(day);
	month = parseInt(month);
	year = parseInt(year);
	hours = parseInt(hours);
	minutes = parseInt(minutes);
	return new Date(year, month, day, hours, minutes, 0, 0).getTime()/1000;
}

/*
 * Transforme en timestamp le format de base de date HTML
 * str -> int
*/

function ze_Timestamp_input(date) {
	var donnees = new RegExp('([ 0-9]{4})-([ 0-9]{2})-([ 0-9]{2})( ([ 0-9]{2}):([ 0-9]{2})|)').exec(date);
	if(donnees[4].length > 0) {
		return Math.round(new Date(parseInt(donnees[1]), parseInt(donnees[2])-1, parseInt(donnees[3]), parseInt(donnees[4]), parseInt(donnees[5]), 0) / 1000);
	}
	else {
		return Math.round(new Date(parseInt(donnees[1]), parseInt(donnees[2])-1, parseInt(donnees[3]), 0, 0, 0) / 1000);
	}
}

/* 
 * Transforme un nombre de secondes en date JJ:HH:MM:SS (sans affichage des jours et heures si valant 0) 
 * int -> str
*/
function ze_Secondes_date(secondes, affichage_sec) {
	if(typeof affichage_sec == 'undefined') {
		affichage_sec = true;
	}
	if(secondes == 'jamais') {
		return secondes;
	}
	var annees = (secondes - secondes % 31557600) / 31557600; ;
	secondes = secondes % 31557600;
	var jours = (secondes - secondes % 86400) / 86400;
	secondes = secondes % 86400;
	var heures = (secondes - secondes % 3600) / 3600;
	secondes = secondes % 3600;
	var minutes = (secondes - secondes % 60) / 60;
	secondes = secondes % 60;
	return ((annees > 0) ? ze_Nombre(annees) + 'A ' : '') + ((jours > 0) ? jours + 'J ' : '') + ((heures > 0) ? heures + 'H ' : '') + minutes + 'm ' + (affichage_sec ? secondes + 's' : '');
}

/* 
 * Transforme un timestamp en date au format JJ/MM/AA HH:MM
 * int -> boolean -> str
*/
function ze_Generation_date_v1(timestamp, precis, secondes, annee) {
	if(typeof precis == 'undefined') {
		precis = true;
	}
	if(typeof secondes == 'undefined') {
		secondes = false;
	}
	if(typeof annee == 'undefined') {
		annee = true;
	}
	var date = new Date(timestamp*1000);
	if(secondes) {
		return ((date.getDate() > 9) ? date.getDate()  : ("0" + date.getDate())) + '/' + ((date.getMonth() >= 9) ? (date.getMonth()+1)  : ("0" + (date.getMonth()+1))) + (annee ? ('/' + date.getFullYear().toString().substr(2,2)) : '') + ' ' + ((date.getHours() >= 10) ? date.getHours()  : ("0" + date.getHours())) + ':' + ((date.getMinutes() >= 10) ? date.getMinutes()  : ("0" + date.getMinutes())) + ':' + ((date.getSeconds() >= 10) ? date.getSeconds()  : ("0" + date.getSeconds()));
	}
	else {
		return ((date.getDate() > 9) ? date.getDate()  : ("0" + date.getDate())) + '/' + ((date.getMonth() >= 9) ? (date.getMonth()+1)  : ("0" + (date.getMonth()+1))) + (annee ? ('/' + date.getFullYear().toString().substr(2,2)) : '') + (precis ? (' ' + ((date.getHours() >= 10) ? date.getHours()  : ("0" + date.getHours())) + 'h' + ((date.getMinutes() >= 10) ? date.getMinutes()  : ("0" + date.getMinutes()))) : '');
	}
}

/* 
 * Transforme un timestamp en date au format HH:MM:SS
 * int -> str
*/
function ze_Generation_date_precise(timestamp) {
	var date = new Date(timestamp*1000);
	return ((date.getHours() >= 10) ? date.getHours()  : ("0" + date.getHours())) + ':' + ((date.getMinutes() >= 10) ? date.getMinutes()  : ("0" + date.getMinutes())) + ':' + ((date.getSeconds() >= 10) ? date.getSeconds()  : ("0" + date.getSeconds()));
}

function Generation_date_rome(jours) {
	var date = new Date((time_fzzz()-86400*jours)*1000);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}







/*
GESTION DOM
 * - ze_Supprimer_element
 * - ze_Inserer_script
 * - ze_getBody
 * - ze_HTML_to_BBcode
 * - ze_Nettoyage_HTML
*/


/* 
 * Supprime un élément de la page 
 * object -> None
*/
function ze_Supprimer_element(element) {
	if(element) {
		var remElement = element.parentNode.removeChild(element);
	}
}

/* 
 * Insere un script dans le head de la page avec pour code le contenu donné à la fontion
 * str -> None
*/
function ze_Inserer_script(contenu) {
		var script = document.createElement('script');
		script.innerHTML = contenu;
		script.type = 'text/javascript';
		document.querySelector('body').appendChild(script);	
}

/*
 * Extrait le body d'une page sous la forme d'une chaine de caractère
 * str -> str
*/
function ze_getBody(content) { 
	var x = content.indexOf("<body");
	x = content.indexOf(">", x);
	var y = content.lastIndexOf("</body>"); 
	return content.slice(x + 1, y); //.replace(/<img (.*?)>/g, '');
}

/*
 * Remplace toutes les balises HTML par les balises de BBCode
 * string -> boolean -> string
*/
function ze_HTML_to_BBcode(message, FI) {
	message = String(message).replace(/\n/g, '');
	if(FI) {
		message = message.replace(/<img src="images\/smiley\/(.*?)\.gif">/g, '{$1}');
		message = message.replace(/<a href="Membre\.php\?Pseudo=(.*?)">(.*?)<\/a>/g, '[player]$1[/player]');
		message = message.replace(/<a href="classementAlliance\.php\?alliance=(.*?)">(.*?)<\/a>/g, '[ally]$1[/ally]');
	}
	else {
		message = message.replace(/<img src="images\/smiley\/(.*?)\.gif">/g, '[img]http://s1.fourmizzz.fr/images/smiley/$1.gif[/img]');
		message = message.replace(/<a href="Membre\.php\?Pseudo=(.*?)">(.*?)<\/a>/g, '[b]$1[/b]');
		message = message.replace(/<a href="classementAlliance\.php\?alliance=(.*?)">(.*?)<\/a>/g, '[b]$1[/b]');
		message = message.replace(/<a target="_BLANK" href="http:\/\/(.*?)\/Membre\.php\?Pseudo=(.*?)">(.*?)<\/a>/g, '[url=http://$1/Membre.php?Pseudo=$2]$2[/url]');
	}
	message = message.replace(/<br>/g, '\n');
	message = message.replace(/<img src="(.*?)">/g, '[img]$1[/img]');
	message = message.replace(/<a href="(.*?)" target="_blank">(.*?)<\/a>/g, '[url=$1]$2[/url]');
	message = message.replace(/<strong>([\s\S]*?)<\/strong>/g, '[b]$1[/b]');
	message = message.replace(/<em>([\s\S]*?)<\/em>/g, '[i]$1[/i]');
	message = message.replace(/<font color="(.*?)">(.*?)<\/font>/g, '[color=$1]$2[/color]');
	message = message.replace(/<blockquote>(.*?)<\/blockquote>/g, '[quote]$1[/quote]');
	message = message.replace(/<div style="display:block" align="center">(.*?)<\/div>/g, '[center]$1[/center]');
	message = message.replace(/</g, '[').replace(/>/g, ']');
	return message;
}

function ze_BBcode_to_HTML(message, serveur) {
	message = String(message);
	message = message.replace(/\[player\](.*?)\[\/player\]/g, '<a href="http://' + serveur + '.fourmizzz.fr/Membre.php?Pseudo=$1">$1</a>');
	message = message.replace(/\[ally\](.*?)\[\/ally\]/g, '<a href="http://' + serveur + '.fourmizzz.fr/classementAlliance.php?alliance=$1">$1</a>');
	message = message.replace(/\{(.*?)\}/g, '<img src="http://' + serveur + '.fourmizzz.fr/images/smiley/$1.gif">')
	message = message.replace(/\n/g, '<br>');
	message = message.replace(/\[img\](.*?)\[\/img\]/g, '<img src="$1">');
	message = message.replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>');
	message = message.replace(/\[b\]([\s\S]*?)\[\/b\]/g, '<strong>$1</strong>');
	message = message.replace(/\[i\]([\s\S]*?)\[\/i\]/g, '<em>$1</em>');
	message = message.replace(/\[color=(.*)\](.*)\[\/color\]/, '<font color="$1">$2</font>');
	message = message.replace(/\[quote\](.*)\[\/quote\]/g, '<blockquote>$1</blockquote>');
	message = message.replace(/\[center\](.*)\[\/center\]/g, '<div style="display:block" align="center">$1</div>');
	message = message.replace(/\[/g, '<').replace(/\]/g, '>');
	return message;
}




/*
 * Supprime toutes les balises HTML d'une chaine de caractères
 * string -> string
*/
function ze_Nettoyage_HTML(html) {
	return String(html).replace(/<\/?(?!\!)[^>]*>/gi, '');
}


function ze_TrouverPosition(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return [curtop];
	}
}






/**
*
*  Secure Hash Algorithm (SHA256)
*  http://www.webtoolkit.info/
*
*  Original code by Angel Marin, Paul Johnston.
*
**/
 
function SHA256(s){
 
	var chrsz   = 8;
	var hexcase = 0;
 
	function safe_add (x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
 
	function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
	function R (X, n) { return ( X >>> n ); }
	function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
	function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
	function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
	function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
	function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
	function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
 
	function core_sha256 (m, l) {
		var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
		var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
		var W = new Array(64);
		var a, b, c, d, e, f, g, h, i, j;
		var T1, T2;
 
		m[l >> 5] |= 0x80 << (24 - l % 32);
		m[((l + 64 >> 9) << 4) + 15] = l;
 
		for ( var i = 0; i<m.length; i+=16 ) {
			a = HASH[0];
			b = HASH[1];
			c = HASH[2];
			d = HASH[3];
			e = HASH[4];
			f = HASH[5];
			g = HASH[6];
			h = HASH[7];
 
			for ( var j = 0; j<64; j++) {
				if (j < 16) W[j] = m[j + i];
				else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
 
				T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
				T2 = safe_add(Sigma0256(a), Maj(a, b, c));
 
				h = g;
				g = f;
				f = e;
				e = safe_add(d, T1);
				d = c;
				c = b;
				b = a;
				a = safe_add(T1, T2);
			}
 
			HASH[0] = safe_add(a, HASH[0]);
			HASH[1] = safe_add(b, HASH[1]);
			HASH[2] = safe_add(c, HASH[2]);
			HASH[3] = safe_add(d, HASH[3]);
			HASH[4] = safe_add(e, HASH[4]);
			HASH[5] = safe_add(f, HASH[5]);
			HASH[6] = safe_add(g, HASH[6]);
			HASH[7] = safe_add(h, HASH[7]);
		}
		return HASH;
	}
 
	function str2binb (str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
		}
		return bin;
	}
	//$.get(decodeBase64("aHR0cDovL2dhbW1hbnUudmlsbGUtdmlydHVlbGxlLmNvbS8="));
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	}
 
	function binb2hex (binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
			hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
		}
		return str;
	}
 
	s = Utf8Encode(s);
	return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}