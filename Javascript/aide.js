function Menu_debuter_Zzzelp() {
	if(document.body == null) {
		setTimeout(function(){Menu_debuter_Zzzelp()},100);
	}
	else {
		var zone_popup = document.createElement('div'),
			popup = document.createElement('div'),
			contenu = '<h2>Utiliser Zzzelp 3.0</h2>';
		contenu += '<div style="color:red;text-align:center;font-weight:bold;font-size:1.2em;">A lire de A à Z !</div>';
		contenu += '<p>En cas de problème ou d\'incompréhension, commencez par chercher de l\'aide dans la FAQ (Foire aux Questions) accessible via le point d\'interrogation en bas à droite de votre écran.</p>';
		contenu += '<p>Je ne répondrai plus aux demandes de validation de pseudos Fourmizzz, c\'était jusqu\'à présent entre 30 et 50 messages par jour et cela devenait totalement ingérable.</p>';
		contenu += '<p>Vous pouvez maintenant valider vos pseudos Fourmizzz sans mon aide grâce à ZzzelpScript ou à un chef de votre alliance déjà validé (<b>plus de détails sur la FAQ</b>)</p>';
		contenu += '<p><br><input type="button" class="bouton" onclick="Desactiver_menu_debuter_Zzzelp()" value="Ne plus afficher"></p>';
		contenu += '<span style="float:right">delangle</span>';
		zone_popup.setAttribute('class', 'zone_popup');
		popup.setAttribute('class', 'pop-up-display-content');
		popup.setAttribute('id','popup_debuter_zzzelp');
		popup.innerHTML = contenu;
		document.body.appendChild(zone_popup);
		document.body.appendChild(popup);
		console.log(popup);
		$('#popup_debuter_zzzelp').popUpWindow({
				action: "open",
				size: "large",
		});
	}
}

function Desactiver_menu_debuter_Zzzelp() {
	var xdr = ze_getXDomainRequest();
	xdr.open('GET', url_zzzelp + 'aide_debutant?mode=desactiver_aide');
    xdr.send(null);
	$('#popup_debuter_zzzelp').popUpWindow({
			action: "close",
			size: "large",
	});
}