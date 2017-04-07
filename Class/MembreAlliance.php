<?php

class MembreAlliance {
	public $alliance;
	public $pseudo;
	public $serveur;
	public $droit;
	public $droits = array('Inconnu', 'Nouveau', 'Membre', 'Gestionnaire', 'Chef');

	public function __construct($alliance, $pseudo, $serveur) {
		$this->alliance = htmlentities($alliance);
		$this->pseudo = $pseudo;
		$this->serveur = $serveur;
		$this->droit = $this->get_Droit();
	}

	public function get_Droit() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT droits FROM Droits_alliance WHERE serveur = :serveur AND alliance = :alliance AND pseudo = :pseudo');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $this->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		return (empty($resultat) ? 0 : $resultat['droits']);
	}

	public function check_activation_outil($outil, $menu=false) {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT activation_'.$outil.' FROM alliances WHERE alliance = :alliance AND serveur = :serveur');
		$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
		$requete->execute();
		return $requete->fetch(PDO::FETCH_NUM)[0];
	}

	public function check_droit_outil($droit, $menu=false) {
		if($_SESSION['pseudo'] == 'delangle' AND !$menu) {
			return true;
		}
		if($droit == 'chef') {
			return ($this->droit == 4);
		}
		else if($this->droit > 0) {
			$bdd = Zzzelp::Connexion_BDD('Donnees_site');
			$requete = $bdd->prepare('SELECT droits_'.$this->droits[$this->droit].' FROM alliances WHERE alliance = :alliance AND serveur = :serveur');
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
			$requete->execute();
			$resultat = $requete->fetch(PDO::FETCH_ASSOC);
			return json_decode($resultat['droits_'.$this->droits[$this->droit]], true)[$droit];
		}
		else {
			return False;
		}
	}	

	public function get_AlliancesPartage_Droit($droit) {
		if($this->droit == 0) {
			return array();
		}
		else {
			$bdd = Zzzelp::Connexion_BDD('Donnees_site');
			$alliances = array();
			$requete = $bdd->prepare('SELECT hote, '.$droit.'_'.$this->droits[$this->droit].' FROM Partage_droits_alliances WHERE receveuse = :receveuse AND serveur = :serveur');
			$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
			$requete->bindValue(':receveuse', $this->alliance, PDO::PARAM_STR);
			$requete->execute();
			$resultat = $requete->fetchAll(PDO::FETCH_ASSOC);
			for($n=0; $n<count($resultat); $n++) {
				if($resultat[$n][$droit.'_'.$this->droits[$this->droit]]) {
					$alliances[] = $resultat[$n]['hote'];
				}
			}
			return $alliances;
		}
	}

	public function get_DroitsGestionMF($menu=false) {
		$partages = $this->get_AlliancesPartage_Droit('gestion_MF');
		if($this->check_droit_outil('gestion_MF', $menu)) {
			return array_merge(array($this->alliance), $partages);
		}
		else {
			return $partages;
		}
	}

	public function get_DroitsGestionRangs($menu=false) {
		$partages = $this->get_AlliancesPartage_Droit('gestion_rangs');
		if($this->check_droit_outil('gestion_rangs', $menu)) {
			return array_merge(array($this->alliance), $partages);
		}
		else {
			return $partages;
		}
	}

	public function get_DroitsAffichageRangs($menu=false) {
		$partages = $this->get_AlliancesPartage_Droit('partage_rangs');
		if($this->check_droit_outil('rangs', $menu)) {
			return array_merge(array($this->alliance), $partages);
		}
		else {
			return $partages;
		}
	}

	public function get_DroitsAffichageFloods($menu=false) {
		$partages = $this->get_AlliancesPartage_Droit('partage_floods');
		if($this->check_droit_outil('floods', $menu)) {
			return array_merge(array($this->alliance), $partages);
		}
		else {
			return $partages;
		}
	}
}
