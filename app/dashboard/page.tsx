import { getGuilds } from "@/lib/dto";
import { getGuildIcon } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image as UIImage } from "@nextui-org/image";
import NextImage from "next/image";
import Link from "next/link";

export default async function Page() {
  const guilds = await getGuilds();

  if (!guilds) {
    throw new Error("Failed to fetch guilds");
  }

  if (guilds.length === 0) {
    return (
      <div className="flex flex-col items-center h-3/4 justify-center gap-4 py-8 md:py-10">
        <div className="inline-block justify-center text-wrap">
          No guilds found
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center">
      {guilds.map((guild) => (
        <Card
          key={guild.id}
          className="w-[350] relative radius-8 mb-10 min-w-60 justify-evenly mx-4"
        >
          <CardBody className="p-0 flex justify-center">
            <div
              className="image-blured"
              style={{
                backgroundImage: `url(${getGuildIcon(guild)})`,
                filter: "blur(10px)",
                height: "120px",
                backgroundSize: "cover",
                borderRadius: "8px",
                opacity: 0.7,
                backgroundPosition: "center",
              }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {guild.icon ? (
                <UIImage
                  alt="Guild Icon"
                  as={NextImage}
                  classNames={{
                    img: "shadow-2xl",
                    wrapper: "w-16 h-16",
                  }}
                  height={64}
                  src={getGuildIcon(guild)}
                  width={64}
                />
              ) : (
                <div className="w-16 h-16 border-solid border-2 border-white shadow-2xl rounded-large flex justify-center items-center">
                  {guild.name[0]}
                </div>
              )}
            </div>
          </CardBody>
          <CardFooter className="flex items-center justify-between">
            <div className="flex flex-row items-center">
              {guild.icon ? (
                <UIImage
                  alt="Guild Icon"
                  as={NextImage}
                  classNames={{
                    img: "border-solid border-1 border-white shadow-2xl",
                    wrapper: "mr-3 w-12 h-12",
                  }}
                  height={50}
                  src={getGuildIcon(guild)}
                  width={50}
                />
              ) : (
                <div className="w-12 h-12 border-solid border-2 border-white shadow-2xl rounded-large flex justify-center items-center mr-3">
                  {guild.name[0]}
                </div>
              )}
              {guild.name}
            </div>
            {guild.mutual ? (
              <Link href={`/dashboard/${guild.id}`}>
                <Button className="right ml-2 font-bold" color="primary">
                  Manage
                </Button>
              </Link>
            ) : (
              <Link
                href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.AUTH_DISCORD_ID}&permissions=8&scope=bot&guild_id=${guild.id}`}
              >
                <Button
                  className="right ml-2 font-bold"
                  color="default"
                  type="submit"
                >
                  Invite Bot
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
