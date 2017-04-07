<!DOCTYPE html>
<html lang="fr">
	<head>
		<?=HTMLGenerique::get_header() ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp();?>
			</div>
			<div class="main">
				<div class="grid grid-pad" style="max-width:100%">
					<div style="font-weight:bold;color:red;text-align:center;height:30px" id="message_info"></div>
					<div class="col-1-1">
						<a href="#" class="bouton" onclick="Validation_rangs();return false;">Enregistrer</a>
						<?php foreach($rangs->alliances_accessibles as $TAG) { ?>
						<br><br>
						<div class="zone_contenu zone_invisible zone_grand_tableau_simple">
							<div class="zone_tableau">
								<table class="tableau_ombre" id='liste_rangs_<?php echo str_replace('.', '', $TAG) ?>'>
									<tr>
										<?php if($rangs->partage_active) { ?><th></th><?php } ?>
										<th>Mode</th>
										<th>Règle</th>
										<th>Rôle</th>
										<th>NPF</th>
										<th>Alliances</th>
										<th>Couleur</th>
										<th>Rang affiché</th>
										<th>Statut</th>
										<th></th>
										<th></th>
										<th></th>
									</tr>
									<?php  $n=0;if(isset($rangs->rangs[$TAG])){foreach($rangs->rangs[$TAG] as $d){$n++; ?>
									<tr>
										<?php if($rangs->partage_active) { ?><td class="createur"><?php echo $d['createur'] ?></td><?php } ?>
										<td>
											<select class="mode_rang">
												<option value="0" <?php if($d['mode'] == 0){echo 'selected';} ?>>Pseudos</option>
												<option value="1" <?php if($d['mode'] == 1){echo 'selected';} ?>>Alliances</option>
												<option value="2" <?php if($d['mode'] == 2){echo 'selected';} ?>>Expression régulière</option>
												<option value="3" <?php if($d['mode'] == 3){echo 'selected';} ?>>Mot contenu</option>
											</select>
										</td>
										<td><input type="text" class="input_haut input_tableau regle_rang" placeholder="joueur1, joueur2" value="<?php echo $d['regle'] ?>"></td>
										<td>
											<select class="role_rang">
												<option value="inconnu" <?php if($d['role'] == 'inconnu'){echo 'selected';} ?>>Non spécifié</option>
												<option value="grenier" <?php if($d['role'] == 'grenier'){echo 'selected';} ?>>Grenier</option>
												<option value="passeur" <?php if($d['role'] == 'passeur'){echo 'selected';} ?>>Passeur</option>
												<option value="chasseur" <?php if($d['role'] == 'chasseur'){echo 'selected';} ?>>Chasseur</option>
												<option value="hors_chaine" <?php if($d['role'] == 'hors_chaine'){echo 'selected';} ?>>Hors Chaine</option>
												<option value="ennemi" <?php if($d['role'] == 'ennemi'){echo 'selected';} ?>>Ennemi</option>
												<option value="allie" <?php if($d['role'] == 'allie'){echo 'selected';} ?>>Allié</option>
											</select>
										</td>
										<td><input type="checkbox" class="NPF_rang" <?php if($d['ne_pas_flooder']) { echo 'checked';} ?>></td>
										<td><input type="text" class="input_moyen input_haut alliances_rang" value="<?php echo $d['alliances'] ?>"></td>
										<td><input class="color input_tableau" id="td_couleur_<?php  echo $n ?>" value="<?php echo $d['couleur'] ?>"></td>
										<td><input type="text" class="input_tableau input_haut rang_affiche" value="<?php echo $d['rang_affiche'] ?>"></td>
										<td>
											<select class="partage_rang" <?php if($d['createur'] != $alliance->alliance){echo 'disabled';} ?>>
												<option value="partage" <?php if($d['statut']){echo 'selected';} ?>>Rang partagé</option>
												<option value="prive" <?php if(!$d['statut']){echo 'selected';} ?>>Rang privé</option>
											</select>
										</td>
										<td style="padding:0"><img src="/Images/Fleche_haut.png" width="30px" onclick="Switch_rang(this.parentNode.parentNode)"></td>
										<td style="padding:0"><img src="/Images/Fleche_bas.png" width="30px" onclick="Switch_rang(this.parentNode.parentNode.nextElementSibling)"></td>
										<td><img src="/Images/suppression.png" width="15px" onclick="ze_Supprimer_element(this.parentNode.parentNode);"></td>
									</tr>
									<?php }} if($TAG == $chef->alliance) { ?>
									<tr>
										<td colspan="12"><a href="#" class="bouton" onclick="Ajouter_rang('<?php echo $TAG ?>');return false;">Créer un rang</a></td>
									</tr>
									<?php } ?>
								</table>
							</div>
						</div>
						<?php } ?>
						<br><br>
						<a href="#" class="bouton" onclick="Validation_rangs();return false;">Enregistrer</a>
					</div>
				</div>

				<form method="POST" action="">
				</form>
			</div>
		</div>
		<script src="/Javascript/GestionAlliance.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/jscolor/jscolor.js"></script>
		<script>
			var partage = <?php echo ($rangs->partage_active ? 'true' : 'false') ?>;


