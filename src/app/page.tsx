import Main from "@/components/page/Main";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ comp: string }>;
}) {
  const params = (await searchParams).comp;

  return <Main params={params} />;
}
