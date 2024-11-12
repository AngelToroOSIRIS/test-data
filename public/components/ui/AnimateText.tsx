"use client";

import { motion } from "framer-motion";
import { cn } from "@/libs/utils";

interface Props {
  text: string;
  secondText?: string;
  classContainer?: string;
  duration?: number;
}

const AnimatedText = ({
  text,
  secondText,
  classContainer,
  duration = 0.5,
}: Props) => {
  return (
    <div className={cn(classContainer)}>
      {text && (
        <>
          <p className="text-2xl md:text-3xl text-center font-semibold text-dark-gray/90 dark:text-default-white">
            {`${text}`.split(" ").map((word, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: duration, delay: i / 6 }}
                key={i}
              >
                {word}{" "}
              </motion.span>
            ))}
          </p>
          {secondText && (
            <p className="text-center font-semibold text-default-400">
              {`${secondText}`.split(" ").map((word, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: duration, delay: i / 6 }}
                  key={i}
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
