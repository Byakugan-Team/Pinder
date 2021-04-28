-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 28, 2021 at 01:54 AM
-- Server version: 10.4.11-MariaDB-1:10.4.11+maria~bionic
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Pinder`
--
CREATE DATABASE IF NOT EXISTS `Pinder` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `Pinder`;

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `nickname` varchar(50) NOT NULL,
  `gendre` varchar(50) NOT NULL,
  `birth` date DEFAULT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pets_pictures`
--

CREATE TABLE `pets_pictures` (
  `id` int(11) NOT NULL,
  `pet_id` int(11) DEFAULT NULL,
  `picture_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `create_At` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `phone_num` varchar(20) NOT NULL,
  `e_mail` varchar(50) DEFAULT NULL,
  `first` varchar(50) NOT NULL,
  `last` varchar(50) DEFAULT NULL,
  `biography` text DEFAULT NULL,
  `creatAt` datetime DEFAULT current_timestamp(),
  `photo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `verification_sms`
--

CREATE TABLE `verification_sms` (
  `id` int(11) NOT NULL,
  `number` varchar(14) NOT NULL,
  `code` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `phone_num`, `e_mail`, `first`, `last`, `biography`, `creatAt`, `photo`) VALUES
(1, 22700641, 'fffff@gmail.com', 'ddddddddddddddd', 'guelmami', 'im a footballer', '0000-00-00 00:00:00', 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `pets_pictures`
--
ALTER TABLE `pets_pictures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pet_id` (`pet_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_num` (`phone_num`),
  ADD UNIQUE KEY `e_mail` (`e_mail`);

--
-- Indexes for table `verification_sms`
--
ALTER TABLE `verification_sms`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pets_pictures`
--
ALTER TABLE `pets_pictures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `verification_sms`
--
ALTER TABLE `verification_sms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `pets_pictures`
--
ALTER TABLE `pets_pictures`
  ADD CONSTRAINT `pets_pictures_ibfk_1` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
