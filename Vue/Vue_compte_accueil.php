<!DOCTYPE html>
<html lang="fr">
	<head>
		<?=HTMLGenerique::get_header(); ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp(); ?>
			</div>
			<div class="main">
				<form method="POST" action="accueil">
					<div class="grid grid-pad">
						<div class="col-1-1">
						   <div class="zone_contenu zone_largeur_courte">
								<div class="entete_cadre">Votre compte Zzzelp</div>
								<div class="ligne_cadre_structure">
									<span>Login : </span>
									<span class="input_fige"><?php echo $this->pseudo ?></span>
								</div>
								<div class="ligne_cadre_structure">
									<span>Mot de passe : </span>
									<input class='input_large' type="password" name="ancien_password">
								</div>
								<div class="ligne_cadre_structure">
									<span>Nouveau mdp : </span>
									<input class='input_large' type="password" name="nouveau_password">
								</div>
								<div class="ligne_cadre_structure">
									<span>Vérification mdp : </span>
									<input class='input_large' type="password" name="verif_password">
								</div>
								<br><br>
								<?php foreach(Fourmizzz::$serveurs as $serveur) {?>
								<div class="ligne_cadre_structure">
									<span <?php if($this->pseudos[$serveur]['validation'] == 1) {echo 'style="color:#006400;font-weight:600;"';}elseif($this->pseudos[$serveur]['pseudo'] != ''){echo'style="color:#DA1010;font-weight:600;"';}?>>Pseudo <?php echo $serveur ?>: </span>
									<span class="ligne_inputs" style="width: calc(100% - 160px) !important;">
										<img src="/Images/trash.png" style="width:20px;height:20px;float:left;margin-right:10px" onclick="document.location.href= url_zzzelp + '/compte/accueil?code=suppressionpseudo&serveur=<?php echo $serveur ?>'" title="Supprimer votre pseudo de Zzzelp">
										<input autocomplete="off" class='input_large' type="text" id="pseudo_<?php echo $serveur ?>" name="pseudo_<?php echo $serveur ?>" value="<?php echo $this->pseudos[$serveur]['pseudo'] ?>"> 
										<script>
											autocompletion(document.querySelector('#pseudo_<?php echo $serveur ?>'), { mode : 'joueur', serveur : "<?php echo $serveur ?>", multiple : false });
										</script>
									</span>
								</div>
								<div id="resultats_pseudos_<?php echo $serveur ?>" class="recherche_ajax hauteur_courte" style="z-index:-1"></div>
								<?php  } ?>
								<input type="submit" name="modif_generale" value="Modifier" class="bouton">
						   </div>
						</div>
					</div>
				</form>		
			</div>
		</div>	
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/Compte.js"></script>
	</body>
</html>
