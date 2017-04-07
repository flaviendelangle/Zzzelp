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
-- Base de données :  `BDDReleves`
--

-- --------------------------------------------------------

--
-- Structure de la table `archives_convois`
--

CREATE TABLE `archives_convois` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(128) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `alliance` varchar(20) NOT NULL,
  `recu` tinyint(1) NOT NULL,
  `nombre` smallint(6) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `date_changement` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `archives_floods`
--

CREATE TABLE `archives_floods` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(128) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `nombre` smallint(6) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `date_changement` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `archives_niveaux`
--

CREATE TABLE `archives_niveaux` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(128) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `ancienne` tinyint(4) NOT NULL,
  `nouvelle` tinyint(4) NOT NULL,
  `date_changement` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `auto` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `archives_ouvrieres`
--

CREATE TABLE `archives_ouvrieres` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(128) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `ancienne` bigint(20) NOT NULL,
  `nouvelle` bigint(20) NOT NULL,
  `date_changement` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `auto` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `archives_retards_convois`
--

CREATE TABLE `archives_retards_convois` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(128) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `alliance` varchar(20) NOT NULL,
  `recu` tinyint(1) NOT NULL,
  `nombre` tinyint(4) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `date_changement` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `archives_convois`
--
ALTER TABLE `archives_convois`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `archives_floods`
--
ALTER TABLE `archives_floods`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `archives_niveaux`
--
ALTER TABLE `archives_niveaux`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `archives_ouvrieres`
--
ALTER TABLE `archives_ouvrieres`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `archives_retards_convois`
--
ALTER TABLE `archives_retards_convois`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `archives_convois`
--
ALTER TABLE `archives_convois`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212552;
--
-- AUTO_INCREMENT pour la table `archives_floods`
--
ALTER TABLE `archives_floods`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=625161;
--
-- AUTO_INCREMENT pour la table `archives_niveaux`
--
ALTER TABLE `archives_niveaux`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=454121;
--
-- AUTO_INCREMENT pour la table `archives_ouvrieres`
--
ALTER TABLE `archives_ouvrieres`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1477540;
--
-- AUTO_INCREMENT pour la table `archives_retards_convois`
--
ALTER TABLE `archives_retards_convois`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=733886;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
