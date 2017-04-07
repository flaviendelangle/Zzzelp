var ZzzelpFloods = function(zone, data) {
    this.zone = zone;
    this.state = {};

    this.init(data);
    console.log(this);
};

ZzzelpFloods.prototype.init = function(data) {
    if(document.querySelectorAll('.zone_zzzelpfloods').length === 0) {
        this.parseData(data);
        this.prepareSondesData();
        this.prepareAntiSondesData();
        this.preparePlayers();
        this.createInterface();
        this.compute();
        this.updateImpactHours();
    }
};

ZzzelpFloods.prototype.destroy = function() {
    this.zone.innerHTML = '';
    for(var key in this) {
        delete this[key];
    }
};

ZzzelpFloods.prototype.parseData = function(data) {
    for(var el in data) {
        this[el] = data[el];
    }
};

ZzzelpFloods.prototype.prepareSondesData = function() {
    if(!this.sondes) {
        this.sondes = [
            { 
                unite : 0, 
                valeur : Math.pow(10, String(parseInt(this.capacity/100000)).length)
            },{ 
                unite : 0, 
                valeur : 1 
            }
        ];
    }
    this.sondes[0].valeur = parseInt(this.sondes[0].valeur);
    this.sondes[1].valeur = parseInt(this.sondes[1].valeur);
};

ZzzelpFloods.prototype.prepareAntiSondesData = function() {
    if(!this.antisondes) {
        this.antisondes = [
            { unite : 0, valeur : 1 },
            { unite : 0, valeur : Math.pow(10, String(parseInt(this.capacity/100000)).length) }
        ];
    }

    this.antisondes[0].valeur = parseInt(this.antisondes[0].valeur);
    this.antisondes[1].valeur = parseInt(this.antisondes[1].valeur);   
};

ZzzelpFloods.prototype.preparePlayers = function() {
    this.pseudos = [];
    for(var joueur in this.coordonnees) {
        this.coordonnees[joueur].TDC_actuel = this.coordonnees[joueur].TDC;
        if(typeof this.coordonnees[joueur].active != 'string' || this.coordonnees[joueur].active != 'NON') {
            var x_1 = parseInt(this.coordonnees[this.username].x),
                y_1 = parseInt(this.coordonnees[this.username].y),
                x_2 = parseInt(this.coordonnees[joueur].x),
                y_2 = parseInt(this.coordonnees[joueur].y);
            this.coordonnees[joueur].distance = ze_Calcul_distance(x_1, y_1, x_2, y_2);
            this.pseudos.push(joueur);
        }
    }
    var coordonnees = this.coordonnees;
    this.pseudos.sort(function (a,b) {
        if(coordonnees[a].distance === coordonnees[b].distance) {
            return 0;
        }
        return (coordonnees[a].distance < coordonnees[b].distance) ? -1 : 1;
    });
};

ZzzelpFloods.prototype.createInterface = function() {
    this.element = document.createElement('div');
    this.element.className = 'zone_zzzelpfloods';
    this.element.id = this.getThemeName();
    this.zone.appendChild(this.element);
    if(this.options) {
        this.createTableOptions();
    }
    var floods_annules = document.createElement('div');
    floods_annules.id = 'floods_annules';
    this.element.appendChild(floods_annules);
    for(var i=0; i<this.pseudos.length; i++) {
        if(this.pseudos[i] != this.username) {
            this.coordonnees[this.pseudos[i]].table = new ZzzelpFloodsPlayer(this.pseudos[i], this);
        }
    }
    if(this.resume) {
        this.createTableSummary();
    }
    this.createLaunchButton();
};

ZzzelpFloods.prototype.getThemeName = function() {
    if(this.theme) {
        return 'theme_' + this.theme;
    }
    else {
        return 'theme_fourmizzz';
    }
};

ZzzelpFloods.prototype.createTableOptions = function() {
    var table = document.createElement('table'),
        options = this.getOptionsList();

    table.id = 'tableau_option';
    this.element.appendChild(table);
    this.createOptionsTitle(table);

    for(var i=0; i<options.length; i++) {
        this.createOptionsLine(table, options[i]);
    }
};

ZzzelpFloods.prototype.createLaunchButton = function() {
    var lancement = document.createElement('div');
    lancement.innerHTML = 'Lancer';
    lancement.className = 'bouton_lancement';
    lancement.onclick = this.send.bind(this);
    this.element.appendChild(lancement);
};

