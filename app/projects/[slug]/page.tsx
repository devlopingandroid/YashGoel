import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudiesData } from "@/data/case-studies-data";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import CaseStudyNav from "@/components/casestudy/CaseStudyNav";
import CaseStudySections from "@/components/casestudy/CaseStudySections";
import Footer from "@/components/sections/Footer";

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const project = caseStudiesData[params.slug];

  if (!project) {
    return {
      title: "Case Study Not Found | Yash Goel",
      description: "Project case study could not be found.",
    };
  }

  return {
    title: `${project.title} - Engineering Case Study | Yash Goel`,
    description: `${project.tagline}. An in-depth engineering case study covering architecture, authentication, database design, and key technical challenges.`,
    openGraph: {
      title: `${project.title} - Engineering Case Study`,
      description: project.tagline,
      images: [{ url: project.heroImage }],
    },
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = caseStudiesData[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-dark-bg text-primary">
      <main className="min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Hero Section */}
          <CaseStudyHero project={project} />

          {/* 14 Sections Content Area with Sticky Side Navigation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-6 sm:mt-10">
            {/* Left Sticky Table of Contents Sidebar */}
            <aside className="lg:col-span-3 w-full lg:sticky lg:top-8">
              <CaseStudyNav />
            </aside>

            {/* Right Main Content Panel (All 14 Sections) */}
            <div className="lg:col-span-9 w-full min-w-0">
              <CaseStudySections project={project} />
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <Footer />
      </div>
    </div>
  );
}
