import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 uppercase tracking-widest font-sans font-medium";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-[#8B4513] rounded-sm",
    secondary: "bg-secondary text-white hover:bg-[#768C4D] rounded-sm",
    outline: "border border-foreground text-foreground hover:bg-foreground hover:text-background rounded-sm",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-4 text-sm",
    lg: "px-10 py-5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