ZzzelpFloods.prototype.getOptionsList = function() {
    var options = [
            { titre : 'Stockage sur Zzzelp',    ID : 'lancement_zzzelp', auto : this.lancement_zzzelp },
            { titre : 'Replacer l\'antisonde',  ID : 'placer_antisonde', auto : this.placer_antisonde }
        ];

    if(typeof this.aide_relance != 'undefined') {
        options.push({ 
            titre : 'Prévenir du retour', 
            ID : 'aide_relance', auto : 
            this.aide_relance, 
            valeur : this.valeur_aide_relance
        });
    }
    if(typeof this.anti_synchro != 'undefined') {
        options.push({
            titre : 'Lancer en fin de minute', 
            ID : 'anti_synchro', 
            auto : this.anti_synchro, 
            valeur : this.seconde_renvoi });         
    }
    return options;
};

ZzzelpFloods.prototype.createOptionsTitle = function(table) {
    var ligne = table.insertRow(0),
        cell = ligne.insertCell(0),
        lien = document.createElement('a');
    cell.onclick = this.showOptions;
    cell.setAttribute('colspan', '2');
    lien.innerHTML = 'Options d\'optimisation';
    cell.appendChild(lien);
};

ZzzelpFloods.prototype.createOptionsLine = function(table, option) {
    var ligne = table.insertRow(-1);
    ligne.setAttribute('style', 'display:none');
    ligne.insertCell(0).innerHTML = option.titre;

    var cell = ligne.insertCell(1),
        choix = document.createElement('input');
    choix.type = 'checkbox';
    choix.id = option.ID;
    choix.checked = option.auto;

    choix.onchange = this.compute.bind(this);
    cell.appendChild(choix);
    if(option.ID == 'anti_synchro') {
        this.createCellAntiSynchro(table, option);
    }
    else if(option.ID == 'aide_relance') {
        this.createCellAideRelance(table, option);
    }    
};

ZzzelpFloods.prototype.createCellAntiSynchro = function(table, option) {
    var ligne = table.insertRow(-1),
        cell = ligne.insertCell(0);
        choix = document.createElement('select');
    ligne.setAttribute('style', 'display:none');
    cell.setAttribute('colspan', '2');
    choix.disabled = !option.auto;
    choix.id = 'seconde_anti_synchro';
    for(var j=55;j<61;j++) {
        var element = document.createElement('option');
        element.value = j%60;
        element.innerHTML = j + 'ème seconde';
        choix.appendChild(element);
    }
    cell.appendChild(choix);
    choix.value = option.valeur;
    choix.onchange = this.compute.bind(this);
};

ZzzelpFloods.prototype.createCellAideRelance = function(table, option) {
    var ligne = table.insertRow(-1),
        cell = ligne.insertCell(0),
        choix = document.createElement('select'),
        possibilites = new Array('Toutes les attaques', 'L\'attaque principale');
    ligne.setAttribute('style', 'display:none');
    cell.setAttribute('colspan', '2');
    choix.disabled = !options[i].auto;
    choix.id = 'choix_aide_relance';
    for(var j=0; j<possibilites.length; j++) {
        var element = document.createElement('option');
        element.value = j+1;
        element.innerHTML = possibilites[j];
        choix.appendChild(element);
    }
    cell.appendChild(choix);
    choix.value = option.valeur;
    choix.onchange = this.compute.bind(this);    
};

ZzzelpFloods.prototype.showOptions = function() {
    var mode = (document.querySelectorAll('#tableau_option tr')[1].style.display == 'none') ? '' : 'none',
        lignes = document.querySelectorAll('#tableau_option tr');
    for(var i=1; i<lignes.length; i++) {
        lignes[i].style.display = mode;
    }
};

ZzzelpFloods.prototype.createTableSummary = function() {
    var table = document.createElement('table'),
        ligne = table.insertRow(0);
    ligne.insertCell(0).innerHTML = 'TDC floodé :';
    ligne.insertCell(1).innerHTML = '0';
    ligne = table.insertRow(1);
    ligne.insertCell(0).innerHTML = 'Nombre de floods : ';
    ligne.insertCell(1).innerHTML = '0';
    ligne = table.insertRow(2);
    ligne.insertCell(0).innerHTML = 'Nombre de sondes : ';
    ligne.insertCell(1).innerHTML = '0';
    table.id = 'resume_floods';
    this.element.appendChild(table);
};

ZzzelpFloods.prototype.updateTableSummary = function() {
    if(document.querySelector('#resume_floods')) {
        var lignes = document.querySelectorAll('#resume_floods tr');
        if(document.querySelectorAll('.TDC_attaquant').length > 0) {
            lignes[0].cells[1].innerHTML = ze_Nombre(parseInt(document.querySelectorAll('.TDC_attaquant')[document.querySelectorAll('.TDC_attaquant').length - 1].innerHTML.replace(/ /g,"")) - parseInt(document.querySelectorAll('td[id*="TDC_depart"]')[0].innerHTML.replace(/ /g,"")));
        }
        else {
            lignes[0].cells[1].innerHTML = 0;
        }
        lignes[1].cells[1].innerHTML = document.querySelectorAll('.TDC_attaquant').length;
        lignes[2].cells[1].innerHTML = document.querySelectorAll('.ligne_sonde').length;
    }
};

