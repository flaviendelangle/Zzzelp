<?php
   header('content-type: text/css');
   session_start();
   ob_start('ob_gzhandler');
   header('Cache-Control: max-age=31536000, must-revalidate');
   include('../Class/Zzzelp.php');

function Recuperation_parametres() {
	$bdd = Zzzelp::Connexion_BDD('Donnees_site');
	$requete = 'SELECT theme, mode_fond, valeur_fond FROM membres WHERE pseudo = "'.$_SESSION['pseudo'].'"';
	$reponse = $bdd->query($requete);
	$donnees = $reponse->fetch();
	return array('theme' => $donnees['theme'], 'mode_fond' => $donnees['mode_fond'], 'valeur_fond' => $donnees['valeur_fond']);
}

function Recuperation_theme($parametres) {
	$bdd = Zzzelp::Connexion_BDD('Donnees_site');
	$requete = 'SELECT * FROM themes WHERE ID = '.$parametres['theme'];
	$reponse = $bdd->query($requete);
	$donnees = $reponse->fetch();
	$theme = array(
				'fond' => (($parametres['mode_fond'] == 'defaut') ? $donnees['valeur_fond'] : $parametres['valeur_fond']),
				'entete' => array(
									'color' => $donnees['texte_entete']
								),
				'bouton' => array(
									'fond' => $donnees['couleur_1_bouton'],
									'fond_bis' => $donnees['couleur_2_bouton'],
									'ombre' => $donnees['ombre_bouton'],
									'color' => $donnees['texte_bouton']
								),
				'zone_contenu' => array(
									'fond' => $donnees['fond_contenu'],
									'fond_lisible' => $donnees['fond_lisible']
									),
				'table' => array(
									'fond_th' => $donnees['entete_table']
								)
			);
	$reponse->closeCursor(); 	
	$bdd = null;
	return $theme;
}

if($_GET['mode'] == 'auto') {
	$parametres = array('theme' => 1, 'mode_fond' => 'unie', 'valeur_fond' => '#6495ED');
}
else {
	$parametres = Recuperation_parametres();
}

$theme = Recuperation_theme($parametres);
?>



/*
	GENERAL
*/



.zone_opaque{background: none repeat scroll 0 0 rgba(52, 152, 219, 0.0); }


.ligne_cache:hover{
    border-top : 1px solid rgba(0,0,0,0.2) !important;
    border-bottom : 1px solid rgba(0,0,0,0.2) !important;
    background: none repeat scroll 0 0 rgba(255, 255, 255, 0.2) !important;
}
  
.ligne_cache {
    border-top : 1px solid rgba(0,0,0,0) !important;
    border-bottom : 1px solid rgba(0,0,0,0) !important;
    background : transparent !important;
}

body {
	max-width : 100%;
	font-family: Open Sans;
	font-size : 0.95em;
	background : <?php echo $theme['fond'] ?>;
	background-repeat: no-repeat !important;
	vertical-align: middle!important;
	background-position: top center!important;
	background-attachment: fixed!important;
	-webkit-background-size: cover !important; 
	-o-background-size: cover !important; 
	background-size: cover !important;
}

.main {
	min-height : 1200px;
	padding-bottom : 30px;
	padding-top: 4em;
}

a {
	text-decoration: none;
	color : black;
	font-weight : 700;
}


/*
	COULEURS BLOCS
*/

.zone_contenu:not(.zone_invisible):not(.zone_lisible), .ancre:hover {
	background : <?php echo $theme['zone_contenu']['fond'] ?> !important;
}

.zone_lisible, .zone_opaque, .ancre, .hr_manuel, .pop-up-content, .zone_multiflood .menu_cocher {
	background : <?php echo $theme['zone_contenu']['fond_lisible'] ?> !important;
}

#theme_zzzelp table tr:nth-of-type(2n+1), #theme_zzzelp table tr:nth-of-type(2n) .liste_options, #theme_zzzelp table tr:nth-of-type(2n+1) .zone_lien_option:hover, #theme_zzzelp .bouton_lancement:hover, #theme_zzzelp .ligne_mode:hover, #theme_zzzelp .entete_mode {
	background: <?php echo $theme['zone_contenu']['fond'] ?> !important;
}

#theme_zzzelp table tr:nth-of-type(2n), #theme_zzzelp table tr:nth-of-type(2n+1) .liste_options, #theme_zzzelp table tr:nth-of-type(2n) .zone_lien_option:hover, #theme_zzzelp .bouton_lancement, #theme_zzzelp #tableau_option tr:nth-of-type(1):hover, .liste_modes {
	background: <?php echo $theme['zone_contenu']['fond_lisible'] ?> !important;
}


