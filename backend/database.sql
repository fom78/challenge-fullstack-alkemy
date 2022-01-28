CREATE DATABASE  IF NOT EXISTS `finance`;
USE `finance`;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL UNIQUE,
  `actual_access_token` TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `operations`
--

DROP TABLE IF EXISTS `operations`;

CREATE TABLE `operations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `concept` varchar(255) NOT NULL,
  `type` varchar(40) NOT NULL,
  `category_id` int(11) NOT NULL,
  `amount` int(11) ,
  `date` DATE ,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Operation_Category` (`category_id`),
  KEY `FK_Operation_User` (`user_id`),
  CONSTRAINT `FK_Operation_Category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FK_Operation_User` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Insert some categories

insert into categories values(null,'Comida'),(null,'Turismo'),(null,'Trabajo'),(null,'Recreacion'),(null,'Informatica')
,(null,'Moda'),(null,'Reparacion'),(null,'Otros');

INSERT INTO operations VALUES (null,'prueba','income',1,334,'2021-03-25',1);