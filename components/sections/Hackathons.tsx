/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { hackathonsData } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import { ArrowRight, Trophy } from "lucide-react";

const getResultBadgeStyle = (result: string) => {
  switch (result) {
    case "Runner Up":
      return "bg-amber-500/20 text-amber-300 border-amber-500/40";
    case "Finalist":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
    case "Top 100":
      return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
    default:
      return "bg-accent-teal/20 text-accent-teal border-accent-teal/40";
  }
};

export const Hackathons: React.FC = () => {
  return (
    <section id="hackathons" className="py-16 md:py-24 border-t border-dark-border/40">
      {/* Header Row: Title on Left + "View All ->" Link on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
        <SectionBadge number="08." title="Hackathons" />
        <a
          href="#hackathons"
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-accent-teal hover:text-accent-teal-hover transition-colors group self-start sm:self-auto"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Grid of Photo Cards (4 per row desktop, 1 per row mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hackathonsData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="group cursor-pointer"
          >
            {/* Image Card Container */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-dark-surface border border-dark-border hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-teal-glow transition-all duration-300">
              {/* Photo Background with Zoom Hover Effect */}
              <img
                src={item.photo}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.parentElement?.querySelector(
                    ".hackathon-photo-fallback"
                  ) as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />

              {/* Photo Fallback Graphics */}
              <div className="hackathon-photo-fallback hidden absolute inset-0 bg-gradient-to-br from-dark-surface via-dark-bg to-accent-teal/10 flex-col items-center justify-center p-4 text-center">
                <Trophy className="w-12 h-12 text-accent-teal mb-2" />
                <span className="font-mono text-xs font-bold text-primary">
                  {item.name}
                </span>
              </div>

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent flex flex-col justify-end p-5 z-10">
                {/* Result Status & Year Line */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${getResultBadgeStyle(
                      item.result
                    )}`}
                  >
                    {item.result}
                  </span>
                  <span className="text-[10px] font-mono text-muted bg-dark-bg/80 px-2 py-0.5 rounded-md border border-dark-border/60">
                    {item.year}
                  </span>
                </div>

                {/* Hackathon Title */}
                <h3 className="text-base sm:text-lg font-extrabold text-primary group-hover:text-accent-teal transition-colors tracking-tight">
                  {item.name}
                </h3>

                {/* Optional Project Subtitle */}
                {item.projectTitle && (
                  <p className="text-xs font-mono text-muted/90 line-clamp-1 mt-0.5">
                    {item.projectTitle}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hackathons;
