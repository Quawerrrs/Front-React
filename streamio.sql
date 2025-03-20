-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 20 mars 2025 à 12:45
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
(10, 3, 'AZERTY');

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
(3, 12, 'qrbkqernb', 'asaa', 'les stupéfiants', 'la police', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(4, 12, 'qrbkqernb', 'plantes', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(5, 12, 'qrbkqernb', 'dragons', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(6, 12, 'qrbkqernb', 'argent', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(7, 12, 'qrbkqernb', 'nucléaire', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(8, 12, 'qrbkqernb', 'drogue', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(9, 12, 'qrbkqernb', 'chiens', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(10, 12, 'qrbkqernb', 'population', '', '', 'https://www.youtube.com/@Amixem', 'chaineAmixem', 10000),
(11, 12, 'email', 'qerbqerfqge', 'qergqeg', 'qbrqv', 'zrbqb', 'zrbver', 31234235),
(12, 3, 'maximelebg@gmail.com', 'Bah ouai le sang', '', '', 'https://www.youtube.com/@MaximeBiaggi', 'chaine de Biaggi', 132044292),
(13, 3, 'email2ndaire@email.com', 'la secondarité', '', '', 'https://www.youtube.com/@MaximeBiaggi', 'ChaineSecondaire', 31234),
(14, 15, 'tuche@gmail.com', 'les tuches', '', '', 'https://www.youtube.com/@lestuches2904', 'Les Tuches', 3);

-- --------------------------------------------------------

--
-- Structure de la table `conversations`
--

CREATE TABLE `conversations` (
  `con_id` int(11) NOT NULL,
  `con_uti_id_1` int(11) DEFAULT NULL,
  `con_uti_id_2` int(11) DEFAULT NULL,
  `con_uti_nom_1` varchar(50) NOT NULL,
  `con_uti_nom_2` varchar(50) NOT NULL,
  `con_closed` tinyint(1) DEFAULT 0,
  `con_last_mes_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `conversations`
--

INSERT INTO `conversations` (`con_id`, `con_uti_id_1`, `con_uti_id_2`, `con_uti_nom_1`, `con_uti_nom_2`, `con_closed`, `con_last_mes_id`) VALUES
(1, 8, 3, 'Allan', 'Amurius', 0, 25),
(13, 8, 15, 'Allan', 'Tuche', 0, 0);

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
(13, 'Amu', 'LR', 'Artus'),
(14, 'Troll', 'lr', 'artus'),
(15, 'Tuche', 'Tuche', 'Tuche');

-- --------------------------------------------------------

--
-- Structure de la table `demandes`
--

CREATE TABLE `demandes` (
  `dem_id` int(11) NOT NULL,
  `dem_description` text DEFAULT NULL,
  `dem_prix` decimal(10,0) DEFAULT NULL,
  `dem_chaine_id` int(11) NOT NULL,
  `dem_valide` tinyint(1) NOT NULL DEFAULT 0,
  `dem_pro_id` int(11) NOT NULL,
  `dem_ent_uti_id` int(11) NOT NULL,
  `dem_date_limite` date NOT NULL DEFAULT current_timestamp(),
  `dem_refus` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `demandes`
--

INSERT INTO `demandes` (`dem_id`, `dem_description`, `dem_prix`, `dem_chaine_id`, `dem_valide`, `dem_pro_id`, `dem_ent_uti_id`, `dem_date_limite`, `dem_refus`) VALUES
(1, 'Pour un placement de cet écran avec un code promo ', 3000, 3, 0, 17, 8, '2025-02-06', 0),
(3, 'qzrgn qznf qnfg qnerfgqn gngoqzergin ioqerunq irgniqs rgniuqsner gusqg nugn uisgn ruisgn ruiesnguier ngoueqsniogrqn rigpn aerqrignio gnosptgbnioudt pbn psbnuis nruioqs eruienrbui eq erb_yq fvbraug apbrgu abrgswudrbg ykzserbhbsdhvw,cxbvjyhz,bgeqsrbgki ergkzb ger', 150, 12, 1, 19, 8, '2025-02-14', 0),
(16, 'Vous devez vendre cet ecran à tous les regardeurs des tuches', 25, 14, 1, 9, 8, '2025-04-30', 0);

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
(8, 1234566781, 'Orsay', 'Allan');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `mes_id` int(11) NOT NULL,
  `mes_texte` text DEFAULT NULL,
  `mes_uti_envoyeur_id` int(11) NOT NULL,
  `mes_uti_receveur_id` int(11) NOT NULL,
  `mes_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `mes_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`mes_id`, `mes_texte`, `mes_uti_envoyeur_id`, `mes_uti_receveur_id`, `mes_date`, `mes_deleted`) VALUES
(1, 'bonjour', 8, 3, '2025-02-22 17:01:38', 0),
(2, 'bonjour', 8, 3, '2025-02-22 16:42:06', 0),
(3, 'non ?', 8, 3, '2025-02-22 17:13:59', 0),
(4, 'maintenant c\'est bon', 8, 3, '2025-02-22 17:19:28', 0),
(5, 'nan en fait c\'est mtn', 8, 3, '2025-02-22 17:20:31', 0),
(6, 'yu', 8, 3, '2025-02-22 17:39:07', 0),
(7, 'fghj', 8, 3, '2025-02-22 17:40:29', 0),
(8, 'sfer', 8, 3, '2025-02-22 17:44:50', 0),
(9, 'ezt', 8, 3, '2025-02-22 17:46:13', 0),
(10, 'èrtyi', 8, 3, '2025-02-22 17:46:43', 0),
(11, 'ca marche', 8, 3, '2025-02-22 17:47:43', 0),
(12, 'eqryerui', 8, 3, '2025-02-22 17:51:33', 0),
(13, 'dtyu', 8, 3, '2025-02-22 17:51:37', 0),
(14, 'tr', 8, 3, '2025-02-22 17:51:41', 0),
(15, 'ujkuk', 8, 3, '2025-02-22 17:51:44', 1),
(16, 'bonjour', 8, 8, '2025-02-22 17:53:51', 0),
(17, '?', 8, 8, '2025-02-22 17:55:09', 0),
(18, 'ah voila', 3, 8, '2025-02-22 17:56:59', 0),
(19, 'coucou', 3, 8, '2025-02-23 15:32:11', 0),
(20, 'bijour', 8, 3, '2025-02-23 15:32:32', 0),
(21, 'Vitrice il aurait trop du venir en boite !', 3, 8, '2025-02-23 15:36:07', 0),
(22, 'ouidvsdfkbsdfgijksdfgn', 8, 3, '2025-03-06 11:05:24', 0),
(23, 'UwU', 8, 3, '2025-02-23 15:36:27', 0),
(24, 'sdfwg', 8, 3, '2025-02-23 15:48:16', 0),
(25, 'bdhvbrebreberb', 8, 3, '2025-03-13 09:52:47', 0);

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
(12, 'test@test.com', 'sha1$879856b8$1$cfed03d2d0fd8f00fe3b16bcb43a4a07111abfd0', '2024-09-02 11:49:29', 0, NULL, 0),
(13, 'amuspam3004@gmail.com', 'sha1$957cc55d$1$8c2c7eb86da2564eaacec2850905641c870e4fc1', '2024-10-24 10:14:59', 0, NULL, 0),
(14, 'troll@gmail.com', 'sha1$2c8f3bc9$1$a579ad467e839f49bcf4c83e235f7dc86d9872ea', '2025-02-06 11:37:36', 0, NULL, 0),
(15, 'tuche@gmail.com', 'sha1$af9535e9$1$e5fc2b1d913681b02011fa8aa8b3b07e4e970465', '2025-03-06 14:45:06', 0, NULL, 0);

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
  ADD KEY `uti_id` (`dem_ent_uti_id`);

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
  ADD KEY `uti_id` (`mes_uti_envoyeur_id`);

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
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `chaines`
--
ALTER TABLE `chaines`
  MODIFY `cha_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `con_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `demandes`
--
ALTER TABLE `demandes`
  MODIFY `dem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `mes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `pro_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `uti_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  ADD CONSTRAINT `demandes_ibfk_2` FOREIGN KEY (`dem_ent_uti_id`) REFERENCES `entreprises` (`ent_uti_id`);

--
-- Contraintes pour la table `entreprises`
--
ALTER TABLE `entreprises`
  ADD CONSTRAINT `entreprises_ibfk_1` FOREIGN KEY (`ent_uti_id`) REFERENCES `utilisateurs` (`uti_id`);

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`mes_uti_envoyeur_id`) REFERENCES `utilisateurs` (`uti_id`);

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`pro_uti_id`) REFERENCES `entreprises` (`ent_uti_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
