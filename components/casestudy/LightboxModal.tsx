/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  caption?: string;
  viewType?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  image,
  title,
  caption,
  viewType,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-dark-surface border border-dark-border rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-dark-bg/95 border-b border-dark-border">
              <div className="flex items-center gap-3">
                {viewType && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-accent-teal/10 text-accent-teal border border-accent-teal/30">
                    {viewType}
                  </span>
                )}
                <h4 className="text-sm font-semibold text-primary truncate max-w-md">
                  {title}
                </h4>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-dark-surface border border-transparent hover:border-dark-border transition-all"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Viewport */}
            <div className="relative flex-1 overflow-auto bg-black/50 p-2 sm:p-6 flex items-center justify-center">
              <img
                src={image}
                alt={title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg border border-dark-border/40 shadow-xl"
              />
            </div>

            {/* Caption / Description Bar */}
            {caption && (
              <div className="px-5 py-3 bg-dark-bg/90 border-t border-dark-border text-xs sm:text-sm text-muted">
                {caption}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightboxModal;
