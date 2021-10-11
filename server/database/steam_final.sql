-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2021 at 06:40 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `steam`
--

-- --------------------------------------------------------

--
-- Table structure for table `buys`
--

CREATE TABLE `buys` (
  `id` int(11) NOT NULL,
  `buy_type_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `payment_method_id` int(11) NOT NULL,
  `card_id` int(11) DEFAULT NULL,
  `game_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buys`
--

INSERT INTO `buys` (`id`, `buy_type_id`, `buyer_id`, `receiver_id`, `payment_method_id`, `card_id`, `game_id`) VALUES
(1, 1, 7, NULL, 1, 1, 1),
(2, 1, 7, NULL, 1, NULL, 1),
(5, 1, 7, NULL, 1, 1, 1),
(9, 1, 7, 7, 1, 1, 1),
(10, 1, 7, NULL, 1, 1, 1),
(13, 1, 7, 7, 2, NULL, 1),
(15, 1, 12, 7, 2, NULL, 1),
(16, 1, 12, NULL, 1, 1, 1),
(17, 2, 12, 7, 1, 1, 1),
(18, 2, 12, 7, 2, NULL, 1),
(19, 2, 12, 7, 2, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `buy_types`
--

CREATE TABLE `buy_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buy_types`
--

INSERT INTO `buy_types` (`id`, `name`) VALUES
(1, 'Compra pessoal'),
(2, 'Compra para amigo');

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `security_code` int(4) NOT NULL,
  `validity_month` int(2) NOT NULL,
  `validity_year` int(4) NOT NULL,
  `credit_card` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`id`, `name`, `number`, `security_code`, `validity_month`, `validity_year`, `credit_card`, `user_id`) VALUES
(1, 'Lucas Spagnolo Bombana', '5555666677778884', 123, 12, 2022, 1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Futebol'),
(2, 'MOBA'),
(3, 'FPS'),
(4, 'RPG');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`, `price`) VALUES
(1, 'League Of Legends', '20.00'),
(2, 'Fifa', '50.00'),
(3, 'Call Of Duty', '120.50');

-- --------------------------------------------------------

--
-- Table structure for table `games_categories`
--

CREATE TABLE `games_categories` (
  `game_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `games_categories`
--

INSERT INTO `games_categories` (`game_id`, `category_id`) VALUES
(1, 2),
(3, 2),
(3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `games_developers`
--

CREATE TABLE `games_developers` (
  `game_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `games_developers`
--

INSERT INTO `games_developers` (`game_id`, `user_id`) VALUES
(1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`) VALUES
(1, 'Cartão'),
(2, 'Pix'),
(3, 'Boleto');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `label`) VALUES
(1, 'Desenvolvedor', 'dev'),
(2, 'Administrador', 'admin'),
(3, 'Usuário', 'user'),
(5, 'Funcionário', 'func'),
(6, 'Funcionário', 'func'),
(7, 'Funcionário', 'func'),
(8, 'Funcionário', 'func'),
(9, 'Teste', 'teste'),
(11, 'Funcionário', 'func'),
(12, 'Funcionário', 'func'),
(13, 'Funcionário', 'func'),
(14, 'Funcionário', 'func'),
(15, 'Funcionário', 'func'),
(16, 'Funcionário', 'tttt'),
(17, 'Funcionário', 'tttt'),
(18, 'Funcionário', 'tttt'),
(19, 'Funcionário', 'tttt'),
(20, 'Funcionário', 'func');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role_id`) VALUES
(7, '', 'lucasspagnolobombana@gmail.com', '$2b$10$ThJM.dcYYF9hBm/VJKgBbOJOYK1pgm07KUkbOGhrufr8HnquHNWF2', 1),
(12, '', 'anajuliaflorek@gmail.com', '$2b$10$92RdkSlw6P1AO1DrewM0KeHUzOpM8AMqVcPpOYSdnBr7M2Wij3rrq', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buys`
--
ALTER TABLE `buys`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buy_type_id` (`buy_type_id`),
  ADD KEY `buyer_id` (`buyer_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `payment_method_id` (`payment_method_id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `buy_types`
--
ALTER TABLE `buy_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games_categories`
--
ALTER TABLE `games_categories`
  ADD PRIMARY KEY (`game_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `games_developers`
--
ALTER TABLE `games_developers`
  ADD PRIMARY KEY (`game_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buys`
--
ALTER TABLE `buys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `buy_types`
--
ALTER TABLE `buy_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buys`
--
ALTER TABLE `buys`
  ADD CONSTRAINT `buys_ibfk_1` FOREIGN KEY (`buy_type_id`) REFERENCES `buy_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `buys_ibfk_2` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `buys_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `buys_ibfk_4` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `buys_ibfk_5` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `games_categories`
--
ALTER TABLE `games_categories`
  ADD CONSTRAINT `games_categories_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `games_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `games_developers`
--
ALTER TABLE `games_developers`
  ADD CONSTRAINT `games_developers_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `games_developers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
