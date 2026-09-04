/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo, heroStats } from "@/data/portfolio-data";
import Button from "@/components/ui/Button";
import {
  Briefcase,
  Code,
  Cpu,
  Award,
  ArrowRight,
  Mail,
  Terminal,
  Code2,
  Building2,
  Sparkles,
  Trophy,
  Layers,
} from "lucide-react";

const getStatIcon = (iconName: string) => {
  switch (iconName) {
    case "Briefcase":
      return <Briefcase className="w-5 h-5 text-accent-teal" />;
    case "Code":
      return <Code className="w-5 h-5 text-accent-teal" />;
    case "Cpu":
      return <Cpu className="w-5 h-5 text-accent-teal" />;
    case "Award":
      return <Award className="w-5 h-5 text-accent-teal" />;
    default:
      return <Code className="w-5 h-5 text-accent-teal" />;
  }
};

interface AchievementCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge: string;
}

const achievementCards: AchievementCard[] = [
  {
    id: "drdo",
    icon: <Building2 className="w-5 h-5 text-accent-teal" />,
    title: "DRDO Intern",
    desc: "Worked on real-world engineering projects",
    badge: "Defense R&D",
  },
  {
    id: "gemini",
    icon: <Sparkles className="w-5 h-5 text-accent-teal" />,
    title: "Google Gemini Ambassador",
    desc: "Representing AI innovation initiatives",
    badge: "Campus AI Face",
  },
  {
    id: "patents",
    icon: <Award className="w-5 h-5 text-accent-teal" />,
    title: "4 Published Patents",
    desc: "AI & Intelligent Systems Research",
    badge: "Govt. of India",
  },
  {
    id: "cyi",
    icon: <Trophy className="w-5 h-5 text-accent-teal" />,
    title: "IIT Delhi Top 100 Ideathon",
    desc: "National-level innovation recognition",
    badge: "CYI Finalist",
  },
  {
    id: "fullstack",
    icon: <Layers className="w-5 h-5 text-accent-teal" />,
    title: "Full Stack Developer",
    desc: "Building scalable web applications",
    badge: "Next.js & AI",
  },
];

