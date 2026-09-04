/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificatesData, Certificate } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Award,
  X,
  ExternalLink,
  ArrowRight,
  Eye,
} from "lucide-react";

const categoriesList = [
  "All",
  "Internships",
  "Hackathons",
  "Courses",
  "Workshops",
  "Others",
] as const;

type CategoryFilter = (typeof categoriesList)[number];

export const Certificates: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Filter certificates array based on active tab
  const filteredCertificates = certificatesData.filter((cert) => {
    if (activeCategory === "All") return true;
    return cert.category === activeCategory;
  });

  // Handle Esc key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="certificates"
      className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40"
    >
      <SectionBadge title="Certifications" className="mb-6" />

      {/* Top Filter Tab Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-thin">
        {categoriesList.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-all border ${
                isActive
                  ? "bg-accent-teal text-white font-bold border-accent-teal shadow-sm"
                  : "bg-dark-surface/90 text-muted border-dark-border hover:text-primary hover:border-accent-teal/40"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Certificate Cards (4-5 per row desktop) */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <AnimatePresence>
          {filteredCertificates.map((cert) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <Card className="p-5 bg-dark-surface/90 border-dark-border hover:border-accent-teal/40 hover:-translate-y-1 hover:shadow-teal-glow transition-all duration-300 flex flex-col justify-between h-full items-center text-center group">
                <div className="flex flex-col items-center w-full">
                  {/* Centered Issuer Logo Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-dark-bg border border-accent-teal/30 p-2.5 flex items-center justify-center shadow-sm mb-4 group-hover:border-accent-teal transition-colors">
                    {cert.logo ? (
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget.parentElement?.querySelector(
                            ".cert-logo-fallback"
                          ) as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`cert-logo-fallback ${
                        cert.logo ? "hidden" : "flex"
                      } items-center justify-center w-full h-full text-accent-teal`}
                    >
                      <Award className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Issuer Name & Year Badge */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap justify-center">
                    <span className="text-xs font-mono text-muted font-medium">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono text-accent-teal bg-accent-teal/10 px-2 py-0.5 rounded-full border border-accent-teal/20">
                      {cert.year}
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h4 className="text-sm font-bold text-primary group-hover:text-accent-teal transition-colors line-clamp-2 mb-4">
                    {cert.title}
                  </h4>
                </div>

                {/* View Button at Bottom */}
                <Button
                  onClick={() => setSelectedCert(cert)}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs justify-center gap-1.5 mt-2"
                  icon={<Eye className="w-3.5 h-3.5" />}
                >
                  View
                </Button>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Centered "View All Certificates ->" Button */}
      <div className="mt-12 text-center">
        <a
          href="#certificates"
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-accent-teal hover:text-accent-teal-hover transition-colors group"
        >
          <span>View All Certificates</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-dark-bg/90 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-dark-surface border border-accent-teal/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-dark-border">
                <div>
                  <span className="text-xs font-mono text-accent-teal">
                    {selectedCert.issuer} • {selectedCert.year}
                  </span>
                  <h3 className="text-xl font-bold text-primary mt-1">
                    {selectedCert.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-dark-bg text-muted hover:text-primary hover:bg-dark-border/40 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image Preview */}
              <div className="relative aspect-[4/3] max-h-[60vh] bg-dark-bg rounded-2xl overflow-hidden border border-dark-border flex items-center justify-center mb-6">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.parentElement?.querySelector(
                      ".modal-cert-fallback"
                    ) as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="modal-cert-fallback hidden absolute inset-0 bg-dark-surface flex-col items-center justify-center p-6 text-center">
                  <Award className="w-16 h-16 text-accent-teal mb-3" />
                  <span className="font-mono font-bold text-lg text-primary">
                    {selectedCert.title}
                  </span>
                  <span className="text-xs text-muted font-mono mt-1">
                    Verified Credential Preview
                  </span>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-dark-border/60">
                <span className="text-xs font-mono text-muted">
                  Category: {selectedCert.category}
                </span>

                {selectedCert.credentialUrl && (
                  <Button
                    href={selectedCert.credentialUrl}
                    variant="primary"
                    size="sm"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Verify Credential
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
