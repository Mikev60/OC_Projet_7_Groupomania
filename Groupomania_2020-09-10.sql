# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Hôte: localhost (MySQL 5.7.26)
# Base de données: Groupomania
# Temps de génération: 2020-09-10 17:46:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Affichage de la table answers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `answers`;

CREATE TABLE `answers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idPost` int(11) NOT NULL,
  `auteur` varchar(60) NOT NULL DEFAULT '',
  `message` varchar(100) NOT NULL DEFAULT '',
  `idAuteur` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;

INSERT INTO `answers` (`id`, `idPost`, `auteur`, `message`, `idAuteur`)
VALUES
	(25,54,'utilisateur1','Merci',47),
	(26,55,'utilisateur2','Hahaha',48),
	(27,54,'utilisateur2','Ya plus qua',48),
	(28,56,'utilisateur3','LOL',49),
	(29,55,'utilisateur3','Grave ',49),
	(30,54,'utilisateur3','Salut',49),
	(31,57,'utilisateur4','Happy gif day',50),
	(32,56,'utilisateur4','Je valide ',50),
	(33,55,'utilisateur4','Allleeeer',50),
	(34,54,'utilisateur4','Salut merci',50),
	(35,55,'administrateur','test',46),
	(36,59,'administrateur','et si je poste avec auth',46);

/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table posts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `authorId` int(11) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `message` varchar(100) NOT NULL DEFAULT '',
  `nbAnswers` int(11) DEFAULT '0',
  `isFlagged` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;

INSERT INTO `posts` (`id`, `authorId`, `image`, `message`, `nbAnswers`, `isFlagged`)
VALUES
	(54,46,'http://localhost:3000/posts/tenor.gif1599743496215.gif','Bienvenue sur le réseau social de lentreprise ',0,0),
	(55,47,'http://localhost:3000/posts/giphy.gif1599743778074.gif','Quand le jour de paye arrive',0,0),
	(56,48,'http://localhost:3000/posts/giphycoffee.gif1599743945610.gif','Première chose en arrivant le matin',0,0),
	(57,49,'http://localhost:3000/posts/giphyday.gif1599744637842.gif','Happy gif day ',0,0),
	(58,47,'http://localhost:3000/posts/tenor_(1).gif1599746083644.gif','Quand je fais un test avec des regex !?$€',0,1),
	(59,46,'http://localhost:3000/posts/tenor_(1).gif1599755594232.gif','test auth',0,1);

/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;


# Affichage de la table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(60) NOT NULL DEFAULT '',
  `prenom` varchar(60) NOT NULL DEFAULT '',
  `pseudo` varchar(60) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) NOT NULL DEFAULT 'http://localhost:3000/profiles/defaultUser.png',
  `role` varchar(20) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `nom`, `prenom`, `pseudo`, `email`, `password`, `avatar`, `role`)
VALUES
	(46,'administrateur','administrateur','administrateur','mickael.vermand@gmail.com','$2b$10$hLvwn1Cy8gJxZl62OPEvUuoiQYiY7sm9kIKJ7BB8tqV4JRLVWlYh6','http://localhost:3000/profiles/avatar3.png1599743463483.png','admin'),
	(47,'Andre','Maurice','utilisateur1','test@test.com','$2b$10$GAMP25FvBDuKx9h.DOJ4feleZOzQZFOpWeWJeQp1iS4ovrlnuG.5O','http://localhost:3000/profiles/avatar2.jpg1599743745672.jpg','user'),
	(48,'Pierre','Gilles','utilisateur2','test2@test.com','$2b$10$SMC.m0gHerBBcooToE0A8.hiTyNgUHxINAEEls4eSrONlQ/vbvUSS','http://localhost:3000/profiles/avatar4.png1599743970233.png','user'),
	(49,'utilisateur3','utilisateur3','utilisateur3','test3@test.com','$2b$10$KfpSTKjGuE.SS4y2p82xAOCLN9qqqbyBUvRFzlqTK8FEMUE5SMW0q','http://localhost:3000/profiles/avatar1.jpeg1599744589937.jpg','user'),
	(50,'Jacques','Henry','utilisateur4','test4@gmail.com','$2b$10$gvW4TQUT3tl7Wx/X1w3O7uLBb.BgrujcAt5.OTHE8ihPQc0YbXasO','http://localhost:3000/profiles/avatar5.png1599745635854.png','user');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
