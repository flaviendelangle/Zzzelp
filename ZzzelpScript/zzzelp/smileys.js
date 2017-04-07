var ZzzelpScriptSmileys = function(lieu, section) {

    this.section = section;
    this.lieu = lieu;
    this.liste = ZzzelpScript.parameters('smileys');
    this.init();

};

ZzzelpScriptSmileys.prototype.init = function() {
    if(!this.section) {
        this.section = document;
    }
    var images = this.section.querySelectorAll('img[title=Smiley]');
    for(var n=0; n<images.length; n++) {
        this.removeOldInterface(images[n]);
        this.addSmileys();
    }
    if(this.lieu == 'MC') {
        this.manageMC();
    }
};

ZzzelpScriptSmileys.prototype.manageMC = function() {
    var bouton = document.querySelector('.boiteMessagerie input[type="submit"]'),
        txt =  "document.querySelector('#message_collectif').value = ze_Preparation_message(document.querySelector('#message_collectif').value);";
    bouton.setAttribute('onclick', txt + bouton.getAttribute('onclick'));
};

ZzzelpScriptSmileys.prototype.addSmileys = function(img_source) {
    var element = this.section.querySelector('#ze_gestion_smileys_' + this.nom_section),
        smileys_section = this.section.querySelectorAll('#tousLesSmiley' + this.nom_section + ' div'),
        i, j;
    for(j=0; j<smileys_section.length; j++) {
        i = parseInt(smileys_section[j].id.replace('listeSmiley','').substring(0,1));
        if((i > 1 && !ComptePlus) || !in_array('C' + i,this.liste[1])) {
            ze_Supprimer_element(smileys_section[j]);
        }
        else {
            smileys_section[j].dataset.npack = 'C' + i;
        }
    }
    i=0;
    for(var pack in this.liste[0]) {
        if(this.liste[0][pack].liste !== null) {
            this.section.querySelector('#tousLesSmiley' + this.nom_section).appendChild(this.createGroupSmileys(pack, this.liste[0][pack], i));
            i++;
        }
    }
    var longueur = this.section.querySelectorAll('#tousLesSmiley' + this.nom_section + ' div[data-npack="' + ze_readCookie('zzzelp_ligne_smiley_' + ze_serveur) + '"]').length,
        active;
    if(ze_readCookie('zzzelp_ligne_smiley_' + ze_serveur) !== null && longueur > 0) {
        active = ze_readCookie('zzzelp_ligne_smiley_' + ze_serveur);
    }
    else {
        active = this.section.querySelector('#tousLesSmiley' + this.nom_section + ' div').dataset.npack;
    }
    ze_createCookie('zzzelp_ligne_smiley_' + ze_serveur, active, 365);
  
    smileys_section = this.section.querySelectorAll('#tousLesSmiley' + this.nom_section + ' div');
    for(i=0; i<smileys_section.length; i++) {
        if(smileys_section[i].dataset.npack == active) {
            smileys_section[i].style.display = '';
            smileys_section[i].dataset.affiche = '1';
        }
        else {
            smileys_section[i].style.display = 'none';
            smileys_section[i].dataset.affiche = '0';
        }
    }       
    var content = this.section.querySelector('#tousLesSmiley' + this.nom_section);
    for(var k=0; k<this.liste
        [1].length; k++) {
        if(content.querySelector('div[data-npack="' + this.liste[1][k] + '"]') !== null) {
            content.appendChild(content.querySelector('div[data-npack="' + this.liste[1][k] + '"]'));
        }
    }
};

ZzzelpScriptSmileys.prototype.removeOldInterface = function(img_source) {
    this.nom_section = new RegExp('changerCookieSmiley\\(\'(.*)\'\\)').exec(img_source.getAttribute('onclick'))[1];
    ze_Supprimer_element(this.section.querySelector('#smileyPrecedent' + this.nom_section));
    ze_Supprimer_element(this.section.querySelector('#smileySuivant' + this.nom_section));
    
    this.show = (this.section.querySelector('#tousLesSmiley' + this.nom_section).style.display != 'none');
    var gestion_smileys = this.createElement();

    img_source.parentNode.parentNode.insertBefore(gestion_smileys, img_source.parentNode.nextSibling);
    ze_Supprimer_element(img_source);
};

