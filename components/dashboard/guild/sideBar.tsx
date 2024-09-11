import { Guild } from "@prisma/client";

export async function SideBar({currentGuild, guilds}: {currentGuild: Guild, guilds: Guild[]}) {
    return (
      <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
        <div className="px-4 py-5">
          <h2 className="text-2xl font-semibold">Mon App</h2>
        </div>
        <nav className="flex-1 px-2 py-4">
          <a
            href="#"
            className="block px-4 py-2 mt-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-4 py-2 mt-2 text-sm font-medium text-white rounded-lg hover:bg-gray-600"
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 mt-2 text-sm font-medium text-white rounded-lg hover:bg-gray-600"
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 mt-2 text-sm font-medium text-white rounded-lg hover:bg-gray-600"
          >
            Logout
          </a>
        </nav>
      </div>
    );

}