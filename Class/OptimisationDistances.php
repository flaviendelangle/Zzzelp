<?php

class OptimisationDistances {

	const CONVOISPROCHE = 1740;

	public $membres;
	public $parametres;
	public $multis;
	public $tableau_coordonnees;
	public $convois_restants;
	public $liste_ID;
	public $ratio_TDC;
	public $nombre_convois;
	public $convoyeurs;
	public $convoyeurs_possibles;
	public $convois_tries;
	public $TDC_moyen;

	public function __construct($alliance) {
		$this->membres = $alliance->membres;
		$this->parametres = $alliance->parametres_convois;
		$this->multis = $alliance->multis_str;
	}

	/*
		Fonction principale de l'optimisation des distances
	*/
	public function optimise_distances() {
		$this->create_TableauCoordonnees();
		$this->get_TDCmoyen();
		$this->get_RatioOuvrieres();
		$this->get_NombreConvois();
		if($_POST['methode'] >= 0) {
			$this->parametres['algorithme_optimisation'] = $_POST['methode'];
		}
		if($this->parametres['algorithme_optimisation'] == 0) {
			$donnees_0 = $this->methode_Zzzelp(true);
			$donnees_1 = $this->methode_DistancePure(true);
			$donnees_2 = $this->methode_ID(true);
			$donnees_3 = $this->methode_AVI(true);
			$donnees_4 = $this->methode_OuvrieresLibres(true);
			$this->choose_repartition($donnees_0, $donnees_1, $donnees_2, $donnees_3, $donnees_4);
		}
		elseif($this->parametres['algorithme_optimisation'] == 1) {
			$this->methode_Zzzelp(false);
		}
		elseif($this->parametres['algorithme_optimisation'] == 2) {
			$this->methode_DistancePure(false);
		}
		elseif($this->parametres['algorithme_optimisation'] == 3) {
			$this->methode_ID(false);
		}
		elseif($this->parametres['algorithme_optimisation'] == 4) {
			$this->methode_AVI(false);
		}
		elseif($this->parametres['algorithme_optimisation'] == 5) {
			$this->methode_OuvrieresLibres(false);
		}
		elseif($this->parametres['algorithme_optimisation'] == 6) {
			$this->methode_ConvoisPersonnalises(false);
		}
		$this->sort_Convoyeurs();
		$this->compute_Relais();
		$this->sort_Convoyeurs();
	}

	/*
		Si le mode choisie par l"utilisateur est "Meilleure optimisation", détermine parmi les 4 optimisations classiques celle fonctionnant le mieux
	*/
	public function choose_repartition($donnees_0, $donnees_1, $donnees_2, $donnees_3, $donnees_4) {
		$coefficients = array();
		$donnees = array($donnees_0, $donnees_1, $donnees_2, $donnees_3, $donnees_4);
		foreach ($donnees as $donnee) {
			$coefficients[] = ($donnee[2] / $donnee[1])*(1-($donnee[3] / $donnee[1]));
		}
		$donnee_choisie = $donnees[array_search(min($coefficients), $coefficients)];
		$this->convois = $donnee_choisie[0];
		$this->total_ressources = $donnee_choisie[1];
		$this->total_distance = $donnee_choisie[2];
		$this->total_ressources_proches = $donnee_choisie[3];
	}

	/*
		Crée un tableau contenant tous les temps de trajets entre deux joueurs de l'alliance sous la forme :
		array("joueur1/joueur2" => 245.989, "joueur1/joueur3" => 456,359 ...)
	*/
	public function create_TableauCoordonnees() {
		$this->tableau_coordonnees = array();
		foreach ($this->membres as $joueur_1 => $d_1) {
			foreach ($this->membres as $joueur_2 => $d_2) {
				$couple_test = $joueur_1.'/'.$joueur_2;
				if ($joueur_1 != $joueur_2 AND !in_array($couple_test, $this->multis)) {
					$distance = Fourmizzz::Distance($d_1->coordonnees, $d_2->coordonnees);
					$temps = Fourmizzz::Temps_trajet($distance, $d_1->niveaux->vitesse_attaque);
					$this->tableau_coordonnees[$joueur_1.'/'.$joueur_2] = $temps;
				}
			}
		}
		asort($this->tableau_coordonnees);
	}

