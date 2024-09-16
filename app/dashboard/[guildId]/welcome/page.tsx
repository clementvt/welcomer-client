import { createWelcomer } from "@/lib/actions";
import { getWelcomer } from "@/lib/dal";
export default async function Page({
  params,
}: {
  params: { guildId: string };
}) {
  await createWelcomer(params.guildId);
  const welcomerParams = await getWelcomer(params.guildId);

  return JSON.stringify(welcomerParams);
}
