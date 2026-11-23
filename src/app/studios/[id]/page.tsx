import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, Star, Users } from "lucide-react";
import BookingCard from "@/components/booking/BookingCard";
import { StudioGallery } from "@/components/studio/studio-gallery";
import { Badge } from "@/components/ui/badge";
import type { IStudio } from "@/lib/types/studio";

const StudioDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studio/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) notFound();

  const studio: IStudio = await res.json();
  const images = [studio.imageUrl, ...(studio.gallery ?? [])];
  const reviews = studio.reviews ?? [];

  const specifications = [
    { label: "Category", value: studio.category },
    { label: "Hourly Rate", value: `$${studio.hourlyRate} / hr` },
    { label: "Security Deposit", value: `$${studio.securityDeposit}` },
    { label: "Max Capacity", value: `${studio.maxCapacity} people` },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      {/* Back link */}
      <Link
        href="/studios"
        className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Studios
      </Link>

      {/* Gallery carousel */}
      <div className="mt-6">
        <StudioGallery images={images} title={studio.title} />
      </div>

      {/* Details */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <div>
          <Badge>{studio.category}</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {studio.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" />
              {studio.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              Up to {studio.maxCapacity} people
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-brand text-brand" />
              <span className="font-semibold text-foreground">
                {studio.rating ? studio.rating.toFixed(1) : "New"}
              </span>
              ({reviews.length} reviews)
            </span>
          </div>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            Overview
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {studio.overview}
          </p>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            Specifications
          </h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {specifications.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border bg-card p-3"
              >
                <dt className="text-xs text-muted-foreground">{item.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            Amenities
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {studio.amenities.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            Reviews
          </h2>
          {reviews.length > 0 ? (
            <ul className="mt-4 grid gap-3">
              {reviews.map((review, index) => (
                <li
                  key={index}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">
                      {review.name}
                    </p>
                    <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                      <Star className="size-4 fill-brand text-brand" />
                      {review.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              This studio has no reviews yet.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <BookingCard studio={studio} />
      </div>
    </main>
  );
};

export default StudioDetailsPage;