	/*
		Calcul le TDC moyen de l'alliance pour l'optimisation
		Utile pour les relais et le mode Ouvrières libres
	*/
	public function get_TDCmoyen() {
		$this->TDC_moyen = 0;
		foreach($this->membres as $pseudo => $valeurs) {
			$this->TDC_moyen += $valeurs->data_convois['TDC'];
		}
		$this->TDC_moyen /= count($this->membres);		
	}

	/*
		Réinitialise les convois pour ne pas avoir des variables pleine pour le mode "Meilleure méthode"
	*/
	public function reinitialise_Convois() {
		$this->convois_restants = array();
		$this->liste_ID = array();
		foreach ($this->membres as $pseudo => $valeurs) {
			$this->convois_restants[$pseudo] = $valeurs->data_convois['convois'];
			$this->liste_ID[$pseudo] = $valeurs->id;
		}
	}







	/*
		ALGORITHMES D'OPTIMISATION DES DISTANCES
	*/


	/*
		Méthode Zzzelp :
			- répartit un maximum de convois à moins de 29 minutes par ordre croissant de distance
			- répartit les convois restant par le méthode ID
	*/
	public function methode_Zzzelp($retour) {
		$this->reinitialise_Convois();
		$convois = array();
		$total_distance = 0;
		$total_ressources = 0;
		//Repartition des convois les plus proches
		foreach ($this->tableau_coordonnees as $duo => $distance) {
			if ($distance > self::CONVOISPROCHE) {
				break;
			}
			else {
				$couple = explode('/', $duo);
				if ($this->convois_restants[$couple[0]] > 0 AND $this->convois_restants[$couple[1]] < 0) {
					if ($this->convois_restants[$couple[0]] > -$this->convois_restants[$couple[1]]) {
						$convoi = -$this->convois_restants[$couple[1]] ;
					}
					else {
						$convoi = $this->convois_restants[$couple[0]];
					}
					$this->convois_restants[$couple[0]] -= $convoi;
					$this->convois_restants[$couple[1]] += $convoi;
					$total_distance += $convoi*$distance;
					$total_ressources += $convoi;
					$convois[$couple[0]][$couple[1]] = $convoi;
				}
			}
		}
		$total_ressources_proches = $total_ressources;

		//Repartition des autres convois	
		foreach ($this->liste_ID as $joueur_1 => $ID_1) {
			foreach ($this->liste_ID as $joueur_2 => $ID_2) {
				$couple_test = $joueur_1.'/'.$joueur_2;
				if ($this->convois_restants[$joueur_1] > 0 and $this->convois_restants[$joueur_2] < 0 AND !in_array($couple_test, $this->multis)) {
					if ($this->convois_restants[$joueur_1] > -$this->convois_restants[$joueur_2]) {
						$convoi = -$this->convois_restants[$joueur_2] ;
					}
					else {
						$convoi = $this->convois_restants[$joueur_1];
					}
					$this->convois_restants[$joueur_1] -= $convoi;
					$this->convois_restants[$joueur_2] += $convoi;
					$total_distance += $convoi*$this->tableau_coordonnees[$couple_test];
					$total_ressources += $convoi;
					$convois[$joueur_1][$joueur_2] = $convoi;
				}
			}
		}
		if($retour) {
			return array($convois, $total_ressources, $total_distance, $total_ressources_proches);
		}
		else {
			$this->convois = $convois;
			$this->total_ressources = $total_ressources;
			$this->total_distance = $total_distance;
			$this->total_ressources_proches = $total_ressources_proches;
		}
	}

