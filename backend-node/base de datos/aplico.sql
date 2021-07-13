-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-07-2021 a las 19:01:21
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aplico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `idAdmin` int(11) NOT NULL,
  `cedula` int(11) NOT NULL,
  `primerNombre` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `segundoNombre` varchar(15) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `primerApellido` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `segundoApellido` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `genero` char(1) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `correo` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `contrasena` varchar(500) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Estructura de tabla para la tabla `contrasenaglobal`
--

CREATE TABLE `contrasenaglobal` (
  `contrasena` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `correo` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datostrabajoseccion1`
--

CREATE TABLE `datostrabajoseccion1` (
  `idTrabajo` int(11) NOT NULL,
  `seccion` int(11) NOT NULL,
  `equipo` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fecha` date NOT NULL,
  `humedadRelativa` float NOT NULL,
  `temperaturaAmbiental` float NOT NULL,
  `temperaturaPlaca` float NOT NULL,
  `puntoRocio` float NOT NULL,
  `rugosidad` float NOT NULL,
  `Aplica` tinyint(4) NOT NULL,
  `datoAplica` float NOT NULL,
  `espesor` float DEFAULT NULL,
  `observacion` varchar(1000) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `imagen` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datostrabajoseccion2`
--

CREATE TABLE `datostrabajoseccion2` (
  `idTrabajo` int(11) NOT NULL,
  `seccion` int(11) NOT NULL,
  `equipo` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fecha` date NOT NULL,
  `humedadRelativa` float NOT NULL,
  `temperaturaAmbiental` float NOT NULL,
  `temperaturaPlaca` float NOT NULL,
  `puntoRocio` float NOT NULL,
  `Aplica` tinyint(4) NOT NULL,
  `datoAplica` float NOT NULL,
  `espesor` float DEFAULT NULL,
  `observacion` varchar(1000) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `imagen` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Estructura de tabla para la tabla `datostrabajoseccion3`
--

CREATE TABLE `datostrabajoseccion3` (
  `idTrabajo` int(11) NOT NULL,
  `seccion` int(11) NOT NULL,
  `equipo` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fecha` date NOT NULL,
  `observacion` varchar(1000) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `imagen` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `supervisor`
--

CREATE TABLE `supervisor` (
  `idSupervisor` int(11) NOT NULL,
  `idAdmin` int(11) DEFAULT NULL,
  `cedula` int(11) NOT NULL,
  `primerNombre` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `segundoNombre` varchar(15) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `primerApellido` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `segundoApellido` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `genero` char(1) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `correo` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `contrasena` varchar(500) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajo`
--

CREATE TABLE `trabajo` (
  `idTrabajo` int(11) NOT NULL,
  `idSupervisor` int(11) DEFAULT NULL,
  `codigoLibre` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tipoTrabajo` varchar(30) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fecha` date NOT NULL,
  `codigoTrabajo` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `ubicacion` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `completado` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idAdmin`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `contrasenaglobal`
--
ALTER TABLE `contrasenaglobal`
  ADD PRIMARY KEY (`contrasena`);

--
-- Indices de la tabla `datostrabajoseccion1`
--
ALTER TABLE `datostrabajoseccion1`
  ADD PRIMARY KEY (`idTrabajo`);

--
-- Indices de la tabla `datostrabajoseccion2`
--
ALTER TABLE `datostrabajoseccion2`
  ADD PRIMARY KEY (`idTrabajo`);

--
-- Indices de la tabla `datostrabajoseccion3`
--
ALTER TABLE `datostrabajoseccion3`
  ADD PRIMARY KEY (`idTrabajo`);

--
-- Indices de la tabla `supervisor`
--
ALTER TABLE `supervisor`
  ADD PRIMARY KEY (`idSupervisor`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `idAdmin` (`idAdmin`);

--
-- Indices de la tabla `trabajo`
--
ALTER TABLE `trabajo`
  ADD PRIMARY KEY (`idTrabajo`),
  ADD UNIQUE KEY `codigoTrabajo` (`codigoTrabajo`),
  ADD KEY `idSupervisor` (`idSupervisor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `supervisor`
--
ALTER TABLE `supervisor`
  MODIFY `idSupervisor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `datostrabajoseccion1`
--
ALTER TABLE `datostrabajoseccion1`
  ADD CONSTRAINT `datostrabajoseccion1_ibfk_1` FOREIGN KEY (`idTrabajo`) REFERENCES `trabajo` (`idTrabajo`);

--
-- Filtros para la tabla `datostrabajoseccion2`
--
ALTER TABLE `datostrabajoseccion2`
  ADD CONSTRAINT `datostrabajoseccion2_ibfk_1` FOREIGN KEY (`idTrabajo`) REFERENCES `trabajo` (`idTrabajo`);

--
-- Filtros para la tabla `datostrabajoseccion3`
--
ALTER TABLE `datostrabajoseccion3`
  ADD CONSTRAINT `datostrabajoseccion3_ibfk_1` FOREIGN KEY (`idTrabajo`) REFERENCES `trabajo` (`idTrabajo`);

--
-- Filtros para la tabla `supervisor`
--
ALTER TABLE `supervisor`
  ADD CONSTRAINT `supervisor_ibfk_1` FOREIGN KEY (`idAdmin`) REFERENCES `administrador` (`idAdmin`);

--
-- Filtros para la tabla `trabajo`
--
ALTER TABLE `trabajo`
  ADD CONSTRAINT `trabajo_ibfk_1` FOREIGN KEY (`idSupervisor`) REFERENCES `supervisor` (`idSupervisor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
