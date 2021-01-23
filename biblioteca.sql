-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-01-2021 a las 13:54:18
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autor`
--

CREATE TABLE `autor` (
  `IDAUTOR` int(11) NOT NULL,
  `NOMBRE` varchar(40) NOT NULL,
  `FECHANACIMIENTO` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `autor`
--

INSERT INTO `autor` (`IDAUTOR`, `NOMBRE`, `FECHANACIMIENTO`) VALUES
(1, 'AUTOR 1', '1998-01-09'),
(2, 'AUTOR 2', '1992-03-02'),
(3, 'AUTOR 3', '1992-03-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejemplar`
--

CREATE TABLE `ejemplar` (
  `IDEJEMPLAR` int(11) NOT NULL,
  `ISBN` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ejemplar`
--

INSERT INTO `ejemplar` (`IDEJEMPLAR`, `ISBN`) VALUES
(1, '001'),
(2, '001'),
(3, '001'),
(4, '001'),
(5, '002'),
(6, '002'),
(7, '003'),
(8, '003'),
(9, '003'),
(10, '003');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `ISBN` varchar(15) NOT NULL,
  `TITULO` varchar(25) NOT NULL,
  `IDAUTOR` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `libro`
--

INSERT INTO `libro` (`ISBN`, `TITULO`, `IDAUTOR`) VALUES
('001', 'Libro 1', 1),
('002', 'Libro 2', 1),
('003', 'Libro 3', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `IDEJEMPLAR` int(11) NOT NULL,
  `IDSOCIO` int(11) NOT NULL,
  `FECHAPRESTAMO` date NOT NULL,
  `FECHALIMITEDEVOLUCION` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socio`
--

CREATE TABLE `socio` (
  `IDSOCIO` int(11) NOT NULL,
  `EMAIL` varchar(40) NOT NULL,
  `NOMBRE` varchar(25) NOT NULL,
  `DIRECCION` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `socio`
--

INSERT INTO `socio` (`IDSOCIO`, `EMAIL`, `NOMBRE`, `DIRECCION`) VALUES
(64, 'socio1@socio1.com', 'Socio 1', 'Calle Socio 1'),
(65, 'socio2@socios.com', 'Socio 2', 'Calle Socio 2'),
(66, 'socio3@socios.com', 'Socio 3', 'Calle Socio 3'),
(67, 'socio4@socios.com', 'Socio 4', 'Calle Socio 4'),
(68, 'socio5@socios.com', 'Socio 5', 'Calle socio 5');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`IDAUTOR`);

--
-- Indices de la tabla `ejemplar`
--
ALTER TABLE `ejemplar`
  ADD PRIMARY KEY (`IDEJEMPLAR`);

--
-- Indices de la tabla `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`ISBN`),
  ADD KEY `IDAUTOR` (`IDAUTOR`);

--
-- Indices de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`IDEJEMPLAR`),
  ADD KEY `IDSOCIO` (`IDSOCIO`);

--
-- Indices de la tabla `socio`
--
ALTER TABLE `socio`
  ADD PRIMARY KEY (`IDSOCIO`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `autor`
  MODIFY `IDAUTOR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ejemplar`
--
ALTER TABLE `ejemplar`
  MODIFY `IDEJEMPLAR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `socio`
--
ALTER TABLE `socio`
  MODIFY `IDSOCIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libro`
--
ALTER TABLE `libro`
  ADD CONSTRAINT `libro_ibfk_1` FOREIGN KEY (`IDAUTOR`) REFERENCES `autor` (`IDAUTOR`);

--
-- Filtros para la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`IDSOCIO`) REFERENCES `socio` (`IDSOCIO`),
  ADD CONSTRAINT `prestamo_ibfk_2` FOREIGN KEY (`IDEJEMPLAR`) REFERENCES `ejemplar` (`IDEJEMPLAR`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
