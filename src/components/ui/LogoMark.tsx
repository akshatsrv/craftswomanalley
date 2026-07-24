import React from "react";

type LogoMarkProps = {
  className?: string;
};

export const LogoMark: React.FC<LogoMarkProps> = ({ className = "h-10 w-auto" }) => {
  return (
    <img
      src="/images/logo-transparent.png"
      alt="Craftswoman Alley"
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
};
