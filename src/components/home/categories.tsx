import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Clapperboard,
  Mic,
  Palette,
  SlidersHorizontal,
} from "lucide-react";
import { categories } from "@/lib/constants";

// same order as the categories list
const icons = [Camera, Clapperboard, Mic, SlidersHorizontal, Palette];

export function Categories() {
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Browse By Studio Categories
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Pick the kind of room your next production needs
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => {
            const Icon = icons[index];
            return (
              <Link
                key={category.value}
                href={`/studios?category=${encodeURIComponent(category.value)}`}
                className="group relative h-56 overflow-hidden rounded-xl border border-border"
              >
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />
                <div className="absolute bottom-0 p-4 text-white">
                  <Icon className="size-6" />
                  <h3 className="mt-2 text-lg font-semibold">
                    {category.label}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
