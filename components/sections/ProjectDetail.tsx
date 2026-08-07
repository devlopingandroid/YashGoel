/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  ExternalLink,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Code2,
  Rocket,
  AlertTriangle,
  Lightbulb,
  Compass,
  Layout,
  Terminal,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
} from "react-icons/si";

// Tab item definitions
const tabsList = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Features" },
  { id: "screenshots", label: "Screenshots" },
  { id: "challenges", label: "Challenges" },
  { id: "future-scope", label: "Future Scope" },
];

const renderTechIcon = (key: string) => {
  const iconProps = { className: "w-5 h-5" };
  switch (key) {
    case "SiReact":
      return <SiReact {...iconProps} style={{ color: "#61DAFB" }} />;
    case "SiNodedotjs":
      return <SiNodedotjs {...iconProps} style={{ color: "#5FA04E" }} />;
    case "SiMongodb":
      return <SiMongodb {...iconProps} style={{ color: "#47A248" }} />;
    case "SiExpress":
      return <SiExpress {...iconProps} style={{ color: "#FFFFFF" }} />;
    case "SiTailwindcss":
      return <SiTailwindcss {...iconProps} style={{ color: "#06B6D4" }} />;
    default:
      return <Code2 className="w-5 h-5 text-accent-teal" />;
  }
};

