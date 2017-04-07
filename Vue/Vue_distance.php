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
					<div class="col-1-1">
						<div class="zone_contenu zone_largeur_courte">
							<div class="ligne_cadre_structure">
								<span>Serveur : </span>
								<select id="serveur" onchange="Nettoyer_valeurs()">
									<?php foreach(Fourmizzz::$serveur_complet as $s => $serveur) { ?>
									<option id="<?php echo $s ?>" value="<?php echo $s ?>"><?php echo $serveur ?></option>
									<?php } ?>
								</select>
							</div>
							<div class="ligne_cadre_structure">
								<span>Alliances : </span>
								<input type="text" id="alliances" class="input_tableau">
							</div>
							<div class="ligne_cadre_structure">
								<span>Joueurs : </span>
								<input type="text" id="joueurs" class="input_tableau">
							</div>
							<div class="ligne_cadre_structure">
								<span>Vitesse d'attaque :</span>
								<input type="text" id="vitesse_attaque" class="input_niveau" value="0" onkeyup="MAJ_tableau()">
							</div>
							<div id="td" colspan="2"><a href="#" onclick="Chargement_coordonnees()" class="bouton">Charger</a></td>
						</div>
					</div>
				</div>
				<br><br>
				<div class="grid grid-pad">
					<div class="col-1-1" id="carte_joueurs"></div>
					<br><br>
					<div class="col-1-1" id="zone_distance">
					</div>
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/Distance.js"></script>
		<script src="http://code.highcharts.com/stock/highstock.js"></script>
		<script>
			<?php if(in_array($_GET['serveur'], Fourmizzz::$serveurs)) { ?>
			document.querySelector('#serveur').value = "<?php echo $_GET['serveur'] ?>";
			<?php } ?>
			autocompletion(document.querySelector('#alliances'), { mode : 'alliance', serveur : document.querySelector('#serveur').value, multiple : true });
			autocompletion(document.querySelector('#joueurs'), { mode : 'joueur', serveur : document.querySelector('#serveur').value, multiple : true });
		</script>
	</body>
</html>
