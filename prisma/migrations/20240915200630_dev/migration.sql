-- CreateTable
CREATE TABLE "Guild" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Welcomer" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "welcomerId" INTEGER,

    CONSTRAINT "Welcomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaver" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "leaverId" INTEGER,

    CONSTRAINT "Leaver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DM" (
    "id" SERIAL NOT NULL,
    "welcomerId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Embed" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "footerid" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "welcomerId" INTEGER,
    "leaverId" INTEGER,
    "DMId" INTEGER,

    CONSTRAINT "Embed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmbedFooter" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmbedFooter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_guildId_key" ON "Guild"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Welcomer_guildId_key" ON "Welcomer"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Leaver_guildId_key" ON "Leaver"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "DM_welcomerId_key" ON "DM"("welcomerId");

-- AddForeignKey
ALTER TABLE "Welcomer" ADD CONSTRAINT "Welcomer_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaver" ADD CONSTRAINT "Leaver_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DM" ADD CONSTRAINT "DM_welcomerId_fkey" FOREIGN KEY ("welcomerId") REFERENCES "Welcomer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_footerid_fkey" FOREIGN KEY ("footerid") REFERENCES "EmbedFooter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_welcomerId_fkey" FOREIGN KEY ("welcomerId") REFERENCES "Welcomer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_leaverId_fkey" FOREIGN KEY ("leaverId") REFERENCES "Leaver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embed" ADD CONSTRAINT "Embed_DMId_fkey" FOREIGN KEY ("DMId") REFERENCES "DM"("id") ON DELETE SET NULL ON UPDATE CASCADE;
