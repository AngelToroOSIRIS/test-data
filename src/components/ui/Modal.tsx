"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Divider } from "@nextui-org/react";
import { motion, useDragControls } from "framer-motion";
import { Fragment, SetStateAction, useEffect, useState } from "react";
import Icon from "./Icon";
import { cn } from "@/libs/utils";

interface Props {
  isOpen: boolean;
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
  closeButton = !closeDisabled,
  classContainer = "",
  children,
}: Props) => {
  const dragControls = useDragControls();

  function startDrag(event: any) {
    dragControls.start(event);
  }

  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth < 1024,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="section"
        className="relative z-50"
        onClose={() => {
          closeDisabled ? undefined : setIsOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter={!isMediumScreen ? "ease-out duration-100" : undefined}
          enterFrom={!isMediumScreen ? "opacity-0" : undefined}
          enterTo={!isMediumScreen ? "opacity-100" : undefined}
          leave={"ease-in duration-100"}
          leaveFrom={"opacity-100"}
          leaveTo={"opacity-0"}
        >
          <div className="fixed inset-0 bg-custom-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 md:overflow-y-auto">
          <motion.div
            drag="y"
            dragMomentum={false}
            dragElastic={0}
            dragControls={dragControls}
            dragListener={false}
            onDrag={(event, info) => {
              if (info.offset.y > 100) {
                setIsOpen(false);
              }
            }}
            dragConstraints={{ top: 0, bottom: 0 }}
            className="flex min-h-full items-end md:items-start space-y-reverse justify-center p-4 text-center"
          >
            <Transition.Child
              as={Fragment}
              enter={
                !isMediumScreen
                  ? "ease-out duration-100"
                  : "ease-out duration-800"
              }
              enterFrom={
                !isMediumScreen ? "opacity-0 scale-95" : "translate-y-full"
              }
              enterTo={
                !isMediumScreen ? "opacity-100 scale-100" : "translate-y-0"
              }
              leave={
                !isMediumScreen
                  ? "ease-in duration-100"
                  : "ease-out duration-800"
              }
              leaveFrom={
                !isMediumScreen ? "opacity-100 scale-100" : "translate-y-0"
              }
              leaveTo={
                !isMediumScreen ? "opacity-0 scale-95" : "translate-y-full"
              }
            >
              <Dialog.Panel
                className={cn(
                  "md:my-8 md:top-0 transform bottom-0 select-none md:select-auto md:bottom-auto fixed md:static rounded-t-2xl md:rounded-2xl bg-background text-left align-middle text-default-foreground shadow-standard transition-all w-full md:w-[98%] max-h-full overflow-y-auto md:overflow-hidden ",
                  classContainer,
                )}
              >
                {!closeDisabled && (
                  <>
                    <i
                      className="bi bi-x hidden md:block absolute text-borders top-1 right-3 hover:text-primary text-3xl transition-all cursor-pointer z-50"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    ></i>
                    <div
                      className="flex md:hidden items-center justify-center w-full h-[40px]"
                      onPointerDownCapture={startDrag}
                      style={{ touchAction: "none" }}
                    >
                      <Divider className="w-[40%] h-[8px] mt-2 mb-2 rounded-lg" />
                    </div>
                    {closeButton && (
                      <Icon
                        icon="x-lg"
                        onClick={() => setIsOpen(false)}
                        className="fixed top-3 right-3 rounded-full flex items-center justify-center p-2 bg-divider hover:text-primary transition-all cursor-pointer md:hidden w-8 h-8 hover:bg-divider z-50"
                      />
                    )}
                  </>
                )}
                <div className="px-4 pt-1 pb-6 md:py-4 max-h-full overflow-y-auto">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </motion.div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
