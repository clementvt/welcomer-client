"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function EmbedAccordion() {
  return (
    <Accordion selectionMode="multiple" variant="light">
      <AccordionItem key={1} aria-label="Author" title="Author">
        Author
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
  );
}