	/*
		Méthode Distance Pure :
			- répartit les convois par ordre croissant de distance des couples de joueurs
	*/
	public function methode_DistancePure($retour) {
		$this->reinitialise_Convois();
		$convois = array();
		$total_distance = 0;
		$total_ressources = 0;
		$total_ressources_proches = 0;
		$proche = true;
		foreach ($this->tableau_coordonnees as $duo => $distance) {
			if ($distance > self::CONVOISPROCHE) {
				$proche = false;
			}
			$couple = explode('/', $duo);
			if ($this->convois_restants[$couple[0]] > 0 AND $this->convois_restants[$couple[1]] < 0) {
				if ($this->convois_restants[$couple[0]] > -$this->convois_restants[$couple[1]]) {
					$convoi = -$this->convois_restants[$couple[1]] ;
				}
				else {
					$convoi = $this->convois_restants[$couple[0]];
				}
				$this->convois_restants[$couple[0]] -= $convoi;
				$this->convois_restants[$couple[1]] += $convoi;
				$total_distance += $convoi*$distance;
				$total_ressources += $convoi;
				$convois[$couple[0]][$couple[1]] = $convoi;
				if ($proche) {
					$total_ressources_proches += $convoi;
				}
			}
		}
		if($retour) {
			return array($convois, $total_ressources, $total_distance, $total_ressources_proches);
		}
		else {
			$this->convois = $convois;
			$this->total_ressources = $total_ressources;
			$this->total_distance = $total_distance;
			$this->total_ressources_proches = $total_ressources_proches;
		}
	}

	/*
		Méthode ID :
			- Répartit les convois en prenant le plus petit ID des convoyeurs et en le faisant convoyer le plus petit ID des convoyé puis en augmentant les ID
			  dès que l'un des deux n'as plus de convois à envoyer / recevoir
	*/
	public function methode_ID($retour) {
		$this->reinitialise_Convois();
		$convois = array();
		$total_distance = 0;
		$total_ressources = 0;
		$total_ressources_proches = 0;		

		foreach ($this->liste_ID as $joueur_1 => $ID_1) {
			foreach ($this->liste_ID as $joueur_2 => $ID_2) {
				$couple_test = $joueur_1.'/'.$joueur_2;
				if ($this->convois_restants[$joueur_1] > 0 AND $this->convois_restants[$joueur_2] < 0 AND !in_array($couple_test, $this->multis)) {
					if ($this->convois_restants[$joueur_1] > -$this->convois_restants[$joueur_2]) {
						$convoi = -$this->convois_restants[$joueur_2] ;
					}
					else {
						$convoi = $this->convois_restants[$joueur_1];
					}
					$this->convois_restants[$joueur_1] -= $convoi;
					$this->convois_restants[$joueur_2] += $convoi;
					$total_distance += $convoi*$tableau_coordonnees[$couple_test];
					if ($this->tableau_coordonnees[$couple_test] < self::CONVOISPROCHE) {
						$total_ressources_proches += $convoi;
					}
					$total_ressources += $convoi;
					$convois[$joueur_1][$joueur_2] = $convoi;
				}
			}
		}
		if($retour) {
			return array($convois, $total_ressources, $total_distance, $total_ressources_proches);
		}
		else {
			$this->convois = $convois;
			$this->total_ressources = $total_ressources;
			$this->total_distance = $total_distance;
			$this->total_ressources_proches = $total_ressources_proches;
		}
	}

