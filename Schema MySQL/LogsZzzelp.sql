-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Ven 07 Avril 2017 à 20:22
-- Version du serveur :  5.5.37
-- Version de PHP :  5.5.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `LogsZzzelp`
--

-- --------------------------------------------------------

--
-- Structure de la table `Identifications_ZzzelpScript`
--

CREATE TABLE `Identifications_ZzzelpScript` (
  `pseudo` varchar(255) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `password` varchar(255) NOT NULL,
  `resultat` tinyint(1) NOT NULL,
  `date_action` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `logs_Recents`
--

CREATE TABLE `logs_Recents` (
  `ID` int(11) NOT NULL,
  `acces` varchar(10) NOT NULL,
  `page` varchar(30) NOT NULL,
  `onglet` varchar(30) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `IP` varchar(35) NOT NULL,
  `url` varchar(255) NOT NULL,
  `GET_var` text NOT NULL,
  `POST_var` text NOT NULL,
  `date_acces` bigint(20) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `validations_pseudo`
--

CREATE TABLE `validations_pseudo` (
  `ID` int(11) NOT NULL,
  `valide` varchar(256) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `validateur` varchar(256) NOT NULL,
  `methode` varchar(256) NOT NULL,
  `date_validation` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `logs_Recents`
--
ALTER TABLE `logs_Recents`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `validations_pseudo`
--
ALTER TABLE `validations_pseudo`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `logs_Recents`
--
ALTER TABLE `logs_Recents`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126915917;
--
-- AUTO_INCREMENT pour la table `validations_pseudo`
--
ALTER TABLE `validations_pseudo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23858;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
