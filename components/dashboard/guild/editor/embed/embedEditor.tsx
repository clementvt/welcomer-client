"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Embed } from "@prisma/client";

export default function EmbedEditor({
  embed,
  index,
}: {
  embed: Embed;
  index: number;
}) {
  return (
    <Accordion>
        {/* {embed.title} */}
        <AccordionItem key={index} title="Embed">
          {embed.id}
          {embed.description}
        </AccordionItem>
    </Accordion>
  );
}
