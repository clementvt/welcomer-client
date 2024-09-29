"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Embed } from "@prisma/client";
import EmbedEditor from "../dashboard/guild/editor/embed/embedEditor";

export default function EmbedsAccordion({ embeds }: { embeds: Embed[] }) {
  return (
    <Accordion variant="splitted">
      {embeds.map((embed, index) => (
        <AccordionItem key={index} title={`Embed ${index + 1}`}>
          <EmbedEditor embed={embed} />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
