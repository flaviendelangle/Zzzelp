<?php

class Fourmizzz {

	public static $serveurs = 			array('s1', 's2', 's3', 's4', 'test');
	public static $serveur_complet = 	array('s1' => 'Serveur 1', 's2' => 'Serveur 2', 's3' => 'Serveur 3', 's4' => 'Serveur 4', 'test' => 'Serveur test');

	public static $constructions = 		array('Champignonniere', 'Entrepot de nourriture', 'Entrepot de materiaux', 'Couveuse', 'Solarium', 'Laboratoire', 'Salle d \'analyse', 'Salle de combat', 'Caserne', 'Dome', 'Loge imperiale', 'Etable à pucerons', 'Etable à cochenilles');
	public static $recherches = 		array('Technique de ponte', 'Bouclier thoracique', 'Armes', 'Architecture', 'Communication avec les animaux', 'Vitesse de chasse', 'Vitesse d\'attaque', 'Genetique', 'Acide', 'Poison');
	public static $constructions_mini = array('Champignonniere', 'Entrepot nour.', 'Entrepot de mat', 'Couveuse', 'Solarium', 'Laboratoire', 'Salle ana.', 'S. combat', 'Caserne', 'Dome', 'Loge', 'Etable puc.', 'Etable coch.');
	public static $recherches_mini = 	array('Tech. ponte', 'Bouclier', 'Armes', 'Architecture', 'Com. animaux', 'Vitesse chasse', 'Vitesse attaque', 'Genetique', 'Acide', 'Poison');
	public static $constructions_bdd = 	array('champignonniere', 'entrepot_nourriture', 'entrepot_materiaux', 'couveuse', 'solarium', 'laboratoire', 'salle_analyse', 'salle_combat', 'caserne', 'dome', 'loge_imperiale', 'etable_pucerons', 'etable_cochenilles', 'constructions_en_cours', 'constructions_en_cours_2');
	public static $recherches_bdd = 	array('technique_ponte', 'bouclier_thoracique', 'armes', 'architecture', 'communication_animaux', 'vitesse_chasse', 'vitesse_attaque', 'genetique', 'acide', 'poison', 'labo_en_cours', 'labo_en_cours_2');
	public static $lieux = 				array('TDC', 'Dome', 'Loge');

	public static $unites = array(
		'attaque' => 			array(3,5,7,10,15,1,1,30,35,24,55,80,50,55), 
		'vie' => 				array(8,10,13,16,20,30,40,10,12,27,35,50,50,55), 
		'defense' => 			array(2,4,6,9,14,25,35,15,18,23,1,1,50,55),
		'HOF' => 				array(300,450,570,740,1000,1410,1410,1440,1520,1450,1860,1860,2740,2740),
		'puissance' => 			array(1, 1.47058824, 2, 2.670597, 3.670585, 5.1059, 6.96475, 3.47055, 4.1059, 5.411766, 7.55295, 11.6471, 10.694125, 11.764725),
		'noms_singulier' => 	array("Jeune Soldate Naine", "Soldate Naine", "Naine d’Elite", "Jeune Soldate", "Soldate", "Concierge", "Concierge d’élite", "Artilleuse", "Artilleuse d’élite", "Soldate d’élite", "Tank", "Tank d’élite", "Tueuse",  "Tueuse d’élite"),
		'noms_pluriels' => 		array("Jeunes Soldates Naines", "Soldates Naines", "Naines d’Elites", "Jeunes Soldates", "Soldates", "Concierges", "Concierges d’élites", "Artilleuses", "Artilleuses d’élites", "Soldates d’élites", "Tanks", "Tanks d’élites", "Tueuses",  "Tueuses d’élites"),
		'TAGs' => 				array('JSN', 'SN', 'NE', 'JS', 'S', 'C', 'CE', 'A', 'AE', 'SE', 'Tk', 'TkE', 'T', 'TE')
								);

	public static $niveaux_combat = 	array(array('armes', 'bouclier', 'cochenille'), array('armes', 'bouclier'));
	public static $lieux_combat = 		array('TDC' => false, 'dome' => true, 'loge' => true);


	/*
		Calcul la distance entre deux joueurs
	*/
	public static function Distance($coord_1, $coord_2) {
		return sqrt(pow($coord_1['x']-$coord_2['x'], 2) + pow($coord_1['y']-$coord_2['y'], 2));
	}

	/*
		Calcul le temps de trajet entre du joueurs à une vitesse d'attaque donnée
	*/
	public static function Temps_trajet($distance, $VA) {
		return ((1-exp(-$distance/350))*7.375*pow(0.9,$VA))*86400;
	}
}
