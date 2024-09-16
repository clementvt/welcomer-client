"use server";

import { Guild, Welcomer } from "@prisma/client";
import { APIGuild } from "discord-api-types/v10";
import { redirect } from "next/navigation";

import prisma from "./prisma";
import { deleteSession } from "./session";

export async function signIn() {
  redirect("/api/auth/login");
}

export async function signOut() {
  deleteSession();
  redirect("/");
}

export async function createGuild(guild: APIGuild): Promise<Guild> {
  try {
    const res = await prisma.guild.upsert({
      where: { id: guild.id },
      update: {},
      create: {
        id: guild.id,
      },
    });

    return res;
  } catch (error) {
    throw new Error("Failed to create guild");
  }
}

export async function createWelcomer(guildId: string): Promise<Welcomer> {
  try {
    const res = await prisma.welcomer.create({
      data: {
        guildId: guildId,
      },
    });

    return res;
  } catch (error) {
    throw new Error("Failed to create welcomer");
  }
}

export async function getWelcomer(guildId: string): Promise<Welcomer | null> {
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
  data: Partial<Welcomer>
): Promise<Welcomer> {
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

export async function deleteWelcomer(guildId: string): Promise<void> {
  try {
    await prisma.welcomer.delete({
      where: { guildId },
    });
  } catch (error) {
    throw new Error("Failed to delete welcomer");
  }
}

export async function createLeaver(guildId: string): Promise<Welcomer> {
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

export async function getLeaver(guildId: string): Promise<Welcomer | null> {
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
  data: Partial<Welcomer>
): Promise<Welcomer> {
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

export async function deleteLeaver(guildId: string): Promise<void> {
  try {
    await prisma.leaver.delete({
      where: { guildId },
    });
  } catch (error) {
    throw new Error("Failed to delete leaver");
  }
}