#theme_zzzelp .bouton_lancement, #theme_zzzelp .bouton_lancement:active {
	border: .3em solid <?php echo $theme['zone_contenu']['fond'] ?>;
}

#theme_zzzelp .bouton_lancement:hover {
	border: .3em solid <?php echo $theme['zone_contenu']['fond_lisible'] ?>;
}


.zone_constructions {
	background : rgba(184, 45, 184, 0.7);
}

.zone_authentification_zzzelpscript, .zone_parametres_zzzelpscript {
	background : rgba(26, 188, 156, 0.7);
}

.zone_parametres_chasses, .zone_parametres_floods {
	background : rgba(240, 85, 85, 0.7);
}

.zone_parametres_sondes, .zone_parametres_antisondes {
	background : rgba(33, 87, 226, 0.7);
}

.zone_informations {
	background : rgba(0, 168, 229, 0.7);
}

.zone_recherches {
	background : rgba(238, 140, 55, 0.7);
}

.zone_parametres_chasses th , .zone_parametres_floods th {
	background : rgba(234, 42, 42, 0.8)
}

.zone_parametres_sondes th , .zone_parametres_antisondes th {
	background : rgba(72, 102, 239, 0.8);
}

.cadre_structure .entete_cadre, #tutoriel .entete_cadre {
	background-color : rgba(174, 174, 174, 0.55);
	border-bottom : 1px solid rgba(0, 0, 0, 0.40)
}

.liste_authentifications {
	background : rgba(255, 255, 255, 0.88);
}

.cadre_structure .ligne_cadre_structure:hover, .tableau_discret tr:hover td {
	border-top : 1px solid rgba(0, 0, 0, 0.25) !important;
	border-bottom : 1px solid rgba(0, 0, 0, 0.25) !important;
	background : rgba(255, 255, 255, 1.0) !important;
}
  
.cadre_structure .ligne_cadre_structure, .tableau_discret td {
	border-top : 1px solid rgba(0, 0, 0, 0) !important;
	border-bottom : 1px solid rgba(0, 0, 0, 0) !important;
	background : rgba(255, 255, 255, 0.88) !important;
}

#zone_releves_floods table {
	background : rgba(255, 255, 255, 0.88);
	border : 1px solid rgba(0, 0, 0, 0.40);
}

th {
	background : <?php echo $theme['table']['fond_th'] ?>
}

tr {
	background : rgba(255, 255, 255, 0.88);
}

#popup_modification_alliers tr {
	background : rgba(255, 255, 255, 0) !important;
}


tr:not(.sans_effet):not(.tableau_invisible td):hover {
	background : rgba(255, 255, 255, 1);
}


#ancre_principale, #ancre_floods {
	background : rgba(238, 140, 55, 1) !important;
}

#ancre_imports_manuels, #ancre_convois {
	background : rgba(240, 85, 85, 1) !important;
}

#ancre_sondes, #andre_membres {
	background : rgba(33, 87, 226, 1) !important;
}

#ancre_zzzelpscript, #ancre_zzzelp {
	background : rgba(26, 188, 156, 1) !important;
}

#ancre_principale:hover, #ancre_floods:hover {
	background : rgba(238, 140, 55, 0.7) !important;
}

#ancre_imports_manuels:hover, #ancre_convois:hover {
	background : rgba(240, 85, 85, 0.7) !important;
}

#ancre_sondes:hover, #ancre_membres:hover {
	background : rgba(33, 87, 226, 0.7) !important;
}

#ancre_zzzelpscript:hover, #ancre_zzzelp:hover {
	background : rgba(26, 188, 156, 0.7) !important;
}





/*
	OMBRAGES
*/

.tableau_ombre, .cadre_structure, textarea, .zone_largeur_courte:not(.zone_invisible), .zone_grand_tableau > div, .zone_creation_theme > div:not(#nouveau_theme):not(#nouveau_pack), #nouveau_theme > div, #nouveau_pack > div, .tableau_ponte > div, .pop-up, .zone_ombree {
	box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.6), 0 4px 4px 0 rgba(0, 0, 0, 0.4);
	border : 1px solid rgba(0, 0, 0, 0.30)
}

input[type=text], input[type=password] {
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.65);
}

.zone_creation_theme input, #rangs input, .zone_tableau_vertical input, #multi input, #alliers input, #ennemis input, #tableau_combat input, .tableau_ponte input, #priorites_convois input {
	box-shadow : 0px 0px 0px rgba(0, 0, 0, 0.65) !important;
}


/*
	INPUTS
*/