export const ProjectDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Select Budget Eagle project with case study data
  const project = projectsData.find((p) => p.caseStudy) || projectsData[0];
  const caseStudy = project.caseStudy;

  if (!caseStudy) return null;

  return (
    <section
      id="project-detail"
      className="py-16 md:py-24 border-t border-dark-border/40"
    >
      {/* Section Header */}
      <SectionBadge
        number="05b."
        title={`Case Study: ${project.title}`}
        className="mb-12"
      />

      {/* Main Container: Sidebar (Desktop vertical / Mobile horizontal) + Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar / Mobile Pill Row Navigation */}
        <div className="lg:col-span-3 w-full">
          {/* Desktop Vertical Sidebar */}
          <div className="hidden lg:flex flex-col bg-dark-surface/90 border border-dark-border rounded-2xl p-2 space-y-1 shadow-card-subtle">
            <span className="text-[11px] font-mono text-muted uppercase tracking-wider px-3 py-2">
              Case Study Navigation
            </span>
            {tabsList.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? "bg-accent-teal/10 text-accent-teal font-semibold border-l-4 border-accent-teal shadow-sm"
                      : "text-muted hover:text-primary hover:bg-dark-bg/50"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-teal shadow-teal-glow" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Horizontal Scrollable Pill Row */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin px-1">
            {tabsList.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all border ${
                    isActive
                      ? "bg-accent-teal text-dark-bg font-bold border-accent-teal shadow-sm"
                      : "bg-dark-surface text-muted border-dark-border hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Content Panel */}
        <div className="lg:col-span-9 w-full">
          <Card className="p-6 sm:p-8 bg-dark-surface/90 border-dark-border">
            {/* Top Bar: Title, Category Tags, & Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-dark-border/60">
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    {caseStudy.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-accent-teal/15 text-accent-teal border border-accent-teal/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs font-mono text-muted">
                  Detailed Architectural & Product Case Study
                </p>
              </div>

              {/* Top-Right Action Buttons */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                {project.liveUrl && (
                  <Button
                    href={project.liveUrl}
                    variant="outline"
                    size="sm"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Live Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    href={project.githubUrl}
                    variant="outline"
                    size="sm"
                    icon={<FaGithub className="w-4 h-4" />}
                  >
                    GitHub
                  </Button>
                )}
              </div>
            </div>

            {/* Dynamic Tab Content with Framer Motion Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* 1. OVERVIEW TAB */}
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    {/* Short Description */}
                    <p className="text-base text-muted leading-relaxed">
                      {caseStudy.overview.description}
                    </p>

                    {/* Horizontal Tech-Stack Icon Row */}
                    <div>
                      <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex items-center gap-3 flex-wrap">
                        {caseStudy.overview.techIcons.map((iconKey, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-dark-bg border border-dark-border hover:border-accent-teal/40 transition-colors shadow-sm flex items-center justify-center"
                          >
                            {renderTechIcon(iconKey)}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4-Column Stat Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {caseStudy.overview.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border text-center flex flex-col justify-center"
                        >
                          <span className="text-2xl font-extrabold font-mono text-accent-teal">
                            {stat.value}
                          </span>
                          <span className="text-xs font-medium text-muted mt-1">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Device-Mockup Image Area with Floating Stat Mini-Cards */}
                    <div className="relative rounded-2xl border-2 border-accent-teal/30 bg-dark-bg overflow-hidden shadow-2xl p-4 sm:p-6 group">
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-dark-border bg-dark-surface">
                        <img
                          src={caseStudy.overview.mockupImage}
                          alt="Dashboard Mockup"
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.parentElement?.querySelector(
                              ".case-mockup-fallback"
                            ) as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                        <div className="case-mockup-fallback hidden absolute inset-0 bg-dark-surface flex-col items-center justify-center p-6 text-center border border-dark-border">
                          <Layout className="w-12 h-12 text-accent-teal mb-3" />
                          <span className="font-mono font-bold text-lg text-primary">
                            Interactive Budget Dashboard Preview
                          </span>
                          <span className="text-xs text-muted font-mono mt-1">
                            Full Stack AI Finance Engine
                          </span>
                        </div>
                      </div>

                      {/* Floating Mini Card 1 (Top-Left) */}
                      <motion.div
                        animate={{ y: [-4, 4, -4] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute top-8 left-8 z-20 hidden sm:block"
                      >
                        <div className="p-3 rounded-xl bg-dark-surface/95 border border-accent-teal/40 backdrop-blur-md shadow-2xl flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-[11px] font-mono text-muted">
                              Monthly Savings
                            </span>
                            <span className="block text-sm font-bold font-mono text-accent-teal">
                              +$1,240
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Floating Mini Card 2 (Top-Right) */}
                      <motion.div
                        animate={{ y: [4, -4, 4] }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute top-8 right-8 z-20 hidden sm:block"
                      >
                        <div className="p-3 rounded-xl bg-dark-surface/95 border border-accent-teal/40 backdrop-blur-md shadow-2xl flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-accent-teal/20 text-accent-teal">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-[11px] font-mono text-muted">
                              Budget Health
                            </span>
                            <span className="block text-sm font-bold font-mono text-primary">
                              84% (Optimal)
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* 2. PROBLEM TAB */}
                {activeTab === "problem" && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-dark-bg/80 border border-dark-border">
                      <h4 className="text-sm font-mono text-accent-teal uppercase tracking-wider mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Problem Statement
                      </h4>
                      <p className="text-base text-primary leading-relaxed">
                        {caseStudy.problem.statement}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-dark-bg/80 border border-dark-border">
                      <h4 className="text-sm font-mono text-accent-teal uppercase tracking-wider mb-2">
                        Target Audience
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {caseStudy.problem.targetAudience}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-3">
                        Key Pain Points Solved
                      </h4>
                      <div className="space-y-3">
                        {caseStudy.problem.points.map((pt, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-dark-bg/50 border border-dark-border/80 flex items-start gap-3"
                          >
                            <CheckCircle2 className="w-5 h-5 text-accent-teal shrink-0 mt-0.5" />
                            <span className="text-sm text-muted leading-relaxed">
                              {pt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. TECH STACK TAB */}
                {activeTab === "tech-stack" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {caseStudy.techStack.map((stack, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-dark-bg/80 border border-dark-border hover:border-accent-teal/30 transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-base font-bold text-accent-teal mb-3 flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            {stack.category}
                          </h4>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {stack.technologies.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-dark-surface text-primary border border-dark-border"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted leading-relaxed pt-2 border-t border-dark-border/40">
                          {stack.details}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. ARCHITECTURE TAB */}
                {activeTab === "architecture" && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-dark-bg/80 border border-dark-border">
                      <h4 className="text-sm font-mono text-accent-teal uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        System Architecture Summary
                      </h4>
                      <p className="text-base text-primary leading-relaxed">
                        {caseStudy.architecture.summary}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-3">
                        Architectural Highlights
                      </h4>
                      <div className="space-y-3">
                        {caseStudy.architecture.highlights.map(
                          (highlight, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-dark-bg/50 border border-dark-border flex items-start gap-3"
                            >
                              <Cpu className="w-5 h-5 text-accent-teal shrink-0 mt-0.5" />
                              <span className="text-sm text-muted leading-relaxed">
                                {highlight}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. FEATURES TAB */}
                {activeTab === "features" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {caseStudy.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-dark-bg/80 border border-dark-border hover:border-accent-teal/30 transition-colors"
                      >
                        <div className="p-2 rounded-xl bg-accent-teal/10 w-fit mb-3">
                          <Rocket className="w-4 h-4 text-accent-teal" />
                        </div>
                        <h4 className="text-base font-bold text-primary mb-2">
                          {feat.title}
                        </h4>
                        <p className="text-xs text-muted leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 6. SCREENSHOTS TAB */}
                {activeTab === "screenshots" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {caseStudy.screenshots.map((screen, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-dark-border bg-dark-bg overflow-hidden"
                      >
                        <div className="aspect-video relative bg-dark-surface border-b border-dark-border">
                          <img
                            src={screen.image}
                            alt={screen.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fallback = e.currentTarget.parentElement?.querySelector(
                                ".screen-fallback"
                              ) as HTMLElement;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                          <div className="screen-fallback hidden absolute inset-0 bg-dark-surface flex-col items-center justify-center p-4 text-center">
                            <Code2 className="w-8 h-8 text-accent-teal mb-2" />
                            <span className="font-mono text-xs font-bold text-primary">
                              {screen.title}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h5 className="text-sm font-bold text-primary mb-1">
                            {screen.title}
                          </h5>
                          <p className="text-xs text-muted">{screen.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 7. CHALLENGES TAB */}
                {activeTab === "challenges" && (
                  <div className="space-y-6">
                    {caseStudy.challenges.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-dark-bg/80 border border-dark-border space-y-3"
                      >
                        <div className="flex items-start gap-3 text-red-400">
                          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-mono font-semibold uppercase text-red-400">
                              Challenge #{idx + 1}
                            </span>
                            <p className="text-sm font-semibold text-primary">
                              {item.challenge}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 text-accent-teal pt-2 border-t border-dark-border/40">
                          <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-mono font-semibold uppercase text-accent-teal">
                              Engineering Solution
                            </span>
                            <p className="text-xs text-muted leading-relaxed">
                              {item.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 8. FUTURE SCOPE TAB */}
                {activeTab === "future-scope" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-accent-teal" />
                      Future Roadmap & Enhancements
                    </h4>
                    <div className="space-y-3">
                      {caseStudy.futureScope.map((scope, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-dark-bg/80 border border-dark-border flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-accent-teal/15 text-accent-teal border border-accent-teal/30 flex items-center justify-center font-mono text-xs font-bold">
                            {idx + 1}
                          </div>
                          <span className="text-sm text-primary font-medium">
                            {scope}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
