function Affichage_commentaires(id) {
	var lignes = document.querySelectorAll('.comment_' + id);
	for(var i=0;i<lignes.length;i++) {
		lignes[i].style.display = '';
	}
	document.querySelector('.show_comment_' + id).style.display = 'none';
}
