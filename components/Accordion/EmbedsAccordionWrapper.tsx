"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import React from "react";

export default function EmbedsAccordionWrapper({
  embedsLength,
  children,
}: {
  embedsLength: number;
  children: React.ReactNode;
}) {
  return (
    <Accordion>
      <AccordionItem title={`Embeds (${embedsLength}/10)`}>
        {children}
      </AccordionItem>
    </Accordion>
  );
}
