<?php

class Smileys {

	public $instance;
	public $smileys_temp;
	public $smileys;
	public $ordre;

	public function __construct($instance) {
		$this->instance = $instance;
	}



	/*
		Récupère la liste des smileys (tous pour la page /compte/smileys et ceux activés pour ZzzelpScript)
	*/
	public function get_Smileys($tous) {
		$this->smileys_temp = array();
		$this->smileys = array();

		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM packs_smileys');
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $pack) {
			$this->smileys_temp[$pack['nom']] = array(
											'ID' => $pack['ID'], 
											'createur' => $pack['createur'], 
											'format' => $pack['format'], 
											'liste' => json_decode($pack['smileys'], true),
											'categories' => json_decode($pack['categories'], true),
											'alliances' => json_decode($pack['alliances'], true),
											'joueurs' => json_decode($pack['joueurs'], true),
											'public' => $pack['public'],
											'actif' => false
										);
		}

		$requete = $bdd->prepare('SELECT packs_smileys, ordre_packs FROM membres WHERE pseudo = :pseudo');
		$requete->bindValue(':pseudo', $this->instance->pseudo, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		$this->ordre = array_reverse(json_decode($resultat['ordre_packs'], true),false);

		foreach($this->smileys_temp as $titre => $pack) {
			if($pack['public'] OR $this->check_RightPack($pack)) {
				if(in_array('Z'.$pack['ID'], $this->ordre)) {
					$pack['actif'] = true;
				}
				if($tous || in_array('Z'.$pack['ID'], $this->ordre)) {
					if(!$tous) {
						unset($pack['joueurs']);
						unset($pack['alliances']);
						unset($pack['public']);
						unset($pack['categories']);
					}
					else {
						$pack['alliances_2'] = $this->get_SmileysLimitations($pack['alliances']);
						$pack['joueurs_2'] = $this->get_SmileysLimitations($pack['joueurs']);
					}
					$this->smileys[$titre] = $pack;
				}
			}
		}
	}

	/*
		Vérifie si le pack est bien disponible pour le joueur (si celui-ci est privé)
	*/
	private function check_RightPack($pack) {
		return true;
		if($this->instance->pseudo == $pack['createur']) {
			return true;
		}
		elseif(count($pack['joueurs']) > 0) {
			foreach($this->instance->pseudos as $serveur => $compte) {
				foreach($pack['joueurs'] as $autorises) {
					if($compte['pseudo'] == $autorises['pseudo'] AND $serveur == $autorises['serveur']) {
						return true;
					}
				}
			}
		}
		elseif(count($pack['alliances']) > 0) {
			foreach($this->instance->comptes_fzzz[$serveur]->alliances_activated as $alliance) {
				foreach($pack['alliances'] as $autorises) {
					if($alliance->alliance == $autorises['alliance'] AND $alliance->serveur == $autorises['serveur']) {
						return true;
					}
				}
			}
		}
		return false;
	}

	/*
		Met en page les alliances et pseudos ayant accès à un pack de smileys privés
	*/
	private function get_SmileysLimitations($donnees) {
		if(empty($donnees)) {
			return '';
		}
		$texte = '';
		foreach($donnees as $ligne) {
			$cle = isset($ligne['alliance']) ? 'alliance' : 'pseudo';
			$texte.= (($texte == '') ? '' : ', ').$ligne[$cle].' ('.$ligne['serveur'].')';
		}
		return $texte;
	}

	/*
		Récupère les catégories dans lesquelles les packs de smileys peuvent être classés
	*/
	public function get_Categories() {
		return array(
				array('nom' => 'Tous', 'id' => 'tous'),
				array('nom' => 'Fourmis', 'id' => 'fourmis'),
				array('nom' => 'Classiques', 'id' => 'classique'),
				array('nom' => 'Panneaux', 'id' => 'panneau'),
				array('nom' => 'Animaux', 'id' => 'animaux'),
				array('nom' => 'Violents', 'id' => 'violent'),
				array('nom' => 'Groupes', 'id' => 'groupe'),
				array('nom' => 'Compte +', 'id' => 'compte_plus'),
				array('nom' => 'Packs utilisés', 'id' => 'perso')						
			);		
	}

