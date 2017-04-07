<?php

class FAQ {

	/*
		Sections crées :
		- Débuter avec Zzzelp
		- Installation et utilisation de ZzzelpScript
		- Gérer une alliance avec Zzzelp
		- Gestion des alliances : Les rangs
		- Chargement et utilisation du Multiflood
		- Gestion des floods et des sondes : Zzzelpfloods

		Sections à créer :
		- Gestion des alliances : Les convois
		- Utilisation du traceur
		- Lancer des chasses avec Zzzelp
	*/
	public static $contenu = array(

				'premiers_pas' => array(
					'titre' => 'Débuter avec Zzzelp',
					'contenu' => array(
						'Rendre votre compte Zzzelp opérationnel' => array(
							'Installer ZzzelpScript' => array(
								'droit' => 0,
								'contenu' =>
									'A moins que vous ne souhaitiez pas utiliser ZzzelpScript (voir ci-dessous pour plus de détails), il est conseillé de 
									 rapidement l\'installer afin de faciliter les étapes suivantes. Pour celà rien de plus simple, il vous suffit de vous 
									 rendre sur la <a href="/script">page dédiée</a> et de choisir la section vous correspondant.'
								),

							'Ajouter vos comptes Fourmizzz' => array(
								'droit' => 0,
								'contenu' =>
									'Avec un seul compte Zzzelp, vous pouvez gérer la totalité de vos comptes Fourmizzz. Pour celà vous avez deux possibilités :
									 <ul>
									 	<li><b>Si vous avez installé ZzzelpScript :</b> Cliquez sur le bouton "Ajouter Zzzelp XX" dans le cadre Zzzelp de 
									 	Fourmizzz (présent sur la droite ou en dessous du cadre Compte + pour les petits écrans) et suivez les instructions</li>
									 	<li><b>Si vous n\'avez pas installé ZzzelpScript : </b>Rendez-vous sur la page 
									 	<a href="/compte/accueil">Gérer votre compte</a> de Zzzelp et rentrez votre pseudo en faisant bien attention à respecter
									 	les majuscules et les caractères spéciaux. Demandez ensuite à un chef de votre alliance de vous valider (vous devez
									 	pour celà appartenir à l\'alliance depuis au moins 24 heures)</li>
									 </ul>'
								)
							)
						)
					),




				'zzzelpscript' => array(
					'titre' => 'Installation et utilisation de ZzzelpScript',
					'contenu' => array(
						'Présentation de ZzzelpScript' => array(
							'Qu\'est-ce que ZzzelpScript ?' => array(
								'droit' => 0,
								'contenu' =>
									'ZzzelpScript est une extension pour Fourmizzz permettant d\'améliorer votre expérience de jeu.<br>
									 Il permet ainsi de faire le lien entre le jeu et Zzzelp afin de charger le Multiflood ou de lancer les Chasses par exemple.<br>
									 Il ajoute également de nombreuses améliorations graphiques.'
								),

							'Quelles sont les plateformes supportées par ZzzelpScript' => array(
								'droit' => 0,
								'contenu' =>
									'Le script est actuellement disponible sur <b>Windows</b>, <b>Mac OS</b> et <b>Linux</b> via les navigateurs <b>Chrome</b>
									 et <b>Firefox</b>.<br>
									 Une version pour <b>Android</b> est également disponible via <b>Firefox Mobile</b>.<br>
									 Pour plus de détails veuillez lire la <a href="/script">page d\'installation du script</a>'
								),
							'Adapter ZzzelpScript à vos besoins' => array(
								'droit' => 0,
								'contenu' =>
									'Afin d\'éviter les doublons avec d\'autres scripts, ZzzelpScript contient un grand nombre de fonctionnalités désactivables.
									 Par défaut certaines seront actives et d\'autres non (principalement celle envoyant des données à Zzzelp).<br>
									 Pour activer ces fonctionnalités vous avez deux possibilités : <br>
									 <ul>
									 	<li><b>Via Fourmizzz (recommandé) :</b> Rendez-vous sur l\'onglet "<i>Personnaliser ZzzelpScript</i>" de votre cadre Zzzelp. Les modifications seront
									 	alors appliquées dès la prochaine page chargée sur Fourmizzz</li>
									 	<li><b>Via Zzzelp :</b> Rendez-vous sur votre profil Fourmizzz du serveur que vous voulez personnaliser. Les options se trouvent tout en bas de la page</li>
									 </ul>'
								)
							),

						'Problèmes courants' => array(
							'ZzzelpScript fait bugger Fourmizzz' => array(
								'droit' => 0,
								'contenu' =>
									'Commencez par chercher précisément la source du problème en désactivant un à un tous vos scripts (ZzzelpScript, Outiiil, 
									 Greazzz...) et en regardant à chaque fois si le problème est toujours présent. Si le fautif est bien ZzzelpScript alors 
									 suivez les étapes ci-dessous pour essayer de le résoudre :
									 <ul>
										 <li>Videz votre cache et vos cookies pour forcer la mise à jour du script</li>
										 <li>Regardez FG si un post récent correspond à votre problème ou s\'il est mentionné sur le 
										 <a href="http://fourmizzz.cforum.info/t14457-Zzzelp.htm">post dédié à Zzzelp</a></li>
									 </url>
									 Si aucun de ces points n\'a fonctionné, envoyez moi un message sur Fourmizzz avec un maximum d\'informations sur le bug :
									 <url>
									 	<li>les pages concernées par le bug</li>
									 	<li>la description du bug (quelle zone de l\'interface est touchée ? est-il systématique ?)</li>
									 	<li>les autres joueurs de votre alliance touchés par ce bug</li>
									 </url>'
								),

							'J\'ai modifié un paramètre mais celui-ci n\'a pas été pris en compte' => array(
								'droit' => 0,
								'contenu' =>
									'Si celui-ci a été modifié depuis Fourmizzz, vérifiez qu\'il est bien toujours activé. Sur certaines connexion lentes, certains stockages peuvent avoir des problèmes.
									A l\'inverse si vous avez modifié le paramètre sur Zzzelp, cliquez simplement sur le lien <i>Synchroniser ZzzelpScript</i> de votre cadre Zzzelp dans Fourmizzz.'
								)

							),

						'Fonctionnalités optionnelles de ZzzelpScript' => array(
							'Synchronisation avec Zzzelp : Vos ouvrières' => array(
								'droit' => 0,
								'contenu' =>
									'Envoi vos ouvrières à Zzzelp à chaque fois que vous visitez la page <i>Reine</i>. ZzzelpScript tient compte des convois en cours.'
								),
							'Synchronisation avec Zzzelp : Vos niveaux' => array(
								'droit' => 0,
								'contenu' =>
									'Envoi vos batiments et vos recherches à Zzzelp à chaque fois que vous visitez la page <i>Construction</i> et la page <i>Laboratoire</i>'
								),
							'Synchronisation avec Zzzelp : Vos rapports de combat' => array(
								'droit' => 1,
								'contenu' =>
									'Synchronie les combats avec des joueurs n\'étant pas dans votre alliance Zzzelp. Ces convois sont ensuite consultables dans la fenêtre de guerre<b>
									 Nécessite l\'option <i>Les outils pour joueur : Messagerie de guerre</i>'
								),
							'Synchronisation avec Zzzelp : Votre armée (C+ only)' => array(
								'droit' => 0,
								'contenu' =>
									'Envoi votre armée vers Zzzelp à chaque fois que vous visitez la page <i>Reine</i>. 
									 Cette fonctionnalité n\'est disponibles que pour les joueurs ayant du Compte Plus'
								),
							'Les outils pour alliance : Rangs Zzzelp' => array(
								'droit' => 0,
								'contenu' => 
									'Affiche les rangs Zzzelp créés par vos gestionnaires sur la description des alliances. Ceux-ci ne seront alors visibles que par les membres de votre alliance'
								),
							'Les outils pour alliance : Couleurs des rangs' => array(
								'droit' => 0,
								'contenu' => 
									'Affiche les couleurs des rangs Zzzelp. Celles-ci vous permettent de voir en un coup d\'oeil si des joueurs sont à flooder'
								),
							'Les outils pour alliance : Exports auto des TDC' => array(
								'droit' => 2,
								'contenu' => 
									'Envoi a Zzzelp les données des joueurs dès que vous visitez le classement des joueurs, la description d\'une alliace ou encore la page <i>Ennemies</i><br>
									<b>Temporairement indisponible !</b>'
								),
							'Les outils pour alliance : Résultats du traceur' => array(
								'droit' => 1,
								'contenu' => 
									'Affiche les résultats du traceur en bas de la description des alliances.
									 Il n\'est pour l\'instant pas possible d\'afficher les graphiques'
								),
							'Les outils pour joueur : Smileys personnalisés' => array(
								'droit' => 0,
								'contenu' => 
									'ZzzelpScript vous permet d\'utiliser des packs de smileys en plus de ceux proposés par Fourmizzz.
									 Pour cela il vous suffit d\'aller activer les packs de votre choix sur Zzzelp. La page de gestion se trouve dans le menu "<i>Mon compte</i>".<br>
									 Notez qu\'il est absolument interdit de profiter de cette fonctionnalité pour reproduire les smileys du Compte Plus.'
								),
							'Les outils pour joueur : Chat amélioré' => array(
								'droit' => 2,
								'contenu' => 
									'Ajoute les fonctionnalités du Compte Plus au Chat Alliance ainsi qu\'au Chat Général<br>
									 <b>Fonctionnalité privée !</b>'
								),
							'Les outils pour joueur : Profil amélioré' => array(
								'droit' => 2,
								'contenu' => 
									'Ajout le temps de trajet sur le profil des joueurs<br>
									 <b>Fonctionnalité privée !</b>'
								),

							'Les outils pour joueur : Affichage des colonies' => array(
								'droit' => 0,
								'contenu' => 
									'Modifie l\'affichage des colonies afin de le rendre plus lisible.<br>
									 Le script ajouté également l\'alliance et le TDC des colonies directement sur le profil du joueur.'
								),

							'Les outils pour joueur : Messagerie améliorée' => array(
								'droit' => 0,
								'contenu' => 
									'Permet d\'ajouter plusieurs fonctionnalités à votre messagerie : <br>
									 <ul>
									 	<li>Une copie facilité de vos conversations avec une mise en page plus agréable</li>
									 	<li>Un envoie des messages via le raccourci clavier <b>Ctrl + Enter</b></li>
									 	<li>Une analyse de vos chasses directement dans la messagerie (bientôt de retour)</li>
									 </ul>'
								),

							'Les outils pour joueur : Messagerie de guerre' => array(
								'droit' => 0,
								'contenu' => 
									'Met en valeur les rapports de combat ne venant pas de membres dans votre alliance sur Zzzelp et affiche une analyse de ces combats.'
								),

							'Les outils pour joueur : Lancement des attaques' => array(
								'droit' => 0,
								'contenu' => 
									'Améliore la page de lancement des attaques en affichant l\'heure de retour à la seconde près ainsi que la capacité de flood et la force de frappe envoyée'
								),

							'Les outils pour joueur : Page Ennemie améliorée' => array(
								'droit' => 0,
								'contenu' => 
									'Affiche le temps de trajet à la seconde pour chaque joueur sur la page Ennemie.'
								),

							'Les outils pour joueur : Description alliance cachée' => array(
								'droit' => 0,
								'contenu' => 
									'Cache la description des alliances ainsi que leur diplomatie. Ajoute à la place une colonne de lancement rapide de sondes.'
								),

							'Les outils pour joueur : Page Armée améliorée' => array(
								'droit' => 0,
								'contenu' => 
									'Affiche des statistiques détaillées de votre armée.'
								)



							)
						)
					),
			

				'gestion_alliance' => array(
					'titre' => 'Gérer une alliance sur Zzzelp',
					'contenu' => array(
						'Les premiers pas' => array(
							'Comment activer Zzzelp pour mon alliance ?' => array(
								'droit' => 0,
								'contenu' =>
									'Si votre alliance souhaite utiliser Zzzelp, la première étape est de demander à un chef (ou un gestionnaire de chaîne) de
									 mettre son alliance sur son profil Zzzelp. Il vous suffit ensuite de me demander sur Fourmizzz de valider ce chef.<br>
									 Ce dernier pourra alors valider les autres membres et activer les outils souhaités.'
								),

							'Comment activer les outils ?' => array(
								'droit' => 0,
								'contenu' =>
									'Une fois vos droits obtenus, vous devriez voir apparaitre un nouveau menu sur Zzzelp nommé "Gestion alliances".
									 A partir de celui-ci, cliquez sur le lien "<i>Gestion des droits</i>" juste en dessous du TAG de votre alliance.'
								),

							'Comment valider les membres ?' => array(
								'droit' => 0,
								'contenu' =>
									'La première étape est de leur demander d\'ajouter l\'alliance sur leur profil. Vous pouvez ensuite les valider via la page de <i>Tableau des membres</i>.
									 Pour plus de détails concernant les grades Zzzelp que vous pouvez leur donner, veuillez vous référer à la question suivante'
								),

							'Comment sont-géré les accès de mes membres ?' => array(
								'droit' => 0,
								'contenu' =>
									'Quand vous validez un membre, plusieurs grades sont disponibles :
									 <ul>
									 	<li><i>Nouveau</i></li>
									 	<li><i>Membre</i></li>
									 	<li><i>Gestionnaire</i></li>
									 	<li><i>Chef</i></li>
									 </ul>
									 Pour modifier les accès de chacun de ces grades, rendez vous sur la page de <i>Gestion des droits</i>. La seule restriction est que vous ne
									 pouvez pas retirer des droits aux chefs d\'une alliance pour des raisons évidentes.'
								)
							),
						)
					),




				'rangs' => array(
					'titre' => 'Gestion des alliances : Les rangs',
					'contenu' => array(
						'Explication générales' => array(
							'A quoi servent les rangs Zzzelp ?' => array(
								'droit' => 0,
								'contenu' => 	
									'Ces rangs ont pour vocation de rendre plus compréhensible l\'organisation de votre alliance pour vos membres.
									 Ils permettent d\'ajouter des informations que vous n\'auriez pas souhaité afficher à la vue de tous sur les rangs Fourmizzz 
									 (les rangs Zzzelp étant visibles uniquement par les membres de votre alliance et vos alliers si vous l\'avez autorisé).
									 Certains rangs permettent également d\'orienter Zzzelp dans son interprétation de votre chaine (personnes à flooder dans le MF, archives détaillées...).'
								),
												 
							'Comment supprimer un rang ?' => array(
								'droit' => 0,
								'contenu' =>
									'Pour qu\'un rang soit supprimé de Zzzelp il vous suffit de rien rentrer dans la case <i>Règle</i> ou de cliquer sur la croix à droite.'
								),
												
							'Vous avez dit Expression Régulière ?' => array(
								'droit' => 0,
								'contenu' =>
									'Pour faire classique je vais commencer par citer <i>Wikipedia</i> qui nous dit qu\'une <i>Expression régulière</i> (ou <i>expression rationnelle</i>) est une 
									 <i>chaîne de caractère et qui décrit un ensemble de chaînes de caractères possibles selon une syntaxe précise</i>.
									 Pour paraphraser, une expression régulière permet d\'analyser un texte (ici les rangs Fourmizzz) et en extraire des données. 
									 Je ne vais pas vous faire un cours sur le sujet ici et je me contenterai donc de vous indiquer quelques liens pour vous aider à débuter :
									 <ul>
										 <li><a target="_BLANK" href="http://fr.wikipedia.org/wiki/Expression_rationnelle">Wikipedia</a></li>
										 <li><a target="_BLANK" href="http://javascript.developpez.com/tutoriels/maitriser-expressions-rationnelles/">Developpez.com</a></li>
										 <li><a target="_BLANK" href="http://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/les-expressions-regulieres-1-2">Open Classrooms</a></li>
									 </ul>'
								) 
							),

						'Explication des colonnes' => array(
							'Mode' => array(
								'droit' => 0,
								'contenu' =>
									'Ce menu déroulant permet de choisir le mode de donnée utilisé pour définir ce rang. Celles-ci se comptent au nombre de 4 :
									 <ul>
										 <li><strong>Pseudos :</strong> Lister simplement les joueurs concernés par ce rang</strong></li>
										 <li><strong>Alliances :</strong> Appliquer ce rang à toute une alliance</li>
										 <li><strong>Expression régulière :</strong> Analyse le rang Fourmizzz avec la Regex de votre choix (permet d\'extraire des données du rang)</li>
										 <li><strong>Mot contenu :</strong> Sélectionne tous les rangs contenant un mot (ou une suite de mots) précis</li>
									 </ul>
									 Les rangs Zzzelp ont tous une priorité selon leur mode, cela permet d\'afficher en priorité les rangs plus précis comme ceux défini pseudo par pseudo 
									 que les rangs plus vagues définie par alliance entière ou avec un simple mot.<br>
									 Voici la liste actuelle de priorité :<br><br>
									 <center>Pseudos  &rarr;	Expression régulière &rarr;	 Mot contenu &rarr;	 Alliance</center>'
								),
												 
							'Règle' => array(
								'droit' => 0,
								'contenu' => 
									'Champ où vous devez entrer les règles expliquées dans la section <i>Mode</i>'
								),
												
							'Rôle' => array(
								'droit' => 0,
								'contenu' =>
									'Menu déroulant permettant de définir le rôle du joueur. Cette donnée permet à Zzzelp de mieux comprendre votre chaîne et pourra rendre possible 
									 la création de statistiques plus détaillées puisque spécifiques à chaque rôle dans la chaîne ou encore des optimisations de floods plus intelligentes.'
								),
												 
							'NPF (Ne Pas Flooder)' => array(
								'droit' => 0,
								'contenu' => 
									'Si cette case est cochée, les joueurs ayant ce rang ne pourront pas être floodés via le Multiflood. Ce blocage sera effectif même si le joueur en question a des 
									 rangs plus prioritaires que celui-ci (attention donc si vous le mettez sur un rang en mode <i>Alliance</i>)'
								),
												 
							'Alliance' => array(
								'droit' => 0,
								'contenu' =>
									'Permet de limiter l\'application des rangs à certaines alliances. Faites attention à bien noter les TAGs exacts pour que les rangs s\'appliquent correctement. <br>
									 Le signe "*" permet de ne mettre aucune limitation d\'alliance sur un rang.'
								),
												 
							'Couleur' => array(
								'droit' => 0,
								'contenu' =>
									'Les rangs Zzzelp sont toujours suivi d\'une couleur permettant de voir au premier coup d\'oeil les informations importantes.
									 Celle-ci est affichée dans le Multiflood et sur Fourmizzz.'
								),
												 
							'Rang affiché' => array(
								'droit' => 0,
								'contenu' =>
									'Cette zone vous permet de choisir le rang qui sera affiché sur le Multiflood ou dans Fourmizzz. 
									 Si vous travaillez avez des expressions régulières (et je vous le conseil au maximum), vous pouvez réutiliser les correspondances 
									 récupérées dans la regex grâce aux propriétés $1, $2...'
								),
												
							'Statut' => array(
								'droit' => 0,
								'contenu' =>
									'Permet de choisir si le rang est visible par vos alliers avec lesquels vous avez partagé la gestion et/ou l\'affichage des rangs.
									 Cette valeur n\'est modifiable que si votre alliance est la créatrice de ce rang.'
								)
							)
						)
					),
							
							
							
							
				'MF' => array(
					'titre' => 'Chargement et utilisation du Multiflood',
					'contenu' => array(
						'Chargement du Multiflood' => array(
							'Charger le Multiflood depuis Fourmizzz' => array(
								'droit' => 0,
								'contenu' =>
									'Pour faciliter le chargement du Multiflood, Zzzelp place un raccourci à l\'intérieur de votre menu <i>Alliance</i>. 
									 Il vous sera par contre impossible de modifier les alliances ainsi que les joueurs à charger, seuls ceux placés là par vos chefs seront pris en compte.<br>
									 Pour plus d\'options, vous serez obligés de passer par la page de chargement dans Zzzelp.'
								),
											 
							'Charger le Multiflood depuis Zzzelp : Chargement automatique' => array(
								'droit' => 0,
								'contenu' =>
									'Sur la page Zzzelp de chargement du Multiflood (<i>Outils alliance</i> => <i>TAG (serveur)</i> => <i>Gestionnaire de floods</i>), 
									 vous allez pouvoir choisir quelles alliances, joueurs vous voulez charger sur le Multiflood.<br>
									 Ce mode <i>automatique</i> récupère les valeurs directement sur Fourmizzz (TDC, rang, alliance), il nécessite donc <i>ZzzelpScript</i> pour fonctionner.'
								),
											 
							'Charger le Multiflood depuis Zzzelp : Chargement manuel' => array(
								'droit' => 0,
								'contenu' =>
									'Au même endroit que le Chargement automatique, Zzzelp vous propose un chargement manuel qui vous permettra de charger le Multiflood sans <i>ZzzelpScript</i>.<br>
									 Pour celà le site va chercher la dernière valeur connue pour chaque joueur demandé (avec un délais maximum de 1 heure). 
									 Il vous sera par contre impossible de lancer des attaques sans le script.'
								)
							),

						'Le tableau principal' => array(
							'Le principe du Multiflood' => array(
								'droit' => 0,
								'contenu' =>
									'Le Multiflood a été créé pour vous aider à être plus efficace dans vos floods tout en regroupant à un seul endroit un maximum d\'informations sur votre chaîne,
									 permettant ainsi une meilleure vue d\'ensemble.<br>
									 Pour améliorer vos prises de TDC, les algorithme d\'optimisation prennent en compte les floods en cours 
									 (pour plus de détails sur les optimisation, je vous invite à lire la section <i>Zzzelpfloods</i>).'
								),
												
							'Choisir rapidement qui flooder' => array(
								'droit' => 0,
								'contenu' =>
									'Grâce à la compréhension des rangs, Zzzelp est capable de reconstituer votre chaîne de chasse et de vous proposer rapidement des joueurs à flooder.
									 Le menu permettant de cocher les joueurs par groupes se trouve en haut à droite du tableau, celui-ci comporte plusieurs options : 
									 <ul>
										<li><strong>Tout cocher : </strong> Sélectionne tous les joueurs à porté (hormis les joueurs <i>Ne pas flooder</i>).</li>
										<li><strong>Floods chaîne : </strong> Sélectionne tous les joueurs appartenant à votre chaîne et ayant un rang inférieur au votre.</li>
										<li><strong>Joueurs TAG : </strong>Sélectionne tous les joueurs d\'une alliance (à utiliser en temps de guerre).</li>
									 </ul>'
								),
											 
							'N\'afficher que les joueurs voulus' => array(
								'droit' => 0,
								'contenu' =>
									'En temps de guerre, le Multiflood peut vite se retrouver à charger des centaines de joueurs, il devient alors difficile de s\'y retrouver. 
									 Pas de panique, il vous suffit alors de régler le tableau pour qu\'il n\'affiche qu\'une partie des joueurs : 
									 <ul>
										<li>Sur le tableau de résume par alliance, décochez les alliances qui ne vous intéressent pas</li>
										<li>Sur le tableau des options, décochez la case <i>Voir les HDP</i> pour masquer l\'affichage des joueurs que vous ne pouvez pas attaquer.</li>
										<li>A venir : A l\'instar de la page <i>Membres</i> de Fourmizzz, le Multiflood devrait bientôt pouvoir afficher uniquement des parties de la chaîne.</li>
									 </ul>'
								),
											 
							'Un Multiflood adapté à tous les écrans' => array(
								'droit' => 0,
								'contenu' =>
									'Depuis sa 3<sup>ème</sup> version, le Multiflood de Zzzelp propose 6 mises en page différentes en fonction de votre taille d\'écran. 
									 Les colonnes les moins importantes sont ainsi réservées aux utilisateurs ayant un écran suffisamment grand pour pouvoir tout afficher correctement.',
								)
							)
						)
					),
						
						
						
						
				'zzzelpfloods' => array(
					'titre' => 'Gestion des floods et des sondes : Zzzelpfloods',
					'contenu' => array(
						'Présentation des modes d\'optimisation' => array(
							'Optimisation classique' => array(
								'droit' => 0,
								'contenu' => 
									'Rien de spécial ici, le script va tout simplement prendre un maximum de TDC à votre cible'
								),
											
							'TDC voulu attaque | cible' => array(
								'droit' => 0,
								'contenu' =>
									'Pour ces deux modes, le script vous propose de choisir un TDC voulu pour l\'un des deux joueurs.
									 Un fois validé, le script fera une optimisation classique en s\'arrêtant dès que le joueur choisi a son TDC.'
								),
												
							'Optimisation + armée en début | fin' => array(
								'droit' => 0,
								'contenu' =>
									'Pour ces deux modes, le script fait une optimisation identique à celle du premier mode, à la nuance à près que si il reste des unités à la fin des optimisations, 
									 le script les placera soit dans la première attaque soit dans la dernière.'
								),
											 
							'Série d\'attaques identiques' => array(
								'droit' => 0,
								'contenu' =>
									'En temps de guerre, lancer des optimisations précises peut se révéler handicapant, si votre cible voit son TDC bouger, toute votre optimisation sera déréglée.
									 Il est alors conseillé de lancer une série de plusieurs attaques identiques. 
									 C\'est exactement ce que se propose se mode en vous permettant de choisir un nombre d\'attaques ainsi qu\'un nombre d\'unités par attaque.'
								),
												
							'Attaque classique' => array(
								'droit' => 0,
								'contenu' =>
									'Là encore rien de bien difficile à comprendre, le script lancera simplement toutes vos unités sur cette attaque. 
									 L\'intéret étant évidemment de l\'utiliser dans des optimisations à plusieurs joueurs.'
								),
											 
							'Sonde + Attaque classique' => array(
								'droit' => 0,
								'contenu' =>
									'Le script lance ici une attaque similaire à celle du mode <i>Attaque classique</i> à celà près qu\'il va lance une sonde avant 
									 (voir le mode <i>Sondes Dôme + Loge pour plus de détails)</i>'
								),
											 
							'Sondes Dôme + Loge' => array(
								'droit' => 0,
								'contenu' =>
									'Une des spécifités de <i>Zzzelpfloods</i> est de gérer l\'envoi massif de sondes. Les schémas des sondes sont modifiables directement sur le tableau 
									 (voir la section <i>Options de Zzzelpfloods</i> mais je vous conseil de choisir un schéma par défaut sur votre profil Zzzelp. 
									 Celui-ci sera alors utilisé à tous les lancements de sondes.<br>
									 Par défaut, <i>Zzzelpfloods</i> génère deux sondes, une en Dôme et une en Loge, libre à vous d\'en changer le lieux ou d\'en supprimer une.'
								),
											 
							'Manuel' => array(
								'droit' => 0,
								'contenu' =>
									'Pour ce mode, le script ne génère aucune attaque et vous laisse libre d\'en créer vous même.'
								)
							),

						'Options de Zzzelpfloods' => array(
							'Placement de l\'antisonde' => array(
								'droit' => 0,
								'contenu' =>
									'<i>Zzzelpfloods</i> vous permet de replacer votre antisonde une fois vos floods lancés (schéma à créer sur votre profil Zzzelp).
									 Pour celà, cochez la case <i>Replacer l\'antisonde</i> dans le tableau des options.'
								),
											 
							'Lancement via Zzzelp' => array(
								'droit' => 0,
								'contenu' =>
									'Pour vous permettre d\'utiliser les optimisations même en temps de guerre et sans risquer des fuites d\'informations, 
									 <i>Zzzelpfloods</i> vous permet de stocker ou non vos attaques sur Zzzelp. Pour celà il vous suffit de cocher ou non la case <i>Lancement via Zzzelp</i> dans le tableau des options'
								),
												
							'Créer une attaque' => array(
								'droit' => 0,
								'contenu' =>
									'Pour créer une attaque, passez votre souris sur la croix en haut à droite du tableau d\'optimiation. Vous avez alors deux types d\'attaques :
									 <ul>
										<li><strong>Flood manuel :</strong> Permet simplement de créer un flood en choisissant combien d\'unités vous voulez utiliser sur celui-ci</li>
										<li><strong>Sonde manuelle :</strong>Permet de créer une sonde en choisissant le nombre d\'unités ainsi que le type d\'unité que vous souhaitez envoyez</li>
									 </ul>',
								),

							'Modifier le lieu' => array(
								'droit' => 0,
								'contenu' =>
									'Par défaut, toutes les attaques lancées par Zzzelp visent le Terrain de Chasse. Vous pouvez cependant choisir pour chaque attaque si vous voulez l\'envoyer en Dôme ou en Loge. 
									 Pour celà cliquer tout simplement sur le lieu pour passer au suivant (avant dernière colonne du tableau).'
											
								)
					 		)
						)
					)
				);
				


	public static function generate_FAQdata($utilisateur) {
		$FAQ = self::$contenu;
		if(get_class($utilisateur) == 'InitialisationZzzelp') {
			$droits = 0;
			foreach($utilisateur->comptes_fzzz as $serveur => $donnees) {
				if(!empty($donnees)) {
					$donnees->get_RightsZzzelp();
					$droits = max($donnees->droitsZzzelp, $droits);
				}
			}
		
		}
		elseif(get_class($utilisateur) == 'Utilisateur_Fzzz') {
			$utilisateur->get_RightsZzzelp();
			$droits = $utilisateur->droitsZzzelp;
		}
		else {
			$droits = 0;
		}
		foreach($FAQ as $section => $contenu) {
			foreach($contenu['contenu'] as $categorie => $donnees) {
				foreach($donnees as $question => $valeur) {
					if($valeur['droit'] > $droits) {
						unset($FAQ[$section]['contenu'][$categorie][$question]);
					}
				}
			}
		}
		return $FAQ;
	}


}

?>