import { Embed } from "@prisma/client";

import { EmbedAuthorNameInput } from "./EmbedAuthorNameInput";

export async function EmbedAuthorFields({ embed }: { embed: Embed }) {
  return (
    <div>
      <EmbedAuthorNameInput name={embed.author?.name} />
    </div>
  );
}
