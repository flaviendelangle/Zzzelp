 <!DOCTYPE html>
<html lang="fr">
	<head>
		<?=Nouveau_header() ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=Creation_menu(); ?>
			</div>
			<div class="main">
				<div class="grid grid-pad">
					<div class="col-1-2">
						<?php  if ($modes['niveaux']) { ?>
						 <div class="zone_contenu zone_largeur_courte">	
							<div class="entete_cadre">Niveaux</div>
							<form method="POST" action="">
								<?php foreach ($n as $bat => $niv) { ?>
								<div class="ligne_cadre_structure">
									<span><?php echo str_replace('_',' ',ucwords($bat)) ?></span>
									<input type="text" value="<?php echo $niv ?>" class="input_tableau" name="batiments[]">
								</div>
								<?php  } ?>
								<input type="hidden" name="mode_niveaux" value="<?php echo $mn ?>">
								<input type="submit" class="bouton" value="Modifier">
							</form>
						</div>
						<?php  } if ($modes['floods_interne']) {?>
						<div class="zone_contenu zone_invisible">
							<div class="entete_cadre">Floods récents</div>
							<table class="tableau_ombre">
								<tr>
									<th>Pseudo</th>
									<th>Valeur</th>
									<th>Arrivée</th>
								</tr>
								<?php  foreach($fl as $f) { if($f[0] == $pseudo){$p=$f[1];$c='  style="color: green"';}else{$p=$f[0];$c='  style="color: red"';}?>
								<tr>
									<td <?php echo $c ?>><?php echo $p ?></td>
									<td><?php echo number_format($f[2], 0, '.' , ' ')?></td>
									<td><?php echo date('d/m', $f[3]).' à '.date('H:i', $f[3]) ?></td>
								</tr>
								<?php  } ?>
							</table>
							<?php  } ?>
					   </div>
					</div>
					<div class="col-1-2">
					   <div class="zone_contenu zone_invisible">
							<div class="entete_cadre">Relevés TDC</div>
							<table class="tableau_ombre">
								<tr>
									<th>Heure</th>
									<th>TDC</th>
								</tr>
								<?php  foreach($rel as $heure => $valeur) { ?>
								<tr>
									<td><?php  echo date("H:i:s", $heure) ?></td>
									<td><?php echo number_format($valeur, 0, '.' , ' ') ?></td>
								</tr>
								<?php  } ?>
						   </table>
								<a class="bouton" href="<?php echo $GLOBALS['url_site'] ?>traceur/joueur?pseudo=<?php echo $pseudo ?>&serveur=<?php echo $onglet ?>">Traceur complet</a>
						   <br><br>
					   </div>
					</div>
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
	</body>
</html>
