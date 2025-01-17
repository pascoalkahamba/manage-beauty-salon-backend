-- CreateTable
CREATE TABLE `CodeValidationToEmployee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `caracter` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `CodeValidationToEmployee_caracter_key`(`caracter`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
