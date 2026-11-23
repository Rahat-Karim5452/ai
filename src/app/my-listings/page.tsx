import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { CirclePlus, MapPin, Pencil } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import DeleteStudioDialog from "@/components/studio/DeleteStudioDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import type { IStudio } from "@/lib/types/studio";

const MyListingsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-studios/${user?.email}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );
  const studios: IStudio[] = res.ok ? await res.json() : [];

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      {/* Header Section */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            My Studio Listings
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Update or remove the spaces you host
          </p>
        </div>
        <Button size="lg" render={<Link href="/add-studio" />} nativeButton={false}>
          <CirclePlus />
          Add New Studio
        </Button>
      </div>

      {/* Listings */}
      <div className="mt-8 flex flex-col gap-4">
        {studios.length === 0 && (
          <EmptyState
            title="You have no listings yet"
            description="Add your first studio and it will show up here with update and delete buttons."
            href="/add-studio"
            label="Add New Studio"
          />
        )}

        {studios.map((studio) => (
          <article
            key={studio._id}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-36">
              <Image
                src={studio.imageUrl}
                alt={studio.title}
                fill
                sizes="(max-width: 640px) 100vw, 144px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <Badge variant="secondary">{studio.category}</Badge>
              <h2 className="mt-2 truncate text-lg font-semibold text-foreground">
                {studio.title}
              </h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0" />
                <span className="truncate">{studio.location}</span>
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <p className="font-semibold text-foreground">
                ${studio.hourlyRate}
                <span className="text-xs font-normal text-muted-foreground">
                  {" "}
                  / hr
                </span>
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  render={<Link href={`/studios/edit/${studio._id}`} />}
                  nativeButton={false}
                >
                  <Pencil />
                  Update
                </Button>
                <DeleteStudioDialog id={studio._id} title={studio.title} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default MyListingsPage;
