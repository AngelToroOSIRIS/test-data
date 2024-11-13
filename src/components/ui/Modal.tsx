"use client";

import React, {
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { cn } from "@/libs/utils";
import { Divider } from "@nextui-org/react";
import Icon from "@/components/ui/Icon";

interface Props {
  isOpen: boolean;
  drag?: boolean;
  ref?: MutableRefObject<null>;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  classContainer?: string;
  children?: React.ReactNode;
  closeDisabled?: boolean;
  closeButton?: boolean;
}

const Modal = ({
  isOpen,
  setIsOpen,
  closeDisabled,
  ref,
  drag = false,
  classContainer,
  closeButton = !closeDisabled,
  children,
}: Props) => {
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth < 1024,
  );

  const dragControls = useDragControls();

  function startDrag(event: any) {
    dragControls.start(event);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !closeDisabled) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDisabled, setIsOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {!drag && (
            <motion.section
              key="modal-overlay"
              onClick={() => {
                if (!closeDisabled) {
                  setIsOpen(false);
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-full h-full bg-custom-black overflow-y-auto bg-opacity-50 z-40"
            >
              <motion.div
                drag="y"
                dragElastic={0}
                key="modal-content"
                dragListener={false}
                dragMomentum={false}
                dragControls={dragControls}
                transition={{ duration: 0.3 }}
                dragConstraints={{ top: 0, bottom: 0 }}
                animate={isMediumScreen ? { y: 0 } : { opacity: 1 }}
                exit={isMediumScreen ? { y: 1000 } : { opacity: 0 }}
                initial={isMediumScreen ? { y: 1000 } : { opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                onDrag={(event, info) => {
                  if (info.offset.y > 100) {
                    setIsOpen(false);
                  }
                }}
                className={cn(
                  "md:my-8 mx-auto transform bottom-0 md:bottom-auto p-4 fixed md:relative rounded-t-2xl md:rounded-2xl bg-background text-left align-middle text-default-foreground shadow-standard transition-all w-full md:w-[98%] max-h-full overflow-y-auto md:overflow-hidden",
                  classContainer,
                )}
              >
                {!closeDisabled && (
                  <>
                    {/* DESKTOP */}
                    <Icon
                      icon="x"
                      className="hidden md:block absolute text-default-500 top-1 right-3 hover:text-primary text-3xl transition-all cursor-pointer z-50"
                      onClick={() => setIsOpen(false)}
                    />
                    {/*MOBILE*/}
                    <div
                      className="flex fixed left-0 md:hidden items-start justify-center w-full h-8"
                      onPointerDownCapture={startDrag}
                      style={{ touchAction: "none" }}
                    >
                      <Divider className="w-[40%] h-[8px] rounded-lg" />

                      {closeButton && (
                        <Icon
                          icon="x-lg"
                          onClick={() => setIsOpen(false)}
                          className="absolute top-0 right-4 rounded-full flex items-center justify-center p-2 bg-divider hover:text-primary transition-all cursor-pointer md:hidden w-8 h-8 hover:bg-divider z-50"
                        />
                      )}
                    </div>
                  </>
                )}
                <div className="pt-4 md:pt-0">{children}</div>
              </motion.div>
            </motion.section>
          )}
          {drag && (
            <motion.section
              drag
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              dragElastic={0}
              dragMomentum={false}
              dragListener={false}
              dragConstraints={ref}
              dragControls={dragControls}
              className={cn(
                "fixed inset-0 overflow-y-auto bg-background text-default-foreground w-[98%] h-[98%] my-4 rounded-large shadow-lg mx-auto p-4",
                classContainer,
              )}
            >
              {!closeDisabled && (
                <div className="absolute right-3 top-2 w-auto flex items-center justify-between gap-1">
                  <div
                    className="h-8 w-8 flex items-center justify-center hover:cursor-grab text-default-400 hover:text-default-foreground active:text-default-foreground transition-all active:cursor-grabbing"
                    onPointerDownCapture={startDrag}
                    style={{ touchAction: "none" }}
                  >
                    <Icon icon="arrows-move" className="text-xl" />
                  </div>
                  <i
                    className="bi bi-x text-borders hover:text-primary text-3xl text-default-400 transition-all cursor-pointer"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  ></i>
                </div>
              )}
              {children}
            </motion.section>
          )}
        </>
      )}
    </AnimatePresence>
  );
};
export default Modal;
