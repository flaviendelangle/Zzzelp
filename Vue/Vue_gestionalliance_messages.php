<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<?=Creation_header() ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=Creation_menu(); ?>
			</div>
			<div class="main">
				<form method="POST" action="modification?serveur=<?php echo $serveur ?>&alliance=<?php echo $alliance ?>">
					<div class="grid grid-pad">
						<div class="col-1-1">
							<div class="content">
								<h2>Messages</h2>
								<table>
									<tr>
										<th id="th"></th>
										<th id="th">Message</th>
									</tr>
									<tr>
										<td id="td">Annonce</th>
										<td id="td"><input type="text" class='input_extra_large' name="annonce" value="<?php echo $p['annonce'] ?>"></td>
									</tr>
									<?php  for ($n=1; $n <= 5; $n++) { ?>
									<tr>
										<td id="td">Message <?php echo $n ?> : </td>
										<td id="td"><input type="text" class='input_extra_large' name="messages[]" value="<?php if(isset ($p['messages'][$n-1])) {echo $p['messages'][$n-1];} ?>"></td> 
									</tr>
									<?php  } ?>				
								</table>
							</div>
						</div>
					</div>
					<center>
						<input type="submit" value="Enregistrer" name="Parametres_messages" class="button button-flat-primary">
					</center>
				</form>				
			</div>
		</div>
		<script src="/Javascript/GestionAlliance.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
		<script type="text/javascript" src="/Javascript/jscolor/jscolor.js"></script>
	</body>
</html>
