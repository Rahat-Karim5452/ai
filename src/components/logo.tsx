import Link from "next/link";
import { Aperture } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Aperture className="size-5" />
      </span>
      <span className="font-heading text-xl font-bold tracking-tight text-foreground">
        Studio<span className="text-brand">Space</span>
      </span>
    </Link>
  );
}
