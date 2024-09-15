"use server";

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

export async function createGuild(guild: APIGuild) {
  const res = await prisma.guild.upsert({
    where: { id: guild.id },
    update: {},
    create: {
      id: guild.id,
    },
  });

  return res;
}

export async function createWelcomer(guildId: string, channelId: string) {
  const res = await prisma.welcomer.upsert({
    where: { id: guildId },
    update: { channelId },
    create: { id: channelId, channelId, message: "" },
  });

  return res;
}
