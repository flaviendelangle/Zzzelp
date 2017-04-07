<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<?=HTMLGenerique::get_header() ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp(); ?>
			</div>
			<div class="main">
				<div class="grid grid-pad" style="max-width:100%">
					<div class="col-1-1">
						<div class="zone_contenu zone_invisible zone_grand_tableau">
							<div>
								<div class="zone_tableau">
									<table class="tableau_large_fixe">
										<tr>
											<th>Pseudo</th>
										</tr>
										<?php  foreach($alliance->membres as $pseudo => $niveaux) { if($niveaux->alliance_active->droit > 0) { ?>
										<tr>
												<td id="pseudo"><?php echo $pseudo ?></td>
										</tr>
										<?php }} ?>
									</table>
								</div>
								<div class="zone_tableau">
									<table class="tableau_largeur_scrollable">
											<th>Terrain de chasse</th>
											<th>Colonisateur</th>
											<th>EP colo</th>
											<th>Bonus (%)</th>
											<th>Revenu fixe</th>
											<th></th>
										</tr>
										<?php  foreach($alliance->membres as $pseudo => $niveaux) { if($niveaux->alliance_active->droit > 0) { ?>
										<tr>
												<td><input class="input_tableau input_haut" type="text" id="TDC" value="<?php echo number_format($niveaux->TDC_moyen, 0, '.' , ' ') ?>"></td>
												<td>
													<input class="input_tableau input_haut colonisateur" type="text" onchange="Affichage_etables('<?php echo str_replace('.','',$pseudo) ?>')" id="colonisateur_<?php echo str_replace('.','',$pseudo) ?>" value="<?php echo $niveaux->niveaux->colonisateur ?>">
												</td>
												<td><input class="input_niveau input_haut ec" type="text" id="ec_<?php echo str_replace('.','',$pseudo) ?>"></td>
												<td><input class="input_niveau input_haut" type="text" id="bonus" value="0"></td>
												<td><input class="input_tableau input_haut" type="text" id="revenu_fixe" value=""></td>
												<td><input id="activation" type="checkbox" checked="checked"></td>
										</tr>
										<?php  }} ?>
									</table>
								</div>
							</div>
					   </div>
					</div>
				</div>
				<br><br>
				<input type="submit" class="bouton" value="Calculer" onclick="Calcul_convois()">
				<div id="repartition">
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/CreationConvois.js"></script>
		<script>
			var alliance = "<?php echo $alliance->alliance ?>",
				serveur = "<?php echo $alliance->serveur ?>";
			etables_pucerons = <?php echo $alliance->pucerons ?>;
			Affichage_etables('');
			Calcul_convois();
		</script>
	</body>
</html>
