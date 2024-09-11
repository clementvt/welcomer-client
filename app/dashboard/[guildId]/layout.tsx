import { redirect } from "next/navigation";

import { getGuild } from "@/lib/dal";

export default async function GuildEditLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    guildId: string;
  };
}) {
  const guild = await getGuild(params.guildId);

  if (!guild) redirect("/dashboard");

  return <section>{children}</section>;
}
