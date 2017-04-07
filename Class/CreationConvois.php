<?php

class CreationConvois extends Alliance  {
	
	/*
		Partie non AJAX
	*/
	public $pucerons;


	/*
		Partie AJAX
	*/
	public $besoins_totaux;
	public $recolte_totale;
	public $revenus_fixes;
	public $optimisation;
	public $message;
	public $convoyeurs;
	public $nom_duree;
	public $complet;
	public $erreurs = array();

	/*
		Partie non AJAX
	*/
	public function get_Etables() {
		$pucerons = array();
		foreach ($this->membres as $pseudo => $niveaux) {
			$pucerons[$pseudo] = $niveaux->niveaux->etable_pucerons;
		}	
		$this->pucerons = json_encode($pucerons);		
	}

	public function get_TDCMoyens() {
		$TDC_moyens = $this->get_TDCMoyensExports($this->get_liste_membres(), time() - (($this->parametres_convois['duree_repartition'] == 0) ? 96400 : 604800), time(), $this->parametres_convois['majoration_ouvrieres'], true);
		foreach($TDC_moyens as $pseudo => $TDC) {
			if(isset($this->membres[$pseudo])) {
				$this->membres[$pseudo]->TDC_moyen = $TDC;
			}
		}
	}

	/*
		Partie AJAX : Fonctions principales
	*/
	public function compute_convois() {
		if($_GET['mode'] == 'zzzelp') {
			$this->complet = true;
			$this->unserialize_dataConvoisZzzelp();
			$this->parametres_convois['duree_repartition'] = ($this->parametres_convois['duree_repartition'] == 1) ? 336 : 48;
			$this->get_Recoltes();
			if($this->parametres_convois['formule_repartition'] == 1) {
				$this->compute_ftdp();
			}
		}
		elseif($_GET['mode'] == 'externe') {
			$this->unserialize_dataConvoisExterne();
		}
		$this->get_Multis();
		$this->optimisation = new OptimisationDistances($this);
		$this->optimisation->optimise_distances();
		$convoyeurs = $this->sort_Convois();
		$this->nom_duree = ($this->parametres_convois['duree_repartition'] == 336) ? 'semaine' : 'jour';
		$this->create_Message();
		$this->create_Interface();
	}

	public function unserialize_dataConvoisZzzelp() {
		$joueurs = array();
		$donnees_joueurs = explode('|||', substr($_POST['donnees_joueurs'],1,-1));
		foreach($donnees_joueurs as $joueur) {
			$joueur = explode(',', $joueur);
			if(count($joueur) > 2) {
				$this->membres[$joueur[0]]->data_convois =  array(
												'TDC' => (int)htmlentities($joueur[1]), 
												'etable' => (int)htmlentities($joueur[2]), 
												'colonisateur' => trim(htmlentities($joueur[3])), 
												'recolte' => 0, 
												'revenu_fixe' => (int)str_replace(' ','',htmlentities($joueur[4])), 
												'bonus' => htmlentities($joueur[5]), 
												'activation' => htmlentities($joueur[6]));
			}
		}
	}

	public function unserialize_dataConvoisExterne() {
		$convois_brutes = json_decode($_POST['donnees_joueurs'], true);
		foreach($convois_brutes as $pseudo => $valeur) {
			if(isset($this->membres[$pseudo])) {
				$this->membres[$pseudo]->data_convois = array('convois' => (int)$valeur);
			}
		}
	}

	public function get_Recoltes() {
		foreach($this->membres as $pseudo => $valeurs) {
			if($valeurs->data_convois['colonisateur'] == '') {
				$this->membres[$pseudo]->data_convois['recolte'] += $valeurs->data_convois['TDC'];
			}
			else {
				if(!empty($this->membres[$valeurs->data_convois['colonisateur']])) {
					$this->membres[$pseudo]->data_convois['recolte'] += ($valeurs->data_convois['TDC'] * (1-(0.2+$valeurs->data_convois['etable']*0.01)));
					$this->membres[$valeurs->data_convois['colonisateur']]->data_convois['recolte'] += ($valeurs->data_convois['TDC'] * (0.2+$valeurs->data_convois['etable']*0.01));
				}
				else {
					$this->membres[$pseudo]->data_convois['recolte'] += $valeurs->data_convois['TDC'];
					$this->erreurs[] = 'Impossible de trouver la colonie de '.$pseudo.' : <b>'.$valeurs->data_convois['colonisateur'].'</b>';
				}
			}
		}
	}



