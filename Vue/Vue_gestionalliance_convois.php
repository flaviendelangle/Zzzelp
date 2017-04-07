<!DOCTYPE html>
<html lang="fr">
	<head>
		<?=HTMLGenerique::get_header() ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp(); ?>
			</div>
			<div class="main">
				<div class="grid grid-pad grid_separee barre_nav" style="max-width: 767px;">
					<div class="col-1-2">
						<div class="ancre" onclick="Afficher_section_gestion('convois')">
							Convois <?php echo $alliance->alliance ?>
						</div>
					</div>
					<div class="col-1-2">
						<div class="ancre" onclick="Afficher_section_gestion('parametres')">
							Paramètres de création
						</div>
					</div>
				</div>
				<div class="zone_convois animated slideInLeft" style="display:none">
					<div class="grid grid-pad grid_separee">
						<div class="col-1-3">
							<div class="ancre" id="ancre_principale" onclick="document.location.href='<?php echo Zzzelp::$url_site ?>creationconvois/interne?alliance=<?php echo $alliance->alliance ?>&serveur=<?php echo $alliance->serveur ?>'">
								Créer des convois
							</div>
						</div>
						<div class="col-1-3">
							<div class="ancre" id="ancre_imports_manuels" onclick="document.location.href='<?php echo Zzzelp::$url_site ?>creationconvois/externe?alliance=<?php echo $alliance->alliance ?>&serveur=<?php echo $alliance->serveur ?>'">
								Importer des convois
							</div>
						</div>
						<div class="col-1-3">
							<div class="ancre" id="ancre_sondes" onclick="if(confirm('Vous allez supprimer tous les convois restant pour la <?php echo $alliance->alliance ?>\nSouhaitez vous continuer ?')) {
											document.location.href = '<?php echo Zzzelp::$url_page ?>modification?alliance=<?php echo $alliance->alliance ?>&serveur=<?php echo $alliance->serveur ?>&mode=reinitialisation_convois';
										}">
								Réinitialiser les convois
							</div>
						</div>
					</div>
					<?php if(count($alliance->convois) > 0) { ?>
					<div class="grid grid-pad">
						<div class="col-1-2">
							<br>
							<div class="zone_invisible zone_grand_tableau_simple">
								<div class="entete_cadre">Convois restants</div>
								<br>
								<table class="tableau_ombre" id="convois_restants">
									<tr>
										<th>Lanceur</th>
										<th>Valeur</th>
										<th>Receveur</th>
										<th></th>
										<th></th>
									</tr>
									<?php $n=0;foreach($alliance->convois as $co){ if ($co['valeur'] != 0) {$n++; ?>
									<tr data-numero="<?php echo $n ?>">
										<td><a href="http://<?php echo $serveur ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $co['lanceur'] ?>" target="_BLANK" ><strong><?php echo $co['lanceur'] ?></strong></a></td>
										<td style="font-weight:bold;color:<?php echo $co['couleur'] ?>"><div class="non_tel_2"><?php echo number_format($co['valeur'], 0, '.' , ' ') ?></div><div class="tel_2"></div></td>
										<td><a href="http://<?php echo $serveur ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $co['receveur'] ?>" target="_BLANK" ><strong><?php echo $co['receveur'] ?></strong></a></td>
										<td>
											<select onchange="Action_convois(<?php echo $n ?>, this.value)">
												<option>-</option>
												<option>Supprimer</option>
												<option>Modifier</option>
												<option>Valider</option>
											</select>
										</td>							
									</tr>
									<?php } } ?>
									<tr>
										<td colspan="5"><a href="#" onClick="Creer_convois();return false">Créer un convoi</a></td>
									</tr>
								</table>
								<br>
							</div>
						</div>
						<div class="col-1-2">
							<br>
							<div class="zone_invisible">
								<div class="entete_cadre">Total par joueur</div>
								<br>
								<table class="tableau_ombre">
									<tr>
										<th>Pseudo</th>
										<th>Valeur</th>
									</tr>
									<?php $tt = 0;foreach($alliance->convois_membre as $me => $co){if ($co != 0){
									if ($co > 0){$couleur = '  style="color: red"';$tt+=$co;}
									elseif ($co < 0) {$couleur ='  style="color: green"';}?>
									<tr>
										<td><a href="http://<?php echo $serveur ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $me ?>" target="_BLANK" ><strong><?php echo $me ?></strong></a></td>
										<td <?php echo $couleur ?>><?php echo number_format(abs($co), 0, '.' , ' ') ?></td>
									</tr>
									<?php } }?>
								</table>
								<br>						
							</div>
						</div>
					</div>
					<br><br>
					<div class="grid grid-pad">
						<div class="col-1-1">
							<div class="zone_invisible">
								<div class="entete_cadre">Archives des convois</div>
								<br>
								<div class="zone_tableau_double tableau_ombre">
									<table>
										<tr>
											<th id="th">Lanceur</th>
											<th id="th">Receveur</th>
											<th id="th">Valeur</th>
											<th id="th">Ajout</th>
										</tr>
										<?php foreach($alliance->convois_recents as $convoi) { ?>
										<tr>
											<td id="td"><?php echo $convoi['lanceur'] ?></td>
											<td id="td"><?php echo $convoi['receveur'] ?></td>
											<td id="td"><?php echo number_format($convoi['valeur'], 0, '.' , ' ') ?></td>
											<td id="td"><?php  echo date('d/m', $convoi['ajout']).' '.date('H:i:s', $convoi['ajout']) ?></td>
										</tr>
										<?php  } ?>
									</table>
								</div>
								<br>
							</div>
						</div>
					</div>
					<?php  } ?>	
				</div>
				<form method="POST" action="" class="zone_parametres animated slideInLeft" style="display:none">
					<input type="hidden" name="modif_parametres" value="1">
					<div class="grid grid-pad">
						<div class="col-1-1">
						   <div class="zone_contenu zone_largeur_courte" style="margin-bottom: 2em;">
								<div class="entete_cadre">Paramètres</div>
								<div class="ligne_cadre_structure">
									<span>Mode de répartition :</span>
									<select onchange="Affichage_mode_convois(this.value)" name="methode_convois">
										<option value="regulier" <?php if($alliance->parametres_convois['methode_convois'] == 'regulier') { echo 'selected'; } ?>>Convois réguliers</option>
										<option value="demande" <?php if($alliance->parametres_convois['methode_convois'] == 'demande') { echo 'selected'; } ?>>Convois à la demande</option>
									</select>
								</div>
								<hr>
								<div class="parametres_convois" data-mode="regulier" style="display:<?php echo $alliance->parametres_convois['methode_convois'] == 'regulier' ? '' : 'none' ?>">
									<div class="ligne_cadre_structure">
										<span>Formule : </span>			
										<select name="formule_repartition" id="formule_repartition" onchange="Affichage_parametres()">
											<?php if ($alliance->alliance == 'ZOO') { ?><option value=0 <?php if($alliance->parametres_convois['formule_repartition'] == 0) { echo 'selected';} ?>>Méthode ZOO</option> <?php } ?>
											<?php if ($alliance->alliance == '-VIP-') { ?><option value=2 <?php if($alliance->parametres_convois['formule_repartition'] == 2) { echo 'selected';} ?>>Méthode -VIP-</option> <?php } ?>
											<?php if ($alliance->alliance == 'MRG') { ?><option value=3 <?php if($alliance->parametres_convois['formule_repartition'] == 3) { echo 'selected';} ?>>Méthode MRG</option> <?php } ?>
											<option value=1 <?php if($alliance->parametres_convois['formule_repartition'] == 1) { echo 'selected';} ?>>Méthode Temps de Ponte</option>
										</select>
									</div>
									<div class="ligne_cadre_structure" id="formule_tdp">
										<span>Formule (méthode tdp) : </span>
										<input class="input_semi_court" type="text" name="formule_tdp" value='<?php echo $alliance->parametres_convois['formule_tdp'] ?>'>
									</div>
									<div class="ligne_cadre_structure">
										<span>Optimisation :</span>
										<select name="algorithme_optimisation" id="algorithme_optimisation" onchange="Affichage_parametres()">
											<option value=0 <?php  if($alliance->parametres_convois['algorithme_optimisation'] == 0) { echo 'selected'; } ?>>Automatique</option>
											<option value=1 <?php  if($alliance->parametres_convois['algorithme_optimisation'] == 1) { echo 'selected'; } ?>>Zzzelp</option>
											<option value=2 <?php  if($alliance->parametres_convois['algorithme_optimisation'] == 2) { echo 'selected'; } ?>>Distance pure</option>
											<option value=3 <?php  if($alliance->parametres_convois['algorithme_optimisation'] == 3) { echo 'selected'; } ?>>ID</option>
											<option value=4 <?php  if($alliance->parametres_convois['algorithme_optimisation'] == 4) { echo 'selected'; } ?>>Taille reçue</option>
											<option value=5 <?php  if($alliance->parametres_convois['algorithme_optimisation'] == 5) { echo 'selected'; } ?>>Ouvrières libres</option>
											<option value=6 <?php  if($alliance->parametres_convois['algorithme_optimisation'] == 6) { echo 'selected'; } ?>>Personnalisée</option>
										</select>
									</div>
									<div class="ligne_cadre_structure">
										<span>Majoration ouvrières : </span>
										<input type="checkbox" name="majoration_ouvrieres" <?php if($alliance->parametres_convois['majoration_ouvrieres'] == 1) { echo 'checked'; } ?>>
									</div>
									<div class="ligne_cadre_structure">
										<span>Activer les relais : </span>
										<input type="checkbox" name="activer_relais_convois" id="activer_relais_convois" onchange="Affichage_parametres()" <?php if($alliance->parametres_convois['activer_relais_convois'] == 1) { echo 'checked'; } ?>>
									</div>
									<div class="ligne_cadre_structure">
										<span>Durée d'une répartition</span>
										<select name="duree_repartition">
											<option <?php if($alliance->parametres_convois['duree_repartition'] == 0) { echo 'selected'; } ?> value=0>Un jour</option>
											<option <?php if($alliance->parametres_convois['duree_repartition'] == 1) { echo 'selected'; } ?> value=1>Une semaine</option>
										</select>					
									</div>
									<?php if($alliance == 'MRG') { ?>
									<div class="ligne_cadre_structure">
										<span>Bonus greniers (cm2) : </span>
										<input class="input_semi_court" type="text" name="bonus_grenier_MRG" value='<?php echo number_format($alliance->parametres_convois['bonus_grenier_MRG'], 0, '.', ' ') ?>'>
									</div>
									<?php } ?>
								</div>
								<div class="parametres_convois" data-mode="demande"  style="display:<?php echo $alliance->parametres_convois['methode_convois'] == 'demande' ? '' : 'none' ?>">
									<div class="ligne_cadre_structure">
										<span>Demande maximale : </span>
										<input type="text" name="demande_max" onkeyup="ze_Ajout_espaces(this)" style="width:130px" value="<?php echo Nombre::Espaces($alliance->parametres_convois['demande_max']); ?>">
									</div>					
								</div>
								<input type="submit" class="bouton" value="Enregistrer">
							</div>
						</div>
					</div>
					<div class="grid grid-pad">
						<div class="col-1-2" id="relais_convois">
							<div class="zone_invisible">
								<div class="entete_cadre">Relais pour les convois</div>
								<br>
								<table class="tableau_ombre" id="relais">
									<tr>
										<th>Pseudo</th>
										<th>Nombre de convois</th>
									</tr>
									<?php foreach($alliance->parametres_convois['relais_convois'] as $joueur => $nombre) { ?>
									<tr>
										<td><input class="input_tableau input_haut" type="text" name="pseudo_relais[]" value="<?php echo $joueur ?>" placeholder="Pseudo du relais"></td>
										<td><input class="input_niveau input_haut" type="text" name="nombre_relais[]" value="<?php echo $nombre ?>"></td>
									</tr>
									<?php } ?>
									<tr>
										<td id="td" colspan="4"><a onclick="Ajout_ligne_convois('relais')">Nouvelle ligne</a></td>
									</tr>
								</table>
							</div>
							<br><br>
							<div class="zone_invisible">
								<div class="entete_cadre">Gestion des multis</div>
								<br>
								<table id="multi" class="tableau_ombre">
									<tr>
										<th id="th">Joueur 1</th>
										<th id="th">Joueur 2</th>
									</tr>
									<?php foreach($alliance->multis as $multi) { ?>
									<tr>
										<td id="td"><input type="text" class="input_semi_court" name="multi_1[]" value="<?php echo $multi[0] ?>"></td>
										<td id="td"><input type="text" class="input_semi_court" name="multi_2[]" value="<?php echo $multi[1] ?>"></td>
									</tr>
									<?php  } ?>
									<tr>
										<td id="td" colspan="2"><a onclick="Ajout_ligne_convois('multi')">Nouvelle ligne</a></td>
									</tr>
								</table>
							</div>
						</div>
						<div class="col-1-2" id="priorites_convois">
							<div class="zone_invisible">
								<div class="entete_cadre">Priorité des convois</div>
								<br>
								<table class="tableau_ombre" id="priorites">
									<tr>
										<th>Convoyeur</th>
										<th>Convoyés</th>
										<th></th>
										<th></th>
									</tr>
									<?php foreach($alliance->parametres_convois['priorites_manuelles'] as $joueur => $liste) { ?>
									<tr>
										<td><input placeholder="Convoyeur" class="input_tableau input_haut" type="text" name="lanceurs[]" value="<?php echo $joueur ?>"></td>
										<td><input placeholder="Cible1,Cible2" class="input_tableau input_haut" type="text" name="receveurs[]" value="<?php echo $liste ?>"></td>
										<td style="padding:0"><img src="/Images/Fleche_haut.png" width="30px" onclick="Switch_prio_convois(this.parentNode.parentNode)"></td>
										<td style="padding:0"><img src="/Images/Fleche_bas.png" width="30px" onclick="Switch_prio_convois(this.parentNode.parentNode.nextElementSibling)"></td>
									</tr>
									<?php } ?>
									<tr>
										<td id="td" colspan="4"><a onclick="Ajout_ligne_convois('priorites');return false;">Nouvelle ligne</a></td>
									</tr>
								</table>
							<br><br>
							</div>
						</div>
					</div>
					<div class="grid grid-pad">
						<?php if($alliance->alliance == '-VIP-' AND $alliance->serveur == 's1') { ?>
						<div class="col-1-2">
							<br>
							<div class="zone_invisible">
								<div class="entete_cadre">TDC perso</div>
								<br>
								<div class="zone_tableau_vertical tableau_ombre">
									<table id="compte_plus">
										<thead>
											<tr>
												<th id="th">Pseudo</th>
												<th id="th">Compte +</th>
												<th id="th"></th>
											</tr>
										</thead>
										<tbody>
											<?php $n=0;foreach($alliance->TDCpersos as $joueur) { ?>
											<tr>
												<td id="td">
													<input type="text" class="input_semi_court" name="pseudo_compte_plus[]" value="<?php echo $joueur['pseudo'] ?>">
												</td>
												<td id="td">
													<input type="text" class="input_semi_court" name="valeur_compte_plus[]" onkeyup="ze_Ajout_espaces(this)" 
														value="<?php echo number_format($joueur['valeur'], 0, '.' , ' ') ?>">
												</td>
											</tr>
											<?php  $n++;} ?>
											<tr>
												<td id="td" colspan="2">
													<a class="bouton" href="#" onclick="Ajout_ligne_convois('compte_plus');return false;">Nouvelle ligne</a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<?php  } ?>
					</div>
					<input type="submit" class="bouton" value="Enregistrer">
				</form>		
			</div>
		</div>
		<?php $n=0;foreach($alliance->convois as $co){ if ($co['valeur'] != 0) {$n++; ?>
		<div id="popup_convois_<?php echo $n ?>" class="pop-up-display-content">
			<p>
				<div class="ligne_cadre_structure">
					<input class="input_haut input_tableau_semi_large" type="text" id="convois_<?php echo $n ?>" onkeyup="ze_Ajout_espaces(this)" value="<?php echo number_format($co['valeur'], 0, '.' , ' ') ?>">
					<img style="float:left;cursor:pointer" src="/Images/valider.png" onclick="Modifier_convois(<?php echo $n ?>)">
				</div>
			</p>
		</div>
		<?php }} ?>
		<div class="zone_popup">
		</div>
		<script src="/Javascript/popupwindow.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/GestionAlliance.js"></script>
		<link rel="stylesheet" type="text/css" href="/Style/animate.css" />
		<script>
			Affichage_parametres();
			Preparer_valeurs();
			Afficher_section_gestion('convois');

function Afficher_section_gestion(section) {
	var zone_convois = document.querySelector('.zone_convois'),
		zone_parametres = document.querySelector('.zone_parametres');
	if(section == 'convois') {
		zone_convois.style.display = '';
		zone_parametres.style.display = 'none';
	}
	else {
		zone_convois.style.display = 'none';
		zone_parametres.style.display = '';		
	}
}

function Affichage_mode_convois(mode) {
	var zones = document.querySelectorAll('.parametres_convois');
	for(var i=0; i<zones.length; i++) {
		zones[i].style.display = (zones[i].dataset.mode == mode) ? '' : 'none';
	}
}
		</script>
	</body>
</html>
