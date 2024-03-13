/*!40101 SET character_set_client = 'utf8' */;

CREATE DATABASE adumolie_bd;
CREATE USER IF NOT EXISTS 'adumolie_bd'@'%' IDENTIFIED BY 'adumolie_bd';
GRANT ALL ON adumolie_bd.* TO 'adumolie_bd'@'%';
FLUSH PRIVILEGES;
USE adumolie_bd;

--
-- Base de données : `adumolie_bd`
--

--
-- Structure de la table `ALGORITHME`
--

CREATE TABLE `ALGORITHME` (
  `id` int(11) NOT NULL,
  `texte` varchar(500) NOT NULL
) ;

--
-- Déchargement des données de la table `ALGORITHME`
--

INSERT INTO `ALGORITHME` (`id`, `texte`) VALUES
(1, 'Bienvenue sur CodeQuest, je m\'appelle Algorithmix et je suis là pour t\'aider et t\'accompagner tout au long de cette aventure.\r\nPour permettre au chevalier Executix d\'atteindre le coffre, il te faudra reconstruire l\'arbre d\'instruction.\r\nCet arbre se construit de la manière suivante : déplace avec ta souris les instructions dans l\'arbre afin de reconstituer le parcours d\'Executix. Une fois ton arbre complété tu peux visualiser son exécution en appuyant sur le bouton Exécuter. Tu pourras ainsi voir si Executix arrive bien au coffre.\r\nBonne chance !'),
(2, 'En utilisant les boucles imbriquées aide le prince à trouver sa princesse perdue'),
(3, 'Là il va falloir écrire le code optimal en python pour pouvoir trouver le trésor dans une durée très courte'),
(4, 'Bienvenue sur CodeQuest, je m\'appelle Algorithmx et je suis là pout t\'aider et t\'accompagner tout au long de cette aventure.\r\nPlace les cases dans les dropZone pour aider la personnage à trouver le coffre.');


--
-- Structure de la table `AVOIR`
--

CREATE TABLE `AVOIR` (
  `id_theme` int(11) NOT NULL,
  `id_famille` int(11) NOT NULL
) ;

--
-- Déchargement des données de la table `AVOIR`
--

INSERT INTO `AVOIR` (`id_theme`, `id_famille`) VALUES
(5, 2),
(1, 3),
(2, 7);

--
-- Structure de la table `COMMENTER`
--

CREATE TABLE `COMMENTER` (
  `id_utilisateur` int(11) NOT NULL,
  `id_niveau` int(11) NOT NULL,
  `evaluation` tinyint(4) NOT NULL,
  `texte` varchar(500) DEFAULT NULL,
  `time_stamp` datetime NOT NULL
) ;

--
-- Structure de la table `COMPLETER`
--

CREATE TABLE `COMPLETER` (
  `id_utilisateur` int(11) NOT NULL,
  `id_niveau` int(11) NOT NULL,
  `time_stamp` datetime DEFAULT NULL,
  `erreur` tinyint(4) NOT NULL,
  `indice_utilise` tinyint(4) NOT NULL,
  `score` int(11) NOT NULL
) ;

--
-- Déchargement des données de la table `COMPLETER`
--

INSERT INTO `COMPLETER` (`id_utilisateur`, `id_niveau`, `time_stamp`, `erreur`, `indice_utilise`, `score`) VALUES
(1, 1, '2024-03-08 15:47:10', 0, 0, 100),
(1, 2, '2024-03-08 15:52:10', 1, 0, 180),
(2, 1, '2024-03-01 10:54:10', 0, 0, 100),
(3, 1, '2024-03-05 15:48:32', 0, 1, 195),
(3, 2, '2024-03-07 15:49:08', 0, 0, 200),
(3, 3, '2024-03-08 15:49:08', 1, 2, 250),
(5, 1, '2024-02-06 15:51:54', 0, 0, 100),
(5, 2, '2024-02-13 15:51:54', 0, 0, 200),
(5, 3, '2024-02-20 15:51:54', 0, 0, 300),
(5, 4, '2024-02-27 15:51:54', 0, 0, 400),
(5, 5, '2024-03-05 15:51:54', 0, 1, 480),
(5, 6, '2024-03-08 15:51:54', 1, 1, 550);

