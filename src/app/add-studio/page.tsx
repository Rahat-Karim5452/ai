import StudioForm from "@/components/studio/StudioForm";

export default function AddStudioPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Add New Studio
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          List your creative space and start receiving booking requests
        </p>

        <StudioForm />
      </div>
    </main>
  );
}
