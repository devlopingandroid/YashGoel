/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { aboutData, personalInfo } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import {
  Server,
  Brain,
  Terminal,
  Rocket,
  ShieldCheck,
  Code2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const getSkillIcon = (iconName: string) => {
  switch (iconName) {
    case "Server":
      return <Server className="w-4 h-4 text-accent-teal" />;
    case "Brain":
      return <Brain className="w-4 h-4 text-accent-teal" />;
    case "Terminal":
      return <Terminal className="w-4 h-4 text-accent-teal" />;
    case "Rocket":
      return <Rocket className="w-4 h-4 text-accent-teal" />;
    default:
      return <Sparkles className="w-4 h-4 text-accent-teal" />;
  }
};

export const About: React.FC = () => {
  return (
    <section id="about" className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40">
      <SectionBadge title="About Me" className="mb-6" />

      {/* Main Grid: Left Details & Right Interactive Profile Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
        
        {/* Left Column: Impactful Title, 3 Short Paragraphs, Core Competencies, Proof Stats */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Header & Subtitle */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight leading-tight">
              {aboutData.heading}
            </h3>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full border border-accent-teal/20">
              <Sparkles className="w-3.5 h-3.5 text-accent-teal animate-pulse" />
              <span>{aboutData.subheading}</span>
            </div>
          </div>

          {/* 3 Short Impactful Bio Paragraphs */}
          <div className="space-y-3 text-muted text-sm sm:text-base leading-relaxed">
            {aboutData.paragraphs.map((paragraph, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent-teal shrink-0 mt-1" />
                <p className="font-normal text-primary/95">{paragraph}</p>
              </div>
            ))}
          </div>

          {/* Core Competencies (Skill-focused, replacing personality adjectives) */}
          <div className="pt-1">
            <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-accent-teal" />
              Core Competencies
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {aboutData.traits.map((trait) => (
                <div
                  key={trait.id}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-dark-surface/90 border border-dark-border hover:border-accent-teal/40 hover:shadow-teal-glow transition-all group"
                >
                  <div className="p-2 rounded-lg bg-accent-teal/10 group-hover:scale-110 transition-transform">
                    {getSkillIcon(trait.iconName)}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-primary tracking-tight">
                    {trait.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Proof-Backed Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {aboutData.stats.map((stat) => (
              <Card
                key={stat.id}
                hoverGlow={true}
                className={`p-3.5 text-center flex flex-col items-center justify-center gap-1 ${
                  stat.isHighlight
                    ? "border-accent-teal/70 bg-gradient-to-b from-dark-surface to-accent-teal/15 shadow-teal-glow"
                    : "bg-dark-surface/90 border-dark-border"
                }`}
              >
                <div className="flex items-center gap-1">
                  {stat.isHighlight && (
                    <ShieldCheck className="w-4 h-4 text-accent-teal animate-pulse" />
                  )}
                  <span
                    className={`text-xl sm:text-2xl font-extrabold font-mono ${
                      stat.isHighlight ? "text-accent-teal" : "text-primary"
                    }`}
                  >
                    {stat.number}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-muted leading-tight">
                  {stat.label}
                </span>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Rotating Ring Image & Mini Profile Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex flex-col items-center justify-center gap-6"
        >
          {/* Profile Image Frame with Slow Rotating Glow Ring & Ambient AI Grid */}
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
            
            {/* Ambient Warm Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-2xl" />

            {/* Outer Slow Rotating Architectural Ring */}
            <div className="absolute -inset-3 rounded-full border border-dashed border-orange-500/30 animate-spin-slow" />
            <div className="absolute -inset-6 rounded-full border border-orange-500/15" />

            {/* Circular Image Container */}
            <div className="relative w-full h-full rounded-full p-2 border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl shadow-stone-900/5 dark:shadow-black/40 overflow-hidden group">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img
                  src="/about.jpeg"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-[78%_55%] scale-110 group-hover:scale-115 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallbackDiv = e.currentTarget.parentElement?.querySelector(
                      ".about-avatar-fallback"
                    ) as HTMLElement;
                    if (fallbackDiv) fallbackDiv.style.display = "flex";
                  }}
                />
                <div className="about-avatar-fallback hidden absolute inset-0 bg-dark-surface flex-col items-center justify-center text-center p-6 border border-dark-border rounded-full">
                  <Code2 className="w-14 h-14 text-accent-teal mb-2" />
                  <span className="font-mono font-bold text-lg text-primary">
                    {personalInfo.name}
                  </span>
                  <span className="text-xs text-muted font-mono">
                    Software Engineer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

