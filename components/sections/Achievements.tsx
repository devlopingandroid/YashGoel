/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { achievementsData, Achievement } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import { X, Sparkles, Trophy, Maximize2, Calendar } from "lucide-react";

export const Achievements: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Split achievements into 2 distinct rows for dual marquee
  const halfLength = Math.ceil(achievementsData.length / 2);
  const row1 = achievementsData.slice(0, halfLength);
  const row2 = achievementsData.slice(halfLength);

  // Duplicate arrays to ensure seamless infinite looping without white space
  const marqueeRow1 = [...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2];

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedAchievement(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="achievements"
      className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40 overflow-hidden"
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <SectionBadge title="Key Achievements & Gallery" className="mb-0" />
        <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-muted bg-dark-surface/80 px-3 py-1 rounded-full border border-dark-border">
          <Sparkles className="w-3.5 h-3.5 text-accent-teal animate-pulse" />
          Click any card to expand
        </span>
      </div>

      {/* Dual Row Marquee Container */}
      <div className="relative w-full space-y-6 py-2 overflow-hidden">
        {/* Row 1: Left to Right Marquee */}
        <div className="relative w-full overflow-hidden group pause-on-hover">
          {/* Gradient Edge Blurs */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-dark-bg to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-dark-bg to-transparent z-20 pointer-events-none" />

          <div className="flex gap-5 w-max animate-marquee-right">
            {marqueeRow1.map((item, idx) => (
              <AchievementPosterCard
                key={`r1-${item.id}-${idx}`}
                item={item}
                onClick={() => setSelectedAchievement(item)}
              />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left Marquee */}
        <div className="relative w-full overflow-hidden group pause-on-hover">
          {/* Gradient Edge Blurs */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-dark-bg to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-dark-bg to-transparent z-20 pointer-events-none" />

          <div className="flex gap-5 w-max animate-marquee-left">
            {marqueeRow2.map((item, idx) => (
              <AchievementPosterCard
                key={`r2-${item.id}-${idx}`}
                item={item}
                onClick={() => setSelectedAchievement(item)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Click-to-Expand Image Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-b from-dark-surface to-dark-bg border-2 border-accent-teal/60 shadow-[0_0_50px_rgba(20,232,196,0.25)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 text-white hover:bg-accent-teal hover:text-dark-bg border border-white/20 transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Header */}
              <div className="relative w-full h-[280px] sm:h-[380px] overflow-hidden bg-black/50">
                <img
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  className="w-full h-full object-contain sm:object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent" />

                {/* Badge Tag on Image */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent-teal/20 text-accent-teal border border-accent-teal/40 backdrop-blur-md">
                    {selectedAchievement.tag}
                  </span>
                  {selectedAchievement.isHero && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-amber-300" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Body Info */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent-teal">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedAchievement.year}</span>
                    <span>•</span>
                    <span>{selectedAchievement.subtitle}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
                    {selectedAchievement.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {selectedAchievement.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface AchievementPosterCardProps {
  item: Achievement;
  onClick: () => void;
}

const AchievementPosterCard: React.FC<AchievementPosterCardProps> = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-[280px] sm:w-[340px] h-[200px] sm:h-[230px] rounded-2xl overflow-hidden cursor-pointer bg-dark-surface/80 border border-dark-border hover:border-accent-teal/70 shadow-lg hover:shadow-[0_0_30px_rgba(20,232,196,0.3)] transition-all duration-300 hover:scale-[1.03] shrink-0"
    >
      {/* Background Poster Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-dark-bg/40 to-transparent transition-opacity group-hover:opacity-90" />

      {/* Top Badge Tag */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-dark-bg/80 text-accent-teal border border-accent-teal/30 backdrop-blur-md">
          {item.tag}
        </span>
      </div>

      {/* Expand Icon Indicator on Hover */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-accent-teal text-dark-bg shadow-teal-glow">
        <Maximize2 className="w-3.5 h-3.5" />
      </div>

      {/* Bottom Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10 space-y-1">
        <div className="flex items-center gap-2 text-[11px] font-mono text-accent-teal">
          <span>{item.year}</span>
          <span>•</span>
          <span className="truncate">{item.subtitle}</span>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-primary tracking-tight line-clamp-1 group-hover:text-accent-teal transition-colors">
          {item.title}
        </h4>
      </div>
    </div>
  );
};

export default Achievements;
