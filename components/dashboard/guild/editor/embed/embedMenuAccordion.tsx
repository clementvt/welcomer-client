import { Embed } from "@prisma/client";

import CreateEmbedButton from "./createEmbedButton";
import RemoveEmbedsButton from "./removeEmbedsButton";

import EmbedsAccordion from "@/components/Accordion/EmbedsAccordion";
import EmbedsAccordionWrapper from "@/components/Accordion/EmbedsAccordionWrapper";

export default function EmbedMenuAccordion({
  embeds,
  moduleId,
}: {
  embeds: Embed[];
  moduleId: number;
}) {
  return (
    <EmbedsAccordionWrapper embedsLength={embeds.length}>
      <div className="mb-2">
        <EmbedsAccordion embeds={embeds} />
      </div>
      <div className="sm:flex-row flex-col flex">
        <CreateEmbedButton moduleId={moduleId} />
        <RemoveEmbedsButton embedsLenght={embeds.length} moduleId={moduleId} />
      </div>
    </EmbedsAccordionWrapper>

    // <Accordion>
    //   <AccordionItem title={`Embeds - ( ${embeds.length}/10 )`}>
    //     <div className="mb-2">
    //       <Accordion variant="splitted">
    //         {embeds.map((embed, index) => (
    //           <AccordionItem key={index} title={`Embed ${index + 1}`}>
    //             <Accordion selectionMode="multiple" variant="light">
    //               <AccordionItem key={1} aria-label="Author" title="Author">
    //                 <EmbedAuthorFields embed={embed} />
    //               </AccordionItem>
    //               <AccordionItem key={2} aria-label="Body" title="Body">
    //                 Body
    //               </AccordionItem>
    //               <AccordionItem key={3} aria-label="Footer" title="Footer">
    //                 Footer
    //               </AccordionItem>
    //               <AccordionItem key={4} aria-label="Images" title="Images">
    //                 Images
    //               </AccordionItem>
    //               <AccordionItem key={5} aria-label="Fields" title="Fields">
    //                 Fields
    //               </AccordionItem>
    //             </Accordion>
    //           </AccordionItem>
    //         ))}
    //       </Accordion>
    //     </div>
    //     <div className="sm:flex-row flex-col flex">
    //       <CreateEmbedButton moduleId={moduleId} />
    //       <RemoveEmbedsButton
    //         embedsLenght={embeds.length}
    //         moduleId={moduleId}
    //       />
    //     </div>
    //   </AccordionItem>
    // </Accordion>
  );
}
