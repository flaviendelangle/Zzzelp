<?php

class Statistiques {
	
	public $section;
	public $debut;
	public $fin;
	public $serveur;
	public $alliance;
	public $alliance_user;
	public $nom_alliance;

	public function __construct($section, $debut, $fin, $utilisateur, $alliance) {
		$this->section = $section;
		$this->serveur = $utilisateur->serveur;
		$this->nom_alliance = $alliance;
		$this->utilisateur = $utilisateur;
		$this->debut = new Date($debut);
		$this->fin = new Date($fin);
		$this->alliance_user = new MembreAlliance($this->nom_alliance, $this->utilisateur->pseudo, $this->utilisateur->serveur);
		$this->alliance = new Alliance($this->alliance_user);
		$this->alliance->build_alliance();
		if(in_array($this->section, array('chargements_MF', 'inscriptions', 'general'))) {
			$this->launch_Zzzelp();
		}
		elseif(in_array($this->section, array('tdp', 'ouvrieres', 'niveaux'))) {
			$this->lauch_Membres();
		}
		elseif(in_array($this->section, array('floods', 'detail_floods'))) {
			$this->launch_Floods();
		}
		elseif(in_array($this->section, array('convois', 'detail_convois', 'retard_convois_envoye', 'retard_convois_recu'))) {
			$this->launch_Convois();
		}
	}

	public function remove_keys($array) {
		$new = array();
		foreach($array as $key => $value) {
			$new[] = $value;
		}
		return $new;	
	}


	public function get_keys($array) {
		$new = array();
		foreach($array as $key => $value) {
			$new[] = $key;
		}
		return $new;	
	}

	/*
		Onglet Zzzelp
	*/


	public function launch_Zzzelp() {
		if($this->section == 'chargements_MF') {
			echo $this->get_Chargements_MF(new Date(strtotime("2015-01-01")), new Date(strtotime(date('d-m-Y'))));
		}
		else if($this->section == 'inscriptions') {
			echo $this->get_Nombre_Inscriptions(new Date(strtotime("2013-05-22")), new Date(strtotime(date('d-m-Y'))));
		}
		else if($this->section == 'general') {
			echo $this->get_General_Statistics();
		}
	}

	public function get_Chargements_MF($debut, $fin) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$valeurs = array(
						's1' => array(),
						's2' => array(),
						's3' => array(),
						's4' => array(),
						'test' => array(),
						'total' => array()
						);
		$ex_valeur = 0;
		$requete = $bdd->prepare('SELECT serveur, COUNT(*) as total, DATE( FROM_UNIXTIME(date_chargement)) AS jour FROM Logs_MF 
					WHERE date_chargement > :debut AND date_chargement < :fin GROUP BY jour, serveur');
		$requete->bindValue(':debut', $debut->timestamp, PDO::PARAM_STR);
		$requete->bindValue(':fin', $fin->timestamp, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $releve) {
			if($ex_valeur != $releve['jour']) {
				$valeurs['s1'][] = 0;
				$valeurs['s2'][] = 0;
				$valeurs['s3'][] = 0;
				$valeurs['s4'][] = 0;
				$valeurs['test'][] = 0;
				$valeurs['total'][] = 0;
			}
			$ex_valeur = $releve['jour'];
			$valeurs[$releve['serveur']][count($valeurs[$releve['serveur']])-1] = (int)$releve['total'];
			$valeurs['total'][count($valeurs['total'])-1] += (int)$releve['total'];
		}
		$valeurs_2 = array();
		foreach($valeurs as $serveur => $donnees) {
			$valeurs_2[] = array('name' => $serveur, 'data' => $donnees);
		}
		return json_encode(array(		'premier_jour' => $debut->timestamp*1000, 
										'donnees' => $valeurs_2
							));	
	}

