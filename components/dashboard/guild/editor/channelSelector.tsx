"use client";
import { Select, SelectItem, SelectSection } from "@nextui-org/select";
import { APIChannel } from "discord-api-types/v10";

export default function ChannelSelector({
  channels,
}: {
  channels: APIChannel[] | null;
}) {
  return (
    <Select label="Channel" placeholder="Select a channel">
      {(channels || [])
        ?.filter((channel) => channel.type === 4)
        .map((channel) => (
          <SelectSection key={channel.id} showDivider title={channel.name}>
            {(channels || [])
              ?.filter((c) => c.type === 0)
              ?.filter((c) => c.parent_id === channel.id)
              .map((c) => (
                <SelectItem key={c.id} textValue={c.name}>
                  {c.name} ({c.id})
                </SelectItem>
              ))}
          </SelectSection>
        ))}
    </Select>
  );
}
