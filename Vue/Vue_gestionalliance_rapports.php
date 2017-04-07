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
				<div class="grid grid-pad">
					<div class="col-1-2">
						<div class="zone_contenu zone_largeur_courte" id="liste_releves">
							<div class="entete_cadre">Relevés des <?php echo $alliance->alliance ?></div>
							<div class="ligne_cadre_structure">
								<a href="/Fichiers/<?php echo $alliance->prepare_CSVRapports(); ?>.csv">Télécharger tous les rapports</a>
							</div>
							<?php foreach($alliance->membres as $pseudo => $valeurs) { ?>
							<div class="ligne_cadre_structure ligne_releve" data-pseudo="<?php echo $pseudo ?>">
								<img src="/Images/plus.png" style="cursor:pointer;float:left;height:20px;width:20px;margin-top: 8px;margin-right: 5px;" onclick="Creer_rapport('<?php echo $pseudo ?>')">
								<?php if(!empty($valeurs->rapport)) { ?>
								<span><?php echo $pseudo ?> (<?php echo date("d/m/y H:i", strtotime($valeurs->rapport['date_MAJ'])) ?>) : </span>
								<img src="/Images/Fleche_constant.png" style="cursor:pointer;" onclick="Afficher_rapport('<?php echo $pseudo ?>')">
								<?php } else { ?>
								<span><?php echo $pseudo ?> : </span>
								<span class="input_fige">AUCUN</span>
								<?php } ?>
							</div>
							<?php } ?>
						</div>
					</div>
					<div class="col-1-2">
						<?php $first=true;foreach($alliance->membres as $pseudo => $valeurs) { 
							if(!empty($valeurs->rapport)) {
								$date_releve = date("d/m/y H\hi", strtotime($valeurs->rapport['date_MAJ']));
								$contenu_area = 'Date	'.$date_releve.'\nOuvrières	'.$valeurs->rapport['ouvrieres'] ?>
						<div class="zone_contenu zone_largeur_courte" id="releve_<?php echo $valeurs->rapport['ID'] ?>" data-pseudo="<?php echo $pseudo ?>" style="display:<?php echo $first ? '' : 'none' ?>">
							<div class="entete_cadre">Relevé de <?php echo $pseudo ?></div>
							<div class="ligne_cadre_structure">
								<span>Date du rapport :	</span>
								<span class="input_fige"><b><?php echo $date_releve ?></b></span>
							</div>
							<div class="ligne_cadre_structure ligne_rapport" data-categorie="ouvrieres">
								<span>Ouvrières :	</span>
								<span class="input_fige"><?php echo number_format($valeurs->rapport['ouvrieres'],0,'.',' '); ?></span>
								<input style="display:none" type="text" value="<?php echo number_format($valeurs->rapport['ouvrieres'],0,'.',' '); ?>" class="input_tableau" style="float:right" onkeyup="ze_Ajout_espaces(this)">
							</div>
							<?php foreach(array('armee' => 'Armée', 'constructions' => 'Constructions', 'recherches' => 'Recherches') as $section => $titre) { ?>
							<div class="entete_cadre"><?php echo $titre ?></div>
							<?php foreach($valeurs->rapport[$section] as $nom => $valeur) {$contenu_area .= "\n".$nom.'	'.$valeur; ?>
							<div class="ligne_cadre_structure ligne_rapport" data-categorie="<?php echo $section ?>">	
								<span><?php echo $nom ?> :	</span>
								<span class="input_fige"><?php echo number_format($valeur,0,'.',' '); ?></span>
								<input style="display:none" type="text" value="<?php echo number_format($valeur,0,'.',' '); ?>" class="<?php echo (($section == 'armee')?'input_tableau':'input_niveau') ?>" style="float:right" onkeyup="ze_Ajout_espaces(this)">
							</div>
							<?php }} ?>
							<div class="ligne_cadre_structure">	
								<input type="button" class="bouton modif_rapport" value="Editer" onclick="Lancement_modification_rapport('<?php echo $pseudo ?>', <?php echo $valeurs->rapport['ID'] ?>)">
							</div>
							<div class="ligne_cadre_structure">	
								<input type="button" class="bouton modif_rapport" value="Supprimer" onclick="Supprimer_rapport('<?php echo $pseudo ?>', <?php echo $valeurs->rapport['ID'] ?>)">
							</div>
							<div class="ligne_cadre_structure">	
								<input type="button" class="bouton modif_rapport" value="Exporter" onclick="Exporter_rapport('<?php echo $pseudo ?>')">
							</div>
							<div class="ligne_cadre_structure" style="height:auto">
								<textarea class="exporter_rapport" style="display:none"><?php echo $contenu_area ?></textarea>
							</div>
						</div>
						<?php $first=false;}} ?>
						<form method="POST" action="">
							<input type="hidden" name="nouveau_rapport" id="pseudo_nouveau_rapport" value="">
							<div class="zone_contenu zone_largeur_courte" id="nouveau_releve" style="display:none;">
								<div class="entete_cadre">Relevé pour <span></span></div>
								<div class="ligne_cadre_structure">
									<span>Date du rapport :	</span>
									<input type="text" class="input_tableau" name="nouvelle_date" id="date" style="float:right">
								</div>
								<div class="ligne_cadre_structure ligne_rapport">
									<span>Ouvrières :	</span>
									<input type="text" class="input_tableau" name="ouvrieres[]" value="0" style="float:right" onkeyup="ze_Ajout_espaces(this)">
								</div>
								<?php foreach(array(
												'armee' => array('titre' => 'Armée', 'valeurs' => Fourmizzz::$unites['TAGs']), 
												'constructions' => array('titre' =>'Constructions', 'valeurs' => array_merge(Fourmizzz::$constructions, array('Bâtiment en cours', 'Bâtiment en cours (C+)'))),
												'recherches' => array('titre' => 'Recherches', 'valeurs' => array_merge(Fourmizzz::$recherches, array('Recherche en cours', 'Recherche en cours (C+)')))) 
									  as $section => $donnees) { ?>
								<div class="entete_cadre"><?php echo $donnees['titre'] ?></div>
								<?php if($section == 'armee') { ?>
								<div class="ligne_cadre_structure" style="text-align: center;">
									<a href="#modal-content" id="open_popup_armee">Copier une armée</a>
								</div>								
								<?php } ?>
								<?php $i=0;foreach($donnees['valeurs'] as $valeur) { ?>
								<div class="ligne_cadre_structure ligne_rapport">	
									<span><?php echo $valeur ?> :	</span>
									<input type="text" value="0" <?php if($section == 'armee') { ?>id="unite_<?php echo $i ?>"<?php } ?>name="<?php echo $section ?>[]" class="<?php echo (($section == 'armee')?'input_tableau':'input_niveau') ?>" style="float:right" onkeyup="ze_Ajout_espaces(this)">
								</div>
								<?php $i++;}} ?>
								<div class="ligne_cadre_structure">	
									<input type="submit" class="bouton" value="Enregistrer">
								</div>
							</div>
						</form>
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
		<script src="/Javascript/Pontes.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
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
		