	/*
		Méthode -AVI- :
			- répartit en priorité les convois du plus gros demandeur puis du second etc...
	*/
	public function methode_AVI($retour) {
		$this->reinitialise_Convois();
		$liste_demandes = array();
		foreach ($this->membres as $joueur => $valeurs) {
			$liste_demandes[$joueur] = $valeurs->data_convois['convois'];
		}
		arsort($liste_demandes);
		$convois = array();
		$total_distance = 0;
		$total_ressources = 0;
		$total_ressources_proches = 0;
		foreach ($liste_demandes as $pseudo => $demande) {
			if ($demande <= 0) {
				break;
			}
			foreach ($this->tableau_coordonnees as $duo => $distance) {
				$couple = explode('/', $duo);
				if ($couple[0] == $pseudo AND $liste_demandes[$couple[1]] < 0) {
					if ($liste_demandes[$couple[0]] == 0) {
						break;
					}
					if ($liste_demandes[$couple[0]] > -$liste_demandes[$couple[1]]) {
						$convoi = -$liste_demandes[$couple[1]] ;
					}
					else {
						$convoi = $liste_demandes[$couple[0]];
					}
					$liste_demandes[$couple[0]] -= $convoi;
					$liste_demandes[$couple[1]] += $convoi;
					$total_distance += $convoi*$distance;
					$total_ressources += $convoi;
					$convois[$couple[0]][$couple[1]] = $convoi;
					$total_distance += $convoi*$this->tableau_coordonnees[$duo];
					if ($this->tableau_coordonnees[$duo] < self::CONVOISPROCHE) {
						$total_ressources_proches += $convoi;
					}
				}
			}
		}
		if($retour) {
			return array($convois, $total_ressources, $total_distance, $total_ressources_proches);
		}
		else {
			$this->convois = $convois;
			$this->total_ressources = $total_ressources;
			$this->total_distance = $total_distance;
			$this->total_ressources_proches = $total_ressources_proches;
		}
	}

	/*
		Méthode Ouvrières libres
			- calcul les convois à moins de 15 minutes avec la méthode Distance pure
			- calcul les convois des joueurs ayant un ratio ouvrières / TDC inférieur à 1.3 par ordre croissant de ratio
			- calcul les convois restant par nombre décroissant de convois à effectuer si ceux-ci sont à plus de 30 minutes
	*/
	public function methode_OuvrieresLibres($retour) {
		$this->reinitialise_Convois();
		$convois = array();
		$total_distance = 0;
		$total_ressources = 0;
		$total_ressources_proches = 0;
		foreach ($this->tableau_coordonnees as $duo => $distance) {
			if($distance > 15) {
				break;
			}
			else {
				$couple = explode('/', $duo);
				if ($this->convois_restants[$couple[0]] > 0 AND $this->convois_restants[$couple[1]] < 0) {
					if ($this->convois_restants[$couple[0]] > -$this->convois_restants[$couple[1]]) {
						$convoi = -$this->convois_restants[$couple[1]] ;
					}
					else {
						$convoi = $this->convois_restants[$couple[0]];
					}
					$this->convois_restants[$couple[0]] -= $convoi;
					$this->convois_restants[$couple[1]] += $convoi;
					$total_distance += $convoi*$distance;
					$total_ressources += $convoi;
					$convois[$couple[0]][$couple[1]] = $convoi;
					$total_ressources_proches += $convoi;
				}
			}
		}
		foreach($this->ratio_TDC as $pseudo => $ratio) {
			if($ratio > 1.3) {
				break;
			}
			foreach($this->tableau_coordonnees as $duo => $distance) {
				$couple = explode('/', $duo);
				if ($distance < self::CONVOISPROCHE AND $couple[0] == $pseudo) {
					if ($this->convois_restants[$couple[0]] > 0 AND $this->convois_restants[$couple[1]] < 0) {
						if ($this->convois_restants[$couple[0]] > -$this->convois_restants[$couple[1]]) {
							$convoi = -$this->convois_restants[$couple[1]] ;
						}
						else {
							$convoi = $this->convois_restants[$couple[0]];
						}
						$this->convois_restants[$couple[0]] -= $convoi;
						$this->convois_restants[$couple[1]] += $convoi;
						$total_distance += $convoi*$distance;
						$total_ressources += $convoi;
						$total_ressources_proches += $convoi;
						$convois[$couple[0]][$couple[1]] = $convoi;
					}
				}
			}
		}
		foreach($this->nombre_convois as $pseudo => $ratio) {
			foreach($this->tableau_coordonnees as $duo => $distance) {
				$couple = explode('/', $duo);
				if ($couple[0] == $pseudo) {
					if ($this->convois_restants[$couple[0]] > 0 AND $this->convois_restants[$couple[1]] < 0) {
						if ($this->convois_restants[$couple[0]] > -$this->convois_restants[$couple[1]]) {
							$convoi = -$this->convois_restants[$couple[1]] ;
						}
						else {
							$convoi = $this->convois_restants[$couple[0]];
						}
						$this->convois_restants[$couple[0]] -= $convoi;
						$this->convois_restants[$couple[1]] += $convoi;
						$total_distance += $convoi*$distance;
						$total_ressources += $convoi;
						if($distance <= self::CONVOISPROCHE) {
							$total_ressources_proches += $convoi;
						}
						$convois[$couple[0]][$couple[1]] = $convoi;
					}
				}
			}
		}
		if($retour) {
			return array($convois, $total_ressources, $total_distance, $total_ressources_proches);
		}
		else {
			$this->convois = $convois;
			$this->total_ressources = $total_ressources;
			$this->total_distance = $total_distance;
			$this->total_ressources_proches = $total_ressources_proches;
		}
	}


