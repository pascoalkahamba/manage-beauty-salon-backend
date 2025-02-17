-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_serviceId_fkey`;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
