import { EmbedBodyTitleInput } from "./EmbedBodyTitle";

import { EmbedExtended } from "@/types";

export function EmbedBodyFields({ embed }: { embed: EmbedExtended }) {
  return (
    <div>
      <EmbedBodyTitleInput title={embed.title} />
    </div>
  );
}
