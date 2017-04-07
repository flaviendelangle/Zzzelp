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
				<br>
				<div class="grid grid-pad">
					<div class="col-1-1">
						<?php if(!empty($alliance->joueurs_non_actives)) { ?>
						<div class="zone_contenu zone_largeur_courte">
							<div class="entete_cadre">Pseudos à valider</div>
							<div style="height:auto">
								Vous avez la possibilité de valider les comptes Zzzelp des membres de votre alliance.<br><br>
								<b>Attention !</b> Ceci devront ensuite ajouter votre alliance sur Zzzelp pour pouvoir l'utiliser
							</div>
							<br>
							<table class="tableau_ombre">
								<?php foreach($alliance->joueurs_non_actives as $pseudo) { ?>
								<tr>
									<td><a target="_BLANK" href="http://<?php echo $alliance->serveur ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $pseudo ?>"><?php echo $pseudo ?></a></td>
									<td><img src="/Images/valider.png" width="20" style="margin-top: 0.5em;cursor:pointer;" onclick="document.location.href= 'membres?serveur=<?php echo $alliance->serveur ?>&alliance=<?php echo $alliance->alliance ?>&action=validation&activation=1&pseudo=<?php echo $pseudo ?>'"></td>
									<td><img src="/Images/suppression.png" width="20" style="margin-top: 0.5em;cursor:pointer;" onclick="document.location.href= 'membres?serveur=<?php echo $alliance->serveur ?>&alliance=<?php echo $alliance->alliance ?>&action=validation&activation=0&pseudo=<?php echo $pseudo ?>'"></td>
								</tr>
								<?php } ?>
							</table>
							<br>
						</div>
						<br><br><br>					
						<?php } ?>
						<div class="zone_contenu zone_invisible zone_grand_tableau">
							<div>
								<div class="zone_tableau">
									<table class="tableau_large_fixe tableau_general_alliance_pseudo">
										<tr class="sans_effet">
											<th>Pseudo</th>
										</tr>
										<?php  foreach($alliance->membres as $pseudo => $niveaux) { ?>
										<tr class="sans_effet">
											<td onmouseover="Mise_en_valeur(this.parentNode.rowIndex, -1, true, 'general_alliance')" onmouseout="Mise_en_valeur(this.parentNode.rowIndex, -1, false, 'general_alliance')" ><a href="http://<?php echo $alliance->serveur ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $pseudo ?>" target="_BLANK"><?php echo $pseudo ?></a></td>
										</tr>
										<?php } ?>
									</table>
								</div>
								<div class="zone_tableau">
									<table class="tableau_large_scrollable tableau_general_alliance">
										<tr class="sans_effet">
											<th>IA</th>
											<th>Virer</th>
											<th>Accès</th>
											<th>Ouvrières</th>
											<th>Place nourriture</th>
											<th>Place matériaux</th>
											<th>TDP</th>
										</tr>
										<?php  foreach($alliance->membres as $pseudo => $valeurs) { ?>
										<tr class="sans_effet">
											<td align="center"><img src="/Images/pastille_<?php echo $valeurs->zzzelpscript->options['synchronisation']['parametres']['synchro_niveaux']['active'] ? 'verte' : 'rouge' ?>.png" width="17"></td>
											<td align="center"><a href="membres?serveur=<?php echo $alliance->serveur ?>&alliance=<?php echo $alliance->alliance ?>&action=virer&pseudo=<?php echo $pseudo ?>"><input type="image" src="/Images/quitter.png" width="25"/></a></td>
											<td>
												<select onchange="document.location.href = 'membres&serveur=<?php echo $alliance->serveur ?>&alliance=<?php echo $alliance->alliance ?>&action=modification_droits&droits=' + this.value + '&pseudo=<?php echo $pseudo ?>';">
													<option value="0" <?php if($valeurs->membrealliance->droit == 0) {echo 'selected';} ?>>Non activé</option>
													<option value="1" <?php if($valeurs->membrealliance->droit == 1) {echo 'selected';} ?>>Nouveau</option>
													<option value="2" <?php if($valeurs->membrealliance->droit == 2) {echo 'selected';} ?>>Membre</option>
													<option value="3" <?php if($valeurs->membrealliance->droit == 3) {echo 'selected';} ?>>Gestionnaire</option>
													<option value="4" <?php if($valeurs->membrealliance->droit == 4) {echo 'selected';} ?>>Chef</option>
												</select>
											</td>
											<td><?php echo number_format($valeurs->niveaux->ouvrieres, 0, '.' , ' ') ?></td>
											<td><?php echo number_format($valeurs->niveaux->size_nou, 0, '.' , ' ') ?></td>
											<td><?php echo number_format($valeurs->niveaux->size_mat, 0, '.' , ' ') ?></td>
											<td><?php echo $valeurs->niveaux->tdp ?></td>
										</tr>
										<?php  } ?>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br>
				<div class="grid grid-pad" style="max-width:100%">
					<div class="col-1-1">
						<div class="zone_contenu zone_invisible zone_grand_tableau">
							<div>
								<div class="zone_tableau">
									<table class="tableau_niveaux_pseudo">
										<tr class="sans_effet">
											<th>Pseudo</th>	
										</tr>
										<?php  foreach($alliance->membres as $pseudo => $valeurs) { ?>
										<tr class="sans_effet">
											<td onmouseover="Mise_en_valeur(this.parentNode.rowIndex, -1, true, 'niveaux')" onmouseout="Mise_en_valeur(this.parentNode.rowIndex, -1, false, 'niveaux')" ><a href="http://<?php echo $alliance->serveur ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $pseudo ?>" target="_BLANK"><?php echo $pseudo ?></a></td>
										</tr>
										<?php  } ?>
									</table>
								</div>
								<div class="zone_tableau">
									<table class='tableau_niveaux'>
										<tr class="sans_effet">
											<th>Champi</th>
											<th>Ent.nou</th>
											<th>Ent.mat</th>
											<th>Couveuse</th>
											<th>Solarium</th>
											<th>Labo</th>
											<th>S.Analyse</th>
											<th>S.Combat</th>
											<th>Caserne</th>
											<th>Dôme</th>
											<th>Loge</th>
											<th>Pucerons</th>
											<th>Cochen</th>
											<th>Tech.p</th>
											<th>Bouclier</th>
											<th>Armes</th>
											<th>Archi</th>
											<th>Comm</th>
											<th>V.Chasse</th>
											<th>V.Att</th>
											<th>Geneti</th>
											<th>Acide</th>
											<th>Poison</th>	
										</tr>
										<?php  foreach($alliance->membres as $pseudo => $valeurs) { ?>
										<tr class="sans_effet">
											<?php for($j=0; $j<13; $j++) { ?>
											<td style="<?php echo (($valeurs->niveaux->construction_en_cours == $j+1)? 'font-weight:bold;' : '').(($valeurs->niveaux->construction_en_cours_2 == $j+1)? 'color:red;' : ''); ?>"><?php $nom=Fourmizzz::$constructions_bdd[$j];echo $valeurs->niveaux->$nom ?></td>
											<?php }for($j=0; $j<10; $j++) { ?>
											<td style="<?php echo (($valeurs->niveaux->labo_en_cours == $j+1)? 'font-weight:bold;' : '').(($valeurs->niveaux->labo_en_cours_2 == $j+1)? 'color:red;' : ''); ?>"><?php $nom=Fourmizzz::$recherches_bdd[$j];echo $valeurs->niveaux->$nom ?></td>
											<?php } ?>
										</tr>
										<?php  } ?>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script>
			
			Initialisation_tableaux();
			
			function Initialisation_tableaux() {
				if ((!navigator.userAgent.match(/iPhone/i)) && !(navigator.userAgent.match(/Android/i))) {
					var noms = new Array('general_alliance', 'niveaux');
					for(var i=0; i<noms.length; i++) {
						nom = noms[i];
						Application_events(nom);
					}
				}
			}
			
			function Application_events(nom) {
				var lignes = document.querySelector('.tableau_' + nom).rows;
				for(var n=1; n<lignes.length; n++) {
					var cells = lignes[n].cells;
					for(var k=0; k<cells.length; k++) {
						var cell = cells[k];
						cell.onmouseover= function onmouseover(event) {Mise_en_valeur(this.parentNode.rowIndex, this.cellIndex, true, nom);};
						cell.onmouseout= function onmouseout(event) {Mise_en_valeur(this.parentNode.rowIndex, this.cellIndex, false, nom);};
					}
				}
			}

			function Mise_en_valeur(ligne, colonne, mode, nom) {
				var couleur = mode ? 'rgba(250,181,181,1.0)' : '';
					lignes = document.querySelector('.tableau_' + nom).rows,
					cellules = lignes[ligne].cells;
				document.querySelector('.tableau_' + nom + '_pseudo').rows[ligne].cells[0].style.background = couleur;
				for(var i=0; i<cellules.length; i++) {
					cellules[i].style.background = couleur;
				}
				if(colonne > -1) {
					for(var i=1; i<lignes.length; i++) {
						if(i != ligne) {
							lignes[i].cells[colonne].style.background = couleur;
						}
					}
				}
			}
			
			
		</script>
	</body>
</html>
