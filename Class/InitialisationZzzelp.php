<?php

class InitialisationZzzelp {

	static public $pages =  array(
		'accueil' 					=> array('disponible' => true , 'section' => 'compte'			, 'mode' => 'global'),
		'activation_pseudo'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'global'),
		'admin' 					=> array('disponible' => true , 'section' => 'compte'			, 'mode' => 'admin'), 
		'aide_data'					=> array('disponible' => true , 'section' => ''					, 'mode' => 'global'),
		'aide_debutant'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'global'), 
		'aide_script'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'analysechasses' 			=> array('disponible' => true , 'section' => 'outils_joueur'	, 'mode' => 'global'),
		'autocomplete'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'publique'), 
		'compte' 					=> array('disponible' => true , 'section' => 'compte'			, 'mode' => 'global'), 
		'convois' 					=> array('disponible' => true , 'section' => 'outils_alliance'	, 'mode' => 'serveur'),
		'coordonnees' 				=> array('disponible' => true , 'section' => ''					, 'mode' => 'publique'), 
		'chasses' 					=> array('disponible' => true , 'section' => 'outils_joueur'	, 'mode' => 'global'), 
		'chasses_script'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'creationconvois'			=> array('disponible' => true , 'section' => 'gestion_alliance'	, 'mode' => 'serveur'), 
		'creationconvois_data'		=> array('disponible' => true , 'section' => ''					, 'mode' => 'serveur'), 
		'contact' 					=> array('disponible' => true , 'section' => 'compte'			, 'mode' => 'global'), 
		'distance' 					=> array('disponible' => true , 'section' => 'outils_joueur'	, 'mode' => 'global'), 
		'exports_data'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'serveur'), 
		'floods_script'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'fourmizzz'					=> array('disponible' => true , 'section' => 'compte'			, 'mode' => 'onglet_serveur'), 
		'generate_zzzelpscript'		=> array('disponible' => true , 'section' => ''					, 'mode' => 'publique'),
		'gestionalliance' 			=> array('disponible' => true , 'section' => 'gestion_alliance'	, 'mode' => 'serveur'), 
		'guerre_data'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'serveur'), 
		'guerre_script'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'HOF' 						=> array('disponible' => true , 'section' => 'outils_joueur'	, 'mode' => 'global'), 
		'login' 					=> array('disponible' => true , 'section' => ''					, 'mode' => 'publique'), 
		'logout' 					=> array('disponible' => true , 'section' => ''					, 'mode' => 'global'), 
		'niveaux_script'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'messagerie_script'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'MF' 						=> array('disponible' => true , 'section' => 'outils_alliance'	, 'mode' => 'serveur'), 
		'modules_script'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'news' 						=> array('disponible' => true , 'section' => 'compte'			, 'mode' => 'global'), 
		'parametres_script'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'parser_releves'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'publique'), 
		'ponte' 					=> array('disponible' => true , 'section' => 'outils_joueur'	, 'mode' => 'global'), 
		'rangs_script'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'rapport_script'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'RC_script'					=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'resume'					=> array('disponible' => true , 'section' => ''					, 'mode' => 'publique'),
		'CV'						=> array('disponible' => true , 'section' => ''					, 'mode' => 'publique'),
		'script' 					=> array('disponible' => true , 'section' => ''					, 'mode' => 'global'), 
		'script_beta'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'statistiques' 				=> array('disponible' => true , 'section' => 'outils_alliance'	, 'mode' => 'serveur'), 
		'statistiques_data' 		=> array('disponible' => true , 'section' => ''					, 'mode' => 'serveur'), 
		'stockage_floods'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'serveur'), 
		'stockage_chasses'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'serveur'), 
		'stockagesimulation'		=> array('disponible' => true , 'section' => ''					, 'mode' => 'publique'), 
		'stockageTDC'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'traceur' 					=> array('disponible' => true , 'section' => 'outils_joueur'	, 'mode' => 'serveur'), 
		'traceur_analyse'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'serveur'), 
		'traceur_data'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'serveur'), 
		'traceur_script'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'update_convois'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'serveur'), 
		'update_rapport'			=> array('disponible' => true , 'section' => ''					, 'mode' => 'serveur'), 
		'update_script'				=> array('disponible' => true , 'section' => ''					, 'mode' => 'externe'), 
		'XP' 						=> array('disponible' => true , 'section' => 'outils_joueur'	, 'mode' => 'global'), 
		'XP_data' 					=> array('disponible' => true , 'section' => ''					, 'mode' => 'global') 
							);
	public $pseudos;
	public $droit_theme;
	public $pseudo;
	public $comptes_fzzz;
	public $serveur;
	public $initialise;




	/*
		RESTANT A FAIRE

		A ADAPTER :
		- synchro RC sans messagerie guerre

		- analysechasses : utiliser le script de ZzzelpScript (à améliorer)
		- formulaire de contact (afficher en ZA pour les modos)
		- système d'envoi de news via la ZA
		- ajouter des boutons de nettoyage pour supprimer l'armée stockée et les autres données sensibles

		FENETRE DE GUERRE :
		- empêcher les dôme + loge si une loge est en cours
		- affichage mobile
	*/

	public function __construct($pseudo, $admin) {
		if(self::$pages[Zzzelp::$page]['mode'] != 'publique') {
			Historique::save_Log($admin);
		}
		/*
			Si la page est sensée être chargée depuis Zzzelp, on initialise la classe avec les donées de base du compte Zzzelp
		*/
		if($admin OR !in_array(self::$pages[Zzzelp::$page]['mode'], array('externe', 'publique')) OR (Zzzelp::$page == 'aide_data' AND !empty($pseudo))) {
			$this->pseudo = $pseudo;
			$this->get_Pseudos();
			$this->check_MemberZone();
			$this->initialise = true;
		}
		else {
			$this->initialise = false;
		}
	}


	/*
		Récupère les pseudos Fourmizzz associés à ce compte Zzzelp et initialise pour chacun d'entre eux la classe UtilisateurFourmizzz
	*/
	public function get_Pseudos() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM membres WHERE pseudo = :pseudo');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		$this->pseudos = array( 
			's1' => array('pseudo' => $resultat['pseudo_s1'], 'validation' => $resultat['verif_pseudo_s1']),
			's2' => array('pseudo' => $resultat['pseudo_s2'], 'validation' => $resultat['verif_pseudo_s2']),
		 	's3' => array('pseudo' => $resultat['pseudo_s3'], 'validation' => $resultat['verif_pseudo_s3']),
	 		's4' => array('pseudo' => $resultat['pseudo_s4'], 'validation' => $resultat['verif_pseudo_s4']),
	 		'test' => array('pseudo' => $resultat['pseudo_test'], 'validation' => $resultat['verif_pseudo_test']),
	 		'w1' => array('pseudo' => $resultat['pseudo_w1'], 'validation' => $resultat['verif_pseudo_w1'])
						 );
		$this->droit_theme = $resultat['droit_theme'];
		$this->mail = $resultat['email'];
		$this->comptes_fzzz = array();
		foreach(Fourmizzz::$serveurs as $serveur) {
			if($this->pseudos[$serveur]['pseudo'] != '' && $this->pseudos[$serveur]['validation'] == '1') {
				$this->comptes_fzzz[$serveur] = new Utilisateur_Fzzz($this->pseudos[$serveur]['pseudo'], $serveur, null);
				$this->comptes_fzzz[$serveur]->getAlliances_activated();
				$this->comptes_fzzz[$serveur]->getAlliances();
			}
			else {
				$this->comptes_fzzz[$serveur] = null;
			}
		}
		$bdd = null;
	}

	/*
		Vérifie que la table donnees_fourmizzz contient bien une entrée pour chaque pseudo Fourmizzz de l'utilisateur
		En crée une le cas échéant
	*/
	public function check_MemberZone() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		foreach(Fourmizzz::$serveurs as $serveur) {
			if($this->pseudos[$serveur]['validation']) {
				$requete = $bdd->prepare('SELECT COUNT(*) FROM donnees_fourmizzz WHERE serveur = :serveur AND pseudo = :pseudo');
				$requete->bindValue(':serveur', $serveur, PDO::PARAM_STR);
				$requete->bindValue(':pseudo', $this->pseudos[$serveur]['pseudo'], PDO::PARAM_STR);
				$requete->execute();
				$resultat = $requete->fetch(PDO::FETCH_NUM);
				if($resultat[0] == 0) {
					$this->create_newMemberZone($serveur);
				}
			}
		}
		$bdd = null;
	}

	/*
		Crée une entrée dans la table donnees_fourmizzz pour un pseudo Fourmizzz
	*/
	public function create_newMemberZone($serveur) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('INSERT INTO donnees_fourmizzz (pseudo, serveur, ID, MAJ) VALUES(:pseudo, :serveur, :ID, 0)');
		$requete->bindValue(':pseudo', $this->comptes_fzzz[$serveur]->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $serveur, PDO::PARAM_STR);
		$requete->bindValue(':ID', $this->comptes_fzzz[$serveur]->id, PDO::PARAM_INT);
		$requete->execute();
		$bdd = null;
	}



	/*
		Réinitialise le mot de passe du compte Zzzelp
	*/
	public function modify_Password() {
		$mdps = array('ancien' => htmlentities($_POST['ancien_password']), 'nouveau' => htmlentities($_POST['nouveau_password']), 'verif' => htmlentities($_POST['verif_password']));
		if($mdps['ancien'] != '' OR $mdps['nouveau'] != '' OR $mdps['verif'] != '') {
			if($mdps['ancien'] != '' AND $mdps['nouveau'] != '' AND $mdps['verif'] != '' AND $mdps['nouveau'] = $mdps['verif']) {
				$bdd = Zzzelp::Connexion_BDD('Donnees_site');
				$requete = $bdd->prepare('SELECT password FROM membres WHERE pseudo = :pseudo');
				$requete->bindValue(':pseudo', $this->pseudo);
				$requete->execute();
				$resultat = $requete->fetch(PDO::FETCH_ASSOC);
				if ($resultat['password'] == sha1($mdps['ancien'])) {
					$requete = $bdd->prepare('UPDATE membres SET password = :password WHERE pseudo = :pseudo');
					$requete->bindValue(':password', sha1($mdps['nouveau']), PDO::PARAM_STR);
					$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
					$requete->execute();
					$message = 'Mot de passe modifé';
				}
				else {
					$message = 'Mot de passe incorrecte';
				}
			}
			else {
				$message = '';
			}
		}
		else {
			$message = '';
		}
		$bdd = null;
		return $message;
	}

	/*
		Modifie les pseudos Fourmizzz du compte Zzzelp
	*/
	public function modify_Pseudos() {
		foreach(Fourmizzz::$serveurs as $serveur) {
			if ($this->pseudos[$serveur]['pseudo'] != $_POST['pseudo_'.$serveur]) {
				$bdd = Zzzelp::Connexion_BDD('Donnees_site');	
				$requete = $bdd->prepare('DELETE FROM Droits_alliance WHERE pseudo = :pseudo AND serveur = :serveur');
				$requete->bindValue(':pseudo', $this->pseudos[$serveur]['pseudo'], PDO::PARAM_STR);
				$requete->bindValue(':serveur', $serveur, PDO::PARAM_STR);
				$requete->execute();
				if($_POST['pseudo_'.$serveur] == '') {
					$pseudo = '';
				}
				else {
					$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($serveur));
					$requete = $bdd->prepare('SELECT Pseudo FROM BDDJoueurs WHERE Pseudo = :pseudo');
					$requete->bindValue(':pseudo', htmlentities($_POST['pseudo_'.$serveur]), PDO::PARAM_STR);
					$requete->execute();
					$pseudo = $requete->fetch(PDO::FETCH_ASSOC)['Pseudo'];
				}
				if(isset($pseudo)) {
					$bdd = Zzzelp::Connexion_BDD('Donnees_site');
					$requete = $bdd->prepare('SELECT ID, pseudo_'.$serveur.', verif_pseudo_'.$serveur.' FROM membres WHERE pseudo_'.$serveur.' = :pseudo');
					$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
					$requete->execute();
					$resultat = $requete->fetch(PDO::FETCH_ASSOC);
					if (empty($resultat) OR $pseudo == '' OR $resultat['verif_pseudo_'.$serveur] == 0) {
						if(!empty($resultat) AND $pseudo != '') {
							$requete = $bdd->prepare('UPDATE membres SET pseudo_'.$serveur.' = "" WHERE ID = :ID LIMIT 1');
							$requete->bindValue(':ID', $resultat['ID'], PDO::PARAM_INT);
							$requete->execute();							
						}
						$requete = $bdd->prepare('UPDATE membres SET pseudo_'.$serveur.' = :pseudo, verif_pseudo_'.$serveur.' = 0 WHERE pseudo = :compte LIMIT 1');
						$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
						$requete->bindValue(':compte', $this->pseudo, PDO::PARAM_STR);
						$requete->execute();
						$modifs = array('pseudo' => $pseudo, 'serveur' => $serveur);
						$this->get_Pseudos();
						return $modifs;
					}
				}
			}
		}
		return array();
	}

	/*
		Supprime un pseudo (icone poubelle)
	*/
	public function delete_PseudoFzzz() {
		$serveur = htmlentities($_GET['serveur']);
		if(in_array($serveur, Fourmizzz::$serveurs)) {
			$bdd = Zzzelp::Connexion_BDD('Donnees_site');
			$requete = $bdd->prepare('UPDATE membres SET pseudo_'.$serveur.' = "", verif_pseudo_'.$serveur.' = 0 WHERE pseudo_'.$serveur.' = :pseudo');
			$requete->bindValue(':pseudo', $this->pseudos[$serveur]['pseudo'], PDO::PARAM_STR);
			$requete->execute();
			$requete = $bdd->prepare('DELETE FROM Droits_alliance WHERE pseudo = :pseudo AND serveur = :serveur');
			$requete->bindValue(':pseudo', $this->pseudos[$serveur]['pseudo'], PDO::PARAM_STR);
			$requete->bindValue(':serveur', $serveur, PDO::PARAM_STR);
			$requete->execute();
			header('Location:'.Zzzelp::$url_page.'/accueil');
		}
	}

	/*
		Désactive l'aide pour les débutants
	*/
	public function disable_AideDebutant() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('UPDATE membres SET aide_zzzelp = 0 WHERE pseudo = :pseudo');
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->execute();		
	}



	/*
		Fonction principale permettant d'executer le code lié à chaque page
	*/
	public function load() {
		if(self::$pages[Zzzelp::$page]['disponible'] || $this->pseudo == Zzzelp::$pseudo_admin) {
			if(Zzzelp::$page == 'admin') {
				$admin = new Admin(false, $this);
				if($admin->check_auth()) {
					$admin->load();
				}
			}
			else if(self::$pages[Zzzelp::$page]['mode'] == 'externe') {
				$this->load_Pages_Externes();
			}
			else if(self::$pages[Zzzelp::$page]['mode'] == 'publique') {
				$this->load_Pages_Publiques();
			}
			else if(in_array(self::$pages[Zzzelp::$page]['mode'], array('serveur', 'onglet_serveur'))) {
				$this->load_Pages_Serveur();
			}
			else {
				$this->load_Pages_Globales();
			}
		}
		else {
			echo '<center>En maintenance</center>';
		}
	}












	private function load_Pages_Externes() {
		$script = new ZzzelpScript(htmlentities($_GET['pseudo']), htmlentities($_GET['serveur']), htmlentities($_GET['token']));
		if($script->autorise) {
			$this->pseudo = $script->utilisateur->get_PseudoZzzelp();
			$this->get_Pseudos();
			$this->check_MemberZone();

			/*
				Récupération de l'aide complète de Zzzelp au format JSON
			*/
			if(Zzzelp::$page == 'aide_script') {
				$script->show_results(FAQ::generate_FAQdata(($script->autorise) ? $script->utilisateur : ($this->initialise ? $this : null)));
			}

			/*
				Stockage des chasses
			*/
			elseif(Zzzelp::$page == 'chasses_script') {
				$action = new StockageAction($script->utilisateur);
				$action->save_Chasses(true);
			}

			/*
				Stockage des floods
			*/
			elseif(Zzzelp::$page == 'floods_script') {
				$action = new StockageAction($script->utilisateur);
				$cible = new Utilisateur_Fzzz(null, $script->serveur, htmlentities($_GET['cible']));
				$action->save_Flood(explode(',', substr(htmlentities($_GET['unites']),1,-1)), $cible);
				$script->show_results(array());
				
			}

			/*
				Récupération des données pour générer la modale de guerre
					- Récupération des données d'un joueur (joueur)
					- Stockage ou modification d'un message (stockage_message)
					- Mise à jour des niveaux d'un joueur (MAJ_niveaux)
					- Application d'un niveau analysé dans un RC (stockage_niveau)
			*/
			elseif(Zzzelp::$page == 'guerre_script') {
				$script->utilisateur->get_RightsZzzelp();
				if($script->utilisateur->droitsZzzelp > 0) {
					$guerre = new Guerre($script->utilisateur);
					if($_GET['mode'] == 'joueur') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $script->utilisateur->serveur, null);
						$script->show_results($guerre->get_DonneesJoueur($cible));
					}
					elseif($_GET['mode'] == 'joueur_light') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $script->utilisateur->serveur, null);
						$script->show_results($guerre->get_DonneesJoueurLight($cible));						
					}
					elseif($_GET['mode'] == 'stockage_message') {
						if($_GET['action'] == 'create') {
							$script->show_results($guerre->add_Message());
						}
						elseif($_GET['action'] == 'edit') {
							$guerre->edit_Message();
						}
						elseif($_GET['action'] == 'delete') {
							$guerre->delete_Message();
						}
					}
					elseif($_GET['mode'] == 'MAJ_niveaux') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $script->utilisateur->serveur, null);
						$guerre->save_Niveaux($cible);
						$script->show_results(1);
					}
					elseif($_GET['mode'] == 'stockage_alerte') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $script->utilisateur->serveur, null);
						$guerre->save_Alerte($cible);
						$script->show_results(1);
					}
					elseif($_GET['mode'] == 'stockage_dead') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $script->utilisateur->serveur, null);
						$guerre->save_Dead($cible);
						$script->show_results(1);
					}
					elseif($_GET['mode'] == 'stockage_armee') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $script->utilisateur->serveur, null);
						$guerre->save_ArmeeAnalyse($cible);
						$script->show_results(1);
					}
					elseif($_GET['mode'] == 'stockage_niveau') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $script->utilisateur->serveur, null);
						$guerre->save_NiveauAnalyse($cible);
						$script->show_results(1);
					}
					elseif($_GET['mode'] == 'stockage_RC') {
						$guerre->save_RC();
						$script->show_results(1);
					}
					elseif($_GET['mode'] == 'lien_forum') {
						$script->show_results($guerre->get_urlForum($_GET['cible']));
					}
					elseif($_GET['mode'] == 'stockage_FI') {
						$script->show_results($guerre->initialiser_FI($_POST['valeurs']));
					}
					elseif($_GET['mode'] == 'add_player_FI') {
						$script->show_results($guerre->add_player_FI($_POST));
					}
					elseif($_GET['mode'] == 'statistiques_FI') {
						$script->show_results($guerre->get_RecapGuerreFI($_GET['ID_forum']));
					}
				}
			}

			/*
				Récupération des données concernant la messagerie Zzzelp
				Affichage dans Fourmizzz des news
			*/
			elseif(Zzzelp::$page == 'messagerie_script') {
				if($_GET['action'] == 'MP_lu') {
					Marquer_MP_lu(htmlentities($_GET['id']), $pseudo, $serveur);
				}
				elseif($_GET['action'] == 'suppression_MP') {
					Supprimer_MP($_GET['id'], $pseudo, $serveur);
				}
				else {
					$script->show_results($script->utilisateur->get_Messages());
				}				
			}

			/*
				Récupération du code des modules :
					- Module interface
					- Module interface privé
					- Module traceur
				Système à revoir
			*/
			elseif(Zzzelp::$page == 'modules_script') {
				$script->load_Modules();
			}
			/*
				Stockage des données du joueur :
					- Constructions
					- Recherches
					- Ouvrières
					- Paramètres Zzzelpfloods
					- Paramètres ZzzelpScript (à venir)
				*/
			elseif(Zzzelp::$page == 'niveaux_script') {
				if($_GET['lieu'] == 'construction') {
					$script->utilisateur->update_ConstructionsScript();
				}
				elseif($_GET['lieu'] == 'laboratoire') {
					$script->utilisateur->update_RecherchesScript();
				}
				elseif($_GET['lieu'] == 'ouvrieres') {
					$script->utilisateur->update_OuvrieresScript();
				}
				elseif($_GET['lieu'] == 'armee') {
					$script->utilisateur->update_ArmeeScript();
				}
				elseif($_GET['lieu'] == 'zzzelpfloods') {
					$script->save_ParametresZzzelpfloodExterne();
				}
				$script->show_results(array());			
			}

			/*
				Récupération des données stockées par ZzzelpScript dont :
					- Menu
					- Paramètres
					- Membres de l'alliance
					...
			*/
			elseif(Zzzelp::$page == 'parametres_script') {
				$script->get_ParametresScript($this);
			}

			/*
				Récupération des rangs
			*/
			elseif(Zzzelp::$page == 'rangs_script') {
				$rangs = new RangsZzzelp($script->serveur);
				$rangs->compute_ModeAjax($script->utilisateur);
				$script->show_results($rangs->rangs);
			}

			/*
				Stockage d'un rapport de compte Zzzelp
			*/
			elseif(Zzzelp::$page == 'rapport_script') {
				$script->create_RapportJoueur();
				$script->show_results(1);
			}

			/*
				Stock un RC envoyé par ZzzelpScript
			*/
			elseif(Zzzelp::$page == 'RC_script') {
				$script->show_results(Guerre::save_RCAuto($script));
			}


			/*
				Stockage des TDC envoyés par le traceur
			*/
			elseif(Zzzelp::$page == 'stockageTDC') {
				$script->utilisateur->getAlliances_activated();
				$alliance = (count($script->utilisateur->alliances_activated) > 0) ? $script->utilisateur->alliances_activated[0]->alliance : '';
				$releves = json_decode($_POST['releves'], true);
				Traceur::save_Releves($releves, $alliance);
				$script->show_results(array());
			}

			/*
				Traceur : récupèration des données
			*/
			elseif(Zzzelp::$page == 'traceur_script') {
				$traceur = new Traceur($script->utilisateur);
				$traceur->get_Data();
			}

			/*
				Met à jour un paramètre de ZzzelpScript
			*/
			elseif(Zzzelp::$page == 'update_script') {
				$script->MAJ_parametre();
				$script->show_results(array());
			}

		}
	}










	private function load_Pages_Publiques() {
		/*
			Autocomplétion
			Modes disponibles :
				- pseudo
				- 
		*/
		if(Zzzelp::$page == 'autocomplete') {
			$autocompletion = new AutoComplete($_GET['mode']);
		}
		/*
			Récupère les données publiques des joueurs demandées sous la forme :
						{ pseudo : pseudo, ID : ID, x : x, y : y}
		*/
		elseif(Zzzelp::$page == 'coordonnees') {
			$joueurs = explode(',', substr(htmlentities($_GET['joueurs']), 1, -1));
			$alliances = explode(',', substr(htmlentities($_GET['alliances']), 1, -1));
			$serveur = htmlentities($_GET['serveur']);
			$coordonnees = new TableauCoordonnees($serveur, $alliances, $joueurs);
			$coordonnees->show_json();
		}

		/*
			Génère un fichier unique contenant la totalité des dépendances publiques de ZzzelpScript
		*/
		elseif(Zzzelp::$page == 'generate_zzzelpscript') {
			ZzzelpScript::generate_JavaScriptPublic();
		}

		/*
			Parse des relevés de flood ou de convois
		*/
		elseif(Zzzelp::$page == 'parser_releves') {
			if($_POST['mode'] == 'floods') {
				echo json_encode(Parser::parse_Floods($_POST['releves']));
			}
			elseif($_POST['mode'] == 'chasses') {
				echo json_encode(Parser::parse_Chasses($_POST['releves']));
			}			
		}

		/*
			Affiche des exemples de codes intéressants
		*/
		elseif(Zzzelp::$page == 'resume') {
			$menu = new MenuZzzelp($this, 'global');
			require("Vue/Vue_CV.php");
		}

		elseif(Zzzelp::$page == 'CV') {
			$menu = new MenuZzzelp($this, 'global');
			require("Vue/Vue_CV.php");
		}

		/*
			Stock les résultats d'une simulation pour Zzzelp
		*/
		elseif(Zzzelp::$page == 'stockagesimulation') {
			if($_GET['mode'] == 'chasse') {
				$result = Chasses::save_Simulation();
				echo json_encode(array('etat' => 2, 'resultat' => $result));
			}
		}

	}

	private function load_Pages_Globales() {
		$menu = new MenuZzzelp($this, 'global');
		/*
			Accueil du site
		*/
		if(Zzzelp::$page == 'accueil') {
			require("Vue/Vue_accueil.php");
		}

		/*
			Activations d'un pseudo Fourmizzz depuis ZzzelpScript
		*/
		elseif(Zzzelp::$page == 'activation_pseudo') {
			$admin = new Admin(true, $this);
			$admin->validation_pseudo();
		}

		/*
			Récupération de l'aide complète de Zzzelp au format JSON
		*/
		elseif(Zzzelp::$page == 'aide_data') {
			echo json_encode(array(
				'etat' => 2,
				'resultats' => FAQ::generate_FAQdata($this)
			));
		}

		/*
			Actions liées à l'aide pour débutant
		*/
		elseif(Zzzelp::$page == 'aide_debutant') {
			if($_GET['mode'] == 'desactiver_aide') {
				$this->disable_AideDebutant();
			}
		}

		/*
			Analyseur de chasses
		*/
		elseif(Zzzelp::$page == 'analysechasses') {
			require("Vue/Vue_analyse_chasses.php");
		}

		/*
			Simulation des chasses
		*/
		elseif(Zzzelp::$page == 'chasses') {
			$chasses = new Chasses($this);
			$chasses->get_LastTDCs();
			$chasses->get_NiveauxChasse();
			require("Vue/Vue_preparation_chasses.php");
		}

		/*
			Gestion du compte Zzzelp
			Onglets :
				- Gérer votre compte (accueil)
				- Profil Fourmizzz (s1|s2|s3|s4|test)
		*/
		elseif(Zzzelp::$page == 'compte') {
			if(Zzzelp::$onglet == 'accueil') {
				if(isset($_POST['modif_generale'])) {
					$message = $this->modify_Password();
					$modifications = $this->modify_Pseudos();
					if ($modifications != array()) {
						$modif_pseudo = True;
					}
				}
				elseif($_GET['code'] == 'suppressionpseudo') {
					$this->delete_PseudoFzzz();
				}
				require("Vue/Vue_compte_accueil.php");
			}
			elseif(Zzzelp::$onglet == 'smileys') {
				$smileys = new Smileys($this);
				if(!empty($_GET['mode'])) {
					$mode = htmlentities($_GET['mode']);
					if($mode == 'creer') {
						$smileys->create_Pack();
					}
					else if($mode == 'modifier') {
						$smileys->update_Pack();
					}
				}
				else {
					if(!empty($_POST['ordre_packs'])) {
						$smileys->save_SmileysParameters();
					}
					$smileys->get_Smileys(true);
					require("Vue/Vue_compte_smileys.php");
				}
			}
			elseif(Zzzelp::$onglet == 'theme') {
				$themes = new Theme($this);
				if(!empty($_POST['modif_theme'])) {
					$themes->save_UserParameters();
				}
				if(!empty($_POST['creation_theme'])) {
					$themes->save_NewTheme(json_decode($_POST['creation_theme'], true));
				}
				$themes->get_UsedTheme();
				$themes->get_Themes(true);
				require("Vue/Vue_compte_theme.php");
			}
		}

		/*
			Outils de distance
		*/
		elseif(Zzzelp::$page == 'distance') {
			require("Vue/Vue_distance.php");
		}

		/*
			Analyse de combat
		*/
		elseif(Zzzelp::$page == 'HOF') {
			require("Vue/Vue_HOF.php");
		}

		/*
			Deconnexion de Zzzelp
		*/
		elseif(Zzzelp::$page == 'logout') {
			Securite::logout();
		}

		/*
			News concernant Zzzelp
		*/
		elseif(Zzzelp::$page == 'news') {
			require("Vue/Vue_news.php");
		}

		/*
			Simulateur de pontes
		*/
		elseif(Zzzelp::$page == 'ponte') {
			$zones = array(
				array('id' => 'temps', 'nom' => 'Temps nécessaire'),
				array('id' => 'HOF', 'nom' => 'Années de ponte'),
				array('id' => 'attaque', 'nom' => 'Attaque'),
				array('id' => 'defense', 'nom' => 'Défense'),
				array('id' => 'vie', 'nom' => 'Vie')
						);
			require("Vue/Vue_ponte.php");
		}

		/*
			Installation de ZzzelpScript
		*/
		elseif(Zzzelp::$page == 'script') {
			require("Vue/Vue_script.php");
		}

		/*
			Simulateur de combat
		*/
		elseif(Zzzelp::$page == 'XP') {
			$parametres = Combat::get_Parameters($this->comptes_fzzz);

			//$p = Recuperation_parametres_auto();
			require("Vue/Vue_XP.php");
		}

		elseif(Zzzelp::$page == 'XP_data') {
			$combat = new Combat('simulateur');
			$combat->create_Simulation(true);
		}
	}










	private function load_Pages_Serveur() {
		$menu = new MenuZzzelp($this, 'global');
		$this->serveur = (self::$pages[Zzzelp::$page]['mode'] == 'onglet_serveur') ? Zzzelp::$onglet : (!empty($_GET['serveur']) ? htmlentities($_GET['serveur']) : htmlentities($_POST['serveur']));
		if(in_array($this->serveur, Fourmizzz::$serveurs)) {
			$compte = $this->comptes_fzzz[$this->serveur];
			if($this->pseudos[$this->serveur]['validation'] != '1') {
				return;
			}
			/*
				Envoi des convois
			*/
			if(Zzzelp::$page == 'convois') {
				$membre_alliance = new MembreAlliance(htmlentities($_GET['alliance']), $compte->pseudo, htmlentities($_GET['serveur']));
				if($membre_alliance->droit > 0) {
					$convois = new Convois($compte, $membre_alliance);
					$alliance = new Alliance($membre_alliance);
					$alliance->get_ParametersConvois();
					/*
						Convois via répartition journalière / hebdomadaire
					*/
					if(Zzzelp::$onglet == 'accueil' AND $alliance->parametres_convois['methode_convois'] == 'regulier') {
						$convois->get_ConvoisRestants();
						$convois->get_DerniersConvois();
						require("Vue/Vue_accueil_convois_mat.php");
					}

					/*
						Convois à la demande
					*/
					elseif(Zzzelp::$onglet == 'demande' AND $alliance->parametres_convois['methode_convois'] == 'demande') {
						$convois->get_Demandes();
						require("Vue/Vue_convois_demande.php");
					}

					/*
						Stockage d'un convois en BDD
					*/
					elseif(Zzzelp::$onglet == 'modification') {
						if($alliance->parametres_convois['methode_convois'] == 'regulier') {
							if(isset($_POST['Modification_manuelle'])) {
								$convois->add_ConvoisManuel();
							}
							else {
								$convois->add_ConvoisAuto();
							}
							header('Location:'.Zzzelp::$url_page.'/accueil?ressource=materiaux&alliance='.$membre_alliance->alliance.'&serveur='.$compte->serveur);
						}
						else {
							$convois->add_ConvoisDemande();
							header('Location:'.Zzzelp::$url_page.'/demande?ressource=materiaux&alliance='.$membre_alliance->alliance.'&serveur='.$compte->serveur);
						}			
					}

					/*
						Stockage d'une nouvelle demande
					*/
					elseif (Zzzelp::$onglet == 'stockage_demande') {
						$convois->save_Demande();
						header('Location:/convois/demande?ressource='.$_GET['ressource'].'&alliance='.$_GET['alliance'].'&serveur='.$_GET['serveur']);
					}

					/*
						Choix de la valeur du convois à faire
					*/
					elseif(Zzzelp::$onglet == 'preparation') {
						$convois->prepare_Convois();
						require("Vue/Vue_preparation_convois.php");
					}
				}
			}

			/*
				Création des convois : non AJAX
			*/
			if(Zzzelp::$page == 'creationconvois') {
				$chef = new MembreAlliance(htmlentities($_GET['alliance']), $compte->pseudo, htmlentities($_GET['serveur']));
				if($chef->check_droit_outil('gestion_convois')) {
					if(Zzzelp::$onglet == 'interne') {
						$alliance = new CreationConvois($chef);
						$alliance->build_alliance();
						$alliance->get_ParametersConvois();
						$alliance->get_Etables();		
						$alliance->get_TDCMoyens();
						require ("Vue/Vue_repartition_convois.php");
					}
					elseif(Zzzelp::$onglet == 'externe') {
						include ("Vue/Vue_optimisation_convois.php");
					}
					elseif(Zzzelp::$onglet == 'stockage') {
						$alliance = new CreationConvois($chef);
						$alliance->save_Convois();
						header('Location:/gestionalliance/convois?serveur='.$alliance->serveur.'&alliance='.$alliance->alliance);
					}
				}
			}

			/*
				Création des convois : AJAX
			*/
			elseif(Zzzelp::$page == 'creationconvois_data') {
				$chef = new MembreAlliance(htmlentities($_POST['alliance']), $compte->pseudo, htmlentities($_POST['serveur']));
				if($chef->check_droit_outil('gestion_convois')) {
					$alliance = new CreationConvois($chef);
					$alliance->build_alliance();
					$alliance->get_ParametersConvois();
					$alliance->compute_convois();
				}
			}

			/*
				Récupération des données pour les exports de la gestion des alliances
			*/
			elseif(Zzzelp::$page == 'exports_data') {
				$chef = new MembreAlliance(htmlentities($_GET['alliance']), $compte->pseudo, $compte->serveur);
				if($chef->check_droit_outil('chef')) {
					$joueurs = explode(',', substr(htmlentities($_GET['joueurs']), 1, -1));
					$alliance = new Alliance($chef);
					$alliance->build_alliance();
					$alliance->load_Exports(htmlentities($_GET['section']), $joueurs, htmlentities($_GET['debut']), htmlentities($_GET['fin']));
				}			
			}

			/*
				Profil Fourmizzz
			*/
			elseif(Zzzelp::$page == 'fourmizzz') {
				$script = new ZzzelpScript(null, null, null, $compte);
				if(!empty($_POST['MAJ_niveaux'])) {
					$compte->update_Infos();
					$script->save_ParametresZzzelpScript();
				}
				$compte->getAlliances();
				$compte->getInfosZzzelp();
				$compte->get_SondeAntisonde();
				$script->utilisateur->get_RightsZzzelp();
				$script->get_ParametresZzzelpScript();
				require("Vue/Vue_compte_serveur.php");
			}

			/*
				Gestion des alliances
				Onglets :
					- Gestion des droits (general)
					- Tableau des membres (membres)
					- Gestion des convois (convois)
					- Gestion des rangs (rangs)
					- Gestion du MF (floods)
					- Exports de l'alliance (exports)
					- Rapports des joueurs (rapports)
			*/
			elseif(Zzzelp::$page == 'gestionalliance') {
				$chef = new MembreAlliance(htmlentities($_GET['alliance']), $compte->pseudo, $compte->serveur);
				$droits = array('general' => 'chef', 'membres' => 'gestion_membres', 'convois' => 'gestion_convois', 'rangs' => 'gestion_rangs', 'flood' => 'gestion_MF', 'exports' => 'chef', 'rapports' => 'chef', 'armees' => 'chef');		  
				if($chef->check_droit_outil($droits[Zzzelp::$onglet]) OR (Zzzelp::$onglet == 'floods' AND $chef->get_DroitsGestionMF() > 0)) {
					$alliance = new Alliance($chef);
					if(Zzzelp::$onglet == 'general') {
						if(isset($_POST['Droits_alliance'])) {
							$alliance->update_DroitsAlliance();
						}
						$alliance->get_Parameters();
						require("Vue/Vue_gestionalliance_general.php");
					}
					elseif(Zzzelp::$onglet == 'membres') {
						/*
							On regarde si une action est à effectuer (renvoyer un joueur, changer un rang...)
						*/
						if(!empty($_GET['action'])) {
							/*
								Validation du pseudo Fourmizzz
							*/
							if($_GET['action'] == 'validation') {
								$alliance->valider_CompteFzzz(htmlentities($_GET['pseudo']), ($_GET['activation'] == '1'));
							}
							else {
								$alliance->update_Droit(htmlentities($_GET['action']), htmlentities($_GET['pseudo']));
							}		
						}
						$alliance->build_alliance();
						$alliance->complete_InfosZzzelp();
						$alliance->get_ActivationsMembres();
						require("Vue/Vue_gestionalliance_membres.php");
					}
					elseif(Zzzelp::$onglet == 'convois') {
						/*
							On met à jour les paramètres
						*/
						if(!empty($_POST['modif_parametres'])) {
							$alliance->update_GestionConvois();
						}
						$alliance->build_alliance();
						$alliance->get_Convois();
						require("Vue/Vue_gestionalliance_convois.php");
					}
					elseif(Zzzelp::$onglet == 'exports') {
						require("Vue/Vue_gestionalliance_exports.php");	
					}
					elseif(Zzzelp::$onglet == 'floods') {
						/*
							On met à jour les paramètres
						*/
						if(!empty($_POST['Parametres_MF'])) {
							$alliance->save_ParametresMF();
						}
						$alliance->get_ParametersMF();
						$alliance->get_ParametersGhosts();
						require("Vue/Vue_gestionalliance_floods.php");
					}
					elseif (Zzzelp::$onglet == 'rangs') {
						$rangs = new RangsZzzelp($compte->serveur);
						$compte->get_obj_Alliances_activated();
						$rangs->compute_ModeGestion($compte, $chef);
						/*
							On met à jour les rangs
						*/
						if(!empty($_POST['rangs_details'])) {
							$rangs->update_RangsGestion();
						}
						$rangs->get_RangsGestion();
						require("Vue/Vue_gestionalliance_rangs.php");
					}
					elseif(Zzzelp::$onglet == 'rapports') {
						/*
							On met à jour les paramètres
						*/
						$alliance->build_alliance();
						if(!empty($_POST['nouveau_rapport'])) {
							$alliance->create_RapportJoueur();
						}
						$alliance->get_RapportsJoueurs();
						include ("Vue/Vue_gestionalliance_rapports.php");
					}
					elseif(Zzzelp::$onglet == 'armees' AND in_array($alliance->alliance, array('ZOO', 'FCGB'))) {
						$alliance->build_alliance();
						$guerre = new Guerre($compte);
						$armees = array_merge($alliance->get_ArmeesRapports(), $guerre->get_ArmeesConnues());
						$armees = $guerre->get_AlliancesCibles($armees);
						include ("Vue/Vue_statistiques_armees.php");
					}
				}
			}

			/*
				Récupération des données de guerre
				Onglets :
					- Données d'un seul joueur (joueur)
					- Stockage d'un message (stockage_message)
			*/
			elseif(Zzzelp::$page == 'guerre_data') {
				$compte->get_RightsZzzelp();
				if($compte->droitsZzzelp > 0) {
					$guerre = new Guerre($compte);
					if($_GET['mode'] == 'joueur') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $compte->serveur, null);
						echo json_encode(array('etat' => 2, 'resultats' => $guerre->get_DonneesJoueur($cible)));
					}
					elseif($_GET['mode'] == 'stockage_message') {
						if($_GET['action'] == 'create') {
							echo json_encode(array('etat' => 2, 'resultats' => $guerre->add_Message()));
						}
						elseif($_GET['action'] == 'edit') {
							$guerre->edit_Message();
							echo '{"resultats":1, "etat":2}';
						}
						elseif($_GET['action'] == 'delete') {
							$guerre->delete_Message();
							echo '{"resultats":1, "etat":2}';
						}
					}
					elseif($_GET['mode'] == 'bddcombats') {
						echo json_encode($guerre->get_Combats($guerre->get_ListeMembresRCs(), htmlentities($_GET['debut']), htmlentities($_GET['fin'])));
					}
					elseif($_GET['mode'] == 'MAJ_niveaux') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $compte->serveur, null);
						$guerre->save_Niveaux($cible);
						echo '{"resultats":1, "etat":2}';
					}
					elseif($_GET['mode'] == 'stockage_alerte') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $compte->serveur, null);
						$guerre->save_Alerte($cible);
						echo '{"resultats":1, "etat":2}';
					}
					elseif($_GET['mode'] == 'stockage_armee') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $script->serveur, null);
						$guerre->save_ArmeeAnalyse($cible);
						echo '{"resultats":1, "etat":2}';
					}
					elseif($_GET['mode'] == 'stockage_niveau') {
						$cible = new Utilisateur_Fzzz($_GET['cible'], $compte->serveur, null);
						$guerre->save_NiveauAnalyse($cible);
						echo '{"resultats":1, "etat":2}';
					}			
					elseif($_GET['mode'] == 'stockage_RC') {
						$guerre->save_RC();
						echo '{"resultats":1, "etat":2}';
					}
				}
			}

			/*
				Multiflood
				Onglets :
					- Préparation du MF (preparation)
					- Import des TDC via Fourmizzz (import)
					- Multiflood (tableau)
			*/
			elseif(Zzzelp::$page == 'MF') {
				$MF = new Multiflood($compte);
				if(Zzzelp::$onglet == 'preparation') {
					$MF->set_alliance(htmlentities($_GET['alliance']));
					if($MF->is_MF_enable()) {
						/*
							On supprime le flood demandé
						*/
						if(!empty($_GET['ID_flood'])) {
							$MF->delete_flood(htmlentities($_GET['ID_flood']));
						}
						$MF->get_FloodJoueur();
						require("Vue/Vue_preparation_MF.php");
					}
				}
				elseif(Zzzelp::$onglet == 'import') {
					$alliances  =  str_replace(' ','',htmlentities($_POST['alliances_auto']));
					$joueurs = str_replace(' ','',htmlentities($_POST['joueurs_auto']));
					header('Location:http://'.$compte->serveur.'.fourmizzz.fr/Armee.php?alliances=['.$alliances.']&joueurs=['.$joueurs.']&zmf');
				}
				elseif(Zzzelp::$onglet == 'tableau') {
					$MF->prepare_table();
					require("Vue/Vue_MF.php");
				}
			}


			/*
				Statistiques
			*/
			elseif(Zzzelp::$page == 'statistiques') {
				$role = new MembreAlliance(htmlentities($_GET['alliance']), $compte->pseudo, htmlentities($_GET['serveur']));
				$sections = array(
								array('titre' => 'Zzzelp', 'id' => 'zzzelp'),
								array('titre' => 'Floods', 'id' => 'floods')
							);
				$serveur = $_GET['serveur'];
				$alliance = $_GET['alliance'];
				if($role->check_activation_outil('convois') AND $role->check_droit_outil('convois')) {
					$sections[] = array('titre' => 'Convois', 'id' => 'convois');
				}	
				if($role->check_droit_outil('gestion_membres')) {
					$sections[] = array('titre' => 'Membres', 'id' => 'membres');
				}
				require('Vue/Vue_statistiques.php');			
			}

			/*
				Statistiques : import des données
			*/
			elseif(Zzzelp::$page == 'statistiques_data') {
				$section = $_GET['section'];
				$debut = htmlentities($_GET['debut']) + 86400;
				$fin = htmlentities($_GET['fin']) + 86400;
				$alliance = htmlentities($_GET['alliance']);
				$stats = new Statistiques($section, $debut, $fin, $compte, $alliance);
			}


			/*
				Stockage des chasses
			*/
			elseif(Zzzelp::$page == 'stockage_chasses') {
				$action = new StockageAction($compte);
				$action->save_Chasses(false);
			}

			/*
				Stockage des floods
			*/
			elseif(Zzzelp::$page == 'stockage_floods') {
				$action = new StockageAction($compte);
				$action->save_Floods(json_decode($_POST['releves'], true));
			}

			/*
				Traceur
			*/
			elseif(Zzzelp::$page == 'traceur') {
				include ("Vue/Vue_traceur.php");
			}

			/*
				Traceur : Analyse complexe de données
			*/
			elseif(Zzzelp::$page == 'traceur_analyse') {
				$traceur = new Traceur($compte);
				if($_GET['mode'] == 'chaine') {
					$traceur->analyse_Chaine();
				}
			}

			/*
				Traceur : récupèration des données
			*/
			elseif(Zzzelp::$page == 'traceur_data') {
				$traceur = new Traceur($compte);
				$traceur->get_Data();
			}

			/*
				Modification d'un convois à partir de la zone de gestion
			*/
			elseif(Zzzelp::$page == 'update_convois') {
				$chef = new MembreAlliance(htmlentities($_GET['alliance']), $compte->pseudo, htmlentities($_GET['serveur']));
				if($chef->check_droit_outil('gestion_convois')) {
					$alliance = new Alliance($chef);
					$alliance->build_alliance();
					if($_GET['mode'] == 'modifier') {
						$alliance->update_Convois();
					}
					elseif($_GET['mode'] == 'creer') {
						$alliance->add_Convois();
					}
					elseif($_GET['mode'] == 'supprimer') {
						$alliance->delete_Convois();
					}
					elseif($_GET['mode'] == 'demandes') {
						$alliance->update_DemandeConvois();
					}
				}
			}

			/*
				Modification d'un rapport via la gestion des alliances
			*/
			elseif(Zzzelp::$page == 'update_rapport') {
				$chef = new MembreAlliance(htmlentities($_GET['alliance']), $compte->pseudo, htmlentities($_GET['serveur']));
				if($chef->check_droit_outil('gestion_membres')) {
					$alliance = new Alliance($chef);
					$alliance->build_alliance();
					if($_GET['mode'] == 'edit') {
						$alliance->update_RapportJoueur(htmlentities($_GET['ID']));
					}
					elseif($_GET['mode'] == 'delete') {
						$alliance->delete_RapportJoueur(htmlentities($_GET['ID']));
					}
				}
			}
		}
	}
}