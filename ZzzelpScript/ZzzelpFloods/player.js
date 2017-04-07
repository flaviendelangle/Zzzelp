var ZzzelpFloodsPlayer = function(pseudo, instance) {

    this.pseudo = pseudo;
    this.instance = instance;
    this.server = instance.server;
    this.element = instance.element;
    this.coordonnees = instance.coordonnees;
    this.attack_speed = instance.attack_speed;
    this.mode_temp = instance.mode;
    this.init();

};

ZzzelpFloodsPlayer.modes = [
    { nom : 'Choix du mode',                    valeur : 'false' },
    { nom : 'Optimisation classique',           valeur : 'classique'},
    { nom : 'TDC voulu attaquant',              valeur : 'TDC_attaquant'},
    { nom : 'TDC voulu cible',                  valeur : 'TDC_cible'},
    { nom : 'Optimisation + armée au début',    valeur : 'armee_debut'},
    { nom : 'Optimisation + armée en fin',      valeur : 'armee_fin'},
    { nom : 'Série d\'attaques identiques',     valeur : 'serie_attaques' },
    { nom : 'Attaque classique',                valeur : 'armee_complete'},
    { nom : 'Sonde + Attaque classique',        valeur : 'armee_complete_sonde'},
    { nom : 'Sondes Dôme + Loge',               valeur : 'sonde' },
    { nom : 'Manuel',                           valeur : 'inconnu' }
];

ZzzelpFloodsPlayer.manualAddings = [
    { nom : 'Type de ligne à ajouter',  valeur : 'false' },
    { nom : 'Flood manuel',             valeur : 'manuel'},
    { nom : 'Sonde manuelle',           valeur : 'sonde'}
];

ZzzelpFloodsPlayer.places = ['TDC', 'Dôme', 'Loge'];

ZzzelpFloodsPlayer.modificationLinks = [
    { 
        lien_image  : 'suppression.png', 
        action      : 'supprimer', 
        title       : 'Supprimer la ligne' 
    },{ 
        lien_image  : 'edit.png', 
        action      : 'modifier', 
        title       : 'Modifier la ligne'
    }
];

ZzzelpFloodsPlayer.prototype.getTDCAttaquant = function() {
    return parseInt(this.TDC_attaquant.innerHTML.replace(/ /g, ''));
};

ZzzelpFloodsPlayer.prototype.getTDCCible = function() {
    return parseInt(this.TDC_cible.innerHTML.replace(/ /g, ''));
};

ZzzelpFloodsPlayer.prototype.setTDCAttaquant = function(newTDC) {
    this.TDC_attaquant.innerHTML = ze_Nombre(newTDC);
};

ZzzelpFloodsPlayer.prototype.setTDCCible = function(newTDC) {
    this.TDC_cible.innerHTML = ze_Nombre(newTDC);
};

ZzzelpFloodsPlayer.prototype.init = function() {
    this.data = this.coordonnees[this.pseudo];
    this.table = document.createElement('table');

    this.table.dataset.nfloods = 0;
    if(this.coordonnees[this.pseudo].TDC > 2*this.data.TDC || this.data.TDC > this.coordonnees[this.pseudo].TDC*3) {
        this.mode = 'impossible';
    }
    else if(this.mode_temp) {
        this.mode = this.mode_temp;
    }
    else {
        this.mode = 'classique';
    }
    this.table.id = 'optimisation_zzzelpfloods';
    this.table.className = 'optimisation_' + this.data.ID;

    this.createFirstLine();
    this.createSecondLine();
    this.element.appendChild(this.table);
};

ZzzelpFloodsPlayer.prototype.createFirstLine = function() {
    var line = this.table.insertRow(0);

    this.createCellHeureArrivee(line);
    this.createCellAttacker(line);
    this.createCellTarget(line);

    if(this.table.dataset.mode_opti != 'impossible') {
        this.createCellManualAdding(line);
        this.createCellModes(line);
    }
    else {
        cell = line.insertCell(3);
        cell.setAttribute('colspan', '2');
        var intouchable = document.createElement('span');
        intouchable.innerHTML = 'Joueur HDP';
        intouchable.className = 'joueur_intouchable';
        cell.appendChild(intouchable);  
    }
};

