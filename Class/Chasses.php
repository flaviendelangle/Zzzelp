<?php

class Chasses {
	
	public $difficultes = array(
		array('ratio' => 1, 'couleur' => 'red', 'selected' => false),
		array('ratio' => 2, 'couleur' => 'red', 'selected' => false),
		array('ratio' => 3, 'couleur' => 'red', 'selected' => false),
		array('ratio' => 4, 'couleur' => 'red', 'selected' => false),
		array('ratio' => 5, 'couleur' => 'orange', 'selected' => false),
		array('ratio' => 6, 'couleur' => 'orange', 'selected' => false),
		array('ratio' => 6.5, 'couleur' => 'orange', 'selected' => false),
		array('ratio' => 7, 'couleur' => 'green', 'selected' => false),
		array('ratio' => 7.5, 'couleur' => 'green', 'selected' => false),
		array('ratio' => 8, 'couleur' => 'green', 'selected' => true),
		array('ratio' => 8.5, 'couleur' => 'blue', 'selected' => false),
		array('ratio' => 9, 'couleur' => 'blue', 'selected' => false),
		array('ratio' => 10, 'couleur' => 'blue', 'selected' => false)		
	);

	public $parametres = array(
		'Armes' => array('input' => 'niveau', 'id' => 'armes', 'espaces' => False), 
		'Bouclier' => array('input' => 'niveau', 'id' => 'bouclier', 'espaces' => False),
		'Vitesse de Chasse' => array('input' => 'niveau', 'id' => 'vitesse_chasse', 'espaces' => False), 
		'TDC au lancement' => array('input' => 'tableau', 'id' => 'TDC_depart', 'espaces' => True), 
		'TDC à l\'arrivée' => array('input' => 'tableau', 'id' => 'TDC_retour', 'espaces' => True)
					);

	public $utilisateur;
	public $TDCs;

	public function __construct($utilisateur) {
		$this->utilisateur = $utilisateur;
	}

	public function get_PrioXP() {
		return array(12, 10, 7, 5, 4, 3, 1);
	}

	public function get_Armee() {
		if(isset($_GET['armee'])) {
			$armee = explode(',', substr($_GET['armee'],1,-1));
			for ($i=0;$i<14;$i++) {
				if ($armee[$i] == 'NaN') {
					$armee[$i] = 0;
				}
			}
		}
		else {
			$armee = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		}
		return $armee;
	}

	public function get_LastTDCs() {
		$TDCs = array();
		foreach(Fourmizzz::$serveurs as $serveur) {
			if(!empty($this->utilisateur->comptes_fzzz[$serveur])) {
				$this->utilisateur->comptes_fzzz[$serveur]->get_LastTDC();
				$TDCs[$serveur] = $this->utilisateur->comptes_fzzz[$serveur]->lastTDC;
			}
			else {
				$TDCs[$serveur] = 0;
			}
		}
		$this->TDCs = json_encode($TDCs);
	}

	public function get_NiveauxChasse() {
		$niveaux = array();
		foreach(Fourmizzz::$serveurs as $serveur) {
			if($this->utilisateur->pseudos[$serveur]['pseudo'] != '' && $this->utilisateur->comptes_fzzz[$serveur] != null) {
				$this->utilisateur->comptes_fzzz[$serveur]->getInfosZzzelp();
				$niveaux[$serveur] = array(
										(int)$this->utilisateur->comptes_fzzz[$serveur]->niveaux->bouclier_thoracique, 
										(int)$this->utilisateur->comptes_fzzz[$serveur]->niveaux->armes,
										(int)$this->utilisateur->comptes_fzzz[$serveur]->niveaux->vitesse_chasse
									);
			}
			else {
				$niveaux[$serveur] = array(0,0,0);
			}
		}
		$this->niveaux = json_encode($niveaux);
	}




