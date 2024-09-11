"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { APIUser } from "discord-api-types/v10";

import { getUserAvatar } from "@/lib/utils";
import { signOut } from "@/lib/actions";

export default function NavbarUserDropdown({ user }: { user: APIUser }) {
  if (!user) return null;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          showFallback
          as="button"
          className="transition-transform"
          color="secondary"
          name={user.username || "Discord User"}
          size="sm"
          src={getUserAvatar(user)}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownSection showDivider aria-label="Profile & Actions">
          <DropdownItem key="profile" isReadOnly className="h-14 gap-2">
            <User
              avatarProps={{
                src: getUserAvatar(user),
                size: "sm",
                showFallback: true,
                name: user.username || "Discord User",
              }}
              name={user.username}
            />
          </DropdownItem>
        </DropdownSection>

        <DropdownItem key="dashboard" href="/dashboard">
          My servers
        </DropdownItem>
        <DropdownItem key="help_and_feedback" href="/help">
          Help & Feedback
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
