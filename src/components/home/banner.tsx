"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const image = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600`;

const slides = [
  {
    title: "Your Next Shoot Deserves A Real Studio",
    text: "Cyc walls, strobe kits and blackout rooms, booked by the hour from the photographers who own them.",
    image: image(17094501),
  },
  {
    title: "Sound Stages Built For Your Story",
    text: "High-ceiling stages with green screens, lighting grids and drive-in access for crews of every size.",
    image: image(8089249),
  },
  {
    title: "Press Record, The Room Is Ready",
    text: "Treated podcast rooms and music suites with broadcast microphones, consoles and engineers on call.",
    image: image(7383469),
  },
];

export function Banner() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {slides.map((slide, index) => {
          // only the first slide is the page heading
          const Heading = index === 0 ? "h1" : "h2";
          return (
          <SwiperSlide key={slide.title}>
            <div className="relative flex h-[560px] w-full items-center md:h-[620px]">
              {/* Background */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/55" />

              {/* Hero content */}
              <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-12 text-center text-white">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/80">
                  Creative spaces by the hour
                </p>
                <Heading className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight md:text-6xl">
                  {slide.title}
                </Heading>
                <p className="mt-6 max-w-xl text-base text-white/90">
                  {slide.text}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/studios"
                    className="flex items-center gap-3 rounded-lg bg-[#c9ec4a] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#191a14] uppercase transition-colors hover:bg-[#b9dd35]"
                  >
                    Explore Studios
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/studios"
                    className="rounded-lg bg-white/25 px-7 py-3.5 text-sm font-semibold tracking-wide text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/35"
                  >
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