ZzzelpFloodsPlayer.prototype.createSecondLine = function() {
    var line = this.table.insertRow(1),
        cell = line.insertCell(0);
    cell.innerHTML = 'TDC départ : ';

    this.TDC_attaquant = line.insertCell(1);
    this.TDC_attaquant.id = 'TDC_depart_' + this.data.ID;
    this.TDC_attaquant.innerHTML = '0';

    this.TDC_cible = line.insertCell(2);
    this.TDC_cible.innerHTML = ze_Nombre(this.data.TDC);

    cell = line.insertCell(3);
    cell = line.insertCell(4);    
};


ZzzelpFloodsPlayer.prototype.createCellHeureArrivee = function(line) {
    var cell = line.insertCell(0),
        temps_trajet = parseInt(ze_Calcul_temps_trajet(this.data.distance, this.attack_speed));

    this.coordonnees[this.pseudo].temps = temps_trajet;

    var zone_duree = document.createElement('span');
    zone_duree.innerHTML = temps_trajet;
    zone_duree.className = 'invisible';
    zone_duree.id = 'duree_attaque';

    var zone_arrivee = document.createElement('span');
    zone_arrivee.className = 'heure_arrivee';
    cell.appendChild(zone_duree);
    cell.appendChild(zone_arrivee);
};

ZzzelpFloodsPlayer.prototype.createCellAttacker = function(line) {
    var cell = line.insertCell(1),
        lien_joueur = document.createElement('a');
    lien_joueur.href = 'http://' + this.server + '.fourmizzz.fr/Membre.php?Pseudo=' + this.instance.username;
    lien_joueur.target = '_blank';
    lien_joueur.innerHTML = this.instance.username;
    cell.appendChild(lien_joueur);
};

ZzzelpFloodsPlayer.prototype.createCellTarget  = function(line) {
    var cell = line.insertCell(2),
        lien_joueur = document.createElement('a');
    lien_joueur.href = 'http://' + this.server + '.fourmizzz.fr/Membre.php?Pseudo=' + this.pseudo;
    lien_joueur.target = '_blank';
    lien_joueur.innerHTML = this.pseudo;
    cell.appendChild(lien_joueur);
};

ZzzelpFloodsPlayer.prototype.createCellManualAdding = function(line) {
    var cell = line.insertCell(3),
        ajout = document.createElement('img'),
        zone_liens = document.createElement('div');

    cell.className = 'menu_modes';
    zone_liens.className = 'liste_modes';
    ajout.src = ZzzelpScript.url + 'Images/plus.png';

    for(var i=0; i<ZzzelpFloodsPlayer.manualAddings.length; i++) {
        var zone_lien = document.createElement('div'),
            choisi = document.createElement('span'),
            contenu = document.createElement('span');
        contenu.innerHTML = ZzzelpFloodsPlayer.manualAddings[i].nom;
        zone_lien.className = 'ligne_mode';
        zone_lien.dataset.mode = ZzzelpFloodsPlayer.manualAddings[i].valeur;
        if(i > 0) {
            zone_lien.className = 'ligne_mode';
            zone_lien.onclick = this.applyChoiceNewLine.bind(this);
        }
        else {
            zone_lien.className = 'entete_mode';
        }
        zone_lien.appendChild(contenu);
        zone_lien.appendChild(choisi);
        zone_liens.appendChild(zone_lien);
    }
    cell.appendChild(ajout);
    cell.appendChild(zone_liens);
};

