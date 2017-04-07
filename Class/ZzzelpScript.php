<?php

class ZzzelpScript {
	
	public $token;
	public $pseudo;
	public $serveur;
	public $mode;
	public $autorise = false;
	public $utilisateur;
	public $new_token;

	public $authentifications;
	public $parametres_script;

	/*
		Nouvelle version
	*/
	public $options = array(
				'synchronisation' => array(
					'nom' => 'Synchronisation avec Zzzelp',
					'parametres' => array(
						'synchro_ouvrieres' => array('nom' => 'Vos ouvrières', 'prive' => 0),
						'synchro_niveaux' => array('nom' => 'Vos niveaux', 'prive' => 0),
					//	'synchro_chasses' => array('nom' => 'Vos chasses', 'prive' => 0),
						'synchro_RC' => array('nom' => 'Vos rapports de combat', 'prive' => 1),
						'synchro_armee' => array('nom' => 'Votre armée (C+ only)', 'prive' => 0)
					)
				),
				'alliance' => array(
					'nom' => 'Les outils pour alliance',
					'parametres' => array(
						'ally_rangs' => array('nom' => 'Rangs Zzzelp', 'prive' => 0),
						'ally_couleurs' => array('nom' => 'Couleurs des rangs', 'prive' => 0),
					//	'ally_traceur_auto' => array('nom' => 'Exports auto des TDC', 'prive' => 2),
						'ally_traceur_consultation' => array('nom' => 'Résultats du traceur', 'prive' => 1)
					)
				),
				'perso' => array(
					'nom' => 'Les outils pour joueur',
					'parametres' => array(
						'perso_smileys' => array('nom' => 'Smileys personnalisés', 'prive' => 0),
						'perso_menu_contextuel' => array('nom' => 'Menu contextuel amélioré', 'prive' => 0),
						'perso_page_chat' => array('nom' => 'Chat amélioré', 'prive' => 2),
						'perso_page_profil' => array('nom' => 'Profils améliorés', 'prive' => 2),
						'perso_colonies' => array('nom' => 'Affichage des colonies', 'prive' => 0),
						'perso_messagerie' => array('nom' => 'Messagerie améliorée', 'prive' => 0),
						'perso_messagerie_guerre' => array('nom' => 'Messagerie de guerre', 'prive' => 0),
						'perso_lancement_attaques' => array('nom' => 'Lancement des attaques', 'prive' => 0),
						'perso_page_ennemie' => array('nom' => 'Page Ennemie améliorée', 'prive' => 0),
						'perso_page_description' => array('nom' => 'Description alliance cachée', 'prive' => 0),
						'perso_page_armee' => array('nom' => 'Page Armée améliorée', 'prive' => 0)
					)
				),
				'zzzelpfloods' => array(
					'nom' => 'Gestionnaire de floods',
					'parametres' => array(
						'zzzelpfloods_stockage' => array('nom' => 'Stockage sur Zzzelp', 'prive' => 0),
						'zzzelpfloods_antisonde' => array('nom' => 'Replacement antisonde', 'prive' => 0),
						'zzzelpfloods_relance' => array('nom' => 'Aide à la relance', 'prive' => 5),
						'zzzelpfloods_antisynchro' => array('nom' => 'Lancement à la seconde', 'prive' => 2)
					)
				)
			);
	public function __construct($pseudo, $serveur, $token, $compte=null) {
		if(!isset($compte)) {
			if(!isset($_GET['pseudo'])) {
				$this->autorise = false;
			}
			else {
				$this->mode = (strlen($token) == 6) ? 'zzzelp' : (empty($token) ? 'vide' : 'fourmizzz');
				$this->token = htmlentities($token);
				$this->pseudo = htmlentities($pseudo);
				$this->serveur = htmlentities($serveur);
				$compte = new Utilisateur_Fzzz($this->pseudo, $this->serveur, null);
				if(!$compte->check_ExistenceZzzelp()) {
					$this->ask_newAuthentification(false);
				}
				elseif($this->mode == 'vide' OR ($this->mode == 'zzzelp' AND !$this->is_token_zzzelp_valid())) {
					$this->ask_newAuthentification(true);
				}
				elseif($this->mode == 'zzzelp') {
					$this->utilisateur = new Utilisateur_Fzzz($this->pseudo, $this->serveur, null);
					$this->autorise = true;
				}
				elseif($this->mode == 'fourmizzz') {
					if(self::is_token_fourmizzz_valid($this->serveur, $this->pseudo, $this->token) OR true) {
						$this->initialise_Authentification();
						$this->autorise = true;
						$this->utilisateur = new Utilisateur_Fzzz($this->pseudo, $this->serveur, null);
					}
				}
			}
		}
		else {
			$this->autorise = true;
			$this->utilisateur = $compte;
			$this->pseudo = $compte->pseudo;
			$this->serveur = $compte->serveur;
		}
	}

