"use client";

import { Button } from "@nextui-org/button";

import { removeEmbeds } from "@/lib/actions";

export default function RemoveEmbedsButton({
  embedsLenght,
  moduleId,
}: {
  embedsLenght: number;
  moduleId: number;
}) {
  return (
    <Button
      color="danger"
      isDisabled={embedsLenght == 0}
      variant="ghost"
      onClick={() => removeEmbeds(moduleId)}
    >
      Clear Embeds
    </Button>
  );
}
