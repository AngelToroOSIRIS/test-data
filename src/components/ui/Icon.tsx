"use client";

import { cn } from "@/libs/utils";

const Icon = ({
  icon,
  className = "",
  onClick,
  title,
}: {
  icon: string;
  title?: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <i
      onClick={onClick}
      title={title}
      className={cn(`bi bi-${icon.split(" ")[0]}`, className)}
    ></i>
  );
};

export default Icon;
