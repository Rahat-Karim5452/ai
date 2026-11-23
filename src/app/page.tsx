import { Suspense } from "react";
import { Banner } from "@/components/home/banner";
import { Categories } from "@/components/home/categories";
import Featured, { FeaturedSkeleton } from "@/components/home/featured";
import { HostGuarantee } from "@/components/home/host-guarantee";
import { HowBookingWorks } from "@/components/home/how-booking-works";

export default function Home() {
  return (
    <main>
      <Banner />
      <Suspense fallback={<FeaturedSkeleton />}>
        <Featured />
      </Suspense>
      <Categories />
      <HowBookingWorks />
      <HostGuarantee />
    </main>
  );
}
