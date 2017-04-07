 <!DOCTYPE html>
<html lang="fr">
	<head>
		<?=HTMLGenerique::get_header(); ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp(); ?>
			</div>
			<div class="main">
				<div class="grid grid-pad grid_separee">
					<?php foreach($sections as $section) { ?>
					<div class="col-1-<?php echo count($sections) ?>">
						<div class="ancre" id="ancre_<?php echo $section['id'] ?>" onclick="Changement_section('<?php echo $section['id'] ?>')">
							<?php echo $section['titre'] ?>
						</div>
					</div>
					<?php } ?>
				</div>
				<input type="hidden" id="section_actuelle" value="">
				<div class="grid grid-pad">
					<div class="col-1-1">
						<div class="zone_contenu zone_largeur_courte">
							<div class="ligne_cadre_structure">
								<span>Début : </span>
								<input type="text" class="input_haut" id="debut" autocomplete="off" value="<?php echo date('Y-m-d', strtotime('-7 day', mktime(0, 0, 0, date('m'), date('d'), date('Y')))) ?>">
							</div>
							<div class="ligne_cadre_structure">
								<span>Fin : </span>
								<input type="text" class="input_haut" id="fin" autocomplete="off" value="<?php echo date('Y-m-d', strtotime('-1 day', mktime(0, 0, 0, date('m'), date('d'), date('Y')))) ?>">
							</div>
							<div class="ligne_cadre_structure">
								<a href="#" class="bouton" onclick="Changement_section(document.querySelector('#section_actuelle').value)">Actualiser</a>
							</div>
							<div class="ligne_cadre_structure">
								<center>
									<a onclick="window.open(this.href); return false;" style="font-weight:normal;font-style:italic" href="<?php echo $GLOBALS['url_site'] ?>archives?serveur=<?php echo $_GET['serveur'] ?>&alliance=<?php echo $_GET['alliance'] ?>">Anciennes archives</a>
								</center>
							</div>
						</div>
						<br><br>
					</div>
				</div>
				<div class="grid grid-pad zone_stats" data-total=0>
				</div>	
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script src="http://code.highcharts.com/stock/highstock.js"></script>
		<script src="/Javascript/Statistiques.js"></script>-->
		<link rel="stylesheet" type="text/css" href="/Style/rome.css" />
		<script src='http://bevacqua.github.io/rome/dist/rome.js'></script>
		<script>
			rome(document.querySelector('#debut'), { time: false, min : '2015-02-04', max : '<?php echo date('Y-m-d', strtotime('-1 day', mktime(0, 0, 0, date('m'), date('d'), date('Y')))) ?>' });
			rome(document.querySelector('#fin'), { time: false, min : '2015-02-04', max : '<?php echo date('Y-m-d') ?>' });
		</script>
	</body>
</html>

