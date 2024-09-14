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
    <div className="relative flex flex-row h-screen">
      <SideBar currentGuild={guild} guilds={otherGuilds} />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
    </div>
  );
}
