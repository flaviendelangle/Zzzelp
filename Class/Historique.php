<?php

class Historique {
	


	public static function save_Log($admin) {
		$acces = InitialisationZzzelp::$pages[Zzzelp::$page]['mode'];
		$pseudo = ($acces == 'publique') ? '' : (($acces == 'externe') ? htmlentities($_GET['pseudo']) : $_SESSION['pseudo']);
		$bdd = Zzzelp::Connexion_BDD('LogsZzzelp');
		$requete = $bdd->prepare('INSERT INTO logs_Recents (acces, page, onglet, pseudo, IP, url, GET_var, POST_var, date_acces, admin) 
								  VALUES (:acces, :page, :onglet, :pseudo, :IP, :url, :GET_var, :POST_var, :date_acces, :admin)');
		$requete->bindValue(':acces', $acces, PDO::PARAM_STR);
		$requete->bindValue(':page', Zzzelp::$page, PDO::PARAM_STR);
		$requete->bindValue(':onglet', Zzzelp::$onglet, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
		$requete->bindValue(':IP', Zzzelp::$IP, PDO::PARAM_STR);
		$requete->bindValue(':url', Zzzelp::$url, PDO::PARAM_STR);
		$requete->bindValue(':GET_var', addslashes(json_encode($_GET)), PDO::PARAM_STR);
		$requete->bindValue(':POST_var', addslashes(json_encode($_POST)), PDO::PARAM_STR);
		$requete->bindValue(':date_acces', time(), PDO::PARAM_INT);
		$requete->bindValue(':admin', $admin ? 1 : 0, PDO::PARAM_INT);
		$requete->execute();	
	}
}