	/*
		Méthode Convois personnalisés
			- calcul les convois des couples de joueurs rentrés par l'utilisateur par ordre de stockage
			- calcul les convois restant via la méthode -AVI-
	*/
	public function methode_ConvoisPersonnalises($retour) {
		$this->reinitialise_Convois();
		$convois = array();
		$total_distance = 0;
		$total_ressources = 0;
		$total_ressources_proches = 0;		
		$liste_demandes = array();
		foreach ($this->membres as $pseudo => $valeurs) {
			$liste_demandes[$pseudo] = $valeurs->data_convois['convois'];
		}
		arsort($liste_demandes);
		foreach($this->parametres['priorites_manuelles'] as $pseudo => $cibles) {
			$cibles = explode(',', $cibles);
			foreach($cibles as $cible) {
				if ($this->convois_restants[$pseudo] > 0 AND $this->convois_restants[$cible] < 0) {
					if ($this->convois_restants[$pseudo] > -$this->convois_restants[$cible]) {
						$convoi = -$this->convois_restants[$cible] ;
					}
					else {
						$convoi = $this->convois_restants[$pseudo];
					}
					$this->convois_restants[$pseudo] -= $convoi;
					$this->convois_restants[$cible] += $convoi;
					$total_distance += $convoi*$distance;
					$total_ressources += $convoi;
					if($distance < self::CONVOISPROCHE) {
						$total_ressources_proches += $convoi;
					}
					$convois[$pseudo][$cible] = $convoi;
					$liste_demandes[$pseudo] -= $convoi;
					$liste_demandes[$cible] += $convoi;
				}
			}
		}
		foreach ($liste_demandes as $pseudo => $demande) {
			foreach ($this->tableau_coordonnees as $couple_base => $valeur) {
				$couple = explode('/', $couple_base);
				if ($couple[0] == $pseudo AND $liste_demandes[$couple[1]] < 0) {
					if ($liste_demandes[$couple[0]] == 0) {
						break;
					}
					if ($liste_demandes[$couple[0]] > -$liste_demandes[$couple[1]]) {
						$convoi = -$liste_demandes[$couple[1]] ;
					}
					else {
						$convoi = $liste_demandes[$couple[0]];
					}
					$liste_demandes[$couple[0]] -= $convoi;
					$liste_demandes[$couple[1]] += $convoi;
					$total_distance += $convoi*$distance;
					$total_ressources += $convoi;
					$convois[$couple[0]][$couple[1]] = $convoi;
					$total_distance += $convoi*$this->tableau_coordonnees[$couple_base];
					if ($this->tableau_coordonnees[$couple_base] < self::CONVOISPROCHE) {
						$total_ressources_proches += $convoi;
					}
				}
			}
		}
		if($retour) {
			return array($convois, $total_ressources, $total_distance, $total_ressources_proches);
		}
		else {
			$this->convois = $convois;
			$this->total_ressources = $total_ressources;
			$this->total_distance = $total_distance;
			$this->total_ressources_proches = $total_ressources_proches;
		}
	}

