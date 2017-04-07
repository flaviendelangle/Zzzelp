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

		<script type="text/javascript" src="/ZzzelpScript/zzzelpfloods/main.js"></script>
		<script type="text/javascript" src="/ZzzelpScript/zzzelpfloods/attack.js"></script>
		<script type="text/javascript" src="/ZzzelpScript/zzzelpfloods/player.js"></script>
		<script type="text/javascript" src="/ZzzelpScript/zzzelpfloods/optimization.js"></script>

		<script type="text/javascript" src="/ZzzelpScript/analysers/textoutput.js"></script>
		<script type="text/javascript" src="/ZzzelpScript/analysers/combat.js"></script>
		<script type="text/javascript" src="/ZzzelpScript/zzzelp/alliancemanager.js"></script>
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
			new ZzzelpMultiflood(zone, donnees);
		</script>
	</body>
</html>



