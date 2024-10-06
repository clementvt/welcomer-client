"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";

export function EmbedAuthorUrlInput({
  icon,
}: {
  icon: string | null | undefined;
}) {
  const [value, setValue] = useState(icon ?? "");

  return <Input label={"Author url"} value={value} onValueChange={setValue} />;
}
