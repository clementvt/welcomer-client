import { getEmbedAuthor } from "@/lib/dal";
import { EmbedExtended } from "@/types";

export async function EmbedEditor({ embed }: { embed: EmbedExtended }) {
  console.log(embed);
  const embedAuthor = await getEmbedAuthor(embed.id);

  return <div>{JSON.stringify(embed)}</div>;
}
