-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2023 at 03:16 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `helpdesk`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `category` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `category`) VALUES
(1, 'category1'),
(2, 'category 2');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `officeBlock` varchar(20) NOT NULL,
  `Department` varchar(50) NOT NULL,
  `empId` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`firstName`, `lastName`, `officeBlock`, `Department`, `empId`) VALUES
('gf', 'fgj', 'se13', 'finance', 'gf1'),
('temesgen', 'beyene', 'se45', 'computing', 'temu_1'),
('HIlme', 'Tadese', 'se13', 'computer science', 'dbur1122'),
('efrata', 'sintayehu', 'legehar', 'addis', 'sh23');

-- --------------------------------------------------------

--
-- Table structure for table `pending`
--

CREATE TABLE `pending` (
  `tempUserName` varchar(50) NOT NULL,
  `tempPass` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pending`
--

INSERT INTO `pending` (`tempUserName`, `tempPass`, `userName`) VALUES
('fgh', 966666655, ''),
('bini', 988888888, ''),
('dfg', 2147483647, ''),
('gh', 2147483647, ''),
('pppppppppppzz', 2147483647, ''),
('sewasew', 2147483647, ''),
('Girma', 910138925, ''),
('tilahun', 988888888, ''),
('tefe', 988888888, ''),
('tefe', 988888888, ''),
('tadese', 910138925, '');

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `officeBlock` varchar(50) NOT NULL,
  `phoneNumber` int(10) NOT NULL,
  `favoriteNumber` int(11) NOT NULL,
  `birthDate` date NOT NULL,
  `favoriteColor` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `id` int(11) NOT NULL,
  `approve` enum('yes','no') NOT NULL DEFAULT 'no',
  `new` enum('yes','no') NOT NULL DEFAULT 'yes',
  `empId` varchar(20) NOT NULL,
  `status` enum('Accept','Reject','Pending') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`firstName`, `lastName`, `officeBlock`, `phoneNumber`, `favoriteNumber`, `birthDate`, `favoriteColor`, `password`, `userName`, `id`, `approve`, `new`, `empId`, `status`) VALUES
('temesgen', 'beyene', 'etv', 911111111, 6, '2023-06-16', 'black', '', '', 44, 'no', 'yes', '', 'Pending'),
('Emanda', 'Girma', 'Bl_13', 910138925, 6, '2023-06-16', 'grean', '', '', 45, 'no', 'yes', '', 'Pending'),
('hana', 'tilahun', 'Bl_13', 988888888, 789, '2023-06-15', 'black', '', '', 46, 'no', 'yes', '', 'Pending'),
('ela', 'tefe', '27', 988888888, 4, '2023-06-23', 'light blue', '', '', 58, 'no', 'yes', '', 'Pending'),
('ela', 'tefe', '27', 988888888, 0, '2023-06-23', 'light blue', '', '', 59, 'no', 'yes', '', 'Pending'),
('hilme', 'tadese', 'Bl_13', 910138925, 4, '2023-06-29', 'brown', '', '', 60, 'no', 'yes', 'dbur1122', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `chat` varchar(200) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`id`, `title`, `chat`, `category`) VALUES
(1, 'first', 'my name is <b><i><u><font color=\"#ff0000\"><span style=\"font-size: larger;\">betelhem sintayehu</span></font></u></i></b>', 'Category 2'),
(2, 'second', 'I am 4 the year <span style=\"font-size: larger;\"><b><i><u><span style=\"font-size: larger;\"><span style=\"font-size: smaller;\"><font color=\"#0000ff\">computer science</font></span></span></u></i></b></sp', 'Category 2'),
(3, 'third', '<b><i><u><font color=\"#0000ff\"><span style=\"font-size: larger;\">Debre Berhan University</span></font></u></i></b>', 'Category 2'),
(4, 'forth', '<b><i><u><span style=\"font-size: larger;\"><span style=\"font-size: larger;\"><font color=\"#008000\">final year </font></span></span></u></i></b>student', 'Category 3'),
(5, 'fifth', 'for the <b><u><font color=\"#ff0000\"><span style=\"font-size: larger;\"><span style=\"font-size: larger;\">last time</span></span></font></u></b>', 'Category 3'),
(6, 'sixth', 'pleaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssssssssuuuuuuuuuuuuuuuuuuuuuuuuu', 'Category 2'),
(7, 'uuuuuuuuuuuuuuu', 'pllllllllllllllllllllllllllllllllllllleeeeeeeeeeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssssssssseeeeeeeeeeeeeeeeeeeee', 'Category 3'),
(8, 'hami', 'Hi hami <b>how are you</b>', 'Category 1'),
(9, 'hgggg', 'fgffffffffffff fffffffff hhhhhhhhhhh', 'Category 2'),
(10, 'hi', '<b><i><u><font color=\"#ff0000\"><span style=\"font-size: larger;\">hiiiiiiiiiiiiii</span></font></u></i></b>', 'Category 2'),
(11, 'fdf', '<b><i><u><span style=\"font-size: larger;\"><font color=\"#0000ff\">hhhhhhhhhh</font></span></u></i></b>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', 'Select a category'),
(12, 'temesgen', '<u style=\"\"><font color=\"#008000\" style=\"\"><i><b>selam</b></i></font></u>', 'category1'),
(13, 'no title', '', 'Select a category'),
(14, 'rte', '<font color=\"#008000\">ff</font><b><i><u><font color=\"#008000\"><span style=\"font-size: larger;\">gdfg</span></font></u></i></b>', 'category 2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
