import { APIChannel, APIGuild, APIUser } from "discord-api-types/v10";

import {
  fectchUserData,
  fetchGuildChannels,
  fetchUserGuilds,
  getBotGuildDb,
  getUser,
  userCanAccesssGuild,
} from "@/lib/dal";
import { APIGuildExtended } from "@/types";

import "server-only";

export async function getUserData(): Promise<APIUser | null> {
  try {
    const user = await getUser();

    if (!user || !user.accessToken) return null;

    const userData = await fectchUserData(user.accessToken);

    return userData;
  } catch (error) {
    return null;
  }
}

export async function getUserGuilds(): Promise<APIGuild[] | null> {
  try {
    const user = await getUser();

    if (!user || !user.accessToken) return null;

    const userGuilds = await fetchUserGuilds(user.accessToken);

    return userGuilds;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function getGuilds(): Promise<APIGuildExtended[] | null> {
  try {
    let userGuilds = await getUserGuilds();

    if (!userGuilds) return null;
    userGuilds = userGuilds.filter(
      ({ permissions }) => (parseInt(permissions ?? "") & 0x8) === 0x8,
    );

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
): Promise<APIChannel[] | null> {
  try {
    if(!userCanAccesssGuild(guildId)) return null;
    const guildChannels = await fetchGuildChannels(guildId);
    return guildChannels;
  } catch (error) {
    return null;
  }
}
