<?php

class Guerre {
	
	public $utilisateur;
	public $serveur;
	public $alliances;

	public function __construct($utilisateur) {
		$utilisateur->get_RightsZzzelp();
		if($utilisateur->droitsZzzelp > 0) {
			$this->serveur = $utilisateur->serveur;
			$this->alliance = ($this->serveur == 's1') ? 'ZOO' : (($this->serveur == 's2') ? 'FCGB' : 'OMG');
			$this->utilisateur = $utilisateur;
			$this->utilisateur->getAlliances_activated();
			$this->get_DroitsInfos();
		}
	}


	/*
		Récupération des alliances dont les données sont accessibles à l'utilisateur
	*/
	public function get_DroitsInfos() {
		$this->utilisateur->get_obj_Alliances_activated();
		$this->alliances = array();
		for($i=0; $i<count($this->utilisateur->alliances_activated_obj); $i++) {
			$this->alliances = array_merge($this->alliances, $this->utilisateur->alliances_activated_obj[$i]->get_DroitsAffichageFloods());
		}
	}

	/*
		Récupère les données de guerre des joueurs chargés sur le Multiflood
	*/
	public function get_DonneesMF($joueurs) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM Donnees_guerre WHERE serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $joueur) {
			if(isset($joueurs[$joueur['pseudo']])) {
				$joueurs[$joueur['pseudo']]->donnees_guerre = $joueur;
			}
		}
		foreach($joueurs as $joueur => $valeurs) {
			if(!isset($valeurs->donnees_guerre)) {
				$joueurs[$joueur]->donnees_guerre = $this->empty_GuerreData($joueurs[$joueur]);
			}
		}
		$bdd = null;
		return $joueurs;
	}

	/*
		Stock les informations liées à un FI de guerre généré par Zzzelp
	*/
	public function initialiser_FI($valeurs) {
		$valeurs = json_decode($valeurs, true);
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('INSERT INTO FI_guerre (createur, alliance, serveur, cible, ID_forum, ID_joueurs, ID_posts_speciaux) 
								  VALUES(:createur, :alliance, :serveur, :cible, :ID_forum, :ID_joueurs, :ID_posts_speciaux)');
		$requete->bindValue(':createur', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->get_AllianceActif(), PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':cible', $valeurs['TAG'], PDO::PARAM_STR);
		$requete->bindValue(':ID_forum', $valeurs['ID_forum'], PDO::PARAM_INT);
		$requete->bindValue(':ID_joueurs', json_encode($valeurs['sujets_joueurs']), PDO::PARAM_STR);
		$requete->bindValue(':ID_posts_speciaux', json_encode($valeurs['posts_speciaux']), PDO::PARAM_STR);
		$requete->execute();
		return 1;
	}

	/*
		Ajout un joueur à un FI de guerre généré par Zzzelp
	*/
	public function add_player_FI($valeurs) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT ID_joueurs FROM FI_guerre WHERE alliance = :alliance AND serveur = :serveur AND ID_forum = :ID_forum');
		$requete->bindValue(':alliance', $this->get_AllianceActif(), PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':ID_forum', $valeurs['ID_forum'], PDO::PARAM_INT);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		if(!empty($resultats)) {
			$joueurs = json_decode($resultats[0]['ID_joueurs'], true);
			$joueurs[$valeurs['pseudo']] = $valeurs['ID'];

			$requete = $bdd->prepare('UPDATE FI_guerre SET ID_joueurs = :ID_joueurs WHERE ID_forum = :ID_forum');
			$requete->bindValue(':ID_forum', $valeurs['ID_forum'], PDO::PARAM_INT);
			$requete->bindValue(':ID_joueurs', json_encode($joueurs), PDO::PARAM_INT);
			$requete->execute();
			return 1;
			$bdd = null;
		}
		$bdd = null;
		return 0;

	}

	/*
		Récupère les paramètres des FI de guerre
	*/
	public function get_FI() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM FI_guerre WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':alliance', $this->get_AllianceActif(), PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		$bdd = null;
		return $resultats;
	}

	/*
		Récupère les armées pour la page de statistiques
	*/
	public function get_ArmeesConnues() {
		$joueurs = array();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM Donnees_guerre WHERE serveur = :serveur AND (JSN + SN + NE + JS + S + C + CE + A + AE + SE + Tk + TkE + T + TE) > 10000000');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $armee) {
			$joueurs[$armee['pseudo']] = array(
				'armee' => array((int)$armee['JSN'], (int)$armee['SN'], (int)$armee['NE'], (int)$armee['JS'], (int)$armee['S'], (int)$armee['C'], (int)$armee['CE'], 
								 (int)$armee['A'], (int)$armee['AE'], (int)$armee['SE'], (int)$armee['Tk'], (int)$armee['TkE'], (int)$armee['T'], (int)$armee['TE']),
				'date_MAJ' => $armee['date_armee']
			);
		}
		$bdd = null;
		return $joueurs;
	}

	/*
		Récupère les alliances des joueurs pour la page de statistiques
	*/
	public function get_AlliancesCibles($joueurs) {
		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		foreach($joueurs as $pseudo => $donnees) {
			$requete = $bdd->prepare('SELECT alliance FROM BDDJoueurs WHERE Pseudo = :pseudo');
			$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
			$requete->execute();
			$joueurs[$pseudo]['alliance'] = $requete->fetch(PDO::FETCH_NUM)[0];
		}
		$bdd = null;
		return $joueurs;
	}


	/*
		Fonction principale pour récupérer les données d'un joueur.
		Principalement utilisé pour créer la modale du joueur
	*/
	public function get_DonneesJoueur($cible) {
		$cible->niveaux_guerre = $this->get_InformationsJoueur($cible);
		$cible->niveaux_probables = $this->guess_Niveaux($cible);
		return array(
					'temps_trajet' => $this->get_TempsTrajet($cible),
					'niveaux' 	=> $cible->niveaux_guerre,
					'niveaux_probables' => $cible->niveaux_probables,
					'messages' 	=> $this->get_MessagesJoueur($cible),
					'simulations' => $this->get_Simulations($cible, false),
					'optimisations' => $this->get_Simulations($cible, true),
					'utilisateur' => $this->utilisateur->pseudo,
					'derniere_montee' => $this->derniere_montee,
					'coordonnees' => $cible->coordonnees,
					'resume_armee' => $this->compare_PuissanceJoueurs($cible)
				);
	}

	/*
		Fonction principale pour récupérer les données les plus importantes d'un joueur
		Principalement utilisé lors de la génération des FI de guerre
	*/
	public function get_DonneesJoueurLight($cible) {
		$cible->niveaux_guerre = $this->get_InformationsJoueur($cible);
		$cible->niveaux_probables = $this->guess_Niveaux($cible);
		return array(
					'niveaux' 	=> $cible->niveaux_guerre,
					'niveaux_probables' => $cible->niveaux_probables,
					'simulations' => $this->get_Simulations($cible, false),
					'optimisations' => $this->get_Simulations($cible, true),
					'utilisateur' => $this->utilisateur->pseudo,
					'coordonnees' => $cible->coordonnees,
					'resume_armee' => $this->compare_PuissanceJoueurs($cible)
				);		
	}

	/*
		Récupère le temps de trajet entre l'utilisateur et la cible
	*/
	public function get_TempsTrajet($cible) {
		$cible->getCoordonnees();
		$this->utilisateur->getCoordonnees();
		$this->utilisateur->getInfosZzzelp();
		return (int)Fourmizzz::Temps_trajet(Fourmizzz::Distance($cible->coordonnees, $this->utilisateur->coordonnees), $this->utilisateur->niveaux->vitesse_attaque);
	}


	/*
		Simule les combats en dôme et en loge
	*/
	public function get_Simulations($cible, $optimisation) {
		$combat_dome = new Combat('MF', $this->utilisateur, $cible, 1, $optimisation);
		$erreur_dome = $combat_dome->create_Simulation(false);
		$combat_loge = new Combat('MF', $this->utilisateur, $cible, 2, $optimisation);
		$erreur_loge = $combat_loge->create_Simulation(false);
		return array(
						'dome' => array(
							'RC' => addslashes($combat_dome->RC), 
							'erreur' => $erreur_dome,
							'armee_att_avant' => $combat_dome->attaquant->armee,
							'armee_def_avant' => $combat_dome->defenseur->armee,
							'armee_att_apres' => $combat_dome->attaquant_XP->armee,
							'armee_def_apres' => $combat_dome->defenseur_fin->armee,
							'url' => $combat_dome->url_combat,
							'lieu' => 1
									),
						'loge'	=> array(
							'RC' => $combat_loge->RC, 
							'erreur' => $erreur_loge,
							'armee_att_avant' => $combat_loge->attaquant->armee,
							'armee_def_avant' => $combat_loge->defenseur->armee,
							'armee_att_apres' => $combat_loge->attaquant_XP->armee,
							'armee_def_apres' => $combat_loge->defenseur_fin->armee,
							'url' => $combat_loge->url_combat,
							'lieu' => 2
									)
						);
	}

	/*
		On recupère les données (armée + niveaux) connus du joueur cible
	*/
	public function get_InformationsJoueur($cible) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$alliances = '';
		for($i=0; $i<count($this->alliances); $i++) {
			$alliances .= (($alliances == '') ? '' : ' OR ').' alliance = :alliance_'.$i;
		}
		$requete = $bdd->prepare('SELECT * FROM Donnees_guerre WHERE serveur = :serveur AND pseudo = :pseudo');
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		$bdd = null;
		if(empty($resultat)) {
			return $this->empty_GuerreData($cible);
		}
		else {
			return $resultat;
		}
	}

	/*
		Initialise un tableau avec les valeurs par défaut des données de guerre si le joueur n'en a aucune stockée
	*/
	public function empty_GuerreData($cible) {
		return array(
								'pseudo' => $cible->pseudo,
								'JSN' => 0, 'SN' => 0, 'NE' => 0, 'JS' => 0, 'S' => 0, 'C' => 0, 'CE' => 0, 
								'A' => 0, 'AE' => 0, 'SE' => 0, 'Tk' => 0, 'TkE' => 0, 'T' => 0, 'TE' => 0,
								'tdp' => 0, 'dome' => 0, 'loge' => 0, 'vitesse_attaque' => 0, 'vitesse_chasse' => 0, 
								'armes' => 0, 'bouclier' => 0, 'date_armee' => 0, 'alerte' => ''
							);
	}

	/*
		Détermine les niveaux les plus probables en fonction des données connues
	*/
	public function guess_Niveaux($cible) {
		$niveaux = $cible->niveaux_guerre;

		/*
			Armes rentable
		*/
		if($niveaux['armes'] == 0 AND $niveaux['bouclier'] == 0) {
			$naines = $niveaux['JSN'] + $niveaux['SN'] + $niveaux['NE'];
			$soldates = $niveaux['JS'] + $niveaux['S'] + $niveaux['SE'];
			$tanks = $niveaux['Tk'] + $niveaux['TkE'];
			$tueuses = $niveaux['T'] + $niveaux['TE'];
			$Total = $naines + $soldates + $tanks + $tueuses;
			if($Total > 0) {
				$tdp_compo = ($naines / $Total) * 300 + ($soldates / $Total) * 740 + ($tanks / $Total) * 1860 + ($tueuses / $Total) * 2740;
				$attaque_compo = ($naines / $Total) * 3 + ($soldates / $Total) * 10 + ($tanks / $Total) * 55 + ($tueuses / $Total) * 50;
				$attaque_armee = 3 * $niveaux['JSN'] + 5 * $niveaux['SN'] + 7 * $niveaux['NE'] + 10 * $niveaux['JS'] + 15 * $niveaux['S'] + 1 * $niveaux['C'] + 1 * $niveaux['CE'] + 30 * $niveaux['A'] + 35 * $niveaux['AE'] + 24 * $niveaux['SE'] + 55 * $niveaux['Tk'] + 80 * $niveaux['TkE'] + 50 * $niveaux['T'] + 55 * $niveaux['TE'];
				$attaque_unite = $attaque_compo;
				$armes = 0;
				while(($tdp_compo / 60) * (0.1 * $attaque_armee / $attaque_unite) > 80 * pow(2,$armes) AND $armes < 50) {
				    $armes++;
				    $attaque_unite = $attaque_compo * (1 + 0.1 * $armes);
				}
				$niveaux['armes'] = $armes;
			}
		}

		/*
			Bouclier = Armes
		*/
		if($niveaux['armes'] > 0 AND $niveaux['bouclier'] == 0)  {
			$niveaux['bouclier'] = $niveaux['armes'];
		}
		elseif($niveaux['bouclier'] > 0 AND $niveaux['armes'] == 0)  {
			$niveaux['armes'] = $niveaux['bouclier'];
		}

		/*
			Dome = Loge = Bouclier * 7/2
		*/
		if($niveaux['bouclier'] > 0 AND $niveaux['dome'] == 0) {
			$niveaux['dome'] = (int)($niveaux['bouclier']*7/6) + 2;
		}
		if($niveaux['bouclier'] > 0 AND $niveaux['loge'] === 0) {
			$niveaux['loge'] = (int)($niveaux['bouclier']*7/6) + 2;
		}

		/*
			Dôme = Loge
		*/
		if($niveaux['loge'] > 0 AND $niveaux['dome'] == 0)  {
			$niveaux['dome'] = $niveaux['loge'];
		}
		if($niveaux['dome'] > 0 AND $niveaux['loge'] == 0)  {
			$niveaux['loge'] = $niveaux['dome'];
		}



		return $niveaux;
	}


	/*
		On recupère les messages concernant le joueur ciblé
		Ceux-ci peuvent provenir de n'importe quelle alliance dont le joueur a les droits
	*/
	public function get_MessagesJoueur($cible) {
		$traceur = new Traceur($this->utilisateur);
		$this->utilisateur->get_obj_Alliances_activated();
		$droits_gestion = array();
		foreach($this->utilisateur->alliances_activated_obj as $alliance) {
			if($alliance->check_droit_outil('gestion_MF')) {
				$droits_gestion[] = $alliance->alliance;
			}
		}
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');

		/*
			Récupération des messages
		*/
		$requete = $bdd->prepare('SELECT * FROM Conversations_guerre WHERE serveur = :serveur AND pseudo = :pseudo ORDER BY date_stockage ASC');
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$messages = $requete->fetchAll(PDO::FETCH_ASSOC);
		for($i=0; $i<count($messages); $i++) {
			$messages[$i]['gestion'] = ($messages[$i]['posteur'] == $this->utilisateur->pseudo OR in_array($messages[$i]['alliance'], $droits_gestion));
		}


		$this->derniere_montee = array('date' => 0, 'incertitude' => 0);

		/*
			Récupération des combats
		*/
		$requete = $bdd->prepare('SELECT * FROM RC_guerre WHERE serveur = :serveur AND (attaquant = :pseudo OR defenseur = :pseudo) ORDER BY date_RC ASC');
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$RCs = $requete->fetchAll(PDO::FETCH_ASSOC);
		for($i=0; $i<count($RCs); $i++) {
			$RCs[$i]['position_joueur'] = ($RCs[$i]['attaquant'] == $cible->pseudo) ? 'attaquant' : 'defenseur';
			if($RCs[$i]['position_joueur'] == 'attaquant') {
				$this->derniere_montee['date'] = (int)$RCs[$i]['date_RC'];
			}
		}

		/*
			Récupération des données du traceur
		*/
		$traceur->debut = time() - 86400*30;
		$traceur->fin = time();
		$traceur->valeur_min = 0;
		$traceur->valeur_max = 1000000000000000;
		$traceur->joueur = $cible->pseudo;
		$traceur->utilisateur->get_RightsZzzelp();
		$data_traceur = $traceur->get_DataJoueur();
		$correspondances_temp = array_reverse($data_traceur['correspondances']);
		$variations_temp = array_reverse($data_traceur['variations']);
		$variations = array();

		for($i=0; $i<count($correspondances_temp); $i++) {
			$correspondances_temp[$i]['pseudo'] = $cible->pseudo;
		}
		for($i=0; $i<count($variations_temp); $i++) {
			if($variations_temp[$i]['resolu'] == 0) {
				$variations[] = $variations_temp[$i];
			}
			if($variations_temp[$i]['valeur_avant'] < $variations_temp[$i]['valeur_apres'] AND $variations_temp[$i]['date_mini'] > $this->derniere_montee['date']) {
				$this->derniere_montee = array('date' => (int)$variations_temp[$i]['date_mini'], 'incertitude' => ((int)$variations_temp[$i]['date_maxi'] - (int)$variations_temp[$i]['date_mini']));
			}
		}

		foreach($correspondances_temp as $correspondance) {
			$trouve = false;
			for($i=0; $i<count($RCs); $i++) {
				if($correspondance['date_mini'] <= $RCs[$i]['date_RC'] AND $correspondance['date_maxi'] >= $RCs[$i]['date_RC']) { //AND $correspondance['attaquant'] == $RCs[$i]['attaquant'] AND $correspondance['cible'] == $RCs[$i]['defenseur']) {
					$trouve = true;
				}
			}
			if(!$trouve) {
				$correspondances[] = $correspondance;
			}
		}

		$categories = array(
						'RC' => array('valeurs' =>$RCs , 'date' => 'date_RC'),
						'message' => array('valeurs' => $messages, 'date' => 'date_stockage'), 
						'correspondance' => array('valeurs' => $correspondances, 'date' => 'date_mini'),
						'variation' => array('valeurs' => $variations, 'date' => 'date_mini')
							);
			
		$donnees = array();
		$n = 0;
		while($this->donnees_restantes($categories) AND $n<1000) {
			$seul = false;
			foreach($categories as $titre => $data) {
				if(!$this->donnees_restantes($categories, $titre) AND $this->donnees_restantes($categories)) {
					$seul = true;
					$valeur = $data['valeurs'][count($data['valeurs'])-1];
					$valeur['type'] = $titre;
					$donnees[] = $valeur;
					unset($categories[$titre]['valeurs'][count($categories[$titre]['valeurs'])-1]);
				}
			}
			if(!$seul) {
				list($categories, $nouveau) = $this->donnee_ancienne($categories);
				$donnees[] = $nouveau;
			}
			$n++;
		}
		$bdd = null;
		return $donnees;
	}

	/*
		Regarde si il y a encore des données à trier
	*/
	private function donnees_restantes($donnees, $exception = '') {
		foreach($donnees as $titre => $data) {
			if($titre != $exception AND count($data['valeurs']) > 0) {
				return true;
			}
		}
		return false;
	}

	/*
		Regarde la donnée la plus ancienne
	*/
	private function donnee_ancienne($donnees) {
		$choisi = array();
		foreach($donnees as $titre => $data) {
			if(count($data['valeurs']) > 0 AND (count($choisi) == 0 OR $data['valeurs'][count($data['valeurs']) - 1][$data['date']] > $choisi['date'])) {
				$choisi = array(
							'date' => $data['valeurs'][count($data['valeurs']) - 1][$data['date']], 
							'valeur' => $data['valeurs'][count($data['valeurs']) - 1], 
							'nom' => $titre
						);
			}
		}
		$choisi['valeur']['type'] = $choisi['nom'];
		unset($donnees[$choisi['nom']]['valeurs'][count($donnees[$choisi['nom']]['valeurs']) - 1]);
		return array($donnees, $choisi['valeur']);
	}

	/*
		Stockage d'un message
	*/
	public function add_Message() {
		$alliance = $this->get_AllianceActif();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('INSERT INTO Conversations_guerre (serveur, alliance, pseudo, date_stockage, contenu, posteur) VALUES(:serveur, :alliance, :pseudo, :date_stockage, :contenu, :posteur)');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $_POST['pseudo'], PDO::PARAM_STR);
		$requete->bindValue(':date_stockage', time(), PDO::PARAM_INT);
		$requete->bindValue(':contenu', stripslashes(htmlentities($_POST['contenu'])), PDO::PARAM_STR);
		$requete->bindValue(':posteur', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$bdd = null;
		return array(
				'alliance' => $alliance,
				'contenu' => $_POST['contenu'],
				'posteur' => $this->utilisateur->pseudo,
				'date_stockage' => time()
			);
	}

	/*
		Modifie un message
	*/
	public function edit_Message() {
		$ID = htmlentities($_GET['ID_message']);
		if($this->right_Message($ID)) {
			$bdd = Zzzelp::Connexion_BDD('Donnees_site');
			$requete = $bdd->prepare('UPDATE Conversations_guerre SET contenu = :contenu WHERE ID = :ID AND serveur = :serveur');
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':ID', $ID, PDO::PARAM_INT);
			$requete->bindValue(':contenu', stripslashes(htmlentities($_POST['contenu'])), PDO::PARAM_STR);
			$requete->execute();
			$bdd = null;
		}
	}

	/*
		Supprime un message
	*/
	public function delete_Message() {
		$ID = htmlentities($_GET['ID_message']);
		if($this->right_Message($ID)) {
			$bdd = Zzzelp::Connexion_BDD('Donnees_site');
			$requete = $bdd->prepare('DELETE FROM Conversations_guerre WHERE ID = :ID AND serveur = :serveur');
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':ID', $ID, PDO::PARAM_INT);
			$requete->execute();
			$bdd = null;
		}
	}

	/*
		Vérifie que le joueur a le droit de supprimer ou d'éditer un message
	*/
	public function right_Message($ID) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT posteur, alliance FROM Conversations_guerre WHERE ID = :ID AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':ID', $ID, PDO::PARAM_INT);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		$bdd = null;
		if(empty($resultat)) {
			return false;
		}
		elseif($resultat['posteur'] == $this->utilisateur->pseudo) {
			return true;
		}
		else {
			$chef = new MembreAlliance($resultat['alliance'], $this->utilisateur->pseudo, $this->serveur);
			return ($chef->check_droit_outil('gestion_MF'));
		}
	}

	/*
		Mise à jour des niveaux et de l'armée de la cible
	*/
	public function save_Niveaux($cible) {
		$niveaux = explode(',', substr(htmlentities($_GET['niveaux']),1,-1));
		$alliance = $this->get_AllianceActif();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM Donnees_guerre WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] > 0) {		
			$requete = $bdd->prepare('UPDATE Donnees_guerre SET JSN = :JSN, SN = :SN, NE = :NE, JS = :JS, S = :S, C = :C, CE = :CE, A = :A, AE = :AE, SE = :SE, Tk = :Tk, TkE = :TkE, T = :T, TE = :TE, 
									  armes = :armes, bouclier = :bouclier, dome = :dome, loge = :loge, tdp = :tdp, vitesse_attaque = :vitesse_attaque, vitesse_chasse = :vitesse_chasse, date_armee = :date_armee 
									  WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
		}
		else {
			$requete = $bdd->prepare('INSERT INTO Donnees_guerre (pseudo, serveur, alliance, JSN, SN, NE, JS, S, C, CE, A, AE, SE, Tk, TkE, T, TE, armes, bouclier, dome, loge, tdp, vitesse_attaque, vitesse_chasse, date_armee)
									  VALUES (:pseudo, :serveur, :alliance, :JSN, :SN, :NE, :JS, :S, :C, :CE, :A, :AE, :SE, :Tk, :TkE, :T, :TE, :armes, :bouclier, :dome, :loge, :tdp, :vitesse_attaque, :vitesse_chasse, :date_armee)');
		}
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':JSN', $niveaux[0], PDO::PARAM_INT);
		$requete->bindValue(':SN', $niveaux[1], PDO::PARAM_INT);
		$requete->bindValue(':NE', $niveaux[2], PDO::PARAM_INT);
		$requete->bindValue(':JS', $niveaux[3], PDO::PARAM_INT);
		$requete->bindValue(':S', $niveaux[4], PDO::PARAM_INT);
		$requete->bindValue(':C', $niveaux[5], PDO::PARAM_INT);
		$requete->bindValue(':CE', $niveaux[6], PDO::PARAM_INT);
		$requete->bindValue(':A', $niveaux[7], PDO::PARAM_INT);
		$requete->bindValue(':AE', $niveaux[8], PDO::PARAM_INT);
		$requete->bindValue(':SE', $niveaux[9], PDO::PARAM_INT);
		$requete->bindValue(':Tk', $niveaux[10], PDO::PARAM_INT);
		$requete->bindValue(':TkE', $niveaux[11], PDO::PARAM_INT);
		$requete->bindValue(':T', $niveaux[12], PDO::PARAM_INT);
		$requete->bindValue(':TE', $niveaux[13], PDO::PARAM_INT);
		$requete->bindValue(':armes', $niveaux[14], PDO::PARAM_INT);
		$requete->bindValue(':bouclier', $niveaux[15], PDO::PARAM_INT);
		$requete->bindValue(':dome', $niveaux[16], PDO::PARAM_INT);
		$requete->bindValue(':loge', $niveaux[17], PDO::PARAM_INT);
		$requete->bindValue(':tdp', $niveaux[18], PDO::PARAM_INT);
		$requete->bindValue(':vitesse_attaque', $niveaux[19], PDO::PARAM_INT);
		$requete->bindValue(':vitesse_chasse', $niveaux[20], PDO::PARAM_INT);
		$requete->bindValue(':date_armee', htmlentities($_GET['date_armee']), PDO::PARAM_INT);
		$requete->execute();
		$bdd = null;
	}

	/*
		Mise à jour d'un niveau envoyé via l'analyse des combats
	*/
	public function save_NiveauAnalyse($cible) {
		$nom = htmlentities($_GET['niveau']);
		if(in_array($nom, array('armes', 'bouclier', 'dome', 'loge', 'tdp', 'vitesse_attaque', 'vitesse_chasse'))) {
			$alliance = $this->get_AllianceActif();
			$bdd = Zzzelp::Connexion_BDD('Donnees_site');
			$requete = $bdd->prepare('SELECT COUNT(*) FROM Donnees_guerre WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
			$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
			$requete->execute();
			if($requete->fetch(PDO::FETCH_NUM)[0] > 0) {		
				$requete = $bdd->prepare('UPDATE Donnees_guerre SET '.$nom.' = :valeur WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
			}
			else {
				$requete = $bdd->prepare('INSERT INTO Donnees_guerre (pseudo, serveur, alliance, '.$nom.')
										  VALUES (:pseudo, :serveur, :alliance, :valeur)');
			}
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
			$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':valeur', htmlentities($_GET['valeur']), PDO::PARAM_INT);
			$requete->execute();
			$bdd = null;
		}
	}

	/*
		Mise à jour d'une armée envoyée via l'analyse des combats
	*/
	public function save_ArmeeAnalyse($cible) {
		$armee = explode(',', substr(htmlentities($_GET['armee']),1,-1));
		$alliance = $this->get_AllianceActif();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM Donnees_guerre WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] > 0) {		
			$requete = $bdd->prepare('UPDATE Donnees_guerre SET JSN = :JSN, SN = :SN, NE = :NE, JS = :JS, S = :S, C = :C, CE = :CE, A = :A, AE = :AE, SE = :SE, Tk = :Tk, TkE = :TkE, T = :T, TE = :TE, date_armee = :date_armee  
									  WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
		}
		else {
			$requete = $bdd->prepare('INSERT INTO Donnees_guerre (pseudo, serveur, alliance, JSN, SN, NE, JS, S, C, CE, A, AE, SE, Tk, TkE, T, TE, date_armee)
									  VALUES (:pseudo, :serveur, :alliance, :JSN, :SN, :NE, :JS, :S, :C, :CE, :A, :AE, :SE, :Tk, :TkE, :T, :TE, :date_armee)');
		}
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':JSN', $armee[0], PDO::PARAM_INT);
		$requete->bindValue(':SN', $armee[1], PDO::PARAM_INT);
		$requete->bindValue(':NE', $armee[2], PDO::PARAM_INT);
		$requete->bindValue(':JS', $armee[3], PDO::PARAM_INT);
		$requete->bindValue(':S', $armee[4], PDO::PARAM_INT);
		$requete->bindValue(':C', $armee[5], PDO::PARAM_INT);
		$requete->bindValue(':CE', $armee[6], PDO::PARAM_INT);
		$requete->bindValue(':A', $armee[7], PDO::PARAM_INT);
		$requete->bindValue(':AE', $armee[8], PDO::PARAM_INT);
		$requete->bindValue(':SE', $armee[9], PDO::PARAM_INT);
		$requete->bindValue(':Tk', $armee[10], PDO::PARAM_INT);
		$requete->bindValue(':TkE', $armee[11], PDO::PARAM_INT);
		$requete->bindValue(':T', $armee[12], PDO::PARAM_INT);
		$requete->bindValue(':TE', $armee[13], PDO::PARAM_INT);
		$requete->bindValue(':date_armee', htmlentities($_GET['date_armee']), PDO::PARAM_INT);
		$requete->execute();
		$bdd = null;
	}

	/*
		Mise à jour du message d'alerte de ce joueur
	*/
	public function save_Alerte($cible) {
		$alliance = $this->get_AllianceActif();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM Donnees_guerre WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] > 0) {		
			$requete = $bdd->prepare('UPDATE Donnees_guerre SET alerte = :alerte  
									  WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
		}
		else {
			$requete = $bdd->prepare('INSERT INTO Donnees_guerre (pseudo, serveur, alliance, alerte)
									  VALUES (:pseudo, :serveur, :alliance, :alerte)');
		}
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':alerte', htmlentities($_POST['alerte']), PDO::PARAM_STR);
		$requete->execute();
		$bdd = null;
	}

	/*
		Mise à jour du statut du joueur (DEAD ou non) ainsi que de la date
	*/
	public function save_Dead($cible) {
		$alliance = $this->get_AllianceActif();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM Donnees_guerre WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] > 0) {		
			$requete = $bdd->prepare('UPDATE Donnees_guerre SET dead = :dead, date_dead = :date_dead  
									  WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
		}
		else {
			$requete = $bdd->prepare('INSERT INTO Donnees_guerre (pseudo, serveur, alliance, alerte)
									  VALUES (:pseudo, :serveur, :alliance, :alerte)');
		}
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':dead', $_POST['dead'] ? 1 : 0, PDO::PARAM_INT);
		$requete->bindValue(':date_dead', $_POST['date_dead'], PDO::PARAM_INT);
		$requete->execute();
		$bdd = null;
	}


	/*
		Récupère l'alliance sur laquelle les données doivent être stockées
	*/
	public function get_AllianceActif() {
		return ($this->serveur == 's2') ? 'FCGB' : 'ZOO';
	}




	/*
		Stock un RC envoyé depuis Fourmizzz
	*/
	public static function save_RCAuto($script) {
		$script->utilisateur->getAlliances_activated();
		$analyse = json_decode($_POST['valeurs'], true);
		if($analyse['mode'] == 'RC') {
			$attaquant = $analyse['attaquant']['pseudo'];
			$defenseur = $analyse['defenseur']['pseudo'];
			$hash = sha1($script->serveur.$attaquant.$defenseur.json_encode($analyse['attaquant']['armee']).json_encode($analyse['defenseur']['armee']));
		}
		else if($analyse['mode'] == 'flood') {
			$attaquant = ($analyse['position'] == 'attaquant') ? $script->pseudo : $analyse['pseudo'];
			$defenseur = ($analyse['position'] == 'defenseur') ? $script->pseudo : $analyse['pseudo'];
			$hash = sha1($script->serveur.$attaquant.$analyse['date'].$analyse['id']);
		}
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM RC_guerre WHERE hash = :hash');
		$requete->bindValue(':hash', $hash, PDO::PARAM_STR);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] == 0) {
			$requete = $bdd->prepare('INSERT INTO RC_guerre (serveur, import_auto, proprietaire, createur, attaquant, defenseur, RC, mode, analyse, HOF, date_RC, date_ajout, hash)
									  VALUES (:serveur, :import_auto, :proprietaire, :createur, :attaquant, :defenseur, :RC, :mode, :analyse, :HOF, :date_RC, :date_ajout, :hash)');
			$requete->bindValue(':serveur', $script->serveur, PDO::PARAM_STR);
			$requete->bindValue(':import_auto', 1, PDO::PARAM_INT);
			$requete->bindValue(':proprietaire', ($script->serveur == 's2') ? 'FCGB' : 'ZOO', PDO::PARAM_STR);
			$requete->bindValue(':createur', $script->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':attaquant', $attaquant, PDO::PARAM_STR);
			$requete->bindValue(':defenseur', $defenseur, PDO::PARAM_STR);
			$requete->bindValue(':mode', $analyse['mode'], PDO::PARAM_STR);
			$requete->bindValue(':RC', join('<br>', json_decode($_POST['RC'], true)), PDO::PARAM_STR);
			$requete->bindValue(':analyse', $_POST['valeurs'], PDO::PARAM_STR);
			$requete->bindValue(':HOF', $analyse['attaquant']['HOF_pertes'] + $analyse['defenseur']['HOF_pertes']);
			$requete->bindValue(':date_RC', $analyse['date'], PDO::PARAM_INT);
			$requete->bindValue(':date_ajout', time(), PDO::PARAM_INT);
			$requete->bindValue(':hash', $hash, PDO::PARAM_STR);
			$requete->execute();
			$bdd = null;
			return 1;
		}
		else {
			return 0;
		}
	}

	/*
		Stock un RC envoyé depuis la fenêtre de guerre
	*/
	public function save_RC() {
		$analyse = json_decode($_POST['valeurs'], true);
		$attaquant = $analyse['attaquant']['pseudo'];
		$defenseur = $analyse['defenseur']['pseudo'];
		$hash = sha1($this->serveur.$attaquant.$defenseur.json_encode($analyse['attaquant']['armee']).json_encode($analyse['defenseur']['armee']));
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM RC_guerre WHERE hash = :hash');
		$requete->bindValue(':hash', $hash, PDO::PARAM_STR);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] == 0) {
			$requete = $bdd->prepare('INSERT INTO RC_guerre (serveur, import_auto, proprietaire, createur, attaquant, defenseur, RC, mode, analyse, HOF, date_RC, date_ajout, hash)
									  VALUES (:serveur, :import_auto, :proprietaire, :createur, :attaquant, :defenseur, :RC, :mode, :analyse, :HOF, :date_RC, :date_ajout, :hash)');
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':import_auto', 0, PDO::PARAM_INT);
			$requete->bindValue(':proprietaire', $this->alliance, PDO::PARAM_STR);
			$requete->bindValue(':createur', $this->utilisateur->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':attaquant', $attaquant, PDO::PARAM_STR);
			$requete->bindValue(':defenseur', $defenseur, PDO::PARAM_STR);
			$requete->bindValue(':mode', $analyse['mode'], PDO::PARAM_STR);
			$requete->bindValue(':RC', join("<br>", json_decode($_POST['RC'], true)), PDO::PARAM_STR);
			$requete->bindValue(':analyse', $_POST['valeurs'], PDO::PARAM_STR);
			$requete->bindValue(':HOF', $analyse['attaquant']['HOF_pertes'] + $analyse['defenseur']['HOF_pertes']);
			$requete->bindValue(':date_RC', $analyse['date'], PDO::PARAM_INT);
			$requete->bindValue(':date_ajout', time(), PDO::PARAM_INT);
			$requete->bindValue(':hash', $hash, PDO::PARAM_STR);
			$requete->execute();
			$bdd = null;
		}
		else {
			echo 'RC déjà connu';
		}
	}

	/*
		Regarde si l'utilisateur peut OSD / OSL ou se fait OSL par la cible
	*/
	public function compare_PuissanceJoueurs($cible) {
		$attaquant = new Armee(
								array((int)$this->utilisateur->niveaux->JSN, (int)$this->utilisateur->niveaux->SN, (int)$this->utilisateur->niveaux->NE, (int)$this->utilisateur->niveaux->JS, (int)$this->utilisateur->niveaux->S, 
									  (int)$this->utilisateur->niveaux->C, (int)$this->utilisateur->niveaux->CE, (int)$this->utilisateur->niveaux->A, (int)$this->utilisateur->niveaux->AE, (int)$this->utilisateur->niveaux->SE, 
									  (int)$this->utilisateur->niveaux->Tk, (int)$this->utilisateur->niveaux->TkE, (int)$this->utilisateur->niveaux->T, (int)$this->utilisateur->niveaux->TE),
								array(
									'armes' =>			(int)$this->utilisateur->niveaux->armes,
									'bouclier' => 		(int)$this->utilisateur->niveaux->bouclier_thoracique,
									'lieu' => 2,
									'niveau_lieu' => (int)$this->utilisateur->niveaux->loge_imperiale,
									)
								);
		$defenseur = new Armee(
								array((int)$cible->niveaux_probables['JSN'], (int)$cible->niveaux_probables['SN'], (int)$cible->niveaux_probables['NE'], (int)$cible->niveaux_probables['JS'], 
									  (int)$cible->niveaux_probables['S'], (int)$cible->niveaux_probables['C'], (int)$cible->niveaux_probables['CE'], (int)$cible->niveaux_probables['A'],
									  (int)$cible->niveaux_probables['AE'], (int)$cible->niveaux_probables['SE'], (int)$cible->niveaux_probables['Tk'], (int)$cible->niveaux_probables['TkE'], 
									  (int)$cible->niveaux_probables['T'], (int)$cible->niveaux_probables['TE']),
								array(
									'armes' =>			(int)$cible->niveaux_probables['armes'],
									'bouclier' =>		(int)$cible->niveaux_probables['bouclier'],
									'lieu' =>			1,
									'niveau_lieu' =>	(int)$cible->niveaux_probables['dome']
									)
								);
		$att_att = $attaquant->get_AttaqueAB();
		$def_att = $defenseur->get_AttaqueAB();

		$att_vie_loge = $attaquant->get_VieAB();
		$def_vie_dome = $defenseur->get_VieAB();
		$defenseur->niveaux['lieu'] = 2;
		$defenseur->niveaux['niveau_lieu'] = (int)$cible->niveaux_probables['loge'];
		$def_vie_loge = $defenseur->get_VieAB();	

		return array(
				'FDF' => array(
					'valeur' => $def_att, 
					'couleur' => (($def_att > $att_vie_loge) ? 'red' : (($def_att * 1.2 > $att_vie_loge) ? 'orange' : 'green')),
					'prerequis' => array('armes')
				),
				'OSD' => array(
					'valeur' => $def_vie_dome, 
					'couleur' => (($att_att < $def_vie_dome) ? 'red' : (($att_att < $def_vie_dome * 1.2) ? 'orange' : 'green')),
					'prerequis' => array('bouclier', 'dome')
				),
				'OSL' => array(
					'valeur' => $def_vie_loge, 
					'couleur' => (($att_att < $def_vie_loge) ? 'red' : (($att_att < $def_vie_loge * 1.2) ? 'orange' : 'green')),
					'prerequis' => array('bouclier', 'loge')
				)
					);			

	}


	/*
		REPERTOIRE DE COMBATS
	*/

	public function get_Combats($joueurs, $debut, $fin) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		if(empty($joueurs)) {
			return array();
		}
		$pseudos = '';
		for($i=0; $i<count($joueurs); $i++) {
			$pseudos .= (($pseudos == '') ? '' : ' OR ').'attaquant = :pseudo_'.$i.' OR defenseur = :pseudo_'.$i;
		}
		
		$requete = $bdd->prepare('SELECT * FROM RC_guerre WHERE serveur = :serveur AND date_RC > :debut AND date_RC < :fin AND mode = "RC" AND ('.$pseudos.') ORDER BY '.(htmlentities($_GET['ordre'] == 'HOF') ? 'HOF' : 'date_RC').' DESC');
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $cible->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':debut', $debut, PDO::PARAM_INT);
		$requete->bindValue(':fin', $fin, PDO::PARAM_INT);
		for($i=0; $i<count($joueurs); $i++) {
			$requete->bindValue(':pseudo_'.$i, $joueurs[$i], PDO::PARAM_STR);
		}

		$requete->execute();
		$RCs = $requete->fetchAll(PDO::FETCH_ASSOC);

		return $RCs;
	}

	public function get_ListeMembresRCs() {
		$joueurs_temp = explode(',', $_GET['joueurs']);
		$alliances = explode(',', $_GET['alliances']);

		$joueurs = array();
		foreach($joueurs_temp as $pseudo) {
			if(!empty($pseudo)) {
				$joueurs[] = htmlentities($pseudo);
			}
		}

		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		foreach($alliances as $alliance) {
			$requete = $bdd->prepare('SELECT Pseudo FROM BDDJoueurs WHERE alliance = :alliance');
			$requete->bindValue(':alliance', htmlentities($alliance), PDO::PARAM_STR);
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $pseudo) {
				if(!in_array($pseudo['Pseudo'], $joueurs)) {
					$joueurs[] = $pseudo['Pseudo'];
				}
			}
		}
		$bdd = null;
		return $joueurs;
	}



	/*
		CREATION DES POSTS DE RECAPITULATIF FI
	*/

	public function get_RecapGuerreFI($ID_forum) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT ID_joueurs FROM FI_guerre WHERE alliance = :alliance AND serveur = :serveur AND ID_forum = :ID_forum');
		$requete->bindValue(':alliance', $this->get_AllianceActif(), PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':ID_forum', $ID_forum, PDO::PARAM_STR);
		$requete->execute();
		$this->ID_joueurs = array_keys(json_decode($requete->fetch(PDO::FETCH_ASSOC)['ID_joueurs'], true));
		$combats = $this->parse_Combats($this->get_Combats($this->ID_joueurs, 1459189833, time()));
		return $this->compute_RecapCombats($combats);
	}

	protected function parse_Combats($combats) {
		for($i=0; $i<count($combats); $i++) {
			$combats[$i]['analyse'] = json_decode($combats[$i]['analyse'], true);
		}
		return $combats;
	}

	protected function compute_RecapCombats($combats) {
		$this->joueurs = array();
		$stats = array(
			'HOF' => array(),
			'killers' => array(),
			'pertes_alliees' => array('attaque' => 0, 'defense' => 0),
			'pertes_adverses' => array('attaque' => 0, 'defense' => 0)
		);
		for($i=0; $i<count($combats); $i++) {
			$combat = $combats[$i];
			$ID = $combat['ID_RC'];
			$att = $this->manage_PseudosCombats($combat['attaquant']);
			$def = $this->manage_PseudosCombats($combat['defenseur']);

			$combats[$i]['analyse']['attaquant']['compte'] = $att;
			$combats[$i]['analyse']['defenseur']['compte'] = $def;
			$stats['HOF'][$i] = $combat['analyse']['attaquant']['HOF'] + $combat['analyse']['defenseur']['HOF'];

			if($att != null) {
				if(array_key_exists($att->pseudo, $stats['killers'])) {
					$stats['killers'][$att->pseudo] += $combat['analyse']['defenseur']['HOF'];
				}
				else {
					$stats['killers'][$att->pseudo] = $combat['analyse']['defenseur']['HOF'];
				}
			}
			if($att != null && $att->allie || $def != null && !$def->allie) {
				$stats['pertes_alliees']['attaque'] += $combat['analyse']['attaquant']['HOF'];
				$stats['pertes_adverses']['defense'] += $combat['analyse']['defenseur']['HOF'];
			}
			if($att != null && !$att->allie || $def != null && $def->allie) {
				$stats['pertes_alliees']['defense'] += $combat['analyse']['defenseur']['HOF'];
				$stats['pertes_adverses']['attaque'] += $combat['analyse']['attaquant']['HOF'];
			}
		}
		arsort($stats['HOF']);
		arsort($stats['killers']);

		return $this->create_PostFI($stats, $combats);
	}

	protected function create_PostFI($stats, $combats) {
		$separateur = '<br>';
		$FI = '';
		$options = array(
			array('id' => 'pertes_alliees', 'titre' => 'Pertes alliées', 'color' => '#FF0000'),
			array('id' => 'pertes_adverses', 'titre' => 'Pertes ennemies', 'color' => '#2E8B57')
		);

		$FI .= $separateur.'[center][b]Ne jamais modifier manuellement ![/b][/center]'.$separateur.$separateur.$separateur;

		foreach($options as $mode) {
			$FI .= '[b]'.$mode['titre'].' :[/b]'.$separateur.$separateur;
			$FI .= 'Totales des pertes en attaque : [b][color='.$mode['color'].']';
			$FI .= Nombre::Espaces($stats[$mode['id']]['attaque']/31557600).' années[/color][/b]'.$separateur;
			$FI .= 'Totales des pertes en défense : [b][color='.$mode['color'].']';
			$FI .= Nombre::Espaces($stats[$mode['id']]['defense']/31557600).' années[/color][/b]'.$separateur;
			$FI .= 'Totales des pertes : [b][color='.$mode['color'].']';
			$FI .= Nombre::Espaces(($stats[$mode['id']]['defense'] + $stats[$mode['id']]['attaque'])/31557600).' années[/color][/b]'.$separateur;
			$FI .= $separateur;
		}

		$diff = $stats['pertes_adverses']['attaque'] + $stats['pertes_adverses']['defense'] - ($stats['pertes_alliees']['attaque'] + $stats['pertes_alliees']['defense']);
		if($diff > 0) {
			$FI .= '[b]Avantage allié : [color=#2E8B57]'.Nombre::Espaces($diff/31557600).' années[/color][/b]';
		}
		else {
			$FI .= '[b]Avantage adverse : [color=#FF0000]'.Nombre::Espaces((-$diff)/31557600).' années[/color][/b]';	
		}

		$FI .= $separateur.$separateur.$separateur;

		$FI .= '[b]Classement des plus gros tueurs :[/b]'.$separateur.$separateur;
		foreach($stats['killers'] as $pseudo => $HOF) {
			if($HOF < 31557600*5000) {
				break;
			}
			$i++;
			$ligne =  $i.' - '.$this->BBCode_Pseudo($pseudo).' ('.(Nombre::Espaces($HOF/31557600)).' années)';
			$FI .= $ligne.$separateur;
		}

		$FI .= $separateur.$separateur;

		$FI .= '[b]Classement des plus gros combats :[/b]'.$separateur.$separateur;
		$i = 0;
		foreach($stats['HOF'] as $ID => $HOF) {
			$i++;
			$combat = $combats[$ID];
			$ligne =  $i.' - '.$this->BBCode_Pseudo($combat['attaquant']).' vs '.$this->BBCode_Pseudo($combat['defenseur']);
			$ligne .= ' ('.(Nombre::Espaces($HOF/31557600)).' années)';
			$FI .= $ligne.$separateur;
			if($i == 13) {
				break;
			}
		}

		return $FI;

	}

	protected function BBCode_Pseudo($pseudo) {
		if(in_array($pseudo, array('', '???'))) {
			return '[b]???[/b]';
		}
		else {
			return '[player]'.trim($pseudo).'[/player]';
		}
	}

	protected function manage_PseudosCombats($pseudo) {
		if(in_array($pseudo, array('', '???'))) {
			return null;
		}
		elseif(array_key_exists($pseudo, $this->joueurs)) {
			return $this->joueurs[$pseudo];
		}
		else {
			$this->joueurs[$pseudo] = new Utilisateur_Fzzz($pseudo, $this->serveur, null);
			$this->joueurs[$pseudo]->allie = !in_array($pseudo, $this->ID_joueurs);
			return $this->joueurs[$pseudo];
		}
	}






	public function get_urlForum($pseudo) {
		return '';
	}
	
}
