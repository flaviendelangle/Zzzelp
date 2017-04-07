// ==UserScript==
// @name          Simulateur de Chasses ZzzelpScript
//
// @include       http://test.fourmizzz.fr/*
//
// @match         http://test.fourmizzz.fr/*
//
// @author        delangle  
// @namespace     http://zzzelp.fr/   
// @version       0.1
// ==/UserScript==

var ZzzelpScript = document.createElement('script');
ZzzelpScript.src = 'http://localhost/static/SimulationsChasse.js';
ZzzelpScript.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(ZzzelpScript);
