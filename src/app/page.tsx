"use client";

import Main from "@/components/page/Main";

export default function Home({
  searchParams,
}: {
  searchParams: { component: string };
}) {
  return <Main params={searchParams} />;
}
