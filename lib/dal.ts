import "server-only";

import { Guild } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { getUserGuilds } from "./dto";
import prisma from "./prisma";

import { decrypt } from "@/lib/session";

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/api/auth/login");
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();

  if (!session) return null;

  try {
    const userId = await prisma.session.findUnique({
      where: { id: session.userId.toString() },
      //   returns only the name and email fields
      select: {
        userId: true,
      },
    });

    if (!userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: userId.userId },
    });

    return user;
  } catch {
    return null;
  }
});

export async function getBotGuild(id: string): Promise<Guild | null> {
  try {
    const guild = await prisma.guild.findUnique({
      where: { guildId: id },
    });

    if (!guild) return null;

    return guild;
  } catch (error) {
    console.log("Failed to fetch bot guild");

    return null;
  }
}

export async function getGuild(id: string): Promise<Guild | null> {
  const userGuilds = await getUserGuilds();

  if (!userGuilds) return null;
  if (!userGuilds.find((guild) => guild.id === id)) return null;
  try {
    const guild = await prisma.guild.findUnique({
      where: { guildId: id },
    });

    if (!guild) return null;

    return guild;
  } catch (error) {
    console.log("Failed to fetch guild");

    return null;
  }
}
