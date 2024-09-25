/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "UserGuild" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "banner" TEXT,
    "permissions" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGuild_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserGuild" ADD CONSTRAINT "UserGuild_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
