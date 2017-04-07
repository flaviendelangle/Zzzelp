<?php

class TableauCoordonnees {
	
	public $serveur;
	public $alliances;
	public $joueurs;
	public $coordonnees;

	public function __construct($serveur, $alliances, $joueurs) {
		$this->serveur = $serveur;
		$this->alliances = $alliances;
		$this->joueurs = $joueurs;
		$this->get_Coordonnees();
	}

	/*
		Récupère la liste des quadriplés (pseudo, ID, x, y) pour tous les joueurs d'une alliance
	*/
	public function get_Coordonnees_alliance($alliance) {
		$joueurs = array();
		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		$requete = $bdd->prepare('SELECT ID, x, y, Pseudo, alliance FROM BDDJoueurs WHERE alliance = :alliance');
		$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $joueur) {
			$joueurs[] = array(
							'pseudo' => $joueur['Pseudo'], 
							'ID' => (int)$joueur['ID'], 
							'x' => (int)$joueur['x'], 
							'y' => (int)$joueur['y'],
							'alliance' => $joueur['alliance']
						);
		}
		return $joueurs;
	}

	/*
		Récupère le quadriplé (pseudo, ID, x, y) pour le joueur demandé
	*/
	public function get_Coordonnees_joueur($joueur) {
		$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($this->serveur));
		$requete = $bdd->prepare('SELECT ID, x, y, Pseudo, alliance FROM BDDJoueurs WHERE Pseudo = :joueur');
		$requete->bindValue(':joueur', html_entity_decode($joueur), PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		return array(
				'pseudo' => $resultat['Pseudo'], 
				'ID' => (int)$resultat['ID'], 
				'x' => (int)$resultat['x'], 
				'y' => (int)$resultat['y'],
				'alliance' => $resultat['alliance']
		);
	}

	/*
		Récupère les coordonnées des alliances et joueurs demandés
	*/
	public function get_Coordonnees() {
		$this->coordonnees = array();
		foreach($this->alliances as $alliance) {
			if(strlen($alliance) > 0){
				$this->coordonnees = array_merge($this->coordonnees, $this->get_Coordonnees_alliance($alliance));
			}
		}
		foreach($this->joueurs as $joueur) {
			if(strlen($joueur) > 0) {
				$this->coordonnees[] = $this->get_Coordonnees_joueur($joueur);
			}
		}
	}

	/*
		Retourne les coordonnées sous la forme d'un objet en JSON
	*/
	public function show_json() {
		echo json_encode(Tableau::key_sort($this->coordonnees, 'pseudo'));
	}

}