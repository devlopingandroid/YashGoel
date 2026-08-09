"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Section3DWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export const Section3DWrapper: React.FC<Section3DWrapperProps> = ({
  children,
  id,
  className = "",
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-80px 0px -80px 0px",
  });

  return (
    <div
      id={id}
      ref={ref}
      className={`relative scroll-mt-24 ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
          rotateX: 8,
          scale: 0.96,
          filter: "blur(4px)",
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                filter: "blur(0px)",
              }
            : {
                opacity: 0.25,
                y: 35,
                rotateX: 5,
                scale: 0.98,
                filter: "blur(2px)",
              }
        }
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 0.8,
          delay: delay,
        }}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, opacity, filter",
        }}
        className="w-full transition-shadow duration-500"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Section3DWrapper;