ZzzelpFloodsPlayer.prototype.createCellModes = function(line) {
    this.modesHTML = [];
    var cell = line.insertCell(4),
        edit = document.createElement('img'),
        zone_liens = document.createElement('div');

    cell.className = 'menu_modes';
    zone_liens.className = 'liste_modes';
    edit.src = ZzzelpScript.url + '/Images/edit.png';
    
    for(var i=0; i<ZzzelpFloodsPlayer.modes.length; i++) {
        var zone_lien = document.createElement('div'),
            choisi = document.createElement('span'),
            contenu = document.createElement('span');
        contenu.innerHTML = ZzzelpFloodsPlayer.modes[i].nom;
        zone_lien.dataset.mode = ZzzelpFloodsPlayer.modes[i].valeur;
        if(i > 0) {
            zone_lien.className = 'ligne_mode';
            zone_lien.onclick = this.applyMode.bind(this);
        }
        else {
            zone_lien.className = 'entete_mode';
        }
        zone_lien.appendChild(contenu);
        zone_lien.appendChild(choisi);
        zone_liens.appendChild(zone_lien);
        this.modesHTML.push(zone_lien);
    }
    cell.appendChild(edit);
    cell.appendChild(zone_liens);
};

ZzzelpFloodsPlayer.prototype.applyMode = function() {
    this.clean();
    this.mode = event.target.closest('div').dataset.mode;
    this.instance.compute();
};

ZzzelpFloodsPlayer.prototype.update = function(state) {
    this.state = state;
    var valeur, i;
    //valeurs = this.computeExternalData(ancien_temps, time() + donnees.coordonnees[pseudos[t]].temps, pseudos[t]);
    ancien_temps = this.coordonnees[this.pseudo].temps;

    this.showCurrentMode();
    if(this.mode != 'inconnu') { 
        this.clean();
    }
    this.setTDCAttaquant(this.state.TDC);
    
    if(this.mode == 'classique' || this.mode == 'armee_debut' || this.mode == 'armee_fin') {
        this.classicOptimization();
    }
    else if(this.mode == 'armee_complete') {
        this.fullArmy();
    }
    else if(this.mode == 'armee_complete_sonde') {
        this.fullArmySonde();
    }
    else if(this.mode == 'TDC_attaquant' || this.mode == 'TDC_cible') {
        this.prepareWantedTDC();
    }
    else if(this.mode == 'TDC_attaquant_validation' || this.mode == 'TDC_cible_validation') {
        this.TDCWanted();
    }
    else if(this.mode == 'serie_attaques') {
        this.prepareSeriesOfAttacks();
    }
    else if(this.mode == 'serie_attaques_validation') {
        this.seriesOfAttacks();
    }
    else if(this.mode == 'sonde') {
        this.doubleSonde();
    }
    else if(this.mode == 'manuel') {
        this.manualMode();
    }
    else if(this.mode == 'inconnu') {
        this.unknownMode();
    }

    return this.state;
};

ZzzelpFloodsPlayer.computeExternalData = function(debut, fin, joueur, valeurs) {
    this.coordonnees[this.instance.username].TDC_actuel = valeurs.TDC_attaquant;
    if(this.variations) {
        for(i=0; i<this.variations.length; i++) {
            if(this.variations[i][0].date >= debut && this.variations[i][0].date <= fin) {
                this.variations[i].valeur = parseInt(this.variations[i].valeur); 
                var valeur = this.isFloodPossible(this.variations[i][0]);
                if(this.coordonnees[this.variations[i][0].attaquant]) {
                    this.coordonnees[this.variations[i][0].attaquant].TDC_actuel += valeur;
                }
                if(this.coordonnees[this.variations[i][0].cible]) {
                    this.coordonnees[this.variations[i][0].cible].TDC_actuel -= valeur;
                }
                if(valeur == -1 && valeurs.floods_annules.indexOf(i) == -1) {
                    valeurs.floods_annules.push(i);
                }
            }
        }
    }
    valeurs.TDC_cible = this.coordonnees[joueur].TDC_actuel;
    valeurs.TDC_attaquant = this.coordonnees[this.pseudo].TDC_actuel;
    return valeurs;
};

    
ZzzelpFloodsPlayer.isFloodPossible = function(flood) {
    if(this.coordonnees[flood.cible] && this.coordonnees[flood.attaquant]) {
        if(this.coordonnees[flood.attaquant].TDC_actuel <= 2*this.coordonnees[flood.cible].TDC_actuel && this.coordonnees[flood.cible].TDC_actuel <= this.coordonnees[flood.attaquant].TDC_actuel*3) {
            return parseInt(ze_Majoration(flood.valeur, this.coordonnees[flood.cible].TDC_actuel*0.2));
        }
        else {
            return 0;
        }
    }
    else {
        return flood.valeur;
    }
};

