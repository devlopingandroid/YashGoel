/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { projectsData, Project } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Button from "@/components/ui/Button";
import {
  ExternalLink,
  ArrowRight,
  Code2,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const getProjectSlug = (id: string, title: string) => {
  if (id.includes("budget-eagle") || title.toLowerCase().includes("budget")) return "budget-eagle";
  if (id.includes("streamify") || title.toLowerCase().includes("stream")) return "streamify";
  if (id.includes("skillforge") || title.toLowerCase().includes("skill")) return "skillforge";
  return id.replace("proj-", "");
};

// Subtle 3D Tilt Card with Cursor Spotlight Reflection
const ProjectCard3D: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const slug = getProjectSlug(project.id, project.title);
  const caseStudyUrl = `/projects/${slug}`;

  // Mouse position state for spotlight glow
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });

  // Framer motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft spring physics (moderate stiffness for refined, subtle motion)
  const springConfig = { damping: 25, stiffness: 180 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Maximum tilt angle clamped to +/- 4.5 degrees for premium Apple/Linear feel
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4.5deg", "-4.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4.5deg", "4.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
    setMousePos({ x: mouseX, y: mouseY, active: true });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="perspective-1000 flex flex-col h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl overflow-hidden bg-dark-surface/90 border border-dark-border/80 hover:border-accent-teal/40 transition-colors duration-300 flex flex-col justify-between h-full group shadow-lg hover:shadow-2xl"
      >
        {/* Dynamic Interactive Cursor Spotlight Glare */}
        {mousePos.active && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300 z-30"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 212, 191, 0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Ambient Top Edge Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-teal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

        <div className="relative z-10 flex flex-col flex-1">
          {/* Browser-Mockup Header Bar */}
          <div className="bg-dark-bg/95 px-4 py-2.5 border-b border-dark-border/70 flex items-center justify-between">
            {/* 3 Window Control Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 group-hover:bg-red-500 transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 group-hover:bg-green-500 transition-colors" />
            </div>

            {/* Browser URL bar snippet */}
            <div className="text-[10px] font-mono text-muted bg-dark-surface px-3 py-0.5 rounded-md border border-dark-border/50 truncate max-w-[140px] flex items-center gap-1">
              <span className="text-accent-teal/70">https://</span>
              <span>{project.title.toLowerCase().replace(/\s+/g, "")}.app</span>
            </div>
          </div>

          {/* Browser Screenshot Area - Clickable to Case Study with 3D Depth */}
          <Link
            href={caseStudyUrl}
            className="block relative aspect-video bg-dark-bg overflow-hidden border-b border-dark-border/70 group-hover:opacity-95 transition-opacity"
            style={{ transform: "translateZ(12px)" }}
          >
            {/* Category Tag Pill Top-Right */}
            <div className="absolute top-3 right-3 z-20 px-2.5 py-1 text-[11px] font-mono font-semibold bg-dark-surface/90 text-accent-teal border border-accent-teal/30 rounded-lg backdrop-blur-md shadow-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
              <span>{project.tag}</span>
            </div>

            {/* Image with fallback container */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.parentElement?.querySelector(
                  ".project-fallback"
                ) as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div className="project-fallback hidden absolute inset-0 bg-dark-surface flex-col items-center justify-center p-4 text-center border border-dark-border">
              <Code2 className="w-10 h-10 text-accent-teal/80 mb-2" />
              <span className="font-mono font-bold text-sm text-primary">
                {project.title}
              </span>
              <span className="text-[11px] text-muted font-mono mt-1">
                Project Preview
              </span>
            </div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity pointer-events-none" />
          </Link>

          {/* Card Content Body */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <Link href={caseStudyUrl} className="block group/title">
                <h3 className="text-xl font-bold text-primary group-hover/title:text-accent-teal transition-colors mb-2 flex items-center justify-between gap-2">
                  <span>{project.title}</span>
                  <ArrowRight className="w-4 h-4 text-muted group-hover/title:text-accent-teal group-hover/title:translate-x-1 transition-all shrink-0" />
                </h3>
              </Link>

              <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2 mb-4">
                {project.description}
              </p>
            </div>

            {/* Small Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.techBadges.map((badge, badgeIdx) => (
                <span
                  key={badgeIdx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-dark-bg/80 text-muted/90 border border-dark-border/70 group-hover:border-accent-teal/20 transition-colors"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="p-5 sm:p-6 pt-0 mt-auto flex flex-col gap-2.5 relative z-20">
          <Link
            href={caseStudyUrl}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-accent-teal/10 hover:bg-accent-teal text-accent-teal hover:text-dark-bg border border-accent-teal/30 hover:border-accent-teal transition-all duration-200 shadow-sm group/btn"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Explore Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                variant="ghost"
                size="sm"
                target="_blank"
                className="flex-1 text-xs justify-center border border-dark-border hover:border-accent-teal/30"
                icon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                Live Demo
              </Button>
            )}

            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                variant="ghost"
                size="sm"
                target="_blank"
                className="flex-1 text-xs justify-center border border-dark-border hover:border-accent-teal/30"
                icon={<FaGithub className="w-3.5 h-3.5" />}
              >
                GitHub
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40"
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <SectionBadge title="Featured Projects" />
        </div>
        <a
          href="#projects"
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-accent-teal hover:text-accent-teal-hover transition-colors group self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-teal" />
          <span>Case Studies & Architecture</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Grid of Interactive 3D Tilt Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projectsData.map((project, index) => (
          <ProjectCard3D key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
