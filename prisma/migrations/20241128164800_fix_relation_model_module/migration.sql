/*
  Warnings:

  - You are about to drop the `User_Module` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User_Module` DROP FOREIGN KEY `User_Module_module_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Module` DROP FOREIGN KEY `User_Module_user_id_fkey`;

-- AlterTable
ALTER TABLE `Module` ALTER COLUMN `status` DROP DEFAULT;

-- DropTable
DROP TABLE `User_Module`;

-- CreateTable
CREATE TABLE `_ModuleToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ModuleToUser_AB_unique`(`A`, `B`),
    INDEX `_ModuleToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ModuleToUser` ADD CONSTRAINT `_ModuleToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ModuleToUser` ADD CONSTRAINT `_ModuleToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
