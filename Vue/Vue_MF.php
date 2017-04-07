<!DOCTYPE html>
<html lang="fr">
	<head>
		<?=HTMLGenerique::get_header(); ?>
		<link rel="stylesheet" type="text/css" href="/Style/MF.css" />
		<link rel="stylesheet" type="text/css" href="/Style/zzzelpUI.css" />
		<link rel="stylesheet" type="text/css" href="/Style/animate.css" />
		<script type="text/javascript" src="/Javascript/base_zzzelp.js"></script>
		<script type="text/javascript" src="/Javascript/MF.js"></script>
		<script type="text/javascript" src="/Javascript/Guerre.js"></script>
		<script type="text/javascript" src="/Javascript/zzzelpfloods.js"></script>
		<script type="text/javascript" src="/ZzzelpScript/Analyseurs.js"></script>
		<link rel="stylesheet" type="text/css" href="/Style/rome.css" />
		<script src='http://bevacqua.github.io/rome/dist/rome.js'></script>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp(); ?>
			</div>
			<div class="main">
				<div class="zone_multiflood">
				</div>
				<div class="zone_lien">
				</div>
				<div class="zone_floods">
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script>
			var zone = document.querySelector('.zone_multiflood'),
				donnees = <?php echo $MF->create_json(); ?>;
			Initialisation_MF(zone, donnees);
		</script>
	</body>
</html>