textarea:not(#editor) {
	display : block;
	padding : 3px;
	height : 125px;
	width : 350px;
	margin : auto;
	margin-bottom : 15px !important;
	max-width : 90%;
}

input[type=text] {
	border: 1px solid #abadb3;
	-moz-border-radius: 0px;
	-webkit-border-radius: 0px;
	-o-border-radius: 0px;
	border-radius: 0px;
	padding-right : 3px;
	padding-left : 3px;
}

input[type=text]:not(.input_gauche) {
	text-align : right;
}


.input_large {
	width : 120px;
	float : right;
}

.input_court {
	width : 85px;
}

.input_tableau_semi_large {
	width : 160px;
}

.input_tableau_large{
	width : 200px;
}

.input_moyen {
	width : 80px;
}

.input_releves {
	margin-left : -3px;
	margin-right : -3px;
	width : 93px;
}

tr td:last-child .input_releves {
	width : 114px !important;
}

.input_haut {
	height : 28px;
}

.ligne_packs[data-actif*="0"] img[src*="Fleche_haut"] {
	visibility : hidden;
}

.select_centre {
	text-align : center;
	margin-bottom : 15px;
}

.select_centre select {
	text-align : center;
	float : center !important;
	width : 100%;
}



/*
	TABLE
*/

table:not(.zone_zzzelpfloods) {
	border-collapse: collapse;
	margin : 0 auto;
	position:relative;
}

th {
	padding: .5em .3em;
	font-size : 0.85em;
	text-align : center;
	line-height : 2.5em;
}

td {
	text-align : center;
	padding: 0 1em;
	line-height : 2.5em;
}

td:not(.taille_normale) {
	font-size : 0.85em;
}

.zone_parametres_floods td, .zone_parametres_chasses td {
	padding-right : 0.4em !important;
	padding-left : 0.4em !important;
}

.zone_grand_tableau {
	text-align : center;
	max-width : calc(100% + 20px);
	margin-bottom : 8em;
}

.zone_grand_tableau > div, .zone_grand_tableau_simple > div {
	display : inline-block;
	max-width : calc(100% - 14px);
	margin : 0 7px;
}

.zone_grand_tableau .zone_tableau:first-child, .zone_grand_tableau_simple .zone_tableau:first-child  {
	margin-left : -1px !important;
}

.zone_grand_tableau .zone_tableau:last-child, .zone_grand_tableau_simple .zone_tableau:last-child  {
	margin-right : -1px !important;
}

.zone_tableau td {
	line-height : 3.5em;
}

.zone_tableau {
	display : inline-block;
	margin : 0 !important;
	vertical-align : top;
}

.zone_grand_tableau .zone_tableau:first-child {
	margin-right : -4px !important;
	width : 100px;
	overflow : hidden;
}

.zone_tableau_alliers .zone_tableau:first-child {
	width : 200px !important;
}

.zone_grand_tableau .zone_tableau:first-child td, .zone_grand_tableau .zone_tableau:first-child th {
	width : 100px !important;
	max-width : 100px !important;
	white-space : nowrap;
}

.zone_grand_tableau .zone_tableau:last-child, .zone_grand_tableau_simple .zone_tableau {
	overflow-y: auto;
	_overflow: auto;
	position: relative;
}

.zone_tableau_alliers table:first-child {
	width : 200px;
}

.zone_grand_tableau .zone_tableau:last-child {
	max-width : calc(100% - 99px);
}

.zone_tableau_alliers .zone_tableau:last-child {
	max-width : calc(100% - 199px) !important;
}

.zone_grand_tableau_simple .zone_tableau {
	max-width : calc(100% - 1px);
}

.tableau_niveaux th, .tableau_niveaux_pseudo th {
	font-size : 0.8em;
}

.tableau_niveaux th {
	width : 65px !important;
}

.zone_tableau:last-child table {
	white-space: nowrap;
}

.zone_grand_tableau .zone_tableau:first-child td {
	text-align : left !important;
	width : 100%;
}

.zone_grand_tableau_simple {
	text-align : center;
}

.zone_tableau::-webkit-scrollbar {
	-webkit-appearance: none;
	width: 14px;
	height: 9px;
}
	
.zone_tableau::-webkit-scrollbar-thumb {
	background-color: rgba(0, 0, 0, .3);
}

.zone_tableau_vertical {
	max-height : 600px;
	width : 370px;
	max-width : 100%;
	margin : auto;
	overflow-y : scroll;
	overflow-x : hidden;
}

.zone_tableau_double {
	max-height : 600px;
	width : 500px;
	max-width : 100%;
	margin : auto;
	overflow-y: auto;
	overflow-x: auto;
	_overflow: auto;
}

