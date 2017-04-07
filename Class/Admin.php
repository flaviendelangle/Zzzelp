<?php

class Admin {
	
	public $instance;
	public $pseudo = "";
	public $erreur;
	public $validations_pseudo;
	public $restreint;
	public $zone;

	public function __construct($restreint, $instance) {
		$this->instance = $instance;
		$this->restreint = $restreint;
		$this->zone = Zzzelp::$onglet;
	}

	public function check_auth() {
		return ($this->instance->pseudo == 'delangle');
	}

	public function load() {
		$menu = new MenuZzzelp($this->instance, 'global');
		if($this->zone == 'accueil') {
			$this->get_LastValidations();
			require("Vue/Vue_admin_accueil.php");
		}

		elseif($this->zone == 'autocomplete') {
			if($_GET['mode'] == 'zzzelp') {
				$this->autocomplete_pseudosZzzelp();
			}
			elseif($_GET['mode'] == 'fourmizzz') {
				$this->autocomplete_pseudosFourmizzz();
			}
		}

		elseif($this->zone == 'MAJScript') {
			$this->generate_ZzzelpScript();
		}

		elseif($this->zone == 'MAJBDD') {
			$this->update_BDDFourmizzz();
		}

		if(Zzzelp::$onglet == 'cron') {
			$traceur = new Traceur(null);
			$traceur->load_Cron();
		}

		elseif($this->zone == 'data') {
			$this->mode = $_GET['mode'];
			if($this->mode == 'validations') {
				echo json_encode(array(
							'dernieres_validations' => $this->get_LastValidations(),
							'a_valider' => $this->get_NotValidated()
					));
			}
			elseif($this->mode == 'profil') {
				$this->get_pseudo_Zzzelp();
				if($this->pseudo == '') {
					echo json_encode(array('erreur' => 'Ce compte est introuvable')); 
				}
				else {
					$membre = new InitialisationZzzelp($this->pseudo, true);
					echo json_encode(array('erreur' => '', 'utilisateur' => $membre));
				}
			}
			elseif($this->mode == 'releves') {
				echo json_encode(array(
						'CA' => $this->dumps_CA(),
						'FI' => $this->dumps_FI(),
						'MP' => $this->dumps_MP()
					));
			}
		}

		elseif($this->zone == 'validation') {
			$this->validate_Joueur('admin', $this->instance->pseudo);
		}

		elseif($this->zone == 'nettoyage') {
			$this->donnee = $_GET['donnee'];
			if($this->donnee == 'zzzelpscript') {
				echo $this->clean_ZzzelpScript();
			}
			elseif($this->donnee == 'pseudos') {
				echo $this->correct_PseudosFourmizzz();
			}
			elseif($this->donnee == 'chasses') {
				echo $this->clean_Chasses();
			}
			elseif($this->donnee == 'floods') {
				echo $this->archive_Floods();
			}
			elseif($this->donnee == 'TDC') {
				echo $this->clean_TDC();
			}
		}

		elseif($this->zone == 'authentification') {
			$_SESSION['pseudo'] = $_GET['pseudo'];
			header('Location:'.Zzzelp::$url_site.'accueil');
		}

		elseif($this->zone == 'test') {
			$this->fonction_test();
		}

		elseif($this->zone == 'test2') {
			$this->fonction_test2();
		}
	}

