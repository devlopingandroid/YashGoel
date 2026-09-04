import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  download?: boolean | string;
  target?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "left",
  className = "",
  href,
  download,
  target,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-teal/50 active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-accent-teal text-white font-semibold hover:bg-accent-teal-hover hover:shadow-teal-glow shadow-sm",
    outline:
      "border border-accent-teal/40 text-accent-teal hover:bg-accent-teal/10 hover:border-accent-teal",
    ghost:
      "text-muted hover:text-primary hover:bg-dark-surface/60",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-5 py-2.5 text-base gap-2.5",
    lg: "px-7 py-3.5 text-lg gap-3 font-semibold",
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    const isPdf = href.endsWith(".pdf");
    return (
      <a
        href={href}
        className={combinedClasses}
        download={download !== undefined ? download : isPdf ? true : undefined}
        target={target || (isPdf ? "_blank" : undefined)}
        rel={isPdf ? "noopener noreferrer" : undefined}
      >
        {icon && iconPosition === "left" && <span>{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === "right" && <span>{icon}</span>}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
};

export default Button;
