import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - StudioSpace",
};

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Make professional creative spaces affordable and easy to reach for every independent creator.",
  },
  {
    icon: Users,
    title: "Our Community",
    description:
      "Photographers, filmmakers, podcasters and musicians who share the rooms they love.",
  },
  {
    icon: Heart,
    title: "Our Promise",
    description:
      "Clear pricing, verified hosts and real support for every single booking.",
  },
];

export default function AboutPage() {
  return (
    <main className="w-full px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              About Us
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              StudioSpace started with a simple idea. Great studios sit empty
              for most of the week, while creators struggle to find a room for
              a few hours.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              So we built a peer-to-peer marketplace where hosts earn from the
              space they already own, and creators book exactly the hours they
              need: photo studios, sound stages, podcast rooms, music suites
              and art workshops.
            </p>
          </div>
          <div className="relative h-72 w-full overflow-hidden rounded-xl md:h-80">
            <Image
              src="https://images.pexels.com/photos/7513427/pexels-photo-7513427.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1000"
              alt="A film crew working inside a studio"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="h-full rounded-xl border border-border bg-card p-6"
            >
              <value.icon className="size-8 text-brand" />
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                {value.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
