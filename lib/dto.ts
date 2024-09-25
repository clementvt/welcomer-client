import { APIGuild, APIUser } from "discord-api-types/v10";

import "server-only";

export async function getUserData(): Promise<APIUser | null> {
  try {
  } catch (error) {
    return null;
  }
}

export async function getUserGuilds(): Promise<APIGuild[] | null> {
  try {
  } catch (error) {
    console.log(error);

    return null;
  }
}
