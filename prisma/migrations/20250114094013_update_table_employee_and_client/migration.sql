/*
  Warnings:

  - You are about to drop the column `phone` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `employee` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Client_cellphone_key` ON `client`;

-- DropIndex
DROP INDEX `Employee_cellphone_key` ON `employee`;

-- AlterTable
ALTER TABLE `client` DROP COLUMN `phone`;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `phone`;
