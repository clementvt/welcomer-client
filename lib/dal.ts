import "server-only";

import { Guild, Leaver, Welcomer } from "@prisma/client";
import { APIGuild } from "discord-api-types/v10";
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

export async function userCanAccesssGuild(guildId: string): Promise<boolean> {
  return (await getUserGuilds())?.find((guild) => guild.id === guildId) != null;
}

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
