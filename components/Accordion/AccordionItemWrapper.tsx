"use client";

import { AccordionItem } from "@nextui-org/accordion";

export default function AccordionItemWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <AccordionItem title aria-label={title}>
      {children}
    </AccordionItem>
  );
}
