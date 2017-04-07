 <!DOCTYPE html>
<html lang="fr">
	<head>
		<?=HTMLGenerique::get_header(); ?>
		<style>

.main {
	background: #2E2E2E;
}

.zone_stats > div {
	width : 95%;
    box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.6), 0 4px 4px 0 rgba(0, 0, 0, 0.5);
    margin: 25px auto;
    position: relative;
    border-radius: 2px;
}

.ancre {
	box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.6), 0 4px 4px 0 rgba(0, 0, 0, 0.5);
}


.zone_composition_joueur {
	width : 700px !important;
	max-width: 90%;
	background: #fafafa;
}

.choix_joueur_composition, .choix_stat_composition {
	line-height: 3em;
}

.choix_joueur_composition > select, .choix_stat_composition > select {
	float : right;
    margin: 0.6em 10px;
    height: 1.8em;
}

.choix_joueur_composition > span, .choix_stat_composition > span {
	padding-left: 10px;
}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp(); ?>
			</div>
			<div class="main">
				<div class="grid grid-pad grid_separee barre_nav">
					<div class="col-1-4">
						<div class="ancre" data-selected="0" data-section="generales" onclick="Creation_graphiques('generales', 1)">
							Statistiques générales
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" data-selected="0" data-section="composition" onclick="Creation_graphiques('composition', 1)">
							Composition des armées
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" data-selected="0" data-section="roles" onclick="Creation_graphiques('roles', 1)">
							Répartition par alliance
						</div>
					</div>
					<div class="col-1-4">
						<div class="ancre" data-selected="0" data-section="developpement" onclick="Creation_graphiques('developpement', 1)">
							Conseils de développement
						</div>
					</div>
				</div>
				<div class="grid grid-pad grid_separee barre_pex" style="display:none">
					<div class="col-1-3">
						<div class="ancre" id="ancre_principale" onclick="Creation_graphiques('', 0)">
							Sans pex
						</div>
					</div>
					<div class="col-1-3">
						<div class="ancre" id="ancre_imports_manuels" onclick="Creation_graphiques('', 1)">
							Actuelle
						</div>
					</div>
					<div class="col-1-3">
						<div class="ancre" id="ancre_sondes" onclick="Creation_graphiques('', 2)">
							Full pex
						</div>
					</div> 
				</div>
				<div class="grid grid-pad zone_stats animated fadeInRight">
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/StatistiquesArmee.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script src="http://code.highcharts.com/stock/highstock.js"></script>
		<link rel="stylesheet" type="text/css" href="/Style/animate.css" />
		<script>
var armees = <?php echo json_encode($armees); ?>;

Creation_graphiques('generales', 1);

		</script>
	</body>
</html>


