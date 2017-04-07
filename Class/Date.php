<?php

class Date {
	
	public $timestamp;

	public function __construct($timestamp) {
		$this->timestamp = $timestamp;
	}

	public function date_SQL() {
		return date('Y-m-d G:i:s', $this->timestamp);
	}

	public function date_simple() {
		return date('d/m/y', $this->timestamp);
	}

	static public function date_to_timestamp($date) {
		if(preg_match('#([ 0-9]{2})\/([ 0-9]{2})\/([ 0-9]{2,4})( |  | à |)([ 0-9]{2})(h|:)([ 0-9]{2})(:([0-9]{2})|)#', $date, $resultats)) {
			return mktime((int)$resultats[5], (int)$resultats[7], 0, (int)$resultats[2], (int)$resultats[1], 2000 + (int)$resultats[3]%2000);
		}
		else {
			return 0;
		}
	}

	static public function get_listejours_statistiques($debut, $fin) {  
	  $liste_jours[$debut] = 0; 
	  $date_actuelle = $debut;  	  
	  while($date_actuelle < $fin - 86400 - 3600*2){  
	    $date_actuelle = strtotime("+1 day", $date_actuelle);  
	    $liste_jours[$date_actuelle] = 0;  
	  }
	  return $liste_jours;  
	}

	static public function Secondes_to_HOF($secondes) {
		$annees = ($secondes - $secondes % 31536000) / 31536000; ;
		$secondes = $secondes % 31536000;
		$jours = ($secondes - $secondes % 86400) / 86400;
		$secondes = $secondes % 86400;
		$heures = ($secondes - $secondes % 3600) / 3600;
		$secondes = $secondes % 3600;
		$minutes = ($secondes - $secondes % 60) / 60;
		$secondes = $secondes % 60;
		
		$date =  (($annees > 0) ? Nombre::Espaces($annees).'A ' : '');
		$date .= (($jours > 0) ? $jours.'J ' : '').(($heures > 0) ? $heures.'H ' : '') + $minutes.'m ';
		return $date;
	}
}