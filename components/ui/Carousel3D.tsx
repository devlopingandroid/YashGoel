"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Carousel3DProps {
  children: React.ReactNode[];
  className?: string;
}

export const Carousel3D: React.FC<Carousel3DProps> = ({
  children,
  className = "",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 py-4">
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_45%] min-w-0 transition-transform duration-300"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-dark-surface/90 border border-dark-border text-primary hover:border-accent-teal hover:text-accent-teal backdrop-blur-md transition-all shadow-lg z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-dark-surface/90 border border-dark-border text-primary hover:border-accent-teal hover:text-accent-teal backdrop-blur-md transition-all shadow-lg z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Carousel3D;
