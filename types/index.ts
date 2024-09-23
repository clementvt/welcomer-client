import { SVGProps } from "react";
import { APIGuild } from "discord-api-types/v10";
import { Guild } from "@prisma/client";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SessionPayload = {
  sessionId: string;
  expiresAt: Date;
};

export interface APIGuildExtended extends APIGuild {
  mutual?: boolean;
}

export interface GuildExtended extends Guild {
  mutual?: boolean;
}
