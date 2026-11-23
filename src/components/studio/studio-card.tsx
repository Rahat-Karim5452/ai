import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { IStudio } from "@/lib/types/studio";

export function StudioCard({ studio }: { studio: IStudio }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Image */}
      <div className="relative h-52 w-full">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <Badge className="absolute top-3 left-3">{studio.category}</Badge>
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-background px-2 py-1 text-xs font-semibold text-foreground shadow-sm">
          <Star className="size-3 fill-brand text-brand" />
          {studio.rating ? studio.rating.toFixed(1) : "New"}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="truncate text-lg font-semibold text-foreground">
          {studio.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          <span className="truncate">{studio.location}</span>
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <p className="font-semibold text-foreground">
            ${studio.hourlyRate}
            <span className="text-xs font-normal text-muted-foreground">
              {" "}
              / hr
            </span>
          </p>
          <Button
            size="lg"
            render={<Link href={`/studios/${studio._id}`} />}
            nativeButton={false}
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}

// Loading placeholder with the same shape as the cards
export function StudioCardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border bg-card"
        >
          <Skeleton className="h-52 w-full rounded-none" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
