import { Aperture } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Aperture className="size-7 animate-spin" />
      </span>
      <p className="text-sm text-muted-foreground">Loading StudioSpace...</p>
    </main>
  );
}
