<?php session_start();
date_default_timezone_set('Europe/Paris');




/*
	Initialisation de la page
	- Stockage dans les logs
	- Chargement de la class InitialisationZzzelp si la page est valide
*/


/*
	Gestion des taches CRON
*/
if(php_sapi_name() == 'cli') {
	if($argv[1] == 'websocket') {
		require 'Class/WebSocketServer.php';
		require 'Class/WebSocketUser.php';
		require 'Class/WebSocketZzzelpScript.php';
	    $server = new WebSocketZzzelpScript("213.251.157.140","9000");
	    try {
	      $server->run();
	    }
	    catch (Exception $e) {
	      $server->stdout($e->getMessage());
	    }
	}
	else {
		require 'Class/Zzzelp.php';
		require 'Class/GenerationArchives.php';
		$mode = $argv[1];
		if($mode == 'archives') {
			$archives = new GenerationArchives();
		}
		elseif($mode == 'traceur') {
			require 'Class/Traceur.php';
			require 'Class/Tableau.php';
			$traceur = new Traceur(null);
			$traceur->load_Cron();		
		}
	}
}

/*
	Sinon on lance Zzzelp
*/

else {
	require 'Class/Autoloader.php';
	Autoloader::register();
	/*
		Création des variables propre à la page chargée
	*/
	Zzzelp::$page = htmlentities($_GET['page']);
	Zzzelp::$onglet = htmlentities($_GET['onglet']);
	Zzzelp::$url = $_SERVER['REQUEST_URI'];
	Zzzelp::$IP = $_SERVER["REMOTE_ADDR"];
	Zzzelp::$url_page = Zzzelp::$url_site.Zzzelp::$page;

	/*
		On permet l'accès à distance pour les appels du script
	*/
	if(in_array(InitialisationZzzelp::$pages[Zzzelp::$page]['mode'], array('externe', 'publique'))) {
		header("Access-Control-Allow-Origin: *");
	}
		
	if(!empty($_SESSION['donnees_MF_GET']) AND Zzzelp::$page == 'accueil') {
		$valeurs = json_decode($_SESSION['donnees_MF_GET'], true);
		echo Zzzelp::$url_site.'MF/tableau?serveur='.$valeurs['serveur'].'&cf='.$valeurs['cf'].'&hash='.$valeurs['hash'].'&mode='.$valeurs['mode'];
		header('Location:'.Zzzelp::$url_site.'MF/tableau?serveur='.$valeurs['serveur'].'&cf='.$valeurs['cf'].'&hash='.$valeurs['hash'].'&mode='.$valeurs['mode']);
	}	
	elseif(!isset(InitialisationZzzelp::$pages[Zzzelp::$page])) {
		header('Location:'.Zzzelp::$url_site.'accueil');
	}
	elseif(!in_array(InitialisationZzzelp::$pages[Zzzelp::$page]['mode'], array('externe', 'publique')) AND $_SESSION['pseudo'] == '' AND Zzzelp::$page != 'login') {
		if(Zzzelp::$page == 'MF' AND Zzzelp::$onglet == 'tableau') {
			$_SESSION['donnees_MF_POST'] = json_encode($_POST);
			$_SESSION['donnees_MF_GET'] = json_encode($_GET);
			header('Location:'.Zzzelp::$url_site.'login');
		}
		if(Zzzelp::$page == 'activation_pseudo') {
			header('Location:'.Zzzelp::$url_site.'login?mode=activation_pseudo&serveur='.$_GET['serveur'].'&pseudo='.$_GET['pseudo'].'&token='.$_GET['token']);
		}
		else {
			header('Location:'.Zzzelp::$url_site.'login');
		}
	}
	elseif(Zzzelp::$page == 'login') {
		$login = new Login();
	}
	else {
		$instance = new InitialisationZzzelp($_SESSION['pseudo'], false);
		$instance->load();
	}
}
?>