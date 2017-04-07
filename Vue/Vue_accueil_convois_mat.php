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
					   <div class="zone_contenu zone_liste_convois zone_invisible">
						   <br><br>
							<div class="cadre_structure">
								<div class="entete_cadre">Convois à envoyer</div>
								<?php if(count($convois->a_envoyer) > 0) { ?>
								<?php $total = 0;foreach($convois->a_envoyer as $joueur) {$total+=$joueur['valeur']; ?>
								<div class="ligne_cadre_structure">
									<span><a href="http://<?php echo $convois->alliance->serveur ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $joueur['receveur'] ?>" target="_BLANK"><?php echo $joueur['receveur'] ?></a></span>
									<span class="ligne_inputs">
										<span class="input_fige non_tel"><?php echo number_format($joueur['valeur'], 0, '.' , ' ') ?></span>
										<span class="input_fige tel"><?php echo Nombre::Resume($joueur['valeur']) ?></span>
										<span class="input_fige"><?php echo date('H:i', $convois->distances[$joueur['receveur']]-3600) ?></span>
										<a href="preparation?ressource=materiaux&serveur=<?php echo $convois->alliance->serveur ?>&alliance=<?php echo $convois->alliance->alliance ?>&pseudo=<?php echo $joueur['receveur'] ?>&valeur_convois=<?php echo $joueur['valeur'] ?>">
											<input type="image" src="/Images/Fleche_droite.png"/>
										</a>
									</span>
								</div>
								<?php  } ?>
								<div class="ligne_cadre_structure">
									<span>Total :</span>
									<span class="input_fige" style="margin-right:90px"><?php echo number_format($total, 0, '.', ' ') ?></span>
								</div>
								<?php  }else { ?>
								<div class="ligne_cadre_structure">Aucun convois</div>
								<?php } ?>
							</div>
							<br>
							<div class="cadre_structure">
								<div class="entete_cadre">Convois à recevoir</div>
								<?php if(count($convois->a_recevoir)) { ?>
								<?php $total = 0;foreach($convois->a_recevoir as $joueur) {$total+=$joueur['valeur']; ?>
								<div class="ligne_cadre_structure">
									<span><a href="http://<?php echo $serveur ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $joueur['lanceur'] ?>" target="_BLANK"><?php echo $joueur['lanceur'] ?></a></span>
									<span class="input_fige"><?php echo number_format($joueur['valeur'], 0, '.' , ' ') ?></span>
								</div>
								<?php  } ?>
								<div class="ligne_cadre_structure">
									<span>Total :</span>
									<span class="input_fige"><?php echo number_format($total, 0, '.', ' ') ?></span>
								</div>
								<?php  }else { ?>
								<div class="ligne_cadre_structure">Aucun convois</div>
								<?php } ?>
							</div>
							<br><br>
					   </div>
					</div>
					<div class="col-1-2">
					   <div class="zone_contenu zone_invisible">
						   <br>
							<div class="entete_cadre">Ajout manuel</div>
							<br>
							<textarea placeholder="Copiez vos convois en cours ou convois arrivés ici" id='convois_manuels' onchange="Analyse_convois_manuels()"></textarea>
							<form method="POST" action="<?php echo $GLOBALS['url_page'] ?>modification?alliance=<?php echo $convois->alliance->alliance ?>&serveur=<?php echo $convois->alliance->serveur ?>" id="ajout_convois_manuels">
								<input type="hidden" name="Modification_manuelle" value="1">
								<center>
									<a href="#" class="bouton" id="bouton_analyse">Analyser</a>
									<div id="section_convois_manuels">
									</div>
									<a href="#" style="display:none" id="bouton_import_convois" class="bouton" onclick="Importe_convois_manuels()">Importer les convois</a>
								</center>
							</form>
					   </div>
					</div>
				</div>
				<div class="grid grid-pad">
					<div class="col-1-1">
						<div class="zone_contenu zone_invisible">
							<?php  if(count($convois) > 0) { ?>
							<div class="entete_cadre">Derniers convois</div>
							<table class="tableau_ombre">
								<tr>
									<th id="th">Pseudo</th>
									<th id="th">Valeur</th>
									<th id="th">Ajout</th>
									<th id="th"></th>
								</tr>
								<?php  foreach($convois->convois as $conv) { ?>
								<tr>
									<td id="td"><?php echo $conv['pseudo'] ?></td>
									<td id="td" style="color:<?php  if($conv['mode'] == 0) {echo 'green';}else {echo 'red';} ?>"><?php echo number_format($conv['valeur'], 0, '.' , ' ') ?></td>
									<td id="td"><?php  echo date('d/m', $conv['ajout']).' '.date('H:i:s', $conv['ajout']) ?></td>
									<td id="td"></td>
								</tr>
								<?php  } ?>
							</table>
							<?php  } ?>
							<br><br>				
						</div>
					</div>
				</div>			
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/Convois.js"></script>
	</body>
</html>