	/*
		CALCUL CONVOIS FORMULE TDP
	*/
	public function get_besoins_ftdp() {
		$this->besoins_totaux = 0;
		$this->recolte_totale = 0;
		$this->revenus_fixes = array();
		foreach($this->membres as $pseudo => $valeurs) {
			if($valeurs->data_convois['activation'] == 'true') {
				if ($valeurs->data_convois['revenu_fixe'] != 'NON') {
					$this->revenus_fixes[$pseudo] = (int)$valeurs->data_convois['revenu_fixe'];
					$this->recolte_totale += (int)($valeurs->data_convois['recolte']*$this->parametres_convois['duree_repartition']);
					$this->recolte_totale -= $valeurs->data_convois['revenu_fixe'];
				}
				else {
					$this->membres[$pseudo]->get_tdp_unite(13);
					$formule = str_replace('n_tdp', $valeurs->niveaux->tdp, $this->parametres_convois['formule_tdp']);
					$formule = str_replace('tdp', $valeurs->niveaux->tdp_TE, $formule);
					if ($valeurs->data_convois['bonus'] != 0) {
						$this->membres[$pseudo]->data_convois['besoin'] = eval('return '.Text::carToPow($formule).';') * (1+$valeurs->data_convois['bonus']/100);
					}
					else {
						$this->membres[$pseudo]->data_convois['besoin'] = eval('return '.Text::carToPow($formule).';');
					}
					$this->besoins_totaux += $this->membres[$pseudo]->data_convois['besoin'];
					$this->recolte_totale += (int)($valeurs->data_convois['recolte']*$this->parametres_convois['duree_repartition']);
				}
			}
		}
	}


	public function get_salaires_ftdp() {
		$coeff_revenu = $this->recolte_totale / $this->besoins_totaux;
		foreach ($this->membres as $pseudo => $valeurs) {
			if(isset($this->revenus_fixes[$pseudo])) {
				$this->membres[$pseudo]->data_convois['revenu'] = $this->revenus_fixes[$pseudo];
				$this->membres[$pseudo]->data_convois['convois'] = round($valeurs->data_convois['recolte']*$this->parametres_convois['duree_repartition'] - $this->membres[$pseudo]->data_convois['revenu']);
			}
			elseif($valeurs->data_convois['activation'] != 'true') {
				$this->membres[$pseudo]->data_convois['revenu'] = $valeurs->data_convois['recolte']*$this->parametres_convois['duree_repartition'];
				$this->membres[$pseudo]->data_convois['convois'] = 0;
			}
			else {
				$this->membres[$pseudo]->data_convois['revenu'] = $valeurs->data_convois['besoin']*$coeff_revenu;
				$this->membres[$pseudo]->data_convois['convois'] = round($valeurs->data_convois['recolte']*$this->parametres_convois['duree_repartition'] - $this->membres[$pseudo]->data_convois['revenu']);
			}
		}	
	}

	public function compute_ftdp() {
		if(empty($this->parametres_convois['formule_tdp'])) {
			$this->erreurs[] = 'Formule de répartition inconnue, formule de test 1/tdp utilisée';
			$this->parametres_convois['formule_tdp'] = '1/tdp';
		}
		$this->get_besoins_ftdp();
		$this->get_salaires_ftdp();
	}









	/*
		MISE EN PAGE
	*/

