/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo, resumeData } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ResumeModal from "@/components/ui/ResumeModal";
import {
  FileDown,
  CheckCircle2,
  Sparkles,
  FileText,
  Briefcase,
  Code,
  Eye,
} from "lucide-react";

export const ResumePreview: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const circleRadius = 54;
  const circumference = 2 * Math.PI * circleRadius; // ~339.29
  const scorePercent = resumeData.atsScore / 100;
  const targetOffset = circumference * (1 - scorePercent);

  return (
    <section id="resume" className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40">
      <SectionBadge title="Resume Preview" className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Realistic Resume-Document Mockup (~60% width) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono text-muted flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-accent-teal" />
              Document Preview (PDF Format)
            </span>
            <span className="text-[11px] font-mono text-accent-teal bg-accent-teal/10 px-2.5 py-0.5 rounded-full border border-accent-teal/20">
              Verified 2024
            </span>
          </div>

          {/* White Resume Page Card Mockup */}
          <div className="bg-slate-50 text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 transform hover:scale-[1.005] transition-transform font-sans relative overflow-hidden text-xs sm:text-sm leading-relaxed">
            {/* Top Resume Header */}
            <div className="border-b border-slate-300 pb-4 mb-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {personalInfo.name}
                  </h3>
                  <p className="text-sm font-semibold text-teal-700 font-mono">
                    {personalInfo.role}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600 justify-center sm:justify-end font-mono">
                  <span>delhi, India</span>
                  <span>•</span>
                  <span>github.com/yashgoel</span>
                </div>
              </div>
            </div>

            {/* Resume Summary */}
            <div className="mb-4">
              <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider mb-1 text-teal-800">
                Summary
              </h4>
              <p className="text-slate-700 text-xs leading-relaxed">
                Software Engineer specializing in Full-Stack Systems (Java, Spring Boot, React, Node.js) and AI pipelines with 3 research internships, 3 patents, and hackathon wins.
              </p>
            </div>

            {/* Resume Experience */}
            <div className="mb-4">
              <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider mb-2 text-teal-800 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-teal-700" />
                Experience Highlights
              </h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between font-semibold text-slate-900 text-xs">
                    <span>Infosys Springboard — SDE Intern</span>
                    <span className="font-mono text-[11px] text-slate-500">2024</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Built Civic Complaint Platform in Angular & Spring Boot with JWT role access.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between font-semibold text-slate-900 text-xs">
                    <span>DRDO SSPL — Software Intern</span>
                    <span className="font-mono text-[11px] text-slate-500">2024</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Developed Budget Management microservices in Java & Spring Boot.
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Featured Projects */}
            <div className="mb-4">
              <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider mb-2 text-teal-800 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-teal-700" />
                Featured Projects
              </h4>
              <div className="space-y-1.5">
                <div>
                  <span className="font-semibold text-slate-900 text-xs">Budget Eagle:</span>{" "}
                  <span className="text-[11px] text-slate-600">AI finance management app with automated ML expense tagging (MERN Stack).</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 text-xs">PulseDrive:</span>{" "}
                  <span className="text-[11px] text-slate-600">Smart vehicle telemetry monitoring system with real-time sensor analytics.</span>
                </div>
              </div>
            </div>

            {/* Resume Skills & Education */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
              <div>
                <h4 className="text-[11px] font-bold font-mono text-teal-800 uppercase mb-1">
                  Core Technologies
                </h4>
                <p className="text-[11px] text-slate-700 font-mono">
                  React, Next.js, Node.js, Python, TypeScript, Docker, PostgreSQL, Tailwind
                </p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold font-mono text-teal-800 uppercase mb-1">
                  Education
                </h4>
                <p className="text-[11px] text-slate-700 font-mono">
                  B.Tech Computer Science & Engineering (2021 - 2025)
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: ATS Score Card & Checklist (~40% width) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-between gap-6"
        >
          <Card className="p-6 sm:p-8 bg-dark-surface/90 border-accent-teal/40 shadow-teal-glow flex flex-col justify-between h-full">
            <div>
              {/* ATS Score Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-border/60">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent-teal animate-pulse" />
                  <h3 className="text-xl font-extrabold text-primary">
                    ATS Resume Score
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-accent-teal/20 text-accent-teal border border-accent-teal/40">
                  {resumeData.statusLabel}
                </span>
              </div>

              {/* Animated SVG Circular Progress Ring */}
              <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  {/* Background Track Circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r={circleRadius}
                    className="text-dark-bg stroke-current"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Animated Progress Circle */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r={circleRadius}
                    className="text-accent-teal stroke-current"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: targetOffset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Centered Score Percentage Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold font-mono text-accent-teal">
                    {resumeData.atsScore}%
                  </span>
                  <span className="text-[11px] font-mono text-muted uppercase">
                    ATS Score
                  </span>
                </div>
              </div>

              {/* Checklist Grid (5 Rows) */}
              <div className="space-y-3 mb-8">
                <span className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">
                  Optimization Breakdown
                </span>
                {resumeData.checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-dark-bg/80 border border-dark-border"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-xs font-medium text-primary">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-accent-teal bg-accent-teal/10 px-2 py-0.5 rounded border border-accent-teal/20">
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Preview & Download */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                size="lg"
                className="w-full justify-center text-sm py-3"
                icon={<Eye className="w-4 h-4" />}
              >
                Preview Resume
              </Button>

              <Button
                href={personalInfo.resumeUrl}
                download="Yash_Goel.pdf"
                target="_blank"
                variant="primary"
                size="lg"
                className="w-full justify-center text-sm py-3"
                icon={<FileDown className="w-4 h-4" />}
              >
                Download Resume
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Interactive Resume Modal Overlay */}
      <ResumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ResumePreview;
