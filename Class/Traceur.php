<?php

class Traceur {

	public $utilisateur;
	public $debut;
	public $fin;
	public $mode;
	public $valeur_min;
	public $valeur_max;
	public $alliances_diff; 
	public $variations_inconnues;

	public $modes = array(
		'correspondances', 
		'variations', 
		'joueurs', 
		'alliances'
	);




	public function __construct($utilisateur) {
		$this->utilisateur = $utilisateur;
	}
	
	/*
		Stock les relevés de TDC envoyés par le traceur de ZzzelpScript
	*/
	public static function save_Releves($releves, $proprietaire) {
		$serveur = htmlentities($_GET['serveur']);
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		if(in_array($serveur, Fourmizzz::$serveurs) AND (count($releves['alliances']) > 0 OR count($releves['joueurs']))) {
			$valeurs = '';
			$i = 0;
			foreach($releves['joueurs'] as $joueur) {
				$i++;
				$valeurs .= (($valeurs == '') ? '' : ', ').'(:pseudo_'.$i.', :alliance_'.$i.', :valeur_'.$i.', :date_releve_'.$i.', :origine_'.$i.', :proprietaire_'.$i.', :prive_'.$i.')';
			}
			foreach($releves['alliances'] as $alliance) {
				$TDC_alliance = 0;
				$membres_alliance = 0;
				foreach($alliance['valeurs'] as $joueur) {
					$i++;
					$valeurs .= (($valeurs == '') ? '' : ', ').'(:pseudo_'.$i.', :alliance_'.$i.', :valeur_'.$i.', :date_releve_'.$i.', :origine_'.$i.', :proprietaire_'.$i.', :prive_'.$i.')';
					$TDC_alliance += (int)$joueur['TDC'];
					$membres_alliance ++;
				}
				$request = $bdd->prepare(
					'INSERT INTO alliances_'.$serveur.
					'(alliance, TDC, membres, date_releve, origine, proprietaire) '.
					'VALUES(:alliance, :TDC, :membres, :date_releve, :origine, :proprietaire)'

					);
				$request->bindValue(':alliance', $alliance['alliance'], PDO::PARAM_STR);
				$request->bindValue(':TDC', $TDC_alliance, PDO::PARAM_INT);
				$request->bindValue(':membres', $membres_alliance, PDO::PARAM_INT);
				$request->bindValue(':date_releve', time(), PDO::PARAM_INT);
				$request->bindValue(':origine', 'DA', PDO::PARAM_STR);
				$request->bindValue(':proprietaire', $proprietaire, PDO::PARAM_STR);
				$request->execute();
			}
			$request = $bdd->prepare(
				'INSERT INTO TDC_'.$serveur.' '.
				'(pseudo, alliance, valeur, date_releve, origine, proprietaire, prive) '.
				'VALUES'.$valeurs
			);
			$i = 0;
			foreach($releves['joueurs'] as $joueur) {
				$i++;
				$request->bindValue(':pseudo_'.$i, $joueur['pseudo'], PDO::PARAM_STR);
				$request->bindValue(':valeur_'.$i, $joueur['TDC'], PDO::PARAM_INT);
				$request->bindValue(':alliance_'.$i, $joueur['alliance'], PDO::PARAM_STR);
				$request->bindValue(':date_releve_'.$i, time(), PDO::PARAM_INT);
				$request->bindValue(':origine_'.$i, 'PJ', PDO::PARAM_STR);
				$request->bindValue(':proprietaire_'.$i, $proprietaire, PDO::PARAM_STR);
				$request->bindValue(':prive_'.$i, 0, PDO::PARAM_INT);
			}
			foreach($releves['alliances'] as $alliance) {
				$TDC_alliance = 0;
				$membres_alliance = 0;
				foreach($alliance['valeurs'] as $joueur) {
					$i++;
					$request->bindValue(':pseudo_'.$i, $joueur['pseudo'], PDO::PARAM_STR);
					$request->bindValue(':valeur_'.$i, $joueur['TDC'], PDO::PARAM_INT);
					$request->bindValue(':alliance_'.$i, $alliance['alliance'], PDO::PARAM_STR);
					$request->bindValue(':date_releve_'.$i, time(), PDO::PARAM_INT);
					$request->bindValue(':origine_'.$i, 'DA', PDO::PARAM_STR);
					$request->bindValue(':proprietaire_'.$i, $proprietaire, PDO::PARAM_STR);
					$request->bindValue(':prive_'.$i, 0, PDO::PARAM_INT);				
				}
			}
			$request->execute();
		}
	}

	public function surveillance_Joueurs() {
		
	}

	public function get_Data() {
		$this->set_Options();
		if($this->mode == 'correspondances') {
			return $this->get_Correspondances();
		}
		elseif($this->mode == 'variations') {
			return $this->get_Variations();
		}
		elseif($this->mode == 'joueurs') {
			return $this->get_DataJoueur();
		}
		elseif($this->mode == 'alliances') {
			return $this->get_DataAlliance();
		}
		elseif($this->mode == 'detail_correspondances') {
			return $this->getDetailsCorrespondance();
		}
		elseif($this->mode == 'compatible_variations') {
			return $this->getCompatibleVariations();
		}
	}

	public function set_Options() {
		$this->mode = htmlentities($_GET['mode']);
		$this->droits_alliance = $this->get_AlliancesAccessibles();
		$this->utilisateur->get_RightsZzzelp();
		if(in_array($this->mode, $this->modes)) {
			$this->debut = htmlentities($_GET['debut']);
			$this->fin = htmlentities($_GET['fin']);
			if($_GET['manuel'] == 1) {
				$this->alliances = explode(',', $_GET['alliances']);
				$this->joueurs = explode(',', $_GET['joueurs']);
				$this->joueur = htmlentities($_GET['joueur']);
				$this->alliance = htmlentities($_GET['alliance']);
				$this->valeur_min = (int)str_replace(' ', '', htmlentities($_GET['valeur_min']));
				$this->valeur_max = (int)str_replace(' ', '', htmlentities($_GET['valeur_max']));
				$this->alliances_diff = ($_GET['alliances_diff'] == '1');
				$this->variations_inconnues = ($_GET['variations_inconnues'] == '1');	
			}
			else {
				$this->alliances = array();
				$this->joueurs = array();
				$this->joueur = '';
				$this->alliance = '';
				$this->valeur_min = 0;
				$this->valeur_max = 100000000000;
				$this->alliances_diff = false;
				$this->variations_inconnues = false;			
			}
		}
		elseif($this->mode == 'detail_correspondances') {
			$this->ID = htmlentities($_GET['ID']);
		}
	}

