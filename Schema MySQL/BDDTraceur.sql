-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Ven 07 Avril 2017 à 20:20
-- Version du serveur :  5.5.37
-- Version de PHP :  5.5.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `BDDTraceur`
--

-- --------------------------------------------------------

--
-- Structure de la table `alliances_s1`
--

CREATE TABLE `alliances_s1` (
  `ID` int(11) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `TDC` bigint(20) NOT NULL,
  `membres` smallint(6) NOT NULL,
  `date_releve` bigint(20) NOT NULL,
  `origine` varchar(2) NOT NULL,
  `proprietaire` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `alliances_s2`
--

CREATE TABLE `alliances_s2` (
  `ID` int(11) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `TDC` bigint(20) NOT NULL,
  `membres` smallint(6) NOT NULL,
  `date_releve` bigint(20) NOT NULL,
  `origine` varchar(2) NOT NULL,
  `proprietaire` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `alliances_s3`
--

CREATE TABLE `alliances_s3` (
  `ID` int(11) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `TDC` bigint(20) NOT NULL,
  `membres` smallint(6) NOT NULL,
  `date_releve` bigint(20) NOT NULL,
  `origine` varchar(2) NOT NULL,
  `proprietaire` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `alliances_s4`
--

CREATE TABLE `alliances_s4` (
  `ID` int(11) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `TDC` bigint(20) NOT NULL,
  `membres` smallint(6) NOT NULL,
  `date_releve` bigint(20) NOT NULL,
  `origine` varchar(2) NOT NULL,
  `proprietaire` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `alliances_test`
--

CREATE TABLE `alliances_test` (
  `ID` int(11) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `TDC` bigint(20) NOT NULL,
  `membres` smallint(6) NOT NULL,
  `date_releve` bigint(20) NOT NULL,
  `origine` varchar(2) NOT NULL,
  `proprietaire` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `correspondances_s1`
--

CREATE TABLE `correspondances_s1` (
  `ID` int(11) NOT NULL,
  `attaquant` varchar(255) NOT NULL,
  `cible` varchar(255) NOT NULL,
  `alliance_att` varchar(10) NOT NULL,
  `alliance_def` varchar(10) NOT NULL,
  `date_mini` bigint(20) NOT NULL,
  `date_maxi` bigint(20) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `TDC_avant_att` bigint(20) NOT NULL,
  `TDC_apres_att` bigint(20) NOT NULL,
  `TDC_avant_def` bigint(20) NOT NULL,
  `TDC_apres_def` bigint(20) NOT NULL,
  `mode` tinyint(4) NOT NULL,
  `acces` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `correspondances_s2`
--

CREATE TABLE `correspondances_s2` (
  `ID` int(11) NOT NULL,
  `attaquant` varchar(255) NOT NULL,
  `cible` varchar(255) NOT NULL,
  `alliance_att` varchar(10) NOT NULL,
  `alliance_def` varchar(10) NOT NULL,
  `date_mini` bigint(20) NOT NULL,
  `date_maxi` bigint(20) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `TDC_avant_att` bigint(20) NOT NULL,
  `TDC_apres_att` bigint(20) NOT NULL,
  `TDC_avant_def` bigint(20) NOT NULL,
  `TDC_apres_def` bigint(20) NOT NULL,
  `mode` tinyint(4) NOT NULL,
  `acces` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `correspondances_s3`
--

CREATE TABLE `correspondances_s3` (
  `ID` int(11) NOT NULL,
  `attaquant` varchar(255) NOT NULL,
  `cible` varchar(255) NOT NULL,
  `alliance_att` varchar(10) NOT NULL,
  `alliance_def` varchar(10) NOT NULL,
  `date_mini` bigint(20) NOT NULL,
  `date_maxi` bigint(20) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `TDC_avant_att` bigint(20) NOT NULL,
  `TDC_apres_att` bigint(20) NOT NULL,
  `TDC_avant_def` bigint(20) NOT NULL,
  `TDC_apres_def` bigint(20) NOT NULL,
  `mode` tinyint(4) NOT NULL,
  `acces` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `correspondances_s4`
--

CREATE TABLE `correspondances_s4` (
  `ID` int(11) NOT NULL,
  `attaquant` varchar(255) NOT NULL,
  `cible` varchar(255) NOT NULL,
  `alliance_att` varchar(10) NOT NULL,
  `alliance_def` varchar(10) NOT NULL,
  `date_mini` bigint(20) NOT NULL,
  `date_maxi` bigint(20) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `TDC_avant_att` bigint(20) NOT NULL,
  `TDC_apres_att` bigint(20) NOT NULL,
  `TDC_avant_def` bigint(20) NOT NULL,
  `TDC_apres_def` bigint(20) NOT NULL,
  `mode` tinyint(4) NOT NULL,
  `acces` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `correspondances_test`
--

CREATE TABLE `correspondances_test` (
  `ID` int(11) NOT NULL,
  `attaquant` varchar(255) NOT NULL,
  `cible` varchar(255) NOT NULL,
  `alliance_att` varchar(10) NOT NULL,
  `alliance_def` varchar(10) NOT NULL,
  `date_mini` bigint(20) NOT NULL,
  `date_maxi` bigint(20) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `TDC_avant_att` bigint(20) NOT NULL,
  `TDC_apres_att` bigint(20) NOT NULL,
  `TDC_avant_def` bigint(20) NOT NULL,
  `TDC_apres_def` bigint(20) NOT NULL,
  `mode` tinyint(4) NOT NULL,
  `acces` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `preferences_traceur`
--

CREATE TABLE `preferences_traceur` (
  `ID` int(11) NOT NULL,
  `serveur` varchar(5) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `mode` varchar(10) NOT NULL,
  `valeur` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `TDC_s1`
--

CREATE TABLE `TDC_s1` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `date_releve` bigint(20) NOT NULL,
  `origine` varchar(4) NOT NULL,
  `proprietaire` varchar(20) NOT NULL,
  `prive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `TDC_s2`
--

CREATE TABLE `TDC_s2` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `date_releve` bigint(20) NOT NULL,
  `origine` varchar(4) NOT NULL,
  `proprietaire` varchar(20) NOT NULL,
  `prive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `TDC_s3`
--

CREATE TABLE `TDC_s3` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `date_releve` bigint(20) NOT NULL,
  `origine` varchar(4) NOT NULL,
  `proprietaire` varchar(20) NOT NULL,
  `prive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `TDC_s4`
--

CREATE TABLE `TDC_s4` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `date_releve` bigint(20) NOT NULL,
  `origine` varchar(4) NOT NULL,
  `proprietaire` varchar(20) NOT NULL,
  `prive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `TDC_test`
--

CREATE TABLE `TDC_test` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `valeur` bigint(20) NOT NULL,
  `date_releve` bigint(20) NOT NULL,
  `origine` varchar(4) NOT NULL,
  `proprietaire` varchar(20) NOT NULL,
  `prive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `variations_inconnues_s1`
--

CREATE TABLE `variations_inconnues_s1` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `date_mini` bigint(20) NOT NULL,
  `date_maxi` bigint(20) NOT NULL,
  `valeur_avant` bigint(20) NOT NULL,
  `valeur_apres` bigint(20) NOT NULL,
  `resolu` tinyint(1) NOT NULL DEFAULT '0',
  `acces` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `variations_inconnues_s2`
--

CREATE TABLE `variations_inconnues_s2` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `date_mini` bigint(20) NOT NULL,
  `date_maxi` bigint(20) NOT NULL,
  `valeur_avant` bigint(20) NOT NULL,
  `valeur_apres` bigint(20) NOT NULL,
  `resolu` tinyint(1) NOT NULL DEFAULT '0',
  `acces` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `variations_inconnues_s3`
--

CREATE TABLE `variations_inconnues_s3` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `date_mini` bigint(20) NOT NULL,
  `date_maxi` bigint(20) NOT NULL,
  `valeur_avant` bigint(20) NOT NULL,
  `valeur_apres` bigint(20) NOT NULL,
  `resolu` tinyint(1) NOT NULL DEFAULT '0',
  `acces` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `variations_inconnues_s4`
--

CREATE TABLE `variations_inconnues_s4` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `date_mini` bigint(20) NOT NULL,
  `date_maxi` bigint(20) NOT NULL,
  `valeur_avant` bigint(20) NOT NULL,
  `valeur_apres` bigint(20) NOT NULL,
  `resolu` tinyint(1) NOT NULL DEFAULT '0',
  `acces` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `variations_inconnues_test`
--

CREATE TABLE `variations_inconnues_test` (
  `ID` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `alliance` varchar(10) NOT NULL,
  `date_mini` bigint(20) NOT NULL,
  `date_maxi` bigint(20) NOT NULL,
  `valeur_avant` bigint(20) NOT NULL,
  `valeur_apres` bigint(20) NOT NULL,
  `resolu` tinyint(1) NOT NULL DEFAULT '0',
  `acces` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `alliances_s1`
--
ALTER TABLE `alliances_s1`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `alliances_s2`
--
ALTER TABLE `alliances_s2`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `alliances_s3`
--
ALTER TABLE `alliances_s3`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `alliances_s4`
--
ALTER TABLE `alliances_s4`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `alliances_test`
--
ALTER TABLE `alliances_test`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `correspondances_s1`
--
ALTER TABLE `correspondances_s1`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `correspondances_s2`
--
ALTER TABLE `correspondances_s2`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `correspondances_s3`
--
ALTER TABLE `correspondances_s3`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `correspondances_s4`
--
ALTER TABLE `correspondances_s4`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `correspondances_test`
--
ALTER TABLE `correspondances_test`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `preferences_traceur`
--
ALTER TABLE `preferences_traceur`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `TDC_s1`
--
ALTER TABLE `TDC_s1`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `TDC_s2`
--
ALTER TABLE `TDC_s2`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `TDC_s3`
--
ALTER TABLE `TDC_s3`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `TDC_s4`
--
ALTER TABLE `TDC_s4`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `TDC_test`
--
ALTER TABLE `TDC_test`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `variations_inconnues_s1`
--
ALTER TABLE `variations_inconnues_s1`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `variations_inconnues_s2`
--
ALTER TABLE `variations_inconnues_s2`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `variations_inconnues_s3`
--
ALTER TABLE `variations_inconnues_s3`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `variations_inconnues_s4`
--
ALTER TABLE `variations_inconnues_s4`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `variations_inconnues_test`
--
ALTER TABLE `variations_inconnues_test`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `alliances_s1`
--
ALTER TABLE `alliances_s1`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=646902;
--
-- AUTO_INCREMENT pour la table `alliances_s2`
--
ALTER TABLE `alliances_s2`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=553355;
--
-- AUTO_INCREMENT pour la table `alliances_s3`
--
ALTER TABLE `alliances_s3`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117695;
--
-- AUTO_INCREMENT pour la table `alliances_s4`
--
ALTER TABLE `alliances_s4`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=419574;
--
-- AUTO_INCREMENT pour la table `alliances_test`
--
ALTER TABLE `alliances_test`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1972;
--
-- AUTO_INCREMENT pour la table `correspondances_s1`
--
ALTER TABLE `correspondances_s1`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166253;
--
-- AUTO_INCREMENT pour la table `correspondances_s2`
--
ALTER TABLE `correspondances_s2`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108107;
--
-- AUTO_INCREMENT pour la table `correspondances_s3`
--
ALTER TABLE `correspondances_s3`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106822;
--
-- AUTO_INCREMENT pour la table `correspondances_s4`
--
ALTER TABLE `correspondances_s4`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=259696;
--
-- AUTO_INCREMENT pour la table `correspondances_test`
--
ALTER TABLE `correspondances_test`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2633;
--
-- AUTO_INCREMENT pour la table `preferences_traceur`
--
ALTER TABLE `preferences_traceur`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=467787;
--
-- AUTO_INCREMENT pour la table `TDC_s1`
--
ALTER TABLE `TDC_s1`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104159178;
--
-- AUTO_INCREMENT pour la table `TDC_s2`
--
ALTER TABLE `TDC_s2`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66821744;
--
-- AUTO_INCREMENT pour la table `TDC_s3`
--
ALTER TABLE `TDC_s3`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14196958;
--
-- AUTO_INCREMENT pour la table `TDC_s4`
--
ALTER TABLE `TDC_s4`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57080045;
--
-- AUTO_INCREMENT pour la table `TDC_test`
--
ALTER TABLE `TDC_test`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135167;
--
-- AUTO_INCREMENT pour la table `variations_inconnues_s1`
--
ALTER TABLE `variations_inconnues_s1`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=402309;
--
-- AUTO_INCREMENT pour la table `variations_inconnues_s2`
--
ALTER TABLE `variations_inconnues_s2`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=293290;
--
-- AUTO_INCREMENT pour la table `variations_inconnues_s3`
--
ALTER TABLE `variations_inconnues_s3`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=297637;
--
-- AUTO_INCREMENT pour la table `variations_inconnues_s4`
--
ALTER TABLE `variations_inconnues_s4`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=694651;
--
-- AUTO_INCREMENT pour la table `variations_inconnues_test`
--
ALTER TABLE `variations_inconnues_test`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8841;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
