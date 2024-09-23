"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Embed } from "@prisma/client";

import { createEmbed, removeEmbeds } from "@/lib/actions";

export default function EmbedMenuAccordion({
  embeds,
  moduleId,
}: {
  embeds: Embed[];
  moduleId: number;
}) {
  return (
    <Accordion>
      <AccordionItem title={`Embeds - ( ${embeds.length}/10 )`}>
        {embeds.map((embed, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center"
          >
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Embed {index + 1}</p>
              <p className="text-xs text-gray-500">{embed.title}</p>
            </div>
            <Button color="primary" variant="ghost">
              Edit
            </Button>
          </div>
        ))}
        <div className="sm:flex-row flex-col flex">
          <Button
            className="sm:mr-4 sm:mb-0 mb-2"
            color="primary"
            onClick={() => createEmbed(moduleId)}
          >
            Add Embed
          </Button>
          <Button
            color="danger"
            isDisabled={embeds.length == 0}
            variant="ghost"
            onClick={() => removeEmbeds(moduleId)}
          >
            Clear Embeds
          </Button>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
