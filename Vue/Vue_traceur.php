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
				<div class="grid grid-pad grid_separee">
					<div class="col-1-4">
						<div class="ancre" id="ancre_principale" data-mode="correspondances">
							Floods trouvés
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" id="ancre_imports_manuels" data-mode="variations">
							Variations
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" id="ancre_sondes" data-mode="joueurs">
							Joueurs
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" id="ancre_zzzelpscript" data-mode="alliances">
							Alliances
						</div>
					</div>
				</div>
				<div class="grid grid-pad">
					<div class="col-1-1">
						<div class="zone_contenu zone_largeur_courte" id="options_traceur">
							<div class="ligne_cadre_structure">
								<span>Début : </span>
								<input type="text" class="input_haut" id="debut" autocomplete="off">
							</div>
							<div class="ligne_cadre_structure">
								<span>Fin : </span>
								<input type="text" class="input_haut" id="fin" autocomplete="off" >
							</div>
							<div class="ligne_cadre_structure">
								<a class="bouton">Actualiser</a>
							</div>
						</div>
						<br><br>
					</div>
				</div>	
				<div class="grid grid-pad">
					<div class="col-1-1">
						<div class="zone_contenu zone_invisible" id="donnees_traceur">
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script src="http://code.highcharts.com/highcharts.js"></script>
		<script src='http://bevacqua.github.io/rome/dist/rome.js'></script>
		<link rel="stylesheet" type="text/css" href="/Style/rome.css" />
		<script src="/Javascript/Traceur_prive.js"></script>
		<script>
			document.querySelector('#options_traceur').dataset.mode = window.location.hash;
			InitialiserTraceur()			
		</script>
	</body>
</html>