--
-- Structure de la table `CONTENIR`
--

CREATE TABLE `CONTENIR` (
  `id_famille` int(11) NOT NULL,
  `id_algorithme` int(11) NOT NULL
) ;

--
-- Déchargement des données de la table `CONTENIR`
--

INSERT INTO `CONTENIR` (`id_famille`, `id_algorithme`) VALUES
(2, 1);


--
-- Structure de la table `FAMILLE`
--

CREATE TABLE `FAMILLE` (
  `id` int(11) NOT NULL,
  `nom` varchar(25) NOT NULL
) ;

--
-- Déchargement des données de la table `FAMILLE`
--

INSERT INTO `FAMILLE` (`id`, `nom`) VALUES
(1, 'fonction'),
(2, 'boucles'),
(3, 'switch'),
(4, 'Condition'),
(5, 'Tri'),
(6, 'Listes'),
(7, 'Piles Files');

--
-- Structure de la table `NIVEAU`
--

CREATE TABLE `NIVEAU` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `difficulte` tinyint(4) NOT NULL,
  `score_max` int(11) NOT NULL,
  `id_theme` int(11) NOT NULL
) ;

--
-- Déchargement des données de la table `NIVEAU`
--

INSERT INTO `NIVEAU` (`id`, `nom`, `difficulte`, `score_max`, `id_theme`) VALUES
(1, 'Ouvrir le coffre', 1, 100, 5),
(2, 'Trouver le trésor', 2, 200, 2),
(3, 'Sauver la princesse', 3, 300, 1),
(4, 'Décrypter le message', 4, 350, 3),
(5, 'Explorer le système solaire', 4, 475, 3),
(6, 'Résolvez le puzzle', 5, 500, 5),
(7, 'Créer une oeuvre d\'art', 5, 550, 1);


--
-- Structure de la table `POSSEDER`
--

CREATE TABLE `POSSEDER` (
  `id_algorithme` int(11) NOT NULL,
  `id_sommet` int(11) NOT NULL
) ;

--
-- Déchargement des données de la table `POSSEDER`
--

INSERT INTO `POSSEDER` (`id_algorithme`, `id_sommet`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6);

-- --------------------------------------------------------

--
-- Structure de la table `RAPPORT`
--

CREATE TABLE `RAPPORT` (
  `id` int(11) NOT NULL,
  `sujet` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `time_stamp` datetime NOT NULL,
  `id_utilisateur` int(11) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Structure de la table `SOMMET`
--

CREATE TABLE `SOMMET` (
  `id` int(11) NOT NULL,
  `type` varchar(25) NOT NULL,
  `coordX` int(11) NOT NULL,
  `coordY` int(11) NOT NULL,
  `texte` varchar(500) DEFAULT NULL,
  `hauteur` int(11) NOT NULL,
  `largeur` int(11) NOT NULL,
  `taille` varchar(100) NOT NULL,
  `fonction` varchar(50) DEFAULT NULL,
  `valeur` int(11) NOT NULL,
  `sortie` varchar(100) NOT NULL,
  `coords` varchar(50) NOT NULL,
  `zoneClick` varchar(50) NOT NULL
) ;

--
-- Déchargement des données de la table `SOMMET`
--

INSERT INTO `SOMMET` (`id`, `type`, `coordX`, `coordY`, `texte`, `hauteur`, `largeur`, `taille`, `fonction`, `valeur`, `sortie`, `coords`, `zoneClick`) VALUES
(1, 'issue', 548, 212, '[[\"\"],[\"Atteindre le coffre\"],[\"\"]]', 32, 170, '[0,106,0]', '', 3, '[[1,2,4,5]]', '[495]', '[106]'),
(2, 'assignment', 293, 413, '[[\"Avancer de\",\"3 cases\"]]', 48, 105, '[105]', 'move', 3, '[[]]', '[241]', '[105]'),
(3, 'loop', 462, 407, '[[\"Répéter 5\",\"fois\"]]', 36, 46, '[46]', 'repeat', 5, '[[3]]', '[439]', '[46]'),
(4, 'assignment', 462, 545, '[[\"Avancer de\",\"1 case\"]]', 48, 105, '[105]', 'move', 1, '[[]]', '[410]', '[105]'),
(5, 'assignment', 651, 416, '[[\"Tourner à\",\"gauche\"]]', 48, 92, '[92]', 'turn', -1, '[[]]', '[605]', '[92]'),
(6, 'assignment', 819, 416, '[[\"Avancer de\",\"2 cases\"]]', 48, 105, '[105]', 'move', 2, '[[]]', '[767]', '[105]');

--
-- Structure de la table `THEME`
--

CREATE TABLE `THEME` (
  `id` int(11) NOT NULL,
  `nom` varchar(25) NOT NULL
) ;

--
-- Déchargement des données de la table `THEME`
--

INSERT INTO `THEME` (`id`, `nom`) VALUES
(1, 'c++'),
(2, 'python'),
(3, 'HTML, CSS'),
(4, 'c#'),
(5, 'Algorithmique'),
(6, 'Swift'),
(7, 'Ruby');

--
-- Structure de la table `UTILISATEUR`
--

CREATE TABLE `UTILISATEUR` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `mdp` varchar(200) NOT NULL
) ;

