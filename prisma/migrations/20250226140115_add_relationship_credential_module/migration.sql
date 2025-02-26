/*
  Warnings:

  - Added the required column `moduleId` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Credential` ADD COLUMN `moduleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Credential` ADD CONSTRAINT `Credential_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
