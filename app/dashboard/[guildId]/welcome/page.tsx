import { getWelcomer } from "@/lib/dal";
import {createWelcomer} from "@lib/actions"
export default async function Page({
  params,
}: {
  params: { guildId: string };
}) {
  await createWelcomer(guildId, "", "")
  const welcomerParams = await getWelcomer(params.guildId);
  return JSON.stringify(welcomerParams);
}
