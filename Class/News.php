<?php

class News {

	/*
		Récupère la liste des news de Zzzelp
	*/
	public static function get_News() {
		$news = array();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM MP_Zzzelp WHERE destinataire = "Zzzelp" ORDER BY date_envoi DESC');
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $article) {
			if(strrpos($article['titre'], 'News') > -1) {
				$news[] = array('ID' => $article['ID'], 'date' => $article['date_envoi'], 'contenu' => $article['contenu'], 'titre' => $article['titre']);
			}
		}
		return $news;		
	}

	/*
		Récupère la liste des commentaires des news de Zzzelp
	*/
	public static function get_Comments() {
		$commentaires = array();
		$bdd = Zzzelp::Connexion_BDD('Donnees_site');
		$requete = $bdd->prepare('SELECT * FROM Commentaires_news');
		$requete->execute();
		$resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
		foreach($resultats as $com) {
			if(array_key_exists($com['news'], $commentaires)) {
				$commentaires[$com['news']][] = array('posteur' => $com['posteur'], 'date_post' => $com['date_post'], 'contenu' => $com['contenu']);
			}
			else {
				$commentaires[$com['news']]= array(array('posteur' => $com['posteur'], 'date_post' => $com['date_post'], 'contenu' => $com['contenu']));
			}
		}
		return $commentaires;	
	}
}