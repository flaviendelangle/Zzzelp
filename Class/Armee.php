<?php

class Armee {
	
	public $armee;
	public $niveaux;

	public function __construct($armee, $niveaux) {
		$this->armee = $armee;
		$this->niveaux = $niveaux;
	}

	public function new_Armee($armee) {
		return new Armee($armee, $this->niveaux);
	}

	/*
	 * Renvoi l'armée d'un joueur a partir de son armée initiale et du nombre de morts qu'il a subi (aucune XP comptée ici)
	 * (array, int) -> array
	*/
	public function extract_armee($n) {
		$armee_2 = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		$i = 0;
		$k = 0;
		while ($i<$n) {
			if($i + $this->armee[13-$k] <= $n) {
				$i += $this->armee[13-$k];
				$armee_2[13-$k] = $armee[13-$k];
			}
			else {
				$armee_2[13-$k] = $n - $i;
				$i = $n;
			}
			$k++;
		}
		return $armee_2;
	}

	/* 
	 * Renvoi l'armée une fois toute XP y compris les JSN (aucune perte prise en compte) 
	 * array -> array
	*/
	public function get_XP_withJSN() {
		return [0,0,$this->armee[0]+$this->armee[1]+$this->armee[2],0,0,0,$this->armee[5]+$this->armee[6],0,$this->armee[7]+$armee[8],$this->armee[3]+$this->armee[4]+$this->armee[9],0,$this->armee[10]+$this->armee[11],0,$this->armee[12]+$this->armee[13]];
	}

	/* 
	 * Renvoi l'armée une fois toute XP en dehors des JSN (aucune perte prise en compte)
	 * array -> array
	*/
	public function get_XP_withoutJSN() {
		return [$this->armee[0],0,$this->armee[1]+$this->armee[2],0,0,0,$this->armee[5]+$this->armee[6],0,$this->armee[7]+$this->armee[8],$this->armee[3]+$this->armee[4]+$this->armee[9],0,$this->armee[10]+$this->armee[11],0,$this->armee[12]+$this->armee[13]];
	}

	/*
	 * Renvoi la Force de Frappe de l'armée sans compter les bonus (attaque à Armes 0)
	 * array -> int
	*/
	public function get_AttaqueHB() {
		$attaque = 0;
		$coeffs = array(3,5,7,10,15,1,1,30,35,24,55,80,50,55);
		for($i=0; $i<14; $i++) {
			$attaque += $this->armee[$i]*$coeffs[$i];
		}
		return $attaque;
	}

	/*
	 * Renvoi la Vie de l'armée sans compter les bonus (vie en TDC à Bouclier 0)
	 * array -> int
	*/
	public function get_VieHB() {
		$vie = 0;
		$coeffs = array(8,10,13,16,20,30,40,10,12,27,35,50,50,55);
		for($i=0; $i<14; $i++) {
			$vie += $this->armee[$i]*$coeffs[$i];
		}
		return $vie;
	}

	/*
	 * Renvoi la Défense de l'armée sans compter les bonus (défense à Armes 0)
	 * array -> int
	*/
	public function get_DefenseHB() {
		$defense = 0;
		$coeffs = array(2,4,6,9,14,25,35,15,18,23,1,1,50,55);
		for($i=0; $i<14; $i++) {
			$defense += $this->armee[$i]*$coeffs[$i];
		}
		return $defense;
	}

	/*
	 * Renvoi le nombre d'unités de l'armée (équivalent array_sum)
	 * array -> int
	*/
	public function get_CapaFlood() {
		$capa_flood = 0;
		for($i=0; $i<14; $i++) {
			$capa_flood += $this->armee[$i];
		}
		return $capa_flood;
	}

	/*
	 * Renvoi la consommation de l'armée en pommes par jour (0 -> TDC, 1 -> Dôme, 2 -> Loge)
	 * (array, int) -> int
	*/
	public function get_ConsoArmee() {
		$consommation = 0;
		$coeffs = array(16,20,26,30,36,70,100,30,34,44,100,150,80,90);
		$pourcentages = array(0.05,0.1,0.15);
		for($i=0; $i<14; $i++) {
			$consommation += $this->armee[i]*$coeffs[i]*$pourcentages[lieu];
		}
		return (int)$consommation;
	}

	/*
	 * Renvoi le nombre de secondes de ponte à tdp 0 d'une armée (diviser par 31 536 000 pour avoir le nombre d'années)
	 * array -> int
	*/
	public function get_AnneesHOF() {
		$secondes = 0;
		$oeffs = array(300,450,570,740,1000,1410,1410,1440,1520,1450,1860,1860,2740,2740);
		for($i=0; $i<14; $i++) {
			$secondes += $this->armee[$i]*$coeffs[$i];
		}
		return $secondes;
	}

	/*
	 * Renvoi la Vie de l'armée en fonction du lieu et de niveaux de lieu et bouclier (utilise Calcul_vie_HB)
	 * (array, int, int, int) -> int
	*/
	public function get_VieAB() {
		if($this->niveaux['lieu'] == 0) {
			return (int)$this->get_VieHB() * (1+0.1*$this->niveaux['bouclier']);
		}
		else if($this->niveaux['lieu'] == 1) {
			return (int)($this->get_VieHB() * (1+0.05*($this->niveaux['niveau_lieu']+2) + 0.1*$this->niveaux['bouclier']));
		}
		else {
			return (int)($this->get_VieHB() * (1+0.15*($this->niveaux['niveau_lieu']+2) + 0.1*$this->niveaux['bouclier']));
		}
	}

	/*
	 * Renvoi la Force de Frappe de l'armée en fonction du niveau d'Armes (utilise Calcul_attaque_HB)
	 * (array, int) -> int
	*/
	public function get_AttaqueAB() {
		return (int)($this->get_AttaqueHB() * (1+$this->niveaux['armes']*0.1));
	}

	/*
	 * Renvoi la Défense de l'armée en fonction du niveau d'Armes (utilise Calcul_defense_HB)
	 * (array, int) -> int
	*/
	public function get_DefenseAB() {
		return (int)($this->get_DefenseHB() * (1+$this->niveaux['armes']*0.1));
	}


	public function get_VieUnite($i) {
		if($this->niveaux['lieu'] == 0) {
			return Fourmizzz::$unites['vie'][$i]*(1+0.1*$this->niveaux['bouclier']);
		}
		elseif($this->niveaux['lieu'] == 1) {
			return Fourmizzz::$unites['vie'][$i]*(1+0.1*$this->niveaux['bouclier']+($this->niveaux['niveau_lieu']+2)*0.05);
		}
		elseif($this->niveaux['lieu'] == 2) {
			return Fourmizzz::$unites['vie'][$i]*(1+0.1*$this->niveaux['bouclier']+($this->niveaux['niveau_lieu']+2)*0.15);
		}
	}

	public function get_AttaqueUnite($i) {
		return Fourmizzz::$unites['attaque'][$i]*(1+0.1*$this->niveaux['armes']);
	}

	public function get_PuissanceXP() {
		$coeff_XP = 0;
		$coeffs = array(85, 125, 170, 227, 312, 434, 592, 295, 349, 460, 642, 990, 909, 1000);
		//$coeffs = array(1, 1.47058824, 2, 2.670597, 3.670585, 5.1059, 6.96475, 3.47055, 4.1059, 5.411766, 7.55295, 11.6471, 10.694125, 11.764725);
		for($i=0;$i<14;$i++) {
			$coeff_XP += $this->armee[$i]*$coeffs[$i];
		}
		return $coeff_XP;
	}

}