.zone_tableau_vertical table {
	width : 100%;
}

.zone_tableau_double table {
	min-width : 100%;
}

#compte_plus {
	margin-top : 0 !important;
}




/*
	ANCRES
*/

.ancre {
	line-height : 2em;
	text-align : center;
	font-weight : 600;
	max-width : 300px;
	margin : 2em auto;
	cursor : pointer;
	box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.3), 0 4px 4px 0 rgba(0, 0, 0, 0.2);
}


.barre_nav {
	max-width: 100%;
}

.barre_nav .ancre {
	line-height: 3em !important;
	border-radius: 10px;
}

.barre_nav .ancre[data-selected="1"] {
	background: #A90F03 !important;
}

.barre_nav .ancre[data-selected="0"] {
	background: #F44336 !important;
}

/*
	MENU
*/

.cbp-hrmenu {
	background : rgba(255,255,255,1);
}



/*
	CADRES STANDARDS
*/

.zone_contenu:not(.flat-form) {
	margin-right : 10px;
}

.entete_cadre, .entete_cadre a, .grand_entete_cadre {
	text-align : center;
	font-size : 1.3em;
	font-weight : 600;
	line-height : 2.3em;
	margin-bottom : 0em;
	color : <?php echo $theme['entete']['color'] ?>;
	overflow: hidden;   
	text-overflow : ellipsis;
	white-space: nowrap;
	padding-left : 10px;
	padding-right : 10px;
}

.entete_cadre {
	width : 100%;
}

.grand_entete_cadre {
	font-size : 1.7em !important;
}

.zone_lisible .entete_cadre {
	width : 95% !important; 
	margin: auto; 
	border-bottom: 1px solid rgba(0, 0, 0, 0.4);
	border-left: 1px solid rgba(0, 0, 0, 0.4);
	border-right: 1px solid rgba(0, 0, 0, 0.4);
	box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.65);

}

.sous_entete_cadre {
	text-align : center;
	font-weight : bold;
	margin : 8px 0;
}
	

.coutenu_textuel, #popup_debuter_zzzelp {
	padding : 10px;
	font-size : 0.9em;
	text-align : justify;
	text-indent : 15px;
	line-height : 1.55em;
}

#popup_debuter_zzzelp li {
	line-height : 1.9em;
}


#popup_debuter_zzzelp p {
	margin : 25px 0;
}

#popup_debuter_zzzelp a {
	font-weight : 600 !important;
	border-bottom: dashed 1px rgba(0, 0, 0, .75);
}

#popup_debuter_zzzelp h2 {
	text-align : center;
}

.menu_deroulant_image img {
	display : block;
}

.menu_deroulant_image {
	visibility : hidden;
	padding : 0;
	position: absolute;
	overflow-y: hidden;
	overflow-x: hidden;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.65);
	cursor:pointer;	
	background : white;
	margin-top: -3em;
	margin-left: -25px;
	width: 70px;
}


td:hover > .menu_deroulant_image, td:active > .menu_deroulant_image {
	visibility : visible;
	z-index : 60000;
}

.menu_deroulant_image img {
	width: 24px;
	margin: 22px;
}

.zone_opaque {
	margin : 0 -30px;
}

.ligne_selectionnee {
	font-weight : bold;
}

#liste_themes div:not(:first-child) {
	cursor : pointer;
}

.col-1-1 .cadre_structure {
	margin : 0 25px;
}

.cadre_structure {
	position: relative;
}

.ligne_inputs {
	float : right;
	width: calc(100% - 200px) !important;
	text-align: right;
}

.zone_bug {
	margin : 20px auto;
	max-width : 80%;
	width : 500px;
	font-weight : bold;
	font-size : 1.4em;
	line-height : 2em;
	text-align : center;
	color : red;
	padding : 10px;
}

#zone_RC {
	text-align : center;
}




/*
	BOUTON
*/

