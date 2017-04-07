<?php

class Combat {

	public $source;

	public $attaquant;
	public $defenseur;

	public $mode;
	public $mode_opti;
	public $position;
	public $affichage_XP;

	public $unites_prio = array(
				'attaque' 	=> array(7,10,12,4,3,1,0,5,8,11,13,9,2,6),
				'defense' 	=> array(5,12,7,4,3,1,0,10,6,13,8,9,2,11),
				'vie' 		=> array(0,1,3,5,4,12,10,7,2,6,9,13,11,8)
									);

	public function __construct($origine, $attaquant=null, $cible=null, $lieu=null, $optimiser=null) {
		if($origine == 'simulateur') {
			$this->get_Simulateur_data();
		}
		elseif($origine == 'MF') {
			$this->get_MF_data($attaquant, $cible, $lieu, $optimiser);
		}
	}

	public function create_Simulation($montrer) {
		$erreur = $this->check_validity_data();
		if($erreur != '') {
			if($montrer) {
				$this->show_results('', $erreur);
			}
			else {
				return $erreur;
			}
		}
		else {
			$erreur = $this->load();
			if($erreur != '') {
				if($montrer) {
					$this->show_results('', $erreur);
				}
				else {
					return $erreur;
				}
			}
			elseif($montrer) {
				$this->show_results($this->RC, '');
			}
		}
	}

	/*
		Récupération des données dans le cas où on souhaite réaliser une simulation pour la page /XP
	*/
	private function get_Simulateur_data() {
		$donnees = json_decode($_POST['donnees'], true);
		$this->attaquant = new Armee(
								$donnees['attaquant']['unites'],
								array(
									'armes' =>			(int)htmlentities($donnees['attaquant']['niveaux']['armes']),
									'bouclier' => 		(int)htmlentities($donnees['attaquant']['niveaux']['bouclier']),
									'cochenille' => 	(int)htmlentities($donnees['attaquant']['niveaux']['cochenille']),
									'lieu' => 0
									)
								);
		$this->defenseur = new Armee(
								$donnees['defenseur']['unites'],
								array(
									'armes' =>			(int)htmlentities($donnees['defenseur']['niveaux']['armes']),
									'bouclier' =>		(int)htmlentities($donnees['defenseur']['niveaux']['bouclier']),
									'lieu' =>			(int)htmlentities($donnees['defenseur']['niveaux']['lieu']),
									'niveau_lieu' =>	(int)htmlentities($donnees['defenseur']['niveaux']['niveau_lieu'])
									)
								);
		$this->mode = htmlentities($donnees['mode']);
		$this->mode_opti = htmlentities($donnees['mode_opti']);
		$this->position = htmlentities($donnees['position']);
		$this->affichage_XP = htmlentities($donnees['affichage_XP_simulateur']);
		$this->XP_plusieurs_tours = htmlentities($donnees['XP_plusieurs_tours']);
	}

