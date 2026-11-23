import { headers } from "next/headers";
import MyBookingCard from "@/components/booking/MyBookingCard";
import { EmptyState } from "@/components/empty-state";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import type { IBooking } from "@/lib/types/booking";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${user?.email}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );
  const bookings: IBooking[] = res.ok ? await res.json() : [];

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          My Bookings
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Track the status of every studio you have reserved
        </p>
      </div>

      {/* Bookings List */}
      <div className="flex flex-col gap-6">
        {bookings.length === 0 && (
          <EmptyState
            title="You have no bookings yet"
            description="Find a studio you like and send your first booking request."
            href="/studios"
            label="Explore Studios"
          />
        )}

        {bookings.map((booking) => {
          return <MyBookingCard booking={booking} key={booking._id} />;
        })}
      </div>
    </main>
  );
};

export default MyBookingsPage;
