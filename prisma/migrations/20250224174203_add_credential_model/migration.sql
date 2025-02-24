-- DropForeignKey
ALTER TABLE `Users_Modules` DROP FOREIGN KEY `Users_Modules_moduleId_fkey`;

-- DropForeignKey
ALTER TABLE `Users_Modules` DROP FOREIGN KEY `Users_Modules_userId_fkey`;

-- CreateTable
CREATE TABLE `Credential` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `keyName` VARCHAR(191) NOT NULL,
    `encryptedKey` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Credential_userId_keyName_key`(`userId`, `keyName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users_Modules` ADD CONSTRAINT `Users_Modules_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users_Modules` ADD CONSTRAINT `Users_Modules_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credential` ADD CONSTRAINT `Credential_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