	public function create_Interface() {
		$this->show_errors();
		?>
		<form method="POST" action="<?php echo Zzzelp::$url_site ?>creationconvois/stockage?serveur=<?php echo $this->serveur ?>&alliance=<?php echo $this->alliance ?>">
			<br><br>
			<div class="zone_contenu zone_largeur_courte">
				<a href="#modal" class="bouton">Message</a>		
				<div class="ligne_cadre_structure select_centre">
					<select id="methode_opti">
						<option value=0 <?php  if($this->parametres_convois['algorithme_optimisation'] == 0) { echo 'selected'; } ?>>Meilleure Optimisation</option>
						<option value=1 <?php  if($this->parametres_convois['algorithme_optimisation'] == 1) { echo 'selected'; } ?>>Optimisation Zzzelp</option>
						<option value=2 <?php  if($this->parametres_convois['algorithme_optimisation'] == 2) { echo 'selected'; } ?>>Optimisation Distance pure</option>
						<option value=3 <?php  if($this->parametres_convois['algorithme_optimisation'] == 3) { echo 'selected'; } ?>>Optimisation ID</option>
						<option value=4 <?php  if($this->parametres_convois['algorithme_optimisation'] == 4) { echo 'selected'; } ?>>Optimisation taille reçue</option>
						<option value=5 <?php  if($this->parametres_convois['algorithme_optimisation'] == 5) { echo 'selected'; } ?>>Optimisation ouvrières libres</option>
						<option value=6 <?php  if($this->parametres_convois['algorithme_optimisation'] == 6) { echo 'selected'; } ?>>Optimisation personnalisée</option>
					</select>
				</div>
			</div>
			<?php if($this->complet) { ?>
			<div class="grid grid-pad">
				<div class="col-1-2">
					<div class="zone_contenu zone_invisible">
						<table class="tableau_ombre">
							<tr>
								<th id="th">Pseudo</th>
								<th id="th">Récolte /<?php echo $this->nom_duree ?></th>
								<th id="th">Revenu /<?php echo $this->nom_duree ?></th>
								<th id="th">Convois /<?php echo $this->nom_duree ?></th>
							</tr>
							<?php  foreach ($this->membres as $pseudo => $valeurs) { ?>
							<tr>
								<td id="td"><?php echo $pseudo ?></td>
								<td id="td"><?php echo number_format($valeurs->data_convois['recolte']*$this->parametres_convois['duree_repartition'], 0, '.' , ' ') ?></td>
								<td id="td"><?php echo number_format($valeurs->data_convois['revenu'], 0, '.' , ' ') ?></td>
								<td id="td" <?php  if ($valeurs->data_convois['convois'] > 0) { echo 'style="color: red"'; } else { echo'style="color: green"'; }?>>
									<?php echo number_format(abs($valeurs->data_convois['convois']), 0, '.' , ' ') ?>
								</td>
							</tr>
							<?php  } ?>
						</table>
					</div>
					<br><br>
				</div>
				<div class="col-1-2">
					<div class="zone_contenu zone_invisible">
						<?php  } ?>
						<input type="submit" class="bouton">
						<br>
						<table class="tableau_ombre">
							<tr>
								<th id="th">Expéditeur</th>
								<th id="th">Destinataire</th>
								<th id="th">Valeur</th>
							</tr>
							<?php foreach ($this->convoyeurs as $lanceur => $total_joueur) {foreach($this->optimisation->convois[$lanceur] as $receveur => $convoi) { ?>
							<tr>
								<td id="td"><a href="http://<?php echo $serveur ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $lanceur ?>" target="_BLANK" ><strong><?php echo $lanceur ?></strong></a></td>
								<td id="td"><?php echo number_format(($convoi), 0, '.' , ' ') ?></td>
								<td id="td"><a href="http://<?php echo $serveur ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $receveur ?>" target="_BLANK" ><strong><?php echo $receveur ?></strong></a></td>
							</tr>
							<?php }} ?>
						</table>
						<?php if($this->complet) { ?>
					</div>
					<br><br>
				</div>
				<?php  } ?>
				<input type="hidden" name="convois" value='<?php echo json_encode($this->optimisation->convois) ?>'>
			</form>
			<div id="modal">
				<div class="modal-content">
					<div class="header">
						<h2>Message à copier</h2>
					</div>
					<div class="copy">
						<?php echo $this->message ?>
					</div>
					<div class="cf footer">
						<a href="#" class="button button-flat-primary">Fermer</a>
					</div>
				</div>
				<div class="overlay"></div>
			</div>
			<?php 	
	}

