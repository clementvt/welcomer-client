import { Embed } from "@prisma/client";

import { EmbedAuthorNameInput } from "./EmbedAuthorNameInput";

import { getEmbedAuthor } from "@/lib/dal";

export async function EmbedAuthorFields({ embed }: { embed: Embed }) {
  const author = await getEmbedAuthor(embed.id);

  return (
    <div>
      <EmbedAuthorNameInput name={author?.name} />
    </div>
  );
}
