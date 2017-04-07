<?php

class HTMLGenerique {
	
	public static function show_help() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT aide_zzzelp FROM membres WHERE pseudo = :pseudo');
		$requete->bindValue(':pseudo', $_SESSION['pseudo'], PDO::PARAM_STR);
		$requete->execute();
		return ($requete->fetch(PDO::FETCH_ASSOC)['aide_zzzelp'] == 1);		
	}

	public static function get_header() {
	if(HTMLGenerique::show_help()) {
		$o = '<script type="text/javascript" src="/Javascript/aide.js"></script><script src="/Javascript/popupwindow.js"></script><script>Menu_debuter_Zzzelp();</script>';
	}
	else {
		$o = '';
	}
	return '
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
		<title>Zzzelp</title>
		<meta name="description" content="Site d\'outils pour Fourmizzz" />
		<meta name="author" content="delangle" />
		<link rel="icon" type="image/ico" href="/Images/icone_zzzelp.ico" />
		<link rel="stylesheet" type="text/css" href="/Style/content.css" />
		<link rel="stylesheet" type="text/css" href="/Style/component.css" />
		<link rel="stylesheet" type="text/css" href="/Style/simplegrid.css" />
		<link rel="stylesheet" type="text/css" href="/Style/zzzelpUI.css" />
		<link rel="stylesheet" type="text/css" href="/Style/fonts.css" />
		<link rel="stylesheet" href="/Style/popupwindow.css">
		<link rel="stylesheet" type="text/css" href="/Style/Style_2015.php'.(($_GET['page'] == 'login') ? '?mode=auto' : '').'">
		<script > var url_site = "'.Zzzelp::$url_site.'";</script>
		<script type="text/javascript" src="/Javascript/base_zzzelp.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script src="/Javascript/modernizr.custom.js"></script>'.$o;		
	}

	public static function get_CadreConnexion() {
		return '
					<ul class="tabs" style="margin-bottom: 25px;">
						<li class="tabs1">
							<a href="#login" class="active">Connexion</a>
						</li>
						<li class="tabs2">
							<a href="#register">Enregistrement</a>
						</li>
						<li class="tabs3">
							<a href="#reset">Identifiants perdus</a>
						</li>
					</ul>
					<div id="login" class="form-action show">
						<form action="/login" method="POST" id="login_form">
							<ul>
								<li>
									<input type="text" name="pseudo" placeholder="Identifiant" />
								</li>
								<li>
									<input type="password" name="password" placeholder="Mot de passe" />
								</li>
								<li>
									<input type="submit" name="login" value="Connexion" class="bouton" />
								</li>
							</ul>
						</form>
					</div>
					<!--/#login.form-action-->
					<div id="register" class="form-action hide">
						<form action="/login" method="POST" id="login_form">
							<ul>
								<li>
									<input type="text" name="pseudo" placeholder="Identifiant" />
								</li>
								<li>
									<input type="password" name="password" placeholder="Mot de passe" />
								</li>
								<li>
									<input type="password" name="verif_password" placeholder="Vérification mot de passe" />
								</li>
								<li>
									<input type="text" name="mail" placeholder="Adresse email" />
								</li>
								<li>
									<input type="submit" value="Inscription" name="inscription" class="bouton" />
								</li>
							</ul>
						</form>
					</div>
					<!--/#register.form-action-->
					<div id="reset" class="form-action hide">
						<form action="/login" method="POST" id="login_form">
							<ul>
								<li>
									<input type="text" name="identifiant" placeholder="Identifiant" />
								</li>
								<li>
									<input type="text" name="mail" placeholder="Adresse mail" />
								</li>
								<li>
									<input type="submit" name="reset_password" value="Envoyer" class="bouton" />
								</li>
							</ul>
						</form>
					</div>
					<!--/#register.form-action-->';
	}

}