--
-- Déchargement des données de la table `UTILISATEUR`
--

INSERT INTO `UTILISATEUR` (`id`, `email`, `mdp`) VALUES
(1, '$2y$12$4kRWRIhjt5RQ1/XMGHZvz.ru6kqa1EmPyqS35YBWPfHlw7i7SIBXC', '$2y$12$KbN6f9d/cujb8mn4vRvxneE0WX.RYo33HG4qX2IKh6duOgSKFX5jO'),
(2, '$2y$12$ityhRa1PI2BHnTCUNAuHJOSlyCcSMb/P0mdaNT3jPTnVrIoE5jXv.', '$2y$12$VObhReqV8gRMcXfq8NQxmuy2dyNMm/Gl0gVFc4l1Dr/bktALSq/oW'),
(3, '$2y$12$Km3JJPrbCgflbtFryRU/l.9eHFvEk.BW7DGPV7m86SQO/cMgjv4cO', '$2y$12$JiIFs1AdPN5F4n3CdV/D/eitBb5GZVlNqCsbFZGxUEHaDgV8dsu2i'),
(4, '$2y$12$kQFh.N7YoKk4PEDG5PyvNefw0wr082cg5nvAzhc3DA.WYfxTSOH/6', '$2y$12$DQM.h7cyaVAwZwGq8D9Y/Ontw1EQhFu3BYrPYndHELH.YQk53XtnW'),
(5, '$2y$12$B1JVsjYqoSK0ep8VlM9jR.JkWKb/zm7kvGW.KmTVeRAUyXScqNzK.', '$2y$12$WhDkvIAyAhjHTOZHKTe5v.aJa4s4vIrxlD0Va04YFb6h.VDv7lymW'),
(6, '$2y$12$h96b14Zg2GTadWuKJ33hkevasCj4dM.cp8pSZmL9Kni7FI/YnMBbS', '$2y$12$1UbBDOX2K.cI.Ia/YT6JZe0KK2nFcPebUG3NAUVPTWKhpxDRZ39z.');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ALGORITHME`
--
ALTER TABLE `ALGORITHME`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `AVOIR`
--
ALTER TABLE `AVOIR`
  ADD PRIMARY KEY (`id_theme`,`id_famille`),
  ADD KEY `id_famille` (`id_famille`);

--
-- Index pour la table `COMMENTER`
--
ALTER TABLE `COMMENTER`
  ADD PRIMARY KEY (`id_utilisateur`,`id_niveau`),
  ADD KEY `id_niveau` (`id_niveau`);

--
-- Index pour la table `COMPLETER`
--
ALTER TABLE `COMPLETER`
  ADD PRIMARY KEY (`id_utilisateur`,`id_niveau`),
  ADD KEY `id_niveau` (`id_niveau`);

--
-- Index pour la table `CONTENIR`
--
ALTER TABLE `CONTENIR`
  ADD PRIMARY KEY (`id_famille`,`id_algorithme`),
  ADD KEY `id_algorithme` (`id_algorithme`);

--
-- Index pour la table `FAMILLE`
--
ALTER TABLE `FAMILLE`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `NIVEAU`
--
ALTER TABLE `NIVEAU`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_theme` (`id_theme`);

