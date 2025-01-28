/*
  Warnings:

  - You are about to drop the column `employeeId` on the `cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_employeeId_fkey`;

-- DropIndex
DROP INDEX `Cart_employeeId_key` ON `cart`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `employeeId`;