ZzzelpFloodsPlayer.isWithinRange = function() {
    if(this.getTDCAttaquant() < 2*this.getTDCCible()) {
        return false;
    }
    else if(this.getTDCCible() > this.getTDCAttaquant()*3) {
        return false;
    }
    return true;
};

ZzzelpFloodsPlayer.prototype.classicOptimization = function() {
    var optimisation = new ZzzelpFloodsOptimization(this.getTDCAttaquant(), this.getTDCCible(), this.state.capacity, this.mode, -1);
    this.updateInterface(optimisation);
    this.state.TDC = optimisation.getTDCAttaquant();
    this.state.capacity = optimisation.getCapacity();
};

ZzzelpFloodsPlayer.prototype.fullArmy = function() {
    var optimisation = ZzzelpFloodsOptimization.create({ 
        1 : {
            manual : false,
            full_army : true,
            value : ze_Majoration(this.state.capacity, this.getTDCCible()*0.2) 
        }
    });
    this.state.capacity -= ze_Majoration(this.state.capacity, this.getTDCCible()*0.2);
    this.updateInterface(optimisation);
};

ZzzelpFloodsPlayer.prototype.fullArmySonde = function(state) {
    this.validateSonde(0, 1, this.instance.sondes[0], false);
    this.state.capacity -= this.instance.sondes[0].valeur;
    var optimisation = ZzzelpFloodsOptimization.create({ 
        1 : {
            manual : false,
            full_army : true,
            value : ze_Majoration(this.state.capacity, this.getTDCCible()*0.2) 
        }
    });
    this.state.capacity -= ze_Majoration(this.state.capacity, this.getTDCCible()*0.2);
    this.updateInterface(optimisation);
};

ZzzelpFloodsPlayer.prototype.seriesOfAttacks = function() {
    var floods = {};
    for(i=0; i<this.nombre_attaques; i++) {
        if(this.state.capacity >= this.valeur_attaques) {
            floods[i] = {
                manual : false,
                full_army : false,
                value : this.valeur_attaques
            };
            this.state.capacity -= this.valeur_attaques;
        }
        else if(this.state.capacity > 0) {
            floods[i] = {
                manual : false,
                full_army : false,
                value : this.state.capacity
            };
            this.state.capacity = 0;
        }
    }
    var optimisation = ZzzelpFloodsOptimization.create(floods);
    this.updateInterface(optimisation);
};

ZzzelpFloodsPlayer.prototype.TDCWanted = function() {
    var floods = {},
        marge;
    if(this.mode == 'TDC_attaquant_validation') {
        marge = this.TDC_voulu - this.getTDCAttaquant();
    }
    else {
        marge = this.getTDCCible() - this.TDC_voulu;
    }
    var optimisation = new ZzzelpFloodsOptimization(
        this.getTDCAttaquant(),
        this.getTDCCible(),
        this.state.capacity,
        this.mode, marge
    );
    this.updateInterface(optimisation);

    this.state.TDC = optimisation.getTDCAttaquant();
    this.state.capacity = optimisation.getCapacity();
};

ZzzelpFloodsPlayer.prototype.doubleSonde = function() {
    this.validateSonde(0, 1, this.instance.sondes[0], false);
    this.validateSonde(0, 2, this.instance.sondes[1], false);
};

ZzzelpFloodsPlayer.prototype.manualMode = function() {
    //Initialisation_mode_manuel_joueur(ID);   
};

