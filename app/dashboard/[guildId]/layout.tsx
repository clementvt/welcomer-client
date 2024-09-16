import { redirect } from "next/navigation";

import { SideBar } from "@/components/dashboard/guild/sideBar";
import { getGuild } from "@/lib/dal";
import { getGuilds } from "@/lib/dto";

export default async function Layout({
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
    <div className="flex flex-row h-screen relative">
      <SideBar currentGuild={guild} guilds={otherGuilds} />
      <main className="container mx-auto ml-64 pt-16 px-6 flex-grow">
        {children}
      </main>
    </div>
  );
}
