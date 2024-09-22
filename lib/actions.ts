"use server";

import { Guild, Welcomer, Embed } from "@prisma/client";
import { APIGuild } from "discord-api-types/v10";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { userCanAccesssGuild } from "./dal";
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

export async function createWelcomer(
  guildId: string,
): Promise<Welcomer | null> {
  try {
    if (!userCanAccesssGuild(guildId)) return null;

    const res = await prisma.welcomer.create({
      data: {
        guildId: guildId,
      },
    });

    revalidatePath(`/app/dashboard/${guildId}/welcome`);

    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create welcomer");
  }
}

export async function removeWelcomer(
  guildId: string,
): Promise<Welcomer | null> {
  try {
    if (!userCanAccesssGuild(guildId)) return null;

    const res = await prisma.welcomer.delete({
      where: {
        guildId: guildId,
      },
    });

    revalidatePath(`/app/dashboard/${guildId}/welcome`);

    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete welcomer");
  }
}
export async function createEmbed(welcomerId: number): Promise<Embed | null> {
  try {
    const res = await prisma.embed.create({
      data: {
        welcomerId: welcomerId,
      },
    });

    revalidatePath(`/app/dashboard/${welcomerId}/welcome`);

    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create embed");
  }
}

export async function removeEmbeds(welcomerId: number): Promise<void> {
  try {
    await prisma.embed.deleteMany({
      where: {
        welcomerId: welcomerId,
      },
    });

    revalidatePath(`/app/dashboard/${welcomerId}/welcome`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete embeds");
  }
}
