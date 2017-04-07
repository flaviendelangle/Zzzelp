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
				<div class="grid grid-pad">
					<div class="col-1-2">
						<div class="zone_contenu zone_largeur_courte">
							<div class="entete_cadre">Armée à analyser</div>
							<div class="ligne_cadre_structure" style="text-align: center;">
								<a href="#modal-content" id="open_popup_armee">Copier une armée</a>
							</div>
							<div class="ligne_cadre_structure">
								<span>Ouvrières : </span>
								<input type="text" value="0" class="input_semi_court" id="unite_ouv" onkeyup="MAJ_Ponte(this)">
							</div>
							<?php for($n=0;$n<14;$n++) { ?>
							<div class="ligne_cadre_structure">
								<span>
									<span class="nom_long"><?php echo Fourmizzz::$unites['noms_singulier'][$n] ?></span>
									<span class="nom_court"><?php echo Fourmizzz::$unites['TAGs'][$n] ?></span> :
								</span>
								<input type="text" value="0" class="input_semi_court" id="unite_<?php echo $n ?>" onkeyup="MAJ_Ponte(this)">
							</div>
							<?php } ?>
						</div>	
					</div>
					<div class="col-1-2">
						<div class="zone_contenu zone_largeur_courte">
							<div class="entete_cadre">Paramètres</div>
							<div class="ligne_cadre_structure">
								<span>Compter les bonus : </span>
								<input type="checkbox" id="compter_bonus" onclick="MAJ_Ponte()">
							</div>
							<div class="ligne_cadre_structure">
								<span>Temps de ponte : </span>
								<input type="text" value="0" id="tdp" class="input_niveau" onkeyup="MAJ_Ponte()">
							</div>							
							<div class="entete_cadre">Niveaux</div>
							<?php foreach(Fourmizzz::$niveaux_combat[0] as $niveau) { ?>
							<div class="ligne_cadre_structure">
								<span><?php echo ucwords($niveau) ?> : </span>
								<input type="text" value="0" class="input_niveau" id="niveau_<?php echo $niveau ?>" onkeyup="MAJ_Ponte()">
							</div>
							<?php } ?>
							<br><hr>
							<div class="entete_cadre">Lieu</div>
							<?php foreach(Fourmizzz::$lieux_combat as $lieu => $case) { ?>
							<div class="ligne_cadre_structure">
								<span><?php echo ucwords($lieu) ?> : </span>
								<span class="ligne_inputs">
									<?php if($case) { ?><input type="text" value="0" id="niveau_<?php echo $lieu ?>" class="input_niveau" onkeyup="MAJ_Ponte()"><?php  } ?>
									<input type="radio" name="lieu" id="actif_lieu_<?php echo $lieu ?>" value="<?php echo $lieu ?>" onchange="MAJ_Ponte()" <?php if($lieu == 'TDC'){echo 'checked';} ?>>
								</span>
							</div>	
							<?php } ?>
						</div>
						<br><br>
					</div>
				</div>
				<div class="grid grid-pad">
					<div class="col-1-2">
						<div class="zone_contenu zone_largeur_courte">
							<div class="entete_cadre">Résultats détaillés</div>
							<?php foreach($zones as $zone) { ?>
							<div class="entete_menu_cache" onclick="Affichage_options_avancees('option_<?php echo $zone['id'] ?>')"><?php echo $zone['nom'] ?></div>
							<div class="zone_opaque">
								<div class="ligne_cadre_structure option_<?php echo $zone['id'] ?>" style="<?php if($zone['id'] != 'temps') { ?>display:none<?php } ?>">
									<span>Ouvrières : </span>
									<span class="input_fige" id="detail_<?php echo $zone['id'] ?>_ouv">0 (0%)</span>
								</div>
								<?php for($n=0;$n<14;$n++) { ?>
								<div class="ligne_cadre_structure option_<?php echo $zone['id'] ?>" style="<?php if($zone['id'] != 'temps') { ?>display:none<?php } ?>">
									<span><?php echo Fourmizzz::$unites['TAGs'][$n] ?> : </span>
									<span class="input_fige" id="detail_<?php echo $zone['id'] ?>_<?php echo $n ?>">0 (0%)</span>
								</div>
								<?php } ?>
							</div>
							<br><hr>
							<?php } ?>
						</div>						
					</div>
					<div class="col-1-2">
						<div class="zone_contenu zone_largeur_courte">
							<div class="entete_cadre">Résultats globaux</div>
							<?php foreach($zones as $zone) { ?> 
							<div class="ligne_cadre_structure">
								<span><?php echo $zone['nom'] ?> : </span>
								<span class="input_fige" id="global_<?php echo $zone['id'] ?>">0</span>
							</div>
							<?php } ?>
						</div>
					</div>
				</div>

			</div>
		</div>
		<div id="popup_armee" class="pop-up-display-content">
			<p>
				<center>
					<textarea id="copie_armee" onkeyup="Chargement_armee()"></textarea>
				</center>
			</p>
		</div>
		<div class="zone_popup">
		</div>
		<script src="/Javascript/popupwindow.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/Pontes.js"></script>
		<script src="/ZzzelpScript/Armee.js"></script>
		<script>

			$(document).ready(function () {
			$('#open_popup_armee').click(function(e) {
				e.preventDefault();
				$('#popup_armee').popUpWindow({
					action: "open",
					size: "small",
				});
				document.querySelector('#copie_armee').focus();
			});
			});

			var zones = <?php echo json_encode($zones) ?>;
		</script>
	</body>
</html>