ZzzelpScriptSmileys.prototype.createElement = function() {
    var gestion_smileys = document.createElement('span'),
        zone_avant = document.createElement('span'),
        avant = document.createElement('img'),
        zone_apres = document.createElement('span'),
        apres = document.createElement('img'),
        zone_open_smiley = document.createElement('span'),
        open_smiley = document.createElement('img');
        
    gestion_smileys.setAttribute('id','ze_gestion_smileys_' + this.nom_section);
    zone_apres.onclick = function onclick(event) {
        this.changeSmileyPack(true, this.nom_section);
    }.bind(this);
    zone_avant.onclick = function onclick(event) {
        this.changeSmileyPack(false, this.nom_section);
    }.bind(this);
    open_smiley.setAttribute('onclick', 'changerCookieSmiley("' + this.nom_section + '")');
    
    open_smiley.src = 'http://zzzelp.fr/Images/Smileys/Zzzelp/smile.gif';
    avant.src = "/images/fleche-champs-gauche.gif";
    apres.src = "/images/fleche-champs-droite.gif";
    avant.id = "smileyPrecedent" + this.nom_section;
    apres.id = "smileySuivant" + this.nom_section;
    
    zone_avant.style.cursor = 'pointer';
    zone_avant.style.position = 'relative';
    zone_avant.style.top = '2px';
    zone_avant.style.visibility = (this.show ? 'visible' : 'hidden');
 
    zone_apres.style.cursor = 'pointer';
    zone_apres.style.position = 'relative';
    zone_apres.style.top = '2px';
    zone_apres.style.visibility = (this.show ? 'visible' : 'hidden');
    
    zone_open_smiley.style.cursor = 'pointer';
    zone_open_smiley.style.position = 'relative';
    zone_open_smiley.style.top = '4px';
    zone_open_smiley.style['margin-left'] = '2px';
    zone_open_smiley.style['margin-right'] = '2px';
    
    zone_avant.appendChild(avant);
    zone_apres.appendChild(apres);
    zone_open_smiley.appendChild(open_smiley);
    gestion_smileys.appendChild(zone_avant);
    gestion_smileys.appendChild(zone_open_smiley);
    gestion_smileys.appendChild(zone_apres);
    return gestion_smileys;
};

ZzzelpScriptSmileys.prototype.createGroupSmileys = function(pack, donnees, i) {
    var ligne = document.createElement('div');
    ligne.setAttribute('id', 'zone_smileys_zzzelp_' + donnees.ID);
    ligne.setAttribute('style', 'display:none;margin-top:20px');
    ligne.dataset.npack = 'Z'+ donnees.ID;
    ligne.dataset.numero = i;
    for(var k=0; k<donnees.liste.length; k++) {
        var smiley = this.createSmiley(pack, donnees.liste[k], donnees.format);
        this.addEventSmiley(smiley, i);
        ligne.appendChild(smiley);
    }
    return ligne;
};

ZzzelpScriptSmileys.prototype.createSmiley = function(pack, name, format) {
  var smiley = document.createElement('img');
  smiley.setAttribute('src', 'http://zzzelp.fr/Images/Smileys/' + pack + '/' + name + '.' + format);
  smiley.setAttribute('style', 'padding:0 2px');
  smiley.dataset.nom = name;
  smiley.dataset.pack = pack;
  return smiley;
};

ZzzelpScriptSmileys.prototype.addEventSmiley = function(smiley, i) {
    if(this.lieu == 'new_MP') {
        arg = 'message_envoi';
    }
    else if(this.lieu == 'MC') {
        arg = 'message_collectif';
    }
    else if(~this.lieu.indexOf('champ_reponse_')) {
        arg = this.lieu;
    }
    else {
        arg = 'message';
    }
    this.onClick(smiley, arg, 'z' + i + '_'  + smiley.dataset.nom);
};

ZzzelpScriptSmileys.prototype.onClick = function(smiley, lieu, name) {
    smiley.onclick = function onclick(event) {
        addRaccourciSmiley(lieu, name);
        return false;
    };
};

ZzzelpScriptSmileys.prototype.sortSmileys = function(ordre) {
    var packs = this.section.querySelectorAll('.tousLesSmiley div');
    for (var i=1;i<packs.length;i++) {
        ligne = this.section.querySelectorAll('.tousLesSmiley div')[i];
        j = i;
        while (j > 0 && ordre.indexOf(ligne.dataset.npack) > ordre.indexOf(this.section.querySelectorAll('.tousLesSmiley div')[j-1].dataset.npack)) {
            this.switchPosition(this.section.querySelectorAll('.tousLesSmiley div')[j]);
            j--;
        }
    }
};

ZzzelpScriptSmileys.prototype.switchPosition = function(row) {
    var sibling = row.previousElementSibling,
        anchor = row.nextElementSibling,
        parent = row.parentNode;
    parent.insertBefore(row, sibling);
};

ZzzelpScriptSmileys.prototype.getPacks = function() {
    var liste = this.section.querySelector('div[id*="tousLesSmiley"]').querySelectorAll('div'),
        packs = [];
    for(var k=0; k<liste.length; k++) {
        packs.push(liste[k].id);
    }
    return packs;
};

ZzzelpScriptSmileys.prototype.changeSmileyPack = function(avancer, id) {
    var zones = document.querySelectorAll('#tousLesSmiley' + id + ' div'),
        e;
    for(var i=0; i<zones.length; i++) {
        if(zones[i].dataset.affiche == '1') {
            if(avancer) {
                e = zones[i].nextElementSibling;
                if(e  === null) {
                    e = zones[0];
                }
            }
            else {
                e = zones[i].previousElementSibling;
                if(e === null) {
                    e = zones[zones.length-1];
                }
            }
            zones[i].style.display = 'none';
            zones[i].dataset.affiche = '0';
        }
    }
    e.style.display = '';
    e.dataset.affiche = '1';  
    ze_createCookie('zzzelp_ligne_smiley_' + ze_serveur, e.dataset.npack, 365);
};

