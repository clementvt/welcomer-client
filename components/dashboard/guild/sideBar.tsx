import { Guild } from "@prisma/client";
import Link from "next/link";

export async function SideBar({
  currentGuild,
  guilds,
}: {
  currentGuild: Guild;
  guilds: Guild[];
}) {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="px-4 py-5">
        <h2 className="text-2xl font-semibold">Welcomer</h2>
      </div>
      <nav className="flex-1 px-2 py-4">
        <Link
          className="block px-4 py-2 mt-2 text-sm font-medium text-white rounded-lg hover:bg-gray-600"
          href="#"
        >
          Dashboard
        </Link>
        <Link
          className="block px-4 py-2 mt-2 text-sm font-medium text-white rounded-lg hover:bg-gray-600"
          href="#"
        >
          Welcomer
        </Link>
        <Link
          className="block px-4 py-2 mt-2 text-sm font-medium text-white rounded-lg hover:bg-gray-600"
          href="#"
        >
          Leaver
        </Link>
        <Link
          className="block px-4 py-2 mt-2 text-sm font-medium text-white rounded-lg hover:bg-gray-600"
          href="#"
        >
          Profile
        </Link>
      </nav>
    </div>
  );
}
