function Aide_admin_messagerie(id) {
	console.log(id);
	var messages = document.querySelector('#table_liste_conversations').rows[document.querySelector('#' + id).rowIndex + 4].querySelectorAll('[id*="message_"]');
		zone = document.createElement('div'),
		conversation = document.querySelector('#table_liste_conversations').rows[document.querySelector('#' + id).rowIndex + 4];
		aides = new Array(
					{ titre : 'Pseudo non rentré', contenu : 'Je ne vois pas ton pseudo ' + ze_serveur + ' à valider sur Zzzelp\n- Tu as bien rentré ton pseudo ' + ze_serveur + ' sur la page [i]Accueil des comptes[/i] sur Zzzelp ?\n- Tu as fais attention aux majuscules / caractères spéciaux (vérifie que le pseudo est toujours bien rentré sur cette page)\n-Tu as repris le compte récemment ?' },
					{ titre : 'Difficulté pour authentifier', contenu : 'Quelques points à vérifier et qui devraient résoudre ton problème {smile} : \n- As-tu bien rentré ton [url=http://zzzelp.fr/compte/accueil]pseudo ' + ze_serveur + '[/url] sur Zzzelp ? et m\'as tu bien demandé de le valider ?\n- As-tu changé de mot de passe Fourmizzz récemment si oui clic sur ce, [url=http://zzzelp.fr/compte/MAJ?serveur=' + ze_serveur + '&code=resethashZC]lien[/url] pour réinitialiser ton authentification et reconnecte toi sur Fourmizzz\n- Si aucun de ces cas ne te concerne, essaye tout simplement de cliquer sur le bouton [i]Authentifier ZzzelpScript[/i] en bas du cadre dédié à Zzzelp' }
	);
	console.log(conversation);
	conversation.querySelector('tr[id*="reactions_"] td').appendChild(zone);
	for(var i=0; i<aides.length; i++) {
		var aide = document.createElement('div');
		aide.setAttribute('style', 'font-weight:bold;margin-left:20px;cursor:pointer');
		aide.dataset.contenu = aides[i].contenu;
		aide.onclick = function onclick(event) {document.querySelector('#champ_reponse_' + id.replace('conversation_','')).innerHTML = this.dataset.contenu };
		aide.innerHTML = aides[i].titre;
		zone.appendChild(aide);
	}	
}

function Simulation_Chasses() {
	var simulations = (typeof localStorage['zzzelp_simulations_chasse'] == 'undefined') ? new Array() : JSON.parse(localStorage['zzzelp_simulations_chasse']);
	if(simulations.length < 1000) {
		if(~document.body.innerHTML.indexOf('Message que recevrait le chasseur:')) {
			var en_face = new RegExp('Troupes en défense : ([^<]+)').exec(document.body.innerHTML)[1].replace('.','').split(','),
				defense = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
			for(var i=0; i<en_face.length; i++) {
				var unite = new RegExp('([0-9 ]+)(.*)').exec(en_face[i]),
					index = ~unites_chasses.noms_singulier.indexOf(unite[2].trim()) ? unites_chasses.noms_singulier.indexOf(unite[2].trim()) : unites_chasses.noms_pluriel.indexOf(unite[2].trim()),
					nombre = parseInt(unite[1].replace(/ /g, ''));
				defense[index] = nombre;
			}
			simulations.push(defense);
			localStorage['zzzelp_simulations_chasse'] = JSON.stringify(simulations);
		}
		document.querySelector('img[title="Placer toute mon armée"]').click();
		document.querySelector('img[title="Placer ou Retirer mes Technologies"]').click();
		document.querySelector('#ATTunite1').value = 1;
		document.querySelector('input[name="quantiteInitial"]').value = 1000000000000000;
		document.querySelector('input[name="simulation"]').click();
	}
}


