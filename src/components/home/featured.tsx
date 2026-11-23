import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { StudioCard, StudioCardsSkeleton } from "@/components/studio/studio-card";
import type { IStudio } from "@/lib/types/studio";

async function getFeaturedStudios(): Promise<IStudio[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/featured-studios`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    // the server is not running
    return [];
  }
}

function FeaturedHeading() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Featured Studios
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Top rated creative spaces our community books again and again
        </p>
      </div>
      <Link
        href="/studios"
        className="flex items-center gap-1.5 text-sm font-semibold text-brand"
      >
        View all studios
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <FeaturedHeading />
        <div className="mt-8">
          <StudioCardsSkeleton count={6} />
        </div>
      </div>
    </section>
  );
}

const Featured = async () => {
  const studios = await getFeaturedStudios();

  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <FeaturedHeading />

        <div className="mt-8">
          {studios.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <StudioCard key={studio._id} studio={studio} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No studios yet"
              description="Be the first host to list a creative space on StudioSpace."
              href="/add-studio"
              label="Add New Studio"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Featured;
