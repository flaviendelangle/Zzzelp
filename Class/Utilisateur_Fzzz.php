<?php

class Utilisateur_Fzzz {

	public $pseudo;
	public $serveur;
	public $id;
	public $niveaux;
	public $alliances;
	public $alliances_obj;
	public $alliances_activated;
	public $alliances_activated_obj;
	public $schema_sonde;
	public $schema_antisonde;
	public $coordonnees;
	public $droitsZzzelp;

	public function __construct($pseudo, $serveur, $id) {
		if(in_array($serveur, Fourmizzz::$serveurs)) {
			$this->serveur = htmlentities($serveur);
			if($pseudo == null) {
				$this->id = (int)htmlentities($id);
				$this->pseudo = $this->get_Pseudo();
			}
			else {
				$this->pseudo = htmlentities($pseudo);
				$this->id = (int)$this->get_ID();
			}
		}
	}

	/*
		DONNEES CONCERNANT LE COMPTE FOURMIZZZ
	*/

	/*
		Récupère l'ID du compte Fourmizzz lié à ce pseudo
	*/
	public function get_ID() {
		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		$requete = $bdd->prepare('SELECT ID FROM BDDJoueurs WHERE Pseudo = :pseudo');
		$requete->bindValue(':pseudo', $this->pseudo);
		$requete->execute();
		$ID = $requete->fetch(PDO::FETCH_NUM)[0];
		$bdd = null;
		return $ID;
	}

	/*
		Recupère le pseudo du compte Fourmizzz à cet ID
	*/
	public function get_Pseudo() {
		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		$requete = $bdd->prepare('SELECT Pseudo FROM BDDJoueurs WHERE ID = :ID');
		$requete->bindValue(':ID', $this->id);
		$requete->execute();
		$pseudo = $requete->fetch(PDO::FETCH_NUM)[0];
		$bdd = null;
		return $pseudo;
	}

	/*
		Récupère les coordonnées du compte Fourmizzz
	*/
	public function getCoordonnees() {
		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		$requete = $bdd->prepare('SELECT x, y FROM BDDJoueurs WHERE ID = :ID');
		$requete->bindValue(':ID', $this->id, PDO::PARAM_INT);
		$requete->execute();
		$this->coordonnees = $requete->fetch(PDO::FETCH_ASSOC);
		$bdd = null;
	}

