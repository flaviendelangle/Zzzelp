<?php

class Text {
	
	/*
		Transforme le BBCode stocké en base de donnée en du code HTML
		A améliorer avec la version JavaScript
	*/
	static public function bbcode($content) {
		$content = preg_replace('/(\[b\])(.*?)(\[\/b\])/','<strong>$2</strong>',$content);
		$content = preg_replace('/(\[i\])(.*?)(\[\/i\])/','<em>$2</em>',$content);
		$content = preg_replace('/(\[u\])(.*?)(\[\/u\])/','<u>$2</u>',$content);
		$content = preg_replace('/(\[ul\])(.*?)(\[\/ul\])/','<ul>$2</ul>',$content);
		$content = preg_replace('/(\[li\])(.*?)(\[\/li\])/','<li>$2</li>',$content);
		$content = preg_replace('/(\[url=)(.*?)(\])(.*?)(\[\/url\])/','<a href="$2" target="_blank">$4</a>',$content);
		$content = preg_replace('/(\[url\])(.*?)(\[\/url\])/','<a href="$2" target="_blank">$2</a>',$content);
		$content = preg_replace('/(\[player])(.*?)(\[\/player])/','<a href="/Membre.php?Pseudo=$2" target="_BLANK">$2</a>',$content);
		$content = preg_replace('/(\{)(.*?)(\})/','<img src="http://s1.fourmizzz.fr/images/smiley/$2"/>',$content);
		return $content;		
	}

	/*
		Colore un texte en fonction du temps de trajet qui lui est associé
		Utilise pour le Multiflood et les convois
	*/
	static public function codecouleur($temps_trajet) {
		if ($temps_trajet/60 < 29) {
			return '#11AA06';
		}
		elseif ($temps_trajet/60 < 90) {
			return '#FFEE02';
		}
		elseif ($temps_trajet/60 < 180) {
			return '#FF9B05';
		}
		else {
			return '#FF0C00';
		}	
	}

	/*
		Transforme une expression de la forme a^b en une expression compréhensible par PHP du type pow(a,b)
	*/
	static public function carToPow($expression){
	    //array of positions: start of base, position of ^, end of power
	    $pos = array(null,null,null);
	    //array of parts: base and power
	    $parts = array();
	    
	    for($i=0; $i<strlen($expression); $i++){
	        
	        if($expression[$i] === '^'){
	            $pos[1] = $i;
	            
	            //scan for base
	            if($expression[$i-1] === ')'){ //base is a function
	                $depth = 0;
	                for($j=$i-1; $j >= 0; $j--){
	                    if($expression[$j] === ')') $depth++;
	                    if($expression[$j] === '(') $depth--;
	                    if($depth == 0){
	                        $pos[0] = $j;
	                        $parts[0] = substr($expression, $j, $i-$j);
	                        break;
	                    }
	                }
	            } else if($expression[$i-1] === 'x'){ //base is a variable
	                $pos[0] = $i-1;
	                $parts[0] = "x";
	            } else { //base is a number
	                if(preg_match("/\\d*\\.{0,1}\\d+\\^/",$expression,$foo)){
	                    $pos[0] = $i - strlen($foo[0]) + 1;
	                    $parts[0] = substr($foo[0],0,strlen($foo[0])-1);
	                } else return false;
	            }
	            
	            //scan for power
	            if($expression[$i+1] === '('){ //power is a function
	                $depth = 0;
	                for($j=$i+1; $j < strlen($expression); $j++){
	                    if($expression[$j] === '(') $depth++;
	                    if($expression[$j] === ')') $depth--;
	                    if($depth == 0){
	                        $pos[2] = $j;
	                        $parts[1] = substr($expression, $i+1, $j-$i);
	                        break;
	                    }
	                }
	            } else if($expression[$i+1] === 'x'){ //base is a variable
	                $pos[2] = $i+1;
	                $parts[1] = "x";
	            } else { //power is a number
	                if(preg_match("/\\^\\d*\\.{0,1}\\d+/",$expression,$foo)){
	                    $pos[2] = $i + strlen($foo[0]) - 1;
	                    $parts[1] = substr($foo[0],1,strlen($foo[0])-1);
	                } else return false;
	            }
	            
	            if($parts[0] == null || $parts[1] == null) return false;
	            $expression = substr($expression,0,$pos[0]).'pow('.$parts[0].','.$parts[1].')'.substr($expression,$pos[2]+1,strlen($expression)-$pos[2]);
	            return ($expression = self::carToPow($expression)) ? $expression : false;
	            
	        }
	        
	    }
	    return $expression;    
	}  
}