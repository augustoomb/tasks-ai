/*
  Warnings:

  - You are about to drop the `Assistant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Assistant` DROP FOREIGN KEY `Assistant_ownerId_fkey`;

-- DropTable
DROP TABLE `Assistant`;
