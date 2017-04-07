<?php

class Zzzelp {

	public static $url;
	public static $IP;
	public static $page;
	public static $onglet;
	public static $url_site = 'http://test.zzzelp.fr/';
	public static $url_page;
	public static $post_FG = 'http://fourmizzz.cforum.info/t14457-Zzzelp.htm';

	public static function Connexion_BDD($nom_bdd) {
		$BDD = array('Donnees_site' => array('nom' => 'BDDPrincipale', 'utilisateur' => 'zzzelpfr'), 
					 'LogsZzzelp' => array('nom' => 'LogsZzzelp', 'utilisateur' => 'adminlogs'),
					 'Fourmizzz_FR_S1' => array('nom' => 'FourmizzzS1', 'utilisateur' => 'zzzelps1'),
					 'Fourmizzz_FR_S2' => array('nom' => 'FourmizzzS2', 'utilisateur' => 'zzzelps2'),
					 'Fourmizzz_FR_S3' => array('nom' => 'FourmizzzS3', 'utilisateur' => 'zzzelps3'),
					 'Fourmizzz_FR_S4' => array('nom' => 'FourmizzzS4', 'utilisateur' => 'zzzelps4'),
					 'Fourmizzz_FR_S0' => array('nom' => 'FourmizzzS0', 'utilisateur' => 'zzzelptest'),
					 'Fourmizzz_FR_TEST' => array('nom' => 'FourmizzzS0', 'utilisateur' => 'zzzelptest'),
					 'Releves' => array('nom' => 'BDDReleves', 'utilisateur' => 'releveszzzelp'),
					 'Actions' => array('nom' => 'BDDActions', 'utilisateur' => 'zzzelpactions'),
					 'Traceur' => array('nom' => 'BDDTraceur', 'utilisateur' => 'zzzelptraceur')	 
				);
		try {
			$bdd = new PDO('mysql:host=localhost;dbname='.$BDD[$nom_bdd]['nom'], $BDD[$nom_bdd]['utilisateur'], 'rg923v1tu650', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
			$bdd->exec("SET CHARACTER SET utf8");
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
		return $bdd;
	}
}