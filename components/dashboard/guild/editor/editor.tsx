import { Leaver, Welcomer } from "@prisma/client";

import { MessageEditor } from "./messageEditor";
import MessagePreview from "./messagePreview";

export function Editor({ module }: { module: Welcomer | Leaver }) {
  return (
    <div className="flex">
      <MessageEditor module={module}/>
      <MessagePreview />
    </div>
  );
}
