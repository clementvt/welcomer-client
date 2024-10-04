"use client";

import { Accordion } from "@nextui-org/accordion";

export default function AccordionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Accordion>{children}</Accordion>
    </div>
  );
}
