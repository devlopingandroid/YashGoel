/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo, heroStats } from "@/data/portfolio-data";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  Briefcase,
  Code,
  Cpu,
  Award,
  ArrowRight,
  Mail,
  Terminal,
  Code2,
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
  icon: string;
  title: string;
  desc: string;
  badge: string;
}

const achievementCards: AchievementCard[] = [
  {
    id: "drdo",
    icon: "🏛",
    title: "DRDO Intern",
    desc: "Worked on real-world engineering projects",
    badge: "Defense R&D",
  },
  {
    id: "gemini",
    icon: "🤖",
    title: "Google Gemini Ambassador",
    desc: "Representing AI innovation initiatives",
    badge: "Campus AI Face",
  },
  {
    id: "patents",
    icon: "📜",
    title: "3 Published Patents",
    desc: "AI & Intelligent Systems Research",
    badge: "Govt. of India",
  },
  {
    id: "cyi",
    icon: "🏆",
    title: "IIT Delhi Top 100 Ideathon",
    desc: "National-level innovation recognition",
    badge: "CYI Finalist",
  },
  {
    id: "fullstack",
    icon: "💻",
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
      {/* 1. Subtle Futuristic Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(45,212,191,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.035)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_65%,transparent_100%)] pointer-events-none -z-10" />

      {/* 2. Soft Ambient Lighting & Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-accent-teal/15 via-emerald-500/8 to-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-accent-teal/8 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* 3. Floating Micro-particles / Glowing Ambient Dots */}
      <motion.div
        animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[15%] w-1.5 h-1.5 rounded-full bg-accent-teal/60 blur-[0.5px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{ y: [10, -10, 10], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-2/3 left-[25%] w-2 h-2 rounded-full bg-cyan-400/50 blur-[0.5px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{ y: [-15, 15, -15], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-[18%] w-1.5 h-1.5 rounded-full bg-emerald-400/60 blur-[0.5px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{ y: [12, -12, 12], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/4 right-[28%] w-2 h-2 rounded-full bg-accent-teal/40 blur-[0.5px] pointer-events-none -z-10"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Greeting, Name, Role, Description, Action Buttons, Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center"
        >
          {/* Greeting */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-mono text-sm md:text-base text-muted font-medium">
              {personalInfo.greeting}
            </span>
            <span className="w-8 h-[2px] bg-accent-teal/40" />
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary tracking-tight mb-3 leading-tight">
            {personalInfo.firstName}{" "}
            <span className="text-accent-teal relative inline-block">
              {personalInfo.lastName}.
              <span className="absolute bottom-1 left-0 right-0 h-1 bg-accent-teal/20 rounded-full" />
            </span>
          </h1>

          {/* Role Subtitle */}
          <h2 className="text-xl sm:text-2xl font-mono font-semibold text-accent-teal/90 mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-accent-teal inline" />
            <span>{personalInfo.role}</span>
          </h2>

          {/* Personal & Engineering-focused Description */}
          <p className="text-base sm:text-lg text-muted max-w-xl mb-8 leading-relaxed">
            {personalInfo.tagline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              View Projects
            </Button>

            <Button
              href="#contact"
              variant="outline"
              size="lg"
              icon={<Mail className="w-5 h-5" />}
            >
              Contact Me
            </Button>
          </div>

          {/* Horizontal Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-dark-border/80">
            {heroStats.map((stat) => (
              <Card
                key={stat.id}
                hoverGlow={true}
                className="p-4 flex flex-col items-start gap-1 bg-dark-surface/80 backdrop-blur-sm border-dark-border/60"
              >
                <div className="p-2 rounded-xl bg-accent-teal/10 border border-accent-teal/20 mb-1">
                  {getStatIcon(stat.iconName)}
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-primary">
                  {stat.number}
                </span>
                <span className="text-xs font-medium text-muted">
                  {stat.label}
                </span>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Developer Image (10-15% larger) + Ambient Aura + Dynamic Achievement Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center relative"
        >
          {/* Expanded Image Frame Container (~10-15% larger) */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[410px] md:h-[410px] lg:w-[440px] lg:h-[440px] flex items-center justify-center">
            {/* Smooth Ambient Gradient Aura Behind Developer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-teal/25 via-emerald-500/15 to-cyan-500/15 rounded-full blur-2xl opacity-75" />
            <div className="absolute -inset-4 rounded-full border border-accent-teal/15 animate-spin-slow" />

            {/* Developer Image Outer Container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-accent-teal/40 bg-gradient-to-b from-dark-surface/90 to-dark-bg/95 shadow-2xl group p-2.5 backdrop-blur-sm">
              <div className="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center bg-dark-bg/40">
                {/* Subtle depth vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 via-transparent to-transparent z-10 opacity-50 group-hover:opacity-25 transition-opacity pointer-events-none" />
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top scale-120 group-hover:scale-125 transition-transform duration-500 filter contrast-[1.03]"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallbackDiv = e.currentTarget.parentElement?.querySelector(
                      ".avatar-fallback"
                    ) as HTMLElement;
                    if (fallbackDiv) fallbackDiv.style.display = "flex";
                  }}
                />
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

            {/* Floating Top-Right Developer Status Code Chip */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-3 -right-2 sm:-right-6 z-20"
            >
              <Card className="p-3 shadow-2xl bg-dark-surface/90 border border-accent-teal/30 backdrop-blur-xl font-mono text-xs max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-dark-border/60 text-[10px] text-muted">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-auto text-accent-teal font-semibold">yash.ts</span>
                </div>
                <p className="text-muted">
                  <span className="text-purple-400">const</span> engineer = &#123;
                </p>
                <p className="pl-3 text-muted">
                  focus: <span className="text-accent-teal">&apos;AI & Systems&apos;</span>,
                </p>
                <p className="pl-3 text-muted">
                  status: <span className="text-yellow-300">&apos;shipping...&apos;</span>
                </p>
                <p className="text-muted">&#125;;</p>
              </Card>
            </motion.div>

            {/* Dynamic Rotating Achievement Card Bottom-Left */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-4 -left-2 sm:-left-8 z-20 min-w-[260px] sm:min-w-[290px] max-w-[320px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard.id}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Card className="p-3.5 sm:p-4 shadow-2xl bg-dark-surface/90 border border-accent-teal/40 backdrop-blur-xl flex items-center gap-3.5">
                    <div className="text-2xl p-2 rounded-xl bg-accent-teal/15 border border-accent-teal/30 shrink-0 flex items-center justify-center w-11 h-11">
                      {activeCard.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-xs font-bold text-primary truncate">
                          {activeCard.title}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-accent-teal/10 text-accent-teal border border-accent-teal/20 shrink-0">
                          {activeCard.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted leading-tight truncate">
                        {activeCard.desc}
                      </p>
                    </div>
                  </Card>
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