.bouton.disabled{
	box-shadow:none;
 	background : #CCC !important;
	border: 1px solid #DDD; !important;
}
.bouton{
	display : block;
	vertical-align: middle;
	height: 34px;
	line-height: 32px;
	padding: 0px 10px;
	font-weight: 300;
	text-decoration: none;
	text-align: center;
	margin : 1.8em auto;
	width : 180px;
	box-shadow:inset 0px 1px 0px 0px <?php echo $theme['bouton']['ombre'] ?>, 2px 2px 2px 0 rgba(0,0,0,0.4);
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, <?php echo $theme['bouton']['fond_bis'] ?>), color-stop(1, <?php echo $theme['bouton']['fond'] ?>));
	background:-moz-linear-gradient(top, <?php echo $theme['bouton']['fond_bis'] ?> 5%, <?php echo $theme['bouton']['fond'] ?> 100%);
	background:-webkit-linear-gradient(top, <?php echo $theme['bouton']['fond_bis'] ?> 5%, <?php echo $theme['bouton']['fond'] ?> 100%);
	background:-o-linear-gradient(top, <?php echo $theme['bouton']['fond_bis'] ?> 5%, <?php echo $theme['bouton']['fond'] ?> 100%);
	background:-ms-linear-gradient(top, <?php echo $theme['bouton']['fond_bis'] ?> 5%, <?php echo $theme['bouton']['fond'] ?> 100%);
	background:linear-gradient(to bottom, <?php echo $theme['bouton']['fond_bis'] ?> 5%, <?php echo $theme['bouton']['fond'] ?> 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='<?php echo $theme['bouton']['fond_bis'] ?>', endColorstr='<?php echo $theme['bouton']['fond'] ?>',GradientType=0);
	background-color:<?php echo $theme['bouton']['fond_bis'] ?>;
	moz-border-radius:6px;
	webkit-border-radius:6px;
	border-radius:6px;
	border:1px solid rgba(0,0,0,0.3);
	cursor:pointer;
	color:<?php echo $theme['bouton']['color'] ?>;
}

.bouton_large {
	width : 250px !important;
}

.bouton_court {
	width : 120px !important;
}

.bouton:hover {
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, <?php echo $theme['bouton']['fond'] ?>), color-stop(1, <?php echo $theme['bouton']['fond_bis'] ?>));
	background:-moz-linear-gradient(top, <?php echo $theme['bouton']['fond'] ?> 5%, <?php echo $theme['bouton']['fond_bis'] ?> 100%);
	background:-webkit-linear-gradient(top, <?php echo $theme['bouton']['fond'] ?> 5%, <?php echo $theme['bouton']['fond_bis'] ?> 100%);
	background:-o-linear-gradient(top, <?php echo $theme['bouton']['fond'] ?> 5%, <?php echo $theme['bouton']['fond_bis'] ?> 100%);
	background:-ms-linear-gradient(top, <?php echo $theme['bouton']['fond'] ?> 5%, <?php echo $theme['bouton']['fond_bis'] ?> 100%);
	background:linear-gradient(to bottom, <?php echo $theme['bouton']['fond'] ?> 5%, <?php echo $theme['bouton']['fond_bis'] ?> 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='<?php echo $theme['bouton']['fond'] ?>', endColorstr='<?php echo $theme['bouton']['fond_bis'] ?>',GradientType=0);
	background-color:<?php echo $theme['bouton']['fond'] ?>;
}
.bouton:active {
	position:relative;
	top:1px;
}

