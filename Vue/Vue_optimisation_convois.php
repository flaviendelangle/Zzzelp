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
						<div class="zone_contenu zone_invisible">
							<textarea rows="15" cols="30" id='liste_convois' onchange="Repartition_convois()">Joueur 1 Valeur 1 <?php echo "\n" ?>Joueur 2 Valeur 2 <?php echo "\n" ?>...</textarea>
							<div id="zone_liste_besoins">
							</div>
						</div>
					</div>
					<div class="col-1-2">
						<div class="content" id="resultats_opti">
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/CreationConvois.js"></script>
		<script>
			var alliance = "<?php echo htmlentities($_GET['alliance']) ?>",
				serveur = "<?php echo htmlentities($_GET['serveur']) ?>";
		</script>
	</body>
</html>

