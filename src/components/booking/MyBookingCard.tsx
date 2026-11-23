"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Eye, MapPin, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { BookingStatusBadge } from "./booking-status";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IBooking } from "@/lib/types/booking";

const MyBookingCard = ({ booking }: { booking: IBooking }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleCancelBooking = async () => {
    try {
      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}/cancel`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Could not cancel the booking");
        return;
      }

      toast.success("Booking cancelled");
      router.refresh();
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Card className="overflow-hidden py-0 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative h-48 w-full shrink-0 md:h-auto md:w-64">
          <Image
            src={booking.studioImage}
            alt={booking.studioTitle}
            fill
            sizes="(max-width: 768px) 100vw, 256px"
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
          {/* Top section: Status & Details */}
          <div>
            <BookingStatusBadge status={booking.status} />
            <h2 className="mt-3 text-2xl font-medium text-foreground">
              {booking.studioTitle}
            </h2>

            <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>Date: {booking.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span>
                  Time: {booking.startTime} - {booking.endTime} ({booking.hours}{" "}
                  hr)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <span>{booking.location}</span>
              </div>
            </div>

            <div className="mt-4 text-2xl font-medium text-foreground">
              ${booking.totalPrice}
            </div>
          </div>

          {/* Bottom section: Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            {booking.status === "Pending" && (
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger
                  render={
                    <Button variant="destructive" size="lg">
                      <XCircle />
                      Cancel Booking
                    </Button>
                  }
                />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your request for{" "}
                      <span className="font-medium text-foreground">
                        {booking.studioTitle}
                      </span>{" "}
                      on {booking.date} will be cancelled.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={handleCancelBooking}
                    >
                      Yes, cancel
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button
              size="lg"
              render={<Link href={`/studios/${booking.studioId}`} />}
              nativeButton={false}
            >
              <Eye />
              View Studio
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MyBookingCard;
