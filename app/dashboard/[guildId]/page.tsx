import { Card, CardHeader } from "@nextui-org/card";
import { redirect } from "next/navigation";

import { getGuild } from "@/lib/dal";

export default async function Page({
  params,
}: {
  params: { guildId: string };
}) {
  const guild = await getGuild(params.guildId);

  if (!guild) redirect("/dashboard");

  return (
    <>
      <Card>
        <CardHeader>{guild.name}</CardHeader>
      </Card>
    </>
  );
}