	/*
		Calcul pour chaque joueur son ration ouvrières / TDC
	*/
	public function get_RatioOuvrieres() {
		$this->ratio_TDC = array();
		foreach($this->membres as $pseudo => $valeurs) {
			$this->membres[$pseudo]->get_actualouv();
			if($this->membres[$pseudo]->niveaux->ouvrieres == 0 OR empty($valeurs->data_convois['TDC'])) {
				$this->ratio_TDC[$pseudo] = 100000;
			}
			else {
				if($valeurs->data_convois['TDC'] > $this->TDC_moyen) {
					$this->membres[$pseudo]->niveaux->ouvrieres = $this->membres[$pseudo]->niveaux->ouvrieres_reelles;
				}
				$this->ratio_TDC[$pseudo] = $this->membres[$pseudo]->niveaux->ouvrieres / $valeurs->data_convois['TDC'];
			}
		}
		asort($this->ratio_TDC);
	}

	/*
		Calcul pour chaque convoyeur le nombre de convois qu'il devrait faire si il n'utilisait que ces ouvrières libres
	*/
	public function get_NombreConvois() {
		$this->nombre_convois = array();
		foreach($this->membres as $pseudo => $valeurs) {
			if($valeurs->data_convois['convois'] > 0) {
				$this->nombre_convois[$pseudo] = $valeurs->data_convois['convois'] / Nombre::Minoration($valeurs->niveaux->ouvrieres - $valeurs->data_convois['TDC'], 1) / (10+0.5*$valeurs->niveaux->etable_pucerons);
			}
		}
		arsort($this->nombre_convois);
	}

	/*
		Trie les convoyeurs par total de ressources à convoyer
	*/
	public function sort_Convoyeurs() {
		$this->convoyeurs = array();
		foreach($this->convois as $pseudo => $liste) {
			$this->convoyeurs[$pseudo] = $this->get_TotalConvoyeJoueur($liste);
		}
		arsort($this->convoyeurs);
	}


	/*
		Calcul le nombre de ressource qu'un convoyeur doit convoyer
	*/
	public function get_TotalConvoyeJoueur($convois) {
		$total = 0;
		foreach($convois as $pseudo => $convoi) {
			$total += $convoi;
		}
		return $total;
	}



	/*
		GESTION DES RELAIS
	*/

	/*
		Fonction principale du calcul des relais (joueurs permettant d'augmenter la quantité de convois sous les 29 minutes)
		Il reste à intégrer les relais à plus de 30 minutes en se basant sur leurs ouvrières libres
	*/
	public function compute_Relais() {
		/*
			Calcul des relais manuels
		*/
		if($this->parametres['activer_relais_convois'] == '1') {
			$this->prepare_RelaisManuels();
			$this->compute_RelaisManuels();	
		}
		
		/*
			Calcul des relais à moins de 30mn
		*/
			/*
		$this->get_MainConvois();
		$this->get_ConvoyeursProches();
		$this->solve_RelaisProches();
			*/
	}

	/*
		Trie les relais par ordre d'ouvrières décroissants
	*/
	public function prepare_RelaisManuels() {
		/*
			On calcul combien chaque relais peut prendre en charge
		*/
		$this->relais_manuels = array();
		foreach($this->parametres['relais_convois'] as $pseudo => $n_convois) {
			if($this->membres[$pseudo]->niveaux->ouvrieres > $this->membres[$pseudo]->data_convois['TDC']) {
				$nombre = ($this->membres[$pseudo]->niveaux->ouvrieres - $this->membres[$pseudo]->data_convois['TDC']) * (10 + $this->membres[$pseudo]->niveaux->etable_pucerons*0.5) * $n_convois;
				if($this->membres[$pseudo]->data_convois['convois'] > 0) {
					$lointains = 0;
					foreach($this->convois[$pseudo] as $cible => $valeur) {
						if($this->tableau_coordonnees[$pseudo.'/'.$cible] > self::CONVOISPROCHE) {
							$lointains += $valeur;
						}
					}
					$nombre -= $lointains;
				}
				if($nombre > 0) {
					$this->relais_manuels[$pseudo] = (int)$nombre;
				}		
			}
		}
		arsort($this->relais_manuels);

		/*
			On trie les convoyeurs par quantité de convois lointains à effectuer
		*/
		$this->convoyeurs_manuels = array();
		foreach($this->convois as $convoyeur => $convois) {
			$lointains = 0;
			foreach($convois as $cible => $valeur) {
				if($this->tableau_coordonnees[$convoyeur.'/'.$cible] > self::CONVOISPROCHE) {
					$lointains += $valeur;
				}
			}
			if($lointains > 0) {
				$this->convoyeurs_manuels[$convoyeur] = $lointains;
			}
		}
		arsort($this->convoyeurs_manuels);
	}