ZzzelpFloodsPlayer.prototype.unknownMode = function() {
    var lines = this.table.rows,
        TDC_attaquant = this.getTDCAttaquant(),
        TDC_cible = this.getTDCCible();
    for(i=2;i<lines.length;i++) {
        if(lines[i].className != 'ligne_preparation' && lines[i].className != 'ligne_sonde') {
            var cells = lines[i].cells,
                valeur_prise;
            if(this.isWithinRange()) {
                var ex_prise = parseInt(cells[0].innerHTML.replace(/ /g, ""));
                valeur_prise = ze_Majoration(ex_prise, Math.floor(TDC_cible*0.2));
            }
            else {
                valeur_prise = 0;
            }
            this.state.capacity -= parseInt(cells[0].innerHTML.replace(/ /g, ""));
            TDC_attaquant += valeur_prise;
            TDC_cible -= valeur_prise;
            cells[1].innerHTML = ze_Nombre(TDC_attaquant);
            cells[2].innerHTML = ze_Nombre(TDC_cible);
        }
    }
    this.state.TDC = TDC_attaquant;
};

ZzzelpFloodsPlayer.prototype.prepareWantedTDC = function() {
    var ligne = this.table.insertRow(2),
        cell = ligne.insertCell(0),
        input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'TDC voulu pour ' + ((this.mode == 'TDC_attaquant') ? 'l\'attaquant' : 'la cible');
    input.id = 'TDC_voulu';
    input.onkeyup = function onkeyup(event) {
        ze_Ajout_espaces(this);
        return false;
    };
    cell.appendChild(input);
    cell.setAttribute('colspan', '5');
    var validation = document.createElement('img');
    validation.src = ZzzelpScript.url + 'Images/valider.png';
    validation.onclick = this.validateWantedTDC.bind(this);
    validation.className = 'preparation_libre';
    cell.appendChild(validation);
};

ZzzelpFloodsPlayer.prototype.prepareSeriesOfAttacks = function() {
    var ligne = this.table.insertRow(-1),
        cell = ligne.insertCell(0),
        nombre = document.createElement('input'),
        texte_1 = document.createElement('span'),
        valeur = document.createElement('input'),
        texte_2 = document.createElement('span'),
        validation = document.createElement('img');
    cell.setAttribute('colspan', '5');
    nombre.type = 'text';
    nombre.className = 'petit_input';
    texte_1.innerHTML = 'attaques de';
    valeur.type = 'text';
    valeur.onkeyup = function onkeyup(event) {
        ze_Ajout_espaces(this);
        return false;
    };
    texte_2.innerHTML = ' unités';
    validation.src = ZzzelpScript.url + 'Images/valider.png';
    validation.onclick = this.validateSeriesOfAttacks.bind(this);
    validation.className = 'preparation_libre';
    cell.appendChild(nombre);
    cell.appendChild(texte_1);
    cell.appendChild(valeur);
    cell.appendChild(texte_2);
    cell.appendChild(validation);
};

ZzzelpFloodsPlayer.prototype.validateWantedTDC = function() {
    this.mode += '_validation';
    this.TDC_voulu = parseInt(this.table.querySelector(' #TDC_voulu').value.replace(/ /g,""));
    this.instance.compute();
};

ZzzelpFloodsPlayer.prototype.validateSeriesOfAttacks = function() {
    this.mode = 'serie_attaques_validation';
    this.nombre_attaques = parseInt(this.table.querySelectorAll('input')[0].value);
    this.valeur_attaques = parseInt(this.table.querySelectorAll('input')[1].value.replace(/ /g, ''));
    this.instance.compute();
};

ZzzelpFloodsPlayer.prototype.validateSonde = function(n, lieu, sonde, nettoyage) {
    var ligne, cell;
    if(!nettoyage) {
        ligne = this.table.insertRow(-1);
        cell = ligne.insertCell(0);
        cell.setAttribute('colspan', '3');
        cell = ligne.insertCell(1);
        this.setPlace(cell);
        cell = ligne.insertCell(2);
        this.setModificationLinks(cell);
    }
    else {
        ligne = this.table.rows[n];
    }

    ligne.className = 'ligne_sonde';
    cell = ligne.cells[0];
    var valeur = document.createElement('span');

    if(nettoyage) {
        ze_Supprimer_element(cell.querySelector('img'));
        ze_Supprimer_element(cell.querySelector('select'));
        ze_Supprimer_element(cell.querySelector('input'));
    }
    cell.innerHTML = 'Sonde de ';
    valeur.innerHTML = ze_Nombre(sonde.valeur) + ' ';
    valeur.id = 'nombre_sonde';
    cell.appendChild(valeur);
    var nom_unite = document.createElement('span');
    nom_unite.innerHTML = ZzzelpArmy.TAGs[sonde.unite];
    nom_unite.id = 'unite_sonde';
    cell.appendChild(nom_unite);
    ligne.querySelector('.lieu').innerHTML = ZzzelpFloodsPlayer.places[lieu];
};
    
