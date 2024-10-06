import { EmbedAuthorIconInput } from "./EmbedAuthorIcon";
import { EmbedAuthorNameInput } from "./EmbedAuthorNameInput";

import { EmbedExtended } from "@/types";

export function EmbedAuthorFields({ embed }: { embed: EmbedExtended }) {
  return (
    <div className="flex flex-row space-x-4">
      <EmbedAuthorNameInput name={embed.author?.name} />
      <EmbedAuthorIconInput icon={embed.author?.iconUrl} />
    </div>
  );
}
