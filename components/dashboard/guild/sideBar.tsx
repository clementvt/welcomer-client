import { Button } from "@nextui-org/button";
import { APIGuild } from "discord-api-types/v10";
import { default as Link, default as NextLink } from "next/link";

import GuildCard from "./guildCard";
import { GuildSelectDropdown } from "./guildSelectDropdown";

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
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <div className="mb-5">
        <NextLink className="flex justify-start items-center gap-1" href="/">
          <Logo />
          <div className="flex flex-col leading-3">
            <p className="font-bold text-inherit">Welcomer</p>
            <p className="text-xs text-slate-500 ml-px">Dashboard</p>
          </div>
        </NextLink>
      </div>
      <div className="mb-5">
        <span>Currently editing:</span>
        {guilds ? (
          <GuildSelectDropdown currentGuild={currentGuild} guilds={guilds} />
        ) : (
          <GuildCard guild={currentGuild} />
        )}
      </div>

      <nav className="flex flex-col space-y-4">
        <Link passHref href={`/dashboard/${currentGuild.id}`}>
          <Button className="w-full justify-start">Dashboard</Button>
        </Link>

        

        <Link passHref href={`/dashboard/${currentGuild.id}/help`}>
          <Button className="w-full justify-start">Help</Button>
        </Link>
      </nav>

      {/* <div className="mt-8">
        <Dropdown>
          <DropdownTrigger className="w-full justify-start">
            Switch Server
          </DropdownTrigger>
          <DropdownMenu aria-label="Switch Server">
            {guilds.map((guild) => (
              <DropdownItem key={guild.id}>
                <Link href={`/dashboard/${guild.id}`}>{guild.name}</Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div> */}
    </div>
  );
}
