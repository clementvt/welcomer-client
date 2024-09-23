import { Leaver, Welcomer } from "@prisma/client";

import { MessageEditor } from "./messageEditor";
import MessagePreview from "./messagePreview";

export function Editor({ module }: { module: Welcomer | Leaver }) {
  return (
    <div className="flex flex-col lg:flex-row">
      <MessageEditor module={module} />
      <MessagePreview />
    </div>
  );
}
