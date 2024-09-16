import { APIGuild, APIUser } from "discord-api-types/v10";

import { getBotGuildDb, getUser } from "@/lib/dal";
import { APIGuildExtended } from "@/types";

import "server-only";


export async function getUserData(): Promise<APIUser | null> {
  try {
    const user = await getUser();

    if (!user) return null;

    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      next: {
        revalidate: 20,
      },
    });

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getUserGuilds(): Promise<APIGuild[] | null> {
  try {
    const user = await getUser();

    if (!user) return null;

    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      next: {
        revalidate: 20,
      },
    });

    return response.json();
  } catch (error) {
    return null;
  }
}

export async function getGuilds(): Promise<APIGuildExtended[] | null> {
  try {
    let userGuilds = (await getUserGuilds())?.filter(
      ({ permissions }) => (parseInt(permissions ?? "") & 0x8) === 0x8,
    );

    if (!userGuilds) return null;

    const guilds: APIGuildExtended[] = await Promise.all(
      userGuilds.map(async (guild: APIGuildExtended) => {
        const botGuild = await getBotGuildDb(guild.id);

        if (botGuild) {
          guild.mutual = true;
        }

        return guild;
      }),
    );

    return guilds;
  } catch (error) {
    console.log("Failed to fetch guilds", error);

    return null;
  }
}

export async function getGuildChannels(
  guildId: string,
): Promise<APIGuild | null> {
  try {

    const response = await fetch(
      `https://discord.com/api/guilds/${guildId}/channels`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
        next: {
          revalidate: 20,
        },
      },
    );

    return response.json();
  } catch (error) {
    return null;
  }
}