	/*
		Récupération des données dans le cas où on souhaite réaliser une simulation pour le MF
	*/
	private function get_MF_data($attaquant, $cible, $lieu, $optimiser) {
		$attaquant->getInfosZzzelp();
		$this->attaquant = new Armee(
								array((int)$attaquant->niveaux->JSN, (int)$attaquant->niveaux->SN, (int)$attaquant->niveaux->NE, (int)$attaquant->niveaux->JS, (int)$attaquant->niveaux->S, 
									  (int)$attaquant->niveaux->C, (int)$attaquant->niveaux->CE, (int)$attaquant->niveaux->A, (int)$attaquant->niveaux->AE, (int)$attaquant->niveaux->SE, 
									  (int)$attaquant->niveaux->Tk, (int)$attaquant->niveaux->TkE, (int)$attaquant->niveaux->T, (int)$attaquant->niveaux->TE),
								array(
									'armes' =>			(int)$attaquant->niveaux->armes,
									'bouclier' => 		(int)$attaquant->niveaux->bouclier_thoracique,
									'cochenille' => 	(int)$attaquant->niveaux->etable_cochenilles,
									'lieu' => 0
									)
								);
		$this->defenseur = new Armee(
								array((int)$cible->niveaux_probables['JSN'], (int)$cible->niveaux_probables['SN'], (int)$cible->niveaux_probables['NE'], (int)$cible->niveaux_probables['JS'], 
									  (int)$cible->niveaux_probables['S'], (int)$cible->niveaux_probables['C'], (int)$cible->niveaux_probables['CE'], (int)$cible->niveaux_probables['A'],
									  (int)$cible->niveaux_probables['AE'], (int)$cible->niveaux_probables['SE'], (int)$cible->niveaux_probables['Tk'], (int)$cible->niveaux_probables['TkE'], 
									  (int)$cible->niveaux_probables['T'], (int)$cible->niveaux_probables['TE']),
								array(
									'armes' =>			(int)$cible->niveaux_probables['armes'],
									'bouclier' =>		(int)$cible->niveaux_probables['bouclier'],
									'lieu' =>			$lieu,
									'niveau_lieu' =>	($lieu == 0) ? 0 : (($lieu == 1) ? (int)$cible->niveaux_probables['dome'] : (int)$cible->niveaux_probables['loge'])
									)
								);
		$this->pseudo_cible = $cible->pseudo;
		$this->mode = $optimiser ? 1 : 0;
		$this->mode_opti = 'attaque';
		$this->position = 0;
		$this->affichage_XP = 1;
	}		
	
	/*
		Vérifie que les données permettent bien de réaliser une simulation :
			- Les deux armées ne sont pas vides
	*/
	private function check_validity_data() {
		if($this->attaquant->get_AttaqueHB() == 0) {
			return "L'armée de l'attaquant est vide";
		}
		elseif($this->defenseur->get_AttaqueHB() == 0) {
			return "L'armée du défenseur est vide";
		}
		else {
			return "";
		}
	}


	/*
		Fonction principal pour le calcule du RC
	*/
	private function load() {
		/*
			Simulation de combat classique
		*/
		if($this->mode == 0 ) {
			$this->attaquant_RC = $this->attaquant->new_Armee($this->attaquant->armee);
			$this->defenseur_RC = $this->defenseur->new_Armee($this->defenseur->armee);
		}

		/*
			Optimisation de l'XP
		*/
		elseif($this->mode == 1) {
			$this->position = 0;
			$this->defenseur_RC = $this->defenseur->new_Armee($this->defenseur->armee);
			$this->defenseur_RC->vie = $this->defenseur_RC->get_VieAB();
			$this->defenseur_RC->defense = $this->defenseur_RC->get_DefenseAB();
			$this->choose_ArmeeAttaquant();
			if($this->attaquant_RC->get_AttaqueAB() < $this->defenseur_RC->vie AND !isset($this->puissance_opti)) {
				return 'L\'attaquant est trop faible pour OS cette armée';
			}
		}
		$this->compute_Combat();
		$this->get_XP();
		$this->create_RC();
		$this->get_ArmeesFinales();
		$this->get_urlRC();
		return '';
	}

	/*
		Choix de l'armée pour une optimisation
	*/
	private function choose_ArmeeAttaquant() {
		/*
			XP sur plusieurs tours
		*/
		if($this->XP_plusieurs_tours AND $this->defenseur_RC->get_AttaqueHB() > 10 * $this->defenseur_RC->get_DefenseHB()) {
			$this->puissance_opti = $this->calc_PuissanceOptimale();
			$this->compute_ArmeeOptimale();			
		}
		/*
			XP en OS
		*/
		else {
			$this->replique = $this->get_Replique($this->attaquant, $this->defenseur_RC);
			$this->choose_TamponOS();
			$this->choose_ArmeeOS();
		}
	}

