import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { APIGuild } from "discord-api-types/v10";
import { default as Link, default as NextLink } from "next/link";

import GuildCard from "./guildCard";
import { GuildSelectDropdown } from "./guildSelectDropdown";
import { LogoutButton } from "./logoutButton";

import { Logo } from "@/components/icons";
import { APIGuildExtended } from "@/types";

export function SideBar({
  currentGuild,
  guilds,
}: {
  currentGuild: APIGuild;
  guilds: APIGuildExtended[] | undefined;
}) {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <div className="mb-5">
        <NextLink className="flex justify-start items-center gap-1" href="/">
          <Logo />
          <div className="flex flex-col leading-3">
            <p className="font-bold text-inherit">Welcomer</p>
            <p className="text-xs text-slate-500 ml-px">Dashboard</p>
          </div>
        </NextLink>

        <Divider className="my-3" />
      </div>
      <div className="mb-5">
        <span>Currently editing:</span>
        {guilds ? (
          <GuildSelectDropdown currentGuild={currentGuild} guilds={guilds} />
        ) : (
          <GuildCard guild={currentGuild} />
        )}
      </div>

      <nav className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col space-y-4">
          <Link passHref href={`/dashboard/${currentGuild.id}`}>
            <Button className="w-full justify-start">Dashboard</Button>
          </Link>

          <Divider className="my-3" />
          <div>
            Modules
            <div className="flex flex-col space-y-4">
              <Link passHref href={`/dashboard/${currentGuild.id}/welcome`}>
                <Button className="w-full justify-start">Welcome</Button>
              </Link>
              <Link passHref href={`/dashboard/${currentGuild.id}/goodbye`}>
                <Button className="w-full justify-start">Goodbye</Button>
              </Link>
            </div>
          </div>

          <Divider className="my-3" />

          <Link passHref href={`/dashboard/${currentGuild.id}/settings`}>
            <Button className="w-full justify-start">Settings</Button>
          </Link>
          <Link passHref href={`/dashboard/${currentGuild.id}/help`}>
            <Button className="w-full justify-start">Help</Button>
          </Link>
        </div>
        <div>
          <LogoutButton />
        </div>
      </nav>
    </div>
  );
}
