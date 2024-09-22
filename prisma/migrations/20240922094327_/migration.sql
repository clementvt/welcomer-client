/*
  Warnings:

  - You are about to drop the column `message` on the `Leaver` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Welcomer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Leaver" DROP COLUMN "message",
ADD COLUMN     "content" TEXT;

-- AlterTable
ALTER TABLE "Welcomer" DROP COLUMN "message",
ADD COLUMN     "content" TEXT;
