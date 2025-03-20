-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 20 mars 2025 à 11:45
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `streamio`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateurs`
--

CREATE TABLE `administrateurs` (
  `adm_uti_id` int(11) NOT NULL,
  `adm_role` int(11) DEFAULT NULL,
  `adm_code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `administrateurs`
--

INSERT INTO `administrateurs` (`adm_uti_id`, `adm_role`, `adm_code`) VALUES
(14, 3, 'AZERTY');

-- --------------------------------------------------------

--
-- Structure de la table `chaines`
--

CREATE TABLE `chaines` (
  `cha_id` int(11) NOT NULL,
  `cha_uti_id` int(11) NOT NULL,
  `cha_email` varchar(100) DEFAULT NULL,
  `cha_theme_1` varchar(50) NOT NULL,
  `cha_theme_2` varchar(50) DEFAULT NULL,
  `cha_theme_3` varchar(50) DEFAULT NULL,
  `cha_url` varchar(255) NOT NULL,
  `cha_name` varchar(50) NOT NULL,
  `cha_subs` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `chaines`
--

INSERT INTO `chaines` (`cha_id`, `cha_uti_id`, `cha_email`, `cha_theme_1`, `cha_theme_2`, `cha_theme_3`, `cha_url`, `cha_name`, `cha_subs`) VALUES
(3, 12, 'qrbkqernb', 'asaa', 'les stupéfiants', 'la bite', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(4, 12, 'qrbkqernb', 'drogue', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(5, 12, 'qrbkqernb', 'drogue', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(6, 12, 'qrbkqernb', 'drogue', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(7, 12, 'qrbkqernb', 'drogue', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(8, 12, 'qrbkqernb', 'drogue', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(9, 12, 'qrbkqernb', 'drogue', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(10, 12, 'qrbkqernb', 'drogue', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(11, 12, 'email', 'qerbqerfqge', 'qergqeg', 'qbrqv', 'zrbqb', 'zrbver', 31234235),
(12, 3, 'maximelebg@gmail.com', 'Bah ouai le sang', '', '', 'https://www.youtube.com/@MaximeBiaggi', 'chaine de Biaggi', 132044292);

-- --------------------------------------------------------

--
-- Structure de la table `conversations`
--

CREATE TABLE `conversations` (
  `con_id` int(11) NOT NULL,
  `con_uti_id_1` int(11) DEFAULT NULL,
  `con_uti_id_2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `createurs`
--

CREATE TABLE `createurs` (
  `cre_uti_id` int(11) NOT NULL,
  `cre_pseudo` varchar(50) NOT NULL,
  `cre_nom` varchar(50) DEFAULT NULL,
  `cre_prenom` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `createurs`
--

INSERT INTO `createurs` (`cre_uti_id`, `cre_pseudo`, `cre_nom`, `cre_prenom`) VALUES
(3, 'Amurius', 'Lavie-Richard', 'Artus'),
(11, 'zdf', 'rzv', 'zdcz'),
(13, 'Amu', 'LR', 'Artus'),
(16, 'Youtube', 'prono', 'mathias');

-- --------------------------------------------------------

--
-- Structure de la table `demandes`
--

CREATE TABLE `demandes` (
  `dem_id` int(11) NOT NULL,
  `dem_description` varchar(50) DEFAULT NULL,
  `dem_prix` decimal(10,0) DEFAULT NULL,
  `dem_createur_id` int(11) NOT NULL,
  `dem_valide` tinyint(1) DEFAULT NULL,
  `dem_pro_id` int(11) NOT NULL,
  `dem_uti_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `entreprises`
--

CREATE TABLE `entreprises` (
  `ent_uti_id` int(11) NOT NULL,
  `ent_siret` int(11) NOT NULL,
  `ent_adresse` varchar(50) NOT NULL,
  `ent_nom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `entreprises`
--

INSERT INTO `entreprises` (`ent_uti_id`, `ent_siret`, `ent_adresse`, `ent_nom`) VALUES
(8, 1234566781, 'Orsay', 'Allan'),
(15, 512150, '3 rue du lycée', 'ISCIO');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `mes_id` int(11) NOT NULL,
  `mes_texte` text DEFAULT NULL,
  `mes_image` varchar(50) DEFAULT NULL,
  `con_id` int(11) NOT NULL,
  `uti_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `pro_id` int(11) NOT NULL,
  `pro_img` varchar(50) DEFAULT NULL,
  `pro_uti_id` int(11) NOT NULL,
  `pro_nom` varchar(64) NOT NULL,
  `pro_prix` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`pro_id`, `pro_img`, `pro_uti_id`, `pro_nom`, `pro_prix`) VALUES
(9, '/public/1733407470990.png', 8, 'Ecran', 600),
(17, '/public/1738236827225.png', 8, 'Ecran', 3424),
(18, '/public/1738236857296.png', 8, 'Ecran', 3522),
(19, '/public/1738237007518.png', 8, 'vertical', 2235);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `uti_id` int(11) NOT NULL,
  `uti_email` varchar(50) NOT NULL,
  `uti_motdepasse` varchar(255) NOT NULL,
  `uti_date_creation` datetime DEFAULT NULL,
  `is_blocked` tinyint(1) DEFAULT 0,
  `block_reason` varchar(255) DEFAULT NULL,
  `uti_mdp_oublie` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`uti_id`, `uti_email`, `uti_motdepasse`, `uti_date_creation`, `is_blocked`, `block_reason`, `uti_mdp_oublie`) VALUES
(3, 'artuslr78@gmail.com', 'sha1$58cb34ff$1$a61fa27872d546c3b4dde65855953b799fd047ef', '2024-06-27 16:44:10', 0, NULL, 0),
(8, 'allan@gmail.com', 'sha1$48d9114c$1$0a467e1e316a583b34586163935af19996473f29', '2024-06-27 18:56:19', 0, NULL, 0),
(10, 'admin@gmail.com', 'sha1$17eeb639$1$8193f6cf556ed3ef70426d85d11602031d3f7036', '2024-09-02 10:38:06', 0, NULL, 0),
(11, 'test@email.com', 'sha1$e69bef74$1$cf34ceb5a986ba00271511e8dc217f002101ec9b', '2024-09-02 11:25:46', 0, '', 0),
(12, 'test@test.com', 'sha1$879856b8$1$cfed03d2d0fd8f00fe3b16bcb43a4a07111abfd0', '2024-09-02 11:49:29', 0, NULL, 0),
(13, 'amuspam3004@gmail.com', 'sha1$957cc55d$1$8c2c7eb86da2564eaacec2850905641c870e4fc1', '2024-10-24 10:14:59', 0, NULL, 0),
(14, 'pronomathiad@gmail.com', 'sha1$e016ebfc$1$65d28da933cf99a7cf2d3ce751662e03fa9599e1', '2025-02-06 11:41:31', 0, NULL, 0),
(15, 'iscio@gmail.com', 'sha1$9cc7ccc7$1$2bf51a9459eb9ed1561686cfa23b6ee5be6da767', '2025-03-13 10:38:22', 0, '', 0),
(16, 'youtube@gmail.com', 'sha1$03e68faf$1$4b29b794e3228b5f36768ef9798a6360b4db95e5', '2025-03-13 11:16:29', 1, 'bite', 0);

-- --------------------------------------------------------

--
-- Structure de la table `videos`
--

CREATE TABLE `videos` (
  `vid_id` int(11) NOT NULL,
  `vid_nom` varchar(50) DEFAULT NULL,
  `vid_theme` varchar(50) DEFAULT NULL,
  `vid_duree` time NOT NULL,
  `dem_id` int(11) NOT NULL,
  `uti_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrateurs`
--
ALTER TABLE `administrateurs`
  ADD PRIMARY KEY (`adm_uti_id`);

--
-- Index pour la table `chaines`
--
ALTER TABLE `chaines`
  ADD PRIMARY KEY (`cha_id`),
  ADD KEY `cha_uti_id` (`cha_uti_id`);

--
-- Index pour la table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`con_id`);

--
-- Index pour la table `createurs`
--
ALTER TABLE `createurs`
  ADD PRIMARY KEY (`cre_uti_id`),
  ADD UNIQUE KEY `cre_pseudo` (`cre_pseudo`);

--
-- Index pour la table `demandes`
--
ALTER TABLE `demandes`
  ADD PRIMARY KEY (`dem_id`),
  ADD UNIQUE KEY `pro_id` (`dem_pro_id`),
  ADD KEY `uti_id` (`dem_uti_id`);

--
-- Index pour la table `entreprises`
--
ALTER TABLE `entreprises`
  ADD PRIMARY KEY (`ent_uti_id`),
  ADD UNIQUE KEY `ent_siret` (`ent_siret`),
  ADD UNIQUE KEY `ent_nom` (`ent_nom`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`mes_id`),
  ADD KEY `con_id` (`con_id`),
  ADD KEY `uti_id` (`uti_id`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`pro_id`),
  ADD KEY `uti_id` (`pro_uti_id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`uti_id`),
  ADD UNIQUE KEY `uti_email` (`uti_email`);

--
-- Index pour la table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`vid_id`),
  ADD KEY `dem_id` (`dem_id`),
  ADD KEY `uti_id` (`uti_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `chaines`
--
ALTER TABLE `chaines`
  MODIFY `cha_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `con_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `demandes`
--
ALTER TABLE `demandes`
  MODIFY `dem_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `mes_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `pro_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `uti_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `videos`
--
ALTER TABLE `videos`
  MODIFY `vid_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `administrateurs`
--
ALTER TABLE `administrateurs`
  ADD CONSTRAINT `administrateurs_ibfk_1` FOREIGN KEY (`adm_uti_id`) REFERENCES `utilisateurs` (`uti_id`);

--
-- Contraintes pour la table `chaines`
--
ALTER TABLE `chaines`
  ADD CONSTRAINT `chaines_ibfk_1` FOREIGN KEY (`cha_uti_id`) REFERENCES `utilisateurs` (`uti_id`);

--
-- Contraintes pour la table `createurs`
--
ALTER TABLE `createurs`
  ADD CONSTRAINT `createurs_ibfk_1` FOREIGN KEY (`cre_uti_id`) REFERENCES `utilisateurs` (`uti_id`);

--
-- Contraintes pour la table `demandes`
--
ALTER TABLE `demandes`
  ADD CONSTRAINT `demandes_ibfk_1` FOREIGN KEY (`dem_pro_id`) REFERENCES `produits` (`pro_id`),
  ADD CONSTRAINT `demandes_ibfk_2` FOREIGN KEY (`dem_uti_id`) REFERENCES `entreprises` (`ent_uti_id`);

--
-- Contraintes pour la table `entreprises`
--
ALTER TABLE `entreprises`
  ADD CONSTRAINT `entreprises_ibfk_1` FOREIGN KEY (`ent_uti_id`) REFERENCES `utilisateurs` (`uti_id`);

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`con_id`) REFERENCES `conversations` (`con_id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`uti_id`) REFERENCES `utilisateurs` (`uti_id`);

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`pro_uti_id`) REFERENCES `entreprises` (`ent_uti_id`);

--
-- Contraintes pour la table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`dem_id`) REFERENCES `demandes` (`dem_id`),
  ADD CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`uti_id`) REFERENCES `createurs` (`cre_uti_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
