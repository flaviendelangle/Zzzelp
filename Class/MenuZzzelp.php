<?php

class MenuZzzelp {

	public $instance;
	public $droits;
	public $mode;

	public function __construct($instance, $mode) {
		$this->instance = $instance;
		$this->mode = $mode;
		if($this->mode == 'global') {
			$this->get_RightsGlobal();
		}
		else {
			$this->droits = array();
			$this->get_RightsServeur($instance);
		}
	}

	public function create_MenuZzzelp() {
		$couleurs = array('compte' => '#47A3DA', 'outils_alliance' => '#42B578', 'outils_joueur' => '#E89C5A', 'gestion_alliance' => '#F34949');

		/* Création des lignes dépendant des comptes */
		$menu_MENU = '';
		$menu_OUTILJOUEUR = '';
		$menu_OUTILALLIANCE = '';
		$menu_GESTIONALLIANCE = '';

		foreach(Fourmizzz::$serveurs as $serveur) {
			foreach($this->droits[$serveur]['menu'] as $ligne) {
				if($ligne == 'profil') {
					$menu_MENU .= '<li><a href="'.Zzzelp::$url_site.'fourmizzz/'.$serveur.'">'.$this->instance->pseudos[$serveur]['pseudo'].' ('.$serveur.')</a></li>';
				}
			}
			foreach($this->droits[$serveur]['outil_joueur'] as $ligne) {
				if($ligne == 'traceur') {
					$menu_OUTILJOUEUR .= '<li><a href="'.Zzzelp::$url_site.'traceur/joueur?serveur='.$serveur.'">Traceur '.$serveur.'</a></li>';
				}
			}
			foreach($this->droits[$serveur]['outil_alliance'] as $alliance => $valeurs) {
				$menu_alliance = '';
				foreach($valeurs as $ligne) {
					if($ligne == 'MF') {
						$menu_alliance .= '<li><a href="'.$s.'/MF/preparation?alliance='.$alliance.'&serveur='.$serveur.'">Gestionnaire de floods</a></li>';
					}
					elseif($ligne == 'convois_regulier') {
						$menu_alliance .= '<li><a href="'.$s.'/convois/accueil?ressource=materiaux&alliance='.$alliance.'&serveur='.$serveur.'">Convois</a></li>';
					}
					elseif($ligne == 'convois_demande') {
						$menu_alliance .= '<li><a href="'.$s.'/convois/demande?ressource=materiaux&alliance='.$alliance.'&serveur='.$serveur.'">Convois</a></li>';
					}
					elseif($ligne == 'statistiques') {
						$menu_alliance .= '<li><a href="'.$s.'/statistiques?alliance='.$alliance.'&serveur='.$serveur.'">Statistiques (bêta)</a></li>';
					}
				}
				$menu_OUTILALLIANCE .= '<div><h4>'.$alliance.' ('.$serveur.')</h4><ul>'.$menu_alliance.'</ul></div>';
			}
			foreach($this->droits[$serveur]['gestion'] as $alliance => $valeurs) {
				$menu_chef = '';
				foreach($valeurs as $ligne) {
					if($ligne == 'gestion_droits') {
						$menu_chef .= '<li><a href="'.Zzzelp::$url_site.'gestionalliance/general?serveur='.$serveur.'&alliance='.$alliance.'">Gestion des droits</a></li>';
					}		
					elseif($ligne == 'gestion_membres') {
						$menu_chef .= '<li><a href="'.Zzzelp::$url_site.'gestionalliance/membres?serveur='.$serveur.'&alliance='.$alliance.'">Tableaux des membres</a></li>';
					}
					elseif($ligne == 'gestion_convois') {
						$menu_chef .= '<li><a href="'.Zzzelp::$url_site.'gestionalliance/convois?serveur='.$serveur.'&alliance='.$alliance.'">Gestion des convois</a></li>';
					}
					elseif($ligne == 'gestion_rangs') {
						$menu_chef .= '<li><a href="'.Zzzelp::$url_site.'gestionalliance/rangs?serveur='.$serveur.'&alliance='.$alliance.'">Gestion des rangs</a></li>';
					}
					elseif($ligne == 'gestion_MF') {
						$menu_chef .= '<li><a href="'.Zzzelp::$url_site.'gestionalliance/floods?serveur='.$serveur.'&alliance='.$alliance.'">Gestion du MF</a></li>';
					}
					elseif($ligne == 'exports_donnees') {
						$menu_chef .= '<li><a href="'.Zzzelp::$url_site.'gestionalliance/exports?serveur='.$serveur.'&alliance='.$alliance.'">Exports de l\'alliance</a></li>';
					}
					elseif($ligne == 'rapports_joueurs') {
						$menu_chef .= '<li><a href="'.Zzzelp::$url_site.'gestionalliance/rapports?serveur='.$serveur.'&alliance='.$alliance.'">Rapports des joueurs</a></li>';
					}
				}
				if(count($valeurs) > 0) {
					$menu_GESTIONALLIANCE .= '<div><h4>'.$alliance.' ('.$serveur.')</h4><ul>'.$menu_chef.'</ul></div>';
				}
			}
		}
		if($menu_GESTIONALLIANCE != '') {
			$menu_GESTIONALLIANCE = '<li class="sous_menu_zzzelp" data-categorie="gestion_alliance"><span>Gestion alliances</span><div class="detail_menu"><div class="contenu_detail_menu"> '.$menu_GESTIONALLIANCE.'</div></div></li>';
		}

		if($this->instance->pseudo == 'delangle') {
			$menu_ADMIN = '<div>
								<h4>Administration</h4>
								<ul>
									<li><a href="'.Zzzelp::$url_site.'admin/accueil?mode=validations">Validation des joueurs</a></li>
									<li><a href="'.Zzzelp::$url_site.'admin/accueil?mode=utilisateurs">Profils des utilisateurs</a></li>
									<li><a href="'.Zzzelp::$url_site.'admin/accueil?mode=nettoyage">Nettoyage de Zzzelp</a></li>
									<li><a href="'.Zzzelp::$url_site.'admin/accueil?mode=news">Ecrire une News</a></li>
									<li><a href="'.Zzzelp::$url_site.'admin/accueil?mode=releves">Relevés Admin</a></li>
								</ul>
							</div>';
		}
		else {
			$menu_ADMIN = '';
		}

		/* Génération du menu final */
		$menu_MENU = '	<li class="sous_menu_zzzelp" data-categorie="compte">
							<span>Mon compte</span>
							<div class="detail_menu">
								<div class="contenu_detail_menu"> 
									<div>
										<h4>Accueil</h4>
										<ul>
											<li><a href="'.Zzzelp::$url_site.'accueil">Accueil du site</a></li>		
											<li><a href="'.Zzzelp::$url_site.'compte/accueil">Gérer votre compte</a></li>
											<li><a href="'.Zzzelp::$url_site.'compte/theme">Personnaliser Zzzelp</a></li>
											<li><a href="'.Zzzelp::$url_site.'compte/smileys">Gérer les smileys</a></li>
											<li><a href="'.Zzzelp::$url_site.'script">Installation du script</a></li>
										</ul>
									</div>
									<div>
										<h4>Profils Fourmizzz</h4>
										<ul>
											'.$menu_MENU.'
										</ul>
									</div>
									'.$menu_ADMIN.'
								</div><!-- /contenu_detail_menu -->
							</div><!-- /detail_menu -->
						</li>';

		$menu_OUTILALLIANCE = '<li class="sous_menu_zzzelp" data-categorie="outils_alliance">
								<span>Outils alliance</span>
								<div class="detail_menu">
									<div class="contenu_detail_menu">
										'.(empty($menu_OUTILALLIANCE) ? '<div style="margin: 50px auto;width: 100%;text-align: center;">Vous n\'avez aucune alliance renseignée</div>' : $menu_OUTILALLIANCE).'
									</div>
								</div>
							</li>';

