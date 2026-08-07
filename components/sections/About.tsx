/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { aboutData, personalInfo } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import {
  Brain,
  Zap,
  Users,
  Compass,
  Infinity as InfinityIcon,
  Sparkles,
  Milestone,
  Code2,
} from "lucide-react";

const getTraitIcon = (iconName: string) => {
  switch (iconName) {
    case "Brain":
      return <Brain className="w-4 h-4 text-accent-teal" />;
    case "Zap":
      return <Zap className="w-4 h-4 text-accent-teal" />;
    case "Users":
      return <Users className="w-4 h-4 text-accent-teal" />;
    case "Compass":
      return <Compass className="w-4 h-4 text-accent-teal" />;
    default:
      return <Sparkles className="w-4 h-4 text-accent-teal" />;
  }
};

export const About: React.FC = () => {
  return (
    <section id="about" className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40">
      <SectionBadge title="About Me" className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        {/* Left Column: Bio Paragraphs, Trait Pills, & Highlight Stats */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold text-primary flex items-center gap-3">
            <span>{aboutData.heading}</span>
            <span className="h-[2px] w-12 bg-accent-teal/40" />
          </h3>

          {/* Paragraphs */}
          <div className="space-y-4 text-muted text-base sm:text-lg leading-relaxed">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* 2x2 Grid of Trait Pills */}
          <div className="pt-2">
            <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
              Core Mindset & Traits
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {aboutData.traits.map((trait) => (
                <div
                  key={trait.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-dark-surface/90 border border-dark-border hover:border-accent-teal/30 hover:shadow-teal-glow transition-all"
                >
                  <div className="p-1.5 rounded-lg bg-accent-teal/10">
                    {getTraitIcon(trait.iconName)}
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {trait.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stat Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {aboutData.stats.map((stat) => (
              <Card
                key={stat.id}
                hoverGlow={true}
                className={`p-4 text-center flex flex-col items-center justify-center gap-1 ${
                  stat.isHighlight
                    ? "border-accent-teal/60 bg-accent-teal/5 shadow-teal-glow"
                    : "bg-dark-surface/80"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {stat.isHighlight && (
                    <InfinityIcon className="w-5 h-5 text-accent-teal animate-pulse" />
                  )}
                  <span
                    className={`text-2xl sm:text-3xl font-extrabold font-mono ${
                      stat.isHighlight ? "text-accent-teal" : "text-primary"
                    }`}
                  >
                    {stat.number}
                  </span>
                </div>
                <span className="text-xs font-medium text-muted">
                  {stat.label}
                </span>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Mirrored Circular Glowing Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            {/* Mirrored Glowing Radial Gradient Blob */}
            <div className="absolute inset-0 bg-gradient-to-bl from-accent-teal/25 via-accent-teal/10 to-transparent rounded-full blur-2xl animate-pulse" />
            <div className="absolute -inset-4 rounded-full border border-accent-teal/20 animate-spin-slow" />

            {/* Circular Profile Frame */}
            <div className="relative w-full h-full rounded-full p-2 border-2 border-accent-teal/40 bg-dark-surface shadow-2xl overflow-hidden group">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
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

            {/* Floating Experience Badge */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 right-0 sm:-right-4 z-20"
            >
              <Card className="p-3 shadow-2xl bg-dark-surface/95 border border-accent-teal/30 backdrop-blur-md flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-accent-teal/20">
                  <Milestone className="w-5 h-5 text-accent-teal" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-primary">
                    Continuous Growth
                  </span>
                  <span className="block text-[11px] font-mono text-muted">
                    Always Coding & Learning
                  </span>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Horizontal "My Journey" Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 pt-8 border-t border-dark-border/60"
      >
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-xl font-bold text-primary flex items-center gap-2">
            <Milestone className="w-5 h-5 text-accent-teal" />
            <span>My Journey</span>
          </h4>
          <span className="text-xs font-mono text-muted hidden sm:block">
            Scroll horizontally →
          </span>
        </div>

        {/* Timeline Container with horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-6 pt-4 scrollbar-thin">
          <div className="min-w-[640px] px-4 relative">
            {/* Connecting Horizontal Line */}
            <div className="absolute top-7 left-8 right-8 h-[2px] bg-dark-border -z-0" />

            {/* Timeline Nodes */}
            <div className="grid grid-cols-4 gap-6 relative z-10">
              {aboutData.journey.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Year Tag Above Dot */}
                  <span className="text-xs font-mono font-bold text-accent-teal mb-2 bg-accent-teal/10 px-2.5 py-1 rounded-md border border-accent-teal/20">
                    {item.year}
                  </span>

                  {/* Timeline Dot */}
                  <div className="w-5 h-5 rounded-full bg-dark-bg border-2 border-accent-teal flex items-center justify-center my-1 group-hover:scale-125 transition-transform shadow-teal-glow">
                    <span className="w-2 h-2 rounded-full bg-accent-teal" />
                  </div>

                  {/* Milestone Card Below Dot */}
                  <Card className="mt-3 p-4 w-full text-left bg-dark-surface/90 border-dark-border group-hover:border-accent-teal/40 transition-colors">
                    <h5 className="text-sm font-bold text-primary mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