	public function get_Nombre_Inscriptions($debut, $fin) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$valeurs = Date::get_listejours_statistiques($debut->timestamp, $fin->timestamp);
		$requete = $bdd->prepare('SELECT date_inscription, COUNT(*) as total FROM membres GROUP BY date_inscription ORDER BY date_inscription ASC');
		$requete->bindValue(':debut', $debut->date_SQL(), PDO::PARAM_STR);
		$requete->bindValue(':fin', $fin->date_SQL(), PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $releve) {
			$date = strtotime(date('d-m-Y', strtotime($releve['date_inscription'])));
			$valeurs[$date] = (int)$releve['total'];
		}
		return json_encode(array(		'premier_jour' => $debut->timestamp*1000, 
										'donnees' => array(
														array('name' => 'inscriptions', 'data' => $this->remove_keys($valeurs))
													)
							));
	}

	public function get_General_Statistics() {
		$statistiques = array(
							'membres_alliances' => array(), 
							'alliances' => array()
						);
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT serveur, COUNT(*) as nombre FROM Droits_alliance GROUP BY serveur');
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $releve) {
			$statistiques['membres_alliances'][] = array($releve['serveur'], (int)$releve['nombre']);
		}
		$requete = $bdd->prepare('SELECT serveur, COUNT(*) as nombre FROM alliances 
							WHERE activation_MF = 1 OR activation_convois = 1 OR activation_traceur = 1 GROUP BY serveur');
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $releve) {
			$statistiques['alliances'][] = array($releve['serveur'], (int)$releve['nombre']);
		}
		return json_encode($statistiques);
	}



	/*
		Onglet Membres
	*/


	public function lauch_Membres() {
		if($this->alliance_user->check_droit_outil('gestion_membres')) {
			if($this->section == 'tdp') {
				echo $this->get_tdp_alliance();
			}
			else if($this->section == 'ouvrieres') {
				echo $this->get_ouv_alliance();
			}
		}
	}


	public function get_tdp_alliance() {
		$joueurs = array();
		foreach($this->alliance->membres as $pseudo => $profil) {
			$this->alliance->membres[$pseudo]->get_tdp();
			$joueur = array(
							'name' => $pseudo, 
							'tdp' => $this->alliance->membres[$pseudo]->niveaux->tdp
						);
			$joueur['y']=  ($joueur['tdp'] == 0) ? 0 : round(2740*pow(0.9, $joueur['tdp']),3);
			$joueurs[] = $joueur;
		}
		$joueurs = Tableau::key_sort($joueurs, 'tdp', true);
		return json_encode($joueurs);
	}

	public function get_ouv_alliance() {
		$bdd = Zzzelp::Connexion_BDD('Releves');
		$ouvrieres = array();
		foreach($this->alliance->membres as $joueur) {
			$valeurs = array();
			$ancienne = 0;
			$requete = $bdd->prepare('SELECT * FROM archives_ouvrieres WHERE serveur = :serveur AND pseudo = :pseudo ORDER BY date_changement ASC');
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':pseudo', $joueur->pseudo, PDO::PARAM_STR);
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $releve) {
				$date = strtotime($releve['date_changement']);
				if($date - $ancienne > 3600*6) {
					$valeurs[] = array($date*1000, (int)$releve['nouvelle']);
					$ancienne = $date;
				}
			}
			if(count($valeurs) > 0) {
				$ouvrieres[] = array('name' => $joueur->pseudo, 'data' => $valeurs);
			}
		}
		return json_encode($ouvrieres);
	}


	/*
		Onglet Floods
	*/


	public function launch_Floods() {
		if($this->alliance_user->check_activation_outil('MF') AND $this->alliance_user->check_droit_outil('floods')) {
			if($this->section == 'floods') {
				echo $this->get_Floods_Alliance();
			}
			else if($this->section == 'detail_floods') {
				echo $this->get_Details_Floods(htmlentities($_GET['pseudo']));
			}
		}
	}

	public function get_Floods_Alliance() {
		$valeurs = Date::get_listejours_statistiques($this->debut->timestamp, $this->fin->timestamp);
		$nombres = Date::get_listejours_statistiques($this->debut->timestamp, $this->fin->timestamp);
		$details = array();
		$bdd = Zzzelp::Connexion_BDD('Releves');
		foreach($this->alliance->membres as $joueur) {
			$requete = $bdd->prepare('SELECT * FROM archives_floods WHERE serveur = :serveur AND pseudo = :pseudo AND date_changement > :debut 
						AND date_changement < :fin ORDER BY date_changement ASC');
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':pseudo', $joueur->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':debut', $this->debut->date_SQL(), PDO::PARAM_STR);
			$requete->bindValue(':fin', $this->fin->date_SQL(), PDO::PARAM_STR);
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $releve) {
				$date = strtotime(date('d-m-Y', strtotime($releve['date_changement'])));
				$valeurs[$date] += (int)$releve['valeur'];
				$nombres[$date] += (int)$releve['nombre'];
				if(!array_key_exists($joueur->pseudo, $details)) {
					$details[$joueur->pseudo] = array('valeur' => (int)$releve['valeur'], 'nombre' => (int)$releve['nombre']);
				}
				else {
					$details[$joueur->pseudo]['valeur'] += (int)$releve['valeur'];
					$details[$joueur->pseudo]['nombre'] += (int)$releve['nombre'];
				}
			}
		}
		return json_encode(array(	'nombre' => $this->remove_keys($nombres), 
									'valeur' => $this->remove_keys($valeurs), 
									'details' => $details, 
									'joueurs' => $this->alliance->get_liste_membres(), 
									'premiere_date' => $this->debut->timestamp*1000
							));
	}

	public function get_Details_Floods($pseudo) {
		$nombres = Date::get_listejours_statistiques($this->debut->timestamp, $this->fin->timestamp);
		$details = array();
		$bdd = Zzzelp::Connexion_BDD('Releves');
		$requete = $bdd->prepare('SELECT * FROM archives_floods WHERE serveur = :serveur AND pseudo = :pseudo AND date_changement > :debut 
									AND date_changement < :fin ORDER BY date_changement ASC');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
		$requete->bindValue(':debut', $this->debut->date_SQL(), PDO::PARAM_STR);
		$requete->bindValue(':fin', $this->fin->date_SQL(), PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $releve) {
			$date = strtotime(date('d-m-Y', strtotime($releve['date_changement'])));
			$nombres[$date] += (int)$releve['nombre'];
			if(!array_key_exists($joueur->pseudo, $details)) {
				$details[$joueur->pseudo] = array('valeur' => (int)$releve['valeur'], 'nombre' => (int)$releve['nombre']);
			}
			else {
				$details[$joueur->pseudo]['valeur'] += (int)$releve['valeur'];
				$details[$joueur->pseudo]['nombre'] += (int)$releve['nombre'];
			}
		}
		return json_encode(array(	'nombres' => $this->remove_keys($nombres), 
									'pseudo' => $pseudo,
									'premiere_date' => $this->debut->timestamp*1000
							));		
	}


	/*
		Onglet Convois
	*/


	public function launch_Convois() {
		if($this->alliance_user->check_activation_outil('convois') AND $this->alliance_user->check_droit_outil('convois')) {
			if($this->section == 'convois') {
				echo $this->get_Convois_Alliance();
			}
			else if($this->section == 'detail_convois') {
				echo $this->get_Details_Convois(htmlentities($_GET['pseudo']), (isset($_GET['recu']) ? htmlentities($_GET['recu']) : 0));
			}
			else if($this->section == 'retard_convois_envoye') {
				echo $this->get_Retard_Convois_Alliance(0);
			}
			else if($this->section == 'retard_convois_recu') {
				echo $this->get_Retard_Convois_Alliance(1);
			}
		}
	}

	public function get_Convois_Alliance() {
		$valeurs = Date::get_listejours_statistiques($this->debut->timestamp, $this->fin->timestamp);
		$nombres = Date::get_listejours_statistiques($this->debut->timestamp, $this->fin->timestamp);
		$details = array('recu' => array(), 'envoye' => array());
		$bdd = Zzzelp::Connexion_BDD('Releves');
		foreach($this->alliance->membres as $joueur) {
			$requete = $bdd->prepare('SELECT * FROM archives_convois WHERE serveur = :serveur AND pseudo = :pseudo AND date_changement > :debut 
						AND date_changement < :fin ORDER BY date_changement ASC');
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':pseudo', $joueur->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':debut', $this->debut->date_SQL(), PDO::PARAM_STR);
			$requete->bindValue(':fin', $this->fin->date_SQL(), PDO::PARAM_STR);
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $releve) {
				$date = strtotime(date('d-m-Y', strtotime($releve['date_changement'])));
				$valeurs[$date] += (int)$releve['valeur'];
				$nombres[$date] += (int)$releve['nombre'];
				if($releve['recu'] == 1) {
					if(!array_key_exists($date, $valeurs)) {
						$valeurs[$date] = (int)$releve['valeur'];
						$nombres[$date] = (int)$releve['nombre'];
					}
					else {
						$valeurs[$date] += (int)$releve['valeur'];
						$nombres[$date] += (int)$releve['nombre'];
					}
				}
				if(!array_key_exists($joueur->pseudo, $details[($releve['recu'] ? 'recu' : 'envoye')])) {
					$details[($releve['recu'] ? 'recu' : 'envoye')][$joueur->pseudo] = array('valeur' => (int)$releve['valeur'], 'nombre' => (int)$releve['nombre']);
				}
				else {
					$details[($releve['recu'] ? 'recu' : 'envoye')][$joueur->pseudo]['valeur'] += (int)$releve['valeur'];
					$details[($releve['recu'] ? 'recu' : 'envoye')][$joueur->pseudo]['nombre'] += (int)$releve['nombre'];
				}
			}
		}
		return json_encode(array(	'nombre' => $this->remove_keys($nombres), 
									'valeur' => $this->remove_keys($valeurs), 
									'details' => $details, 
									'joueurs' => $this->alliance->get_liste_membres(), 
									'premiere_date' => $this->debut->timestamp*1000
							));
	}

	public function get_Details_Convois($pseudo, $recu) {
		$valeurs = Date::get_listejours_statistiques($this->debut->timestamp, $this->fin->timestamp);
		$details = array();
		$bdd = Zzzelp::Connexion_BDD('Releves');
		$requete = $bdd->prepare('SELECT * FROM archives_convois WHERE serveur = :serveur AND pseudo = :pseudo AND date_changement > :debut 
									AND date_changement < :fin AND recu = :recu ORDER BY date_changement ASC');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
		$requete->bindValue(':debut', $this->debut->date_SQL(), PDO::PARAM_STR);
		$requete->bindValue(':fin', $this->fin->date_SQL(), PDO::PARAM_STR);
		$requete->bindValue(':recu', $recu, PDO::PARAM_INT);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $releve) {
			$date = strtotime(date('d-m-Y', strtotime($releve['date_changement'])));
			$valeurs[$date] += (int)$releve['valeur'];
			if(!array_key_exists($joueur->pseudo, $details)) {
				$details[$joueur->pseudo] = array('valeur' => (int)$releve['valeur'], 'nombre' => (int)$releve['nombre']);
			}
			else {
				$details[$joueur->pseudo]['valeur'] += (int)$releve['valeur'];
				$details[$joueur->pseudo]['nombre'] += (int)$releve['nombre'];
			}
		}
		return json_encode(array(	'valeurs' => $this->remove_keys($valeurs), 
									'pseudo' => $pseudo,
									'premiere_date' => $this->debut->timestamp*1000
							));		
	}


	public function get_Retard_Convois_Alliance($recu) {
		$bdd = Zzzelp::Connexion_BDD('Releves');
		$retards = array();
		foreach($this->alliance->membres as $joueur) {
			$valeurs = Date::get_listejours_statistiques($this->debut->timestamp, $this->fin->timestamp);
			$requete = $bdd->prepare('SELECT * FROM archives_retards_convois WHERE serveur = :serveur AND pseudo = :pseudo AND date_changement > :debut 
						AND date_changement < :fin AND recu = :recu ORDER BY date_changement ASC');
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':pseudo', $joueur->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':debut', $this->debut->date_SQL(), PDO::PARAM_STR);
			$requete->bindValue(':fin', $this->fin->date_SQL(), PDO::PARAM_STR);
			$requete->bindValue(':recu', $recu, PDO::PARAM_INT);
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $releve) {
				$date = strtotime(date('d-m-Y', strtotime($releve['date_changement'])));
				$valeurs[$date] += (int)$releve['valeur'];
			}
			$valeurs = $this->remove_keys($valeurs);
			if(array_sum($valeurs) > 0) {
				$retards[] = array('name' => $joueur->pseudo, 'data' => $valeurs);
			}
		}
		return json_encode(array(		'valeurs' => $retards, 
										'recu' => $recu, 
										'premiere_date' => $this->debut->timestamp*1000
							));
	}

}