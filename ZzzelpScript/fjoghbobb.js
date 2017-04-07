function Export_FICourant(dernier) {
	if(document.querySelectorAll('.auteurForum').length > 0 && dernier != document.querySelector('#forum h2').innerHTML) {
		var post = document.querySelector('#forum'),
			entetes = post.querySelectorAll('.auteurForum'),
			messages = post.querySelectorAll('.messageForum'),
			form = new FormData(),
			xdr = ze_getXDomainRequest(),
			donnees = {
				titre : post.querySelector('h2').innerHTML,
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



if(~url.indexOf('?forum_menu')) {
	Export_FICourant();
}
