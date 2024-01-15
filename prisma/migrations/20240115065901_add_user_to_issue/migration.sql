/*
  Warnings:

  - Made the column `hashedPassword` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `hashedPassword` VARCHAR(191) NOT NULL;