function Exports_FI() {
	var xdr = ze_getXDomainRequest(),
		form = new FormData();
	form.append('xajax', 'callGetForum');
	form.append('xajar', +new Date())
	xdr.onload = function() {
		var page = ze_getBody(xdr.responseText),
			zone_page = document.createElement('div');
		zone_page.setAttribute('id','contenu_zzzelp');
		zone_page.setAttribute('style','display:none');
		zone_page.innerHTML = page;
		document.querySelector('body').appendChild(zone_page);

		var categories = zone_page.querySelectorAll('.categorie_forum'),
			ID_categories = new Array();
		for(var i=0; i<categories.length; i++) {
			if(categories[i].className != 'categorie_forum') {
				ID_categories.push({
					titre : categories[i].innerHTML,
					ID : new RegExp('forum([0-9]+)').exec(categories[i].className)[1]
				});
			}
		}
		ze_Supprimer_element(zone_page);
		localStorage.removeItem('zzzelp_FI_' + ze_serveur);
		Recuperation_Sujets(ID_categories);
	}
	xdr.open("POST", 'http://' + ze_serveur + '.fourmizzz.fr/alliance.php');
	xdr.send(form);

	function Recuperation_Sujets(ID_categories) {
		var xdr = ze_getXDomainRequest(),
			form = new FormData(),
			ID = ID_categories.pop();
		form.append('xajax', 'callGetForum');
		form.append('xajar', +new Date())
		form.append('xajaxargs[]', ID.ID);
		xdr.onload = function() {
			var page = ze_getBody(xdr.responseText),
				zone_page = document.createElement('div');
			zone_page.setAttribute('id','contenu_zzzelp');
			zone_page.setAttribute('style','display:');
			zone_page.innerHTML = page;
			document.querySelector('body').appendChild(zone_page);
			var sujets = zone_page.querySelectorAll('#form_cat .topic_forum'),
				sujets_categorie = new Array();
			for(var i=0; i<sujets.length; i++) {
				sujets_categorie.push({
					titre : sujets[i].innerHTML,
					ID : new RegExp('xajax_callGetTopic\\(([0-9]+)\\)').exec(String(sujets[i].onclick))[1]
				});
			}
			ze_Supprimer_element(zone_page);
			ID_sujets = (typeof localStorage['zzzelp_FI_' + ze_serveur] == 'undefined') ? new Array() : JSON.parse(localStorage['zzzelp_FI_' + ze_serveur]);
			ID_sujets.push({
				titre : ID.titre,
				sujets : sujets_categorie
			})
			if(ID_categories.length > 0) {
				localStorage['zzzelp_FI_' + ze_serveur] = JSON.stringify(ID_sujets);
				Recuperation_Sujets(ID_categories);
			}
			else {
				localStorage.removeItem('zzzelp_FI_' + ze_serveur);
				document.querySelector('#alliance').innerHTML = '1';
				Recuperation_Posts(ID_sujets, {});
			}
		}
		xdr.open("POST", 'http://' + ze_serveur + '.fourmizzz.fr/alliance.php');
		xdr.send(form);
	}

	function Recuperation_Posts(ID_sujets, donnees) {
		var xdr = ze_getXDomainRequest(),
			form = new FormData();
		if(ID_sujets.length == 0) {
			console.log('FINI !');
			Envoi_FI(donnees);
		}
		else if(ID_sujets[ID_sujets.length - 1].sujets.length == 0) {
			ID_sujets.pop();
			Recuperation_Posts(ID_sujets, donnees);
		}
		else {
			var ID = ID_sujets[ID_sujets.length - 1].sujets.pop(),
				categorie = ID_sujets[ID_sujets.length - 1].titre;
			form.append('xajax', 'callGetTopic');
			form.append('xajar', +new Date())
			form.append('xajaxargs[]', ID.ID);
			xdr.onload = function() {
				var page = ze_getBody(xdr.responseText),
					zone_page = document.createElement('div');
				zone_page.setAttribute('id','contenu_zzzelp');
				zone_page.setAttribute('style','display:none');
				zone_page.innerHTML = page;
				document.querySelector('body').appendChild(zone_page);
				if(typeof donnees[categorie] == "undefined") {
					donnees[categorie] = new Array();
				}
				donnees[categorie].push(Analyse_PostFI(zone_page, ID.titre));
				
				ze_Supprimer_element(zone_page);
				Recuperation_Posts(ID_sujets, donnees);
				document.querySelector('#alliance').innerHTML  = ze_Nombre(parseInt(document.querySelector('#alliance').innerHTML.replace(/ /g, '')) + 1);
			}
			xdr.open("POST", 'http://' + ze_serveur + '.fourmizzz.fr/alliance.php');
			xdr.send(form);
		}
	}
}

