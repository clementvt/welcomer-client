"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Embed } from "@prisma/client";
import { FaTrash } from "react-icons/fa";

import { createEmbed, removeEmbed, removeEmbeds } from "@/lib/actions";

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
        <div className="mb-2">
          <Accordion variant="splitted">
            {embeds.map((embed, index) => (
              <AccordionItem key={index} title={`Embed ${index + 1}`}>
                <Accordion selectionMode="multiple" variant="light">
                  <AccordionItem key={1} aria-label="Author" title="Author">Author</AccordionItem>
                  <AccordionItem key={2} aria-label="Body" title="Body">Body</AccordionItem>
                  <AccordionItem key={3} aria-label="Footer" title="Footer">Footer</AccordionItem>
                  <AccordionItem key={4} aria-label="Images" title="Images">Images</AccordionItem>
                  <AccordionItem key={5} aria-label="Fields" title="Fields">Fields</AccordionItem>
               </Accordion>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
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