--
-- Index pour la table `POSSEDER`
--
ALTER TABLE `POSSEDER`
  ADD PRIMARY KEY (`id_algorithme`,`id_sommet`),
  ADD KEY `id_sommet` (`id_sommet`);

--
-- Index pour la table `RAPPORT`
--
ALTER TABLE `RAPPORT`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `SOMMET`
--
ALTER TABLE `SOMMET`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `THEME`
--
ALTER TABLE `THEME`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `UTILISATEUR`
--
ALTER TABLE `UTILISATEUR`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ALGORITHME`
--
ALTER TABLE `ALGORITHME`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `FAMILLE`
--
ALTER TABLE `FAMILLE`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `NIVEAU`
--
ALTER TABLE `NIVEAU`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `RAPPORT`
--
ALTER TABLE `RAPPORT`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `SOMMET`
--
ALTER TABLE `SOMMET`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `THEME`
--
ALTER TABLE `THEME`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `UTILISATEUR`
--
ALTER TABLE `UTILISATEUR`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `AVOIR`
--
ALTER TABLE `AVOIR`
  ADD CONSTRAINT `AVOIR_ibfk_1` FOREIGN KEY (`id_theme`) REFERENCES `THEME` (`id`),
  ADD CONSTRAINT `AVOIR_ibfk_2` FOREIGN KEY (`id_famille`) REFERENCES `FAMILLE` (`id`);

--
-- Contraintes pour la table `COMMENTER`
--
ALTER TABLE `COMMENTER`
  ADD CONSTRAINT `COMMENTER_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `UTILISATEUR` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `COMMENTER_ibfk_2` FOREIGN KEY (`id_niveau`) REFERENCES `NIVEAU` (`id`);

--
-- Contraintes pour la table `COMPLETER`
--
ALTER TABLE `COMPLETER`
  ADD CONSTRAINT `COMPLETER_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `UTILISATEUR` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `COMPLETER_ibfk_2` FOREIGN KEY (`id_niveau`) REFERENCES `NIVEAU` (`id`);

--
-- Contraintes pour la table `CONTENIR`
--
ALTER TABLE `CONTENIR`
  ADD CONSTRAINT `CONTENIR_ibfk_1` FOREIGN KEY (`id_famille`) REFERENCES `FAMILLE` (`id`),
  ADD CONSTRAINT `CONTENIR_ibfk_2` FOREIGN KEY (`id_algorithme`) REFERENCES `ALGORITHME` (`id`);

--
-- Contraintes pour la table `NIVEAU`
--
ALTER TABLE `NIVEAU`
  ADD CONSTRAINT `NIVEAU_ibfk_1` FOREIGN KEY (`id_theme`) REFERENCES `THEME` (`id`);

--
-- Contraintes pour la table `POSSEDER`
--
ALTER TABLE `POSSEDER`
  ADD CONSTRAINT `POSSEDER_ibfk_1` FOREIGN KEY (`id_algorithme`) REFERENCES `ALGORITHME` (`id`),
  ADD CONSTRAINT `POSSEDER_ibfk_2` FOREIGN KEY (`id_sommet`) REFERENCES `SOMMET` (`id`);

--
-- Contraintes pour la table `RAPPORT`
--
ALTER TABLE `RAPPORT`
  ADD CONSTRAINT `RAPPORT_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `UTILISATEUR` (`id`) ON DELETE CASCADE;
COMMIT;

