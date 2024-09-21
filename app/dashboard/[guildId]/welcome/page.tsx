import { Card, CardBody } from "@nextui-org/card";
import { redirect } from "next/navigation";

import CreateWelcomerButton from "@/components/dashboard/guild/createWelcomerButton";
import RemoveWelcomerButton from "@/components/dashboard/guild/deleteWelcomerButton";
import { getGuild, getWelcomer } from "@/lib/dal";
import { getGuildChannels } from "@/lib/dto";
import { Divider } from "@nextui-org/divider";
export default async function Page({
  params,
}: {
  params: { guildId: string };
}) {
  const welcomerParams = await getWelcomer(params.guildId);
  const guild = await getGuild(params.guildId);
  const channels = await getGuildChannels(params.guildId);

  if (!guild) redirect("/dashboard");

  if (!welcomerParams) {
    return (
      <Card>
        <CardBody className="justify-between flex flex-row items-center">
          <p>Welcome module status</p>
          <CreateWelcomerButton guildId={params.guildId} />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className="justify-between flex flex-row items-center">
        <p>Welcome module status</p>
        <RemoveWelcomerButton guildId={params.guildId} />
        <Divider />
        
      </CardBody>
    </Card>
  );
}
