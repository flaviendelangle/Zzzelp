<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<?=HTMLGenerique::get_header(); ?>
	</head>
	<body>
		<div class="container">
			<div class="main main_login">
				<img class="logo" src="/Images/logo.png">
				<br><br>
				<div class="flat-form zone_contenu">
					<ul class="tabs">
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
						<div class="grand_entete_cadre">Connexion à Zzzelp</div>
						<p>
							A la première connexion pensez à rentrer vos pseudos pour une utilisation optimale du site
						</p>
						<form action="<?php echo $GLOBALS['url_page'] ?>" method="POST" id="login_form">
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
								<?php if(!empty($_GET['mode'])) { ?>
								<input type="hidden" name="mode" value="<?php echo $_GET['mode'] ?>">
								<?php } ?>
								<?php if($_GET['mode'] == 'activation_pseudo') { ?>
								<input type="hidden" name="serveur_activation" value="<?php echo $_GET['serveur'] ?>">
								<input type="hidden" name="pseudo_activation" value="<?php echo $_GET['pseudo'] ?>">
								<input type="hidden" name="token_activation" value="<?php echo $_GET['token'] ?>">
								<?php } ?>
							</ul>
						</form>
					</div>
					<!--/#login.form-action-->
					<div id="register" class="form-action hide">
						<div class="grand_entete_cadre">Création de compte</div>
						<p>
							<strong>Rappel : </strong>Vos pseudos Zzzelp et Fourmizzz peuvent être différents.
						</p>
						<form action="<?php echo $GLOBALS['url_page'] ?>" method="POST" id="login_form">
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
						<div class="grand_entete_cadre">Mot de passe perdu</div>
						<p>
							Pour réinitialiser votre mot de passe entrez votre email et votre pseudo.
							Votre nouveau mot de passe vous sera envoyé par mail.
						</p>
						<form action="<?php echo $GLOBALS['url_page'] ?>" method="POST" id="login_form">
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
					<!--/#register.form-action-->
				</div>							
			</div>
		</div>
		<?php if($_GET['mode'] == 'activation_pseudo') { ?>
		<div class="modal_zzzelp">
			<div>
				<header>Attention !</header>
				<div class="zzzelp_contenu_FAQ" style="padding:20px">
					<p>Si vous avez un compte Zzzelp, connectez-vous et votre compte Fourmizzz y sera automatiquement lié</p>
					<p>Sinon, créez-vous un compte Zzzelp et retournez sur Fourmizzz pour cliquer sur le bouton d'activation de ZzzelpScript</p>
				</div>
				<footer>
					<span onclick="ze_Supprimer_element(document.querySelector('.modal_zzzelp'))">Continuer</span>
				</footer>
			</div>
		</div>
		<?php } if(!empty($message)) { echo '<script>alert("'.$message.'")</script>';}?>
		<script>
			(function( $ ) {
			  // constants
			  var SHOW_CLASS = 'show',
				  HIDE_CLASS = 'hide',
				  ACTIVE_CLASS = 'active';
			  
			  $( '.tabs' ).on( 'click', 'li a', function(e){
				e.preventDefault();
				var $tab = $( this ),
					 href = $tab.attr( 'href' );
			  
				 $( '.active' ).removeClass( ACTIVE_CLASS );
				 $tab.addClass( ACTIVE_CLASS );
			  
				 $( '.show' )
					.removeClass( SHOW_CLASS )
					.addClass( HIDE_CLASS )
					.hide();
				
				  $(href)
					.removeClass( HIDE_CLASS )
					.addClass( SHOW_CLASS )
					.hide()
					.fadeIn( 550 );
			  });
			})( jQuery );
			
		</script>
	</body>
</html>




