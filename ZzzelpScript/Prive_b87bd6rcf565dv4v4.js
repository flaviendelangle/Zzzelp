function ze_Traceur(alliance) {
	if(ZzzelpScript.parameters('parametres', ['alliance', 'ally_traceur_consultation'])) {
		var zone = document.createElement('div');
		zone.id = 'donnees_traceur';
		document.querySelector('#centre').appendChild(zone);
		Recuperation_donnees_traceur('alliances', time()-86400, time(), [{ id : 'alliance', valeur : alliance}], 'script');
	}
}