	/*
		Récupère les informations du compte Fourmizzz stockées sur Zzzelp :
		- Constructions
		- Recherches
		- Ouvrières
		...
	*/
	public function getInfosZzzelp() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM donnees_fourmizzz WHERE serveur = :serveur AND pseudo = :pseudo');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$this->niveaux = $requete->fetch(PDO::FETCH_OBJ);
		$bdd = null;
	}

	/*
		Stock les  nouvelles valeurs de constructions, recherches et ouvrières envoyées par le profil Fourmizzz d'un joueur
	*/
	private function update_Niveaux($armee, $constructions, $recherches, $ouvrieres) {
		$this->add_LogModifNiveaux('laboratoire', $recherches, false);
		$this->add_LogModifNiveaux('construction', $constructions, false);
		$this->add_LogModifOuvrieres($ouvrieres, false);
		
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('UPDATE donnees_fourmizzz SET JSN = :JSN, SN = :SN, NE = :NE, JS = :JS, S = :S, C = :C, CE = :CE, A = :A, AE = :AE, SE = :SE, Tk = :Tk, TkE = :TkE, T = :T, TE = :TE, champignonniere = :champignonniere, entrepot_nourriture = :entrepot_nourriture, entrepot_materiaux = :entrepot_materiaux, couveuse = :couveuse, solarium = :solarium, laboratoire = :laboratoire, salle_analyse = :salle_analyse, salle_combat = :salle_combat, caserne = :caserne, dome = :dome, loge_imperiale = :loge_imperiale, etable_pucerons = :etable_pucerons, etable_cochenilles = :etable_cochenilles, 	technique_ponte = :technique_ponte, bouclier_thoracique = :bouclier_thoracique, armes = :armes, architecture = :architecture, communication_animaux = :communication_animaux, vitesse_chasse = :vitesse_chasse, vitesse_attaque = :vitesse_attaque, genetique = :genetique, acide = :acide, poison = :poison, ouvrieres = :ouvrieres, colonisateur = :colonisateur, MAJ_manuelle = :MAJ_manuelle WHERE serveur = :serveur AND pseudo = :pseudo');

		$requete->bindValue(':JSN', str_replace(' ', '', htmlentities($armee[0])), PDO::PARAM_INT);
		$requete->bindValue(':SN', str_replace(' ', '', htmlentities($armee[1])), PDO::PARAM_INT);
		$requete->bindValue(':NE', str_replace(' ', '', htmlentities($armee[2])), PDO::PARAM_INT);
		$requete->bindValue(':JS', str_replace(' ', '', htmlentities($armee[3])), PDO::PARAM_INT);
		$requete->bindValue(':S', str_replace(' ', '', htmlentities($armee[4])), PDO::PARAM_INT);
		$requete->bindValue(':C', str_replace(' ', '', htmlentities($armee[5])), PDO::PARAM_INT);
		$requete->bindValue(':CE', str_replace(' ', '', htmlentities($armee[6])), PDO::PARAM_INT);
		$requete->bindValue(':A', str_replace(' ', '', htmlentities($armee[7])), PDO::PARAM_INT);
		$requete->bindValue(':AE', str_replace(' ', '', htmlentities($armee[8])), PDO::PARAM_INT);
		$requete->bindValue(':SE', str_replace(' ', '', htmlentities($armee[9])), PDO::PARAM_INT);
		$requete->bindValue(':Tk', str_replace(' ', '', htmlentities($armee[10])), PDO::PARAM_INT);
		$requete->bindValue(':TkE', str_replace(' ', '', htmlentities($armee[11])), PDO::PARAM_INT);
		$requete->bindValue(':T', str_replace(' ', '', htmlentities($armee[12])), PDO::PARAM_INT);
		$requete->bindValue(':TE', str_replace(' ', '', htmlentities($armee[13])), PDO::PARAM_INT);

		$requete->bindValue(':champignonniere', htmlentities($constructions[0]), PDO::PARAM_INT);
		$requete->bindValue(':entrepot_nourriture', htmlentities($constructions[1]), PDO::PARAM_INT);
		$requete->bindValue(':entrepot_materiaux', htmlentities($constructions[2]), PDO::PARAM_INT);
		$requete->bindValue(':couveuse', htmlentities($constructions[3]), PDO::PARAM_INT);
		$requete->bindValue(':solarium', htmlentities($constructions[4]), PDO::PARAM_INT);
		$requete->bindValue(':laboratoire', htmlentities($constructions[5]), PDO::PARAM_INT);
		$requete->bindValue(':salle_analyse', htmlentities($constructions[6]), PDO::PARAM_INT);
		$requete->bindValue(':salle_combat', htmlentities($constructions[7]), PDO::PARAM_INT);
		$requete->bindValue(':caserne', htmlentities($constructions[8]), PDO::PARAM_INT);
		$requete->bindValue(':dome', htmlentities($constructions[9]), PDO::PARAM_INT);
		$requete->bindValue(':loge_imperiale', htmlentities($constructions[10]), PDO::PARAM_INT);
		$requete->bindValue(':etable_pucerons', htmlentities($constructions[11]), PDO::PARAM_INT);
		$requete->bindValue(':etable_cochenilles', htmlentities($constructions[12]), PDO::PARAM_INT);

		$requete->bindValue(':technique_ponte', htmlentities($recherches[0]), PDO::PARAM_INT);
		$requete->bindValue(':bouclier_thoracique', htmlentities($recherches[1]), PDO::PARAM_INT);
		$requete->bindValue(':armes', htmlentities($recherches[2]), PDO::PARAM_INT);
		$requete->bindValue(':architecture', htmlentities($recherches[3]), PDO::PARAM_INT);
		$requete->bindValue(':communication_animaux', htmlentities($recherches[4]), PDO::PARAM_INT);
		$requete->bindValue(':vitesse_chasse', htmlentities($recherches[5]), PDO::PARAM_INT);
		$requete->bindValue(':vitesse_attaque', htmlentities($recherches[6]), PDO::PARAM_INT);
		$requete->bindValue(':genetique', htmlentities($recherches[7]), PDO::PARAM_INT);
		$requete->bindValue(':acide', htmlentities($recherches[8]), PDO::PARAM_INT);
		$requete->bindValue(':poison', htmlentities($recherches[9]), PDO::PARAM_INT);

		$requete->bindValue(':ouvrieres', $ouvrieres, PDO::PARAM_INT);
		$requete->bindValue(':colonisateur', trim(htmlentities($_POST['colonisateur'])), PDO::PARAM_STR);
		$requete->bindValue(':MAJ_manuelle', time(), PDO::PARAM_INT);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);

		$requete->execute();
		$bdd = null;
	}

	/*
		Met à jour les niveaux de constructions envoyés par ZzzelpScript
	*/
	public function update_ConstructionsScript() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$constructions = explode(',', substr(htmlentities($_GET['niveaux']),1,-1));
		$this->add_LogModifNiveaux('construction', $constructions, true);
		$requete = $bdd->prepare('UPDATE donnees_fourmizzz SET champignonniere = :champignonniere, entrepot_nourriture = :entrepot_nourriture, entrepot_materiaux = :entrepot_materiaux, couveuse = :couveuse, solarium = :solarium, laboratoire = :laboratoire, salle_analyse = :salle_analyse, salle_combat = :salle_combat, caserne = :caserne, dome = :dome, loge_imperiale = :loge_imperiale, etable_pucerons = :etable_pucerons, etable_cochenilles = :etable_cochenilles, construction_en_cours = :construction_en_cours, construction_en_cours_2 = :construction_en_cours_2, MAJ = NOW() WHERE serveur = :serveur AND pseudo = :pseudo');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':champignonniere', htmlentities($constructions[0]), PDO::PARAM_INT);
		$requete->bindValue(':entrepot_nourriture', htmlentities($constructions[1]), PDO::PARAM_INT);
		$requete->bindValue(':entrepot_materiaux', htmlentities($constructions[2]), PDO::PARAM_INT);
		$requete->bindValue(':couveuse', htmlentities($constructions[3]), PDO::PARAM_INT);
		$requete->bindValue(':solarium', htmlentities($constructions[4]), PDO::PARAM_INT);
		$requete->bindValue(':laboratoire', htmlentities($constructions[5]), PDO::PARAM_INT);
		$requete->bindValue(':salle_analyse', htmlentities($constructions[6]), PDO::PARAM_INT);
		$requete->bindValue(':salle_combat', htmlentities($constructions[7]), PDO::PARAM_INT);
		$requete->bindValue(':caserne', htmlentities($constructions[8]), PDO::PARAM_INT);
		$requete->bindValue(':dome', htmlentities($constructions[9]), PDO::PARAM_INT);
		$requete->bindValue(':loge_imperiale', htmlentities($constructions[10]), PDO::PARAM_INT);
		$requete->bindValue(':etable_pucerons', htmlentities($constructions[11]), PDO::PARAM_INT);
		$requete->bindValue(':etable_cochenilles', htmlentities($constructions[12]), PDO::PARAM_INT);
		$requete->bindValue(':construction_en_cours', htmlentities($constructions[13]), PDO::PARAM_INT);
		$requete->bindValue(':construction_en_cours_2', htmlentities($constructions[14]), PDO::PARAM_INT);
		$requete->execute();
		$bdd = null;
	}

	/*
		Met à jour les niveaux de laboratoire envoyés par ZzzelpScript
	*/
	public function update_RecherchesScript() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$recherches = explode(',', substr(htmlentities($_GET['niveaux']),1,-1));
		$this->add_LogModifNiveaux('laboratoire', $recherches, true);
		$requete = $bdd->prepare('UPDATE donnees_fourmizzz SET technique_ponte = :technique_ponte, bouclier_thoracique = :bouclier_thoracique, armes = :armes, architecture = :architecture, communication_animaux = :communication_animaux, vitesse_chasse = :vitesse_chasse, vitesse_attaque = :vitesse_attaque, genetique = :genetique, acide = :acide, poison = :poison, labo_en_cours = :labo_en_cours, labo_en_cours_2 = :labo_en_cours_2, MAJ = NOW() WHERE serveur = :serveur AND pseudo = :pseudo');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);	
		$requete->bindValue(':technique_ponte', htmlentities($recherches[0]), PDO::PARAM_INT);
		$requete->bindValue(':bouclier_thoracique', htmlentities($recherches[1]), PDO::PARAM_INT);
		$requete->bindValue(':armes', htmlentities($recherches[2]), PDO::PARAM_INT);
		$requete->bindValue(':architecture', htmlentities($recherches[3]), PDO::PARAM_INT);
		$requete->bindValue(':communication_animaux', htmlentities($recherches[4]), PDO::PARAM_INT);
		$requete->bindValue(':vitesse_chasse', htmlentities($recherches[5]), PDO::PARAM_INT);
		$requete->bindValue(':vitesse_attaque', htmlentities($recherches[6]), PDO::PARAM_INT);
		$requete->bindValue(':genetique', htmlentities($recherches[7]), PDO::PARAM_INT);
		$requete->bindValue(':acide', htmlentities($recherches[8]), PDO::PARAM_INT);
		$requete->bindValue(':poison', htmlentities($recherches[9]), PDO::PARAM_INT);
		$requete->bindValue(':labo_en_cours', htmlentities($recherches[10]), PDO::PARAM_INT);
		$requete->bindValue(':labo_en_cours_2', htmlentities($recherches[11]), PDO::PARAM_INT);
		$requete->execute();
		$bdd = null;	
	}

	/*
		Met à jour les niveaux d'ouvrières envoyés par ZzzelpScript
	*/
	public function update_OuvrieresScript() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT ouvrieres FROM donnees_fourmizzz WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] < $_GET['ouvrieres']) {
			$ouvrieres = htmlentities($_GET['ouvrieres']);		
			$this->add_LogModifOuvrieres($ouvrieres, true);
			$requete = $bdd->prepare('UPDATE donnees_fourmizzz SET ouvrieres = :ouvrieres WHERE pseudo = :pseudo AND serveur = :serveur');
			$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':ouvrieres', $ouvrieres, PDO::PARAM_INT);
			$requete->execute();
		}

		$requete = $bdd->prepare('UPDATE donnees_fourmizzz SET stock_nou = :nourriture, stock_mat = :materiaux WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':nourriture', htmlentities($_GET['nourriture']), PDO::PARAM_INT);
		$requete->bindValue(':materiaux', htmlentities($_GET['materiaux']), PDO::PARAM_INT);
		$requete->execute();		

		$bdd = null;
	}

	/*
		Met à jour l'armée du joueur envoyée via ZzzelpScript (C+ ongly)
	*/
	public function update_ArmeeScript() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$armee = explode(',', substr(htmlentities($_GET['niveaux']),1,-1));
		$requete = $bdd->prepare('UPDATE donnees_fourmizzz SET 
								  JSN = :JSN, SN = :SN, NE = :NE, JS = :JS, S = :S, C = :C, CE = :CE, A = :A, AE = :AE, SE = :SE, Tk = :Tk, TkE = :TkE, T = :T, TE = :TE 
								  WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':JSN', (int)$armee[0], PDO::PARAM_INT);
		$requete->bindValue(':SN', (int)$armee[1], PDO::PARAM_INT);
		$requete->bindValue(':NE', (int)$armee[2], PDO::PARAM_INT);
		$requete->bindValue(':JS', (int)$armee[3], PDO::PARAM_INT);
		$requete->bindValue(':S', (int)$armee[4], PDO::PARAM_INT);
		$requete->bindValue(':C', (int)$armee[5], PDO::PARAM_INT);
		$requete->bindValue(':CE', (int)$armee[6], PDO::PARAM_INT);
		$requete->bindValue(':A', (int)$armee[7], PDO::PARAM_INT);
		$requete->bindValue(':AE', (int)$armee[8], PDO::PARAM_INT);
		$requete->bindValue(':SE', (int)$armee[9], PDO::PARAM_INT);
		$requete->bindValue(':Tk', (int)$armee[10], PDO::PARAM_INT);
		$requete->bindValue(':TkE', (int)$armee[11], PDO::PARAM_INT);
		$requete->bindValue(':T', (int)$armee[12], PDO::PARAM_INT);
		$requete->bindValue(':TE', (int)$armee[13], PDO::PARAM_INT);
		$requete->execute();
		$bdd = null;
	}

	/*
		Calcul le temps de ponte en nombre de batiments construits d'un joueur
	*/
	public function get_tdp() {
		$this->niveaux->tdp = (int)$this->niveaux->couveuse + (int)$this->niveaux->solarium + (int)$this->niveaux->technique_ponte;
	}

	/*
		Calcul le temps nécessaire pour pondre une unité
	*/
	public function get_tdp_unite($i, $actualiser=true) {
		if($actualiser) {
			$this->get_tdp();
		}
		if($i == 14) {
			$this->niveaux->tdp_ouv = 60*pow(0.9,$this->niveaux->tdp);
		}
		else {
			$nom = 'tdp_'.Fourmizzz::$unites['TAGs'][$i];
			$this->niveaux->$nom = (Fourmizzz::$unites['HOF'][$i])*pow(0.9,$this->niveaux->tdp);
		}
	}

	/*
		Calcul la taile des entrepôts de matériaux et de nourriture
	*/
	public function get_sizeentrepots() {
		$this->niveaux->size_mat = 1200*pow(2,(int)$this->niveaux->entrepot_materiaux);
		$this->niveaux->size_nou = 1200*pow(2,(int)$this->niveaux->entrepot_nourriture);
	}

	/*
		Calcul le nombre maximal d'ouvrières qu'un joueur peut avoir en se basent sur sa dernière synchronisation et son temps de ponte
	*/
	public function get_actualouv() {
		$this->get_tdp_unite(14, false);
		$this->niveaux->ouvrieres_reelles = $this->niveaux->ouvrieres + (time() - (int)$this->niveaux->MAJ_ouvrieres) / $this->niveaux->tdp_ouv;
	}

	/*
		Ajoute aux niveaux du joueurs les constructions et recherches en cours
	*/
	public function apply_encours() {
		if ($this->niveaux->labo_en_cours != 0) {
			$niveau = Fourmizzz::$recherches_bdd[$this->niveaux->labo_en_cours - 1];
			$this->niveaux->$niveau += 1;
		}
		if ($this->niveaux->labo_en_cours_2 != 0) {
			$niveau = Fourmizzz::$recherches_bdd[$this->niveaux->labo_en_cours_2 - 1];
			$this->niveaux->$niveau += 1;
		}
		if ($this->niveaux->construction_en_cours != 0) {
			$niveau = Fourmizzz::$constructions_bdd[$this->niveaux->construction_en_cours - 1];
			$this->niveaux->$niveau += 1;
		}
		if ($this->niveaux->construction_en_cours_2 != 0) {
			$niveau = Fourmizzz::$constructions_bdd[$this->niveaux->construction_en_cours_2 - 1];
			$this->niveaux->$niveau += 1;
		}
	}

	/*
		Recupère le dernier TDC connu par Zzzelp du joueur
	*/
	public function get_LastTDC() {
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$requete = $bdd->prepare('SELECT valeur FROM TDC_'.$this->serveur.' WHERE pseudo = :pseudo ORDER BY date_releve DESC LIMIT 1');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		$this->lastTDC = !empty($resultat) ? (int)$resultat['valeur'] : 0;
		$bdd = null;
	}

	/*
		Calcul le TDC moyen d'un joueur sur une période donnée
	*/
	public function get_TDCMoyen($debut, $fin, $majoration) {
		$TDC_total = 0;
		$date_debut = 0;
		$valeur = 0;
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$requete = $bdd->prepare('SELECT * FROM TDC_'.$this->serveur.' WHERE pseudo = :pseudo AND date_releve > :debut AND date_releve < :fin ORDER BY date_releve ASC');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':debut', $debut, PDO::PARAM_INT);
		$requete->bindValue(':fin', $fin, PDO::PARAM_INT);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $releve) {
			$date = $releve['date_releve'];
			if($date_debut != 0) {
				$TDC_total += $this->choose_TDC_releve($valeur, $majoration) * ($date - $date_2);
			}
			else {
				$date_debut = $date;
			}
			$date_2 = $date;
			$valeur = $releve['valeur'];
		}
		if ($date - $date_debut == 0) {
			$this->TDC_moyen = 0;
		}
		else {
			$this->TDC_moyen = (int)($TDC_total / ($date - $date_debut));
		}
		$bdd = null;
	}

	/*
		Choisis si un relevé de TDC doit être remplacé par le nombre d'ouvrières
	*/
	private function choose_TDC_releve($TDC, $majoration) {
		if ($this->niveaux->ouvrieres < $TDC AND $this->niveaux->ouvrieres != 0 AND $majoration) {
			return $ouvrieres;
		}
		else {
			return $TDC;
		}
	}	

	/*
		Récupère le niveau de droit de l'utilisateur sur Zzzelp
	*/
	public function get_RightsZzzelp() {
		$joueurs_prive = array(
				's1' 	=> array('delangle', 'nicolas35', 'era92', 'BOF13', 'silas88', 'gawain'),
				's2' 	=> array('vignarnaud', 'Spirou', 'era92'),
				's3' 	=> array('delangle', 'Mogg29'),
				's4' 	=> array('delangle', 'Ceredwen', 'ankou', 'Timberwolf', 'HunabKu', 'silas88'),
				'test' 	=> array('delangle'),
				'w1' 	=> array('delangle'),
			);
		$alliances_semi_prive = array(
				's1'	=> array('ZOO', 'CDF', 'FP', '-NBW-'),
				's2'	=> array('FCGB'),
				's3'	=> array(),
				's4'	=> array(),
				'test'	=> array(),
				'w1'	=> array()
			);
		$this->droitsZzzelp = 0;
		$this->getAlliances_activated();
		foreach($this->alliances_activated as $alliance) {
			if(in_array($alliance->alliance, $alliances_semi_prive[$this->serveur])) {
				$this->droitsZzzelp = 1;
			}
		}
		if(in_array($this->pseudo, $joueurs_prive[$this->serveur])) {
			$this->droitsZzzelp = 2;
		}
		if(($this->pseudo == 'delangle' AND $this->serveur != 's2') OR ($this->pseudo == 'vignarnaud' AND $this->serveur == 's2')) {
			$this->droitsZzzelp = 3;
		}
	}

	/*
		Récupère le dernier rapport de compte envoyé par ZzzelpScript
	*/
	public function get_RapportCompte() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM rapports_joueurs WHERE pseudo = :pseudo AND serveur = :serveur ORDER BY date_MAJ DESC LIMIT 1');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$rapport = $requete->fetch(PDO::FETCH_ASSOC);
		$this->rapport = empty($rapport) ? NULL : $this->generate_RapportCompte($rapport, false);
		$bdd = null;
	}

	/*
		Met en forme un rapport envoyé par ZzzelpScript
	*/
	private function generate_RapportCompte($rapport, $concis) {
		if($concis) {
			return array(
						'ID' => (int)$rapport['ID'],
						'pseudo' => $rapport['pseudo'], 
						'date_MAJ' => strtotime($rapport['date_MAJ']),
						'armee' => array((int)$rapport['JSN'], (int)$rapport['SN'], (int)$rapport['NE'], (int)$rapport['JS'], (int)$rapport['S'],  (int)$rapport['C'], (int)$rapport['CE'],  (int)$rapport['A'], (int)$rapport['AE'],  (int)$rapport['SE'], (int)$rapport['Tk'], (int)$rapport['TkE'], (int)$rapport['T'], (int)$rapport['TE']),
						'constructions' => array((int)$rapport['champignonniere'], (int)$rapport['entrepot_nourriture'], (int)$rapport['entrepot_materiaux'], (int)$rapport['couveuse'], (int)$rapport['solarium'], (int)$rapport['laboratoire'], (int)$rapport['salle_analyse'], (int)$rapport['salle_combat'], (int)$rapport['caserne'], (int)$rapport['dome'], (int)$rapport['loge_imperiale'], (int)$rapport['etable_pucerons'], (int)$rapport['etable_cochenilles'], (int)$rapport['constructions_en_cours'], (int)$rapport['constructions_en_cours_2']),
						'recherches' => array((int)$rapport['technique_ponte'], (int)$rapport['bouclier_thoracique'], (int)$rapport['armes'], (int)$rapport['architecture'], (int)$rapport['communication_animaux'], (int)$rapport['vitesse_chasse'], (int)$rapport['vitesse_attaque'], (int)$rapport['genetique'], (int)$rapport['acide'], (int)$rapport['poison'], (int)$rapport['labo_en_cours'], (int)$rapport['labo_en_cours_2']),
						'ouvrieres' => (int)$rapport['ouvrieres']
					);
		}
		else {
			return array(
						'ID' => $rapport['ID'],
						'pseudo' => $rapport['pseudo'], 
						'date_MAJ' => $rapport['date_MAJ'],
						'armee' => array(
							'JSN' => $rapport['JSN'], 
							'SN' => $rapport['SN'], 
							'NE' => $rapport['NE'], 
							'JS' => $rapport['JS'], 
							'S' => $rapport['S'], 
							'C' => $rapport['C'], 
							'CE' => $rapport['CE'], 
							'A' => $rapport['A'], 
							'AE' => $rapport['AE'], 
							'SE' => $rapport['SE'], 
							'Tk' => $rapport['Tk'], 
							'TkE' => $rapport['TkE'], 
							'T' => $rapport['T'], 
							'TE' => $rapport['TE']
									),
						'constructions' => array(
							'Champignonnière' => $rapport['champignonniere'], 
							'Entrepôt de Nourriture' => $rapport['entrepot_nourriture'], 
							'Entrepôt de Matériaux' => $rapport['entrepot_materiaux'], 
							'Couveuse' => $rapport['couveuse'], 
							'Solarium' => $rapport['solarium'], 
							'Laboratoire' => $rapport['laboratoire'], 
							'Salle d\'analyse' => $rapport['salle_analyse'], 
							'Salle de combat' => $rapport['salle_combat'], 
							'Caserne' => $rapport['caserne'], 
							'Dôme' => $rapport['dome'], 
							'Loge Impériale' => $rapport['loge_imperiale'], 
							'Etable à pucerons' => $rapport['etable_pucerons'], 
							'Etable à cochenilles' => $rapport['etable_cochenilles'], 
							'Bâtiment en cours' => $rapport['constructions_en_cours'], 
							'Bâtiment en cours (C+)' => $rapport['constructions_en_cours_2']
									),
						'recherches' => array(
							'Technique de ponte' => $rapport['technique_ponte'], 
							'Bouclier Thoracique' => $rapport['bouclier_thoracique'], 
							'Armes' => $rapport['armes'], 
							'Architecture' => $rapport['architecture'], 
							'Com. avec les animaux' => $rapport['communication_animaux'], 
							'Vitesse de chasse' => $rapport['vitesse_chasse'], 
							'Vitesse d\'attaque' => $rapport['vitesse_attaque'], 
							'Génétique' => $rapport['genetique'], 
							'Acide' => $rapport['acide'], 
							'Poison' => $rapport['poison'], 
							'Recherche en cours' => $rapport['labo_en_cours'], 
							'Recherche en cours (C+)' => $rapport['labo_en_cours_2']
											),
						'ouvrieres' => $rapport['ouvrieres']
					);
		}
	}

	/*
		Met à jour un rapport
	*/
	public function update_Rapport($ID) {
		$rapport_brut = json_decode($_POST['rapport'], true);
		$rapport = array();
		foreach($rapport_brut as $section => $valeurs) {
			$rapport[htmlentities($section)] = array();
			foreach($valeurs as $valeur) {
				 $rapport[htmlentities($section)][] = htmlentities($valeur);
			}
		}
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('UPDATE rapports_joueurs SET
			JSN = :JSN, SN = :SN, NE = :NE, JS = :JS, S = :S, C = :C, CE = :CE, A = :A, AE = :AE, SE = :SE, Tk = :Tk, TkE = :TkE, T = :T, TE = :TE, 
			champignonniere = :champignonniere, entrepot_nourriture = :entrepot_nourriture, entrepot_materiaux = :entrepot_materiaux, couveuse = :couveuse, solarium = :solarium,
			laboratoire = :laboratoire, salle_analyse = :salle_analyse, salle_combat = :salle_combat, caserne = :caserne, dome = :dome, loge_imperiale = :loge_imperiale,
			etable_pucerons = :etable_pucerons, etable_cochenilles = :etable_cochenilles, constructions_en_cours = :constructions_en_cours, constructions_en_cours_2 = :constructions_en_cours_2,
			technique_ponte = :technique_ponte, bouclier_thoracique = :bouclier_thoracique, armes = :armes, architecture = :architecture, communication_animaux = :communication_animaux, 
			vitesse_chasse = :vitesse_chasse, vitesse_attaque = :vitesse_attaque, genetique = :genetique, acide = :acide, poison = :poison, labo_en_cours = :labo_en_cours, 
			labo_en_cours_2 = :labo_en_cours_2, ouvrieres = :ouvrieres WHERE pseudo = :pseudo AND serveur = :serveur AND ID = :ID');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':ID', $ID, PDO::PARAM_INT);
		$requete->bindValue(':ouvrieres', $rapport['ouvrieres'][0], PDO::PARAM_INT);
		for($i=0; $i<14; $i++) {
			$requete->bindValue(':'.Fourmizzz::$unites['TAGs'][$i], $rapport['armee'][$i]);
		}
		for($i=0; $i<15; $i++) {
			$requete->bindValue(':'.Fourmizzz::$constructions_bdd[$i], $rapport['constructions'][$i]);
		}
		for($i=0; $i<12; $i++) {
			$requete->bindValue(':'.Fourmizzz::$recherches_bdd[$i], $rapport['recherches'][$i]);
		}
		$requete->execute();
		$bdd = null;
	}

	/*
		Supprime un rapport
	*/
	public function delete_Rapport($ID) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('DELETE FROM rapports_joueurs WHERE pseudo = :pseudo AND serveur = :serveur AND ID = :ID');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':ID', $ID, PDO::PARAM_INT);
		$requete->execute();
		$bdd = null;
	}


	/*
		DONNEES CONCERNANT LE COMPTE ZZZELP
	*/


	/*
		Vérifie que la table donnees_fourmizzz contient bien une entrée pour le pseudo Fourmizzz de l'utilisateur
		En crée une le cas échéant
	*/
	public function check_MemberZone() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM donnees_fourmizzz WHERE serveur = :serveur AND pseudo = :pseudo');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_NUM);
		if($resultat[0] == 0) {
			$requete = $bdd->prepare('INSERT INTO donnees_fourmizzz (pseudo, serveur, ID, MAJ) VALUES(:pseudo, :serveur, :ID, 0)');
			$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':ID', $this->id, PDO::PARAM_INT);
			$requete->execute();
		}
		$bdd = null;
	}


	/*
		Vérifie que le pseudo Fourmizzz est bien rentré sur Zzzelp (validé ou non)
	*/
	public function check_ExistenceZzzelp() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM membres WHERE pseudo_'.$this->serveur.' = :pseudo AND verif_pseudo_'.$this->serveur.' = 1');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		return ($requete->fetch(PDO::FETCH_NUM)[0] > 0);
	}

	/*
		Récupère le pseudo du compte Zzzelp associé au pseudo Fourmizzz
	*/
	public function get_PseudoZzzelp() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT pseudo FROM membres WHERE pseudo_'.$this->serveur.' = :pseudo');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$pseudo = $requete->fetch(PDO::FETCH_ASSOC)['pseudo'];
		$bdd = null;
		return $pseudo;		
	}

	/*
		Stock les données du profil Fourmizzz d'un utilisateur
	*/
	public function update_Infos() {
		$this->update_Alliances();
		$this->update_Niveaux($_POST['armee'], $_POST['construction'], $_POST['recherche'], str_replace(' ','',htmlentities($_POST['ouvrieres'])));
		$this->update_SondeAntisonde();
	}


	/*
		Recupère les schémas de sonde et d'antisonde choisis par l'utilisateur
	*/
	public function get_SondeAntisonde() {
		$this->schema_sonde = array(
					array('valeur' => 1000, 'unite' => 10),
					array('valeur' => 1, 'unite' => 0)
									);
		$this->schema_antisonde = array(
					array('valeur' => 1, 'unite' => 0),
					array('valeur' => 10000, 'unite' => 0)
									);
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');

		$requete = $bdd->prepare('SELECT * FROM schema_sonde WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		if(!empty($resultat)) {
			$this->schema_sonde[0] = array('valeur' => (int)$resultat['nombre_sonde_1'], 'unite' => array_search($resultat['unite_sonde_1'], Fourmizzz::$unites['TAGs']));
			$this->schema_sonde[1] = array('valeur' => (int)$resultat['nombre_sonde_2'], 'unite' => array_search($resultat['unite_sonde_2'], Fourmizzz::$unites['TAGs']));
		}

		$requete = $bdd->prepare('SELECT * FROM schema_antisonde WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		if(!empty($resultat)) {
			$this->schema_antisonde[0] = array('valeur' => (int)$resultat['nombre_antisonde_1'], 'unite' => array_search($resultat['unite_antisonde_1'], Fourmizzz::$unites['TAGs']));
			$this->schema_antisonde[1] = array('valeur' => (int)$resultat['nombre_antisonde_2'], 'unite' => array_search($resultat['unite_antisonde_2'], Fourmizzz::$unites['TAGs']));
		}
		$bdd = null;
	}

	/*
		Met à jour les schémas de sonde et antisonde
	*/
	private function update_SondeAntisonde() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');

		$requete = $bdd->prepare('SELECT COUNT(*) FROM schema_sonde WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$existant = ($requete->fetch(PDO::FETCH_NUM)[0] > 0);
	
		if ($existant) {
			$requete = $bdd->prepare('UPDATE schema_sonde SET nombre_sonde_1 = :nombre_sonde_1, unite_sonde_1 = :unite_sonde_1, 
							 								  nombre_sonde_2 = :nombre_sonde_2, unite_sonde_2 = :unite_sonde_2 
							 		  WHERE pseudo = :pseudo AND serveur = :serveur');	
		}
		else {
			$requete = $bdd->prepare('INSERT INTO schema_sonde (pseudo, serveur, lieu_sonde_1, nombre_sonde_1, unite_sonde_1, lieu_sonde_2, nombre_sonde_2, unite_sonde_2) 
									  VALUES(:pseudo, :serveur, :lieu_sonde_1, :nombre_sonde_1, :unite_sonde_1, :lieu_sonde_2, :nombre_sonde_2, :unite_sonde_2)');
			$requete->bindValue(':lieu_sonde_1', 'Dome', PDO::PARAM_STR);
			$requete->bindValue(':lieu_sonde_2', 'Loge', PDO::PARAM_STR);
	
		}

		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':nombre_sonde_1', str_replace(' ', '', htmlentities($_POST['nombre_sonde_1'])), PDO::PARAM_INT);
		$requete->bindValue(':unite_sonde_1', htmlentities($_POST['unite_sonde_1']), PDO::PARAM_STR);
		$requete->bindValue(':nombre_sonde_2', str_replace(' ', '', htmlentities($_POST['nombre_sonde_2'])), PDO::PARAM_INT);
		$requete->bindValue(':unite_sonde_2', htmlentities($_POST['unite_sonde_2']), PDO::PARAM_STR);

		$requete->execute();

		if ($existant) {
			$requete = $bdd->prepare('UPDATE schema_antisonde SET nombre_antisonde_1 = :nombre_antisonde_1, unite_antisonde_1 = :unite_antisonde_1, 
							 								  nombre_antisonde_2 = :nombre_antisonde_2, unite_antisonde_2 = :unite_antisonde_2 
							 		  WHERE pseudo = :pseudo AND serveur = :serveur');	
		}
		else {
			$requete = $bdd->prepare('INSERT INTO schema_antisonde (pseudo, serveur, lieu_antisonde_1, nombre_antisonde_1, unite_antisonde_1, lieu_antisonde_2, nombre_antisonde_2, unite_antisonde_2) 
									  VALUES(:pseudo, :serveur, :lieu_antisonde_1, :nombre_antisonde_1, :unite_antisonde_1, :lieu_antisonde_2, :nombre_antisonde_2, :unite_antisonde_2)');
			$requete->bindValue(':lieu_antisonde_1', 'Dome', PDO::PARAM_STR);
			$requete->bindValue(':lieu_antisonde_2', 'Loge', PDO::PARAM_STR);
	
		}

		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':nombre_antisonde_1', str_replace(' ', '', htmlentities($_POST['nombre_antisonde_1'])), PDO::PARAM_INT);
		$requete->bindValue(':unite_antisonde_1', htmlentities($_POST['unite_antisonde_1']), PDO::PARAM_STR);
		$requete->bindValue(':nombre_antisonde_2', str_replace(' ', '', htmlentities($_POST['nombre_antisonde_2'])), PDO::PARAM_INT);
		$requete->bindValue(':unite_antisonde_2', htmlentities($_POST['unite_antisonde_2']), PDO::PARAM_STR);

		$requete->execute();
		$bdd = null;
	}









	/*
		DONNEES CONCERNANT LES ALLIANCES DU JOUEUR
	*/


	/*
		Récupère la liste des alliances du joueur (validées ou non) sous la forme array(TAG1,TAG2,...)
	*/
	public function getAlliances() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM Droits_alliance WHERE serveur = :serveur AND pseudo = :pseudo');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$this->alliances = $requete->fetchAll(PDO::FETCH_OBJ);
		$bdd = null;	
	}

	/*
		Récupère la liste des alliances du joueur validées sous la forme array(TAG1,TAG2,...)
	*/
	public function getAlliances_activated() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM Droits_alliance WHERE serveur = :serveur AND pseudo = :pseudo AND droits > 0');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$this->alliances_activated = $requete->fetchAll(PDO::FETCH_OBJ);
		$bdd = null;
	}

	/*
		Récupère la liste des alliances du joueur (validées ou non) sous la forme d'un objet MembreAlliance
		Le site récupère automatiquement le droit lié à cette alliance
	*/
	public function get_obj_Alliances() {
		$this->alliances_obj = array();
		for($i=0; $i<count($this->alliances); $i++) {
			$this->alliances_obj[] = new MembreAlliance($this->alliances[$i]->alliance, $this->pseudo, $this->$serveur);
		}
	}

	/*
		Récupère la liste des alliances du joueur validées sous la forme d'un objet MembreAlliance
		Le site récupère automatiquement le droit lié à cette alliance
	*/
	public function get_obj_Alliances_activated() {
		$this->alliances_activated_obj = array();
		for($i=0; $i<count($this->alliances_activated); $i++) {
			$this->alliances_activated_obj[] = new MembreAlliance($this->alliances_activated[$i]->alliance, $this->pseudo, $this->serveur);
		}			
	}

	/*
		Met à jour les alliances d'un joueur quand il les modifie sur Zzzelp
	*/
	private function update_Alliances() {
		$alliances = $_POST['alliances'];
		$alliances_2 = array();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM Droits_alliance WHERE serveur = :serveur AND pseudo = :pseudo');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $alliance) {
			$alliances_2[] = array('nom' => $alliance['alliance'], 'supprimer' => (!in_array($alliance['alliance'], $alliances) OR $alliance['alliance'] == ''));
		}
		foreach($alliances as $alliance) {
			if($alliance != '') {
				$m = true;
				foreach($alliances_2 as $a) {
					if($a['nom'] == $alliance) {
						$m = false;
					}
				}
				if($m) {
					$requete = $bdd->prepare('INSERT INTO Droits_alliance (pseudo, serveur, alliance, droits) VALUES(:pseudo, :serveur, :alliance, 0)');
					$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
					$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
					$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
					$requete->execute();
				}
			}
		}
		foreach($alliances_2 as $alliance) {
			if($alliance['supprimer']) {
				$requete = $bdd->prepare('DELETE FROM Droits_alliance WHERE pseudo = :pseudo AND serveur = :serveur AND alliance = :alliance');
				$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
				$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
				$requete->bindValue(':alliance', $alliance['nom'], PDO::PARAM_STR);
				$requete->execute();			
			}
		}
		$bdd = null;
	}

	/*
		Récupère le mode de Multiflood à afficher
	*/
	public function get_ModeMF() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$alliances = '';
		for($i=0; $i<count($this->alliances_activated); $i++) {
			$alliances .= (($alliances != '') ? ' OR ' : '').' alliance = :alliance_'.$i; 
		}
		$requete = $bdd->prepare('SELECT max(MF_guerre) FROM alliances WHERE ('.$alliances.') AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		for($i=0; $i<count($this->alliances_activated); $i++) {
			$requete->bindValue(':alliance_'.$i, $this->alliances_activated[$i]->alliance, PDO::PARAM_STR);
		}
		$requete->execute();
		$modeMF = $requete->fetch(PDO::FETCH_NUM)[0];
		$bdd = null;
		return $modeMF;
	}







	/*
		DONNEES CONCERNANT LES LOGS D'UN JOUEUR
	*/

	/*
		Stockage des modifications de constructions ou recherches dans les logs
	*/
	private function add_LogModifNiveaux($mode, $niveaux, $auto) {
		$noms = array('construction' => Fourmizzz::$constructions_bdd, 'laboratoire' => Fourmizzz::$recherches_bdd);
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$bdd_2 = Zzzelp::Connexion_BDD('Releves');
		$requetes = array();
		$requete = $bdd->prepare('SELECT * FROM donnees_fourmizzz WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		for($i=0; $i<count($noms[$mode]); $i++) {
			if($resultat[$noms[$mode][$i]] != $niveaux[$i]) {
				$requete = $bdd_2->prepare('INSERT INTO archives_niveaux (pseudo, serveur, nom, ancienne, nouvelle, auto) VALUES(:pseudo, :serveur, :nom, :ancienne, :nouvelle, :auto)');
				$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
				$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);						
				$requete->bindValue(':nom', $noms[$mode][$i], PDO::PARAM_STR);
				$requete->bindValue(':ancienne', $resultat[$noms[$mode][$i]], PDO::PARAM_INT);
				$requete->bindValue(':nouvelle', $niveaux[$i], PDO::PARAM_INT);
				$requete->bindValue(':auto', ($auto ? 1 : 0), PDO::PARAM_INT);
				$requete->execute();
			}
		}
		$bdd = null;
	}

	/*
		Stockage des modifications d'ouvrières dans les logs
	*/
	private function add_LogModifOuvrieres($valeur, $auto) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT ouvrieres FROM donnees_fourmizzz WHERE pseudo = :pseudo AND serveur = :serveur');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->execute();
		$ouvrieres = $requete->fetch(PDO::FETCH_NUM)[0];
		if($ouvrieres != $valeur) {
			$bdd = Zzzelp::Connexion_BDD('Releves');
			$requete = $bdd->prepare('INSERT INTO archives_ouvrieres (pseudo, serveur, ancienne, nouvelle, auto) VALUES(:pseudo, :serveur, :ancienne, :nouvelle, :auto)');
			$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':ancienne', $ouvrieres, PDO::PARAM_INT);
			$requete->bindValue(':nouvelle', $valeur, PDO::PARAM_INT);
			$requete->bindValue(':auto', ($auto ? 1 : 0), PDO::PARAM_INT);
			$requete->execute();
		}
		$bdd = null;
	}










	/*
		DONNEES CONCERNANT LA MESSAGERIE ZZZELP
	*/

	/*
		Récupèration des messages ayant moins d'une semaine d'ancienneté
	*/
	public function get_Messages() {
		$messages = array();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM MP_Zzzelp WHERE ((destinataire = :pseudo AND serveur = :serveur) OR destinataire = "Zzzelp") 
								  AND date_envoi > :date_envoi ORDER BY date_envoi DESC');
		$requete->bindValue(':date_envoi', (time() - 86300*7), PDO::PARAM_INT);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $message) {
			$messages[] = array(
							'ID' => $message['ID'], 
							'expediteur' => $message['expediteur'], 
							'alliance' => 'Zzzelp', 
							'date' => $message['date_envoi'],
							'titre' => $message['titre'], 
							'contenu' => nl2br(Text::bbcode($message['contenu'])), 
							'lu' => $message['lu']);
		}
		$bdd = null;
		return $messages; 
	}
}
