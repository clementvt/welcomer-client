/*
  Warnings:

  - The primary key for the `Guild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `guildId` on the `Guild` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Guild` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Guild` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Leaver" DROP CONSTRAINT "Leaver_guildId_fkey";

-- DropForeignKey
ALTER TABLE "Welcomer" DROP CONSTRAINT "Welcomer_guildId_fkey";

-- DropIndex
DROP INDEX "Guild_guildId_key";

-- AlterTable
ALTER TABLE "Guild" DROP CONSTRAINT "Guild_pkey",
DROP COLUMN "guildId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Guild_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_id_key" ON "Guild"("id");

-- AddForeignKey
ALTER TABLE "Welcomer" ADD CONSTRAINT "Welcomer_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaver" ADD CONSTRAINT "Leaver_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