		$menu_OUTILJOUEUR = 	'<li class="sous_menu_zzzelp" data-categorie="outils_joueur">
									<span>Outils joueur</span>
									<div class="detail_menu">
										<div class="contenu_detail_menu"> 
											<div>
												<h4>Traceur</h4>
												<ul>
													'.$menu_OUTILJOUEUR.'
												</ul>
											</div>
											<div>
												<h4>Chasses</h4>
												<ul>
													<li><a href="'.Zzzelp::$url_site.'chasses">Lanceur Chasses</a></li>
													<li><a href="'.Zzzelp::$url_site.'analysechasses">Analyse Chasses</a></li>
												</ul>										
											</div>
											<div>
												<h4>Utilitaires</h4>
												<ul>
													<li><a href="'.Zzzelp::$url_site.'XP">Simulateur de combat</a></li>
													<li><a href="'.Zzzelp::$url_site.'HOF">Analyseur de Combat</a></li>
													<li><a href="'.Zzzelp::$url_site.'distance">Temps de trajet</a></li>
													<li><a href="'.Zzzelp::$url_site.'ponte">Temps de ponte</a></li>
												</ul>
											</div>
										</div>
									</div>
								</li>';

		if(true) {
			$menu_LOGOUT = '<li onclick="document.location.href=\'/logout\'">
								<span>Déconnexion</span>
							</li>';
		}
		else {
			$menu_LOGOUT = 	'<li class="sous_menu_zzzelp" data-categorie="menu_connexion">
									<span>Connexion</span>
									<div class="detail_menu" style="width: 425px;padding: 10px;">'.HTMLGenerique::get_CadreConnexion().'</div>
								</li>';
		}

