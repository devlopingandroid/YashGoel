/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
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
  Sparkles,
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

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col justify-center py-12 lg:py-20 relative overflow-hidden"
    >
      {/* Background Subtle Glow Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-teal/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Greeting, Name, Role, Tagline, Action Buttons, Stats */}
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

          {/* Tagline */}
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

        {/* Right Column: Profile Image + Glowing Blob + Floating Decorative Chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center relative"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            {/* Glowing Teal Radial Gradient Blob */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-teal/30 via-accent-teal/10 to-transparent rounded-full blur-2xl animate-pulse" />
            <div className="absolute -inset-4 rounded-full border border-accent-teal/20 animate-spin-slow" />

            {/* Profile Image Container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-accent-teal/40 bg-dark-surface shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-30 transition-opacity" />
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback visual if placeholder image file is missing
                  e.currentTarget.style.display = "none";
                  const fallbackDiv = e.currentTarget.parentElement?.querySelector(
                    ".avatar-fallback"
                  ) as HTMLElement;
                  if (fallbackDiv) fallbackDiv.style.display = "flex";
                }}
              />
              <div className="avatar-fallback hidden absolute inset-0 bg-dark-surface flex-col items-center justify-center text-center p-6 border border-dark-border">
                <Code2 className="w-16 h-16 text-accent-teal mb-3" />
                <span className="font-mono font-bold text-xl text-primary">
                  {personalInfo.name}
                </span>
                <span className="text-xs text-muted font-mono mt-1">
                  Profile Image Placeholder
                </span>
              </div>
            </div>

            {/* Floating Code Snippet Chip Top-Right */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-4 sm:-right-8 z-20"
            >
              <Card className="p-3 shadow-2xl bg-dark-surface/95 border border-accent-teal/30 backdrop-blur-md font-mono text-xs max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-dark-border text-[10px] text-muted">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-auto text-accent-teal">developer.ts</span>
                </div>
                <p className="text-muted">
                  <span className="text-purple-400">const</span> dev = &#123;
                </p>
                <p className="pl-3 text-muted">
                  passion: <span className="text-accent-teal">&apos;building&apos;</span>,
                </p>
                <p className="pl-3 text-muted">
                  status: <span className="text-yellow-300">&apos;coding...&apos;</span>
                </p>
                <p className="text-muted">&#125;;</p>
              </Card>
            </motion.div>

            {/* Floating Icon Chip Bottom-Left */}
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-4 -left-4 sm:-left-8 z-20"
            >
              <Card className="p-3.5 shadow-2xl bg-dark-surface/95 border border-accent-teal/30 backdrop-blur-md flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent-teal/20 border border-accent-teal/40">
                  <Sparkles className="w-5 h-5 text-accent-teal" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-teal animate-ping" />
                    <span className="text-xs font-semibold text-primary">
                      Full-Stack & Algorithms
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-muted">
                    Open for Opportunities
                  </span>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
