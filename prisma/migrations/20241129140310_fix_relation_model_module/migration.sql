/*
  Warnings:

  - You are about to drop the `_ModuleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ModuleToUser` DROP FOREIGN KEY `_ModuleToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ModuleToUser` DROP FOREIGN KEY `_ModuleToUser_B_fkey`;

-- DropTable
DROP TABLE `_ModuleToUser`;

-- CreateTable
CREATE TABLE `Users_Modules` (
    `userId` INTEGER NOT NULL,
    `moduleId` INTEGER NOT NULL,
    `enabled` BOOLEAN NOT NULL,

    PRIMARY KEY (`userId`, `moduleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users_Modules` ADD CONSTRAINT `Users_Modules_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users_Modules` ADD CONSTRAINT `Users_Modules_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