	/*
		Récupère les smileys C+ pour les afficher sur la page /compte/smileys
	*/
	public function get_SmileysComptePlus() {
		return array(
			'C+ 1' => array(
								'liste' => array('pouce','smile','biggrin','laugh','tongue','bye','cool','interest','angel','smug','nudgewink','blink','unsure','shy','oh','sleep','sad','mad'),
								'actif' => in_array('C1',$this->ordre)
							),
			'C+ 2' => array(
								'liste' => array('ant_pouce','ant_smile','ant_biggrin','ant_laugh','ant_tongue','ant_bye','ant_cool','ant_interest','ant_angel','ant_smug','ant_nudgewink','ant_blink','ant_unsure','ant_shy','ant_oh','ant_sleep','ant_sad','ant_mad','ant_doctor'),
								'actif' => in_array('C2',$this->ordre)
							),
			'C+ 3' => array(
								'liste' => array('doctor','borg','pirate','sick2','asian','dunce','canadian','captain','police','santa','cook','farmer','smurf','gangster','king','king2','pixie','pirate2','pirate3','warrior','card','egypt','fool','hat'),
								'actif' => in_array('C3',$this->ordre)
							),
			'C+ 4' => array(
								'liste' => array('dead','inv','stretcher','blue','sick','love','cupid','diablo','crossbones','fish','cupid2','construction','flower','drinks','burp','rain','surf','baloon','sleep2','rip','scooter','moto'),
								'actif' => in_array('C4',$this->ordre)
							),
			'C+ 5' => array(
								'liste' => array('whip','shades','kiss','boxer','gun','bross','whistling','showoff','noel_vache','app','book','cake','dance','harhar','juggle','worthy','fishing','stereo','music','prison','piece'),
								'actif' => in_array('C5',$this->ordre)
							),
			'C+ 6' => array(
								'liste' => array('noel_etoile','noel_snowman10','noel_cadeau3','noel_vache','santa','noel_pere','noel_santa','noel_bougie','noel_chien2','noel_chapeau','noel_cadeau','noel_sapin3','noel_snowman4','noel_snowman3','noel_chaussette','noel_flocon','noel_snowman5','noel_sapin2','noel_snowman8','noel_bonnet','noel_renne','noel_renne3'),
								'actif' => in_array('C6',$this->ordre)
							),
			'C+ 7' => array(
								'liste' => array('dollar','ninja','bat','whistles','showoff2','barbarian','magi','prof','witch','pirate4','bicycle','scooter2','police2','dragon','panic','dog','plane'),
								'actif' => in_array('C7',$this->ordre)
							)
		);
	}

	/*
		Enregistre les nouveaux packs de smileys activés par l'utilisateur
	*/
	public function save_SmileysParameters() {
		$packs = explode(',',$_POST['ordre_packs']);
		$smileys = array();
		if(count($packs) > 0) {
			foreach($packs as $val) {
				$smileys[] = htmlentities($val);
			}
		}
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('UPDATE membres SET ordre_packs = :ordre WHERE pseudo = :pseudo');
		$requete->bindValue(':ordre', json_encode(array_reverse($smileys,false)), PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->instance->pseudo);
		$requete->execute();
	}


