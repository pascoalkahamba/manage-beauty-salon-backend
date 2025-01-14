/*
  Warnings:

  - A unique constraint covering the columns `[cellphone]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cellphone]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cellphone` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cellphone` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `cellphone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `cellphone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Client_cellphone_key` ON `Client`(`cellphone`);

-- CreateIndex
CREATE UNIQUE INDEX `Employee_cellphone_key` ON `Employee`(`cellphone`);
