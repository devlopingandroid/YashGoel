import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverGlow = true,
  ...props
}) => {
  return (
    <div
      className={`bg-dark-surface border border-dark-border rounded-2xl p-6 shadow-card-subtle transition-all duration-300 ${
        hoverGlow
          ? "hover:border-accent-teal/40 hover:shadow-teal-glow"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
