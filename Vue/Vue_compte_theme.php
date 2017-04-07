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
				<form method="POST" action="">
					<div class="grid grid-pad">
						<div class="col-1-1">
							<div class="zone_contenu zone_creation_theme zone_invisible">
								<br><br>
								<div class="cadre_structure" id="parametres_generiques" style="margin-bottom:3em;">
									<div class="entete_cadre">Paramètres d'interface</div>
									<div class="ligne_cadre_structure">
										<span>Fond : </span>
										<select onchange="Modifier_parametre_fond(this.value, 'generiques')" name="mode_fond_joueur">
											<option value="defaut" <?php if($themes->theme_actuel['mode_fond'] == 'defaut') { echo 'selected'; } ?>>Fond du thème</option>
											<option value="unie" <?php if($themes->theme_actuel['mode_fond'] == 'unie') { echo 'selected'; } ?>>Fond uni</option>
											<option value="image" <?php if($themes->theme_actuel['mode_fond'] == 'image') { echo 'selected'; } ?>>Image</option>
										</select>
									</div>
									<div class="ligne_cadre_structure">
										<span>URL image : </span>
										<input type="text" class="input_long" id="input_image" name="url_fond" <?php if($themes->theme_actuel['mode_fond'] == 'image') { echo 'value="'.$themes->theme_actuel['valeur_fond'].'"'; }else {echo 'disabled';} ?>>
									</div>
									<div class="ligne_cadre_structure">
										<span>Fond : </span>
										<input class="color input_court" id="input_unie" name="couleur_fond" <?php if($themes->theme_actuel['mode_fond'] == 'unie') { echo 'value="'.$themes->theme_actuel['valeur_fond'].'"'; }else {echo 'disabled';} ?>>
									</div>
									<?php if($this->droit_theme) { ?>
								</div>
								<div class="cadre_structure">
									<div class="entete_cadre">Choix du thème</div>
									<?php foreach($themes->themes as $theme) { ?>
									<div class="ligne_cadre_structure">
										<span><?php echo $theme['nom']; ?> (<?php echo $theme['createur'] ?>) : </span>
										<input type="radio" name="theme_selection" <?php if($theme['select']) { echo 'checked="checked"';} ?> value="<?php echo $theme['ID'] ?>" onclick="Lancement_creation_theme()">
									</div>
									<?php } ?>
									<div class="ligne_cadre_structure">
										<span>Créer votre thème : </span>
										<input type="radio" id="check_nouveau_theme" value="0" name="theme_selection" onclick="Lancement_creation_theme()">
									</div>
									<?php }else { ?>
									<div style="display:none">
										<input type="radio" name="theme_selection" checked="checked" value="1">
									</div>
									<?php } ?>
								</div>
								<input type="submit" name="modif_theme" value="Enregistrer" class="bouton">
								<br><br>
								<?php if($this->droit_theme) { ?>
								<div id="nouveau_theme" style="display:none">
									<div class="cadre_structure" id="parametres_nouveau">
										<div class="entete_cadre">Général</div>
										<div class="ligne_cadre_structure">
											<span>Nom du thème : </span>
											<input type="text" class="input_long" id="nom_theme">
										</div>
										<div class="ligne_cadre_structure">
											<span>Fond : </span>
											<select onchange="Modifier_parametre_fond(this.value, 'nouveau')" id="mode_nouveau_fond">
												<option value="unie" selected>Fond uni</option>
												<option value="image">Image</option>
											</select>
										</div>
										<div class="ligne_cadre_structure">
											<span>Lien : </span>
											<input type="text" class="input_long" id="input_image" name="url_fond" disabled>
										</div>
										<div class="ligne_cadre_structure">
											<span>Fond : </span>
												<input class="color input_court" id="input_unie" value="F6FFFF">
												<input class="input_court" placeholder="opacité (0.8)" type="text"  style="visibility:hidden">
										</div>
										<div class="entete_cadre">Tableaux</div>
										<div class="ligne_cadre_structure">
											<span>Couleur entête : </span>
											<span class="ligne_inputs" id="entete_table">
												<input class="color input_court" value="3498DB">
												<input class="input_court" placeholder="opacité (0.8)" value="0.7" type="text">
											</span>
										</div>
										<div class="entete_cadre">Cadre contenu</div>
										<div class="ligne_cadre_structure">
											<span>Couleur titres : </span>
											<span class="ligne_inputs" id="texte_entete">
												<input class="color input_court" value="2C3E50">
												<input class="input_court" placeholder="opacité (0.8)" value="1.0" type="text">
											</span>
										</div>
										<div class="ligne_cadre_structure">
											<span>Fond général : </span>
											<span class="ligne_inputs" id="fond_contenu">
												<input class="color input_court" value="3498DB">
												<input class="input_court" placeholder="opacité (0.8)" value="0.7" type="text">
											</span>
										</div>
										<div class="ligne_cadre_structure">
											<span>Fond opaque : </span>
											<span class="ligne_inputs" id="fond_lisible">
												<input class="color input_court" value="3498DB">
												<input class="input_court" placeholder="opacité (0.8)" value="0.85" type="text">
											</span>
										</div>
										<div class="entete_cadre">Boutons</div>
										<div class="ligne_cadre_structure">
											<span>Couleur fond 1 : </span>
											<span class="ligne_inputs" id="couleur_1_bouton">
												<input class="color input_court" value="378DE5">
												<input class="input_court" placeholder="opacité (0.8)" value="1.0" type="text">
											</span>
										</div>
										<div class="ligne_cadre_structure" id="couleur_2_bouton">
											<span>Couleur fond 2 : </span>
											<span class="ligne_inputs">
												<input class="color input_court" value="79BBFF">
												<input class="input_court" placeholder="opacité (0.8)" value="1.0" type="text">
											</span>
										</div>
										<div class="ligne_cadre_structure">
											<span>Ombre : </span>
											<span class="ligne_inputs" id="ombre_bouton">
												<input class="color input_court" value="BBDAF7">
												<input class="input_court" placeholder="opacité (0.8)" value="1.0" type="text">
											</span>
										</div>
										<div class="ligne_cadre_structure">
											<span>Couleur texte : </span>
											<span class="ligne_inputs" id="texte_bouton">
												<input class="color input_court" value="000000">
												<input class="input_court" placeholder="opacité (0.8)" value="0.9" type="text">
											</span>
										</div>
									</div>
									<div class="barre_boutons">
										<a class="bouton" onclick="Previsualisation_theme()">Prévisualiser</a>
										<a class="bouton" onclick="Generation_JSON_theme()">Enregistrer</a>
									</div>
								</div>
								<?php } ?>
							</div>
						</div>
					</div>
					<?php if($this->droit_theme) { ?>
					<br><br>
					<div class="grid grid-pad zone_previsualisation" style="display:none">
						<div class="col-1-2">
							<div class="zone_contenu zone_largeur_courte hauteur_courte">
								<div class="entete_cadre">Exemple cadre contenu</div>
								<br>
								<?php for($i=0; $i<10; $i++) { ?>
								<div class="ligne_cadre_structure">
									<span>Champ <?php echo ($i+1); ?> : </span>
									<input type="text" class="<?php echo (($i<5)?'input_long':'input_niveau'); ?>" value="<?php echo (($i<5)?'':(3*$i+4)); ?>">
								</div>
								<?php } ?>
							</div>
							<div class="zone_contenu zone_lisible">
							   <div class="cadre_structure">
									<div class="entete_cadre">Zone lisible</div>
									<div class="coutenu_textuel">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus finibus pulvinar massa, vitae auctor tortor condimentum id. Proin et porttitor elit. Donec sit amet erat quis quam venenatis rhoncus. Integer in magna libero. Aenean luctus pretium elit, id varius augue tincidunt non. Aenean sit amet odio eu quam tincidunt sollicitudin sit amet ac tortor. Sed ac velit mattis, ultricies erat ut, placerat massa. Suspendisse potenti. Integer vulputate ante ut erat aliquam vehicula. Cras eu interdum erat, vitae ornare lectus. Nunc vitae tempus nibh. Phasellus tempus blandit urna tristique venenatis. Aliquam pulvinar nulla tellus, vel scelerisque velit hendrerit at. Etiam pellentesque, urna nec aliquam dignissim, enim leo cursus nibh, in imperdiet risus urna nec eros.
										<br><br>
									</div>						   
							   </div>
						   </div>
						   <br><br>
						</div>
						<div class="col-1-2">
							<table class="tableau_ombre" id="tableau_combat">
								<tr>
									<th>Numero</th>
									<th>Valeur 1</th>
									<th>Valeur 2</th>
								</tr>
								<?php for($i=0; $i<10; $i++) { ?>
								<tr>
									<td>Ligne <?php echo ($i+1); ?> : </td>
									<td><input type="text" class="input_niveau"></td>
									<td><input type="text" class="input_long"></td>
								</tr>
								<?php } ?>
							</table>
							<a class="bouton">Bouton</a>							
						</div>
					</div>
					<?php } ?>
				</form>		
			</div>
		</div>	
		<script type="text/javascript" src="/Javascript/jscolor/jscolor.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/Compte.js"></script>
	</body>
</html>
