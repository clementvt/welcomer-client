import { redirect } from "next/navigation";

import { getGuild } from "@/lib/dal";
import { SideBar } from "@/components/dashboard/guild/sideBar";

export default async function RootLayout({
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

  return (
    <section>
      <SideBar currentGuild={guild} guilds={[]} />
      {children}
    </section>
  );
}
