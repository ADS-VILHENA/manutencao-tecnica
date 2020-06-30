CREATE DATABASE  IF NOT EXISTS `manutencao_tecnica` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `manutencao_tecnica`;
-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: manutencao_tecnica
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area` (
  `id_area` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(45) DEFAULT NULL,
  `id_tipo_area` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_area`),
  KEY `fk_area_1_idx` (`id_tipo_area`),
  CONSTRAINT `fk_area_1` FOREIGN KEY (`id_tipo_area`) REFERENCES `tipo_area` (`id_tipo_area`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'Area A','Area do bloco de informática',NULL),(2,'Area B','Area do bloco de informática',NULL),(3,'Area C','Area do bloco de informática',NULL),(4,'Area 1','Area do bloco de eletro',NULL),(5,'Area 2','Area do bloco de informática',NULL),(6,'Area A1','Area do bloco de Biologia',NULL);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area_equipamento`
--

DROP TABLE IF EXISTS `area_equipamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area_equipamento` (
  `id_area_equipamento` int(11) NOT NULL AUTO_INCREMENT,
  `id_area` int(11) NOT NULL,
  `id_equipamento` int(11) NOT NULL,
  PRIMARY KEY (`id_area_equipamento`),
  KEY `fk_area_equipamento_1_idx` (`id_area`),
  KEY `fk_area_equipamento_2_idx` (`id_equipamento`),
  CONSTRAINT `fk_area_equipamento_1` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_area_equipamento_2` FOREIGN KEY (`id_equipamento`) REFERENCES `equipamento` (`id_equipamento`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_equipamento`
--

LOCK TABLES `area_equipamento` WRITE;
/*!40000 ALTER TABLE `area_equipamento` DISABLE KEYS */;
INSERT INTO `area_equipamento` VALUES (73,1,1),(74,1,2),(75,1,3),(76,1,8),(77,2,1),(78,2,2),(79,2,3),(80,2,8),(81,3,1),(82,3,2),(83,3,3),(84,3,8),(85,1,19),(86,1,20),(87,1,10),(88,2,19),(89,2,20),(90,2,10),(91,3,19),(92,3,20),(93,3,10),(94,4,3),(95,4,9),(96,4,10),(97,5,19),(98,5,1),(99,5,2),(100,5,3),(101,5,8),(102,6,21),(103,6,22),(104,6,23),(105,6,24),(106,6,3),(107,6,9),(108,6,10);
/*!40000 ALTER TABLE `area_equipamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chamado`
--

DROP TABLE IF EXISTS `chamado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chamado` (
  `id_chamado` int(11) NOT NULL AUTO_INCREMENT,
  `path_anexo` varchar(10000) DEFAULT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `problema` varchar(45) NOT NULL,
  `equipamento` varchar(45) NOT NULL,
  `area` varchar(45) NOT NULL,
  `cpf_usuario` varchar(11) NOT NULL,
  PRIMARY KEY (`id_chamado`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chamado`
--

LOCK TABLES `chamado` WRITE;
/*!40000 ALTER TABLE `chamado` DISABLE KEYS */;
INSERT INTO `chamado` VALUES (9,'',NULL,'Lentidão','Computador','Area A','02476801259'),(10,NULL,NULL,'Tela azul','Computador','Area A','43820971009'),(11,NULL,NULL,'Tela azul','Notebook','Area B','84041645093'),(12,NULL,NULL,'Não liga','Televisão','Area C','84041645093'),(13,NULL,NULL,'Não liga','Televisão','Area C','84041645093'),(14,NULL,NULL,'Desalinhado','Torno','Area 1','91740094000'),(15,NULL,'Não reconhece o driver','','Mouse','Area 2','91740094000'),(16,NULL,'Não está devidamente configurado','','Balão de fundo falso','Area A1','91740094000'),(17,NULL,'','Não liga','Computador','Area A','02476801259');
/*!40000 ALTER TABLE `chamado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipamento`
--

DROP TABLE IF EXISTS `equipamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipamento` (
  `id_equipamento` int(11) NOT NULL AUTO_INCREMENT,
  `nome_equipamento` varchar(45) NOT NULL,
  `descricao_equipamento` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_equipamento`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamento`
--

LOCK TABLES `equipamento` WRITE;
/*!40000 ALTER TABLE `equipamento` DISABLE KEYS */;
INSERT INTO `equipamento` VALUES (1,'Computador','Computador desktop'),(2,'Notebook','Computador notebook'),(3,'Televisão','Equipamento televisivo'),(4,'Bebedouro','Equipamento para beber agua'),(5,'Placar eletronico','Placar para marcar resultados'),(6,'Forno eletrico','Forno eletrico para experiencias quimicas'),(7,'Medidor de temperatura','Equipamento para medir temperaturas'),(8,'Projetor','Equipamento para projetar imagens'),(9,'Cadeira','Equipamento para os alunos sentarem'),(10,'Quadro escolar','Equipamento para escrever'),(11,'Torno','Equipamento para serviços de torno'),(12,'Solda','Equipamento para realizar soldas'),(19,'Teclado','Equipamento para escrever no pc'),(20,'Mouse','Equipamento para realizar cliques no PC'),(21,'Balão de fundo falso','Serve para armazenar, preparar e aquecer substâncias.'),(22,'Balança','São utilizadas para medir a massa das substâncias que serão utilizadas, evitando erros e exageros.'),(23,'Bico de Bunsen','Instrumento a gás, utilizado no aquecimento substâncias.'),(24,'Almofariz e pistilo','Utilizados para a trituração de sólidos. São feitos de porcelana e assemelham-se a um pequeno pilão.'),(25,'Mesa de desenho','Equipamento para desenhar projetos');
/*!40000 ALTER TABLE `equipamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipamento_problema`
--

DROP TABLE IF EXISTS `equipamento_problema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipamento_problema` (
  `id_equipamento_problema` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipamento` int(11) NOT NULL,
  `nome_problema` varchar(45) NOT NULL,
  PRIMARY KEY (`id_equipamento_problema`),
  KEY `fk_equipamento_problema_1_idx` (`id_equipamento`),
  CONSTRAINT `fk_equipamento_problema_1` FOREIGN KEY (`id_equipamento`) REFERENCES `equipamento` (`id_equipamento`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamento_problema`
--

LOCK TABLES `equipamento_problema` WRITE;
/*!40000 ALTER TABLE `equipamento_problema` DISABLE KEYS */;
INSERT INTO `equipamento_problema` VALUES (32,1,'Lentidão'),(33,1,'Tela azul'),(34,2,'Lentidão'),(35,2,'Tela azul'),(36,3,'Não liga'),(37,3,'Não sai som'),(38,4,'Água não gela'),(39,4,'Não funciona'),(40,5,'Não liga'),(41,5,'Desconfigurado'),(42,6,'Não aquece'),(43,7,'Não afere'),(44,8,'Não projeta'),(45,8,'Não sai som'),(46,9,'Quebrada'),(47,10,'Quebrado'),(48,11,'Não liga'),(49,11,'Desalinhado'),(50,12,'Sem gás'),(51,12,'Não aquece'),(52,19,'Tecla não funciona'),(53,19,'Não reconhece'),(54,20,'Não liga'),(55,20,'Não reconhece'),(56,21,'Não aquece'),(57,22,'Não liga'),(58,22,'Aferimento desregulado'),(59,23,'Sem gás'),(60,23,'Não aquece'),(61,24,'Não liga'),(62,25,'Quebrada'),(63,1,'Não liga');
/*!40000 ALTER TABLE `equipamento_problema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipamento_tipo_area`
--

DROP TABLE IF EXISTS `equipamento_tipo_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipamento_tipo_area` (
  `id_equipamento_tipo_area` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipamento` int(11) DEFAULT NULL,
  `id_tipo_area` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_equipamento_tipo_area`),
  KEY `fk_equipamento_tipo_area_1_idx` (`id_equipamento`),
  KEY `fk_equipamento_tipo_area_2_idx` (`id_tipo_area`),
  CONSTRAINT `fk_equipamento_tipo_area_1` FOREIGN KEY (`id_equipamento`) REFERENCES `equipamento` (`id_equipamento`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_equipamento_tipo_area_2` FOREIGN KEY (`id_tipo_area`) REFERENCES `tipo_area` (`id_tipo_area`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamento_tipo_area`
--

LOCK TABLES `equipamento_tipo_area` WRITE;
/*!40000 ALTER TABLE `equipamento_tipo_area` DISABLE KEYS */;
INSERT INTO `equipamento_tipo_area` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,7),(5,5,7),(6,6,2),(7,7,2),(8,8,1),(9,11,3),(10,12,3),(11,19,1),(12,20,1),(13,21,6),(14,22,6),(15,23,6),(16,24,6),(17,25,5),(18,3,2),(19,3,3),(20,3,4),(21,3,5),(22,3,6),(23,9,2),(24,9,3),(25,9,4),(26,9,5),(27,9,6),(28,9,1),(29,10,2),(30,10,3),(31,10,4),(32,10,5),(33,10,6),(34,10,1);
/*!40000 ALTER TABLE `equipamento_tipo_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_area`
--

DROP TABLE IF EXISTS `tipo_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_area` (
  `id_tipo_area` int(11) NOT NULL AUTO_INCREMENT,
  `nome_tipo_area` varchar(45) NOT NULL,
  `descricao_tipo_area` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_area`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_area`
--

LOCK TABLES `tipo_area` WRITE;
/*!40000 ALTER TABLE `tipo_area` DISABLE KEYS */;
INSERT INTO `tipo_area` VALUES (1,'Laboratório de Informática','Possui equipamentos de informática'),(2,'Laboratório de Quimica','Possui equipamentos de quimica'),(3,'Laboratório de EletroMecanica','Possui equipamentos de eletro'),(4,'Laboratório de Engenharia Civil','Possui equipamentos de engenharia civil'),(5,'Laboratório de Arquitetura','Possui equipamentos de arquitetura'),(6,'Laboratório de Biologia','Possui equipamentos de biologia'),(7,'Quadra Poliesportiva','Possui equipamentos de esporte');
/*!40000 ALTER TABLE `tipo_area` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-08 21:36:15