	private function get_Correspondances() {
		$this->droits_alliance = $this->get_AlliancesAccessibles();
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$request = $bdd->prepare(
			'SELECT * FROM correspondances_'.$this->utilisateur->serveur.' WHERE '.
			'date_mini >= :debut AND date_maxi <= :fin '.
		  	$this->create_SubRequete_Correspondances().
		 	($this->alliances_diff ? ' AND alliance_att != alliance_def' : '').
		 	(!is_nan($this->valeur_min) ? ' AND valeur >= :valeur_min' : '').
		  	(($this->valeur_max > 0) ? ' AND valeur <= :valeur_max' : '').' '.
		  	'ORDER BY date_mini DESC'
		);
		$request->bindValue(':debut', $this->debut, PDO::PARAM_INT);
		$request->bindValue(':fin', $this->fin, PDO::PARAM_INT);
		if(!is_nan($this->valeur_min)) {
			$request->bindValue(':valeur_min', $this->valeur_min);
		}
		if($this->valeur_max > 0) {
			$request->bindValue(':valeur_max', $this->valeur_max);
		}
		$request = $this->bind_SubRequete_Correspondances($request);
		$request->execute();
		$resultats = $request->fetchAll(PDO::FETCH_ASSOC);
		$accessibles = array();
		foreach($resultats as $resultat) {
			$acces = json_decode($resultat['acces'], true);
			foreach($this->droits_alliance as $alliance) {
				if(in_array($alliance, $acces)) {
					$accessibles[] = $resultat;
				}
			}
		}	
		return $accessibles;
	}

