<!DOCTYPE html>
<html lang="fr">
	<head>
		<?=HTMLGenerique::get_header() ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp(); ?>
			</div>
			<div class="main">
				<div class="grid grid-pad">
					<div class="col-1-1">
						<div class="content">
							<form method="POST" action="envoi" id="formulaire_contact">
								<table>
									<tr>
										<td id="td">Outil concerné : *</td>
										<td id="td">
											<select name="categorie" id="categories">
												<?php $n=0;foreach ($sections as $sec) { ?>
												<option value=<?php echo $n ?>><?php echo $sec ?></option>
												<?php $n++;} ?>
											</select>
										</td>
									</tr>
									<tr>
										<td id="td">Serveur concerné : </td>
										<td id="td">
											<select name="serveur">
												<?php foreach(array('none' => '-', $GLOBALS['serveur_complet']) as $serv => $serveur) { ?>
													<option value="<?php echo $serv ?>"><?php echo $serveur ?></option>
												<?php } ?>
											</select>
										</td>
									</tr>
								</table>
								<table>
									<tr>
										<td id="td">Objet : *</td>
										<td id="td"><input type="text" class='input_extra_large' name="objet" id="objet"></td> 
									</tr>
									<tr>
										<td id="td" style="vertical-align:middle;">Problème : *</td>
										<td id="td">
											<textarea name="probleme" id="probleme"></textarea>
										</td>
									</tr>
								</table>
								<center>
									Merci d'éviter les accents qui sont mal gérés par le site pour l'instant<br><br>
									<a href="#" class="button button-flat-primary" onclick="Verification_formulaire()">Envoyer</a>
								</center>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script>
function Verification_formulaire() {
	if (document.querySelector('#objet').value == '') {
		alert('Aucun objet renseigné');
	}
	else if(document.querySelector('#probleme').value == '') {
		alert('Veuillez décrire votre problème avant de valider');
	}
	else {
		document.querySelector('#formulaire_contact').submit();
	}
}		
		</script>
	</body>
</html>