ZzzelpFloodsPlayer.prototype.showCurrentMode = function() {
    for(var i=0; i<this.modesHTML.length; i++) {
        if(this.modesHTML[i].querySelectorAll('img').length > 0) {
            ze_Supprimer_element(this.modesHTML[i].querySelector('img'));
        }
    }
    if(this.mode != 'impossible') {
        var mode = this.mode;
        if(mode.match(new RegExp('(.*)_validation'))) {
            mode = new RegExp('(.*)_validation').exec(this.mode)[1];
        }
        var span = this.table.rows[0].cells[4].querySelectorAll('[data-mode="' + mode + '"] span')[1],
            img = document.createElement('img');
        img.src = ZzzelpScript.url + '/Images/icone_attaque.gif';
        span.appendChild(img);
    }
};

ZzzelpFloodsPlayer.prototype.clean = function() {
    while(this.table.rows.length > 2) {
        var ligne = this.table.rows[2];
        ligne.parentNode.removeChild(ligne);
    }
};

ZzzelpFloodsPlayer.prototype.updateInterface = function(optimisation) {
    for(var k in optimisation.getFloods()) {
        this.addLine(optimisation.get(k), k);
    }
};

ZzzelpFloodsPlayer.prototype.addLine = function(flood, index) {
    var line, cell;
    if(flood.isManual()) {
        line = this.table.insertRow(index);
    }
    else {  
        line = this.table.insertRow(-1);
    }
    line.dataset.type = flood.isFullArmy() ? 'armee_complete' : 'attaque';
    cell = line.insertCell(0);
    cell.innerHTML = ze_Nombre(flood.getValue());
    var i = line.dataset.numero;
    for(var t=1; t<line.rowIndex; t++) {
        if(this.table.rows[t].className != 'ligne_sonde') {
            ancien_att = parseInt(this.table.rows[t].cells[1].innerHTML.replace(/ /g,""));
            ancien_def = parseInt(this.table.rows[t].cells[2].innerHTML.replace(/ /g,""));
        }
    }
    if(ancien_att <= 2*ancien_def && ancien_def <= ancien_att*3) {
        valeur_flood = ze_Majoration(flood.getValue(), Math.floor(ancien_def*0.2));
        cell = line.insertCell(1);
        cell.className = 'TDC_attaquant';
        if(valeur_flood == -2) {
            valeur_flood = ancien_def*0.2;
        }
        cell.innerHTML = ze_Nombre(ancien_att + valeur_flood);
        cell = line.insertCell(2);
        cell.innerHTML =  ze_Nombre(ancien_def - valeur_flood);
    }
    else {
        cell = line.insertCell(1);
        cell.className = 'TDC_attaquant';
        cell.innerHTML = ze_Nombre(ancien_att);
        cell = line.insertCell(2);
        cell.innerHTML =  ze_Nombre(ancien_def);
    }
    cell = line.insertCell(3);
    this.setPlace(cell);
    cell = line.insertCell(4);
    this.setModificationLinks(cell);
};

ZzzelpFloodsPlayer.prototype.setPlace = function(cell) {
    var lieu = document.createElement('span');
    lieu.innerHTML = 'TDC';
    lieu.className = 'lieu';
    lieu.onclick = this.changePlace;
    cell.appendChild(lieu);
};