	public function get_Variations() {
		$this->droits_alliance = $this->get_AlliancesAccessibles();
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$this->variations_brutes = array();
		$fini = false;
		$n = 0;
		while(!$fini AND $n<5) {
			$request = $bdd->prepare(
				'SELECT * FROM variations_inconnues_'.$this->utilisateur->serveur.' WHERE '.
				'date_mini >= :debut AND date_maxi <= :fin '.
				$this->create_SubRequete_Variations().
				($this->variations_inconnues ? ' AND resolu = 0' : '').
				(!is_nan($this->valeur_min) ? ' AND abs(valeur_avant-valeur_apres) >= :valeur_min' : '').
				(($this->valeur_max > 0) ? ' AND abs(valeur_avant-valeur_apres) <= :valeur_max' : '').
				' ORDER BY date_mini DESC LIMIT '.($n*100).', 10000'
			);
			$request->bindValue(':debut', $this->debut, PDO::PARAM_INT);
			$request->bindValue(':fin', $this->fin, PDO::PARAM_INT);
			if(!is_nan($this->valeur_min)) {
				$request->bindValue(':valeur_min', $this->valeur_min);
			}
			if($this->valeur_max > 0) {
				$request->bindValue(':valeur_max', $this->valeur_max);
			}
			$request = $this->bind_SubRequete_Variations($request);
			$request->execute();
			$resultats = $request->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $resultat) {
				$acces = json_decode($resultat['acces'], true);
				foreach($this->droits_alliance as $alliance) {
					if(in_array($alliance, $acces)) {
						$this->variations_brutes[] = $resultat;
					}
				}
			}
			if(count($resultats) == 0) {
				$fini = true;
			}
			$n++;
		}
		return $this->variations_brutes;
	}


	function get_DataJoueur() {
		$this->alliances = array();
		$this->joueurs = explode(',', $this->joueur);
		$valeurs = array(
			'correspondances' 	=> $this->get_Correspondances(), 
			'variations' 		=> $this->get_Variations(), 
			'pseudo' 			=> $this->joueur
		);
		if($this->utilisateur->droitsZzzelp > 0) {
			$valeurs['releves'] = $this->get_RelevesJoueur();
			if(count($this->joueurs) == 1) {
				$valeurs['habitudes'] = $this->get_HabitudesJoueur();
			}
		}
		return $valeurs;
	}

	function get_AlliancesAccessibles() {
		$this->utilisateur->getAlliances_activated();
		$alliances = array();
		foreach($this->utilisateur->alliances_activated as $alliance) {
			$alliances[] = $alliance->alliance;
		}
		return $alliances;
	}

	function get_DataAlliance() {
		if($this->alliance == '') {
			$valeurs = array(
				'correspondances' 	=> array(), 
				'variations' 		=> array(), 
				'alliance' 			=> ''
			);
		}
		else {
			$this->alliances = explode(',', $this->alliance);
			$this->joueurs = array();
			$valeurs = array(
				'correspondances' 	=> $this->get_Correspondances(), 
				'variations' 		=> $this->get_Variations(), 
				'alliance' 			=> $this->alliance
			);
		}
		if($this->utilisateur->droitsZzzelp > 0) {
			$valeurs['releves'] = $this->get_RelevesAlliance();
		}
		return $valeurs;
	}

	private function get_RelevesJoueur() {
		$releves = array();
		$pseudos = array();
		$min = 100000000000000;
		$max = 0;
		for($i=count($this->variations_brutes)-1;$i>=0;$i--) {
			$variation = $this->variations_brutes[$i];
			if(!array_key_exists($variation['pseudo'], $pseudos)) {
				$pseudos[$variation['pseudo']] = count($pseudos);
				$releves[] = array(
					'name' => $variation['pseudo'],
					'data' => array(array(
						$this->debut*1000,
						(int)$variation['valeur_avant']
					)),
					'step' => true
				);
				if($min > (int)$variation['valeur_avant']) {
					$min = (int)$variation['valeur_avant'];
				}
				elseif($max < (int)$variation['valeur_avant']) {
					$max = (int)$variation['valeur_avant'];
				}
			}
			$releves[$pseudos[$variation['pseudo']]]['data'][] = array(
				(int)$variation['date_mini']*1000,
				(int)$variation['valeur_apres']
			);
			if($min > (int)$variation['valeur_apres']) {
				$min = (int)$variation['valeur_apres'];
			}
			elseif($max < (int)$variation['valeur_apres']) {
				$max = (int)$variation['valeur_apres'];
			}
		}
		foreach($pseudos as $pseudo => $i) {
			$releves[$i]['data'][] = array(
				$this->fin*1000,
				(int)$releves[$i]['data'][count($releves[$i]['data'])-1][1]
			);
		}
		return array(
			'content' 	=> $releves,
			'min' 		=> $min,
			'max'		=> $max
		);
	}

	private function get_RelevesAlliance() {
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$releves = array();
		$TAGs = array();
		$min = 100000000000000;
		$max = 0;
		$request = $bdd->prepare(
			'SELECT * FROM alliances_'.$this->utilisateur->serveur.' WHERE '.
			'date_releve >= :debut AND date_releve <= :fin '.
			$this->create_SubRequete_Alliance().' '.
			'ORDER BY date_releve ASC'
		);
		$request->bindValue(':debut', $this->debut, PDO::PARAM_INT);
		$request->bindValue(':fin', $this->fin, PDO::PARAM_INT);
		$request = $this->bindSubrequestAlliance($request);
		$request->execute();
		$resultats = $request->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $releve) {
			if(!array_key_exists($releve['alliance'], $TAGs)) {
				$TAGs[$releve['alliance']] = count($TAGs);
				$releves[] = array(
					'name' => $releve['alliance'],
					'data' => array(array(
						$this->debut*1000,
						(int)$releve['TDC']
					)),
					'step' => true
				);
			}
			$releves[$TAGs[$releve['alliance']]]['data'][] = array(
				(int)$releve['date_releve']*1000,
				(int)$releve['TDC']
			);
			if($min > (int)$releve['TDC']) {
				$min = (int)$releve['TDC'];
			}
			elseif($max < (int)$releve['TDC']) {
				$max = (int)$releve['TDC'];
			}
		}
		foreach($TAGs as $TAG => $i) {
			$releves[$i]['data'][] = array(
				$this->fin*1000,
				(int)$releves[$i]['data'][count($releves[$i]['data'])-1][1]
			);
		}
		return array(
			'content' 	=> $releves,
			'min' 		=> $min,
			'max'		=> $max
		);



		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$releves = array();
		$request = $bdd->prepare(
			'SELECT * FROM alliances_'.$this->utilisateur->serveur.' WHERE '.
			'alliance = :alliance AND date_releve >= :debut AND date_releve <= :fin '.
			'ORDER BY date_releve ASC'
		);
		$request->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$request->bindValue(':debut', $this->debut, PDO::PARAM_INT);
		$request->bindValue(':fin', $this->fin, PDO::PARAM_INT);
		$request->execute();
		$resultats = $request->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $releve) {
			$releves[] = array((int)$releve['date_releve']*1000,(int)$releve['TDC']);
		}
		return $releves;
	}

	private function get_HabitudesJoueur() {
		$horaires = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		foreach($this->variations_brutes as $releve) {
			if($releve['valeur_apres'] > $releve['valeur_avant'] AND (int)$releve['date_maxi'] - (int)$releve['date_mini'] < 1800) {
				$horaires[(int)date('H', (int)(((int)$releve['date_maxi'] + (int)$releve['date_mini'])/2))]++;
			}
		}
		return $horaires;
	}

	public function getDetailsCorrespondance() {
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$request = $bdd->prepare('SELECT * FROM correspondances_'.$this->utilisateur->serveur.' WHERE ID = :ID');
		$request->bindValue(':ID', $this->ID, PDO::PARAM_INT);
		$request->execute();
		return $request->fetch(PDO::FETCH_ASSOC);
	}

	public function getCompatibleVariations() {
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$request = $bdd->prepare(
			'SELECT * FROM variations_inconnues_'.$this->utilisateur->serveur.' WHERE '.
			'valeur_avant > :valeur_min AND valeur_apres > :valeur_min AND '.
			'valeur_avant < :valeur_max AND valeur_apres < :valeur_max AND '.
			'date_maxi > :date_mini AND date_mini < :date_maxi AND '.
			'SIGN(valeur_apres-valeur_avant) = :signe AND resolu = 0'
		);
		$request->bindValue(':valeur_min', htmlentities($_GET['valeur_min']), PDO::PARAM_INT);
		$request->bindValue(':valeur_max', htmlentities($_GET['valeur_max']), PDO::PARAM_INT);
		$request->bindValue(':date_mini', htmlentities($_GET['date_mini']), PDO::PARAM_INT);
		$request->bindValue(':date_maxi', htmlentities($_GET['date_maxi']), PDO::PARAM_INT);
		$request->bindValue(':signe', htmlentities($_GET['signe']), PDO::PARAM_INT);
		$request->execute();

		return $request->fetchAll(PDO::FETCH_ASSOC);
	}

	/*
		Création des sous requêtes
	*/

	private function create_SubRequete_Correspondances() {
		$request = '';
		$i = 0;
		foreach($this->alliances as $alliance) {
			if($alliance != '') {
				$i++;
				$request .= (($request == '') ? '' : ' OR ').'alliance_att = :alliance_att_'.$i.' OR alliance_def = :alliance_def_'.$i;
			}
		}
		$i=0;
		foreach($this->joueurs as $joueur) {
			if($joueur != '') {
				$i++;
				$request .= (($request == '') ? '' : ' OR ').'attaquant = :attaquant_'.$i.' OR cible = :cible_'.$i;
			}
		}
		return (($request == '') ? '' : ('AND ('.$request.')'));
	}

	private function bind_SubRequete_Correspondances($request) {
		$i=0;
		foreach($this->alliances as $alliance) {
			if($alliance != '') {
				$i++;
				$request->bindValue(':alliance_att_'.$i, $alliance, PDO::PARAM_STR);
				$request->bindValue(':alliance_def_'.$i, $alliance, PDO::PARAM_STR);
			}
		}
		$i=0;
		foreach($this->joueurs as $joueur) {
			if($joueur != '') {
				$i++;
				$request->bindValue(':attaquant_'.$i, $joueur, PDO::PARAM_STR);
				$request->bindValue(':cible_'.$i, $joueur, PDO::PARAM_STR);
			}
		}
		return $request;
	}

	private function create_SubRequete_Variations() {
		$request = '';
		$i=0;
		foreach($this->alliances as $alliance) {
			if($alliance != '') {
				$i++;
				$request .= (($request == '') ? '' : ' OR ').'alliance = :alliance_'.$i;
			}
		}
		$i=0;
		foreach($this->joueurs as $joueur) {
			if($joueur != '') {
				$i++;
				$request .= (($request == '') ? '' : ' OR ').'pseudo = :pseudo_'.$i;
			}
		}
		return (($request == '') ? '' : ('AND ('.$request.')'));		
	}

	private function bind_SubRequete_Variations($request) {
		$i=0;
		foreach($this->alliances as $alliance) {
			if($alliance != '') {
				$i++;
				$request->bindValue(':alliance_'.$i, $alliance, PDO::PARAM_STR);
			}
		}
		$i=0;
		foreach($this->joueurs as $joueur) {
			if($joueur != '') {
				$i++;
				$request->bindValue(':pseudo_'.$i, $joueur, PDO::PARAM_STR);
			}
		}
		return $request;
	}

	private function create_SubRequete_Alliance() {
		$request = '';
		$i=0;
		foreach($this->alliances as $alliance) {
			if($alliance != '') {
				$i++;
				$request .= (($request == '') ? '' : ' OR ').'alliance = :alliance_'.$i;
			}
		}
		return (($request == '') ? '' : ('AND ('.$request.')'));				
	}

	private function bindSubrequestAlliance($request) {
		$i=0;
		foreach($this->alliances as $alliance) {
			if($alliance != '') {
				$i++;
				$request->bindValue(':alliance_'.$i, $alliance, PDO::PARAM_STR);
			}
		}
		return $request;		
	}








	/*
		ANALYSE DES VARIATIONS : DETECTION DE LA CHAINE
	*/

	public function analyse_Chaine() {
		$this->debut = htmlentities($_GET['debut']);
		$this->fin = htmlentities($_GET['fin']);
		$this->alliance = htmlentities($_GET['alliance']);
		$this->pivotements = array();
		$bdd = Zzzelp::Connexion_BDD('Traceur');

		$statistiques = array(
			'couples' => array(),
			'joueurs' => array(),
			'TDC' => array(),
			'floods' => array(),
			'chasses' => array()
		);

		/*
			Récupération des TDC des joueurs
		*/
		$request = $bdd->prepare(
			'SELECT pseudo, valeur FROM TDC_'.$this->utilisateur->serveur.' WHERE '.
			'alliance = :alliance AND date_releve > :debut AND date_releve < :fin '.
			'GROUP BY pseudo'
		);
		$request->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$request->bindValue(':debut', $this->debut, PDO::PARAM_INT);
		$request->bindValue(':fin', $this->fin, PDO::PARAM_INT);		
		$request->execute();
		while($releve = $request->fetch(PDO::FETCH_ASSOC)) {
			$statistiques['TDC'][$releve['pseudo']] = $releve['valeur'];
		}



		$this->chaine = array();

		$request = $bdd->prepare(
			'SELECT * FROM correspondances_'.$this->utilisateur->serveur.' WHERE '.
			'(alliance_att = :alliance AND (alliance_def = :alliance OR cible = "")) '.
			'AND date_mini > :debut AND date_maxi < :fin AND mode < 2 '.
			'ORDER BY date_mini DESC'
		);
		$request->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$request->bindValue(':debut', $this->debut, PDO::PARAM_INT);
		$request->bindValue(':fin', $this->fin, PDO::PARAM_INT);
		$request->execute();
		while($flood = $request->fetch(PDO::FETCH_ASSOC)) {
			if($flood['cible'] != '') {
				$duo = $flood['attaquant'].'/'.$flood['cible'];
				if(array_key_exists($flood['attaquant'], $statistiques['joueurs'])) {
					$statistiques['joueurs'][$flood['attaquant']]['floods'][] = $flood['valeur'];
					$statistiques['joueurs'][$flood['attaquant']]['nombre']++;
				}
				else {
					$statistiques['joueurs'][$flood['attaquant']] = array('floods' => array($flood['valeur']), 'total' => 1);
					$statistiques['floods'][$flood['attaquant']] = array();
				}
				if(!array_key_exists($flood['cible'], $statistiques['joueurs'])) {
					$statistiques['joueurs'][$flood['cible']] = array('floods' => array(), 'total' => 0);
				}
				if(array_key_exists($duo, $statistiques['couples'])) {
					$statistiques['floods'][$flood['attaquant']][$flood['cible']] ++;
					$statistiques['couples'][$duo] ++;
				}
				else {
					$statistiques['floods'][$flood['attaquant']][$flood['cible']] = 1;
					$statistiques['couples'][$duo] = 1;
				}
			}
			elseif(array_key_exists($flood['attaquant'], $statistiques['joueurs'])) {
				$statistiques['chasses'][$flood['attaquant']] += $flood['valeur'];
			}
			else {
				$statistiques['chasses'][$flood['attaquant']] = $flood['valeur'];
			}
		}
		arsort($statistiques['couples']);
		arsort($statistiques['TDC']);

		foreach($statistiques['TDC'] as $joueur => $TDC) {
			$this->chaine[] = $joueur;
 		}
 		foreach($statistiques['joueurs'] as $joueur => $valeurs) {
 			$statistiques['joueurs'][$joueur]['mediane'] = Tableau::median($valeurs['floods']);
 		}
 		$statistiques['joueurs'] = Tableau::key_sort($statistiques['joueurs'], 'mediane', true);
 		//var_dump($statistiques['joueurs']);

 		foreach($this->chaine as $joueur) {
			//echo $joueur.'	'.Nombre::Espaces($statistiques['TDC'][$joueur]).'<br>';
		}
 		$this->sort_Chaine($statistiques, 0);
 		//$this->chaine = $this->sort_Chaine2($statistiques, $this->chaine);
	}



	public function sort_Chaine($statistiques, $n) {
		if($n < 1000) {
			$modif = false;
	 		foreach($statistiques['couples'] as $couple => $valeur) {
	 			$couple = explode('/', $couple);
	 			$index_att = array_search($couple[0], $this->chaine);
	 			$index_def = array_search($couple[1], $this->chaine);
	 			if(!isset($statistiques['couples'][$couple[1].'/'.$couple[0]])) {
	 				$statistiques['couples'][$couple[1].'/'.$couple[0]] = 0;
	 			}
	 			if($index_att > $index_def AND (!isset($this->pivotements[$couple[0]]) OR $this->pivotements[$couple[0]] < count($chaine))) { // Placement étrange
	 				if($statistiques['couples'][$couple[1].'/'.$couple[0]] < 3 AND $statistiques['couples'][$couple[1].'/'.$couple[0]] + 1 < $valeur) { // Pas de floods bilatéraux
		 				var_dump($couple);
		 				echo $valeur.'	'.$statistiques['couples'][$couple[1].'/'.$couple[0]];
						$sous_chaine = array_splice($this->chaine, $index_att, 1);
						array_splice($this->chaine, $index_def, 0, $sous_chaine);
						$this->pivotements[] = $couple[1].'/'.$couple[0];
						$modif = true;
		 				break;
		 			}
	 			}
	 		}
	 		if($modif) {
				echo '<br><br>';
				if($n%50 == 0) {
			    	foreach($this->chaine as $joueur) {
			    		echo $joueur.'	'.Nombre::Espaces($statistiques['TDC'][$joueur]).'<br>';
			    	}
		 		}
		 		$this->sort_Chaine($statistiques, $n+1);
	 		}
	 		else {
	 			echo 'FINI !<br>';
			   	foreach($this->chaine as $joueur) {
			    	echo $joueur.'	'.Nombre::Espaces($statistiques['TDC'][$joueur]).'<br>';
			    }
	 		}
	 	}
	}

	public function sort_Chaine2($statistiques, $chaine) {
		if(count($chaine) < 2) {
			return $chaine;
		}
		$left = $right = array();
		reset($chaine);
		$pivot_key = key($chaine);
		$pivot = array_shift($chaine);
		foreach($chaine as $k => $v) {
			if($this->compare_PositionJoueurs($statistiques, $v, $pivot)) {
				$left[$k] = $v;
			}
			else {
				$right[$k] = $v;
    		}
		}
		return array_merge($this->sort_Chaine2($statistiques, $left), array($pivot_key => $pivot), $this->sort_Chaine2($statistiques, $right));
	}

	public function compare_PositionJoueurs($statistiques, $J1, $J2) {
		if($statistiques['couples'][$J2.'/'.$J3] < 3) {
			if($statistiques['couples'][$J1.'/'.$J2] > $statistiques['couples'][$J2.'/'.$J1] + 1) {
				return true;
			}
		}
		return false;
	}










	/*
		TACHE CRON
	*/

	public function load_Cron() {
		foreach(array('s1', 's2', 's3', 's4', 'test') as $serveur) {
		//foreach(array('s2') as $serveur) {
			echo '<br>'.$serveur.' : <br>';
			$periode = array('debut' => time()-(15*60)-5, 'fin' => time());
			$this->cron_LoadVariations($serveur, $periode);
			$this->cron_ComputeCorrespondances($serveur, $periode);
		}
	}

	private function flood_possible($TDC_a1, $TDC_a2, $TDC_b1, $TDC_b2) {
		return (($TDC_a1 <= 2*$TDC_b1 AND $TDC_b1 <= $TDC_a1*3) OR ($TDC_a1 <= 2*$TDC_b2 AND $TDC_b2 <= $TDC_a1*3) OR ($TDC_a2 <= 2*$TDC_b1 AND $TDC_b1 <= $TDC_a2*3) OR ($TDC_a2 <= 2*$TDC_b2 AND $TDC_b2 <= $TDC_a2*3));
	}



	/*
	 * RECUPERATION DES VARIATIONS DE TDC
	*/
	private function cron_LoadVariations($serveur, $periode) {
		$variations = $this->cron_GetVariations($serveur, $periode);
		$this->cron_SaveVariations($variations, $serveur);
	}

	private function cron_GetVariations($serveur, $periode) {
		$variations = array();
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$initial = array();
		$pseudos = array();
		$request = $bdd->prepare('SELECT pseudo, alliance, valeur, origine, date_releve FROM TDC_'.$serveur.' WHERE date_releve <= :fin AND date_releve >= :debut ORDER BY date_releve DESC');
		$request->bindValue(':fin', $periode['debut'], PDO::PARAM_INT);
		$request->bindValue(':debut', ($periode['debut'] - 3600*12), PDO::PARAM_INT);
		$request->execute();
		while($resultat = $request->fetch(PDO::FETCH_ASSOC)) {
			if(!in_array(strtolower($resultat['pseudo']), $pseudos)) {
				$pseudos[] = strtolower($resultat['pseudo']);
				$initial[$resultat['pseudo']] = array(
													'pseudo' => $resultat['pseudo'], 
													'alliance' => $resultat['alliance'], 
													'valeur' => $resultat['valeur'], 
													'date_releve' => $resultat['date_releve'], 
													'origine' => $resultat['origine']
												);
			}
		}

		$request = $bdd->prepare('SELECT pseudo, alliance, valeur, origine, date_releve FROM TDC_'.$serveur.' WHERE date_releve > :debut AND date_releve < :fin ORDER BY pseudo, date_releve ASC');
		$request->bindValue(':debut', $periode['debut'], PDO::PARAM_INT);
		$request->bindValue(':fin', $periode['fin'], PDO::PARAM_INT);
		$request->execute();
		while($resultat = $request->fetch(PDO::FETCH_ASSOC)) {
			if(isset($ex_valeur) AND $ex_valeur['pseudo'] != $resultat['pseudo']) {
				unset($ex_valeur);
			}
			if(!isset($ex_valeur)) {
				if(array_key_exists($resultat['pseudo'],$initial)) {
					$ex_valeur = array(
									'pseudo' => $resultat['pseudo'], 
									'alliance' => $initial[$resultat['pseudo']]['alliance'], 
									'valeur' => $initial[$resultat['pseudo']]['valeur'], 
									'date_releve' => $initial[$resultat['pseudo']]['date_releve']
								);
				}
				else {
					$ex_valeur = array(
									'pseudo' => $resultat['pseudo'], 
									'alliance' => $resultat['alliance'], 
									'valeur' => $resultat['valeur'], 
									'date_releve' => $resultat['date_releve']
								);
				}
			}
			if($ex_valeur['valeur'] != $resultat['valeur']) {
				$variations[] = array(
									'pseudo' => $resultat['pseudo'], 
									'alliance' => $resultat['alliance'], 
									'valeur_avant' => $ex_valeur['valeur'], 
									'valeur_apres' => $resultat['valeur'], 
									'date_avant' => $ex_valeur['date_releve'], 
									'date_apres' => $resultat['date_releve']
								);
			}
			$ex_valeur['valeur'] = $resultat['valeur'];
			$ex_valeur['date_releve'] = $resultat['date_releve'];
			
		}
		return $variations;
	}

	private function cron_SaveVariations($variations, $serveur) {
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		foreach($variations as $variation) {
			$request = $bdd->prepare('SELECT COUNT(*) FROM variations_inconnues_'.$serveur.' WHERE pseudo = :pseudo AND date_mini = :date_mini AND date_maxi = :date_maxi');
			$request->bindValue(':pseudo', $variation['pseudo'], PDO::PARAM_STR);
			$request->bindValue(':date_mini', $variation['date_avant'], PDO::PARAM_INT);
			$request->bindValue(':date_maxi', $variation['date_apres'], PDO::PARAM_INT);
			$request->execute();
			$res = $request->fetch(PDO::FETCH_NUM);
			if($res[0] == 0) {
				$request = $bdd->prepare('INSERT INTO variations_inconnues_'.$serveur.'(pseudo, alliance, date_mini, date_maxi, valeur_avant, valeur_apres, acces) 
							VALUES(:pseudo, :alliance, :date_mini, :date_maxi, :valeur_avant, :valeur_apres, :acces)');
				$request->bindValue(':pseudo', $variation['pseudo'], PDO::PARAM_STR);
				$request->bindValue(':alliance', $variation['alliance'], PDO::PARAM_STR);
				$request->bindValue(':date_mini', $variation['date_avant'], PDO::PARAM_INT);
				$request->bindValue(':date_maxi', $variation['date_apres'], PDO::PARAM_INT);
				$request->bindValue(':valeur_avant', $variation['valeur_avant'], PDO::PARAM_INT);
				$request->bindValue(':valeur_apres', $variation['valeur_apres'], PDO::PARAM_INT);
				$request->bindValue(':acces', json_encode($this->get_RelevesProches($variation, $serveur)), PDO::PARAM_STR);
				$request->execute();
			}
		}
	}

	public function get_RelevesProches($variation, $serveur) {
		$alliances = array();
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$request = $bdd->prepare('SELECT proprietaire FROM TDC_'.$serveur.' WHERE pseudo = :pseudo AND (ABS(date_releve - :date_mini) < :ecart_max OR ABS(date_releve - :date_maxi) < :ecart_max)');
		$request->bindValue(':pseudo', $variation['pseudo'], PDO::PARAM_STR);
		$request->bindValue(':date_mini', $variation['date_avant'], PDO::PARAM_INT);
		$request->bindValue(':date_maxi', $variation['date_apres'], PDO::PARAM_INT);
		$request->bindValue(':ecart_max', 3600, PDO::PARAM_INT);
		$request->execute();
		$resultats = $request->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {
			if($resultat['proprietaire'] != '' AND !in_array($resultat['proprietaire'], $alliances)) {
				$alliances[] = $resultat['proprietaire'];
			}
		}
		return $alliances;
	}



	/*
	 * RECHERCHE DES CORRESPONDANCES
	*/
	private function cron_ComputeCorrespondances($serveur, $periode) {
		$variations = $this->cron_GetCorrespondances($serveur, $periode);
		$this->cron_FindCorrespondances($serveur, $variations);
	}

	private function cron_GetCorrespondances($serveur, $periode) {
		$variations = array();
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$request = $bdd->prepare('SELECT * FROM variations_inconnues_'.$serveur.' WHERE date_maxi > :debut AND resolu = 0');
		$request->bindValue(':debut', $periode['debut'], PDO::PARAM_INT);
		$request->execute();
		$resultats = $request->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {
			$variations[] = array(
								'ID' => $resultat['ID'], 
								'pseudo' => $resultat['pseudo'], 
								'alliance' => $resultat['alliance'], 
								'date_mini' => $resultat['date_mini'], 
								'date_maxi' => $resultat['date_maxi'], 
								'valeur_avant' => $resultat['valeur_avant'], 
								'valeur_apres' => $resultat['valeur_apres']
							);
		}
		return $variations;
	}

	private function cron_FindCorrespondances($serveur, $variations) {
		$paires = array();
		$floods = array();
		$variations = Tableau::key_sort($variations, 'date_mini');
		echo 'Nombre initiale de variations : '.count($variations).'<br>';
		
		/* RECHERCHE DES CHASSES */
		foreach($variations as $i => $var) {
			if($var['valeur_apres']/$var['valeur_avant'] > 20 AND $var['date_maxi'] - $var['date_mini'] < 3600*6) {
				$this->cron_SaveCorrespondance($serveur, array(
													'attaquant' => $var['pseudo'], 
													'cible' => '', 
													'alliance_att' => $var['alliance'], 
													'alliance_def' => '', 
													'valeur' => $var['valeur_apres'] - $var['valeur_avant'],
													'valeur_avant_att' => $var['valeur_avant'],
													'valeur_apres_att' => $var['valeur_apres'],
													'valeur_avant_def' => 0,
													'valeur_apres_def' => 0,
													'mode' => 0, 
													'date_mini' => $var['date_mini'], 
													'date_maxi' => $var['date_maxi']));
				$this->cron_DeleteVariation($serveur, $variations[$i]);
				unset($variations[$i]);
			}
		}
		echo 'Nombre de variations hors chasses : '.count($variations).'<br>';
		
		/* RECHERCHE DES FLOODS UNIQUE SUR LA PERIODE DE TEMPS */
		foreach($variations as $i => $var) {
			foreach($variations as $j => $var_2) {
				if($var_2['date_mini'] > $var['date_maxi']) {
					break;
				}
				elseif($var_2['date_maxi'] >= $var['date_mini'] AND $var_2['pseudo'] != $var['pseudo'] AND $this->flood_possible($var['valeur_avant'], $var['valeur_apres'], $var_2['valeur_avant'], $var_2['valeur_apres']) AND ($var['valeur_avant'] - $var['valeur_apres']) == ($var_2['valeur_apres'] - $var_2['valeur_avant'])) {
					if($var['valeur_avant'] > $var['valeur_apres']) {
						$att = $var_2;
						$def = $var;
					}
					else {
						$att = $var;
						$def = $var_2;
					}
					$this->cron_SaveCorrespondance($serveur, array(
														'attaquant' => $att['pseudo'], 
														'cible' => $def['pseudo'], 
														'alliance_att' => $att['alliance'], 
														'alliance_def' => $def['alliance'], 
														'valeur' => abs($var['valeur_avant'] - $var['valeur_apres']), 
														'valeur_avant_att' => $att['valeur_avant'],
														'valeur_apres_att' => $att['valeur_apres'],
														'valeur_avant_def' => $def['valeur_avant'],
														'valeur_apres_def' => $def['valeur_apres'],
														'mode' => 1,
														'date_mini' => max($def['date_mini'], $att['date_mini']), 
														'date_maxi' => min($def['date_maxi'], $att['date_maxi'])));
					$this->cron_DeleteVariation($serveur, $variations[$i]);
					$this->cron_DeleteVariation($serveur, $variations[$j]);
					unset($variations[$i]);
					unset($variations[$j]);
					break;
				}
			}
		}
		echo 'Nombre de variations non uniques : '.count($variations).'<br>';
		
		
		/* RECHERCHE DES JOUEURS FLOODES PLUSIEURS FOIS */
		foreach($variations as $i => $var) {
			$TDC_manquant = 0;
			foreach($variations as $j => $var_2) {
				if($var_2['date_mini'] > $var['date_maxi']) {
					break;
				}
				elseif($var_2['date_maxi'] >= $var['date_mini'] AND $var_2['pseudo'] != $var['pseudo'] AND $this->flood_possible($var['valeur_avant'], $var['valeur_apres'], $var_2['valeur_avant'], $var_2['valeur_apres'])) {
					$TDC_manquant = ($var['valeur_avant'] - $var['valeur_apres']) - ($var_2['valeur_apres'] - $var_2['valeur_avant']);
					foreach($variations as $k => $var_3) {
						if($var_3['date_mini'] > $var['date_maxi']) {
							break;
						}
						elseif($var_3['date_maxi'] >= $var['date_mini'] AND $var_3['pseudo'] != $var['pseudo'] AND $this->flood_possible($var['valeur_avant'], $var['valeur_apres'], $var_3['valeur_avant'], $var_3['valeur_apres']) AND ($TDC_manquant == ($var_3['valeur_apres'] - $var_3['valeur_avant']))) {
							if($var_2['valeur_avant'] > $var_3['valeur_apres']) {
								$att = $var;
								$def = $var_2;
								$var['valeur_avant'] += abs($var2['valeur_avant'] - $var2['valeur_apres']);
							}
							else {
								$att = $var_2;
								$def = $var;
								$var['valeur_avant'] -= abs($var2['valeur_avant'] - $var2['valeur_apres']);
							}
							$this->cron_SaveCorrespondance($serveur, array(
																'attaquant' => $att['pseudo'], 
																'cible' => $def['pseudo'], 
																'alliance_att' => $att['alliance'], 
																'alliance_def' => $def['alliance'], 
																'valeur' => abs($var_2['valeur_avant'] - $var_2['valeur_apres']), 
																'valeur_avant_att' => $att['valeur_avant'],
																'valeur_apres_att' => $att['valeur_apres'],
																'valeur_avant_def' => $def['valeur_avant'],
																'valeur_apres_def' => $def['valeur_apres'],
																'mode' => 2, 
																'date_mini' => max($def['date_mini'], $att['date_mini']), 
																'date_maxi' => min($def['date_maxi'], $att['date_maxi'])));
							if($var_3['valeur_avant'] > $var_3['valeur_apres']) {
								$att = $var;
								$def = $var_3;
							}
							else {
								$att = $var_3;
								$def = $var;
							}
							$this->cron_SaveCorrespondance($serveur, array(
																'attaquant' => $att['pseudo'], 
																'cible' => $def['pseudo'], 
																'alliance_att' => $att['alliance'], 
																'alliance_def' => $def['alliance'], 
																'valeur' => abs($var_3['valeur_avant'] - $var_3['valeur_apres']), 
																'valeur_avant_att' => $att['valeur_avant'],
																'valeur_apres_att' => $att['valeur_apres'],
																'valeur_avant_def' => $def['valeur_avant'],
																'valeur_apres_def' => $def['valeur_apres'],
																'mode' => 2, 
																'date_mini' => max($def['date_mini'], $att['date_mini']), 
																'date_maxi' => min($def['date_maxi'], $att['date_maxi'])));
							$this->cron_DeleteVariation($serveur, $variations[$i]);
							$this->cron_DeleteVariation($serveur, $variations[$j]);
							$this->cron_DeleteVariation($serveur, $variations[$k]);
							unset($variations[$i]);
							unset($variations[$j]);
							unset($variations[$k]);
							break;
						}
					}
				}			
			}
		}
		echo 'Nombre de variations introuvables : '.count($variations).'<br>';
	}

	private function cron_SaveCorrespondance($serveur, $flood) {
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$request = $bdd->prepare('INSERT INTO correspondances_'.$serveur.' 
					(attaquant, cible, alliance_att, alliance_def, date_mini, date_maxi, valeur, TDC_avant_att, TDC_apres_att, TDC_avant_def, TDC_apres_def, mode, acces) VALUES
					(:attaquant, :cible, :alliance_att, :alliance_def, :date_mini, :date_maxi, :valeur, :TDC_avant_att, :TDC_apres_att, :TDC_avant_def, :TDC_apres_def, :mode, :acces)');
		$request->bindValue(':attaquant', $flood['attaquant'], PDO::PARAM_STR);
		$request->bindValue(':cible', $flood['cible'], PDO::PARAM_STR);
		$request->bindValue(':alliance_att', $flood['alliance_att'], PDO::PARAM_STR);
		$request->bindValue(':alliance_def', $flood['alliance_def'], PDO::PARAM_STR);
		$request->bindValue(':date_mini', $flood['date_mini'], PDO::PARAM_INT);
		$request->bindValue(':date_maxi', $flood['date_maxi'], PDO::PARAM_INT);
		$request->bindValue(':valeur', $flood['valeur'], PDO::PARAM_INT);
		$request->bindValue(':TDC_avant_att', $flood['valeur_avant_att'], PDO::PARAM_INT);
		$request->bindValue(':TDC_apres_att', $flood['valeur_apres_att'], PDO::PARAM_INT);
		$request->bindValue(':TDC_avant_def', $flood['valeur_avant_def'], PDO::PARAM_INT);
		$request->bindValue(':TDC_apres_def', $flood['valeur_apres_def'], PDO::PARAM_INT);
		$request->bindValue(':mode', $flood['mode'], PDO::PARAM_INT);
		$request->bindValue(':acces', json_encode($this->get_VariationsProches($serveur, $flood)), PDO::PARAM_STR);
		$request->execute();
	}

	private function cron_DeleteVariation($serveur, $variation) {
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$request = $bdd->prepare('UPDATE variations_inconnues_'.$serveur.' SET resolu = 1 WHERE pseudo = :pseudo AND date_mini = :date_mini AND date_maxi = :date_maxi');
		$request->bindValue(':pseudo', $variation['pseudo'], PDO::PARAM_STR);
		$request->bindValue(':date_mini', $variation['date_mini'], PDO::PARAM_INT);
		$request->bindValue(':date_maxi', $variation['date_maxi'], PDO::PARAM_INT);
		$request->execute();
	}

	public function get_VariationsProches($serveur, $flood) {
		$alliances1 = array();
		$bdd = Zzzelp::Connexion_BDD('Traceur');
		$request = $bdd->prepare('SELECT acces FROM variations_inconnues_'.$serveur.' WHERE pseudo = :pseudo AND (ABS(date_mini - :date_mini) < :ecart_max OR ABS(date_maxi - :date_maxi) < :ecart_max)');
		$request->bindValue(':pseudo', $flood['attaquant'], PDO::PARAM_STR);
		$request->bindValue(':date_mini', $flood['date_mini'], PDO::PARAM_INT);
		$request->bindValue(':date_maxi', $flood['date_maxi'], PDO::PARAM_INT);
		$request->bindValue(':ecart_max', 3600, PDO::PARAM_INT);
		$request->execute();
		$resultats = $request->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {
			$acces = json_decode($resultat['acces'], true);
			foreach($acces as $alliance) {
				if($alliance != '' AND !in_array($alliance, $alliances1)) {
					$alliances1[] = $alliance;
				}
			}
		}

		$alliances2 = array();
		$request = $bdd->prepare('SELECT acces FROM variations_inconnues_'.$serveur.' WHERE pseudo = :pseudo AND (ABS(date_mini - :date_mini) < :ecart_max OR ABS(date_maxi - :date_maxi) < :ecart_max)');
		$request->bindValue(':pseudo', $flood['cible'], PDO::PARAM_STR);
		$request->bindValue(':date_mini', $flood['date_mini'], PDO::PARAM_INT);
		$request->bindValue(':date_maxi', $flood['date_maxi'], PDO::PARAM_INT);
		$request->bindValue(':ecart_max', 3600, PDO::PARAM_INT);
		$request->execute();
		$resultats = $request->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {;
			$acces = json_decode($resultat['acces'], true);
			foreach($acces as $alliance) {
				if($alliance != '' AND !in_array($alliance, $alliances2)) {
					$alliances2[] = $alliance;
				}
			}
		}
		return array_intersect($alliances1, $alliances2);		
	}

}