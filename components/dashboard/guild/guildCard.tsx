import { Card, CardBody } from "@nextui-org/card";
import { User } from "@nextui-org/user";
import { APIGuild } from "discord-api-types/v10";

import { getGuildIcon } from "@/lib/utils";

export default function GuildCard({ guild }: { guild: APIGuild }) {
  return (
    <Card
      className="flex flex-row items-center content-center h-20"
      radius="sm"
    >
      <CardBody className="items-baseline">
        <User
          avatarProps={{
            src: getGuildIcon(guild),
          }}
          description={guild.id}
          name={guild.name}
        />
      </CardBody>
    </Card>
  );
}
