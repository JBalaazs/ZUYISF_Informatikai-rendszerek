-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 06. 16:50
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
-- Tábla szerkezet ehhez a táblához `cars`
--

CREATE TABLE `cars` (
  `Id` int(11) NOT NULL,
  `license_plate` text COLLATE utf8_hungarian_ci NOT NULL,
  `model` text COLLATE utf8_hungarian_ci NOT NULL,
  `fuel` text COLLATE utf8_hungarian_ci NOT NULL,
  `consumption` float NOT NULL,
  `starting_mileage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `cars`
--

INSERT INTO `cars` (`Id`, `license_plate`, `model`, `fuel`, `consumption`, `starting_mileage`) VALUES
(1, 'ABC123', 'Toyota Corolla', 'Benzin', 6.5, 10000),
(2, 'XYZ789', 'Volkswagen Golf', 'Dízel', 5.8, 12000),
(3, 'DEF456', 'Ford Focus', 'Benzin', 7.2, 10500),
(4, 'GHI789', 'Honda Civic', 'Benzin', 4.3, 11000),
(5, 'JKL012', 'BMW 3 Series', 'Benzin', 8.1, 9500),
(6, 'MNO345', 'Audi A4', 'Dízel', 6.2, 11500),
(7, 'PQR678', 'Mercedes-Benz C-Class', 'Benzin', 7.5, 9800),
(8, 'STU901', 'Kia Sportage', 'Dízel', 6.8, 10200),
(9, 'VWX234', 'Subaru Outback', 'Benzin', 7, 9600),
(10, 'YZA567', 'Nissan Rogue', 'Benzin', 5, 10700),
(11, 'SJJ702', 'Honda Accord', 'Benzin', 9.4, 110000);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `drivers`
--

CREATE TABLE `drivers` (
  `Id` int(11) NOT NULL,
  `name` text COLLATE utf8_hungarian_ci NOT NULL,
  `birthDate` text COLLATE utf8_hungarian_ci NOT NULL,
  `address` text COLLATE utf8_hungarian_ci NOT NULL,
  `licenseNumber` text COLLATE utf8_hungarian_ci NOT NULL,
  `licenseExpirationDate` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `drivers`
--

INSERT INTO `drivers` (`Id`, `name`, `birthDate`, `address`, `licenseNumber`, `licenseExpirationDate`) VALUES
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
-- Tábla szerkezet ehhez a táblához `trips`
--

CREATE TABLE `trips` (
  `Id` int(11) NOT NULL,
  `car` text COLLATE utf8_hungarian_ci NOT NULL,
  `driver` text COLLATE utf8_hungarian_ci NOT NULL,
  `startDate` text COLLATE utf8_hungarian_ci NOT NULL,
  `tripType` text COLLATE utf8_hungarian_ci NOT NULL,
  `startPlace` text COLLATE utf8_hungarian_ci NOT NULL,
  `endPlace` text COLLATE utf8_hungarian_ci NOT NULL,
  `distance` int(11) NOT NULL,
  `newMileage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `trips`
--

INSERT INTO `trips` (`Id`, `car`, `driver`, `startDate`, `tripType`, `startPlace`, `endPlace`, `distance`, `newMileage`) VALUES
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
(86, 'BMW 3 Series', 'Kevin Garcia', '2024-01-14', 'Magán', 'Miskolc', 'Budapest', 180, 9930);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `username` text COLLATE utf8_hungarian_ci NOT NULL,
  `password` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`Id`, `username`, `password`) VALUES
(57, 'asd', 'asd'),
(61, 'asdd', 'asd');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cars`
--
ALTER TABLE `cars`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `drivers`
--
ALTER TABLE `drivers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `trips`
--
ALTER TABLE `trips`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
