/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, PanInfo, AnimatePresence } from "framer-motion";
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
  Award,
  X,
  ExternalLink,
} from "lucide-react";

const getThemeStyles = (theme?: "teal" | "blue" | "purple", isCenter?: boolean) => {
  switch (theme) {
    case "blue":
      return {
        cardBorder: isCenter
          ? "border-2 border-amber-500/80 bg-gradient-to-b from-dark-surface via-dark-surface to-amber-500/10 shadow-[0_10px_35px_rgba(217,119,6,0.18)]"
          : "border-amber-500/30 bg-dark-surface/90",
        badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
        icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
        textAccent: "text-amber-600 dark:text-amber-400",
        chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
      };
    case "purple":
      return {
        cardBorder: isCenter
          ? "border-2 border-stone-600/80 dark:border-stone-400/80 bg-gradient-to-b from-dark-surface via-dark-surface to-stone-500/10 shadow-[0_10px_35px_rgba(120,113,108,0.18)]"
          : "border-stone-400/30 bg-dark-surface/90",
        badge: "bg-stone-500/10 text-stone-700 dark:text-stone-300 border-stone-400/30",
        icon: <Activity className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />,
        textAccent: "text-stone-700 dark:text-stone-300",
        chip: "bg-stone-500/10 text-stone-700 dark:text-stone-300 border-stone-400/30",
      };
    case "teal":
    default:
      return {
        cardBorder: isCenter
          ? "border-2 border-accent-teal/80 bg-gradient-to-b from-dark-surface via-dark-surface to-accent-teal/15 shadow-[0_10px_35px_rgba(234,88,12,0.18)]"
          : "border-accent-teal/30 bg-dark-surface/90",
        badge: "bg-accent-teal/15 text-accent-teal border-accent-teal/30",
        icon: <Sparkles className="w-3.5 h-3.5 text-accent-teal" />,
        textAccent: "text-accent-teal",
        chip: "bg-accent-teal/10 text-accent-teal border-accent-teal/20",
      };
  }
};

export const Experience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<{
    role: string;
    company: string;
    certificateUrl: string;
  } | null>(null);

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
    if (isPaused || selectedCert) return;
    const timer = setInterval(() => {
      handleNext();
    }, 8500);
    return () => clearInterval(timer);
  }, [isPaused, selectedCert, handleNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="experience"
      className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <SectionBadge title="Work Experience" className="mb-0" />

        {/* Quick Company Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-dark-surface border border-dark-border self-start sm:self-auto overflow-x-auto shadow-sm">
          {experienceData.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                activeIndex === idx
                  ? "bg-accent-teal text-white shadow-sm font-bold"
                  : "text-muted hover:text-primary hover:bg-dark-border/30 font-medium"
              }`}
            >
              {item.company}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Coverflow Carousel Stage */}
      <div
        className="relative w-full max-w-6xl mx-auto min-h-[510px] sm:min-h-[540px] flex items-center justify-center py-4 overflow-hidden touch-pan-y"
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
          className="relative w-full h-[490px] sm:h-[520px] flex items-center justify-center overflow-hidden"
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
                  className={`p-5 sm:p-6 flex flex-col justify-between h-[480px] sm:h-[500px] transition-all duration-300 ${theme.cardBorder}`}
                >
                  {/* Top Project Highlight & Status Header Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-dark-border/40">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.projectHighlight && (
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${theme.badge}`}>
                          {theme.icon}
                          <span>{item.projectHighlight}</span>
                        </div>
                      )}
                      {item.current && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-accent-teal/15 text-accent-teal border border-accent-teal/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                          Most Recent
                        </span>
                      )}
                    </div>
                  </div>

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

                  {/* Tech Stack Chips & Footer Action Row */}
                  <div className="pt-2.5 border-t border-dark-border/40 space-y-2.5 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border ${theme.chip}`}
                        >
                          #{tech}
                        </span>
                      ))}
                    </div>

                    {item.certificateUrl && (
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-mono text-muted flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-accent-teal" />
                          <span>Verified Certificate</span>
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCert({
                              role: item.role,
                              company: item.company,
                              certificateUrl: item.certificateUrl!,
                            });
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-accent-teal text-white hover:bg-accent-teal-hover shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer shrink-0"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </button>
                      </div>
                    )}
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

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-dark-surface border border-dark-border rounded-2xl p-4 sm:p-6 overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-dark-border">
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-primary flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent-teal" />
                    <span>{selectedCert.role}</span>
                  </h3>
                  <p className="text-xs font-mono text-accent-teal mt-0.5">
                    {selectedCert.company} � Official Internship Certificate
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-lg bg-dark-border/50 text-muted hover:text-primary hover:bg-dark-border transition-colors"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image View */}
              <div className="relative max-h-[70vh] flex items-center justify-center overflow-auto rounded-xl bg-black/40 p-2 border border-dark-border/60">
                <img
                  src={selectedCert.certificateUrl}
                  alt={`${selectedCert.company} Certificate`}
                  className="max-h-[65vh] w-auto object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-dark-border">
                <span className="text-xs font-mono text-muted">
                  Verified Industry & Research Credential
                </span>
                <a
                  href={selectedCert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-accent-teal text-dark-surface hover:shadow-teal-glow transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Certificate</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;