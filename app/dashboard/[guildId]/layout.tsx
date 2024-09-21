import { redirect } from "next/navigation";

import { Sidebar } from "@/components/dashboard/guild/sideBar";
import { getGuild } from "@/lib/dal";
import { getGuilds, getUserData } from "@/lib/dto";

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
  const otherGuilds =
    (await getGuilds())?.filter((g) => g.id !== guild.id) ?? [];
  const user = await getUserData();

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar currentGuild={guild} guilds={otherGuilds} user={user!} />
      <main className="container mx-auto overflow-auto flex-grow ml-[72px] sm:ml-0 pt-16 px-6">
        {children}
      </main>
    </div>
  );
}
