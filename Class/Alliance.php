<?php

class Alliance {
	
	public $chef;
	public $alliance;
	public $serveur;
	public $membres = array();

	/* 
		Onglet "Gestion des droits"
	*/

	public $rangs = array('Nouveau', 'Membre', 'Gestionnaire', 'Chef');
	public $droits_rangs = array(
						'Nouveau' => array(), 
						'Membre' => array(), 
						'Gestionnaire' => array(), 
						'Chef' => array()
								);
	public $droits = array(	'acces_MF' => 'Accès au Multiflood',
							'floods' => 'Affichage des floods en cours',
							'chasses' => 'Affichage des chasses en cours',
							'rangs' => 'Affichage de la chaine',
							'archives' => 'Accès aux archives',
							'convois' => 'Accès au lancement des convois',
							'gestion_convois' => 'Gestion des convois',
							'gestion_MF' => 'Gestion du Multiflood',
							'gestion_rangs' => 'Gestion des rangs',
							'gestion_membres' => 'Administration de l\'alliance'
						);
	public $droits_alliers = array('partage_floods' => 'Partage des floods',
								   'partage_rangs' => 'Affichage de la chaîne',
								   'gestion_MF' => 'Gestion du Multiflood',
								   'gestion_rangs' => 'Ajout de rangs'
							);
	public $alliers = array();
	public $droits_partageable = array('partage_floods', 'gestion_MF', 'partage_rangs', 'gestion_rangs');
	public $outils = array(
							'activation_MF' => array('nom' => 'Gestionnaire de floods', 'actif' => false), 
							'activation_convois' => array('nom' => 'Envoi des convois', 'actif' => false), 
							'activation_traceur' => array('nom' => 'Accès au traceur', 'actif' => false)
						);


	/* 
		Onglet "Tableau des membres"
	*/


	public $tableaux_membres = array(
				array('ouvrieres, size_nou', 'size_mat', 'tdp')
									);
	public $joueurs_non_actives;


	/* 
		Onglet "Gestion des convois"
	*/

	public $parametres_convois;
	public $convois = array();
	public $convois_membre = array();
	public $multis = array();
	public $multis_str = array();
	public $compteplus;
	public $convois_recents;

	/*
		Onglet "Gestion du MF"
	*/
	public $hotes;
	public $donnees_MF;
	public $donnees_Ghosts;


	public function __construct($chef) {
		$this->chef = $chef;
		$this->alliance = $chef->alliance;
		$this->serveur = $chef->serveur;
		$this->create_Alliance();
	}

