"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillCategoriesData } from "@/data/portfolio-data";
import SectionBadge from "@/components/ui/SectionBadge";
import Card from "@/components/ui/Card";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPython,
  SiGit,
  SiDocker,
  SiLinux,
  SiPostman,
  SiFigma,
  SiTensorflow,
  SiOpencv,
  SiPytorch,
  SiPandas,
  SiNumpy,
  SiFirebase,
  SiVercel,
  SiRender,
  SiGithubactions,
  SiDigitalocean,
  SiNginx,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa6";
import { TbApi, TbBrandVscode } from "react-icons/tb";
import {
  Sparkles,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Cloud,
  Wrench,
} from "lucide-react";

// Helper function to render brand icons cleanly
const renderBrandIcon = (iconKey: string, color?: string) => {
  const iconProps = {
    className: "w-3.5 h-3.5 transition-colors",
    style: color ? { color } : undefined,
  };

  switch (iconKey) {
    case "SiReact":
      return <SiReact {...iconProps} />;
    case "SiNextdotjs":
      return <SiNextdotjs {...iconProps} />;
    case "SiTailwindcss":
      return <SiTailwindcss {...iconProps} />;
    case "SiRedux":
      return <SiRedux {...iconProps} />;
    case "SiJavascript":
      return <SiJavascript {...iconProps} />;
    case "SiHtml5":
      return <SiHtml5 {...iconProps} />;
    case "SiCss3":
      return <SiCss {...iconProps} />;
    case "SiNodedotjs":
      return <SiNodedotjs {...iconProps} />;
    case "SiExpress":
      return <SiExpress {...iconProps} />;
    case "SiMongodb":
      return <SiMongodb {...iconProps} />;
    case "FaJava":
      return <FaJava {...iconProps} />;
    case "SiPython":
      return <SiPython {...iconProps} />;
    case "TbApi":
      return <TbApi {...iconProps} />;
    case "SiGit":
      return <SiGit {...iconProps} />;
    case "SiDocker":
      return <SiDocker {...iconProps} />;
    case "SiLinux":
      return <SiLinux {...iconProps} />;
    case "SiPostman":
      return <SiPostman {...iconProps} />;
    case "SiVisualstudiocode":
      return <TbBrandVscode {...iconProps} />;
    case "SiFigma":
      return <SiFigma {...iconProps} />;
    case "SiTensorflow":
      return <SiTensorflow {...iconProps} />;
    case "SiOpencv":
      return <SiOpencv {...iconProps} />;
    case "SiPyTorch":
      return <SiPytorch {...iconProps} />;
    case "SiPandas":
      return <SiPandas {...iconProps} />;
    case "SiNumpy":
      return <SiNumpy {...iconProps} />;
    case "SiAmazonaws":
      return <FaAws {...iconProps} />;
    case "SiFirebase":
      return <SiFirebase {...iconProps} />;
    case "SiVercel":
      return <SiVercel {...iconProps} />;
    case "SiRender":
      return <SiRender {...iconProps} />;
    case "SiGithubactions":
      return <SiGithubactions {...iconProps} />;
    case "SiDigitalocean":
      return <SiDigitalocean {...iconProps} />;
    case "SiNginx":
      return <SiNginx {...iconProps} />;
    default:
      return <Code2 className="w-3.5 h-3.5 text-accent-teal" />;
  }
};

const getCategoryHeaderIcon = (id: string) => {
  switch (id) {
    case "frontend":
      return <Layers className="w-4 h-4 text-accent-teal" />;
    case "backend":
      return <Terminal className="w-4 h-4 text-accent-teal" />;
    case "tools":
      return <Wrench className="w-4 h-4 text-accent-teal" />;
    case "aiml":
      return <Cpu className="w-4 h-4 text-accent-teal" />;
    case "cloud":
      return <Cloud className="w-4 h-4 text-accent-teal" />;
    default:
      return <Sparkles className="w-4 h-4 text-accent-teal" />;
  }
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="pt-4 md:pt-6 pb-12 md:pb-16 scroll-mt-4 md:scroll-mt-6 border-t border-dark-border/40">
      <SectionBadge title="SKILLS" className="mb-6" />

      {/* Main Full-Width "My Skills" Outer Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="p-5 sm:p-6 bg-dark-surface/90 border-dark-border shadow-2xl">
          {/* Outer Header */}
          <h3 className="text-lg sm:text-xl font-extrabold text-primary tracking-tight mb-5">
            My Skills
          </h3>

          {/* Stack of Full-Width Category Boxes */}
          <div className="space-y-4">
            {skillCategoriesData.map((cat, catIdx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: catIdx * 0.08 }}
                className="p-4 sm:p-5 rounded-xl bg-dark-bg/60 border border-dark-border/80 hover:border-dark-border transition-colors"
              >
                {/* Category Title with Icon Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-accent-teal/10 border border-accent-teal/20">
                    {getCategoryHeaderIcon(cat.id)}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-primary tracking-tight">
                    {cat.category}
                  </h4>
                </div>

                {/* Brand Skill Pills Wrap Row */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {cat.skills.map((skill, skillIdx) => (
                    <div
                      key={skillIdx}
                      className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-dark-surface/90 border border-dark-border hover:border-accent-teal/50 hover:-translate-y-0.5 hover:shadow-teal-glow transition-all group cursor-default"
                    >
                      <span>{renderBrandIcon(skill.iconKey, skill.color)}</span>
                      <span className="text-xs font-semibold text-primary group-hover:text-accent-teal transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default Skills;
