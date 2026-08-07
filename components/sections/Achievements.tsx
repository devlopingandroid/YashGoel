"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, PanInfo } from "framer-motion";
import { achievementsData } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  ShieldCheck,
  Award,
  Medal,
  Sparkles,
} from "lucide-react";

const getAchievementIcon = (iconName: string, isHero?: boolean) => {
  const iconProps = {
    className: `w-8 h-8 ${isHero ? "text-accent-teal" : "text-accent-teal/90"}`,
  };

  switch (iconName) {
    case "Sparkles":
      return <Sparkles {...iconProps} />;
    case "ShieldCheck":
      return <ShieldCheck {...iconProps} />;
    case "Trophy":
      return <Trophy {...iconProps} />;
    case "Award":
      return <Award {...iconProps} />;
    case "Medal":
      return <Medal {...iconProps} />;
    default:
      return <Trophy {...iconProps} />;
  }
};

export const Achievements: React.FC = () => {
  // Start with Google Gemini Ambassador (index 0) or middle item as active center
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const total = achievementsData.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Handle Drag/Swipe End
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Autoplay functionality (slides every 4.5 seconds unless hovered)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <section
      id="achievements"
      className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40 overflow-hidden"
    >
      <SectionBadge title="Key Achievements" className="mb-6" />

      {/* 3D Coverflow Carousel Container */}
      <div
        className="relative w-full max-w-5xl mx-auto min-h-[380px] flex items-center justify-center py-4 overflow-hidden touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Navigation Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-dark-surface/90 border border-dark-border text-primary hover:border-accent-teal hover:text-accent-teal hover:shadow-teal-glow backdrop-blur-md transition-all z-40 shadow-xl"
          aria-label="Previous Achievement"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-dark-surface/90 border border-dark-border text-primary hover:border-accent-teal hover:text-accent-teal hover:shadow-teal-glow backdrop-blur-md transition-all z-40 shadow-xl"
          aria-label="Next Achievement"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* 3D Perspective Stage */}
        <div
          className="relative w-full h-[360px] flex items-center justify-center overflow-hidden"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {achievementsData.map((item, index) => {
            // Calculate distance offset relative to active center card
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);

            // Compute responsive 3D transformation values
            const xStep = isMobile ? 110 : 220;
            const xOffset = offset * xStep;
            const scale = Math.max(0.65, 1 - absOffset * (isMobile ? 0.12 : 0.18));
            const rotateY = offset < 0 ? 30 : offset > 0 ? -30 : 0;
            const opacity = Math.max(0.15, 1 - absOffset * 0.4);
            const zIndex = 20 - absOffset;
            const isCenter = offset === 0;

            return (
              <motion.div
                key={item.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                animate={{
                  x: xOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
                onClick={() => setActiveIndex(index)}
                className={`absolute w-[270px] sm:w-[340px] cursor-pointer touch-pan-y ${
                  isCenter ? "cursor-grab active:cursor-grabbing" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Card
                  className={`p-6 text-center flex flex-col items-center justify-between min-h-[340px] transition-colors duration-300 ${
                    item.isHero
                      ? "border-2 border-accent-teal/70 bg-gradient-to-b from-dark-surface via-dark-surface to-accent-teal/15 shadow-teal-glow"
                      : isCenter
                      ? "border-accent-teal/40 bg-dark-surface shadow-2xl"
                      : "border-dark-border bg-dark-surface/80"
                  }`}
                >
                  {/* Hero Badge Tag for Gemini Ambassador */}
                  {item.isHero && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-accent-teal/20 text-accent-teal border border-accent-teal/40 mb-2">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>Featured Ambassador</span>
                    </div>
                  )}

                  {/* Centered Achievement Badge Visual */}
                  <div
                    className={`w-20 h-20 rounded-3xl p-4 flex items-center justify-center my-3 transition-transform group-hover:scale-110 ${
                      item.isHero
                        ? "bg-accent-teal/20 border-2 border-accent-teal/60 shadow-teal-glow"
                        : "bg-dark-bg border border-accent-teal/30"
                    }`}
                  >
                    {getAchievementIcon(item.iconName, item.isHero)}
                  </div>

                  {/* Year Tag */}
                  <span className="text-xs font-mono font-bold text-accent-teal bg-accent-teal/10 px-2.5 py-0.5 rounded-md border border-accent-teal/20 mb-2">
                    {item.year}
                  </span>

                  {/* Title & Subtitle */}
                  <div>
                    <h3
                      className={`text-lg font-extrabold tracking-tight mb-1 ${
                        item.isHero ? "text-accent-teal" : "text-primary"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-muted">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Optional Short Description */}
                  {item.description && (
                    <p className="text-xs text-muted/80 leading-relaxed mt-3 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {achievementsData.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === idx
                ? "w-8 h-2.5 bg-accent-teal shadow-teal-glow"
                : "w-2.5 h-2.5 bg-dark-border hover:bg-muted"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Achievements;
