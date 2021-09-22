-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2021 at 04:47 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventaris`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(11) NOT NULL,
  `nama_barang` varchar(50) NOT NULL,
  `satuan` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `nama_barang`, `satuan`) VALUES
(1, 'TP Link TL-WR-840N', 'Pcs'),
(2, 'Miracle Ink 003', 'Bottle'),
(3, 'Belden RJ45', 'Bungkus'),
(4, 'RAM Visipro DDR4 2666 Mhz', 'Keping'),
(5, 'Baterai CMOS 2032', 'Pcs');

-- --------------------------------------------------------

--
-- Table structure for table `cabang`
--

CREATE TABLE `cabang` (
  `id` int(12) NOT NULL,
  `kode` varchar(11) NOT NULL,
  `nama_cabang` varchar(25) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `telepon` varchar(16) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cabang`
--

INSERT INTO `cabang` (`id`, `kode`, `nama_cabang`, `alamat`, `telepon`, `status`) VALUES
(111, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(112, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(113, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(114, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(115, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(116, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(117, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(118, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(119, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(120, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(121, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(122, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(123, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(124, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(125, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(126, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(127, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(128, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(129, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(130, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(131, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1),
(132, 'GS', 'Gatsu', 'Jl Gatot Subroto', '0612253000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `kode_department` varchar(5) NOT NULL,
  `nama_department` varchar(25) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `kode_department`, `nama_department`, `status`) VALUES
(1, 'IT', 'Information & Technology', 1),
(5, 'SLA', 'Sales Admin', 1),
(6, 'SVA', 'Service Admin', 1),
(7, 'SPA', 'Sparepart Admin', 1),
(8, 'SPV', 'Supervisor', 1),
(10, 'HRD', 'Human Resources Departmen', 1),
(16, 'SCO', 'Sales Consultant', 1),
(19, 'ACC', 'Accounting', 1);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `images` varchar(100) NOT NULL,
  `namafile` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `images`, `namafile`) VALUES
(13, '1630586506098woman.png', 'test'),
(14, '1630586580155Mikro.jpeg', 'mikroskil'),
(15, '1631098871847Pas Photo 3x4.jpg', 'ww');

-- --------------------------------------------------------

--
-- Table structure for table `music`
--

CREATE TABLE `music` (
  `id` int(11) NOT NULL,
  `namafilemusic` varchar(100) NOT NULL,
  `keterangan` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `music`
--

INSERT INTO `music` (`id`, `namafilemusic`, `keterangan`) VALUES
(1, '1631100884088y2meta.com - aespa 에스파 \'Next Level\' MV (128 kbps).mp3', 0),
(2, '1631100893082The Kid LAROI - STAY (Lyrics) Ft. Justin Bieber.mp3', 0),
(3, '1631105326234ITZY WANNABE MV.mp3', 0);

-- --------------------------------------------------------

--
-- Table structure for table `pembelian_header`
--

CREATE TABLE `pembelian_header` (
  `id` int(11) NOT NULL,
  `id_vendor` int(11) NOT NULL,
  `id_employee` int(11) NOT NULL,
  `tgl_pembelian` date NOT NULL,
  `total_pembelian` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pembelian_header`
--

INSERT INTO `pembelian_header` (`id`, `id_vendor`, `id_employee`, `tgl_pembelian`, `total_pembelian`) VALUES
(1, 1, 1, '2021-09-19', 500000),
(2, 3, 4, '2021-09-19', 650000);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `kode_user` varchar(15) NOT NULL,
  `nama_user` varchar(25) NOT NULL,
  `cabang` varchar(25) NOT NULL,
  `department` varchar(25) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `kode_user`, `nama_user`, `cabang`, `department`, `status`) VALUES
(1, 'IT-GS-001', 'PATRICK', 'GS', 'IT', 1),
(4, 'IT-GS-002', 'Vallent', 'GS', 'IT', 1),
(5, 'IT-GS-003', 'Johannes', 'GS', 'IT', 1),
(6, 'IT-GS-004', 'Bobby', 'GS', 'IT', 1),
(7, 'IT-GS-005', 'Suryanto', 'GS', 'IT', 1),
(8, 'IT-GS-006', 'Tashia', 'GS', 'IT', 1),
(9, 'IT-GS-007', 'Andre', 'GS', 'IT', 1),
(10, 'IT-GS-008', 'Jacky', 'GS', 'IT', 1),
(11, 'IT-GS-009', 'Tashia', 'GS', 'IT', 1),
(12, 'ACC-GS-001', 'Veronika', 'GS', 'ACC', 1),
(13, 'ACC-GS-002', 'Jasmine', 'GS', 'ACC', 1),
(15, 'ACC-TM-001', 'TAFFI', 'TM', 'ACC', 1),
(16, 'ACC-GS-003', 'William', 'GS', 'ACC', 1),
(17, 'ACC-GS-004', 'Wellia', 'GS', 'ACC', 1),
(19, '', 'Chryseis', 'GS', 'ACC', 1),
(20, '', 'Vonny', 'GS', 'ACC', 1),
(21, '', 'Rosalie', 'GS', 'ACC', 1),
(22, 'IT-GS-001', 'PATRICK', 'GS', 'acc', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`id`, `nama_lengkap`, `username`, `password`) VALUES
(1, 'Patrick Lim', 'patrick1', 'pat123'),
(2, 'Rizky Pratama', 'eki', 'eki123'),
(3, 'Fonny', 'fonny', 'fon123');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int(11) NOT NULL,
  `nama_vendor` varchar(25) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `telepon` varchar(16) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `nama_vendor`, `alamat`, `telepon`, `status`) VALUES
(1, 'Mitra Intermedia', 'Komplek MBC', '08122567453', 1),
(2, 'Zona Computer', 'Jl Merak Jingga', '08122567453', 1),
(3, 'ICA Service Centre', 'Jl Prof HM Yamin', '08122567453', 1),
(4, 'XSUS Refill Centre', 'Komplek MBC', '08122567453', 1),
(5, 'KyCom', 'Jl Gatot Subroto', '08122567453', 1),
(6, 'Rhyandy Com', 'Jl Gatot Subroto Komplek Tivoli', '08122567453', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cabang`
--
ALTER TABLE `cabang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pembelian_header`
--
ALTER TABLE `pembelian_header`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cabang`
--
ALTER TABLE `cabang`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pembelian_header`
--
ALTER TABLE `pembelian_header`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
