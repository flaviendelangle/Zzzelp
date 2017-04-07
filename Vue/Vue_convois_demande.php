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
					<div class="col-1-1">
						<a class="bouton" onclick="document.querySelector('.modal_zzzelp').style.display = ''">Faire une demande</a>
						<table class="tableau_ombre" style="margin-bottom: 3em;">
							<tr>
								<th>Pseudo</th>
								<th></th>
								<th>Date butoire</th>
								<th>Durée</th>
								<th>Part livrée</th>
								<th>Restant à livrer</th>
								<th>Commentaire</th>
								<?php if($convois->membre_alliance->check_droit_outil('gestion_convois')) { ?>
								<th></th>
								<?php } ?>
								<th>
							</tr>
							<?php  foreach($convois->demandes as $demande) { ?>
							<tr data-numero="<?php echo $demande['ID'] ?>">
								<td><a href="http://<?php echo $compte->serveur ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $demande['pseudo'] ?>" target="_BLANK"><?php echo $demande['pseudo'] ?></a></td>
								<td>
									<img alt="nourritures" src="http://s1.fourmizzz.fr/images/icone/icone_<?php echo (($demande['mode'] == 'nou') ? 'pomme' : 'bois'); ?>.png" width="18" height="18" title="Nourriture">
								</td>
								<td style="color:<?php echo $demande['couleur'] ?>">
									<?php echo $demande['date_besoin']->date_simple(); ?>
								</td>
								<td><?php echo date('H:i', $demande['duree']-3600) ?></td>
								<td><?php echo (int)(1000*(1-($demande['restant']/$demande['valeur'])))/10 ?> %</td>
								<td><?php echo Nombre::Espaces($demande['restant']) ?></td>
								<td><?php echo $demande['commentaire'] ?></td>
								<?php if($convois->membre_alliance->check_droit_outil('gestion_convois')) { ?>
								<td><img src="/Images/edit.png" width="20px" onclick="Editer_demande(this.parentNode.parentNode)" style="cursor:pointer;"></td>
								<td>	
									<?php } if($demande['pseudo'] != $compte->pseudo) { ?>
								
									<a href="preparation?ressource=materiaux&serveur=<?php echo $alliance->serveur ?>&alliance=<?php echo $alliance->alliance ?>&pseudo=<?php echo $demande['pseudo'] ?>&valeur_convois=<?php echo $demande['restant'] ?>">
										<input type="image" src="/Images/Fleche_droite.png" width="20px"/>
									</a>
									<?php } ?>
								</td>
							</tr>
							<?php  } ?>
						</table>
					</div>
				</div>		
			</div>
		</div>
		<div class="modal_zzzelp" style="display:none">
			<div style="max-width: 500px;">
				<div class="zzzelp_modal_boutons"><img src="/Images/close.png" onclick="this.parentNode.parentNode.parentNode.style.display = 'none'"></div>
				<header>Faire une demande de <?php echo $_GET['ressource'] ?></header>
				<div class="zzzelp_contenu_modal">
					<div>
						<div class="zzzelp_section_fenetre zone_invisible zone_largeur_courte" style="box-shadow: none;border: 0px;">
							<div class="ligne_cadre_structure">
								<span>Date de fin de livraison : </span>
								<input type="text" class="input_haut input_tableau" autocomplete="off" id="date_demande" value="<?php echo date('d/m/y', time()+86400*7) ?>">
							</div>							
							<div class="ligne_cadre_structure">
								<span>Quantité demandée : </span>
								<input type="text" class="input_haut" style="width:130px" id="valeur_demande" value="0" onkeyup="ze_MAJ_valeur_demande(this)" data-max="<?php echo $alliance->parametres_convois['demande_max'] ?>">
							</div>
							<div class="ligne_cadre_structure">
								<span>Raison :</span>
								<select id="demande_select" onclick="MAJ_affichage_raison_demande()">
									<?php foreach(array_merge(Fourmizzz::$constructions_mini, Fourmizzz::$recherches_mini, array('...Autre')) as $option) { ?>
									<option><?php echo $option ?></option>
									<?php } ?>
								</select>
							</div>
							<div class="ligne_cadre_structure" style="display:none">
								<input type="text" class="input_haut" id="demande_raison" placeholder="Raison de votre demande">
							</div>
							<div class="ligne_cadre_structure">
								<a href="#" class="bouton" onclick="Valider_demande()">Enregistrer</a>
							</div>						
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/Convois.js"></script>
		<link rel="stylesheet" type="text/css" href="/Style/rome.css" />
		<script src='http://bevacqua.github.io/rome/dist/rome.js'></script>
		<script>
			rome(document.querySelector('#date_demande'), { time : false, min : '<?php echo date('Y/m/d', time()+86400*7) ?>', inputFormat : 'DD/MM/YY'});
		
function MAJ_affichage_raison_demande() {
	console.log(document.querySelector('#demande_select').value)
	document.querySelector('#demande_raison').parentNode.style.display = (document.querySelector('#demande_select').value == '...Autre') ? '' : 'none';
}

function Editer_demande(ligne) {
	var date = ligne.cells[2].innerHTML.trim(),
		valeur = ligne.cells[5].innerHTML,
		raison = ligne.cells[6].innerHTML,
		input_date = document.createElement('input'),
		input_valeur = document.createElement('input'),
		input_raison = document.createElement('input');
	input_date.value = date;
	input_valeur.value = valeur;
	input_raison.value = raison;
	input_date.className = 'input_haut';
	input_valeur.className = 'input_haut';
	input_raison.className = 'input_haut input_tableau';
	input_date.setAttribute('style', 'width: 70px;')
	input_valeur.setAttribute('style', 'width:130px');
	input_valeur.onkeyup = function onkeyup(event) {
		ze_Ajout_espaces(this);
	}
	rome(input_date, { time : false, inputFormat : 'DD/MM/YY' });
	
	ligne.cells[2].innerHTML = '';
	ligne.cells[5].innerHTML = '';
	ligne.cells[6].innerHTML = '';
	ligne.cells[2].appendChild(input_date);
	ligne.cells[5].appendChild(input_valeur);
	ligne.cells[6].appendChild(input_raison);

	ligne.cells[7].querySelector('img').src = '/Images/valider.png';
	ligne.cells[7].querySelector('img').onclick = function onclick(event) {
		var ligne = this.parentNode.parentNode;
			valeur = parseInt(ligne.cells[5].querySelector('input').value.replace(/ /g, '')),
			date = ze_Date_to_timestamp_v1(ligne.cells[2].querySelector('input').value),
			raison = ligne.cells[6].querySelector('input').value,
			ID = ligne.dataset.numero,
			url = url_zzzelp + 'update_convois?mode=demandes&serveur=' + ze_Analyser_URL('serveur') + '&alliance=' + ze_Analyser_URL('alliance') + '&ressource=' + ze_Analyser_URL('ressource') + '&valeur=' + valeur + '&date=' + date + '&raison=' + raison + '&ID=' + ID;
		document.location.href = url;
	}
}

function ze_MAJ_valeur_demande(input) {
	var max = parseInt(input.dataset.max),
		actuelle = parseInt(input.value.replace(/ /g, '')),
		valeur = ze_Majoration(actuelle, max);
	input.value = ze_Nombre(valeur);
}
		</script>
	</body>
</html>
