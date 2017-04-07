<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<?=Creation_header() ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=Creation_menu(); ?>
			</div>
			<div class="main">
				<div class="grid grid-pad">
					<div class="col-1-1">
						<div class="content" id="presentation">
							<h2>Présentation du site</h2>
							<p>
								Zzzelp est un site créé par delangle. Le développement du site commence en Avril 2013 pour une alpha privée qui débute en Mai et une bêta réduite à la ZOO (s1) et la FCGB (s2) en Juin.
								Le site est resté en bêta ouverte pendant plus de neuf mois, en Septembre 2013 il voit son traffic exploser avec l'ouverte du s4 et l'arrivée en quelques jours de plusieurs centaines de membres.<br>
								Lancé le 3 Mars 2014, la seconde version de Zzzelp sonne la fin de la bêta et la maturité du site. 
								Avec plusieurs nouveaux outils, une refonte total du code pour améliorer les performances et plus de quatre mois de travail, cette nouvelle version est un nouveau départ pour le site. 
								En effet suite au succès du site sur le s4 qui a plus que quadruplé l'audience en quelques semaines, il devenait évident que la version actuelle n'était pas à la hauteur.
								C'est donc un site revenu en profondeur qui vous est proposé, cependant Zzzelp n'en est pas à son premier jour.<br>
								Aujourd'hui Zzzelp c'est :
								<ul>
									<li>9 alliances sur 4 serveurs</li>
									<li>25 000 pages vues par jour</li>
									<li>3 000 000 pages vues</li>
									<li>+ 700 membres actifs</li>
									<li>+ 300 000 floods lancés</li>
									<li>+ 8 000 chasses référencées</li>
									<li>+ 10 000 convois lancés</li>
									<li>+ 200 000 chargements du Multifloods</li>
								</ul>
								<br>
								<ul>
									<li>3 versions successives</li>
									<li>+15 000 lignes de code</li>
									<li>Des centaines d'heures de travail</li>
								</ul>
							</p>
						</div>
						<div class="content" id="presentation">
							<h2>Multiflood</h2>
							<p>
								Le Gestionnaire de flood est un des outils les plus puissants de Fourmizzz. Il permet d'améliorer grandement les performances de votre chaine en optimisant les prises de TDC des joueurs. 
								Il prend la forme d'un tableau avec l'ensemble des joueurs chargés, l'utilisateur peut ensuite sélectionner les joueurs à qui il veut prendre du TDC et le site s'occupera de faire la meilleure optimisation.
								Pour améliorer au mieux les prises de TDC, le site prend en compte les floods en cours des autres membres.
								<br><br>
								<h3>Fonctionnalités : </h3>
								<ul>
									<li>Ajout manuel d'attaques</li>
									<li>Chargement de n'importe quels joueurs ou alliances</li>
									<li>Chargement sans le script si un autre utilisateur a chargé votre alliance moins d'une heure avant vous</li>
								</ul>
								<br>
								<ul>
									<li>Affichage des floods en cours des autres membres de votre alliance</li>
									<li>Affichage des prochaines chasses rentrant des membres de votre alliance</li>
									<li>Possibilité de masquer les joueurs hors de porté ou les joueurs d'une alliance spécifique</li>
									<li>Possiblité de masquer certaines colonnes pour s'adapter à une navigation mobile</li>
								</ul>
								<br>
								<ul>
									<li>Système d'envoi de sondes avec paramétrage des unités et du lieu</li>
									<li>Possibilité d'optimiser à la main ces attaques</li>
									<li>Respect des TDC de rangs si ceux-ci sont compréhensible pour le site</li>
								</ul>
							</p>
						</div>
						<div class="content" id="presentation">
							<h2>Convois</h2>
							<p>
								Le système de convois de Zzzelp est basé sur une répartition journalière ou hebdomadaire des ressources. 
								Une seule sorte de formule répartitions est actuellement disponibles mais d'autres peuvent être créées à la demande d'un chef d'alliance.
								Le formule actuelle vous permet de créer un coefficient basé sur le temps de ponte à la tueuse de vos joueurs. Le site va ensuite calcul le revenu de votre joueur selon la méthode suivante : <br>
								<center>
									<p style="display:inline;">
										<table style="border-collapse:collapse;text-align:center;font-family:Arial,Times,serif;display:inline;font-size:1em;vertical-align:middle;line-height:1em;position:relative;<?php $client=$_SERVER[HTTP_USER_AGENT];if(strstr($client,"Gecko")){echo "top:0.55em;";}else{echo "top:0.175em";} ?>">
												<tr>
														<td rowspan="2" style="padding:0px;margin:0px;padding-right:5px;font-size:1em;">Revenu joueur = </td>
														<td style="padding:0px;padding-bottom:3px;margin:0px;padding-right:3px;padding-left:3px;border-bottom:1px solid #000;font-size:1em;">Coefficient joueur * TDC alliance</td>
												</tr>
												<tr>
														<td style="padding:0px;padding-top:3px;margin:0px;font-size:1em;">Total coefficients alliance</td>
												</tr>
										</table>
									</p>
								</center>
								Les convois à faire ou recevoir sont ensuite calculés en prenant en compte le TDC du joueur ainsi que ces colonies.
								Ces convois sont ensuites répartis entre les différents joueurs de l'alliance en optimisant au mieux les distances selon plusieurs algorithmes possibles.
								Une fois enregistrés, les convois sont visibles par les joueurs concernés qui peuvent alors lancer via le site ou en manuel et ajouter leurs convois après.
								<br><br>
								<h3>Fonctionnalités : </h3>
								<ul>
									<li>Possibilité de désactiver un joueur lors de la répartition</li>
									<li>Système de bonus/malus et de revenu fixe pour adapter au mieux les revenus</li>
									<li>Possibilité de majorer le TDC par le nombre d'ouvrières des joueurs</li>
									<li>Génération d'un message mis en page pour Fourmizzz pour annoncer les convois</li>
								</ul>
								<br>
								<ul>
									<li>Lancement automatique des convois avec calcul de plus gros convois possible</li>
									<li>Ajout manuel de convois par paquets avec possibilité de les modifier</li>
									<li>Affichage des convois envoyés et reçus dans les 7 derniers jours</li>
								</ul>
							</p>
						</div>
						<div class="content" id="presentation">
							<h2>Lanceur de chasses</h2>
							<p>
								Outil présent depuis peu sur Zzzelp, le lanceur de chasse est basé sur celui de Calystene. Il permet d'optimiser et de lancer automatique une série de chasses.
								Le but principal de cet outil est de gagner du temps (le lancement manuel étant très long) tout en gardant des chasses très optimisées en pertes et en TDC rapporté.
								<br><br>
								<h3>Fonctionnalités : </h3>
								<ul>
									<li>Import automatique de l'armée depuis Fourmizzz</li>
									<li>Utilisation automatique du dernier TDC connu comme TDC de lancement</li>
									<li>Retrait possible de certaines unités</li>
									<li>Possibilité de garder de JSN pour continuer à flooder</li>
									<li>Stockage automatique des chasses et affichage dans le Multiflood.</li>
								</ul>
							</p>
						</div>
					</div>
				</div>			
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
	</body>
</html>