ZzzelpFloods.prototype.updateImpactHours = function() {
    setInterval(function() {
        var tableaux = document.querySelectorAll('#optimisation_zzzelpfloods');
        for(var l=0; l<tableaux.length; l++) {
            var timestamp = parseInt(tableaux[l].querySelector('#duree_attaque').innerHTML);
            if(~document.location.href.indexOf('fourmizzz.fr')) {
                timestamp += time_fzzz();
            }
            else {
                timestamp += time();
            }
            var   date = ze_Generation_date_precise(timestamp);
            tableaux[l].querySelector('.heure_arrivee').innerHTML = date;
        }
    }, 1000);
};

ZzzelpFloods.prototype.compute = function(primaire) {
    if(typeof primaire == 'undefined') {
        primaire = true;
    }
    if(~document.location.href.indexOf('fourmizzz.fr')) {
        this.updateParameters();
    }
    for(var joueur in this.coordonnees) {
        this.coordonnees[joueur].TDC_actuel = this.coordonnees[joueur].TDC;
    }
    this.state = { 
        capacity        : this.getInitialCapaFlood(), 
        TDC             : parseInt(this.coordonnees[this.username].TDC), 
        TDC_depart      : parseInt(this.coordonnees[this.username].TDC), 
        floods_annules  : [] 
    };
    var ancien_temps = time();
    for(var i=0; i<this.pseudos.length; i++) {
        if(this.pseudos[i] != this.username) {
            this.state = this.coordonnees[this.pseudos[i]].table.update(this.state);
        }
    }
    if(document.querySelectorAll('tr[data-type="armee_complete"]').length > 0) {
        var cell = document.querySelector('tr[data-type="armee_complete"]').cells[0],
            restant = parseInt(cell.innerHTML.replace(/ /g, '')) + parseInt(this.state.capacity);
        cell.innerHTML = ze_Nombre(restant);
    }
    if(primaire) {
        this.compute(false);
    }
    else if(this.lancement_auto) {
        Lancer_floods();
    }
    this.updateTableSummary();
    this.showCancelledFloods(this.state.floods_annules);
};

ZzzelpFloods.prototype.showCancelledFloods = function(floods) {
    var zone = document.querySelector('#floods_annules'),
        anciennes = zone.querySelectorAll('.ligne_flood_annule');
    for(var i=0; i<anciennes.length; i++) {
        ze_Supprimer_element(anciennes[i]);
    }
    for(i=0; i<floods.length; i++) {
        var flood = document.createElement('div');
        flood.className = 'ligne_flood_annule';
        flood.innerHTML = 'Annulation n°' + (zone.querySelectorAll('.ligne_flood_annule').length + 1) + ' : ' + ze_Nombre(this.variations[floods[i]][0].valeur) + ' cm2 de ' + this.variations[floods[i]][0].attaquant + ' sur ' + this.variations[floods[i]][0].cible;
        zone.appendChild(flood);
    }
};

ZzzelpFloods.prototype.getInitialCapaFlood = function() {
    var capa_flood = parseInt(this.capacity),
        sondes = document.querySelectorAll('#nombre_sonde');
    for(var i=0;i<sondes.length;i++) {
        capa_flood -= parseInt(sondes[i].innerHTML.replace(/ /g, ''));
    }
    if(this.isPlacementAntisondes()) {
        capa_flood -= parseInt(this.antisondes[0].valeur);
        capa_flood -= parseInt(this.antisondes[1].valeur);
    }
    return capa_flood;
};

ZzzelpFloods.prototype.updateParameters = function() {
    this.updateCacheParameters();
    if(typeof this.aide_relance != 'undefined') {
        document.querySelector('#choix_aide_relance').disabled = !this.isAideRelance();
    }
    if(typeof this.anti_synchro != 'undefined') {
        document.querySelector('#seconde_anti_synchro').disabled = !this.isAntiSynchronisation(); 
    }
};

ZzzelpFloods.prototype.updateCacheParameters = function() {
    var data = JSON.parse(localStorage.getItem('zzzelp_parametres_' + this.server));

    data.parametres.zzzelpfloods.parametres.zzzelpfloods_stockage.active = this.isLancementViaZzzelp();
    data.parametres.zzzelpfloods.parametres.zzzelpfloods_antisonde.active = this.isPlacementAntisondes();
    if(typeof this.aide_relance != 'undefined') {
        data.parametres.zzzelpfloods.parametres.zzzelpfloods_relance.active = this.getValeurAideRelance();
        data.zzzelpfloods_prive.mode_relance = this.getValeurAideRelance();
    }
    if(typeof this.anti_synchro != 'undefined') {
        data.parametres.zzzelpfloods.parametres.zzzelpfloods_antisynchro.active = this.getValeurAntiSynchronisation();
        data.zzzelpfloods_prive.seconde = this.getValeurAntiSynchronisation();
    }
    localStorage.setItem('zzzelp_parametres_' + this.server, JSON.stringify(data));
};