ZzzelpFloodsPlayer.prototype.changePlace = function(event) {
    var lieu = event.target.innerHTML,
        index = ZzzelpFloodsPlayer.places.indexOf(lieu);
    if(index == 2) {
        event.target.innerHTML = 'TDC';
    }
    else {
        event.target.innerHTML = ZzzelpFloodsPlayer.places[index + 1];
    }
};

ZzzelpFloodsPlayer.prototype.setModificationLinks = function(cell) {
    var img = document.createElement('img'),
        zone_liens = document.createElement('div');

    cell.className = 'menu_options';
    zone_liens.className = 'liste_options';
    img.src = ZzzelpScript.url + 'Images/quitter.png';

    for(var k=0; k<ZzzelpFloodsPlayer.modificationLinks.length; k++) {
        var link = ZzzelpFloodsPlayer.modificationLinks[k],
            zone_lien = document.createElement('div');

        zone_lien.title = link.title;
        zone_lien.className = 'zone_lien_option';
        zone_lien.dataset.action = link.action;
        zone_lien.onclick = this.applyOptionLine.bind(this);

        img_lien = document.createElement('img');
        img_lien.src = ZzzelpScript.url + '/Images/' + link.lien_image;

        zone_liens.appendChild(zone_lien);
        zone_lien.appendChild(img_lien);
    }
    cell.appendChild(img);
    cell.appendChild(zone_liens);
};

ZzzelpFloodsPlayer.prototype.applyOptionLine = function(event) {
    var element = event.target.closest('div'),
        action = element.dataset.action,
        place;
    if(action == 'supprimer') {
        this.remove(element);
    }
    else if(action == 'modifier') {
        var line = element.closest('tr'),
            classe = line.className;
        this.mode = 'inconnu';
        line.className = 'ligne_preparation';
        if(classe == 'ligne_sonde') {
            var sonde = {
                unite : ZzzelpArmy.TAGs.indexOf(line.querySelector('#unite_sonde').innerHTML),
                valeur : parseInt(line.querySelector('#nombre_sonde').innerHTML.replace(/ /g, '')),
                },
                lieu = ZzzelpFloodsPlayer.places.indexOf(line.querySelector('.lieu').innerHTML);
            place = line.rowIndex;
            ze_Supprimer_element(line);
            this.insertSondePreparation(lieu, sonde, place);
        }
        else {
            var valeur = line.cells[0].innerHTML.replace(/ /g, '');
            place = line.rowIndex;
            ze_Supprimer_element(line);
            this.insertFloodPreparation(valeur, place);
        }
    }
    this.instance.compute();
};

ZzzelpFloodsPlayer.prototype.applyChoiceNewLine = function() {
    var valeur = event.target.closest('div').dataset.mode;
    if(valeur == 'manuel') {
        this.insertFloodPreparation(0, -1);
    }
    else if(valeur == 'sonde') {
        var lieu, sonde;
        if(this.table.querySelectorAll('.ligne_sonde').length === 0) {
            lieu = 1;
            sonde = this.instance.sondes[0];
        }
        else {
            lieu = 2;
            sonde = this.instance.sondes[1];
        }
        this.insertSondePreparation(lieu, sonde, -1);
    }
};

ZzzelpFloodsPlayer.prototype.insertFloodPreparation = function(valeur, place) {
    this.mode = 'inconnu';
    var line = this.table.insertRow(place),
        cell = line.insertCell(0);
    line.className = 'ligne_preparation';
    cell.setAttribute('colspan', '3');
    var entree = document.createElement('input');
    entree.type = 'text';
    entree.placeholder = 'entrer la valeur du flood';
    entree.value = (valeur === 0) ? '' : ze_Nombre(valeur);
    cell.appendChild(entree);
    entree.onkeyup = function onkeyup(event) {
        ze_Ajout_espaces(this);
        return false;
    };
    var validation = document.createElement('img');
    validation.src = ZzzelpScript.url + '/Images/valider.png';
    validation.onclick = function onclick(event) {
        this.validateManualFlood(line);
        return false;
    }.bind(this);
    validation.className = 'preparation_libre';
    cell.appendChild(validation);
    cell = line.insertCell(1);
    this.setPlace(cell);
    cell = line.insertCell(2);
    this.setModificationLinks(cell);
};