	public function create_Alliance() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$resultat = '';
		$requete =  $bdd->prepare('SELECT COUNT(*) FROM alliances WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] == 0) {
			$requete = $bdd->prepare('INSERT INTO alliances (alliance, serveur) VALUES(:alliance, :serveur)');
			$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->execute();
		}
		$bdd = null;
	}

	/*
		Récupère les données des joueurs de l'alliance :
			- Niveaux Fourmizzz
			- Coordonnées
	*/
	public function build_alliance() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT pseudo FROM Droits_alliance WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);		
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		$t = microtime(true);
		foreach ($resultats as $joueur) {
			$membre = new Utilisateur_Fzzz($joueur['pseudo'], $this->serveur, null);
			$membre->check_MemberZone();
			$membre->alliance_active = new MembreAlliance($this->alliance, $joueur['pseudo'], $this->serveur);
			$this->membres[$joueur['pseudo']] = $membre;
		}
		$this->get_Coordonnees();
		$this->getInfosZzzelpJoueurs();
		//echo microtime(true)-$t;
		$bdd = null;
		uksort($this->membres, 'strcasecmp');
	}

	/*
		Récupère les coordonnées de tous les joueurs de l'alliance.
	*/
	public function get_Coordonnees() {
		$pseudos = '';
		for($i=0; $i<count($this->membres); $i++) {
			$pseudos .= (($pseudos == '') ? '' : ' OR ').' Pseudo = :pseudo_'.$i;
		}
		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		$requete = $bdd->prepare('SELECT Pseudo, x, y FROM BDDJoueurs WHERE '.$pseudos);
		$i=0;
		foreach($this->membres as $pseudo => $donnees) {
			$requete->bindValue(':pseudo_'.$i, $pseudo, PDO::PARAM_STR);
			$i++;
		}
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {
			$this->membres[$resultat['Pseudo']]->coordonnees = $resultat;
		}
		$bdd = null;
	}

	/*
		Récupère les données Zzzelp de tous les joueurs de l'alliance
	*/
	public function getInfosZzzelpJoueurs() {
		$pseudos = '';
		for($i=0; $i<count($this->membres); $i++) {
			$pseudos .= (($pseudos == '') ? '' : ' OR ').' pseudo = :pseudo_'.$i;
		}
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM donnees_fourmizzz WHERE serveur = :serveur AND ('.$pseudos.')');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$i=0;
		foreach($this->membres as $pseudo => $donnees) {
			$requete->bindValue(':pseudo_'.$i, $pseudo, PDO::PARAM_STR);
			$i++;
		}
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_OBJ);
		foreach($resultats as $resultat) {
			if(isset($this->membres[$resultat->pseudo])) {
				$this->membres[$resultat->pseudo]->niveaux = $resultat;
			}
			else {
				$joueur = strtoupper($resultat->pseudo);
				foreach($this->membres as $pseudo => $valeurs) {
					if(strtoupper($pseudo) == $joueur) {
						$this->membres[$pseudo]->niveaux = $resultat;
					}
				}
			}
		}
		$bdd = null;
	}


	/*
		Récupère la liste des membres d'une alliance (nécessite d'avoir executé build_alliance)
	*/
	public function get_liste_membres() {
		$joueurs = array();
		foreach ($this->membres as $joueur) {
			$joueurs[] = $joueur->pseudo;
		}
		return $joueurs;
	}

	/*
		Récupère la liste des membres d'une alliance ainsi que leurs droits
	*/
	public function get_liste_membres_droits() {
		$joueurs = array();
		foreach ($this->membres as $joueur => $donnees) {
			$joueurs[] = array('pseudo' => $joueur, 'droits' => $donnees->alliance_active->droit);
		}
		return $joueurs;		
	}


	/* 
		Onglet "Gestion des droits"
	*/

	public function get_Parameters() {
		$this->get_OutilsStatus();
		$this->get_Rights();
		$this->get_RightsAllies();
	}

	/*
		Récupère l'état de chaque outil (activé ou non)
	*/
	private function get_OutilsStatus() {

		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT activation_MF, activation_convois, activation_traceur FROM alliances WHERE alliance = :alliance AND serveur= :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);		
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		foreach($resultat as $outil => $valeur) {
			$this->outils[$outil]['actif'] = ($valeur == "1");
		}
		$bdd = null;
	}

	/*
		Récupère les droits nécessaires pour accéder à chacun des outils
	*/
	private function get_Rights() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT droits_Nouveau as Nouveau, droits_Membre as Membre, droits_Gestionnaire as Gestionnaire, droits_Chef as Chef 
								  FROM alliances WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		foreach($resultat as $rang => $droits) {
			$this->droits_rangs[$rang] = json_decode($droits,true);
		}
		$bdd = null;
	}

	/*
		Récupère les droits nécessaires pour qu'un allié accède à les outils de cette alliance
	*/
	private function get_RightsAllies() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM Partage_droits_alliances WHERE hote = :alliance AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $allier) {
			$droits = array();
			foreach($this->rangs as $rang) {
				if($rang != 'Nouveau') {
					$acces = array();
					foreach($this->droits_partageable as $droit) {
						$acces[$droit] = $allier[$droit.'_'.$rang];
					}
					$droits[$rang] = $acces;
				}
			}
			$this->alliers[$allier['receveuse']] = $droits;	 
		}
		$bdd = null;
	}


	public function update_DroitsAlliance() {
		$droits = array();
		for($i=0; $i<4; $i++) {
			$droitsRang = array();
			foreach($this->droits as $ID => $nom) {
				$droitsRang[$ID] = (isset($_POST[$this->rangs[$i].'_'.$ID]) OR $i==3) ? 1 : 0;
			}
			$droits[] = $droitsRang;
		}

		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('UPDATE alliances SET droits_Nouveau = :droits_Nouveau, droits_Membre = :droits_Membre, droits_Gestionnaire = :droits_Gestionnaire, droits_Chef = :droits_Chef, activation_MF = :activation_MF, activation_convois = :activation_convois, activation_traceur = :activation_traceur WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':droits_Nouveau', json_encode($droits[0]), PDO::PARAM_STR);
		$requete->bindValue(':droits_Membre', json_encode($droits[1]), PDO::PARAM_STR);
		$requete->bindValue(':droits_Gestionnaire', json_encode($droits[2]), PDO::PARAM_STR);
		$requete->bindValue(':droits_Chef', json_encode($droits[3]), PDO::PARAM_STR);
		$requete->bindValue(':activation_MF', isset($_POST['activation_MF']) ? 1 : 0, PDO::PARAM_INT);
		$requete->bindValue(':activation_convois', isset($_POST['activation_convois']) ? 1 : 0, PDO::PARAM_INT);
		$requete->bindValue(':activation_traceur', isset($_POST['activation_traceur']) ? 1 : 0, PDO::PARAM_INT);
		$requete->execute();

		$alliances = $_POST['alliances'];
		$requete = $bdd->prepare('DELETE FROM Partage_droits_alliances WHERE hote = :hote AND serveur =:serveur');
		$requete->bindValue(':hote', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);			
		$requete->execute();
		if (count($alliances) > 0) {
			foreach($alliances as $alliance) {
				$alliance = htmlentities($alliance);
				$requete = $bdd->prepare('INSERT INTO Partage_droits_alliances (hote, receveuse, serveur, partage_floods_Membre, gestion_MF_Membre, partage_rangs_Membre, gestion_rangs_Membre, partage_floods_Gestionnaire, gestion_MF_Gestionnaire, partage_rangs_Gestionnaire, gestion_rangs_Gestionnaire, partage_floods_Chef, gestion_MF_Chef, partage_rangs_Chef, gestion_rangs_Chef) VALUES (:hote, :receveuse, :serveur, :partage_floods_Membre, :gestion_MF_Membre, :partage_rangs_Membre, :gestion_rangs_Membre, :partage_floods_Gestionnaire, :gestion_MF_Gestionnaire, :partage_rangs_Gestionnaire, :gestion_rangs_Gestionnaire, :partage_floods_Chef, :gestion_MF_Chef, :partage_rangs_Chef, :gestion_rangs_Chef)');
				$requete->bindValue(':hote', $this->alliance, PDO::PARAM_STR);
				$requete->bindValue(':receveuse', $alliance, PDO::PARAM_STR);
				$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);		
				foreach($this->rangs as $rang) {
					if($rang != 'Nouveau') {
						foreach($this->droits_partageable as $droit) {
							$requete->bindValue(':'.$droit.'_'.$rang,  isset($_POST[$droit.'_'.$rang.'_'.$alliance]) ? 1 : 0, PDO::PARAM_INT);
						}
					}
				}
				$requete->execute();
			}
		}
	}




	/* 
		Onglet "Tableau des membres"
	*/

	public function complete_InfosZzzelp() {
		foreach($this->membres as $pseudo => $valeurs) {
			$this->membres[$pseudo]->get_tdp();
			$this->membres[$pseudo]->get_sizeentrepots();
			$this->membres[$pseudo]->apply_encours();
			$this->membres[$pseudo]->membrealliance = new MembreAlliance($this->alliance, $pseudo, $this->serveur);
			$this->membres[$pseudo]->zzzelpscript = new ZzzelpScript(null, null, null, $this->membres[$pseudo]);
			$this->membres[$pseudo]->zzzelpscript->get_ParametresZzzelpScript();
		}
	}

	/*
		Récupère la liste des joueurs étant dans cette alliance sur Fourmizzz et en attente de validation de pseudo sur Zzzelp
	*/
	public function get_ActivationsMembres() {
		$this->joueurs_non_actives = array();
		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		$requete = $bdd->prepare('SELECT Pseudo FROM BDDJoueurs WHERE alliance = :alliance');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->execute();
		$joueurs = $requete->fetchAll(PDO::FETCH_ASSOC);
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		foreach($joueurs as $joueur) {
			$requete = $bdd->prepare('SELECT COUNT(*) FROM membres WHERE pseudo_'.$this->serveur.' = :pseudo AND verif_pseudo_'.$this->serveur.' = 0');
			$requete->bindValue(':pseudo', $joueur['Pseudo']);
			$requete->execute();
			if($requete->fetch(PDO::FETCH_NUM)[0] > 0) {
				$this->joueurs_non_actives[] = $joueur['Pseudo'];
			}
		}
		$bdd = null;
	}

	/*
		Valide un compte Fourmizzz ou bien supprime la demande de validation
	*/
	public function valider_CompteFzzz($pseudo, $valider) {
		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		$requete = $bdd->prepare('SELECT alliance FROM BDDJoueurs WHERE Pseudo = :pseudo');
		$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		if(!empty($resultat) AND strtolower($resultat['alliance']) == strtolower($this->alliance)) {
			if($valider) {
				$bdd = Zzzelp::Connexion_BDD('Donnees_site');
				$requete = $bdd->prepare('UPDATE membres SET verif_pseudo_'.$this->serveur.' = 1 WHERE pseudo_'.$this->serveur.' = :pseudo_serveur LIMIT 1');
				$requete->bindValue(':pseudo_serveur', $pseudo, PDO::PARAM_STR);
				$requete->execute();

				$bdd = Zzzelp::Connexion_BDD('LogsZzzelp');
				$requete = $bdd->prepare('INSERT INTO validations_pseudo (valide, serveur, validateur, methode, date_validation) VALUES (:pseudo, :serveur, :validateur, :methode, :date_validation)');
				$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
				$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
				$requete->bindValue(':validateur', $this->chef->pseudo, PDO::PARAM_STR);
				$requete->bindValue(':methode', 'chef', PDO::PARAM_STR);
				$requete->bindValue(':date_validation', time(), PDO::PARAM_INT);
				$requete->execute();
			}
			else {
				$bdd = Zzzelp::Connexion_BDD('Donnees_site');
				$requete = $bdd->prepare('UPDATE membres SET pseudo_'.$this->serveur.' = "" WHERE pseudo_'.$this->serveur.' = :pseudo_serveur LIMIT 1');
				$requete->bindValue(':pseudo_serveur', $pseudo, PDO::PARAM_STR);
				$requete->execute();				
			}
			header('Location:membres?serveur='.$this->serveur.'&alliance='.$this->alliance);
		}
		$bdd = null;
	}	

	/*
		Modifie les droits de l'alliance (internes et externes)
	*/
	public function update_Droit($action, $pseudo) {
		if(in_array($action, array('modification_droits', 'virer'))) {
			$bdd = Zzzelp::Connexion_BDD('Donnees_site');
			if($action == 'modification_droits') {
				$requete = $bdd->prepare('UPDATE Droits_alliance SET droits = :droits WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
				$requete->bindValue(':droits', htmlentities($_GET['droits']), PDO::PARAM_INT);
			}
			elseif($action == 'virer') {
				$requete = $bdd->prepare('DELETE FROM Droits_alliance WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
			}
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
			$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
			$requete->execute();
			$bdd = null;
			header('Location:membres?serveur='.$this->serveur.'&alliance='.$this->alliance);
		}
	}



	/* 
		Onglet "Gestion des convois"
	*/

	public function get_Convois() {
		$this->get_ParametersConvois();
		$this->get_Multis();
		$this->get_ComptePlus();
		$this->get_ConvoisAlliance();
		$this->get_RecentConvois();
	}

	/*
		Récupère les paramètres des convois de l'alliance
	*/
	public function get_ParametersConvois() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT methode_convois, demande_max, formule_repartition, majoration_ouvrieres, duree_repartition, formule_tdp, bonus_grenier_MRG, algorithme_optimisation, modularite_convois, priorites_manuelles, activer_relais_convois, relais_convois FROM alliances WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->execute();
		$this->parametres_convois = $requete->fetch(PDO::FETCH_ASSOC);
		$this->parametres_convois['priorites_manuelles'] = $this->analyse_PrioManuelle($this->parametres_convois['priorites_manuelles']);
		$this->parametres_convois['relais_convois'] = $this->analyse_RelaisConvois($this->parametres_convois['relais_convois']);
		$bdd = null;
	}

	/*
		Met en forme la liste des priorités manuelles des convois
	*/
	private function analyse_PrioManuelle($prios) {
		if(strlen($prios) > 5) {
			return unserialize($prios);
		}
		else {
			return array('' => '');
		}
	}

	/*
		Met en forme la liste des relais pour les convois
	*/
	private function analyse_RelaisConvois($relais) {
		if(strlen($relais) > 5) {
			return unserialize($relais);
		}
		else {
			return array('' => 14);
		}
	}

	/*
		Récupère les convois effectués depus une semaine par les membres de l'alliance
	*/
	private function get_RecentConvois() {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT lanceur, receveur, valeur, ajout FROM Lancement_convois_mat 
								  WHERE alliance = :alliance AND serveur = :serveur AND ajout > :ajout ORDER BY ajout DESC');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);	
		$requete->bindValue(':ajout', (time() - 604800), PDO::PARAM_INT);
		$requete->execute();
		$this->convois_recents = $requete->fetchAll(PDO::FETCH_ASSOC);
		$bdd = null;
	}

	/*
		Récupère les convois restant à réaliser dans l'alliance
	*/
	private function get_ConvoisAlliance() {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT * FROM Convois WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $convoi) {
			$this->get_Convoi($convoi);		
		}
		for($i=0; $i<count($this->convois); $i++) {
			$distance = Fourmizzz::Distance($this->membres[$this->convois[$i]['lanceur']]->coordonnees, $this->membres[$this->convois[$i]['receveur']]->coordonnees);
			$this->convois[$i]['temps_trajet'] = Fourmizzz::Temps_trajet($distance, $this->membres[$this->convois[$i]['lanceur']]->niveaux->vitesse_attaque);
			$this->convois[$i]['couleur'] = Text::codecouleur($this->convois[$i]['temps_trajet']);
		}
		$this->convois = Tableau::key_sort($this->convois, 'lanceur');
		asort($this->convois_membre);
		$bdd = null;
	}

	/*
		Met en forme un convois restant à réaliser et stocké en BDD
	*/
	private function get_Convoi($convoi) {
		$this->convois[] = array('lanceur' => $convoi['lanceur'], 'receveur' => $convoi['receveur'], 'valeur' =>$convoi['valeur']);
		if (!isset($this->convois_membre[$convoi['lanceur']])) {
			$this->convois_membre[$convoi['lanceur']] = $convoi['valeur'];
		}
		else {
			$this->convois_membre[$convoi['lanceur']] += $convoi['valeur'];
		}
		if (!isset($this->convois_membre[$convoi['receveur']])) {
			$this->convois_membre[$convoi['receveur']] = - $convoi['valeur'];
		}
		else {
			$this->convois_membre[$convoi['receveur']] -= $convoi['valeur'];
		}			
	}

	/*
		Récupère la liste les multi-comptes de l'alliance
	*/
	protected function get_Multis() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM multi WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $multi) {
			$this->multis[] = array($multi['joueur_1'], $multi['joueur_2']);
			$this->multis_str[] = $multi['joueur_1'].'/'.$multi['joueur_2'];
			$this->multis_str[] = $multi['joueur_2'].'/'.$multi['joueur_1'];		
		}
		$bdd = null;
	}

	/*
		Récupère le Compte + échangé par chaque joueur (utilisé à la SMURF)
	*/
	private function get_ComptePlus() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT pseudo, valeur FROM compte_plus WHERE alliance = :alliance AND serveur = :serveur ORDER BY pseudo ASC');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->execute();
		$this->compteplus = $requete->fetchAll(PDO::FETCH_ASSOC);	 
		$bdd = null;
	}

	/*
		Met à jour les paramètres de gestion des convois
	*/
	public function update_GestionConvois() {
		$this->save_ParametresConvois();
		$this->save_Multis();
	}

	/*
		Met à jour les paramètres de création des convois
	*/
	public function save_ParametresConvois() {
		$lanceurs = $_POST['lanceurs'];
		$receveurs = $_POST['receveurs'];
		$pseudo_relais = $_POST['pseudo_relais'];
		$nombre_relais = $_POST['nombre_relais'];
		$priorites = array();
		$relais = array();
		for($i=0; $i<count($lanceurs); $i++) {
			if($lanceurs[$i] != '' AND $receveurs[$i] != '') {
				$priorites[$lanceurs[$i]] = $receveurs[$i];
			}
		}
		for($i=0; $i<count($pseudo_relais); $i++) {
			if($pseudo_relais[$i] != '' AND $nombre_relais[$i] != '') {
				$relais[$pseudo_relais[$i]] = (int)$nombre_relais[$i];
			}
		}
		$priorites_manuelles = serialize($priorites);
		$relais_convois = serialize($relais);
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('UPDATE alliances SET methode_convois = :methode_convois, demande_max = :demande_max, 
								  formule_repartition = :formule_repartition, algorithme_optimisation = :algorithme_optimisation, 
								  majoration_ouvrieres = :majoration_ouvrieres, duree_repartition = :duree_repartition, formule_tdp = :formule_tdp, 
								  bonus_grenier_MRG = :bonus_grenier_MRG, priorites_manuelles = :priorites_manuelles, 
								  activer_relais_convois = :activer_relais_convois , relais_convois = :relais_convois 
						   		  WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);	
		$requete->bindValue(':methode_convois', htmlentities($_POST['methode_convois']), PDO::PARAM_STR);	
		$requete->bindValue(':demande_max', str_replace(' ', '', htmlentities($_POST['demande_max'])), PDO::PARAM_INT);	
		$requete->bindValue(':formule_repartition', htmlentities($_POST['formule_repartition']), PDO::PARAM_INT);	
		$requete->bindValue(':algorithme_optimisation', htmlentities($_POST['algorithme_optimisation']), PDO::PARAM_INT);	
		$requete->bindValue(':majoration_ouvrieres', ($_POST['majoration_ouvrieres'] ? 1 : 0), PDO::PARAM_INT);	
		$requete->bindValue(':duree_repartition', htmlentities($_POST['duree_repartition']), PDO::PARAM_STR);	
		$requete->bindValue(':formule_tdp', htmlentities($_POST['formule_tdp']), PDO::PARAM_STR);	
		$requete->bindValue(':bonus_grenier_MRG', (isset($_POST['bonus_grenier_MRG']) ? str_replace(' ','',htmlentities($_POST['bonus_grenier_MRG'])) : 0), PDO::PARAM_INT);	
		$requete->bindValue(':priorites_manuelles', $priorites_manuelles, PDO::PARAM_STR);
		$requete->bindValue(':activer_relais_convois', ($_POST['activer_relais_convois'] ? 1 : 0), PDO::PARAM_STR);
		$requete->bindValue(':relais_convois', $relais_convois, PDO::PARAM_STR);
		$requete->execute();
		$bdd = null;
	}

	/*
		Met à jour les multi-comptes de l'alliance afin qu'ils ne se convoient pas
	*/
	public function save_Multis() {
		$J1 = $_POST['multi_1'];
		$J2 = $_POST['multi_2'];
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('DELETE FROM multi WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->execute();
		for($i=0;$i<count($J1);$i++) {
			if($J1[$i] != '' AND $J2[$i] != '') {
				$requete = $bdd->prepare('INSERT INTO multi (serveur, alliance, joueur_1, joueur_2) VALUES(:serveur, :alliance, :joueur_1, :joueur_2)');
				$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
				$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
				$requete->bindValue(':joueur_1',htmlentities($J1[$i]), PDO::PARAM_STR);
				$requete->bindValue(':joueur_2', htmlentities($J2[$i]), PDO::PARAM_STR);
				$requete->execute();
			}
		}
		$bdd = null;
	}


	/*
		Met à jour  un convois
	*/
	public function update_Convois() {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('UPDATE Convois SET valeur = :valeur WHERE serveur = :serveur AND alliance = :alliance AND lanceur = :lanceur AND receveur = :receveur AND mode = :mode');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':lanceur', htmlentities($_GET['convoyeur']), PDO::PARAM_STR);
		$requete->bindValue(':receveur', htmlentities($_GET['convoye']), PDO::PARAM_STR);
		$requete->bindValue(':valeur', (int)htmlentities($_GET['valeur']), PDO::PARAM_INT);
		$requete->bindValue(':mode','mat', PDO::PARAM_STR);
		$requete->execute();
		$bdd = null;
	}

	/*
		Supprime un convois
	*/
	public function delete_Convois() {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('DELETE FROM Convois WHERE serveur = :serveur AND alliance = :alliance AND lanceur = :lanceur AND receveur = :receveur AND mode = :mode');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':lanceur', htmlentities($_GET['convoyeur']), PDO::PARAM_STR);
		$requete->bindValue(':receveur', htmlentities($_GET['convoye']), PDO::PARAM_STR);
		$requete->bindValue(':mode','mat', PDO::PARAM_STR);
		$requete->execute();
		$bdd = null;
	}

	/*
		Ajoute un convois
	*/
	public function add_Convois() {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('INSERT INTO Convois (serveur, alliance, lanceur, receveur, valeur, mode) VALUES(:serveur, :alliance, :lanceur, :receveur, :valeur, :mode)');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':lanceur', htmlentities($_GET['convoyeur']), PDO::PARAM_STR);
		$requete->bindValue(':receveur', htmlentities($_GET['convoye']), PDO::PARAM_STR);
		$requete->bindValue(':valeur', (int)htmlentities($_GET['valeur']), PDO::PARAM_INT);
		$requete->bindValue(':mode','mat', PDO::PARAM_STR);
		$requete->execute();
		$bdd = null;
	}

	/*
		Modifie une demande de convois
	*/
	public function update_DemandeConvois() {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT valeur, restant FROM DemandesConvois WHERE alliance = :alliance AND serveur = :serveur AND ID = :ID');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':ID', htmlentities($_GET['ID']), PDO::PARAM_INT);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		if(!empty($resultat)) {
			$requete = $bdd->prepare('UPDATE DemandesConvois SET restant = :restant, commentaire = :commentaire, date_besoin = :date_besoin WHERE serveur = :serveur AND alliance = :alliance AND ID = :ID');
			$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':ID', htmlentities($_GET['ID']), PDO::PARAM_INT);
			$requete->bindValue(':restant', (int)htmlentities($_GET['valeur']), PDO::PARAM_INT);
			$requete->bindValue(':commentaire', htmlentities($_GET['raison']), PDO::PARAM_STR);
			$requete->bindValue(':date_besoin', htmlentities($_GET['date']), PDO::PARAM_STR);
			$requete->execute();
		}
		$bdd = null;
		header('Location:convois/demande?ressource=materiaux&serveur='.$this->serveur.'&alliance='.$this->alliance);
	}




	/*
		Onglet "Gestion du MF"
	*/

	/*
		Récupère les paramètres du MF
	*/
	public function get_ParametersMF() {
		$this->hotes = $this->chef->get_DroitsGestionMF();
		$this->donnees_MF = array();
		$alliances = '';
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		for($i=0; $i<count($this->hotes); $i++) {
			$alliances .= (($i>0) ? ' OR ' : '').'hote = :hote_'.$i;
		}
		if(count($this->hotes) > 0) {
			$requete = $bdd->prepare('SELECT * FROM ennemis WHERE createur = :alliance AND serveur = :serveur AND ('.$alliances.')');
			$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			for($i=0; $i<count($this->hotes); $i++) {
				$requete->bindValue(':hote_'.$i, $this->alliance, PDO::PARAM_STR);
			}
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $valeurs) {
				if(!array_key_exists($valeurs['ennemi'], $this->donnees_MF)) {
					$this->donnees_MF[$valeurs['ennemi']] = array('type' => $valeurs['type'], 'hotes' => array($valeurs['hote']));
				}
				else {
					$this->donnees_MF[$valeurs['ennemi']]['hotes'][] = $valeurs['hote'];
				}
			}
		}
		$bdd = null;
		$this->get_ModeMF();
	}

	/*
		Récupère les paramètres de l'outil de ghost :
			- Activé ou non
			- White list des alliances en guerre
			- Black list des alliances hors guerre
	*/
	public function get_ParametersGhosts() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT activation_ghost, ghosts_guerre, ghosts_hors_guerre FROM alliances WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->execute();
		$this->donnees_Ghosts = $requete->fetch(PDO::FETCH_ASSOC);
		$bdd = null;
	}

	/*
		Récupère le mode d'utilisation du Multiflood
	*/
	public function get_ModeMF() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT MF_guerre FROM alliances WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);		
		$requete->execute();
		$this->modeMF = $requete->fetch(PDO::FETCH_NUM)[0];
		$bdd = null;
	}

	public function save_ModeMF() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('UPDATE alliances SET  MF_guerre = :MF_guerre WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':MF_guerre', !empty($_POST['MF_guerre']) ? 1 : 0, PDO::PARAM_INT);	
		$requete->execute();
		$bdd = null;
	}

	/*
		Met à jour les paramètres du Multiflood :
			- Joueurs à charger automatiquement
			- Alliances à charger automatiquement
	*/
	public function save_ParametresMF() {
		$this->save_ModeMF();
		$this->hotes = $this->chef->get_DroitsGestionMF();
		$TAGs = $_POST['TAG'];
		$Type_ennemis = $_POST['Type_ennemis'];
		$alliances = '';
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		for($i=0; $i<count($this->hotes); $i++) {
			$alliances .= (($i>0) ? ' OR ' : '').'hote = :hote_'.$i;
		}
		if(count($this->hotes) > 0) {
			$requete = $bdd->prepare('DELETE FROM ennemis WHERE createur = :alliance AND serveur = :serveur AND ('.$alliances.')');
			$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			for($i=0; $i<count($this->hotes); $i++) {
				$requete->bindValue(':hote_'.$i, $this->alliance, PDO::PARAM_STR);
			}
			$requete->execute();
			for($i=0;$i<count($TAGs);$i++) {
				if($TAGs[$i] != '' AND isset($_POST['MF_'.$i])) {
					foreach($_POST['MF_'.$i] as $hote) {
						$requete = $bdd->prepare('INSERT INTO ennemis (createur, hote, ennemi, serveur, type) VALUES(:alliance, :hote, :ennemi, :serveur, :type)');
						$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
						$requete->bindValue(':hote', htmlentities($hote), PDO::PARAM_STR);
						$requete->bindValue(':ennemi', htmlentities($TAGs[$i]), PDO::PARAM_STR);
						$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
						$requete->bindValue(':type', $Type_ennemis[$i], PDO::PARAM_STR);
						$requete->execute();
					}
				}
			}
		}	
		$requete = $bdd->prepare('UPDATE alliances SET activation_ghost = :activation_ghost, ghosts_guerre = :ghosts_guerre, ghosts_hors_guerre = :ghosts_hors_guerre WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);	
		$requete->bindValue(':activation_ghost', (isset($_POST['activation_ghost']) ? 1 : 0), PDO::PARAM_INT);	
		$requete->bindValue(':ghosts_guerre', htmlentities($_POST['ghosts_guerre']), PDO::PARAM_STR);	
		$requete->bindValue(':ghosts_hors_guerre', htmlentities($_POST['ghosts_hors_guerre']), PDO::PARAM_STR);		
		$requete->execute();
		$bdd = null;
	}
	


	/*
		Onglet : Rapport des membres
	*/

	/*
		Récupère le dernier rapport pour chaque membre de l'alliance
	*/
	public function get_RapportsJoueurs() {
		foreach($this->membres as $pseudo => $valeurs) {
			$this->membres[$pseudo]->get_RapportCompte();
		}
	}

	/*
		Met à jour un rapport
	*/
	public function update_RapportJoueur($ID) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT pseudo, serveur FROM rapports_joueurs WHERE ID = :ID');
		$requete->bindValue(':ID', $ID, PDO::PARAM_INT);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		if(!empty($resultat) AND $resultat['serveur'] ==  $this->serveur AND isset($this->membres[$resultat['pseudo']])) {
			$this->membres[$resultat['pseudo']]->update_Rapport($ID);
		}
		$bdd = null;
	}

	/*
		Supprimer un rapport
	*/
	public function delete_RapportJoueur($ID) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT pseudo, serveur FROM rapports_joueurs WHERE ID = :ID');
		$requete->bindValue(':ID', $ID, PDO::PARAM_INT);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		if(!empty($resultat) AND $resultat['serveur'] ==  $this->serveur AND isset($this->membres[$resultat['pseudo']])) {	
			$this->membres[$resultat['pseudo']]->delete_Rapport($ID);
		}
		$bdd = null;
	}

	/*
		Créer un rapport
	*/
	public function create_RapportJoueur() {
		if(isset($this->membres[$_POST['nouveau_rapport']])) {
			$script = new ZzzelpScript(null, null, null, $this->membres[$_POST['nouveau_rapport']]);
			$script->create_RapportJoueur();
		}
	}

	/*
		Récupère toutes les armées des rapports
	*/
	public function get_ArmeesRapports() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$joueurs = array();
		foreach($this->membres as $joueur => $compte) {
			$requete = $bdd->prepare('SELECT * FROM rapports_joueurs WHERE pseudo = :pseudo AND serveur = :serveur ORDER BY date_MAJ DESC LIMIT 1');
			$requete->bindValue(':pseudo', $joueur, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->execute();
			$armee = $requete->fetch(PDO::FETCH_ASSOC);
			if(!empty($armee)) {	
				$joueurs[$armee['pseudo']] = array(
					'armee' => array((int)$armee['JSN'], (int)$armee['SN'], (int)$armee['NE'], (int)$armee['JS'], (int)$armee['S'], (int)$armee['C'], (int)$armee['CE'], 
									 (int)$armee['A'], (int)$armee['AE'], (int)$armee['SE'], (int)$armee['Tk'], (int)$armee['TkE'], (int)$armee['T'], (int)$armee['TE']),
					'date_MAJ' => strtotime($armee['date_MAJ'])
				);
			}			
		}
		$bdd = null;
		return $joueurs;
	}

	/*
		Prépare le tableau à transformer en fichier CSV pour télécharger tous les rapports
	*/
	public function prepare_CSVRapports() {
		$rapports = array(
			array_merge(
				array('ID', 'Pseudo', 'Date'), 
				Fourmizzz::$unites['noms_pluriels'], 
				Fourmizzz::$constructions, 
				array('Construction en cours', 'Construction en cours (C+)'),
				Fourmizzz::$recherches,
				array('Recherche en cours', 'Recherche en cours (C+)'),
				array('Ouvrières')
			)
		);
		foreach($this->membres as $pseudo => $valeurs) { 
			if(!empty($valeurs->rapport)) {
				$ligne = array();
				foreach($valeurs->rapport as $valeur) {
					if(is_array($valeur)) {
						foreach($valeur as $cle => $data) {
							$ligne[] = $data;
 						} 
					}
					else {
						$ligne[] = $valeur;
					}
				}
				$rapports[] = $ligne;
			}
		}
		return $this->create_FileExport(array('donnees' => $rapports), 'rapports');
	}





	/*
		Onglet exports
	*/

	/*
		Fonction principale pour récupérer les données à exporter
	*/
	public function load_Exports($mode, $joueurs, $debut, $fin) {
		$joueurs = $this->check_ListeJoueurs($joueurs);
		if($mode == 'TDC_moyens') {
			$this->get_ParametersConvois();
			$valeurs = array(
					'mode' => 'TDC_moyens',
					'entetes' => array('Pseudo', 'TDC'),
					'donnees' => $this->get_TDCMoyensExports($joueurs, $debut, $fin, $this->parametres_convois['majoration_ouvrieres'], false)
				);
		}

		elseif($mode == 'floods') {
			$valeurs = array(
					'mode' => 'floods', 
					'entetes' => array('Attaquant', 'Cible', 'Valeur', 'Arrivée'),
					'donnees' => $this->get_FloodsExports($joueurs, $debut, $fin)
				);
		}

		elseif($mode == 'convois') {
			$valeurs = array(
					'mode' => 'convois',
					'entetes' => array('Lanceur', 'Receveur', 'Valeur', 'Ajout'),
					'donnees' => $this->get_ConvoisExports($joueurs, $debut, $fin)
				);
		}
		
		elseif($mode == 'modification_niveaux') {
			$valeurs = array(
					'mode' => 'convois',
					'entetes' => array('Pseudo', 'Nom', 'Ancien', 'Nouveau', 'Date', 'Source'),
					'donnees' => $this->get_ModificationNiveauxExports($joueurs, $debut, $fin)
				);
		}
		$valeurs['nom_fichier'] = $this->create_FileExport($valeurs, $mode);
		echo json_encode($valeurs);
	}

	public function check_ListeJoueurs($joueurs) {
		$possibles = $this->get_liste_membres();
		if(count($joueurs) < 2 AND $joueurs[0] == '') {
			return $possibles;
		}
		else {
			$retour = array();
			foreach($joueurs as $joueur) {
				if(in_array($joueur, $possibles)) {
					$retour[] = $joueur;
				}
			}
			return $retour;
		}
	}

	public function get_TDCMoyensExports($joueurs, $debut, $fin, $majoration, $assoc) {
		$valeurs = array();
		$pseudos = '';
		for($i=0; $i<count($joueurs); $i++) {
			$pseudos .= (($pseudos == '') ? '' : ' OR ').' pseudo = :pseudo_'.$i;
		}
		$TDC_total = 0;
		$date_debut = 0;
		$valeur = 0;
		$bdd = Zzzelp::Connexion_BDD('Traceur');

		$fini = false;
		$n = 0;
		while(!$fini) {
			$requete = $bdd->prepare('SELECT * FROM TDC_'.$this->serveur.' WHERE ('.$pseudos.') AND date_releve > :debut AND date_releve < :fin ORDER BY date_releve ASC LIMIT '.($n*10000).', 10000');
			$requete->bindValue(':debut', $debut, PDO::PARAM_INT);
			$requete->bindValue(':fin', $fin, PDO::PARAM_INT);
			for($i=0; $i<count($joueurs); $i++) {
				$requete->bindValue(':pseudo_'.$i, $joueurs[$i], PDO::PARAM_STR);
			}
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $releve) {
				if(!array_key_exists($releve['pseudo'], $valeurs)) {
					$valeurs[$releve['pseudo']] = array('date_debut' => 0, 'TDC_total' => 0, 'valeur' => 0, 'date_2' => 0);
				}
				$date = $releve['date_releve'];
				if($valeurs[$releve['pseudo']]['date_debut'] != 0) {
					$valeurs[$releve['pseudo']]['TDC_total'] += $this->choose_TDC_releve($valeurs[$releve['pseudo']]['valeur'], $majoration, $releve['pseudo']) * ($date - $valeurs[$releve['pseudo']]['date_2']);
				}
				else {
					$valeurs[$releve['pseudo']]['date_debut'] = $date;
				}
				$valeurs[$releve['pseudo']]['date_2'] = $date;
				$valeurs[$releve['pseudo']]['valeur'] = $releve['valeur'];
			}
			$n++;
			if(count($resultats) == 0) {
				$fini = true;
			}
		}
		$TDC_moyens = array();
		foreach($valeurs as $pseudo => $donnees) {
			if($assoc) {
				$TDC_moyens[$pseudo] = ($donnees['date_2'] == $donnees['date_debut']) ? 0 : (int)($donnees['TDC_total'] / ($donnees['date_2'] - $donnees['date_debut']));
			}
			else {
				if($donnees['date_2'] == $donnees['date_debut']) {
					$TDC_moyens[] = array($pseudo, 0);
				}
				else {
					$TDC_moyens[] = array($pseudo, (int)($donnees['TDC_total'] / ($donnees['date_2'] - $donnees['date_debut'])));
				}
			}
		}
		if($assoc) {
			arsort($TDC_moyens);
		}
		else {
			$TDC_moyens = Tableau::key_sort($TDC_moyens, 1, true);
		}
		$bdd = null;
		return $TDC_moyens;
	}

	/*
		Choisis si un relevé de TDC doit être remplacé par le nombre d'ouvrières
	*/
	private function choose_TDC_releve($TDC, $majoration, $pseudo) {
		if ($majoration AND $this->membres[$pseudo]->niveaux->ouvrieres < $TDC AND $this->membres[$pseudo]->niveaux->ouvrieres != 0) {
			return $this->membres[$pseudo]->niveaux->ouvrieres;
		}
		else {
			return $TDC;
		}
	}

	public function get_FloodsExports($joueurs, $debut, $fin) {
		$pseudo_ID = array();
		$ID_pseudo = array();
		foreach($joueurs as $pseudo) {
			$joueur = new Utilisateur_Fzzz($pseudo, $this->serveur, null);
			$pseudo_ID[$pseudo] = $joueur->id;
			$ID_pseudo[$joueur->id] = $pseudo;
		}

		$floods = array();
		$pseudos = '';
		for($i=0; $i<count($joueurs); $i++) {
			$pseudos .= (($pseudos == '') ? '' : ' OR ').' ID_attaquant = :ID_'.$i;
		}
		$bdd = Zzzelp::Connexion_BDD('Actions');
		foreach (array('floods_archives', 'floods_courant') as $table) {
			$requete = $bdd->prepare('SELECT * FROM '.$table.' WHERE ('.$pseudos.') AND (ally_1 = :alliance OR ally_2 = :alliance OR ally_3 = :alliance) AND serveur = :serveur AND arrivee >= :debut AND arrivee <= :fin');
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':debut', $debut, PDO::PARAM_STR);
			$requete->bindValue(':fin', $fin, PDO::PARAM_STR);
			$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
			for($i=0; $i<count($joueurs); $i++) {
				$requete->bindValue(':ID_'.$i, $pseudo_ID[$joueurs[$i]], PDO::PARAM_INT);
			}
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $resultat) {
				if(!array_key_exists($resultat['ID_cible'], $ID_pseudo)) {
					$joueur = new Utilisateur_Fzzz(null, $this->serveur, $resultat['ID_cible']);
					$ID_pseudo[$resultat['ID_cible']] = $joueur->pseudo;
				}
				$floods[] = array(
								$ID_pseudo[$resultat['ID_attaquant']], 
								$ID_pseudo[$resultat['ID_cible']], 
								$resultat['valeur'], 
								date('d/m H:i:s', $resultat['arrivee'])
							);
			}
		}
		$bdd = null;
		return $floods;			
	}

	public function get_ConvoisExports($joueurs, $debut, $fin) {
		$convois = array();
		$pseudos = '';
		for($i=0; $i<count($joueurs); $i++) {
			$pseudos .= (($pseudos == '') ? '' : ' OR ').' lanceur = :pseudo_'.$i;
		}
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT * FROM Lancement_convois_mat WHERE ('.$pseudos.') AND serveur = :serveur AND alliance = :alliance AND ajout < :fin AND ajout > :debut ORDER BY ajout ASC');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->bindValue(':debut', $debut, PDO::PARAM_STR);
		$requete->bindValue(':fin', $fin, PDO::PARAM_STR);
		for($i=0; $i<count($joueurs); $i++) {
			$requete->bindValue(':pseudo_'.$i, $joueurs[$i], PDO::PARAM_STR);
		}
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {
			$convois[] = array(
							$resultat['lanceur'], 
							$resultat['receveur'], 
							$resultat['valeur'], 
							date('d/m H:i:s', $resultat['ajout'])
						);
		}
		$bdd = null;
		return $convois;		
	}

	public function get_ModificationNiveauxExports($joueurs, $debut, $fin) {
		$modifications = array();
		$pseudos = '';
		for($i=0; $i<count($joueurs); $i++) {
			$pseudos .= (($pseudos == '') ? '' : ' OR ').' pseudo = :pseudo_'.$i;
		}
		$bdd = Zzzelp::Connexion_BDD('Releves');
		$requete = $bdd->prepare('SELECT * FROM archives_niveaux WHERE serveur = :serveur AND ('.$pseudos.') AND date_changement > :debut AND date_changement < :fin ORDER BY date_changement ASC');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':debut', date('Y-m-d G:i:s', $debut), PDO::PARAM_STR);
		$requete->bindValue(':fin', date('Y-m-d G:i:s', $fin), PDO::PARAM_STR);
		for($i=0; $i<count($joueurs); $i++) {
			$requete->bindValue(':pseudo_'.$i, $joueurs[$i], PDO::PARAM_STR);
		}
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {
			$modifications[] = array(
									$resultat['pseudo'], 
									$resultat['nom'],
									$resultat['ancienne'], 
									$resultat['nouvelle'], 
									$resultat['date_changement'],
									$resultat['auto']
								);	
		}
		$bdd = null;
		return $modifications;
	}

	public function create_FileExport($valeurs, $mode) {
		$nom = $this->alliance.'_'.$this->serveur.'_'.$mode.'_'.date("m_d_y").'_'.Securite::newToken();
		$chemin = 'Fichiers/'.$nom.'.csv';
		$delimiteur = ';';
		$fichier_csv = fopen($chemin, 'w+');
		fprintf($fichier_csv, chr(0xEF).chr(0xBB).chr(0xBF));

		foreach($valeurs['donnees'] as $ligne) {
			fputcsv($fichier_csv, $ligne, $delimiteur);
		}
		fclose($fichier_csv);
		return $nom;		
	}
}