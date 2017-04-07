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
							<div class="sous_entete_cadre"><a id="open_popup_chasse" href="#modal-content">Coller votre armée</a></div>
							<?php $armee=$chasses->get_Armee();$n=0;foreach(Fourmizzz::$unites['noms_singulier'] as $unite) {$n++; ?>
								<div class="ligne_cadre_structure">
									<span><?php echo $unite ?> : </span>
									<input type="text" class="input_tableau" id="unite_<?php echo $n ?>" onkeyup='ze_Ajout_espaces(this)' 
										<?php echo 'value="'.number_format($armee[$n-1], 0, '.' , ' ').'"'; ?>>
								</div>
							<?php } ?>
						</div>
					</div>
					<div class="col-1-2">
						<div class="zone_contenu zone_largeur_courte">
							<div class="ligne_cadre_structure">
								<span>Serveur :</span>
								<select name="serveur" id="serveur" onchange="Changement_serveur()">
									<?php  foreach(Fourmizzz::$serveur_complet as $s => $serveur) { ?>
									<option value="<?php echo $s ?>" <?php if(isset($_GET['serveur']) AND $_GET['serveur'] == $s) { echo 'selected="selected"';} ?>><?php echo $serveur ?></option>	
									<?php  } ?>
								</select>
							</div>
							<div class="ligne_cadre_structure">
								<span>Difficulté :</span>
								<select id="difficulte">
									<?php $n=-1;foreach ($chasses->difficultes as $diff => $do){;$n++; ?>
									<option value="<?php echo $n ?>" style="color:<?php echo $do['couleur'] ?>" <?php if($do['selected']) { echo 'selected="selected"'; } ?>>
										<?php echo number_format($do['ratio'], 2, '.' , ' ') ?>
									</option>
									<?php  } ?>
								</select>
							</div>
							<div class="ligne_cadre_structure">
								<span>Type de chasses :</span>
								<select id="mode_chasse" onchange="Changement_mode(this.value, true);Simulation()">
									<option value="1" selected>Classique</option>
									<option value="2">TDC voulu</option>
									<option value="3">FDF voulue</option>
									<!--<option value="4">Date retour</option>-->
								</select>
							</div>
							<div class="ligne_cadre_structure">
								<span>Répartition des unités :</span>
								<select id="repartition_unites" onchange="Simulation()">
									<option value="1">Intelligente</option>
									<option value="2">Uniforme</option>
								</select>
							</div>
							<div class="entete_menu_cache" onclick="Affichage_options_avancees('options_generales')">Options générales</div>
							<div class="zone_opaque">
								<?php foreach($chasses->parametres as $parametre => $donnees) { ?>
								<div class="ligne_cadre_structure ligne_cache options_generales">
									<span><?php echo $parametre ?> :</span>
									<input type="text" class="input_<?php echo $donnees['input'] ?> parametres" <?php if($donnees['espaces']) { echo 'onkeyup="Ajout_espaces(\''.$donnees['id'].'\')"';} ?> id="<?php echo $donnees['id'] ?>">
								</div>
								<?php } ?>
							</div>
							<div class="entete_menu_cache" onclick="Affichage_options_avancees('option_' + new Array('', 'classique', 'TDC_voulu', 'FDF_voulu', 'Date_retour')[document.querySelector('#mode_chasse').value])">Options spécifiques</div>							
							<div class="zone_opaque" id="zone_options_specifiques">
								<div class="ligne_cadre_structure ligne_cache option_classique">
									<span>Nombre de chasses :</span>
									<span class="ligne_inputs">	
										<select id="nombre_chasses" disabled>
										</select>
										<input type="checkbox" id="nombre_chasses_auto" checked onclick="document.querySelector('#nombre_chasses').disabled = (this.checked)"> auto
									</span>
								</div>
								<div class="ligne_cadre_structure ligne_cache option_classique">
									<span>TDC par chasse :</span>
									<span class="ligne_inputs">
										<input type="text" class="input_tableau" id="TDC_chasses" disabled onkeyup='ze_Ajout_espaces(this)' >
										<input type="checkbox" id="TDC_chasses_auto" checked onclick="document.querySelector('#TDC_chasses').disabled = (this.checked)"> auto					
									</span>
								</div>
								<div class="ligne_cadre_structure ligne_cache option_classique">
									<span>Envoyer unités XP :</span>
									<span class="ligne_inputs">	
										<input checked type="checkbox" id="envoi_unites_XP" onchange="Simulation();">
									</span>
								</div>
								<div class="ligne_cadre_structure ligne_cache option_classique">
									<span>JSN à garder :</span>
									<span class="ligne_inputs">	
										<input type="text" class="input_tableau" id="JSN_gardees" value="0" onkeyup="ze_Ajout_espaces(this)" onblur="Simulation();">
									</span>
								</div>
								<div class="ligne_cadre_structure ligne_cache option_TDC_voulu">
									<span>TDC à chasser :</span>
									<input type="text" class="input_tableau" value="0" id="TDC_voulu" onkeyup="ze_Ajout_espaces(this)" onblur="Simulation();">
								</div>
								<div class="ligne_cadre_structure ligne_cache option_FDF_voulu">
									<span>FDF à envoyer :</span>
									<input type="text" class="input_tableau" value="0" id="FDF_voulue" onkeyup="ze_Ajout_espaces(this)" onblur="Simulation();">
								</div>
								<div class="ligne_cadre_structure ligne_cache option_FDF_voulu">
									<span>Envoyer le reste à la fin :</span>
									<input type="checkbox" id="reste_fin" checked onchange="Simulation();">
								</div>
								<div class="ligne_cadre_structure ligne_cache option_Date_retour">
									<span>Date de retour : </span>
									<input type="text" class="input_tableau" id="Date_retour" value="<?php echo date("d/m/Y").' '.date('H:i') ?>" onchange="Simulation();">
								</div>
							</div>
							<div class="entete_menu_cache" onclick="Affichage_options_avancees('priorites_XP')">Priorité d'XP</div>
							<div class="zone_opaque">
								<?php $n=0;foreach($chasses->get_PrioXP() as $index) {$n++; ?>
								<div class="ligne_cadre_structure priorites_XP ligne_cache">
									<span><?php echo $n ?> - </span>
									<span><?php echo Fourmizzz::$unites['noms_singulier'][$index] ?></span>
									<img src="/Images/Fleche_haut.png" onclick="Modification_ordre_prio_XP(this.parentNode, true)">
									<img src="/Images/Fleche_bas.png"  onclick="Modification_ordre_prio_XP(this.parentNode, false)">
								</div>
								<?php } ?>
							</div>
						</div>
					</div>
				</div>		
				<div class="barre_boutons">
					<a href="#" class="bouton" onclick="Importer_armee()">Importer armée</a>
					<a href="#" class="bouton" onclick="Simulation()">Calculer</a>
				</div>
				<div class="zone_bug">
				</div>
				<div class="grid grid-pad" style="max-width:100%">
					<div class="col-1-1">
						<div class="entete_chasses">
						</div>
						<br><br>
						<div class="zone_contenu zone_invisible zone_grand_tableau">
							<div class="zone_tableau">
								<div class="insertion_tableau"></div>
							</div>
							<div class="zone_tableau">
								<div class="insertion_tableau"></div>
							</div>
						</div>
						<div class="zone_lien">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="popup_chasse" class="pop-up-display-content">
			<p>
				<center>
					<textarea id="releve_armee" onkeyup="Chargement_armee()"></textarea>
				</center>
			</p>
		</div>
		<div class="zone_popup">
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/popupwindow.js"></script>
		<script src="/Javascript/Chasses.js"></script>
		<script>
			$(document).ready(function () {
			$('#open_popup_chasse').click(function(e) {
				e.preventDefault();
				$('#popup_chasse').popUpWindow({
					action: "open",
					size: "small",
				});
				document.querySelector('#releve_armee').focus();
			});
			});
		</script>
		<script>
			var niveaux = <?php echo $chasses->niveaux ?>,
				TDCs = <?php echo $chasses->TDCs ?>;
			Changement_serveur();
			Affichage_options_avancees('option_' + new Array('', 'classique', 'TDC_voulu', 'FDF_voulu', 'Date_retour')[document.querySelector('#mode_chasse').value])

			MAJ_nombre_chasses();
			document.querySelector('#vitesse_chasse').onchange = function onchange(event) {MAJ_nombre_chasses(); return false};
			Simulation();



		</script>
	</body>
</html>
