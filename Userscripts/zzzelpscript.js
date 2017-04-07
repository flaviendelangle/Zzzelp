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
			gadmin = ((gpseudo == 'vignarnaud' && ze_serveur == 's2') || (gpseudo == 'delangle' && in_array(ze_serveur, ['s1', 's3', 's4']))),
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
		admin_zzzelp = {s1 : 'delangle', s2 : 'vignarnaud', s3 : 'delangle', s4 : 'delangle', test : 'delangle', w1 : 'delangle'};
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
		ms = false;
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
	var erreurs = (typeof localStorage['zzzelp_erreurs_' + ze_serveur] == 'undefined') ? [] : JSON.parse(localStorage['zzzelp_erreurs_' + ze_serveur]);
	console.log(erreurs);
}

function autocompletion(element, parametres) {
	element.setAttribute('autocomplete', 'off');
	if(element.parentNode.nextSibling !== null && element.parentNode.nextSibling.className == 'recherche_ajax') {
		ze_Supprimer_element(element.parentNode.nextSibling);
	}
	var zone_resultats = document.createElement('div');
	zone_resultats.className = 'recherche_ajax';
	zone_resultats.setAttribute('z-index', '-1');
	if(element.parentNode.nextSibling !== null) {
		element.parentNode.parentNode.insertBefore(zone_resultats, element.parentNode.nextSibling);
	}
	else {
		element.parentNode.parentNode.appendChild(zone_resultats);
	}

	element.onkeyup = function onkeyup(event) {
		var valeur, valeurs;
		if(parametres.multiple) {
			valeurs = element.value.split(',');
			valeur = valeurs[valeurs.length -1];
		}
		else {
			valeur = element.value;
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
					};
					zone_resultats.appendChild(ligne);
				}
				if(donnees.length === 0) {
					zone_resultats.style.zIndex = -1;
				}
				else {
					zone_resultats.style.zIndex = 999;
				}				
			};
			console.log(url_zzzelp + '/autocomplete?mode=' + parametres.mode + '&serveur=' + parametres.serveur + '&valeur=' + valeur);
			xdr.open("GET", url_zzzelp + '/autocomplete?mode=' + parametres.mode + '&serveur=' + parametres.serveur + '&valeur=' + valeur,true);
			xdr.send(null);
		}
		else {
			zone_resultats.innerHTML = "";
			zone_resultats.style.zIndex = -1;
		}
	};
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
	if(n<0) {
		return '-' + ze_Nombre_raccourci(-n, precision);
	}
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
function ze_Affichage_pourcentage(valeur, precision) {
	if(typeof precision == 'undefined') {
		precision == 2;
	}
	var p = Math.pow(10, precision),
		valeur =  parseInt((valeur - 1)*p)*100/p;
	return (valeur > 1) ? ('+' + valeur) : valeur;
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
	return parseInt((time(true) + parseFloat(localStorage.getItem('zzzelp_ecart_horloge')))/1000) + new Date().getTimezoneOffset()*60;
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
	var date = new Date((time()-86400*jours)*1000);
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
var url_zzzelp = 'http://zzzelp.fr/',
	lieux = new Array('TDC', 'Dôme', 'Loge'),
	caracteres = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
	mode = (~document.location.href.indexOf('fourmizzz.fr')) ? 'fourmizzz' : 'zzzelp';


function Generation_floods(zone, donnees) {
	if(document.querySelectorAll('.zone_zzzelpfloods').length == 0) {
		var pseudos = Preparation_donnees(donnees);
		if(!donnees.sondes) {
			donnees.sondes = [
						[{ unite : 0, valeur : Math.pow(10, String(parseInt(donnees.nombre_unites/100000)).length) }],
						[{ unite : 0, valeur : 1 }]
							];
		}
		if(!donnees.antisonde) {
			donnees.antisonde = [
						[{ unite : 0, valeur : 1 }],
						[{ unite : 0, valeur : Math.pow(10, String(parseInt(donnees.nombre_unites/100000)).length) }]
							];
		}
		donnees.sondes[0].valeur = parseInt(donnees.sondes[0].valeur);
		donnees.sondes[1].valeur = parseInt(donnees.sondes[1].valeur);
		donnees.antisonde[0].valeur = parseInt(donnees.antisonde[0].valeur);
		donnees.antisonde[1].valeur = parseInt(donnees.antisonde[1].valeur);		
		Initialisation_interface(pseudos);
	}
	
	
	/*
	FONCTIONS PRELEMINAIRES
	* - Preparation_donnees
	* - Initialisation_interface
	* - Generation_nom_theme
	*/
	function Preparation_donnees(donnees) {
		var pseudos = new Array();
		for(var joueur in donnees.coordonnees[0]) {
			donnees.coordonnees[0][joueur].TDC_actuel = donnees.coordonnees[0][joueur].TDC;
			if(typeof donnees.coordonnees[0][joueur].active == 'string' && donnees.coordonnees[0][joueur].active == 'NON') {
			}
			else {
				donnees.coordonnees[0][joueur].distance = ze_Calcul_distance(parseInt(donnees.coordonnees[0][donnees.pseudo].x), parseInt(donnees.coordonnees[0][donnees.pseudo].y), parseInt(donnees.coordonnees[0][joueur].x), parseInt(donnees.coordonnees[0][joueur].y));
				pseudos.push(joueur);
			}
		}
		var coordonnees = donnees.coordonnees[0];
		pseudos.sort(function (a,b) {
						if(donnees.coordonnees[0][a].distance === donnees.coordonnees[0][b].distance) {
							return 0;
						}
						return (donnees.coordonnees[0][a].distance < donnees.coordonnees[0][b].distance) ? -1 : 1;
					});
		return pseudos;
	}
	
	function Initialisation_interface(pseudos) {
		var zone_zzzelpfloods = document.createElement('div');
		zone_zzzelpfloods.setAttribute('class', 'zone_zzzelpfloods');
		zone_zzzelpfloods.setAttribute('id', Generation_nom_theme());
		zone.appendChild(zone_zzzelpfloods);
		if(donnees.options) {
			Creation_tableau_options();
		}
		var floods_annules = document.createElement('div');
		floods_annules.setAttribute('id', 'floods_annules');
		zone_zzzelpfloods.appendChild(floods_annules);
		for(var i=0; i<pseudos.length; i++) {
			if(pseudos[i] != donnees.pseudo) {
				Creation_tableau_flood(pseudos[i], donnees.coordonnees[0][pseudos[i]]);
			}
		}
		if(donnees.resume) {
			Creation_tableau_resume();
		}
		var lancement = document.createElement('div');
		lancement.innerHTML = 'Lancer';
		lancement.setAttribute('class', 'bouton_lancement');
		lancement.onclick = function onclick(event) { Lancer_floods(); return false; }
		zone_zzzelpfloods.appendChild(lancement);
		var contact = document.createElement('a');
		contact.setAttribute('class', 'lien_contact');
		contact.setAttribute('target', '_BLANK');
		contact.href = url_zzzelp + '/contact/redaction';
		//contact.innerHTML = 'Reporter un bug, une erreur';
		zone_zzzelpfloods.appendChild(contact);
		Actualisation_floods(true);
		Actualiser_heures_arrivee();
	}
	
	function Generation_nom_theme() {
		if(donnees.theme) {
			return 'theme_' + donnees.theme;
		}
		else {
			return 'theme_fourmizzz';
		}
	}
	
	
	
	
	
	/*
	FONCTIONS PRINCIPALES
	* - Actualisation_floods
	* - Creation_tableau_flood
	* - Calcul_CF_initiale
	* - 
	*/

	function Calcul_variations_TDC_externes(debut, fin, joueur, valeurs) {
		donnees.coordonnees[0][donnees.pseudo].TDC_actuel = valeurs.TDC_attaquant;
		if(donnees.variations) {
			for(i=0; i<donnees.variations.length; i++) {
				if(donnees.variations[i][0].date >= debut && donnees.variations[i][0].date <= fin) {
					donnees.variations[i].valeur = parseInt(donnees.variations[i].valeur); 
					var	valeur = Flood_externe_possible(donnees.variations[i][0]);
					if(donnees.coordonnees[0][donnees.variations[i][0].attaquant]) {
						donnees.coordonnees[0][donnees.variations[i][0].attaquant].TDC_actuel += valeur;
					}
					if(donnees.coordonnees[0][donnees.variations[i][0].cible]) {
						donnees.coordonnees[0][donnees.variations[i][0].cible].TDC_actuel -= valeur;
					}
					if(valeur == -1 && valeurs.floods_annules.indexOf(i) == -1) {
						valeurs.floods_annules.push(i);
					}
				}
			}
		}
		valeurs.TDC_cible = donnees.coordonnees[0][joueur].TDC_actuel;
		valeurs.TDC_attaquant = donnees.coordonnees[0][donnees.pseudo].TDC_actuel;
		return valeurs;
	}

		
	function Flood_externe_possible(flood) {
		if(donnees.coordonnees[0][flood.cible] && donnees.coordonnees[0][flood.attaquant]) {
			if(donnees.coordonnees[0][flood.attaquant].TDC_actuel <= 2*donnees.coordonnees[0][flood.cible].TDC_actuel && donnees.coordonnees[0][flood.cible].TDC_actuel <= donnees.coordonnees[0][flood.attaquant].TDC_actuel*3) {
				return parseInt(ze_Majoration(flood.valeur, donnees.coordonnees[0][flood.cible].TDC_actuel*0.2));
			}
			else {
				return 0;
			}
		}
		else {
			return flood.valeur;
		}
	}
	
	function Actualisation_floods(primaire) {
		if(~document.location.href.indexOf('fourmizzz.fr')) { //MAJ des paramètres en cache
			var parametres = JSON.parse(localStorage['zzzelp_parametres_' + ze_serveur]);
			parametres.parametres.zzzelpfloods.parametres.zzzelpfloods_stockage.active = Lancement_via_Zzzelp();
			parametres.parametres.zzzelpfloods.parametres.zzzelpfloods_antisonde.active = Placement_antisonde();
			if(typeof donnees.aide_relance != 'undefined') {
				parametres.parametres.zzzelpfloods.parametres.zzzelpfloods_relance.active = Aide_relance();
				parametres.zzzelpfloods_prive.mode_relance = Valeur_aide_relance();
			}
			if(typeof donnees.anti_synchro != 'undefined') {
				parametres.parametres.zzzelpfloods.parametres.zzzelpfloods_antisynchro.active = Anti_synchronisation();
				parametres.zzzelpfloods_prive.seconde = Valeur_anti_synchronisation();
			}
			console.log(parametres);
			localStorage['zzzelp_parametres_' + ze_serveur] = JSON.stringify(parametres);
		}
		for(var joueur in donnees.coordonnees[0]) {
			donnees.coordonnees[0][joueur].TDC_actuel = donnees.coordonnees[0][joueur].TDC;
		}
		if(typeof donnees.aide_relance != 'undefined') {
			document.querySelector('#choix_aide_relance').disabled = !Aide_relance();
		}
		if(typeof donnees.anti_synchro != 'undefined') {
			document.querySelector('#seconde_anti_synchro').disabled = !Anti_synchronisation();	
		}
		var valeurs = { 
					nombre_unites : Calcul_CF_initiale(), 
					TDC_attaquant : parseInt(donnees.coordonnees[0][donnees.pseudo].TDC), 
					TDC_cible : 0, 
					TDC_attaquant_depart : parseInt(donnees.coordonnees[0][donnees.pseudo].TDC), 
					marge : -1, 
					floods : [], 
					floods_annules : [] 
						},
			ancien_temps = time();
		for(var t=0; t<pseudos.length; t++) {
			if(pseudos[t] != donnees.pseudo) {
				var ID = parseInt(donnees.coordonnees[0][pseudos[t]].ID);
				valeurs.TDC_cible = parseInt(donnees.coordonnees[0][pseudos[t]].TDC);
				valeurs = Calcul_variations_TDC_externes(ancien_temps, time() + donnees.coordonnees[0][pseudos[t]].temps, pseudos[t], valeurs);
				var mode = document.querySelector('.optimisation_' + ID).dataset.mode_opti,
					ancien_temps = donnees.coordonnees[0][pseudos[t]].temps;
				Affichage_mode_courant(ID, mode);
				if(mode != 'inconnu') { 
					Nettoyer_tableau(ID);
				}
				document.querySelector('#TDC_depart_' + ID).innerHTML = ze_Nombre(valeurs.TDC_attaquant);
				if(mode == 'classique' || mode == 'armee_debut' || mode == 'armee_fin') {
					document.querySelector('#TDC_depart_' + ID).innerHTML = ze_Nombre(valeurs.TDC_attaquant);
					document.querySelectorAll('.optimisation_' + ID + ' tr')[1].cells[2].innerHTML = ze_Nombre(valeurs.TDC_cible);
					valeurs.floods = [];
					valeurs.marge = -1;
					valeurs.armee_debut = (mode == 'armee_debut');
					valeurs.armee_fin = (mode == 'armee_fin');
					var valeurs = Optimisation_flood(valeurs);
					Insertion_optimisation_flood(ID, valeurs);
				}
				else if(mode == 'armee_complete') {
					valeurs.floods = [ze_Majoration(valeurs.nombre_unites, valeurs.TDC_cible*0.2)];
					valeurs.armee_complete = 0;
					valeurs.nombre_unites -= ze_Majoration(valeurs.nombre_unites, valeurs.TDC_cible*0.2);
					Insertion_optimisation_flood(ID, valeurs);
				}
				else if(mode == 'armee_complete_sonde') {
					Validation_sonde_manuelle(ID, 0, 1,donnees.sondes[0].unite, donnees.sondes[0].nombre, false);
					valeurs.floods = [ze_Majoration(valeurs.nombre_unites, valeurs.TDC_cible*0.2)];
					valeurs.armee_complete = 0;
					valeurs.nombre_unites -= ze_Majoration(valeurs.nombre_unites, valeurs.TDC_cible*0.2);
					Insertion_optimisation_flood(ID, valeurs);
					
				}
				else if(mode == 'TDC_attaquant' || mode == 'TDC_cible') {
					Preparation_TDC_voulu(mode, ID);
				}
				else if(mode == 'TDC_attaquant_validation' || mode == 'TDC_cible_validation') {
					document.querySelector('#TDC_depart_' + ID).innerHTML = ze_Nombre(valeurs.TDC_attaquant);
					valeurs.floods = [];
					var valeur = parseInt(document.querySelector('.optimisation_' + ID).dataset.TDCvoulu);
					valeurs.marge = (mode == 'TDC_attaquant_validation') ? (valeur - valeurs.TDC_attaquant) : (valeurs.TDC_cible - valeur),
					valeurs = Optimisation_flood(valeurs),
					Insertion_optimisation_flood(ID, valeurs);
				}
				else if(mode == 'serie_attaques') {
					Preparation_serie_attaques(ID);
				}
				else if(mode == 'serie_attaques_validation') {
					document.querySelector('#TDC_depart_' + ID).innerHTML = ze_Nombre(valeurs.TDC_attaquant);
					var nombre = parseInt(document.querySelector('.optimisation_' + ID).dataset.nombreattaques),
						valeur = parseInt(document.querySelector('.optimisation_' + ID).dataset.valeurattaques);
					valeurs.floods = [];
					for(var i=0; i<nombre; i++) {
						if(valeurs.nombre_unites >= valeur) {
							valeurs.floods.push(valeur);
							valeurs.nombre_unites -= valeur;
						}
						else if(valeurs.nombre_unites > 0) {
							valeurs.floods.push(valeurs.nombre_unites);
							valeurs.nombre_unites = 0;
						}
					}
					Insertion_optimisation_flood(ID, valeurs);
				}
				else if(mode == 'sonde') {
					Validation_sonde_manuelle(ID, 0, 1, donnees.sondes[0].unite, donnees.sondes[0].valeur, false);
					Validation_sonde_manuelle(ID, 0, 2, donnees.sondes[1].unite, donnees.sondes[1].valeur, false);
				}
				else if(mode == 'manuel') {
					document.querySelector('#TDC_depart_' + ID).innerHTML = ze_Nombre(valeurs.TDC_attaquant);
					Initialisation_mode_manuel_joueur(ID);
				}
				else if(mode == 'inconnu') {
					var lignes = document.querySelectorAll('.optimisation_' + ID + ' tr');
					for(var i=2;i<lignes.length;i++) {
						if(lignes[i].className != 'ligne_preparation' && lignes[i].className != 'ligne_sonde') {
							var colonnes = lignes[i].cells,
							valeur_prise = (valeurs.TDC_attaquant <= 2*valeurs.TDC_cible && valeurs.TDC_cible <= valeurs.TDC_attaquant*3) ? (ze_Majoration(parseInt(colonnes[0].innerHTML.replace(/ /g, "")), valeurs.TDC_cible*0.2)) : 0;
							valeurs.nombre_unites -= parseInt(colonnes[0].innerHTML.replace(/ /g, ""));
							valeurs.TDC_attaquant = valeurs.TDC_attaquant + valeur_prise;
							valeurs.TDC_cible = valeurs.TDC_cible - valeur_prise;
							colonnes[1].innerHTML = ze_Nombre(valeurs.TDC_attaquant);
							colonnes[2].innerHTML = ze_Nombre(valeurs.TDC_cible);
						}
					}
				}
				Calcul_variations_TDC_externes(((ancien_temps) ? ancien_temps : 0), 1000000, pseudos[t], valeurs);
			}
		}
		if(document.querySelectorAll('[data-type="armee_complete"]').length > 0) {
		}
		var floods = document.querySelectorAll('[data-type="armee_complete"]');
		for(var i=0; i<floods.length; i++) {
			if(i==0) {
					floods[i].cells[0].innerHTML = ze_Nombre(parseInt(floods[i].cells[0].innerHTML.replace(/ /g, '')) + parseInt(valeurs.nombre_unites));
			}
			else {
				floods[i].dataset.type = 'attaque';
			}
		}
		if(primaire) {
			Actualisation_floods(false);
		}
		else if(donnees.lancement_auto) {
			Lancer_floods();
		}
		Actualisation_tableau_resume();
		Affichage_floods_annules(valeurs.floods_annules);
	}
	
	
	function Affichage_mode_courant(ID, mode) {
		var modes = document.querySelectorAll('.optimisation_' + ID + ' td')[4].querySelectorAll('.ligne_mode');
		for(var i=0; i<modes.length; i++) {
			if(modes[i].querySelectorAll('img').length > 0) {
				ze_Supprimer_element(modes[i].querySelector('img'));
			}
		}
		if(mode != 'impossible') {
			if(mode.match(new RegExp('(.*)_validation'))) {
				mode = new RegExp('(.*)_validation').exec(mode)[1];
			}
			var span = document.querySelectorAll('.optimisation_' + ID + ' td')[4].querySelectorAll('[data-mode="' + mode + '"] span')[1],
				img = document.createElement('img');
			img.src = url_zzzelp + '/Images/icone_attaque.gif';
			span.appendChild(img);
		}
	}
	
	function Affichage_floods_annules(floods) {
		var zone = document.querySelector('#floods_annules'),
			anciennes = zone.querySelectorAll('.ligne_flood_annule');
		for(var i=0; i<anciennes.length; i++) {
			ze_Supprimer_element(anciennes[i]);
		}
		for(var i=0; i<floods.length; i++) {
			var flood = document.createElement('div');
			flood.setAttribute('class', 'ligne_flood_annule');
			flood.innerHTML = 'Annulation n°' + (zone.querySelectorAll('.ligne_flood_annule').length + 1) + ' : ' + ze_Nombre(donnees.variations[floods[i]][0].valeur) + ' cm2 de ' + donnees.variations[floods[i]][0].attaquant + ' sur ' + donnees.variations[floods[i]][0].cible;
			zone.appendChild(flood);
		}
	}

	function Creation_tableau_flood(joueur, donnees_joueur, valeurs) {
		var modes = [
						{nom : 'Choix du mode', valeur : 'false' },
						{nom : 'Optimisation classique', valeur : 'classique'},
						{nom : 'TDC voulu attaquant', valeur : 'TDC_attaquant'},
						{nom : 'TDC voulu cible', valeur : 'TDC_cible'},
						{nom : 'Optimisation + armée au début', valeur : 'armee_debut'},
						{nom : 'Optimisation + armée en fin', valeur : 'armee_fin'},
						{nom : 'Série d\'attaques identiques', valeur : 'serie_attaques' },
						{nom : 'Attaque classique', valeur : 'armee_complete'},
						{nom : 'Sonde + Attaque classique', valeur : 'armee_complete_sonde'},
						{nom : 'Sondes Dôme + Loge', valeur : 'sonde' },
						{nom : 'Manuel', valeur : 'inconnu' }
					];
		var manuels = [
						{nom : 'Type de ligne à ajouter', valeur : 'false' },
						{nom : 'Flood manuel', valeur : 'manuel'},
						{nom : 'Sonde manuelle', valeur : 'sonde'}
					]
		var tableau_joueur = document.createElement('table');
		tableau_joueur.dataset.nfloods = 0;
		if(donnees.coordonnees[0][donnees.pseudo].TDC > 2*donnees_joueur.TDC || donnees_joueur.TDC > donnees.coordonnees[0][donnees.pseudo].TDC*3) {
			tableau_joueur.dataset.mode_opti = 'impossible';
		}
		else if(donnees.mode) {
			tableau_joueur.dataset.mode_opti = donnees.mode;
		}
		else {
			tableau_joueur.dataset.mode_opti = 'classique';
		}
		tableau_joueur.setAttribute('ID', 'optimisation_zzzelpfloods');
		tableau_joueur.setAttribute('class', 'optimisation_' + donnees_joueur.ID);
		document.querySelector('.zone_zzzelpfloods').appendChild(tableau_joueur);
		ligne = tableau_joueur.insertRow(0);
		cell = ligne.insertCell(0);
		var temps_trajet = parseInt(ze_Calcul_temps_trajet(donnees_joueur.distance, donnees.vitesse_attaque));
		donnees.coordonnees[0][joueur].temps = temps_trajet;
		var zone_duree = document.createElement('span');
		zone_duree.innerHTML = temps_trajet;
		zone_duree.setAttribute('class', 'invisible');
		zone_duree.setAttribute('id', 'duree_attaque');
		var zone_arrivee = document.createElement('span');
		zone_arrivee.setAttribute('class', 'heure_arrivee');
		cell.appendChild(zone_duree);
		cell.appendChild(zone_arrivee);
		cell = ligne.insertCell(1);
		var lien_joueur = document.createElement('a');
		lien_joueur.href = 'http://' + donnees.serveur + '.fourmizzz.fr/Membre.php?Pseudo=' + donnees.pseudo;
		lien_joueur.setAttribute('target', '_blank');
		lien_joueur.innerHTML = donnees.pseudo;
		cell.appendChild(lien_joueur);
		cell = ligne.insertCell(2);
		var lien_joueur = document.createElement('a');
		lien_joueur.href = 'http://' + donnees.serveur + '.fourmizzz.fr/Membre.php?Pseudo=' + joueur;
		lien_joueur.setAttribute('target', '_blank');
		lien_joueur.innerHTML = joueur;
		cell.appendChild(lien_joueur);
		if(tableau_joueur.dataset.mode_opti != 'impossible') {
			cell = ligne.insertCell(3);
			cell.setAttribute('class', 'menu_modes');
			var ajout = document.createElement('img'),
				zone_liens = document.createElement('div');
			ajout.src = url_zzzelp + '/Images/plus.png';
			zone_liens.setAttribute('class', 'liste_modes');
			for(var p=0; p<manuels.length; p++) {
				var zone_lien = document.createElement('div'),
					choisi = document.createElement('span'),
					contenu = document.createElement('span');
				contenu.innerHTML = manuels[p].nom;
				zone_lien.setAttribute('class', 'ligne_mode');
				zone_lien.dataset.mode = manuels[p].valeur;
				if(p > 0) {
					zone_lien.setAttribute('class', 'ligne_mode');
					zone_lien.onclick = function onclick(event) {Application_choix_ajout_attaque(donnees_joueur.ID, this.dataset.mode); return false }
				}
				else {
					zone_lien.setAttribute('class', 'entete_mode');
				}
				zone_lien.appendChild(contenu);
				zone_lien.appendChild(choisi);
				zone_liens.appendChild(zone_lien);
			}
			cell.appendChild(ajout);
			cell.appendChild(zone_liens);
			cell = ligne.insertCell(4);
			cell.setAttribute('class', 'menu_modes');
			var edit = document.createElement('img'),
				zone_liens = document.createElement('div');
			edit.src = url_zzzelp + '/Images/edit.png';
			zone_liens.setAttribute('class', 'liste_modes');
			for(var p=0; p<modes.length; p++) {
				var zone_lien = document.createElement('div'),
					choisi = document.createElement('span'),
					contenu = document.createElement('span');
				contenu.innerHTML = modes[p].nom;
				zone_lien.dataset.mode = modes[p].valeur;
				if(p > 0) {
					zone_lien.setAttribute('class', 'ligne_mode');
					zone_lien.onclick = function onclick(event) {Nettoyer_tableau(donnees_joueur.ID);Application_choix_mode_joueur(donnees_joueur.ID, this.dataset.mode); return false }
				}
				else {
					zone_lien.setAttribute('class', 'entete_mode');
				}
				zone_lien.appendChild(contenu);
				zone_lien.appendChild(choisi);
				zone_liens.appendChild(zone_lien);
			}
			cell.appendChild(edit);
			cell.appendChild(zone_liens);
		}
		else {
			cell = ligne.insertCell(3);
			cell.setAttribute('colspan', '2');
			var intouchable = document.createElement('span');
			intouchable.innerHTML = 'Joueur HDP';
			intouchable.setAttribute('class', 'joueur_intouchable');
			cell.appendChild(intouchable);	
		}
			
		ligne = tableau_joueur.insertRow(1);
		cell = ligne.insertCell(0);
		cell.innerHTML = 'TDC départ : ';
		cell = ligne.insertCell(1);
		cell.setAttribute('ID', 'TDC_depart_' + donnees_joueur.ID);
		cell.innerHTML = '0';
		cell = ligne.insertCell(2);
		cell.innerHTML = ze_Nombre(donnees_joueur.TDC);
		cell = ligne.insertCell(3);
		cell = ligne.insertCell(4);
	}
	
	function Actualiser_heures_arrivee() {
		var tableaux = document.querySelectorAll('#optimisation_zzzelpfloods');
		for(var l=0; l<tableaux.length; l++) {
			tableaux[l].querySelector('.heure_arrivee').innerHTML = ze_Generation_date_precise((~document.location.href.indexOf('fourmizzz.fr') ? time_fzzz() : time()) + parseInt(tableaux[l].querySelector('#duree_attaque').innerHTML));
		}
		setTimeout(Actualiser_heures_arrivee, 1000);
	}
	
	function Calcul_CF_initiale() {
		var capa_flood = parseInt(donnees.nombre_unites),
			sondes = document.querySelectorAll('#nombre_sonde');
		for(var i=0;i<sondes.length;i++) {
			capa_flood -= parseInt(sondes[i].innerHTML.replace(/ /g, ''));
		}
		if(Placement_antisonde()) {
			console.log(donnees);
			capa_flood -= parseInt(donnees.antisonde[0].valeur);
			capa_flood -= parseInt(donnees.antisonde[1].valeur);
		}
		return capa_flood;
	}
	
	
	
	
	
	/*
	INITIALISATION DES MODES
	* - Reinitialiser_mode_joueur
	* - Initialisation_mode_manuel_joueur
	* - Application_choix_mode_joueur
	*/

	function Reinitialiser_mode_joueur(ID) {
		document.querySelector('.optimisation_' + ID).dataset.mode_opti = 'manuel';
		var lignes = document.querySelectorAll('.optimisation_' + ID + ' tr');
		Nettoyer_tableau(ID);
		Initialisation_mode_manuel_joueur(ID);
		Actualisation_floods(true);
	}
	
	function Application_choix_mode_joueur(ID, valeur) {
		if(valeur == 'inconnu') {
			Nettoyer_tableau(ID);
		}
		document.querySelectorAll('.optimisation_' + ID + ' td')[3].querySelector('img').onclick = function onclick(event) {Ajout_ligne(ID); return false;}
		document.querySelector('.optimisation_' + ID).dataset.mode_opti = valeur;
		Actualisation_floods(true);
	}
	
	function Preparation_TDC_voulu(mode, ID) {
		var tableau = document.querySelector('.optimisation_' + ID),
			ligne = tableau.insertRow(2);
		var cell = ligne.insertCell(0),
			input = document.createElement('input');
		input.type = 'text';
		input.placeholder = 'TDC voulu pour ' + ((mode == 'TDC_attaquant') ? 'l\'attaquant' : 'la cible');
		input.setAttribute('id', 'TDC_voulu');
		input.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this);return false;}
		cell.appendChild(input);
		cell.setAttribute('colspan', '5');
		var validation = document.createElement('img');
		validation.src = url_zzzelp + '/Images/valider.png';
		validation.onclick = function onclick(event) {Validation_TDC_voulu(mode, ID); return false;}
		validation.setAttribute('class', 'preparation_libre');
		cell.appendChild(validation);
	}
	
	function Preparation_serie_attaques(ID) {
		var tableau = document.querySelector('.optimisation_' + ID),
			ligne = tableau.insertRow(-1),
			cell = ligne.insertCell(0),
			nombre = document.createElement('input'),
			texte_1 = document.createElement('span'),
			valeur = document.createElement('input'),
			texte_2 = document.createElement('span'),
			validation = document.createElement('img');
		tableau.dataset.nfloods = parseInt(tableau.dataset.nfloods) + 1;
		ligne.dataset.numero = tableau.dataset.nfloods;
		cell.setAttribute('colspan', '5');
		nombre.type = 'text';
		nombre.setAttribute('class', 'petit_input');
		texte_1.innerHTML = 'attaques de';
		valeur.type = 'text';
		valeur.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this);return false;}
		texte_2.innerHTML = ' unités';
		validation.src = url_zzzelp + '/Images/valider.png';
		validation.onclick = function onclick(event) {Validation_serie_attaques(ID); return false;}
		validation.setAttribute('class', 'preparation_libre');
		cell.appendChild(nombre);
		cell.appendChild(texte_1);
		cell.appendChild(valeur);
		cell.appendChild(texte_2);
		cell.appendChild(validation);
	}
	
	function Validation_TDC_voulu(mode, ID) {
		document.querySelector('.optimisation_' + ID).dataset.mode_opti = mode + '_validation';
		document.querySelector('.optimisation_' + ID).dataset.TDCvoulu = parseInt(document.querySelector('.optimisation_' + ID + ' #TDC_voulu').value.replace(/ /g,""));
		Actualisation_floods(true);
	}
	
	function Validation_serie_attaques(ID) {
		document.querySelector('.optimisation_' + ID).dataset.mode_opti = 'serie_attaques_validation';
		document.querySelector('.optimisation_' + ID).dataset.nombreattaques = parseInt(document.querySelectorAll('.optimisation_' + ID + ' input')[0].value);
		document.querySelector('.optimisation_' + ID).dataset.valeurattaques = parseInt(document.querySelectorAll('.optimisation_' + ID + ' input')[1].value.replace(/ /g, ''));
		Actualisation_floods(true);
	}
	
	
	/* 
	 * FONCTIONS DE CREATION D'UNE LIGNE DE FLOOD
	*/

	function Insertion_optimisation_flood(ID, valeurs) {
		for(var k=0; k<valeurs.floods.length; k++) {
			Creation_ligne_flood(ID, valeurs, k, 0);
		}
	}
	
	function Creation_ligne_flood(ID, valeurs, k) {
		var tableau = document.querySelector('.optimisation_' + ID);
		tableau.dataset.nfloods = parseInt(tableau.dataset.nfloods) + 1;
		if(valeurs.manuel) {
			ligne = tableau.insertRow(valeurs.manuel);
		}
		else {	
			ligne = tableau.insertRow(-1);
		}
		ligne.dataset.numero = tableau.dataset.nfloods;
		ligne.dataset.type = (valeurs.armee_complete == k) ? 'armee_complete' : 'attaque';
		cell = ligne.insertCell(0);
		cell.innerHTML = ze_Nombre(valeurs.floods[k]);
		var i = ligne.dataset.numero;
		for(var t=1;t<ligne.rowIndex;t++) {
			if(tableau.rows[t].className != 'ligne_sonde') {
				ancien_att = parseInt(tableau.rows[t].cells[1].innerHTML.replace(/ /g,"")),
				ancien_def = parseInt(tableau.rows[t].cells[2].innerHTML.replace(/ /g,""));
			}
		}
		if(ancien_att <= 2*ancien_def && ancien_def <= ancien_att*3) {
			valeur_flood = ze_Majoration(valeurs.floods[k], ancien_def*0.2);
			cell = ligne.insertCell(1);
			cell.setAttribute('class', 'TDC_attaquant');
			if(valeur_flood == -2) {
				valeur_flood = ancien_def*0.2;
			}
			cell.innerHTML = ze_Nombre(ancien_att + valeur_flood);
			cell = ligne.insertCell(2);
			cell.innerHTML =  ze_Nombre(ancien_def - valeur_flood);
		}
		else {
			cell = ligne.insertCell(1);
			cell.setAttribute('class', 'TDC_attaquant');
			cell.innerHTML = ze_Nombre(ancien_att);
			cell = ligne.insertCell(2);
			cell.innerHTML =  ze_Nombre(ancien_def);
		}
		cell = ligne.insertCell(3);
		Inserer_lieu(cell, ID, ligne.dataset.numero);
		cell = ligne.insertCell(4);
		Inserer_liens_modifs(cell, ID, ligne.dataset.numero);
	}
	
	function Inserer_lieu(cell, ID, i) {
		var lieu = document.createElement('span');
		lieu.innerHTML = 'TDC';
		lieu.setAttribute('class', 'lieu');
		lieu.onclick = function onclick(event) {Modifier_lieu(ID, i); return false };
		cell.appendChild(lieu);
	}
	
	function Inserer_liens_modifs(cell, ID, i) {
		var liens = [
						{ lien_image : 'suppression.png', action : 'supprimer', title : 'Supprimer la ligne' },
						{ lien_image : 'edit.png', action : 'modifier', title : 'Modifier la ligne' }
					],
			img = document.createElement('img'),
			zone_liens = document.createElement('div');
		cell.setAttribute('class', 'menu_options');
		img.src = url_zzzelp + '/Images/quitter.png';
		zone_liens.setAttribute('class', 'liste_options');
		for(var k=0; k<liens.length; k++) {
			zone_lien = document.createElement('div');
			zone_lien.setAttribute('title', liens[k].title);
			zone_lien.setAttribute('class', 'zone_lien_option');
			zone_lien.dataset.action = liens[k].action;
			img_lien = document.createElement('img');
			img_lien.src = url_zzzelp + '/Images/' + liens[k].lien_image;
			zone_lien.onclick = function onclick(event) { Application_option_ligne(this.dataset.action, ID, i) };
			zone_liens.appendChild(zone_lien);
			zone_lien.appendChild(img_lien);
		}
		cell.appendChild(img);
		cell.appendChild(zone_liens);
	}
	
	
	/*
	 * FONCTIONS AJOUT MANUEL D'UNE LIGNE
	*/	
	function Application_choix_ajout_attaque(ID, valeur) {	
		if(valeur == 'manuel') {
			Insertion_preparation_flood(ID, 0, -1);
		}
		else if(valeur == 'sonde') {
			var lieu = (document.querySelectorAll('.optimisation_' + ID + ' .ligne_sonde').length == 0) ? 1 : 2,
				nombre = ((document.querySelectorAll('.optimisation_' + ID + ' .ligne_sonde').length == 0) ? donnees.sondes[0].valeur : donnees.sondes[1].valeur),
				unite = (document.querySelectorAll('.optimisation_' + ID + ' .ligne_sonde').length == 0) ? donnees.sondes[0].unite : donnees.sondes[1].unite;	
			Insertion_preparation_sonde(ID, lieu, nombre, unite, -1);
		}
	}
	
	function Insertion_preparation_flood(ID, valeur, place) {
		var tableau = document.querySelector('.optimisation_' + ID);
		tableau.dataset.nfloods = parseInt(tableau.dataset.nfloods) + 1;
		tableau.dataset.mode_opti = 'inconnu';
		var ligne = tableau.insertRow(place),
			cell = ligne.insertCell(0);
		ligne.setAttribute('class', 'ligne_preparation');
		ligne.dataset.numero = parseInt(tableau.dataset.nfloods);
		cell.setAttribute('colspan', '3');
		var entree = document.createElement('input');
		entree.type = 'text';
		entree.placeholder = 'entrer la valeur du flood';
		entree.value = (valeur == 0) ? '' : ze_Nombre(valeur);
		cell.appendChild(entree);
		entree.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this); return false;};
		var validation = document.createElement('img');
		validation.src = url_zzzelp + '/Images/valider.png';
		validation.onclick = function onclick(event) {Validation_flood_manuel(ID, ligne.dataset.numero); return false;}
		validation.setAttribute('class', 'preparation_libre');
		document.querySelectorAll('.optimisation_' + ID + ' [data-numero="' + ligne.dataset.numero + '"] td')[0].appendChild(validation);
		cell = ligne.insertCell(1);
		Inserer_lieu(cell, ID, ligne.dataset.numero);
		cell = ligne.insertCell(2);
		Inserer_liens_modifs(cell, ID, ligne.dataset.numero);
	}
	
	function Validation_flood_manuel(ID, n) {
		var valeur = parseInt(document.querySelectorAll('.optimisation_' + ID + ' [data-numero="' + n + '"] input')[0].value.replace(/ /g,"")),
			index = document.querySelector('.optimisation_' + ID + ' [data-numero="' + n + '"]').rowIndex;
		Suppression_flood(ID, n);
		var valeurs = { nombre_unites : donnees.nombre_unites, TDC_attaquant : donnees.coordonnees[0][donnees.pseudo].TDC, TDC_cible : 'inconnu', marge : -1, floods : [valeur], manuel:index};
		Creation_ligne_flood(ID, valeurs, 0);
		Actualisation_floods(true);
	}

	/*
	 * TABLEAUX UNIQUES (RESUME + OPTIONS)
	*/
	
	function Creation_tableau_options() {
		var tableau = document.createElement('table'),
			options = [
						{ titre : 'Stockage sur Zzzelp', ID : 'lancement_zzzelp', auto : donnees.lancement_zzzelp },
						{ titre : 'Replacer l\'antisonde', ID : 'placer_antisonde', auto : donnees.placer_antisonde }
					];
		if(typeof donnees.aide_relance != 'undefined') {
			options.push({ titre : 'Prévenir du retour', ID : 'aide_relance', auto : donnees.aide_relance, valeur : donnees.valeur_aide_relance });
		}
		if(typeof donnees.anti_synchro != 'undefined') {
			options.push({ titre : 'Lancer en fin de minute', ID : 'anti_synchro', auto : donnees.anti_synchro, valeur : donnees.seconde_renvoi });			
		}
		tableau.setAttribute('id', 'tableau_option');
		document.querySelector('.zone_zzzelpfloods').appendChild(tableau);
		var ligne = tableau.insertRow(0),
			cell = ligne.insertCell(0),
			lien = document.createElement('a');
		cell.onclick = function onclick(event) {Affichage_options(); return false };
		cell.setAttribute('colspan', '2');
		lien.innerHTML = 'Options du module';
		cell.appendChild(lien);
		for(var i=0; i<options.length; i++) {
			var ligne = tableau.insertRow(-1);
			ligne.setAttribute('style', 'display:none');
			ligne.insertCell(0).innerHTML = options[i].titre;
			var cell = ligne.insertCell(1),
				choix = document.createElement('input');
			choix.type = 'checkbox';
			choix.setAttribute('id', options[i].ID);
			choix.checked = options[i].auto;
			choix.onchange = function onchange(event) { Actualisation_floods(true); return false; }
			cell.appendChild(choix);
			if(options[i].ID == 'anti_synchro') {
				var ligne = tableau.insertRow(-1),
					cell = ligne.insertCell(0);
					choix = document.createElement('select');
				ligne.setAttribute('style', 'display:none');
				cell.setAttribute('colspan', '2');
				choix.disabled = !options[i].auto;
				choix.id = 'seconde_anti_synchro';
				for(var j=55;j<61;j++) {
					var option = document.createElement('option');
					option.value = j%60;
					option.innerHTML = j + 'ème seconde'
					choix.appendChild(option);
				}
				cell.appendChild(choix);
				choix.value = options[i].valeur;
				choix.onchange = function onchange(event) { Actualisation_floods(true); return false; }
			}
			else if(options[i].ID == 'aide_relance') {
				var ligne = tableau.insertRow(-1),
					cell = ligne.insertCell(0);
					choix = document.createElement('select'),
					possibilites = new Array('Toutes les attaques', 'L\'attaque principale');
				ligne.setAttribute('style', 'display:none');
				cell.setAttribute('colspan', '2');
				choix.disabled = !options[i].auto;
				choix.id = 'choix_aide_relance';
				for(var j=0; j<possibilites.length; j++) {
					var option = document.createElement('option');
					option.value = j+1;
					option.innerHTML = possibilites[j];
					choix.appendChild(option);
				}
				cell.appendChild(choix);
				choix.value = options[i].valeur;
				choix.onchange = function onchange(event) { Actualisation_floods(true); return false; }
			}
		}
	}
	
	function Affichage_options() {
		var mode = (document.querySelectorAll('#tableau_option tr')[1].style.display == 'none') ? '' : 'none',
			lignes = document.querySelectorAll('#tableau_option tr');
		for(var i=1; i<lignes.length; i++) {
			lignes[i].style.display = mode;
		}
	}
	
	function Creation_tableau_resume() {
		var tableau = document.createElement('table'),
			ligne = tableau.insertRow(0);
		ligne.insertCell(0).innerHTML = 'TDC floodé :';
		ligne.insertCell(1).innerHTML = '0' 
		var ligne = tableau.insertRow(1);
		ligne.insertCell(0).innerHTML = 'Nombre de floods : ';
		ligne.insertCell(1).innerHTML = '0' 
		var ligne = tableau.insertRow(2);
		ligne.insertCell(0).innerHTML = 'Nombre de sondes : ';
		ligne.insertCell(1).innerHTML = '0' 
		tableau.setAttribute('id', 'resume_floods');
		document.querySelector('.zone_zzzelpfloods').appendChild(tableau);
	}
	
	function Actualisation_tableau_resume() {
		if(document.querySelector('#resume_floods')) {
			var lignes = document.querySelectorAll('#resume_floods tr');
			if(document.querySelectorAll('.TDC_attaquant').length > 0) {
				lignes[0].cells[1].innerHTML = ze_Nombre(parseInt(document.querySelectorAll('.TDC_attaquant')[document.querySelectorAll('.TDC_attaquant').length - 1].innerHTML.replace(/ /g,"")) - parseInt(document.querySelectorAll('td[id*="TDC_depart"]')[0].innerHTML.replace(/ /g,"")));
			}
			else {
				lignes[0].cells[1].innerHTML = 0;
			}
			lignes[1].cells[1].innerHTML = document.querySelectorAll('.TDC_attaquant').length;
			lignes[2].cells[1].innerHTML = document.querySelectorAll('.ligne_sonde').length;
		}
	}

	function Modifier_lieu(ID, i) {
		var lieu = document.querySelector('.optimisation_' + ID + ' [data-numero="' + i + '"] .lieu').innerHTML;
		document.querySelector('.optimisation_' + ID + ' [data-numero="' + i + '"] .lieu').innerHTML = (lieux.indexOf(lieu) == 2) ? 'TDC' : lieux[lieux.indexOf(lieu) + 1];
	}
	
	function Application_option_ligne(action, ID, n) {
		if(action == 'supprimer') {
			Suppression_flood(ID, n);
		}
		else if(action == 'modifier') {
			var ligne = document.querySelector('.optimisation_' + ID + ' [data-numero="' + n + '"]'),
				classe = ligne.className;
			document.querySelector('.optimisation_' + ID).dataset.mode_opti = 'inconnu';
			ligne.setAttribute('class', 'ligne_preparation');
			if(classe == 'ligne_sonde') {
				var nombre = parseInt(ligne.querySelector('#nombre_sonde').innerHTML.replace(/ /g, '')),
					unite = ZzzelpScriptArmee.TAGs.indexOf(ligne.querySelector('#unite_sonde').innerHTML),
					lieu = lieux.indexOf(ligne.querySelector('.lieu').innerHTML),
					place = ligne.rowIndex;
				ze_Supprimer_element(ligne);
				Insertion_preparation_sonde(ID, lieu, nombre, unite, place);
			}
			else {
				var valeur = ligne.querySelector('td').innerHTML.replace(/ /g, ''),
					place = ligne.rowIndex;
				ze_Supprimer_element(ligne);
				Insertion_preparation_flood(ID, valeur, place);
			}
		}
		Actualisation_floods();
	}
	
	function Suppression_flood(ID, n) {
		ze_Supprimer_element(document.querySelector('.optimisation_' + ID + ' [data-numero="' + n + '"]'));
		document.querySelector('.optimisation_' + ID).dataset.mode_opti = 'inconnu';
		Actualisation_floods(true);
	}
	
	function Nettoyer_tableau(ID) {
		var lignes = document.querySelectorAll('.optimisation_' + ID + ' tr');
		for(var i=2;i<lignes.length;i++) {
			lignes[i].parentNode.removeChild(lignes[i]);
		}
	}
	
	function Lancement_via_Zzzelp() {
		return document.querySelector('#lancement_zzzelp') && document.querySelector('#lancement_zzzelp').checked;
	}
	
	function Placement_antisonde() {
		return document.querySelector('#placer_antisonde') && document.querySelector('#placer_antisonde').checked;
	}
	
	function Aide_relance() {
		return document.querySelector('#aide_relance') && document.querySelector('#aide_relance').checked;
	}
	
	function Valeur_aide_relance() {
		return document.querySelector('#choix_aide_relance') ? parseInt(document.querySelector('#choix_aide_relance').value) : 1;
	}
	
	function Anti_synchronisation() {
		return document.querySelector('#anti_synchro') && document.querySelector('#anti_synchro').checked;
	}
	
	function Valeur_anti_synchronisation() {
		return document.querySelector('#seconde_anti_synchro') ? parseInt(document.querySelector('#seconde_anti_synchro').value) : 58;
	}
	
	/*
	 * GESTION DES SONDES
	*/
	
	function Insertion_preparation_sonde(ID, lieu, nombre, unite, place) {
		var tableau = document.querySelector('.optimisation_' + ID);
		tableau.dataset.nfloods = parseInt(tableau.dataset.nfloods) + 1;
		tableau.dataset.mode_opti = 'inconnu';
		var ligne = tableau.insertRow(place),
			cell = ligne.insertCell(0);
		ligne.setAttribute('class', 'ligne_preparation');
		ligne.dataset.numero = parseInt(tableau.dataset.nfloods);
		var	input = document.createElement('input');
		ligne.setAttribute('class', 'ligne_preparation');
		cell.setAttribute('colspan', '3');
		input.type = 'text';
		input.onkeyup = function onkeyup(event) {ze_Ajout_espaces(this);return false;}
		input.value = ze_Nombre(nombre);
		ligne.cells[0].appendChild(input);
		var choix = document.createElement('select');
		ligne.cells[0].appendChild(choix);
		for(var i=0;i<ZzzelpScriptArmee.TAGs.length;i++) {
			var option = document.createElement('option');
			option.value = i;
			option.innerHTML = ZzzelpScriptArmee.TAGs[i];
			choix.appendChild(option);
		}
		var validation = document.createElement('img');
		validation.src = url_zzzelp + '/Images/valider.png';
		cell = ligne.insertCell(1);
		Inserer_lieu(cell, ID, ligne.dataset.numero);
		cell = ligne.insertCell(2);
		Inserer_liens_modifs(cell, ID, ligne.dataset.numero);		
		ligne.querySelector('.lieu').innerHTML = lieux[lieu];
		validation.onclick = function onclick(event) {Validation_sonde_manuelle(ID, parseInt(ligne.dataset.numero), lieux.indexOf(ligne.querySelector('.lieu').innerHTML), choix.value, parseInt(input.value.replace(/ /g, '')), true); return false;}
		validation.setAttribute('class', 'preparation_libre');
		ligne.cells[0].appendChild(validation);
		choix.value = unite;
	}
	
	function Validation_sonde_manuelle(ID, n, lieu, unite, nombre, nettoyage) {
		if(!nettoyage) {
			var tableau = document.querySelector('.optimisation_' + ID);
			tableau.dataset.nfloods = parseInt(tableau.dataset.nfloods) + 1;
			var ligne = tableau.insertRow(-1);
			ligne.dataset.numero = tableau.dataset.nfloods;
			var	cell = ligne.insertCell(0);
			cell.setAttribute('colspan', '3');
			cell = ligne.insertCell(1);
			Inserer_lieu(cell, ID, ligne.dataset.numero);
			cell = ligne.insertCell(2);
			Inserer_liens_modifs(cell, ID, ligne.dataset.numero);
			var n = parseInt(ligne.dataset.numero);
		}
		document.querySelector('.optimisation_' + ID + ' [data-numero="' + n + '"]').setAttribute('class', 'ligne_sonde');
		var cell = document.querySelectorAll('.optimisation_' + ID + ' [data-numero="' + n + '"] td')[0],
			valeur = document.createElement('span');
		if(nettoyage) {
			ze_Supprimer_element(cell.querySelector('img'));
			ze_Supprimer_element(cell.querySelector('select'));
			ze_Supprimer_element(cell.querySelector('input'));
		}
		cell.innerHTML = 'Sonde de ';
		valeur.innerHTML = ze_Nombre(nombre) + ' ';
		valeur.setAttribute('id', 'nombre_sonde');
		cell.appendChild(valeur);
		var nom_unite = document.createElement('span');
		nom_unite.innerHTML = ZzzelpScriptArmee.TAGs[unite]
		nom_unite.setAttribute('id', 'unite_sonde');
		cell.appendChild(nom_unite);
		document.querySelectorAll('.optimisation_' + ID + ' [data-numero="' + n + '"] td')[1].querySelector('.lieu').innerHTML = lieux[lieu];
		
	}
	
	/*
	 * LANCEMENT DES FLOODS
	*/
	
	function Lancer_floods() {
		var URL = '[',
			vide = true;
			
		for(var t=0; t<pseudos.length; t++) { //Encodage des attaques
			if(pseudos[t] != donnees.pseudo && document.querySelectorAll('.optimisation_' + donnees.coordonnees[0][pseudos[t]].ID + ' tr').length > 2) {
				var URL_2 = '';
				var lignes = document.querySelectorAll('.optimisation_' + donnees.coordonnees[0][pseudos[t]].ID + ' tr');
				for(var i=2; i<lignes.length; i++) {
					if(lignes[i].className == 'ligne_sonde') {
						vide = false;
						var nombre = ze_Base_10_36(parseInt(lignes[i].querySelector('#nombre_sonde').innerHTML.replace(/ /g, ''))),
							unite = ze_Base_10_36(ZzzelpScriptArmee.TAGs.indexOf(lignes[i].querySelector('#unite_sonde').innerHTML)),
							lieu = parseInt(lieux.indexOf(lignes[i].querySelector('.lieu').innerHTML)) + 1;
						URL_2 += ((URL_2 == '')? '' : ';') + '1' + nombre + ',' + unite + ',' + lieu;
					}
					else if(lignes[i].dataset.type != 'hors_opti') {
						vide = false;
						var valeur = ((lignes[i].dataset.type  == 'armee_complete') ? '-1' : ze_Base_10_36(lignes[i].querySelector('td').innerHTML.replace(/ /g, ''))),
							lieu = parseInt(lieux.indexOf(lignes[i].querySelector('.lieu').innerHTML)) + 1;
						URL_2 += ((URL_2 == '')? '' : ';') + '0' + valeur + ',' + lieu;
					}
				}
				URL += (URL_2 != '') ? (((URL == '[') ? '' : ':') + URL_2 + ';' + ze_Base_10_36(donnees.coordonnees[0][pseudos[t]].ID) + ';' + ze_Base_10_36(donnees.coordonnees[0][pseudos[t]].temps) + ';' + pseudos[t]) : '';
			}
		}
		URL += ']&s=' + donnees.serveur;
		if(Placement_antisonde()) {
			URL += '&as=[' + ze_Base_10_36(donnees.antisonde[0].unite) + ',' + ze_Base_10_36(donnees.antisonde[0].valeur) + ',' + ze_Base_10_36(donnees.antisonde[1].unite) + ',' + ze_Base_10_36(donnees.antisonde[1].valeur) + ']';
		}
		if(Anti_synchronisation()) {
			var seconde_att = Valeur_anti_synchronisation()*1000,
				seconde_duree = parseInt(((1-Math.exp(-donnees.coordonnees[0][pseudos[1]].distance/350))*7.375*Math.pow(0.9,donnees.vitesse_attaque))*86400000)%60000;
			URL += '&sec=' + ((seconde_att + 60000 - seconde_duree)%60000);
		}
		URL = 'http://' + donnees.serveur + '.fourmizzz.fr/Armee.php?fl=' + URL;
		if(donnees.token && donnees.token.length > 0) {
			URL += '&token=' + donnees.token;
		}
		if(Aide_relance()) {
			URL += '&relance=' + Valeur_aide_relance();
		}
		if(Lancement_via_Zzzelp()) {
			URL += '&lz';
		}
		else {
			URL += '&lf';
		}
		if(vide) {
			alert('Aucune attaque à envoyer');
		}
		else {
			if(donnees.stockage_parametres_zzzelp) {
				Stockage_parametres_Zzzelp(URL, 1);
			}
			else {
				document.location.href = URL;
			}
		}
	}
	
	function Stockage_parametres_Zzzelp(URL, mode) {
		var parametres = new Array(
							Lancement_via_Zzzelp() ? 1 : 0,
							Placement_antisonde() ? 1 : 0
		);
		if(typeof donnees.aide_relance != 'undefined') {
			parametres.push(Aide_relance() ? 1 : 0);
			parametres.push(Valeur_aide_relance());
		}
		else {
			parametres.push(0);
			parametres.push(0);			
		}
		if(typeof donnees.anti_synchro != 'undefined') {
			parametres.push(Anti_synchronisation() ? 1 : 0);
			parametres.push(Valeur_anti_synchronisation());	
		}
		else {
			parametres.push(0);
			parametres.push(0);				
		}
		var niveaux = '';
		for(var i=0; i<parametres.length; i++) {
			niveaux += ((niveaux == '') ? '' : ',') + parametres[i];
		}
		new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'niveaux_script?lieu=zzzelpfloods&niveaux=[' + niveaux + ']&', force : mode },
			{ success : function(valeurs) {
				document.location.href = URL;
			}, authentication_issue : function() {
				Stockage_parametres_Zzzelp(URL, 2);
			}
		});
	}
	
	/*
	 * OPTIMISATION AUTOMATIQUE
	*/
	function Calcul_flood(valeurs, flood) {
		if(flood == -2) {
			valeurs.armee_complete = valeurs['floods'].length;
			flood = Math.floor(valeurs.TDC_cible * 0.2);
		}
		valeurs.TDC_cible -= flood
		valeurs.TDC_attaquant += flood;
		valeurs.nombre_unites -= flood;
		valeurs.marge -= flood;
		valeurs['floods'].push(flood);
		return valeurs;
	}
	
	function Optimisation_flood(valeurs) {
		var valeurs_2 = JSON.parse(JSON.stringify(valeurs));
		valeurs_2.marge = -1;
		if(valeurs.TDC_attaquant <= 2*valeurs.TDC_cible && valeurs.TDC_cible <= valeurs.TDC_attaquant*3) {
			if (valeurs.marge == -1) {
				while (valeurs.TDC_attaquant < Math.floor(valeurs.TDC_cible*1.4) && valeurs.nombre_unites >= valeurs.TDC_cible*0.2) {
					(valeurs.floods.length == 0 && valeurs.armee_debut) ? (valeurs = Calcul_flood(valeurs, -2)) : (valeurs = Calcul_flood(valeurs, Math.floor(valeurs.TDC_cible * 0.2)));
				}
				valeurs.marge = Math.floor((valeurs.TDC_cible*2 - valeurs.TDC_attaquant)/3);
				if (valeurs.nombre_unites >= valeurs.marge) {
					if(valeurs.floods.length == 0 && valeurs.armee_debut) {
						valeurs = Calcul_flood(valeurs, -2);
					}
					else {
						valeurs = Calcul_flood(valeurs, valeurs.marge);
						if(valeurs.armee_fin) {
							valeurs = Calcul_flood(valeurs, -2);
						}
						else if (valeurs.nombre_unites >= valeurs.TDC_cible*0.2) {
							valeurs = Calcul_flood(valeurs, Math.floor(valeurs.TDC_cible * 0.2));
						}
						else {
							valeurs = Calcul_flood(valeurs, valeurs.nombre_unites);
						}
					}
				}
				else if (valeurs.nombre_unites > 0) {
					valeurs = Calcul_flood(valeurs, valeurs.nombre_unites);
				}
			}
			else if (valeurs.marge > 0) {
				while (valeurs.marge > valeurs.TDC_cible*0.2 && valeurs.TDC_attaquant < Math.floor(valeurs.TDC_cible*1.4) && valeurs.nombre_unites >= valeurs.TDC_cible*0.2) {
					valeurs = Calcul_flood(valeurs, Math.floor(valeurs.TDC_cible * 0.2));
				}
				if (valeurs.marge > valeurs.TDC_cible*0.36) {
					return Optimisation_flood(valeurs_2)
				}
				else if (valeurs.marge <= valeurs.TDC_cible*0.2 && valeurs.nombre_unites >= valeurs.marge) {
					valeurs = Calcul_flood(valeurs, valeurs.marge);
				}
				else if (valeurs.marge > valeurs.TDC_cible*0.2 && valeurs.nombre_unites >= valeurs.marge) {
					marge_2 = Math.floor((valeurs.TDC_cible*2-valeurs.TDC_attaquant)/3);
					valeurs = Calcul_flood(valeurs, marge_2);
					valeurs = Calcul_flood(valeurs, valeurs.marge);
				}
				else if (capa_flood > 0) {
					valeurs = Calcul_flood(valeurs, valeurs.nombre_unites);
				}
			}
		}
		return valeurs;
	}
}




/*
 * Exécutée sur la page Armee de Fourmizzz pour répartir les unités entre les différents floods
 * Génère ensuite les URL pour chaque attaque et exécute la 1ère attaque
*/


function LancementZzzelpflood(valeurs) {
	if(!valeurs) {
		valeurs = Analyse_URL();
	};
	
	valeurs.armee = ZzzelpScriptArmee.getArmee(document, 0).unites;
	valeurs = Calcul_armee_dispo(valeurs);
	valeurs = Calcul_unites_sondes(valeurs);
	valeurs = Calcul_unites_floods(valeurs);
	console.log(valeurs);
	Envoi_attaques(valeurs);
	
	function Analyse_URL() {
		localStorage['zzzelp_aide_relance_' + ze_serveur] = JSON.stringify(new Array());
		var lancements = ze_Analyser_URL('fl'),
			valeurs = {schemas : new Array(), interface : true};
		lancements = lancements.substr(1, lancements.length - 2).split(':');
		for(var i=0; i<lancements.length; i++) {
			var floods = lancements[i].split(';'),
				ID = ze_Base_36_10(floods[floods.length - 3]),
				temps = ze_Base_36_10(floods[floods.length - 2]),
				pseudo = floods[floods.length - 1];
			for(var n=0; n<floods.length - 3; n++) {
				var flood = floods[n].substr(1, floods[n].length - 1).split(',');
				if(floods[n].substr(0,1) == 0) { // On a un flood
					valeurs.schemas.push({mode : 'flood', valeur : (flood[0] == '-1') ? -1 : ze_Base_36_10(flood[0]), lieu : flood[1], ID : ID, pseudo : pseudo, duree : temps});
				}
				else { // On a une sonde
					valeurs.schemas.push({mode : 'sonde', nombre : ze_Base_36_10(flood[0]), lieu : flood[2], unite : ze_Base_36_10(flood[1]), ID : ID, pseudo : pseudo, duree : temps });
				}
			}
		}
		if(ze_Analyser_URL('sec')) {
			valeurs.seconde = parseInt(ze_Analyser_URL('sec'));
		}
		else {
			valeurs.seconde = -1;
		}
		if(ze_Analyser_URL('relance')) {
			valeurs.relance = parseInt(ze_Analyser_URL('relance'));
		}
		else {
			valeurs.relance = -1;
		}
		return valeurs;
	}
	
	function Calcul_armee_dispo(valeurs) {
		valeurs.armee_floods = valeurs.armee;
		valeurs.antisonde = new Array();
		valeurs.etape_antisonde = 0;
		if(ze_Analyser_URL('as')) {
			var antisonde = ze_Analyser_URL('as').substr(1, ze_Analyser_URL('as').length - 2).split(',');
			for(var i=0; i<2; i++) {
				var unite = ze_Base_36_10(antisonde[2*i]),
					nombre = ze_Base_36_10(antisonde[2*i+1]);
				valeurs.antisonde.push(new Array(unite, ze_Majoration(nombre, valeurs.armee_floods[unite])));
				valeurs.armee_floods[unite] -= (valeurs.armee_floods[unite] > nombre) ? nombre : valeurs.armee_floods[unite];
			}
		}
		return valeurs;
	}
	
	function Calcul_unites_sondes(valeurs) {
		for(var i=0; i<valeurs.schemas.length; i++) {
			if(valeurs.schemas[i].mode == 'sonde') {
				var unites_sonde = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
					manquantes = valeurs.schemas[i].nombre;
				for(var n=valeurs.schemas[i].unite; n<valeurs.schemas[i].unite + 14; n++) {
					if(valeurs.armee_floods[n%14] > manquantes) {
						unites_sonde[n%14] = manquantes;
					}
					else {
						unites_sonde[n%14] = valeurs.armee_floods[n%14];
					}
					manquantes -= unites_sonde[n%14];
					valeurs.armee_floods[n%14] -= unites_sonde[n%14];
				}
				valeurs.schemas[i].unites = unites_sonde;
			}
		}
		return valeurs;
	}
	
	function Calcul_unites_floods(valeurs) {
		var aide_relance = new Array(),
			pseudos_pris = new Array();
		for(var i=0; i<valeurs.schemas.length; i++) {
			if(valeurs.schemas[i].mode == 'flood') {
				if(valeurs.relance == 2 && (aide_relance.length == 0 || valeurs.schemas[i].valeur > valeurs.schemas[aide_relance[0]].valeur)) {
					aide_relance[0] = i;
				}
				else if(valeurs.relance == 1 && !in_array(valeurs.schemas[i].pseudo, pseudos_pris)) {
					aide_relance.push(i);
					pseudos_pris.push(valeurs.schemas[i].pseudo);
				}
				 if(valeurs.schemas[i].valeur >= 0) {
					var unites_flood = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0),
						manquantes = valeurs.schemas[i].valeur;
					for(var n=0; n<14; n++) {
						if(valeurs.armee_floods[n] > manquantes) {
							unites_flood[n] = manquantes;
						}
						else {
							unites_flood[n] = valeurs.armee_floods[n];
						}
						manquantes -= unites_flood[n];
						valeurs.armee_floods[n] -= unites_flood[n];
					}
					valeurs.schemas[i].unites = unites_flood;	
				}
			}
		}
		for(var i=0; i<valeurs.schemas.length; i++) {
			if(valeurs.schemas[i].mode == 'flood' && valeurs.schemas[i].valeur == -1) {
				valeurs.schemas[i].unites = valeurs.armee_floods;	
				valeurs.armee_floods = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);			
			}
		}
		for(var i=0; i<valeurs.schemas.length; i++) {
			valeurs.schemas[i].aide_relance = in_array(i, aide_relance);
		}
		return valeurs;
	}
	
	function Stockage_liens(valeurs) {
		var liens = new Array();
		for(var i=0; i<valeurs.schemas.length; i++) {		
			liens.push('/ennemie.php?unites=[' + (valeurs.schemas[i].unites) + ']&lieu=' + valeurs.schemas[i].lieu + '&Attaquer=' + valeurs.schemas[i].ID + '&mode=' + valeurs.schemas[i].mode + '&lieu=' + (parseInt(valeurs.schemas[i].lieu)+1) + '&s=' + ze_Analyser_URL('s') + '&n=' + (i+1) + '&z=' + (document.location.href.substr(-3, 3) == '&lz') + ((i == valeurs.schemas.length - 1 && valeurs.antisonde.length > 0) ? '&as=[' + valeurs.antisonde[0][0] + ',' + valeurs.antisonde[0][1] + ',' + valeurs.antisonde[1][0] + ',' + valeurs.antisonde[1][1] + ']': ''));
		}
		for(var i=0; i<valeurs.antisonde.length; i++) {
			if(i ==0) {
				liens.push('/Armee.php?dlz=true&paz');
			}
			if(valeurs.antisonde[i][1] > 0) {
				liens.push('/Armee.php?antisonde=[' + i + ',' + valeurs.antisonde[i][0] + ',' + valeurs.antisonde[i][1] + ']&paz');
			}
		}
		localStorage['attaques_zzzelpfloods_' + ze_Analyser_URL('s')] = JSON.stringify(liens);
		localStorage['index_attaque_zzzelp'] = 1;
		document.location.href = 'http://' + ze_Analyser_URL('s') + '.fourmizzz.fr' + liens[0];
	}
	
	function Generation_tableau_attaques(valeurs) {
		var titre = document.createElement('h1');
		titre.innerHTML = 'Aperçu des attaques';
		titre.setAttribute('style', 'text-align:center');
		document.querySelector('body').appendChild(titre);
		
		var tableau = document.createElement('table'),
			ligne = tableau.insertRow(0);
		tableau.setAttribute('style', 'margin: 50px auto;border-collapse: collapse;background:white');
		var cell = ligne.insertCell(0);
		cell.setAttribute('style', 'width : 100px');
		for(var i=0; i<14; i++) {
			var cell = ligne.insertCell(i+1);
			cell.innerHTML = ZzzelpScriptArmee.TAGs[i];
			cell.setAttribute('style', 'width : 100px');
		}
		for(var i=0; i<valeurs.schemas.length; i++) {
			var ligne = tableau.insertRow(i+1);
			var cell = ligne.insertCell(0);
			cell.setAttribute('style', 'height:2em');
			cell.innerHTML = 'Attaque ' + i;
			for(var n=0; n<14; n++) {
				ligne.insertCell(n+1).innerHTML = valeurs.schemas[i].unites[n];
			}
		}
		var ligne = tableau.insertRow(-1);
		ligne.insertCell(0).innerHTML = 'Reste';
		for(var i=0; i<14; i++) {
			ligne.insertCell(i+1).innerHTML = valeurs.armee_floods[i];
		}
		document.querySelector('body').appendChild(tableau);
	}

	function Envoi_attaques(valeurs) {
		ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : 'ennemie.php?Attaquer=' + valeurs.schemas[0].ID + '&lieu=0' },
			{ success : function(contenu) {
				var tokens = new Array(new RegExp('<input type="hidden" name="t" id="t" value="(.*)"/>').exec(contenu)[1], document.querySelector('#t').value),
					zone = document.createElement('div'),
					tableau = document.createElement('table'),
					ligne = tableau.insertRow(0);
					stockage_zzzelp = (document.location.href.substr(-3, 3) == '&lz');
				var sdam_zone = document.querySelector('#sd_showhidecopy');
				if(sdam_zone) {
					ze_Supprimer_element(sdam_zone);
					ze_Supprimer_element(document.querySelector('#sd_tablecopy'));
					ze_Supprimer_element(document.querySelector('#Sdversion'));
				}
				
				ze_Supprimer_element(document.querySelector('.pas_sur_telephone'));
				ze_Supprimer_element(document.querySelector('.simulateur'));
				ze_Supprimer_element(document.querySelector('.simulateur'));
				
				zone.setAttribute('class', 'zone_zzzelpfloods');
				zone.setAttribute('id', 'theme_fourmizzz');
				tableau.setAttribute('id', 'lancement_zzzelp');
				tableau.setAttribute('class', 'tableau_recap');
				tableau.dataset.lancement_fini = 0;
				ligne.insertCell(0).innerHTML = 'Cible';
				ligne.insertCell(1).innerHTML = 'Type';
				ligne.insertCell(2).innerHTML = 'Unités';
				ligne.insertCell(3).innerHTML = 'Envoyé';
				ligne.insertCell(4).innerHTML = 'Stocké';
				for(var i=0; i<valeurs.schemas.length; i++) {
					var ligne = tableau.insertRow(-1),
						cell = ligne.insertCell(0),
						cell2 = ligne.insertCell(1),
						cell3 = ligne.insertCell(2),
						cell4 = ligne.insertCell(3),
						cell5 = ligne.insertCell(4);
					cell.setAttribute('style', 'font-weight:bold;');
					cell.innerHTML = ze_Lien_profil(valeurs.schemas[i].pseudo) + ' :';
					cell2.innerHTML = (valeurs.schemas[i].mode == 'flood') ? 'Flood' : 'Sonde';
					
					var entete = document.createElement('div'),
						zone_unites = document.createElement('div'),
						img = document.createElement('img');
					entete.innerHTML = ze_Nombre(array_sum(valeurs.schemas[i].unites));
					entete.setAttribute('class', 'entete_liste_unites');
					img.src = url_zzzelp + '/Images/fourmis.png';
					cell3.setAttribute('class', 'menu_unites');
					zone_unites.setAttribute('class', 'liste_unites');
					var unite = document.createElement('div'),
						nombre = document.createElement('span'),
						tag = document.createElement('span');			
					unite.setAttribute('class', 'ligne_unite');
					nombre.innerHTML = ze_Nombre(array_sum(valeurs.schemas[i].unites));
					tag.innerHTML = 'unités'
					zone_unites.appendChild(unite);
					unite.appendChild(nombre);
					unite.appendChild(tag);
					for(var k=0; k<14; k++) {
						var unite = document.createElement('div'),
							nombre = document.createElement('span'),
							tag = document.createElement('span');			
						unite.setAttribute('class', 'ligne_unite');
						nombre.innerHTML = ze_Nombre(valeurs.schemas[i].unites[k]);
						tag.innerHTML = ZzzelpScriptArmee.TAGs[k];
						zone_unites.appendChild(unite);
						unite.appendChild(nombre);
						unite.appendChild(tag);
					}
					cell3.appendChild(entete);
					entete.appendChild(img);
					cell3.appendChild(zone_unites);				
					
					
					cell4.setAttribute('style', 'color:red;');
					cell5.setAttribute('style', ((stockage_zzzelp && valeurs.schemas[i].mode == 'flood') ? 'color:red;' : ''));
					cell4.innerHTML = 'NON';
					cell5.innerHTML = (stockage_zzzelp && valeurs.schemas[i].mode == 'flood') ? 'NON' : '-';	
				}
				if(valeurs.antisonde.length > 0) {
					var ligne = tableau.insertRow(-1),
						cell = ligne.insertCell(0);
					cell.setAttribute('colspan', '5');
					cell.innerHTML = 'Antisonde non placée';
					cell.setAttribute('style', 'color:red;font-weight:bold;text-align:center');
					cell.id = 'placement_antisonde';
				}
				if(valeurs.seconde > -1) {
					var ligne = tableau.insertRow(-1),
						cell = ligne.insertCell(0);
					cell.setAttribute('colspan', '5');
					cell.innerHTML = '<span id="attente_lancement_zzzelp"></span> secondes avant le lancement';
					cell.setAttribute('style', 'font-weight:bold;text-align:center');
				}
				zone.appendChild(tableau);
				document.querySelector('center').insertBefore(zone, document.querySelector('center br'));
				Lancement_floods(valeurs, tokens, 1);
			}
		});
	}

	function Lancement_floods(valeurs, tokens, n) {
		if(valeurs.schemas.length > 0) {
			if(valeurs.seconde == -1 || parseInt(valeurs.seconde/1000) == (new Date(time_fzzz()*1000)).getSeconds() || n > 1) {
				if(valeurs.seconde > -1 && n == 1) {
					ze_Supprimer_element(document.querySelector('#attente_lancement_zzzelp').parentNode.parentNode)
				}
				var flood = valeurs.schemas[0];
				valeurs.schemas.shift();
				if(flood.aide_relance) {
					var stockages = JSON.parse(localStorage['zzzelp_aide_relance_' + ze_serveur]);
					stockages.push({ pseudo : flood.pseudo, retour : time_fzzz() + flood.duree, id : +new Date() });
					localStorage['zzzelp_aide_relance_' + ze_serveur] = JSON.stringify(stockages);
				}
				var url_ajax = 'ennemie.php?Attaquer=' + flood.ID + '&lieu=' + flood.lieu,
					texte = '';
				for(var k=0; k<14; k++) {
					if(flood.unites[k] != 0) {
						texte += ((texte != '')? '&' : '') + 'unite' + ZzzelpScriptArmee.ID[k] + '=' + flood.unites[k];
					}
				}
				texte += '&lieu=' + flood.lieu + '&ChoixArmee=1&t=' + tokens[0];
				new ZzzelpScriptAjax({ method : 'POST', domain : 'fourmizzz', url : url_ajax, data : texte, contentType : "application/x-www-form-urlencoded"},
					{ success : function(txt) {
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
						document.querySelector('center').innerHTML += '- Vous allez attaquer <span class="gras"><a href="Membre.php?Pseudo=' + dernier.pseudo + '">' + dernier.pseudo + '</a>(<a href="classementAlliance.php?alliance=' + dernier.alliance + '">' + dernier.alliance + '</a>)</span> dans <span class="gras" id="attaque_' + dernier.ID + '">' + dernier.heure + '</span> - <a href="/Armee.php?annuler=' + dernier.ID + '">Annuler</a>';
						var script = document.createElement('script');
						script.setAttribute('language', 'JavaScript');
						script.innerHTML = 'reste(' + dernier.retour + ', "attaque_' + dernier.ID + '");';
						document.querySelector('center').appendChild(script);
						document.querySelector('center').appendChild(document.createElement('br'));
						document.querySelector('#lancement_zzzelp').rows[n].cells[3].style.color = 'green';
						document.querySelector('#lancement_zzzelp').rows[n].cells[3].innerHTML = 'OUI';
						Stockage_flood_Zzzelp(valeurs, flood, tokens, n, 1);
					}
				});
			}
			else {
				setTimeout(function() {Lancement_floods(valeurs, tokens, n)},1);
				document.querySelector('#attente_lancement_zzzelp').innerHTML = parseInt((valeurs.seconde/1000 - (new Date(time_fzzz()*1000)).getSeconds() + 60)%60)
			}
		}
		else if(valeurs.antisonde.length > 0) {
			Placement_antisonde_Ajax(valeurs.antisonde, tokens[1], 1);
		}
		else {
			document.querySelector('#lancement_zzzelp').dataset.lancement_fini = 1;
		}
	}
	
	function Stockage_flood_Zzzelp(donnees, flood, tokens, n, mode) {
		if(document.location.href.substr(-3, 3) == '&lz' && document.querySelector('#lancement_zzzelp').rows[n].cells[1].innerHTML == 'Flood') {
			new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'floods_script?unites=[' + flood.unites + ']&cible=' + flood.ID + '&', force : mode },
				{ success : function(valeurs) {
					document.querySelector('#lancement_zzzelp').rows[n].cells[4].style.color = 'green';
					document.querySelector('#lancement_zzzelp').rows[n].cells[4].innerHTML = 'OUI';					
					Lancement_floods(donnees, tokens, (n+1));
				}, authentication_issue : function() {
					Stockage_flood_Zzzelp(donnees, flood, tokens, n, 2);
				}
			});
		}
		else {
			Lancement_floods(donnees, tokens, (n+1));
		}
	}
}

function Placement_antisonde_Ajax(antisonde, token, n, rediriger) {
	if(n == 1) {
		ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : 'Armee.php?deplacement=3&t=' + token },
			{ success : function(zone_page, ajax) {
				Placement_antisonde_Ajax(antisonde, token, n+1, rediriger);
			}
		});
	}
	else if(n == 2) {
		var url = 'Armee.php?Transferer=Envoyer&LieuOrigine=3&LieuDestination=1';
		url += '&ChoixUnite=' + ZzzelpScriptArmee.ordre[antisonde[0][0]];
		url += '&nbTroupes=' + antisonde[0][1] + '&t=' + token;
		ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : url },
			{ success : function(zone_page, ajax) {
				Placement_antisonde_Ajax(antisonde, token, n+1, rediriger);
			}
		});
	}
	else if(n == 3) {
		var url = 'Armee.php?Transferer=Envoyer&LieuOrigine=3&LieuDestination=2';
		url += '&ChoixUnite=' + ZzzelpScriptArmee.ordre[antisonde[1][0]]
		url += '&nbTroupes=' + antisonde[1][1] + '&t=' + token;
		ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : url },
			{ success : function(zone_page, ajax) {
				Placement_antisonde_Ajax(antisonde, token, n+1, rediriger);
			}
		});
	}
	else if(n == 4 && rediriger) {
		document.location.href = 'http://' + ze_serveur + '.fourmizzz.fr/Armee.php';
	}
	else if(n == 4) {
		document.querySelector('#placement_antisonde').innerHTML = 'Antisonde placée';
		document.querySelector('#placement_antisonde').style.color = 'green';
		document.querySelector('#lancement_zzzelp').dataset.lancement_fini = 1;
	}
}


function ZzzelpScriptBotChasse() {
	var that = this;

	this.values = {
		TDC_conquis : { values : [1000000000], name : 'quantiteVoulue' },
		TDC_depart : { values : [50], name : 'quantiteInitial' },
		armes : { values : [0], name : 'ATTtechArme' },
		bouclier : { values : [0], name : 'ATTtechBouclier' },
		cochenilles : { values : [0], name : 'cochenille' },
		vitesse_chasse : { values : [0], name : 'vitesse' }
	};
	this.armee = [10000000000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	this.localStorageKey = 'zzzelp_' + ze_serveur + '_bot_chasses';
	this.number = 0;



	this.init = function() {
		that.createInterface();
		that.simulate();
	};

	this.createInterface = function() {
		var elements = document.querySelector('#centre').childNodes;
		for(i=0; i<elements.length; i++) {
			if(elements[i].id != 'menu') {
				ze_Supprimer_element(elements[i]);
			}
		}

		var	zone = document.createElement('div');
		zone.innerHTML = '<center><b>Simulations stockées : <span id="nombre_similations_zzzelp">0</span></b></center>';
		document.querySelector('#centre').appendChild(zone);
	};

	this.analyse = function(simulation) {
		var data = {
			analyse : new ZzzelpScriptAnalyseurChasse(simulation).getValues().details[0].valeurs,
			niveaux : that.actual_data
		};
		that.send(data, 1);
	};

	this.simulate = function() {
		var form = that.completeForm();
		that.submitForm(form);

	};

	this.send = function(data, mode) {
		console.log(data);
		var form = new FormData();
		form.append('data', JSON.stringify(data));
		new ZzzelpScriptAjax({ method : 'POST', data : form, force : mode, domain : 'zzzelp', url : 'stockagesimulation?mode=chasse&' }, 
			{ success : function(values) {
				var el = document.querySelector('#nombre_similations_zzzelp');
				el.innerHTML = ze_Nombre(parseInt(el.innerHTML.replace(/ /g, '')) + 1);
				that.simulate();
			}, authentication_issue : function() {
				that.send(data, 2);
			}
		});
	};

	this.completeForm = function() {
		var form = new FormData();
		that.actual_data = {};

		form.append('simulation', 'Fight !');

		for(var niveau in that.values) {
			var values = that.values[niveau].values,
				value = values[Math.floor(Math.random()*values.length)];
			that.actual_data[niveau] = value;
			form.append(that.values[niveau].name, value);
		}

		for(var i=0; i<14; i++) {
			form.append('ATTunite' + ZzzelpScriptArmee.ID[i], that.armee[i]);
		}
		return form;
	};

	this.submitForm = function(form) {
		var url_ajax = 'simulateurChasse.php';
		new ZzzelpScriptAjax({ method : 'POST', data : form, domain : 'fourmizzz', url : url_ajax, addDOM : true }, 
			{ success : function(zone_page) {
				that.analyse(zone_page.querySelectorAll('#centre p')[1].innerHTML);
			}
		});	
	};

	this.init();

}
function ZzzelpScriptPageLancementAttaques(zzzelp) {

	var that = this;

	this.cible = new RegExp('Vous allez attaquer (.*) !').exec(document.querySelector('.simulateur h2').innerHTML)[1];

	this.init = function() {
		new ZzzelpScriptCoordonnees([that.cible], [], that.showReturnClock);
		that.showStatistiques();
	};

	this.showReturnClock = function(coordonnees) {
		var	vitesse_attaque = zzzelp.compte.getVitesseAttaque(),
			defenseur = coordonnees[that.cible],
			attaquant = coordonnees[gpseudo],
			temps_trajet = ze_Calcul_temps_trajet(ze_Calcul_distance(attaquant.x, attaquant.y, defenseur.x, defenseur.y), vitesse_attaque),
			tableau = document.createElement('table');
		tableau.setAttribute('style', 'margin-top:20px');
		document.querySelector('.simulateur').appendChild(tableau);
		var ligne = tableau.insertRow(0);
		ligne.insertCell(0).innerHTML = 'Temps de trajet : ';
		ligne.insertCell(1).innerHTML = ze_Secondes_date(temps_trajet) + '&nbsp&nbsp&nbsp&nbsp' + ((vitesse_attaque === 0)? '(vitesse attaque inconnue)': '(VA' + vitesse_attaque + ')');
		ligne = tableau.insertRow(1);
		ligne.insertCell(0).innerHTML = 'Arrivée : ';
		ligne.insertCell(1).innerHTML = '<span id="heure_retour"></span><span id="temps_trajet" style="display:none">' + temps_trajet + '</span>';
		that.updateClock();
	};

	this.updateClock = function() {
		setInterval(function() {
			var temps_trajet = parseInt(document.querySelector('#temps_trajet').innerHTML);
			document.querySelector('#heure_retour').innerHTML = ze_Generation_date_precise(Math.round(time_fzzz() + temps_trajet));
			var date = new Date((time_fzzz() + temps_trajet)*1000);
			if (date.getSeconds() >= 56) {
				document.querySelector('#heure_retour').innerHTML += '&nbsp&nbsp&nbsp&nbsp<span style="color:green;font-weight:bold">envoi conseillé</span>';
			}
			else {
				document.querySelector('#heure_retour').innerHTML += '&nbsp&nbsp&nbsp&nbsp<span style="color:red;font-weight:bold">envoi déconseillé</span>';
			}
		}, 50);
	};

	this.showStatistiques = function() {
		var lignes = new Array(['attaque', 'Attaque'], ['capa_flood', 'Capacité de flood']),
			tableau = document.querySelector('#tabChoixArmee');
		for(var i=0;i<lignes.length;i++) {
			var ligne = tableau.insertRow(-1);
			ligne.insertCell(0).innerHTML = lignes[i][1] + ' : ';
			ligne.insertCell(1).innerHTML = '';
			ligne.insertCell(2).innerHTML = '';
			ligne.insertCell(3).innerHTML = '';
			ligne.insertCell(4).innerHTML = '<span id="zzzelp_' + lignes[i][0] + '"></span>';
		}
		document.querySelector('#tabChoixArmee .cliquable').onclick = function onclick(event) {
			remplirArmeeJoueur();
			that.updateStatistiques();
		};
		var inputs = document.querySelectorAll('#tabChoixArmee');
		for(i=0;i<inputs.length;i++) {
			inputs[i].onkeyup = that.updateStatistiques;
		}
		that.updateStatistiques();
	};

	this.updateStatistiques = function() {
		var armee = new ZzzelpScriptArmee(),
			tableau = document.querySelector('#tabChoixArmee'),
			lignes = tableau.querySelectorAll('tr');
		for(var n=1;n<lignes.length;n++) {
			var colonnes = lignes[n].querySelectorAll('td'),
				unite = colonnes[0].innerHTML,
				index_unite = ZzzelpScriptArmee.noms_singulier.indexOf(unite);
			if(~index_unite && colonnes[4].querySelector('input')) {
				var valeur = parseInt(colonnes[4].querySelector('input').value.replace(/ /g,""));
				armee.unites[index_unite] += valeur;
			}
		}
		armee.setArmes(zzzelp.compte.getArmes());
		document.querySelector('#zzzelp_attaque').innerHTML = ze_Nombre(armee.getAttaqueAB());
		document.querySelector('#zzzelp_capa_flood').innerHTML = ze_Nombre(armee.getCapaFlood());
	};


	this.init();
}
function ZzzelpScriptCompte() {

	var that = this;
	that.localStorageKey = 'zzzelp_niveaux';
	that.lieux = ['construction', 'laboratoire'];

	/*
		Initialisation et mise à jour des niveaux
	*/ 

	this.init = function() {
		var niveaux = that.getLocalStorage();
		if(niveaux === null) {
			that.getNiveauxAjax('construction', that.nextStepUpdateNiveaux);
		}
		else {
			var last_update = Math.min(that.niveaux.construction.update_local, that.niveaux.laboratoire.update_local);
			if(time_fzzz() - last_update > 86400) {
				that.getNiveauxAjax('construction', that.nextStepUpdateNiveaux);
			}
		}
	};

	this.getLocalStorage = function() {
		var niveaux = localStorage.getItem(that.localStorageKey);
		if(niveaux === null) {
			that.initNiveaux();
			return null;
		}
		else {
			try {
				niveaux = JSON.parse(niveaux);
				if(that.isValidNiveaux(niveaux)) {
					that.niveaux = niveaux;
					return niveaux;
				}
				that.initNiveaux();
				return null;
			}
			catch(e) {
				that.initNiveaux();
				return null;
			}
		}		
	};

	this.initNiveaux = function() {
		this.niveaux = {
			construction : {
				valeurs : new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
				update_local : 0,
				update_zzzelp : 0
			},
			laboratoire : {
				valeurs : new Array(0,0,0,0,0,0,0,0,0,0,0,0),
				update_local : 0,
				update_zzzelp : 0
			},
			reine : {
				update_zzzelp : 0
			}
		};
	};

	this.isValidNiveaux = function(niveaux) {
		if(typeof niveaux == 'undefined') {
			return false;
		}
		else if(typeof niveaux.construction == 'undefined') {
			return false;
		}
		else if(typeof niveaux.laboratoire == 'undefined') {
			return false;
		}
		else if(typeof niveaux.reine == 'undefined') {
			return false;
		}
		return true;
	};

	this.nextStepUpdateNiveaux = function(niveaux) {
		that.niveaux.construction.valeurs = niveaux;
		that.niveaux.construction.update_local = time_fzzz();
		that.getNiveauxAjax('laboratoire', function(niveaux) {
			that.niveaux.laboratoire.valeurs = niveaux;
			that.niveaux.laboratoire.update_local = time_fzzz();			
			that.updateLocalStorage();
		});
	};

	this.getNiveauxAjax = function(lieu, callback) {
		new ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : lieu + '.php', addDOM : true },
			{ success : function(zone_page) {
				var niveaux = that.getNiveauxDOM(zone_page, lieu, 1);	
				if(callback) {
					callback(niveaux);
				}	
			}
		});
	};

	this.updateLocalStorage = function() {
		localStorage.setItem(that.localStorageKey, JSON.stringify(that.niveaux));	
	};

	//function ze_MAJ_niveaux(zone, lieu, interne, mode) {
	this.getNiveauxDOM = function(zone, lieu, mode) {
		var niveauxDOM = zone.querySelectorAll('.niveau_amelioration'),
			niveaux = (lieu === 'construction') ? new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0) : new Array(0,0,0,0,0,0,0,0,0,0,0,0),
			en_cours = zone.querySelectorAll('#centre > strong'),
			i, valeurs;
		for(i=0; i<en_cours.length; i++) {
			var bat = new RegExp('-(.*) ([0-9]+) (se termine|terminé) dans').exec(en_cours[i].innerHTML)[1].trim();
			niveaux[niveaux.length-2+i] = (in_array(lieu, ['constructions', 'construction']) ? Constructions.indexOf(bat) : Recherches.indexOf(bat)) + 1;
		}
		for (i=0;i<niveauxDOM.length;i++) {
			if(niveauxDOM[i].innerHTML.match(new RegExp('niveau ([0-9]+) -&gt; ([0-9]+)'))) {
				valeurs = new RegExp('niveau ([0-9]+) -&gt; ([0-9]+)').exec(niveauxDOM[i].innerHTML);
			}
			else if(niveauxDOM[i].innerHTML.match(new RegExp('niveau ([0-9]+)'))) {
				valeurs = new RegExp('niveau ([0-9]+)').exec(niveauxDOM[i].innerHTML);
			}
			niveaux[i] = parseInt(valeurs[1]);			
		}
		if(url.indexOf('&iz') > 0 || ZzzelpScript.parameters('parametres', ['synchronisation', 'synchro_niveaux'])) {
			new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'niveaux_script?lieu=' + lieu + '&niveaux=[' + niveaux + ']&' },
				{ authentication_issue : function(valeurs) {
					that.getNiveauxDOM(zone, lieu, interne, 2);
				}
			});
			that.niveaux[lieu].update_zzzelp = time_fzzz();
		}
		return niveaux;
	};


	/*
		Récupération des dates de modification
	*/
	this.getUpdateConstruction = function() {
		return that.niveaux.construction.update_zzzelp;	
	};

	this.getUpdateLaboratoire = function() {
		return that.niveaux.laboratoire.update_zzzelp;	
	};

	this.getUpdateReine = function() {
		return that.niveaux.reine.update_zzzelp;	
	};




	/*
		Récupération des niveaux à partir du cache
	*/

	this.getCouveuse = function() {
		return that.niveaux.construction.valeurs[3];
	};

	this.getSolarium = function() {
		return that.niveaux.construction.valeurs[4];
	};

	this.getLaboratoire = function() {
		return that.niveaux.construction.valeurs[5];
	};

	this.getDome = function() {
		return that.niveaux.construction.valeurs[9];
	};

	this.getLoge = function() {
		return that.niveaux.construction.valeurs[10];
	};

	this.getEtablePucerons = function() {
		return that.niveaux.construction.valeurs[11];
	};

	this.getTechniquedePonte = function() {
		return that.niveaux.laboratoire.valeurs[0];
	};

	this.getArmes = function() {
		return that.niveaux.laboratoire.valeurs[2];
	};

	this.getBouclier = function() {
		return that.niveaux.laboratoire.valeurs[1];
	};

	this.getVitesseAttaque = function() {
		return that.niveaux.laboratoire.valeurs[6];
	};

	this.getVitesseChasse = function() {
		return that.niveaux.laboratoire.valeurs[5];
	};

	this.getTDP = function() {
		return that.getCouveuse() + that.getSolarium() + that.getTechniquedePonte();
	};





	/*	
		Mise à jour des ouvrières
	*/
	this.updateOuvrieres = function(mode, ouvrieres) {
		if(~url.indexOf('iz') || ZzzelpScript.parameters('parametres', ['base', 'import_auto_niveaux'])) {
			if(ComptePlus) {
				ouvrieres = document.querySelectorAll('span[id*="armee_initial"]')[0].innerHTML;
			}
			if(typeof ouvrieres == 'undefined') {
				that.getOuvrieresAjax(mode);
			}
			else {
				var entrepots = document.querySelectorAll('.ligne_boite_info span'),
					nourriture = parseInt(entrepots[1].innerHTML.replace(/ /g, '')),
					materiaux = parseInt(entrepots[2].innerHTML.replace(/ /g, '')),
					url_ajax = 'niveaux_script?lieu=ouvrieres&ouvrieres=' + ouvrieres + '&nourriture=' + nourriture + '&materiaux=' + materiaux + '&';
				new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : url_ajax },
					{ authentication_issue : function(valeurs) {
						that.updateOuvrieres(2, ouvrieres);	
					}
				});
				that.niveaux.reine.update_zzzelp = time_fzzz();
				that.updateLocalStorage();
			}
		}
	};


	that.getOuvrieresAjax = function(mode) {
		new ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : 'commerce.php', addDOM : true },
			{ success : function(zone_page) {
				var elements = zone_page.querySelectorAll('#centre strong'),
					convois = [],
					regexp = new RegExp('- Vous allez livrer ([0-9 ]+) <img (.*)> et ([0-9 ]+) <img (.*)> à  <a (.*)>(.*)<\\/a> dans (.*)');
				for(var i=0; i<elements.length; i++) {
					if(elements[i].innerHTML.match(regexp)) {
						var resultats = regexp.exec(elements[i].innerHTML);
						convois.push(parseInt(resultats[1].replace(/ /g, '')));
						convois.push(parseInt(resultats[3].replace(/ /g, '')));
					}
				}
				new ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : 'construction.php', addDOM : true },
					{ success : function(zone_page) {
						var ligne = zone_page.querySelectorAll('.niveau_amelioration')[11],
							etable;
						if(ligne.innerHTML.match(new RegExp('niveau ([0-9]+) -&gt; ([0-9]+)'))) {
							etable = parseInt(new RegExp('niveau ([0-9]+) -&gt; ([0-9]+)').exec(ligne.innerHTML)[1]);
						}
						else if(ligne.innerHTML.match(new RegExp('niveau ([0-9]+)'))) {
							etable = parseInt(new RegExp('niveau ([0-9]+)').exec(ligne.innerHTML)[1]);
						}
						var ouvrieres = parseInt(gouvrieres);
						for(var i=0; i<convois.length; i++) {
							ouvrieres += Math.ceil(convois[i] / (10 + etable * 0.5));
						}
						that.updateOuvrieres(mode, ouvrieres);
					}
				});
			}
		});
	};

	this.init();
}
function ZzzelpScriptErrors() {

	var that = this;

	this.messages = [];
	this.trace = false;
	this.localStorageKey = 'zzzelp_rapport_bug_' + ze_serveur;

	this.init = function() {
		this.event();
		this.updateConsole();	
		this.addPage();
		if(~document.location.href.indexOf('?bug_report')) {
			that.createInterface();
		}
	};

	this.event = function() {
		window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
			that.logMessage('error', {
				error : errorMsg,
				script : url, 
				line : lineNumber,
				column : column,
				trace : errorObj
			});
		};	
	};

	this.updateConsole = function() {
		window.console= that.console(window.console);
	};

	this.logMessage = function(type, message) {
		if(this.trace) {
			window.console.trace();
		}
		that.messages.push({
			type : type,
			date : new Date().getTime(),
			content : message
		});
		that.updateRapport();
	};

	this.console = function(old_console) {
		var console = {

		};
		console.log = function(text){
			that.logMessage('message', text);
			old_console.log(text);        
		};
		console.info = function (text) {
			that.logMessage('message', text);
			old_console.info(text);
		};
		console.warn = function (text) {
			that.logMessage('message', text);
			old_console.warn(text);
		};
		console.error = function (text) {
			that.logMessage('message', text);
			old_console.error(text);
		};
		console.trace = function() {
			old_console.trace();
		};
		console.old_log = function(text) {
			old_console.log(text);
		};
		return console;
	};

	this.getRapport = function() {
		var rapport = localStorage.getItem(that.localStorageKey);
		if(rapport === null) {
			that.saveRapport([]);
			return [];
		}
		else {
			try {
				return JSON.parse(rapport);
			}
			catch(e) {
				that.saveRapport([]);
				return [];
			}
		}
	};

	this.saveRapport = function(rapport) {
		localStorage.setItem(that.localStorageKey, JSON.stringify(rapport));
	};

	this.addPage = function() {
		var rapport = that.getRapport();
		rapport.push({
			page : document.location.href,
			contenu : []
		});
		that.saveRapport(rapport);
	};

	this.updateRapport = function() {
		var rapport = that.getRapport();
		rapport[rapport.length-1].contenu = that.messages;
		if(rapport.length > 25) {
			rapport.shift();
		}
		that.saveRapport(rapport);
	};

	this.createInterface = function() {
		var elements = document.querySelector('#centre').childNodes;
		for(i=0; i<elements.length; i++) {
			if(elements[i].id != 'menu') {
				elements[i].parentNode.removeChild(elements[i]);
			}
		}
		var textarea = document.createElement('textarea');
		textarea.value =  that.createReport();
		textarea.setAttribute('style', 'width: 70%;margin: auto;display: block;height: calc(90vh - 200px);');
		document.querySelector('#centre').appendChild(textarea);
	};

	this.createReport = function() {
		var rapport = that.getRapport(),
			txt = '';
		for(var i=rapport.length-1; i>=0; i--) {
			var page = rapport[i];
			txt += '[b]' + page.page + ' : [/b]\n\n';
			for(var j=0; j<page.contenu.length; j++) {
				var ligne = page.contenu[j];
				txt += '[i]' + that.getDate(ligne.date) + ' (' + ligne.type + ') :[/i]\n';
				if(ligne.type == 'message') {
					txt += ligne.content;
				}
				else {
					txt += '[color=#FF0000]Error : ' + ligne.content.error + '\n';
					txt += ligne.script + ' (' + ligne.content.line + ' ' + ligne.content.column + ')[/color]'; 
				}
				txt += '\n\n';
			}
			txt += '\n\n\n';
		}
		return txt;
	};

	this.getDate = function(timestamp) {
		var date = new Date(timestamp),
			date_str = ((date.getHours() >= 10) ? date.getHours()  : ("0" + date.getHours())) + ':';
		date_str += ((date.getMinutes() >= 10) ? date.getMinutes()  : ("0" + date.getMinutes())) + ':';
		date_str += ((date.getSeconds() >= 10) ? date.getSeconds()  : ("0" + date.getSeconds()));		
		return date_str;
	};

	this.init();
}


function ZzzelpScriptCoordonnees(joueurs, alliances, callback) {

	var that = this;

	this.joueurs = joueurs;
	this.alliances = alliances;
	this.callback = callback;
	this.localStorageKey = 'zzzelp_coordonnees_' + ze_serveur;

	this.get = function() {
		var pseudos = [];
		for (var i=0; i<that.joueurs.length; i++) {
			var pseudo = that.joueurs[i];
			if(typeof that.coordonnees[pseudo] == 'undefined') {
				pseudos.push(pseudo);
			}
		}
		if(!in_array(gpseudo, pseudos) && typeof that.coordonnees[gpseudo] == 'undefined') {
			pseudos.push(gpseudo);
		}
		if(pseudos.length > 0 || that.alliances.length > 0) {
			that.getOnZzzelp(pseudos, that.alliances);
		}
		else {
			that.retrieve();
		}
	};

	this.retrieve = function() {
		this.saveLocalStorage(that.coordonnees);
		that.callback(that.coordonnees);	
	};

	this.getLocalStorage = function() {
		var coordonnees = localStorage.getItem(that.localStorageKey);
		if(coordonnees === null) {
			that.saveLocalStorage({});
			return {};
		}
		else {
			try {
				return JSON.parse(coordonnees);
			}
			catch(e) {
				that.saveLocalStorage({});
				return {};
			}
		}
	};

	this.saveLocalStorage = function(coordonnees) {
		localStorage.setItem(that.localStorageKey, JSON.stringify(coordonnees));	
	};

	this.getOnZzzelp = function(joueurs, alliances) {
		if(joueurs.length > 100) {
			joueurs_2 = joueurs.slice(0,100);
			joueurs = joueurs.slice(100,joueurs.length);
		}
		else {
			joueurs_2 = joueurs;
			joueurs = [];
		}
		var url_ajax = 'coordonnees?alliances=[' + alliances + ']&joueurs=[' + joueurs_2 + ']&';
		new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : url_ajax, brute : true },
			{ success : function(valeurs) {
				var pseudo;
				for(var i=0;i<valeurs.length;i++) {
					pseudo = valeurs[i].pseudo.replace('&deg;', '°');
					that.coordonnees[pseudo] = valeurs[i];
				}
				if(joueurs.length > 0) {
					that.getOnZzzelp(joueurs, []);
				}
				else {
					that.retrieve();
				}
			}
		});
	};

	this.coordonnees = this.getLocalStorage();
	this.get();
}
function ZzzelpScriptRightClick() {

	var menu = this;

	this.init = function() {
		menu.mouseEvent();
		var menuDOM = document.createElement('div');
		menuDOM.id = 'zzzelp_contextuel_membre';
		menuDOM.className = 'zzzelp_menu_contextuel';
		document.body.appendChild(menuDOM);
		document.body.onmousedown = function onmousedown(event) {
			menu.hide(event);
		};
		menu.menuDOM = menuDOM;
		menu.findLinks();
	};

	this.mouseEvent = function() {
		document.addEventListener('mousemove', function(e){ 
			coordonnees_souris.x = e.clientX || e.pageX; 
			coordonnees_souris.y = e.clientY || e.pageY;
		}, false);		
	};

	this.findLinks = function() {
		var liens = document.querySelectorAll('a[href*="Membre.php"]');
		for(var i=0; i<liens.length; i++) {
			if(liens[i].oncontextmenu === null || liens[i].oncontextmenu.name != 'contextuelzzzelp') {
				menu.addEvent(liens[i]);
			}
		}
		setTimeout(function(){
			menu.findLinks();
		},100);
	};

	this.addEvent = function(lien) {
		lien.oncontextmenu = function oncontextmenu(event) {
			menu.show(event, this.innerHTML);
			return false;
		};
	};

	this.show = function(event, pseudo) {
		document.querySelector('#zzzelp_contextuel_membre').style.display = 'block';
	    document.querySelector('#zzzelp_contextuel_membre').style.left = event.clientX + window.pageXOffset +'px';
	    document.querySelector('#zzzelp_contextuel_membre').style.top = event.clientY + window.pageYOffset + 'px';
		var coordonnees = localStorage['zzzelp_coordonnees_' + ze_serveur];
		menu.create(pseudo);
	};

	this.hide = function(event) {
		if((!event.target.href || !~event.target.href.indexOf('Membre.php')) && event.target.className != 'zzzelp_text_contextuel') {
			document.querySelector('#zzzelp_contextuel_membre').style.display = 'none';
		}
	};

	this.create = function(pseudo) {
		ZzzelpScriptCoordonnees([pseudo], [], function(coordonnees){
			var	ID = coordonnees[pseudo].ID,
				actions = new Array(
					{ nom : 'Accéder au profil', id : 'profil' },
					{ nom : 'MP le joueur', id : 'message' },
					{ nom : 'Envoyer un convoi', id : 'convois' },
					{ nom : 'Accéder au traceur', id : 'traceur' }
			);
			if(ZzzelpScriptModalGuerre) {
				actions.push({ nom : 'Aide de guerre', id : 'guerre' });
			}
			menu.menuDOM.innerHTML = '';
			for(var i=0; i<actions.length; i++) {
				var ligne = document.createElement('div'),
					text = document.createElement('span');
				ligne.className = 'zzzelp_action_contextuelle';
				ligne.dataset.action = actions[i].id;
				menu.Eventclick(ligne, pseudo, ID);
				text.className = 'zzzelp_text_contextuel';
				text.innerHTML = actions[i].nom;
				ligne.appendChild(text);
				menu.menuDOM.appendChild(ligne);
			}	
		});
	};

	this.Eventclick = function(ligne, pseudo, ID) {
		ligne.onclick = function onclick(event) {
			var action = this.dataset.action,
				a_ouvrir = '';
			if(action == 'message') {
				a_ouvrir = 'http://' + ze_serveur + '.fourmizzz.fr/messagerie.php?defaut=Ecrire&destinataire=' + pseudo;
			}
			else if(action == 'convois') {
				a_ouvrir = 'http://' + ze_serveur + '.fourmizzz.fr/commerce.php?ID=' + ID;
			}
			else if(action == 'profil') {
				a_ouvrir = 'http://' + ze_serveur + '.fourmizzz.fr/Membre.php?Pseudo=' + pseudo;
			}
			else if(action == 'traceur') {
				a_ouvrir = url_zzzelp + 'traceur?serveur=' + ze_serveur + '&mode=joueurs&joueur=' + pseudo;
			}
			else if(action == 'guerre') {
				new ZzzelpScriptModalGuerre(pseudo);
			}
			if(a_ouvrir.length > 0) {
				var a = document.createElement('a');
				a.href = a_ouvrir;
				a.target = '_BLANK';
				a.setAttribute('style', 'display:none');
				document.body.appendChild(a);
				a.click();
				ze_Supprimer_element(a);
			}
			menu.menuDOM.style.display = 'none';
		};
	};

	this.init();
}
function ZzzelpScriptAjax(values, callBacks) {
	var ajax = this;

	this.callBacks = callBacks;
	this.method = values.method;
	this.domain = values.domain;
	this.data = values.data;
	this.force = values.force;
	this.values = values;
	this.requestLog = {};
	this.logs_enable = false;

	this.init = function() {
		ajax.url = ajax.getFullURL(values.url, values.force);
		console.log('AJAX : ' + ajax.url);
		ajax.createXDR();
		ajax.send();
	};

	this.createXDR = function() {
		if (window.XDomainRequest) {
			ajax.xdr = new XDomainRequest(); 
		} 
		else if (window.XMLHttpRequest) {
			ajax.xdr = new XMLHttpRequest(); 
		} 
		else {
			alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
	    }
	};

	this.send = function() {
		ajax.xdr.onload = function() {
			if(ajax.domain == 'fourmizzz') {
				ajax.logRequest();
			}
			ajax.callBack();
		};
		ajax.xdr.open(ajax.method, ajax.url, true);
		if(ajax.values.contentType) {
			ajax.xdr.setRequestHeader("Content-Type", ajax.values.contentType);
		}
		this.requestLog.beginning = time(true);
		ajax.xdr.send(ajax.data);
	};

	this.callBack = function() {
		if(ajax.domain == 'zzzelp' || ajax.domain == 'zzzelp_interne') {
			if(ajax.values.brute) {
				var valeur;
				try {
					valeur = JSON.parse(ajax.xdr.responseText);
				}
				catch(e) {
					valeur = ajax.xdr.responseText;
				}
				ajax.callBacks.success(valeur, ajax);
			}
			else {
				var response_maping = ['unknown_player', 'authentication_issue', 'success'],
					data = ajax.response(ajax.xdr.responseText),
					response_type = response_maping[data.etat];
				if(response_type in ajax.callBacks) {
					ajax.callBacks[response_type](data.resultats, ajax);
				}
			}
		}
		else {
			if(ajax.values.addDOM) {
				ajax.addResponseDOM();
			}
			else if(ajax.callBacks.success) {
				ajax.callBacks.success(ajax.xdr.responseText, ajax);
			}
		}
	};

	this.getFullURL = function(partial_url, force) {
		if(ajax.domain == 'zzzelp') {
			var token = (ajax.force == 2) ? getToken() : getTokenZzzelp();
			return url_zzzelp + partial_url + 'serveur=' + ze_serveur + '&pseudo=' + gpseudo + '&token=' + token;
		}
		else if(ajax.domain == 'zzzelp_interne') {
			return url_zzzelp + partial_url;
		}
		else {
			return 'http://' + ze_serveur + '.fourmizzz.fr/' + partial_url;
		}
	};

	this.response = function(data) {
		try {
			data = JSON.parse(data);
			if(typeof ze_serveur != 'undefined') {
				ze_createCookie('zzzelp_etat_auth_' + ze_serveur, data.etat, 365);
				if(typeof data.token == 'string') {
					ze_createCookie('zzzelp_token_' + ze_serveur, data.token, 365);
				}
				if(data.etat == 2) {
					localStorage.setItem('zzzelp_authreussie', time_fzzz());
				}
			}
		}
		catch(e) {
			console.log(data);
			console.log(e);
		}
		return data;
	};

	this.addResponseDOM = function() {
		var page = ze_getBody(ajax.xdr.responseText),
			zone_page = document.createElement('div');
		zone_page.setAttribute('id','contenu_zzzelp');
		zone_page.setAttribute('style','display:none');
		zone_page.innerHTML = page;
		document.querySelector('body').appendChild(zone_page);
		if(ajax.callBacks.success) {
			ajax.callBacks.success(zone_page, this);
		}
		if(typeof ajax.values.destroyDOM == 'undefined' || ajax.values.destroyDOM) {
			setTimeout(function() {
				try {
					ze_Supprimer_element(zone_page);
				}
				catch(e) {

				}
			}, 1000);
		}
	};

	this.logRequest = function() {
		if(ajax.logs_enable) {
			ajax.requestLog.end = time(true);
			ajax.requestLog.duration = ajax.requestLog.end - ajax.requestLog.beginning;
			ajax.requestLog.size = ajax.xdr.getResponseHeader("Content-Length");
			ajax.requestLog.url = ajax.url;
			var logs = ZzzelpScriptAjax.getLogs();
			logs.push(ajax.requestLog);
			ajax.saveLogs(logs);
		}


	};


	this.saveLogs = function(logs) {
		localStorage.setItem(ZzzelpScriptAjax.localStorageKey, JSON.stringify(logs));
	};

	this.init();
}

if(typeof ze_serveur != 'undefined') {
	ZzzelpScriptAjax.localStorageKey = 'zzzelp_logs_ajax_' + ze_serveur;
}

ZzzelpScriptAjax.getLogs = function() {
	var logs = localStorage.getItem(ZzzelpScriptAjax.localStorageKey);
	if(logs === null) {
		return [];
	}
	else {
		try {
			logs = JSON.parse(logs);
			return logs;
		}
		catch(e) {
			return [];
		}
	}			
};

ZzzelpScriptAjax.showLogs = function() {
	var logs = ZzzelpScriptAjax.getLogs(),
		txt = '';
	for(var i=0; i<logs.length; i++) {
		txt += logs[i].duration + '	' + logs[i].size + '	' + logs[i].url + '\n';
	}
	console.log(txt);
};
function ZzzelpScriptRC(pseudo) {

	var that = this;

	if(pseudo) {
		this.pseudo = pseudo;
	}
	else {
		pseudo = gpseudo;
	}

	this.lieux = new Array('Terrain de Chasse', 'fourmilière', 'Loge Impériale');

	this.lignes_combat = new Array(
		/*
			SPECIFIQUE ATT
		*/
		{
			role : 'att',
			regexp : '(([ 0-9]{2})\\/([ 0-9]{2})\\/([ 0-9]{2})( à | )([ 0-9]{2})(h|:)([ 0-9]{2})|)(([ 	]+)|)(<strong>|)Vous attaquez (la|le) ([^<:]+) de (<a href="Membre.php\\?Pseudo=(.*)">|)(.*)(<\\/a><\\/strong>|)',
			action : function(valeurs, ligne, regexp) {
				var resultats = new RegExp(regexp).exec(ligne);
				valeurs.defenseur.pseudo = (typeof resultats[15] != 'undefined') ? resultats[15] : resultats[16];
				valeurs.lieu = that.lieux.indexOf(resultats[13]);
				if(resultats[1] !== '') {
					valeurs.date = ze_Date_to_timestamp_v1(resultats[1]);
				}
				return valeurs;
			}
		},	
		/*
			SPECIFIQUE DEF
		*/
		{
			role : 'def',
			regexp : '(([ 0-9]{2})\\/([ 0-9]{2})\\/([ 0-9]{2})( à | )([ 0-9]{2})(h|:)([ 0-9]{2})|)(([ 	]+)|)(<strong><a href="Membre\\.php\\?Pseudo=([^ ]+)">|)([^ ]+)(<\\/a>|) attaque votre ([^<:]+)(<\\/strong>|)',
			action : function(valeurs, ligne, regexp) {
				var resultats = new RegExp(regexp).exec(ligne);
				console.log(resultats);
				valeurs.attaquant.pseudo = (typeof resultats[12] != 'undefined') ? resultats[12].trim() : resultats[13].trim();
				valeurs.lieu = that.lieux.indexOf(resultats[15].trim());
				if(resultats[1] !== '') {
					valeurs.date = ze_Date_to_timestamp_v1(resultats[1]);
				}
				return valeurs;
			}
		},

		/*
			COMMUN ATTAQUE / DEF
		*/
		{
			role : 'commun',
			regexp : 'Troupes en attaque( |):( |)([^.]+)',
			action : function(valeurs, ligne) {
				valeurs.attaquant.armee = ZzzelpScriptArmee.analyse(ligne);
				return valeurs;
			}
		}, 
		{
			role : 'commun',
			regexp : 'Troupes en défense( |):( |)([^.]+)',
			action : function(valeurs, ligne) {
				valeurs.defenseur.armee = ZzzelpScriptArmee.analyse(ligne);
				return valeurs;
			}
		}, 
		{
			role : 'commun',
			regexp : 'Vous infligez (<strong>|)([ 0-9]+)\\(\\+([ 0-9]+)\\)(<\\/strong>|) dégâts et tuez (<strong>|)([ 0-9]+)(<\\/strong>|) (ennemie|ennemies)',
			action : function(valeurs, ligne, regexp, offensif) {
				var resultats = new RegExp(regexp).exec(ligne);
				valeurs[offensif ? 'defenseur' : 'attaquant'].morts.push(parseInt(resultats[6].replace(/ /g,'')));
				valeurs[offensif ? 'defenseur' : 'attaquant'].total_morts += parseInt(resultats[6].replace(/ /g,''));
				valeurs[offensif ? 'attaquant' : 'defenseur'].degats.push({
					HB : parseInt(resultats[2].replace(/ /g,'')), 
					bonus : parseInt(resultats[3].replace(/ /g,''))
				});	
				return valeurs;					
			}
		}, 
		{
			role : 'commun',
			regexp : 'ennemie inflige (<strong>|)([ 0-9]+)\\(\\+([ 0-9]+)\\)(<\\/strong>|) dégâts à vos fourmis et en tue (<strong>|)([ 0-9]+)(<\\/strong>|)',
			action : function(valeurs, ligne, regexp, offensif) {
				var resultats = new RegExp(regexp).exec(ligne);
				valeurs[offensif ? 'attaquant' : 'defenseur'].morts.push(parseInt(resultats[6].replace(/ /g,'')));
				valeurs[offensif ? 'attaquant' : 'defenseur'].total_morts += parseInt(resultats[6].replace(/ /g,''));
				valeurs[offensif ? 'defenseur' : 'attaquant'].degats.push({
					HB : parseInt(resultats[2].replace(/ /g,'')),
					bonus : parseInt(resultats[3].replace(/ /g,''))
				});	
				return valeurs;			
			}
		}, 
		{
			role : 'commun',
			regexp : '- ([0-9 ]+) (.*) sont devenues des (<strong>|)(.*)(<\\/strong>|)',
			action : function(valeurs, ligne, regexp, offensif) {
				var resultats = new RegExp(regexp).exec(ligne),
					data = { nombre : parseInt(resultats[1].replace(/ /g, '')) }; 
				if(ZzzelpScriptArmee.noms_pluriel.indexOf(resultats[2]) >= 0) {
					data.avant = ZzzelpScriptArmee.noms_pluriel.indexOf(resultats[2]);
				}
				else {
					data.avant = ZzzelpScriptArmee.noms_singulier.indexOf(resultats[2]);
				} 
				if(ZzzelpScriptArmee.noms_pluriel.indexOf(resultats[4]) >= 0) {
					data.apres = ZzzelpScriptArmee.noms_pluriel.indexOf(resultats[4]);
				}
				else {
					data.apres = ZzzelpScriptArmee.noms_singulier.indexOf(resultats[4]);
				}
				valeurs[offensif ? 'attaquant' : 'defenseur'].unites_XP.push(data);	
				return valeurs;					
			}
		}
	);

	this.initValeursRC = function(pseudo, rebellion, offensif) {
		var pseudo_a = ((typeof(pseudo) == 'undefined') ? '' : pseudo),
			pseudo_b = (gpseudo ? gpseudo : '???');
		return {
			mode : 'RC',
			position : (offensif ? 'attaquant' : 'defenseur'),
			attaquant : {
				pseudo : (offensif ? pseudo_b : pseudo_a),
				morts : [],
				total_morts : 0,
				degats : [],
				unites_XP : []
			},
			defenseur : {
				pseudo : (offensif ? pseudo_a : pseudo_b),
				morts : [],
				total_morts : 0,
				degats : [],
				unites_XP : []
			},
			lieu : (rebellion ? 0 : -1),
			rebellion : rebellion
		};
	};

	this.parseCombat = function(lignes, rebellion, pseudo, offensif) {
		var valeurs = that.initValeursRC(pseudo, rebellion, offensif);

		for(var n=0; n<lignes.length ; n++) {
			var ligne = lignes[n];
			for(var i=0; i<that.lignes_combat.length; i++) {
				var l = that.lignes_combat[i];
				if(l.role == 'commun' || (l.role == 'att' && offensif) || (l.role == 'def' && !offensif)) {
					if(ligne.match(l.regexp)) {
						valeurs = l.action(valeurs, ligne, l.regexp, offensif);
					}
				}
			}
		}
		return valeurs;
	};

	this.floodOffensif = function(lignes, element) {
		var r = 'Vos fourmis ont <strong>conquis ([0-9 ]+) cm²<\\/strong> lors de leur dernière bataille\\. Ces terres appartenaient à <a href="Membre\\.php\\?Pseudo=(.*)">(.*)<\\/a>\\.',
			resultats = new RegExp(r).exec(lignes[0]);
		return {
			mode : 'flood',
			position : 'attaquant',
			valeur : parseInt(resultats[1].replace(/ /g, '')),
			pseudo : resultats[2],
			id : element.parentNode.id.replace('message_','')
		};
	};

	this.floodDefensif = function(lignes, element) {
		var r = '<a href="Membre\\.php\\?Pseudo=(.*)">(.*)<\\/a> vous a pris ([0-9 ]+) cm² lors de sa dernière attaque\\.',
			resultats = new RegExp(r).exec(lignes[0]);
		return {
			mode : 'flood',
			position : 'defenseur',
			valeur : parseInt(resultats[3].replace(/ /g, '')),
			pseudo : resultats[1],
			id : element.parentNode.id.replace('message_','')
		};
	};


	this.analyse = function(valeurs) {
		console.log(valeurs);

		// Niveaux attaquant
		valeurs.attaquant.armee.computeArmes(valeurs.attaquant.degats[0]);
		if(valeurs.attaquant.degats.length > 1 || !valeurs.attaquant.armee.isDead(valeurs.attaquant.total_morts)) {
			valeurs.attaquant.armee.computeNiveauxVie(valeurs.attaquant.morts[0], valeurs.defenseur.degats[0]);
		}

		// Niveaux défenseur
		valeurs.defenseur.armee.setLieu(valeurs.lieu);
		valeurs.defenseur.armee.computeArmes(valeurs.defenseur.degats[0]);
		if(valeurs.defenseur.degats.length > 1 || !valeurs.defenseur.armee.isDead(valeurs.defenseur.total_morts)) {
			valeurs.defenseur.armee.computeNiveauxVie(valeurs.defenseur.morts[0], valeurs.attaquant.degats[0]);
		}

		// Armées après le combat
		valeurs.attaquant.armee_apres = valeurs.attaquant.armee.armeePostCombat(valeurs.attaquant.total_morts);
		valeurs.attaquant.armee_XP = valeurs.attaquant.armee_apres.applyXP(valeurs.attaquant.unites_XP);
		valeurs.defenseur.armee_apres = valeurs.defenseur.armee.armeePostCombat(valeurs.defenseur.total_morts);
		valeurs.defenseur.armee_XP = valeurs.defenseur.armee_apres.applyXP(valeurs.defenseur.unites_XP);

		//Stockage des statistiques
		valeurs.attaquant.armee.logStatistiques();
		valeurs.attaquant.armee_apres.logStatistiques();
		valeurs.attaquant.armee_XP.logStatistiques();
		valeurs.defenseur.armee.logStatistiques();
		valeurs.defenseur.armee_apres.logStatistiques();
		valeurs.defenseur.armee_XP.logStatistiques();

		valeurs.attaquant.HOF = valeurs.attaquant.armee.statistiques.HOF - valeurs.attaquant.armee_apres.statistiques.HOF;
		valeurs.defenseur.HOF = valeurs.defenseur.armee.statistiques.HOF - valeurs.defenseur.armee_apres.statistiques.HOF;
		valeurs.HOF = valeurs.attaquant.HOF + valeurs.defenseur.HOF;

		return valeurs;
	};



	/*
		MESSAGERIE FOURMIZZZ
	*/

	this.messagerie = function(id, titre, RCs, dates) {
		var zones = that.initMessagerie(id);
		for(var i=0; i<RCs.length; i++) {
			var RC = RCs[i].innerHTML.split('<br>'),
				valeurs = that.parseRCMessagerie(RC, titre, RCs, i);
			if(valeurs && valeurs.mode == 'RC') {
				valeurs.date = ze_Date_to_timestamp_v1(dates[i].innerHTML);
				valeurs = that.analyse(valeurs);
				that.createZoneMessagerie(zones.zone, RC, valeurs);
				if(ZzzelpScript.parameters('parametres', ['synchronisation', 'synchro_RC'])) {
					ze_Envoi_RC_Zzzelp(RC, valeurs, 1, (i==RCs.length-1));
				}
			}
			else if(valeurs && valeurs.mode == 'flood' && ZzzelpScript.parameters('parametres', ['synchronisation', 'synchro_RC'])) {
				valeurs.date = ze_Date_to_timestamp_v1(dates[i].innerHTML);
				ze_Envoi_RC_Zzzelp(RC, valeurs, 1, (i==RCs.length-1));
			}
		}
		if(zones.zone.innerHTML.length === 0) {
			console.log('ZzzelpScript : Aucune analyse à faire');
			ze_Supprimer_element(zones.bouton);
		}
	};

	this.initMessagerie = function(id) {
		var table = document.querySelector('#table_liste_conversations'),
			zone = document.createElement('div'),
			entete = document.createElement('div'),
			bouton = document.createElement('div');
		bouton.setAttribute('class', 'bouton_analyse');
		bouton.innerHTML = 'Afficher les analyses';
		bouton.onclick = function onclick(event) {
			zone.style.display = (zone.style.display === '' ? 'none' : '');
		};
		entete.appendChild(bouton);
		var style = 'margin:50px 0;text-align:center;font-family:Consolas,Monaco,Lucida Console,';
		style += 'Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;font-size:0.9em;display:none';
		zone.setAttribute('style', style);
		table.rows[document.querySelector('#' + id).rowIndex + 2].querySelector('tr[id*="reactions_"] td').appendChild(entete);
		table.rows[document.querySelector('#' + id).rowIndex + 2].querySelector('tr[id*="reactions_"] td').appendChild(zone);
		return { zone : zone, bouton : bouton };
	};

	this.parseRCMessagerie = function(RC, titre, RCs, i) {
		var valeurs, pseudo;
		//RC
		if(~RC[0].indexOf('attaque votre')) {
			valeurs = this.parseCombat(RC, false, undefined, false);
		}
		else if(~RC[0].indexOf('attaquez')) {
			valeurs = this.parseCombat(RC, false, undefined, true);
		}
		//Rebellions
		else if(~RC[RC.length-1].indexOf('Il vous aura pillé')) {
			pseudo = new RegExp('Rebellion (échouée|réussie) contre ([^ ]+)').exec(titre)[2];
			valeurs = this.parseCombat(RC, true, pseudo, true);
		}
		else if(~RC[RC.length-1].indexOf('Elle vous a rapporté')) {
			if(~titre.indexOf('Colonie libérée')) {
				pseudo = new RegExp('Colonie libérée chez ([^ ]+)').exec(titre)[1];
			}
			else {
				pseudo = new RegExp('Indépendance de ([^ ]+)').exec(titre)[1];
				valeurs = this.parseCombat(RC, true, pseudo, false);
			}
		}
		//Floods
		else if(~RC[0].indexOf('lors de leur dernière bataille')) {
			valeurs = that.floodOffensif(RC, RCs[i]);
		}
		else if(~RC[0].indexOf('lors de sa dernière attaque')) {
			valeurs = that.floodDefensif(RC, RCs[i]);
		}
		return valeurs;
	};

	this.createZoneMessagerie = function(zone, RC, valeurs) {
		var lignes = new ZzzelpScriptAnalyseTextuelle('combat', valeurs, ze_serveur).getContent();
		
		var resultat_HTML = '',
			resultat_BBCode_FE = '',
			resultat_BBCode_FI = '';
			
		for(var n=0; n<lignes.length; n++) {
			resultat_HTML += '|' + lignes[n].HTML + '|<br>';
			resultat_BBCode_FE += lignes[n].BBCode_FE;
			resultat_BBCode_FI += '|' + lignes[n].BBCode_FI + '|\n';
		}

		var raccourci_FE = document.createElement('div'),
			raccourci_FI = document.createElement('div'),
			zone_RC = document.createElement('div'),
			contenu_FE = document.createElement('textarea'),
			contenu_FI = document.createElement('textarea');
			
		raccourci_FE.innerHTML = 'Copier sur un forum externe';
		raccourci_FI.innerHTML = 'Copier sur un forum Fourmizzz';
		contenu_FE.value = ze_HTML_to_BBcode(RC.join('\n')) + '\n\n[center][table]\n' + resultat_BBCode_FE + '[/table][/center]';
		contenu_FI.value = ze_HTML_to_BBcode(RC.join('\n')) + '\n\n\n[center][code]\n' + resultat_BBCode_FI + '\n[/code][/center]';
		raccourci_FE.setAttribute('style', 'text-align:center;font-weight:bold;margin:15px 0;cursor:pointer;');
		raccourci_FI.setAttribute('style', 'text-align:center;font-weight:bold;margin:15px 0;cursor:pointer;');
		contenu_FE.setAttribute('style', ' width: 80%;height: 150px;margin: 25px 0;display:none;');
		contenu_FI.setAttribute('style', ' width: 80%;height: 150px;margin: 25px 0;display:none;');
		zone_RC.setAttribute('style', 'margin-top:50px;');
		
		zone_RC.setAttribute('class', 'zzzelp_analyse_RC');
		zone_RC.innerHTML = resultat_HTML;
		
		raccourci_FE.onclick = function onclick(event) {
			contenu_FE.style.display = (contenu_FE.style.display === '' ? 'none' : '');
		};
		raccourci_FI.onclick = function onclick(event) {
			contenu_FI.style.display = (contenu_FI.style.display === '' ? 'none' : '');
		};
		
		zone.appendChild(zone_RC);
		zone.appendChild(raccourci_FE);
		zone.appendChild(contenu_FE);	
		zone.appendChild(raccourci_FI);
		zone.appendChild(contenu_FI);
	};








	/*
		ANALYSEUR DE GUERRE
	*/

	this.HOF = function(combats, guerre) {
		var RCs = that.splitRCs(combats),
			donnees = [], valeurs;
		for(var i=0; i<RCs.length; i++) {
			if(~RCs[i].join('\n').indexOf('attaque votre')) {
				valeurs = this.parseCombat(RCs[i], false, undefined, false);
			}
			else if(~RCs[i].join('\n').indexOf('attaquez')) {
				valeurs = this.parseCombat(RCs[i], false, undefined, true);
			}
			if(valeurs && valeurs.mode == 'RC') {
				valeurs = that.analyse(valeurs);
				donnees.push({
					zone : new ZzzelpScriptZoneHOF(RCs[i], valeurs, true, guerre).getZone(),
					valeurs : valeurs
				});
			}
		}
		return donnees;
	};

	that.splitRCs = function(combats) {
		console.log(combats);
		if(combats.match('([ 0-9]{2})\/([ 0-9]{2})\/([ 0-9]{2})\n([ 0-9]{2})(h|:)([ 0-9]{2})')) {
			combats = combats.replace(/([ 0-9]{2})\/([ 0-9]{2})\/([ 0-9]{2})\n([ 0-9]{2})(h|:)([ 0-9]{2})/i, '$2\/$3/$4 $5:$7');
		}
		var lignes_types = new Array(
			new RegExp('Vous attaquez (la|le) (.*) de (.*)'),
			new RegExp('(.*) attaque votre (.*) : '),
			new RegExp('Troupes en attaque( |):( |)([^.]+)'),
			new RegExp('Troupes en défense( |):( |)([^.]+)')
			),
			index = -1,
			RCs = new Array([]);
		combats = combats.replace(/<br>/g, '\n').split('\n');
		console.log(combats);
		for(var i=0; i<combats.length; i++) {
			for(var j=0; j<lignes_types.length; j++) {
				if(combats[i].match(lignes_types[j])) {
					if(j <= index) {
						RCs.push([]);
					}
					index = j;
					break;
				}
			}
			if(combats[i].trim() !== '' || (i > 0 && combats[i-1].trim() !== '')) {
				RCs[RCs.length-1].push(combats[i]);
			}
		}
		return RCs;
	};

	this.prepareZoneHOF = function(analyse, RC) {
		analyse.attaquant.armee = new ZzzelpScriptArmee(analyse.attaquant.armee.unites, analyse.attaquant.armee.niveaux);
		analyse.attaquant.armee_apres = new ZzzelpScriptArmee(analyse.attaquant.armee_apres.unites, analyse.attaquant.armee_apres.niveaux);
		analyse.attaquant.armee_XP = new ZzzelpScriptArmee(analyse.attaquant.armee_XP.unites, analyse.attaquant.armee_XP.niveaux);
		analyse.defenseur.armee = new ZzzelpScriptArmee(analyse.defenseur.armee.unites, analyse.defenseur.armee.niveaux);
		analyse.defenseur.armee_apres = new ZzzelpScriptArmee(analyse.defenseur.armee_apres.unites, analyse.defenseur.armee_apres.niveaux);
		analyse.defenseur.armee_XP = new ZzzelpScriptArmee(analyse.defenseur.armee_XP.unites, analyse.defenseur.armee_XP.niveaux);

		return new ZzzelpScriptZoneHOF(RC.split('<br>'), analyse, false, true, document).getZone();
	};

}
function ZzzelpScriptAnalyseurChasse(chasses) {

	var that = this;

	this.content = chasses;

	this.lignes_chasse = new Array(
		{
			regexp : 'Troupes en attaque( |):( |)([^.]+)',
			action : function(valeurs, ligne, regexp) {
				valeurs.attaquant.armee = ZzzelpScriptArmee.analyse(new RegExp(regexp).exec(ligne)[3]);
				return valeurs;
			}
		},
		{
			regexp : 'Troupes en défense( |):( |)([^.]+)',
			action : function(valeurs, ligne, regexp) {
				var unites = new RegExp(regexp).exec(ligne)[3].split(','),
					armee_def = new ZzzelpScriptArmee(undefined, undefined, 'chasse');
				for(var j=0; j<unites.length; j++) {
					var data_unite = new RegExp('([0-9 ]+)(.*)').exec(unites[j]),
						valeur = parseInt(data_unite[1].replace(/ /g, ""));
					if(~unites_chasses.noms_pluriel.indexOf(data_unite[2].trim())) {
						armee_def.setUnite(unites_chasses.noms_pluriel.indexOf(data_unite[2].trim()), valeur);
					}
					else {
						armee_def.setUnite(unites_chasses.noms_singulier.indexOf(data_unite[2].trim()), valeur);	
					}
				}
				valeurs.defenseur.armee = armee_def;
				return valeurs;
			}
		},
		{
			regexp : 'Vous infligez (<strong>|)([ 0-9]+)\\(\\+([ 0-9]+)\\)(<\\/strong>|) dégâts et tuez (<strong>|)([ 0-9]+)(<\\/strong>|) ennemie|ennemies',
			action : function(valeurs, ligne, regexp) {
				var variables = new RegExp(regexp).exec(ligne),
					valeur = parseInt(variables[6].replace(/ /g, ''));
				valeurs.defenseur.total_morts += valeur;
				valeurs.defenseur.morts.push(valeur);
				valeurs.attaquant.degats.push({ 
					HB : parseInt(variables[2].replace(/ /g, '')), 
					bonus : parseInt(variables[3].replace(/ /g, ''))
				});
				return valeurs;
			}
		},
		{
			regexp : 'ennemie inflige (<strong>|)([ 0-9]+)\\(\\+([ 0-9]+)\\)(<\\/strong>|) dégâts à vos fourmis et en tue (<strong>|)([ 0-9]+)(<\\/strong>|)',
			action : function(valeurs, ligne, regexp) {
				var variables = new RegExp(regexp).exec(ligne),
					valeur = parseInt(variables[6].replace(/ /g, ''));
				valeurs.attaquant.total_morts += valeur;
				valeurs.attaquant.morts.push(valeur);
				valeurs.defenseur.degats.push({ 
					HB : parseInt(variables[2].replace(/ /g, '')), 
					bonus : parseInt(variables[3].replace(/ /g, ''))
				});
				return valeurs;
			}
		},
		{
			regexp : '- ([0-9 ]+) (.*) sont devenues des (<strong>|)(.*)(<\\/strong>|)',
			action : function(valeurs, ligne, regexp, offensif) {
				var resultats = new RegExp(regexp).exec(ligne),
					data = { nombre : parseInt(resultats[1].replace(/ /g, '')) }; 
				if(ZzzelpScriptArmee.noms_pluriel.indexOf(resultats[2]) >= 0) {
					data.avant = ZzzelpScriptArmee.noms_pluriel.indexOf(resultats[2]);
				}
				else {
					data.avant = ZzzelpScriptArmee.noms_singulier.indexOf(resultats[2]);
				} 
				if(ZzzelpScriptArmee.noms_pluriel.indexOf(resultats[4]) >= 0) {
					data.apres = ZzzelpScriptArmee.noms_pluriel.indexOf(resultats[4]);
				}
				else {
					data.apres = ZzzelpScriptArmee.noms_singulier.indexOf(resultats[4]);
				}
				valeurs.attaquant.unites_XP.push(data);	
				return valeurs;
			}
		},
		{
			regexp : 'Vos chasseuses ont conquis <strong>([0-9 ]+) cm(²|2)<\\/strong>, les carcasses des prédateurs vous rapportent <strong>([0-9 ]+)<\\/strong>',
			action : function(valeurs, ligne, regexp) {
				var variables = new RegExp(regexp).exec(ligne);
				valeurs.TDC_chasse = parseInt(variables[1].replace(/ /g, ''));
				valeurs.nourriture = parseInt(variables[3].replace(/ /g, ''));
				return valeurs;
			}
		}
	);

	this.main = function() {
		that.splitChasses();
		that.parseChasses();
		if(that.analyses.length > 0) {
			that.groupAnalyses();
			that.analyse_textuelle = new ZzzelpScriptAnalyseTextuelle('chasse', that.analyseTotal).getContent();
		}
	};

	this.getValues = function() {
		return that.analyseTotal;
	};

	this.splitChasses = function() {
		var lignes = that.content.split('\n'),
			rapports = [],
			rapport = [];
		for(var i=0; i<lignes.length; i++) {
			if(~lignes[i].indexOf('Troupes en attaque') && rapport.length > 0) {
				rapports.push(rapport);
				rapport = [];
			}
			rapport.push(lignes[i]);
		}
		rapports.push(rapport);
		that.chasses = rapports;
	};

	that.initValeursChasse = function() {
		return {
			mode : 'chasse',
			TDC_chasse : 0,
			nourriture : 0,
			attaquant : {
				morts : [],
				total_morts : 0,
				degats : [],
				unites_XP : []
			},
			defenseur : {
				morts : [],
				total_morts : 0,
				degats : []
			}
		};
	};

	this.parseChasses = function() {
		that.analyses = [];
		for(var k=0; k<that.chasses.length; k++) {
			var valeurs = that.initValeursChasse(),
				lignes = that.chasses[k];
			if(~lignes[0].indexOf('Troupes en attaque')) {
				for(var n=0; n<lignes.length ; n++) {
					var ligne = lignes[n];
					for(var i=0; i<that.lignes_chasse.length; i++) {
						var l = that.lignes_chasse[i];
						if(ligne.match(l.regexp)) {
							valeurs = l.action(valeurs, ligne, l.regexp);
						}
					}
				}
				that.analyses.push({
					valeurs : that.analyse(valeurs),
					chasse : lignes
				});
			}
		}
	};

	this.getVieChasse = function(armee) {
		var vie = 0,
			coeffs = [50,90,100,105,140,200,700,220,450,1000,5000,900,4800,8400,13000,105000,6600000];
		for(var i=0;i<17;i++) {
			vie += armee.getUnite(i)*coeffs[i];
		}
		return vie;		
	};

	this.analyse = function(valeurs) {
		valeurs.attaquant.armee.computeArmes(valeurs.attaquant.degats[0]);
		if(valeurs.attaquant.degats.length > 1 || !valeurs.attaquant.armee.isDead(valeurs.attaquant.total_morts)) {
			valeurs.attaquant.armee.computeNiveauxVie(valeurs.attaquant.morts[0], valeurs.defenseur.degats[0]);
		}
		valeurs.attaquant.armee_apres = valeurs.attaquant.armee.armeePostCombat(valeurs.attaquant.total_morts);
		valeurs.attaquant.armee_XP = valeurs.attaquant.armee_apres.applyXP(valeurs.attaquant.unites_XP);
		valeurs.defenseur.armee_apres = valeurs.defenseur.armee.armeePostCombat(valeurs.defenseur.total_morts);

		valeurs.defenseur.vie = that.getVieChasse(valeurs.defenseur.armee);
		valeurs.replique = valeurs.attaquant.armee.computeReplique(valeurs.defenseur.vie);

		return valeurs;
	};

	this.groupAnalyses = function() {
		var valeurs = {
			attaquant : {
				armee : that.analyses[0].valeurs.attaquant.armee.new_armee(),
				armee_apres : that.analyses[0].valeurs.attaquant.armee.new_armee(),
				armee_XP : that.analyses[0].valeurs.attaquant.armee.new_armee(),
				unites_XP : ZzzelpScriptArmee.getEmptyArmee(14),
				total_morts : 0,
				
			},
			nourriture : 0,
			TDC_chasse : 0,
			details : that.analyses
		};
		for(var i=0; i<that.analyses.length; i++) {
			var analyse = that.analyses[i].valeurs;
			valeurs.TDC_chasse += analyse.TDC_chasse;
			valeurs.attaquant.total_morts += analyse.attaquant.total_morts;
			valeurs.nourriture += analyse.nourriture;
			for(var n=0; n<14; n++) {
				valeurs.attaquant.armee.addUnite(n, analyse.attaquant.armee.getUnite(n));
				valeurs.attaquant.armee_apres.addUnite(n, analyse.attaquant.armee_apres.getUnite(n));
				valeurs.attaquant.armee_XP.addUnite(n, analyse.attaquant.armee_XP.getUnite(n));
			}
			var unites_XP = analyse.attaquant.unites_XP;
			for(n=0; n<unites_XP.length; n++) {
				valeurs.attaquant.unites_XP[unites_XP[n].avant] += unites_XP[n].nombre;
			}
		}
		that.analyseTotal = valeurs;
	};

	this.initMessagerie = function(id) {
		var table = document.querySelector('#table_liste_conversations'),
			zone = document.createElement('div'),
			entete = document.createElement('div'),
			bouton = document.createElement('div');
		bouton.setAttribute('class', 'bouton_analyse');
		bouton.innerHTML = 'Afficher les analyses';
		bouton.onclick = function onclick(event) {
			zone.style.display = (zone.style.display === '' ? 'none' : '');
		};
		entete.appendChild(bouton);
		var style = 'margin:50px 0;text-align:center;font-family:Consolas,Monaco,Lucida Console,';
		style += 'Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;font-size:0.9em;display:none';
		zone.setAttribute('style', style);
		table.rows[document.querySelector('#' + id).rowIndex + 2].querySelector('tr[id*="reactions_"] td').appendChild(entete);
		table.rows[document.querySelector('#' + id).rowIndex + 2].querySelector('tr[id*="reactions_"] td').appendChild(zone);
		that.createZone(zone);
	};

	this.createZone = function(zone) {
		if(that.analyses.length === 0) {
			return document.createElement('div');
		}		
		var resultat_HTML = '',
			resultat_BBCode_FE = '',
			resultat_BBCode_FI = '';
			
		for(var n=0; n<that.analyse_textuelle.length; n++) {
			resultat_HTML += '|' + that.analyse_textuelle[n].HTML + '|<br>';
			resultat_BBCode_FE += that.analyse_textuelle[n].BBCode_FE;
			resultat_BBCode_FI += that.analyse_textuelle[n].BBCode_FI + '\n';
		}

		var raccourci_FE = document.createElement('div'),
			raccourci_FI = document.createElement('div'),
			zone_HTML = document.createElement('div'),
			contenu_FE = document.createElement('textarea'),
			contenu_FI = document.createElement('textarea');
			
		raccourci_FE.innerHTML = 'Copier sur un forum externe';
		raccourci_FI.innerHTML = 'Copier sur un forum Fourmizzz';
		contenu_FE.value = '[center][table]\n' + resultat_BBCode_FE + '[/table][/center]';
		contenu_FI.value = '[center][code]\n' + resultat_BBCode_FI + '\n[/code][/center]';
		raccourci_FE.setAttribute('style', 'text-align:center;font-weight:bold;margin:15px 0;cursor:pointer;');
		raccourci_FI.setAttribute('style', 'text-align:center;font-weight:bold;margin:15px 0;cursor:pointer;');
		contenu_FE.setAttribute('style', ' width: 80%;height: 150px;margin: 25px 0;display:none;');
		contenu_FI.setAttribute('style', ' width: 80%;height: 150px;margin: 25px 0;display:none;');
		zone_HTML.setAttribute('style', 'margin-top:50px;');
		
		zone_HTML.setAttribute('class', 'zzzelp_analyse_RC');
		zone_HTML.innerHTML = '<code>' + resultat_HTML + '</code>';
		
		raccourci_FE.onclick = function onclick(event) {
			contenu_FE.style.display = (contenu_FE.style.display === '' ? 'none' : '');
		};
		raccourci_FI.onclick = function onclick(event) {
			contenu_FI.style.display = (contenu_FI.style.display === '' ? 'none' : '');
		};
		
		zone.appendChild(zone_HTML);
		zone.appendChild(raccourci_FE);
		zone.appendChild(contenu_FE);	
		zone.appendChild(raccourci_FI);
		zone.appendChild(contenu_FI);
	};





	this.main();



}
function ZzzelpScriptAnalyseTextuelle(mode, valeurs, serveur) {

	var that = this;

	this.content = [];
	this.valeurs = valeurs;
	this.serveur = serveur;
	this.mode = mode;
	this.lieux_court = new Array('TDC', 'Dôme', 'Loge');

	this.main = function() {
		if(that.mode == 'combat') {
			that.mainCombat();
		}
		else if(that.mode == 'chasse') {
			that.mainChasse();
		}
	};

	/*
		Chasse
	*/

	this.mainChasse = function() {
		that.createEnteteChasse();
		that.createArmeeChasse();
		that.createStatistiquesChasse();
		that.createDetailsChasse();
	};

	this.createEnteteChasse = function() {
		that.separationLigne();
		that.createLigne(['<strong>TDC chassé</strong>', '<strong>:</strong>', '<strong>' + ze_Nombre(that.valeurs.TDC_chasse) + '</strong>']);
		that.createLigne(['<strong>Nourriture récoltée</strong>', '<strong>:</strong>', '<strong>' + ze_Nombre(that.valeurs.nourriture) + '</strong>']);
		that.createLigne(['<strong>Unités perdues</strong>', '<strong>:</strong>', '<strong>' + ze_Nombre(that.valeurs.attaquant.total_morts) + '</strong>']);
		that.separationLigne();
		that.createLigne(['<strong>Avant</strong>', '<strong>Après</strong>']);
		that.separationLigne();
	};

	this.createArmeeChasse = function() {
		that.createLigne(['<strong>Armées</strong>']);
		that.separationLigne();
		var ecart;
		for(var i=0;i<14;i++) {
			var nom = ZzzelpScriptArmee.noms_pluriel[i],
				valeur_avant = that.valeurs.attaquant.armee.getUnite(i),
				valeur_apres = that.valeurs.attaquant.armee_XP.getUnite(i);
			if(~[0,1,3,4,5,7,10,12].indexOf(i) && valeur_avant > 0) {
				ecart = '<strong>' + ze_Affichage_pourcentage(1+that.valeurs.attaquant.unites_XP[i]/valeur_avant, 3).toString().replace('+', '') + '% XP</strong>';
			}
			else {
				ecart = '';
			}

			that.createLigne([ze_Nombre(valeur_avant), nom, ze_Nombre(valeur_apres), ecart]);
		}
		that.separationLigne();		
	};

	this.createStatistiquesChasse = function() {
		that.createLigne(['<strong>Statistiques</strong>']);
		that.separationLigne();

		var attaque_avant = that.valeurs.attaquant.armee.getAttaqueAB(),
			attaque_apres = that.valeurs.attaquant.armee_XP.getAttaqueAB(),
			ecart_attaque = '<strong>(' + ze_Nombre_raccourci(attaque_apres-attaque_avant, 3) + ')</strong>';
		that.createLigne([ze_Nombre(attaque_avant), 'Attaque', ze_Nombre(attaque_apres), ecart_attaque]);

		var defense_avant = that.valeurs.attaquant.armee.getDefenseAB(),
			defense_apres = that.valeurs.attaquant.armee_XP.getDefenseAB(),
			ecart_defense = '<strong>(' + ze_Nombre_raccourci(defense_apres-defense_avant, 3) + ')</strong>';
		that.createLigne([ze_Nombre(defense_avant), 'Défense', ze_Nombre(defense_apres), ecart_defense]);

		var vie_avant = that.valeurs.attaquant.armee.getVieAB(),
			vie_apres = that.valeurs.attaquant.armee_XP.getVieAB(),
			ecart_vie = '<strong>(' + ze_Nombre_raccourci(vie_apres-vie_avant, 3) + ')</strong>';
		that.createLigne([ze_Nombre(vie_avant), 'Vie', ze_Nombre(vie_apres), ecart_vie]);

		var capa_flood_avant = that.valeurs.attaquant.armee.getCapaFlood(),
			capa_flood_apres = that.valeurs.attaquant.armee_XP.getCapaFlood(),
			ecart_capa_flood = '<strong>(' + ze_Nombre_raccourci(capa_flood_apres-capa_flood_avant, 3) + ')</strong>';
		that.createLigne([ze_Nombre(capa_flood_avant), 'Vie', ze_Nombre(capa_flood_apres), ecart_capa_flood]);

		that.separationLigne();
	};

	this.createDetailsChasse = function() {
		that.createLigne(['<strong>Détail des chasses</strong>']);
		that.separationLigne();
		that.createLigne(['<strong>TDC chassé</strong>', '<strong>Nourriture</strong>', '<strong>Morts</strong>', '<strong>Répl</strong>']);
		that.emptyLigne();
		for(var i=0; i<that.valeurs.details.length; i++) {
			var chasse = that.valeurs.details[i],
				TDC_chasse = ze_Nombre(chasse.valeurs.TDC_chasse),
				nourriture =  ze_Nombre(chasse.valeurs.nourriture),
				morts = ze_Nombre(chasse.valeurs.attaquant.total_morts),
				replique = (chasse.valeurs.replique*100);
			replique = (replique > 10) ? ('<strong>' + replique + '</strong>%') : (replique + '%');

			that.createLigne([TDC_chasse, nourriture, morts, replique]);
		}
		that.separationLigne();
	};


	/*
		Combat
	*/

	this.mainCombat = function() {
		that.createEnteteRC();
		that.createArmeeRC();
		that.createStatistiquesRC();
		that.createNiveauxRC();
		that.createXP();
	};

	this.getContent = function() {
		return that.content;
	};

	this.createEnteteRC = function() {
		var attaquant = (typeof this.serveur == 'undefined') ? that.valeurs.attaquant.pseudo : ze_Lien_profil(that.valeurs.attaquant.pseudo, serveur),
			defenseur = (typeof this.serveur == 'undefined') ? that.valeurs.defenseur.pseudo : ze_Lien_profil(that.valeurs.defenseur.pseudo, serveur);
		if(typeof valeurs.date != 'undefined') {
			that.separationLigne();
			that.createLigne([ze_Generation_date_v1(valeurs.date)]);
		}
		that.separationLigne();
		that.createLigne(['<strong>' + attaquant + '</strong>',  '<strong>' + defenseur + '</strong>']);
		that.separationLigne();
	};

	this.createArmeeRC = function() {
		that.createLigne(['<strong>Armée</strong>']);
		that.separationLigne();
		for(var i=0;i<14;i++) {
			var nom = ZzzelpScriptArmee.noms_pluriel[i],
				valeur_att = ze_Nombre(that.valeurs.attaquant.armee.getUnite(i)),
				valeur_def = ze_Nombre(that.valeurs.defenseur.armee.getUnite(i));
			that.createLigne([valeur_att, nom, valeur_def]);
		}
		that.separationLigne();
	};

	this.createStatistiquesRC = function() {
		var att_avant = that.valeurs.attaquant.armee.getStatistiquesAB(),
			att_apres = that.valeurs.attaquant.armee_XP.getStatistiquesAB(),
			def_avant = that.valeurs.defenseur.armee.getStatistiquesAB(),
			def_apres = that.valeurs.defenseur.armee_XP.getStatistiquesAB();

		var att_attaque = ' (' + ze_Affichage_pourcentage(att_apres.attaque/att_avant.attaque) + '%)',
			def_attaque = '(' + ze_Affichage_pourcentage(def_apres.attaque/def_avant.attaque) + '%) ',
			att_defense = ' (' + ze_Affichage_pourcentage(att_apres.defense/att_avant.defense) + '%)',
			def_defense = '(' + ze_Affichage_pourcentage(def_apres.defense/def_avant.defense) + '%) ',
			att_vie = ' (' + ze_Affichage_pourcentage(att_apres.vie/att_avant.vie) + '%)',
			def_vie = '(' + ze_Affichage_pourcentage(def_apres.vie/def_avant.vie) + '%) ';

		var pertes_att = att_avant.HOF - that.valeurs.attaquant.armee_apres.getHOF(),
			pertes_def = def_avant.HOF - that.valeurs.defenseur.armee_apres.getHOF();

		that.createLigne(['<strong>Statistiques</strong>']);
		that.separationLigne();
		that.createLigne([ze_Nombre(that.valeurs.attaquant.total_morts),'Morts',ze_Nombre(that.valeurs.defenseur.total_morts)]);
		that.separationLigne();
		that.createLigne([ze_Nombre(att_avant.attaque), 'Attaque (avant)', ze_Nombre(def_avant.attaque)]);
		that.createLigne([ze_Nombre(att_avant.defense), 'Défense (avant)', ze_Nombre(def_avant.defense)]);
		that.createLigne([ze_Nombre(att_avant.vie), 'Vie (avant)', ze_Nombre(def_avant.vie)]);
		that.separationLigne();
		that.createLigne([ze_Nombre(att_apres.attaque) + att_attaque, 'Attaque (après)', def_attaque + ze_Nombre(def_apres.attaque)]);
		that.createLigne([ze_Nombre(att_apres.defense) + att_defense, 'Défense (après)', def_defense + ze_Nombre(def_apres.defense)]);
		that.createLigne([ze_Nombre(att_apres.vie) + att_vie, 'Vie (après)', def_vie + ze_Nombre(def_apres.vie)]);
		that.separationLigne();
		
		that.createLigne(['<strong>Hall of Fame</strong>']);
		that.separationLigne();
		that.createLigne([ze_Secondes_date(pertes_att),'',ze_Secondes_date(pertes_def)]);
		that.createLigne([ze_Secondes_date(pertes_att + pertes_def)]);
		that.separationLigne();
	};

	this.createNiveauxRC = function() {
		that.createLigne(['<strong>Niveaux</strong>']);
		that.separationLigne();
		that.createLigne([that.valeurs.attaquant.armee.getArmes(), 'Armes', that.valeurs.defenseur.armee.getArmes()]);
		that.createLigne([that.valeurs.attaquant.armee.getBouclier(), 'Bouclier', that.valeurs.defenseur.armee.getBouclier()]);
		that.createLigne([that.valeurs.attaquant.armee.getNiveauLieu(), that.lieux_court[that.valeurs.lieu], that.valeurs.defenseur.armee.getNiveauLieu()]);
		that.separationLigne();
	};

	this.createXP = function() {
		if(that.valeurs.attaquant.unites_XP.length > 0 || that.valeurs.defenseur.unites_XP.length > 0) {
			that.createLigne(['<font color="#088A4B"><strong>XP prise en compte</strong></font>']);
		}
		else {
			that.createLigne(['<font color="#FF0000"><strong>XP non prise en compte</strong></font>']);
		}
		that.separationLigne();
	};

	this.separationLigne = function() {
		that.pushLine({ HTML : str_repeat('-', 94), BBCode_FE : '[tr][td colspan="4"][hr][/td][/tr]', BBCode_FI : str_repeat('-', 94) });
	};

	this.emptyLigne = function() {
		that.pushLine({ HTML : str_repeat('&nbsp', 94), BBCode_FE : '', BBCode_FI : str_repeat(' ', 94) });
	};

	this.pushLine = function(line) {
		that.content.push(line);
	};

	this.createLigne = function(d) {
		var functions = new Array(that.createLigneOne, that.createLigneTwo, that.createLigneThree, that.createLigneFour),
			data = functions[d.length-1](d);
		data.HTML = '&nbsp&nbsp' + data.HTML + '&nbsp&nbsp';
		data.BBCode_FI = '  ' + data.BBCode_FI + '  ';
		data.BBCode_FE = '[tr]' + data.BBCode_FE + '[/tr]';
		that.pushLine(data);
	};

	this.createLigneOne = function(d) {
		var n1 = ze_Nettoyage_HTML(d[0]),
			s1 = Math.floor((90-n1.length))/2,
			s2 = Math.ceil((90-n1.length)/2);
		return {
			HTML : str_repeat('&nbsp', s1) + d[0] + str_repeat('&nbsp', s2),
			BBCode_FI : str_repeat(' ', s1) + ze_HTML_to_BBcode(d[0]) + str_repeat(' ', s2),
			BBCode_FE : '[td colspan="4"][center]' + ze_HTML_to_BBcode(d[0], false) + '[/center][/td]'
		};

	};

	this.createLigneTwo = function(d) {
		var n1 = ze_Nettoyage_HTML(d[0]),
			n2 = ze_Nettoyage_HTML(d[1]),
			s1 = Math.ceil((45-n1.length)/2),
			s2 = Math.floor((45 - n1.length)/2) + Math.floor((45 - n2.length)/2),
			s3 = Math.ceil((45-n2.length)/2);
		var BBCode_FE = '[td][center]' + ze_HTML_to_BBcode(d[0], false) + '[/center][/td][td][/td]';
		BBCode_FE += '[td colspan="2"][center]' + ze_HTML_to_BBcode(d[1], false) + '[/center][/td]';

		return {
			HTML : str_repeat('&nbsp', s1) + d[0] + str_repeat('&nbsp', s2) + d[1] + str_repeat('&nbsp', s3),
			BBCode_FI : str_repeat(' ', s1) + ze_HTML_to_BBcode(d[0]) + str_repeat(' ', s2) + ze_HTML_to_BBcode(d[1]) + str_repeat(' ', s3),
			BBCode_FE : BBCode_FE
		};
	};		

	this.createLigneThree = function(d) {
		var n1 = ze_Nettoyage_HTML(d[0]),
			n2 = ze_Nettoyage_HTML(d[1]),
			n3 = ze_Nettoyage_HTML(d[2]),
			s1 = Math.ceil((30-n1.length)/2) + Math.floor((30-n1.length)/2) + Math.floor((30-n2.length)/2),
			s2 = Math.ceil((30-n2.length)/2) + Math.floor((30-n3.length)/2) + Math.ceil((30-n3.length)/2);
		
		var BBCode_FE = '[td][left]' + ze_HTML_to_BBcode(d[0], false) + '[/left][/td][td][center]';
		BBCode_FE += ze_HTML_to_BBcode(d[1], false) + '[/center][/td][td colspan="2"][right]' + ze_HTML_to_BBcode(d[2], false) + '[/right][/td]';

		return {
			HTML : d[0] + str_repeat('&nbsp', s1) + d[1] + str_repeat('&nbsp', s2) + d[2],
			BBCode_FI : ze_HTML_to_BBcode(d[0]) + str_repeat(' ', s1) + ze_HTML_to_BBcode(d[1]) + str_repeat(' ', s2) + ze_HTML_to_BBcode(d[2]),
			BBCode_FE : BBCode_FE
		};
	};

	this.createLigneFour = function(d) {
		var n1 = ze_Nettoyage_HTML(d[0]),
			n2 = ze_Nettoyage_HTML(d[1]),
			n3 = ze_Nettoyage_HTML(d[2]),
			n4 = ze_Nettoyage_HTML(d[3]),
			s1 = Math.ceil((26-n1.length)/2) + Math.floor((26-n1.length)/2) + Math.floor((26-n2.length)/2),
			s2 = Math.ceil((26-n2.length)/2) + Math.floor((26-n3.length)/2) + Math.ceil((26-n3.length)/2),
			s3 = 10-n4.length;

		var BBCode_FI = ze_HTML_to_BBcode(d[0]) + str_repeat(' ', s1) + ze_HTML_to_BBcode(d[1]) + str_repeat(' ', s2);
		BBCode_FI += ze_HTML_to_BBcode(d[2]) + str_repeat(' ', s3) + ze_HTML_to_BBcode(d[3]) + str_repeat(' ', 2);

		var BBCode_FE = '[td][left]' + ze_HTML_to_BBcode(d[0], false) + '[/left][/td][td][center]' + ze_HTML_to_BBcode(d[1], false);
		BBCode_FE += '[/center][/td][td][right]' + ze_HTML_to_BBcode(d[2], false) + '[/right][/td][td]' + ze_HTML_to_BBcode(d[3]) + '[/td]';

		return {
			HTML : d[0] + str_repeat('&nbsp', s1) + d[1] + str_repeat('&nbsp', s2) + d[2] + str_repeat('&nbsp', s3) + d[3] + str_repeat('&nbsp', 2),
			BBCode_FI : BBCode_FI,
			BBCode_FE : BBCode_FE
		};
	};

	this.main();
}

function ZzzelpScriptZoneHOF(RC, valeurs, nouveau, guerre) {

	var that = this;
	this.RC = RC;
	this.valeurs = valeurs;
	this.nouveau = nouveau;
	this.guerre = guerre;

	this.main = function() {
		that.entetes = that.createEnteteDict();
		that.data = that.createDict();

		that.createMainZone();
		that.createEntete();
		that.createHOF();

		if(that.nouveau && that.guerre) {
			that.createButtonSave();
			that.createLigneRC();
		}

		for(var section in that.data) {
			var conteneur = document.createElement('div');
			conteneur.setAttribute('style', 'display:inline-block;width:300px;margin:22px;vertical-align:top');
			for(var categorie in that.data[section]) {
				that.createCategorie(conteneur, section, categorie);
			}
			if(that.guerre) {
				var stockage_armee = document.createElement('a');
				stockage_armee.className = 'bouton_guerre';
				stockage_armee.innerHTML = 'Enregistrer l\'armée';
				stockage_armee.setAttribute('style', 'width: 180px;display: block;margin: auto;');
				stockage_armee.dataset.joueur = section;
				stockage_armee.onclick = that.saveArmee;
				conteneur.appendChild(stockage_armee);
			}
			that.zone.appendChild(conteneur);
		}
		that.createZoneExport();
	};

	this.getZone = function() {
		return that.zone;
	};


	/*
		Creation of the dictionnaries
	*/
	this.createDict = function() {
		return {
			attaquant : that.createDictAttaquant(),
			defenseur : that.createDictDefenseur()
		};
	};

	this.createDictAttaquant = function() {
		var armee_avant = that.valeurs.attaquant.armee,
			armee_apres = that.valeurs.attaquant.armee_XP;
		return {
			niveaux : {
				nom : 'Niveaux de l\'attaquant',
				lignes : new Array(
					{ nom : 'Armes', type : 'input', largeur : 'input_niveau', 
					  valeur : armee_avant.getArmes(), importable : (armee_avant.getArmes() > 0), id : 'armes' },
					{ nom : 'Bouclier', type : 'input', largeur : 'input_niveau', 
					  valeur : armee_avant.getBouclier(), importable : (armee_avant.getBouclier() > 0), id : 'bouclier' }
				)
			},
			avant : {
				nom : 'Attaquant avant le combat',
				lignes : new Array(
					{ nom : 'Attaque (AB)', type : 'span', valeur : ze_Nombre(armee_avant.getAttaqueAB()) },
					{ nom : 'Défense (AB)', type : 'span', valeur : ze_Nombre(armee_avant.getDefenseAB()) },
					{ nom : 'Vie (AB)', type : 'span', valeur : ze_Nombre(armee_avant.getVieAB()) },
					{ nom : 'Capacité de flood', type : 'span', valeur : ze_Nombre(armee_avant.getCapaFlood()) },
					{ nom : 'Années de ponte', type : 'span', valeur : ze_Nombre(armee_avant.getHOFAnnees()) + ' années'},
					{ nom : '', type : 'armee', valeur : armee_avant }
				)
			},
			apres : {
				nom : 'Attaquant après le combat',
				lignes : new Array(
					{ nom : 'Attaque (AB)', type : 'span', valeur : ze_Nombre(armee_apres.getAttaqueAB()) },
					{ nom : 'Défense (AB)', type : 'span', valeur : ze_Nombre(armee_apres.getDefenseAB()) },
					{ nom : 'Vie (AB)', type : 'span', valeur : ze_Nombre(armee_apres.getVieAB()) },
					{ nom : 'Capacité de flood', type : 'span', valeur : ze_Nombre(armee_apres.getCapaFlood()) },
					{ nom : 'Années de ponte', type : 'span', valeur : ze_Nombre(armee_apres.getHOFAnnees()) + ' années'},
					{ nom : '', type : 'armee', valeur : armee_apres }
				)
			}
		};
	};

	this.createDictDefenseur = function() {
		var armee_avant = that.valeurs.defenseur.armee,
			armee_apres = that.valeurs.defenseur.armee_XP,
			def = {
			niveaux : {
				nom : 'Niveaux du défenseur',
				lignes : new Array(
					{ nom : 'Armes', type : 'input', largeur : 'input_niveau', 
					  valeur : armee_avant.getArmes(), importable : (armee_avant.getArmes() > 0), id : 'armes' },
					{ nom : 'Bouclier', type : 'input', largeur : 'input_niveau', 
					  valeur : armee_avant.getBouclier(), importable : (armee_avant.getBouclier() > 0), id : 'bouclier' }
				)
			},
			avant : {
				nom : 'Défenseur avant le combat',
				lignes : new Array(
					{ nom : 'Attaque (AB)', type : 'span', valeur : ze_Nombre(armee_avant.getAttaqueAB()) },
					{ nom : 'Défense (AB)', type : 'span', valeur : ze_Nombre(armee_avant.getDefenseAB()) },
					{ nom : 'Vie (AB)', type : 'span', valeur : ze_Nombre(armee_avant.getVieAB()) },
					{ nom : 'Capacité de flood', type : 'span', valeur : ze_Nombre(armee_avant.getCapaFlood()) },
					{ nom : 'Années de ponte', type : 'span', valeur : ze_Nombre(armee_avant.getHOFAnnees()) + ' années'},
					{ nom : '', type : 'armee', valeur : armee_avant }
				)
			},
			apres : {
				nom : 'Défenseur après le combat',
				lignes : new Array(
					{ nom : 'Attaque (AB)', type : 'span', valeur : ze_Nombre(armee_apres.getAttaqueAB()) },
					{ nom : 'Défense (AB)', type : 'span', valeur : ze_Nombre(armee_apres.getDefenseAB()) },
					{ nom : 'Vie (AB)', type : 'span', valeur : ze_Nombre(armee_apres.getVieAB()) },
					{ nom : 'Capacité de flood', type : 'span', valeur : ze_Nombre(armee_apres.getCapaFlood()) },
					{ nom : 'Années de ponte', type : 'span', valeur : ze_Nombre(armee_apres.getHOFAnnees()) + ' années'},
					{ nom : '', type : 'armee', valeur : armee_apres }
				)
			}
		};
		if(that.valeurs.lieu > 0) {
			def.niveaux.lignes.push({ 
				nom : ((that.valeurs.lieu == 1) ? 'Dôme' : 'Loge Impériale'), 
				type : 'input', largeur : 'input_niveau', 
				valeur : armee_avant.getNiveauLieu(),
				importable : (armee_avant.getNiveauLieu() > 0),
				id : ((that.valeurs.lieu == 1) ? 'dome' : 'loge')
			});		
		}
		return def;
	};


	/*
		Creation of the interface
	*/
	this.createMainZone = function() {
		var zone = document.createElement('div');
		if(that.nouveau) {
			zone.setAttribute('style', 'margin:29px;padding:10px;border: 1px solid black;background: rgba(200,200,200,0.6);');
		}
		else {
			zone.setAttribute('style', 'margin:10px -10px;padding:10px;');
		}
		that.zone = zone;	
	};

	this.createEntete = function() {
		var zone_entete = document.createElement('div');
		zone_entete.setAttribute('style', 'width: 400px;margin: 15px auto 30px auto;');
		for(var i=0; i<that.entetes.length; i++) {
			var ligne = document.createElement('div'),
				span = document.createElement('span'),
				input = document.createElement('input');
			ligne.className = 'ligne_cadre_structure';
			span.innerHTML = that.entetes[i].nom + ' :';
			input.type = 'text';
			input.value = that.entetes[i].valeur;
			input.id = that.entetes[i].id;
			ligne.appendChild(span);
			ligne.appendChild(input);
			zone_entete.appendChild(ligne);
		}
		that.zone.appendChild(zone_entete);
	};

	this.createHOF = function() {
		var zone_HOF = document.createElement('div');
		zone_HOF.setAttribute('style', 'width: 400px;margin:auto;');
		var ligne = document.createElement('div');
		ligne.className = 'ligne_cadre_structure';
		ligne.setAttribute('style', 'text-align: center;');
		ligne.innerHTML = 'HOF : <b>' + ze_Secondes_date(that.valeurs.HOF, false) + '</b>';
		zone_HOF.appendChild(ligne);
		that.zone.appendChild(zone_HOF);		
	};

	this.createButtonSave = function() {
		var bouton = document.createElement('a');
		bouton.className = 'bouton_guerre';
		bouton.innerHTML = 'Enregistrer';
		bouton.setAttribute('style', 'width: 100px;margin: auto;display: block;text-align:center;');
		bouton.onclick = function onclick(event) {
			that.saveRC();
		}; 
		that.zone.appendChild(bouton);
	};

	this.createLigneRC = function(RC) {
		var ligne_RC = document.createElement('div');
		ligne_RC.className = 'ligne_cadre_structure';
		ligne_RC.setAttribute('style', 'height:auto;text-align:center;line-height:inherit;');
		ligne_RC.innerHTML = that.RC.join('<br>');
		that.zone.appendChild(ligne_RC);
	};

	this.createCategorie = function(conteneur, section, categorie) {
		var data = that.data[section][categorie],
			entete = that.createEnteteCategorie(data, conteneur);
			sous_zone = document.createElement('div');
		sous_zone.setAttribute('style', 'display:none');
		for(i=0; i<data.lignes.length; i++) {
			var donnee = data.lignes[i];
			if(donnee.type == 'armee') {
				for(var k=0; k<14; k++) {
					if(donnee.valeur.unites[k] > 0) {
						sous_zone.appendChild(that.createLigneArmee(donnee, k, section, categorie));
					}
				}
			}
			else {
				sous_zone.appendChild(that.createLigneNonArmee(donnee, section));
			}
		}
		conteneur.appendChild(sous_zone);			
	};

	this.createEnteteCategorie = function(data, conteneur) {
		var	entete = document.createElement('div');
		entete.onclick = function onclick(event) {
			this.nextSibling.style.display = (this.nextSibling.style.display == 'none') ? '' : 'none';
		};
		entete.innerHTML = data.nom;
		entete.className = 'entete_menu_cache';
		conteneur.appendChild(entete);
	};

	this.createLigneArmee = function(donnee, k, section, categorie) {
		var	ligne = document.createElement('div'),
			label = document.createElement('span'),
			input = document.createElement('span');
		ligne.className = 'ligne_cadre_structure';
		ligne.dataset.section = 'armee_' + section + '_' + categorie;
		label.innerHTML = ZzzelpScriptArmee.TAGs[k] + ' :';
		input.className = 'input_fige';
		input.innerHTML = ze_Nombre(donnee.valeur.unites[k]);
		ligne.appendChild(label);
		ligne.appendChild(input);
		return ligne;
	};

	this.createLigneNonArmee = function(donnee, section) {
		var	ligne = document.createElement('div'),
			label = document.createElement('span'),
			input;
		ligne.className = 'ligne_cadre_structure';
		label.innerHTML = donnee.nom + ' :';
		if(donnee.type == 'input') {
			input = document.createElement('input');
			input.className = donnee.largeur;
			input.value = donnee.valeur;
		}
		else if(donnee.type == 'span') {
			input = document.createElement('span');
			input.className = 'input_fige';
			input.innerHTML = donnee.valeur;
		}
		ligne.appendChild(label);
		ligne.appendChild(input);
		if(that.guerre && donnee.importable) {
			var img = document.createElement('img');
			img.src = url_zzzelp + '/Images/plus.png';
			img.dataset.nom = donnee.id;
			img.dataset.joueur = section;
			img.setAttribute('style', 'margin-right: 5px;height: 1.8em;cursor:pointer;');
			img.onclick = function onclick(event) {
				var pseudo = this.parentNode.parentNode.parentNode.parentNode.querySelector('#' + this.dataset.joueur).value,
					valeur = this.parentNode.querySelector('input').value;
				if(pseudo == document.querySelector('.modal_zzzelp').dataset.pseudo) {
					document.querySelector('.ligne_armee input[data-nom="' + this.dataset.nom + '"]').value = valeur;
				}
				if(pseudo !== '') {
					MAJ_niveau_joueur(pseudo, this.dataset.nom, valeur, this);
				}
			};
			ligne.appendChild(img);
		}
		return ligne;	
	};

	this.createZoneExport = function() {
		var lignes = new ZzzelpScriptAnalyseTextuelle('combat', that.valeurs).getContent(),
			resultat_BBCode_FE = '',
			resultat_BBCode_FI = '';
			
		for(var n=0; n<lignes.length; n++) {
			resultat_BBCode_FE += lignes[n].BBCode_FE;
			resultat_BBCode_FI += '|' + lignes[n].BBCode_FI + '|\n';
		}

		var raccourci_FE = document.createElement('div'),
			raccourci_FI = document.createElement('div'),
			contenu_FE = document.createElement('textarea'),
			contenu_FI = document.createElement('textarea');
			
		raccourci_FE.innerHTML = 'Copier sur un forum externe';
		raccourci_FI.innerHTML = 'Copier sur un forum Fourmizzz';
		contenu_FE.value = that.RC.join("\n") + '\n\n[center][table]\n' + resultat_BBCode_FE + '[/table][/center]';
		contenu_FI.value = that.RC.join("\n") + '\n\n\n[center][code]\n' + resultat_BBCode_FI + '\n[/code][/center]';
		raccourci_FE.setAttribute('style', 'text-align:center;font-weight:bold;margin:15px 0;cursor:pointer;');
		raccourci_FI.setAttribute('style', 'text-align:center;font-weight:bold;margin:15px 0;cursor:pointer;');
		contenu_FE.setAttribute('style', ' width: 80%;height: 150px;margin: 25px auto;display:none;display: block;');
		contenu_FI.setAttribute('style', ' width: 80%;height: 150px;margin: 25px auto;display:none;display: block;');
		
		raccourci_FE.onclick = function onclick(event) {
			contenu_FE.style.display = (contenu_FE.style.display === '' ? 'none' : '');
		};
		raccourci_FI.onclick = function onclick(event) {
			contenu_FI.style.display = (contenu_FI.style.display === '' ? 'none' : '');
		};
		
		that.zone.appendChild(raccourci_FE);
		that.zone.appendChild(contenu_FE);	
		that.zone.appendChild(raccourci_FI);
		that.zone.appendChild(contenu_FI);	
	};


	this.createEnteteDict = function() {
		var pseudo_defaut = '';
		return new Array(
			{ 
				nom : 'Date du combat', 
				valeur : ((typeof that.valeurs.date != 'undefined') ? ze_Generation_date_v1(that.valeurs.date, true) : ''), 
				id : 'date' 
			},{ 
				nom : 'Pseudo de l\'attaquant', 
				valeur : ((typeof that.valeurs.attaquant.pseudo != 'undefined') ? that.valeurs.attaquant.pseudo : pseudo_defaut), 
				id : 'attaquant'
			},{ 
				nom : 'Pseudo du défenseur', 
				valeur : ((typeof that.valeurs.defenseur.pseudo != 'undefined') ? that.valeurs.defenseur.pseudo : pseudo_defaut), 
				id : 'defenseur'
			}
		);	
	};


	/*
		Storage of the data on Zzzelp
	*/
	this.saveArmee = function(event) {
		var pseudo = this.parentNode.parentNode.querySelector('#' + this.dataset.joueur).value,
			date = ze_Date_to_timestamp_v1(this.parentNode.parentNode.querySelector('#date').value);
		if(pseudo !== '' && date > 0) {
			var	elements = this.parentNode.querySelectorAll('div[data-section="armee_' + this.dataset.joueur + '_apres"]'),
				armee = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
			for(var k=0; k<elements.length; k++) {
				var i = ZzzelpScriptArmee.TAGs.indexOf(elements[k].querySelectorAll('span')[0].innerHTML.replace(':', '').trim()); 
				armee[i] = parseInt(elements[k].querySelectorAll('span')[1].innerHTML.replace(/ /g, ''));
			}
			var url_ajax = 'mode=stockage_armee&cible=' + pseudo + '&armee=[' + armee + ']&date_armee=' + date + '&';
			new ZzzelpScriptAjax( ZzzelpScriptModalGuerre.chooseAjaxParam({ method : 'GET', url : url_ajax }, that.pseudo),
				{ success : function(valeurs) {
					var inputs = document.querySelectorAll('.ligne_armee .input_tableau[data-donnee="armee"]');
					for(var k=0; k<14; k++) {
						inputs[k].value = ze_Nombre(armee[k]);
					}
					document.querySelector('#date_MAJ_armee').value = ze_Generation_date_v1(date, 1);
				}
			});
		}
		else {
			console.log('Date inconnue');
		}	
	};

	this.saveRC = function() {
		var valeurs = that.valeurs;
		valeurs.date = ze_Date_to_timestamp_v1(that.zone.querySelector('#date').value);
		valeurs.attaquant.pseudo = that.zone.querySelector('#attaquant').value;
		valeurs.defenseur.pseudo = that.zone.querySelector('#defenseur').value;
		var	form = new FormData();
		form.append('RC', JSON.stringify(that.RC));
		form.append('valeurs', JSON.stringify(that.valeurs));
		var data = { method : 'POST', url : 'mode=stockage_RC&', data : form };
		new ZzzelpScriptAjax( ZzzelpScriptModalGuerre.chooseAjaxParam(data, that.pseudo), {});
	};

	this.main();

}
function ZzzelpScriptArmee(unites, niveaux, mode) {
	
	var armee = this;
	this.mode = (typeof mode == 'undefined') ? 'armee' : 'chasse';
	this.length = (this.mode == 'armee') ? 14 : 17;
	
	this.new_armee = function() {
		return new ZzzelpScriptArmee(ZzzelpScriptArmee.getEmptyArmee(armee.length), armee.niveaux);
	};

	this.copy = function() {
		return new ZzzelpScriptArmee(JSON.parse(JSON.stringify(armee.unites)), JSON.parse(JSON.stringify(armee.niveaux)));
	};

	this.extraction_armee = function (n) {
		var armee_2 = armee.new_armee(),
			i = 0, k = 0;
		while (i<n) {
			if(i + armee.unites[armee.length-1-k] <= n) {
				i += armee.unites[armee.length-1-k];
				armee_2.unites[armee.length-1-k] = armee.unites[armee.length-1-k];
			}
			else {
				armee_2.unites[armee.length-1-k] = n - i;
				i = n;
			}
			k++;
		}
		return armee_2;
	};

	this.armeePostCombat = function(morts) {
		return armee.extraction_armee(armee.getCapaFlood() - morts);	
	};

	this.noXP = function() {
		var a = armee.unites,
			unites = [a[0]+a[1]+a[2],0,0,a[3]+a[4]+a[9],0,a[5]+a[6],0,a[7]+a[8],0,0,a[10]+a[11],0,a[12]+a[13],0];
		return new ZzzelpScriptArmee(unites, armee.niveaux);
	};

	this.XP = function(JSN) {
		return JSN ? this.XPavecJSN() : this.XPsansJSN();
	};

	this.XPavecJSN = function() {
		var a = armee.unites,
			unites = [0,0,a[0]+a[1]+a[2],0,0,0,a[5]+a[6],0,a[7]+a[8],a[3]+a[4]+a[9],0,a[10]+a[11],0,a[12]+a[13]];
		return new ZzzelpScriptArmee(unites, armee.niveaux);
	};

	this.XPsansJSN = function() {
		var a = armee.unites,
			unites = [a[0],0,a[1]+a[2],0,0,0,a[5]+a[6],0,a[7]+a[8],a[3]+a[4]+a[9],0,a[10]+a[11],0,a[12]+a[13]];
		return new ZzzelpScriptArmee(unites, armee.niveaux);
	};

	this.isXP = function() {
		for(var i=0; i<armee.length; i++) {
			if(ZzzelpScriptArmee.unites_XP && armee.getUnite(i) > 0) {
				return false;
			}
		}
		return true;
	};

	this.isNull = function() {
		return (armee.getCapaFlood() === 0);
	};

	this.isDead = function(kill) {
		return (armee.getCapaFlood() <= kill);
	};

	this.getUnite = function(unite) {
		return armee.unites[unite];
	};

	this.setUnite = function(unite, valeur) {
		armee.unites[unite] = valeur;
	};

	this.addUnite = function(unite, valeur) {
		armee.unites[unite] += valeur;
	};

	this.getAttaqueHB = function() {
		var attaque = 0,
			coeffs = ZzzelpScriptArmee.attaque;
		for(var i=0;i<armee.length;i++) {
			attaque += armee.unites[i]*coeffs[i];
		}
		return attaque;
	};

	this.getVieHB = function() {
		var vie = 0,
			coeffs = ZzzelpScriptArmee.vie;
		for(var i=0;i<armee.length;i++) {
			vie += armee.unites[i]*coeffs[i];
		}
		return vie;
	};

	this.getDefenseHB = function() {
		var defense = 0,
			coeffs = ZzzelpScriptArmee.defense;
		for(var i=0;i<armee.length;i++) {
			defense += armee.unites[i]*coeffs[i];
		}
		return defense;
	};

	this.getCapaFlood = function() {
		var capa_flood = 0;
		for(var i=0;i<armee.length;i++) {
			capa_flood += armee.unites[i];
		}
		return capa_flood;
	};

	this.getConsommation = function() {
		var consommation = 0,
			coeffs = ZzzelpScriptArmee.consommation,
			pourcentages = [0.05,0.1,0.15];
		for(var i=0;i<armee.length;i++) {
			consommation += armee.unites[i]*coeffs[i]*pourcentages[this.niveaux.lieu];
		}
		return parseInt(consommation);
	};

	this.getHOF = function() {
		var secondes = 0,
			coeffs = ZzzelpScriptArmee.HOF;
		for(var i=0;i<armee.length;i++) {
			secondes += armee.unites[i]*coeffs[i];
		}
		return secondes;
	};

	this.getHOFAnnees = function() {
		return parseInt(this.getHOF()/31557600);
	};

	this.getVieAB = function() {
		if(armee.niveaux.lieu === 0) {
			return parseInt(this.getVieHB() * (1+0.1*armee.niveaux.bouclier));
		}
		else if(armee.niveaux.lieu == 1) {
			return parseInt(this.getVieHB() * (1+0.05*(armee.niveaux.niveau_lieu+2) + 0.1*armee.niveaux.bouclier));
		}
		else {
			return parseInt(this.getVieHB() * (1+0.15*(armee.niveaux.niveau_lieu+2) + 0.1*armee.niveaux.bouclier));
		}	
	};

	this.getAttaqueAB = function() {
		return parseInt(this.getAttaqueHB() * (1+armee.niveaux.armes*0.1));
	};

	this.getDefenseAB = function() {
		return parseInt(this.getDefenseHB() * (1+armee.niveaux.armes*0.1));
	};

	this.getStatistiquesAB = function() {
		return {
			attaque : this.getAttaqueAB(),
			defense : this.getDefenseAB(),
			vie : this.getVieAB(),
			capa_flood : this.getCapaFlood(),
			HOF : this.getHOF()
		};
	};

	this.logStatistiques = function() {
		armee.statistiques = armee.getStatistiquesAB();
	};

	this.getArmes = function() {
		return armee.niveaux.armes;
	};

	this.getBouclier = function() {
		return armee.niveaux.bouclier;
	};

	this.getNiveauLieu = function() {
		return armee.niveaux.niveau_lieu;
	};

	this.getLieu = function() {
		return armee.niveaux.lieu;
	};

	this.getVitesseChasse = function() {
		return armee.niveaux.vitesse_chasse;
	};


	/*
		Gestion des niveaux
	*/
	this.getDefaultLevels = function() {
		return {
			armes : 0,
			bouclier : 0,
			lieu : 0,
			niveau_lieu : 0,
			vitesse_chasse : 0
		};
	};

	this.setArmes = function(niv) {
		armee.niveaux.armes = niv;	
	};

	this.setBouclier = function(niv) {
		armee.niveaux.bouclier = niv;
	};

	this.setNiveauLieu = function(niv) {
		armee.niveaux.niveau_lieu = niv;
	};

	this.setLieu = function(niv) {
		armee.niveaux.lieu = niv;
	};

	this.setVitesseChasse = function(niv) {
		armee.niveaux.vitesse_chasse = niv;
	};

	this.computeArmes = function(degats) {
		armee.niveaux.armes = (degats.HB > 9) ? Math.round(10*(degats.bonus/degats.HB)) : 0;
	};

	this.computeNiveauxVie = function(morts, degats) {
		var vie_tuee = armee.getViePerdue(morts, armee);
		if(vie_tuee > 0) {
			if(this.getLieu() === 0) {
				armee.setBouclier(Math.round((((degats.HB + degats.bonus) / vie_tuee) - 1) * 10));
			}
			else {
				armee.computeNiveauxVieHorsTDC(morts, degats, vie_tuee);
			}
		}
	};

	this.computeNiveauxVieHorsTDC = function(morts, degats, vie_tuee) {
		var lieu = armee.niveaux.lieu;
		for(var ecart = 0; ecart<5; ecart++) {
			for(i=-1; i<2; i+=2) {
				if(ecart > 0 || i == 1) {
					var bouclier = armee.getArmes() + ecart*i,
						niveau_lieu = (((degats.HB + degats.bonus) / vie_tuee) - 1 - bouclier * 0.1) / ((lieu == 1) ? 0.05 : 0.15) - 2;
					if (Math.abs(niveau_lieu - Math.round(niveau_lieu)) < 0.1 && niveau_lieu <= 45) {
						armee.setBouclier(bouclier); 
						armee.setNiveauLieu(Math.round(niveau_lieu));
						break;
					}
				}
			}
		}
	};

	this.computeReplique = function(vie_def) {
		var attaque = armee.getAttaqueAB();
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


	this.getViePerdue = function(morts) {
		var vie = 0,
			n = morts;
		for(var i=0;i<armee.length;i++) {
			if(n > armee.unites[i]) {
				vie += armee.unites[i]*ZzzelpScriptArmee.vie[i];
				n -= armee.unites[i];
			}
			else if(n > 0) {
				vie += (n+0.5)*(ZzzelpScriptArmee.vie[i]);
				n = 0;
			}
		}
		return vie;
	};


	/*
		Gestion de l'XP
	*/
	this.applyXP = function(XPs) {
		var unites = armee.unites.slice(),
			armee_XP = armee.copy();
		for(var i=0; i<XPs.length; i++) {
			armee_XP.unites[XPs[i].avant] -= XPs[i].nombre;
			armee_XP.unites[XPs[i].apres] += XPs[i].nombre;
		}
		return armee;
	};

	this.unites = (unites ? unites : ZzzelpScriptArmee.getEmptyArmee(armee.length));
	this.niveaux = (niveaux ? niveaux : armee.getDefaultLevels());
}

ZzzelpScriptArmee.noms_singulier = new Array(
	"Jeune Soldate Naine", "Soldate Naine", "Naine d’Elite", "Jeune Soldate", "Soldate", "Concierge", "Concierge d’élite", 
	"Artilleuse", "Artilleuse d’élite", "Soldate d’élite", "Tank", "Tank d’élite", "Tueuse",  "Tueuse d’élite");
ZzzelpScriptArmee.noms_pluriel = new Array(
	"Jeunes Soldates Naines", "Soldates Naines", "Naines d’Elites", "Jeunes Soldates", "Soldates", "Concierges", "Concierges d’élites", 
	"Artilleuses", "Artilleuses d’élites", "Soldates d’élites", "Tanks", "Tanks d’élites", "Tueuses",  "Tueuses d’élites");
ZzzelpScriptArmee.ex_noms_singulier = new Array(
	"Jeune Soldate Naine", "Soldate Naine", "Naine d'Elite", "Jeune Soldate", "Soldate", "Concierge", "Concierge d'élite", 
	"Artilleuse", "Artilleuse d'élite", "Soldate d'élite", "Tank", "Tank d'élite", "Tueuse",  "Tueuse d'élite");
ZzzelpScriptArmee.ex_noms_pluriel = new Array(
	"Jeunes Soldates Naines", "Soldates Naines", "Naines d'Elites", "Jeunes Soldates", "Soldates", "Concierges", "Concierges d'élites", 
	"Artilleuses", "Artilleuses d'élites", "Soldates d'élites", "Tanks", "Tanks d'élites", "Tueuses",  "Tueuses d'élites");
ZzzelpScriptArmee.TAGs = new Array('JSN', 'SN', 'NE', 'JS', 'S', 'C', 'CE', 'A', 'AE', 'SE', 'Tk', 'TkE', 'T', 'TE');
ZzzelpScriptArmee.ordre = new Array('unite1', 'unite2', 'unite3', 'unite4', 'unite5', 'unite6', 'unite14', 
									'unite7', 'unite8', 'unite9', 'unite10', 'unite13', 'unite11', 'unite12');
ZzzelpScriptArmee.attaque = new Array(3,5,7,10,15,1,1,30,35,24,55,80,50,55); 
ZzzelpScriptArmee.vie = new Array(8,10,13,16,20,30,40,10,12,27,35,50,50,55); 
ZzzelpScriptArmee.defense = new Array(2,4,6,9,14,25,35,15,18,23,1,1,50,55);
ZzzelpScriptArmee.HOF = new Array(300,450,570,740,1000,1410,1410,1440,1520,1450,1860,1860,2740,2740);
ZzzelpScriptArmee.ID = new Array(1,2,3,4,5,6,14,7,8,9,10,13,11,12);
ZzzelpScriptArmee.consommation = new Array(16,20,26,30,36,70,100,30,34,44,100,150,80,90);
ZzzelpScriptArmee.unites_XP = new Array(true, true, false, true, true, true, false, true, false, false, true, false, true, false);

ZzzelpScriptArmee.getArmee = function(zone, mode) {
	var armee = [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		armees_lieu = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
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
				var index_unite = ZzzelpScriptArmee.noms_singulier.indexOf(unite.innerHTML);
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
	return new ZzzelpScriptArmee((mode === 0) ? armee : armees_lieu);
};

ZzzelpScriptArmee.getArmeeAjax = function(callBack) {
	new ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : 'Armee.php', addDOM : true },
		{ success : function(zone_page) {
			callBack(ZzzelpScriptArmee.getArmee(zone_page, 0));
		}
	});
};

ZzzelpScriptArmee.getArmeeReine = function(callBack) {
	new ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : 'Reine.php', addDOM : true },
		{ success : function(zone_page) {
			var valeurs = zone_page.querySelectorAll('span[id*="armee_initial"]'),
				armee = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
			for(var i=0; i<valeurs.length; i++) {
				var index = ZzzelpScriptArmee.noms_singulier.indexOf(valeurs[i].parentNode.querySelector('h2').innerHTML);
				if(index >= 0) {
					armee[index] = parseInt(valeurs[i].innerHTML);
				}
			}
			callBack(new ZzzelpScriptArmee(armee));
		}
	});
};

ZzzelpScriptArmee.new_armee_unite = function(n,i, niveaux) {
	var unites = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	unites[i] = n;
	return new ZzzelpScriptArmee(unites, niveaux);
};

/*
 * Tente a part d'une chaine de caractère d'extraire les unités du joueur. 
 * Pour l'instant gère les copies de la page armée et de RC
 * str -> array
*/
ZzzelpScriptArmee.analyse = function(texte, type) {
	var unites = ZzzelpScriptArmee.getEmptyArmee(14);
	texte = texte.replace(/(Vers le Terrain de Chasse)|(Vers la Fourmilière)|(Vers la Loge Impériale)/gi, '');
	texte = texte.replace(/(Vers le TDC)|(Vers le Fourmilière)|(Vers la Loge)/gi, '');
	texte = texte.replace(/(Vos raiders.*secondes?)|(Vos chasseuses.*secondes?)|(Vous allez attaquer.*secondes?)|(inflige.*\.)|(Arriv.*[0-9]{2}h[0-9]{2})|(\\(s\\))/gi, '');
	texte = texte.replace(/\]/gi, '\n').replace(/\[/gi, '\n');
	texte = texte.replace(/:/gi, ',');
	texte = texte.split("\n").join(',').split(',');	
	for(var i=0; i<texte.length; i++) {
		var ligne = texte[i].trim();
		if(isNaN(ligne.replace(/ /g, ''))) {
			var id_unite = ZzzelpScriptArmee.getIDunite(ligne);
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
					unite = ZzzelpScriptArmee.getIDunite(valeurs[2]); 
				unites[unite] += parseInt(valeurs[1].replace(/ /g, ''));
			}
		}
		else if(ligne.length > 0 && ~unite_tampon) {
			unites[unite_tampon] += parseInt(ligne.replace(/ /g, ''));
		}
	}
	var armee = new ZzzelpScriptArmee(unites);
	return armee;
};

ZzzelpScriptArmee.getIDunite = function(unite) {
	var index = new Array(
		ZzzelpScriptArmee.noms_singulier,
		ZzzelpScriptArmee.noms_pluriel,
		ZzzelpScriptArmee.ex_noms_singulier,
		ZzzelpScriptArmee.ex_noms_pluriel,
		ZzzelpScriptArmee.TAGs
	);
	for(var n=0; n<index.length; n++) {
		if(~index[n].indexOf(unite)) {
			return index[n].indexOf(unite);
		}
	}
	return -1;
};

ZzzelpScriptArmee.getEmptyArmee = function(length) {
	var armee = [];
	for(var i=0; i<length; i++) {
		armee.push(0);
	}
	return armee;	
};

function ZzzelpScriptCadre(zzzelp) {
	var cadre = this;

	this.version = zzzelp.version.str;

	this.menus = new Array(
		{ nom : 'Exports vers Zzzelp', id : 'exports' },
		{ nom : 'Personnaliser ZzzelpScript', id : 'parametres' },
		{ nom : 'Traceur personnel', id : 'traceur' },
		{ nom : 'Echanges C+', id : 'echanges' },
		{ nom : 'Statistiques', id : 'statistiques' }
	);

	this.exports = new Array(
		{ 
			nom : 'Constructions', 
			id : 'constructions', 
			valeur : zzzelp.compte.getUpdateConstruction()
		},{
			nom : 'Recherches',
			id : 'recherches',
			valeur : zzzelp.compte.getUpdateLaboratoire()
		},{
			nom : 'Ouvrières', 
			id : 'ouvrieres',
			valeur : zzzelp.compte.getUpdateReine()
		}
	);

	this.init = function() {
		cadre.createCadre();
		cadre.createSectionContenu();
		cadre.placeCadre();
		cadre.cadre_zzzelp.dataset.visible = "1";
		cadre.cadre_zzzelp.onmouseover = function onmouseover(event) {
			document.querySelector('#menuBoite').className = 'menuActif';
		};
		if(ZzzelpScript.auth() == '2') {
			if(localStorage['zzzelp_onglet_cadre_' + ze_serveur] && localStorage.getItem('zzzelp_onglet_cadre_' + ze_serveur) >= 0) {
				cadre.showSection(parseInt(localStorage.getItem('zzzelp_onglet_cadre_' + ze_serveur)));
			}
			else {
				localStorage['zzzelp_onglet_cadre_' + ze_serveur] = -1;
			}
		}
	};

	this.createCadre = function() {
		var cadre_zzzelp = document.createElement('div'),
			zone_contenu = document.createElement('div'),
			titre = document.createElement('div'),
			lien_titre = document.createElement('a');
		titre.className = 'titre_colonne_cliquable';
		titre.onclick = function onclick(event) {
			window.open(url_zzzelp);
			return false;
		};
		lien_titre.innerHTML = 'Zzzelp ' + cadre.version;
		lien_titre.href = '#';
		cadre_zzzelp.id = 'boiteComptePlus';
		cadre_zzzelp.className = 'boite_compte_plus cadre_zzzelp';
		cadre_zzzelp.dataset.affiche = '0';
		zone_contenu.className = 'contenu_boite_compte_plus';
		zone_contenu.id = 'zzzelp_contenu_cadre';
		document.body.appendChild(cadre_zzzelp);
		cadre_zzzelp.appendChild(titre);
		titre.appendChild(lien_titre);
		cadre_zzzelp.appendChild(zone_contenu);

		cadre.cadre_zzzelp = cadre_zzzelp;
		cadre.zone_contenu = zone_contenu;
	};

	this.createSectionContenu = function() {
		if(ZzzelpScript.auth() == '0') {
			cadre.createButtonAuthPlayer();
		}
		else {
			cadre.createCadreAuthenticated();
		}
	};

	this.createButtonAuthPlayer = function() {
		var lien_aide = document.createElement('button');
		lien_aide.className = 'zzzelp_lien_aide';
		lien_aide.innerHTML = 'Activer Zzzelp ' + ze_serveur;
		lien_aide.onclick = function onclick(event) {
			document.location.href = url_zzzelp + '/activation_pseudo?serveur=' + ze_serveur + '&pseudo=' + gpseudo + '&token=' + getToken();
		};
		cadre.zone_contenu.appendChild(lien_aide);
	};

	this.createCadreAuthenticated = function() {
		var	zone_onglets = document.createElement('div'),
			table_resume = document.createElement('table'),
			table_raccourcis = document.createElement('table');
		
		zone_onglets.id = 'zone_onglets_zzzelp';

		var ligne_retour = table_resume.insertRow(-1),
			cell_retour = ligne_retour.insertCell(0),
			span_retour = document.createElement('span');
		span_retour.innerHTML = 'Retour';
		span_retour.setAttribute('style', 'line-height: 2em;font-weight: bold;cursor: pointer;display:none');
		span_retour.id = 'zzzelp_retour_raccourcis';
		span_retour.onclick = function onclick(event) {
			cadre.showSection(-1);
		};
		cell_retour.appendChild(span_retour);

		var ligne_update = table_resume.insertRow(-1),
			cell_update = ligne_update.insertCell(0);
		cell_update.innerHTML = 'Synchroniser ZzzelpScript';
		cell_update.setAttribute('style', 'line-height: 2em;font-style:italic;cursor:pointer');
		cell_update.id = 'zzzelp_update';
		cell_update.onclick = function onclick(event) {
			zzzelp.getParameters(true, 1);
		};

		table_raccourcis.setAttribute('style', 'margin-top:8px');
		table_raccourcis.id = 'zzzelp_raccourcis';
		for(var i=0; i<cadre.menus.length; i++) {
			var ligne = table_raccourcis.insertRow(-1),
				cell = ligne.insertCell(0);
			cell.setAttribute('style', 'line-height: 2em;font-weight: bold;cursor: pointer;');
			cell.innerHTML = cadre.menus[i].nom;
			cell.dataset.onglet = i;
			cadre.addEventButtonSection(cell);

		}
		
		cadre.zone_contenu.appendChild(table_resume);
		cadre.zone_contenu.appendChild(table_raccourcis);
		cadre.zone_contenu.appendChild(zone_onglets);
	};

	this.addEventButtonSection = function(cell) {
		cell.onclick = function onclick(event) {
			cadre.showSection(this.dataset.onglet);
		};
	};

	this.placeCadre = function() {
		setInterval(function() {
			if(document.querySelector('#boutonBoite.boutonActif')) {
				document.querySelector('#boutonBoite').dataset.ex_affiche = +new Date();
			}
			if((coordonnees_souris.x < 230 || !isTouchDevice) && (+new Date() - parseInt(document.querySelector('#boutonBoite').dataset.ex_affiche) < 100)) {
				document.querySelector('.cadre_zzzelp').dataset.affiche =  1;
				document.querySelector('#menuBoite').className = 'menuActif';
				document.querySelector('#boutonBoite').className = 'boutonActif';
			}
			else {
				document.querySelector('.cadre_zzzelp').dataset.affiche =  0;
				document.querySelector('#menuBoite').className = '';
				document.querySelector('#boutonBoite').className = '';
			}
			var largeur = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			if(largeur < 1343) {
				document.querySelector('.cadre_zzzelp').style.marginTop = (document.querySelector('#boiteComptePlus .contenu_boite_compte_plus').offsetHeight + 60) + 'px';
				document.querySelector('.cadre_zzzelp').style.right = '';
				document.querySelector('#menuBoite').style.position = 'absolute';
			}
			else {
				document.querySelector('.cadre_zzzelp').style.marginTop = '0px';
				document.querySelector('.cadre_zzzelp').style.right = parseInt(((((largeur - document.querySelector('#centre').offsetWidth)/2)-220)/2) + 220) + 'px';
				document.querySelector('#menuBoite').style.position = 'fixed';
			}
		}, 25);
	};

	this.showSection = function(onglet) {
		localStorage['zzzelp_onglet_cadre_' + ze_serveur] = onglet;
		if(onglet >= 0) {
			document.querySelector('#zzzelp_raccourcis').style.display = 'none';
			document.querySelector('#zzzelp_retour_raccourcis').style.display = '';
			document.querySelector('#zzzelp_retour_raccourcis').dataset.affiche_zzzelp = '1';
			this.createSection[cadre.menus[onglet].id]();
		}
		else {
			document.querySelector('#zzzelp_raccourcis').style.display = '';
			document.querySelector('#zzzelp_retour_raccourcis').style.display = 'none';
			delete document.querySelector('#zzzelp_retour_raccourcis').dataset.affiche_zzzelp;
			document.querySelector('#zone_onglets_zzzelp').innerHTML = '';
		}
	};

	this.addLineExport = function(table, i) {
		var ligne = table.insertRow(-1),
			texte = ligne.insertCell(0),
			valeur = ligne.insertCell(1),
			synchro = ligne.insertCell(2),
			img = document.createElement('img'),
			dernier = document.createElement('span'),
			duree = document.createElement('span');
					
		ligne.setAttribute('style', 'line-height: 2em;');
		ligne.id = 'zzzelp_exports_' + cadre.exports[i].id;
		texte.innerHTML = cadre.exports[i].nom;
		dernier.innerHTML = cadre.exports[i].valeur;
		dernier.setAttribute('style', 'display:none');
		valeur.appendChild(dernier);
		valeur.appendChild(duree);
		img.src = url_zzzelp + '/Images/refresh.png';
		img.width = '20';
		img.setAttribute('style', 'cursor:pointer');
		img.dataset.type = cadre.exports[i].id;
		img.onclick = function onclick(event) {
			cadre.forceSynchroNiveaux(this.dataset.type);
		};
		synchro.appendChild(img);
	};

	this.addLineParameters = function(table, parametres, categorie, option) {
		var ligne = table.insertRow(-1),
			cell1 = ligne.insertCell(0),
			cell2 = ligne.insertCell(1),
			checkbox = document.createElement('input');
		cell1.innerHTML = parametres.parametres[categorie].parametres[option].nom + ' : ';
		cell1.setAttribute('style', 'text-align:left;line-height:2em;padding-left:5px');
		cell2.setAttribute('style', 'padding-right: 3px;');
		checkbox.type = 'checkbox';
		checkbox.dataset.nom = option;
		checkbox.dataset.categorie = categorie;
		checkbox.checked = (parametres.parametres[categorie].parametres[option].active == 1);
		checkbox.onchange = function onchange(event) {
			cadre.updateParameters(this.dataset.categorie, this.dataset.nom, (this.checked ? 1 : 0), 'active', 1);
		};
		cell2.appendChild(checkbox);
	};

	this.updateParameters = function(categorie, nom, valeur, type, mode) {
		var parametres = JSON.parse(localStorage['zzzelp_parametres_' + ze_serveur]);
		if(categorie == 'traceur') {
			parametres.traceur_perso = JSON.parse(valeur);
		}
		else {
			parametres.parametres[categorie].parametres[nom][type] = valeur;
		}
		localStorage.setItem('zzzelp_parametres_' + ze_serveur, JSON.stringify(parametres));
		var url_ajax = 'update_script?option=' + nom + '&categorie=' + categorie + '&valeur=' + valeur + '&';		
		new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : url_ajax, force : mode },
			{ authentication_issue : function() {
				cadre.updateParameters(categorie, nom, valeur, type, 2);
			}
		});		
	};


	this.createSection = {
		exports : function() {
			var	zone = document.querySelector('#zone_onglets_zzzelp'),
				table = document.createElement('table');
			table.setAttribute('style', 'margin-top:8px');
			for(var i=0; i<cadre.exports.length; i++) {
				cadre.addLineExport(table, i);
			}
			zone.appendChild(table);
			cadre.updateSynchroNiveaux();
		},
		parametres : function() {
			var parametres =  ZzzelpScript.parameters('*'),
				zone = document.querySelector('#zone_onglets_zzzelp'),
				zone_2 = document.createElement('div');
				table = document.createElement('table');
			zone_2.className = 'zzzzelp_parametres_script';
			for(var categorie in parametres.parametres) {
				var entete = table.insertRow(-1);
				entete.className = 'entete_option_zzzelp';
				entete.innerHTML = parametres.parametres[categorie].nom;
				entete.setAttribute('style', 'font-weight: bold;line-height:3em;text-align:center');
				entete.setAttribute('colspan', 2);
				for(var option in parametres.parametres[categorie].parametres) {
					cadre.addLineParameters(table, parametres, categorie, option);
				}
			}
			zone_2.appendChild(table);
			zone.appendChild(zone_2);			
		},
		traceur : function() {
			var donnees = ZzzelpScript.parameters('traceur_perso'),
				zone = document.querySelector('#zone_onglets_zzzelp'),
				zone2 = document.createElement('div'),
				table = document.createElement('table'),
				ligne = table.insertRow(-1),
				cell = ligne.insertCell(0);
			cell.setAttribute('colspan', '3');
			cell.id = 'zzzelp_synchro_traceur';
			cell.setAttribute('style', 'cursor:pointer;font-style:italic');
			cell.innerHTML = 'Synchroniser le traceur';
			cell.onclick = function onclick(event) {
				cadre.launchTraceur();
			};
			zone2.className = 'zzzelp_donnees_traceur';
			for(var type in donnees) {
				var entete = table.insertRow(-1);
				cell = entete.insertCell(0);
				cell.setAttribute('colspan', '3');
				cell.setAttribute('style', 'font-weight:bold;line-height:3em;');
				cell.innerHTML = ((type == 'joueurs') ? 'Joueurs' : 'Alliances') + ' à suivre';
				for(var i=0; i<donnees[type].length; i++) {
					ligne = table.insertRow(-1);
					cadre.validateLineTraceur(ligne, type, donnees[type][i], false);
				}
				ligne = table.insertRow(-1);
				ligne.dataset.type = type;
				cadre.editLineTraceur(ligne, true);
			}
			zone2.appendChild(table);
			zone.appendChild(zone2);
			ZzzelpScriptTraceur.updateDelay(true);			
		},
		echanges : function() {
			var ressources = new Array(
								{ nom : 'Nourriture', id : 'nourriture', icone : '/images/icone/icone_pomme.png' },
								{ nom : 'Materiaux', id : 'materiaux', icone : '/images/icone/icone_bois.png' },
								{ nom : 'Ouvrières', id : 'ouvriere', icone : '/images/icone/icone_ouvriere.gif' },
								{ nom : 'TDC', id : 'tdc', icone : '/images/icone/icone_tdc.gif' },
								{ nom : 'Echange possible', id : 'echange_possible', icone : '' }
								),
				zone = document.querySelector('#zone_onglets_zzzelp'),
				table = document.createElement('table');
			zone.appendChild(table);
			cadre.getTauxEchange(ressources);
		},
		statistiques : function() {
			if(force) {
				document.querySelector('#zone_onglets_zzzelp').innerHTML = '';
			}
			var zone = document.querySelector('#zone_onglets_zzzelp'),
				ligne;
			if(localStorage['zzzelp_statistiques_' + ze_serveur]) {
				var table = document.createElement('table'),
					statistiques = JSON.parse(localStorage['zzzelp_statistiques_' + ze_serveur]);
				for(var page in statistiques.pages) {
					ligne = table.insertRow(-1);
					var	cell1 = ligne.insertCell(0),
						cell2 = ligne.insertCell(1),
						a = document.createElement('a');
					ligne.dataset.statistiques = 'pages';
					ligne.class = 'ligne_statistiques';
					a.href = 'http://' + ze_serveur + '.fourmizzz.fr/' + page + '.php';
					a.innerHTML = page;
					a.setAttribute('style', 'float: left;padding-left: 10px;');
					a.target = '_BLANK';
					cell1.appendChild(a);
					cell2.innerHTML = ze_Nombre(statistiques.pages[page]);
				}
				zone.appendChild(table);
				
				var pages = table.querySelectorAll('tr[data-statistiques="pages"]');
				for (var i=0;i<pages.length;i++) {
					page = table.querySelectorAll('tr[data-statistiques="pages"]')[i];
					j = i;
					while (j > 0 && parseInt(page.cells[1].innerHTML.replace(/ /g,'')) > parseInt(table.querySelectorAll('tr[data-statistiques="pages"]')[j-1].cells[1].innerHTML.replace(/ /g,''))) {
						var sibling = table.querySelectorAll('tr[data-statistiques="pages"]')[j].previousElementSibling,
							anchor = table.querySelectorAll('tr[data-statistiques="pages"]')[j].nextElementSibling,
							parent = table.querySelectorAll('tr[data-statistiques="pages"]')[j].parentNode;
						parent.insertBefore(table.querySelectorAll('tr[data-statistiques="pages"]')[j], sibling);				
						j--;
					}
				}
			}
			else {
				ligne = document.createElement('div');
				ligne.innerHTML = 'Activer les statistiques';
				ligne.setAttribute('style', 'line-height: 2.5em;font-weight: bold;color: chartreuse;cursor:pointer;');
				ligne.onclick = function onclick(event) {
					cadre.launchStatictics();
				};
				zone.appendChild(ligne);
			}			
		}
	};

	this.updateSynchroNiveaux = function() {
		setInterval(function() {
			var lignes = document.querySelectorAll('tr[id*="zzzelp_exports_"]');
			if(lignes.length > 0) {
				for(var i=0; i<lignes.length; i++) {
					var ecart = ze_Secondes_date(time_fzzz() - parseInt(lignes[i].cells[1].querySelectorAll('span')[0].innerHTML));
					lignes[i].cells[1].querySelectorAll('span')[1].innerHTML = ecart;
				}
			}
		}, 1000);
	};

	this.forceSynchroNiveaux = function(type) {
		var url;
		if(type == 'constructions') {
			url = 'http://' + ze_serveur + '.fourmizzz.fr/construction.php?iz';
		}
		else if(type == 'recherches') {
			url = 'http://' + ze_serveur + '.fourmizzz.fr/laboratoire.php?iz';
		}
		else if(type == 'ouvrieres') {
			url = 'http://' + ze_serveur + '.fourmizzz.fr/Reine.php?iz';
		}
		document.location.href = url;
	};

	this.editLineTraceur = function(ligne, nouveau) {
		var TAG = nouveau ? '' : ligne.cells[0].querySelector('a').innerHTML;
		ligne.innerHTML = '';
		ligne.dataset.ex_valeur = nouveau ? 'defaut' : TAG;
		var cell1 = ligne.insertCell(0),
			cell2 = ligne.insertCell(1),
			input = document.createElement('input'),
			img = document.createElement('img');
		cell1.setAttribute('colspan', '2');
		input.type = 'text';
		input.setAttribute('style', 'width:130px');
		input.value = TAG;
		input.placeholder = (ligne.dataset.type == 'alliances') ? 'TAG' : 'Pseudo';
		img.setAttribute('width', '15px');
		img.src = url_zzzelp + '/Images/valider.png';
		img.setAttribute('style', 'cursor:pointer');
		img.onclick = function onclick(event) {
			var ligne = this.parentNode.parentNode;
			cadre.validateLineTraceur(ligne, ligne.dataset.type, ligne.querySelector('input').value, true);
		};
		cell1.appendChild(input);	
		cell2.appendChild(img);
	};

	this.validateLineTraceur = function(ligne, type, valeur, update) {
		ligne.innerHTML = '';
		var	cell1 = ligne.insertCell(0),
			cell2 = ligne.insertCell(1),
			cell3 = ligne.insertCell(2),
			img1 = document.createElement('img'),
			img2 = document.createElement('img');
		ligne.dataset.type = type;
		cell2.setAttribute('style', 'width:30px');
		cell3.setAttribute('style', 'width:30px');
		cell1.innerHTML = (type == 'alliances') ? ze_Lien_alliance(valeur) : ze_Lien_profil(valeur);
		img1.src = url_zzzelp + '/Images/edit.png';
		img2.src = 'http://www.icone-png.com/png/25/24717.png';
		img1.setAttribute('width', '15px');
		img2.setAttribute('width', '15px');
		img1.setAttribute('style', 'cursor:pointer');
		img2.setAttribute('style', 'cursor:pointer');
		img1.onclick = function onclick(event) {
			cadre.editLineTraceur(this.parentNode.parentNode, false);
		};
		img2.onclick = function onclick(event) {
			ze_Supprimer_element(this.parentNode.parentNode);
			cadre.updateTraceur();
		};
		cell2.appendChild(img1);
		cell3.appendChild(img2);
		if(update) {
			delete ligne.dataset.ex_valeur;
			cadre.updateTraceur();
			if(document.querySelectorAll('#zone_onglets_zzzelp tr[data-type="' + type + '"] input').length === 0) {
				var lignes = document.querySelectorAll('#zone_onglets_zzzelp tr[data-type="' + type + '"] a'),
					index = lignes[lignes.length - 1].parentNode.parentNode.rowIndex;
				ligne = document.querySelector('#zone_onglets_zzzelp table').insertRow(index+1);
				ligne.dataset.type = type;
				cadre.editLineTraceur(ligne, true);
			}
		}
	};

	this.updateTraceur = function() {
		var lignes_alliances = document.querySelectorAll('#zone_onglets_zzzelp tr[data-type="alliances"]'),
			lignes_joueurs = document.querySelectorAll('#zone_onglets_zzzelp tr[data-type="joueurs"]'),
			alliances = [],
			joueurs = [],
			i;
		for(i=0;i<lignes_alliances.length; i++) {
			if(typeof lignes_alliances[i].dataset.ex_valeur != "undefined") {
				if(lignes_alliances[i].querySelector('input').value !== '') {
					alliances.push(lignes_alliances[i].querySelector('input').value);
				}
			}
			else if(lignes_alliances[i].cells[0].innerHTML !== '' ) {
				alliances.push(lignes_alliances[i].cells[0].querySelector('a').innerHTML);
			}
		}
		for(i=0;i<lignes_joueurs.length; i++) {
			if(lignes_joueurs[i].dataset.ex_valeur) {
				if(lignes_joueurs[i].querySelector('input').value !== '') {
					joueurs.push(lignes_joueurs[i].querySelector('input').value);
				}
			}
			else if(lignes_joueurs[i].cells[0].innerHTML !== '' ) {
				joueurs.push(lignes_joueurs[i].cells[0].querySelector('a').innerHTML);
			}
		}
		cadre.updateParameters('traceur', '', JSON.stringify({ alliances : alliances, joueurs : joueurs }), '', 1);
	};

	this.launchTraceur = function() {
		var donnees = ZzzelpScript.parameters('traceur_perso');
		new ZzzelpScriptTraceur(donnees);
		document.querySelector('.zzzelp_donnees_traceur table').style.display = 'none';
		var zone = document.createElement('div');
		zone.innerHTML = 'Etat : Synchro en cours';
		zone.className = 'alerte_zzzelp_traceur';
		zone.setAttribute('style', 'margin: 35px 0;font-weight: bold;color: orange;line-height: 2.5em;');
		document.querySelector('.zzzelp_donnees_traceur').appendChild(zone);
	};
	
	this.getTauxEchange = function(ressources) {
		if(ressources.length > 0) {
			var ressource = ressources.pop(),
				suffix = (ressource.id == 'echange_possible') ? '' : ('?type_echange=' + ressource.id);
			new ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : 'echange.php' + suffix, addDOM : true },
				{ success : function(zone_page) {
					var ligne = document.querySelector('#zone_onglets_zzzelp table').insertRow(-1);
					if(ressource.id == 'echange_possible') {
						var temps_restant = document.querySelector('#tps_restant'),
							cell = ligne.insertCell(0);
						cell.setAttribute('colspan', '2');
						if(temps_restant !== null) {
							cell.setAttribute('style', 'color:red');
							var attente;
							if(document.querySelector('#tps_restant').innerHTML == parseInt(document.querySelector('#tps_restant').innerHTML)) {
								attente = ze_Secondes_date(document.querySelector('#tps_restant').innerHTML);
							}
							else {
								attente = document.querySelector('#tps_restant').innerHTML;
							}
							cell.innerHTML = 'Attente restante : ' + attente;
						}
						else {
							cell.setAttribute('style', 'color:green');
							cell.innerHTML = 'Echange possible';
						}
					}
					else {
						var nom = ligne.insertCell(0),
							valeur = ligne.insertCell(1);
						nom.innerHTML = ressource.nom + ' : ';
						valeur.innerHTML = zone_page.querySelectorAll('.intro strong')[(ComptePlus ? 2 : 1)].innerHTML + '&nbsp<img width="15px" src="' + ressource.icone + '">';
						valeur.setAttribute('style', 'text-align:right');
					}
					cadre.getTauxEchange(ressources);
				}
			});
		}
	};

	this.launchStatictics = function() {
		var statistiques = {
				pages : { Armee : 0, alliance : 0, AcquerirTerrain : 0, chat : 0, classementAlliance : 0, commerce : 0, construction : 0, 
						  ennemie : 0, laboratoire : 0, Membre : 0, messagerie : 0, Reine : 0, Ressources : 0 },
				actions : { 'Messages CA' : 0, 'Messages CG' : 0, 'MP envoyés' : 0, 'MP reçus' : 0 }
		};
		localStorage.setItem('zzzelp_statistiques_' + ze_serveur, JSON.stringify(statistiques));
		cadre.createSection.statistiques(true);
	};

	this.init();

}



function ZzzelpScriptMessagerie() {

	var messagerie = this;

	this.getMessageZzzelp = function(mode) {
		new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'messagerie_script?' },
			{ success : function(messages) {
				messagerie.init(messages);
			},
			authentication_issue : function(messages) {
				messagerie.getMessageZzzelp(2);
			}
		});
	};

	this.init = function(messages) {
		var categorie = document.querySelector('.option_dossiers_speciaux strong');
		if(ZzzelpScript.parameters('parametres', ['perso', 'perso_smileys'])) {
			new ZzzelpScriptSmileys('new_MP', document.querySelector('#contenu_ecrire_nouveau_message'));
		}
		if(ZzzelpScript.parameters('parametres', ['perso', 'perso_messagerie'])) {
			this.getChaineNewMP();
		}
		this.customJS();
		this.watcher(categorie, messages);
		this.addEvents();
		this.addMessagesZzzelp(messages);
	};

	this.customJS = function() {
		var scripts = document.querySelectorAll('#centre script');
		for(var i=0; i<scripts.length; i++) {
			if(~scripts[i].innerHTML.indexOf('derniere_sauvegarde')) {
				$( "#contenu_ecrire_nouveau_message" ).undelegate("#bt_envoi_message", "click");
				var content = 'document.querySelector(\'#message_envoi\').value = ze_Preparation_message(document.querySelector(\'#message_envoi\').value);';
				content += messagerie.contentCustomJS(scripts[i].innerHTML, '$("#contenu_ecrire_nouveau_message").on');
				messagerie.modifyJS(content);
				
			}
		}
	};

	this.contentCustomJS = function(script, amorce) {
		var n = script.indexOf(amorce),
			nombre_ouverte = 0,
			entre = false,
			contenu = '';
		while (nombre_ouverte !== 0 || !entre) {
			if(!entre && script[n] == '{') {
				entre = true;
			}
			nombre_ouverte += ((script[n] == '{') ? 1 : ((script[n] == '}') ? -1 : 0));
			contenu += script[n];
			n ++;
		}
		return contenu.substr(contenu.indexOf('\n'), contenu.length - contenu.indexOf('\n') - 1);
	};

	this.modifyJS = function(content) {
		var el = document.querySelector("#bt_envoi_message");
		el.onclick = function onclick(event){
			eval(content); 
			return false;
		};
	};

	this.watcher = function(categorie, messages_zzzelp) {
		var categorie_2 = document.querySelector('.option_dossiers_speciaux strong');
		if(categorie != categorie_2) {
			categorie = categorie_2;
			messagerie.analyseTitles();
			messagerie.addMessagesZzzelp(messages_zzzelp);
		}
		var ouvertes = document.querySelectorAll('.contenu_conversation');
		for(var i=0; i<ouvertes.length; i++) {
			if(ouvertes[i].querySelectorAll('tr[id*="reactions_"]').length > 0) {
				var id = ouvertes[i].querySelector('tr[id*="reactions_"]').id.replace('reactions_', '');
				if(!document.querySelector('#conversation_' + id).dataset.zzzelp_ouverture && !document.querySelector('#conversation_' + id).dataset.zzzelp_ouvert) {
					console.log('ZzzelpScript : Ouverture de la conversation');
					messagerie.loadMessage('conversation_' + id);
				}
			}
		}
		setTimeout(function(){messagerie.watcher(categorie, messages_zzzelp);}, 25);
	};

	this.addEvents = function() {
		if(ZzzelpScript.parameters('parametres', ['perso', 'perso_smileys'])) {
			$( "#liste_conversations" ).undelegate(".reaction_choisie", "click");
		}
		messagerie.analyseTitles();
	};

	this.analyseTitles = function() {
		var messages = document.querySelectorAll('#corps_messagerie tr[id*="conversation"]'),
			n_mess = 0;
		for (var i=0;i<messages.length; i++) {
			var titre = messages[i].querySelector('.intitule_message').innerHTML,
				id = messages[i].id.replace('conversation_', '');
			if(ZzzelpScript.parameters('parametres', ['perso', 'perso_messagerie_guerre']) && messagerie.isImportant(messages[i])) {
				messagerie.highlightMessage(id);
			}
			messagerie.addEventOpen(messages[i]);
		}
	};

	this.addEventOpen = function(message) {
		message.onclick = function onclick(event) {
			this.dataset.zzzelp_ouverture = 1;
			messagerie.loadMessage(this.id);
		};
	};

	this.loadMessage = function(id) {
		var type = document.querySelector('#' + id).dataset.type,
			longueur = (type == 'Combats' || type == 'Chasses') ? 2 : 4,
			lignes = document.querySelector('#table_liste_conversations').rows,
			index = document.querySelector('#' + id).rowIndex;
		if(lignes.length < index + longueur + 1 || lignes[index + longueur].className != 'contenu_conversation') {
			setTimeout(function(){messagerie.loadMessage(id);},10);
		}
		else {
			document.querySelector('#' + id).dataset.zzzelp_ouvert = 1;
			document.querySelector('#' + id).removeAttribute('data-zzzelp_ouverture');
			if(type == 'Combats') {
				messagerie.customCombat(id);
			}
			else if(type == 'Chasses' && ZzzelpScript.parameters('parametres', ['perso', 'perso_messagerie'])) {
				messagerie.customChasse(id);
			}
			else {
				messagerie.customConversation(id);
			}
		}
	};

	this.customCombat = function(id) {
		var table = document.querySelector('#table_liste_conversations');
		if(document.querySelector('#' + id).dataset.joueur == 'adversaire') {
			var titre = document.querySelector('#' + id).querySelector('.intitule_message').innerHTML,
				RCs = table.rows[document.querySelector('#' + id).rowIndex + 2].querySelectorAll('tr[id*=message_] .message'),
				dates = table.rows[document.querySelector('#' + id).rowIndex + 2].querySelectorAll('tr[id*=message_] .expe span span');
			if(ZzzelpScript.parameters('parametres', ['perso', 'perso_messagerie_guerre'])) {
				new ZzzelpScriptRC().messagerie(id, titre, RCs, dates);
			}
			if(typeof ze_Lien_Forum_Guerre != 'undefined') {
				//messagerie.getLinkForum(1, document.querySelector('#' + id).dataset.pseudo, document.querySelector('#table_liste_conversations').rows[document.querySelector('#' + id).rowIndex + 2].querySelector('table'));
			}
		}		
	};

	this.customConversation = function(id) {
		var titre = document.querySelector('#' + id + ' .intitule_message').innerHTML,
			conversation = document.querySelector('#table_liste_conversations').rows[document.querySelector('#' + id).rowIndex + 4].querySelector('table');
		if(typeof Aide_admin_messagerie != 'undefined') {
			Aide_admin_messagerie(id);
		}
		if(typeof ze_Aide_admin_erreur != 'undefined') {
			ze_Aide_admin_erreur(titre, conversation);
		}
		if(ZzzelpScript.parameters('parametres', ['perso', 'perso_messagerie'])) {
			messagerie.actionBar(titre, conversation);
			messagerie.keyboardEvent(conversation);
		}
		if(ZzzelpScript.parameters('parametres', ['perso', 'perso_smileys'])) {
			messagerie.prepareSmileys(id);
			new ZzzelpScriptSmileys('champ_reponse_' + id.replace('conversation_', ''), document.querySelector('#table_liste_conversations').rows[document.querySelector('#' + id).rowIndex + 4].querySelector('tr[id*="reactions_"]'));
		}	
	};

	this.customChasse = function(id) {
		var table =  document.querySelector('#table_liste_conversations'),
			conversation = table.rows[document.querySelector('#' + id).rowIndex + 2],
			liens = conversation.querySelectorAll('.lien_voir_precedent');
		if(liens.length > 0) {
			if(conversation.querySelector('.lien_voir_precedent').innerHTML != 'Chargement en cours') { 
				liens[0].click();
			}
			setTimeout(function(){
				messagerie.customChasse(id);
			}, 25);
		}
		else {
			var chasses = conversation.querySelectorAll('tr[id*=message_] .message'),
				dates = conversation.querySelectorAll('tr[id*=message_] .expe span span'),
				donnees = { detail : [], total : {} },
				chasses_str = '';
			for(var i=0; i<chasses.length; i++) {
				chasses_str += chasses[i].innerHTML.replace(/<br>/gi, '\n') + '\n\n';
			}
			new ZzzelpScriptAnalyseurChasse(chasses_str).initMessagerie(id);
		}	
	};

	this.keyboardEvent = function(conversation) {
		conversation.querySelector('textarea[id*="champ_reponse_"]').onkeypress = function onkeypress(event) {
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if ((keycode == '13' || keycode == '10') && event.ctrlKey) {
				var r = confirm("Voulez-vous envoyer ce message ?");
				if(r) {
					conversation.querySelector('.reagir_message button').click();
				}
			}
		};
	};

	this.isImportant = function(message) {
		var pseudo, i,
			membres = ZzzelpScript.parameters('membres'),
			titre = message.querySelector('.intitule_message').innerHTML,
			regexps = new Array(
				{ regexp : 'Vol par ([^ ]+) :', index : 1, type: 'flood_defense' },
				{ regexp : 'Butin chez ([^ ]+) :', index : 1, type : 'pillage_attaque' },
				{ regexp : 'Invasion repoussée de ([^ ]+) :', index : 1, type : 'RC_defense' },
				{ regexp : 'Invasion de ([^ ]+) :', index : 1, type : 'RC_defense' },
				{ regexp : 'Rebellion (échouée|réussie) contre ([^ ]+)', index : 2, type : 'rebellion_attaque' },
				{ regexp : 'Attaque (annulée|échouée|réussie) contre ([^ ]+)', index : 2, type : 'RC_attaque' },
				{ regexp : 'Colonie (perdue|protégée) chez ([^ ]+)', index : 2, type : 'telescopage_defense' },
				{ regexp : 'Colonie (conquise|libérée) chez ([^ ]+)', index : 2, type : 'colonie_attaque' },
				{ regexp : 'Soumission par ([^ ]+)', index : 1, type : 'colonie_defense' },
				{ regexp : 'Indépendance de ([^ ]+)', index : 1, type : 'rebellion_defense' },
				{ regexp : 'Colonie libérée chez ([^ ]+)', index : 1, type : 'liberation_colonie' }
			),
			trouve = false;
		for(i=0; i<regexps.length; i++) {
			if(titre.match(regexps[i].regexp)) {
				pseudo = new RegExp(regexps[i].regexp).exec(titre)[regexps[i].index];
				message.dataset.combat_zzzelp = regexps[i].type;
				message.dataset.pseudo = pseudo;
			}
		}
		if(pseudo) {
			trouve = false;
			for(var alliance in membres) {
				for(i=0; i<membres[alliance].length; i++) {
					trouve = (trouve || membres[alliance][i].pseudo == pseudo);
				}
			}
			return (!trouve);
		}
		return false;
	};

	this.highlightMessage = function(id) {
		document.querySelector('#conversation_' + id).dataset.joueur = 'adversaire';
		document.querySelector('#conversation_' + id).style.background = '#FF6347';
	};

	//MESSAGES ZZZELP
	this.addMessagesZzzelp = function(messages_zzzelp) {
	    if(document.querySelector('#corps_messagerie')) {
	        var messages = document.querySelectorAll('#corps_messagerie tr[id*="conversation"]'),
				n_mess = 0;
	        for (var i=0;i<messages.length; i++) {
				var date_MP = ze_Date_to_timestamp_v2(messages[i].querySelectorAll('td')[3].querySelector('span').innerHTML);
				messages[i].querySelectorAll('td')[3].querySelector('span').innerHTML = ' ' + ze_Generation_date_v1(date_MP);
				while (messages_zzzelp.length > 0 && messages_zzzelp[0].date > date_MP) {
					messagerie.addMessageZzzelp(messages_zzzelp[0], i+1+n_mess*3, i);
					messages_zzzelp.splice(0,1);
					n_mess += 1;
				}
	        }
	        for(i=0;i<messages_zzzelp.length;i++) {
				messagerie.addMessageZzzelp(messages_zzzelp[i], document.querySelectorAll('#TableMessagerie tr').length);
				n_mess += 1;
			}		
		}
	};

	this.addMessageZzzelp = function(message, i, n) {
		var cell, ligne;
		ligne = document.querySelector('#table_liste_conversations').insertRow(i+1);
		ligne.setAttribute('id', 'zzzelp_' + message.ID);
		if(message.expediteur == 'delangle') {
			ligne.setAttribute('style', 'font-weight:bold');
		}
		cell = ligne.insertCell(0);
		cell.innerHTML = '<input type="checkbox">';
		cell.setAttribute('style', 'cursor:pointer;');
		cell = ligne.insertCell(1);
		cell.innerHTML = '';
		cell.setAttribute('style', 'cursor:pointer;');
		cell = ligne.insertCell(2);
		cell.innerHTML = message.expediteur;
		cell.setAttribute('style', 'cursor:pointer;' + ((message.lu === 0 && message.titre.indexOf('[News Zzzelp]') == -1) ? 'color:#0000AA':''));
		cell.setAttribute('class', 'expediteur_message_zzzelp_' + message.ID);
		cell = ligne.insertCell(3);
		cell.innerHTML = '<span style="float:right; color:#444444;"> ' + ze_Generation_date_v1(message.date) + '</span><span ' + ((message.lu === 0 && message.titre.indexOf('[News Zzzelp]') == -1) ? 'style="color:#0000AA" class="nouveau_MP_zzzelp"':'') + '>' + message.titre + '</span>';
		cell.setAttribute('style', 'padding-left:10px;cursor:pointer;');
		cell.setAttribute('class', 'titre_message_zzzelp_' + message.ID);
		cell = ligne.insertCell(4);
		cell.innerHTML = '';

		ligne = document.querySelector('#table_liste_conversations').insertRow(i+2);
		ligne.setAttribute('class', 'message_zzzelp_' + message.ID);
		ligne.setAttribute('style', 'display:none');
		cell = ligne.insertCell(0);
		cell.setAttribute('colspan', '2');
		cell.innerHTML = '';
		cell = ligne.insertCell(1);
		cell.setAttribute('colspan', '3');
		cell.setAttribute('style', 'font-size:0.9em; padding-right:5px;color:#444444;');
		cell.innerHTML = 'Participants (non-lus) : ' + message.expediteur + ', Moi';

		ligne = document.querySelector('#table_liste_conversations').insertRow(i+3);
		ligne.setAttribute('class', 'contenu_conversation message_zzzelp_' + message.ID);
		ligne.setAttribute('style', 'display:none');
		cell = ligne.insertCell(0);
		cell.setAttribute('colspan', '2');
		cell.innerHTML = '';
		cell = ligne.insertCell(1);
		cell.setAttribute('colspan', '3');
		cell.innerHTML = '<span id="message_zzzelp_' + message.ID + '" style="display:block;margin:10px 0">' + message.contenu + '</span>';
		document.querySelector('.titre_message_zzzelp_' + message.ID).onclick = function onclick(event) {
			messagerie.showMPZzzelp(message.ID); 
			return false;
		};	
		document.querySelector('.expediteur_message_zzzelp_' + message.ID).onclick = function onclick(event) {
			messagerie.showMPZzzelp(message.ID); 
			return false;
		};	
	};

	this.showMPZzzelp = function(ID) {
		if(document.querySelectorAll('.titre_message_zzzelp_' + ID + ' .nouveau_MP_zzzelp').length) {
			messagerie.markReadMPZzzelp(ID);
			document.querySelector('.titre_message_zzzelp_' + ID + ' .nouveau_MP_zzzelp').style.color = '';
			document.querySelector('.expediteur_message_zzzelp_' + ID).style.color = '';
		}
		var lignes = document.querySelectorAll('.message_zzzelp_' + ID);
		for(var i=0;i<lignes.length;i++) {
			if(lignes[i].style.display === '') {
				lignes[i].style.display = 'none';
			}
			else {
				lignes[i].style.display = '';
			}
		}
	};

	this.deleteMPZzzelp = function(id) {
		new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'messagerie_script?action=suppression_MP' + '&id=' + id + '&' },
			{ success : function(url) {
				location.reload(); 
			}
		});
	};

	this.markReadMPZzzelp = function(id) {
		new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'messagerie_script?action=MP_lu' + '&id=' + id + '&' }, {});
	};

	//GUERRE
	this.getLinkForum = function(mode, pseudo, contenu) {
		new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'guerre_script?mode=lien_forum&cible=' + pseudo + '&' },
			{ success : function(url) {
				messagerie.addLinkForum(contenu, url);
			}, authentication_issue : function() {
				messagerie.getLinkForum(2, pseudo, contenu);
			}
		});
	};

	this.addLinkForum = function(contenu, url) {
		if(contenu.querySelectorAll('.generation_message_zzzelp').length > 0) {
			ze_Supprimer_element(contenu.querySelector('.generation_message_zzzelp').parentNode.parentNode);
		}
		var ligne_boutons = contenu.insertRow(contenu.rows.length),
			cell_boutons = ligne_boutons.insertCell(0),
			lien_forum = document.createElement('input');
		cell_boutons.setAttribute('colspan', '2');
		cell_boutons.setAttribute('style', 'text-align: center;padding: 20px 0;');
		lien_forum.type = 'button';
		lien_forum.setAttribute('class', 'generation_message_zzzelp');
		lien_forum.value = 'Forum de guerre';
		lien_forum.onclick = function onclick(event) { 
			window.open(url); 
			return false;		
		};
		cell_boutons.appendChild(lien_forum);
	};


	this.actionBar = function(titre, conversation) {
		if(conversation.querySelectorAll('.generation_message_zzzelp').length > 0) {
			ze_Supprimer_element(conversation.querySelector('.generation_message_zzzelp').parentNode.parentNode);
		}
		var ligne_boutons = conversation.insertRow(conversation.rows.length),
			ligne_resultats = conversation.insertRow(conversation.rows.length),
			cell_boutons = ligne_boutons.insertCell(0),
			cell_resultats = ligne_resultats.insertCell(0),
			copie_convers = document.createElement('input');
		cell_boutons.setAttribute('colspan', '2');
		cell_boutons.setAttribute('style', 'text-align: center;padding: 20px 0;');
		cell_resultats.setAttribute('colspan', '2');
		cell_resultats.className = 'resultats_messagerie_zzzelp';
		copie_convers.type = 'button';
		copie_convers.setAttribute('class', 'generation_message_zzzelp');
		copie_convers.value = 'Copier la conversation';
		copie_convers.onclick = function onclick(event) {
			messagerie.transformConversation(titre, conversation); 
			return false;
		};
		cell_boutons.appendChild(copie_convers);
	};

	this.transformConversation = function(titre, conversation) {
		var ligne_precedente = conversation.parentNode.parentNode.parentNode.rows[conversation.parentNode.parentNode.rowIndex-2];
		if(conversation.querySelectorAll('.lien_voir_precedent').length > 0) {
			if(conversation.querySelector('.lien_voir_precedent').innerHTML != 'Chargement en cours') { 
				conversation.querySelector('.lien_voir_precedent').innerHTML = 'Chargement en cours';
				conversation.querySelector('.lien_voir_precedent').click();
			}
			setTimeout(function(){
				messagerie.transformConversation(titre, conversation);
			},50);
		}
		else if(ligne_precedente.querySelectorAll('.afficher_tous_participants').length > 0) {
			if(ligne_precedente.querySelector('.afficher_tous_participants').innerHTML != 'Chargement en cours') { 
				ligne_precedente.querySelector('.afficher_tous_participants').innerHTML = 'Chargement en cours';
				ligne_precedente.querySelector('.afficher_tous_participants').click();
			}
			setTimeout(function(){messagerie.transformConversation(titre, conversation);},50);
		}
		else {
			var conversations = messagerie.getCleanConversation(conversation, ligne_precedente, titre);
			messagerie.insertCleanConversation(conversations, conversation);
		}
	};

	this.getCleanConversation = function(conversation, ligne_precedente, titre) {
		var messages = conversation.querySelectorAll('[id*="message_"]'),
			participants = ligne_precedente.querySelectorAll('[id*="liste_participants_"] a[href*="Membre.php"]'),
			sans_code = 'Titre : ' + titre + '\n\nParticipants : ',
			avec_bbcode = '[center][b]' + titre + '[/b][/center]' + '\n\nParticipants : ',
			avec_bbcode_2 = '[center][b]' + titre + '[/b][/center]' + '\n\nParticipants : ',
			pseudo, i, contenu;

		var max = ze_Majoration(participants.length, 20);
		for(i=0; i<max; i++) {
			pseudo = new RegExp('Pseudo=(.*)').exec(participants[i].href)[1];
			sans_code += pseudo + ((i == max-1) ? ',' : '') + ' ';
			avec_bbcode += '[player]' + pseudo + '[/player]' + ((i == max-1) ? ',' : '') + ' ';
			avec_bbcode_2 += '[url=http://' + ze_serveur + '/Membre.php?Pseudo=' + pseudo + ']' + pseudo + '[/url]' + ((i == max-1) ? ',' : '') + ' ';
		}
		if(max < participants.length) {
			sans_code += '...';
			avec_bbcode += '...';
			avec_bbcode_2 += '...';	
		}
		sans_code += '\n\n';
		avec_bbcode += '\n\n';
		avec_bbcode_2 += '\n\n';
		for(i=0; i<messages.length; i++) {
			pseudo = messages[i].querySelectorAll('.expe a');
			if(pseudo.length > 0) {
				pseudo = messages[i].querySelector('.expe a').innerHTML;
				var date = messages[i].querySelector('.date_envoi').innerHTML;
				if(pseudo == 'Moi') {
					pseudo = gpseudo;
				}
				if(messages[i].querySelectorAll('[id*="afficher_complet_"]').length > 0) {
					messages[i].querySelector('[id*="afficher_complet_"]').click();
					contenu = decodeHtml(messages[i].querySelector('[id*="message_complet_"]').innerHTML);
				}
				else {
					contenu = decodeHtml(messages[i].querySelector('.message').innerHTML.replace('<div class="date_envoi">' + date + '</div>', ''));
				}
				sans_code += pseudo + '	' + date + '\n\n' + Nettoyage_HTML(contenu) + '\n\n\n';
				avec_bbcode += '[player]' + pseudo + '[/player]	[b]' + date + '[/b]\n\n' + ze_HTML_to_BBcode(contenu, true) + '\n\n[hr]\n';
				avec_bbcode_2 += '[b]' + pseudo + '[/b]	[b]' + date + '[/b]\n\n' + ze_HTML_to_BBcode(contenu, false) + '\n\n[hr]\n';
			}
		}
		return { sans_code : sans_code, avec_bbcode : avec_bbcode, avec_bbcode_2 : avec_bbcode_2 };	
	};

	this.insertCleanConversation = function(conversations, conversation) {
		var zone = document.createElement('div'),
			zone_1 = document.createElement('div'),
			zone_2 = document.createElement('div'),
			zone_3 = document.createElement('div'),
			zone_sans_code = document.createElement('textarea'),
			zone_avec_bbcode = document.createElement('textarea'),
			zone_avec_bbcode_2 = document.createElement('textarea'),
			entete_1 = document.createElement('strong'),
			entete_2 = document.createElement('strong');
			entete_3 = document.createElement('strong');
		zone.setAttribute('style', 'margin-top:35px');
		zone_sans_code.value = conversations.sans_code;
		zone_avec_bbcode.value = conversations.avec_bbcode;
		zone_avec_bbcode_2.value = conversations.avec_bbcode_2;
		zone_sans_code.setAttribute('style', 'width:90%;height:150px');
		zone_avec_bbcode.setAttribute('style', 'width:90%;height:150px');
		zone_avec_bbcode_2.setAttribute('style', 'width:90%;height:150px');
		entete_1.innerHTML = 'Sans BBCode';
		entete_2.innerHTML = 'Avec BBCode (version Fourmizzz)';
		entete_3.innerHTML = 'Avec BBCode (version classique)';
		entete_1.setAttribute('style', 'display:block;margin-bottom:10px');
		entete_2.setAttribute('style', 'display:block;margin-bottom:10px');
		entete_3.setAttribute('style', 'display:block;margin-bottom:10px');
		zone_1.appendChild(entete_1);
		zone_2.appendChild(entete_2);
		zone_3.appendChild(entete_3);
		zone_1.appendChild(zone_sans_code);
		zone_2.appendChild(zone_avec_bbcode);
		zone_3.appendChild(zone_avec_bbcode_2);
		zone.appendChild(zone_1);
		zone.appendChild(zone_2);
		zone.appendChild(zone_3);
		conversation.querySelector('.resultats_messagerie_zzzelp').appendChild(zone);
		ze_Supprimer_element(conversation.querySelector('.generation_message_zzzelp'));
	};


	// SMILEYS
	this.prepareSmileys = function(id) {
		var scripts = document.querySelectorAll('#centre script');
		for(var i=0; i<scripts.length; i++) {
			if(~scripts[i].innerHTML.indexOf('derniere_sauvegarde')) {
				var index = document.querySelector('#' + id).rowIndex + 4,
					conversation = document.querySelector('#table_liste_conversations').rows[index].querySelector(".reaction_choisie");
				content = 'var nom = $(this).prop("id");if (~nom.indexOf("repondre_tous_") || ~nom.indexOf("repondre_unique_")){';
				content += 'var zone = this.parentNode.parentNode.parentNode.querySelector("textarea");zone.value=ze_Preparation_message(zone.value)};';
				content += messagerie.contentCustomJS(scripts[i].innerHTML, '$("#liste_conversations").on("click", ".reaction_choisie"').replace('return false;', 'console.log("")');
				messagerie.addEventSmileys(conversation, content);
			}
		}
	};

	this.addEventSmileys = function(conversation, content) {
		conversation.onclick = function onclick(event){
			eval(content);
			return false;
		};
	};


	//MESSAGES PAR GROUPE
	this.getChaineNewMP = function() {
		if(localStorage.getItem('zzzelp_rangs_' + ze_serveur)) {
			new ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : 'classementAlliance.php?alliance=' + galliance, addDOM : true, destroyDOM : false },
				{ success : function(zone_page) {
					var rangs = JSON.parse(localStorage.getItem('zzzelp_rangs_' + ze_serveur)),
						chaine = new ZzzelpScriptChaine(zone_page);
					chaine.retrieve(rangs, 0, galliance);
					messagerie.addGroups(chaine.analyse());
				}
			});
		}
		else {
			messagerie.addGroups({ grenier : [], passeur : [], chasseur : []});
		}
	};

	this.addGroups = function(chaine) {
		var zone_groupes;
		if(!document.querySelector('#menu_amis')) {
			document.querySelector('#contenu_ecrire_nouveau_message div span').innerHTML = '';
			zone_groupes = document.querySelector('#contenu_ecrire_nouveau_message div span');
		}
		else {
			zone_groupes = document.querySelector('#menu_amis').parentNode;
		}
		var corbeille = document.createElement('img'),
			membres = ZzzelpScript.parameters('membres'),
			groupes = new Array(
				{ nom : 'Dirigeants', id : 'chefs', condition : 'droits', valeur : 4 },
				{ nom : 'Membres', id : 'membres', condition : 'droits', valeur : 1 },
				{ nom : 'Greniers', id : 'greniers', condition : 'role', valeur : 'grenier' },
				{ nom : 'Passeurs', id : 'passeurs', condition : 'role', valeur : 'passeur' },
				{ nom : 'Chasseurs', id : 'chasseurs', condition : 'role', valeur : 'chasseur' }
			),
			data = {};
		corbeille.src = url_zzzelp + '/Images/trash.png';
		corbeille.setAttribute('style', 'height:15px;margin-right:15px;margin-left:10px;cursor:pointer');
		corbeille.onclick = function onclick(event) {
			messagerie.cleanPlayers();
		};
		for(var alliance in membres) {
			var select = document.createElement('select'),
				entete = document.createElement('option');
			data[alliance] = {};
			select.dataset.alliance = alliance;
			entete.innerHTML = 'Groupes ' + alliance + ' ?';
			select.appendChild(entete);
			messagerie.addEventGroup(select, data);
			data = messagerie.getPlayerInGroups(chaine, groupes, select, membres[alliance], alliance, data);
			zone_groupes.appendChild(select);
		}
		zone_groupes.parentNode.appendChild(corbeille);
		
	};

	this.getPlayerInGroups = function(chaine, groupes, select, liste_joueurs, alliance, data) {
		for(var j=0; j<groupes.length; j++) {
			var joueurs = [],
				ligne = document.createElement('option');
			ligne.dataset.n_groupe = j;
			for(var pseudo in liste_joueurs) {
				if((groupes[j].condition == 'droits' && liste_joueurs[pseudo].droits >= groupes[j].valeur) || 
				   (groupes[j].condition == 'role' && chaine[liste_joueurs[pseudo].pseudo] && chaine[liste_joueurs[pseudo].pseudo].role == groupes[j].valeur)) {
					joueurs.push(liste_joueurs[pseudo].pseudo);
				}
			}
			data[alliance][j] = joueurs;
			ligne.id = 'zzzelp_' + groupes[j].id + '_' + alliance;
			ligne.value = 'zzzelp_' + groupes[j].id + '_' + alliance;
			ligne.innerHTML = groupes[j].nom + ' ' + alliance;
			select.appendChild(ligne);
		}
		return data;
	};

	this.addEventGroup = function(select, data) {
		select.onchange = function onchange(event) {
			var joueurs = data[this.dataset.alliance][document.querySelector('#' + this.value).dataset.n_groupe];
			document.querySelector('#objet').value = '[' + document.querySelector('#' + this.value).innerHTML + ']';
			for(var i=0; i<joueurs.length; i++) {
				valideDestinataires(joueurs[i]);
			}
		};
	};

	this.cleanPlayers = function() {
		var joueurs = document.querySelectorAll('.destinataire_valide');
		for(var i=0; i<joueurs.length; i++) {
			ze_Supprimer_element(joueurs[i]);
		}
	};

	this.getMessageZzzelp(1);
}

/* Décode le HTML d'un message */
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.value = html;
    return txt.value;
}

/* Supprime tout le HTML d'une chaine de caractère */
function Nettoyage_HTML(html) {
	return html.replace(/<\/?(?!\!)[^>]*>/gi, '');
}
function ZzzelpScriptPageArmee(zzzelp) {

	var page = this;
	this.noms_lieux = ['','Vers le Terrain de Chasse', 'Vers le Fourmilière', 'Vers la Loge Impériale', ''];
	this.armees = [];
	this.tooltips = '';

	this.init = function() {
		var unites_lieux = ZzzelpScriptArmee.getArmee(document, 1).unites,
			niveaux_lieu = [0, zzzelp.compte.getDome(), zzzelp.compte.getLoge()];

		for(var i=0; i<3; i++) {
			niveaux = {
				armes : zzzelp.compte.getArmes(),
				bouclier : zzzelp.compte.getBouclier(),
				niveau_lieu : niveaux_lieu[i],
				lieu : i
			};
			page.armees.push(new ZzzelpScriptArmee(unites_lieux[i], niveaux));
		}
		page.findTableau();
		if(typeof page.tableau != 'undefined') {
			page.createAntisondeButton();
			page.ameliorerTableau();
			page.lignesVie();
			page.lignesAttaque();
			page.lignesDefense();
			page.lignesConsommation();
			page.lignesHOF();
			page.ligneCapaFlood();
			ze_Inserer_script(page.tooltips);
		}
	};

	this.findTableau = function() {
		var	tableaux = document.querySelectorAll('.simulateur');
		for(i=0;i<tableaux.length;i++) {
			if(tableaux[i].rows[0].cells[0].getAttribute('colspan') == '10') {
				page.tableau = tableaux[i];
			}
		}
	};

	this.ameliorerTableau = function() {
		var lignes = page.tableau.rows;
		document.querySelectorAll('#centre p')[0].innerHTML = '';	
		
		for(var n=2;n<lignes.length;n++) {
			if(lignes[n].cells[0].querySelectorAll('#Vie').length > 0) {
				for(var k=n; k<page.tableau.rows.length; k++) {
					page.tableau.rows[k].innerHTML = '';
				}
				break;
			}
			else {
				var colonnes = lignes[n].cells,
					unite = colonnes[0].querySelector('.pas_sur_telephone');
				if(unite !== null) {
					index_unite = ZzzelpScriptArmee.noms_singulier.indexOf(unite.innerHTML);
					for(var i=1;i<colonnes.length;i++) {
						var contenu = colonnes[i].innerHTML;
						if(~contenu.indexOf('unite') && contenu.indexOf('fleche') == -1) {
							page.ameliorerLigne(i, n, colonnes, index_unite, contenu);
						}
					}
				}
			}
		}
		if((page.armees[1].getHOF() + page.armees[0].getHOF())*Math.pow(0.9, zzzelp.compte.getTDP()) > 86400*2) {
			document.querySelectorAll('.simulateur tr h3')[0].innerHTML = 'Unités en dehors de la loge';
			document.querySelectorAll('.simulateur tr h3')[0].style.color = 'red';
		}

	};

	this.ameliorerLigne = function(i, n, colonnes, index_unite, contenu) {
		var resultats = new RegExp('(.*),([0-3])' + (ComptePlus ? ',' : '') + '(.*)>([ 0-9]+)<\/span>').exec(contenu),
			nombre = parseInt(resultats[4].replace(/ /g,"")),
			lieu = parseInt(resultats[2]),
			className = 'zzzelp_armee_' + n + '_' + i,
			span, img;
		if(!ComptePlus) {
			colonnes[i].querySelector('span').onmouseover = function onmouseover(event) {
				this.setAttribute('style','font-weight:bold'); 
				return false;
			};
			colonnes[i].querySelector('span').onmouseout = function onmouseout(event) {
				this.setAttribute('style','font-weight:normal'); 
				return false;
			};
			colonnes[i].querySelector('span').onclick = function onclick(event) {
				document.querySelector('#nbTroupes').value = this.innerHTML;
				document.querySelector('#ChoixUnite').value = ZzzelpScriptArmee.ordre[index_unite];
			};
			if(lieu > 1) {
				span = document.createElement('span');
				img = document.createElement('img');
				span.setAttribute('style', 'float:right;cursor:pointer');
				span.onclick = function onclick(event) {
					remplirFormulaire(nombre, ZzzelpScriptArmee.ordre[index_unite], lieu, lieu-1);
					document.querySelector('#centre input[type=submit]').type = 'hidden';
					document.querySelector('.simulateur form[action="Armee.php"]').submit();
				};
				img.title = page.noms_lieux[lieu-1];
				img.src = 'images/fleche-champs-gauche.gif';
				span.appendChild(img);
				colonnes[i-1].appendChild(span);
			}
			if(lieu < 3) {
				span = document.createElement('span');
				img = document.createElement('img');
				span.setAttribute('style', 'float:left;cursor:pointer');
				span.onclick = function onclick(event) {
					remplirFormulaire(nombre, ZzzelpScriptArmee.ordre[index_unite], lieu, lieu+1);
					document.querySelector('#centre input[type=submit]').type = 'hidden';
					document.querySelector('.simulateur form[action="Armee.php"]').submit();
				};
				img.title = page.noms_lieux[lieu+1];
				img.src = 'images/fleche-champs-droite.gif';
				span.appendChild(img);
				colonnes[i+1].appendChild(span);
			}
		}
		colonnes[i].querySelector('span').setAttribute('title','');
		colonnes[i].querySelector('span').setAttribute('class', className);
		page.genererTooltipUnite(nombre, index_unite, lieu, className);
	};

	this.genererTooltipUnite = function(nombre, index_unite, lieu, className) {
		var armee = ZzzelpScriptArmee.new_armee_unite(nombre, index_unite, page.armees[lieu-1].niveaux);
		page.genererTooltip(className, [
			{ titre : 'Vie', valeur : armee.getVieAB() },
			{ titre : 'Attaque', valeur : armee.getAttaqueAB() },
			{ titre : 'Défense', valeur : armee.getDefenseAB() }
		]);
	};

	this.genererTooltip = function(className, valeurs) {
		contenu = '$(function() {';
		contenu += 		'$(".' + className + '").tooltip({';
		contenu +=			'position: {my: "left+10 middle",at: "right middle"},';
		contenu +=			'tooltipClass: "warning-tooltip",';
		contenu +=			'content:"<table>';
		for(var i=0; i<valeurs.length; i++) {
			var valeur = isNaN(valeurs[i].valeur) ? valeurs[i].valeur : ze_Nombre(parseInt(valeurs[i].valeur));
			contenu += 				'<tr><td>' + valeurs[i].titre + ' :</td><td>' +  valeur + '</td></tr>';
		}
		contenu +=				'</table>"});});\n';
		page.tooltips += contenu;
	};

	this.lignesVie = function() {
		var ligne = page.tableau.insertRow(-1),
			cell, contenu, className, vie_HB, vie_AB, bonus_bouclier, bonus_lieu;
		ligne.setAttribute('id','zzzelp_vie');
		ligne.setAttribute('style','cursor:pointer');
		cell = ligne.insertCell(0);
		cell.innerHTML = 'Vie';	
		for(var n=0;n<3;n++) {
			vie_HB =  page.armees[n].getVieHB();
			vie_AB = page.armees[n].getVieAB();
			bonus_bouclier = vie_HB*(0.1*page.armees[n].niveaux.bouclier);
			bonus_lieu = vie_AB - vie_HB - bonus_bouclier;
			className = 'tooltip_zzzelp_stats_vie_' + n;
			cell = ligne.insertCell(n+1);
			cell.setAttribute('colspan','3');
			cell.innerHTML = "<img src=\"http://www.fourmizzz.fr/images/icone_coeur.gif\"> " + ze_Nombre(vie_AB);
			cell.setAttribute('class', className);
			cell.setAttribute('title','');
			page.genererTooltip(className, [
				{ titre : 'Vie HB', valeur : vie_HB },
				{ titre : 'Bonus bouclier ', valeur : bonus_bouclier },
				{ titre : 'Bonus lieu', valeur : bonus_lieu}
			]);
		}
		document.querySelector('#zzzelp_vie').onclick = function onclick(event) {
			page.showDetails('zzzelp_details_vie'); 
			return false;
		};
		var JSN, valeur;
		for(k=0; k<2; k++) {
			JSN = (k === 0) ? 'sans' : 'avec';
			ligne = page.tableau.insertRow(-1);
			cell = ligne.insertCell(0);
			ligne.setAttribute('style','display:none');
			ligne.setAttribute('id','zzzelp_details_vie');
			cell.innerHTML = 'Vie full XP (' + JSN + ' JSN)';	
			for(n=0; n<3; n++){
				className = 'tooltip_zzzelp_stats_vie_XP_' + JSN + '_JSN_' + n;
				var armee_XP = page.armees[n].XP(k == 1);
				vie_HB =  armee_XP.getVieHB();
				vie_AB = armee_XP.getVieAB();
				bonus_bouclier = vie_HB*(0.1*armee_XP.niveaux.bouclier);
				bonus_lieu = vie_AB - vie_HB - bonus_bouclier;	
				cell = ligne.insertCell(n+1);
				cell.setAttribute('colspan','3');
				cell.innerHTML = ze_Nombre(vie_AB);
				cell.setAttribute('class',className);
				cell.setAttribute('title','');	
				page.genererTooltip(className, [
					{ titre : 'Gain', valeur : (page.armees[n].isNull() ? 0 : parseInt(((armee_XP.getVieHB()/page.armees[n].getVieHB())-1)*1000)/10) + '%' },
					{ titre : 'Vie HB', valeur : vie_HB },
					{ titre : 'Bonus bouclier', valeur : bonus_bouclier },
					{ titre : 'Bonus lieu', valeur : bonus_lieu }
				]);
			}
		}
	};

	this.lignesAttaque = function() {
		var ligne = page.tableau.insertRow(-1),
			cell, contenu, className, attaque_HB, attaque_AB, bonus_armes;
		ligne.setAttribute('id','zzzelp_attaque');
		ligne.setAttribute('style','cursor:pointer');
		ligne.setAttribute('class','ligne_paire');
		cell = ligne.insertCell(0);
		cell.innerHTML = 'Attaque';	
		for(var n=0;n<3;n++) {
			attaque_HB =  page.armees[n].getAttaqueHB();
			attaque_AB = page.armees[n].getAttaqueAB();
			bonus_armes = attaque_HB*(0.1*page.armees[n].niveaux.armes);
			className = 'tooltip_zzzelp_stats_attaque_' + n;
			cell = ligne.insertCell(n+1);
			cell.setAttribute('colspan','3');
			cell.innerHTML = "<img src=\"http://www.fourmizzz.fr/images/icone_degat_attaque.gif\"> " + ze_Nombre(attaque_AB);
			cell.setAttribute('class', className);
			cell.setAttribute('title','');
			page.genererTooltip(className, [
				{ titre : 'Attaque HB', valeur : attaque_HB },
				{ titre : 'Bonus armes ', valeur : bonus_armes }
			]);
		}
		document.querySelector('#zzzelp_attaque').onclick = function onclick(event) {
			page.showDetails('zzzelp_details_attaque'); 
			return false;
		};
		var JSN, valeur;
		for(k=0; k<2; k++) {
			JSN = (k === 0) ? 'sans' : 'avec';
			ligne = page.tableau.insertRow(-1);
			cell = ligne.insertCell(0);
			ligne.setAttribute('style','display:none');
			ligne.setAttribute('id','zzzelp_details_attaque');
			ligne.setAttribute('class','ligne_paire');
			cell.innerHTML = 'Attaque full XP (' + JSN + ' JSN)';	
			for(n=0; n<3; n++){
				className = 'tooltip_zzzelp_stats_attaque_XP_' + JSN + '_JSN_' + n;
				var armee_XP = page.armees[n].XP(k == 1);
				attaque_HB =  armee_XP.getAttaqueHB();
				attaque_AB = armee_XP.getAttaqueAB();
				bonus_armes = attaque_HB*(0.1*armee_XP.niveaux.armes);
				cell = ligne.insertCell(n+1);
				cell.setAttribute('colspan','3');
				cell.innerHTML = ze_Nombre(attaque_AB);
				cell.setAttribute('class',className);
				cell.setAttribute('title','');	
				page.genererTooltip(className, [
					{ titre : 'Gain', valeur : (page.armees[n].isNull() ? 0 : parseInt(((armee_XP.getAttaqueHB()/page.armees[n].getAttaqueHB())-1)*1000)/10) + '%' },
					{ titre : 'Attaque HB', valeur : attaque_HB },
					{ titre : 'Bonus armes', valeur : bonus_armes }
				]);
			}
		}
	};

	this.lignesDefense = function() {
		var ligne = page.tableau.insertRow(-1),
			cell, contenu, className, defense_HB, defense_AB, bonus_armes;
		ligne.setAttribute('id','zzzelp_defense');
		ligne.setAttribute('style','cursor:pointer');
		cell = ligne.insertCell(0);
		cell.innerHTML = 'Défense';	
		for(var n=0;n<3;n++) {
			defense_HB =  page.armees[n].getDefenseHB();
			defense_AB = page.armees[n].getDefenseAB();
			bonus_armes = defense_HB*(0.1*page.armees[n].niveaux.armes);
			className = 'tooltip_zzzelp_stats_defense_' + n;
			cell = ligne.insertCell(n+1);
			cell.setAttribute('colspan','3');
			cell.innerHTML = "<img src=\"http://www.fourmizzz.fr/images/icone_degat_defense.gif\"> " + ze_Nombre(defense_AB);
			cell.setAttribute('class', className);
			cell.setAttribute('title','');
			page.genererTooltip(className, [
				{ titre : 'Défense HB', valeur : defense_HB },
				{ titre : 'Bonus armes ', valeur : bonus_armes }
			]);
		}
		document.querySelector('#zzzelp_defense').onclick = function onclick(event) {
			page.showDetails('zzzelp_details_defense'); 
			return false;
		};
		var JSN, valeur;
		for(k=0; k<2; k++) {
			JSN = (k === 0) ? 'sans' : 'avec';
			ligne = page.tableau.insertRow(-1);
			cell = ligne.insertCell(0);
			ligne.setAttribute('style','display:none');
			ligne.setAttribute('id','zzzelp_details_defense');
			cell.innerHTML = 'Défense full XP (' + JSN + ' JSN)';	
			for(n=0; n<3; n++){
				className = 'tooltip_zzzelp_stats_defense_XP_' + JSN + '_JSN_' + n;
				var armee_XP = page.armees[n].XP(k == 1);
				defense_HB =  armee_XP.getDefenseHB();
				defense_AB = armee_XP.getDefenseAB();
				bonus_armes = defense_AB*(0.1*armee_XP.niveaux.armes);
				cell = ligne.insertCell(n+1);
				cell.setAttribute('colspan','3');
				cell.innerHTML = ze_Nombre(defense_AB);
				cell.setAttribute('class',className);
				cell.setAttribute('title','');	
				page.genererTooltip(className, [
					{ titre : 'Gain', valeur : (page.armees[n].isNull() ? 0 : parseInt(((armee_XP.getDefenseHB()/page.armees[n].getDefenseHB())-1)*1000)/10) + '%' },
					{ titre : 'Défense HB', valeur : defense_HB },
					{ titre : 'Bonus armes', valeur : bonus_armes }
				]);
			}
		}
	};

	this.lignesConsommation = function() {
		var ligne = page.tableau.insertRow(-1),
			cell, contenu, className, consommation;
		ligne.setAttribute('id','zzzelp_conso');
		ligne.setAttribute('style','cursor:pointer');
		ligne.setAttribute('class','ligne_paire');
		cell = ligne.insertCell(0);
		cell.innerHTML = 'Consommation journalière';	
		for(var n=0;n<3;n++) {
			consommation = page.armees[n].getConsommation();
			cell = ligne.insertCell(n+1);
			cell.setAttribute('colspan','3');
			cell.innerHTML = "<img src=\"http://www.fourmizzz.fr/images/icone_pomme.gif\"> " + ze_Nombre(consommation);
		}
		document.querySelector('#zzzelp_conso').onclick = function onclick(event) {
			page.showDetails('zzzelp_details_conso'); 
			return false;
		};
		var JSN, valeur;
		for(k=0; k<2; k++) {
			JSN = (k === 0) ? 'sans' : 'avec';
			ligne = page.tableau.insertRow(-1);
			cell = ligne.insertCell(0);
			ligne.setAttribute('style','display:none');
			ligne.setAttribute('id','zzzelp_details_conso');
			ligne.setAttribute('class','ligne_paire');
			cell.innerHTML = 'Consommation full XP (' + JSN + ' JSN)';	
			for(n=0; n<3; n++){
				var armee_XP = page.armees[n].XP(k == 1);
				consommation = armee_XP.getConsommation();
				cell = ligne.insertCell(n+1);
				cell.setAttribute('colspan','3');
				cell.innerHTML = ze_Nombre(consommation);
			}
		}
	};

	this.lignesHOF = function() {
		var ligne = page.tableau.insertRow(-1),
			cell, contenu, className, HOF;
		ligne.setAttribute('id','zzzelp_HOF');
		ligne.setAttribute('style','cursor:pointer');
		cell = ligne.insertCell(0);
		cell.innerHTML = 'Années de ponte';	
		for(var n=0;n<3;n++) {
			HOF = page.armees[n].getHOFAnnees();
			cell = ligne.insertCell(n+1);
			cell.setAttribute('colspan','3');
			cell.innerHTML = "<img src=\"http://www.fourmizzz.fr/images/icone_sablier.gif\"> " + ze_Nombre(HOF);
		}
		document.querySelector('#zzzelp_HOF').onclick = function onclick(event) {
			page.showDetails('zzzelp_details_HOF'); 
			return false;
		};
		var JSN, valeur;
		for(k=0; k<2; k++) {
			JSN = (k === 0) ? 'sans' : 'avec';
			ligne = page.tableau.insertRow(-1);
			cell = ligne.insertCell(0);
			ligne.setAttribute('style','display:none');
			ligne.setAttribute('id','zzzelp_details_HOF');
			cell.innerHTML = 'Années full XP (' + JSN + ' JSN)';	
			for(n=0; n<3; n++){
				var armee_XP = page.armees[n].XP(k == 1);
				HOF = armee_XP.getHOFAnnees();
				cell = ligne.insertCell(n+1);
				cell.setAttribute('colspan','3');
				cell.innerHTML = ze_Nombre(HOF);
			}
		}
	};

	this.ligneCapaFlood = function() {
		var ligne = page.tableau.insertRow(-1);
		ligne.setAttribute('id','zzzelp_CDF');
		ligne.setAttribute('class','ligne_paire');
		cell = ligne.insertCell(0);
		cell.innerHTML = 'Capacité de flood';	
		for(var n=0;n<3;n++) {
			cell = ligne.insertCell(n+1);
			cell.setAttribute('colspan','3');
			cell.innerHTML = "<img src=\"http://www.fourmizzz.fr/images/favicon.gif\"> " + ze_Nombre(page.armees[n].getCapaFlood());
		}
	};

	this.showDetails = function(id) {
		var lignes = document.querySelectorAll('#' + id);
		for(var i=0;i<lignes.length;i++) {
			lignes[i].style.display = (lignes[i].style.display == 'none') ? '' : 'none';
		}
	};

	this.createAntisondeButton = function() {
		var input = document.createElement('input');
		input.type = 'button';
		input.value = 'Placer antisonde';	
		input.onclick = function onclick(event) {
			var antisonde = ZzzelpScript.parameters('antisonde');
			if(antisonde === null) {
				antisonde = [
							[{ unite : 0, valeur : 1 }],
							[{ unite : 0, valeur : 10000 }]
								];
			}
			Placement_antisonde_Ajax([
				[antisonde[0].unite, antisonde[0].valeur], 
				[antisonde[1].unite, antisonde[1].valeur]], 
				document.querySelector('#t').value, 1, true
			);
		};
		page.tableau.rows[1].cells[0].innerHTML = '';
		page.tableau.rows[1].cells[0].appendChild(input);
	};


	this.init();
}

function ZzzelpScriptAideGhost(zzzelp) {

	var that = this;
	that.TAGs = ZzzelpScript.parameters('ghosts', ['ghosts_guerre']);
	that.alliances_interdites = ZzzelpScript.parameters('ghosts', ['ghosts_hors_guerre']);
	that.options = new Array(
		{
			nom : 'Date d\'envoi', 
			type : 'text',
			id : 'date_envoi_attaque_zzzelp',
			update : true,
			value : ze_Generation_date_v1(time_fzzz() - 3600 ,true)
		},{
			nom : 'Date de retour', 
			id : 'date_retour_attaque_zzzelp',
			type :'text',
			update : true,
			value :  ze_Generation_date_v1(time_fzzz(), true)
		},{
			nom : 'TDC d\'envoi', 
			id : 'TDC_envoi_attaque_zzzelp',
			type : 'text',
			update : true,
			value : ze_Nombre(gTDC)
		},{
			nom : 'Capacité de flood', 
			id : 'capa_flood_zzzelp',
			type : 'text',
			value : ze_Nombre(ZzzelpScriptArmee.getArmee(document, 0).getCapaFlood())
		},{
			nom : 'Autoriser ghost hors guerre', 
			id : 'ghost_externe_zzzelp',
			type : 'checkbox',
			update : true 
		},{
			nom : 'Mode de lancement', 
			id : 'mode_zzzelp',
			selected : 'Auto TDC',
			type : 'select',
			options : new Array('Zzzelpfloods', 'Auto TDC', 'Auto Dôme', 'Auto Loge', 'Manuel TDC', 'Manuel Dôme', 'Manuel Loge')
		}
	);

	this.init = function() {
		that.createSummary();
		that.update();
	};

	this.createSummary = function() {
		var tableau = document.createElement('table');
		tableau.setAttribute('style', 'margin-top:25px');
		tableau.setAttribute('class', 'simulateur');
		tableau.setAttribute('id', 'options_guerre');
		var input;
		for(var i=0; i<that.options.length; i++) {
			var param = that.options[i],
				ligne = tableau.insertRow(i),
				cell1 = ligne.insertCell(0),
				cell2 = ligne.insertCell(1);
			cell1.innerHTML = param.nom + ' :';
			if(param.type == 'select') {
				var select = document.createElement('select');
				for(var j=0; j<param.options.length; j++) {
					var option = document.createElement('option');
					option.innerHTML = param.options[j];
					if(param.selected == param.options[j]) {
						option.selected = true;
					}
					select.appendChild(option);
				}
				select.id = param.id;
				cell2.appendChild(select);
			}
			else {
				input = document.createElement('input');
				input.type = param.type;
				if(param.type == 'text') {
					input.value = param.value;
				}
				cell2.appendChild(input);
				input.id = param.id;
			}
			if(param.update) {
				param.onchange = that.update;
			}
			cell2.setAttribute('style', 'text-align:right');
		}
		var cell = tableau.insertRow(-1),
			center = document.createElement('center');
		input = document.createElement('input');
		cell.setAttribute('colspan', '2');
		input.onclick = function onclick(event) {
			that.update();
		};
		input.type = 'button';
		input.value = 'Actualiser';
		center.appendChild(input);
		cell.appendChild(center);
		document.querySelector('center').appendChild(tableau);		
	};

	this.update = function() {
		that.data = {};
		that.joueurs = {};
		that.pseudos = [];
		that.getData(1);
	};

	this.getData = function(n) {
		var contentType = 'application/x-www-form-urlencoded',
			data = 'etat=tous&terrain_max=' + (gTDC * 3) + '&fourmiliere_attaquable=true&terrain_min=' + (gTDC / 2) + '&page=' + n;
		new ZzzelpScriptAjax({ method : 'POST', domain : 'fourmizzz', url : 'ennemie.php', addDOM : true, contentType : contentType, data : data },
			{ success : function(zone_page) {
				if(zone_page.querySelectorAll('#tabEnnemie').length > 0) {
					var lignes = zone_page.querySelector('#tabEnnemie').rows;
					for(var i=1; i<lignes.length; i++) {
						that.data[lignes[i].cells[1].querySelector('a').innerHTML] = {
							alliance : ((lignes[i].cells[0].querySelectorAll('a').length > 0) ? lignes[i].cells[0].querySelector('a').innerHTML : ''),
							TDC : parseInt(lignes[i].cells[3].innerHTML.replace(/ /g, '')),
							distance : parseInt(lignes[i].cells[5].innerHTML),
							etat : lignes[i].cells[6].innerHTML
									};
					}
					that.getData(n+1);
				}
				else {
					that.prepareData();
				}
			}
		});
	};

	this.prepareData = function() {
		for(var pseudo in that.data) {
			if(that.canGhost(pseudo, that.data[pseudo].alliance)) {
				that.joueurs[pseudo] = that.data[pseudo];
				that.pseudos.push(pseudo);
			}
		}
		new ZzzelpScriptCoordonnees(that.pseudos, [], function(coordonnees) {
			that.coordonnees = coordonnees;
			var valeurs_2 = coordonnees[gpseudo],
				VA = zzzelp.compte.getVitesseAttaque();
			for(pseudo in that.joueurs) {
				var valeurs = coordonnees[pseudo],
					distance = ze_Calcul_distance(valeurs_2.x, valeurs_2.y, valeurs.x, valeurs.y);
				that.joueurs[pseudo].temps_trajet = ze_Calcul_temps_trajet(distance, VA);
				that.joueurs[pseudo].ID = valeurs.ID;
			}
			that.createInterface();
		});
	};

	this.canGhost = function(pseudo, TAG) {
		if(pseudo == gpseudo) {
			return false;
		}
		if(document.querySelector('#ghost_externe_zzzelp').checked) {
			return !in_array(TAG, that.alliances_interdites);
		}
		else {
			return in_array(TAG, that.TAGs);	
		}
	};

	this.createInterface = function() {
		var debut = ze_Date_to_timestamp_v1(document.querySelector('#date_envoi_attaque_zzzelp').value),
			fin = ze_Date_to_timestamp_v1(document.querySelector('#date_retour_attaque_zzzelp').value),
			pseudos = that.quickSort(that.pseudos, that.joueurs, debut, fin);
		pseudos = (pseudos.length > 20 ? pseudos.slice(0,19) : pseudos);
		var	table = document.createElement('table'),
			ligne = table.insertRow(0);
		table.setAttribute('style', 'margin-top:25px');
		table.setAttribute('class', 'simulateur zzzelp_tableau_distances');
		ligne.innerHTML = '<th>Pseudo</th><th>Alliance</th><th>Impact</th><th>Delta</th><th>Lancer</th>';
		for(var i=0; i<pseudos.length; i++) {
			that.createLine(debut, fin, table, pseudos, i);
		}

		if(document.querySelectorAll('.zzzelp_tableau_distances').length > 0) {
			ze_Supprimer_element(document.querySelector('.zzzelp_tableau_distances'));
		}
		document.querySelector('center').appendChild(table);
	};

	this.createLine = function(debut, fin, table, pseudos, i) {
		var	ecart = (debut + that.joueurs[pseudos[i]].temps_trajet - fin),
			ligne = table.insertRow(-1),
			cell = ligne.insertCell(-1),
			lien = document.createElement('a');
		lien.target = '_BLANK';
		lien.href = 'Membre.php?Pseudo=' + pseudos[i];
		lien.innerHTML = pseudos[i];
		cell.appendChild(lien);

		cell = ligne.insertCell(-1);
		lien = document.createElement('a');
		lien.target = '_BLANK';
		lien.href = 'classementAlliance.php?alliance=' + that.joueurs[pseudos[i]].alliance;
		lien.innerHTML = that.joueurs[pseudos[i]].alliance;
		cell.appendChild(lien);

		cell = ligne.insertCell(-1);
		cell.innerHTML = ze_Generation_date_v1(debut + that.joueurs[pseudos[i]].temps_trajet);
		
		cell = ligne.insertCell(-1);
		var span = document.createElement('span');
		span.setAttribute('style', 'float:right;margin-left:15px;color:' + (ecart > 0 ? 'green' : 'red'));
		span.innerHTML = (ecart < 0 ? '-' : '') + ze_Secondes_date(Math.abs(ecart), true);
		cell.appendChild(span);

		cell = ligne.insertCell(-1);
		var img = document.createElement('img');
		img.src= url_zzzelp + 'Images/icone_attaque.gif';
		img.setAttribute('style', 'display:block;margin:auto;cursor:pointer');
		img.onclick = function onclick(event) {
			that.send(pseudos[i]);
		};
		cell.appendChild(img);

	};

	this.quickSort = function(pseudos, joueurs, debut, fin) {
		if(pseudos.length < 2) {
			return pseudos;
		}
		var petit = [],
			grand = [];
		for(var k=1; k<pseudos.length; k++) {
			if(Math.abs(debut - fin + joueurs[pseudos[k]].temps_trajet) > Math.abs(debut - fin + joueurs[pseudos[0]].temps_trajet)) {
				grand.push(pseudos[k]);
			}
			else {
				petit.push(pseudos[k]);
			}
		}
		var res_1 = that.quickSort(petit, joueurs, debut, fin).concat([pseudos[0]], that.quickSort(grand, joueurs, debut, fin));
		return res_1;
	};


	this.send = function(pseudo) {
		var mode = document.querySelector('#mode_zzzelp').value;
		if(mode == 'Zzzelpfloods') {
			var joueurs = [{}],
				cadre = document.createElement('div');
			joueurs[0][gpseudo] = that.coordonnees[gpseudo];
			joueurs[0][pseudo] = that.coordonnees[pseudo];
			joueurs[0][gpseudo].TDC = gTDC;
			joueurs[0][pseudo].TDC = that.joueurs[pseudo].TDC;
			document.querySelector('center').appendChild(cadre);
			var donnees = {
				pseudo : gpseudo,
				serveur : ze_serveur,
				vitesse_attaque : zzzelp.compte.getVitesseAttaque(),
				nombre_unites : parseInt(document.querySelector('#capa_flood_zzzelp').value.replace(/ /g,'')),
				options : true,
				sondes : ZzzelpScript.parameters('sondes'),
				antisonde : ZzzelpScript.parameters('antisonde'),
				placer_antisonde : ZzzelpScript.parameters('parametres', ['zzzelpfloods', 'zzzelpfloods_antisonde']),
				lancement_zzzelp : ZzzelpScript.parameters('parametres', ['zzzelpfloods', 'zzzelpfloods_stockage']),
				aide_relance : ZzzelpScript.parameters('parametres', ['zzzelpfloods', 'zzzelpfloods_relance']),
				valeur_aide_relance : ZzzelpScript.parameters('zzzelpfloods_test', ['mode_relance']),
				anti_synchro : ZzzelpScript.parameters('parametres', ['zzzelpfloods', 'zzzelpfloods_antisynchro']),
				seconde_renvoi : ZzzelpScript.parameters('zzzelpfloods_test', ['seconde'])%60,
				stockage_parametres_zzzelp : true,
				prive : ZzzelpScript.parameters('droits'),
				coordonnees : joueurs,
			};
			Generation_floods(cadre, donnees);
		}
		else {
			var parametres = new RegExp('(.*) (.*)').exec(mode),
				lieux = new Array('TDC', 'Dôme', 'Loge'),
				url_lancement = 'http://' + ze_serveur + '.fourmizzz.fr/ennemie.php?Attaquer=' + that.joueurs[pseudo].ID;
			url_lancement += '&lieu=' + (lieux.indexOf(parametres[2]) + 1) + ((parametres[1] == 'Auto') ? '&zauto=true' : '');
			document.location.href = url_lancement;
		}
		ze_Supprimer_element(document.querySelector('#options_guerre'));
		ze_Supprimer_element(document.querySelector('.zzzelp_tableau_distances'));
	};

	this.init();
}
function ze_MAJ_armee(armee, mode) {
	if(!mode) {
		mode = 1;
	}
	new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'niveaux_script?lieu=armee&niveaux=[' + armee + ']&' },
		{ authentication_issue : function(valeurs) {
			ze_MAJ_armee(armee, mode);		
		}
	});
}

function ze_Envoi_RC_Zzzelp(RC, analyse, mode, dernier) {
	var form = new FormData();
	form.append('RC', JSON.stringify(RC));
	form.append('valeurs', JSON.stringify(analyse));
	new ZzzelpScriptAjax({ method : 'POST', domain : 'zzzelp', url : 'RC_script?', data : form },
		{ succes : function(valeurs) {
			if(FI_guerre && valeurs == 1) {
				FI_guerre.add_RC_cache(RC, analyse);
				if(dernier) {
					FI_guerre.update_FI();
				}
			}
		}, authentication_issue : function(valeurs) {
			ze_Envoi_RC_Zzzelp(RC, valeurs, 2, dernier);
		}
	});
}


function ZzzelpScriptRapport() {

	var that = this;

	that.rapport = {};

	this.etapes = new Array(
		{ nom : 'Récupération des ouvrières', id : 'ouvrieres', index : undefined, actif : ZzzelpScript.parameters('') },
		{ nom : 'Récupération de l\'armée', id : 'armee', index : ZzzelpScriptArmee.noms_pluriel },
		{ nom : 'Récupération des constructions', id : 'constructions', index : Constructions },
		{ nom : 'Récupération des recherches', id : 'recherches', index : Recherches }
	);

	this.init = function() {
		that.createInterface();
		that.getArmee();
	};

	this.createInterface = function() {
		var elements = document.querySelector('#centre').childNodes;
		for(i=0; i<elements.length; i++) {
			if(elements[i].id != 'menu') {
				ze_Supprimer_element(elements[i]);
			}
		}

		var	zone = document.createElement('div'),
			tableau = document.createElement('table');
		zone.id = 'theme_fourmizzz';
		zone.className = 'zone_imports_zzzelp';

		var explications = document.createElement('div'),
			txt = 'Bienvenue sur le créateur de rapport de compte. Cette page a pour but de vous aider à envoyer rapidement les informations suivantes sur Zzzelp : ';
		txt += '<br><ul><li>vos ouvrières</li><li>votre armée</li><li>vos constructions</li><li>vos recherches</li></ul><br>Seuls les joueurs ayant les droits de ';
		txt += '"<i>chef</i>" de votre alliance sur Zzzelp auront accès à ces informations. Grâce à ces données, ces derniers auront une vision plus ';
		txt += 'précise de leur alliance.<br><b>Attention !</b> Cette page ne remplace en aucun cas le stockage de vos informations sur votre compte';
		txt += 'Zzzelp pour le calcul des convois par exemple.';
		explications.innerHTML =  txt;
		explications.setAttribute('style', 'max-width: 600px;margin: auto;padding: 10px;');
		explications.className = 'ligneAmelioration';
		zone.appendChild(explications);
		for(i=0; i<that.etapes.length; i++) {
			var ligne = tableau.insertRow(-1),
				entete = ligne.insertCell(0),
				fait = ligne.insertCell(1),
				actif = ligne.insertCell(2),
				img = document.createElement('img'),
				checkbox = document.createElement('input');
			img.src = url_zzzelp + '/Images/suppression.png';
			img.width = '20';
			fait.appendChild(img);
			checkbox.type = 'checkbox';
			checkbox.checked = true;
			actif.appendChild(checkbox);
			checkbox.dataset.categorie = that.etapes[i].id;
			entete.innerHTML = that.etapes[i].nom;
		}
		document.querySelector('#centre').appendChild(zone);
		zone.appendChild(tableau);
	};

	this.getArmee = function() {
		that.rapport.ouvrieres = [parseInt(gouvrieres)];
		that.validState(0);	
		if(ComptePlus) {
			ZzzelpScriptArmee.getArmeeReine(that.getNiveaux);
		}
		else {
			ZzzelpScriptArmee.getArmeeAjax(that.getNiveaux);
		}		
	};

	this.getNiveaux = function(armee) {
		that.rapport.armee = armee.unites;
		that.validState(1);		
		zzzelp.compte.getNiveauxAjax('construction', function(niveaux) {
			that.rapport.constructions = niveaux;
			that.validState(2);	
			zzzelp.compte.getNiveauxAjax('laboratoire', that.finalizeRetrieve);
		});
	};

	this.finalizeRetrieve = function(niveaux) {
		that.rapport.recherches = niveaux;
		that.validState(3);
		that.modificationInterface();
	};

	this.modificationInterface = function() {
		for(var n=0; n<that.etapes.length; n++) {
			var tableau = document.createElement('table');
			tableau.dataset.valeur = that.etapes[n].id;
			tableau.className = 'zzzelp_rapport';
			for(var i=0; i<that.rapport[that.etapes[n].id].length; i++) {
				that.createLine(tableau, n, i);
			}
			document.querySelector('#theme_fourmizzz').appendChild(tableau);
		}
		var bouton = document.createElement('input');
		bouton.type = 'button';
		bouton.value = 'Envoyer vers Zzzelp';
		bouton.setAttribute('style', 'display:block;margin:auto');
		bouton.onclick = function onclick(event) {
			that.save();
		};
		document.querySelector('#theme_fourmizzz').appendChild(bouton);
	};

	this.createLine = function(tableau, n, i) {
		var ligne = tableau.insertRow(-1),
			entete = ligne.insertCell(0),
			valeur = ligne.insertCell(1),
			input;
		if((that.etapes[n].id == 'constructions' || that.etapes[n].id == 'recherches') && i >= that.etapes[n].index.length) {
			input = document.createElement('select');
		}
		else {
			input = document.createElement('input');
		}
		input.className = 'zzzelp_valeur_rapport';
		input.onkeyup = ze_Ajout_espaces;
		if(that.etapes[n].id == 'ouvrieres') {
			entete.innerHTML = 'Ouvrières';
		}
		else if((that.etapes[n].id == 'constructions' || that.etapes[n].id == 'recherches') && i >= that.etapes[n].index.length) {
			if(i == that.etapes[n].index.length) {
				entete.innerHTML = 'En cours';
			}
			else {
				entete.innerHTML = 'En cours (C+)';
			}
		}
		else {
			entete.innerHTML = that.etapes[n].index[i];
		}
		entete.innerHTML += ' :';
		if((that.etapes[n].id == 'constructions' || that.etapes[n].id == 'recherches') && i >= that.etapes[n].index.length) {
			var option = document.createElement('option');
			option.innerHTML = 'Aucun';
			option.value = 0;
			input.appendChild(option);
			for(var j=0; j<that.etapes[n].index.length; j++) {
				option = document.createElement('option');
				option.innerHTML = that.etapes[n].index[j];
				option.value = j+1;
				input.appendChild(option);
			}
			input.value = that.rapport[that.etapes[n].id][i];
		}
		else {
			input.setAttribute('style', 'width:' + (in_array(that.etapes[n].id, ['armee', 'ouvrieres']) ? '120' : '50') + 'px;float:right;text-align:right;padding-right:3px;');
			input.type = 'text';
			input.value = ze_Nombre(that.rapport[that.etapes[n].id][i]);
		}
		valeur.appendChild(input);		
	};

	this.validState = function(i) {
		document.querySelectorAll('.zone_imports_zzzelp img')[i].src = url_zzzelp + '/Images/valider.png';
	};

	this.save = function() {
		var tableaux = document.querySelectorAll('#theme_fourmizzz table'),
			form = new FormData();
		for(var i=1; i<tableaux.length; i++) {
			if(document.querySelector('input[data-categorie="' + tableaux[i].dataset.valeur + '"]').checked) {
				for(var j=0; j<tableaux[i].rows.length; j++) {
					form.append(tableaux[i].dataset.valeur + '[]', parseInt(tableaux[i].rows[j].querySelector('.zzzelp_valeur_rapport').value.replace(/ /g,'')));
				}
			}
		}
		new ZzzelpScriptAjax({ method : 'POST', domain : 'zzzelp', url : 'rapport_script?alliance=' + galliance + '&', data : form  },
			{ success : function(valeurs) {
				ze_Supprimer_element(document.querySelector('#theme_fourmizzz'));
				var div = document.createElement('div');
				div.innerHTML = 'Données stockées avec succès';
				div.setAttribute('style', 'text-align: center;font-weight: bold;margin: 50px;font-size: 1.2em;');
				document.querySelector('#centre').appendChild(div);		
			}
		});
	};

	this.init();

}




function ZzzelpScriptChaine(zone_page) {


	var that = this;

	this.roles = new Array(
		{ role : 'grenier', regexp : '(convoyeur|grenier|gr)(\\s|)(.*)', place : 3 },
		{ role : 'passeur', regexp : '(passeur|inter|p|finisseur)(\s|)(.*)', place : 3 },
		{ role : 'chasseur', regexp : '(chasseur)', place : 0 }	
	);

	this.init = function(zone_page) {
		if(typeof zone_page == 'undefined') {
			this.zone_page = document;
		}
		else {
			this.zone_page = zone_page;
		}
	};

	this.retrieve = function(lieu, mode) {
		var date_maj = localStorage.getItem('zzzelp_MAJ_rangs_' + ze_serveur),
			rangs = localStorage.getItem('zzzelp_rangs_' + ze_serveur);
		if ((time_fzzz() - date_maj) < 1800  && date_maj && rangs && mode === 0) {
			rangs = JSON.parse(rangs);
			var alliance = (lieu === 0) ? galliance : ze_Analyser_URL('alliance');
			that.show(rangs, lieu, alliance, that.zone_page);
		}
		else {
			localStorage.setItem('zzzelp_MAJ_rangs_' + ze_serveur, time_fzzz());
			new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'rangs_script?alliance=' + galliance + '&', force : mode },
				{ success : function(valeurs) {
					localStorage.setItem('zzzelp_rangs_' + ze_serveur, JSON.stringify(valeurs));
					var alliance =  (lieu === 0) ? galliance : ze_Analyser_URL('alliance');
					that.show(valeurs, lieu, alliance, that.zone_page);
					if(mode == 1) {
						ze_Inserer_message("Actualisation des rangs réussie", 3000);
					}
				}, authentication_issue : function() {
					that.retrieve(lieu, 2);
				}
			});
		}
	};

	this.show = function(rangs, lieu, alliance, zone) {
		if(zone.querySelector('#tabMembresAlliance') === null) {
			setTimeout(function(){
				that.show(rangs, lieu, alliance, zone);
			}, 50);
		}
		else {
			var i, n, t;
			if (ZzzelpScript.parameters('parametres', ['alliance', 'ally_rangs']) || ZzzelpScript.parameters('parametres', ['alliance', 'ally_couleurs'])) {
				console.log('ZzzelpScript : Début placement rangs');
				var l = (lieu === 0) ? [2,3] : [1,2],
					tableau = zone.querySelector('#tabMembresAlliance'),
					lignes = tableau.rows,
					rangs_actuels = {},
					tooltips = '';
				for(i=0; i<rangs.length; i++) {
					rangs[i].alliances = (rangs[i].alliances == "*") ? null : rangs[i].alliances.replace(/ /g, '').split(',');
					if(rangs[i].mode < 2) {
						rangs[i].regle = rangs[i].regle.replace(/ /g, '').split(',');
					}
				}
				for(i=1; i<lignes.length; i++) {
					lignes[i].dataset.rang_zzzelp = 0;
					var pseudo = lignes[i].cells[l[1]].querySelector('a').innerHTML,
						rang = lignes[i].cells[l[0]].innerHTML;
					lignes[i].cells[l[0]].dataset.rangFzzz = rang;
					that.applyRankUsername(rangs, rang, alliance, lignes[i], l, pseudo);
					that.applyRankAlliance(rangs, rang, alliance, lignes[i], l);
					that.applyRankRegExp(rangs, rang, alliance, lignes[i], l);
					that.applyRankContent(rangs, rang, alliance, lignes[i], l);
				}
			}
			if(lieu === 0) {
				that.rankLimitationInterface(true);
			}
		}
	};

	this.applyRankUsername = function(rangs, rang, alliance, ligne, l, pseudo) {
		for(n=0; n<rangs.length; n++) {
			if(rangs[n].alliances === null || ~rangs[n].alliances.indexOf(alliance)) {
				if(rangs[n].mode === '0' && in_array(pseudo, rangs[n].regle)) {
					that.applyRank(ligne, rangs[n].rang_affiche, rangs[n].couleur, rangs[n].role, l);
				}
			}
		}
	};

	this.applyRankAlliance = function(rangs, rang, alliance, ligne, l) {
		for(n=0; n<rangs.length; n++) {
			if(rangs[n].alliances === null || ~rangs[n].alliances.indexOf(alliance)) {
				if(rangs[n].mode == '1' && in_array(alliance, rangs[n].regle)) {
					that.applyRank(ligne, rangs[n].rang_affiche, rangs[n].couleur, rangs[n].role, l);
				}
			}
		}		
	};

	this.applyRankRegExp = function(rangs, rang, alliance, ligne, l) {
		for(n=0; n<rangs.length; n++) {
			if(rangs[n].alliances === null || ~rangs[n].alliances.indexOf(alliance)) {
				if(rangs[n].mode == '2' && rang.match(rangs[n].regle)) {
					var rep = new RegExp(rangs[n].regle).exec(rang);
					var resultat = rangs[n].rang_affiche;
					for(t=1;t<rep.length; t++) {
						resultat = resultat.replace('$' + (t), rep[t]);
					}
					that.applyRank(ligne, resultat, rangs[n].couleur, rangs[n].role, l);					
				}
			}
		}		
	};

	this.applyRankContent = function(rangs, rang, alliance, ligne, l) {
		for(n=0; n<rangs.length; n++) {
			if(rangs[n].alliances === null || ~rangs[n].alliances.indexOf(alliance)) {
				if(rangs[n].mode == '3' && ~rang.indexOf(rangs[n].regle)) {
					that.applyRank(ligne, rangs[n].rang_affiche, rangs[n].couleur, rangs[n].role, l);
				}
			}
		}		
	};

	this.applyRank = function(ligne, valeur, couleur, role, l) {
		if(ligne.dataset.rang_zzzelp != 1) {
			ligne.dataset.role = role;
			if(ZzzelpScript.parameters('parametres', ['alliance', 'ally_rangs'])) {
				ligne.cells[l[0]].innerHTML = valeur;
				ligne.cells[l[0]].setAttribute('title', ligne.cells[l[0]].dataset.rangFzzz);
			}
			if(ZzzelpScript.parameters('parametres', ['alliance', 'ally_couleurs'])) {
				ligne.style.background = '#' + couleur;
			}
		}
		ligne.dataset.rang_zzzelp = 1;
	};

	this.getChaine = function(zone) {
		var roles = {
			grenier : [],
			passeur : [],
			chasseur : []
		};
		for(var role in roles) {
			var joueurs = zone.querySelectorAll('tr[data-role*="' + role + '"]');
			for(var i=0; i<joueurs.length; i++) {
				roles[role].push({
					pseudo : joueurs[i].cells[2].querySelector('a').innerHTML,
					rang : joueurs[i].cells[1].innerHTML,
					TDC : parseInt(joueurs[i].cells[4].innerHTML.replace(/ /g, ''))
				});
			}
		}
		return roles;
	};


	/*
		Gère l'interface permettant d'afficher ou non certains rôles de la chaîne
	*/

	this.rankLimitationInterface = function() {
		if(document.querySelector('img[src*="1rondvert.gif"]') === null) {
			setTimeout(function(){
				that.rankLimitationInterface();
			},25);
		}
		else if(document.querySelectorAll('[data-rang_zzzelp="1"]').length === 0) {
			setTimeout(function(){
				that.rankLimitationInterface();
			},100);
		}
		else {
			var roles = {
					grenier : 'Greniers',
					passeur : 'Passeurs',
					chasseur : 'Chasseurs', 
					allie : 'Alliés',
					hors_chaine : 'Hors Chaines'
				},
				tableau = document.querySelector('img[src*="1rondvert.gif"]').parentNode.parentNode.parentNode,
				n = 0;
			var ligne;
			for(var role in roles) {
				if(n%2 === 0) {
					ligne = document.createElement('tr');
					tableau.appendChild(ligne);
				}
				var cell1 = ligne.insertCell(-1),
					cell2 = ligne.insertCell(-1),
					input = document.createElement('input');
				input.type = 'checkbox';
				input.id = 'affichage_' + role;
				input.checked = that.isRoleChecked(role);
				input.onclick = function onclick(event) {
					that.hideUselessRanks(roles);
				};
				cell1.appendChild(input);
				cell2.innerHTML = roles[role];
				n++;
			}
			ze_Supprimer_element(document.querySelector('#alliance .simulateur h2'));
			ligne = document.querySelector('#alliance .simulateur').insertRow(0);
			var	cell = ligne.insertCell(0);
			cell.setAttribute('colspan', '10');
			cell.setAttribute('style', 'margin-top:20px;text-align:center;cursor:pointer;font-weight:bold;font-style:italic');
			cell.innerHTML = 'Actualiser les rangs';
			cell.onclick = function onclick(event) {
				ze_Importation_rang(0,true);
			};
			
			var zone = document.createElement('div'),
				table = document.createElement('table');
			ligne = table.insertRow(0);
			table.setAttribute('style', 'margin:20px auto');
			table.setAttribute('class', 'simulateur');
			ligne.insertCell(0).innerHTML = '<strong>Rôle</strong>';
			ligne.insertCell(1).innerHTML = '<strong>Membres</strong>';
			ligne.insertCell(2).innerHTML = '<strong>TDC</strong>';
			ligne.insertCell(3).innerHTML = '<strong>%</strong>';
			ligne.setAttribute('style', 'text-align:center');
			
			roles.total = 'Total';
			for(role in roles) {
				ligne = table.insertRow(-1);
				var entete = ligne.insertCell(0),
					membre = ligne.insertCell(1),
					TDC = ligne.insertCell(2),
					pourcentage = ligne.insertCell(3);
				entete.innerHTML = roles[role] + ' : ';
				TDC.innerHTML = 0;
				membre.innerHTML = 0;
				pourcentage.innerHTML = '0%';
				TDC.id = 'TDC_' + role;
				membre.id = 'membre_' + role;
				pourcentage.id = 'pourcentage_' + role;
				TDC.setAttribute('style', 'text-align:right');
				membre.setAttribute('style', 'text-align:right;padding-right:10px;');
				pourcentage.setAttribute('style', 'text-align:right');
			}
			document.querySelector('#alliance').appendChild(zone);
			document.querySelector('#alliance .simulateur').rows[1].cells[0].appendChild(table);
			that.hideUselessRanks(roles);
		}
	};

	this.isRoleChecked = function(role) {
		if(!localStorage['zzzelp_affichage_roles_' + ze_serveur]) {
			localStorage['zzzelp_affichage_roles_' + ze_serveur] = JSON.stringify({grenier : true,passeur : true,chasseur : true, allie : true,hors_chaine : true});
		}
		var affichages_roles = JSON.parse(localStorage['zzzelp_affichage_roles_' + ze_serveur]);
		return affichages_roles[role];
	};

	this.hideUselessRanks = function(roles) {
		var affichages_roles = {},
			stats = {},
			joueurs = document.querySelector('#tabMembresAlliance').rows,
			n = 1;
		for(var role in roles) {
			if(role != 'total') {
				affichages_roles[role] = document.querySelector('#affichage_' + role).checked;
				stats[role] = { TDC : 0, membre : 0 };
			}
		}
		localStorage.setItem('zzzelp_affichage_roles_' + ze_serveur, JSON.stringify(affichages_roles));
		var total = { membre : 0, TDC : 0 };
		for(var i=1; i<joueurs.length; i++) {
			role = (joueurs[i].dataset.role === undefined) ? 'hors_chaine' : ((joueurs[i].dataset.role == 'inconnu') ? 'hors_chaine' : joueurs[i].dataset.role);
			if(affichages_roles[role]) {
				joueurs[i].style.display = '';
				joueurs[i].cells[1].innerHTML = n;
				n += 1;
				stats[role].TDC += parseInt(joueurs[i].cells[5].innerHTML.replace(/ /g, ''));
				stats[role].membre += 1;
				total.TDC += parseInt(joueurs[i].cells[5].innerHTML.replace(/ /g, ''));
				total.membre += 1;
			}
			else {
				joueurs[i].style.display = 'none';
			}
		}
		for (role in stats) {
			document.querySelector('#TDC_' + role).innerHTML = ze_Nombre(stats[role].TDC);
			document.querySelector('#membre_' + role).innerHTML = ze_Nombre(stats[role].membre);
			document.querySelector('#pourcentage_' + role).innerHTML = ze_Nombre(parseInt((stats[role].TDC/total.TDC)*1000)/10) + '%';
			if(document.querySelector('#TDC_' + role).innerHTML === '0' && document.querySelector('#membre_' + role).innerHTML === '0') {
				document.querySelector('#membre_' + role).parentNode.style.display = 'none';
			}
			else {
				document.querySelector('#membre_' + role).parentNode.style.display = '';
			}
		}
		document.querySelector('#TDC_total').innerHTML = ze_Nombre(total.TDC);
		document.querySelector('#membre_total').innerHTML = ze_Nombre(total.membre);
		document.querySelector('#pourcentage_total').innerHTML = '100%';
	};





	/*
		Analyse d'une chaine en fonction de ces rangs
	*/

	this.analyse = function(rangs) {
		if(typeof rangs == 'undefined') {
			rangs = this.getChaine(that.zone_page);	
		}
		var chaine = that.getRoles(rangs);
		chaine = that.getRank(chaine);
		var organisation = that.splitRoles(chaine);
		organisation = that.orderRoles(organisation);

		return that.sortRoles(organisation);
	};


	this.getRoles = function(rangs) {
		var chaine = [];
		for(var i=0; i<that.roles.length; i++) {
			var role = that.roles[i];
			for(var j=0; j<rangs[role.role].length; j++) {
				var rang = rangs[role.role][j].rang.toLowerCase(),
					pseudo = rangs[role.role][j].pseudo,
					TDC = rangs[role.role][j].TDC;
				if(rang.match(new RegExp(role.regexp))) {
					var valeurs = new RegExp(role.regexp).exec(rang);
					chaine.push({ 
						pseudo : pseudo, 
						TDC : TDC, 
						role : role.role,
						titre : valeurs[1],
						place : ((role.place > 0) ? valeurs[role.place] : undefined), 
						rang : rangs[role.role][j].rang 
					});
				}
			}
		}
		return chaine;
	};

	this.getRank = function(chaine) {
		for(n=0; n<chaine.length; n++) {
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
		return chaine;
	};

	this.splitRoles = function(chaine) {
		var organisation = [];
		for(n=0; n<chaine.length; n++) {
			var trouve = false;
			for(i=0; i<organisation.length; i++) {
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
		return organisation;
	};

	this.orderRoles = function(organisation) {
		for(n=0; n<organisation.length; n++) {
			var card = organisation[n].joueurs.length,
				moyenne = 0;
			for(i=0; i<card; i++) {
				moyenne += organisation[n].joueurs[i].TDC / card;
			}
			organisation[n].TDC_moyen = parseInt(moyenne);
			if(in_array(organisation[n].mode, [1,2])) {
				if(card == 1) {
					asc = true;
				}
				else {
					asc = that.getOrderRole(card, organisation[n]);
				}
			}
			else {
				asc = true;
			}
			var variable = in_array(organisation[n].mode, [1,2]) ? 'emplacement' : 'TDC';
			organisation[n].joueurs = that.quicksort(organisation[n].joueurs, asc, variable);
		}
		return organisation;
	};

	this.getOrderRole = function(card, chaine) {
		var TDC_bas, TDC_haut;
		if(card < 4) {
			TDC_bas = (chaine.joueurs[0].emplacement > chaine.joueurs[card-1].emplacement) ? chaine.joueurs[card-1].TDC : chaine.joueurs[0].TDC;
			TDC_haut = (chaine.joueurs[0].emplacement > chaine.joueurs[card-1].emplacement) ? chaine.joueurs[0].TDC : chaine.joueurs[card-1].TDC;	
		}
		else {
			var hauts = [],
				bas = [];
			for(i=0; i<card; i++) {
				if(hauts.length < 2) {
					hauts.push(i);
				}
				else if(chaine.joueurs[i].emplacement > chaine.joueurs[hauts[0]].emplacement && chaine.joueurs[hauts[0]].emplacement < chaine.joueurs[hauts[1]].emplacement) {
					hauts[0] = i;
				}
				else if(chaine.joueurs[i].emplacement > chaine.joueurs[hauts[1]].emplacement) {
					hauts[1] = i;
				}
				if(bas.length < 2) {
					bas.push(i);
				}
				else if(chaine.joueurs[i].emplacement < chaine.joueurs[bas[0]].emplacement && chaine.joueurs[bas[0]].emplacement >chaine.joueurs[bas[1]].emplacement) {
					bas[0] = i;
				}
				else if(chaine.joueurs[i].emplacement < chaine.joueurs[bas[1]].emplacement) {
					bas[1] = i;
				}
			}
			TDC_haut = chaine.joueurs[hauts[0]].TDC + chaine.joueurs[hauts[1]].TDC;
			TDC_bas = chaine.joueurs[bas[0]].TDC + chaine.joueurs[bas[1]].TDC;
		}
		return (TDC_haut > TDC_bas);		
	};

	this.sortRoles = function(organisation) {
		organisation.sort(function(a, b){
			if (a.TDC_moyen < b.TDC_moyen) 
				return 1;
			if (a.TDC_moyen > b.TDC_moyen)
				return -1;
			return 0;
			});
		
		var finale = [];
		n = 1;
		for(i=0; i<organisation.length; i++) {
			for(j=0; j<organisation[i].joueurs.length; j++) {
				finale[organisation[i].joueurs[j].pseudo] = { 
					role : organisation[i].joueurs[j].role, 
					rang : organisation[i].joueurs[j].rang, 
					numero : n 
				};
				n+=1;
			}
		}
		return finale;
	};

	this.quicksort = function(joueurs, asc, variable) {
		if(joueurs.length < 2) {
			return joueurs;
		}
		var petit = [],
			grand = [];
		for(var k=1; k<joueurs.length; k++) {
			if((asc && joueurs[k][variable] > joueurs[0][variable]) || (!asc && joueurs[k][variable] < joueurs[0][variable])) {
				petit.push(joueurs[k]);
			}
			else {
				grand.push(joueurs[k]);
			}
		}
		var res_1 = that.quicksort(petit, asc, variable).concat([joueurs[0]], that.quicksort(grand, asc, variable));
		return res_1;
	};

	this.init();
}
function ZzzelpScriptSmileys(lieu, section) {

	var smileys = this;

	this.section = section;
	this.lieu = lieu;
	this.liste = ZzzelpScript.parameters('smileys');

	this.init = function() {
		if(!smileys.section) {
			smileys.section = document;
		}
		var images = smileys.section.querySelectorAll('img[title=Smiley]');
		for(var n=0; n<images.length; n++) {
			smileys.removeOldInterface(images[n]);
			smileys.addSmileys();
		}
		if(this.lieu == 'MC') {
			this.manageMC();
		}
	};

	this.manageMC = function() {
		var bouton = document.querySelector('.boiteMessagerie input[type="submit"]'),
			txt =  "document.querySelector('#message_collectif').value = ze_Preparation_message(document.querySelector('#message_collectif').value);";
		bouton.setAttribute('onclick', txt + bouton.getAttribute('onclick'));
	};

	this.addSmileys = function(img_source) {
		var element = smileys.section.querySelector('#ze_gestion_smileys_' + smileys.nom_section),
			smileys_section = smileys.section.querySelectorAll('#tousLesSmiley' + smileys.nom_section + ' div'),
			i, j;
		for(j=0; j<smileys_section.length; j++) {
			i = parseInt(smileys_section[j].id.replace('listeSmiley','').substring(0,1));
			if((i > 1 && !ComptePlus) || !in_array('C' + i,smileys.liste[1])) {
				ze_Supprimer_element(smileys_section[j]);
			}
			else {
				smileys_section[j].dataset.npack = 'C' + i;
			}
		}
		i=0;
		for(var pack in smileys.liste[0]) {
			if(smileys.liste[0][pack].liste !== null) {
				smileys.section.querySelector('#tousLesSmiley' + smileys.nom_section).appendChild(smileys.createGroupSmileys(pack, smileys.liste[0][pack], i));
				i++;
			}
		}
	  	var longueur = smileys.section.querySelectorAll('#tousLesSmiley' + smileys.nom_section + ' div[data-npack="' + ze_readCookie('zzzelp_ligne_smiley_' + ze_serveur) + '"]').length,
	  		active;
		if(ze_readCookie('zzzelp_ligne_smiley_' + ze_serveur) !== null && longueur > 0) {
			active = ze_readCookie('zzzelp_ligne_smiley_' + ze_serveur);
		}
		else {
			active = smileys.section.querySelector('#tousLesSmiley' + smileys.nom_section + ' div').dataset.npack;
		}
		ze_createCookie('zzzelp_ligne_smiley_' + ze_serveur, active, 365);
	  
		smileys_section = smileys.section.querySelectorAll('#tousLesSmiley' + smileys.nom_section + ' div');
		for(i=0; i<smileys_section.length; i++) {
			if(smileys_section[i].dataset.npack == active) {
				smileys_section[i].style.display = '';
				smileys_section[i].dataset.affiche = '1';
			}
			else {
				smileys_section[i].style.display = 'none';
				smileys_section[i].dataset.affiche = '0';
			}
		}		
		var content = smileys.section.querySelector('#tousLesSmiley' + smileys.nom_section);
		for(var k=0; k<smileys.liste
			[1].length; k++) {
			if(content.querySelector('div[data-npack="' + smileys.liste[1][k] + '"]') !== null) {
				content.appendChild(content.querySelector('div[data-npack="' + smileys.liste[1][k] + '"]'));
			}
		}
	};

	this.removeOldInterface = function(img_source) {
		smileys.nom_section = new RegExp('changerCookieSmiley\\(\'(.*)\'\\)').exec(img_source.getAttribute('onclick'))[1];
		ze_Supprimer_element(smileys.section.querySelector('#smileyPrecedent' + smileys.nom_section));
		ze_Supprimer_element(smileys.section.querySelector('#smileySuivant' + smileys.nom_section));
		
		smileys.show = (smileys.section.querySelector('#tousLesSmiley' + smileys.nom_section).style.display != 'none');
		var gestion_smileys = smileys.createZone();

		img_source.parentNode.parentNode.insertBefore(gestion_smileys, img_source.parentNode.nextSibling);
		ze_Supprimer_element(img_source);
	};

	this.createZone = function() {
		var gestion_smileys = document.createElement('span'),
			zone_avant = document.createElement('span'),
			avant = document.createElement('img'),
			zone_apres = document.createElement('span'),
			apres = document.createElement('img'),
			zone_open_smiley = document.createElement('span'),
			open_smiley = document.createElement('img');
			
		gestion_smileys.setAttribute('id','ze_gestion_smileys_' + smileys.nom_section);
		zone_apres.onclick = function onclick(event) {
			smileys.changeSmileyPack(true, smileys.nom_section);
		};
		zone_avant.onclick = function onclick(event) {
			smileys.changeSmileyPack(false, smileys.nom_section);
		};
		open_smiley.setAttribute('onclick', 'changerCookieSmiley("' + smileys.nom_section + '")');
		
		open_smiley.src = 'http://zzzelp.fr/Images/Smileys/Zzzelp/smile.gif';
		avant.src = "/images/fleche-champs-gauche.gif";
		apres.src = "/images/fleche-champs-droite.gif";
		avant.id = "smileyPrecedent" + smileys.nom_section;
		apres.id = "smileySuivant" + smileys.nom_section;
		
		zone_avant.style.cursor = 'pointer';
		zone_avant.style.position = 'relative';
		zone_avant.style.top = '2px';
		zone_avant.style.visibility = (smileys.show ? 'visible' : 'hidden');
	 
		zone_apres.style.cursor = 'pointer';
		zone_apres.style.position = 'relative';
		zone_apres.style.top = '2px';
		zone_apres.style.visibility = (smileys.show ? 'visible' : 'hidden');
		
		zone_open_smiley.style.cursor = 'pointer';
		zone_open_smiley.style.position = 'relative';
		zone_open_smiley.style.top = '4px';
		zone_open_smiley.style['margin-left'] = '2px';
		zone_open_smiley.style['margin-right'] = '2px';
		
		zone_avant.appendChild(avant);
		zone_apres.appendChild(apres);
		zone_open_smiley.appendChild(open_smiley);
		gestion_smileys.appendChild(zone_avant);
		gestion_smileys.appendChild(zone_open_smiley);
		gestion_smileys.appendChild(zone_apres);
		return gestion_smileys;
	};

	this.createGroupSmileys = function(pack, donnees, i) {
		var ligne = document.createElement('div');
		ligne.setAttribute('id', 'zone_smileys_zzzelp_' + donnees.ID);
		ligne.setAttribute('style', 'display:none;margin-top:20px');
		ligne.dataset.npack = 'Z'+ donnees.ID;
		ligne.dataset.numero = i;
		for(var k=0; k<donnees.liste.length; k++) {
			var smiley = smileys.createSmiley(pack, donnees.liste[k], donnees.format);
			smileys.addEventSmiley(smiley, i);
			ligne.appendChild(smiley);
		}
		return ligne;
	};

	this.createSmiley = function(pack, name, format) {
	  var smiley = document.createElement('img');
	  smiley.setAttribute('src', 'http://zzzelp.fr/Images/Smileys/' + pack + '/' + name + '.' + format);
	  smiley.setAttribute('style', 'padding:0 2px');
	  smiley.dataset.nom = name;
	  smiley.dataset.pack = pack;
	  return smiley;
	};

	this.addEventSmiley = function(smiley, i) {
		if(smileys.lieu == 'new_MP') {
			arg = 'message_envoi';
		}
		else if(smileys.lieu == 'MC') {
			arg = 'message_collectif';
		}
		else if(~smileys.lieu.indexOf('champ_reponse_')) {
			arg = lieu;
		}
		else {
			arg = 'message';
		}
		smileys.onClick(smiley, arg, 'z' + i + '_'  + smiley.dataset.nom);
	};

	this.onClick = function(smiley, lieu, name) {
		smiley.onclick = function onclick(event) {
			addRaccourciSmiley(lieu, name);
			return false;
		};
	};

	this.sortSmileys = function(ordre) {
		var packs = smileys.section.querySelectorAll('.tousLesSmiley div');
		for (var i=1;i<packs.length;i++) {
			ligne = smileys.section.querySelectorAll('.tousLesSmiley div')[i];
			j = i;
			while (j > 0 && ordre.indexOf(ligne.dataset.npack) > ordre.indexOf(smileys.section.querySelectorAll('.tousLesSmiley div')[j-1].dataset.npack)) {
				smileys.switchPosition(smileys.section.querySelectorAll('.tousLesSmiley div')[j]);
				j--;
			}
		}
	};

	this.switchPosition = function(row) {
		var sibling = row.previousElementSibling,
			anchor = row.nextElementSibling,
			parent = row.parentNode;
		parent.insertBefore(row, sibling);
	};

	this.getPacks = function() {
		var liste = smileys.section.querySelector('div[id*="tousLesSmiley"]').querySelectorAll('div'),
			packs = [];
		for(var k=0; k<liste.length; k++) {
			packs.push(liste[k].id);
		}
		return packs;
	};

	this.changeSmileyPack = function(avancer, id) {
		var zones = document.querySelectorAll('#tousLesSmiley' + id + ' div'),
			e;
		for(var i=0; i<zones.length; i++) {
			if(zones[i].dataset.affiche == '1') {
				if(avancer) {
					e = zones[i].nextElementSibling;
					if(e  === null) {
						e = zones[0];
					}
				}
				else {
					e = zones[i].previousElementSibling;
					if(e === null) {
						e = zones[zones.length-1];
					}
				}
				zones[i].style.display = 'none';
				zones[i].dataset.affiche = '0';
			}
		}
		e.style.display = '';
		e.dataset.affiche = '1';  
		ze_createCookie('zzzelp_ligne_smiley_' + ze_serveur, e.dataset.npack, 365);
	};

	this.init();

}

/* Prépare les divers ajouts au FI tels que les smileys Zzzelp (Page Alliance) */
function ze_Amelioration_FI() {
	if(document.querySelector('.tousLesSmiley') && !document.querySelector('#zzzelp_smileys_places')) {
		var input = document.createElement('input'),
			lieu;
		input.id = 'zzzelp_smileys_places';
		input.type = 'hidden';
		if(document.querySelector('#nouveauSujet')) {
			document.querySelector('#nouveauSujet').appendChild(input);
			lieu = new Array('nouveauSujet', 'NouveauSujet');
		}
		else {
			document.querySelector('#nouveauMessage').appendChild(input);
			lieu = new Array('nouveauMessage', 'NouveauMessage');
		}
		document.querySelector('#forum input[type*="submit"]').setAttribute('onclick', 'document.querySelector(\'#message\').value = ze_Preparation_message(document.querySelector(\'#message\').value);xajax_envoi' + lieu[1] + '(xajax.getFormValues(\'' + lieu[0] + '\')); return false;');
		ZzzelpScriptSmileys('FI');
	}
	setTimeout(function(){ze_Amelioration_FI();},50);
}


function ZzzelpScriptMultiflood() {
	var MF = this;

	this.init = function() {
		MF.addAnimation();
		MF.getDataExplicit();
		MF.getDataImplicit();
		new ZzzelpScriptTraceur({ alliances : MF.alliances, joueurs : MF.joueurs }, MF.sendMF);
	};

	this.getDataExplicit = function() {
		if(ze_Analyser_URL('alliances') == '[]') {
			MF.alliances = [];
		}
		else {
			MF.alliances = ze_Analyser_URL('alliances').substr(1,ze_Analyser_URL('alliances').length-2).replace(/ /g, '').split(',');	
		} 
		if(ze_Analyser_URL('joueurs') == '[]') {
			MF.joueurs = [];
		}
		else {
			MF.joueurs = ze_Analyser_URL('joueurs').substr(1,ze_Analyser_URL('joueurs').length-2).replace(/ /g, '').split(',');	
		}		
	};

	this.getDataImplicit = function() {
		var prio_traceur = ZzzelpScript.parameters('donnees_traceur'),
			a_importer = [],
			traceur = [],
			i;
		if(prio_traceur.alliances.length > 0 && prio_traceur.nombre > 0) {
			for(i=0; i<prio_traceur.alliances.length; i++) {
				if(!(prio_traceur.alliances[i] in MF.alliances)) {
					a_importer.push({
						nom : prio_traceur.alliances[i], 
						mode : 'alliance'
					});
				}
			}
		}
		if(prio_traceur.joueurs.length > 0 && prio_traceur.nombre > 0) {
			for(i=0; i<prio_traceur.joueurs.length; i++) {
				if(!(prio_traceur.joueurs[i] in MF.joueurs)) {
					a_importer.push({
						nom : prio_traceur.joueurs[i], 
						mode : 'joueur'
					});
				}
			}
		}
		for(i=0; i<prio_traceur.nombre; i++) {
			if(a_importer.length > 0) {
				var index = parseInt(a_importer.length * Math.random()),
					choisi = a_importer.splice(index, 1)[0];
				if(choisi.mode == 'alliance') {
					MF.alliances.push(choisi.nom);
				}
				else {
					MF.joueurs.push(choisi.nom);
				}
			}
		}
		if(!(gpseudo in MF.joueurs) && !(galliance in MF.alliances)) {
			MF.joueurs.push(gpseudo);
		}
	};

	this.addAnimation = function() {
		var txt = '<div style="font-weight:bold;color:red;font-size:1.1em;">Chargement du Multiflood en cours</div><div class="loading">';
		txt += '<span class="loader"></span><span class="loader"></span><span class="loader"></span><span class="loader"></span></div>';
		document.querySelector('center').innerHTML = txt + document.querySelector('center').innerHTML;
	};

	this.sendMF = function(data) {
		var hash = SHA256(gpseudo + ze_serveur + time());
		MF.capa_flood = ZzzelpScriptArmee.getArmee(document, 0).getCapaFlood();
		MF.getDataExplicit();
		data.a_afficher = { 
			alliances : MF.alliances,
			joueurs : MF.joueurs
		};
		var form = document.createElement('form'),
			input = document.createElement('input');
		form.setAttribute('method', 'POST');
		form.setAttribute('action', url_zzzelp + '/MF/tableau?serveur=' + ze_serveur + '&cf=' + MF.capa_flood + '&hash=' + hash + '&mode=auto');
		input.setAttribute('name', 'donnees_alliance');
		input.type = 'hidden';
		input.value = encodeURIComponent(JSON.stringify(data));
		form.appendChild(input);
		document.body.appendChild(form);
		form.submit();
	};

	this.init();
}

/* Lance la récupération des coordonnées pour Zzzelpfloods et lance la fonction de préparation pour le Profil (Page Profil) */
function ze_Initialisation_Zzzelpfloods_profil(armee) {
	var capa_flood = armee.getCapaFlood(),
		pseudo = ze_Analyser_URL('Pseudo');
	ze_Lancement_Zzzelpfloods_profil(capa_flood, 1, pseudo);
}

/* Préparation de Zzzelpfloods pour le Profil (Page Profil) */
function ze_Lancement_Zzzelpfloods_profil(capa_flood, n, pseudo, TDC_cible, mode_opti, lancement_auto) {
	new ZzzelpScriptCoordonnees([pseudo], [], function(coordonnees) {
		var TDC_cible = parseInt(document.querySelector('.tableau_score').rows[1].cells[1].innerHTML.replace(/ /g, ''));
		if(n === 0 || (pseudo != gpseudo && gTDC <= 2*TDC_cible && TDC_cible <= gTDC*3)) {
			var joueurs = [{}],
				cadre = document.createElement('div');
			joueurs[0][gpseudo] = coordonnees[gpseudo];
			joueurs[0][pseudo] = coordonnees[pseudo];
			joueurs[0][gpseudo].TDC = gTDC;
			joueurs[0][pseudo].TDC = (typeof TDC_cible == 'undefined') ? parseInt(document.querySelector('.tableau_score').rows[1].cells[1].innerHTML.replace(/ /g, '')) : TDC_cible;
			cadre.setAttribute('class', 'boite_membre');
			if(n === 0) {
				document.querySelector('#centre').appendChild(cadre);
			}
			else {
				document.querySelector('#centre center').insertBefore(cadre, document.querySelectorAll('.boite_membre')[2]);
			}
			var donnees = {
				pseudo : gpseudo,
				serveur : ze_serveur,
				vitesse_attaque : zzzelp.compte.getVitesseAttaque(),
				nombre_unites : capa_flood,
				coordonnees : joueurs,
				options : true,
				sondes : ZzzelpScript.parameters('sondes'),
				antisonde : ZzzelpScript.parameters('antisonde'),
				placer_antisonde : ZzzelpScript.parameters('parametres', ['zzzelpfloods', 'zzzelpfloods_antisonde']),
				lancement_zzzelp : ZzzelpScript.parameters('parametres', ['zzzelpfloods', 'zzzelpfloods_stockage']),
				aide_relance : ZzzelpScript.parameters('parametres', ['zzzelpfloods', 'zzzelpfloods_relance']),
				valeur_aide_relance : ZzzelpScript.parameters('zzzelpfloods_test', ['mode_relance']),
				anti_synchro : ZzzelpScript.parameters('parametres', ['zzzelpfloods', 'zzzelpfloods_antisynchro']),
				seconde_renvoi : ZzzelpScript.parameters('zzzelpfloods_test', ['seconde'])%60,
				stockage_parametres_zzzelp : true,
				prive : ZzzelpScript.parameters('droits'),
				lancement_auto : lancement_auto
					};
			if(typeof mode_opti != 'undefined') {
				donnees.mode = mode_opti;
			}
			console.log(donnees);
			Generation_floods(cadre, donnees);
		}
	});
}
function ZzzelpScriptForum() {

	var that = this;

	this.init = function() {
		this.addWatcher(0);
	};

	this.addWatcher = function(ex_ID) {
		if(document.querySelectorAll('.messageForum div[id*="editTopic"]').length > 0) {
			var ID = parseInt(document.querySelector('.messageForum div[id*="editTopic"]').id.replace('editTopic', ''));
			if(ex_ID != ID) {
				ex_ID = ID;
				that.addShareButton(ID);
			}

		}
		setTimeout(function(){
			that.addWatcher(ex_ID);
		}, 100);
	};

	this.addShareButton = function(ID) {
		document.querySelector('#forum').style.position = 'relative';
		var button = document.createElement('img');
		button.src = url_zzzelp + 'Images/share.png';
		button.setAttribute('style', 'position: absolute;top: -10px;right: 10px;width: 20px;cursor: pointer;');
		button.onclick = function onclick(event) {
			window.prompt('Nécessite ZzzelpScript !', 'http://' + ze_serveur + '.fourmizzz.fr/alliance.php?forum_menu&ID_sujet=' + ID);
		};
		document.querySelector('#forum').appendChild(button);
	}

	this.init();
}

/* Initialise la description des alliances version Zzzelp (Page Description Alliance) */
function ze_Classement_alliance_guerre(alliance) {
	ze_Nettoyer_description_alliance();
	ze_Lien_sondes_classement_alliance();
}

/* Ajoute les cases à cocher pour sonder les joueurs à porté (Page Description Alliance) */
function ze_Lien_sondes_classement_alliance() {
	var lignes = document.querySelector('#tabMembresAlliance').rows,
		entete = document.createElement('th'),
		checkbox = document.createElement('input'),
		cell;
	checkbox.type = 'checkbox';
	checkbox.dataset.actif = 0;
	checkbox.onclick = function onclick(event) {
		this.dataset.actif = (this.dataset.actif === 0) ? 1 : 0;
		var checkboxs = document.querySelectorAll('.cible_zzzelp');
		for(var i=0; i<checkboxs.length; i++) {
			checkboxs[i].checked = (this.dataset.actif == 1);
		}
	};
	entete.appendChild(checkbox);
	lignes[0].appendChild(entete);
	for(var i=1; i<lignes.length; i++) {
		cell = lignes[i].insertCell(-1);
		var pseudo = lignes[i].cells[2].querySelector('a').innerHTML,
			TDC = parseInt(lignes[i].cells[4].innerHTML.replace(/ /g, ''));
		if(pseudo != gpseudo && TDC > gTDC*1/2 && TDC < gTDC*3) {
			checkbox = document.createElement('input');
			checkbox.className = 'cible_zzzelp';
			checkbox.type = 'checkbox';
			cell.appendChild(checkbox);
		}
	}
	ligne = document.querySelector('#tabMembresAlliance').insertRow(-1);
	cell = ligne.insertCell(0);
	bouton = document.createElement('input');
	cell.setAttribute('colspan', '9');
	cell.setAttribute('style', 'line-height: 3.5em;');
	bouton.type = 'button';
	bouton.value = 'Sonder';
	bouton.onclick = function onclick(event) {
		ze_Preparation_sondes_classement_alliance();
	};
	cell.appendChild(bouton);
	
	ze_Ajout_ID_joueurs_sondes();
}

/* Récupère les ID des joueurs à sonder pour lancer les sondes (Page Description Alliance) */
function ze_Ajout_ID_joueurs_sondes() {
	var coordonnees = (typeof localStorage['zzzelp_coordonnees_' + ze_serveur] == 'undefined') ? {} : JSON.parse(localStorage['zzzelp_coordonnees_' + ze_serveur]),
		cibles = document.querySelectorAll('.cible_zzzelp'),
		pseudos = [];
	for (var i=0; i<cibles.length; i++) {		
		var pseudo = cibles[i].parentNode.parentNode.cells[2].querySelector('a').innerHTML;
		if(typeof coordonnees[pseudo] == 'undefined') {
			pseudos.push(pseudo);
		}
	}
	if(pseudos.length > 0) {
		ze_Recuperation_coordonnees(pseudos, []);
	}
	ze_Placement_ID_joueurs_sondes(1);
}

/* Place les ID préalablement récupérés (Page Description Alliance) */
function ze_Placement_ID_joueurs_sondes(n) {
	console.log('Tentative n°' + n);
	var coordonnees = JSON.parse(localStorage['zzzelp_coordonnees_' + ze_serveur]),
		cibles = document.querySelectorAll('.cible_zzzelp'),
		pseudos = [];
	for (var i=0; i<cibles.length; i++) {
		var pseudo = cibles[i].parentNode.parentNode.cells[2].querySelector('a').innerHTML;
		if(typeof coordonnees[pseudo] == 'undefined') {
			pseudos.push(pseudo);
		}
	}
	if(pseudos.length > 0) {
		setTimeout(function(){
			ze_Placement_ID_joueurs_sondes(n+1);
			return false;
		}, 1);
	}
	else {
		for(i=0; i<cibles.length; i++) {
			cibles[i].parentNode.parentNode.dataset.identifiant = coordonnees[cibles[i].parentNode.parentNode.cells[2].querySelector('a').innerHTML].ID;
		}
	}
}

/* Prépare le lancement des sondes via Zzzelpfloods (Page Description Alliance) */
function ze_Preparation_sondes_classement_alliance() {
	var cibles = document.querySelectorAll('.cible_zzzelp:checked'),
		URL = '[', sondes;
	if(ZzzelpScript.parameters('sondes') !== undefined) {
		sondes = ZzzelpScript.parameters('sondes');
	}
	else {
		sondes = [
					[{ unite : 0, valeur : 10000 }],
					[{ unite : 0, valeur : 1 }]
						];
	}		
	if(cibles.length === 0) {
		ze_Inserer_message('Aucune cible sélectionnée', 3000);
	}
	else {
		console.log(sondes);
		for(var t=0;t<cibles.length;t++) {
			URL += ((URL == '[') ? '' : ':') + '1' + ze_Base_10_36(sondes[0].valeur) + ',' + ze_Base_10_36(sondes[0].unite) + ',2;1' + ze_Base_10_36(sondes[1].valeur) + ',' + ze_Base_10_36(sondes[1].unite) + ',3' + ';' + ze_Base_10_36(cibles[t].parentNode.parentNode.dataset.identifiant) + ';' + ze_Base_10_36(10000) + ';' + cibles[t].parentNode.parentNode.cells[2].querySelector('a').innerHTML;
		}
		URL += ']&s=' + ze_serveur;
		URL = 'http://' + ze_serveur + '.fourmizzz.fr/Armee.php?fl=' + URL + '&lf';
		document.location.href = URL;
	}
}

/* Supprime les éléments superflus de la page (Page Description Alliance) */
function ze_Nettoyer_description_alliance() {
	var new_div = document.createElement('div');
	new_div.setAttribute('id','content_alliance');
	new_div.style.display = 'none';
	document.querySelector('#centre').appendChild(new_div);
  
	var elements = document.querySelector('#centre').childNodes,
		nettoyer = false;
	for(var i=0; i<elements.length-2; i++) {
		if(!nettoyer && elements[i].innerHTML == 'Description') {
			nettoyer = true;
		}
		if(nettoyer && elements[i].id != 'tabMembresAlliance') {
			new_div.appendChild(elements[i]);
			i -= 1;
		}
	}
  
	ze_Supprimer_element(document.querySelectorAll('#centre center h2')[1]);
	ze_Supprimer_element(document.querySelectorAll('#centre center h2')[0]);
	ze_Supprimer_element(document.querySelectorAll('#centre center .simulateur')[2]);
	ze_Supprimer_element(document.querySelectorAll('#centre center .simulateur')[1]);
  
	var div_open = document.createElement('div');
	div_open.style['text-align'] = 'center';
	var link_open = document.createElement('a');
	link_open.innerHTML = 'Afficher la description';
	link_open.style.cursor = 'pointer';
	div_open.appendChild(link_open);
	document.querySelector('#centre').insertBefore(div_open,new_div);
	document.querySelector('#centre').appendChild(document.createElement('br'));
	document.querySelector('#centre').appendChild(document.querySelector('#tabMembresAlliance'));
  
	link_open.onclick = function onclick(event) {
		if(link_open.innerHTML == 'Afficher la description') {
			link_open.innerHTML = 'Cacher la description';
			new_div.style.display = 'block';
		}
		else {
			link_open.innerHTML = 'Afficher la description';
			new_div.style.display = 'none';
		}
	};
}

function ZzzelpScriptChasses() {

	chasses = this;

	this.init = function() {
		if(~url.indexOf('&nlc')) {
			var donnees = ze_Analyser_URL('c').substr(1, ze_Analyser_URL('c').length - 2).split('|');
			chasses.valeur = ze_Analyser_URL('v');
			chasses.liste_chasses = [];
			for(var i=0; i<donnees.length; i++) {
				var donnee = donnees[i].split(','),
					valeurs = [];
				for(var n=0; n<donnee.length; n++) {
					valeurs.push(parseInt(ze_Base_36_10(donnee[n])));
				}
				chasses.liste_chasses.push(valeurs);
			}
			chasses.prepareTable();
		}
	};

	this.prepareTable = function() {
		var tableau = document.createElement('table'),
			ligne = tableau.insertRow(0),
			cell = ligne.insertCell(0);
		tableau.setAttribute('style', 'box-shadow:5px 5px 10px rgba(0, 0, 0, 0.65);border:1px solid rgba(0, 0, 0, 0.40);margin-bottom:40px;width:300px');
		ligne.setAttribute('style', 'font-weight:bold;text-align:center');
		cell.setAttribute('colspan', '2');
		cell.innerHTML = 'Stockage sur Zzzelp : EN ATTENTE';
		tableau.setAttribute('id', 'lancement_zzzelp');
		for(var i=0; i<chasses.liste_chasses.length; i++) {
			ligne = tableau.insertRow(-1);
			cell = ligne.insertCell(0);
			var	cell2 = ligne.insertCell(1);
			cell.setAttribute('style', 'font-weight:bold;padding:10px;');
			cell2.setAttribute('style', 'color:red;padding:10px;');
			cell.innerHTML = 'Chasse n°' + (i+1);
			cell2.innerHTML = 'A envoyer';
		}
		document.querySelector('center').insertBefore(tableau, document.querySelector('.simulateur'));
		this.send(1);
	};

	this.send = function(n) {
		var ex_time = parseInt(localStorage.getItem('zzzelp_time_chasses_' + ze_serveur));
		if(chasses.liste_chasses.length > 0) {
			if((time() - ex_time) < 2) {
				setTimeout(function() {
					chasses.send(n);
					return false;
				}, 2000 - time() + ex_time);
			}
			else {
				localStorage.setItem('zzzelp_time_chasses_' + ze_serveur, time());
				var chasse = chasses.liste_chasses[0],
					url_ajax = 'AcquerirTerrain.php',
					contentType = 'application/x-www-form-urlencoded',
					valeurs = '';
				chasses.liste_chasses.shift();
				for(var k=0; k<14; k++) {
					if(chasse[k] !== 0) {
						valeurs += ((valeurs !== '')? '&' : '') + 'unite' + ZzzelpScriptArmee.ID[k] + '=' + chasse[k];
					}
				}
				var data = valeurs + '&AcquerirTerrain=' + chasses.valeur + '&ChoixArmee=1&t=' + document.querySelector('table #t').value;
				new ZzzelpScriptAjax({ method : 'POST', domain : 'fourmizzz', url : url_ajax, addDom : false, data : data, contentType : contentType },
					{ success : function() {
						document.querySelector('#lancement_zzzelp').rows[n].cells[1].style.color = 'green';
						document.querySelector('#lancement_zzzelp').rows[n].cells[1].innerHTML = 'Envoyée';
						chasses.send(n+1);
					}
				});
			}
		}
		else {
			localStorage.removeItem('zzzelp_time_chasses_' + ze_serveur);
			chasses.storeOnZzzelp(1, n);
		}
	};

	this.storeOnZzzelp = function(mode, n) {
		var url_ajax = 'chasses_script?arrivee=' + ze_Analyser_URL('retour') + '&valeur=' + chasses.valeur*(n-1) + '&';
		new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : url_ajax, force : mode },
			{ success : function(valeurs) {
				document.querySelector('#lancement_zzzelp').rows[0].cells[0].style.color = ((valeurs == 1) ? 'green' : 'red');
				document.querySelector('#lancement_zzzelp').rows[0].cells[0].innerHTML = 'Stockage sur Zzzelp : ' + ((valeurs == 1) ? 'REUSSI' : 'ECHOUEE');
			}, authentication_issue : function() {
				chasses.storeOnZzzelp(2, n);
			}
		});
	};

	this.init();
}

/* Ajoute un lien vers le lanceur de chasses de Zzzelp à la page Ressource */
function ze_Affichage_raccourci_chasses() {
	var div = document.createElement('div');
	div.setAttribute('class', 'raccourci_chasse_zzzelp');
	var lien = document.createElement('a');
	lien.href = '/Armee.php?icz';
	lien.innerHTML = 'Chasser avec Zzzelp';
	document.querySelector('#boite_tdc td').insertBefore(div, document.querySelector('.pas_sur_telephone'));
	div.appendChild(lien);
	document.querySelector('.pas_sur_telephone').innerHTML = '';
}

/* Affiche le total des chasses en cours et la date de retour */
function ze_Affichage_resume_chasses() {
	var span = document.querySelectorAll('#boite_tdc td span'),
		TDC = 0;
	for(var i=0;i<span.length;i++) {
		var ligne = span[i].innerHTML;
		if(ligne.match(new RegExp('- Vos chasseuses vont conquérir ([0-9 ]+) cm(.*)'))) {
			var reg = new RegExp('- Vos chasseuses vont conquérir ([0-9 ]+) cm(.*)');
			TDC += parseInt(reg.exec(ligne)[1].replace(/ /g,""));
		}
	}
	document.querySelector('#boite_tdc td').innerHTML += '<br><strong>Total des chasses : ' + ze_Nombre(TDC) + ' cm2</strong>';
}
/* Ajoute un cadre pour afficher les colonies sur plusieurs colonnes et avec leur TDC / alliance (Page Profil) */
function ze_Amelioration_colonies() {
	var colonies = ze_Liste_colonies();
	if(colonies.length > 0) {
		var	cadre = document.createElement('div'),
			contenu = document.createElement('div');
		cadre.setAttribute('class', 'boite_membre');
		cadre.setAttribute('style', 'padding:25px 0');
		contenu.setAttribute('class', 'colonies_zzzelp');
		contenu.setAttribute('style', 'text-align:left; padding-left:15%; padding-bottom:10px;display:none');
		cadre.innerHTML = '<h4>Colonies</h4><a href="#" onclick="ze_Affichage_colonies(true);return false" id="afficher_colonies_zzzelp">Afficher la liste</a>';
		cadre.innerHTML += '<a href="#" onclick="ze_Affichage_colonies(false)" id="masquer_colonies_zzzelp" style="display:none">Masquer la liste</a>';
		cadre.appendChild(contenu);
		document.querySelector('#centre center').appendChild(cadre);
		colonies.sort();
		for(var i=0;i<colonies.length; i++) {
			var ligne = document.createElement('div');
			ligne.setAttribute('class', 'ligne_colonies_zzzelp');
			ligne.innerHTML = ze_Lien_profil(colonies[i]) + '&nbsp(&nbsp<span class="TAG_colonies_zzzelp"></span>&nbsp&nbsp<span class="TDC_colonies_zzzelp"></span>&nbsp)&nbsp';
			contenu.appendChild(ligne);
		}
	}
}

/* Récupère la liste des colonies d'un joueur et supprime l'affichage par défaut (Page Profil) */
function ze_Liste_colonies() {
	var elements = document.querySelector('.boite_membre').querySelectorAll('a'),
		colonies = [];
	for(var i=0; i<elements.length; i++) {
		if(elements[i].parentNode.parentNode.cells[0].innerHTML.length === 0) {
			colonies.push(elements[i].innerHTML);
			ze_Supprimer_element(elements[i].parentNode.parentNode);
		}
	}
	return colonies;
}

/* Affiche ou non le cadre des colonies créé par Zzzelp (Page Profil) */
function ze_Affichage_colonies(visible) {
	document.querySelector('#afficher_colonies_zzzelp').style.display = (visible ? 'none' : '');
	document.querySelector('#masquer_colonies_zzzelp').style.display = (visible ? '' : 'none');
	document.querySelector('.colonies_zzzelp').style.display = (visible ? '' : 'none');
	var colonies = document.querySelectorAll('.ligne_colonies_zzzelp');
	if(visible && colonies[0].querySelector('.TAG_colonies_zzzelp').innerHTML === '') {
		ze_Recuperation_TDC_colonies(colonies,0);
	}
}

/* Récupère pour chaque joueur son TDC et son alliance (Page Profil) */
function ze_Recuperation_TDC_colonies(colonies, i) {
	if(i < colonies.length) {
		var pseudo = colonies[i].querySelector('a').innerHTML;
		new ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : 'Membre.php?Pseudo=' + pseudo, addDOM : true },
			{ success : function(zone_page) {
				var TDC = parseInt(zone_page.querySelector('.tableau_score').rows[1].cells[1].innerHTML.replace(/ /g, '')),
					alliance = (zone_page.querySelector('.boite_membre table').rows[0].querySelector(' a') === null) ? '-' : zone_page.querySelector('.boite_membre table').rows[0].querySelector(' a').innerHTML;
				colonies[i].querySelector('.TAG_colonies_zzzelp').innerHTML = '<a href="http://' + ze_serveur + '.fourmizzz.fr/classementAlliance.php?alliance=' + alliance + '">' + alliance + '</a>';
				colonies[i].querySelector('.TDC_colonies_zzzelp').innerHTML = ze_Nombre_raccourci(TDC, 3);
				ze_Recuperation_TDC_colonies(colonies, i+1);	
			}
		});
	}
}



function ZzzelpScriptTraceur(data, callback) {
	var traceur = this;

	this.values = {
		alliances : [],
		joueurs : []
	};
	this.callback = callback;
	this.alliances = data.alliances;
	this.joueurs = data.joueurs;

	this.get = function() {
		var valeurs = traceur.prepare();
		if(!valeurs) {
			if(!traceur.callback) {
				traceur.sendZzzelp(1);
			}
			else {
				traceur.callback(traceur.values);
			}
		}
		else {
			var prefix = (valeurs.mode == 'alliance') ? 'classementAlliance.php?alliance=' : 'Membre.php?Pseudo=';
			ZzzelpScriptAjax({ method : 'GET', domain : 'fourmizzz', url : prefix + valeurs.valeur, addDOM : true },
				{ success : function(zone_page, ajax) {
					var TDC, alliance, joueur, rang;
					if(zone_page.querySelectorAll('.boite_membre').length === 0) {
						var tableau = zone_page.querySelector('#tabMembresAlliance'),
							lignes = tableau.rows,
							data = [];
						for (var i=1; i<lignes.length; i++) {
							var cases = lignes[i].querySelectorAll('td');
							joueur = cases[2].querySelector('a').innerHTML;
							TDC = parseInt(cases[4].innerHTML.replace(/ /g,""));
							rang = cases[1].innerHTML;
							data.push({ pseudo : joueur, TDC : TDC, rang : rang });
						}
						traceur.values.alliances.push({ alliance : ze_Analyser_URL_2(ajax.url, 'alliance'), valeurs : data, timestamp : time() });
					}
					else {
						TDC = parseInt(zone_page.querySelector('.tableau_score').rows[1].cells[1].innerHTML.replace(/ /g, ''));
						alliance = zone_page.querySelector('.boite_membre table a').innerHTML;
						traceur.values.joueurs.push({ pseudo : ze_Analyser_URL_2(ajax.url, 'Pseudo'), TDC : TDC, alliance : alliance, timestamp : time() });
					}
					traceur.get();
				}
			});
		}
	};

	this.prepare = function() {
		var valeurs;
		if(traceur.alliances.length > 0) {
			valeurs = {
				mode : 'alliance',
				valeur : traceur.alliances.pop()
			};
		}
		else if(traceur.joueurs.length > 0) {
			valeurs = {
				mode : 'joueur',
				valeur : traceur.joueurs.pop()
			};
		}
		return valeurs;
	};

	this.sendZzzelp = function(mode) {
		var form = new FormData();
		form.append('releves', JSON.stringify(traceur.values));
		ZzzelpScriptAjax({ method : 'POST', domain : 'zzzelp', url : 'stockageTDC?', force : mode, data : form },
			{ success : function(valeurs) {
				localStorage.setItem('zzzelp_dernier_traceur_' + ze_serveur, time());
				ZzzelpScriptTraceur.updateDelay(true);
			}, authentication_issue : function() {
				ZzzelpScriptTraceur.sendZzzelp(releves, 2);
			}
		});
	};

	this.get();

}

ZzzelpScriptTraceur.updateDelay = function(premier) {
	if(localStorage.getItem('zzzelp_dernier_traceur_' + ze_serveur) && time() - localStorage.getItem('zzzelp_dernier_traceur_' + ze_serveur) < 60) {
		if(premier) {
			var zone;
			if(document.querySelectorAll('.alerte_zzzelp_traceur').length === 0) {
				zone = document.createElement('div');
				document.querySelector('.zzzelp_donnees_traceur table').style.display = 'none';
				zone.className = 'alerte_zzzelp_traceur';
				zone.setAttribute('style', 'margin: 35px 0;font-weight: bold;line-height: 2.5em;');
				document.querySelector('.zzzelp_donnees_traceur').appendChild(zone);
			}
			else {
				zone = document.querySelector('.alerte_zzzelp_traceur');
			}
			zone.innerHTML = 'Durée depuis la synchro : <br><b id="delais_traceur_zzzelp">0</b> sec';
			zone.style.color = '#32CD32';
		}
		document.querySelector('#delais_traceur_zzzelp').innerHTML = time() - parseInt(localStorage['zzzelp_dernier_traceur_' + ze_serveur]);
		setTimeout(function(){
			ZzzelpScriptTraceur.updateDelay(false);
		},1000);
	}
	else if(document.querySelectorAll('.alerte_zzzelp_traceur').length > 0) {
		ze_Supprimer_element(document.querySelector('.alerte_zzzelp_traceur'));
		document.querySelector('.zzzelp_donnees_traceur table').style.display = '';
	}
};

function ZzzelpScriptPageEnnemie() {

	var that = this;

	this.init = function() {
		if (document.querySelectorAll('#tabEnnemie tr td').length > 10) {
			var lignes = document.querySelector('#tabEnnemie').rows,
				pseudos = [];
			for (var i=1; i<lignes.length; i++) {
				pseudos.push(lignes[i].cells[1].querySelector('a').innerHTML);
			}
			ZzzelpScriptCoordonnees(pseudos, [], that.customize);
		}
	};

	this.customize = function(coordonnees) {
		var lignes = document.querySelector('#tabEnnemie').rows,
			entete = document.createElement('th'),
			attaquant = coordonnees[gpseudo],
			vitesse_attaque = zzzelp.compte.getVitesseAttaque();
		entete.innerHTML = 'Durée';
		lignes[0].appendChild(entete);
		for (var i=1; i<lignes.length; i++) {
			var	pseudo = lignes[i].cells[1].querySelector('a').innerHTML,
				defenseur = coordonnees[pseudo],
				distance = ze_Calcul_distance(attaquant.x, attaquant.y, defenseur.x, defenseur.y),
				temps_trajet = ze_Calcul_temps_trajet(distance, vitesse_attaque),
				cases = lignes[i].celles;
			cell = lignes[i].insertCell(7);
			cell.setAttribute('style', 'text-align:right');
			cell.innerHTML = ze_Secondes_date(temps_trajet);
		}
	};

	this.init();
}
/* MAJ TDC / ouvrieres et retour vers les convois de Zzzelp */
function ze_MAJ_convois() {
	var pseudo = ze_Analyser_URL('pseudo');
	var valeur = ze_Analyser_URL('valeur_convois') ;
	var alliance = ze_Analyser_URL('alliance');
	var ressource = ze_Analyser_URL('ressource');
	document.location.href=url_zzzelp + '/convois/preparation?ressource=' + ressource + '&serveur=' + ze_serveur + '&alliance=' + alliance + '&pseudo=' + pseudo + '&valeur_convois=' + valeur + '&ouvrieres=' + gouvrieres + '&TDC=' + gTDC;
}

/* Envoi d'un convoi */
function ze_Envoi_convois() {
	materiaux = parseInt(ze_Analyser_URL('materiaux'));
	nourriture = parseInt(ze_Analyser_URL('nourriture'));
	pseudo = ze_Analyser_URL('pseudo');
	alliance = ze_Analyser_URL('alliance');
	if(materiaux != 0) {
		document.querySelector('#nbMateriaux').value = ze_Nombre(materiaux);
		document.querySelector('#input_nbMateriaux').value = ze_Nombre(materiaux);
	}
	if(nourriture != 0) {
		document.querySelector('#nbNourriture').value = ze_Nombre(nourriture);
		document.querySelector('#input_nbNourriture').value = ze_Nombre(nourriture);
	}
	localStorage['ValeurConvois' + ze_serveur] = pseudo + ',' + materiaux + ',' + nourriture + ',' + alliance;
	localStorage['ModeConvois' + ze_serveur] = ze_Analyser_URL('mode');
	document.getElementsByName('convoi')[0].type= "hidden";
	document.querySelector('.simulateur form').submit();
}


/* Retour vers Zzzelp après le lancement d'un convois */
function ze_Validation_convois() {
	if (localStorage['ValeurConvois' + ze_serveur] && localStorage['ValeurConvois' + ze_serveur] != '' && document.querySelector('.verificationOK')) {
		mode = localStorage['ModeConvois' + ze_serveur].split(',');
		donnees = localStorage['ValeurConvois' + ze_serveur].split(',');
		localStorage['ValeurConvois' + ze_serveur] = '';
		document.location.href=url_zzzelp + '/convois/modification?alliance=' + donnees[3] + '&serveur=' + ze_serveur + '&pseudo=' + donnees[0] + '&materiaux=' + donnees[1] + '&nourriture=' + donnees[2];
	}
}

/* Colorise les joueurs a porté */
function ze_Amelioration_membres_alliance(lieu) {
	if(document.querySelectorAll('#tabMembresAlliance').length === 0) {
		setTimeout(function(){ze_Amelioration_membres_alliance(lieu);return false;}, 1);
	}
	else {
		var l = (lieu === 0) ? [3,5] : [2,4],
			tableau = document.querySelector('#tabMembresAlliance'),
			lignes = tableau.rows;
		for (var i=1; i<lignes.length; i++) {
			var cases = lignes[i].cells,
				pseudo = cases[l[0]].querySelector('a').innerHTML,
				TDC = parseInt(cases[l[1]].innerHTML.replace(/ /g,""));
			if(pseudo == gpseudo) {
				cases[l[0]].setAttribute('class', 'zzzelp_utilisateur');
				cases[l[1]].setAttribute('class', 'zzzelp_utilisateur');
			}
			else if(TDC > gTDC*1/2 && TDC < gTDC*3) {
				cases[l[0]].setAttribute('class', 'zzzelp_a_porte');
				cases[l[1]].setAttribute('class', 'zzzelp_a_porte');
			}
		}
	}
}


function ze_Amelioration_classement_alliances() {
	if(ze_Analyser_URL('type_classement') == 'alliance_total') {
		document.querySelector('#league').value = 0;
		demande_classement(0);
	}
	else if(!ze_Analyser_URL('type_classement')) {
		document.querySelector('#league').value = 0;
		demande_classement(1);
	}
}
/* Met à jour les statistiques en fonction de la page visitée */
function ze_Gestion_statistiques() {
	if(localStorage['zzzelp_statistiques_' + ze_serveur] && url.match(new RegExp('fourmizzz.fr\/(.*).php'))) {
		var statistiques = JSON.parse(localStorage['zzzelp_statistiques_' + ze_serveur]),
			page = new RegExp('fourmizzz.fr\/(.*).php').exec(url)[1];
		if(page in statistiques.pages) {
			statistiques.pages[page] += 1;
		}
		localStorage['zzzelp_statistiques_' + ze_serveur] = JSON.stringify(statistiques);
	}
}

/* Affectation des ouvrieres (Page Ressource) */
function ze_Affecter_ouvrieres() {
	var RecolteMateriaux = parseInt(document.querySelector('#RecolteMateriaux').value.replace(/ /g,""));
	var RecolteNourriture = parseInt(document.querySelector('#RecolteNourriture').value.replace(/ /g,""));
	if ((RecolteMateriaux + RecolteNourriture < gTDC ) && (RecolteMateriaux + RecolteNourriture < gouvrieres * 0.99999 )) {
		document.querySelector('#RecolteMateriaux').value = Math.min(gouvrieres - RecolteNourriture,gTDC - RecolteNourriture);
		document.getElementsByName('ChangeRessource')[0].type= "hidden";
		document.forms[0].submit();
	}
}

/* Applique les modifications du compte Fzzz à Zzzelp */
function ze_ModifCompte() {
	if(~document.querySelector('#centre').innerHTML.indexOf('Le fuseau a été modifié')) {
		ze_SynchronisationParametres(true)
	}
}
function ZzzelpScriptAide(section) {

	var that = this;

	this.section = (typeof section == 'undefined') ? '' : section;

	this.init = function(mode) {
		new ZzzelpScriptAjax(that.getAjaxData(mode),
			{ success : function(values) {
				that.create(values);
			}, authentication_issue : function() {
				that.init(2);
			}
		});		
	};

	this.getAjaxData = function(mode) {
		var data = {
			method : 'GET',
			force : mode
		};
		if(typeof gpseudo != 'undefined') {
			data.domain = 'zzzelp';
			data.url = 'aide_script?';
		}
		else {
			data.domain = 'zzzelp_interne';
			data.url = 'aide_data';
		}
		return data;
	};

	this.create = function(values) {
		this.data = values;
		this.createInterface();
	};

	this.createInterface = function() {
		var fond = document.createElement('div'),
			fenetre = document.createElement('div'),
			entete = document.createElement('header'),
			titre_sommaire = document.createElement('span'),
			contenu_sommaire = document.createElement('div'),
			barre_boutons = document.createElement('div'),
			bouton_quitter = document.createElement('img'),
			bouton_sommaire = document.createElement('img');
		titre_sommaire.innerHTML = 'Aide de ZzzelpScript';
		titre_sommaire.className = 'zzzelp_titre_FAQ';
		titre_sommaire.dataset.section = 0;
		contenu_sommaire.dataset.section = 0;
		contenu_sommaire.dataset.visible = 1;
		contenu_sommaire.className = 'zzzelp_contenu_modal';
		entete.appendChild(titre_sommaire);
		fond.className = 'modal_zzzelp';

		barre_boutons.className = 'zzzelp_modal_boutons';
		bouton_quitter.src = url_zzzelp + '/Images/close.png';
		bouton_quitter.onclick = function onclick(event) {
			ze_Supprimer_element(fond);
		};
		bouton_sommaire.src = url_zzzelp + '/Images/home.png';
		bouton_sommaire.onclick = function onclick(event) {
			that.changeSection(0);
		};
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
		for(var section in that.data) {
			if(section == that.section) {
				showed = i;
			}
			i++;
			var results = that.createSection(section, i);
			entete.appendChild(results.title);
			contenu_sommaire.appendChild(results.link);
			fenetre.appendChild(results.content);
		}
		that.changeSection(showed);	
	};

	this.createSection = function(section, i) {
		var data = that.data[section],
			titre_section = document.createElement('span'),
			lien_section = document.createElement('div'),
			contenu_section = document.createElement('div');
		titre_section.innerHTML = data.titre;
		titre_section.className = 'zzzelp_titre_FAQ';
		titre_section.dataset.section = i;
		titre_section.setAttribute('style', 'display:none');
		contenu_section.className = 'zzzelp_contenu_modal';
		contenu_section.dataset.section = i;
		contenu_section.dataset.visible = 0;

		lien_section.className = 'zzzelp_lien_sommaire';
		lien_section.dataset.section = i;
		lien_section.innerHTML = data.titre;
		lien_section.onclick = function onclick(event) {
			that.changeSection(this.dataset.section);
		};
			
		for(var sous_section in data.contenu) {
			that.createSubSection(contenu_section, sous_section, data.contenu[sous_section]);
		}

		return {
			title : titre_section,
			link : lien_section,
			content : contenu_section
		};
	};

	this.createSubSection = function(section, sous_section, data) {
		var entete_section = document.createElement('h3');
		entete_section.innerHTML = sous_section;
		section.appendChild(entete_section);
		for(var question in data) {
			that.createQuestion(section, question, data[question].contenu);
		}
	};

	this.createQuestion = function(section, question, content) {
		var question_link = document.createElement('div'),
			question_content = document.createElement('div');
		question_link.className = 'zzzelp_question_FAQ';
		question_link.innerHTML = question;
		question_link.onclick = function onclick(event) {
			that.showQuestion(this);
		};
		question_content.setAttribute('style', 'display:none');
		question_content.className = 'zzzelp_reponse_FAQ';
		question_content.innerHTML = '<p>' + content + '</p>';
		section.appendChild(question_link);
		section.appendChild(question_content);
	};

	this.changeSection = function(i) {
		var titres = document.querySelectorAll('.zzzelp_titre_FAQ'),
			contenus = document.querySelectorAll('.zzzelp_contenu_modal');
		for(n=0; n<titres.length; n++) {
			titres[n].style.display = (titres[n].dataset.section == i) ? '' : 'none';
			contenus[n].dataset.visible = (contenus[n].dataset.section == i) ? 1 : 0;
		}		
	};

	this.showQuestion = function(element) {
		element.nextSibling.style.display = (element.nextSibling.style.display == 'none') ? '' : 'none';
	};

	this.init(1);
}
function ZzzelpScript() {

	var zzzelp = this;

	this.version = {
		str : '3.2.4',
		int : 3.24
	};
	this.debug_mode = false;

	this.page_loader = {
		Armee : function() {
			if(~url.indexOf('&zmf')) {
				new ZzzelpScriptMultiflood();
			}
			else if(~url.indexOf('?icz')) {
				var armee = ZzzelpScriptArmee.getArmee(document, 0);
				document.location.href = url_zzzelp + '/chasses/preparation?serveur=' + ze_serveur + '&armee=[' + armee.unites + ']';
			}
			else if(~url.indexOf('?lg')) {
				new ZzzelpScriptAideGhost(zzzelp);
			}
			else if(~document.location.href.indexOf('&lf') || ~document.location.href.indexOf('&lz')) {
				LancementZzzelpflood();
			}
			else if(~url.indexOf('&ar')) {
				ze_Aide_Relance(true);
			}
			else {
				var forbidden = 0;
				forbidden += ~url.indexOf('?lg') ? 1 : 0;
				forbidden += ~url.indexOf('?icz') ? 1 : 0;
				forbidden += ~url.indexOf('&zf') ? 1 : 0;
				forbidden += ~url.indexOf('&lf') ? 1 : 0;
				forbidden += ~url.indexOf('&lz') ? 1 : 0;
				forbidden += ~url.indexOf('&paz') ? 1 : 0;
				forbidden += ~url.indexOf('&zmf') ? 1 : 0;
				if(ZzzelpScript.parameters('parametres', ['perso', 'perso_page_armee']) && forbidden === 0) {
					new ZzzelpScriptPageArmee(zzzelp);
				}
				if(ComptePlus && ZzzelpScript.parameters('parametres', ['synchronisation', 'synchro_armee'])) {
					ZzzelpScriptArmee.getArmeeReine(ze_MAJ_armee);
				}
			}
		},

		alliance : function() {
			if (~url.indexOf('Membres')) {
				ze_Amelioration_membres_alliance(0);
				new ZzzelpScriptChaine().retrieve(0, 0);
			}
			else if(document.querySelectorAll('#formulaireChat').length > 0) {
				if(ZzzelpScript.parameters('parametres', ['perso', 'perso_smileys'])) {
					$('#formulaireChat').unbind('submit');
					document.querySelector('#formulaireChat').onsubmit = function onsubmit(e) {
						e.preventDefault();
						ze_Envoi_chat("alliance");
					};
					new ZzzelpScriptSmileys('CA');
				}
			}
			else if (~url.indexOf('messCollectif') && ZzzelpScript.parameters('parametres', ['perso', 'perso_smileys'])) {
				new ZzzelpScriptSmileys('MC');
			}
			else if (~url.indexOf('forum_menu')) {
				new ZzzelpScriptForum();
				var ID_sujet = ze_Analyser_URL('ID_sujet');
				if (ID_sujet) {
					xajax_callGetTopic(parseInt(ID_sujet));
				}
				if(ZzzelpScript.parameters('parametres', ['perso', 'perso_smileys'])) {
					ze_Amelioration_FI();
				}
			}
		},

		AcquerirTerrain : function() {
			new ZzzelpScriptChasses();
		},

		chat : function() {
			if(ZzzelpScript.parameters('parametres', ['perso', 'perso_smileys'])) {
				$('#formulaireChat').unbind('submit');
				document.querySelector('#formulaireChat').onsubmit = function onsubmit(event) {
					event.preventDefault();
					ze_Envoi_chat("general");
				};
				new ZzzelpScriptSmileys('CA');
			}
		},

		classementAlliance : function() {
			var alliance = ze_Analyser_URL('alliance');
			if (alliance) {
				new ZzzelpScriptChaine().retrieve(1, 0);	
				ze_Amelioration_membres_alliance();
				if(ZzzelpScript.parameters('parametres', ['perso', 'perso_page_description'])) {
					ze_Classement_alliance_guerre(alliance);
				}
				var url_MF =  '<li><a class="boutonReine" href="Armee.php?alliances=[' + alliance + ',' + galliance;
				url_MF += ']&joueurs=[]&zmf" target="_BLANK"><span></span>MF ' + alliance + '</a></li>';
				document.querySelector('#menuAlliance').innerHTML +=  url_MF;
				setTimeout(function(){
					if(typeof ze_Traceur != 'undefined') {
						ze_Traceur(alliance);
					}
				}, 500);
			}
		},

		classement2 : function() {
			ze_Amelioration_classement_alliances();
		},
					
		commerce : function() {
			if (~url.indexOf('&ID')) {
				ze_Envoi_convois();
			}
			else {
				ze_Validation_convois();
			}
		},
		
		compte : function() {
			ze_ModifCompte();
		},

		construction : function() {
			zzzelp.compte.getNiveauxDOM(document, 'construction', 1);
		},

		ennemie : function() {
			if(~url.indexOf('&la')) {
				ze_Lancement_attaque();
			}
			else if(ze_Analyser_URL('zauto') == 'true') {
				document.getElementsByName('ChoixArmee')[0].type= "hidden";
				document.querySelector('#formulaireChoixArmee').submit();				
			}
			else if(~url.indexOf('?Attaquer=')) {
				if(ZzzelpScript.parameters('parametres', ['perso', 'perso_lancement_attaques'])) {	
				new ZzzelpScriptPageLancementAttaques(zzzelp);
				}
			}
			else if(ZzzelpScript.parameters('parametres', ['perso', 'perso_lancement_attaques'])) {
				new ZzzelpScriptPageEnnemie();
			}
		},

		laboratoire : function() {
			zzzelp.compte.getNiveauxDOM(document, 'laboratoire', 1);
		},

				
		Membre : function() {
			var joueur = ze_Analyser_URL('Pseudo');
			if(ZzzelpScript.parameters('parametres', ['perso', 'perso_colonies'])) {
				ze_Amelioration_colonies();
			}
			if(joueur) {
				ZzzelpScriptArmee.getArmeeAjax(ze_Initialisation_Zzzelpfloods_profil);
				if(typeof ze_Ajout_raccourci_modal_profil != 'undefined') {
					ze_Ajout_raccourci_modal_profil();
				}				
			}
		},

		messagerie : function() {
			new ZzzelpScriptMessagerie();
		},

		Reine : function() {
			zzzelp.compte.updateOuvrieres(1);
		},
		
		Ressources : function() {
			if (~url.indexOf('valeur_convois')) {
				ze_MAJ_convois();
			}
			else {
				if (!ComptePlus) {
					ze_Affecter_ouvrieres();
				}
				ze_Affichage_resume_chasses();
				ze_Affichage_raccourci_chasses();
			}
		},
		
		tutorial : function() {
			if(~url.indexOf('?iv')) {
				new ZzzelpScriptRapport();
			}
			else if(~url.indexOf('?simu_chasses')) {
				new ZzzelpScriptBotChasse();
			}
		}
	};

	this.insertSyleSheet = function(url) {
		var stylesheet = document.createElement('link');
		stylesheet.href = url;
		stylesheet.rel = 'stylesheet';
		stylesheet.type = 'text/css';
		document.head.appendChild(stylesheet);
	};

	this.getParameters  = function(obligatoire, mode) {
		var menu = zzzelp.getParametersState(obligatoire, mode);
		if (typeof menu != 'undefined' && !zzzelp.debug_mode) {
			zzzelp.main();
		}
		else {
			localStorage.setItem('Maj_Parametres_Zzzelp' + ze_serveur, time_fzzz());
			new ZzzelpScriptAjax({ method : 'GET', domain : 'zzzelp', url : 'parametres_script?', force : mode },
				{ success : function(valeurs) {
					localStorage['zzzelp_parametres_' + ze_serveur] = JSON.stringify(valeurs);
					ze_getTimeZone();
					if(typeof mode == 'undefined' || mode < 4) {
						if(obligatoire) {
							ze_Inserer_message("Synchronisation avec Zzzelp réussie", 3000);
						}
						else {
							zzzelp.main();
						}
					}
				}, authentication_issue : function() {
					zzzelp.getParameters(obligatoire, 2);
				}, unknown_player : function() {
					zzzelp.main();
				}
			});
		}
	};

	this.getParametersState = function (obligatoire, mode) {
		if(mode == 2) {
			return undefined;
		}
		else if(typeof ZzzelpScript.parameters('version') == 'undefined' || ZzzelpScript.parameters('version') < zzzelp.version.int) {
			return undefined;
		}
		else if(typeof localStorage.getItem('Maj_Parametres_Zzzelp' + ze_serveur) == 'undefined') {
			return undefined;
		}
		else if(time() - localStorage.getItem('Maj_Parametres_Zzzelp' + ze_serveur) >= 900) {
			return undefined;
		}
		else if(obligatoire) {
			return undefined;
		}
		else {
			var reussi = localStorage.getItem('zzzelp_authreussie');
			if(ZzzelpScript.auth() < 2 && typeof reussi != 'undefined' && time_fzzz() - reussi < 86400*7) {
				return undefined;
			}
			try {
				return ZzzelpScript.parameters('menu');
			}
			catch(e) {
				return undefined;
			}
		}
	};

	this.setMenu = function(menu, nom) {
		var n = 0,
			actuel = document.querySelector('#' + nom);
		while(document.querySelectorAll('#' + nom + ' li').length % 3 && n<4) {
			n++;
			var vide = document.createElement('li');
			actuel.appendChild(vide);
		}
		var entete_menu = document.createElement('li'),
			barre = document.createElement('a');
		entete_menu.setAttribute('class', 'entete_menu_zzzelp');
		barre.setAttribute('class', 'barre_entete_zzzelp');
		barre.target = '_BLANK';
		barre.href = url_zzzelp;
		barre.innerHTML = 'Zzzelp';
		entete_menu.appendChild(barre);
		actuel.appendChild(entete_menu);
		if(typeof menu != "undefined") {
			actuel.innerHTML += menu;
		}
	};

	this.updateClock = function() {
		setInterval(function() {
			document.querySelector('#boiteComptePlus .titre_colonne_cliquable').innerHTML = ze_Generation_date_precise(time_fzzz());
		}, 50);
	};

	this.initHelp = function() {
		var li = document.createElement('li'),
			a = document.createElement('a');
		a.className = 'boutonIntro';
		a.setAttribute('style', 'cursor:pointer');
		a.onclick = function onclick(event) {
			new ZzzelpScriptAide('zzzelpscript');
		};
		a.innerHTML = '<span></span>Aide ZzzelpScript';
		li.appendChild(a);
		document.querySelector('#menuAide').appendChild(li);
	};

	this.main = function() {
		zzzelp.compte = new ZzzelpScriptCompte();
		if(document.location.pathname.length > 1) {
			new ZzzelpScriptCadre(zzzelp);
		}
		zzzelp.updateClock();
		zzzelp.setMenu(ZzzelpScript.parameters('menu'), 'menuAlliance');
		zzzelp.setMenu(ZzzelpScript.parameters('menucplus'), 'menuComptePlus');
		zzzelp.initHelp();
		if(ZzzelpScript.parameters('parametres', ['perso', 'perso_menu_contextuel'])) {
			new ZzzelpScriptRightClick();
		}
		if(ZzzelpScript.auth() == 2) {
			var page = new RegExp('([a-zA-Z1-9]+).php').exec(document.location.pathname)[1];
			if(page in zzzelp.page_loader) {
				zzzelp.page_loader[page]();
			}
		}
	};

	this.init = function() {
		if(Connecte) {
			zzzelp.insertSyleSheet(url_zzzelp + 'Style/zzzelpUI.css');
			zzzelp.insertSyleSheet(url_zzzelp + 'Style/fonts.css');
			zzzelp.getParameters(false);
		}
	};

	this.init();
}

ZzzelpScript.parameters = function(section, optionnels) {
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
		else if(in_array(section, ['sondes', 'antisonde', 'donnees_traceur', 'menu', 'menucplus', 'modules', 'smileys', 
								   'membres', 'fichiers', 'traceur_perso', 'version', 'script_prive', 'FI_guerre'])) {
			return parametres[section];
		}
	}
	catch(e) {
		return undefined;
	}	
};

ZzzelpScript.auth = function() {
	return ze_readCookie('zzzelp_etat_auth_' + ze_serveur);		
};








if(typeof document.querySelector('#pseudo') != 'undefined' && ~url.indexOf('fourmizzz.fr/')) {
	var url_zzzelp = 'http://zzzelp.fr/',
		coordonnees_souris = {
			x: 0,
			y: 0
		},
		zzzelp_errors = new ZzzelpScriptErrors(),
		zzzelp = new ZzzelpScript();
}