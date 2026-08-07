"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, personalInfo } from "@/data/portfolio-data";
import { Menu, X, FileDown, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import Button from "@/components/ui/Button";

export const Sidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.sectionId);
      const scrollPosition = window.scrollY + 220;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      {/* Mobile Top Header Navbar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-dark-bg/95 backdrop-blur-md border-b border-dark-border z-50 px-4 flex items-center justify-between shadow-lg">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-dark-surface border border-accent-teal/40 flex items-center justify-center font-mono font-bold text-accent-teal text-lg shadow-teal-glow group-hover:scale-105 transition-transform">
            YG
          </div>
          <span className="font-extrabold text-primary text-base tracking-tight">
            Yash<span className="text-accent-teal">.</span>
          </span>
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-dark-surface border border-dark-border text-primary hover:text-accent-teal focus:outline-none transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Navigation Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-dark-bg/80 backdrop-blur-sm z-40"
            />

            {/* Mobile Sliding Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-dark-surface border-r border-dark-border z-50 flex flex-col justify-between p-6 pt-20 shadow-2xl"
            >
              <div>
                <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-260px)] pr-1">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.sectionId;
                    return (
                      <a
                        key={link.sectionId}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.sectionId)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${isActive
                            ? "bg-accent-teal/15 text-accent-teal border border-accent-teal/30 font-semibold shadow-sm"
                            : "text-muted hover:text-primary hover:bg-dark-bg/50"
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${isActive
                              ? "bg-accent-teal shadow-teal-glow"
                              : "bg-dark-border"
                            }`}
                        />
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Actions & Social Icons */}
              <div className="pt-4 border-t border-dark-border space-y-4">
                <Button
                  href={personalInfo.resumeUrl}
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  icon={<FileDown className="w-4 h-4" />}
                >
                  Download Resume
                </Button>

                <div className="flex items-center justify-center gap-3 pt-1 text-muted">
                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-dark-bg border border-dark-border hover:text-accent-teal hover:border-accent-teal/40 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-dark-bg border border-dark-border hover:text-accent-teal hover:border-accent-teal/40 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-dark-bg border border-dark-border hover:text-accent-teal hover:border-accent-teal/40 transition-colors"
                    aria-label="Twitter Profile"
                  >
                    <FaXTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-dark-bg border border-dark-border hover:text-accent-teal hover:border-accent-teal/40 transition-colors"
                    aria-label="Instagram Profile"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 bg-dark-surface border-r border-dark-border z-50 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-dark-bg border border-accent-teal/40 flex items-center justify-center font-mono font-bold text-accent-teal text-xl shadow-teal-glow">
              YG
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-primary leading-tight">
                Yash <span className="text-accent-teal">Goel</span>
              </h1>
              <p className="text-xs font-mono text-muted flex items-center gap-1">
                <Terminal className="w-3 h-3 text-accent-teal" /> Software Eng.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-280px)] pr-1 scrollbar-thin">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.sectionId}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.sectionId)}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 ${isActive
                      ? "bg-accent-teal/15 text-accent-teal border border-accent-teal/30 font-semibold shadow-sm"
                      : "text-muted hover:text-primary hover:bg-dark-bg/50"
                    }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isActive
                        ? "bg-accent-teal shadow-teal-glow"
                        : "bg-dark-border"
                      }`}
                  />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Pinned Actions & Social Links */}
        <div className="pt-4 border-t border-dark-border space-y-4">
          <Button
            href={personalInfo.resumeUrl}
            variant="outline"
            size="sm"
            className="w-full justify-center"
            icon={<FileDown className="w-4 h-4" />}
          >
            Download Resume
          </Button>

          <div className="flex items-center justify-center gap-3 pt-1 text-muted">
            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-dark-bg hover:text-accent-teal transition-colors"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-dark-bg hover:text-accent-teal transition-colors"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-dark-bg hover:text-accent-teal transition-colors"
              aria-label="Twitter Profile"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-dark-bg hover:text-accent-teal transition-colors"
              aria-label="Instagram Profile"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

