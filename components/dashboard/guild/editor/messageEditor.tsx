import { Leaver, Welcomer } from "@prisma/client";

import ChannelSelector from "./channelSelector";

import { getGuildChannels } from "@/lib/dto";
export async function MessageEditor({ module }: { module: Welcomer | Leaver }) {
  const channels = await getGuildChannels(module.guildId);

  return (
    <div className="w-1/2 container px-4">
      <div className="flex flex-col space-y-4">
        <ChannelSelector channels={channels!} />
      </div>
    </div>
  );
}
