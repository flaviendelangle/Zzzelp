function ZzzelpScriptForum() {

    var that = this;

    this.init = function() {
        this.addWatcher(0);
        var ID_sujet = ze_Analyser_URL('ID_sujet');
        if (ID_sujet) {
            xajax_callGetTopic(parseInt(ID_sujet));
        }
    };

    this.addWatcher = function(ex_ID) {
        if(document.querySelectorAll('.messageForum div[id*="editTopic"]').length > 0) {
            var ID = parseInt(document.querySelector('.messageForum div[id*="editTopic"]').id.replace('editTopic', ''));
            if(ex_ID != ID) {
                ex_ID = ID;
                that.addShareButton(ID);
            }
            if(document.querySelector('#nouveauMessage')) {
                that.addSmileys(false);
            }
        }
        if(document.querySelector('#nouveauSujet')) {
            that.addSmileys(true);
        }
        setTimeout(function(){
            that.addWatcher(ex_ID);
        }, 100);
    };

    this.addShareButton = function(ID) {
        document.querySelector('#forum').style.position = 'relative';
        var button = document.createElement('img');
        button.src = ZzzelpScript.url + 'Images/share.png';
        button.setAttribute('style', 'position: absolute;top: -10px;right: 10px;width: 20px;cursor: pointer;');
        button.onclick = function onclick(event) {
            window.prompt('Nécessite ZzzelpScript !', 'http://' + ze_serveur + '.fourmizzz.fr/alliance.php?forum_menu&ID_sujet=' + ID);
        };
        document.querySelector('#forum').appendChild(button);
    };

    this.addSmileys = function(newTopic) {
        if(!document.querySelector('#zzzelp_smileys_places') && ZzzelpScript.parameters('parametres', ['perso', 'perso_smileys'])) {
            var input = document.createElement('input'),
                lieu;
            input.id = 'zzzelp_smileys_places';
            input.type = 'hidden';
            if(newTopic) {
                document.querySelector('#nouveauSujet').appendChild(input);
                lieu = new Array('nouveauSujet', 'NouveauSujet');
            }
            else {
                document.querySelector('#nouveauMessage').appendChild(input);
                lieu = new Array('nouveauMessage', 'NouveauMessage');
            }
            var onClick = 'document.querySelector(\'#message\').value = ze_Preparation_message(document.querySelector(\'#message\').value);';
            onClick += 'xajax_envoi' + lieu[1] + '(xajax.getFormValues(\'' + lieu[0] + '\')); return false;';
            document.querySelector('#forum input[type*="submit"]').setAttribute('onclick', onClick);
            new ZzzelpScriptSmileys('FI');  
        }   
    };

    this.init();
}