	/*
		Choix du tampon : on place les unités jusqu'à ne pouvoir perdre que du tampon (JSN puis SN etc...)
	*/
	private function choose_TamponOS() {
		$this->attaquant_RC = $this->attaquant->new_Armee(array(0,0,0,0,0,0,0,0,0,0,0,0,0,0));
		$this->en_cours = $this->attaquant->new_Armee($this->attaquant->armee);
		$n = 0;
		while (($this->defenseur_RC->defense*$this->replique) > $this->attaquant_RC->get_VieAB() AND $n < 14) {
			if ($this->en_cours->armee[$n] * $this->attaquant_RC->get_VieUnite($n) + $this->attaquant_RC->get_VieAB() > $this->defenseur_RC->defense * $this->replique) {
				$valeur = ceil(($this->defenseur_RC->defense*$this->replique - $this->attaquant_RC->get_VieAB())/$this->attaquant_RC->get_VieUnite($n));
				$this->attaquant_RC->armee[$n] += $valeur;
				$this->en_cours->armee[$n] -= $valeur;

			}
			else {
				$this->attaquant_RC->armee[$n] += $this->en_cours->armee[$n];
				$this->en_cours->armee[$n] = 0;
			}
			$n++;
		}
	}

	/*
		Choix de l'armée restante : on place les unités par ordre d'avantage selon la donnée à pex en priorité
	*/
	private function choose_ArmeeOS() {
		$ordre_defaut = $this->unites_prio[$this->mode_opti];
		while ($this->attaquant_RC->get_AttaqueAB() < $this->defenseur_RC->vie AND $n < 14) {
			if ($this->en_cours->armee[$ordre_defaut[$n]] * $this->attaquant_RC->get_AttaqueUnite($ordre_defaut[$n]) + $this->attaquant_RC->get_AttaqueAB() > $this->defenseur_RC->vie) {
				$valeur = ceil(($this->defenseur_RC->vie - $this->attaquant_RC->get_AttaqueAB())/$this->attaquant_RC->get_AttaqueUnite($ordre_defaut[$n]));
				$this->attaquant_RC->armee[$ordre_defaut[$n]] += $valeur;
				$this->en_cours->armee[$ordre_defaut[$n]] -= $valeur;
			}
			else {
				$this->attaquant_RC->armee[$ordre_defaut[$n]] += $this->en_cours->armee[$ordre_defaut[$n]];
				$this->en_cours->armee[$ordre_defaut[$n]] = 0;
			}
			$n++;
		}
	}

	/*
		Calcul la puissance telle que la ratio d'XP sera de un
	*/
	private function calc_PuissanceOptimale() {
		$coeffs_lieu = array(0, 0.05, 0.15);
		return Nombre::Majoration(ceil(sqrt((1 + 0.1*$this->attaquant->niveaux['cochenille']) / (1 + 0.1*$this->attaquant->niveaux['armes']) / (1 + 0.1*$this->attaquant->niveaux['bouclier']) * (1+$this->defenseur->niveaux['armes']*0.1) * (1 + $this->defenseur->niveaux['bouclier']*0.1 + ($this->defenseur->niveaux['niveau_lieu'] + 2)*0.15)) * 0.66 * $this->defenseur_RC->get_PuissanceXP()), $this->attaquant->get_PuissanceXP());
	}

	private function compute_ArmeeOptimale() {
		$test = $this->defenseur_RC->new_Armee($this->defenseur_RC->armee);
		$tour = 0;
		$tampon_initial = 0.5;
		$tampon = 0.5;
		$different = true;
		$ex_tampon = 0;
		$ex_armee = $this->attaquant->new_Armee(array(0,0,0,0,0,0,0,0,0,0,0,0,0,0));
		while($tour < 1000 AND $different) {
			$tour++;
			list($possible, $this->attaquant_RC, $capa_tampon) = $this->choose_ArmeeXP($tampon);
			if($possible) {
				$this->compute_Combat();
				$different = ($capa_tampon != $ex_tampon);
				$ex_tampon = $capa_tampon;
				$tampon += $tampon_initial/pow(2,$tour) * (($this->attaquant_RC->get_CapaFlood() - $this->resume[count($this->resume)-1]['attaquant']->get_CapaFlood() < $capa_tampon) ? -1 : 1);
			}
			else {
				$tampon -= $tampon_initial/pow(2,$tour);
			}
			//echo $tour.' : '.Nombre::Espaces($capa_tampon).' <br>';
		}
	}

