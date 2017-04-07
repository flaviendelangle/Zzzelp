<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<?=Creation_header() ?>
	</head>
	<body>
		<form method="POST" action="<?php echo $GLOBALS['url_page'].$onglet ?>?action=post_MP">
			<div class="container">
				<div class="menu">
					<?=Creation_menu(); ?>
				</div>
				<div class="main">
					<div class="grid grid-pad">
						<div class="col-1-1">
							<div class="content">
								<center>
									<a class="button button-flat-primary" href="#" id="open_nouveau_message">Nouveau message</a>
								</center>
								<table style="width:100%">
									<thead>
										<tr>
											<th id="th">Expédieur</th>
											<th id="th">Date/Heure</th>
											<th id="th">Objet</th>
										</tr>
									</thead>
									<tbody>
										<?php foreach($messages as $message){ ?>
										<tr <?php if($message['lu'] == 0){ ?> class="non_lu" <?php }?>>
											<td id="td" style="width:200px;text-align:left"><a href="http://<?php echo $onglet ?>.fourmizzz.fr/Membre.php?Pseudo=<?php echo $message['expediteur'] ?>" target="_BLANK"><?php echo $message['expediteur'] ?></a></td>
											<td id="td" style="width:150px"><a href="#" onclick="Affichage_MP(<?php echo $message['ID'] ?>)"><?php echo date('d/m/y', $message['date_envoi']).' '.date('H:i', $message['date_envoi']) ?></a></td>
											<td id="td" style="text-align:left"><a href="#" onclick="Affichage_MP(<?php echo $message['ID'] ?>)"><?php echo $message['titre'] ?></a></td>
										</tr>
										<tr>
											<td class="td" colspan="3" id="message_<?php echo $message['ID'] ?>" style="display:none;text-align:left;padding:15px">
												<?php echo nl2br($message['contenu']) ?>
											</td>
										</tr>
										<?php } ?>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="nouveau_message" class="pop-up-display-content">
				<h2>Nouveau message</h2>
				<p>
					<table style="width:100%;max-width:700px">
						<tr>
							<td id="td">Mode : </td>
							<td id="td">
								<select name="mode_MP" id="mode_MP" onchange="Actualisation_mode_messagerie()">
									<option value="classique">Conversation classique</option>
									<option value="groupe">Conversation groupée</option>
								</select>
							</td>
						</tr>
						<tr class="classique">
							<td id="td">Destinataires :</td>
							<td id="td"><input type="text" name="destinataire"></td>
						</tr>
						<tr class="groupe">
							<td id="td">Groupe de conversation :</td>
							<td id="td">
								<select name="groupe_MP" id="groupe_MP" onchange="if(document.querySelector('#groupe_MP').value == 'nouveau_groupe') { document.location.href = '<?echo $GLOBALS['url_page'].$onglet ?>?action=creation_groupe'}">
									<option>Groupe 1</option>
									<option>Groupe 2</option>
									<option>Groupe 3</option>
									<option value="nouveau_groupe">Gérer les groupes</option>
								</select>
							</td>
						</tr>
						<tr>
							<td id="td">Objet : </td>
							<td id="td"><input type="text" name="objet"></td>
						</tr>
						<tr>
							<td id="td" colspan="2" style="padding:0">
								<textarea id="editor" name="contenu_MP"></textarea>
							</td>
						</tr>
						<tr>
							<td id="td" colspan="2" ><input type="submit" name="envoi_MP" class="button button-flat-primary" value="Envoyer"></td>
						</tr>
					</table>
						
				</p>
			</div>
			<div class="zone_popup">
			</div>
		</form>
		<link rel="stylesheet" href="http://cdn.wysibb.com/css/default/wbbtheme.css" />
		<script src="http://cdn.wysibb.com/js/jquery.wysibb.min.js"></script>
		<script src="/Javascript/popupwindow.js"></script>
		<script src="/Javascript/Messagerie.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script>
			$(document).ready(function () {
			$('#open_nouveau_message').click(function(e) {
				e.preventDefault();
				$('#nouveau_message').popUpWindow({
					action: "open",
					size: "large",
				});
				Actualisation_mode_messagerie();
			});
			});
		</script>
		<script>
			$(document).ready(function() {
			var wbbOpt = {
				lang: "fr",
				buttons: "bold,italic,underline,|,img,link,pseudo,alliance",
				allButtons: {
					pseudo: {
					  title: 'Insert pseudo',
					  buttonText: 'Pseudo',
					  transform: {
						'<a href="http://<?php echo $onglet ?>.fourmizzz.fr/Membre?pseudo={AUTHOR}">{AUTHOR}</a>':'[pseudo]{AUTHOR}[/pseudo]'
					  }
					},
					alliance: {
					  title: 'Insert alliance',
					  buttonText: 'Alliance',
					  transform: {
						'<a href="http://<?php echo $onglet ?>.fourmizzz.fr/classementAlliance.php?alliance={AUTHOR}">{AUTHOR}</a>':'[ally]{AUTHOR}[/ally]'
					  }
					}
				}
			}
			$("#editor").wysibb(wbbOpt);
			});
		</script>
	</body>
</html>

