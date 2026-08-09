/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryData } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Camera,
  Maximize2,
  Sparkles,
} from "lucide-react";

const galleryCategories = [
  "All",
  "Publications",
  "Internship",
  "Certificates",
  "Events",
] as const;

type GalleryFilter = (typeof galleryCategories)[number];

const ITEMS_PER_TAB = 4;

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryFilter>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  // Filter gallery array based on active tab
  const filteredGallery = galleryData.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  // Limit displayed items to 4 initially unless "View More" is toggled
  const displayedGallery = showAll
    ? filteredGallery
    : filteredGallery.slice(0, ITEMS_PER_TAB);

  const selectedItem =
    selectedIndex !== null ? filteredGallery[selectedIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === 0 ? filteredGallery.length - 1 : (prev as number) - 1
    );
  }, [selectedIndex, filteredGallery.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === filteredGallery.length - 1 ? 0 : (prev as number) + 1
    );
  }, [selectedIndex, filteredGallery.length]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <section
      id="gallery"
      className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <SectionBadge title="Photo Gallery & Publications" />
        <span className="text-xs font-mono text-muted flex items-center gap-1.5 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-accent-teal" />
          <span>
            Showing {displayedGallery.length} of {filteredGallery.length} in {activeCategory}
          </span>
        </span>
      </div>

      {/* Top Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-thin">
        {galleryCategories.map((cat) => {
          const isActive = activeCategory === cat;
          const count = galleryData.filter((item) =>
            cat === "All" ? true : item.category === cat
          ).length;

          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(null);
                setShowAll(false);
              }}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                isActive
                  ? "bg-accent-teal text-dark-bg font-bold border-accent-teal shadow-sm"
                  : "bg-dark-surface/90 text-muted border-dark-border hover:text-primary hover:border-accent-teal/40"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isActive
                    ? "bg-dark-bg/20 text-dark-bg font-extrabold"
                    : "bg-dark-bg text-muted/80"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bento / Masonry-style Photo Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]"
      >
        <AnimatePresence>
          {displayedGallery.map((item) => {
            // Find global index in filteredGallery for full lightbox navigation
            const realIndex = filteredGallery.findIndex((g) => g.id === item.id);

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedIndex(realIndex)}
                className={`relative rounded-2xl overflow-hidden bg-dark-surface border border-dark-border hover:border-accent-teal/50 hover:shadow-teal-glow transition-all duration-300 group cursor-pointer min-h-[220px] ${
                  item.spanClass || "col-span-1 row-span-1"
                }`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.parentElement?.querySelector(
                      ".gallery-image-fallback"
                    ) as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />

                {/* Image Fallback */}
                <div className="gallery-image-fallback hidden absolute inset-0 bg-gradient-to-br from-dark-surface via-dark-bg to-accent-teal/10 flex-col items-center justify-center p-4 text-center border border-dark-border">
                  <Camera className="w-10 h-10 text-accent-teal mb-2" />
                  <span className="font-mono text-xs font-bold text-primary">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-muted font-mono mt-1">
                    {item.category}
                  </span>
                </div>

                {/* Overlaid Bottom Gradient & Hover Captions */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-4 z-10">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-dark-bg/85 text-accent-teal border border-accent-teal/30">
                      {item.category}
                    </span>
                    <div className="p-1.5 rounded-lg bg-dark-bg/70 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-primary group-hover:text-accent-teal transition-colors leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted/90 line-clamp-1 mt-0.5 font-sans">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Expandable "View More" / "Show Less" Button */}
      {filteredGallery.length > ITEMS_PER_TAB && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-dark-surface/90 hover:bg-accent-teal/15 text-accent-teal border border-dark-border hover:border-accent-teal/50 font-mono text-xs sm:text-sm font-semibold transition-all duration-300 shadow-lg group hover:scale-[1.02]"
          >
            {showAll ? (
              <>
                <span>Show Less (Collapse)</span>
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </>
            ) : (
              <>
                <span>
                  View All {filteredGallery.length} Items (+{filteredGallery.length - ITEMS_PER_TAB} More)
                </span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Lightbox Modal with Prev/Next Navigation */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
              className="absolute inset-0 bg-dark-bg/90 backdrop-blur-md"
            />

            {/* Previous Photo Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-surface/90 border border-dark-border text-primary hover:border-accent-teal hover:text-accent-teal transition-colors z-50 shadow-xl"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Photo Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-surface/90 border border-dark-border text-primary hover:border-accent-teal hover:text-accent-teal transition-colors z-50 shadow-xl"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-dark-surface border border-accent-teal/40 rounded-3xl p-4 sm:p-6 shadow-2xl z-20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-4 pb-3 mb-3 border-b border-dark-border">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-accent-teal/20 text-accent-teal border border-accent-teal/30">
                    {selectedItem.category}
                  </span>
                  <span className="text-xs font-mono text-muted">
                    Photo {selectedIndex! + 1} of {filteredGallery.length}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedIndex(null)}
                  className="p-2 rounded-xl bg-dark-bg text-muted hover:text-primary hover:bg-dark-border/40 transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Photo Container */}
              <div className="relative aspect-[16/10] max-h-[65vh] bg-dark-bg rounded-2xl overflow-hidden border border-dark-border flex items-center justify-center mb-4">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.parentElement?.querySelector(
                      ".modal-photo-fallback"
                    ) as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="modal-photo-fallback hidden absolute inset-0 bg-dark-surface flex-col items-center justify-center p-6 text-center">
                  <Camera className="w-16 h-16 text-accent-teal mb-3" />
                  <span className="font-mono font-bold text-lg text-primary">
                    {selectedItem.title}
                  </span>
                  <span className="text-xs text-muted font-mono mt-1">
                    Photo Lightbox Preview
                  </span>
                </div>
              </div>

              {/* Modal Footer Caption */}
              <div className="px-2">
                <h3 className="text-base sm:text-lg font-bold text-primary mb-1">
                  {selectedItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {selectedItem.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
