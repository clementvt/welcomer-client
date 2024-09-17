"use client";

import { Button } from "@nextui-org/button";

import { LogoutIcon } from "@/components/icons";
import { signOut } from "@/lib/actions";

export function LogoutButton({ textHidden }: { textHidden?: boolean }) {
  return (
    <form action={signOut}>
      <Button
        className="w-full"
        color="danger"
        isIconOnly={textHidden}
        startContent={!textHidden ? <LogoutIcon /> : undefined}
        type="submit"
        variant="ghost"
      >
        {textHidden ? <LogoutIcon /> : "Logout"}
      </Button>
    </form>
  );
}
