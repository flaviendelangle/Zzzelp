<?php

class Parser {

	public static function parse_Floods($releves) {
		$attaque = $releves."\n";
		$match = array();
		$liste_expr_armee = array(
		  "((?<nb_jsn>[0-9 ]+) Jeunes Soldates Naines[\.,])?",
		  "((?<nb_sn>[0-9 ]+) Soldates Naines[\.,])?",
		  "((?<nb_ne>[0-9 ]+) Naines d\'[Eé]lites[\.,])?",
		  "((?<nb_jso>[0-9 ]+) Jeunes Soldates[\.,])?",
		  "((?<nb_so>[0-9 ]+) Soldates[\.,])?",
		  "((?<nb_c>[0-9 ]+) Concierges[\.,])?",
		  "((?<nb_ce>[0-9 ]+) Concierges d\'[Eé]lites[\.,])?",
		  "((?<nb_a>[0-9 ]+) Artilleuses[\.,])?",
		  "((?<nb_ae>[0-9 ]+) Artilleuses d\'[Eé]lites[\.,])?",
		  "((?<nb_soe>[0-9 ]+) Soldates d\'[Eé]lites[\.,])?",
		  "((?<nb_tk>[0-9 ]+) Tanks[\.,])?",
		  "((?<nb_tke>[0-9 ]+) Tanks d\'[Eé]lites[\.,])?",
		  "((?<nb_tu>[0-9 ]+) Tueuses[\.,])?",
		  "((?<nb_tue>[0-9 ]+) Tueuses d\'[Eé]lites[\.,])?",
		);
		$expr_armee = implode($liste_expr_armee, "");
		$pattern = "/\- Vous allez attaquer (?<pseudo>.+?)(\((?<alliance>.+?)\))?( \((?<lieu>.+?)\))? dans (?<time>.*?)\n(Troupes en attaques : ".$expr_armee.")?/";
		// echo "<pre>".htmlentities($pattern)."</pre>";
		preg_match_all($pattern,$attaque, $match);

		for($i=1;$i<36;$i++) {
		  unset($match[$i]);
		}
		$floods = array();
		foreach($match[0] as $k => $v) {
			$nb = 0;
			$nb += intval(str_replace(' ','',$match['nb_jsn'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_sn'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_ne'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_jso'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_so'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_c'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_ce'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_a'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_ae'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_soe'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_tk'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_tke'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_tu'][$k]));
			$nb += intval(str_replace(' ','',$match['nb_tue'][$k]));
			$time = str_replace(" - Annuler",'',$match['time'][$k]);
			if(strstr($time, 'jours') OR strstr($time, 'secondes') OR strstr($time, 'heures')) {
				$time = str_replace(" jours",' days',$time);
				$time = str_replace(" secondes",' seconds',$time);
				$time = str_replace(" heures",' hours',$time);
			}
			else {
				$time = str_replace("s",' seconds',$time);
				$time = str_replace("H",' hours',$time);
				$time = str_replace("m",' minutes',$time);
			}
			$time = '+'.$time;
			$arrivee = strtotime($time);
			$floods[] = array(
			'pseudo' => $match['pseudo'][$k],
			'valeur' => $nb,
			'retour' => (int)$arrivee
		  );
		}
		return $floods;
	}

	public static function parse_Chasses($releves) {
		$chasses = $releves."\n";
		$match = array();
		$pattern = "/\- Vos chasseuses vont conquérir (?<nb_tdc>[0-9 ]+) cm² dans (?<time>.*?)\n/";
		preg_match_all($pattern,$chasses, $match);
		for($i=1;$i<3;$i++) {
			unset($match[$i]);
		}
		$floods = array('valeur' => 0, 'retour' => 0);
		foreach($match[0] as $k => $v) {
			$time = str_replace(" - Annuler",'',$match['time'][$k]);
			$time = str_replace(" jours",' days',$time);
			$time = str_replace(" secondes",' seconds',$time);
			$time = str_replace(" heures",' hours',$time);
			$time = '+'.$time;
			$arrivee = strtotime($time);
			$floods['valeur'] += (int)str_replace(' ','',$match['nb_tdc'][$k]);
			$floods['retour'] = (int)$arrivee;
		}
		return array($floods);
	}


}


?>