	/*
		Stock les résultats d'une simulation du simulateur de chasses C+
	*/
	public static function save_Simulation() {
		$data = json_decode($_POST['data'], true);
		$niveaux = $data['niveaux'];
		$attaque = $data['analyse']['attaquant']['armee']['unites'];
		$defense = $data['analyse']['defenseur']['armee']['unites'];


		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('INSERT INTO SimulationsChasse(pseudo, IP, bouclier, armes, vitesse_chasse, cochenilles, TDC_lancement, TDC_conquis, 
															    analyse, JSN, SN, NE, JS, S, C, CE, A, AE, SE, Tk, TkE, T, TE, 
															    Petite_araignee, Araignee, Chenille, Criquet, Guepe, Cigale, Dionee, Abeille, Hanneton, 
															    Scarabee, Lezard, Mante_religieuse, Souris, Mulot, Alouette, Rat, Tamanoir) 
								  VALUES (:pseudo, :IP, :bouclier, :armes, :vitesse_chasse, :cochenilles, :TDC_lancement, :TDC_conquis, 
															    :analyse, :JSN, :SN, :NE, :JS, :S, :C, :CE, :A, :AE, :SE, :Tk, :TkE, :T, :TE, 
															    :Petite_araignee, :Araignee, :Chenille, :Criquet, :Guepe, :Cigale, :Dionee, :Abeille, :Hanneton, 
															    :Scarabee, :Lezard, :Mante_religieuse, :Souris, :Mulot, :Alouette, :Rat, :Tamanoir)');
		$requete->bindValue(':pseudo', htmlentities($_GET['pseudo']), PDO::PARAM_STR);
		$requete->bindValue(':IP', $_SERVER["REMOTE_ADDR"], PDO::PARAM_STR);

		$requete->bindValue(':bouclier', htmlentities($niveaux['bouclier']), PDO::PARAM_INT);
		$requete->bindValue(':armes', htmlentities($niveaux['armes']), PDO::PARAM_INT);
		$requete->bindValue(':vitesse_chasse', htmlentities($niveaux['vitesse_chasse']), PDO::PARAM_INT);
		$requete->bindValue(':cochenilles', htmlentities($niveaux['cochenilles']), PDO::PARAM_INT);

		$requete->bindValue(':TDC_lancement', htmlentities($niveaux['TDC_lancement']), PDO::PARAM_INT);
		$requete->bindValue(':TDC_conquis', htmlentities($niveaux['TDC_conquis']), PDO::PARAM_INT);

		$requete->bindValue(':JSN', htmlentities($attaque[0]), PDO::PARAM_INT);
		$requete->bindValue(':SN', htmlentities($attaque[1]), PDO::PARAM_INT);
		$requete->bindValue(':NE', htmlentities($attaque[2]), PDO::PARAM_INT);
		$requete->bindValue(':JS', htmlentities($attaque[3]), PDO::PARAM_INT);
		$requete->bindValue(':S', htmlentities($attaque[4]), PDO::PARAM_INT);
		$requete->bindValue(':C', htmlentities($attaque[5]), PDO::PARAM_INT);
		$requete->bindValue(':CE', htmlentities($attaque[6]), PDO::PARAM_INT);
		$requete->bindValue(':A', htmlentities($attaque[7]), PDO::PARAM_INT);
		$requete->bindValue(':AE', htmlentities($attaque[8]), PDO::PARAM_INT);
		$requete->bindValue(':SE', htmlentities($attaque[9]), PDO::PARAM_INT);
		$requete->bindValue(':Tk', htmlentities($attaque[10]), PDO::PARAM_INT);
		$requete->bindValue(':TkE', htmlentities($attaque[11]), PDO::PARAM_INT);
		$requete->bindValue(':T', htmlentities($attaque[12]), PDO::PARAM_INT);
		$requete->bindValue(':TE', htmlentities($attaque[13]), PDO::PARAM_INT);

		$requete->bindValue(':Petite_araignee', htmlentities($defense[0]), PDO::PARAM_INT);
		$requete->bindValue(':Araignee', htmlentities($defense[1]), PDO::PARAM_INT);
		$requete->bindValue(':Chenille', htmlentities($defense[2]), PDO::PARAM_INT);
		$requete->bindValue(':Criquet', htmlentities($defense[3]), PDO::PARAM_INT);
		$requete->bindValue(':Guepe', htmlentities($defense[4]), PDO::PARAM_INT);
		$requete->bindValue(':Cigale', htmlentities($defense[5]), PDO::PARAM_INT);
		$requete->bindValue(':Dionee', htmlentities($defense[6]), PDO::PARAM_INT);
		$requete->bindValue(':Abeille', htmlentities($defense[7]), PDO::PARAM_INT);
		$requete->bindValue(':Hanneton', htmlentities($defense[8]), PDO::PARAM_INT);
		$requete->bindValue(':Scarabee', htmlentities($defense[9]), PDO::PARAM_INT);
		$requete->bindValue(':Lezard', htmlentities($defense[10]), PDO::PARAM_INT);
		$requete->bindValue(':Mante_religieuse', htmlentities($defense[11]), PDO::PARAM_INT);
		$requete->bindValue(':Souris', htmlentities($defense[12]), PDO::PARAM_INT);
		$requete->bindValue(':Mulot', htmlentities($defense[13]), PDO::PARAM_INT);
		$requete->bindValue(':Alouette', htmlentities($defense[14]), PDO::PARAM_INT);
		$requete->bindValue(':Rat', htmlentities($defense[15]), PDO::PARAM_INT);
		$requete->bindValue(':Tamanoir', htmlentities($defense[16]), PDO::PARAM_INT);

		$requete->bindValue(':analyse', json_encode($data['analyse']), PDO::PARAM_STR);
		$requete->execute();

		return 'OK';

	}

}