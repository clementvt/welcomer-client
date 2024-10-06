"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { EmbedAuthorFields } from "./author/EmbedAuthorFields";

import { EmbedExtended } from "@/types";

export default function EmbedsViewer({
  embeds,
}: {
  embeds: EmbedExtended[] | null;
}) {
  if (!embeds) {
    return null;
  }

  return (
    <div>
      <Accordion variant="splitted">
        {embeds.map((embed, index) => (
          <AccordionItem key={index} title={`Embed ${index + 1}`}>
            <Accordion selectionMode="multiple" variant="bordered">
              <AccordionItem key={1} aria-label="Author" title="Author">
                <EmbedAuthorFields embed={embed} />
              </AccordionItem>
              <AccordionItem key={2} aria-label="Body" title="Body">
                Body
              </AccordionItem>
              <AccordionItem key={3} aria-label="Footer" title="Footer">
                Footer
              </AccordionItem>
              <AccordionItem key={4} aria-label="Images" title="Images">
                Images
              </AccordionItem>
              <AccordionItem key={5} aria-label="Fields" title="Fields">
                Fields
              </AccordionItem>
            </Accordion>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
