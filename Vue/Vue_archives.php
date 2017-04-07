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
				<form method="POST" action="?alliance=<?php echo $alliance ?>&serveur=<?php echo $serveur ?>">
					<?php echo Ajout_bloc_publicite() ?>
					<div class="grid grid-pad">
						<div class="col-1-1">
							<div class="zone_contenu zone_largeur_courte">
								<div class="entete_cadre">Archives <?php echo $alliance ?></div>
								<div class="ligne_cadre_structure">
									<span>Section :</span>
									<select name="section">
										<?php  foreach (array('floods', 'convois', 'revenus', 'chasses') as $s) { ?>
										<option value="<?php echo $s ?>" <?php if($s == $section) { echo 'selected'; } ?>><?php echo ucwords($s) ?></option>
										<?php  } ?>
									</select>
								</div>
								<div class="ligne_cadre_structure">
									<span>Début : </span>
									<input name="debut" class="input_tableau" type="text" value="<?php echo $debut ?>">
								</div>
								<div class="ligne_cadre_structure">
									<span>Fin : </span>
									<input name="fin" class="input_tableau" type="text" value="<?php echo $fin ?>">
								</div>
								<input type="submit" class="bouton" value="Actualiser">
							</div>
						</div>
					</div>
					<div class="grid grid-pad">
						<div class="col-1-2">
							<div class="zone_contenu zone_invisible">
								<div class="entete_cadre">Par joueur</div>
								<br><br>
								<table class="tableau_ombre">
									<tr>
										<th>Pseudo</th>
										<th>Nb</th>
										<th>Total</th>
										<th class="non_tel">Moyenne</th>
									</tr>
									<?php  $n=0; $n_tot = 0; $n_tot_2 = 0;foreach($fl as $pseudo => $d) { $n++; $n_tot += $d['nombre']; $n_tot_2 += $d['valeur']; ?>
									<tr>
										<td><?php echo $pseudo ?></td>
										<td><?php echo number_format($d['nombre'],0,'.',' ') ?></td>
										<td><?php echo number_format($d['valeur'],0,'.',' ') ?></td>
										<td class="non_tel"><?php echo number_format($d['valeur']/$d['nombre'],0,'.',' ') ?></td>
									</tr>
									<?php  } ?>
									<tr>
										<td>TOTAL : </td>
										<td><?php echo number_format($n_tot,0,'.',' ') ?></td>
										<td><?php echo number_format($n_tot_2,0,'.',' ') ?></td>
										<td class="non_tel"><?php echo number_format($n_tot_2 / $n_tot,0,'.',' ') ?></td>
									</tr>
								</table>
								<br><br>
							</div>
						</div>
						<div class="col-1-2">
							<div class="zone_contenu zone_invisible">
								<div class="entete_cadre">Par jour</div>
								<br><br>
								<table class="tableau_ombre">
									<tr>
										<th>Date</th>
										<th>Nb</th>
										<th>Total</th>									
									</tr>
									<?php  $n=0; foreach($da as $date => $d) { $n++ ?>
									<tr>
										<td><?php echo date('d/m/y', $date) ?></td>
										<td><?php echo number_format($d['nombre'],0,'.',' ') ?></td>
										<td><?php echo number_format($d['valeur'],0,'.',' ') ?></td>
									</tr>
									<?php  } ?>								
								</table>
								<br><br>
							</div>
						</div>
					</div>
					<?php if(isset($_POST['record'])) { ?>
					<br><br><br>
					<div class="entete_cadre">Records</div>
					<?php $i=2;foreach($rec as $zone => $valeurs) {$i++; ?>
					<div class="grid grid-pad">
						<?php foreach ($valeurs as $valeur => $types) { $n=0; ?>
						<div class="col-1-2">
							<div class="zone_contenu zone_invisible">
								<br><br>
								<table class="tableau_ombre">
									<tr>
										<th id="th" colspan="<?php echo $i ?>">Classement par <?php echo $valeur ?> de <?php echo $section ?> (<?php echo $zone ?>)</th>
									</tr>
									<?php foreach($types as $ligne) {$n++;if($zone == 'joueur') {$pseudo=explode('|||', $ligne['pseudo']); ?>
									<tr>
										<td id="td"><?php echo $n ?></td>
										<td id="td"><?php echo $pseudo[1] ?></td>
										<td id="td"><?php echo date('d/m/y', $pseudo[0]) ?></td>
										<td id="td"><?php echo number_format($ligne[$valeur],0,'.',' ') ?></td>
									</tr>
									<?php  } else {?>
									<tr>
										<td id="td"><?php echo $n ?></td>
										<td id="td"><?php echo date('d/m/y', $ligne['date']) ?></td>
										<td id="td"><?php echo number_format($ligne[$valeur],0,'.',' ') ?></td>
									</tr>
									<?php  }} ?>
								</table>
							</div>
						</div>
						<?php } ?>
					</div>
					<?php }} else { ?>
					<center>
						<input type="submit" name="record" class="bouton" value="Records">
					</center>
					<br><br>
					<?php  } ?>				
				</form>	
			</div>			
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/canvas.js"></script>
		<script src="/Javascript/Archives.js"></script>
	</body>
</html>
