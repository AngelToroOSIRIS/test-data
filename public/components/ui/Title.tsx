"use client";

import { cn } from "@/libs/utils";

interface Props {
  text: string;
  onClick?: () => void;
  center?: boolean;
  primary?: boolean;
  background?: boolean;
  size?: "title" | "medium" | "subtitle";
  className?: string;
}

const Title = ({
  text,
  size,
  primary = true,
  center = true,
  background = false,
  className,
  onClick,
}: Props) => {
  return (
    <p
      onClick={onClick}
      className={cn(`font-semibold transition-all`, className, {
        "text-2xl": size == "title",
        "text-xl": size == "medium",
        "text-lg": size == "subtitle",
        "text-primary": primary,
        "cursor-pointer transition-all text-default-400 select-none": onClick,
        "transition-all text-default-400 select-none": background,
        "text-center": center,
      })}
    >
      {text}
    </p>
  );
};

export default Title;