	public function compute_RelaisManuels() {
		foreach($this->convoyeurs_manuels as $convoyeur => $valeur) {
			foreach($this->relais_manuels as $relais => $possible) {
				if($convoyeur != $relais AND !in_array($convoyeur.'/'.$relais, $this->multis) AND $this->tableau_coordonnees[$convoyeur.'/'.$relais] <= self::CONVOISPROCHE AND $possible > 0) {
					foreach($this->convois[$convoyeur] as $cible => $convoi) {
						if($this->tableau_coordonnees[$convoyeur.'/'.$cible] > self::CONVOISPROCHE) {
							if($possible > $convoi) {
								$this->convois[$relais][$cible] += $convoi;
								$this->convois[$convoyeur][$relais] += $convoi;
								$possible -= $convoi;
								unset($this->convois[$convoyeur][$cible]);
							}
							elseif($possible > 0) {
								$this->convois[$relais][$cible] += $possible;
								$this->convois[$convoyeur][$relais] += $possible;
								$this->convois[$convoyeur][$cible] -= $possible;
								$possible = 0;
								break;						
							}
						}
					}
					$this->relais_manuels[$relais] = $possible;
				}
			}
		}
	}

	/*
		Récupère les convois par taille du convois à effectuer décroissant
		Le but étant de résoudre en priorité les gros convois lointains
	*/
	public function get_MainConvois() {
		$this->convois_tries = array();
		foreach($this->convois as $convoyeur => $liste) {
			foreach($liste as $convoye => $valeur) {
				$this->convois_tries[$convoyeur.'/'.$convoye] = $valeur;
			}
		}
		arsort($this->convois_tries);
	}

	/*
		Récupère la liste des convoyeurs à moins de 30mn du convoyeur en cours d'analyse
	*/
	public function get_ConvoyeursProches() {
		$this->convoyeurs_possibles = array();
		foreach($this->membres as $pseudo => $valeurs) {
			if($valeurs->niveaux->ouvrieres > $this->TDC_moyen) {
				$this->convoyeurs_possibles[] = $pseudo;
			}
		}
	}

	/*
		Tente de trouver un joueur C tel que A => C < self::CONVOISPROCHE et C => B < self::CONVOISPROCHE alors que A => B > self::CONVOISPROCHE
	*/
	public function solve_RelaisProches() {
		foreach($this->convois_tries as $duo => $valeur) {
			if($this->tableau_coordonnees[$duo] > self::CONVOISPROCHE) {
				$couple = explode('/', $duo);
				foreach($this->convoyeurs_possibles as $convoyeur) {
					if($convoyeur != $couple[0] AND $this->tableau_coordonnees[$couple[0].'/'.$convoyeur] < self::CONVOISPROCHE AND $this->tableau_coordonnees[$convoyeur.'/'.$couple[1]] < self::CONVOISPROCHE) {
						echo $duo.'/'.$convoyeur.'<br>';
						if(isset($this->convois[$convoyeur]) AND array_key_exists($couple[1], $this->convois[$convoyeur])) {
							$this->convois[$convoyeur][$couple[1]] += $valeur;
						}
						else {
							$this->convois[$convoyeur][$couple[1]] = $valeur;
						}
						$this->convois[$couple[0]][$convoyeur] = $valeur;
						unset($this->convois[$couple[0]][$couple[1]]);
						break;
					}
				}
			}
		}
	}
}