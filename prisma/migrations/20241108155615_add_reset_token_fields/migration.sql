-- AlterTable
ALTER TABLE `users` ADD COLUMN `resettoken` VARCHAR(191) NULL,
    ADD COLUMN `resettokenExpire` DATETIME(3) NULL;
