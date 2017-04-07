// ==UserScript==
// @name          ZzzelpScript
//
// @include       http://*.fourmizzz.fr/*
// @include       http://zzzelp.fr/*
//
// @match         http://*.fourmizzz.fr/*
// @match     	  http://zzzelp.fr/*
//
// @author        delangle  
// @namespace     http://zzzelp.fr/   
// @version       3.0
// ==/UserScript==

    var ZzzelpScript = document.createElement('script');
    ZzzelpScript.src = 'http://zzzelp.fr/Userscripts/zzzelpscript.js';
    ZzzelpScript.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(ZzzelpScript);