function Analyse_PostFI(zone_page, titre) {
	var post = zone_page.querySelector('cmd[t="forum"]'),
		entetes = post.querySelectorAll('.auteurForum'),
		messages = post.querySelectorAll('.messageForum'),
		donnees = {
			titre : titre,
			messages : new Array()
		};
	for(var i=0; i<messages.length; i++) {
		var message = messages[i].querySelector('div[id*="edit"]'),
			spans = message.querySelectorAll('span');
		if(spans.length > 0 && spans[0].querySelectorAll('img[src="images/icone/supprimer.gif"]').length > 0) {
			ze_Supprimer_element(spans[1]);
			ze_Supprimer_element(spans[0]);
		}
		
		donnees.messages.push({
			auteur : entetes[i].querySelector('a').innerHTML,
			date : entetes[i].querySelector('span').innerHTML,
			contenu : ze_HTML_to_BBcode(message.innerHTML)
		});
	}
	return donnees;
}

function Envoi_FI(donnees) {
	var form = new FormData();
}


function Export_FICourant(dernier) {
	if(document.querySelectorAll('.auteurForum').length > 0 && dernier != document.querySelector('#forum h2').innerHTML) {
		var post = document.querySelector('#forum'),
			entetes = post.querySelectorAll('.auteurForum'),
			messages = post.querySelectorAll('.messageForum'),
			form = new FormData(),
			xdr = ze_getXDomainRequest(),
			donnees = {
				categorie : document.querySelector('#cat_forum .ligne_paire[class*="forum"]').innerHTML,
				titre : post.querySelector('h2').innerHTML,
				alliance : galliance,
				messages : new Array()
			};
		for(var i=0; i<messages.length; i++) {
			var message = messages[i].querySelector('div[id*="edit"]'),
				spans = message.querySelectorAll('span');
			
			donnees.messages.push({
				auteur : entetes[i].querySelector('a').innerHTML,
				date : entetes[i].querySelector('span').innerHTML,
				contenu : message.innerHTML.replace(/<span style="position:float;margin-left:([\s\S]*?)<\/span>/g, '')
			});
		}
		form.append('contenu', JSON.stringify(donnees));	
		xdr.onload = function() {
			setTimeout(function(){Export_FICourant(document.querySelector('#forum h2').innerHTML);}, 1000);
		}
		xdr.open('POST', 'http://zzzelp.fr/script_beta?serveur=' + ze_serveur + '&pseudo=' + gpseudo + '&token=' + getTokenZzzelp() + '&alliance=' + galliance + '&action=FI');
		xdr.send(form);	}
	else {
		setTimeout(function(){Export_FICourant(dernier);}, 1000);
	}
}

function ze_Attaques_en_cours() {
	var el_attaques = document.querySelectorAll('center .gras[id*="attaque_"]'),
		el_pseudos = document.querySelectorAll('center .gras a[href*="Membre.php"]'),
		attaques = [];
	for(var i=0; i<el_attaques.length; i++) {
		var valeurs = new RegExp('(([0-9]+) heure(s|) |)(([0-9]+) minute(s|) |)(([0-9]+) seconde(s|)|)').exec(el_attaques[i].innerHTML);
		attaques.push({ pseudo : el_pseudos[i].innerHTML, retour : (time_fzzz() + ((typeof valeurs[8] == 'undefined') ? 0 : parseInt(valeurs[8])) + ((typeof valeurs[5] == 'undefined') ? 0 : parseInt(valeurs[5])*60) + ((typeof valeurs[2] == 'undefined') ? 0 : parseInt(valeurs[2])*3600)) });
	}
	return attaques;
}

function ze_Analyse_traffic() {
	if(!bot.parametres.actif) {
		var page, analyse;
		if(localStorage.getItem('zzzelp_analyse_traffic_' + ze_serveur)) {
			analyse = JSON.parse(localStorage['zzzelp_analyse_traffic_' + ze_serveur]);
		}
		else {
			analyse = { derniere_page : '', timer : 0, historique : [] };
		}
		for(var i=0; i<pages_bot.length; i++) {
			if(~url.indexOf(pages_bot[i])) {
				page = pages_bot[i];
				break;
			}
		}
		if(!page) {
			analyse.derniere_page = '';
			analyse.timer = 0;
		}
		else {
			if(analyse.derniere_page !== '' && time() - analyse.timer < 300) {
				analyse.historique.push({ avant : analyse.derniere_page, apres : page, temps : time() - analyse.timer });
			}
			analyse.derniere_page = page;
			analyse.timer = time();
		}
		localStorage['zzzelp_analyse_traffic_' + ze_serveur] = JSON.stringify(analyse);
		console.log('Historique mis à jour');
	}
}

function Creation_graphe_traffic() {
	var historique = JSON.parse(localStorage['zzzelp_analyse_traffic_' + ze_serveur]).historique,
		graphe = {}, i, j;
	for(i=0; i<pages_bot.length; i++) {
		graphe[pages_bot[i]] = {};
		for(j=0; j<pages_bot.length; j++) {
			graphe[pages_bot[i]][pages_bot[j]] = { probabilite : 0, temps : 0 };
		}
	}
	for(i=0; i<historique.length; i++) {
		graphe[historique[i].avant][historique[i].apres].probabilite ++;
		graphe[historique[i].avant][historique[i].apres].temps += historique[i].temps;
	}
	for(i=0; i<pages_bot.length; i++) {
		var total = 0;
		for(j=0; j<pages_bot.length; j++) {
			total += graphe[pages_bot[i]][pages_bot[j]].probabilite;
		}
		for(j=0; j<pages_bot.length; j++) {
			graphe[pages_bot[i]][pages_bot[j]].temps /= graphe[pages_bot[i]][pages_bot[j]].probabilite;
			graphe[pages_bot[i]][pages_bot[j]].probabilite /= total;
		}
	}
	return graphe;
}

function ze_Recherche_fin_minute(cible, token, horaires, n) {
	if(typeof token == 'undefined') {
		var xdr = ze_getXDomainRequest();
		cible = { pseudo : 'pinto93', ID : 2222 };
		xdr.onload = function() {
			ze_Recherche_fin_minute(cible, new RegExp('<input type="hidden" name="t" id="t" value="(.*)"/>').exec(xdr.responseText)[1]);
		};
		console.log('http://' + ze_serveur + '.fourmizzz.fr/ennemie.php?Attaquer=' + cible.ID + '&lieu=0');
		xdr.open('GET', 'http://' + ze_serveur + '.fourmizzz.fr/ennemie.php?Attaquer=' + cible.ID + '&lieu=0', true);
		xdr.send();		
	}
	else {
		if(typeof horaires == 'undefined') {
			horaires = [];
			n = 0;
		}
		var ms_arrivee = (59000+n*50)%60000,
			ecart = (60000 + ms_arrivee - 41408 - new Date().getMilliseconds() - new Date().getSeconds()*1000)%60000;
		ecart += (ecart < 0) ? 60000 : 0;
		console.log('Attaque n°' + n + ' : ' + ms_arrivee);
		setTimeout(function() {
			var	heure_avant = new Date(),
				xdr = ze_getXDomainRequest();
			xdr.onload = function() {
				var headers = xdr.getAllResponseHeaders().toLowerCase().split('\n'),
					PC = new Date(),
					heure_apres = new Date(),
					numero = n,
					horaires_2 = horaires,
					heure_Fzzz;
				for(var i=0; i<headers.length; i++) {
					if(headers[i].match(new RegExp('date:(.*), ([0-9]+) (.*) ([0-9]+) ([0-9]+):([0-9]+):([0-9]+) gmt'))) {
						var valeurs = new RegExp('date:(.*), ([0-9]+) (.*) ([0-9]+) ([0-9]+):([0-9]+):([0-9]+) gmt').exec(headers[i]);
						heure_Fzzz = new Date(headers[i].replace('date:', ''));
					}
				}
				horaires_2.push({
					heure_PC_avant : heure_avant.getTime(),
					heure_PC_apres : heure_apres.getTime(),
					heure_Fourmizzz : heure_Fzzz.getTime(),
				});
				if(numero<50) {
					ze_Recherche_fin_minute(cible, token, horaires_2, numero+1);
				}
				else {
					console.log(horaires_2);
				}			
			};
			xdr.open('POST', 'http://' + ze_serveur + '.fourmizzz.fr/ennemie.php?Attaquer=' + cible.ID + '&lieu=1', true);
			xdr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xdr.send('unite1=1&lieu=1&ChoixArmee=1&t=' + token);
		}, ecart);
		console.log(ecart);
	}
}

function ze_Calibrage_horloge(horaires, n) {
	if(typeof horaires == 'undefined') {
		horaires = [];
		n = 0;
	}
	console.log('Chargement n°' + n);
	setTimeout(function() {
		var texte = '',
			heure_avant = new Date();
		if(Math.abs(heure_avant.getMilliseconds() - n*50) < 2) {
			var xdr = ze_getXDomainRequest();
			xdr.onload = function() {
				var headers = xdr.getAllResponseHeaders().toLowerCase().split('\n'),
					PC = new Date(),
					heure_apres = new Date(),
					numero = n,
					horaires_2 = horaires,
					heure_Fzzz;
				for(var i=0; i<headers.length; i++) {
					if(headers[i].match(new RegExp('date:(.*), ([0-9]+) (.*) ([0-9]+) ([0-9]+):([0-9]+):([0-9]+) gmt'))) {
						var valeurs = new RegExp('date:(.*), ([0-9]+) (.*) ([0-9]+) ([0-9]+):([0-9]+):([0-9]+) gmt').exec(headers[i]);
						heure_Fzzz = new Date(headers[i].replace('date:', ''));
					}
				}
				horaires_2.push({
					heure_PC_avant : heure_avant.getTime(),
					heure_PC_apres : heure_apres.getTime(),
					heure_Fourmizzz : heure_Fzzz.getTime(),
				});					
				if(numero<19) {
					ze_Calibrage_horloge(horaires_2, numero+1);
				}
				else {
					var ecart;
					for(i=0; i<horaires_2.length+1; i++) {
						var attaque = horaires_2[i%horaires_2.length],
							heure_PC = (attaque.heure_PC_avant + attaque.heure_PC_apres)/2;
							ecart_sec = Math.ceil(heure_PC/1000) - Math.ceil(attaque.heure_Fourmizzz/1000);
						if(typeof ex_ecart != 'undefined' && ecart_sec < ex_ecart) {
							ecart = (ex_heure_PC%1000 + heure_PC%1000)/2-1000;
							break;
						}
						var ex_ecart = ecart_sec,
							ex_heure_PC = heure_PC;
						//console.log(ze_Generation_date_precise(heure_PC/1000) + ':' + parseInt(heure_PC%1000) + '   |   ' + ze_Generation_date_precise(attaque.heure_Fourmizzz/1000) + ':' + parseInt(attaque.heure_Fourmizzz%1000));
					}
					console.log(ecart);
					localStorage.SetItem('zzzelp_ecart_horloge', ecart);
				}
			};
			xdr.open('GET', 'http://' + ze_serveur + '.fourmizzz.fr/Armee.php', true);
			xdr.send();
		}
		else {
			//console.log('Nouvelle tentative');
			ze_Calibrage_horloge(horaires, n);
		}
	}, 1000 - new Date().getMilliseconds() + n*50);
}