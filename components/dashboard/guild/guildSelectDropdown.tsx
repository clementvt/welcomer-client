"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { APIGuild } from "discord-api-types/v10";
import NextLink from "next/link";

import GuildCard from "./guildCard";

import { APIGuildExtended } from "@/types";

export function GuildSelectDropdown({
  guilds,
  currentGuild,
  isOpen,
}: {
  guilds: APIGuildExtended[];
  currentGuild: APIGuild;
  isOpen: boolean;
}) {
  return (
    <Dropdown
      showArrow
      classNames={{
        base: "before:bg-default-200",
        content:
          "py-1 px-1  border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
      }}
      placement="bottom-start"
    >
      <DropdownTrigger>
        <button className="m-2">
          <GuildCard guild={currentGuild} isOpen={isOpen} />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="other guilds"
        className="max-h-52 overflow-y-auto"
        variant="flat"
      >
        {guilds.map((guild) => (
          <DropdownItem key={guild.id} textValue={guild.id}>
            <NextLink href={`/dashboard/${guild.id}`}>
              <GuildCard guild={guild} />
            </NextLink>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
