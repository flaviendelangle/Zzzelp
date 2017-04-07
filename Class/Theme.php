<?php


class Theme {

	public $instance;
	public $theme_actuel;
	public $themes;

	public function __construct($instance) {
		$this->instance = $instance;
	}

	/*
		Récupère le thème activé sur le compte de l'utilisateur
	*/
	public function get_UsedTheme() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT theme, mode_fond, valeur_fond FROM membres WHERE pseudo = :pseudo');
		$requete->bindValue(':pseudo', $this->instance->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		if(preg_match('#url\(\'(.*)\'\)#', $resultat['valeur_fond'], $resultats)) {
			$this->theme_actuel = array('theme' => $resultat['theme'], 'mode_fond' => $resultat['mode_fond'], 'valeur_fond' => $resultats[1]);
		}
		elseif(preg_match('#\#(.*)#', $resultat['valeur_fond'], $resultats)) {
			$this->theme_actuel = array('theme' => $resultat['theme'], 'mode_fond' => $resultat['mode_fond'], 'valeur_fond' => $resultats[1]);
		}
		else {
			$this->theme_actuel = array('theme' => $resultat['theme'], 'mode_fond' => $resultat['mode_fond'], 'valeur_fond' => '');
		}
	}

	/*
		Récupère tous les thèmes créés sur Zzzelp
	*/ 
	public function get_Themes($court) {
		$this->themes = array();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM themes');
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $theme) {
			if($court) {
				$this->themes[] = array(
								'ID' => $theme['ID'],
								'nom' => $theme['nom'],
								'createur' => $theme['createur'],
								'select' => ($this->theme_actuel['theme'] == $theme['ID'])
						);
			}
			else {
				$this->themes[] = $theme;
			}
		}
	}

	/*
		Met à jour les paramètres de l'utilisateur concernant les thèmes
	*/
	function save_UserParameters() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		if($_POST['theme_selection'] == 0) {
			$requete = $bdd->prepare('UPDATE membres SET mode_fond = :mode_fond, valeur_fond = :valeur_fond WHERE pseudo = :pseudo'); 
		}
		else {
			$requete = $bdd->prepare('UPDATE membres SET theme = :theme,  mode_fond = :mode_fond, valeur_fond = :valeur_fond WHERE pseudo = :pseudo');
			$requete->bindValue(':theme', htmlentities($_POST['theme_selection']), PDO::PARAM_STR);
		}
		$requete->bindValue(':mode_fond', htmlentities($_POST['mode_fond_joueur']), PDO::PARAM_STR);
		$requete->bindValue(':valeur_fond', (($mode_fond == 'defaut') ? '' : (($mode_fond == 'unie') ? '#'.$_POST['couleur_fond'] : "url('".$_POST['url_fond']."')")), PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->instance->pseudo, PDO::PARAM_STR);
		$requete->execute();
	}

	/*
		Sauvegarde la création d'un nouveau thème
	*/
	function save_NewTheme($theme) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('INSERT INTO themes (nom, createur, date_creation, date_MAJ, mode_fond, valeur_fond, entete_table, texte_entete, fond_contenu, fond_lisible, couleur_1_bouton, couleur_2_bouton, texte_bouton, ombre_bouton)
								VALUES (:nom, :createur, :date_creation, :date_MAJ, :mode_fond, :valeur_fond, :entete_table, :texte_entete, 
										:fond_contenu, :fond_lisible, :couleur_1_bouton, :couleur_2_bouton, :texte_bouton, :ombre_bouton)');
		
		$requete->bindValue(':nom', htmlentities($theme['nom']), PDO::PARAM_STR);
		$requete->bindValue(':createur', $this->instance->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':date_creation', time(), PDO::PARAM_INT);
		$requete->bindValue(':date_MAJ', time(), PDO::PARAM_INT);
		$requete->bindValue(':mode_fond', htmlentities($theme['mode_fond']), PDO::PARAM_STR);
		$requete->bindValue(':valeur_fond', htmlentities($theme['valeur_fond']), PDO::PARAM_STR);
		$requete->bindValue(':entete_table', htmlentities($theme['entete_table']), PDO::PARAM_STR);
		$requete->bindValue(':texte_entete', htmlentities($theme['texte_entete']), PDO::PARAM_STR);
		$requete->bindValue(':fond_contenu', htmlentities($theme['fond_contenu']), PDO::PARAM_STR);
		$requete->bindValue(':fond_lisible', htmlentities($theme['fond_lisible']), PDO::PARAM_STR);
		$requete->bindValue(':couleur_1_bouton', htmlentities($theme['couleur_1_bouton']), PDO::PARAM_STR);
		$requete->bindValue(':couleur_2_bouton', htmlentities($theme['couleur_2_bouton']), PDO::PARAM_STR);
		$requete->bindValue(':texte_bouton', htmlentities($theme['texte_bouton']), PDO::PARAM_STR);
		$requete->bindValue(':ombre_bouton', htmlentities($theme['ombre_bouton']), PDO::PARAM_STR);

		$requete->execute();
	}
}