function Afficher_rapport(pseudo) {
	document.querySelector('#nouveau_releve').style.display = 'none';
	var releves = document.querySelectorAll('div[id*="releve_"]');
	for(var i=0; i<releves.length; i++) {
		releves[i].style.display = (releves[i].dataset.pseudo == pseudo) ? '' : 'none';
	}
}

function Lancement_modification_rapport(pseudo, ID) {
	var cadre = document.querySelector('.zone_largeur_courte[data-pseudo="' + pseudo + '"]'),
		lignes = cadre.querySelectorAll('.ligne_rapport');
	if(cadre.querySelector('.modif_rapport').value == 'Editer') {
		for(var i=0; i<lignes.length; i++) {
			lignes[i].querySelector('.input_fige').style.display = 'none';
			lignes[i].querySelector('input').style.display = '';
		}
		cadre.querySelector('.modif_rapport').value = 'Enregistrer';
	}
	else if(cadre.querySelector('.modif_rapport').value == 'Enregistrer') {
		var valeurs = { ouvrieres : new Array(), armee : new Array(), constructions : new Array(), recherches : new Array()};
		for(var i=0; i<lignes.length; i++) {
			var valeur = parseInt(lignes[i].querySelector('input').value.replace(/ /g, ''));
			lignes[i].querySelector('.input_fige').innerHTML = ze_Nombre(valeur);
			lignes[i].querySelector('.input_fige').style.display = '';
			lignes[i].querySelector('input').style.display = 'none';
			valeurs[lignes[i].dataset.categorie].push(valeur);
		}
		var xdr = ze_getXDomainRequest();
		xdr.onload = function() {
			cadre.querySelector('.modif_rapport').value = 'Editer';
		}
		xdr.open('POST', url_zzzelp + 'update_rapport?serveur=' + ze_Analyser_URL('serveur') + '&alliance=' + ze_Analyser_URL('alliance') + '&ID=' + ID + '&mode=edit', true);
		xdr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xdr.send('rapport=' + JSON.stringify(valeurs));
	}
}

function Supprimer_rapport(pseudo, ID) {
	var xdr = ze_getXDomainRequest();
	xdr.onload = function() {
		window.location.reload();
	}
	xdr.open('GET', url_zzzelp + 'update_rapport?serveur=' + ze_Analyser_URL('serveur') + '&alliance=' + ze_Analyser_URL('alliance') + '&ID=' + ID + '&mode=delete', true);
	xdr.send();
}

function Exporter_rapport(pseudo) {
	document.querySelector('.zone_largeur_courte[data-pseudo="' + pseudo + '"] .exporter_rapport').style.display = '';
}
			
function Creer_rapport(pseudo) {
	var releves = document.querySelectorAll('div[id*="releve_"]');
	for(var i=0; i<releves.length; i++) {
		releves[i].style.display = 'none';
	}

	var releve = document.querySelector('#nouveau_releve');
	releve.style.display = '';
	releve.querySelector('.entete_cadre > span').innerHTML = pseudo;
	releve.querySelector('#date').placeholder = ze_Generation_date_v1(time());
	releve.querySelector('#date').value = ze_Generation_date_v1(time());
	document.querySelector('#pseudo_nouveau_rapport').value = pseudo;

	var ex_releves = document.querySelectorAll('div[id*="releve_"][data-pseudo="' + pseudo + '"]');
	if(ex_releves.length > 0) {
		var inputs = releve.querySelectorAll('input[type="text"]'),
			ex_inputs = ex_releves[0].querySelectorAll('input[type="text"');
		for(var i=0; i<ex_inputs.length; i++) {
			inputs[i+1].value = ex_inputs[i].value;
		}
	}
}
		</script>
	</body>
</html>
