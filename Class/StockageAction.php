<?php

class StockageAction {

	public $attaquant;

	public function __construct($attaquant) {
		$this->attaquant = $attaquant;
		$this->attaquant->getAlliances_activated();
		$this->attaquant->getInfosZzzelp();
	}

	/*
		Stock un flood en base de données (utilisé uniquement par ZzzelpScript)
	*/
	public function save_Flood($unites, $cible) {
		$cible->getCoordonnees();
		$this->attaquant->getCoordonnees();
		$impact = time() + (int)Fourmizzz::Temps_trajet(Fourmizzz::Distance($this->attaquant->coordonnees, $cible->coordonnees), $this->attaquant->niveaux->vitesse_attaque);
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('INSERT INTO floods_courant (ID_attaquant, ID_cible, serveur, valeur, ally_1, ally_2, ally_3, arrivee) 
								  VALUES(:ID_attaquant, :ID_cible, :serveur, :valeur, :ally_1, :ally_2, :ally_3, :arrivee)');
		$requete->bindValue(':ID_attaquant', $this->attaquant->id, PDO::PARAM_INT);
		$requete->bindValue(':ID_cible', $cible->id, PDO::PARAM_INT);
		$requete->bindValue(':serveur', $this->attaquant->serveur, PDO::PARAM_STR);
		$requete->bindValue(':valeur', array_sum($unites), PDO::PARAM_INT);
		$requete->bindValue(':arrivee', $impact, PDO::PARAM_INT);
		for($i=0; $i<3; $i++) {
			$requete->bindValue(':ally_'.($i+1), ($i<count($this->attaquant->alliances_activated)) ? $this->attaquant->alliances_activated[$i]->alliance : '', PDO::PARAM_STR);
		}
		$requete->execute();
		return 1;
	}

	/*
		Stock une série de floods en base de donnée (jamais utilisé par ZzzelpScript)
	*/
	public function save_Floods($floods) {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$this->attaquant->getCoordonnees();
		foreach($floods as $flood) {
			$cible = new Utilisateur_Fzzz($flood['pseudo'], $this->attaquant->serveur, null);
			$cible->getCoordonnees();
			$requete = $bdd->prepare('INSERT INTO floods_courant (ID_attaquant, ID_cible, serveur, valeur, ally_1, ally_2, ally_3, arrivee) 
									  VALUES(:ID_attaquant, :ID_cible, :serveur, :valeur, :ally_1, :ally_2, :ally_3, :arrivee)');
			$requete->bindValue(':ID_attaquant', $this->attaquant->id, PDO::PARAM_INT);
			$requete->bindValue(':ID_cible', $cible->id, PDO::PARAM_INT);
			$requete->bindValue(':serveur', $this->attaquant->serveur, PDO::PARAM_STR);
			$requete->bindValue(':valeur', htmlentities($flood['valeur']), PDO::PARAM_INT);
			$requete->bindValue(':arrivee', htmlentities($flood['retour']), PDO::PARAM_INT);
			for($i=0; $i<3; $i++) {
				$requete->bindValue(':ally_'.($i+1), ($i<count($this->attaquant->alliances_activated)) ? $this->attaquant->alliances_activated[$i]->alliance : '', PDO::PARAM_STR);
			}
			$requete->execute();
		}
		echo 1;
	}

	/*
		Stock une série de chasse en base de donnée
	*/
	public function save_Chasses($auto) {
		if($auto) {
			$this->save_Chasse($_GET['valeur'], $_GET['arrivee']);
		}
		else {
			$chasses = json_decode($_POST['releves'], true);
			for($i=0;$i<count($chasses);$i++) {
				$this->save_Chasse($chasses[$i]['valeur'], $chasses[$i]['retour']);
			}			
		}
		return 1;
	}

	/*
		Stock une chasse en base de donnée
	*/
	private function save_Chasse($valeur, $arrivee) {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('INSERT INTO chasses (pseudo, serveur, valeur, arrivee) VALUES(:pseudo, :serveur, :valeur, :arrivee)');
		$requete->bindValue(':pseudo', $this->attaquant->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->attaquant->serveur, PDO::PARAM_STR);
		$requete->bindValue(':valeur', htmlentities($valeur), PDO::PARAM_INT);
		$requete->bindValue(':arrivee', htmlentities($arrivee), PDO::PARAM_INT);
		$requete->execute();
		$bdd = null;
	}

}