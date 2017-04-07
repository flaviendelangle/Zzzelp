<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
		<?=HTMLGenerique::get_header() ?>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<?=$menu->create_MenuZzzelp(); ?>
			</div>
			<div class="main">
				<br><br>
				<div class="grid grid-pad grid_separee">
					<div class="col-1-2">
						<?php foreach(Accueil::get_Presentations() as $outil => $presentation) { ?>
						<div class="zone_contenu zone_lisible">
						   <div class="cadre_structure">
								<div class="entete_cadre"><?php echo $outil ?></div>
								<div class="coutenu_textuel">
									<?php echo $presentation ?>
									<br><br>
								</div>						   
						   </div>
					   </div>
					   <br><br>
					   <?php  } ?>
					</div>
					<div class="col-1-2">
						<?php $n=0;foreach(News::get_News() as $article) {if($n < 5){ ?>
						<div class="zone_contenu zone_lisible">
							<div class="cadre_structure">
								<div class="entete_cadre"><?php echo $article['titre'] ?></div>
								<div class="sous_entete_cadre">
									<?php echo date("d/m/Y", $article['date']) ?>
								</div>
								<div class="coutenu_textuel">
									<?php echo substr(nl2br(Text::bbcode($article['contenu'])),0,Nombre::Majoration(strlen($article['contenu']),500)) ?> <a href="<?php echo $GLOBAL['url_site'] ?>news#news<?php echo $article['ID'] ?>">... suite</a>
								</div>	   
						   </div>
						</div>
						<br><br>
						<?php $n++;}} ?>				
					</div>
				</div>
			</div>
		</div>
		<script src="/Javascript/cbpHorizontalMenu.min.js"></script>
	</body>
</html>