	private function choose_ArmeeXP($tampon) {
		$puissance_tampon = ceil($tampon * $this->puissance_opti);
		$armee = $this->attaquant->new_Armee(array(0,0,0,0,0,0,0,0,0,0,0,0,0,0));
		$this->en_cours = $this->attaquant->new_Armee($this->attaquant->armee);
		$n = 0;
		/*
			Placement du tampon
		*/
		while ($this->en_cours->get_VieAB() > $armee->get_VieAB()*$tampon AND $n < 14) {
			if ($this->en_cours->armee[$n] * $armee->get_VieUnite($n) + $armee->get_VieAB() > $this->en_cours->get_VieAB() * $tampon) {
				$armee->armee[$n] += ceil(($this->en_cours->get_VieAB() * $tampon - $armee->get_VieAB())/$armee->get_VieUnite($n));
			}
			else {
				$armee->armee[$n] += $this->en_cours->armee[$n];
			}
			$n++;
		}
		$armee_tampon = $armee->new_Armee($armee->armee);
		if($armee->get_PuissanceXP() > $this->puissance_opti) {
			return array(false, $armee, $armee->get_CapaFlood());
		}

		/*
			Placement du reste de l'armée
		*/

		$ordre_defaut = $this->unites_prio[$this->mode_opti];
		$n = 0;
		while ($armee->get_PuissanceXP() < $this->puissance_opti AND $n < 14) {
			if ($this->en_cours->armee[$ordre_defaut[$n]] * Fourmizzz::$unites['puissance'][$ordre_defaut[$n]] + $armee->get_PuissanceXP() > $this->puissance_opti) {
				$valeur = ceil(($this->puissance_opti - $armee->get_PuissanceXP())/Fourmizzz::$unites['puissance'][$ordre_defaut[$n]]);
				$armee->armee[$ordre_defaut[$n]] += $valeur;
				$this->en_cours->armee[$ordre_defaut[$n]] -= $valeur;
			}
			else {
				$armee->armee[$ordre_defaut[$n]] += $this->en_cours->armee[$ordre_defaut[$n]];
				$this->en_cours->armee[$ordre_defaut[$n]] = 0;
			}
			$n++;
		}

		return array(true, $armee, $armee_tampon->get_CapaFlood());
	}


	/*
		Simulation du combat
	*/
	private function compute_Combat() {
		$att_actuel = $this->attaquant_RC->new_Armee($this->attaquant_RC->armee);
		$def_actuel = $this->defenseur_RC->new_Armee($this->defenseur_RC->armee);
		$resume = array(array('attaquant' => $att_actuel, 'defenseur' => $def_actuel));
		$this->replique =  $this->get_Replique($att_actuel, $def_actuel);
		while ($att_actuel->get_AttaqueHB() != 0 AND $def_actuel->get_AttaqueHB() != 0) {
			$defense_defenseur = $def_actuel->get_DefenseAB();
			$vie_defenseur = $def_actuel->get_VieAB();
			$attaque_attaquant = $att_actuel->get_AttaqueAB();
			$vie_attaquant = $att_actuel->get_VieAB();
			$vie_attaquant_2 = 0;
			$defense_attaquant_restante = 0;
			$new_att = $att_actuel->new_Armee(array(0,0,0,0,0,0,0,0,0,0,0,0,0,0));
			$new_def = $def_actuel->new_Armee(array(0,0,0,0,0,0,0,0,0,0,0,0,0,0));
			/*
				Calcul des morts chez l'attaquant
			*/		
			for($i=0;$i<14;$i++) {
				if($vie_attaquant_2 >= $defense_defenseur*$this->replique) {
					$new_att->armee[$i] = $att_actuel->armee[$i];
				}
				elseif($defense_defenseur*$this->replique <= ($vie_attaquant_2 + $att_actuel->armee[$i] * (Fourmizzz::$unites['vie'][$i]*(1+0.1*$att_actuel->niveaux['bouclier'])))) {
					$new_att->armee[$i] = (int)($att_actuel->armee[$i]-($defense_defenseur*$this->replique-$vie_attaquant_2)/(Fourmizzz::$unites['vie'][$i]*(1+0.1*$att_actuel->niveaux['bouclier'])*$att_actuel->armee[$i])*$att_actuel->armee[$i]);
				}
				$vie_attaquant_2 += $att_actuel->armee[$i] * (Fourmizzz::$unites['vie'][$i]*(1+0.1*$att_actuel->niveaux['bouclier']));
			}
			$vie_defenseur_2 = 0;
			$vie_defenseur_3 = 0;
			/*
				Calcul des morts chez le défenseur
			*/
			for($i=0;$i<14;$i++) {
				$vie_defenseur_2 += $def_actuel->armee[$i] * $def_actuel->get_VieUnite($i);
				if($attaque_attaquant <= $vie_defenseur_2) {
					$new_def->armee[$i] = (int)(($vie_defenseur_2 - $attaque_attaquant - $vie_defenseur_3)/$def_actuel->get_VieUnite($i));
				}
				$vie_defenseur_3 += $new_def->armee[$i] * $def_actuel->get_VieUnite($i);
			}
			$att_actuel = $new_att->new_Armee($new_att->armee);
			$def_actuel = $new_def->new_Armee($new_def->armee);
			$resume[] = array('attaquant' => $new_att, 'defenseur' => $new_def);
		}
		
		$this->resume = $resume;
		$this->attaquant_fin = $att_actuel;
		$this->defenseur_fin = $def_actuel;
	}

