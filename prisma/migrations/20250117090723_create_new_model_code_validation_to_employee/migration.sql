/*
  Warnings:

  - You are about to drop the column `caracter` on the `codevalidationtoemployee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[characters]` on the table `CodeValidationToEmployee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `characters` to the `CodeValidationToEmployee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `CodeValidationToEmployee_caracter_key` ON `codevalidationtoemployee`;

-- AlterTable
ALTER TABLE `codevalidationtoemployee` DROP COLUMN `caracter`,
    ADD COLUMN `characters` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CodeValidationToEmployee_characters_key` ON `CodeValidationToEmployee`(`characters`);
