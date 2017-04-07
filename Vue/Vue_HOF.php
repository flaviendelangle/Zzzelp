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
						<div class="zone_contenu zone_largeur_courte">
							<div class="ligne_cadre_structure" style="height:auto">
								<textarea id="contenu_RC"></textarea>
							</div>
							<div class="ligne_cadre_structure">
								<a onclick="Lancer_analyse();return false;" class="bouton">Analyser</a>
							</div>
						</div>
						<br><br>
						<div class="zone_contenu zone_invisible" id="zone_analyses" style="width: 770px;max-width:100%">
						</div>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="/ZzzelpScript/Analyseurs.js"></script>	
		<script type="text/javascript" src="/ZzzelpScript/Armee.js"></script>	
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script>

function Lancer_analyse() {
	document.querySelector('#zone_analyses').innerHTML = '';
	var analyseur = new ZzzelpScriptRC(),
		valeur = document.querySelector('#contenu_RC').value,
		zones = analyseur.HOF(valeur, false);
	for(var n=0; n<zones.length; n++) {
		document.querySelector('#zone_analyses').appendChild(zones[n].zone);
	}	
}

		</script>
	</body>
</html>
