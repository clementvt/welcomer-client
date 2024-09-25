import { redirect } from "next/navigation";

import { Sidebar } from "@/components/dashboard/guild/sideBar";
import { getUserGuild, getUserGuilds, getUserData } from "@/lib/dal";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    guildId: string;
  };
}) {
  const guild = await getUserGuild(params.guildId);

  if (!guild) redirect("/dashboard");
  const otherGuilds =
    (await getUserGuilds())?.filter((g) => g.id !== guild.id) ?? [];
  const user = await getUserData();

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar currentGuild={guild} guilds={otherGuilds} user={user!} />
      <main className="flex justify-center h-fitcontainer mx-auto overflow-auto flex-grow ml-[72px] lg:ml-0 pt-16 px-6">
        {children}
      </main>
    </div>
  );
}
