"use client";

import { motion } from "framer-motion";
import { cn } from "@/libs/utils";
import { useEffect } from "react";

interface Props {
  text: string;
  center?: boolean;
  duration?: number;
  secondText?: string;
  classContainer?: string;
  animate?: "updown" | "appear";
  size?: "title" | "medium" | "subtitle";
}

const AnimatedText = ({
  size,
  text,
  center,
  animate,
  secondText,
  classContainer,
  duration = 0.5,
}: Props) => {
  return (
    <div className={cn(classContainer)}>
      {text && (
        <>
          {animate == "appear" && (
            <p
              className={cn(
                "font-semibold text-dark-gray/90 dark:text-default-white",
                {
                  "text-center": center,
                  "text-2xl md:text-3xl": size == "title",
                  "text-xl md:text-2xl": size == "medium",
                  "text-lg md:text-xl": size == "subtitle",
                },
              )}
            >
              {text.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: duration, delay: i / 6 }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </p>
          )}
          {animate == "updown" && (
            <section
              className={cn(
                "font-semibold flex overflow-hidden h-auto text-dark-gray/90 dark:text-default-white",
                {
                  "justify-center": center,
                  "text-2xl md:text-3xl": size == "title",
                  "text-xl md:text-2xl": size == "medium",
                  "text-lg md:text-xl": size == "subtitle",
                },
              )}
            >
              {text.split("").map((letter, i) => (
                <motion.div
                  key={i}
                  style={{ overflow: "hidden" }}
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: duration, delay: i / 10 }}
                >
                  {letter == " " ? "\u00A0" : letter}
                </motion.div>
              ))}
            </section>
          )}
          {secondText && (
            <p
              className={cn("font-semibold text-default-400", {
                "text-center": center,
              })}
            >
              {`${secondText}`.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: duration, delay: i / 6 }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AnimatedText;
