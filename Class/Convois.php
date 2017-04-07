<?php

class Convois {
	
	public $utilisateur;
	public $membre_alliance;
	public $alliance;

	public $a_envoyer;
	public $a_recevoir;
	public $convois;
	public $distances;

	public $convoye;
	public $temps_convois;

	public function __construct($utilisateur, $membre_alliance) {
		$this->utilisateur = $utilisateur;
		$this->utilisateur->getInfosZzzelp();
		$this->membre_alliance = $membre_alliance;
	}

	public function get_ConvoisRestants() {
		$this->alliance = new Alliance($this->membre_alliance);
		$this->alliance->build_alliance();
		$this->utilisateur->getCoordonnees();
		$this->get_ConvoisBeneficiaire();
		$this->get_ConvoisDebiteur();
	}


	public function get_ConvoisBeneficiaire() {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT valeur, lanceur FROM Convois WHERE receveur = :pseudo AND serveur = :serveur AND alliance = :alliance');
		$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->membre_alliance->alliance, PDO::PARAM_STR);
		$requete->execute();
		$this->a_recevoir = $requete->fetchAll(PDO::FETCH_ASSOC);
	}

	public function get_ConvoisDebiteur() {
		$this->distances = array();
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT valeur, receveur FROM Convois WHERE lanceur = :pseudo AND serveur = :serveur AND alliance = :alliance');
		$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->bindValue(':alliance', $this->membre_alliance->alliance, PDO::PARAM_STR);
		$requete->execute();
		$this->a_envoyer = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($this->a_envoyer as $joueur) {
			$this->distances[$joueur['receveur']] = Fourmizzz::Temps_trajet(Fourmizzz::Distance($this->utilisateur->coordonnees, $this->alliance->membres[$joueur['receveur']]->coordonnees), $this->utilisateur->niveaux->vitesse_attaque);
		}
	}

	public function get_DerniersConvois() {
		$this->convois = array();
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT * FROM Lancement_convois_mat WHERE (lanceur = :pseudo OR receveur = :pseudo) AND ajout > :ajout AND serveur = :serveur ORDER BY ajout DESC');
		$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->bindValue(':ajout', (time() - 604800), PDO::PARAM_INT);	
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach ($resultats as $valeurs) {
			if($valeurs['lanceur'] == $this->utilisateur->pseudo) {
				$pseudo = $valeurs['receveur'];
				$mode = 1;
			}
			else {
				$pseudo = $valeurs['lanceur'];
				$mode = 0;
			}
			$this->convois[] = array('pseudo' => $pseudo, 'mode' => $mode, 'valeur' => $valeurs['valeur'], 'ajout' => $valeurs['ajout']);
		}
	}

	public function get_Demandes() {
		$this->utilisateur->getCoordonnees();
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT * FROM DemandesConvois WHERE serveur = :serveur AND alliance = :alliance AND restant > 0 ORDER BY date_besoin ASC');
		$requete->bindValue(':alliance', $this->membre_alliance->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->execute();
		$this->demandes = $requete->fetchAll(PDO::FETCH_ASSOC);
		for($i=0; $i<count($this->demandes); $i++) {
			$this->demandes[$i]['date_besoin'] = new Date($this->demandes[$i]['date_besoin']);
			$this->demandes[$i]['date_creation'] = new Date($this->demandes[$i]['date_creation']);
			$this->demandes[$i]['joueur'] = new Utilisateur_Fzzz($this->demandes[$i]['pseudo'], $this->utilisateur->serveur, null);
			$this->demandes[$i]['joueur']->getCoordonnees();
			$this->demandes[$i]['duree'] = Fourmizzz::Temps_trajet(Fourmizzz::Distance($this->utilisateur->coordonnees, $this->demandes[$i]['joueur']->coordonnees), $this->utilisateur->niveaux->vitesse_attaque);
			if($this->demandes[$i]['date_besoin']->timestamp < time()) {
				$this->demandes[$i]['couleur'] = 'red';
			}
			elseif($this->demandes[$i]['date_besoin']->timestamp < time() + 86400*7) {
				$this->demandes[$i]['couleur'] = 'darkorange';
			}
			else {
				$this->demandes[$i]['couleur'] = 'black';
			}
		}
	}

	public function save_Demande() {
		if($_GET['valeur'] > 0) {
			if($_GET['raison'] == '...Autre') {
				$raison = htmlentities($_GET['raison2']);
			}
			else {
				if(in_array($_GET['raison'], Fourmizzz::$constructions_mini)) {
					$nom = Fourmizzz::$constructions[array_search($_GET['raison'], Fourmizzz::$constructions_mini)];
					$nom_bdd = Fourmizzz::$constructions_bdd[array_search($_GET['raison'], Fourmizzz::$constructions_mini)];
				}
				else {
					$nom = Fourmizzz::$recherches[array_search($_GET['raison'], Fourmizzz::$recherches_mini)];
					$nom_bdd = Fourmizzz::$recherches_bdd[array_search($_GET['raison'], Fourmizzz::$recherches_mini)];
				}
				$raison = $nom.' '.($this->utilisateur->niveaux->$nom_bdd + 1);
			}
			$bdd = Zzzelp::Connexion_BDD('Actions');
			$requete = $bdd->prepare('INSERT INTO DemandesConvois (serveur, alliance, pseudo, date_creation, date_besoin, valeur, restant, ressource, commentaire) 
									  VALUES (:serveur, :alliance, :pseudo, :date_creation, :date_besoin, :valeur, :restant, :ressource, :commentaire)');
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->bindValue(':alliance', $this->membre_alliance->alliance, PDO::PARAM_STR);
			$requete->bindValue(':pseudo', $this->utilisateur->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':date_creation', time(), PDO::PARAM_INT);
			$requete->bindValue(':date_besoin', htmlentities($_GET['date']), PDO::PARAM_INT);
			$requete->bindValue(':valeur', htmlentities($_GET['valeur']), PDO::PARAM_INT);
			$requete->bindValue(':restant', htmlentities($_GET['valeur']), PDO::PARAM_INT);
			$requete->bindValue(':ressource', ($_GET['ressource'] == 'materiaux') ? 'mat' : 'nou', PDO::PARAM_STR);
			$requete->bindValue(':commentaire', $raison, PDO::PARAM_STR);
			$requete->execute();
		}
	}


	public function prepare_Convois() {
		$this->convoye = new Utilisateur_Fzzz($_GET['pseudo'], $_GET['serveur'], null);
		$this->utilisateur->get_LastTDC();
		$this->convoye->getCoordonnees();
		$this->temps_convois = Fourmizzz::Temps_trajet(Fourmizzz::Distance($this->utilisateur->coordonnees, $this->convoye->coordonnees), $this->utilisateur->niveaux->vitesse_attaque);
	}

	public function add_ConvoisManuel() {
		$pseudos = $_POST['pseudo'];
		$nourritures = $_POST['nourriture'];
		$materiaux = $_POST['materiaux'];
		$longueur = count($pseudos);
		for($i=0;$i<$longueur;$i++) {
			if(str_replace(' ','',htmlentities($nourritures[$i])) > 0) {
				$this->update_Convois(htmlentities($pseudos[$i]), str_replace(' ','',htmlentities($nourritures[$i])), 'nourriture');
			}
			if(str_replace(' ','',htmlentities($materiaux[$i])) > 0) {
				$this->update_Convois(htmlentities($pseudos[$i]), str_replace(' ','',htmlentities($materiaux[$i])), 'materiaux');
			}
		}
	}

	public function add_ConvoisAuto() {
		if($_GET['nourriture'] > 0) {
			$this->update_Convois(htmlentities($_GET['pseudo']), htmlentities($_GET['nourriture']), 'nourriture');
		}
		if($_GET['materiaux'] > 0) {
			$this->update_Convois(htmlentities($_GET['pseudo']), htmlentities($_GET['materiaux']), 'materiaux');
		}
	}

	public function update_Convois($pseudo, $valeur, $type) {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('INSERT INTO Lancement_convois_'.substr($type, 0, 3).' (alliance, serveur, lanceur, receveur, valeur, ajout) VALUES(:alliance, :serveur, :lanceur, :receveur, :valeur, :ajout)');
		$requete->bindValue(':alliance', $this->membre_alliance->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->bindValue(':lanceur', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':receveur', $pseudo, PDO::PARAM_STR);
		$requete->bindValue(':valeur', $valeur, PDO::PARAM_INT);
		$requete->bindValue(':ajout', time(), PDO::PARAM_INT);
		$requete->execute();
		if ($type == 'materiaux') {
			$requete = $bdd->prepare('SELECT valeur FROM Convois WHERE serveur = :serveur AND alliance = :alliance AND lanceur = :lanceur AND receveur = :receveur');
			$requete->bindValue(':alliance', $this->membre_alliance->alliance, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->bindValue(':lanceur', $this->utilisateur->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':receveur', $pseudo, PDO::PARAM_STR);
			$requete->execute();
			$valeur = $requete->fetch(PDO::FETCH_ASSOC)['valeur'] - $valeur; 
			if ($valeur > 0) {
				$requete = $bdd->prepare('UPDATE Convois SET valeur = :valeur WHERE serveur = :serveur AND alliance = :alliance AND lanceur = :lanceur AND receveur = :receveur LIMIT 1');
				$requete->bindValue(':valeur', $valeur, PDO::PARAM_INT);
			}
			else {
				$requete = $bdd->prepare('DELETE FROM Convois WHERE serveur = :serveur AND alliance = :alliance AND lanceur = :lanceur AND receveur = :receveur LIMIT 1');
			}
			$requete->bindValue(':alliance', $this->membre_alliance->alliance, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->bindValue(':lanceur', $this->utilisateur->pseudo, PDO::PARAM_STR);
			$requete->bindValue(':receveur', $pseudo, PDO::PARAM_STR);
			$requete->execute();
		}
		elseif ($type == 'nourriture') {
			$requete = $bdd->prepare('SELECT valeure FROM Convois_nourriture WHERE serveur = :serveur AND alliance = :alliance AND pseudo = :pseudo');
			$requete->bindValue(':alliance', $this->membre_alliance->alliance, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
			$requete->execute();
			$valeur = $requete->fetch(PDO::FETCH_ASSOC)['valeure'] - $valeur; 
			if ($valeur > 0) {
				$requete = $bdd->prepare('UPDATE Convois_nourriture SET valeure = :valeur WHERE serveur = :serveur AND alliance = :alliance AND pseudo = :pseudo');
				$requete->bindValue(':valeur', $valeur, PDO::PARAM_INT);
			}
			else {
				$requete = $bdd->prepare('DELETE FROM Convois_nourriture WHERE serveur = :serveur AND alliance = :alliance AND pseudo = :pseudo');
			}
			$requete->bindValue(':alliance', $this->membre_alliance->alliance, PDO::PARAM_STR);
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->bindValue(':receveur', $pseudo, PDO::PARAM_STR);
			$requete->execute();
		}
	}

	public function add_ConvoisDemande() {
		$pseudo = htmlentities($_GET['pseudo']);
		if($_GET['nourriture'] > 0) {
			$mode = 'nou';
			$valeur = htmlentities($_GET['nourriture']);
		}
		elseif($_GET['materiaux'] > 0) {
			$mode = 'mat';
			$valeur = htmlentities($_GET['materiaux']);
		}
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('INSERT INTO Lancement_convois_'.$mode.' (alliance, serveur, lanceur, receveur, valeur, ajout) VALUES(:alliance, :serveur, :lanceur, :receveur, :valeur, :ajout)');
		$requete->bindValue(':alliance', $this->membre_alliance->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->bindValue(':lanceur', $this->utilisateur->pseudo, PDO::PARAM_STR);
		$requete->bindValue(':receveur', $pseudo, PDO::PARAM_STR);
		$requete->bindValue(':valeur', $valeur, PDO::PARAM_INT);
		$requete->bindValue(':ajout', time(), PDO::PARAM_INT);
		$requete->execute();

		$requete = $bdd->prepare('SELECT restant, ID FROM DemandesConvois WHERE serveur = :serveur AND alliance = :alliance AND pseudo = :pseudo ORDER BY date_besoin ASC LIMIT 1');
		$requete->bindValue(':alliance', $this->membre_alliance->alliance, PDO::PARAM_STR);
		$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
		$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
		$requete->execute();
		$resultat = $requete->fetch(PDO::FETCH_ASSOC);
		if(!empty($valeur)) {
			$restant = $resultat['restant'] - $valeur;
			$requete = $bdd->prepare('UPDATE DemandesConvois SET restant = :restant WHERE ID = :ID');
			$requete->bindValue(':restant', $restant, PDO::PARAM_INT);
			$requete->bindValue(':ID', $resultat['ID'], PDO::PARAM_INT);
			$requete->execute();
		}
	}

}