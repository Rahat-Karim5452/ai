"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function StudioGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      className="h-72 w-full overflow-hidden rounded-xl md:h-[420px]"
    >
      {images.map((src, index) => (
        <SwiperSlide key={`${src}-${index}`}>
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt={`${title} photo ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
