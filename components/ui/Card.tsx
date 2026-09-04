import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
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

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = "",
  ...props
}) => (
  <h3
    className={`text-xl font-bold leading-none tracking-tight text-primary ${className}`}
    {...props}
  />
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = "",
  ...props
}) => (
  <p className={`text-sm text-muted ${className}`} {...props} />
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
);

export default Card;
