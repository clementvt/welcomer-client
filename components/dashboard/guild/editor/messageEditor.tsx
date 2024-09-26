import { Leaver, Welcomer } from "@prisma/client";

import ChannelSelector from "./channelSelector";
import ContentEditor from "./contentEditor";
import EmbedMenuAccordion from "./embed/embedMenuAccordion";

import { getEmbeds } from "@/lib/dal";
import { getGuildChannels } from "@/lib/dal";
export async function MessageEditor({ module }: { module: Welcomer | Leaver }) {
  const channels = await getGuildChannels(module.guildId);
  const embeds = await getEmbeds(module);

  return (
    <div className="lg:w-1/2 container px-4">
      <div className="flex flex-col space-y-4">
        <ChannelSelector channels={channels!} />
        <ContentEditor content={module.content ?? undefined} />
        <EmbedMenuAccordion embeds={embeds ?? []} moduleId={module.id} />
      </div>
    </div>
  );
}
