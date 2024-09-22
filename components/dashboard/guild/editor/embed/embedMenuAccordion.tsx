"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Embed } from "@prisma/client";

export default function EmbedMenuAccordion({ embeds }: { embeds: Embed[] }) {
  return (
    <Accordion>
      <AccordionItem title={`Embeds - ( ${embeds.length}/10 )`}>
        <div className="sm:flex-row flex-col flex">
          <Button className="sm:mr-4 sm:mb-0 mb-2" color="primary">
            Add Embed
          </Button>
          <Button
            color="danger"
            isDisabled={embeds.length == 0}
            variant="ghost"
          >
            Clear Embeds
          </Button>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
