function ZzzelpAjax(values, callBacks) {

	this.callBacks = callBacks;
	this.method = values.method;
	this.domain = values.domain;
	this.data = values.data;
	this.force = values.force;
	this.values = values;
	this.requestLog = {};
	this.logs_enable = false;

	this.init();
}

ZzzelpAjax.prototype.init = function() {
	this.url = this.getFullURL(this.values.url, this.values.force);
	console.log('AJAX : ' + this.url);
	this.createXDR();
	this.send();
};

ZzzelpAjax.prototype.createXDR = function() {
	if (window.XDomainRequest) {
		this.xdr = new XDomainRequest(); 
	} 
	else if (window.XMLHttpRequest) {
		this.xdr = new XMLHttpRequest(); 
	} 
	else {
		alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
    }
};

ZzzelpAjax.prototype.send = function() {
	this.xdr.onload = this.callBack.bind(this);
	this.xdr.open(this.method, this.url, true);
	if(this.values.contentType) {
		this.xdr.setRequestHeader("Content-Type", this.values.contentType);
	}
	this.requestLog.beginning = time(true);
	this.xdr.send(this.data);
};

ZzzelpAjax.prototype.callBack = function() {
	if(this.domain == 'fourmizzz') {
		this.logRequest();
	}
	if(this.domain == 'zzzelp' || this.domain == 'zzzelp_interne') {
		if(this.values.brute) {
			var valeur;
			try {
				valeur = JSON.parse(this.xdr.responseText);
			}
			catch(e) {
				valeur = this.xdr.responseText;
			}
			this.callBacks.success(valeur, this);
		}
		else {
			var response_maping = ['unknown_player', 'authentication_issue', 'success'],
				data = this.response(this.xdr.responseText),
				response_type = response_maping[data.etat];
			if(response_type in this.callBacks) {
				this.callBacks[response_type](data.resultats, this);
			}
		}
	}
	else {
		if(this.values.addDOM) {
			this.addResponseDOM();
		}
		else if(this.callBacks.success) {
			this.callBacks.success(this.xdr.responseText, this);
		}
	}
};

ZzzelpAjax.prototype.getFullURL = function(partial_url, force) {
	if(this.domain == 'zzzelp') {
		var token = (this.force == 2) ? getToken() : getTokenZzzelp();
		return ZzzelpScript.url + partial_url + 'serveur=' + ze_serveur + '&pseudo=' + gpseudo + '&token=' + token;
	}
	else if(this.domain == 'zzzelp_interne') {
		return ZzzelpScript.url + partial_url;
	}
	else {
		return 'http://' + ze_serveur + '.fourmizzz.fr/' + partial_url;
	}
};

ZzzelpAjax.prototype.response = function(data) {
	try {
		data = JSON.parse(data);
		if(typeof ze_serveur != 'undefined') {
			ze_createCookie('zzzelp_etat_auth_' + ze_serveur, data.etat, 365);
			if(typeof data.token == 'string') {
				ze_createCookie('zzzelp_token_' + ze_serveur, data.token, 365);
			}
			if(data.etat == 2) {
				localStorage.setItem('zzzelp_authreussie', time_fzzz());
			}
		}
	}
	catch(e) {
		console.log(data);
		console.log(e);
	}
	return data;
};

ZzzelpAjax.prototype.addResponseDOM = function() {
	var page = ze_getBody(this.xdr.responseText),
		zone_page = document.createElement('div');
	zone_page.id = 'contenu_zzzelp';
	zone_page.setAttribute('style','display:none');
	zone_page.innerHTML = page;
	document.querySelector('body').appendChild(zone_page);
	if(this.callBacks.success) {
		this.callBacks.success(zone_page, this);
	}
	if(typeof this.values.destroyDOM == 'undefined' || this.values.destroyDOM) {
		setTimeout(function() {
			try {
				ze_Supprimer_element(zone_page);
			}
			catch(e) {

			}
		}, 1000);
	}
};

ZzzelpAjax.prototype.logRequest = function() {
	if(this.logs_enable) {
		this.requestLog.end = time(true);
		this.requestLog.duration = this.requestLog.end - this.requestLog.beginning;
		this.requestLog.size = this.xdr.getResponseHeader("Content-Length");
		this.requestLog.url = this.url;
		var logs = ZzzelpAjax.getLogs();
		logs.push(this.requestLog);
		this.saveLogs(logs);
	}


};


ZzzelpAjax.prototype.saveLogs = function(logs) {
	localStorage.setItem(ZzzelpAjax.localStorageKey, JSON.stringify(logs));
};


if(typeof ze_serveur != 'undefined') {
	ZzzelpAjax.localStorageKey = 'zzzelp_logs_ajax_' + ze_serveur;
}

ZzzelpAjax.getLogs = function() {
	var logs = localStorage.getItem(ZzzelpAjax.localStorageKey);
	if(logs === null) {
		return [];
	}
	else {
		try {
			logs = JSON.parse(logs);
			return logs;
		}
		catch(e) {
			return [];
		}
	}			
};

ZzzelpAjax.showLogs = function() {
	var logs = ZzzelpAjax.getLogs(),
		txt = '';
	for(var i=0; i<logs.length; i++) {
		txt += logs[i].duration + '	' + logs[i].size + '	' + logs[i].url + '\n';
	}
	console.log(txt);
};