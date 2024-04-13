-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 13. 11:26
-- Kiszolgáló verziója: 10.4.25-MariaDB
-- PHP verzió: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `utvonaliranyitas`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `car`
--

CREATE TABLE `car` (
  `Id` int(11) NOT NULL,
  `license_plate` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `model` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `fuel` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `consumption` int(11) NOT NULL,
  `starting_mileage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `car`
--

INSERT INTO `car` (`Id`, `license_plate`, `model`, `fuel`, `consumption`, `starting_mileage`) VALUES
(1, 'ABC123', 'Toyota Corolla', 'Benzin', 7, 10000),
(2, 'XYZ789', 'Volkswagen Golf', 'Dízel', 6, 12000),
(3, 'DEF456', 'Ford Focus', 'Benzin', 7, 10500),
(4, 'GHI789', 'Honda Civic', 'Benzin', 4, 11000),
(5, 'JKL012', 'BMW 3 Series', 'Benzin', 8, 9500),
(6, 'MNO345', 'Audi A4', 'Dízel', 6, 11500),
(7, 'PQR678', 'Mercedes-Benz C-Class', 'Benzin', 8, 9800),
(8, 'STU901', 'Kia Sportage', 'Dízel', 7, 10200),
(9, 'VWX234', 'Subaru Outback', 'Benzin', 7, 9600),
(10, 'YZA567', 'Nissan Rogue', 'Benzin', 5, 10700),
(11, 'SJJ702', 'Honda Accord', 'Benzin', 9, 110000);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `driver`
--

CREATE TABLE `driver` (
  `Id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `birthDate` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `licenseNumber` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `licenseExpirationDate` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `driver`
--

INSERT INTO `driver` (`Id`, `name`, `birthDate`, `address`, `licenseNumber`, `licenseExpirationDate`) VALUES
(1, 'John Doe', '1995-01-05', '123 Main Street, Town', 'ABC124', '2030-08-02'),
(2, 'Jane Smith', '1985-08-20', '456 Elm Street, Othertown', 'XYZ789', '2024-07-15'),
(3, 'Michael Johnson', '1978-03-10', '789 Maple Avenue, Another Town', 'DEF456', '2023-09-30'),
(4, 'Emily Williams', '1995-11-25', '321 Oak Street, Yet Another Town', 'GHI789', '2026-05-20'),
(5, 'Christopher Brown', '1992-06-08', '567 Pine Road, Smallville', 'JLK014', '2024-08-10'),
(6, 'Jessica Wilson', '1973-09-18', '890 Cedar Lane, Suburbia', 'MNO345', '2024-04-05'),
(7, 'David Martinez', '1989-02-28', '654 Birch Boulevard, Countryside', 'PQR678', '2023-10-25'),
(8, 'Sarah Taylor', '1980-01-05', '987 Spruce Court, Rural Town', 'STU901', '2020-12-15'),
(9, 'Kevin Garcia', '1992-07-12', '741 Walnut Lane, Coastal City', 'VWX234', '2026-02-28'),
(10, 'Amanda Rodriguez', '1987-04-30', '852 Cherry Street, Metropolis', 'YZA567', '2023-06-18'),
(11, 'Jack Powell', '2001-10-05', '123 Apple Street, Countryside', 'XYT555', '2024-10-14');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `trip`
--

CREATE TABLE `trip` (
  `Id` int(11) NOT NULL,
  `car` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `driver` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `startDate` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `tripType` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `startPlace` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `endPlace` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `distance` int(11) NOT NULL,
  `newMileage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `trip`
--

INSERT INTO `trip` (`Id`, `car`, `driver`, `startDate`, `tripType`, `startPlace`, `endPlace`, `distance`, `newMileage`) VALUES
(76, 'Toyota Corolla', 'Emily Williams', '2023-11-19', 'Magán', 'Miskolc', 'Budapest', 500, 10500),
(77, 'Toyota Corolla', 'Jessica Wilson', '2023-11-20', 'Magán', 'Miskolc', 'Szeged', 300, 10800),
(78, 'Toyota Corolla', 'Jessica Wilson', '2023-11-21', 'Magán', 'Szeged', 'Miskolc', 300, 11100),
(79, 'Mercedes-Benz C-Class', 'Christopher Brown', '2023-11-12', 'Magán', 'Budapest', 'Miskolc', 200, 10000),
(80, 'Toyota Corolla', 'John Doe', '2023-11-29', 'Magán', 'Szeged', 'Kőszeg', 250, 11350),
(81, 'Toyota Corolla', 'John Doe', '2023-11-30', 'Magán', 'Kőszeg', 'Szeged', 250, 11600),
(82, 'Nissan Rogue', 'Jack Powell', '2023-11-17', 'Magán', 'Miskolc', 'Kazincbarcika', 40, 10740),
(83, 'BMW 3 Series', 'John Doe', '2023-12-14', 'Céges', 'Székesfehérvár', 'Budapest', 150, 9650),
(84, 'BMW 3 Series', 'Christopher Brown', '2023-12-16', 'Magán', 'Budapest', 'Gödöllő', 50, 9700),
(85, 'BMW 3 Series', 'Christopher Brown', '2023-12-16', 'Magán', 'Gödöllő', 'Budapest', 50, 9750),
(86, 'BMW 3 Series', 'Kevin Garcia', '2024-01-14', 'Magán', 'Miskolc', 'Budapest', 180, 9930),
(234, 'Kia Sportage', 'John Doe', '2023-11-27', 'Magán', 'Miskolc', 'Ózd', 180, 10380),
(235, 'Kia Sportage', 'Jack Powell', '2023-11-28', 'Céges', 'Ózd', 'Miskolc', 10, 10390),
(236, 'Kia Sportage', 'Jane Smith', '2024-03-06', 'Céges', 'Miskolc', 'Budapest', 180, 10570),
(237, 'Kia Sportage', 'Jane Smith', '2024-03-06', 'Céges', 'Budapest', 'Miskolc', 180, 10750),
(238, 'Honda Accord', 'Jack Powell', '2023-11-21', 'Magán', 'Szeged', 'Miskolc', 250, 110250),
(239, 'Honda Accord', 'Jack Powell', '2023-11-21', 'Magán', 'Miskolc', 'Szeged', 250, 110500),
(241, 'Subaru Outback', 'Christopher Brown', '2024-01-20', 'Magán', 'Miskolc', 'Sátoraljaújhely', 84, 9684),
(242, 'Subaru Outback', 'Jack Powell', '2024-02-11', 'Magán', 'Miskolc', 'Sátoraljaújhely', 84, 9768),
(243, 'Subaru Outback', 'Jack Powell', '2024-02-11', 'Magán', 'Sátoraljaújhely', 'Miskolc', 84, 9852),
(244, 'Volkswagen Golf', 'Jane Smith', '2023-11-14', 'Céges', 'Miskolc', 'Szeged', 250, 12250),
(245, 'Volkswagen Golf', 'Jane Smith', '2023-11-14', 'Céges', 'Szeged', 'Miskolc', 250, 12500),
(246, 'Ford Focus', 'Kevin Garcia', '2023-09-10', 'Magán', 'Kőszeg', 'Miskolc', 450, 10950),
(247, 'Ford Focus', 'Emily Williams', '2023-11-14', 'Céges', 'Miskolc', 'Encs', 40, 10990),
(248, 'Ford Focus', 'Emily Williams', '2023-11-14', 'Céges', 'Encs', 'Miskolc', 40, 11030),
(249, 'Honda Civic', 'Christopher Brown', '2024-03-28', 'Magán', 'Békéscsaba', 'Siófok', 301, 11301),
(250, 'Honda Civic', 'Christopher Brown', '2024-03-28', 'Magán', 'Siófok', 'Békéscsaba', 301, 11602),
(251, 'Audi A4', 'John Doe', '2024-04-13', 'Céges', 'Szentgotthárd', 'Esztergom', 267, 11767),
(252, 'Nissan Rogue', 'Jack Powell', '2023-12-05', 'Céges', 'Székesfehérvár', 'Keszthely', 128, 10868);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`Id`, `username`, `password`) VALUES
(80, 'asd', 'asd');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `trip`
--
ALTER TABLE `trip`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `car`
--
ALTER TABLE `car`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `driver`
--
ALTER TABLE `driver`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `trip`
--
ALTER TABLE `trip`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=253;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
