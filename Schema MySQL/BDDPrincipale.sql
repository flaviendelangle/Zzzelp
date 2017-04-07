-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Ven 07 Avril 2017 à 20:19
-- Version du serveur :  5.5.37
-- Version de PHP :  5.5.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `BDDPrincipale`
--

-- --------------------------------------------------------

--
-- Structure de la table `alliances`
--

CREATE TABLE `alliances` (
  `alliance` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `activation_MF` tinyint(1) NOT NULL,
  `activation_convois` tinyint(1) NOT NULL,
  `activation_traceur` tinyint(1) NOT NULL,
  `MF_guerre` tinyint(1) NOT NULL,
  `methode_convois` varchar(255) NOT NULL DEFAULT 'regulier',
  `demande_max` bigint(20) NOT NULL,
  `formule_repartition` tinyint(4) NOT NULL,
  `majoration_ouvrieres` tinyint(1) NOT NULL,
  `duree_repartition` tinyint(4) NOT NULL,
  `formule_tdp` varchar(255) NOT NULL,
  `bonus_grenier_MRG` bigint(20) NOT NULL,
  `algorithme_optimisation` tinyint(4) NOT NULL DEFAULT '0',
  `modularite_convois` tinyint(1) NOT NULL,
  `priorites_manuelles` text NOT NULL,
  `activer_relais_convois` tinyint(1) NOT NULL,
  `relais_convois` text NOT NULL,
  `activation_ghost` tinyint(1) NOT NULL,
  `ghosts_guerre` varchar(128) NOT NULL,
  `ghosts_hors_guerre` varchar(128) NOT NULL,
  `droits_Nouveau` varchar(256) NOT NULL DEFAULT '{"acces_MF":true,"floods":false,"chasses":false,"rangs":false,"archives":false,"convois":false,"gestion_convois":false,"gestion_MF":false,"gestion_rangs":false,"gestion_membres":false}',
  `droits_Membre` varchar(256) NOT NULL DEFAULT '{"acces_MF":true,"floods":true,"chasses":true,"rangs":true,"archives":true,"convois":true,"gestion_convois":false,"gestion_MF":false,"gestion_rangs":false,"gestion_membres":false}',
  `droits_Gestionnaire` varchar(256) NOT NULL DEFAULT '{"acces_MF":true,"floods":true,"chasses":true, "rangs":true,"archives":true,"convois":true,"gestion_convois":true,"gestion_MF":true,"gestion_rangs":true,"gestion_membres":false}',
  `droits_Chef` varchar(256) NOT NULL DEFAULT '{"acces_MF":true,"floods":true,"chasses":true,"rangs":true,"archives":true,"convois":true,"gestion_convois":true,"gestion_MF":true,"gestion_rangs":true,"gestion_membres":true}'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Conversations_guerre`
--

CREATE TABLE `Conversations_guerre` (
  `ID` int(11) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `alliance` varchar(256) NOT NULL,
  `pseudo` varchar(256) NOT NULL,
  `date_stockage` bigint(20) NOT NULL,
  `contenu` text NOT NULL,
  `posteur` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `donnees_fourmizzz`
--

CREATE TABLE `donnees_fourmizzz` (
  `pseudo` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `ID` int(11) NOT NULL,
  `ouvrieres` bigint(20) NOT NULL,
  `JSN` bigint(20) NOT NULL,
  `SN` bigint(20) NOT NULL,
  `NE` bigint(20) NOT NULL,
  `JS` bigint(20) NOT NULL,
  `S` bigint(20) NOT NULL,
  `C` bigint(20) NOT NULL,
  `CE` bigint(20) NOT NULL,
  `A` bigint(20) NOT NULL,
  `AE` bigint(20) NOT NULL,
  `SE` bigint(20) NOT NULL,
  `Tk` bigint(20) NOT NULL,
  `TkE` bigint(20) NOT NULL,
  `T` bigint(20) NOT NULL,
  `TE` bigint(20) NOT NULL,
  `champignonniere` tinyint(4) NOT NULL,
  `entrepot_nourriture` tinyint(4) NOT NULL,
  `entrepot_materiaux` tinyint(4) NOT NULL,
  `couveuse` tinyint(4) NOT NULL,
  `solarium` tinyint(4) NOT NULL,
  `laboratoire` tinyint(4) NOT NULL,
  `salle_analyse` tinyint(4) NOT NULL,
  `salle_combat` tinyint(4) NOT NULL,
  `caserne` tinyint(4) NOT NULL,
  `dome` tinyint(4) NOT NULL,
  `loge_imperiale` tinyint(4) NOT NULL,
  `etable_pucerons` tinyint(4) NOT NULL,
  `etable_cochenilles` tinyint(4) NOT NULL,
  `technique_ponte` tinyint(4) NOT NULL,
  `bouclier_thoracique` tinyint(4) NOT NULL,
  `armes` tinyint(4) NOT NULL,
  `architecture` tinyint(4) NOT NULL,
  `communication_animaux` tinyint(4) NOT NULL,
  `vitesse_chasse` tinyint(4) NOT NULL,
  `vitesse_attaque` tinyint(4) NOT NULL,
  `genetique` tinyint(4) NOT NULL,
  `acide` tinyint(4) NOT NULL,
  `poison` tinyint(4) NOT NULL,
  `labo_en_cours` tinyint(4) NOT NULL,
  `labo_en_cours_2` tinyint(4) NOT NULL,
  `construction_en_cours` tinyint(4) NOT NULL,
  `construction_en_cours_2` tinyint(4) NOT NULL,
  `stock_mat` bigint(20) NOT NULL,
  `stock_nou` bigint(20) NOT NULL,
  `MAJ` date NOT NULL,
  `MAJ_auto` bigint(20) NOT NULL,
  `MAJ_manuelle` bigint(20) NOT NULL,
  `MAJ_ouvrieres` bigint(20) NOT NULL,
  `colonisateur` varchar(255) NOT NULL,
  `hash_ZzzelpScript` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Donnees_guerre`
--

CREATE TABLE `Donnees_guerre` (
  `alliance` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `alerte` varchar(255) NOT NULL,
  `dead` tinyint(1) NOT NULL,
  `date_dead` bigint(20) NOT NULL,
  `tdp` tinyint(4) NOT NULL,
  `dome` tinyint(4) NOT NULL,
  `loge` tinyint(4) NOT NULL,
  `vitesse_attaque` tinyint(4) NOT NULL,
  `vitesse_chasse` tinyint(4) NOT NULL,
  `armes` tinyint(4) NOT NULL,
  `bouclier` tinyint(4) NOT NULL,
  `JSN` bigint(20) NOT NULL,
  `SN` bigint(20) NOT NULL,
  `NE` bigint(20) NOT NULL,
  `JS` bigint(20) NOT NULL,
  `S` bigint(20) NOT NULL,
  `C` bigint(20) NOT NULL,
  `CE` bigint(20) NOT NULL,
  `A` bigint(20) NOT NULL,
  `AE` bigint(20) NOT NULL,
  `SE` bigint(20) NOT NULL,
  `Tk` bigint(20) NOT NULL,
  `TkE` bigint(20) NOT NULL,
  `T` bigint(20) NOT NULL,
  `TE` bigint(20) NOT NULL,
  `date_armee` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Droits_alliance`
--

CREATE TABLE `Droits_alliance` (
  `pseudo` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `alliance` varchar(255) NOT NULL,
  `droits` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ennemis`
--

CREATE TABLE `ennemis` (
  `createur` varchar(256) NOT NULL,
  `hote` varchar(255) NOT NULL,
  `ennemi` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `MF_auto` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `FI_guerre`
--

CREATE TABLE `FI_guerre` (
  `date_creation` bigint(20) NOT NULL,
  `createur` varchar(255) NOT NULL,
  `alliance` varchar(5) NOT NULL,
  `serveur` varchar(4) NOT NULL,
  `cible` varchar(5) NOT NULL,
  `ID_forum` int(11) NOT NULL,
  `ID_joueurs` text NOT NULL,
  `ID_posts_speciaux` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `formulaire_contact`
--

CREATE TABLE `formulaire_contact` (
  `pseudo` varchar(255) NOT NULL,
  `type` varchar(25) NOT NULL,
  `contenu` text NOT NULL,
  `date_envoi` date NOT NULL,
  `resolution` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Identification_ZzzelpScript`
--

CREATE TABLE `Identification_ZzzelpScript` (
  `ID` int(11) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `token` varchar(6) NOT NULL,
  `date_creation` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `joueurs_hors_malus`
--

CREATE TABLE `joueurs_hors_malus` (
  `serveur` varchar(5) NOT NULL,
  `alliance` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `malus` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `lettre_admins_messages`
--

CREATE TABLE `lettre_admins_messages` (
  `message` text NOT NULL,
  `IP` varchar(255) NOT NULL,
  `date_enregistrement` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `lettre_admins_votes`
--

CREATE TABLE `lettre_admins_votes` (
  `pseudo` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `date_signature` bigint(20) NOT NULL,
  `IP` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Logs_MF`
--

CREATE TABLE `Logs_MF` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `date_chargement` bigint(20) NOT NULL,
  `alliance_1` varchar(15) NOT NULL,
  `alliance_2` varchar(15) NOT NULL,
  `alliance_3` varchar(15) NOT NULL,
  `hash` varchar(256) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `membres`
--

CREATE TABLE `membres` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_inscription` date NOT NULL,
  `pseudo_s1` varchar(255) NOT NULL,
  `pseudo_s2` varchar(255) NOT NULL,
  `pseudo_s3` varchar(255) NOT NULL,
  `pseudo_s4` varchar(255) NOT NULL,
  `pseudo_test` varchar(255) NOT NULL,
  `pseudo_w1` varchar(255) NOT NULL,
  `verif_pseudo_s1` tinyint(1) NOT NULL,
  `verif_pseudo_s2` tinyint(1) NOT NULL,
  `verif_pseudo_s3` tinyint(1) NOT NULL,
  `verif_pseudo_s4` tinyint(1) NOT NULL,
  `verif_pseudo_test` tinyint(1) NOT NULL,
  `verif_pseudo_w1` tinyint(1) NOT NULL,
  `vue_chef_s1_1` varchar(255) NOT NULL,
  `vue_chef_s1_2` varchar(255) NOT NULL,
  `vue_chef_s1_3` varchar(255) NOT NULL,
  `vue_chef_s2_1` varchar(255) NOT NULL,
  `vue_chef_s2_2` varchar(255) NOT NULL,
  `vue_chef_s2_3` varchar(255) NOT NULL,
  `vue_chef_s3_1` varchar(255) NOT NULL,
  `vue_chef_s3_2` varchar(255) NOT NULL,
  `vue_chef_s3_3` varchar(255) NOT NULL,
  `vue_chef_s4_1` varchar(255) NOT NULL,
  `vue_chef_s4_2` varchar(255) NOT NULL,
  `vue_chef_s4_3` varchar(255) NOT NULL,
  `droit_theme` tinyint(1) NOT NULL DEFAULT '0',
  `theme` smallint(6) NOT NULL DEFAULT '1',
  `mode_fond` varchar(10) NOT NULL DEFAULT 'defaut',
  `valeur_fond` varchar(255) NOT NULL,
  `packs_smileys` text NOT NULL,
  `ordre_packs` text NOT NULL,
  `aide_zzzelp` tinyint(1) NOT NULL DEFAULT '1',
  `conseil_zzzelp` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `MP_Zzzelp`
--

CREATE TABLE `MP_Zzzelp` (
  `ID` int(11) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `expediteur` varchar(255) NOT NULL,
  `destinataire` varchar(255) NOT NULL,
  `date_envoi` bigint(20) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` text NOT NULL,
  `lu` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `multi`
--

CREATE TABLE `multi` (
  `joueur_1` varchar(255) NOT NULL,
  `joueur_2` varchar(255) NOT NULL,
  `alliance` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `packs_smileys`
--

CREATE TABLE `packs_smileys` (
  `ID` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `createur` varchar(255) NOT NULL,
  `format` varchar(10) NOT NULL,
  `smileys` text NOT NULL,
  `categories` varchar(256) NOT NULL,
  `public` tinyint(1) NOT NULL,
  `alliances` text NOT NULL,
  `joueurs` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pages_zzzelp`
--

CREATE TABLE `pages_zzzelp` (
  `nom` tinyint(1) NOT NULL,
  `disponible` tinyint(1) NOT NULL,
  `externe` tinyint(1) NOT NULL,
  `dependant_serveur` tinyint(1) NOT NULL,
  `onglet_serveur` tinyint(1) NOT NULL,
  `reserve_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `parametres_ZzzelpScript`
--

CREATE TABLE `parametres_ZzzelpScript` (
  `pseudo` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `token` varchar(4) NOT NULL,
  `auth` varchar(8) NOT NULL,
  `ex_auth` varchar(8) NOT NULL,
  `module_interface` tinyint(4) NOT NULL DEFAULT '2',
  `module_interface_prive` tinyint(4) NOT NULL DEFAULT '1',
  `module_traceur` tinyint(4) NOT NULL DEFAULT '1',
  `import_auto_niveaux` tinyint(1) NOT NULL,
  `import_auto_RC` tinyint(1) NOT NULL,
  `moyenne_alliances` tinyint(1) NOT NULL,
  `rangs_zzzelp` tinyint(1) NOT NULL DEFAULT '1',
  `couleurs_rangs_zzzelp` tinyint(1) NOT NULL DEFAULT '1',
  `cadre_compte_plus` tinyint(1) NOT NULL DEFAULT '1',
  `interface_page_armee` tinyint(1) NOT NULL DEFAULT '1',
  `interface_messagerie` tinyint(1) NOT NULL,
  `interface_colonies` tinyint(1) NOT NULL DEFAULT '1',
  `interface_ennemie` tinyint(1) NOT NULL DEFAULT '1',
  `interface_classement_alliances` tinyint(1) NOT NULL,
  `interface_chat` tinyint(1) NOT NULL DEFAULT '1',
  `traceur_description` tinyint(1) NOT NULL,
  `interface_lancement` tinyint(1) NOT NULL,
  `interface_smileys_zzzelp` tinyint(1) NOT NULL DEFAULT '1',
  `stockage_floods_zzzelp` tinyint(1) NOT NULL DEFAULT '1',
  `replacement_antisonde_floods` tinyint(1) NOT NULL DEFAULT '0',
  `aide_relance_floods` tinyint(1) NOT NULL,
  `choix_aide_relance` tinyint(4) NOT NULL DEFAULT '1',
  `anti_synchronisation` tinyint(1) NOT NULL,
  `seconde_envoie` tinyint(4) NOT NULL DEFAULT '58',
  `synchro_ouvrieres` tinyint(1) NOT NULL,
  `synchro_niveaux` tinyint(1) NOT NULL,
  `synchro_chasses` tinyint(1) NOT NULL,
  `synchro_RC` tinyint(1) NOT NULL,
  `synchro_armee` tinyint(1) NOT NULL,
  `ally_rangs` tinyint(1) NOT NULL,
  `ally_couleurs` tinyint(1) NOT NULL,
  `ally_traceur_exports` tinyint(1) NOT NULL,
  `ally_traceur_auto` tinyint(1) NOT NULL,
  `ally_traceur_consultation` tinyint(1) NOT NULL,
  `perso_smileys` tinyint(1) NOT NULL,
  `perso_menu_contextuel` tinyint(1) NOT NULL DEFAULT '1',
  `perso_page_chat` tinyint(1) NOT NULL,
  `perso_page_profil` tinyint(1) NOT NULL,
  `perso_colonies` tinyint(1) NOT NULL,
  `perso_messagerie` tinyint(1) NOT NULL,
  `perso_messagerie_guerre` tinyint(1) NOT NULL,
  `perso_lancement_attaques` tinyint(1) NOT NULL,
  `perso_page_ennemie` tinyint(1) NOT NULL,
  `perso_page_description` tinyint(1) NOT NULL,
  `perso_page_armee` tinyint(1) NOT NULL,
  `zzzelpfloods_stockage` tinyint(1) NOT NULL,
  `zzzelpfloods_antisonde` tinyint(1) NOT NULL,
  `zzzelpfloods_relance` tinyint(1) NOT NULL,
  `zzzelpfloods_antisynchro` tinyint(1) NOT NULL,
  `zzzelpfloods_prive_seconde` tinyint(4) NOT NULL DEFAULT '58',
  `zzzelpfloods_prive_mode_relance` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Partage_droits_alliances`
--

CREATE TABLE `Partage_droits_alliances` (
  `hote` varchar(255) NOT NULL,
  `receveuse` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `partage_floods_Membre` tinyint(1) NOT NULL,
  `partage_floods_Gestionnaire` tinyint(1) NOT NULL,
  `partage_floods_Chef` tinyint(1) NOT NULL,
  `gestion_MF_Membre` tinyint(1) NOT NULL,
  `gestion_MF_Gestionnaire` tinyint(1) NOT NULL,
  `gestion_MF_Chef` tinyint(1) NOT NULL,
  `partage_rangs_Membre` tinyint(1) NOT NULL,
  `partage_rangs_Gestionnaire` tinyint(1) NOT NULL,
  `partage_rangs_Chef` tinyint(1) NOT NULL,
  `gestion_rangs_Membre` tinyint(1) NOT NULL,
  `gestion_rangs_Gestionnaire` tinyint(1) NOT NULL,
  `gestion_rangs_Chef` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Rangs_prioritaires`
--

CREATE TABLE `Rangs_prioritaires` (
  `pseudo` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `alliance` varchar(255) NOT NULL,
  `rang` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Rangs_Zzzelp`
--

CREATE TABLE `Rangs_Zzzelp` (
  `ID` int(11) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `createur` varchar(256) NOT NULL,
  `mode` tinyint(4) NOT NULL,
  `regle` varchar(256) NOT NULL,
  `role` varchar(256) NOT NULL,
  `ne_pas_flooder` tinyint(1) NOT NULL,
  `alliances` varchar(256) NOT NULL,
  `couleur` varchar(256) NOT NULL,
  `rang_affiche` varchar(256) NOT NULL,
  `statut` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `rapports_joueurs`
--

CREATE TABLE `rapports_joueurs` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(256) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `date_MAJ` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `actif_ouvrieres` tinyint(1) NOT NULL,
  `actif_armee` tinyint(1) NOT NULL,
  `actif_constructions` tinyint(1) NOT NULL,
  `actif_recherches` tinyint(1) NOT NULL,
  `JSN` bigint(20) NOT NULL,
  `SN` bigint(20) NOT NULL,
  `NE` bigint(20) NOT NULL,
  `JS` bigint(20) NOT NULL,
  `S` bigint(20) NOT NULL,
  `C` bigint(20) NOT NULL,
  `CE` bigint(20) NOT NULL,
  `A` bigint(20) NOT NULL,
  `AE` bigint(20) NOT NULL,
  `SE` bigint(20) NOT NULL,
  `Tk` bigint(20) NOT NULL,
  `TkE` bigint(20) NOT NULL,
  `T` bigint(20) NOT NULL,
  `TE` bigint(20) NOT NULL,
  `champignonniere` tinyint(4) NOT NULL,
  `entrepot_nourriture` tinyint(4) NOT NULL,
  `entrepot_materiaux` tinyint(4) NOT NULL,
  `couveuse` tinyint(4) NOT NULL,
  `solarium` tinyint(4) NOT NULL,
  `laboratoire` tinyint(4) NOT NULL,
  `salle_analyse` tinyint(4) NOT NULL,
  `salle_combat` tinyint(4) NOT NULL,
  `caserne` tinyint(4) NOT NULL,
  `dome` tinyint(4) NOT NULL,
  `loge_imperiale` tinyint(4) NOT NULL,
  `etable_pucerons` tinyint(4) NOT NULL,
  `etable_cochenilles` tinyint(4) NOT NULL,
  `constructions_en_cours` tinyint(4) NOT NULL,
  `constructions_en_cours_2` tinyint(4) NOT NULL,
  `technique_ponte` tinyint(4) NOT NULL,
  `bouclier_thoracique` tinyint(4) NOT NULL,
  `armes` tinyint(4) NOT NULL,
  `architecture` tinyint(4) NOT NULL,
  `communication_animaux` tinyint(4) NOT NULL,
  `vitesse_chasse` tinyint(4) NOT NULL,
  `vitesse_attaque` tinyint(4) NOT NULL,
  `genetique` tinyint(4) NOT NULL,
  `acide` tinyint(4) NOT NULL,
  `poison` tinyint(4) NOT NULL,
  `labo_en_cours` tinyint(4) NOT NULL,
  `labo_en_cours_2` tinyint(4) NOT NULL,
  `ouvrieres` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `RC_guerre`
--

CREATE TABLE `RC_guerre` (
  `ID_RC` int(11) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `import_auto` tinyint(1) NOT NULL,
  `proprietaire` varchar(255) NOT NULL,
  `createur` varchar(255) NOT NULL,
  `attaquant` varchar(255) NOT NULL,
  `defenseur` varchar(255) NOT NULL,
  `mode` varchar(10) NOT NULL,
  `RC` text NOT NULL,
  `analyse` text NOT NULL,
  `HOF` bigint(20) NOT NULL,
  `date_RC` bigint(20) NOT NULL,
  `date_ajout` bigint(20) NOT NULL,
  `hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Repartitions_ressources`
--

CREATE TABLE `Repartitions_ressources` (
  `ID` int(11) NOT NULL,
  `alliance` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `date_creation` date NOT NULL,
  `convois` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `schema_antisonde`
--

CREATE TABLE `schema_antisonde` (
  `pseudo` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `lieu_antisonde_1` varchar(4) NOT NULL,
  `unite_antisonde_1` varchar(4) NOT NULL,
  `nombre_antisonde_1` int(11) NOT NULL,
  `lieu_antisonde_2` varchar(4) NOT NULL,
  `unite_antisonde_2` varchar(4) NOT NULL,
  `nombre_antisonde_2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `schema_sonde`
--

CREATE TABLE `schema_sonde` (
  `pseudo` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `lieu_sonde_1` varchar(10) NOT NULL,
  `unite_sonde_1` varchar(5) NOT NULL,
  `nombre_sonde_1` bigint(20) NOT NULL,
  `lieu_sonde_2` varchar(10) NOT NULL,
  `unite_sonde_2` varchar(5) NOT NULL,
  `nombre_sonde_2` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `SimulationsChasse`
--

CREATE TABLE `SimulationsChasse` (
  `pseudo` varchar(255) NOT NULL,
  `IP` varchar(255) NOT NULL,
  `bouclier` int(11) NOT NULL,
  `armes` int(11) NOT NULL,
  `vitesse_chasse` int(11) NOT NULL,
  `cochenilles` int(11) NOT NULL,
  `TDC_lancement` bigint(20) NOT NULL,
  `TDC_conquis` bigint(20) NOT NULL,
  `analyse` mediumtext NOT NULL,
  `JSN` bigint(20) NOT NULL,
  `SN` bigint(20) NOT NULL,
  `NE` bigint(20) NOT NULL,
  `JS` bigint(20) NOT NULL,
  `S` bigint(20) NOT NULL,
  `C` bigint(20) NOT NULL,
  `CE` bigint(20) NOT NULL,
  `A` bigint(20) NOT NULL,
  `AE` bigint(20) NOT NULL,
  `SE` bigint(20) NOT NULL,
  `Tk` bigint(20) NOT NULL,
  `TkE` bigint(20) NOT NULL,
  `T` bigint(20) NOT NULL,
  `TE` bigint(20) NOT NULL,
  `Petite_araignee` bigint(20) NOT NULL,
  `Araignee` bigint(20) NOT NULL,
  `Chenille` bigint(20) NOT NULL,
  `Criquet` bigint(20) NOT NULL,
  `Guepe` bigint(20) NOT NULL,
  `Cigale` bigint(20) NOT NULL,
  `Dionee` bigint(20) NOT NULL,
  `Abeille` bigint(20) NOT NULL,
  `Hanneton` bigint(20) NOT NULL,
  `Scarabee` bigint(20) NOT NULL,
  `Lezard` bigint(20) NOT NULL,
  `Mante_religieuse` bigint(20) NOT NULL,
  `Souris` bigint(20) NOT NULL,
  `Mulot` bigint(20) NOT NULL,
  `Alouette` bigint(20) NOT NULL,
  `Rat` bigint(20) NOT NULL,
  `Tamanoir` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `TDC_perso`
--

CREATE TABLE `TDC_perso` (
  `pseudo` varchar(255) NOT NULL,
  `serveur` varchar(52) NOT NULL,
  `alliance` varchar(255) NOT NULL,
  `valeur` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `tentatives_connexion`
--

CREATE TABLE `tentatives_connexion` (
  `pseudo` varchar(255) NOT NULL,
  `date_connexion` bigint(20) NOT NULL,
  `IP` varchar(255) NOT NULL,
  `reussite` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `themes`
--

CREATE TABLE `themes` (
  `ID` smallint(6) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `createur` varchar(255) NOT NULL,
  `date_creation` bigint(20) NOT NULL,
  `date_MAJ` bigint(20) NOT NULL,
  `mode_fond` varchar(10) NOT NULL,
  `valeur_fond` varchar(255) NOT NULL,
  `entete_table` varchar(25) NOT NULL,
  `texte_entete` varchar(25) NOT NULL,
  `fond_contenu` varchar(25) NOT NULL,
  `fond_lisible` varchar(25) NOT NULL,
  `couleur_1_bouton` varchar(25) NOT NULL,
  `couleur_2_bouton` varchar(25) NOT NULL,
  `texte_bouton` varchar(25) NOT NULL,
  `ombre_bouton` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Conversations_guerre`
--
ALTER TABLE `Conversations_guerre`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Identification_ZzzelpScript`
--
ALTER TABLE `Identification_ZzzelpScript`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Logs_MF`
--
ALTER TABLE `Logs_MF`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `membres`
--
ALTER TABLE `membres`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `MP_Zzzelp`
--
ALTER TABLE `MP_Zzzelp`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `packs_smileys`
--
ALTER TABLE `packs_smileys`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `Rangs_Zzzelp`
--
ALTER TABLE `Rangs_Zzzelp`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `rapports_joueurs`
--
ALTER TABLE `rapports_joueurs`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `RC_guerre`
--
ALTER TABLE `RC_guerre`
  ADD PRIMARY KEY (`ID_RC`);

--
-- Index pour la table `Repartitions_ressources`
--
ALTER TABLE `Repartitions_ressources`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Conversations_guerre`
--
ALTER TABLE `Conversations_guerre`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT pour la table `Identification_ZzzelpScript`
--
ALTER TABLE `Identification_ZzzelpScript`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6898;
--
-- AUTO_INCREMENT pour la table `Logs_MF`
--
ALTER TABLE `Logs_MF`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1051006;
--
-- AUTO_INCREMENT pour la table `membres`
--
ALTER TABLE `membres`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8232;
--
-- AUTO_INCREMENT pour la table `MP_Zzzelp`
--
ALTER TABLE `MP_Zzzelp`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT pour la table `packs_smileys`
--
ALTER TABLE `packs_smileys`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1798;
--
-- AUTO_INCREMENT pour la table `Rangs_Zzzelp`
--
ALTER TABLE `Rangs_Zzzelp`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1310972;
--
-- AUTO_INCREMENT pour la table `rapports_joueurs`
--
ALTER TABLE `rapports_joueurs`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14386;
--
-- AUTO_INCREMENT pour la table `RC_guerre`
--
ALTER TABLE `RC_guerre`
  MODIFY `ID_RC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54301;
--
-- AUTO_INCREMENT pour la table `Repartitions_ressources`
--
ALTER TABLE `Repartitions_ressources`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;
--
-- AUTO_INCREMENT pour la table `themes`
--
ALTER TABLE `themes`
  MODIFY `ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
