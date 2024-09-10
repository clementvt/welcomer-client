import { APIGuildExtended } from "@/types";


export function getGuildIcon(guild: APIGuildExtended) {
    return guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : "/logo32.svg";
}