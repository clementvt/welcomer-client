"use client";
import { Button } from "@nextui-org/button";

import { createWelcomer } from "@/lib/actions";

export default function CreateWelcomerButton({ guildId }: { guildId: string }) {
  return (
    <Button color="primary" onClick={() => createWelcomer(guildId)}>
      Enable Welcomer
    </Button>
  );
}
