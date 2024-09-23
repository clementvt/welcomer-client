import "server-only";

import { Embed, Guild, Leaver, Welcomer } from "@prisma/client";
import { APIChannel, APIGuild, APIUser } from "discord-api-types/v10";
import { cache } from "react";

import { getUserGuilds } from "./dto";
import prisma from "./prisma";

import { decrypt, getSession, getUserSession } from "@/lib/session";

export const verifySession = cache(async () => {
  const session = getSession();
  const clientSession = await decrypt(session);

  if (!clientSession || !clientSession.sessionId) return null;

  const userSession = await getUserSession(clientSession.sessionId as string);

  if (!userSession) return null;

  return { isAuth: true, userId: userSession.userId };
});

export const userCanAccesssGuild = cache(
  async (guildId: string): Promise<boolean> => {
    const userGuilds = await getUserGuilds();

    // console.log(userGuilds);
    return (
      userGuilds != null &&
      userGuilds.find((guild) => guild.id === guildId) != null
    );
  },
);

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

export async function getBotGuildDb(id: string): Promise<Guild | null> {
  try {
    const guild = await prisma.guild.findUnique({
      where: { id: id },
    });

    if (!guild) return null;

    return guild;
  } catch (error) {
    console.log("Failed to fetch bot guild");
    console.log(error);

    return null;
  }
}

export async function getGuild(id: string): Promise<APIGuild | null> {
  const userGuilds = await getUserGuilds();

  if (!userGuilds) return null;
  const targetGuild = userGuilds.find((guild) => guild.id === id);

  if (!targetGuild) return null;
  try {
    const guild = await prisma.guild.findUnique({
      where: { id: id },
    });

    if (!guild) return null;

    return targetGuild;
  } catch (error) {
    console.log("Failed to fetch guild");

    return null;
  }
}

export async function getWelcomer(guildId: string): Promise<Welcomer | null> {
  if (!userCanAccesssGuild(guildId)) return null;
  try {
    const res = await prisma.welcomer.findUnique({
      where: { guildId },
    });

    return res;
  } catch (error) {
    throw new Error("Failed to get welcomer");
  }
}

export async function updateWelcomer(
  guildId: string,
  data: Partial<Welcomer>,
): Promise<Welcomer | null> {
  if (!userCanAccesssGuild(guildId)) return null;
  try {
    const res = await prisma.welcomer.update({
      where: { guildId },
      data,
    });

    return res;
  } catch (error) {
    throw new Error("Failed to update welcomer");
  }
}

export async function deleteWelcomer(
  guildId: string,
): Promise<Welcomer | null> {
  if (!userCanAccesssGuild(guildId)) return null;
  try {
    let guild = await prisma.welcomer.delete({
      where: { guildId },
    });

    return guild;
  } catch (error) {
    throw new Error("Failed to delete welcomer");
  }
}

export async function createLeaver(guildId: string): Promise<Welcomer | null> {
  if (!userCanAccesssGuild(guildId)) return null;
  try {
    const res = await prisma.leaver.create({
      data: {
        guildId: guildId,
      },
    });

    return res;
  } catch (error) {
    throw new Error("Failed to create leaver");
  }
}

export async function getLeaver(guildId: string): Promise<Leaver | null> {
  if (!userCanAccesssGuild(guildId)) return null;

  try {
    const res = await prisma.leaver.findUnique({
      where: { guildId },
    });

    return res;
  } catch (error) {
    throw new Error("Failed to get leaver");
  }
}

export async function updateLeaver(
  guildId: string,
  data: Partial<Leaver>,
): Promise<Welcomer | null> {
  if (!userCanAccesssGuild(guildId)) return null;
  try {
    const res = await prisma.leaver.update({
      where: { guildId },
      data,
    });

    return res;
  } catch (error) {
    throw new Error("Failed to update leaver");
  }
}

export async function deleteLeaver(guildId: string): Promise<Leaver | null> {
  try {
    if (!userCanAccesssGuild(guildId)) return null;

    let guild = await prisma.leaver.delete({
      where: { guildId },
    });

    return guild;
  } catch (error) {
    throw new Error("Failed to delete leaver");
  }
}

export async function getModuleEmbeds(
  module: Welcomer | Leaver,
): Promise<Embed[] | null> {
  try {
    if (!userCanAccesssGuild(module.guildId)) return null;
    const res = await prisma.embed.findMany({
      //  where the welcomerId is equal to the module id or the leaverId is equal to the module id
      where: {
        OR: [{ welcomerId: module.id }, { leaverId: module.id }],
      },
    });

    return res;
  } catch (error) {
    throw new Error("Failed to get embeds");
  }
}

export async function fectchUserData(
  accesToken: string,
): Promise<APIUser | null> {
  try {
    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function fetchUserGuilds(
  accesToken: string,
): Promise<APIGuild[] | null> {
  try {
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
      next: {
        revalidate: 30,
      },
    });

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function fetchGuildChannels(
  guildId: string,
): Promise<APIChannel[] | null> {
  try {
    const response = await fetch(
      `https://discord.com/api/guilds/${guildId}/channels`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN!}`,
        },
        next: {
          revalidate: 30,
        },
      },
    );

    return response.json();
  } catch (error) {
    return null;
  }
}
