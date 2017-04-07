<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<?=HTMLGenerique::get_header() ?>
	</head>
	<body>
		<form method="POST" action="">
			<div class="container">
				<div class="menu">
					<?=$menu->create_MenuZzzelp(); ?>
				</div>
				<div class="main">
					<div class="grid grid-pad">
						<div class="col-1-1">
							<div class="zone_contenu zone_largeur_courte">
								<div class="entete_cadre">Outils activés</div>
								<?php foreach($alliance->outils as $titre => $outil) { ?>
								<div class="ligne_cadre_structure">
									<span><?php echo $outil['nom'] ?> : </span>
									<input type="checkbox" name="<?php echo $titre ?>" <?php if($outil['actif']) {echo 'checked';} ?>>
								</div>
								<?php } ?>
							</div>
							<br><br>
						</div>
					</div>
					<div class="grid grid-pad">
						<div class="col-1-1">
							<div class="zone_contenu zone_invisible">
								<div class="entete_cadre">Rangs des membres <?php echo $alliance->alliance ?></div>
								<table class="tableau_ombre">
									<tr>
										<th></th>
										<?php foreach($alliance->droits_rangs as $rang => $droits) { ?>
										<th><?php echo $rang ?></th>
										<?php } ?>
									</tr>
									<?php foreach($alliance->droits as $droit => $nom) { ?>
									<tr>
										<td style="text-align:left"><?php echo $nom ?> : </td>
										<?php foreach($alliance->droits_rangs as $rang => $droits) { ?>
										<td><input type="checkbox" name="<?php echo $rang.'_'.$droit ?>" <?php if($droits[$droit]) { echo 'checked="checked"';} ?> <?php if($rang == 'Chef') { echo 'disabled';} ?>></td>
										<?php } ?>
									</tr>
									<?php } ?>
								</table>
								<br><br>
							</div>
						</div>
					</div>
					<div class="grid grid-pad">
						<div class="col-1-1">
							<div class="entete_cadre">Partage alliés</div>
							<div class="zone_contenu zone_invisible zone_grand_tableau zone_tableau_alliers">
								<div>
									<div class="zone_tableau">
										<table class="tableau_large_fixe tableau_general_alliance_pseudo" id="droits_alliers">
											<tr>
												<th><a href="#" style="color:red" id="open_popup_modification_alliers">Gérer vos alliés</a></th>
											</tr>
											<?php foreach($alliance->droits_alliers as $droit => $nom) { ?>
											<tr>
												<td style="text-align:left"><?php echo $nom ?> : </td>
											</tr>
											<?php } ?>
										</table>
									</div>
									<div class="zone_tableau">
										<table class="tableau_large_scrollable tableau_general_alliance" id="droits_alliers_2">
											<tr>
												<?php foreach($alliance->alliers as $nom => $ally) {foreach($ally as $rang => $droits) { ?>
												<th class="cell_<?php echo $nom ?>">&nbsp;&nbsp;<?php echo $rang.' '.$nom ?>&nbsp;&nbsp;</th>
												<?php }} ?>
											</tr>
											<?php foreach($alliance->droits_alliers as $droit => $nom) { ?>
											<tr data-option="<?php echo $droit ?>">
												<?php foreach($alliance->alliers as $nom => $ally) {foreach($ally as $rang => $droits) { ?>
												<td class="cell_<?php echo $nom ?>"><input name="<?php echo $droit.'_'.$rang.'_'.$nom; ?>" type="checkbox" <?php if($droits[$droit]) { echo 'checked="checked"';} ?></td>
												<?php }} ?>		
											</tr>
											<?php } ?>
										</table>
									</div>
								</div>
								<br><br>
							</div>
						</div>
					</div>
					<input type="hidden" name="Droits_alliance">
					<div id="popup_modification_alliers" class="pop-up-display-content">
						<div class="entete_cadre">Vos alliés</div>
						<table id="liste_alliers" class="tableau_invisible">
							<?php foreach($alliance->alliers as $nom => $ally) { ?>
							<tr class="cell_<?php echo $nom ?>">
								<td><input type="hidden" name="alliances[]" value="<?php echo $nom ?>"><?php echo $nom ?></td>
								<td><img  src="http://www.icone-png.com/png/25/24717.png" width="15" onclick="Supprimer_allier('<?php echo $nom ?>')"></td>
							</tr>
							<?php } ?>
							<tr>
								<td><input type="text" class="input_haut input_moyen" placeholder="TAG" id="TAG_allier"></td>
								<td><img  src="/Images/valider.png" width="20" onclick="Ajout_allier()"></td>
							</tr>
						</table>
					</div>
					<input type="submit" class="bouton" value="Enregistrer">
				</div>
			</div>
			<div class="zone_popup">
			</div>
			<script src="/Javascript/GestionAlliance.js"></script>
			<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
			<script src="/Javascript/popupwindow.js"></script>
			<script>
				$(document).ready(function () {
				$('#open_popup_modification_alliers').click(function(e) {
					e.preventDefault();
					$('#popup_modification_alliers').popUpWindow({
						action: "open",
						size: "small",
					});
				});
				});
			</script>
			<script>

