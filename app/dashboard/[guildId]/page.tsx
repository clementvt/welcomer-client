import { redirect } from "next/navigation";

import { getGuild } from "@/lib/dal";

export default async function Page({
  params,
}: {
  params: { guildId: string };
}) {
  const guild = await getGuild(params.guildId);

  if (!guild) redirect("/dashboard");

  return <>{JSON.stringify(guild)}</>;
}
