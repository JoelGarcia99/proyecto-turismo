-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: proyecto_turismo
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aprueba_reserva`
--
create database proyecto_turismo;
use proyecto_turismo;

CREATE USER 'Tester'@'localhost' IDENTIFIED BY 'tester123';
GRANT ALL PRIVILEGES ON *.* TO 'Tester'@'localhost';

DROP TABLE IF EXISTS `aprueba_reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprueba_reserva` (
  `__id` char(36) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `estado` enum('pendiente','revision','negado','aprobado','completado') DEFAULT 'pendiente',
  `comentario` text,
  `leido_usuario` tinyint(1) DEFAULT '0',
  `leido_admin` tinyint(1) DEFAULT '0',
  `id_usuario` char(36) NOT NULL,
  `id_admin` char(36) DEFAULT NULL,
  `id_reserva` char(36) NOT NULL,
  PRIMARY KEY (`__id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_admin` (`id_admin`),
  KEY `fk_reserva` (`id_reserva`),
  CONSTRAINT `aprueba_reserva_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`__id`) ON UPDATE CASCADE,
  CONSTRAINT `aprueba_reserva_ibfk_2` FOREIGN KEY (`id_admin`) REFERENCES `usuario` (`__id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_reserva` FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprueba_reserva`
--

LOCK TABLES `aprueba_reserva` WRITE;
/*!40000 ALTER TABLE `aprueba_reserva` DISABLE KEYS */;
INSERT INTO `aprueba_reserva` VALUES ('e3d4a3bb-cd13-4758-b8f8-fe6f7ed8899b','2022-02-23 18:51:12',NULL,NULL,1,0,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',NULL,'2ba38798-56ce-4156-9506-312cc7385792');
/*!40000 ALTER TABLE `aprueba_reserva` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `aprueba_reserva` BEFORE INSERT ON `aprueba_reserva` FOR EACH ROW begin
    declare role enum("admin", "user", "pres_sev");
    set role = (select role from aprueba_reserva where __id = new.id_admin);
    if role <> "admin" then 
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Usuario no autorizado para realizar petición';
	end if;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `calif_local`
--

DROP TABLE IF EXISTS `calif_local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calif_local` (
  `__id` char(36) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `calificacion` tinyint DEFAULT NULL,
  `comentario` text,
  `id_usuario` char(36) NOT NULL,
  `id_puntoturistico` char(36) NOT NULL,
  PRIMARY KEY (`__id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_puntoturistico` (`id_puntoturistico`),
  CONSTRAINT `calif_local_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`__id`) ON UPDATE CASCADE,
  CONSTRAINT `calif_local_ibfk_2` FOREIGN KEY (`id_puntoturistico`) REFERENCES `punto_turistico` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calif_local`
--

LOCK TABLES `calif_local` WRITE;
/*!40000 ALTER TABLE `calif_local` DISABLE KEYS */;
/*!40000 ALTER TABLE `calif_local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calif_puntoturis`
--

DROP TABLE IF EXISTS `calif_puntoturis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calif_puntoturis` (
  `__id` char(36) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `calificacion` tinyint DEFAULT NULL,
  `comentario` text,
  `id_usuario` char(36) NOT NULL,
  `id_puntoturistico` char(36) NOT NULL,
  PRIMARY KEY (`__id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_puntoturistico` (`id_puntoturistico`),
  CONSTRAINT `calif_puntoturis_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`__id`) ON UPDATE CASCADE,
  CONSTRAINT `calif_puntoturis_ibfk_2` FOREIGN KEY (`id_puntoturistico`) REFERENCES `punto_turistico` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calif_puntoturis`
--

LOCK TABLES `calif_puntoturis` WRITE;
/*!40000 ALTER TABLE `calif_puntoturis` DISABLE KEYS */;
/*!40000 ALTER TABLE `calif_puntoturis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `__id` char(36) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`__id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES ('351b8a13-f6cb-4121-aaa3-ad2ad1376e45','San Andreas','Mundo fictisio de la saga de videojuegos Grand Theft Auto'),('77e86a09-3eb2-4928-a893-8a36d4afa6f6','Olimpo','Hogar de los dioses Griegos'),('dfc894ad-2eeb-409b-962f-5406a54aff1a','Nueva categoria','Categoria Test');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_PuntoTuristico`
--

