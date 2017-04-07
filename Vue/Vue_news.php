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
						<?php $commentaires = News::get_Comments();foreach(News::get_News() as $article) { ?>
						<div class="zone_contenu zone_invisible">
							<table class="tableau_ombre" style="width:100%;max-width:1000px" id="news<?php echo $article['ID'] ?>">
								<tr style="border-bottom:1px solid black">
									<td style="text-align:left;max-width">Titre : </td>
									<td><?php echo $article['titre'] ?></td>
								</tr>
								<tr style="border-bottom:1px solid black">
									<td style="text-align:left">Date : </td>
									<td><?php echo date("d/m/Y", $article['date']) ?></td>
								</tr>
								<tr style="border-bottom:1px solid black">
									<td style="text-align:justify;padding:25px;font-size:1em" colspan="2">
										<?php echo nl2br(Text::bbcode($article['contenu'])) ?>
									</td>
								</tr>
								<tr style="border-bottom:1px solid black">
									<td colspan="2" class="show_comment_<?php echo $article['ID'] ?>"><button onclick="Affichage_commentaires(<?php echo $article['ID'] ?>)" class="bouton">Commentaires</button></td>
								</tr>
								<tr style="border-bottom:1px solid black;display:none" class="comment_<?php echo $article['ID'] ?>">
									<td colspan="2" style="height:5px" class="hr_manuel"></td>
								</tr>
								<?php if(!empty($commentaires[$article['ID']])) { foreach($commentaires[$article['ID']] as $commentaire) { ?>
								<tr style="border-bottom:1px solid black;display:none" class="comment_<?php echo $article['ID'] ?>">
									<td style="width:250px;text-align:left;line-height:3em">
										Posteur : <?php echo $commentaire['posteur'] ?><br>
										Date : <?php echo date("d/m/Y", $article['date']) ?>
									</td>
									<td style="text-align:justify;padding:25px;"><?php echo nl2br(Text::bbcode($commentaire['contenu'])) ?></td>
								</tr>
								<?php }} ?>
								<tr style="border-bottom:1px solid black;display:none" class="comment_<?php echo $article['ID'] ?>">
									<td colspan="2">
										<form method="POST" action="<?php echo $GLOBALS['url_page'] ?>">
											<br>
											<textarea name="contenu_commentaire" style="width:100%" placeholder="Donnez votre avis"></textarea>
											<input type="hidden" name="id_news" value="<?php echo $article['ID'] ?>">
											<input type="submit" value="Commenter" class="bouton">
										</form>
									</td>
								</tr>
							</table>
							<br><br>
						</div>
						<?php } ?>
				</div>
			</div>
		</div>
		<script src="/Javascript/News.js"></script>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
	</body>
</html>

