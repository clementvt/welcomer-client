import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SessionPayload = {
  id: string;
  expiresAt: Date;
}