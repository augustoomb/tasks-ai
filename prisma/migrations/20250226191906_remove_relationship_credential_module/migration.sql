/*
  Warnings:

  - You are about to drop the column `moduleId` on the `Credential` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Credential` DROP FOREIGN KEY `Credential_moduleId_fkey`;

-- AlterTable
ALTER TABLE `Credential` DROP COLUMN `moduleId`;