	/*
		Calcul la réplique d'un convois
	*/
	public function get_Replique($attaquant, $defenseur) {
		$attaque = $attaquant->get_AttaqueAB();
		$vie_AB = $defenseur->get_VieAB();
		$vie_HB = $defenseur->get_VieHB();
		if($attaque>max($vie_AB,$vie_HB*3)) {
			return 0.1;
		}
		elseif($attaque>max($vie_AB,$vie_HB*2)) {
			return 0.3;
		}
		elseif($attaque>max($vie_AB,$vie_HB*1.5)) {
			return 0.5;
		}
		else {
			return 1;
		}
	}


	/*
		Calculs associés à l'XP
	*/
	private function get_XP() {
		$this->get_RatioXP();
		$this->get_UnitesXP();
	}

	/*
		Calcul le ratio d'XP lors d'un combat (unite XP = unite * ratio, 0 <= ratio <= 1)
	*/
	private function get_RatioXP() {
		if($this->position == 0) {
			$nous = $this->attaquant_RC;
			$lui = $this->defenseur_RC;
		}
		else {
			$nous = $this->defenseur_RC;
			$lui = $this->attaquant_RC;
		}
		$coeffs = array(0, 0.05, 0.15);			
		$this->ratio_XP = pow($lui->get_PuissanceXP()/$nous->get_PuissanceXP()*0.66,2);
		$this->ratio_XP *=  (1 + 0.1*$nous->niveaux['cochenille']);
		$this->ratio_XP *= 1/(1 + 0.1*$nous->niveaux['armes']) * (1+$lui->niveaux['armes']*0.1);
		if($this->position == 0) {
			$this->ratio_XP *= 1/(1 + 0.1*$nous->niveaux['bouclier']) *  (1 + $lui->niveaux['bouclier']*0.1 + ($this->defenseur->niveaux['niveau_lieu'] + 2)*$coeffs[$this->defenseur->niveaux['lieu']]);
		}
		else {
			$this->ratio_XP *= 1/(1 + 0.1*$nous->niveaux['bouclier'] + ($this->defenseur->niveaux['niveau_lieu'] + 2)*$coeffs[$this->defenseur->niveaux['lieu']]) *  (1 + $lui->niveaux['bouclier']*0.1);
		}

	}

	/*
		Calcul les unités XP lors d'un combat
	*/
	private function get_UnitesXP() {
		$armee = ($this->position == 0) ? $this->attaquant_fin : $this->defenseur_fin;
		$unites_XP = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		$indices = array(0,1,3,4,5,7,10,12);
		for($i=0;$i<8;$i++) {
			$unites_XP[$indices[$i]] = (int)($armee->armee[$indices[$i]]*Nombre::Majoration($this->ratio_XP,1));
		}
		$this->unites_XP = $unites_XP;
	}
	





	/*
		Mise en page du RC
	*/
	public function create_RC() {		
		if($this->position == 0) {
			$this->create_RC_attaquant();
		}
		else {
			$this->create_RC_defenseur();
		}	
		if($this->affichage_XP == 1) {
			$this->RC .= '<br><br>'.$this->create_XP();
		}
	}

