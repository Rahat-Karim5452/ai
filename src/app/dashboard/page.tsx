import Link from "next/link";
import { headers } from "next/headers";
import { Building2, CalendarCheck, Inbox } from "lucide-react";
import HostBookingCard from "@/components/booking/HostBookingCard";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import type { IBooking } from "@/lib/types/booking";
import type { IStudio } from "@/lib/types/studio";

const DashboardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const token = await getTokenFromServer();
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store" as const,
  };
  const api = process.env.NEXT_PUBLIC_API_URL;

  // my studios, the bookings I made, and the requests other people sent me
  const [studiosRes, bookingsRes, requestsRes] = await Promise.all([
    fetch(`${api}/my-studios/${user?.email}`, options),
    fetch(`${api}/my-bookings/${user?.email}`, options),
    fetch(`${api}/host-bookings/${user?.email}`, options),
  ]);
  const studios: IStudio[] = studiosRes.ok ? await studiosRes.json() : [];
  const bookings: IBooking[] = bookingsRes.ok ? await bookingsRes.json() : [];
  const requests: IBooking[] = requestsRes.ok ? await requestsRes.json() : [];

  const stats = [
    {
      label: "My Studio Listings",
      value: studios.length,
      href: "/my-listings",
      icon: Building2,
    },
    {
      label: "My Bookings",
      value: bookings.length,
      href: "/my-bookings",
      icon: CalendarCheck,
    },
    {
      label: "Pending Requests",
      value: requests.filter((request) => request.status === "Pending").length,
      href: "/dashboard",
      icon: Inbox,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      {/* Header Section */}
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Welcome, {user?.name}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        An overview of your studios and reservations
      </p>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <stat.icon className="size-6 text-brand" />
            <p className="mt-3 text-3xl font-semibold text-foreground">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Requests for my studios */}
      <h2 className="mt-12 text-2xl font-semibold tracking-tight text-foreground">
        Booking Requests For My Studios
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Confirm or decline the requests creators send for your spaces
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {requests.length === 0 && (
          <p className="rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
            No one has requested your studios yet.
          </p>
        )}

        {requests.map((request) => (
          <HostBookingCard booking={request} key={request._id} />
        ))}
      </div>
    </main>
  );
};

export default DashboardPage;
