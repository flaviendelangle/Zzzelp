<?php 

class RangsZzzelp {

	public $serveur;
	public $rangs;
	public $utilisateur;
	public $chef;
	public $alliances_accessibles;
	public $partage_active = false;

	public function __construct($serveur) {
		$this->serveur = $serveur;

	}

	/*
		Fonction principale pour la récupèration des rangs afin de les utiliser (ZzzelpScript et Multiflood)
	*/
	public function compute_ModeAjax($utilisateur) {
		$this->utilisateur = $utilisateur;
		$this->utilisateur->getAlliances_activated();
		$this->utilisateur->get_obj_Alliances_activated();
		$this->get_AlliancesAccessibles(false);
		$this->get_RangsAjax();
	}

	/*
		Foncion principale pour la récupèration des rangs afin de générer la page de gestion
	*/
	public function compute_ModeGestion($utilisateur, $chef) {
		$this->utilisateur = $utilisateur;
		$this->chef = $chef;
		$this->get_AlliancesAccessibles(true);
	}

	/*
		Récupère les alliances que lesquels l'utilisateur peut voir (si !gestion) ou gérer (si gestion)
	*/
	public function get_AlliancesAccessibles($gestion) {
		$this->alliances_accessibles = array();
		for($i=0; $i<count($this->utilisateur->alliances_activated_obj); $i++) {
			if($gestion) {
				$nouvelles = $this->utilisateur->alliances_activated_obj[$i]->get_DroitsGestionRangs();
			}
			else {
				$nouvelles = $this->utilisateur->alliances_activated_obj[$i]->get_DroitsAffichageRangs();
			}
			$this->alliances_accessibles = array_merge($this->alliances_accessibles, $nouvelles);
		}	
	}

	/*
		Récupère les rangs pour ZzzelpScript ou le Multiflood
	*/
	public function get_RangsAjax() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$alliances = '';
		for($i=0; $i<count($this->alliances_accessibles); $i++) {
			$alliances .= (($alliances != '') ? ' OR ' : '').'createur = :createur_'.$i;
		}
		if(!empty($alliances)) {
			$requete = $bdd->prepare('SELECT * FROM Rangs_Zzzelp WHERE serveur = :serveur AND ('.$alliances.') ORDER BY mode ASC');
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			for($i=0; $i<count($this->alliances_accessibles); $i++) {
				$requete->bindValue(':createur_'.$i, $this->alliances_accessibles[$i], PDO::PARAM_STR);
			}
			$requete->execute();
			$this->rangs = $requete->fetchAll(PDO::FETCH_ASSOC);
		}
		else {
			$this->rangs = array();
		}
	}

	/*
		Récupère les rangs pour la page de gestion
	*/
	public function get_RangsGestion() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$alliances = '';
		$this->rangs = array();
		for($i=0; $i<count($this->alliances_accessibles); $i++) {
			$alliances .= (($alliances != '') ? ' OR ' : '').'createur = :createur_'.$i;
		}
		if(!empty($alliances)) {
			$requete = $bdd->prepare('SELECT * FROM Rangs_Zzzelp WHERE serveur = :serveur AND ('.$alliances.') AND (createur = :createur OR statut = 1)');
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->bindValue(':createur', $this->chef->alliance, PDO::PARAM_STR);
			for($i=0; $i<count($this->alliances_accessibles); $i++) {
				$requete->bindValue(':createur_'.$i, $this->alliances_accessibles[$i], PDO::PARAM_STR);
			}
			$requete->execute();
			$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
			foreach($resultats as $rang) {
				$this->rangs[$rang['createur']][] = $rang;
				if(count($this->rangs) > 0 AND $rang['createur'] != $this->chef->alliance) {
					$this->partage_active = true;
				}
			}
		}
		else {
			$this->rangs = array();
		}
	}

	/*
		Met à jour les rangs
	*/
	public function update_RangsGestion() {
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$alliances = '';
		for($i=0; $i<count($this->alliances_accessibles); $i++) {
			$alliances .= (($alliances != '') ? ' OR ' : '').'createur = :createur_'.$i;
		}
		if(!empty($alliances)) {
			$requete = $bdd->prepare('DELETE FROM Rangs_Zzzelp WHERE serveur = :serveur AND ('.$alliances.') AND (createur = :createur OR statut = 1)');
			$requete->bindValue(':serveur', $this->utilisateur->serveur, PDO::PARAM_STR);
			$requete->bindValue(':createur', $this->chef->alliance, PDO::PARAM_STR);
			for($i=0; $i<count($this->alliances_accessibles); $i++) {
				$requete->bindValue(':createur_'.$i, $this->alliances_accessibles[$i], PDO::PARAM_STR);
			}
			$requete->execute();
			$rangs = json_decode($_POST['rangs_details'], true);
			foreach($rangs as $rang) {
				$requete = $bdd->prepare('INSERT INTO Rangs_Zzzelp (serveur, createur, mode, regle, role, ne_pas_flooder, alliances, couleur, rang_affiche, statut) 
							VALUES (:serveur, :createur, :mode, :regle, :role, :ne_pas_flooder, :alliances, :couleur, :rang_affiche, :statut)');
				$requete->bindValue(':serveur', $this->chef->serveur, PDO::PARAM_STR);
				$requete->bindValue(':createur', (($rang['createur'] != '') ? $rang['createur'] : $this->chef->alliance), PDO::PARAM_STR);
				$requete->bindValue(':mode', htmlentities($rang['mode_rang']), PDO::PARAM_STR);
				$requete->bindValue(':regle', $rang['regle_rang'], PDO::PARAM_STR);
				$requete->bindValue(':role', htmlentities($rang['role_rang']), PDO::PARAM_STR);
				$requete->bindValue(':ne_pas_flooder', ($rang['NPF_rang'] ? 1 : 0 ), PDO::PARAM_INT);
				$requete->bindValue(':alliances', htmlentities($rang['alliances_rang']), PDO::PARAM_STR);
				$requete->bindValue(':couleur', htmlentities($rang['color']), PDO::PARAM_STR);
				$requete->bindValue(':rang_affiche', htmlentities($rang['rang_affiche']), PDO::PARAM_STR);
				$requete->bindValue(':statut', ($rang['partage_rang'] ? 1 : 0), PDO::PARAM_INT);
				$requete->execute();
			}
		}
	}

	
}