	/*
		Crée le RC en position d'attaquant
	*/
	public function create_RC_attaquant() {
		$lieux = array('le Terrain de Chasse', 'la fourmilière', 'la Loge Impériale');
		$RC = '<strong>Vous attaquez '.$lieux[$this->defenseur_RC->niveaux['lieu']].' de '.(isset($this->pseudo_cible) ? $this->pseudo_cible : 'X').'</strong><br><br>';
		$RC .= 'Troupes en attaque:'.$this->generate_Troupes($this->attaquant_RC->armee).'<br><br>';
		$RC .= 'Troupes en défense:'.$this->generate_Troupes($this->defenseur_RC->armee).'<br><br>';
		for($n=0;$n<count($this->resume)-1;$n++) {
			$RC .= 'Vous infligez <strong>'.number_format($this->resume[$n]['attaquant']->get_AttaqueHB(), 0, '.', ' ');
			$RC .= '(+'.number_format($this->resume[$n]['attaquant']->get_AttaqueAB()-$this->resume[$n]['attaquant']->get_AttaqueHB(), 0, '.', ' ').')</strong> ';
			$RC .= 'dégâts et tuez <strong>'.number_format($this->resume[$n]['defenseur']->get_CapaFlood() - $this->resume[$n+1]['defenseur']->get_CapaFlood(), 0, '.', ' ').'</strong> ennemies<br>';

			$RC .= 'L’ennemie inflige <strong>'.number_format($this->resume[$n]['defenseur']->get_DefenseHB()*$this->replique, 0, '.', ' ');
			$RC .= '(+'.number_format(($this->resume[$n]['defenseur']->get_DefenseAB()-$this->resume[$n]['defenseur']->get_DefenseHB())*$this->replique, 0, '.', ' ').')</strong> ';
			$RC .= 'dégâts à vos fourmis et en tue <strong>'.number_format($this->resume[$n]['attaquant']->get_CapaFlood() - $this->resume[$n+1]['attaquant']->get_CapaFlood(), 0, '.', ' ').'</strong><br><br>';
		}
		if(count($this->resume) == 2 && $this->resume[1]['attaquant']->get_CapaFlood() == 0) {
			$RC .= 'Votre armée n’a fait qu’une égratignure à l’ennemi. Vous n’aviez aucune chance.<br>';
		}
		elseif(count($this->resume) == 2 && $this->resume[1]['defenseur']->get_CapaFlood() == 0) {
			$RC .= 'Ecrasante victoire !<br>A peine le temps de se dégourdir les pattes qu’ils étaient tous morts ...<br>';
		}
		elseif($this->resume[count($this->resume) - 1]['attaquant']->get_CapaFlood() == 0) {
			$RC .= 'Vos troupes ont été courageuses et combattantes, mais pas assez.<br>L’ennemi se souviendra toutefois de votre passage.<br>';
		}
		else {
			$RC .= 'L’adversaire y a cru, mais vous sortez victorieux de ce combat acharné.';
		}
		if($this->resume[count($this->resume) - 1]['attaquant']->get_CapaFlood() == 0) {
			$RC .= 'Vos troupes ont échoué.';
		}
		else {
			$RC .= 'Vous avez gagné cette bataille!';
		}
		$this->RC = $RC;
	}

