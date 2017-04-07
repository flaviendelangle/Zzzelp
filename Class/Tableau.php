<?php


class Tableau {
	
	/*
		Trie un tableau associatif en fonction de l'une de ces clés
	*/
	public static function key_sort($a, $subkey, $reverse = false) {
	    if (!$a) {
	        return array();
	    }
	    $b = array();
	    foreach ($a as $k => $v) {
	        $b[$k] = strtolower($v[$subkey]);
	    }
	    if ($reverse) {
	        arsort($b);
	    }
	    else {
	        asort($b);  
	    }
	    $c = array();
	    foreach ($b as $key => $val) {
	        $c[] = $a[$key];
	    }
	    return $c;
	}

	public static function median($arr) {
		sort($arr);
		$count = count($arr);
		$middleval = floor(($count-1)/2);
		if($count % 2) {
			$median = $arr[$middleval];
		}
		else {
			$low = $arr[$middleval];
			$high = $arr[$middleval+1];
			$median = (($low+$high)/2);
		}
		return $median;
	}
}