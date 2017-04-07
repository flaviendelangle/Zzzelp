<!DOCTYPE html>
<html lang="fr">
	<head>
		<?=HTMLGenerique::get_header() ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp(); ?>
			</div>
			<div class="main">
				<form method="POST" action="">
					<div class="grid grid-pad">
						<div class="col-1-1">
							<br>
							<div class="zone_contenu zone_invisible">
								<div class="entete_cadre">Gestion de vos adversaires</div>
								<br>
								<table class="tableau_ombre" id="ennemis">
									<tr>
										<th>TAG / Pseudo</th>
										<th>Type</th>
										<?php foreach($alliance->hotes as $ally) {?>
										<th class="MP_dispos" data-alliance="<?php echo $ally ?>">MF <?php echo $ally ?></th>
										<?php } ?>
									</tr>
									<?php  $n=0;foreach($alliance->donnees_MF as $ally => $d) { ?>
									<tr>
										<td><input type="text" class="input_gauche input_semi_court" name="TAG[]" value="<?php echo $ally ?>"></td>
										<td>
											<select name="Type_ennemis[]">
												<option value="alliance" <?php  if($d['type'] == 'alliance') { echo 'selected'; } ?>>Alliance</option>
												<option value="joueur" <?php  if($d['type'] == 'joueur') { echo 'selected'; } ?>>Joueur</option>
											</select>
										</td>
										<?php foreach($alliance->hotes as $TAG) {?>
										<td><input type="checkbox" <?php if(in_array($TAG, $d['hotes'])){echo 'checked';} ?> name="MF_<?php echo $n ?>[]" value="<?php echo $TAG ?>"></td>
										<?php } ?>
									</tr>
									<?php  $n++;} ?>
									<tr>
										<td colspan=5><a href="#" onClick="Ajout_alliance('ennemis')">Ajouter ligne</a></td>
									</tr>
								</table>
								<br><br>
							</div>
						</div>
					</div>
					<div class="grid grid-pad">
						<div class="col-1-1">
						   <div class="zone_contenu zone_largeur_courte">
								<div class="entete_cadre">Gestionnaire de guerre</div>
								<?php if(in_array($alliance->alliance, array('ZOO', 'CDF', 'FP', 'FCGB', 'FCGB2'))) { ?>
								<div class="ligne_cadre_structure">
									<span>Multiflood de guerre :</span>
									<input type="checkbox" name="MF_guerre" <?php if($alliance->modeMF) { ?>checked<?php } ?>>
								</div>
								<?php } ?>
								<div class="ligne_cadre_structure">
									<span>Gestionnaire de ghosts : </span>
									<input type="checkbox" name="activation_ghost" <?php if($alliance->donnees_Ghosts['activation_ghost']) { ?>checked<?php } ?>>			
								</div>
								<div class="ligne_cadre_structure">
									<span>Alliances averses :</span>
									<input type="text" class="input_haut input_large" name="ghosts_guerre" placeholder="TAG1,TAG2,..." value="<?php echo $alliance->donnees_Ghosts['ghosts_guerre'] ?>">
								</div>
								<div class="ligne_cadre_structure">
									<span>Ghosts interdits :</span>
									<input type="text" class="input_haut input_large" name="ghosts_hors_guerre" placeholder="TAG1,TAG2,..." value="<?php echo $alliance->donnees_Ghosts['ghosts_hors_guerre'] ?>">
								</div>
							</div>
							<br><br>
						</div>
					</div>
					<input type="submit" value="Enregistrer" name="Parametres_MF" class="bouton">
				</form>	
			</div>
		</div>
		<script src="/Javascript/GestionAlliance.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
	</body>
</html>
