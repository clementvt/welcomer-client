"use client";

import { Textarea } from "@nextui-org/input";
import { useState } from "react";

export default function ContentEditor({
  content,
}: {
  content: string | undefined;
}) {
  const [value, setValue] = useState(content);

  return (
    <Textarea
      label={"Content " + (value ? `( ${value.length}/2000 )` : "")}
      placeholder="Welcome {user} to {guild}!"
      validate={(value) => {
        if (value.length > 2000)
          return "Content must not exceed 2000 characters!";
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
