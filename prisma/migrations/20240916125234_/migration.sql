/*
  Warnings:

  - The primary key for the `DM` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `welcomerId` on the `DM` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Embed` table. All the data in the column will be lost.
  - You are about to drop the column `footerid` on the `Embed` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Embed` table. All the data in the column will be lost.
  - The primary key for the `Leaver` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Welcomer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `DM` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[moduleId]` on the table `DM` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[welcomerId]` on the table `Embed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leaverId]` on the table `Embed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[DMId]` on the table `Embed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[embedId]` on the table `EmbedFooter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Leaver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Welcomer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `moduleId` to the `DM` table without a default value. This is not possible if the table is not empty.
  - Made the column `welcomerId` on table `Embed` required. This step will fail if there are existing NULL values in that column.
  - Made the column `leaverId` on table `Embed` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DMId` on table `Embed` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `embedId` to the `EmbedFooter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DM" DROP CONSTRAINT "DM_welcomerId_fkey";

-- DropForeignKey
ALTER TABLE "Embed" DROP CONSTRAINT "Embed_DMId_fkey";

-- DropForeignKey
ALTER TABLE "Embed" DROP CONSTRAINT "Embed_footerid_fkey";

-- DropForeignKey
ALTER TABLE "Embed" DROP CONSTRAINT "Embed_leaverId_fkey";

-- DropForeignKey
ALTER TABLE "Embed" DROP CONSTRAINT "Embed_welcomerId_fkey";

-- DropIndex
DROP INDEX "DM_welcomerId_key";

-- AlterTable
ALTER TABLE "DM" DROP CONSTRAINT "DM_pkey",
DROP COLUMN "welcomerId",
ADD COLUMN     "moduleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Embed" DROP COLUMN "createdAt",
DROP COLUMN "footerid",
DROP COLUMN "updatedAt",
ADD COLUMN     "footerId" INTEGER,
ALTER COLUMN "welcomerId" SET NOT NULL,
ALTER COLUMN "leaverId" SET NOT NULL,
ALTER COLUMN "DMId" SET NOT NULL;

-- AlterTable
ALTER TABLE "EmbedFooter" ADD COLUMN     "embedId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Leaver" DROP CONSTRAINT "Leaver_pkey";

-- AlterTable
ALTER TABLE "Welcomer" DROP CONSTRAINT "Welcomer_pkey",
ALTER COLUMN "channelId" SET DEFAULT '',
ALTER COLUMN "message" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "DM_id_key" ON "DM"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DM_moduleId_key" ON "DM"("moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Embed_welcomerId_key" ON "Embed"("welcomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Embed_leaverId_key" ON "Embed"("leaverId");

-- CreateIndex
CREATE UNIQUE INDEX "Embed_DMId_key" ON "Embed"("DMId");

-- CreateIndex
CREATE UNIQUE INDEX "EmbedFooter_embedId_key" ON "EmbedFooter"("embedId");

-- CreateIndex
CREATE UNIQUE INDEX "Leaver_id_key" ON "Leaver"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Welcomer_id_key" ON "Welcomer"("id");

-- AddForeignKey
ALTER TABLE "DM" ADD CONSTRAINT "DM_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Welcomer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_welcomerId_fkey" FOREIGN KEY ("welcomerId") REFERENCES "Welcomer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_leaverId_fkey" FOREIGN KEY ("leaverId") REFERENCES "Leaver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_DMId_fkey" FOREIGN KEY ("DMId") REFERENCES "DM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmbedFooter" ADD CONSTRAINT "EmbedFooter_embedId_fkey" FOREIGN KEY ("embedId") REFERENCES "Embed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
