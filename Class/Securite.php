<?php

class Securite {

	/*
		Génère un token aléatoire de distance par défaut 6
		Utilisé pour l'authentification de ZzzelpScript
	*/
	
	public static function newToken($longueur=6){
		$token = "";
		$possible = "01234567890123456789abcdefghijklmnopqrtuvwxyz";
		$longueurMax = strlen($possible);
		if ($longueur > $longueurMax) {
			$longueur = $longueurMax;
		}
		$i = 0;
		while ($i < $longueur) {
			$caractere = substr($possible, mt_rand(0, $longueurMax-1), 1);
			if (!strstr($token, $caractere)) {
				$token .= $caractere;
				$i++;
			}
		}
		return $token;
	}

	/*
		Génère un mot de passe pour réinitialiser celui de Zzzelp
	*/
	public static function Generateur_mdp($longueur=15) {
		$mdp = "";
		$possible = "01234567890123456789abcdefghijklmnopqrtuvwxyzABCDEFGHIJKLMNOPQRTUVWXYZ";
		$longueurMax = strlen($possible);
		if ($longueur > $longueurMax) {
			$longueur = $longueurMax;
		}
		$i = 0;
		while ($i < $longueur) {
			$caractere = substr($possible, mt_rand(0, $longueurMax-1), 1);
			if (!strstr($mdp, $caractere)) {
				$mdp .= $caractere;
				$i++;
			}
		}
		return $mdp;
	}


	/*
		Vérifie que l'utilisateur a bien le droit d'utiliser un module de ZzzelpScript
		A adapter pour la nouvelle organisation de ZzzelpScript
	*/
	public static function Droits_modules($module, $pseudo, $serveur) {
		$droits_modules = array(
			'interface_prive' => array(
				's1' => array('delangle'),
				's2' => array('delangle'),
				's3' => array('delangle'),
				's4' => array('delangle'),
				'test' => array('delangle'),
				'w1' => array('delangle'),
			),
			'traceur' => array(
				's1' => array('delangle'),
				's2' => array('delangle'),
				's3' => array('delangle'),
				's4' => array('delangle'),
				'test' => array('delangle'),
				'w1' => array('delangle'),
			)
		);
		if(!isset($droits_modules[$module][$serveur])) {
			return false;
		}
		if(in_array($pseudo, $droits_modules[$module][$serveur])) {
			return True;
		}
		else {
			return False;
		}
	}

	/*
		Déconnecte l'utilisateur de Zzzelp
	*/
	public static function logout() {
	    $_SESSION = array();
	    session_destroy();
	    header('Location:'.Zzzelp::$url_site.'login');    
	}
}
