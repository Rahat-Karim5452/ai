import { BadgeCheck, Headphones, ShieldCheck, Wrench } from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    description:
      "Every confirmed booking is covered for accidental damage to the property.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    description:
      "Hosts and creators sign in with a verified account before they list or book.",
  },
  {
    icon: Wrench,
    title: "Equipment Safety",
    description:
      "A security deposit and a clear equipment list keep the gear protected.",
  },
  {
    icon: Headphones,
    title: "24/7 Host Support",
    description:
      "Our support team is available before, during and after every session.",
  },
];

export function HostGuarantee() {
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Host Guarantee & Creator Support
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Peace of mind for everyone on both sides of the studio door
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item) => (
            <div
              key={item.title}
              className="h-full rounded-xl border border-border bg-card p-6"
            >
              <item.icon className="size-8 text-brand" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
