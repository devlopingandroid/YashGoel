/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { blogsData } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  Code2,
} from "lucide-react";

export const Blogs: React.FC = () => {
  return (
    <section id="blogs" className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40">
      {/* Header Row: Title on Left + "View All Blogs ->" Link on Right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <SectionBadge title="Articles & Blogs" />
        <a
          href="#blogs"
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-accent-teal hover:text-accent-teal-hover transition-colors group self-start sm:self-auto"
        >
          <span>View All Blogs</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Grid of Blog Cards (2 per row desktop, 1 per row mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {blogsData.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="flex flex-col h-full"
          >
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full group"
            >
              <Card className="p-0 overflow-hidden bg-dark-surface/90 border-dark-border group-hover:border-accent-teal/40 group-hover:-translate-y-1.5 group-hover:shadow-teal-glow transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  {/* Cover Graphic / Thumbnail Area */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-dark-bg border-b border-dark-border">
                    {/* Top Tag Badges */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="absolute top-3 right-3 z-20 flex gap-1.5">
                        {blog.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 text-[11px] font-mono font-semibold bg-dark-surface/90 text-accent-teal border border-accent-teal/30 rounded-lg backdrop-blur-md shadow-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Image with fallback */}
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.parentElement?.querySelector(
                          ".blog-cover-fallback"
                        ) as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />

                    {/* Stylized Gradient Cover Graphic Fallback */}
                    <div className="blog-cover-fallback hidden absolute inset-0 bg-gradient-to-br from-dark-surface via-dark-bg to-accent-teal/15 flex-col justify-between p-6 border border-dark-border">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-accent-teal/15 border border-accent-teal/30">
                          <BookOpen className="w-6 h-6 text-accent-teal" />
                        </div>
                        <Code2 className="w-5 h-5 text-muted/60 font-mono" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-accent-teal">
                          Technical Article
                        </span>
                        <h4 className="font-bold text-base text-primary line-clamp-1 mt-1">
                          {blog.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent-teal transition-colors mb-3 leading-snug">
                      {blog.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2 mb-4">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Meta Row: Date, Read Time, & "Read Article ->" */}
                <div className="px-6 pb-6 pt-0 mt-auto">
                  <div className="flex items-center justify-between text-xs font-mono text-muted pt-4 border-t border-dark-border/60">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-accent-teal" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-accent-teal" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1 font-semibold text-accent-teal group-hover:translate-x-1 transition-transform">
                      <span>Read</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