	public function get_pseudo_Zzzelp() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		if(!empty($_GET['pseudo_zzzelp'])) {
			$requete = $bdd->prepare('SELECT COUNT(*) AS nombre, pseudo FROM membres WHERE pseudo = :pseudo');
			$requete->bindValue(':pseudo', htmlentities($_GET['pseudo_zzzelp']), PDO::PARAM_STR);
			$requete->execute();
			$resultat = $requete->fetch(PDO::FETCH_ASSOC);
			$this->pseudo = ($resultat['nombre'] == 1) ? $resultat['pseudo'] : '';
		}
		elseif(!empty($_GET['pseudo_fourmizzz'])) {
			$serveur = htmlentities($_GET['serveur']);
			$requete = $bdd->prepare('SELECT COUNT(*) AS nombre, pseudo FROM membres WHERE pseudo_'.$serveur.' = :pseudo');
			$requete->bindValue(':pseudo', htmlentities($_GET['pseudo_fourmizzz']), PDO::PARAM_STR);
			$requete->execute();
			$resultat = $requete->fetch(PDO::FETCH_ASSOC);
			$this->pseudo = ($resultat['nombre'] == 1) ? $resultat['pseudo'] : '';
		}
	}


	/*
		Fonctions de validation
	*/
	public function validation_pseudo() {
		if(empty($this->instance->pseudos[$_GET['serveur']]['pseudo']) AND ZzzelpScript::is_token_fourmizzz_valid(htmlentities($_GET['serveur']), htmlentities($_GET['pseudo']), htmlentities($_GET['token']))) {
			$this->supprimer_pseudo();
			$this->validate_Joueur('zzzelpscript', $this->instance->pseudo);
			header('Location:http://'.$_GET['serveur'].'.fourmizzz.fr/Reine.php?force_zzzelp');
		}
		else {
			header('Location:'.Zzzelp::$url_site);
		}
	}

	public function get_LastValidations() {
		$bdd = Zzzelp::Connexion_BDD('LogsZzzelp');
		$requete = $bdd->prepare('SELECT * FROM validations_pseudo ORDER BY ID DESC LIMIT 100');
		$requete->execute();
		return $requete->fetchAll(PDO::FETCH_ASSOC);
	}

	public function autocomplete_pseudosZzzelp() {
		$pseudos = array();
		$valeur = htmlentities($_GET['q']);
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT pseudo FROM membres WHERE pseudo LIKE :valeur ORDER BY pseudo ASC LIMIT 5');
		$requete->bindValue(':valeur', $valeur.'%', PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $compte) {
			$pseudos[] = $compte['pseudo'];
		}
		echo json_encode($pseudos);
	}

	public function get_NotValidated() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$a_valider = array();
		foreach(Fourmizzz::$serveurs as $serveur) {
			$requete = $bdd->prepare('SELECT pseudo, pseudo_'.$serveur.' FROM membres WHERE verif_pseudo_'.$serveur.' = 0 AND pseudo_'.$serveur.' != ""');
			$requete->execute();
			$a_valider[$serveur] = $requete->fetchAll(PDO::FETCH_ASSOC);
		}
		return $a_valider;
	}

	public function validate_Joueur($methode, $validateur) {
		$serveur = $_GET['serveur'];
		if(in_array($serveur, Fourmizzz::$serveurs)) {
			$bdd = Zzzelp::Connexion_BDD('Donnees_site');
			$requete = $bdd->prepare('UPDATE membres SET verif_pseudo_'.$serveur.' = 0, pseudo_'.$serveur.' = "" WHERE pseudo'.$serveur.' = :pseudo_serveur LIMIT 1');
			$requete->bindValue(':pseudo_serveur', htmlentities($_GET['pseudo']), PDO::PARAM_STR);
			$requete->execute();
			if($methode == 'admin') {
				$requete = $bdd->prepare('UPDATE membres SET verif_pseudo_'.$serveur.' = 1 WHERE pseudo_'.$serveur.' = :pseudo_serveur LIMIT 1');
			}
			elseif($methode == 'zzzelpscript') {
				// Ajout du nouveau propriétaire
				$requete = $bdd->prepare('UPDATE membres SET verif_pseudo_'.$serveur.' = 1, pseudo_'.$serveur.' = :pseudo_serveur WHERE pseudo = :pseudo LIMIT 1');
				$requete->bindValue(':pseudo', $this->instance->pseudo, PDO::PARAM_STR);
			}
			$requete->bindValue(':pseudo_serveur', htmlentities($_GET['pseudo']), PDO::PARAM_STR);
			$requete->execute();
			$bdd = Zzzelp::Connexion_BDD('LogsZzzelp');
			$requete = $bdd->prepare('INSERT INTO validations_pseudo (valide, serveur, validateur, methode, date_validation) VALUES (:pseudo, :serveur, :validateur, :methode, :date_validation)');
			$requete->bindValue(':pseudo', htmlentities($_GET['pseudo']), PDO::PARAM_STR);
			$requete->bindValue(':serveur', $serveur, PDO::PARAM_STR);
			$requete->bindValue(':validateur', $validateur, PDO::PARAM_STR);
			$requete->bindValue(':methode', $methode, PDO::PARAM_STR);
			$requete->bindValue(':date_validation', time(), PDO::PARAM_INT);
			$requete->execute();
		}	
	}

	public function supprimer_pseudo() {
		$serveur = $_GET['serveur'];
		if(in_array($serveur, Fourmizzz::$serveurs)) {
			$bdd = Zzzelp::Connexion_BDD('Donnees_site');
			$requete = $bdd->prepare('UPDATE membres SET verif_pseudo_'.$serveur.' = 0, pseudo_'.$serveur.' = "" WHERE pseudo_'.$serveur.' = :pseudo LIMIT 1');
			$requete->bindValue(':pseudo', htmlentities($_GET['pseudo']), PDO::PARAM_STR);
			$requete->execute();
		}	
	}

	public function autocomplete_pseudosFourmizzz() {
		$pseudos = array();
		$valeur = htmlentities($_GET['q']);
		$serveur = htmlentities($_GET['serveur']);
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT pseudo FROM donnees_fourmizzz WHERE pseudo LIKE :valeur AND serveur = :serveur ORDER BY pseudo ASC LIMIT 5');
		$requete->bindValue(':valeur', $valeur.'%', PDO::PARAM_STR);
		$requete->bindValue(':serveur', $serveur, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $compte) {
			$pseudos[] = $compte['pseudo'];
		}
		echo json_encode($pseudos);
	}


	/*
		Nettoyage de la BDD
	*/
	
	public function clean_ZzzelpScript() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('DELETE FROM parametres_ZzzelpScript WHERE pseudo = "" OR (serveur != "s1" AND serveur != "s2" AND serveur != "s3" AND serveur != "s4" AND serveur != "test" AND serveur != "w1")');
		$requete->execute();
		return 1;
	}

	public function correct_PseudosFourmizzz() {
		foreach(Fourmizzz::$serveurs as $serveur) {
			$pseudos = array();
			$bdd = Zzzelp::Connexion_BDD('Donnees_site');
			$requete = $bdd->prepare('SELECT pseudo_'.$serveur.' FROM membres');
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $resultat) {
				if($resultat['pseudo_'.$serveur] != '') {
					$pseudos[] = $resultat['pseudo_'.$serveur];
				}
			}
			$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($serveur));
			foreach($pseudos as $pseudo) {
				$requete = $bdd->prepare('SELECT Pseudo FROM BDDJoueurs WHERE Pseudo = :pseudo');
				$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
				$requete->execute();
				$resultat = $requete->fetch(PDO::FETCH_ASSOC);
				if(empty($resultat)) {
					$bdd = Zzzelp::Connexion_BDD('Donnees_site');
					$requetes =  $bdd->prepare('UPDATE membres SET pseudo_'.$serveur.' = "" WHERE pseudo_'.$serveur.' = :pseudo');
					$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
					$requete->execute();
				}
				elseif($resultat['Pseudo'] != $pseudo) {
					$bdd = Zzzelp::Connexion_BDD('Donnees_site');
					$requete = $bdd->prepare('UPDATE membres SET pseudo_'.$serveur.' = "'.$resultat['Pseudo'].'"  WHERE pseudo_'.$serveur.' = :pseudo');		
					$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);		
					$requete->execute();
				}
			}
		}
		return 1;
	}

	public function clean_Chasses() {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT * FROM chasses WHERE pseudo = "" OR valeur = 0 OR arrivee > :arrivee');
		$requete->bindValue(':arrivee', time() + 86400*200, PDO::PARAM_INT);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {
			$requete = $bdd->prepare('DELETE FROM chasses WHERE ID = :ID');
			$requete->bindValue(':ID', $resultat['ID'], PDO::PARAM_INT);
			$requete->execute();
		}
		return 1;
	}

	public function archive_Floods() {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('INSERT INTO floods_archives SELECT * FROM floods_courant WHERE arrivee < :date_limite');
		$requete->bindValue(':date_limite', time() - 2592000, PDO::PARAM_INT);
		$requete->execute();
		$requete = $bdd->prepare('DELETE FROM floods_courant WHERE arrivee < :date_limite');
		$requete->bindValue(':date_limite', time() - 2592000, PDO::PARAM_INT);
		$requete->execute();
		return 1;
	}

	public function clean_TDC() {
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$date_limite = time() - 604800;
		$supprimees = 0;
		foreach (Fourmizzz::$serveurs as $serveur) {
			$requete = $bdd->prepare('SELECT COUNT(*) FROM TDC_'.$serveur);
			$requete->execute();
			$avant = $requete->fetch(PDO::FETCH_NUM)[0];
			$requete = $bdd->prepare('DELETE FROM TDC_'.$serveur.' WHERE date_releve < :date_limite ORDER BY date_releve ASC LIMIT 100000');
			$requete->bindValue(':date_limite', time() - 604800, PDO::PARAM_INT);
			$requete->execute();
			$requete = $bdd->prepare('SELECT COUNT(*) FROM TDC_'.$serveur);
			$requete->execute();
			$supprimees += $avant - $requete->fetch(PDO::FETCH_NUM)[0];
		}
		return ($supprimees == 0) ? 1 : 0;
	}

	public function dumps_CA() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM releves_CA  ORDER BY date_synchro DESC LIMIT 50');
		$requete->execute();
		return $requete->fetchAll(PDO::FETCH_ASSOC);
	}

	public function dumps_FI() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM releves_FI ORDER BY date_synchro DESC LIMIT 50');
		$requete->execute();
		return $requete->fetchAll(PDO::FETCH_ASSOC);
	}

	public function dumps_MP() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM releves_MP ORDER BY date_synchro DESC LIMIT 50');
		$requete->execute();
		return $requete->fetchAll(PDO::FETCH_ASSOC);
	}

	public static function erreur($element) {
		if($_SESSION['pseudo'] == 'delangle') {
			var_dump($element);
		}
	}


	public function update_BDDFourmizzz() {
		foreach(array('s1' => array('S1', 'S2'), 's3' => array('S3', 'S4'), 'test' => array('S0')) as $domaine => $serveurs) {
			foreach($serveurs as $serveur) {
				echo 'T';
				$dump = file_get_contents('http://'.$domaine.'.fourmizzz.fr/BDDJoueur/'.date('d-m-Y').'_'.$serveur.'_fr_FR.sql');
				$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($serveur));
				$bdd->exec(utf8_decode($dump));
				echo 'Actualisation BDD '.$serveur.' réussie<br>';
			}
		}
	}






	/*
		Génère les fichiers JavaScripts
	*/
	public static function generate_ZzzelpScript() {
	
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

		$contenu = '';
		foreach($fichiers as $fichier) {
			$contenu .= file_get_contents($fichier['dossier'].'/'.$fichier['nom'].'.js')."\n\n";
		}
		file_put_contents('Userscripts/zzzelpscript.js', $contenu);
		header('Content-Type: application/javascript');
		
		echo $contenu;
	}


	public function get_Analyses_RC() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT ID_RC, RC FROM RC_guerre WHERE mode = "RC"');
		$requete->execute();
		$r = array();
		while($RC = $requete->fetch(PDO::FETCH_ASSOC)) {
			$r[] = $RC;
		}
		echo json_encode($r);
	}

	public function save_Analyses_RC() {
		$analyse = json_decode($_POST['analyse'], true);
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('UPDATE RC_guerre SET analyse = :analyse, hash = :hash WHERE ID_RC = :ID_RC');
		$requete->bindValue(':analyse', $_POST['analyse'], PDO::PARAM_STR);
		$requete->bindValue(':ID_RC',$_POST['ID_RC'], PDO::PARAM_INT);
		$requete->bindValue(':hash', sha1($script->serveur.$attaquant.$defenseur.json_encode($analyse['attaquant']['armee']).json_encode($analyse['defenseur']['armee'])));
		$requete->execute();
		var_dump($requete->errorInfo());
	}

	public function fonction_test() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM SimulationsChasse WHERE TDC_lancement = 50 AND TDC_conquis = 1000000000');
		$requete->execute();
		while($ligne = $requete->fetch(PDO::FETCH_ASSOC)) {
			$armee = array(
				'Petite_araignee' => $ligne['Petite_araignee'],
				'Araignee' => $ligne['Araignee'],
				'Chenille' => $ligne['Chenille'],
				'Criquet' => $ligne['Criquet'],
				'Guepe' => $ligne['Guepe'],
				'Cigale' => $ligne['Cigale'],
				'Dionee' => $ligne['Dionee'],
				'Abeille' => $ligne['Abeille'],
				'Hanneton' => $ligne['Hanneton'],
				'Scarabee' => $ligne['Scarabee'],
				'Lezard' => $ligne['Lezard'],
				'Mante_religieuse' => $ligne['Mante_religieuse'],
				'Souris' => $ligne['Souris'],
				'Mulot' => $ligne['Mulot'],
				'Alouette' => $ligne['Alouette'],
				'Rat' => $ligne['Rat'],
				'Tamanoir' => $ligne['Tamanoir']
			);
			var_dump($armee);
		}
	}
}