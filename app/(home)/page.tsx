import { getUser } from "@/lib/dal";

export default async function Home() {
  const user = await getUser();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-full justify-center text-wrap">
        {JSON.stringify(user)}
      </div>
    </section>
  );
}
