import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { redirect } from "next/navigation";

import { getGuild, getWelcomer } from "@/lib/dal";
import { getGuildChannels } from "@/lib/dto";
import { createWelcomer } from "@/lib/actions";
import CreateWelcomerButton from "@/components/dashboard/guild/createWelcomerButton";
import RemoveWelcomerButton from "@/components/dashboard/guild/deleteWelcomerButton";
export default async function Page({
  params,
}: {
  params: { guildId: string };
}) {
  var welcomerParams = await getWelcomer(params.guildId);
  const guild = await getGuild(params.guildId);
  const channels = await getGuildChannels(params.guildId);

  if (!guild) redirect("/dashboard");

  return (
    <Card>
      <CardBody className="justify-between flex flex-row items-center">
        <p>Welcome module status</p>
        {welcomerParams ? (
          <RemoveWelcomerButton guildId={params.guildId} />
        ) : (
         <CreateWelcomerButton guildId={params.guildId} />
        )}
      </CardBody>
    </Card>
  );
}