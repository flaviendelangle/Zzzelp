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
				<form method="POST" action="">
					<div class="grid grid-pad">
						<div class="col-1-1">
							<div class="zone_creation_pack">
								<br><br>
								<div class="cadre_structure">
									<div class="entete_cadre">Ajoutez vos propres smileys</div>
									<div class="entete_categories">
										<?php foreach($smileys->get_Categories() as $categorie) { ?>
										<span id="entete_<?php echo $categorie['id'] ?>" <?php if($categorie['id'] == 'fourmis') {?>data-actif="1"<?php } ?> onclick="Changer_categorie_smileys(this.id)"><?php echo $categorie['nom'] ?></span>
										<?php } ?>
									
									</div>
									<?php foreach($smileys->smileys as $titre => $pack) {?>
									<div 
										class="ligne_cadre_structure ligne_packs" 
										<?php if(!in_array('fourmis', $pack['categories'])) {?>style="display:none"<?php } ?> 
										data-actif="<?php echo ($pack['actif'] ? 1 : 0) ?>" 
										data-categories="<?php echo str_replace('[', '',str_replace(']', '',str_replace('"', '',json_encode($pack['categories'])))) ?>" 
										data-numero="Z<?php echo $pack['ID'] ?>" 
										data-nom="<?php echo $titre ?>"
										<?php if($_SESSION['pseudo'] == $pack['createur']) { ?>
										data-format="<?php echo $pack['format'] ?>"
										data-public="<?php echo ($pack['public'] ? 1 : 0) ?>"
										data-alliances="<?php echo $pack['alliances_2'] ?>"
										data-joueurs="<?php echo $pack['joueurs_2'] ?>"
										<?php } ?>
									>
										<span class="entete_smileys"><?php echo $titre ?> : </span>
										<img src="/Images/Fleche_haut.png" style="height:25px;width:25px;cursor:pointer" onclick="Switch_packs(this.parentNode, true)">
										<input style="width:25px" type="checkbox" <?php if($pack['actif']) { ?> checked <?php } ?> name="smileys[]" value="<?php echo $pack['ID'] ?>" onclick="Modification_packs_choisis()">
										<?php if($_SESSION['pseudo'] == $pack['createur']) { ?>
										<img src="/Images/edit.png" style="height:20px;width:20px;cursor:pointer" onclick="Generation_zone_creation_pack(<?php echo $pack['ID'] ?>, true)">
										<?php } ?>
										<span class="ligne_smileys">
											<?php foreach($pack['liste'] as $smiley) { ?>
											<img src="http://zzzelp.fr/Images/Smileys/<?php echo $titre ?>/<?php echo $smiley ?>.<?php echo $pack['format'] ?>" data-titre="<?php echo $smiley ?>">
											<?php } ?>
										</span>
									</div>
									<?php } ?>
									<?php foreach($smileys->get_SmileysComptePlus() as $titre => $pack) { ?>
									<div 
										class="ligne_cadre_structure ligne_packs" 
										style="display:none" 
										data-actif="<?php echo ($pack['actif'] ? 1 : 0) ?>" 
										data-categories="compte_plus" 
										data-numero="C<?php echo str_replace('C+ ','',$titre); ?>" 
										data-nom="<?php echo $titre ?>"
									>
										<span class="entete_smileys"><?php echo $titre ?> : </span>
										<img src="/Images/Fleche_haut.png" style="height:25px;width:25px;cursor:pointer" onclick="Switch_packs(this.parentNode, true)">
										<input style="width:25px" type="checkbox" <?php if($pack['actif']) { ?> checked <?php } ?> name="smileys[]" value="<?php echo $pack['ID'] ?>" onclick="Modification_packs_choisis()">
										<span class="ligne_smileys">
											<?php foreach($pack['liste'] as $smiley) { ?>
											<img src="http://s1.fourmizzz.fr/images/smiley/<?php echo $smiley ?>.gif" data-titre="<?php echo $smiley ?>">
											<?php } ?>
										</span>
									</div>
									<?php } ?>
									<div class="ligne_cadre_structure">
										<span>Créer un pack : </span>
										<input style="width:25px" type="checkbox" onchange="Generation_zone_creation_pack(0, this.checked);" class="creation_nouveau_pack">
									</div>
								</div>
								<br><br>
								<input type="submit" name="modif_smileys" value="Enregistrer" class="bouton">
								<br><br>
								<div id="nouveau_pack" style="display:none">
									<div class="cadre_structure">
										<div class="entete_cadre"><span id="titre_creation_pack">Création</span> d'un pack (<span id="etape_smileys">1</span>/3)</div>
										<div class="ligne_cadre_structure etape_1">
											<span>Nom du pack : </span>
											<input type="text" class="input_long" id="nom_pack">										
										</div>
										<div class="ligne_cadre_structure etape_1">
											<span>Rendre votre pack public : </span>
											<input type="checkbox" class="pack_public" onclick="Modification_prive_pack('nouveau')">
										</div>
										<div class="ligne_cadre_structure etape_1">
											<span>Alliances <span class="non_tel">autorisées </span> : </span>
											<input type="text" disabled class="input_long alliances_pack_smileys" id="alliances_nouveau">
										</div>
										<div class="ligne_cadre_structure etape_1">
											<span>Joueurs <span class="non_tel">autorisés </span> : </span>
											<input type="text" disabled class="input_long joueurs_pack_smileys" id="joueurs_nouveau">
										</div>
										<div class="ligne_cadre_structure etape_1" style="height:90px">
											<span>Catégories : </span>
											<select multiple style="height:70px" id="categories_nouveau">
												<?php foreach($smileys->get_Categories() as $categorie) {if(!in_array($categorie['id'], array('tous', 'compte_plus', 'perso'))) {  ?>
												<option value="<?php echo $categorie['id'] ?>"><?php echo $categorie['nom'] ?></option>
												<?php }} ?>
											</select>
										</div>
										<div class="ligne_cadre_structure etape_1">
											<span>Type de fichiers : </span>
											<select id="extension_fichier">
												<option value="gif">GIF</option>
												<option value="png">PNG</option>
												<option value="jpg">JPG</option>
											</select>									
										</div>
										<div class="liste_smileys">								
										</div>
										<div class="ligne_cadre_structure" id="suite_creation_smileys">
											<a href="#" onclick="Etape_suivante_smileys(true);return false;" style="float:right">Etape suivante</a>
										</div>
										<div class="ligne_cadre_structure" style="display:none" id="fin_creation_smileys">
											<a href="#" onclick="Uploader_smileys();return false;" style="float:right">Envoyer vos smileys</a>
										</div>
									</div>
								</div>
								<br><br>
								<div id="modifier_pack">
								</div>
							</div>
						</div>
						<input type="hidden" name="ordre_packs" id="ordre_packs" value="<?php echo str_replace('[', '', str_replace(']', '', str_replace('"', '', json_encode($smileys->ordre)))) ?>">
					</div>
					
				</form>		
			</div>
		</div>	
		<script type="text/javascript" src="/Javascript/jscolor/jscolor.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/Compte.js"></script>
		<script>
			autocompletion(document.querySelector('#joueurs_nouveau'), { mode : 'joueur_serveurs', serveur : 's1', multiple : true });
			autocompletion(document.querySelector('#alliances_nouveau'), { mode : 'alliance_serveurs', serveur : 's1', multiple : true });

var ordre = <?php echo json_encode($ordre_smileys) ?>;
Trie_ordre_packs_smileys();
		</script>
	</body>
</html>
