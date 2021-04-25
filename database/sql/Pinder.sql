SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Pinder`
--
CREATE DATABASE IF NOT EXISTS `Pinder` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `Pinder`;

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    phone_num int NOT NULL,
    e_mail varchar(50),
    first varchar(50) NOT NULL,
    last varchar(50),
    biography text,
    creatAt DATETIME  DEFAULT  CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pets (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int,
    nickname varchar(50) NOT NULL,
    gendre varchar(50) NOT NUll,
    birth DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS pets_pictures (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pet_id int,
    picture_name varchar(255), 
    FOREIGN KEY (pet_id) REFERENCES pets(id)
);

CREATE TABLE IF NOT EXISTS verification_phone(

);