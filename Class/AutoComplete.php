<?php

class AutoComplete {
	
	public $mode;

	public function __construct($mode) {
		$this->mode = $mode;
		$this->get_Data();
	}

	public function get_Data() {
		if($this->mode == 'joueur') {
			$this->serveur = $_GET['serveur'];
			echo json_encode($this->get_Data_Joueur());
		}
		elseif($this->mode == 'alliance') {
			$this->serveur = $_GET['serveur'];
			echo json_encode($this->get_Data_Alliance());
		}
		elseif($this->mode == 'joueur_serveurs') {
			echo json_encode($this->get_Data_JoueurServeurs());
		}
		elseif($this->mode == 'alliance_serveurs') {
			echo json_encode($this->get_Data_AllianceServeurs());
		}
	}

	public function get_Data_Joueur() {
		$pseudos = array();
		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		$requete = $bdd->prepare('SELECT Pseudo FROM BDDJoueurs WHERE Pseudo LIKE :valeur LIMIT 5');
		$requete->bindValue(':valeur', htmlentities($_GET['valeur']).'%');
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $ligne) {
			$pseudos[] = $ligne['Pseudo'];
		}
		return $pseudos;
	}

	public function get_Data_Alliance() {
		$alliances = array();
		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		$requete = $bdd->prepare('SELECT tag FROM BDDJoueurs_alliance WHERE tag LIKE :valeur LIMIT 5');
		$requete->bindValue(':valeur', htmlentities($_GET['valeur']).'%');
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $ligne) {
			$alliances[] = $ligne['tag'];
		}
		return $alliances;
	}

	public function get_Data_JoueurServeurs() {
		$pseudos = array();
		foreach(Fourmizzz::$serveurs as $serveur) {
			$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($serveur));
			$requete = $bdd->prepare('SELECT Pseudo FROM BDDJoueurs WHERE Pseudo LIKE :valeur LIMIT 5');
			$requete->bindValue(':valeur', htmlentities($_GET['valeur']).'%');
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $ligne) {
				$pseudos[] = $ligne['Pseudo'].' ('.$serveur.')';
			}
		}
		if(count($pseudos) > 5) {
			$pseudos = array_slice($pseudos, 0, 5);
		}
		return $pseudos;		
	}

	public function get_Data_AllianceServeurs() {
		$alliances = array();
		foreach(Fourmizzz::$serveurs as $serveur) {
			$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($serveur));
			$requete = $bdd->prepare('SELECT tag FROM BDDJoueurs_alliance WHERE tag LIKE :valeur LIMIT 5');
			$requete->bindValue(':valeur', htmlentities($_GET['valeur']).'%');
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $ligne) {
				$alliances[] = $ligne['tag'].' ('.$serveur.')';
			}
		}
		if(count($alliances) > 5) {
			$alliances = array_slice($alliances, 0, 5);
		}
		return $alliances;		
	}
}