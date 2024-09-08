import { getUserGuilds } from "@/lib/dto";

export default async function Page() {
    const guilds = await getUserGuilds();
    return (
        <div>{JSON.stringify(guilds)}</div>
    );
}