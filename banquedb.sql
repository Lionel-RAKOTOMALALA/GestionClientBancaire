-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 19 avr. 2024 à 08:28
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `banquedb`
--

-- --------------------------------------------------------

--
-- Structure de la table `clientbancaire`
--

DROP TABLE IF EXISTS `clientbancaire`;
CREATE TABLE IF NOT EXISTS `clientbancaire` (
  `num_compte` varchar(50) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `solde` double NOT NULL,
  PRIMARY KEY (`num_compte`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `clientbancaire`
--

INSERT INTO `clientbancaire` (`num_compte`, `nom`, `solde`) VALUES
('123HMT', 'Tchang', 900),
('001', 'Tchppp', 6000);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
