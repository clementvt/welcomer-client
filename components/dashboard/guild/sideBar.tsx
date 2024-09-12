"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { APIGuild } from "discord-api-types/v10";
import Link from "next/link";

import GuildCard from "./guildCard";

import { APIGuildExtended } from "@/types";
import { Card } from '@nextui-org/card';
import { getGuildIcon } from '../../../lib/utils';

export function SideBar({
  currentGuild,
  guilds,
}: {
  currentGuild: APIGuild;
  guilds: APIGuildExtended[] | undefined;
}) {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      {guilds ? (
        <Dropdown>
          <DropdownTrigger>
            <button className="w-full">
            <GuildCard guild={currentGuild} />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="other guilds" variant="flat">
            {guilds.map((guild) => (
              <DropdownItem key={guild.id}>
                <Link href={`/dashboard/${guild.id}`}>
                  <GuildCard guild={guild} />
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ) : (
        <GuildCard guild={currentGuild} />
      )}

      {/* <nav className="space-y-2">
        <Link passHref href={`/dashboard/${currentGuild.id}`}>
          <Button className="w-full justify-start" color="primary">
            Dashboard
          </Button>
        </Link>

        <Dropdown>
          <DropdownTrigger className="w-full justify-start">
            Modules
          </DropdownTrigger>
          <DropdownMenu aria-label="Modules">
            <DropdownItem key="welcomer">
              <Link href={`/dashboard/${currentGuild.id}/welcomer`}>
                Welcomer
              </Link>
            </DropdownItem>
            <DropdownItem key="leaver">
              <Link href={`/dashboard/${currentGuild.id}/leaver`}>Leaver</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Link passHref href={`/dashboard/${currentGuild.id}/help`}>
          <Button className="w-full justify-start" color="secondary">
            Help
          </Button>
        </Link>
      </nav> */}

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
