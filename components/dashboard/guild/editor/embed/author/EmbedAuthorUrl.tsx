"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";

export function EmbedAuthorUrlInput({
  url,
}: {
  url: string | null | undefined;
}) {
  const [value, setValue] = useState(url ?? "");

  return <Input label={"Author url"} value={value} onValueChange={setValue} />;
}
