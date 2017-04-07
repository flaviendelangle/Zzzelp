function ze_MAJ_armee(armee, mode) {
	if(!mode) {
		mode = 1;
	}
	new ZzzelpAjax({ method : 'GET', domain : 'zzzelp', url : 'niveaux_script?lieu=armee&niveaux=[' + armee + ']&' },
		{ authentication_issue : function(valeurs) {
			ze_MAJ_armee(armee, mode);		
		}
	});
}

function ze_Envoi_RC_Zzzelp(RC, analyse, mode, dernier) {
	var form = new FormData();
	form.append('RC', JSON.stringify(RC));
	form.append('valeurs', JSON.stringify(analyse));
	new ZzzelpAjax({ method : 'POST', domain : 'zzzelp', url : 'RC_script?', data : form },
		{ succes : function(valeurs) {
			if(FI_guerre && valeurs == 1) {
				FI_guerre.add_RC_cache(RC, analyse);
				if(dernier) {
					FI_guerre.update_FI();
				}
			}
		}, authentication_issue : function(valeurs) {
			ze_Envoi_RC_Zzzelp(RC, valeurs, 2, dernier);
		}
	});
}






