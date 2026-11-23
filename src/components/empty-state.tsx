import Link from "next/link";
import { Aperture } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-muted">
        <Aperture className="size-7 text-brand" />
      </span>
      <h3 className="mt-4 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      <Button
        size="lg"
        className="mt-6"
        render={<Link href={href} />}
        nativeButton={false}
      >
        {label}
      </Button>
    </div>
  );
}
