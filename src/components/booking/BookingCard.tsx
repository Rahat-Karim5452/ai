"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, Check } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { timeSlots } from "@/lib/constants";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IStudio } from "@/lib/types/studio";

const perks = [
  "Free cancellation while the booking is pending",
  "Liability protection included",
  "24/7 host support",
];

const initialForm = {
  date: "",
  startTime: "10:00",
  endTime: "13:00",
};

const BookingCard = ({ studio }: { studio: IStudio }) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  // "13:00" - "10:00" = 3 hours
  const hours =
    Number(form.endTime.slice(0, 2)) - Number(form.startTime.slice(0, 2));
  const total = hours > 0 ? hours * studio.hourlyRate : 0;

  const handleOpen = () => {
    if (!user) {
      toast.error("Please login to book this studio");
      router.push(`/login?redirect=/studios/${studio._id}`);
      return;
    }
    setOpen(true);
  };

  const handleBooking = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const today = new Date().toLocaleDateString("en-CA"); // 2026-01-31
    if (form.date < today) {
      toast.error("Please choose today or a future date");
      return;
    }
    if (hours < 1) {
      toast.error("End time must be after start time");
      return;
    }

    setLoading(true);
    try {
      const token = await getTokenFromClient();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studioId: studio._id, ...form }),
      });
      const bookingRes = await res.json();

      if (!res.ok) {
        toast.error(bookingRes.msg || "Could not book this studio");
        return;
      }

      toast.success("Booking request sent. Status: Pending");
      setOpen(false);
      router.push("/my-bookings");
      router.refresh();
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="h-fit rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">Hourly rate</p>
      <p className="mt-1 text-3xl font-semibold text-foreground">
        ${studio.hourlyRate}
        <span className="text-sm font-normal text-muted-foreground"> / hr</span>
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Security deposit: ${studio.securityDeposit} (refundable)
      </p>

      {/* disabled until we know if the user is logged in */}
      <Button
        size="lg"
        className="mt-4 w-full"
        disabled={isPending}
        onClick={handleOpen}
      >
        <CalendarCheck />
        Book Workspace Now
      </Button>

      <ul className="mt-5 space-y-3 border-t border-border pt-5">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Check className="size-4 shrink-0 text-brand" />
            {perk}
          </li>
        ))}
      </ul>

      {/* Host details */}
      <div className="mt-5 border-t border-border pt-5">
        <p className="text-xs text-muted-foreground">Hosted by</p>
        <div className="mt-3 flex items-center gap-3">
          <Avatar>
            <AvatarImage
              referrerPolicy="no-referrer"
              src={studio.ownerPhoto || undefined}
              alt={studio.ownerName}
            />
            <AvatarFallback>{studio.ownerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {studio.ownerName}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {studio.ownerEmail}
            </p>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book {studio.title}</DialogTitle>
            <DialogDescription>
              Choose your date and hours. The host will confirm your request.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBooking} className="grid gap-4">
            {/* Date */}
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(event) => update("date", event.target.value)}
                required
              />
            </div>

            {/* Start + End time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Time</Label>
                <Select
                  value={form.startTime}
                  onValueChange={(value) => update("startTime", value ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>End Time</Label>
                <Select
                  value={form.endTime}
                  onValueChange={(value) => update("endTime", value ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price */}
            <div className="rounded-lg bg-muted p-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>
                  ${studio.hourlyRate} x {hours > 0 ? hours : 0} hr
                </span>
                <span>${total}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold text-foreground">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Sending request..." : "Confirm Booking Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default BookingCard;
