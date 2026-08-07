import React from "react";

interface SectionBadgeProps {
  number?: string;
  title: string;
  className?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({
  number,
  title,
  className = "",
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {number && (
        <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-mono font-semibold text-accent-teal bg-accent-teal/10 border border-accent-teal/20 rounded-md">
          {number}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
        {title}
      </h2>
      <div className="h-[1px] w-24 bg-gradient-to-r from-dark-border to-transparent ml-2 hidden sm:block" />
    </div>
  );
};

export default SectionBadge;
