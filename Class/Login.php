<?php

class Login {
	

	public function __construct() {
		if(isset($_POST['login'])) {
			$this->loginZzzelp();
		}
		elseif (isset($_POST['inscription'])) {
			$message = $this->create_NewAccount();
		}
		elseif(isset($_POST['reset_password'])) {
			$message = $this->reset_Passord();
		}
		include ("Vue/Vue_login.php");
	}

	/*
		Connecte le joueur à Zzzelp
	*/
	public function loginZzzelp() {
		$pseudo = trim($_POST['pseudo']);
		$password = trim($_POST['password']);
		if($pseudo !="" AND $password !="") {
			if($this->check_antibruteforce($pseudo, Zzzelp::$IP)) {
				$passhache = sha1($_POST['password']);
				$bdd =  Zzzelp::Connexion_BDD('Donnees_site');
				$requete = $bdd->prepare('SELECT COUNT(*) AS nombre, ID, pseudo FROM membres WHERE pseudo = :pseudo AND password = :password');
				$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
				$requete->bindValue(':password', $passhache, PDO::PARAM_STR);
				$requete->execute();
				$resultat = $requete->fetch(PDO::FETCH_ASSOC);
				if($resultat['nombre'] == 0) {
					$this->add_LogConnexion($pseudo, false);
					$message = "Données inexactes";
				}
				elseif(Zzzelp::$url_site != 'http://test.zzzelp.fr/' || in_array($resultat['pseudo'], array('delangle', 'nicolas35', 'Benichou', 'Blondin'))) {
				 	$_SESSION['ID'] = $resultat['ID'];
					$_SESSION['pseudo'] = $resultat['pseudo'];
					$this->add_LogConnexion($pseudo, true);
					if(isset($_GET['MF'])) {
						header('Location:'.Zzzelp::$url_site.'MF/tableau?serveur='.htmlentities($_GET['MF']).'&cf='.htmlentities($_GET['cf']).'&mode=auto&stock=1');
					}
					elseif(isset($_POST['mode'])) {
						if($_POST['mode'] == 'activation_pseudo') {
							header('Location:'.Zzzelp::$url_site.'activation_pseudo?serveur='.$_POST['serveur_activation'].'&pseudo='.$_POST['pseudo_activation'].'&token='.$_POST['token_activation']);
						}
					}
					else {
						header('Location:'.Zzzelp::$url_site);              
					}
				}
			}
			else {
				$message = "Trop grand nombre de tentatives";
				
			}
		}
		else {
			$message = "Données manquantes";
		}
	}

	/*
		Réinitialise le mot de passe d'un joueur
	*/
	public function reset_Passord() {
		if (preg_match("#^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$#", $_POST['mail'])) {
			$bdd = Zzzelp::Connexion_BDD('Donnees_site');
			$requete = $bdd->prepare('SELECT pseudo FROM membres WHERE email = :email');
			$requete->bindValue(':email', htmlentities($_POST['mail']), PDO::PARAM_STR);
			$requete->execute();
			$resultat = $requete->fetch(PDO::FETCH_ASSOC);
			if(!empty($resultat)) {
				$pseudo = $resultat['pseudo'];
				$mdp = Securite::Generateur_mdp();
				$mail = $_POST['mail'];
				$requete = $bdd->prepare('UPDATE membres SET password = :password WHERE pseudo = :pseudo');
				$requete->bindValue(':password', sha1($mdp), PDO::PARAM_STR);
				$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
				$requete->execute();
				$this->send_loginmail($mdp, $pseudo, $mail);
				$message = 'Mot de passe modifié\nRendez-vous sur votre addresse mail (vérifier les spams)';
			}
		}
		else {
			$message = 'Votre adresse mail est incorrecte';
		}
		return $message;	
	}

