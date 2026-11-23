import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HostGuarantee } from "@/components/home/host-guarantee";
import { HowBookingWorks } from "@/components/home/how-booking-works";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How It Works - StudioSpace",
};

export default function HowItWorksPage() {
  return (
    <main>
      <section className="w-full px-6 pt-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            How It Works
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            StudioSpace connects creators with studio hosts. Creators send a
            booking request for the hours they need. The host confirms it, and
            a time slot that is already confirmed cannot be booked twice.
          </p>
        </div>
      </section>

      <HowBookingWorks />
      <HostGuarantee />

      <section className="w-full px-6 pb-4">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          <Button size="lg" render={<Link href="/studios" />} nativeButton={false}>
            Explore Studios
            <ArrowRight />
          </Button>
          <Button
            variant="outline"
            size="lg"
            render={<Link href="/add-studio" />}
            nativeButton={false}
          >
            Host Your Space
          </Button>
        </div>
      </section>
    </main>
  );
}
