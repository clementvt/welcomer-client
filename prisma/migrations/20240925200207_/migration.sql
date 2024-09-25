/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mutual` on the `UserGuild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "discriminator" TEXT,
ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "UserGuild" DROP COLUMN "mutual";
