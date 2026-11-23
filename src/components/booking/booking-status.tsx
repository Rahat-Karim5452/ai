import { cn } from "cn";
import type { BookingStatus } from "@/lib/types/booking";

const statusStyles: Record<BookingStatus, string> = {
  Pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  Confirmed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  Completed: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  Cancelled: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}
