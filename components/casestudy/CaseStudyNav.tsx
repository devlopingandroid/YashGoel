"use client";

import React, { useState, useEffect } from "react";
import {
  Compass,
  ArrowUp,
  Layout,
  AlertCircle,
  Lightbulb,
  Layers,
  Cpu,
  ShieldCheck,
  Rocket,
  Wrench,
  GitMerge,
  BarChart3,
  BookOpen,
  Sparkles,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";

export const sectionsList = [
  { id: "overview", label: "1. Overview", icon: Layout },
  { id: "problem-analysis", label: "2. Problem Analysis", icon: AlertCircle },
  { id: "solution-approach", label: "3. Solution Approach", icon: Lightbulb },
  { id: "architecture", label: "4. Architecture", icon: Layers },
  { id: "tech-stack", label: "5. Tech Stack", icon: Cpu },
  { id: "security", label: "6. Auth & Security", icon: ShieldCheck },
  { id: "key-features", label: "7. Key Features", icon: Rocket },
  { id: "challenges", label: "8. Challenges Faced", icon: Wrench },
  { id: "development-journey", label: "9. Dev Journey", icon: GitMerge },
  { id: "results-impact", label: "10. Results & Impact", icon: BarChart3 },
  { id: "learnings", label: "11. Learnings", icon: BookOpen },
  { id: "future-roadmap", label: "12. Future Roadmap", icon: Sparkles },
  { id: "gallery", label: "13. Project Gallery", icon: ImageIcon },
  { id: "project-links", label: "14. Links & Next", icon: ExternalLink },
];

export const CaseStudyNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      setShowBackToTop(window.scrollY > 400);

      // Section spy detection
      const scrollPosition = window.scrollY + 180;
      for (const section of sectionsList) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const elementPosition = elRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Top Edge Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-dark-surface z-50">
        <div
          className="h-full bg-gradient-to-r from-accent-teal via-orange-400 to-accent-teal transition-all duration-150 ease-out shadow-[0_0_8px_rgba(249,115,22,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Horizontal Pill Navigation (Sticky below navbar) */}
      <div className="lg:hidden sticky top-0 z-40 bg-dark-bg/95 backdrop-blur-md border-b border-dark-border py-2.5 px-4 -mx-4 sm:-mx-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {sectionsList.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={(e) => scrollToSection(e, sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-accent-teal text-dark-bg font-semibold shadow-sm"
                    : "bg-dark-surface/80 text-muted hover:text-primary border border-dark-border"
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sticky Table of Contents Sidebar */}
      <div className="hidden lg:block sticky top-24 space-y-3">
        <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-4 shadow-card-subtle backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted px-2 pb-3 mb-2 border-b border-dark-border/60">
            <Compass className="w-4 h-4 text-accent-teal" />
            <span>Table of Contents</span>
          </div>

          <nav className="space-y-1">
            {sectionsList.map((sec) => {
              const isActive = activeSection === sec.id;
              const Icon = sec.icon;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => scrollToSection(e, sec.id)}
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-accent-teal/15 text-accent-teal border border-accent-teal/30 font-semibold"
                      : "text-muted hover:text-primary hover:bg-dark-bg/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-3.5 h-3.5 transition-colors ${
                        isActive ? "text-accent-teal" : "text-muted group-hover:text-primary"
                      }`}
                    />
                    <span className="truncate">{sec.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-teal shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Reading Progress Percentage Widget */}
        <div className="bg-dark-surface/70 border border-dark-border rounded-xl p-3 flex items-center justify-between text-xs font-mono text-muted">
          <span>Read Progress</span>
          <span className="text-accent-teal font-bold">{Math.round(scrollProgress)}%</span>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-dark-surface/90 hover:bg-accent-teal text-muted hover:text-dark-bg border border-dark-border hover:border-accent-teal transition-all duration-300 shadow-xl backdrop-blur-md group"
          title="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </>
  );
};

export default CaseStudyNav;