DROP TABLE IF EXISTS `categoria_PuntoTuristico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_PuntoTuristico` (
  `id_categoria` char(36) NOT NULL,
  `id_puntoturistico` char(36) NOT NULL,
  PRIMARY KEY (`id_categoria`,`id_puntoturistico`),
  KEY `id_puntoturistico` (`id_puntoturistico`),
  CONSTRAINT `categoria_PuntoTuristico_ibfk_1` FOREIGN KEY (`id_puntoturistico`) REFERENCES `punto_turistico` (`__id`) ON UPDATE CASCADE,
  CONSTRAINT `categoria_PuntoTuristico_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_PuntoTuristico`
--

LOCK TABLES `categoria_PuntoTuristico` WRITE;
/*!40000 ALTER TABLE `categoria_PuntoTuristico` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria_PuntoTuristico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_local`
--

DROP TABLE IF EXISTS `categoria_local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_local` (
  `id_categoria` char(36) NOT NULL,
  `id_local` char(36) NOT NULL,
  PRIMARY KEY (`id_categoria`,`id_local`),
  KEY `id_local` (`id_local`),
  CONSTRAINT `categoria_local_ibfk_1` FOREIGN KEY (`id_local`) REFERENCES `local_turistico` (`__id`) ON UPDATE CASCADE,
  CONSTRAINT `categoria_local_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_local`
--

LOCK TABLES `categoria_local` WRITE;
/*!40000 ALTER TABLE `categoria_local` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria_local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guia`
--

DROP TABLE IF EXISTS `guia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guia` (
  `__id` char(36) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `cedula_pas` varchar(10) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `disponibilidad` tinyint(1) DEFAULT '1',
  `fk_imagen` char(36) DEFAULT NULL,
  `id_admin` char(36) NOT NULL,
  PRIMARY KEY (`__id`),
  UNIQUE KEY `cedula_pas` (`cedula_pas`),
  KEY `fk_imagen` (`fk_imagen`),
  KEY `fk_admin` (`id_admin`),
  CONSTRAINT `fk_admin` FOREIGN KEY (`id_admin`) REFERENCES `usuario` (`__id`) ON UPDATE CASCADE,
  CONSTRAINT `guia_ibfk_1` FOREIGN KEY (`fk_imagen`) REFERENCES `imagen` (`__id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guia`
--

LOCK TABLES `guia` WRITE;
/*!40000 ALTER TABLE `guia` DISABLE KEYS */;
INSERT INTO `guia` VALUES ('170e50eb-523a-4b0d-978b-7c4524441f02','Artyom','1234566578','0987656789',1,NULL,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748'),('177e435a-9453-4559-992a-9f540f495993','Capitán Price','123433233','1234544321',1,NULL,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748'),('1ef4ffd0-f93d-4930-98db-7b29818ebfb8','Json Statham','1234567890','091234567890',1,NULL,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748'),('24dea2ff-a990-4931-89db-1862c4ddb166','Ana','1234567898','0987654567',1,NULL,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748'),('2ea74fe0-f50c-41f4-b926-36f70eb43ae5','Kratos','1315955169','0982884734',1,NULL,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748'),('402f0e98-3e10-49c7-bc10-5bd83c4355d6','Carl Jhonson','1987654567','0987678900',1,NULL,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748'),('67078d56-10ca-49e4-925c-4c0fc6e9be21','Silvester Stalone','1234543212','0987654321',1,NULL,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748'),('6d96cac4-1f66-40f3-aac0-9c71690474db','Franklin','1230933322','0986544414',1,NULL,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748'),('8a32a503-7ce7-4c63-b3d6-b852555bd60d','Arthur Morgan','1909877890','0954334521',1,NULL,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748'),('b9dc0efe-67a9-4e14-95b6-bd57e34b44d3','Michael De Santa','1234544323','0987886567',1,NULL,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748'),('cf13c438-ae85-4cbc-bf4d-625edf63970a','Trevor Phillips','135988745','0987456555',1,NULL,'3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748');
/*!40000 ALTER TABLE `guia` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `administrar_guia` BEFORE INSERT ON `guia` FOR EACH ROW begin
    declare role enum("admin", "user", "pres_sev");
    set role = (select role from usuario where __id = new.id_admin limit 1);
    if role <> "admin" then 
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Usuario no autorizado para realizar petición';

	end if;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `imagen`
--

DROP TABLE IF EXISTS `imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagen` (
  `__id` char(36) NOT NULL,
  `url` text NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`__id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen`
--

LOCK TABLES `imagen` WRITE;
/*!40000 ALTER TABLE `imagen` DISABLE KEYS */;
INSERT INTO `imagen` VALUES ('1234453453454','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.storiamito.it%2Fwp-content%2Fuploads%2F2020%2F10%2Fmonte-olimpo-2.jpg&f=1&nofb=1','olimpo'),('b69f4d61-3a17-458f-b5a9-0f78f124caef','http://localhost:8500/media/image/345dcd3d-732e-4bc4-90b0-2e4592535db5::b69f4d61-3a17-458f-b5a9-0f78f124caef',NULL),('c6c44cd6-48e2-45c5-895f-c76f76c87104','http://localhost:8500/media/image/345dcd3d-732e-4bc4-90b0-2e4592535db5/c6c44cd6-48e2-45c5-895f-c76f76c87104',NULL),('dasdsadas','https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages1.wikia.nocookie.net%2F__cb20100411132906%2Fhercxena%2Fimages%2F8%2F84%2FValhalla.jpg&f=1&nofb=1','valhala'),('e1c401ab-43b2-4a21-b7fe-25954f594c69','localhost:8500/media/image/345dcd3d-732e-4bc4-90b0-2e4592535db5/e1c401ab-43b2-4a21-b7fe-25954f594c69',NULL);
/*!40000 ALTER TABLE `imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `local_puntoturistico`
--

DROP TABLE IF EXISTS `local_puntoturistico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `local_puntoturistico` (
  `id_local` char(36) NOT NULL,
  `id_puntoturistico` char(36) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  KEY `id_local` (`id_local`),
  KEY `id_puntoturistico` (`id_puntoturistico`),
  CONSTRAINT `local_puntoturistico_ibfk_1` FOREIGN KEY (`id_local`) REFERENCES `local_turistico` (`__id`) ON UPDATE CASCADE,
  CONSTRAINT `local_puntoturistico_ibfk_2` FOREIGN KEY (`id_puntoturistico`) REFERENCES `punto_turistico` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local_puntoturistico`
--

LOCK TABLES `local_puntoturistico` WRITE;
/*!40000 ALTER TABLE `local_puntoturistico` DISABLE KEYS */;
/*!40000 ALTER TABLE `local_puntoturistico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `local_turistico`
--

DROP TABLE IF EXISTS `local_turistico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `local_turistico` (
  `__id` char(36) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` text,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `descripcion` text,
  `horario_inicio` tinyint NOT NULL,
  `horario_fin` tinyint NOT NULL,
  `id_usuario` char(36) DEFAULT NULL,
  PRIMARY KEY (`__id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `local_turistico_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local_turistico`
--

LOCK TABLES `local_turistico` WRITE;
/*!40000 ALTER TABLE `local_turistico` DISABLE KEYS */;
/*!40000 ALTER TABLE `local_turistico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `punto_imagen`
--

DROP TABLE IF EXISTS `punto_imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `punto_imagen` (
  `id_puntoturistico` char(36) NOT NULL,
  `id_imagen` char(36) NOT NULL,
  PRIMARY KEY (`id_puntoturistico`,`id_imagen`),
  KEY `fk_img` (`id_imagen`),
  CONSTRAINT `fk_img` FOREIGN KEY (`id_imagen`) REFERENCES `imagen` (`__id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `punto_imagen_ibfk_1` FOREIGN KEY (`id_puntoturistico`) REFERENCES `punto_turistico` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punto_imagen`
--

LOCK TABLES `punto_imagen` WRITE;
/*!40000 ALTER TABLE `punto_imagen` DISABLE KEYS */;
INSERT INTO `punto_imagen` VALUES ('33cb496e-a03e-4561-8572-faaa4c1836ad','1234453453454'),('345dcd3d-732e-4bc4-90b0-2e4592535db5','b69f4d61-3a17-458f-b5a9-0f78f124caef'),('345dcd3d-732e-4bc4-90b0-2e4592535db5','c6c44cd6-48e2-45c5-895f-c76f76c87104'),('cb408b07-3aee-4138-bf2e-82c0d3b90ae9','dasdsadas'),('345dcd3d-732e-4bc4-90b0-2e4592535db5','e1c401ab-43b2-4a21-b7fe-25954f594c69');
/*!40000 ALTER TABLE `punto_imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `punto_turistico`
--

DROP TABLE IF EXISTS `punto_turistico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `punto_turistico` (
  `__id` char(36) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `direccion` text,
  `reservable` tinyint(1) DEFAULT '1',
  `es_maravilla` tinyint(1) DEFAULT '0',
  `video_presentacion` text,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`__id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punto_turistico`
--

LOCK TABLES `punto_turistico` WRITE;
/*!40000 ALTER TABLE `punto_turistico` DISABLE KEYS */;
INSERT INTO `punto_turistico` VALUES ('127f9fd2-e60b-45b5-b87b-6e4f8803457b','Arnor London','Algún lugar en el mundo de Dark Souls',1,0,NULL,1.1234,-1.545,'Lugar de los antiguos dioses que lucharon contra los dragones'),('1a97e2d9-e446-4779-a00f-dd980cdb2901','North Yanton','En algún lugar del mundo de Rockstar Games',1,0,NULL,0,0,'Localización del prólogo de la historia principal de Grand Theft Auto V'),('30fd66b2-39b6-413f-bfa0-a4687d78e89a','dasdsad','asdsadasdas',1,1,NULL,0,0,'dsadsadsa'),('33cb496e-a03e-4561-8572-faaa4c1836ad','Olimpo','Grecia',1,0,NULL,1.1234,-1.545,'Hogar de los dioses olímpicos'),('345dcd3d-732e-4bc4-90b0-2e4592535db5','aaaa','asdasda',1,0,NULL,0,0,'sssss'),('619e6612-ed00-4fb4-9421-ea87274eb2b0','Test','Localizacion de prueba',1,0,NULL,0,0,'Hhahahahahaha'),('69625210-83dd-4466-bb2f-0823e4c465a3','Joel','Crack',1,0,NULL,0,0,'Hola'),('8cf83cd8-357f-4137-9539-6d2650a25c71','Poza Onda','Esta es una direccion',1,0,NULL,0,0,'Crack!!!'),('9bdb04f4-8395-45ee-818d-db6f6b0fa343','Crucita','Crucita',1,0,NULL,0,0,'Crucita la bella'),('9dddbd6f-dd2b-44ad-980f-7999fdf7b7d1','Las Vegas','Parque Las Vegas',1,0,NULL,0,0,'fdafsdfsdfsd'),('b2c316ac-bcea-4223-acc7-e2646bc2cf4e','Lalalala','Portoviejo',1,1,NULL,0,0,'Alguna'),('b44e6290-6733-4a55-bbf4-e34797f764fd','aaaaaaaaaa','asdasdasdasd',1,0,NULL,0,0,'dasdasd'),('cb408b07-3aee-4138-bf2e-82c0d3b90ae9','Valhala','Región Nórdica',1,0,NULL,1.1234,-1.545,'Lugar de descanso de los dioses Nórdicos'),('cb4aa96c-b57d-441e-993a-0f703a360926','azzzzzz','sdadsadas',1,0,NULL,0,0,'dasdasd'),('d440cda1-1f6d-44f7-8fdb-5ecb958c6290','Nueva Localización','Mi localización',1,0,NULL,0,0,'Somos Cracks!!!'),('db3f1ef0-6093-4d98-ba0d-f41ea4339e8e','Aleluya!!!!','',1,0,NULL,0,0,''),('e5ebcaf6-fe93-410f-8955-718aebf6d6d7','La Rotonda','Portoviejo',1,0,NULL,0,0,'Rockstar'),('ec870a8c-86e0-46bc-9c61-b884707ca782','Punto nuevo','Nuevo punto',1,1,NULL,0,0,'Holaaaaaa'),('f7dedd65-bc5a-4407-b764-ee739dec8a21','sdadas','dasdasda',1,0,NULL,0,0,'sdasdas'),('fa3a4cda-cd46-4ffa-b752-e71017d3d11f','aumentar','',1,1,NULL,0,0,'');
/*!40000 ALTER TABLE `punto_turistico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `__id` char(36) NOT NULL,
  `id_usuario` char(36) DEFAULT NULL,
  `aforo` int NOT NULL,
  `comentario` text,
  `id_reserva_puntoturis` char(36) NOT NULL,
  PRIMARY KEY (`__id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `fk_reserva_puntoturis` (`id_reserva_puntoturis`),
  CONSTRAINT `fk_reserva_puntoturis` FOREIGN KEY (`id_reserva_puntoturis`) REFERENCES `reserva_puntoturis` (`__id`) ON UPDATE CASCADE,
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES ('2ba38798-56ce-4156-9506-312cc7385792','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',500,'Quiero visitar el Olimpo :(','12ba6fda-ae10-43df-a996-3f46839c5efe');
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva_puntoturis`
--

DROP TABLE IF EXISTS `reserva_puntoturis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva_puntoturis` (
  `id_puntoturistico` char(36) DEFAULT NULL,
  `hora_inicio` datetime NOT NULL,
  `horario_fin` datetime NOT NULL,
  `id_guia` char(36) NOT NULL,
  `__id` char(36) NOT NULL,
  PRIMARY KEY (`__id`),
  KEY `id_puntoturistico` (`id_puntoturistico`),
  KEY `fk_guia` (`id_guia`),
  CONSTRAINT `fk_guia` FOREIGN KEY (`id_guia`) REFERENCES `guia` (`__id`) ON UPDATE CASCADE,
  CONSTRAINT `reserva_puntoturis_ibfk_2` FOREIGN KEY (`id_puntoturistico`) REFERENCES `punto_turistico` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva_puntoturis`
--

LOCK TABLES `reserva_puntoturis` WRITE;
/*!40000 ALTER TABLE `reserva_puntoturis` DISABLE KEYS */;
INSERT INTO `reserva_puntoturis` VALUES ('33cb496e-a03e-4561-8572-faaa4c1836ad','2022-02-23 10:00:00','2022-02-23 12:00:00','2ea74fe0-f50c-41f4-b926-36f70eb43ae5','12ba6fda-ae10-43df-a996-3f46839c5efe');
/*!40000 ALTER TABLE `reserva_puntoturis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitud_local`
--

DROP TABLE IF EXISTS `solicitud_local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud_local` (
  `id_solicitud` char(36) NOT NULL,
  `id_local` char(36) NOT NULL,
  `id_usuario` char(36) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `comentario` text,
  `estado` enum('pendiente','revision','negado','aprobado') DEFAULT 'pendiente',
  PRIMARY KEY (`id_solicitud`),
  KEY `id_local` (`id_local`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `solicitud_local_ibfk_1` FOREIGN KEY (`id_local`) REFERENCES `local_turistico` (`__id`) ON UPDATE CASCADE,
  CONSTRAINT `solicitud_local_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud_local`
--

LOCK TABLES `solicitud_local` WRITE;
/*!40000 ALTER TABLE `solicitud_local` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitud_local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tel_local`
--

DROP TABLE IF EXISTS `tel_local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tel_local` (
  `numero` varchar(15) NOT NULL,
  `id_local` char(36) NOT NULL,
  PRIMARY KEY (`numero`),
  UNIQUE KEY `id_local` (`id_local`),
  CONSTRAINT `tel_local_ibfk_1` FOREIGN KEY (`id_local`) REFERENCES `local_turistico` (`__id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tel_local`
--

LOCK TABLES `tel_local` WRITE;
/*!40000 ALTER TABLE `tel_local` DISABLE KEYS */;
/*!40000 ALTER TABLE `tel_local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id_token` char(36) NOT NULL,
  `id_admin` char(36) DEFAULT NULL,
  `valido` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_token`),
  KEY `id_admin` (`id_admin`),
  CONSTRAINT `token_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `usuario` (`__id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES ('011140a3-b5ad-4a58-8f14-c406cd8c37a7','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('245b0134-5139-4ad0-94cc-2160dec1ab62','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('36a5366c-9c81-401e-9b7d-9600d1fa8bb0','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('40fa57e0-d012-491a-ba54-d85bb523d711','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('43afcb31-e94b-435c-8ba9-41cd8823bc2f','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('4a33b7a1-bf3d-49a3-b743-af2c07083bfe','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('4e985ad9-8561-4e20-b482-e7970a4af6f8','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('500d2719-5614-418e-a628-98ca3d989273','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('523e2ced-aa54-42ca-adf1-80f8ede6fc2e','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('83d8b42e-827c-4d68-ad1e-5c212879b5fa','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('b267fd8e-04f0-4963-a9b0-b62e2c70c097','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('b71415c1-d078-4634-a397-be120eabf262','3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748',1),('e2793f73-212e-4651-b269-484e4274b68a',NULL,1),('fcb3c7e3-e19a-4db2-9916-450838ff71bd',NULL,1);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `__id` char(36) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` char(64) NOT NULL,
  `cedula_pas` varchar(10) NOT NULL,
  `role` enum('admin','user','pres_sev') DEFAULT 'user',
  `telefono` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`__id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('3fe30a01-a1d6-4ea9-81e4-0f3a1c0bd748','Joel','García','garciajunior796@gmail.com','$2b$07$X5AN.38rrREzKjVcN7rmLuWrO/vnz8SXg6ubBFCtw6Jjxw3.w.YRW','1315955169','admin','0982884734'),('5e802a79-6b49-4314-be13-a9c653470fbe','Kratos','No se','Kratos@olimpo.com','$2b$07$vQBc//ESPH1A3h3TyFunVekIH29mvAMbKmpsEYH1lZ/ESAbSSqjhi','1315955168',NULL,'0982884733');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-16 17:38:51
