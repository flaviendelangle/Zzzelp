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
					<div class="col-1-3">
						<div class="ancre" onclick="document.querySelector('#firefox').scrollIntoView(true)">
							Installation Firefox
						</div>
					</div>
					<div class="col-1-3">
						<div class="ancre" onclick="document.querySelector('#chrome').scrollIntoView(true)">
							Installation Chrome / Chromium
						</div>
					</div>
					<div class="col-1-3">
						<div class="ancre" onclick="document.querySelector('#android').scrollIntoView(true)">
							Installation Firefox Mobile (Android)
						</div>
					</div>
				</div>
				<div class="grid grid-pad">
					<div class="col-1-1">
						<div class="zone_contenu zone_lisible" id="tutoriel">
							<div class="entete_cadre" id="firefox">Firefox</div>
							<ul>
								<li>
									<strong>Etape 1 :</strong> 
									Installation de <a href="https://addons.mozilla.org/fr/firefox/addon/greasemonkey/">Greasemonkey</a>
									<img src="/Images/Page_greasemonkey.png" alt="Ecran d'installation de Greasemonkey">
								</li>
								<li>
									<strong>Etape 2 : </strong>
									Installation de ZzzelpScript <br>
									<center>
										<a href="/Userscripts/zzzelpscript.user.js" class="button button-pill button-flat-highlight button-large">Installer</a>
									</center>
									<img src="/Images/Ecran_installation_ZzzelpScript_Firefox.png" alt="Ecran d'installation de ZzzelpScript">
								</li>
							</ul>	
							<br>
						</div>
						<br><br>
						<div class="zone_contenu zone_lisible" id="tutoriel">
							<div class="entete_cadre" id="chrome">Chrome / Chromium</div>
							<ul>
								<li>
									<strong>Etape 1 : </strong>
									Installation de ZzzelpScript <br>
									<center>
										<a href="https://chrome.google.com/webstore/detail/zzzelpscript/kmhifjihihhjppngfjocphcicajknmkj?hl=fr&utm_source=chrome-ntp-launcher" class="button button-pill button-flat-highlight button-large">Installer</a>
									</center>
									<img src="/Images/Ecran_installation_ZzzelpScript_Chrome.png" alt="Ecran d'installation de ZzzelpScript">									
								</li>
							</ul>
							<br>
						</div>
						<br><br>
						<div class="zone_contenu zone_lisible" id="tutoriel">
							<div class="entete_cadre" id="android">Firefox Mobile (Android)</div>
							<ul>
								<li>
									<strong>Etape 1 : </strong>
									Téléchargement du fichier<br>
									<b>Non disponible à cause de la nouvelle politique de Firefox.</b>
									<center>
										<a href="https://addons.mozilla.org/en-US/android/addon/zzzelpscript/" class="button button-pill button-flat-highlight button-large">Installer</a>
									</center>
								</li>
								<li>
									<strong>Etape 1 : </strong>
									Ouverture avec <strong>Firefox Mobile</strong> / Installation de ZzzelpSript <br><br>
									<img src="/Images/Installation_ZzzelpScript_Android_1.png" style="width:300px;display:inline-block;margin:10px" alt="Ecran d'installation de ZzzelpScript">
									<img src="/Images/Installation_ZzzelpScript_Android_2.png" style="width:300px;display:inline-block;margin:10px" alt="Ecran d'installation de ZzzelpScript">
									<img src="/Images/Installation_ZzzelpScript_Android_3.png" style="width:300px;display:inline-block;margin:10px" alt="Ecran d'installation de ZzzelpScript">
								</li>
							</ul>
							<br>
							<!--
							<ul>
								<li>
									<strong>Etape 1 : </strong>
									Téléchargement de ZzzelpScript : (Clic droit - Enregistrer sous)
									<br><br>
									<center>
										<a href="/Userscripts/zzzelpscript.user.js" class="button button-pill button-flat-highlight button-large">Télécharger</a>
									</center>
								</li>
								<li>
									<strong>Etape 2 : </strong>
									Allez dans "Paramètres" - "Extensions" et faites glisser le fichier au milieu de la page
									<img src="/Images/Installation_ZzzelpScript_Chrome_1.png" alt="Ecran d'installation de ZzzelpScript">
								</li>
								<li>
									<strong>Etape 3 : </strong>
									Confirmez l'installation de ZzzelpScript
									<img src="/Images/Installation_ZzzelpScript_Chrome_2.png" alt="Ecran d'installation de ZzzelpScript">
								</li>							
							</ul>
							-->
							</p>
					   </div>
					</div>
				</div>				
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
	</body>
</html>
