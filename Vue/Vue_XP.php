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
				<br>
				<div class="grid grid-pad">
					<div class="col-1-2">
						<div class="zone_content zone_invisible zone_combat">
							<table id="tableau_combat" class="tableau_ombre" data-mode="après">
								<tr>
									<th>
										<?php foreach(Fourmizzz::$serveurs as $serveur) { if(isset($parametres['armees_fzzz'][$serveur])) { ?>
										<span style="cursor:pointer" onclick="Appliquer_armee_serveur('<?php echo $serveur ?>')"><?php echo $serveur ?></span>
										<?php }} ?>
									</th>
									<th><a id="open_popup_attaquant" href="#modal-content">Attaquant</a></th>
									<th><a id="open_popup_defenseur" href="#modal-content">Défenseur</a></th>
								</tr>
								<?php for($n=0; $n<14; $n++) { ?>
								<tr>
									<td>
										<span class="nom_long"><?php echo Fourmizzz::$unites['noms_singulier'][$n] ?></span>
										<span class="nom_court"><?php echo Fourmizzz::$unites['TAGs'][$n] ?></span>
										 :
									</td>
									<td><input type="text" class="input_semi_court" id="unite_0_<?php echo $n ?>" onkeyup="MAJ_stats_armees('unite_0_<?php echo $n ?>')" value="<?php echo number_format($parametres['attaquant'][$n], 0, '.', ' ') ?>"></td>
									<td><input type="text" class="input_semi_court" id="unite_1_<?php echo $n ?>" onkeyup="MAJ_stats_armees('unite_1_<?php echo $n ?>')" value="<?php echo number_format($parametres['defenseur'][$n], 0, '.', ' ') ?>"></td>
								</tr>
								<?php } ?>
								<tr>
									<td></td>
									<?php for($i=0;$i<2;$i++) { ?>
									<td class="td" id="stats_<?php echo $i ?>" style="text-align:left">
										<div>
											<img src="/Images/icone_attaque.gif">
											<span id="attaque_<?php echo $i ?>"></span>
										</div>
										<div>
											<img src="/Images/icone_defense.gif">
											<span id="defense_<?php echo $i ?>"></span>
										</div>
										<div>
											<img src="/Images/icone_vie.gif">
											<span id="vie_<?php echo $i ?>"></span>
										</div>
									</td>
									<?php }?>
								</tr>
								<tr>
									<td><img src="/Images/inverser.png" onclick="Inverser_armees()"></td>
									<td id="armee_avant" style="font-style:italic;cursor:pointer;"></td>
									<td id="armee_apres" style="font-style:italic;cursor:pointer;"></td>
									<td style="display:none"><input type="hidden" id="numero_RC" value="0"></td>
								</tr>
							</table>
							<input type="button" class="bouton" onClick="Calcul_XP()" style="margin-top:40px" value="Calculer">
						</div>
					</div>
					<div class="col-1-2">
						<div class="zone_contenu zone_largeur_courte hauteur_courte">	
							<?php $joueurs = array('attaquant', 'defenseur');$plus=array(0,3);for($i=0;$i<2;$i++) { ?>	
							<div class="entete_cadre">Niveaux <?php echo $joueurs[$i] ?></div>
							<?php $n = 0;foreach(Fourmizzz::$niveaux_combat[$i] as $niveau) { ?>
							<div class="ligne_cadre_structure">
								<span><?php echo ucwords($niveau) ?> : </span>
								<input type="text" value="<?php echo number_format($parametres['niveau_lieu'][$n+$plus[$i]],0,'.',' ') ?>" class="input_niveau" id="<?php echo $niveau ?>_<?php echo $i ?>" value="<?php echo number_format($parametres[$joueurs[$i]][14+$n],0,'.',' ') ?>" onkeyup="MAJ_stats_armees('')">
							</div>
							<?php  $n++;} ?>
							<?php if($i == 1) { ?>
							<br><hr>
							<div class="entete_cadre">Lieu</div>
							<?php $n = -1;foreach(Fourmizzz::$lieux_combat as $lieu => $case) { ?>
							<div class="ligne_cadre_structure">
								<span><?php echo ucwords($lieu) ?> : </span>
								<span class="ligne_inputs">
									<?php if($case) { ?><input type="text" value="<?php echo number_format($parametres['niveau_lieu'][$n+5],0,'.',' ') ?>" id="lieu_<?php echo $lieu ?>" class="input_niveau"  onkeyup="MAJ_stats_armees('')"><?php  } ?>
									<input type="radio" id="actif_lieu_<?php echo $lieu ?>" name="actif_lieux" <?php if($lieu == $parametres['lieu']){echo 'checked';}?>  onchange="MAJ_stats_armees('')">
								</span>
							</div>	
							<?php  $n++;} ?>
							<?php  } else { ?> <br><hr> <?php }} ?>
							<br>
							<hr>
							<div class="entete_cadre">Paramètres</div>
							<div class="ligne_cadre_structure select_centre">
								<select id="mode" onchange="Modification_mode()">
									<option value="0">Simulateur simple</option>
									<option value="1">Optimisation XP</option>
								</select>
							</div>
							<div id="parametres_simulateur" style="height:80px">
								<div class="ligne_cadre_structure">
									<span>Afficher l'XP : </span>
									<input type="checkbox" id="affichage_XP_simulateur" checked>
								</div>
								<div class="ligne_cadre_structure">
									<span>Position :</span>
									<select id="position">
										<option value="0">Attaquant</option>
										<option value="1">Defenseur</option>
									</select>
								</div>
							</div>
							<div id="parametres_XP" style="display:none;height:80px">
								<div class="ligne_cadre_structure">
									<span>Gain voulu : </span>
									<select id="mode_opti">
										<option value="attaque">Gain d'attaque</option>
										<option value="vie">Gain de vie</option>
										<option value="defense">Gain de défense</option>
									</select>
								</div>
								<div class="ligne_cadre_structure">
									<span>XP en plusieurs tours (beta) : </span>
									<input type="checkbox" id="XP_plusieurs_tours" checked>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="grid grid-pad">
					<div class="col-1-1">
						<div id="zone_RC" class="zone_contenu">
							<div class="entete_cadre">En attente...</div>
						</div>
						<div id="stockage_armees" style="display:none">[]</div>
					</div>
				</div>
			</div>
		</div>
		<div id="popup_attaquant" class="pop-up-display-content">
			<p>
				<center>
					<textarea id="releve_0" onkeyup="Chargement_armee(0)"></textarea>
				</center>
			</p>
		</div>
		<div id="popup_defenseur" class="pop-up-display-content">
			<p>
				<center>
					<textarea id="releve_1" onkeyup="Chargement_armee(1)"></textarea>
				</center>
			</p>
		</div>
		<div class="zone_popup">
		</div>
		<script src="/Javascript/popupwindow.js"></script>
		<script src="/Javascript/XP.js"></script>
		<script src="/ZzzelpScript/Armee.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script>
			$(document).ready(function () {
			$('#open_popup_attaquant').click(function(e) {
				e.preventDefault();
				$('#popup_attaquant').popUpWindow({
					action: "open",
					size: "small",
				});
				document.querySelector('#releve_0').focus();
			});
			$('#open_popup_defenseur').click(function(e) {
				e.preventDefault();
				$('#popup_defenseur').popUpWindow({
					action: "open",
					size: "small",
				});
				document.querySelector('#releve_1').focus();
			});
			});
		</script>
		<script>
			var armees_fzzz = <?php echo json_encode($parametres['armees_fzzz']) ?>;
			MAJ_stats_armees('');
			<?php if($parametres['auto']) { ?>
			Calcul_XP()
			<?php  } ?>
		</script>
	</body>
</html>
