function Nettoyer_valeurs() {
	autocompletion(document.querySelector('#alliances'), { mode : 'alliance', serveur : document.querySelector('#serveur').value, multiple : true });
	autocompletion(document.querySelector('#joueurs'), { mode : 'joueur', serveur : document.querySelector('#serveur').value, multiple : true });	
	document.querySelector('#alliances').value = '';
	document.querySelector('#joueurs').value = '';
}

function Chargement_coordonnees() {
	var xdr = ze_getXDomainRequest(),
		alliances = document.querySelector('#alliances').value,
		joueurs = document.querySelector('#joueurs').value,
		serveur = document.querySelector('#serveur').value;
	xdr.onload = function() {
		var coordonnees = JSON.parse(xdr.responseText);
		Creation_tableau(coordonnees);
		Affichage_carte(coordonnees);
	}
	xdr.open('GET', url_zzzelp + 'coordonnees?serveur=' + serveur + '&alliances=[' + alliances +']&joueurs=[' + joueurs + ']', true);
	xdr.send();
}

function Creation_tableau(coordonnees) {
	document.querySelector('#zone_distance').innerHTML = '<table id="tableau_coordonnees" class="tableau_ombre tableau_triable"><thead><tr><th colspan="2" id="th"><select id="liste_joueurs" onchange="MAJ_tableau()"></select></th></tr></thead><tbody></tbody></table>';		
	for(var i=0;i<coordonnees.length;i++) {
		var option = document.createElement('option');
		option.innerHTML = coordonnees[i].pseudo;
		option.setAttribute('value', coordonnees[i].ID);
		document.querySelector('#liste_joueurs').appendChild(option);
		var cell, ligne;
		var tableau = document.querySelector('#tableau_coordonnees');
		ligne = tableau.insertRow(document.querySelectorAll('#tableau_coordonnees tr').length);
		ligne.setAttribute('class', 'ligne_triable');
		cell = ligne.insertCell(0);
		cell.setAttribute('class', 'td');
		cell.innerHTML = '<span id="joueur_' + coordonnees[i].ID + '" data-x="' + coordonnees[i].x + '" data-y="' + coordonnees[i].y + '">' + coordonnees[i].pseudo + '</span>';
		cell = ligne.insertCell(1);
		cell.setAttribute('id', 'td');
		cell.setAttribute('style', 'text-align:right');
		cell.innerHTML = '';
		cell = ligne.insertCell(2);
		cell.setAttribute('style', 'display:none');
		cell.innerHTML = '<input type="hidden" value="0" class="distance">';
	}
	MAJ_tableau();
}


function MAJ_tableau() {
	if(document.querySelectorAll('#tableau_coordonnees').length > 0) {
		var ID = document.querySelector('#liste_joueurs').value,
			X = document.querySelector('#joueur_' + ID).dataset.x,
			Y = document.querySelector('#joueur_' + ID).dataset.y,
			lignes = document.querySelectorAll('#tableau_coordonnees tr');
		for(var i=1;i<lignes.length;i++) {
			var X_2 = lignes[i].querySelectorAll('td')[0].querySelector('span').dataset.x,
				Y_2 = lignes[i].querySelectorAll('td')[0].querySelector('span').dataset.y,
				distance = Calcul_distance(X, Y, X_2, Y_2);
			lignes[i].querySelector('.distance').value = distance;
			if(distance == 0) {
				lignes[i].style.display = 'none';
			}
			else {
				lignes[i].style.display = '';
			}
			lignes[i].querySelectorAll('td')[1].innerHTML = ze_Secondes_date(Calcul_temps_trajet(distance));
		}
		Trie_tableau('distance', Trie_numerique)
	}
}

function Calcul_distance(X, Y, X_2, Y_2) {
	return Math.sqrt(Math.pow(X-X_2,2)+Math.pow(Y-Y_2,2));
}

function Calcul_temps_trajet(distance) {
	var	vitesse_attaque = parseInt(document.querySelector('#vitesse_attaque').value),
		temps_trajet = parseInt(((1-Math.exp(-distance/350))*7.375*Math.pow(0.9,vitesse_attaque))*86400);
	return temps_trajet;
}


function Affichage_carte (coordonnees) {
	var series = new Array(),
		alliances = new Array(),
		couleurs = new Array('red', 'blue', 'green', 'orange', 'purple', 'black');
	for(var i=0; i<coordonnees.length; i++) {
		var joueur = coordonnees[i];
		if(typeof alliances[joueur.alliance] == 'undefined') {
			var n = series.length;
			alliances[joueur.alliance] = n;
			series.push({
				name : joueur.alliance,
	        	color: couleurs[n%couleurs.length],
	            dataLabels: {
	                enabled: true,
	                x:40,
	                formatter:function() {
	                    return this.point.name;
	                },
	                style:{color:"black"}
	            },
	            data: []
	        });
		}
		series[alliances[joueur.alliance]].data.push({
			"x": joueur.y,
			"y": joueur.x,
			"z": 200,
			"name": joueur.pseudo
		});
	}
	$(function () {
		$('#carte_joueurs').highcharts({
	       chart: {
	            type: 'scatter',
	            zoomType: 'xy'
	        },
	        title: 'Position des joueurs',
	        xAxis: {
	            title: {
	                enabled: false,
	            }
	        },
	        yAxis: {
	            title: {
	                enabled: false,
	            }
	        },
	        plotOptions: {
	            scatter: {
	                marker: {
	                    radius: 5,
	                    states: {
	                        hover: {
	                            enabled: false, // True pour remettre le hover
	                            lineColor: 'rgb(100,100,100)'
	                        }
	                    }
	                },
	                states: {
	                    hover: {
	                        marker: {
	                            enabled: false
	                        }
	                    }
	                },
	            }
	        },
	        series: series
		});
	});
}

function Trie_numerique(a,b){
	a=a[1]
	b=b[1]
	if(parseInt(a) == parseInt(b)) {
		return 0
	}
	if(parseInt(a) > parseInt(b))
		return -1
	if(parseInt(a) < parseInt(b))
		return 1
	return 0
}
 
function Trie_texte(a,b){
	a=a[1]
	b=b[1]
	if(a.toLowerCase() > b.toLowerCase())
		return 1
	if(a.toLowerCase() < b.toLowerCase())
		return -1
	return 0
}

function Trie_inutile(a,b) {
	for(var n=0;n<a.length;n++) {
		if(a[n][1] != b[n][1]) {
			return false;
		}
	}
	return true;
}

function Trie_tableau(mode, fonction_trie) {
	var mybody = document.querySelector('.tableau_triable tbody');
	var lines = document.querySelectorAll('.ligne_triable');
	var modes = document.querySelectorAll('.' + mode);
	var sorter = new Array()
	sorter.length=0;
	for(var i=0;i<lines.length;i++) {
		sorter.push([lines[i],modes[i].value])
	}
	sorter_bis = sorter.slice(0);
	sorter.sort(fonction_trie);
	var inverse = Trie_inutile(sorter, sorter_bis)
	mybody.innerHTML = '';
	var longueur = sorter.length;
	for(var i=0;i<longueur;i++) {
		if(!inverse) {
			mybody.appendChild(sorter[longueur-i-1][0]);
		}
		else {
			mybody.appendChild(sorter[i][0]);
		}
	}
}

