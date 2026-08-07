/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
} from "lucide-react";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40">
      <SectionBadge title="Work Experience" className="mb-6" />

      {/* Vertical Timeline Container */}
      <div className="relative pl-5 md:pl-8 space-y-8">
        {/* Continuous Vertical Timeline Line */}
        <div className="absolute top-3 bottom-3 left-2 md:left-3 w-[2px] bg-gradient-to-b from-accent-teal via-dark-border to-dark-border" />

        {experienceData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="relative"
          >
            {/* Timeline Node Dot */}
            <div className="absolute -left-[1.65rem] md:-left-[2.4rem] top-5 z-10">
              {item.current ? (
                <div className="relative flex items-center justify-center">
                  <span className="absolute -inset-1 rounded-full bg-accent-teal/40 animate-ping" />
                  <div className="w-3.5 h-3.5 rounded-full bg-accent-teal border-2 border-dark-bg shadow-teal-glow" />
                </div>
              ) : (
                <div className="w-3 h-3 rounded-full bg-dark-surface border-2 border-accent-teal/60" />
              )}
            </div>

            {/* Experience Card */}
            <Card
              className={`p-5 sm:p-6 bg-dark-surface/90 border-dark-border transition-all duration-300 ${
                item.current
                  ? "border-accent-teal/50 shadow-teal-glow"
                  : "hover:border-accent-teal/30"
              }`}
            >
              {/* Card Header: Role, Org Name, Logo (Top-Right), & Badges */}
              <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-3 mb-3 pb-3 border-b border-dark-border/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-bold text-primary tracking-tight">
                      {item.role}
                    </h3>
                    {item.current && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-accent-teal/15 text-accent-teal border border-accent-teal/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                        Present
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-accent-teal font-mono font-medium text-xs sm:text-sm">
                    <Building2 className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                    <span>{item.company}</span>
                  </div>

                  {/* Metadata Row: Period & Location */}
                  <div className="flex items-center gap-3 text-xs font-mono text-muted flex-wrap pt-0.5">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-accent-teal/80" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-accent-teal/80" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Company Logo Badge on Right Side */}
                <div className="w-10 h-10 rounded-xl bg-dark-bg border border-accent-teal/30 p-1.5 flex items-center justify-center shrink-0 shadow-sm self-start sm:self-auto">
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

              {/* Bullet Points */}
              <ul className="space-y-2 mb-4 text-xs sm:text-sm text-muted leading-relaxed">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-dark-border/40">
                {item.technologies.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="px-2 py-0.5 rounded-md bg-dark-bg text-[11px] font-mono font-medium text-accent-teal/90 border border-accent-teal/20"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