ZzzelpFloodsPlayer.prototype.validateManualFlood = function(line) {
    var valeur = parseInt(line.querySelector('input').value.replace(/ /g,"")),
        index = line.rowIndex;
    this.remove(line);
    var flood = new ZzzelpFloodsAttack(valeur, false, false);
    this.addLine(flood, index);
    this.instance.compute();
};

ZzzelpFloodsPlayer.prototype.insertSondePreparation = function(lieu, sonde, place) {
    this.mode = 'inconnu';
    var ligne = this.table.insertRow(place),
        cell = ligne.insertCell(0);
    ligne.className = 'ligne_preparation';
    var input = document.createElement('input');
    ligne.className = 'ligne_preparation';
    cell.setAttribute('colspan', '3');
    input.type = 'text';
    input.onkeyup = function onkeyup(event) {
        ze_Ajout_espaces(this);
        return false;
    };
    input.value = ze_Nombre(sonde.valeur);
    ligne.cells[0].appendChild(input);
    var choix = document.createElement('select');
    ligne.cells[0].appendChild(choix);
    for(var i=0;i<ZzzelpArmy.TAGs.length;i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = ZzzelpArmy.TAGs[i];
        choix.appendChild(option);
    }
    var validation = document.createElement('img');
    validation.src = ZzzelpScript.url + 'Images/valider.png';
    cell = ligne.insertCell(1);
    this.setPlace(cell);
    cell = ligne.insertCell(2);
    this.setModificationLinks(cell);       
    ligne.querySelector('.lieu').innerHTML = ZzzelpFloodsPlayer.places[lieu];
    validation.onclick = function onclick(event) {
        var index = ligne.rowIndex,
            lieu = ZzzelpFloodsPlayer.places.indexOf(ligne.querySelector('.lieu').innerHTML),
            sonde = {
                unite : choix.value,
                valeur : parseInt(input.value.replace(/ /g, ''))
            };
        this.validateSonde(index, lieu, sonde, true);
        return false;
    }.bind(this);
    validation.className = 'preparation_libre';
    ligne.cells[0].appendChild(validation);
    choix.value = sonde.unite;
};

ZzzelpFloodsPlayer.prototype.remove = function(element) {
    ze_Supprimer_element(element.closest('tr'));
    this.mode = 'inconnu';
    this.instance.compute();
};

ZzzelpFloodsPlayer.prototype.toURL = function() {
    if(this.table.rows.length > 2) {
        var URL = '',
            lines = this.table.rows,
            nombre, unite, valeur, lieu;
        for(var i=2; i<lines.length; i++) {
            if(lines[i].className == 'ligne_sonde') {
                nombre = ze_Base_10_36(parseInt(lines[i].querySelector('#nombre_sonde').innerHTML.replace(/ /g, '')));
                unite = ze_Base_10_36(ZzzelpArmy.TAGs.indexOf(lines[i].querySelector('#unite_sonde').innerHTML));
                lieu = parseInt(ZzzelpFloodsPlayer.places.indexOf(lines[i].querySelector('.lieu').innerHTML)) + 1;
                URL += ((URL === '')? '' : ';') + '1' + nombre + ',' + unite + ',' + lieu;
            }
            else if(lines[i].dataset.type != 'hors_opti') {
                valeur = ((lines[i].dataset.type  == 'armee_complete') ? '-1' : ze_Base_10_36(lines[i].querySelector('td').innerHTML.replace(/ /g, '')));
                lieu = parseInt(ZzzelpFloodsPlayer.places.indexOf(lines[i].querySelector('.lieu').innerHTML)) + 1;
                URL += ((URL === '')? '' : ';') + '0' + valeur + ',' + lieu;
            }
        }
        if(URL !== '') {
            URL += ';' + ze_Base_10_36(this.data.ID) + ';' + ze_Base_10_36(this.data.temps) + ';' + this.pseudo;
        }
        else {
            URL = null;
        }
        return URL;
    }
    return null;
};