	/*
		Enregistre les paramètres ainsi que les images d'un nouveau pack de smileys
	*/
	public function create_Pack() {
		$noms = array();
		$format = htmlentities($_POST['format']);
		$nom_pack = htmlentities($_POST['nom']);
		$fichiers = $_FILES['smileys'];
		if(count($fichiers) > 0) {
			if(!file_exists('Images/Smileys/'.$nom_pack.'/')) {
				mkdir('Images/Smileys/'.$nom_pack.'/', 0777, true);
				for($i=0; $i<count($fichiers['name']); $i++) {
					if($fichiers['error'][$i] == 0 AND in_array($fichiers['type'][$i], array('image/gif', 'image/png', 'image/jpg')) AND filesize($fichiers['tmp_name'][$i]) <= 100000) {
						preg_match('#([^\/]+).(gif|png|jpg)#', $fichiers['name'][$i], $resultats);
						if($resultats[2] == $format) {
							$noms[] = $resultats[1];
							move_uploaded_file($fichiers['tmp_name'][$i], 'Images/Smileys/'.$nom_pack.'/'.$fichiers['name'][$i]);	
						}
					}
				}
			}
			else {
				echo 'Pris';
			}
		}
		else {
			echo 'Vide';
		}
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('INSERT INTO packs_smileys(nom, createur, format, smileys, categories, alliances, joueurs, public) 
								  VALUES (:nom, :createur, :format, :smileys, :categories, :alliances, :joueurs, :public)');
		$requete->bindValue(':nom', $nom_pack, PDO::PARAM_STR);
		$requete->bindValue(':createur', $this->instance->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':format', $format, PDO::PARAM_STR);
		$requete->bindValue(':smileys', json_encode($noms), PDO::PARAM_STR);
		$requete->bindValue(':categories', json_encode($this->get_CategoriesNewPack()), PDO::PARAM_STR);
		$requete->bindValue(':alliances', $this->create_RestrictionsNewPack($_POST['alliances'], 'alliance'), PDO::PARAM_STR);
		$requete->bindValue(':joueurs', $this->create_RestrictionsNewPack($_POST['joueurs'], 'joueurs'), PDO::PARAM_STR);
		$requete->bindValue(':public', ($_POST['public'] ? 1 : 0), PDO::PARAM_INT);
		$requete->execute();

	}

	/*
		Met à jour les paramètres ainsi que les images d'un pack déjà existant
	*/
	public function update_Pack() {
		$ID = htmlentities($_POST['ID']);
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT nom, format, smileys FROM packs_smileys WHERE ID = :ID AND createur = :createur');
		$requete->bindValue(':createur', $this->instance->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':ID', $ID, PDO::PARAM_INT);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		if(!empty($resultat)) {
			$actuels = json_decode($resultat['smileys']);
			$a_stocker = array();
			$anciens = $_POST['anciens'];
			$fichiers = $_FILES['smileys'];
			$format = $resultat['format'];
			$nom_pack = $resultat['nom'];
			foreach($actuels as $smiley) {
				if(in_array($smiley, $anciens)) {
					$a_stocker[] = $smiley;
				}
				else {
					unlink('Images/Smileys/'.$resultat['nom'].'/'.$smiley.'.'.$resultat['format']);
				}
			}
			if(count($fichiers) > 0) {
				for($i=0; $i<count($fichiers['name']); $i++) {
					if($fichiers['error'][$i] == 0 AND in_array($fichiers['type'][$i], array('image/gif', 'image/png', 'image/jpg')) AND filesize($fichiers['tmp_name'][$i]) <= 100000) {
						preg_match('#([^\/]+).(gif|png|jpg)#', $fichiers['name'][$i], $resultats);
						echo '\nOK\n';
						if($resultats[2] == $format) {
							$a_stocker[] = $resultats[1];
							move_uploaded_file($fichiers['tmp_name'][$i], 'Images/Smileys/'.$nom_pack.'/'.$fichiers['name'][$i]);	
						}
					}
				}
			}
			$requete = $bdd->prepare('UPDATE packs_smileys SET smileys = :smileys, alliances = :alliances, joueurs = :joueurs, public = :public, categories = :categories WHERE ID = :ID');
			$requete->bindValue(':smileys', json_encode($a_stocker), PDO::PARAM_STR);
			$requete->bindValue(':categories', json_encode($this->get_CategoriesNewPack()), PDO::PARAM_STR);
			$requete->bindValue(':alliances', $this->create_RestrictionsNewPack($_POST['alliances'], 'alliance'), PDO::PARAM_STR);
			$requete->bindValue(':joueurs', $this->create_RestrictionsNewPack($_POST['joueurs'], 'joueurs'), PDO::PARAM_STR);
			$requete->bindValue(':public', ($_POST['public'] ? 1 : 0), PDO::PARAM_INT);			
			$requete->bindValue(':ID', $ID, PDO::PARAM_INT);			
			$requete->execute();
			
		}
		else {
			return 'Echec';
		}
	}

	/*
		Récupère les catégories du pack
	*/
	public function get_CategoriesNewPack() {
		$categories = array();
		$valeurs = $_POST['categories'];
		foreach($valeurs as $val) {
			$categories[] = htmlentities($val);
		}
		return $categories;
	}

	/*
		Met sous forme d'objet les restrictions en joueurs / alliances du pack
	*/
	public function create_RestrictionsNewPack($donnees, $cle) {
		$valeurs = array();
		$donnees = explode(',', $donnees);
		foreach($donnees as $ligne) {
			if (preg_match('#(.*) \((.*)\)#', $ligne, $resultats)) {
				$valeurs[] = array('serveur' => htmlentities($resultats[1]), $cle => htmlentities($resultats[2]));
			}
		}
		return json_encode($valeurs);
	}

}