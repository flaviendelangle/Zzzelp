<?php

class MultiFlood {

	public $utilisateur;

	public $alliance;
	public $user_alliance;
	public $floods_utilisateur;

	public $nombre_unites;
	public $mode;
	public $alliancesFloods;
	public $alliancesChasse;
	public $vitesse_attaque;
	public $floods;
	public $joueurs;
	public $pseudos;
	public $script;

	public function __construct($utilisateur) {
		$this->utilisateur = $utilisateur;
	}


	/*
		Onglet preparation
	*/

	/*
		Ajoute l'alliance utilisée pour préparer le Multiflood
	*/
	public function set_alliance($alliance) {
		$this->alliance = $alliance;
	}

	/*
		Vérifie si le Multiflood est bien accessible pour l'alliance choisie compte tenu des droits du joueur
	*/
	public function is_MF_enable() {
		if(empty($this->alliance)) {
			return false;
		}
		$this->user_alliance = new MembreAlliance($this->alliance, $this->utilisateur->pseudo, $this->utilisateur->serveur);
		return ($this->user_alliance->check_droit_outil('acces_MF') AND $this->user_alliance->check_activation_outil('MF'));

	}

	/*
		Récupère la liste des alliances à charger dans le Multiflood en plus de celle de l'utilisateur
	*/
	public function get_alliances() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$alliances = $this->alliance;
		$requete = $bdd->prepare('SELECT * FROM ennemis WHERE hote = :hote AND serveur = :serveur AND type = :type');
		$requete->bindValue(':type', 'alliance', PDO::PARAM_STR);
		$requete->bindValue(':hote', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $alliance) {
			$alliances .= ','.$alliance['ennemi'];
		}
		return $alliances;
	}

	/*
		Récupère la liste des joueurs à charger dans le Multiflood
	*/
	public function get_joueurs() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$joueurs = '';
		$requete = $bdd->prepare('SELECT * FROM ennemis WHERE hote = :hote AND serveur = :serveur AND type = :type');
		$requete->bindValue(':type', 'joueur', PDO::PARAM_STR);
		$requete->bindValue(':hote', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $joueur) {
			if ($joueurs != '') {
				$joueurs .= ',';
			}
			$joueurs = $joueurs.$joueur['ennemi'];
		}
		return $joueurs;
	}

	/*
		Récupère la liste des floods arrivant il y a moins de 24 heures (ou en cours) dont l'utilisateur peut avoir connaissance et le concernant
		(ces floods et ceux des membres de ses alliances sur lui)
	*/
	public function get_FloodJoueur() {
		
		$this->utilisateur->getAlliances();
		$this->floods_utilisateur = array();

		$bdd = Zzzelp::Connexion_BDD('Actions');
		$alliances = '';
		for($i=0; $i<count($this->utilisateur->alliances); $i++) {
			$alliances .= (($alliances != '') ? ' OR ' : '').' ally_1 = :ally_1_'.$i.' OR ally_1 = :ally_2_'.$i.' OR ally_1 = :ally_3_'.$i; 
		}
		$requete = $bdd->prepare('SELECT * FROM floods_courant WHERE serveur = :serveur AND (ID_attaquant = :ID_att OR (ID_cible = :ID_def AND ('.$alliances.'))) AND arrivee > :time ORDER BY ID DESC');
		$requete->bindValue(':ID_att', $this->utilisateur->id, PDO::PARAM_STR);
		$requete->bindValue(':ID_def', $this->utilisateur->id, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->bindValue(':time', time()-86400, PDO::PARAM_INT);
		for($i=0; $i<count($this->utilisateur->alliances); $i++) {
			$requete->bindValue(':ally_1_'.$i, $this->utilisateur->alliances[$i]->alliance, PDO::PARAM_STR);
			$requete->bindValue(':ally_2_'.$i, $this->utilisateur->alliances[$i]->alliance, PDO::PARAM_STR);
			$requete->bindValue(':ally_3_'.$i, $this->utilisateur->alliances[$i]->alliance, PDO::PARAM_STR);
		}
		$requete->execute();
		$floods = $requete->fetchAll(PDO::FETCH_ASSOC);
		
		for($i=0; $i<count($floods); $i++) {
			$cle = ($floods[$i]['ID_attaquant'] == $this->utilisateur->id) ? 'attaquant' : 'cible';
			$anticle = ($cle == 'attaquant') ? 'cible' : 'attaquant';
			$membre = new Utilisateur_Fzzz(null, $this->utilisateur->serveur, $floods[$i]['ID_'.$anticle]);
			$floods[$i][$cle] = $this->utilisateur->pseudo;
			$floods[$i][$anticle] = $membre->pseudo;
			$floods[$i]['mode'] = $cle;
		}
		$this->floods_utilisateur = $floods;
	}

	/*
		Supprime le flood souhaité par l'utilisateur
	*/
	public function delete_flood($ID_flood) {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT ID_attaquant FROM floods_courant WHERE ID = :ID');
		$requete->bindValue(':ID', $ID_flood, PDO::PARAM_INT);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_ASSOC)['ID_attaquant'] == $this->utilisateur->id) {
			$requete = $bdd->prepare('DELETE FROM floods_courant WHERE ID = :ID');
			$requete->bindValue(':ID', $ID_flood, PDO::PARAM_INT);
			$requete->execute();
		}
	}


	/*
		Onglet dump
	*/

	/*
		Récupération des TDC via les dumps pour le MF
	*/
	public function get_TDCDump($alliances, $joueurs) {
		$this->pseudos = array();
		$this->joueurs = array();
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$requete = $bdd->prepare('SELECT * FROM TDC_'.$this->utilisateur->serveur.' WHERE (pseudo = :pseudo OR '.$this->create_RequeteMFDump('alliance', $alliances).' OR '.$this->create_RequeteMFDump('pseudo', $joueurs).') AND date_releve > :date_releve GROUP BY pseudo');
		$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':date_releve', time() - 3600, PDO::PARAM_INT);
		$requete = $this->bind_RequeteMFDump('alliance', $alliances, $requete);
		$requete = $this->bind_RequeteMFDump('pseudo', $joueurs, $requete);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {
			$this->joueurs[$resultat['pseudo']] =  new Utilisateur_Fzzz($resultat['pseudo'], $this->utilisateur->serveur, null);
			$this->joueurs[$resultat['pseudo']]->TDC = $resultat['valeur'];
			$this->joueurs[$resultat['pseudo']]->alliance = $resultat['alliance'];
			$this->joueurs[$resultat['pseudo']]->rang = '';
			$this->joueurs[$resultat['pseudo']]->getCoordonnees();
			$this->pseudos[] = $resultat['pseudo'];
		}
	}

	/*
		Génère la sous requête pour les dumps
	*/
	public function create_RequeteMFDump($mode, $tableau) {
		$requete = '';
		for($i=0; $i<count($tableau); $i++) {
			$requete .= (($requete == '') ? '' : ' OR ').$mode.' = :'.$mode.'_'.$i;
		}
		return $requete;
	}

	/*
		Lie les valeurs à la requête pour les dumps
	*/
	public function bind_RequeteMFDump($mode, $tableau, $requete) {
		for($i=0; $i<count($tableau); $i++) {
			$requete->bindValue(':'.$mode.'_'.$i, $tableau[$i], PDO::PARAM_STR);
		}
		return $requete;		
	}

	/*
		Onglet tableau
	*/

	/*
		Fonction principale de création du Multiflood
	*/
	public function prepare_table() {
		$this->mode = htmlentities($_GET['mode']);
		$this->utilisateur->getAlliances_activated();
		$this->utilisateur->get_obj_Alliances_activated();
		$this->utilisateur->getInfosZzzelp();
		if($this->mode == 'auto') {
			$this->nombre_unites = htmlentities($_GET['cf']);
			if(!empty($_SESSION['donnees_MF_POST'])) {
				$_POST = json_decode($_SESSION['donnees_MF_POST'], true);
				unset($_SESSION['donnees_MF_POST']);
				unset($_SESSION['donnees_MF_GET']);
			}
			$data = json_decode(rawurldecode($_POST['donnees_alliance']), true);
			$this->extract_players_data($data);
			$this->save_Traceur($data);
		}
		elseif($this->mode == 'dump') {
			$alliances = explode(',',htmlentities($_POST['alliances_dump']));
			$joueurs = explode(',',htmlentities($_POST['joueurs_dump']));
			$this->nombre_unites = str_replace(' ','',htmlentities($_POST['capa_flood_dump']));
			$this->get_TDCDump($alliances, $joueurs);
		}
		elseif($this->mode == 'direct') {
			$alliance = htmlentities($_GET['alliance']);
			$this->set_alliance($alliance);
			if($this->is_MF_enable()) {
				$alliances = explode(',', $this->get_alliances());
				$joueurs = explode(',', $this->get_joueurs());				
			}
			$this->nombre_unites = 0;
			$this->get_TDCDump($alliances, $joueurs);
		}
		$this->get_DroitsFloods();
		$this->get_DroitsChasses();
		$this->get_DroitsJoueurs();
		$this->get_Variations();
		$this->get_Chasses();
		if($this->utilisateur->get_ModeMF()) {
			$this->guerre = new Guerre($this->utilisateur);
			$this->joueurs = $this->guerre->get_DonneesMF($this->joueurs);
		}
		$this->get_chefs();
		$this->rangs = new RangsZzzelp($this->utilisateur->serveur);
		$this->rangs->compute_ModeAjax($this->utilisateur);
		$this->utilisateur->get_SondeAntisonde();

		$this->script = new ZzzelpScript(null, null, null, $this->utilisateur);
		$this->script->get_ParametresZzzelpScript();
	}

	public function save_Traceur($data) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM Logs_MF WHERE hash = :hash');
		$requete->bindValue(':hash', htmlentities($_GET['hash']), PDO::PARAM_STR);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] == 0) {
			$alliance = (count($this->utilisateur->alliances_activated) > 0) ? $this->utilisateur->alliances_activated[0]->alliance : '';
			Traceur::save_Releves($data, $alliance);
			$requete = $bdd->prepare('INSERT INTO Logs_MF (pseudo, serveur, date_chargement, alliance_1, alliance_2, alliance_3, hash) 
											   VALUES (:pseudo, :serveur, :date_chargement, :alliance_1, :alliance_2, :alliance_3, :hash)');
			$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->bindValue(':date_chargement', time(), PDO::PARAM_INT);
			for($i=0; $i<3; $i++) {
				$requete->bindValue(':alliance_'.($i+1), (count($this->utilisateur->alliances_activated) > $i) ? $this->utilisateur->alliances_activated[$i]->alliance : '', PDO::PARAM_STR);
			}
			$requete->bindValue(':hash', htmlentities($_GET['hash']), PDO::PARAM_STR);
			$requete->execute();
		}
	}

	/*
		Analyse les données envoyé par ZzzelpScript et recupère les données de base relatives à chaque joueur (coordonnées, ID)
	*/
	public function extract_players_data($data) {
		$this->pseudos = array();
		$this->joueurs = array();
		foreach($data['joueurs'] as $joueur) {
			if(in_array($joueur['pseudo'], $data['a_afficher']['joueurs']) OR $joueur['pseudo'] == $this->utilisateur->pseudo) {
				$this->joueurs[$joueur['pseudo']] =  new Utilisateur_Fzzz($joueur['pseudo'], $this->utilisateur->serveur, null);
				$this->joueurs[$joueur['pseudo']]->TDC = $joueur['TDC'];
				$this->joueurs[$joueur['pseudo']]->alliance = $joueur['alliance'];
				$this->joueurs[$joueur['pseudo']]->rang = '';
				$this->joueurs[$joueur['pseudo']]->getCoordonnees();
				if(!in_array($joueur['pseudo'], $this->pseudos)) {
					$this->pseudos[] = $joueur['pseudo'];
				}
			}
		}
		foreach($data['alliances'] as $alliance) {
			if(in_array($alliance['alliance'], $data['a_afficher']['alliances'])) {
				foreach($alliance['valeurs'] as $joueur) {
					$this->joueurs[$joueur['pseudo']] =  new Utilisateur_Fzzz($joueur['pseudo'], $this->utilisateur->serveur, null);
					$this->joueurs[$joueur['pseudo']]->TDC = $joueur['TDC'];
					$this->joueurs[$joueur['pseudo']]->alliance = $alliance['alliance'];
					$this->joueurs[$joueur['pseudo']]->rang = $joueur['rang'];
					$this->joueurs[$joueur['pseudo']]->getCoordonnees();
					if(!in_array($joueur['pseudo'], $this->pseudos)) {
						$this->pseudos[] = $joueur['pseudo'];
					}
				}
			}
		}
	}

	/*
		Récupère les aliances dont le joueur peut voir les floods
	*/
	public function get_DroitsFloods() {
		$this->alliancesFloods = array();
		for($i=0; $i<count($this->utilisateur->alliances_activated_obj); $i++) {
			$this->alliancesFloods = array_merge($this->alliancesFloods, $this->utilisateur->alliances_activated_obj[$i]->get_DroitsAffichageFloods());
		}
	}

	/*
		Récupère les alliances dont le joueur peut voir les chasses
	*/
	public function get_DroitsChasses() {
		$this->alliancesChasse = array();
		for($i=0; $i<count($this->utilisateur->alliances_activated_obj); $i++) {
			if($this->utilisateur->alliances_activated_obj[$i]->check_droit_outil('chasses')) {
				$this->alliancesChasse[] = $this->utilisateur->alliances_activated_obj[$i]->alliance;
			}
		}
	}

	/*
		Récupère les floods en cours aucquels le joueur a accès
	*/
	public function get_Variations() {
		$this->floods = array();
		if(count($this->alliancesFloods) > 0) {
			$bdd = Zzzelp::Connexion_BDD('Actions');
			$alliances = '';
			for($i=0; $i<count($this->alliancesFloods); $i++) {
				$alliances .= (($alliances != '') ? ' OR ' : '').' ally_1 = :ally_1_'.$i.' OR ally_1 = :ally_2_'.$i.' OR ally_1 = :ally_3_'.$i; 
			}
			$requete = $bdd->prepare('SELECT ID_attaquant, ID_cible, valeur, arrivee FROM floods_courant WHERE ('.$alliances.') AND serveur = :serveur AND arrivee > :time ORDER BY arrivee, ID ASC');
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->bindValue(':time', time(), PDO::PARAM_INT);
			for($i=0; $i<count($this->alliancesFloods); $i++) {
				$requete->bindValue(':ally_1_'.$i, $this->alliancesFloods[$i], PDO::PARAM_STR);
				$requete->bindValue(':ally_2_'.$i, $this->alliancesFloods[$i], PDO::PARAM_STR);
				$requete->bindValue(':ally_3_'.$i, $this->alliancesFloods[$i], PDO::PARAM_STR);
			}
			$requete->execute();
			$resultat = $requete->fetchAll(PDO::FETCH_ASSOC);			
			foreach($resultat as $flood) {
				$attaquant = new Utilisateur_Fzzz(null, $this->utilisateur->serveur, $flood['ID_attaquant']);
				$defenseur = new Utilisateur_Fzzz(null, $this->utilisateur->serveur, $flood['ID_cible']);
				$this->floods[] = array(
									'attaquant' => $attaquant->pseudo,
									'cible' => $defenseur->pseudo,
									'valeur' => $flood['valeur'],
									'date' => $flood['arrivee']
										);
			}
		}
	}

	/*
		Récupère les chasses aucquelles le joueur a accès
	*/
	public function get_Chasses() {
		$this->chasses = array();
		$bdd = Zzzelp::Connexion_BDD('Actions');
		foreach($this->pseudos as $pseudo) {
			if($this->joueurs[$pseudo]->droits == 'true') {
				$requete = $bdd->prepare('SELECT valeur, arrivee FROM chasses WHERE pseudo = :pseudo AND serveur = :serveur AND arrivee > :time ORDER BY arrivee ASC LIMIT 1');
				$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
				$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
				$requete->bindValue(':time', time(), PDO::PARAM_INT);
				$requete->execute();
				$resultat = $requete->fetch(PDO::FETCH_ASSOC);
				if(!empty($resultat)) {
					$this->chasses[] = array('pseudo' => $pseudo, 'valeur' => $resultat['valeur'], 'date' => $resultat['arrivee']);
				}
			}
		}
	}

	/*
		Vérifie si les joueur du Multiflood sont dans une des alliances de l'utilisateur ou non
	*/
	public function get_DroitsJoueurs() {
		foreach($this->pseudos as $pseudo) {
			$this->joueurs[$pseudo]->droits = 'false';
			$this->joueurs[$pseudo]->getAlliances_activated();
			foreach($this->joueurs[$pseudo]->alliances_activated as $alliance) {
				if($alliance->alliance != '' AND in_array($alliance->alliance, $this->alliancesChasse)) {
					$this->joueurs[$pseudo]->droits = 'true';
				}
			}
		}
	}

	/*
		Récupère la liste des chefs chargés dans cette instance du Multiflood
	*/
	public function get_chefs() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		foreach($this->pseudos as $pseudo) {
			$requete = $bdd->prepare('SELECT COUNT(*) FROM Droits_alliance WHERE pseudo = :pseudo AND serveur = :serveur AND droits = 4');
			$requete->bindValue('pseudo', $pseudo, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->execute();
			$this->joueurs[$pseudo]->chef = (($requete->fetch(PDO::FETCH_NUM)[0] > 0) ? 'true' : 'false');
		}
	}

	/*
		Crée la variable JSON utilisée par le script MF.js pour créer le Multiflood
	*/
	public function create_json() {
		$tableau = array(
					'server' => $this->utilisateur->serveur,
					'username' => $this->utilisateur->pseudo,
					'capacity' => $this->nombre_unites,
					'alliances' => array(),
					'players' => array(),
					'ranks' => $this->rangs->rangs,
					'chasses' => $this->chasses,
					'floods' => $this->floods,
					'attack_speed' => $this->utilisateur->niveaux->vitesse_attaque,
					'mode_MF' => ($this->utilisateur->get_ModeMF() ? 'guerre' : 'chasse'),
					'sondes' => $this->utilisateur->schema_sonde,
					'antisondes' => $this->utilisateur->schema_antisonde,
					'lancement_zzzelp' => $this->script->options['zzzelpfloods']['parametres']['zzzelpfloods_stockage']['active'],
					'placer_antisonde' => $this->script->options['zzzelpfloods']['parametres']['zzzelpfloods_antisonde']['active']
						);
		foreach($this->utilisateur->alliances_activated as $alliance) {
			$tableau['alliances'][] = $alliance->alliance;
		}

		foreach($this->joueurs as $pseudo => $valeurs) {
			$tableau['players'][$pseudo] = array(
				'TDC' 		=> $valeurs->TDC,
				'rang' 		=> $valeurs->rang,
				'alliance' 	=> $valeurs->alliance,
				'ID' 		=> $valeurs->id,
				'x' 		=> $valeurs->coordonnees['x'],
				'y' 		=> $valeurs->coordonnees['y'],
				'chef' 		=> $valeurs->chef,
				'donnees_guerre' => $valeurs->donnees_guerre
			);
		}

		return json_encode($tableau);

	}

}