"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/libs/utils";
import { SetStateAction, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  showAside: boolean;
  className?: string;
  backdrop?: boolean;
  disabledClosed?: boolean;
  position?: "left" | "right";
  setShowAside: (value: SetStateAction<boolean>) => void;
}

const SideMenu = ({
  children,
  position = "right",
  disabledClosed = false,
  showAside,
  setShowAside,
  className = "",
  backdrop = false,
}: Props) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const isLeft = position === "left";
  const directionMultiplier = isLeft ? 1 : -1;

  if (disabledClosed) {
    backdrop = true;
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !disabledClosed) {
        setShowAside(false);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        setTouchStartX(event.touches[0].clientX);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartX !== null) {
        const touchMoveX = event.touches[0].clientX;
        const touchDistanceX = touchStartX - touchMoveX;
        const swipeThreshold = 100;

        if (touchDistanceX * directionMultiplier > swipeThreshold) {
          setShowAside(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [touchStartX, directionMultiplier]);

  return (
    <AnimatePresence mode="wait">
      {showAside && (
        <>
          <motion.div
            initial={{ x: position == "left" ? "-100vw" : "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: position == "left" ? "-100vw" : "100vw" }}
            transition={{
              type: "tween",
              duration: 0.4,
            }}
            className={cn(
              "w-full bg-background shadow-soft text-default-foreground fixed top-0 p-4 h-screen z-50",
              className,
              {
                "left-0": position == "left",
                "right-0": position == "right",
              },
            )}
          >
            {!disabledClosed && (
              <i
                className={cn(
                  "bi bi-x absolute text-borders top-0 hover:text-primary text-3xl transition-all cursor-pointer",
                  {
                    "left-2": position == "right",
                    "right-2": position == "left",
                  },
                )}
                onClick={() => {
                  setShowAside(false);
                }}
              ></i>
            )}
            {children}
          </motion.div>
          {backdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: backdrop ? 1 : 0 }}
              exit={{ opacity: backdrop ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "fixed bg-custom-black bg-opacity-70 top-0 right-0 z-40 w-full h-screen",
              )}
              onClick={() => {
                if (!disabledClosed) {
                  setShowAside(false);
                }
              }}
            ></motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;