export const Hero: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Auto-rotate achievement card every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % achievementCards.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const activeCard = achievementCards[currentCardIndex];

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col justify-center py-12 lg:py-20 relative overflow-hidden"
    >
      {/* 1. Ultra-clean Subtle Architectural Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,113,108,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,113,108,0.06)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* 2. Soft Ambient Warm Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-orange-500/6 via-amber-500/4 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-orange-500/4 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* 3. Floating Micro-particles / Glowing Ambient Dots */}
      <motion.div
        animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[15%] w-1.5 h-1.5 rounded-full bg-accent-teal/50 blur-[0.5px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{ y: [10, -10, 10], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-2/3 left-[25%] w-2 h-2 rounded-full bg-amber-500/40 blur-[0.5px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{ y: [-15, 15, -15], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-[18%] w-1.5 h-1.5 rounded-full bg-orange-400/50 blur-[0.5px] pointer-events-none -z-10"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Greeting, Name, Role, Description, Action Buttons, Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center"
        >
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-mono text-accent-teal font-semibold mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
            <span>{personalInfo.greeting}</span>
          </div>

          {/* Name with Gradient Accent */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary tracking-tight mb-3 leading-tight">
            {personalInfo.firstName}{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent inline-block">
              {personalInfo.lastName}.
            </span>
          </h1>

          {/* Role Subtitle */}
          <h2 className="text-lg sm:text-xl font-mono font-medium text-muted mb-6 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent-teal inline" />
            <span className="text-primary font-bold">{personalInfo.role}</span>
          </h2>

          {/* Personal & Engineering-focused Description */}
          {personalInfo.tagline && (
            <p className="text-base sm:text-lg text-muted max-w-xl mb-8 leading-relaxed">
              {personalInfo.tagline}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold shadow-md shadow-orange-500/25 border-none px-6 py-3"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              View Projects
            </Button>

            <Button
              href="#contact"
              variant="outline"
              size="lg"
              className="bg-white/80 dark:bg-stone-900/80 hover:bg-white dark:hover:bg-stone-900 text-primary border border-stone-200/90 dark:border-stone-800 hover:border-orange-500/40 shadow-sm px-6 py-3 font-semibold"
              icon={<Mail className="w-4 h-4" />}
            >
              Contact Me
            </Button>
          </div>

          {/* Horizontal Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-stone-200/80 dark:border-stone-800/80">
            {heroStats.map((stat) => (
              <div
                key={stat.id}
                className="p-4 flex flex-col items-start gap-1 bg-white/80 dark:bg-stone-900/60 backdrop-blur-md border border-stone-200/80 dark:border-stone-800/80 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-500/30 transition-all group"
              >
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-accent-teal mb-1 group-hover:scale-110 transition-transform">
                  {getStatIcon(stat.iconName)}
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-primary">
                  {stat.number}
                </span>
                <span className="text-xs font-medium text-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Studio Portrait Card with Perfectly Blended Frame + Offset Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center relative py-6"
        >
          {/* Main Studio Frame Container */}
          <div className="relative w-72 h-[380px] sm:w-[320px] sm:h-[430px] md:w-[360px] md:h-[480px] lg:w-[390px] lg:h-[510px] flex items-end justify-center group">
            {/* Ambient Aura Behind Studio Card */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-orange-500/12 via-amber-500/6 to-transparent rounded-[2.75rem] blur-xl -z-10" />
            <div className="absolute -inset-3.5 rounded-[3rem] border border-orange-500/10 -z-10 pointer-events-none" />

            {/* Studio Card Canvas */}
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-stone-200/90 dark:border-stone-800 bg-gradient-to-b from-stone-50 via-orange-50/25 to-stone-100 dark:from-stone-900 dark:via-stone-900/90 dark:to-stone-950 shadow-xl shadow-stone-900/5 dark:shadow-black/40 flex flex-col justify-end">
              {/* Soft Radial Studio Spotlight */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(234,88,12,0.09),transparent_70%)] pointer-events-none" />

              {/* Developer Cutout Photo */}
              <div className="w-full h-[95%] relative flex items-end justify-center overflow-hidden">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-contain object-bottom scale-105 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] filter contrast-[1.02]"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallbackDiv = e.currentTarget.parentElement?.querySelector(
                      ".avatar-fallback"
                    ) as HTMLElement;
                    if (fallbackDiv) fallbackDiv.style.display = "flex";
                  }}
                />
                {/* Seamless Bottom Gradient Fade */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-stone-100/90 dark:from-stone-950/90 to-transparent pointer-events-none" />

                <div className="avatar-fallback hidden absolute inset-0 bg-dark-surface flex-col items-center justify-center text-center p-6 border border-dark-border rounded-full">
                  <Code2 className="w-16 h-16 text-accent-teal mb-3" />
                  <span className="font-mono font-bold text-xl text-primary">
                    {personalInfo.name}
                  </span>
                  <span className="text-xs text-muted font-mono mt-1">
                    Profile Image Placeholder
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Developer Status Code Chip (Offset Top-Left) */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -left-3 sm:-left-8 z-30"
            >
              <div className="p-3 bg-white/95 dark:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800 backdrop-blur-xl font-mono text-[11px] hidden sm:block rounded-2xl shadow-lg whitespace-nowrap">
                <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-stone-200/60 dark:border-stone-800 text-[10px] text-muted">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80" />
                  <span className="ml-auto text-accent-teal font-semibold text-[10px]">yash.ts</span>
                </div>
                <div className="space-y-0.5 leading-snug">
                  <p className="text-muted">
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">const</span> engineer = &#123;
                  </p>
                  <p className="pl-2.5 text-muted">
                    focus: <span className="text-accent-teal font-semibold">&apos;AI & Systems&apos;</span>,
                  </p>
                  <p className="pl-2.5 text-muted">
                    status: <span className="text-amber-600 dark:text-amber-300 font-semibold">&apos;shipping...&apos;</span>
                  </p>
                  <p className="text-muted">&#125;;</p>
                </div>
              </div>
            </motion.div>

            {/* Dynamic Rotating Achievement Card (Offset Bottom-Right) */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-4 -right-2 sm:-right-8 z-30 min-w-[250px] sm:min-w-[280px] max-w-[310px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard.id}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="p-3.5 bg-white/95 dark:bg-stone-900/95 border border-stone-200/90 dark:border-stone-800 backdrop-blur-xl rounded-2xl shadow-lg flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 shrink-0 flex items-center justify-center w-10 h-10 text-accent-teal">
                      {activeCard.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-xs font-bold text-primary truncate">
                          {activeCard.title}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-orange-500/10 text-accent-teal border border-orange-500/20 shrink-0 font-semibold">
                          {activeCard.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted leading-tight truncate">
                        {activeCard.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
