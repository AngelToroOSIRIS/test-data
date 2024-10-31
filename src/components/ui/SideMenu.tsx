"use client";

import { motion } from "framer-motion";
import { cn } from "@/libs/utils";
import { SetStateAction, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  position?: "left" | "right";
  setShowAside: (value: SetStateAction<boolean>) => void;
  className?: string;
  disabledClosed?: boolean;
  background?: boolean;
  backdrop?: boolean;
}

const SideMenu = ({
  children,
  position = "right",
  disabledClosed = false,
  setShowAside,
  className = "",
  backdrop = true,
  background = true,
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
          "w-full bg-background shadow-xl text-default-foreground fixed top-0 p-4 h-screen z-50",
          className,
          {
            "left-0": position == "left",
            "right-0 pl-10": position == "right",
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
      {background && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: backdrop ? 1 : 0 }}
          exit={{ opacity: backdrop ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "fixed bg-custom-black bg-opacity-70 top-0 right-0 z-40 w-full h-screen",
            { "bg-opacity-0": !backdrop },
          )}
          onClick={() => {
            if (!disabledClosed) {
              setShowAside(false);
            }
          }}
        ></motion.div>
      )}
    </>
  );
};

export default SideMenu;
