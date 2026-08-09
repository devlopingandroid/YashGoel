/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { projectsData } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ExternalLink, ArrowRight, Code2, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const getProjectSlug = (id: string, title: string) => {
  if (id.includes("budget-eagle") || title.toLowerCase().includes("budget")) return "budget-eagle";
  if (id.includes("streamify") || title.toLowerCase().includes("stream")) return "streamify";
  if (id.includes("skillforge") || title.toLowerCase().includes("skill")) return "skillforge";
  return id.replace("proj-", "");
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40">
      {/* Header Row: Title on Left + "View All Projects ->" Link on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <SectionBadge title="Featured Projects" />
        <a
          href="#projects"
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-accent-teal hover:text-accent-teal-hover transition-colors group self-start sm:self-auto"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Grid of Project Cards (3 per row desktop, 1 per row mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projectsData.map((project, index) => {
          const slug = getProjectSlug(project.id, project.title);
          const caseStudyUrl = `/projects/${slug}`;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col h-full"
            >
              <Card className="p-0 overflow-hidden bg-dark-surface/90 border-dark-border hover:border-accent-teal/40 hover:-translate-y-1.5 hover:shadow-teal-glow transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  {/* Browser-Mockup Header Bar */}
                  <div className="bg-dark-bg/90 px-3.5 py-2.5 border-b border-dark-border flex items-center justify-between">
                    {/* 3 Window Control Dots */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>

                    {/* Browser URL bar snippet */}
                    <div className="text-[10px] font-mono text-muted bg-dark-surface px-2.5 py-0.5 rounded border border-dark-border/40 truncate max-w-[130px]">
                      https://{project.title.toLowerCase().replace(/\s+/g, "")}.dev
                    </div>
                  </div>

                  {/* Browser Screenshot Area - Clickable to Case Study */}
                  <Link
                    href={caseStudyUrl}
                    className="block relative aspect-video bg-dark-bg overflow-hidden border-b border-dark-border group-hover:opacity-95 transition-opacity"
                  >
                    {/* Category Tag Pill Top-Right */}
                    <span className="absolute top-3 right-3 z-20 px-2.5 py-1 text-[11px] font-mono font-semibold bg-dark-surface/90 text-accent-teal border border-accent-teal/30 rounded-lg backdrop-blur-md shadow-md">
                      {project.tag}
                    </span>

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
                  </Link>

                  {/* Card Content Body */}
                  <div className="p-6">
                    <Link href={caseStudyUrl} className="block group/title">
                      <h3 className="text-xl font-bold text-primary group-hover/title:text-accent-teal transition-colors mb-2 flex items-center justify-between gap-2">
                        <span>{project.title}</span>
                        <ArrowRight className="w-4 h-4 text-muted group-hover/title:text-accent-teal group-hover/title:translate-x-1 transition-all shrink-0" />
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {/* Small Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.techBadges.map((badge, badgeIdx) => (
                        <span
                          key={badgeIdx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-dark-bg text-muted border border-dark-border/80"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 mt-auto flex flex-col gap-2.5">
                  <Link
                    href={caseStudyUrl}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-accent-teal/10 hover:bg-accent-teal text-accent-teal hover:text-dark-bg border border-accent-teal/30 hover:border-accent-teal transition-all duration-200 shadow-sm group/btn"
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
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;

