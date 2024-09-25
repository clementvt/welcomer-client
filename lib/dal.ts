import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import prisma from "./prisma";

import { decrypt, getSession } from "@/lib/session";
import { GuildExtended } from "@/types";

export const verifySession = cache(async () => {
  const session = getSession();
  const clientSession = await decrypt(session);

  if (!clientSession?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: clientSession.userId as string };
});

export const getUser = cache(async () => {
  const session = await verifySession();

  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    return user;
  } catch {
    return null;
  }
});

export const canUserManageGuild = cache(async (guildId: string) => {
  try {
    const guild = await getUserGuild(guildId);

    return !!guild;
  } catch {
    return false;
  }
});

export const getUserGuilds = cache(async () => {
  const session = await verifySession();

  if (!session) return null;

  try {
    const guilds = await prisma.userGuild.findMany({
      where: { userId: session.userId },
    });

    return guilds;
  } catch {
    return null;
  }
});

export const getUserGuild = cache(async (guildId: string) => {
  const session = await verifySession();

  if (!session) return null;

  try {
    const guild = await prisma.userGuild.findFirst({
      where: { userId: session.userId, id: guildId },
    });

    return guild;
  } catch {
    return null;
  }
});

export const getGuilds = cache(async () => {
  try {
    const session = await verifySession();

    if (!session) return null;

    const userGuilds = await getUserGuilds();

    if (!userGuilds) return null;

    const guilds = await Promise.all(
      userGuilds.map(async (userGuild: GuildExtended) => {
        const guild = await prisma.guild.findUnique({
          where: { id: userGuild.id },
        });

        if (guild) {
          userGuild.mutual = true;
        }

        return userGuild;
      }),
    );

    return guilds;
  } catch (error) {
    return null;
  }
});
