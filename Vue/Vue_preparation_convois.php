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
				<br><br>
				<div class="grid grid-pad">
					<div class="col-1-1">
					   <div class="zone_contenu zone_largeur_courte">
							<div class="entete_cadre">Preparation convois</div>
							<div class="ligne_cadre_structure select_centre">
								<select id="mode_envoi" onchange="Modification_convoi()">
									<option value="libre" selected>Envoyer les ouvrières libres</option>
									<option value="tout">Envoyer toutes les ouvrières</option>
									<option value="manuel">Choisir manuellement la valeur</option>
								</select>
							</div>
							<div class="ligne_cadre_structure">
								<span>Total à convoyer : </span>
								<span class="input_fige"><?php echo number_format(htmlentities($_GET['valeur_convois']), 0, '.' , ' ') ?></span>
							</div>
							<div class="ligne_cadre_structure">
								<span>Ouvrières : </span>
								<span class="ligne_inputs">
									<input type="text" id="ouvrieres" value="<?php echo number_format($convois->utilisateur->niveaux->ouvrieres, 0, '.', ' ') ?>" class="input_tableau" onkeyup="Ajout_espaces('ouvrieres')" onblur="Modification_convoi()">
									<a  href='http://<?php echo $compte->serveur ?>.fourmizzz.fr/Ressources.php?alliance=<?php echo htmlentities($_GET['alliance']) ?>&pseudo=<?php echo htmlentities($_GET['pseudo']) ?>&valeur_convois=<?php echo htmlentities($_GET['valeur_convois']) ?>&ressource=<?php echo htmlentities($_GET['ressource']) ?>'><img src="/Images/inverser.png" style="height:1.2em;margin-left:15px;margin-top:0.8em"></a>
								</span>
							</div>
							<div class="ligne_cadre_structure">
								<span>TDC actuel : </span>
								<span class="ligne_inputs">
									<input type="text" id="TDC" value="<?php echo number_format($convois->utilisateur->lastTDC, 0, '.', ' ') ?>" class="input_tableau" onkeyup="ze_Ajout_espaces(this)" onblur="Modification_convoi()">
									<a href='http://<?php echo $compte->serveur ?>.fourmizzz.fr/Ressources.php?alliance=<?php echo htmlentities($_GET['alliance']) ?>&pseudo=<?php echo htmlentities($_GET['pseudo']) ?>&valeur_convois=<?php echo htmlentities($_GET['valeur_convois']) ?>&ressource=<?php echo htmlentities($_GET['ressource']) ?>'><img src="/Images/inverser.png" style="height:1.2em;margin-left:15px;margin-top:0.8em"></a>
								</span>
							</div>
							<div class="ligne_cadre_structure">
								<span>Etable : </span>
								<span class="ligne_inputs">
									<input type="text" id="etable" value="<?php echo number_format($convois->utilisateur->niveaux->etable_pucerons, 0, '.', ' ') ?>" class="input_niveau" onblur="Modification_convoi()">
									<img src="/Images/inverser.png" style="height:1.2em;margin-left:15px;margin-top:0.8em;visibility:hidden">
								</span>
							</div>
							<div class="ligne_cadre_structure">
								<span>Convois : </span>
								<span class="ligne_inputs">
									<input type="text" id="convois" class="input_tableau" onkeyup="ze_Ajout_espaces(this);Verification_valeur_convois();">
									<img src="/Images/inverser.png" style="height:1.2em;margin-left:15px;margin-top:0.8em;visibility:hidden">
								</span>
							</div>
							<a class="bouton" onclick="Lancement_convois()">Lancer le convoi</a>
					   </div>
					   <br><br>
					</div>
				</div>				
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script src="/Javascript/Convois.js"></script>
		<script>
			var ID = <?php echo $convois->convoye->id ?>;
function Modification_convoi() {
	var mode = document.querySelector('#mode_envoi').value;
	document.querySelector('#convois').disabled = !(mode == 'manuel')
	if(mode != 'manuel') {
		document.querySelector('#convois').value = ze_Nombre(ze_Majoration(parseInt((10 + document.querySelector('#etable').value * 0.5)*(parseInt(document.querySelector('#ouvrieres').value.replace(/ /g, '')) - ((mode == 'tout') ? 0 : parseInt(document.querySelector('#TDC').value.replace(/ /g, ''))))), parseInt(ze_Analyser_URL('valeur_convois'))));
	}
	console.log('Valeur du convois actualisée');
}

function Verification_valeur_convois() {
	document.querySelector('#convois').style.color = ((parseInt(document.querySelector('#convois').value.replace(/ /g, '')) > (10 + document.querySelector('#etable').value * 0.5)*parseInt(document.querySelector('#ouvrieres').value.replace(/ /g, ''))) ? 'red' : 'black');
}

function Lancement_convois() {
	var URL = 'http://' + ze_Analyser_URL('serveur') + '.fourmizzz.fr/commerce.php?materiaux=' + ((ze_Analyser_URL('ressource') == 'materiaux') ? parseInt(document.querySelector('#convois').value.replace(/ /g, '')) : 0) + '&nourriture=' + ((ze_Analyser_URL('ressource') == 'nourriture') ? parseInt(document.querySelector('#convois').value.replace(/ /g, '')) : 0) + '&pseudo=' + ze_Analyser_URL('pseudo') + '&alliance=' + ze_Analyser_URL('alliance') + '&mode=' + ze_Analyser_URL('ressource').substr(0,3) + '&ID=' + ID;
	document.location.href = URL;
}

			if(ze_Analyser_URL('ouvrieres') != '') {
				document.querySelector('#ouvrieres').value = ze_Nombre(parseInt(ze_Analyser_URL('ouvrieres')));
			}
			Modification_convoi();
		</script>
	</body>
</html>