	/*
		Crée le RC en position de défenseur
	*/
	public function create_RC_defenseur() {
		$lieux = array('le Terrain de Chasse', 'la fourmilière', 'la Loge Impériale');

		$RC = '<strong>'.(isset($this->pseudo_attaquant) ? $this->pseudo_attaquant : 'X').' attaque votre '.$lieux[$this->defenseur_RC->niveaux['lieu']].'</strong><br><br>';
		$RC .= 'Troupes en attaque:'.$this->generate_Troupes($this->attaquant_RC->armee).'<br><br>';
		$RC .= 'Troupes en défense:'.$this->generate_Troupes($this->defenseur_RC->armee).'<br><br>';
		for($n=0;$n<count($this->resume)-1;$n++) {
			$RC .= 'L’ennemie inflige <strong>'.number_format($this->resume[$n]['attaquant']->get_AttaqueHB(), 0, '.', ' ');
			$RC .= '(+'.number_format($this->resume[$n]['attaquant']->get_AttaqueAB()-$this->resume[$n]['attaquant']->get_AttaqueHB(),  0, '.', ' ').')</strong> ';
			$RC .= 'dégâts à vos fourmis et en tue <strong>'.number_format($this->resume[$n]['defenseur']->get_CapaFlood() - $this->resume[$n+1]['defenseur']->get_CapaFlood(), 0, '.', ' ').'</strong><br>';
			
			$RC .= 'Vous infligez <strong>'.number_format($this->resume[$n]['defenseur']->get_DefenseHB()*$this->replique, 0, '.', ' ');
			$RC .= '(+'.number_format(($this->resume[$n]['defenseur']->get_DefenseAB()-$this->resume[$n]['defenseur']->get_DefenseHB())*$this->replique, 0, '.', ' ').')</strong> ';
			$RC .= 'dégâts et tuez <strong>'.number_format($this->resume[$n]['attaquant']->get_CapaFlood() - $this->resume[$n+1]['attaquant']->get_CapaFlood(), 0, '.', ' ').'</strong> ennemies<br><br>';
		}
		if(count($this->resume) == 2 && $this->resume[1]['attaquant']->get_CapaFlood() == 0) {
			$RC .= 'Nos défenses ont déchiqueté l’armée ennemi. Il y réfléchira à deux fois avant de revenir.<br>';
		}
		elseif(count($this->resume) == 2 && $this->resume[1]['defenseur']->get_CapaFlood() == 0) {
			$RC .= 'Vous venez de subir une cuisante défaite.<br>';
		}
		elseif($this->resume[count($this->resume) - 1]['attaquant']->get_CapaFlood() == 0) {
			$RC .= 'Le combat était difficile, l\'ennemi était résistant, mais votre stratégie l\'a emportée.<br>';
		}
		else {
			$RC .= 'Les troupes étaient de force égale, cependant il manqua aux nôtres ce petit plus qui fait gagner la bataille.<br>Vos troupes ont échoué, l’ennemi pénétre vos défenses.';
		}
		if($this->resume[count($this->resume) - 1]['attaquant']->get_CapaFlood() == 0) {
			$RC .= 'Vous avez gagné cette bataille! L’ennemie est repoussé.';
		}
		else {
			$RC .= 'Vos troupes ont échoué, l’ennemi pénétre vos défenses.';
		}
		$this->RC = $RC;
	}

	/*
		Crée les lignes d'XP
	*/
	public function create_XP() {
		$indices = array(0=>1,1=>2,3=>4,4=>9,5=>6,7=>8,10=>11,12=>13);
		$XP = 'Les unités survivantes ont appris de cette bataille:<br>';
		$retour = false;
		foreach($indices as $avant => $apres) {
			if($this->unites_XP[$avant] > 1) {
				$XP .= '- '.number_format($this->unites_XP[$avant],0,'.',' ').' '.Fourmizzz::$unites['noms_pluriels'][$avant].' sont devenues des '.Fourmizzz::$unites['noms_pluriels'][$apres].'<br>';
				$retour = true;
			}
			elseif($this->unites_XP[$avant] == 1) {
				$XP .= '- '.number_format($this->unites_XP[$avant],0,'.',' ').' '.Fourmizzz::$unites['noms_singulier'][$avant].' est devenue une '.Fourmizzz::$unites['noms_singulier'][$apres].'<br>';
				$retour = true;				
			}
		}
		if($retour) {
			return $XP;
		}
		else {
			return '';
		}
	}

	/*
		Crée la ligne d'unités à partir de l'armée d'un joueur
	*/
	public function generate_Troupes($armee) {
		$ligne = '';
		for($i=0;$i<14;$i++) {
			if($armee[$i] == 1) {
				$ligne .= number_format($armee[$i], 0, '.', ' ').' '.Fourmizzz::$unites['noms_singulier'][$i].', ';
			}
			elseif($armee[$i] > 1) {
				$ligne .= number_format($armee[$i], 0, '.', ' ').' '.Fourmizzz::$unites['noms_pluriels'][$i].', ';
			}
		}
		return substr($ligne,0,-2).'.';
	}

