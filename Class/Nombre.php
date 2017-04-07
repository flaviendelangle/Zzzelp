<?php

class Nombre {

	/*
		Majore le nombre a par le nombre b
	*/
	public static function Majoration($a, $b) {
		if($a > $b) {
			return $b;
		}
		else {
			return $a;
		}
	}

	/*
		Minore le nombre a par le nombre b
	*/
	public static function Minoration($a, $b) {
		if($a < $b) {
			return $b;
		}
		else {
			return $a;
		}
	}

	/*
		Ajoute les zeros des milliers au nombre
		( ne fonctionne  pas avec les nombres à virgule)
	*/
	public static function Espaces($nombre) {
		return number_format($nombre, 0, '.' , ' ');
	}

	/*
		Crée une version raccourcie des gros nombres (ex : 256M)
	*/
	public static function Resume($nombre) {
		if ($nombre > 10000000000000) {
			return number_format($nombre/1000000000000, 0, '.' , '').'T';
		}
		elseif ($nombre > 1000000000000) {
			return number_format($nombre/1000000000000, 1, '.' , '').'T';
		}
		elseif ($nombre > 10000000000) {
			return number_format($nombre/1000000000, 0, '.' , '').'G';
		}
		elseif ($nombre > 1000000000) {
			return number_format($nombre/1000000000, 1, '.' , '').'G';
		}
		elseif ($nombre > 10000000) {
			return number_format($nombre/1000000, 0, '.' , '').'M';
		}
		elseif ($nombre > 1000000) {
			return number_format($nombre/1000000, 1, '.' , '').'M';
		}
		elseif ($nombre > 10000) {
			return number_format($nombre/1000, 0, '.' , '').'k';
		}
		elseif ($nombre > 1000) {
			return number_format($nombre/1000, 1, '.' , '').'k';
		}
		else {
			return $nombre;
		}	
	}

}