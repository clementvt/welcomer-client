/*
  Warnings:

  - The primary key for the `UserGuild` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserGuild" DROP CONSTRAINT "UserGuild_pkey",
ADD COLUMN     "mutual" BOOLEAN DEFAULT false,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "permissions" DROP NOT NULL,
ADD CONSTRAINT "UserGuild_pkey" PRIMARY KEY ("id");
