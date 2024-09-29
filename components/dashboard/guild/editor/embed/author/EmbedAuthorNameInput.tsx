"use client";

import { Textarea } from "@nextui-org/input";
import { useState } from "react";

export function EmbedAuthorNameInput({
  name,
}: {
  name: string | null | undefined;
}) {
  const [value, setValue] = useState(name ?? "");

  return (
    <Textarea
      label={"Author " + `( ${value?.length ?? 0}/256 )`}
      validate={(value) => {
        if (value.length > 256) return "Author must not exceed 256 characters!";
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
