<?php

class GenerationArchives {

	public function __construct() {
		$this->load();
	}

	public function load() {
		$debut = mktime(0, 0, 0, date('m'), date('d'), date('Y')) - 86400;
		$fin = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
		$this->generate_Floods($debut, $fin);
		$this->generate_Convois($debut, $fin);
		$this->generate_RetardConvois($debut, $fin);
	}

	public function generate_Floods($debut, $fin) {
		$floods = array();
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT * FROM floods_courant WHERE arrivee > :debut AND arrivee <= :fin');
		$requete->bindValue(':debut', $debut, PDO::PARAM_INT);
		$requete->bindValue(':fin', $fin, PDO::PARAM_INT);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {
			if(!array_key_exists($resultat['serveur'], $floods)) {
				$floods[$resultat['serveur']] = array();
			}
			if(!array_key_exists($resultat['ID_attaquant'], $floods[$resultat['serveur']])) {
				$floods[$resultat['serveur']][$resultat['ID_attaquant']] = array('nombre' => 0, 'total' => 0);
			}
			$floods[$resultat['serveur']][$resultat['ID_attaquant']]['nombre'] ++;
			$floods[$resultat['serveur']][$resultat['ID_attaquant']]['total'] += $resultat['valeur'];
		}
		
		foreach($floods as $serveur => $valeurs) {
			foreach($valeurs as $ID => $valeur) {
				$bdd = Zzzelp::Connexion_BDD('Fourmizzz_FR_'.strtoupper($serveur));
				$requete = $bdd->prepare('SELECT Pseudo FROM BDDJoueurs WHERE ID = :ID');
				$requete->bindValue(':ID', $ID, PDO::PARAM_INT);
				$requete->execute();
				$resultat = $requete->fetch(PDO::FETCH_ASSOC);
				$bdd = Zzzelp::Connexion_BDD('Releves');
				$requete = $bdd->prepare('INSERT INTO archives_floods (pseudo, serveur, nombre, valeur) VALUES (:pseudo, :serveur, :nombre, :valeur)');
				$requete->bindValue(':pseudo', $resultat['Pseudo'], PDO::PARAM_STR);
				$requete->bindValue(':serveur', $serveur, PDO::PARAM_STR);
				$requete->bindValue(':nombre', $valeur['nombre'], PDO::PARAM_INT);
				$requete->bindValue(':valeur', $valeur['total'], PDO::PARAM_INT);
				$requete->execute();
				var_dump($requete->errorInfo());
			}
		}
	}

	public function generate_Convois($debut, $fin) {
		$convois = array('recus' => array(), 'envoyes' => array());
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT * FROM Lancement_convois_mat WHERE ajout > :debut AND ajout <= :fin');
		$requete->bindValue(':debut', $debut, PDO::PARAM_INT);
		$requete->bindValue(':fin', $fin, PDO::PARAM_INT);
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {
			$roles = array('recus' => $resultat['receveur'], 'envoyes' => $resultat['lanceur']);
			foreach($roles as $nom => $joueur) {
				if(!array_key_exists($resultat['serveur'], $convois[$nom])) {
					$convois[$nom][$resultat['serveur']] = array();
				}
				if(!array_key_exists($resultat['alliance'], $convois[$nom][$resultat['serveur']])) {
					$convois[$nom][$resultat['serveur']][$resultat['alliance']] = array();
				}
				if(!array_key_exists($joueur, $convois[$nom][$resultat['serveur']][$resultat['alliance']])) {
					$convois[$nom][$resultat['serveur']][$resultat['alliance']][$joueur] = array('nombre' => 0, 'total' => 0);
				}
				$convois[$nom][$resultat['serveur']][$resultat['alliance']][$joueur]['nombre'] ++;
				$convois[$nom][$resultat['serveur']][$resultat['alliance']][$joueur]['total'] += $resultat['valeur'];
			}
		}

		$bdd = Zzzelp::Connexion_BDD('Releves');
		foreach($convois as $mode => $valeurs) {
			foreach($valeurs as $serveur => $liste) {
				foreach($liste as $alliance => $joueurs) {
					foreach($joueurs as $pseudo => $valeur) {
						$requete = $bdd->prepare('INSERT INTO archives_convois (pseudo, serveur, alliance, recu, nombre, valeur) VALUES (:pseudo, :serveur, :alliance, :recu, :nombre, :valeur)');
						$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
						$requete->bindValue(':serveur', $serveur, PDO::PARAM_STR);
						$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
						$requete->bindValue(':recu', ($mode == 'recus' ? 1 : 0), PDO::PARAM_INT);
						$requete->bindValue(':nombre', $valeur['nombre'], PDO::PARAM_INT);
						$requete->bindValue(':valeur', $valeur['total'], PDO::PARAM_INT);
						$requete->execute();				
					}
				}
			}
		}
	}

	public function generate_RetardConvois() {
		$convois = array('recus' => array(), 'envoyes' => array());
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$requete = $bdd->prepare('SELECT * FROM Convois');
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $resultat) {
			$roles = array('recus' => $resultat['receveur'], 'envoyes' => $resultat['lanceur']);
			foreach($roles as $nom => $joueur) {
				if(!array_key_exists($resultat['serveur'], $convois[$nom])) {
					$convois[$nom][$resultat['serveur']] = array();
				}
				if(!array_key_exists($resultat['alliance'], $convois[$nom][$resultat['serveur']])) {
					$convois[$nom][$resultat['serveur']][$resultat['alliance']] = array();
				}
				if(!array_key_exists($joueur, $convois[$nom][$resultat['serveur']][$resultat['alliance']])) {
					$convois[$nom][$resultat['serveur']][$resultat['alliance']][$joueur] = array('nombre' => 0, 'total' => 0);
				}
			$convois[$nom][$resultat['serveur']][$resultat['alliance']][$joueur]['nombre'] ++;
			$convois[$nom][$resultat['serveur']][$resultat['alliance']][$joueur]['total'] += $resultat['valeur'];
			}
		}

		$bdd = Zzzelp::Connexion_BDD('Releves');
		foreach($convois as $mode => $valeurs) {
			foreach($valeurs as $serveur => $liste) {
				foreach($liste as $alliance => $joueurs) {
					foreach($joueurs as $pseudo => $valeur) {
						$requete = $bdd->prepare('INSERT INTO archives_retards_convois (pseudo, serveur, alliance, recu, nombre, valeur) 
												  VALUES (:pseudo, :serveur, :alliance, :recu, :nombre, :valeur)');
						$requete->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
						$requete->bindValue(':serveur', $serveur, PDO::PARAM_STR);
						$requete->bindValue(':alliance', $alliance, PDO::PARAM_STR);
						$requete->bindValue(':recu', ($mode == 'recus' ? 1 : 0), PDO::PARAM_INT);
						$requete->bindValue(':nombre', $valeur['nombre'], PDO::PARAM_INT);
						$requete->bindValue(':valeur', $valeur['total'], PDO::PARAM_INT);
						$requete->execute();
					}
				}
			}
		}
	}

}