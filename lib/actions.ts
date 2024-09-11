"use server"

import { APIGuild } from "discord-api-types/v10";
import { redirect } from "next/navigation";
import prisma from "./prisma";
import { deleteSession } from "./session";


export async function signIn() {
     redirect("/api/auth/login")
}

export async function signOut() {
     deleteSession();
     redirect("/")
}

export async function createGuild(guild: APIGuild) {
     const res = await prisma.guild.create({
          data: {
               guildId: guild.id,
          }
     });
     return res;
}