	/*
		Calcul l'armée finale de l'attaquant en comptant l'XP
	*/
	private function get_ArmeesFinales() {
		$indices = array(0 => 1,1 => 2,3 => 4,4 => 9,5 => 6,7 => 8, 10 => 11, 12 => 13);
		$this->attaquant_XP = $this->attaquant_fin->new_Armee($this->attaquant_fin->armee);
		foreach($indices as $avant => $apres) {
			$this->attaquant_XP->armee[$avant] -= ceil($this->attaquant_fin->armee[$avant] * Nombre::Majoration($this->ratio_XP, 1));
			$this->attaquant_XP->armee[$apres] += ceil($this->attaquant_fin->armee[$avant] * Nombre::Majoration($this->ratio_XP, 1));
		}
	}

	/*
		Génère l'URL permettant de facilement partager un RC
	*/
	private function get_urlRC() {
		$lieux = array('TDC', 'dome', 'loge');
		$url = 'XP?lieu='.$lieux[$this->defenseur->niveaux['lieu']].'&attaquant=[';
		for($n=0;$n<14;$n++) {
			$url.= $this->attaquant->armee[$n];
			if($n != 13) {
				$url .= ',';
			}
		}
		$url .= ']&defenseur=[';
		for($n=0;$n<14;$n++) {
			$url.= $this->defenseur->armee[$n];
			if($n != 13) {
				$url .= ',';
			}
		}
		$url .= ']&niveau_lieu=['.$this->attaquant->niveaux['armes'].','.$this->attaquant->niveaux['bouclier'].','.$this->attaquant->niveaux['cochenille'].','.$this->defenseur->niveaux['armes'].','.$this->defenseur->niveaux['bouclier'];
		for($i=1;$i<3;$i++) {
			$url .= ',';
			if($i == $this->defenseur->niveaux['lieu']) {
				$url .= $this->defenseur->niveaux['niveau_lieu'];
			}
			else {
				$url .= '0';
			}
		}
		$url .= ']&auto=true';
		$this->url_combat = $url;
	}

	/*
		Renvoi les données concernant le RC à Zzzelp
	*/
	private function show_results($RC, $erreur) {
		echo json_encode(array(
					'RC' => $RC, 
					'erreur' => $erreur,
					'armee_att_avant' => $this->attaquant->armee,
					'armee_def_avant' => $this->defenseur->armee,
					'armee_att_apres' => $this->attaquant_XP->armee,
					'armee_def_apres' => $this->defenseur_fin->armee,
					'url' => $this->url_combat
			));
	}


	/*
		Initialise les paramètres pour les placer automatiquement dans les cases du simulateur
	*/
	static public function get_Parameters($comptes_fzzz) {
		$parametres = array('auto' => ($_GET['auto'] == 'true'), 'lieu' => 'TDC', 'armees_fzzz' => array());
		foreach(Fourmizzz::$serveurs as $serveur) {
			if($comptes_fzzz[$serveur] != null) {
				$comptes_fzzz[$serveur]->getInfosZzzelp();
				$armee = array();
				foreach(Fourmizzz::$unites['TAGs'] as $unite) {
					$armee[] = $comptes_fzzz[$serveur]->niveaux->$unite;
				}
				$parametres['armees_fzzz'][$serveur] = $armee;
			}
		}
		if(!empty($_GET['lieu'])) {
			$parametres['lieu'] = htmlentities($_GET['lieu']);
		}
		foreach(array('attaquant', 'defenseur') as $joueur) {
			if(strlen(htmlentities($_GET[$joueur])) > 5) {
				$donnees = explode(',',substr(htmlentities($_GET[$joueur]),1,-1));
				$parametres[$joueur] = $donnees;
			}
		}
		if(strlen(htmlentities($_GET['niveau_lieu'])) > 5) {
			$donnees = explode(',',substr(htmlentities($_GET['niveau_lieu']),1,-1));
			$parametres['niveau_lieu'] = $donnees;
		}
		return $parametres;
	}	
}