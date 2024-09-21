import { APIUser } from "discord-api-types/v10";

import { APIGuildExtended } from "@/types";

export function getGuildIcon(guild: APIGuildExtended) {
  return guild.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
    : "/logo32.svg";
}

export function getUserAvatar(user: APIUser) {
  return user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;
}

export function getGuildBanner(guild: APIGuildExtended) {
  return guild.banner
    ? `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.png`
    : getGuildIcon(guild);
}
