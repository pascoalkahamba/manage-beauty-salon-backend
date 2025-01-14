/*
  Warnings:

  - You are about to drop the column `name` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `employee` table. All the data in the column will be lost.
  - Added the required column `username` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` DROP COLUMN `name`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `name`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
