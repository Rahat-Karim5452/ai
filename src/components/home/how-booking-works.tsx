import { Clock, Search, Sparkles, Zap } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Discover Spaces",
    description:
      "Search studios by category and location, then compare hourly rates.",
  },
  {
    icon: Clock,
    title: "2. Select Shoot Hours",
    description:
      "Open a studio, pick your date and choose the start and end time.",
  },
  {
    icon: Zap,
    title: "3. Book Instantly",
    description:
      "Send your booking request in seconds with the full price shown upfront.",
  },
  {
    icon: Sparkles,
    title: "4. Create & Produce",
    description:
      "Arrive at a room that is ready for you and focus on your work.",
  },
];

export function HowBookingWorks() {
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          How Booking Works
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          From finding a space to starting your production in four simple steps
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="h-full rounded-xl border border-border bg-card p-6"
            >
              <span className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <step.icon className="size-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