	/*
		Envoi un mail pour réinitialiser le mot de passe
	*/
	public function send_loginmail($mdp, $pseudo, $mail) {
		if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $mail)) {
				$passage_ligne = "\r\n";
			}
			else {
				$passage_ligne = "\n";
		}	
		$subject = 'Réinitialisation mot de passe';
		$message  = 'Bonjour '.'<br>';
		$message .= 'Votre mot de passe a bien été réinitialisé '.'<br>';
		$message .= 'Nouveau mot de passe pour le compte '.$pseudo.' : '.$mdp;

		$headers  = 'MIME-Version: 1.0' . "\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\n";
		$headers .= 'From: newpassword@zzzelp.fr' . "\n"; 		
		mail($mail,$subject,$message,$headers) OR die('Message');
	}

	/*
		Crée un nouveau compte sur Zzzelp
	*/

	public function create_NewAccount() {
		if ($_POST['mail'] != '' AND $_POST['password'] != '' AND $_POST['verif_password'] != '' AND $_POST['pseudo'] != '' AND preg_match("#^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$#", $_POST['mail'])) {
			if($_POST['password'] == $_POST['verif_password']) {
				$pseudo = htmlentities($_POST['pseudo']);
				$mail = htmlentities($_POST['mail']);
				$bdd = Zzzelp::Connexion_BDD('Donnees_site');
				$requete = $bdd->prepare('SELECT pseudo, email FROM membres WHERE pseudo = :pseudo OR email = :email');
				$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
				$requete->bindValue(':email', $mail, PDO::PARAM_STR);
				$requete->execute();
				$resultat = $requete->fetch(PDO::FETCH_ASSOC);
				if(strtolower($resultat['pseudo']) == strtolower($pseudo)) {
					return 'Le pseudo est déjà utilisé';
				}
				elseif ($resultat['email'] == $mail AND $mail != 'flaviendelangle@gmail.com') {
					return 'Adresse mail non disponible';
				}
				else {
					$requete = $bdd->prepare('INSERT INTO membres (pseudo,email,password,date_inscription,ordre_packs) VALUES(:pseudo,:email,:password,NOW(),:ordre_packs)');
					$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
					$requete->bindValue(':email', $mail, PDO::PARAM_STR);
					$requete->bindValue(':password', sha1(htmlentities($_POST['password'])), PDO::PARAM_STR);
					$requete->bindValue(':ordre_packs', '["Z1","Z2"]', PDO::PARAM_STR);
					$requete->execute();
					return 'Inscription réussie\nVous pouvez maintenant vous connecter';
				}
			}
			else {
				return 'Mots de passes non valides';
			}
		}
		else {
			return 'Donnees manquantes ou incorrectes';
		}
	}

	/*
		Vérifie que la personne essayant de se connecté ne l'a pas déjà fait un trop grand nombre de fois dernièrement
		(5 tentatives avec le même pseudo ou la même IP sur les 15 dernières minutes)
	*/
	public function check_antibruteforce($pseudo, $IP) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT COUNT(*) FROM tentatives_connexion WHERE IP = :IP AND date_connexion > :date_co AND reussite = 0');
		$requete->bindValue(':IP', $IP, PDO::PARAM_STR);
		$requete->bindValue(':date_co', (time() - 60*15), PDO::PARAM_INT);
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] > 5) {
			return false;
		}

		$requete = $bdd->prepare('SELECT COUNT(*) FROM tentatives_connexion WHERE pseudo = :pseudo AND date_connexion > :date_co AND reussite = 0');
		$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
		$requete->bindValue(':date_co', (time() - 60*15), PDO::PARAM_INT);		
		$requete->execute();
		if($requete->fetch(PDO::FETCH_NUM)[0] > 5) {
			return false;
		}
		return true;
	}

	/*
		Enregistre le log de connexion
	*/
	public function add_LogConnexion($pseudo, $reussite) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('INSERT INTO tentatives_connexion (pseudo, date_connexion, IP, reussite) VALUES(:pseudo, :date_co, :IP, :reussite)'); 
		$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
		$requete->bindValue(':date_co', time(), PDO::PARAM_STR);
		$requete->bindValue(':IP', Zzzelp::$IP, PDO::PARAM_STR);
		$requete->bindValue(':reussite', ($reussite ? 1 : 0), PDO::PARAM_STR);
		$requete->execute();
	}

}