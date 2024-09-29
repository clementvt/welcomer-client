import { Embed } from "@prisma/client";

import EmbedAccordion from "@/components/Accordion/EmbedAccordion";

export default function EmbedEditor({ embed }: { embed: Embed }) {
  return <EmbedAccordion />;
}
