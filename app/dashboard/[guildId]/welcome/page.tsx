import { getWelcomer } from "@/lib/dal";

export default async function Page({
  params,
}: {
  params: { guildId: string };
    }) {
    const welcomerParams = await getWelcomer(params.guildId)
    return (
        JSON.stringify(welcomerParams)
    );
}