ZzzelpFloods.prototype.isLancementViaZzzelp = function() {
    return document.querySelector('#lancement_zzzelp') && document.querySelector('#lancement_zzzelp').checked;
};
    
ZzzelpFloods.prototype.isPlacementAntisondes = function() {
    return document.querySelector('#placer_antisonde') && document.querySelector('#placer_antisonde').checked;
};

ZzzelpFloods.prototype.isAideRelance = function() {
    return document.querySelector('#aide_relance') && document.querySelector('#aide_relance').checked;
};

ZzzelpFloods.prototype.getValeurAideRelance = function() {
    return document.querySelector('#choix_aide_relance') ? parseInt(document.querySelector('#choix_aide_relance').value) : 1;
};

ZzzelpFloods.prototype.isAntiSynchronisation = function() {
    return document.querySelector('#anti_synchro') && document.querySelector('#anti_synchro').checked;
};

ZzzelpFloods.prototype.getValeurAntiSynchronisation = function() {
    return document.querySelector('#seconde_anti_synchro') ? parseInt(document.querySelector('#seconde_anti_synchro').value) : 58;
};

ZzzelpFloods.prototype.send = function() {
    var URL = '[',
        vide = true;
        
    for(var i=0; i<this.pseudos.length; i++) {
        if(this.pseudos[i] != this.username) {
            var sub_url = this.coordonnees[this.pseudos[i]].table.toURL();
            if(sub_url !== null) {
                URL +=  ((URL == '[') ? '' : ':') + sub_url;
                vide = false;
            }
        }
    }
    URL += this.encodeOptions();
    URL = 'http://' + this.server + '.fourmizzz.fr/Armee.php?fl=' + URL;
    if(vide) {
        alert('Aucune attaque à envoyer');
    }
    else {
        if(this.stockage_parametres_zzzelp) {
            this.saveOnZzzelp(URL, 1);
        }
        else {
            document.location.href = URL;
        }
    }
};

ZzzelpFloods.prototype.encodeOptions = function() {
    var URL = ']&s=' + this.server;
    if(this.isPlacementAntisondes()) {
        URL += '&as=[' + ze_Base_10_36(this.antisondes[0].unite) + ',' + ze_Base_10_36(this.antisondes[0].valeur) ;
        URL += ',' + ze_Base_10_36(this.antisondes[1].unite) + ',' + ze_Base_10_36(this.antisondes[1].valeur) + ']';
    }
    if(this.isAntiSynchronisation()) {
        var seconde_att = this.getValeurAntiSynchronisation()*1000,
            seconde_duree = parseInt(((1-Math.exp(-this.coordonnees[this.pseudos[1]].distance/350))*7.375*Math.pow(0.9,this.attack_speed))*86400000)%60000;
        URL += '&sec=' + ((seconde_att + 60000 - seconde_duree)%60000);
    }
    if(this.token && this.token.length > 0) {
        URL += '&token=' + this.token;
    }
    if(this.isAideRelance()) {
        URL += '&relance=' + Valeur_aide_relance();
    }
    if(this.isLancementViaZzzelp()) {
        URL += '&lz';
    }
    else {
        URL += '&lf';
    }
    return URL;
};

ZzzelpFloods.prototype.saveOnZzzelp = function(URL, mode) {
    var parametres = new Array(
        this.isLancementViaZzzelp() ? 1 : 0,
        this.isPlacementAntisondes() ? 1 : 0
    );
    if(typeof this.aide_relance != 'undefined') {
        parametres.push(this.isAideRelance() ? 1 : 0);
        parametres.push(this.getValeurAideRelance());
    }
    else {
        parametres.push(0);
        parametres.push(0);         
    }
    if(typeof this.anti_synchro != 'undefined') {
        parametres.push(this.isAntiSynchronisation() ? 1 : 0);
        parametres.push(this.getValeurAntiSynchronisation()); 
    }
    else {
        parametres.push(0);
        parametres.push(0);             
    }
    var niveaux = '';
    for(var i=0; i<parametres.length; i++) {
        niveaux += ((niveaux === '') ? '' : ',') + parametres[i];
    }
    new ZzzelpAjax({ method : 'GET', domain : 'zzzelp', url : 'niveaux_script?lieu=zzzelpfloods&niveaux=[' + niveaux + ']&', force : mode },
        { success : function(valeurs) {
            document.location.href = URL;
        }, authentication_issue : function() {
            this.saveOnZzzelp(URL, 2);
        }
    });
};