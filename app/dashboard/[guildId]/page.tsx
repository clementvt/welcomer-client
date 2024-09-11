export default function Page({ params }: { params: { guildId: string } }) {
    
  return <div>Guild Id: {params.guildId}</div>;
}
