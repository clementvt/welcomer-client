-- DropForeignKey
ALTER TABLE "Embed" DROP CONSTRAINT "Embed_DMId_fkey";

-- DropForeignKey
ALTER TABLE "Embed" DROP CONSTRAINT "Embed_leaverId_fkey";

-- DropForeignKey
ALTER TABLE "Embed" DROP CONSTRAINT "Embed_welcomerId_fkey";

-- AlterTable
ALTER TABLE "Embed" ALTER COLUMN "welcomerId" DROP NOT NULL,
ALTER COLUMN "leaverId" DROP NOT NULL,
ALTER COLUMN "DMId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_welcomerId_fkey" FOREIGN KEY ("welcomerId") REFERENCES "Welcomer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_leaverId_fkey" FOREIGN KEY ("leaverId") REFERENCES "Leaver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_DMId_fkey" FOREIGN KEY ("DMId") REFERENCES "DM"("id") ON DELETE SET NULL ON UPDATE CASCADE;
