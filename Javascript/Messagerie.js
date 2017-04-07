function Affichage_MP(id) {
	if(document.querySelector('#message_' + id).style.display == 'none') {
		document.querySelector('#message_' + id).style.display = '';
	}
	else {
		document.querySelector('#message_' + id).style.display = 'none';
	}
}

function Actualisation_mode_messagerie() {
	var mode = document.querySelector('#mode_MP').value,
		parametres_classique = document.querySelectorAll('.classique'),
		parametres_groupe = document.querySelectorAll('.groupe');
	if(mode == 'classique') {
		var visible = parametres_classique,
			cache = parametres_groupe;
	}
	else {
		var cache = parametres_classique,
			visible = parametres_groupe;
	}
	for(var i=0;i<cache.length;i++) {
		cache[i].style.display = 'none';
	}
	for(var i=0;i<visible.length;i++) {
		visible[i].style.display = '';
	}
}
