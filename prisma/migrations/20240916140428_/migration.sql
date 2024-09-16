/*
  Warnings:

  - You are about to drop the column `footerId` on the `Embed` table. All the data in the column will be lost.
  - The `color` column on the `Embed` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `leaverId` on the `Leaver` table. All the data in the column will be lost.
  - You are about to drop the column `welcomerId` on the `Welcomer` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Embed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DM" ALTER COLUMN "message" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Embed" DROP COLUMN "footerId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "timestamp" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "color",
ADD COLUMN     "color" INTEGER;

-- AlterTable
ALTER TABLE "Leaver" DROP COLUMN "leaverId",
ALTER COLUMN "channelId" DROP NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Welcomer" DROP COLUMN "welcomerId",
ALTER COLUMN "channelId" DROP NOT NULL,
ALTER COLUMN "channelId" DROP DEFAULT,
ALTER COLUMN "message" DROP NOT NULL,
ALTER COLUMN "message" DROP DEFAULT;

-- CreateTable
CREATE TABLE "EmbedThumbnail" (
    "id" SERIAL NOT NULL,
    "embedId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "heigth" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmbedThumbnail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmbedImage" (
    "id" SERIAL NOT NULL,
    "embedId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "heigth" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmbedImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmbedAuthor" (
    "id" SERIAL NOT NULL,
    "embedId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmbedAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmbedField" (
    "id" SERIAL NOT NULL,
    "embedId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "inline" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmbedField_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmbedThumbnail_embedId_key" ON "EmbedThumbnail"("embedId");

-- CreateIndex
CREATE UNIQUE INDEX "EmbedImage_embedId_key" ON "EmbedImage"("embedId");

-- CreateIndex
CREATE UNIQUE INDEX "EmbedAuthor_embedId_key" ON "EmbedAuthor"("embedId");

-- CreateIndex
CREATE UNIQUE INDEX "EmbedField_embedId_key" ON "EmbedField"("embedId");

-- AddForeignKey
ALTER TABLE "EmbedThumbnail" ADD CONSTRAINT "EmbedThumbnail_embedId_fkey" FOREIGN KEY ("embedId") REFERENCES "Embed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmbedImage" ADD CONSTRAINT "EmbedImage_embedId_fkey" FOREIGN KEY ("embedId") REFERENCES "Embed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmbedAuthor" ADD CONSTRAINT "EmbedAuthor_embedId_fkey" FOREIGN KEY ("embedId") REFERENCES "Embed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmbedField" ADD CONSTRAINT "EmbedField_embedId_fkey" FOREIGN KEY ("embedId") REFERENCES "Embed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