	public function sort_Convois() {
		$this->convoyeurs = array();
		foreach($this->optimisation->convois as $pseudo => $liste) {
			$this->convoyeurs[$pseudo] = $this->get_TotalConvoyeJoueur($liste);
		}
		arsort($this->convoyeurs);
	}

	public function get_TotalConvoyeJoueur($convois) {
		$total = 0;
		foreach($convois as $pseudo => $convoi) {
			$total += $convoi;
		}
		return $total;
	}

	public function create_Message() {
		$this->message = 
		'[b]Quelques valeurs : [/b]<br><br>Total ressources convoyées : '.number_format($this->optimisation->total_ressources, 0, '.', ' ').'<br>
		Total ressources convoyées (<30mn) : '.number_format($this->optimisation->total_ressources_proches, 0, '.', ' ').'<br>
		Part de convois proches (<30mn) : '.number_format(($this->optimisation->total_ressources_proches/$this->optimisation->total_ressources)*100, 2, '.', ' ').' % <br>
		Temps moyen par convois : '.number_format(($this->optimisation->total_distance/$this->optimisation->total_ressources/60), 0, '.', ' ').'mn<br><br>[b]';
		foreach ($this->convoyeurs as $lanceur => $convois_2) {
			$this->message.= '<br>[player]'.$lanceur.'[/player] [/b]('. number_format(array_sum($this->optimisation->convois[$lanceur]), 0, '.' , ' ').')[b]<br><br>';
			foreach($this->optimisation->convois[$lanceur] as $receveur => $convoi) {
				$couleur = Text::codecouleur($this->optimisation->tableau_coordonnees[$lanceur.'/'.$receveur]);
				$this->message .= '[color='.$couleur.']'.number_format($convoi, 0, '.' , ' ').' à [player]'.$receveur.'[/player][/color]'.'<br>';
			}
		}
		$this->message .= '[/b]';
	}

	public function show_errors() {
		foreach($this->erreurs as $erreur) {
			?>
			<div style="color:red;text-align:center;line-height:2.5em;"><?php echo $erreur ?></div>
			<?php
		}
	}



	/*
		STOCKAGE DES CONVOIS
	*/

	/*
		Enregistre les convois
	*/
	public function save_Convois() {
		$bdd = Zzzelp::Connexion_BDD('Actions');
		$convois = json_decode($_POST['convois'], true);
		foreach ($convois as $lanceur => $liste) {
			foreach($liste as $receveur => $valeur) {
				$requete = $bdd->prepare('SELECT valeur FROM Convois WHERE lanceur = :lanceur AND receveur = :receveur AND serveur = :serveur AND alliance = :alliance AND mode = :mode');
				$requete->bindValue(':lanceur', htmlentities($lanceur), PDO::PARAM_STR);
				$requete->bindValue(':receveur', htmlentities($receveur), PDO::PARAM_STR);
				$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
				$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
				$requete->bindValue(':mode', 'mat', PDO::PARAM_STR);
				$requete->execute();
				$resultat = $requete->fetch(PDO::FETCH_ASSOC);
				if(!empty($resultat)) {
					$valeur += (int)$resultat['valeur'];
					$requete = $bdd->prepare('UPDATE Convois SET valeur = :valeur WHERE lanceur = :lanceur AND receveur = :receveur AND serveur = :serveur AND alliance = :alliance AND mode = :mode LIMIT 1');		
				}
				else {
					$requete = $bdd->prepare('INSERT INTO Convois (lanceur, receveur, valeur, serveur, alliance, mode) VALUES(:lanceur, :receveur, :valeur, :serveur, :alliance, :mode)');
				}
				$requete->bindValue(':lanceur', htmlentities($lanceur), PDO::PARAM_STR);
				$requete->bindValue(':receveur', htmlentities($receveur), PDO::PARAM_STR);
				$requete->bindValue(':valeur', $valeur, PDO::PARAM_INT);
				$requete->bindValue(':serveur', $this->serveur, PDO::PARAM_STR);
				$requete->bindValue(':alliance', $this->alliance, PDO::PARAM_STR);
				$requete->bindValue(':mode', 'mat', PDO::PARAM_STR);
				$requete->execute();
			}
		}
	}
}