import { redirect } from "next/navigation";

import { SideBar } from "@/components/dashboard/guild/sideBar";
import { getGuild } from "@/lib/dal";
import { getGuilds } from "@/lib/dto";

export default async function layout({
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
  const otherGuilds = (await getGuilds())?.filter((g) => g.id !== guild.id);

  return (
    <section>
      <SideBar currentGuild={guild} guilds={otherGuilds} />
      {children}
    </section>
  );
}
