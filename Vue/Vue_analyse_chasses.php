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
						<div class="zone_contenu zone_invisible">
							<textarea style="width:100%;height:300px;overflow-y:hidden" onchange="ze_Analyse_chasses(this.value)" onkeyup="ze_Analyse_chasses(this.value)" placeholder="Copiez vos rapports de chasse ici"></textarea>
							<div id="resultats_chasses" style="width:700px;margin:25px auto">
						</div>
					</div>
				</div>			
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/base_zzzelp.js"></script>
		<script src="/Javascript/AnalyseChasses.js"></script>
	</body>
</html>

