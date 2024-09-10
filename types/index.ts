import { SVGProps } from "react";
import { APIGuild } from 'discord-api-types/v10';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
}

export interface APIGuildExtended extends APIGuild {
  mutual?: boolean;
}