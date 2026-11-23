import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">
      {/* Studio illustration: a camera on a tripod under a spotlight */}
      <svg viewBox="0 0 240 200" className="h-52 w-auto" aria-hidden="true">
        <path d="M120 12 L56 172 L184 172 Z" className="fill-brand/15" />
        <circle cx="120" cy="12" r="9" className="fill-brand" />
        <rect x="82" y="72" width="76" height="48" rx="9" className="fill-foreground" />
        <rect x="96" y="62" width="24" height="12" rx="3" className="fill-foreground" />
        <circle cx="120" cy="96" r="15" className="fill-background" />
        <circle cx="120" cy="96" r="7" className="fill-foreground" />
        <path
          d="M120 120 L96 186 M120 120 L144 186 M120 120 L120 186"
          strokeWidth="5"
          strokeLinecap="round"
          className="stroke-foreground"
        />
      </svg>

      <h1 className="mt-6 text-6xl font-bold tracking-tight text-foreground">
        404
      </h1>
      <p className="mt-3 text-xl font-semibold text-foreground">
        This set has been taken down
      </p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button
        size="lg"
        className="mt-8"
        render={<Link href="/" />}
        nativeButton={false}
      >
        <ArrowLeft />
        Return to Home
      </Button>
    </main>
  );
}
