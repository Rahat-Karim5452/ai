import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import StudioForm from "@/components/studio/StudioForm";
import { auth } from "@/lib/auth";
import type { IStudio } from "@/lib/types/studio";

const EditStudioPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studio/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) notFound();

  const studio: IStudio = await res.json();

  // only the host of this studio can open the update page
  if (studio.ownerEmail !== user?.email) redirect("/my-listings");

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Update Studio
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Change the details of your listing. Host name and email cannot be
          edited.
        </p>

        <StudioForm studio={studio} />
      </div>
    </main>
  );
};

export default EditStudioPage;
