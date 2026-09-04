/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectCaseStudyDetail } from "@/data/case-studies-data";
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  Calendar,
  Users,
  Code2,
  CheckCircle2,
  Cpu,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import Button from "@/components/ui/Button";

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

interface CaseStudyHeroProps {
  project: ProjectCaseStudyDetail;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ project }) => {
  const scrollToArchitecture = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("architecture");
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative pt-6 md:pt-10 pb-12">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs text-muted hover:text-accent-teal bg-dark-surface/80 border border-dark-border hover:border-accent-teal/40 transition-all duration-200 group shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Breadcrumbs */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-muted/40" />
          <Link href="/#projects" className="hover:text-primary transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-muted/40" />
          <span className="text-accent-teal font-medium">{project.title}</span>
        </div>
      </div>

      {/* Hero Header Text */}
      <div className="max-w-4xl mb-8">
        {/* Category Pill & Status Badge */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent-teal/10 text-accent-teal border border-accent-teal/30">
            <Sparkles className="w-3.5 h-3.5" />
            {project.category}
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-dark-surface text-muted border border-dark-border">
            <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
            {project.status}
          </span>
        </div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight mb-4"
        >
          {project.title}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-muted leading-relaxed font-sans max-w-3xl mb-6"
        >
          {project.tagline}
        </motion.p>

        {/* Action Buttons: Live Demo, GitHub, View Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-3 sm:gap-4 flex-wrap"
        >
          {project.liveUrl && (
            <Button
              href={project.liveUrl}
              variant="primary"
              size="md"
              target="_blank"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Live Demo
            </Button>
          )}

          {project.githubUrl && (
            <Button
              href={project.githubUrl}
              variant="outline"
              size="md"
              target="_blank"
              icon={<GithubIcon className="w-4 h-4" />}
            >
              GitHub Repository
            </Button>
          )}

          <a
            href="#architecture"
            onClick={scrollToArchitecture}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-primary bg-dark-surface/80 hover:bg-dark-surface border border-dark-border hover:border-accent-teal/40 transition-all duration-200"
          >
            <Layers className="w-4 h-4 text-accent-teal" />
            <span>View Architecture</span>
          </a>
        </motion.div>
      </div>

      {/* Hero Cover Image with Dark Gradient Overlay (REUSING EXACT PROJECT CARD IMAGE) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-dark-border bg-dark-surface shadow-2xl group mb-10"
      >
        {/* Browser Mockup Header Bar */}
        <div className="bg-dark-bg/95 px-4 py-3 border-b border-dark-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>

          <div className="text-xs font-mono text-muted bg-dark-surface px-4 py-1 rounded-md border border-dark-border/60 truncate max-w-sm">
            https://{project.slug}.case-study.dev
          </div>

          <div className="text-[11px] font-mono text-accent-teal hidden sm:block">
            Production Release
          </div>
        </div>

        {/* Hero Image Viewport */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-dark-bg">
          <img
            src={project.heroImage}
            alt={`${project.title} Cover Mockup`}
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
          />

          {/* Dark Gradient Overlay for high-end contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent pointer-events-none" />

          {/* Floating Feature Highlights on Cover */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between gap-4 pointer-events-none">
            <div className="bg-dark-surface/90 backdrop-blur-md border border-dark-border/80 px-4 py-2.5 rounded-xl shadow-lg">
              <span className="text-[11px] font-mono text-muted uppercase tracking-wider block">
                Primary Stack
              </span>
              <span className="text-sm font-mono font-bold text-primary">
                {project.category}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-dark-surface/90 backdrop-blur-md border border-dark-border/80 px-4 py-2.5 rounded-xl shadow-lg">
              <ShieldCheck className="w-4 h-4 text-accent-teal" />
              <span className="text-xs font-mono text-primary font-medium">
                Verified Engineering Case Study
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid below Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
      >
        <div className="bg-dark-surface/80 border border-dark-border rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Duration</span>
            <Calendar className="w-4 h-4 text-accent-teal" />
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-primary">
            {project.quickStats.duration}
          </span>
        </div>

        <div className="bg-dark-surface/80 border border-dark-border rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Team</span>
            <Users className="w-4 h-4 text-accent-teal" />
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-primary">
            {project.quickStats.teamSize}
          </span>
        </div>

        <div className="bg-dark-surface/80 border border-dark-border rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Type</span>
            <Code2 className="w-4 h-4 text-accent-teal" />
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-primary truncate">
            {project.quickStats.projectType}
          </span>
        </div>

        <div className="bg-dark-surface/80 border border-dark-border rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Status</span>
            <CheckCircle2 className="w-4 h-4 text-accent-teal" />
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-primary">
            {project.quickStats.status}
          </span>
        </div>

        <div className="bg-dark-surface/80 border border-dark-border rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Tech Count</span>
            <Cpu className="w-4 h-4 text-accent-teal" />
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-accent-teal">
            {project.quickStats.techStackCount} Technologies
          </span>
        </div>

        <div className="bg-dark-surface/80 border border-dark-border rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Features</span>
            <Rocket className="w-4 h-4 text-accent-teal" />
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-accent-teal">
            {project.quickStats.featuresCount} Modules
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default CaseStudyHero;