function Ajout_allier() {
	var alliance = document.querySelector('#TAG_allier').value,
		ligne = document.querySelector('#liste_alliers').insertRow(document.querySelector('#liste_alliers').rows.length-1),
		cell = ligne.insertCell(0),
		cell2 = ligne.insertCell(1);
	cell.innerHTML = '<input type="hidden" name="alliances[]" value="' + alliance + '">' + alliance;
	cell2.innerHTML = '<img  src="http://www.icone-png.com/png/25/24717.png" width="15" onclick="Supprimer_allier(\'' + alliance + '\')">';
	
	
	if(alliance != '') {
		var	tableau1 = document.querySelector('#droits_alliers'),
			tableau2 = document.querySelector('#droits_alliers_2'),
			lignes1 = tableau1.rows,
			lignes2 = tableau2.rows,
			membre = document.createElement('th'),
			gestionnaire = document.createElement('th'),
			chef = document.createElement('th');	
		membre.innerHTML = 'Membre ' + alliance;
		gestionnaire.innerHTML = 'Gestionnaire ' + alliance;
		chef.innerHTML = 'Chef ' + alliance;
		membre.setAttribute('class', 'cell_' + alliance);
		gestionnaire.setAttribute('class', 'cell_' + alliance);
		chef.setAttribute('class', 'cell_' + alliance);
		lignes2[0].appendChild(membre);
		lignes2[0].appendChild(gestionnaire);
		lignes2[0].appendChild(chef);
		for(var i=1; i<lignes2.length; i++) {
			var membre = lignes2[i].insertCell(-1),
				gestionnaire = lignes2[i].insertCell(-1),
				chef = lignes2[i].insertCell(-1),
				input_membre = document.createElement('input'),
				input_gestionnaire = document.createElement('input'),
				input_chef = document.createElement('input');
			membre.setAttribute('class', 'cell_' + alliance);
			gestionnaire.setAttribute('class', 'cell_' + alliance);
			chef.setAttribute('class', 'cell_' + alliance);
			input_membre.setAttribute('name', lignes2[i].dataset.option + '_Membre_' + alliance);
			input_gestionnaire.setAttribute('name', lignes2[i].dataset.option + '_Gestionnaire_' + alliance);
			input_chef.setAttribute('name', lignes2[i].dataset.option + '_Chef_' + alliance);
			input_membre.type = 'checkbox';
			input_gestionnaire.type = 'checkbox';
			input_chef.type = 'checkbox';
			membre.appendChild(input_membre);
			gestionnaire.appendChild(input_gestionnaire);
			chef.appendChild(input_chef);
		}
		document.querySelector('#TAG_allier').value = '';
	}
}

function Supprimer_allier(TAG) {
	var cells = document.querySelectorAll('.cell_' + TAG);
	for(var i=0; i<cells.length; i++) {
		ze_Supprimer_element(cells[i]);
	}
}
			</script>
		</form>
	</body>
</html>

