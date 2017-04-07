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
					<div class="grid grid-pad entete_grid">
						<div class="col-1-4">
							<div class="ancre" id="ancre_principale" onclick="Afficher_section(0)">Compte Fourmizzz</div>
						</div>
						<div class="col-1-4">
							<div class="ancre" id="ancre_imports_manuels" onclick="Afficher_section(1)">Attaques et Chasses</div>
						</div>
						<div class="col-1-4">
							<div class="ancre" id="ancre_sondes" onclick="Afficher_section(2)">Sondes et Antisondes</div>
						</div>
						<div class="col-1-4">
							<div class="ancre" id="ancre_zzzelpscript" onclick="Afficher_section(3)">ZzzelpScript</div>
						</div>
					</div>
					<div class="grid grid-pad animated slideInLeft"  style="display:none">
						<div class="col-1-1">
							<div class="zone_contenu zone_largeur_courte">
								<div class="entete_cadre">Informations principales</div>
								<?php for($i=0;$i<3;$i++) { ?>
								<div class="ligne_cadre_structure">
									<span 
										<?php 
										if(count($compte->alliances) > $i) {
											if($compte->alliances[$i]->droits == 0) {
												echo 'style="color:#DA1010;font-weight:600;"';
											} 
											else{
												echo'style="color:#006400;font-weight:600;"';
											}
										}
										?>
										>Alliance n°<?php echo $i+1 ?> :
									</span>
									<input type="text" class='input_moyen'  name="alliances[]" value="<?php echo (count($compte->alliances) > $i) ? $compte->alliances[$i]->alliance : ''; ?>">
								</div>
								<?php  } ?>
								<div class="ligne_cadre_structure">
									<span>Ouvrières :</span>
									<input class='input_large' type="text" name="ouvrieres" id="ouvrieres" onkeyup="ze_Ajout_espaces(this)" value="<?php echo Nombre::Espaces($compte->niveaux->ouvrieres); ?>">
								</div>
								<div class="ligne_cadre_structure">
									<span>Colon :</span>
									<input class='input_large' type="text" name="colonisateur" value="<?php echo $compte->niveaux->colonisateur; ?>">
								</div>
							</div>
						</div>
						<div class="col-1-3">
							<div class="zone_informations zone_ombree">
								<div class="entete_cadre">Armée</div>
								<div class="ligne_cadre_structure" style="text-align: center;">
									<a href="#modal-content" id="open_popup_armee">Copier votre armée</a>
								</div>
								<?php for($i=0; $i<14; $i++) { ?>
								<div class="ligne_cadre_structure">
									<span class="nom_long"><?php echo Fourmizzz::$unites['noms_pluriels'][$i]; ?></span>
									<span class="nom_court"><?php echo Fourmizzz::$unites['TAGs'][$i]; ?></span>
									 :
									<input class='input_large' type="text" id="unite_<?php echo $i ?>" name="armee[]" value="<?php $nom=Fourmizzz::$unites['TAGs'][$i]; echo Nombre::Espaces($compte->niveaux->$nom); ?>" onkeyup="ze_Ajout_espaces(this)">
								</div>
								<?php } ?>
							</div>
						</div>
						<div class="col-1-3">
							<div class="zone_constructions zone_ombree">
								<div class="entete_cadre">Constructions</div>
								<?php for($i=0;$i<13;$i++) {?>
								<div class="ligne_cadre_structure">
									<span class="nom_long"><?php echo Fourmizzz::$constructions[$i]; ?></span>
									<span class="nom_court"><?php echo Fourmizzz::$constructions_mini[$i]; ?></span>
									 : 
									<input type="text" class='input_niveau'  name="construction[]" value="<?php $nom=Fourmizzz::$constructions_bdd[$i];echo $compte->niveaux->$nom; ?>">
								</div>
								<?php  } ?>
							</div>
						</div>
						<div class="col-1-3">
							<div class="zone_recherches zone_ombree">
								<div class="entete_cadre">Laboratoire</div>
								<?php for($i=0;$i<10;$i++) {?>
								<div class="ligne_cadre_structure">
									<span class="nom_long"><?php echo Fourmizzz::$recherches[$i]; ?></span>
									<span class="nom_court"><?php echo Fourmizzz::$recherches_mini[$i]; ?></span>
									 : 
									<input type="text" class='input_niveau'  name="recherche[]" value="<?php $nom=Fourmizzz::$recherches_bdd[$i];echo $compte->niveaux->$nom; ?>">
								</div>
								<?php  } ?>
							</div>
						</div>
					</div>
					<div class="grid grid-pad animated slideInLeft" style="display:none">
						<div class="col-1-2">
							<div class="zone_parametres_chasses zone_ombree">
								<div class="entete_cadre">Chasses</div>
								<textarea placeholder="Copiez vos chasses en cours ici"></textarea><br>
								<a href="#zone_releves_chasses" class="bouton bouton_rouge" onclick="Analyse_releves('chasses', document.querySelector('.zone_parametres_chasses textarea').value)">Analyser</a>
								<div id="zone_releves_chasses">
								</div>						
							</div>
						</div>
						<div class="col-1-2">
							<div class="zone_parametres_floods zone_ombree">
								<div class="entete_cadre">Floods</div>
								<textarea placeholder="Copiez vos attaques en cours ici"></textarea><br>
								<a href="#zone_releves_floods" class="bouton bouton_rouge" onclick="Analyse_releves('floods', document.querySelector('.zone_parametres_floods textarea').value)">Analyser</a>
								<div id="zone_releves_floods">
								</div>
							</div>
						</div>
					</div>
					<div class="grid grid-pad animated slideInLeft" style="display:none">
						<div class="col-1-2">
							<div class="zone_parametres_sondes zone_ombree">
								<div class="entete_cadre">Sondes</div>							
								<table class="tableau_ombre">
									<tr>
										<th>Lieu</th>
										<th>Nombre</th>
										<th>Unité</th>
									</tr>
									<?php for($n=0;$n<2;$n++){ ?>
									<tr>
										<td><?php echo Fourmizzz::$lieux[$n+1] ?> :</td>
										<td><input name='nombre_sonde_<?php echo ($n+1); ?>' type='text' value="<?php echo number_format($compte->schema_sonde[$n]['valeur'], 0, '.' , ' ');?>" class='input_moyen' onkeyup="ze_Ajout_espaces(this)"></td>
										<td>
											<select name='unite_sonde_<?php echo ($n+1); ?>'>
												<?php for($i=0;$i<14;$i++){ ?>
													<option <?php if ($compte->schema_sonde[$n]['unite'] == $i) { echo 'selected'; } ?>><?php echo Fourmizzz::$unites['TAGs'][$i]; ?></option>
												<?php  } ?>
											</select>
										</td>
									</tr>
									<?php  } ?>
								</table>
							</div>
						</div>
						<div class="col-1-2">
							<div class="zone_parametres_sondes zone_ombree">
								<div class="entete_cadre">Antisondes</div>							
								<table class="tableau_ombre">
									<tr>
										<th>Lieu</th>
										<th>Nombre</th>
										<th>Unité</th>
									</tr>
									<?php for($n=0;$n<2;$n++){ ?>
									<tr>
										<td><?php echo Fourmizzz::$lieux[$n] ?> :</td>
										<td><input name='nombre_antisonde_<?php echo ($n+1); ?>' type='text' value="<?php echo number_format($compte->schema_antisonde[$n]['valeur'], 0, '.' , ' ');?>" class='input_moyen' onkeyup="ze_Ajout_espaces(this)"></td>
										<td>
											<select name='unite_antisonde_<?php echo ($n+1); ?>'>
												<?php for($i=0;$i<14;$i++){ ?>
													<option <?php if ($compte->schema_antisonde[$n]['unite'] == $i) { echo 'selected'; } ?>><?php echo Fourmizzz::$unites['TAGs'][$i]; ?></option>
												<?php  } ?>
											</select>
										</td>
									</tr>
									<?php  } ?>
								</table>
							</div>
						</div>
					</div>
					<div class="grid grid-pad animated slideInLeft" style="display:none">
						<div class="col-1-1">
							<div>
								<?php foreach($script->options as $categorie => $valeurs) { ?>
								<div class="cadre_structure" id="module_<?php echo $module ?>">
									<div class="entete_cadre"><?php echo $valeurs['nom'] ?></div>
									<?php foreach($script->options[$categorie]['parametres'] as $titre => $parametre) { ?>
									<div class="ligne_cadre_structure module_<?php echo $module ?>">
										<?php echo $parametre['nom'] ?>
										<input type="checkbox" value="1" name="parametre_<?php echo $titre ?>" <?php if($parametre['active'] == 1){echo 'checked=checked';} ?>>
									</div>
									<?php } ?>
								</div>
								<br><br>
								<?php  } ?>
							</div>
						</div>
					</div>
					<div class="zone_validation_compte">
						<input type="submit" class="bouton" value="Valider" name="MAJ_niveaux">
					</div>
					<input type="hidden" name="serveur" value="<?php echo $onglet ?>">
				</form>
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
		<script src="/Javascript/Compte.js"></script>
		<script src="/Javascript/Pontes.js"></script>
		<link rel="stylesheet" type="text/css" href="/Style/animate.css" />
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
		</script>
		<script>
			var serveur = "<?php echo $_GET['onglet'] ?>";

			Afficher_section(0);

function Afficher_section(section) {
	var sections = document.querySelectorAll('.grid:not(.zone_validation_compte):not(.entete_grid)');
	for(var i=0; i<sections.length; i++) {
		sections[i].style.display = (i == section) ? '' : 'none';
	}
}
		</script>
	</body>
</html>