.bouton_rouge{
   box-shadow:inset 0px 1px 0px 0px #bbdaf7, 2px 2px 2px 0 rgba(0,0,0,0.4);
   background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #F77C7C), color-stop(1, #F04040));
   background:-moz-linear-gradient(top, #F77C7C 5%, #F04040 100%);
   background:-webkit-linear-gradient(top, #F77C7C 5%, #F04040 100%);
   background:-o-linear-gradient(top, #F77C7C 5%, #F04040 100%);
   background:-ms-linear-gradient(top, #F77C7C 5%, #F04040 100%);
   background:linear-gradient(to bottom, #F77C7C 5%, #F04040 100%);
   filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#F77C7C', endColorstr='#F04040',GradientType=0);
   background-color:#F77C7C;
   -moz-border-radius:6px;
   -webkit-border-radius:6px;
   border-radius:6px;
   border:1px solid rgba(0,0,0,0.3);
   cursor:pointer;
   color:rgba(0,0,0,1);
   text-decoration:none;
}
   
.bouton_rouge:hover {
   background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #F04040), color-stop(1, #F77C7C));
   background:-moz-linear-gradient(top, #F04040 5%, #F77C7C 100%);
   background:-webkit-linear-gradient(top, #F04040 5%, #F77C7C 100%);
   background:-o-linear-gradient(top, #F04040 5%, #F77C7C 100%);
   background:-ms-linear-gradient(top, #F04040 5%, #F77C7C 100%);
   background:linear-gradient(to bottom, #F04040 5%, #F77C7C 100%);
   filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#F04040', endColorstr='#F77C7C',GradientType=0);
   background-color:#F04040;
}   
   
.bouton_turquoise{
   box-shadow:inset 0px 1px 0px 0px #bbdaf7, 2px 2px 2px 0 rgba(0,0,0,0.4);
   background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #76CDB0), color-stop(1, #14B27D));
   background:-moz-linear-gradient(top, #76CDB0 5%, #14B27D 100%);
   background:-webkit-linear-gradient(top, #76CDB0 5%, #14B27D 100%);
   background:-o-linear-gradient(top, #76CDB0 5%, #14B27D 100%);
   background:-ms-linear-gradient(top, #76CDB0 5%, #14B27D 100%);
   background:linear-gradient(to bottom, #76CDB0 5%, #14B27D 100%);
   filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#F77C7C', endColorstr='#F04040',GradientType=0);
   background-color:#76CDB0;
   -moz-border-radius:6px;
   -webkit-border-radius:6px;
   border-radius:6px;
   border:1px solid rgba(0,0,0,0.3);
   cursor:pointer;
   color:rgba(0,0,0,1);
   text-decoration:none;
}
   
.bouton_turquoise:hover {
   background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #14B27D), color-stop(1, #F77C7C));
   background:-moz-linear-gradient(top, #14B27D 5%, #76CDB0 100%);
   background:-webkit-linear-gradient(top, #14B27D 5%, #76CDB0 100%);
   background:-o-linear-gradient(top, #14B27D 5%, #76CDB0 100%);
   background:-ms-linear-gradient(top, #14B27D 5%, #76CDB0 100%);
   background:linear-gradient(to bottom, #14B27D 5%, #76CDB0 100%);
   filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#14B27D', endColorstr='#76CDB0',GradientType=0);
   background-color:#14B27D;
}



/*
	POPUPS
*/

.pop-up-background{
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.85);
  cursor : auto;
}  

.pop-up-content {
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.6);
    box-shadow: 0 1px 10px 2px rgba(255,255,255, 0.1);
    min-height: 30px;
    padding: 24px;
}

.pop-up .close{
   background : url(http://clg-victor-hugo-bourges.tice.ac-orleans-tours.fr/php5/images/general/croix.png) no-repeat;
   width : 20px;
   height : 20px;
}
  
.pop-up .close:hover{
   background : url(http://www.cavadeos.com/extension/cavadeos/design/cavadeos/images/btn_croix-blanche.png) no-repeat;
   width : 20px;
   height : 20px;
}
  

.pop-up-main-content textarea#releve_armee  {
   background: none repeat scroll 0 0 rgba(255, 255, 255, 0.85);
}




.recherche_ajax {
	background : <?php echo $theme['zone_contenu']['fond_lisible'] ?> !important;
}

.ligne_autocomplete:hover {
	background : <?php echo $theme['zone_contenu']['fond'] ?> !important;
}

.hauteur_courte {
	margin-top : 0px !important;
}

#zone_releves_floods input{
	padding-left : 2px;
	padding-right : 2px;
}

.zone_validation_compte {
	text-align : center;
	margin : 20px 0;
}

.zone_informations, .zone_constructions, .zone_recherches {
	height : 735px;
}

.zone_parametres_sondes, .zone_parametres_antisondes {
	height : 250px;
}

.zone_parametres_floods, .zone_parametres_chasses {
	padding-bottom : 40px;
}

.zone_parametres_zzzelpscript, .zone_liste_convois, .zone_aide {
	padding : 0 50px;
}

.zone_ombree {
	margin : 25px auto;
	width: calc(100% - 10px);
}

.zone_parametres_sondes th , .zone_parametres_antisondes th, .zone_parametres_sondes td, .zone_parametres_antisondes td {
	border: 0 !important;
	height : 3em;
	
}

.zone_explication {
	background : rgba(255, 255, 255, 1) !important;
	padding : 25px;
	font-size:0.90em;
	line-height : 1.5em;
	text-align : justify;
}

.zone_explication li {
	line-height : 2.5em;
}


.zone_parametres_floods table, .zone_parametres_chasses table {
	margin : 0 auto;
}

.nom_court, .ligne_cache {
	display : none;
	
}

.liste_authentifications {
	margin : auto;
	width : 200px;
}

#tutoriel img {
	max-width : 80%;
	display : block;
	margin : 20px auto;
	-moz-border-radius: 8px;
	-webkit-border-radius: 8px;
	-khtml-border-radius: 8px;
	border-radius: 8px;
}

#tutoriel li {
	margin-bottom : 75px;
}

#presentation li{
	margin : 5px;
}

#presentation li:before{
    content: "→ ";
}

#presentation p {
	text-indent:50px;
	text-align:justify;
}

#carte_joueurs {
	display : block;
	height : 400px;
}

.tel, .tel_2 {
	display : none;
}



.entete_categories {
	height:3em;
	line-height:3em;
	text-align: center;
}

.entete_categories > span {
	font-weight:600;
	padding:10px;
	cursor:pointer;
	color:#2E2E2E;
}

.entete_categories > span:hover, .entete_categories > span[data-actif*="1"] {
	color : white;
}

.ligne_packs {
	min-height: 3em;
	height: initial;
	line-height: normal;
	display: inline-block;
	width: 100%;
}



@media handheld, only screen and (max-width: 1110px) {
	#carte_joueurs {
		display : none;
	}
}

@media (max-width: 1000px),(max-device-width: 1000px), (max-width: 768px),(max-device-width: 768px) { 
	.non_tel_2 {
		display : none;
	}
	.tel_2 {
		display : block;
	}
}

@media (max-width: 767px),(max-device-width: 767px), (max-width: 450px),(max-device-width: 450px) {
	.tel_2 {
		display : none;
	}
	.non_tel_2 {
		display : block;
	}
}

@media (max-width: 767px),(max-device-width: 767px) { 
	.zone_contenu:not(.flat-form), .zone_informations, .zone_constructions, .zone_recherches, .zone_authentification_zzzelpscript, .zone_parametres_zzzelpscript, .zone_informations, .zone_parametres_sondes, .zone_parametres_antisondes, .zone_parametres_chasses, .zone_parametres_floods, .zone_invisible {
		height : auto;
	}
	
	.zone_tableau_vertical, .zone_tableau_vertical table {
		width : calc(100% + 20px);
	}
	
	
	.ancre {
		margin-right : 10px !important;
		width : calc(100% - 40px);
		max-width : 727px;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3), 0 1px 1px 0 rgba(0, 0, 0, 0.2);
	}
	
	.zone_largeur_courte {
		border : 0px;
		margin : 10px auto !important;
		padding : 5px;
	}
	
	.zone_opaque {
		margin : -5px;
		padding : 0 5px;
	}
	
	table:not(.tableau_large_fixe):not(.tableau_large_scrollable):not(.zone_tableau_vertical table) {
		margin-top : 20px !important;
		margin-right : auto !important;
		margin-left : auto !important;
		max-width : calc(100% - 24px)
	}
	
	.zone_parametres_sondes, .zone_parametres_antisondes {
		padding-bottom : 30px;
	}

	.grid {
		padding : 0 !important;
	}
	.zone_parametres_zzzelpscript {
		padding : 10px;
	}
	
	textarea {
		width : 280px !important;
	}
	
	.cadre_structure {
		margin : 0 !important;
		width : 100%;
	}
	
	.zone_largeur_courte .ligne_cadre_structure {
		padding : 0px;
	}

	.grid div[class*='col-'] {
		padding-left : 0px !important;
		margin-top : 0px !important;
		margin-bottom : 0px !important;
	}
	
	.entete_cadre {
		font-size : 1.15em;
	}
	
	body {
		font-size : 0.84em;
	}
	
	.ligne_cadre_structure img {
		height : 2em;
		margin : 0;
	}
	
	.input_haut {
		height : 20px;
	}

	.tableau_ombre, .cadre_structure, textarea, .zone_largeur_courte:not(.zone_invisible), .zone_grand_tableau > div, .zone_creation_theme > div:not(#nouveau_theme):not(#nouveau_pack), #nouveau_theme > div, #nouveau_pack > div, .tableau_ponte > div, .pop-up {
		box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.8), 0 2px 2px 0 rgba(0, 0, 0, 0.6);
	}
}

@media (max-width: 450px),(max-device-width: 450px) { 
	.non_tel, .non_tel_2 {
		display : none;
	}
	
	.tel, .tel_2 {
		display : inline;
	}
	
	.ligne_cadre_structure {
		height : 4em;
	}

	.input_court {
		width : 65px;
	}

	.input_court::-webkit-input-placeholder { 
		font-size : 0.8em;
	}

	.input_court::-moz-placeholder { 
		font-size : 0.8em;
	}
	
	.input_semi_court {
		width : 80px;
		font-size : 0.9em;
	}
	
	.bouton_court {
		font-size : 0.9em !important;
		width : 100px !important;
	}
	
	.zone_largeur_courte, .zone_ombree {
		margin-left : 5px !important;
	}
}

@media (max-width: 75em),(max-device-width: 75em) { 	
	.nom_long {
		display : none;
	}

	.nom_court:not(.bouton) {
		display : inline;
	}
	
	.bouton.nom_court {
		display : block;
	}
}









/*
	Menu Zzzelp
*/

.menu_zzzelp {
	text-align: center;
	width: 100%;
	margin-top: 0;
	background : #2196f3;
	z-index : 500;
	box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.3), 0 4px 4px 0 rgba(0, 0, 0, 0.2);
	position : fixed;
	//border-bottom: 4px solid #47a3da;
}

.menu_zzzelp ul * {
	text-align : left;
}

/* general ul style */
.menu_zzzelp ul {
	margin: 0;
	padding: 0;
	list-style-type: none;
}

/* first level ul style */
.menu_zzzelp > ul,
.menu_zzzelp .contenu_detail_menu {
	width: 100%;
	max-width: 70em;
	margin: 0 auto;
	padding: 0 1.875em;
}

.menu_zzzelp > ul > li {
	z-index: 10;
	display: inline-block;
	text-align: center;
}

.menu_zzzelp > ul > li > span {
	cursor : pointer;
	font-weight: 700;
	padding: 0.8em 2em;
	color: white;
	text-shadow: 1px 1px #2E2E2E;
	display: inline-block;
}

/* Menu */
.sous_menu_zzzelp[data-categorie="compte"] .detail_menu {
	background: #47A3DA;
}

/* Outils alliance */
.sous_menu_zzzelp[data-categorie="outils_alliance"] .detail_menu {
	background: #42B578;
}

/* Outils joueur */
.sous_menu_zzzelp[data-categorie="outils_joueur"] .detail_menu {
	background: #E89C5A;
}

/* Gestion Alliances */
.sous_menu_zzzelp[data-categorie="gestion_alliance"] .detail_menu {
	background: #F34949;
}

/* Connexion */
.sous_menu_zzzelp[data-categorie="gestion_alliance"] .detail_menu {
	background: #9B59B6;
}





.menu_zzzelp .detail_menu {
	position: absolute;
	width: 100%;
	left: 0;
}

.detail_menu {
	overflow : hidden;
	z-index : 999;
	max-height : 0px;
	opacity : 0;
	box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.3), 0 4px 4px 0 rgba(0, 0, 0, 0.2);
}

.detail_menu[data-affiche="1"] {
	opacity : 1;
	max-height : 500px;
    -webkit-transition: max-height 0.7s linear;
    -moz-transition: max-height 0.7s linear;
    -o-transition: max-height 0.7s linear;
    -ms-transition: max-height 0.7s linear;
    transition: max-height 0.7s linear;
}

.menu_zzzelp .contenu_detail_menu > div {
	width: 33%;
	float: left;
	padding: 0 2em 0;
}

.contenu_detail_menu ul {
	padding-bottom: 3em;
}

.contenu_detail_menu * {
	color : white;
}

.menu_zzzelp .contenu_detail_menu:before,
.menu_zzzelp .contenu_detail_menu:after {
	content: " ";
	display: table;
}

.menu_zzzelp .contenu_detail_menu:after {
	clear: both;
}

.menu_zzzelp .contenu_detail_menu > div a {
	line-height: 2em;
}

/* Titre des sous menu */
.detail_menu h4 {
	padding: 2em 0 0.6em;
	margin: 0;
	font-size: 160%;
	font-weight: 300;
}

/* Examples for media queries */

@media screen and (max-width: 58.5em) { 

	.menu_zzzelp {
		font-size: 80%;
	}

}

@media screen and (max-width: 43em) { 

	.menu_zzzelp {
		font-size: 120%;
		border: none;
	}

	.menu_zzzelp > ul,
	.menu_zzzelp .contenu_detail_menu {
		width: 100%;
		padding: 0;
	}

	.menu_zzzelp .contenu_detail_menu {
		padding: 0 2em;
		font-size: 75%;
	}

	.menu_zzzelp > ul > li {
		display: block;
	}

	.menu_zzzelp > ul > li:not(:last-child) {
		border-bottom: 4px solid #9E9E9E;
	}

	.menu_zzzelp > ul > li > a { 
		display: block;
		padding: 1em 3em;
	}

	.menu_zzzelp .detail_menu { 
		position: relative;
	}

	.detail_menu h4 {
		padding-top: 0.6em;
	}

	.detail_menu {
		box-shadow : none;
	}

	.main {
		padding-top : 0;
	}

	.menu_zzzelp {
		position : relative;
	}
}

@media screen and (max-width: 36em) { 
	.menu_zzzelp .contenu_detail_menu > div {
		width: 100%;
		float: none;
		padding: 0 2em;
	}
}




.menu_zzzelp > ul > li:hover{
	background: rgba(0,0,0,0.08)
}