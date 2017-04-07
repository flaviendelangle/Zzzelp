-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Ven 07 Avril 2017 à 20:21
-- Version du serveur :  5.5.37
-- Version de PHP :  5.5.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `BDDActions`
--

-- --------------------------------------------------------

--
-- Structure de la table `chasses`
--

CREATE TABLE `chasses` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `arrivee` bigint(20) NOT NULL,
  `valeur` int(11) NOT NULL,
  `serveur` varchar(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Convois`
--

CREATE TABLE `Convois` (
  `serveur` varchar(5) NOT NULL,
  `alliance` varchar(255) NOT NULL,
  `lanceur` varchar(255) NOT NULL,
  `receveur` varchar(255) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `mode` varchar(3) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `DemandesConvois`
--

CREATE TABLE `DemandesConvois` (
  `ID` int(11) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `alliance` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `date_creation` bigint(20) NOT NULL,
  `date_besoin` bigint(20) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `restant` bigint(20) NOT NULL,
  `ressource` varchar(3) NOT NULL,
  `commentaire` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `floods_archives`
--

CREATE TABLE `floods_archives` (
  `ID` int(11) NOT NULL,
  `ID_attaquant` mediumint(9) NOT NULL,
  `ID_cible` mediumint(9) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `ally_1` varchar(255) NOT NULL,
  `ally_2` varchar(255) NOT NULL,
  `ally_3` varchar(255) NOT NULL,
  `arrivee` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `floods_courant`
--

CREATE TABLE `floods_courant` (
  `ID` int(11) NOT NULL,
  `ID_attaquant` int(11) NOT NULL,
  `ID_cible` int(11) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `ally_1` varchar(255) NOT NULL,
  `ally_2` varchar(255) NOT NULL,
  `ally_3` varchar(255) NOT NULL,
  `arrivee` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Lancement_convois_mat`
--

CREATE TABLE `Lancement_convois_mat` (
  `alliance` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `lanceur` varchar(255) NOT NULL,
  `receveur` varchar(255) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `ajout` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `chasses`
--
ALTER TABLE `chasses`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `DemandesConvois`
--
ALTER TABLE `DemandesConvois`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `floods_courant`
--
ALTER TABLE `floods_courant`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `chasses`
--
ALTER TABLE `chasses`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54892;
--
-- AUTO_INCREMENT pour la table `DemandesConvois`
--
ALTER TABLE `DemandesConvois`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;
--
-- AUTO_INCREMENT pour la table `floods_courant`
--
ALTER TABLE `floods_courant`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5006316;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
