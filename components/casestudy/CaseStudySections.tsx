/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProjectCaseStudyDetail, caseStudiesData } from "@/data/case-studies-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Button from "@/components/ui/Button";
import CodeSnippetViewer from "./CodeSnippetViewer";
import LightboxModal from "./LightboxModal";
import {
  Layout,
  AlertCircle,
  Layers,
  Cpu,
  ShieldCheck,
  Rocket,
  GitMerge,
  BookOpen,
  Sparkles,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Brain,
  Terminal,
  Database,
  Server,
  Lock,
  Printer,
  ZoomIn,
} from "lucide-react";

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

interface CaseStudySectionsProps {
  project: ProjectCaseStudyDetail;
}

export const CaseStudySections: React.FC<CaseStudySectionsProps> = ({ project }) => {
  // Lightbox Modal state
  const [selectedImage, setSelectedImage] = useState<{
    image: string;
    title: string;
    caption?: string;
    viewType?: string;
  } | null>(null);

  // Determine previous and next projects for footer navigation
  const projectSlugs = Object.keys(caseStudiesData);
  const currentIndex = projectSlugs.indexOf(project.slug);
  const prevSlug =
    currentIndex > 0 ? projectSlugs[currentIndex - 1] : projectSlugs[projectSlugs.length - 1];
  const nextSlug =
    currentIndex < projectSlugs.length - 1 ? projectSlugs[currentIndex + 1] : projectSlugs[0];

  const prevProject = caseStudiesData[prevSlug];
  const nextProject = caseStudiesData[nextSlug];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Lightbox Preview Modal */}
      <LightboxModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage?.image || ""}
        title={selectedImage?.title || ""}
        caption={selectedImage?.caption}
        viewType={selectedImage?.viewType}
      />

      {/* ========================================================
          SECTION 1: PROJECT OVERVIEW
      ======================================================== */}
      <section id="overview" className="scroll-mt-24">
        <SectionBadge title="01. Project Overview" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            Executive Summary & Vision
          </h2>

          <p className="text-base sm:text-lg text-primary/90 leading-relaxed mb-8">
            {project.overview.whatIsIt}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark-bg/80 border border-dark-border/80 rounded-xl p-5">
              <span className="text-xs font-mono font-semibold text-accent-teal uppercase tracking-wider block mb-2">
                Why It Was Created
              </span>
              <p className="text-sm text-muted leading-relaxed">
                {project.overview.whyCreated}
              </p>
            </div>

            <div className="bg-dark-bg/80 border border-dark-border/80 rounded-xl p-5">
              <span className="text-xs font-mono font-semibold text-accent-teal uppercase tracking-wider block mb-2">
                Target Audience & Users
              </span>
              <p className="text-sm text-muted leading-relaxed">
                {project.overview.targetAudience}
              </p>
            </div>
          </div>

          <div className="bg-dark-bg/60 border-l-4 border-accent-teal rounded-r-xl p-5 mb-8">
            <span className="text-xs font-mono text-accent-teal uppercase tracking-wider block mb-1">
              Real-World Problem Solved
            </span>
            <p className="text-sm sm:text-base text-primary/95 font-medium">
              {project.overview.problemSolved}
            </p>
          </div>

          {/* Core Product Pillars */}
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-teal" />
            <span>Core Engineering Pillars</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.overview.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-dark-bg/80 border border-dark-border/60 hover:border-accent-teal/40 rounded-xl p-5 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-accent-teal/10 border border-accent-teal/30 flex items-center justify-center text-accent-teal mb-3">
                  {pillar.icon === "Brain" && <Brain className="w-5 h-5" />}
                  {pillar.icon === "TrendingUp" && <TrendingUp className="w-5 h-5" />}
                  {pillar.icon === "ShieldCheck" && <ShieldCheck className="w-5 h-5" />}
                  {pillar.icon === "Rocket" && <Rocket className="w-5 h-5" />}
                  {pillar.icon === "Terminal" && <Terminal className="w-5 h-5" />}
                  {pillar.icon === "Server" && <Server className="w-5 h-5" />}
                </div>
                <h4 className="text-base font-bold text-primary mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: PROBLEM ANALYSIS
      ======================================================== */}
      <section id="problem-analysis" className="scroll-mt-24">
        <SectionBadge title="02. Problem Analysis" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            User Pain Points & Discovery
          </h2>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">
                  Core Observed Bottleneck
                </span>
                <p className="text-sm sm:text-base text-primary/95">
                  {project.problemAnalysis.observedIssue}
                </p>
              </div>
            </div>
          </div>

          {/* User Pain Points Cards */}
          <h3 className="text-lg font-bold text-primary mb-4">
            Direct User Pain Points & Impacts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {project.problemAnalysis.painPoints.map((item, idx) => (
              <div
                key={idx}
                className="bg-dark-bg/80 border border-dark-border/80 rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-red-400 uppercase tracking-wider block mb-1">
                    Pain #{idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-primary mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted mb-4 leading-relaxed">
                    {item.pain}
                  </p>
                </div>
                <div className="bg-dark-surface p-3 rounded-lg border border-dark-border/60">
                  <span className="text-[11px] font-mono text-accent-teal block mb-0.5">
                    User Impact:
                  </span>
                  <span className="text-xs text-primary/80 font-medium">
                    {item.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Flaws in Existing Solutions */}
          <h3 className="text-lg font-bold text-primary mb-4">
            Why Existing Solutions Were Insufficient
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {project.problemAnalysis.existingGaps.map((gap, idx) => (
              <div
                key={idx}
                className="bg-dark-bg/60 border border-dark-border/60 rounded-xl p-4"
              >
                <span className="text-xs font-mono font-bold text-yellow-400 block mb-1">
                  ✕ {gap.flaw}
                </span>
                <p className="text-xs text-muted leading-relaxed">
                  {gap.description}
                </p>
              </div>
            ))}
          </div>

          {/* Research & Validated Assumptions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-dark-border">
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-accent-teal mb-3">
                Pre-Development Research
              </h4>
              <ul className="space-y-2.5">
                {project.problemAnalysis.preDevResearch.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                    <span className="text-accent-teal font-mono font-bold shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-accent-teal mb-3">
                Validated Engineering Assumptions
              </h4>
              <ul className="space-y-2.5">
                {project.problemAnalysis.validatedAssumptions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                    <CheckCircle2 className="w-4 h-4 text-accent-teal shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: SOLUTION APPROACH
      ======================================================== */}
      <section id="solution-approach" className="scroll-mt-24">
        <SectionBadge title="03. Solution Approach" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            System Strategy & Decision Matrix
          </h2>

          <p className="text-base sm:text-lg text-primary/90 leading-relaxed mb-8">
            {project.solutionApproach.methodology}
          </p>

          {/* Tech Rationale Table */}
          <h3 className="text-lg font-bold text-primary mb-4">
            Architectural Trade-offs & Tech Rationale
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-dark-border text-left rounded-xl overflow-hidden">
              <thead className="bg-dark-bg/90 text-xs font-mono text-muted uppercase">
                <tr>
                  <th className="p-3.5 border-b border-dark-border">Selected Technology</th>
                  <th className="p-3.5 border-b border-dark-border">Alternative Considered</th>
                  <th className="p-3.5 border-b border-dark-border">Engineering Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border text-xs sm:text-sm">
                {project.solutionApproach.techRationale.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 font-bold font-mono text-accent-teal whitespace-nowrap">
                      {row.technology}
                    </td>
                    <td className="p-3.5 text-muted line-through decoration-red-400/50">
                      {row.alternativeConsidered}
                    </td>
                    <td className="p-3.5 text-primary/90 leading-relaxed">
                      {row.reasonForChoice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* System Evolution Stages */}
          <h3 className="text-lg font-bold text-primary mb-4">
            System Evolution & Iterative Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {project.solutionApproach.systemEvolution.map((stage, idx) => (
              <div
                key={idx}
                className="bg-dark-bg/80 border border-dark-border/80 rounded-xl p-5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 px-3 py-1 bg-accent-teal/10 text-accent-teal text-[10px] font-mono rounded-bl-xl border-l border-b border-accent-teal/20">
                  {stage.phase}
                </div>
                <h4 className="text-sm font-bold text-primary mb-2 mt-2">
                  {stage.title}
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

          {/* UX Strategy */}
          <h3 className="text-lg font-bold text-primary mb-3">
            User Experience Engineering
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.solutionApproach.uxStrategy.map((ux, idx) => (
              <div key={idx} className="bg-dark-bg/60 border border-dark-border/60 rounded-xl p-4">
                <span className="text-xs font-mono font-bold text-accent-teal block mb-1">
                  {ux.aspect}
                </span>
                <p className="text-xs text-muted leading-relaxed">
                  {ux.implementation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: SYSTEM ARCHITECTURE
      ======================================================== */}
      <section id="architecture" className="scroll-mt-24">
        <SectionBadge title="04. System Architecture" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            Multi-Tier Architecture & Data Pipeline
          </h2>

          <p className="text-base text-muted leading-relaxed mb-8">
            {project.architecture.summary}
          </p>

          {/* Visual Architecture Layers (Interactive Cards) */}
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent-teal" />
            <span>Architectural Layers & Subsystems</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {project.architecture.layers.map((layer, idx) => (
              <div
                key={layer.id}
                className="bg-dark-bg/90 border border-dark-border hover:border-accent-teal/40 rounded-xl p-6 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-teal/10 border border-accent-teal/30 flex items-center justify-center text-accent-teal">
                        {layer.icon === "Layout" && <Layout className="w-4 h-4" />}
                        {layer.icon === "ShieldCheck" && <ShieldCheck className="w-4 h-4" />}
                        {layer.icon === "Cpu" && <Cpu className="w-4 h-4" />}
                        {layer.icon === "Database" && <Database className="w-4 h-4" />}
                        {layer.icon === "Terminal" && <Terminal className="w-4 h-4" />}
                        {layer.icon === "Server" && <Server className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                          Layer 0{idx + 1}
                        </span>
                        <h4 className="text-base font-bold text-primary group-hover:text-accent-teal transition-colors">
                          {layer.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                    {layer.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-dark-border/60">
                  {layer.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-dark-surface text-accent-teal border border-dark-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* End-to-End Data Flow Sequence */}
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-accent-teal" />
            <span>End-to-End Request Data Lifecycle</span>
          </h3>

          <div className="space-y-3 mb-8">
            {project.architecture.dataFlow.map((flow) => (
              <div
                key={flow.step}
                className="bg-dark-bg/70 border border-dark-border/80 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-accent-teal/15 text-accent-teal font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-accent-teal/30">
                  {flow.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono font-bold text-accent-teal">
                      [{flow.actor}]
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {flow.action}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {flow.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Code Snippet */}
          {project.architecture.codeSnippet && (
            <div>
              <h3 className="text-base font-bold text-primary mb-2">
                Core Architecture Implementation
              </h3>
              <CodeSnippetViewer
                title={project.architecture.codeSnippet.title}
                filename={project.architecture.codeSnippet.filename}
                language={project.architecture.codeSnippet.language}
                code={project.architecture.codeSnippet.code}
              />
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION 5: TECH STACK
      ======================================================== */}
      <section id="tech-stack" className="scroll-mt-24">
        <SectionBadge title="05. Tech Stack Matrix" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            Comprehensive Technology Breakdown
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
            Every library and framework was deliberately chosen for performance, type safety, and maintainability.
          </p>

          <div className="space-y-6">
            {project.techStack.map((categoryGroup, idx) => (
              <div
                key={idx}
                className="bg-dark-bg/80 border border-dark-border rounded-xl p-5 sm:p-6"
              >
                <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-dark-border/60">
                  <Cpu className="w-4 h-4 text-accent-teal" />
                  <h3 className="text-base font-bold font-mono text-primary">
                    {categoryGroup.category} Layer
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryGroup.technologies.map((tech, techIdx) => (
                    <div
                      key={techIdx}
                      className="bg-dark-surface/90 border border-dark-border/60 hover:border-accent-teal/30 rounded-lg p-4 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className="font-bold text-sm font-mono"
                          style={{ color: tech.color || "#14E8C4" }}
                        >
                          {tech.name}
                        </span>
                        <span className="text-[11px] font-mono text-muted bg-dark-bg px-2 py-0.5 rounded border border-dark-border">
                          {tech.role}
                        </span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        {tech.whyChosen}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: AUTHENTICATION & SECURITY (MANDATORY)
      ======================================================== */}
      <section id="security" className="scroll-mt-24">
        <SectionBadge title="06. Authentication & Security" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent-teal/10 border border-accent-teal/30 flex items-center justify-center text-accent-teal">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-accent-teal uppercase tracking-wider block">
                Zero-Trust Defense
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
                Authentication & Data Protection
              </h2>
            </div>
          </div>

          <p className="text-base text-primary/90 leading-relaxed mb-8">
            {project.authAndSecurity.summary}
          </p>

          {/* Auth Flow Steps */}
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent-teal" />
            <span>Step-by-Step Authentication Flow</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {project.authAndSecurity.flowSteps.map((flow) => (
              <div
                key={flow.step}
                className="bg-dark-bg/80 border border-dark-border/80 rounded-xl p-5 flex items-start gap-3.5"
              >
                <span className="w-6 h-6 rounded-full bg-accent-teal/15 text-accent-teal font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-accent-teal/30 mt-0.5">
                  {flow.step}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-primary mb-1">
                    {flow.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {flow.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Security Deep Dive Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <span className="text-xs font-mono font-semibold text-accent-teal uppercase tracking-wider block mb-1">
                JWT & Session Strategy
              </span>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {project.authAndSecurity.jwtStrategy}
              </p>
            </div>

            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <span className="text-xs font-mono font-semibold text-accent-teal uppercase tracking-wider block mb-1">
                Password Encryption & Hashing
              </span>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {project.authAndSecurity.passwordSecurity}
              </p>
            </div>

            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <span className="text-xs font-mono font-semibold text-accent-teal uppercase tracking-wider block mb-1">
                Protected Routes & Middleware Guards
              </span>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {project.authAndSecurity.protectedRoutes}
              </p>
            </div>

            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <span className="text-xs font-mono font-semibold text-accent-teal uppercase tracking-wider block mb-1">
                User Data Protection & Tenant Isolation
              </span>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {project.authAndSecurity.userDataProtection}
              </p>
            </div>
          </div>

          {/* Security Headers */}
          <div className="bg-dark-bg/90 border border-dark-border rounded-xl p-5 mb-8">
            <span className="text-xs font-mono font-bold text-accent-teal uppercase tracking-wider block mb-3">
              Production HTTP Security Headers Enforced
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-muted">
              {project.authAndSecurity.securityHeaders.map((header, hIdx) => (
                <div key={hIdx} className="flex items-center gap-2 bg-dark-surface px-3 py-1.5 rounded border border-dark-border/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                  <span className="truncate">{header}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Code Snippet */}
          {project.authAndSecurity.codeSnippet && (
            <div>
              <h3 className="text-base font-bold text-primary mb-2">
                Authentication Middleware Implementation
              </h3>
              <CodeSnippetViewer
                title={project.authAndSecurity.codeSnippet.title}
                filename={project.authAndSecurity.codeSnippet.filename}
                language={project.authAndSecurity.codeSnippet.language}
                code={project.authAndSecurity.codeSnippet.code}
              />
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION 7: KEY FEATURES
      ======================================================== */}
      <section id="key-features" className="scroll-mt-24">
        <SectionBadge title="07. Key Engineering Features" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            Engineered Modules & Capabilities
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
            Deep-dive into each core feature, explaining the problem solved, implementation details, business value, and technical complexity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.keyFeatures.map((feat) => (
              <div
                key={feat.id}
                className="bg-dark-bg/90 border border-dark-border hover:border-accent-teal/40 rounded-xl p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-primary group-hover:text-accent-teal transition-colors">
                      {feat.name}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                        feat.technicalComplexity === "Critical"
                          ? "bg-red-500/15 text-red-400 border border-red-500/30"
                          : feat.technicalComplexity === "Very High"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : "bg-accent-teal/15 text-accent-teal border border-accent-teal/30"
                      }`}
                    >
                      {feat.technicalComplexity} Complexity
                    </span>
                  </div>

                  {/* Problem Solved */}
                  <div className="mb-3">
                    <span className="text-[11px] font-mono text-muted uppercase tracking-wider block mb-0.5">
                      Problem Solved:
                    </span>
                    <p className="text-xs sm:text-sm text-primary/80 leading-relaxed">
                      {feat.problemSolved}
                    </p>
                  </div>

                  {/* Implementation */}
                  <div className="mb-4">
                    <span className="text-[11px] font-mono text-accent-teal uppercase tracking-wider block mb-0.5">
                      Implementation Details:
                    </span>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {feat.implementationDetails}
                    </p>
                  </div>
                </div>

                {/* Footer Matrix */}
                <div className="space-y-2 pt-3 border-t border-dark-border/60">
                  <div className="bg-dark-surface p-2.5 rounded-lg border border-dark-border/60">
                    <span className="text-[10px] font-mono text-accent-teal block mb-0.5">
                      Business Value:
                    </span>
                    <span className="text-xs text-primary/90 font-medium">
                      {feat.businessValue}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted/80 font-mono italic">
                    Why {feat.technicalComplexity}: {feat.complexityRationale}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8: CHALLENGES FACED & SOLUTIONS
      ======================================================== */}
      <section id="challenges" className="scroll-mt-24">
        <SectionBadge title="08. Challenges Faced" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            Authentic Engineering Roadblocks & Solutions
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
            Real engineering is defined by overcoming non-trivial edge cases, bottlenecks, and race conditions.
          </p>

          <div className="space-y-6">
            {project.challengesFaced.map((chal, idx) => (
              <div
                key={chal.id}
                className="bg-dark-bg/90 border border-dark-border rounded-xl p-6"
              >
                {/* Challenge Header */}
                <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 font-mono font-bold text-xs flex items-center justify-center border border-red-500/30">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-primary">
                      {chal.title}
                    </h3>
                  </div>

                  {chal.metricDelta && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent-teal/15 text-accent-teal border border-accent-teal/30">
                      {chal.metricDelta}
                    </span>
                  )}
                </div>

                {/* Problem & Root Cause Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-dark-surface p-4 rounded-lg border border-dark-border/60">
                    <span className="text-xs font-mono text-red-400 uppercase tracking-wider block mb-1">
                      Problem
                    </span>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {chal.problem}
                    </p>
                  </div>

                  <div className="bg-dark-surface p-4 rounded-lg border border-dark-border/60">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                      Root Cause
                    </span>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {chal.rootCause}
                    </p>
                  </div>
                </div>

                {/* Engineering Solution */}
                <div className="bg-accent-teal/5 border border-accent-teal/30 p-4 rounded-lg mb-3">
                  <span className="text-xs font-mono font-bold text-accent-teal uppercase tracking-wider block mb-1">
                    Engineering Solution
                  </span>
                  <p className="text-xs sm:text-sm text-primary/95 leading-relaxed">
                    {chal.solution}
                  </p>
                </div>

                {/* Verified Outcome */}
                <div className="flex items-center gap-2 text-xs font-mono text-accent-teal">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Outcome: {chal.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 9: DEVELOPMENT JOURNEY
      ======================================================== */}
      <section id="development-journey" className="scroll-mt-24">
        <SectionBadge title="09. Development Journey" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            Chronological Project Evolution
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
            How the project progressed from initial whiteboard discovery to live cloud deployment.
          </p>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-accent-teal/30 space-y-8">
            {project.developmentJourney.map((stage) => (
              <div key={stage.stageNumber} className="relative">
                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-dark-bg border-2 border-accent-teal" />

                <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-accent-teal">
                      Stage 0{stage.stageNumber}: {stage.stage}
                    </span>
                    <span className="text-[11px] font-mono text-muted bg-dark-surface px-2.5 py-0.5 rounded border border-dark-border">
                      {stage.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-primary mb-2">
                    {stage.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                    {stage.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {stage.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-dark-surface text-primary/80 border border-dark-border"
                      >
                        ✓ {del}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-accent-teal bg-accent-teal/10 px-3 py-1.5 rounded border border-accent-teal/20">
                    Milestone: {stage.keyMilestone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 10: RESULTS & IMPACT
      ======================================================== */}
      <section id="results-impact" className="scroll-mt-24">
        <SectionBadge title="10. Results & Impact" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            Quantifiable Metrics & Engineering Growth
          </h2>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {project.resultsAndImpact.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-dark-bg/80 border border-dark-border rounded-xl p-5 text-center flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-accent-teal block mb-1">
                    {metric.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-primary block mb-2">
                    {metric.label}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-accent-teal bg-accent-teal/10 px-2 py-0.5 rounded border border-accent-teal/20">
                  {metric.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <h3 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-teal" />
                <span>Major Achievements</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted">
                {project.resultsAndImpact.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent-teal font-mono">→</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <h3 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent-teal" />
                <span>Engineering Growth</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted">
                {project.resultsAndImpact.engineeringGrowth.map((eg, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent-teal font-mono">→</span>
                    <span>{eg}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 11: LEARNINGS
      ======================================================== */}
      <section id="learnings" className="scroll-mt-24">
        <SectionBadge title="11. Key Engineering Learnings" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            Architectural & Product Retrospective
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
            What this engineering effort taught me across various disciplines.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <h3 className="text-sm font-mono font-bold text-accent-teal uppercase tracking-wider mb-2">
                Technical Learnings
              </h3>
              <ul className="space-y-2 text-xs text-muted">
                {project.learnings.technical.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <h3 className="text-sm font-mono font-bold text-accent-teal uppercase tracking-wider mb-2">
                Product & UX
              </h3>
              <ul className="space-y-2 text-xs text-muted">
                {project.learnings.product.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <h3 className="text-sm font-mono font-bold text-accent-teal uppercase tracking-wider mb-2">
                System Design
              </h3>
              <ul className="space-y-2 text-xs text-muted">
                {project.learnings.systemDesign.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <h3 className="text-sm font-mono font-bold text-accent-teal uppercase tracking-wider mb-2">
                Performance Optimization
              </h3>
              <ul className="space-y-2 text-xs text-muted">
                {project.learnings.performance.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <h3 className="text-sm font-mono font-bold text-accent-teal uppercase tracking-wider mb-2">
                Architecture & Clean Code
              </h3>
              <ul className="space-y-2 text-xs text-muted">
                {project.learnings.architecture.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-bg/80 border border-dark-border rounded-xl p-5">
              <h3 className="text-sm font-mono font-bold text-accent-teal uppercase tracking-wider mb-2">
                Cloud & Deployment
              </h3>
              <ul className="space-y-2 text-xs text-muted">
                {project.learnings.deployment.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 12: FUTURE IMPROVEMENTS & ROADMAP
      ======================================================== */}
      <section id="future-roadmap" className="scroll-mt-24">
        <SectionBadge title="12. Future Roadmap" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            Strategic Roadmap & Planned Iterations
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
            Planned architectural enhancements, AI models, and scalability milestones.
          </p>

          <div className="space-y-6">
            {project.futureImprovements.map((phase, idx) => (
              <div key={idx} className="bg-dark-bg/80 border border-dark-border rounded-xl p-6">
                <div className="flex items-center justify-between gap-3 mb-4 pb-2 border-b border-dark-border/60">
                  <div>
                    <span className="text-xs font-mono font-bold text-accent-teal uppercase">
                      {phase.phase} ({phase.timeframe})
                    </span>
                    <h3 className="text-lg font-bold text-primary">
                      {phase.title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="bg-dark-surface p-4 rounded-lg border border-dark-border/60"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h4 className="text-sm font-bold text-primary">
                          {feat.title}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-teal/10 text-accent-teal border border-accent-teal/30">
                          {feat.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 13: PROJECT GALLERY & SHOWCASE
      ======================================================== */}
      <section id="gallery" className="scroll-mt-24">
        <SectionBadge title="13. Project Gallery" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            Interface Showcase & Viewports
          </h2>

          <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
            Click any screenshot to open the high-resolution lightbox preview.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setSelectedImage({
                    image: item.image,
                    title: item.title,
                    caption: item.caption,
                    viewType: item.viewType,
                  })
                }
                className="group cursor-pointer bg-dark-bg border border-dark-border hover:border-accent-teal/50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-dark-surface">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-dark-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2.5 rounded-full bg-dark-surface/90 text-accent-teal border border-accent-teal/40">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono bg-dark-bg/90 text-accent-teal border border-dark-border backdrop-blur-sm">
                      {item.viewType}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-bold text-primary group-hover:text-accent-teal transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 14: PROJECT LINKS & NEXT PROJECT NAVIGATION
      ======================================================== */}
      <section id="project-links" className="scroll-mt-24">
        <SectionBadge title="14. Project Links & Next Case Study" className="mb-6" />

        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-card-subtle">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">
            Explore Code & Deployment
          </h2>

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 pb-8 border-b border-dark-border">
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                variant="primary"
                size="md"
                target="_blank"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                Launch Live App
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

            {project.docUrl && (
              <Button
                href={project.docUrl}
                variant="ghost"
                size="md"
                target="_blank"
                icon={<BookOpen className="w-4 h-4" />}
              >
                Documentation
              </Button>
            )}

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-primary bg-dark-bg/80 border border-dark-border hover:border-accent-teal/40 transition-all duration-200"
              title="Print Case Study"
            >
              <Printer className="w-4 h-4 text-accent-teal" />
              <span>Save as PDF / Print</span>
            </button>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-accent-teal hover:text-accent-teal-hover bg-accent-teal/10 hover:bg-accent-teal/20 border border-accent-teal/30 transition-all duration-200"
            >
              <span>Contact Yash Goel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Next / Prev Project Navigation Switcher */}
          <h3 className="text-base font-mono uppercase tracking-wider text-muted mb-4">
            Continue Reading Case Studies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Project Card */}
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group bg-dark-bg/90 border border-dark-border hover:border-accent-teal/40 rounded-xl p-5 transition-all flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-[11px] font-mono text-muted flex items-center gap-1.5 mb-1">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Previous Project</span>
                </span>
                <h4 className="text-base font-bold text-primary group-hover:text-accent-teal transition-colors">
                  {prevProject.title}
                </h4>
                <p className="text-xs text-muted line-clamp-1">
                  {prevProject.category}
                </p>
              </div>

              <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-dark-border/60 bg-dark-surface">
                <img
                  src={prevProject.heroImage}
                  alt={prevProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            {/* Next Project Card */}
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group bg-dark-bg/90 border border-dark-border hover:border-accent-teal/40 rounded-xl p-5 transition-all flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-[11px] font-mono text-accent-teal flex items-center gap-1.5 mb-1">
                  <span>Next Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <h4 className="text-base font-bold text-primary group-hover:text-accent-teal transition-colors">
                  {nextProject.title}
                </h4>
                <p className="text-xs text-muted line-clamp-1">
                  {nextProject.category}
                </p>
              </div>

              <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-dark-border/60 bg-dark-surface">
                <img
                  src={nextProject.heroImage}
                  alt={nextProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudySections;
