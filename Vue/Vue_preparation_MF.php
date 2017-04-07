<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<?=HTMLGenerique::get_header(); ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp(); ?>
			</div>
			<div class="main">
				<div class="grid grid-pad">
					<div class="col-1-2">
						<form method="POST" action="import?alliance=<?php echo $MF->alliance ?>&serveur=<?php echo $compte->serveur ?>">
							<div class="zone_contenu zone_largeur_courte">
								<div class="entete_cadre">Chargement automatique</div>
								<div class="ligne_cadre_structure">
									<span>Alliances :</span> 
									<input class='input_large' type="text" name="alliances_auto" value="<?php echo $MF->get_alliances(); ?>">
								</div>
								<div class="ligne_cadre_structure">
									<span>Joueurs :</span> 
									<input class='input_large' type="text" name="joueurs_auto" value="<?php echo $MF->get_joueurs(); ?>">
								</div>
								<input type="submit" class="bouton" value="Lancer">
							</div>				
						</form>
						<br>
						<br>
						<form method="POST" action="tableau?alliance=<?php echo $MF->alliance ?>&serveur=<?php echo $compte->serveur ?>&mode=dump">
							<div class="zone_contenu zone_largeur_courte">
								<div class="entete_cadre">Chargement manuel</div>
								<div class="ligne_cadre_structure">
									<span>Alliances :</span> 
									<input class='input_large' type="text" name="alliances_dump" value="<?php echo $MF->get_alliances(); ?>">
								</div>
								<div class="ligne_cadre_structure">
										<span>Joueurs :</span> 
										<input class='input_large' type="text" name="joueurs_dump" value="<?php echo $MF->get_joueurs(); ?>">
								</div>
								<div class="ligne_cadre_structure">
										<span>Nombre unités :</span> 
										<input class='input_large' type="text" name="capa_flood_dump" value="0" id="capa_flood_dump" onkeyup="ze_Ajout_espaces(this)">
								</div>
								<input type="submit" class="bouton" value="Lancer">
							</div>
							<br>
						</form>
					</div>
					<div class="col-1-2">
					   <div class="zone_contenu zone_largeur_courte">
							<div class="entete_cadre">Ajout manuel de floods</div>
							<textarea id="floods_manuels" placeholder="Copiez vos attaques en cours ici"></textarea><br>
							<a href="#zone_releves_floods" class="bouton" onclick="Analyse_releves('floods', document.querySelector('#floods_manuels').value)">Analyser</a>
							<div id="zone_releves_floods">
							</div>
							<br><br>
							<table class="tableau_ombre">
								<tr>
									<th id="th">Pseudo</th>
									<th id="th">Valeur</th>
									<th id="th">Arrivée</th>
									<th id="th"></th>
								</tr>
								<?php foreach($MF->floods_utilisateur as $flood) {
											if($flood['mode'] == 'attaquant' && $flood['arrivee'] > time()) { 
												$pseudo = $flood['cible'];
												$css = '  style="color: green;background:#E0FFFF"';
											}
											elseif($flood['mode'] == 'attaquant') {
												$pseudo = $flood['cible'];
												$css = '  style="color: green;"';
											} 
											elseif($flood['arrivee'] > time()) { 
												$pseudo = $flood['attaquant'];
												$css = '  style="background:#E0FFFF"';
											}
											else{
												$pseudo = $flood['attaquant'];
												$css = '  style="color: red"';
											}
								?>
								<tr>
									<td id="td"<?php echo $css ?>>
										<?php echo $pseudo ?>
									</td>
									<td id="td"<?php echo $css ?>>
										<?php echo number_format($flood['valeur'], 0, '.' , ' ')?>
									</td>
									<td id="td"<?php echo $css ?>>
										<?php echo date('d/m', $flood['arrivee']).' à '.date('H:i', $flood['arrivee']) ?>
									</td>
									<td id="td"<?php echo $css ?>>
										<?php  if ($flood['mode'] == 'attaquant' and $flood['arrivee'] > time()) { ?>
										<a href="preparation?alliance=<?php echo $MF->alliance ?>&serveur=<?php echo $MF->utilisateur->serveur ?>&ID_flood=<?php echo $flood['ID'] ?>">X</a>
										<?php  } ?>
									</td>
								</tr>
								<?php  } ?>
							</table>
							<br><br>
					   </div>
					</div>
				</div>
			</div>
		</div>
		<script src="/Javascript/Floods.js"></script>
		<script src="/Javascript/Compte.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script>
			var serveur = "<?php echo $_GET['serveur'] ?>";
		</script>
	</body>
</html>
