import { EmptyState } from "@/components/empty-state";
import { StudioCard } from "@/components/studio/studio-card";
import type { IStudio } from "@/lib/types/studio";

export function StudiosGrid({ studios }: { studios: IStudio[] }) {
  if (studios.length === 0) {
    return (
      <EmptyState
        title="No studios found"
        description="Nothing matched your search. Try another word or choose a different category."
        href="/studios"
        label="Show All Studios"
      />
    );
  }

  return (
    <>
      {/* Count */}
      <p className="text-sm text-muted-foreground">
        Showing {studios.length} {studios.length === 1 ? "studio" : "studios"}
      </p>

      {/* Cards */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((studio) => (
          <StudioCard key={studio._id} studio={studio} />
        ))}
      </div>
    </>
  );
}
