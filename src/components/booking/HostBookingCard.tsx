"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { BookingStatusBadge } from "./booking-status";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { BookingStatus, IBooking } from "@/lib/types/booking";

// A booking request that a creator sent for one of my studios
const HostBookingCard = ({ booking }: { booking: IBooking }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStatus = async (status: BookingStatus) => {
    setLoading(true);
    try {
      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/${booking._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Could not update the booking");
        return;
      }

      toast.success(`Booking ${status.toLowerCase()}`);
      router.refresh();
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <BookingStatusBadge status={booking.status} />
        <h3 className="mt-2 truncate text-lg font-semibold text-foreground">
          {booking.studioTitle}
        </h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="size-4" />
            {booking.userName}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {booking.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {booking.startTime} - {booking.endTime}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:items-end">
        <p className="font-semibold text-foreground">${booking.totalPrice}</p>
        <div className="flex gap-2">
          {booking.status === "Pending" && (
            <>
              <Button
                variant="outline"
                size="lg"
                disabled={loading}
                onClick={() => handleStatus("Cancelled")}
              >
                Decline
              </Button>
              <Button
                size="lg"
                disabled={loading}
                onClick={() => handleStatus("Confirmed")}
              >
                Confirm
              </Button>
            </>
          )}
          {booking.status === "Confirmed" && (
            <Button
              variant="outline"
              size="lg"
              disabled={loading}
              onClick={() => handleStatus("Completed")}
            >
              Mark Completed
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default HostBookingCard;
