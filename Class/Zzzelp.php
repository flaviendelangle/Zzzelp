<?php

class Zzzelp {

	public static $url;
	public static $sel_hash = '1*f6_D'; // A MODIFIER A L'INSTALLATION
	public static $IP;
	public static $page;
	public static $pseudo_admin = 'delangle' ;  // A MODIFIER A L'INSTALLATION
	public static $onglet;
	public static $url_site = 'http://zzzelp.fr/';
	public static $url_page;
	public static $post_FG = 'http://fourmizzz.cforum.info/t14457-Zzzelp.htm';

	public static function Connexion_BDD($nom_bdd) {
		$BDD = array('Donnees_site' => array('nom' => '', 
											 'utilisateur' => ''), 
					 'LogsZzzelp' => array('nom' => '', 
										   'utilisateur' => ''),
					 'Fourmizzz_FR_S1' => array('nom' => '', 
											    'utilisateur' => ''),
					 'Fourmizzz_FR_S2' => array('nom' => '', 
											    'utilisateur' => ''),
					 'Fourmizzz_FR_S3' => array('nom' => '', 
												'utilisateur' => ''),
					 'Fourmizzz_FR_S4' => array('nom' => '', 
												'utilisateur' => ''),
					 'Fourmizzz_FR_S0' => array('nom' => '', 
												'utilisateur' => ''),
					 'Fourmizzz_FR_TEST' => array('nom' => '', 
												  'utilisateur' => ''),
					 'Releves' => array('nom' => '', 
										'utilisateur' => ''),
					 'Actions' => array('nom' => '', 
										'utilisateur' => ''),
					 'Traceur' => array('nom' => '', 
										'utilisateur' => '')	 
				);
		try {
			$bdd = new PDO('mysql:host=localhost;dbname='.$BDD[$nom_bdd]['nom'], $BDD[$nom_bdd]['utilisateur'], 'MOTDEPASSE', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
			$bdd->exec("SET CHARACTER SET utf8");
		}
		catch (Exception $e) {
			die('Erreur : ' . $e->getMessage());
		}
		return $bdd;
	}
}