function Validation_rangs() {
	var createur = document.querySelectorAll('.createur'),
		mode_rang = document.querySelectorAll('.mode_rang'),
		regle_rang = document.querySelectorAll('.regle_rang'),
		role_rang = document.querySelectorAll('.role_rang'),
		NPF_rang = document.querySelectorAll('.NPF_rang'),
		alliances_rang = document.querySelectorAll('.alliances_rang'),
		color = document.querySelectorAll('.color'),
		rang_affiche = document.querySelectorAll('.rang_affiche'),
		partage_rang = document.querySelectorAll('.partage_rang'),
		donnees = new Array();
	for(var i=0; i<mode_rang.length; i++) {
		donnees.push({
				createur : ((createur[i]) ? createur[i].innerHTML : ''),
				mode_rang : mode_rang[i].value,
				regle_rang : regle_rang[i].value,
				role_rang : role_rang[i].value,
				NPF_rang : NPF_rang[i].checked,
				alliances_rang : alliances_rang[i].value,
				color : color[i].value,
				rang_affiche : rang_affiche[i].value,
				partage_rang : (partage_rang[i].value == 'partage'),
					});
	}
	var input = document.createElement('input');
	input.type = 'hidden';
	input.name = 'rangs_details';
	input.value = JSON.stringify(donnees);
	document.querySelector('form').appendChild(input);
	document.querySelector('form').submit();
}

function Ajouter_rang(TAG) {
	var tableau = document.querySelector('#liste_rangs_' + TAG.replace(/\./g,'')),
		longueur = tableau.rows.length;
		ligne = tableau.insertRow(longueur - 1);
	if(partage) {
		var cell = ligne.insertCell(0);
		cell.innerHTML = TAG;
		cell.setAttribute('class', 'createur');
	}
	ligne.insertCell(-1).innerHTML = '<select class="mode_rang"><option value="0">Pseudos</option><option value="1">Alliances</option><option value="2">Expression régulière</option><option value="3">Mot contenu</option></select>';
	ligne.insertCell(-1).innerHTML = '<input type="text" class="input_haut input_tableau regle_rang" placeholder="joueur1, joueur2"></td>';
	ligne.insertCell(-1).innerHTML = '<select class="role_rang"><option value="inconnu">Non spécifié</option><option value="grenier">Grenier</option><option value="passeur">Passeur</option><option value="chasseur">Chasseur</option><option value="hors_chaine">Hors Chaine</option><option value="ennemi">Ennemi</option><option value="allie">Allié</option></select>';
	ligne.insertCell(-1).innerHTML = '<input type="checkbox" class="NPF_rang">';
	ligne.insertCell(-1).innerHTML = '<input type="text" class="input_moyen input_haut alliances_rang" value="*">';
	ligne.insertCell(-1).innerHTML = '<input class="color input_tableau" id="td_couleur_' + (longueur - 1) + '" value="66ff00">';
	ligne.insertCell(-1).innerHTML = '<input type="text" class="input_tableau input_haut rang_affiche">';
	ligne.insertCell(-1).innerHTML = '<select class="partage_rang"><option value="partage">Rang partagé</option><option value="prive">Rang privé</option></select>';
	var cell_1 = ligne.insertCell(-1),
		cell_2 = ligne.insertCell(-1);
	cell_1.setAttribute('style', 'padding:0');
	cell_2.setAttribute('style', 'padding:0');
	cell_1.innerHTML = '<img src="/Images/Fleche_haut.png" width="30px" onclick="Switch_rang(this.parentNode.parentNode)">';
	cell_2.innerHTML = '<img src="/Images/Fleche_bas.png" width="30px" onclick="Switch_rang(this.parentNode.parentNode.nextElementSibling">';
	var col = new jscolor.color(document.querySelector('#td_couleur_' + (longueur-1)));
	col.fromHSV(9,9,9)
	ligne.insertCell(-1).innerHTML = '<img src="/Images/suppression.png" width="15px" onclick="ze_Supprimer_element(this.parentNode.parentNode);">';
}

function Switch_rang(row) {
    var sibling = row.previousElementSibling,
        anchor = row.nextElementSibling,
        parent = row.parentNode;
    parent.insertBefore(row, sibling);
}

		</script>
	</body>
</html>
