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
				<div class="grid grid-pad grid_separee">
					<div class="col-1-4">
						<div class="ancre" id="ancre_principale" onclick="Importer_donnees('TDC_moyens')">
							TDC moyens
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" id="ancre_imports_manuels" onclick="Importer_donnees('floods')">
							Floods
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" id="ancre_sondes" onclick="Importer_donnees('convois')">
							Convois
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" id="ancre_zzzelpscript" onclick="Importer_donnees('modification_niveaux')">
							Modification niveaux
						</div>
					</div>
				</div>
				<input type="hidden" id="section_actuelle" value="convois">
				<div class="grid grid-pad">
					<div class="col-1-1">
						<div class="zone_contenu zone_largeur_courte">
								<div class="ligne_cadre_structure">
									<span>Début : </span>
									<input type="text" class="input_haut" id="debut" autocomplete="off" value="<?php echo date('Y-m-d H:i', time() - 86400*7) ?>">
								</div>
								<div class="ligne_cadre_structure">
									<span>Fin : </span>
									<input type="text" class="input_haut" id="fin" autocomplete="off" value="<?php echo date('Y-m-d H:i') ?>">
								</div>
								<div class="ligne_cadre_structure">
									<span>Joueurs : </span>
									<input type="text" class="input_haut" id="joueurs" autocomplete="off">
								</div>
								<a href="#" class="bouton" onClick="Importer_donnees(document.querySelector('#section_actuelle').value)">Génerer</a>
							</div>
							<div id="zone_donnees" style="margin: 50px 0;">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/GestionAlliance.js"></script>
		<link rel="stylesheet" type="text/css" href="/Style/rome.css" />
		<script src='http://bevacqua.github.io/rome/dist/rome.js'></script>
		<script>
			rome(document.querySelector('#debut'), { time: true });
			rome(document.querySelector('#fin'), { time: true });
			autocompletion(document.querySelector('#joueurs'), { mode : 'joueur', serveur : ze_Analyser_URL('serveur'), multiple : true });
		</script>
	</body>
</html>