	/*
		Gestion de l'authentification
	*/

	/*
		Vérifie si le toke Zzzelp envoyé par le joueur est validé (existant et vieux de moins de 24h)
	*/
	private function is_token_zzzelp_valid() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM Identification_ZzzelpScript WHERE serveur = :serveur AND pseudo = :pseudo AND token = :token AND date_creation > :date_creation');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':token', $this->token, PDO::PARAM_STR);
		$requete->bindValue(':date_creation', (time()-86400), PDO::PARAM_INT);
		$requete->execute();
		return ($requete->fetch(PDO::FETCH_NUM)[0] > 0);
	}

	/*
		Génère un nouveau token Zzzelp, le stock en BDD et l'envoi à ZzzelpScript
	*/
	private function initialise_Authentification() {
		$this->new_token = Securite::newToken();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM Identification_ZzzelpScript WHERE serveur = :serveur AND pseudo = :pseudo');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] > 0) {
			$requete = $bdd->prepare('UPDATE Identification_ZzzelpScript SET token = :token, date_creation = :date_creation WHERE serveur = :serveur AND pseudo = :pseudo');
		}
		else {
			$requete = $bdd->prepare('INSERT INTO Identification_ZzzelpScript (serveur, pseudo, token, date_creation) VALUES(:serveur, :pseudo, :token, :date_creation)');
		}
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':token', $this->new_token, PDO::PARAM_STR);
		$requete->bindValue(':date_creation', time(), PDO::PARAM_INT);
		$requete->execute();			
	}

	/*
		Vérifie si un token Fourmizzz est bien valide en demandant au serveur Fourmizzz
	*/
	static public function is_token_fourmizzz_valid($serveur, $pseudo, $token) {
		$resultats = json_decode(file_get_contents('http://'.$serveur.'.fourmizzz.fr/api.php?checkToken='.$token), true);
		return (!empty($resultats['Pseudo']) AND $resultats['Pseudo'] == $pseudo);
	}

	/*
		Fait savoir à ZzzelpScript que l'authentification est périmée ou inexistante
	*/
	private function ask_newAuthentification($zzzelp) {
		echo json_encode(array(
				'etat' => ($zzzelp ? 1 : 0),
				'page' => Zzzelp::$page
			));					
	}



	/*
		Gestion des paramètres du script
	*/

	/*
		Récupère l'ensemble des paramètres de ZzzelpScript (pour la synchro du menu)
	*/
	public function get_ParametresScript($instance) {
		$this->utilisateur->get_RightsZzzelp();
		$this->get_ParametresZzzelpScript();
		$menu = new MenuZzzelp($this->utilisateur, 'serveur');
		$smileys = new Smileys($instance);
		$smileys->get_Smileys(false);
		$this->parametres_script = array();
		$this->parametres_script['parametres'] = $this->options;
		foreach($this->options as $categorie => $options) {
			foreach($options['parametres'] as $titre => $option) {
				if($option['prive'] > $this->utilisateur->droitsZzzelp) {
					unset($this->options[$categorie]['parametres'][$titre]);
				}
			}
		}
		if($this->utilisateur->droitsZzzelp > 0) {
			$this->parametres_script['zzzelpfloods_prive'] = $this->get_ParametresZzzelpFloodPrive();
			$guerre = new Guerre($this->utilisateur);
			$this->parametres_script['FI_guerre'] = $guerre->get_FI();
		}

		$this->utilisateur->get_SondeAntisonde();
		$this->parametres_script['sondes'] = $this->utilisateur->schema_sonde;
		$this->parametres_script['antisonde'] = $this->utilisateur->schema_antisonde;
		$this->parametres_script['donnees_traceur'] = $this->get_DonnesTraceur();
		$this->parametres_script['traceur_perso'] = $this->get_TraceurPerso();
		$this->parametres_script['ghosts'] = $this->get_ParametresGhost();
		$this->parametres_script['smileys'] = array($smileys->smileys, $smileys->ordre);
		$this->parametres_script['membres'] = $this->get_MembresAlliances();
		$this->parametres_script['menu'] = $menu->create_MenuFourmizzz($this->get_Fichiers());
		$this->parametres_script['menucplus'] = $menu->create_MenuComptePlus();
		$this->parametres_script['droits'] = $this->utilisateur->droitsZzzelp;
		$this->parametres_script['version'] = 3.22;
		$this->parametres_script['prive'] = $this->utilisateur->droitsZzzelp;
		$this->show_results($this->parametres_script);	
	}

	/*
		Récupère les paramètres ZzzelpScript du joueur pour les afficher sur Fourmizzz (cache les modules non accessibles)
	*/
	public function get_ParametresZzzelpScript() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM parametres_ZzzelpScript WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		if(empty($resultat)) {
			$requete = $bdd->prepare('INSERT INTO parametres_ZzzelpScript (pseudo, serveur) VALUES(:pseudo, :serveur)');
			$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->execute();
			$this->get_ParametresZzzelpScript();
		}
		else {
			foreach($this->options as $categorie => $parametres) {
				foreach($parametres['parametres'] as $option => $valeurs) {
					if($valeurs['prive'] > $this->utilisateur->droitsZzzelp) {
						unset($this->options[$categorie]['parametres'][$option]);
					}
					else {
						$this->options[$categorie]['parametres'][$option]['active'] = $resultat[$option];
					}
				} 
			}
		}
	}

	/*
		Met à jour les paramètres ZzzelpScript envoyés par Zzzelp
	*/
	public function save_ParametresZzzelpScript() {
		$nouveaux_modules = $_POST['modules'];
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		
		$sous_requete = '';
		foreach($this->options as $categorie => $valeurs) {
			foreach($valeurs['parametres'] as $titre => $parametre) {
				$sous_requete .= (($sous_requete == '') ? '' : ', ').$titre.' = :'.$titre;
			}
		}
		$requete = $bdd->prepare('UPDATE parametres_ZzzelpScript SET '.$sous_requete.' WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		foreach($this->options as $categorie => $valeurs) {
			foreach($valeurs['parametres'] as $titre => $parametre) {
				$requete->bindValue(':'.$titre, (isset($_POST['parametre_'.$titre])) ? 1 : 0, PDO::PARAM_INT);
			}
		}
		$requete->execute();

	}

	/*
		Récupère les paramètres Zzzelpfloods pour ZzzelpScript
	*/
		/*
	public function get_ParametresZzzelpFlood() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT stockage_floods_zzzelp, replacement_antisonde_floods, aide_relance_floods , choix_aide_relance, anti_synchronisation, seconde_envoie FROM parametres_ZzzelpScript WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$this->parametres_script['parametres']['zzzelpfloods'] = array(
				'stockage_floods' 		=> array('nom' => '', 'active' => (int)$donnees['stockage_floods_zzzelp']), 
				'antisonde_floods' 		=> array('nom' => '', 'active' => (int)$donnees['replacement_antisonde_floods']),
				'aide_relance' 			=> array('nom' => '', 'active' => (int)$donnees['aide_relance_floods']),
				'valeur_aide_relance' 	=> array('nom' => '', 'valeur' => (int)$donnees['choix_aide_relance']),
				'anti_synchro' 			=> array('nom' => '', 'active' => (int)$donnees['anti_synchronisation']),
				'seconde_renvoi' 		=> array('nom' => '', 'valeur' => (int)$donnees['seconde_envoie'])
			);
		$this->parametres_script['modules']['zzzelpfloods'] = array('nom' => 'Zzzelpfloods', 'active' => 1);
		$bdd = null;
	}
		*/

	public function get_ParametresZzzelpFloodPrive() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT zzzelpfloods_prive_seconde, zzzelpfloods_prive_mode_relance FROM parametres_ZzzelpScript WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		$bdd = null;
		return array(
			'seconde' 		=> (int)$resultat['zzzelpfloods_prive_seconde'],
			'mode_relance'	=> (int)$resultat['zzzelpfloods_prive_mode_relance']
		);
	}


	/*
		Stock les paramètres de Zzzelpfloods envoyés par ZzzelpScript
	*/
	public function save_ParametresZzzelpfloodExterne() {
		$this->utilisateur->get_RightsZzzelp();

		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$parametres = explode(',', substr(htmlentities($_GET['niveaux']),1,-1));
		$requete = $bdd->prepare('SELECT COUNT(*) FROM parametres_ZzzelpScript WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->execute();
		if ($requete->fetch(PDO::FETCH_NUM)[0] > 0) {
			$requete = $bdd->prepare('UPDATE parametres_ZzzelpScript SET zzzelpfloods_stockage = :zzzelpfloods_stockage, zzzelpfloods_antisonde = :zzzelpfloods_antisonde WHERE pseudo = :pseudo AND serveur = :serveur');
			$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->bindValue(':zzzelpfloods_stockage', $parametres[0], PDO::PARAM_INT);
			$requete->bindValue(':zzzelpfloods_antisonde', $parametres[1], PDO::PARAM_INT);
			$requete->execute();

			if($this->options['zzzelpfloods']['parametres']['zzzelpfloods_relance']['prive'] <= $this->utilisateur->droitsZzzelp) {
				$requete = $bdd->prepare('UPDATE parametres_ZzzelpScript SET zzzelpfloods_relance = :zzzelpfloods_relance, zzzelpfloods_prive_mode_relance = :zzzelpfloods_prive_mode_relance WHERE pseudo = :pseudo AND serveur = :serveur');
				$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
				$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
				$requete->bindValue(':zzzelpfloods_relance', $parametres[2], PDO::PARAM_INT);
				$requete->bindValue(':zzzelpfloods_prive_mode_relance', $parametres[3], PDO::PARAM_INT);
				$requete->execute();				
			}
			if($this->options['zzzelpfloods']['parametres']['zzzelpfloods_antisynchro']['prive'] <= $this->utilisateur->droitsZzzelp) {
				$requete = $bdd->prepare('UPDATE parametres_ZzzelpScript SET zzzelpfloods_antisynchro = :zzzelpfloods_antisynchro, zzzelpfloods_prive_seconde = :zzzelpfloods_prive_seconde WHERE pseudo = :pseudo AND serveur = :serveur');
				$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
				$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
				$requete->bindValue(':zzzelpfloods_antisynchro', $parametres[4], PDO::PARAM_INT);
				$requete->bindValue(':zzzelpfloods_prive_seconde', $parametres[5], PDO::PARAM_INT);
				$requete->execute();				
			}
		}
	}

	/*
		Met à jour un paramètres ZzzelpScript envoyé depuis Fourmizzz
	*/
	public function MAJ_parametre() {
		if($_GET['categorie'] == 'traceur') {
			$this->MAJ_TraceurPerso();
		}
		else {
			$this->MAJ_parametresZzzelpScript();
		}
	}

	/*
		Met à jour les options de ZzzelpScript
	*/
	public function MAJ_parametresZzzelpScript() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		if(isset($this->options[$_GET['categorie']]['parametres'][$_GET['option']])) {
			$requete = $bdd->prepare('UPDATE parametres_ZzzelpScript SET '.htmlentities($_GET['option']).' = :valeur WHERE pseudo = :pseudo AND serveur = :serveur');
			$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->bindValue(':valeur', htmlentities($_GET['valeur']));
			$requete->execute();	
		}
	}

	/*
		Met à jour les alliances et joueurs du traceur perso
	*/
	public function MAJ_TraceurPerso() {
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$valeurs = json_decode($_GET['valeur'], true);
		$requete = $bdd->prepare('DELETE FROM preferences_traceur WHERE serveur = :serveur AND pseudo = :pseudo');
		$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->execute();
		foreach($valeurs as $mode => $donnees) {
			foreach($donnees as $valeur) {
				$requete = $bdd->prepare('INSERT INTO preferences_traceur (serveur, pseudo, mode, valeur) VALUES(:serveur, :pseudo, :mode, :valeur)');
				$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
				$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
				$requete->bindValue(':mode', $mode, PDO::PARAM_STR);
				$requete->bindValue(':valeur', $valeur, PDO::PARAM_STR);
				$requete->execute();
			}
		}
	}

	/*
		Récupère les paramètres du Ghost du joueur (fusionne ceux de ces différentes alliances)
	*/
	public function get_ParametresGhost() {
		$actif = false;
		$guerre = array();
		$hors_guerre = array();
		foreach($this->utilisateur->alliances_activated as $alliance) {
			$membre = new MembreAlliance($alliance->alliance, $this->utilisateur->pseudo, $this->utilisateur->serveur);
			$alliance = new Alliance($membre);
			$alliance->get_ParametersGhosts();
			if($alliance->donnees_Ghosts['activation_ghost']) {
				$actif = true;
			}
			$ghosts_guerre = explode(',', $alliance->donnees_Ghosts['ghosts_guerre']);
			$ghosts_hors_guerre = explode(',', $alliance->donnees_Ghosts['ghosts_hors_guerre']);
			foreach($ghosts_guerre as $cible) {
				$cible = trim($cible);
				if(!in_array($cible, $guerre)) {
					$guerre[] = $cible;
				}
			}				
			foreach($ghosts_hors_guerre as $cible) {
				$cible = trim($cible);
				if(!in_array($cible, $hors_guerre)) {
					$hors_guerre[] = $cible;
				}
			}
		}
		return array('activation_ghost' => $actif, 'ghosts_guerre' => $guerre, 'ghosts_hors_guerre' => $hors_guerre);
	}

	/*
		Crée un nouveau rapport
	*/
	public function create_RapportJoueur() {
		$rapport = array();
		foreach($_POST as $section => $valeurs) {
			if(is_array($valeurs)) {
				$rapport[htmlentities($section)] = array();
				foreach($valeurs as $valeur) {
					 $rapport[htmlentities($section)][] = htmlentities($valeur);
				}
			}
		}
		if(empty($_POST['nouvelle_date'])) {
			$timestamp = time();
		}
		else {
			$timestamp = Date::date_to_timestamp($_POST['nouvelle_date']);
			if($timestamp == 0) {
				$timestamp = time();
			}
		}
		$date = new Date($timestamp);

		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('INSERT INTO rapports_joueurs (
			pseudo, serveur, date_MAJ,
			actif_ouvrieres, actif_armee, actif_constructions, actif_recherches,
			JSN, SN, NE, JS, S, C, CE, A, AE, SE, Tk, TkE, T, TE, 
			champignonniere, entrepot_nourriture, entrepot_materiaux, couveuse, solarium, laboratoire, salle_analyse, salle_combat, caserne, dome, loge_imperiale, etable_pucerons, etable_cochenilles, constructions_en_cours, constructions_en_cours_2,
			technique_ponte, bouclier_thoracique, armes, architecture, communication_animaux, vitesse_chasse, vitesse_attaque, genetique, acide, poison, labo_en_cours, labo_en_cours_2,
			ouvrieres) 
			VALUES (:pseudo, :serveur, :date_MAJ,
			:actif_ouvrieres, :actif_armee, :actif_constructions, :actif_recherches,
			:JSN, :SN, :NE, :JS, :S, :C, :CE, :A, :AE, :SE, :Tk, :TkE, :T, :TE, 
			:champignonniere, :entrepot_nourriture, :entrepot_materiaux, :couveuse, :solarium, :laboratoire, :salle_analyse, :salle_combat, :caserne, :dome, :loge_imperiale, :etable_pucerons, :etable_cochenilles, :constructions_en_cours, :constructions_en_cours_2,
			:technique_ponte, :bouclier_thoracique, :armes, :architecture, :communication_animaux, :vitesse_chasse, :vitesse_attaque, :genetique, :acide, :poison, :labo_en_cours, :labo_en_cours_2,
			:ouvrieres)');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':date_MAJ', $date->date_SQL(), PDO::PARAM_INT);
		$requete->bindValue(':actif_ouvrieres', empty($rapport['ouvrieres']) ? 0 : 1, PDO::PARAM_INT);
		$requete->bindValue(':actif_armee', empty($rapport['armee']) ? 0 : 1, PDO::PARAM_INT);
		$requete->bindValue(':actif_constructions', empty($rapport['constructions']) ? 0 : 1, PDO::PARAM_INT);
		$requete->bindValue(':actif_recherches', empty($rapport['recherches']) ? 0 : 1, PDO::PARAM_INT);

		$requete->bindValue(':ouvrieres', empty($rapport['ouvrieres']) ? 0 : str_replace(' ', '', $rapport['ouvrieres'][0]), PDO::PARAM_INT);
		for($i=0; $i<14; $i++) {
			$requete->bindValue(':'.Fourmizzz::$unites['TAGs'][$i], empty($rapport['armee']) ? 0 : str_replace(' ', '', $rapport['armee'][$i]));
		}
		for($i=0; $i<15; $i++) {
			$requete->bindValue(':'.Fourmizzz::$constructions_bdd[$i], empty($rapport['constructions']) ? 0 : $rapport['constructions'][$i]);
		}
		for($i=0; $i<12; $i++) {
			$requete->bindValue(':'.Fourmizzz::$recherches_bdd[$i], empty($rapport['recherches']) ? 0 : $rapport['recherches'][$i]);
		}
		$requete->execute();
	}

	/*
		Récupère la liste des membres de toutes les alliances du joueur
		Utile pour afficher les RC anormaux dans la messagerie
	*/
	public function get_MembresAlliances() {
		$membres = array();
		foreach($this->utilisateur->alliances_activated as $alliance) {
			$membre = new MembreAlliance($alliance->alliance, $this->utilisateur->pseudo, $this->utilisateur->serveur);
			$alliance = new Alliance($membre);
			$alliance->build_alliance();
			$membres[$alliance->alliance] = $alliance->get_liste_membres_droits();
		}
		return $membres;
	}

	/*
		Récupère les joueurs et alliances à charger en arrière plan lors du chargement du Multiflood
	*/
	public function get_DonnesTraceur() {
		$priorites = array(
			's1' => array(
				'alliances' => array('10000', 'RdFB', 'FP', 'CDF', '-NBW-', '-VIP-'),
				'joueurs' => array('bartsiochia', 'lbanquier', 'Zhan'),
				'nombre' => 9
			),
			's2' => array(
				'alliances' => array('ADD', 'ADM', '-LoL-', 'LFM', 'OS', 'FKGB'),
				'joueurs' => array('Muad-dib'),
				'nombre' => 8		
			),
			's3' => array(
				'alliances' => array(),
				'joueurs' => array(),
				'nombre' => 0
			),
			's4' => array(
				'alliances' => array(),
				'joueurs' => array(),
				'nombre' => 0
			),
			'test' => array(
				'alliances' => array(),
				'joueurs' => array(),
				'nombre' => 0
			),
			'w1' => array(
				'alliances' => array(),
				'joueurs' => array(),
				'nombre' => 0
			),
		);
		return $priorites[$this->serveur];		
	}

	/*
		Récupère les joueurs et alliances que l'utilisateur a enregistré dans son traceur perso
	*/
	public function get_TraceurPerso() {
		$donnees = array('alliances' => array(), 'joueurs' => array());
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$requete = $bdd->prepare('SELECT mode, valeur FROM preferences_traceur WHERE serveur = :serveur AND pseudo = :pseudo');
		$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $ligne) {
			$donnees[$ligne['mode']][] = $ligne['valeur'];
		}
		return $donnees;

	}


	/*
		Charge les fichiers privés accessibles pour l'utilisateur
	*/
	public function get_Fichiers() {
		$fichiers = array();
		if($this->utilisateur->droitsZzzelp > 0) {
			$fichiers[] = array('dossier' => 'Javascript', 'nom' => 'Traceur_prive');
			$fichiers[] = array('dossier' => 'ZzzelpScript', 'nom' => 'Prive_b87bd6rcf565dv4v4');
			$fichiers[] = array('dossier' => 'Javascript', 'nom' => 'Guerre');
		}
		if($this->utilisateur->droitsZzzelp > 1) {
			$fichiers[] = array('dossier' => 'ZzzelpScript', 'nom' => 'GroupePrive_40ac4b64439c2649');																	   
		}
		if($this->utilisateur->droitsZzzelp > 2) {
			$fichiers[] = array('dossier' => 'ZzzelpScript', 'nom' => 'Admin_4a939ff004d85c3f');
		}
		$contenu = '';
		foreach($fichiers as $fichier) {
			$fichier = $fichier['dossier'].'/'.$fichier['nom'].'.js';
			$contenu .= file_get_contents($fichier);
		}
		return $contenu;
	}

	/*
		Affichage des résultats
	*/

	public function show_results($valeurs) {
		$post = array(
					'etat' => 2,
					'page' => Zzzelp::$page,
					'resultats' => $valeurs
				);
		if(!empty($this->new_token)) {
			$post['token'] = $this->new_token;
		}
		echo json_encode($post);
	}



	/*
		Génère les fichiers JavaScripts
	*/
	public static function generate_JavaScriptPublic() {
		header('Content-Type: application/javascript');
		
		$fichiers = array(
			array( 'nom' => 'base_zzzelp', 'dossier' => 'Javascript' ),
			array( 'nom' => 'zzzelpfloods', 'dossier' => 'Javascript'),
			array( 'nom' => 'Analyseurs', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'CadreZzzelp', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'Messagerie', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'PageArmee', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'AideArmee', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'Synchronisation', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'Rangs', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'Smileys', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'Multiflood', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'DescriptionAlliance', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'Chasses', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'Colonies', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'Traceur', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'PageEnnemie', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'Convois', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'PagesClassement', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'Divers', 'dossier' => 'ZzzelpScript' ),
			array( 'nom' => 'ZzzelpScript', 'dossier' => 'ZzzelpScript')
							);

			$filemtimes = array();
			foreach($fichiers as $fichier) {
				$fichier = $fichier['dossier'].'/'.$fichier['nom'].'.js';
				include_once($fichier);
				$filemtimes[]= filemtime($fichier);
			}
	}


}
