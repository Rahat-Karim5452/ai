import { Suspense } from "react";
import { StudioCardsSkeleton } from "@/components/studio/studio-card";
import { StudioFilters } from "@/components/studio/studio-filters";
import { StudiosGrid } from "@/components/studio/studios-grid";
import type { IStudio } from "@/lib/types/studio";

async function Studios({
  category,
  search,
}: {
  category: string;
  search: string;
}) {
  const query = new URLSearchParams({ category, search });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios?${query}`,
    { cache: "no-store" },
  );
  const data: IStudio[] = res.ok ? await res.json() : [];

  return <StudiosGrid studios={data} />;
}

export default async function AllStudiosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; search?: string | string[] }>;
}) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : "";
  const search = typeof params.search === "string" ? params.search : "";
  // a new key makes the filters and the list start fresh for every search
  const key = `${category}-${search}`;

  return (
    <main className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Explore Studios
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Find the right creative space from every studio on StudioSpace
        </p>

        <StudioFilters key={key} category={category} search={search} />

        <div className="mt-8">
          <Suspense key={key} fallback={<StudioCardsSkeleton count={6} />}>
            <Studios category={category} search={search} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
