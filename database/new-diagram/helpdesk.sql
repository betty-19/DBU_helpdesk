-- drop database helpdesk2; 
-- CREATE Database helpdesk2;
-- use helpdesk2;  
-- MySQL Script generated by MySQL Workbench
-- ቅዳሜ፣ ጁን 17 ቀን 2023  8:09:50 ከሰዓት EAT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema helpdesk2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema helpdesk2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `helpdesk2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `helpdesk2` ;

-- -----------------------------------------------------
-- Table `helpdesk2`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `helpdesk2`.`account` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(225) NULL DEFAULT NULL,
  `role` VARCHAR(45) NULL DEFAULT NULL,
  `department` VARCHAR(45) NULL DEFAULT NULL,
  `employeeId` VARCHAR(45) NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = 'This table will store crediential file wich is common for all users of the system.';


-- -----------------------------------------------------
-- Table `helpdesk2`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `helpdesk2`.`ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `chat` VARCHAR(45) NULL DEFAULT NULL,
  `category` VARCHAR(45) NULL,
  `createdBy` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ticket_account1_idx` (`createdBy` ASC) VISIBLE,
  CONSTRAINT `fk_ticket_account1`
    FOREIGN KEY (`createdBy`)
    REFERENCES `helpdesk2`.`account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `helpdesk2`.`register`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `helpdesk2`.`register` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NULL DEFAULT NULL,
  `lastName` VARCHAR(45) NULL DEFAULT NULL,
  `officeBlock` VARCHAR(45) NULL DEFAULT NULL,
  `officeNumber` VARCHAR(45) NULL,
  `phoneNumber` VARCHAR(45) NULL DEFAULT NULL,
  `favoriteNumber` VARCHAR(45) NULL DEFAULT NULL,
  `birthDate` VARCHAR(45) NULL DEFAULT NULL,
  `favoriteColor` VARCHAR(45) NULL DEFAULT NULL,
  `approve` VARCHAR(45) NULL,
  `new` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `employeeId` VARCHAR(45) NULL,
  `accountId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_account1_idx` (`accountId` ASC) VISIBLE,
  CONSTRAINT `fk_users_account1`
    FOREIGN KEY (`accountId`)
    REFERENCES `helpdesk2`.`account` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `helpdesk2`.`pending`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `helpdesk2`.`pending` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tempUserName` VARCHAR(45) NULL,
  `tempPass` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `helpdesk2`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `helpdesk2`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `helpdesk2`.`open_ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `helpdesk2`.`open_ticket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creatorName` VARCHAR(45) NULL,
  `creatorDepartment` VARCHAR(45) NULL,
  `creatorBlock` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `priority` VARCHAR(45) NULL,
  `ticketId` INT NOT NULL,
  `agentId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_open_ticket_ticket1_idx` (`ticketId` ASC) VISIBLE,
  INDEX `fk_open_ticket_account1_idx` (`agentId` ASC) VISIBLE,
  CONSTRAINT `fk_open_ticket_ticket1`
    FOREIGN KEY (`ticketId`)
    REFERENCES `helpdesk2`.`ticket` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_open_ticket_account1`
    FOREIGN KEY (`agentId`)
    REFERENCES `helpdesk2`.`account` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `helpdesk2`.`FQA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `helpdesk2`.`FQA` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(45) NULL,
  `answer` VARCHAR(45) NULL,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- admin will not have signup page for him-self so we have to register it first. 
-- admin username: 'admin'    // he can change it latter
-- admin password: '#dbu1234admin'  // he can change it latter

insert into account values (1, 'admin', '$2b$10$APZG1TjWctbVEzvSFRYAnewoCeSUkKFjgZ9Bjw6x0p9t0r/kucpGu', 'admin', 'all', 'dbur/0000/00', 'active');
  
select * from account; 