		return '<nav class="menu_zzzelp" style="background:'.$couleurs[InitialisationZzzelp::$pages[Zzzelp::$page]['section']].'">
					<ul>'
						.$menu_MENU
						.$menu_OUTILALLIANCE
						.$menu_OUTILJOUEUR
						.$menu_GESTIONALLIANCE
						.$menu_LOGOUT.
					'</ul>
				</nav>
				<div class="barre_outils_zzzelp">
					<div class="acces_aide" onclick="ze_Lancement_aide_Zzzelp()"></div>
				</div>';

	}

	public function create_MenuFourmizzz($prive) {
		$menu = '';
		if(strlen($prive) > 0) {
			$menu .= '<div class="prive_zzzelp" style="display:none">'.htmlentities($prive).'</div>';
			$menu .= '<img src="http://test.zzzelp.fr/Images/valider.png" style="display:none" onload="var script = document.createElement(\'script\');';
			$menu .= 'html_entity_decode(document.querySelector(\'.prive_zzzelp\').innerHTML);script.innerHTML=html_entity_decode(document.querySelector(\'.prive_zzzelp\').innerHTML);script.type = \'text/javascript\';document.getElementsByTagName(\'head\')[0].appendChild(script);ze_Supprimer_element(document.querySelector(\'.prive_zzzelp\'));ze_Supprimer_element(this);">';
		}
		foreach($this->droits[$this->instance->serveur]['gestion'] as $alliance => $valeurs) {
			foreach($valeurs as $ligne) {
				if($ligne == 'gestion_membres') {
					$menu .= '<li><a onclick="window.open(this.href); return false;" class="boutonOptions" href="'.Zzzelp::$url_site.'gestionalliance/membres?serveur='.$this->instance->serveur.'&alliance='.$alliance.'"><span></span>Gestion '.$alliance.'</a></li>';
				}
			}
		}
		foreach($this->droits[$this->instance->serveur]['outil_alliance'] as $alliance => $valeurs) {
			foreach($valeurs as $ligne) {
				if($ligne == 'MF') {
					$MF = new Multiflood($this->instance);
					$MF->set_alliance($alliance);
					$menu .=  '<li><a onclick="window.open(this.href); return false;" class="boutonReine" href="Armee.php?alliances=['.$MF->get_alliances().']&joueurs=['.$MF->get_joueurs().']&zmf" target="_BLANK"><span></span>MF '.$alliance.'</a></li>';
				}
				elseif($ligne == 'convois_regulier') {
					$menu .= '<li><script>alert(1)</script><a onclick="window.open(this.href); return false;" class="boutonCommerce" href="'.Zzzelp::$url_site.'convois/accueil?ressource=materiaux&serveur='.$this->instance->serveur.'&alliance='.$alliance.'" target="_BLANK"><span></span>Convois '.$alliance.'</a></li>';
				}
				elseif($ligne == 'convois_demande') {
					$menu .= '<li><script>alert(1)</script><a onclick="window.open(this.href); return false;" class="boutonCommerce" href="'.Zzzelp::$url_site.'convois/demande?ressource=materiaux&serveur='.$this->instance->serveur.'&alliance='.$alliance.'" target="_BLANK"><span></span>Convois '.$alliance.'</a></li>';
				}
			}	
		}
		if($this->droits[$this->instance->serveur]['ghost']) {
			$menu .= '<li><a class="boutonArmee" href="/Armee.php?lg" target="_BLANK"><span></span>Lancement armée</a></li>';
		}
		return $menu;
	}

	public function create_MenuComptePlus() {
		$liens = array(
			//array('nom' => 'Simulateur combat', 'url' => Zzzelp::$url_site.'XP', 'icone' => 'boutonEnnemies'),
			array('nom' => 'Analyseur de combat', 'url' => Zzzelp::$url_site.'HOF', 'icone' => 'boutonEnnemies'),
			//array('nom' => 'Simulateur ponte', 'url' => Zzzelp::$url_site.'ponte', 'icone' => 'boutonReine'),
			array('nom' => 'Simulateur durée', 'url' => Zzzelp::$url_site.'distance?serveur='.$this->instance->serveur, 'icone' => 'boutonSimulateurDuree'),
			array('nom' => 'Lanceur chasses', 'url' => '/Armee.php?icz', 'icone' => 'boutonSimulateurChasse'),
			array('nom' => 'Analyseur chasses', 'url' => Zzzelp::$url_site.'analysechasses', 'icone' => 'boutonSimulateurChasse'),
			array('nom' => 'Relevé Fourmizzz', 'url' => 'http://'.$this->instance->serveur.'.fourmizzz.fr/tutorial.php?iv', 'icone' => 'boutonStatJoueur'),
		);
		$menu = '';
		foreach($liens as $lien) {
			$menu .= '<li><a onclick="window.open(this.href); return false;" class="'.$lien['icone'].'" href="'.$lien['url'].'" target="_BLANK"><span></span>'.$lien['nom'].'</a></li>';
		}
		return $menu;
	}

	public function get_RightsGlobal() {
		$this->droits = array();
		foreach(Fourmizzz::$serveurs as $serveur) {
			if($this->instance->pseudos[$serveur]['pseudo'] != '') {
				$this->get_RightsServeur($this->instance->comptes_fzzz[$serveur]);
			}
			else {
				$this->droits[$serveur] = array(
						'menu' => array(),
						'outil_joueur' => array(),
						'outil_alliance' => array(),
						'gestion' => array(),
						'ghost' => false						
												);				
			}
		}
	}

	public function get_RightsServeur($compte) {
		$this->droits[$compte->serveur] = array(
				'menu' => array('profil'),
				'outil_joueur' => array('traceur'),
				'outil_alliance' => array(),
				'gestion' => array(),
				'ghost' => false	
								);
		$compte->getAlliances_activated();
		foreach($compte->alliances_activated as $alliance) {
			$droits = new MembreAlliance($alliance->alliance, $compte->pseudo, $compte->serveur);
			$alliance_data = new Alliance($droits);
			if(!$this->droits[$compte->serveur]['ghost']) {
				$alliance_data->get_ParametersGhosts();
				$this->droits[$compte->serveur]['ghost'] = ($alliance_data->donnees_Ghosts['activation_ghost'] == '1');
			}
			$gestion = array();
			$outil_alliance = array();
			if($droits->check_droit_outil('chef', true)) {
				$gestion[] = 'gestion_droits';
			}
			if($droits->check_droit_outil('gestion_membres', true)) {
				$gestion[] = 'gestion_membres';
			}
			if($droits->check_droit_outil('gestion_convois', true)) {
				$gestion[] = 'gestion_convois';
			}
			if($droits->check_droit_outil('gestion_rangs', true)) {
				$gestion[] = 'gestion_rangs';
			}
			if($droits->get_DroitsGestionMF(true)) {
				$gestion[] = 'gestion_MF';
			}
			if($droits->check_droit_outil('chef', true)) {
				$gestion[] = 'exports_donnees';
				$gestion[] = 'rapports_joueurs';
			}
			if($droits->check_droit_outil('acces_MF', true) AND $droits->check_activation_outil('MF', true)) {
				$outil_alliance[] = 'MF';
			}
			if($droits->check_droit_outil('convois', true) AND $droits->check_activation_outil('convois', true)) {
				$alliance_data->get_ParametersConvois();
				if($alliance_data->parametres_convois['methode_convois'] == 'regulier') {
					$outil_alliance[] = 'convois_regulier';
				}
				else {
					$outil_alliance[] = 'convois_demande';
				}
			}
			if($droits->check_droit_outil('archives', true)) {
				$outil_alliance[] = 'archives';
			}
			$outil_alliance[] = 'statistiques';
			$this->droits[$compte->serveur]['outil_alliance'][$alliance->alliance] = $outil_alliance;
			$this->droits[$compte->serveur]['gestion'][$alliance->alliance] = $gestion;
		}
	}

}