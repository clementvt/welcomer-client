import CreateWelcomerButton from "@/components/dashboard/guild/createWelcomerButton";
import { getGuild, getWelcomer } from "@/lib/dal";
import { getGuildChannels } from "@/lib/dto";
export default async function Page({
  params,
}: {
  params: { guildId: string };
}) {
  const welcomerParams = await getWelcomer(params.guildId);
  const guild = await getGuild(params.guildId);
  const channels = await getGuildChannels(params.guildId);

  return (
    <>
      {welcomerParams ? (
        <div>
          <h1>Welcome to {welcomerParams.guildId}</h1>
          <p>{JSON.stringify(welcomerParams)}</p>
          <p>{JSON.stringify(guild)}</p>
          <p>{JSON.stringify(channels)}</p>
        </div>
      ) : (
        <div>
          <h1>Enable Welcomer</h1>
          <p>Welcomer is not enabled for this guild.</p>
          <CreateWelcomerButton guildId={params.guildId} />
        </div>
      )}
    </>
  );
}
