/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, PanInfo } from "framer-motion";
import { experienceData } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Activity,
} from "lucide-react";

const getThemeStyles = (theme?: "teal" | "blue" | "purple", isCenter?: boolean) => {
  switch (theme) {
    case "blue":
      return {
        cardBorder: isCenter
          ? "border-2 border-blue-500/80 bg-gradient-to-b from-dark-surface via-dark-surface to-blue-950/25 shadow-[0_0_35px_rgba(59,130,246,0.25)]"
          : "border-blue-500/30 bg-dark-surface/90",
        badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
        icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />,
        textAccent: "text-blue-400",
        chip: "bg-blue-950/40 text-blue-300 border-blue-500/30",
      };
    case "purple":
      return {
        cardBorder: isCenter
          ? "border-2 border-purple-500/80 bg-gradient-to-b from-dark-surface via-dark-surface to-purple-950/25 shadow-[0_0_35px_rgba(168,85,247,0.25)]"
          : "border-purple-500/30 bg-dark-surface/90",
        badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",
        icon: <Activity className="w-3.5 h-3.5 text-purple-400" />,
        textAccent: "text-purple-400",
        chip: "bg-purple-950/40 text-purple-300 border-purple-500/30",
      };
    case "teal":
    default:
      return {
        cardBorder: isCenter
          ? "border-2 border-accent-teal/80 bg-gradient-to-b from-dark-surface via-dark-surface to-accent-teal/15 shadow-[0_0_35px_rgba(20,232,196,0.25)]"
          : "border-accent-teal/30 bg-dark-surface/90",
        badge: "bg-accent-teal/15 text-accent-teal border-accent-teal/30",
        icon: <Sparkles className="w-3.5 h-3.5 text-accent-teal animate-pulse" />,
        textAccent: "text-accent-teal",
        chip: "bg-accent-teal/10 text-accent-teal border-accent-teal/20",
      };
  }
};

export const Experience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const total = experienceData.length;

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

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <section
      id="experience"
      className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40 overflow-hidden"
    >
      <SectionBadge title="Work Experience" className="mb-6" />

      {/* 3D Coverflow Carousel Stage */}
      <div
        className="relative w-full max-w-6xl mx-auto min-h-[460px] sm:min-h-[490px] flex items-center justify-center py-4 overflow-hidden touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Navigation Button */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-dark-surface/90 border border-dark-border text-primary hover:border-accent-teal hover:text-accent-teal hover:shadow-teal-glow backdrop-blur-md transition-all z-40 shadow-xl"
          aria-label="Previous Experience"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-dark-surface/90 border border-dark-border text-primary hover:border-accent-teal hover:text-accent-teal hover:shadow-teal-glow backdrop-blur-md transition-all z-40 shadow-xl"
          aria-label="Next Experience"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* 3D Stage */}
        <div
          className="relative w-full h-[440px] sm:h-[470px] flex items-center justify-center overflow-hidden"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {experienceData.map((item, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);

            const xStep = isMobile ? 120 : 270;
            const xOffset = offset * xStep;
            const scale = Math.max(0.65, 1 - absOffset * (isMobile ? 0.12 : 0.18));
            const rotateY = offset < 0 ? 30 : offset > 0 ? -30 : 0;
            const opacity = Math.max(0.15, 1 - absOffset * 0.4);
            const zIndex = 20 - absOffset;
            const isCenter = offset === 0;

            const theme = getThemeStyles(item.theme, isCenter);

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
                className={`absolute w-[295px] sm:w-[480px] md:w-[560px] cursor-pointer touch-pan-y ${
                  isCenter ? "cursor-grab active:cursor-grabbing" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Card
                  className={`p-5 sm:p-6 flex flex-col justify-between h-[430px] sm:h-[450px] transition-all duration-300 ${theme.cardBorder}`}
                >
                  {/* Top Project Highlight Banner */}
                  {item.projectHighlight && (
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-dark-border/40">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${theme.badge}`}>
                        {theme.icon}
                        <span>{item.projectHighlight}</span>
                      </div>
                      {item.current && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-accent-teal/20 text-accent-teal border border-accent-teal/40 shadow-teal-glow">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                          Most Recent
                        </span>
                      )}
                    </div>
                  )}

                  {/* Card Header: Role, Org Name, Logo */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-xl font-extrabold text-primary tracking-tight">
                        {item.role}
                      </h3>

                      <div className={`flex items-center gap-1.5 font-mono font-semibold text-xs sm:text-sm ${theme.textAccent}`}>
                        <Building2 className="w-4 h-4 shrink-0" />
                        <span>{item.company}</span>
                      </div>

                      {/* Metadata Row: Period & Location */}
                      <div className="flex items-center gap-3 text-xs font-mono text-muted flex-wrap pt-0.5">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-muted" />
                          <span>{item.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-muted" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Company Logo Badge */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1.5 border-2 border-accent-teal/40 flex items-center justify-center shrink-0 shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
                      {item.logoUrl ? (
                        <img
                          src={item.logoUrl}
                          alt={`${item.company} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.parentElement?.querySelector(
                              ".logo-fallback"
                            ) as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`logo-fallback ${
                          item.logoUrl ? "hidden" : "flex"
                        } items-center justify-center w-full h-full font-mono font-bold text-accent-teal text-xs`}
                      >
                        {item.company.substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Bullet Points with Strong Keyphrase Formatting */}
                  <ul className="space-y-2 mb-3 text-xs sm:text-sm text-muted leading-relaxed flex-1 overflow-y-auto pr-1 scrollbar-none">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${theme.textAccent}`} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-dark-border/40">
                    {item.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border ${theme.chip}`}
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {experienceData.map((item, idx) => (
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

export default Experience;
