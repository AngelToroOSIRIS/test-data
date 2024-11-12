"use client";

import { Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  classContainer?: string;
  children?: React.ReactNode[];
  closeDisabled?: boolean;
}

const DragContainerModal = ({
  isOpen,
  setIsOpen,
  closeDisabled,
  classContainer = "",
  children,
}: Props) => {
  return (
    <div className="bg-default">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="section"
          className="relative z-50"
          onClose={() => {
            // closeDisabled ? undefined : setIsOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-custom-black bg-opacity-50" />
          </Transition.Child>

          {children &&
            children.length > 0 &&
            children.map((item, i) => (
              <motion.div
                drag
                key={i}
                className="fixed inset-0 overflow-y-auto"
              >
                <div className="flex min-h-full items-start justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel
                      className={cn(
                        "my-8 px-5 py-3 transform rounded-2xl bg-background text-default-foreground text-left align-middle soft-shadow transition-all w-[98%] ",
                        classContainer,
                      )}
                    >
                      {!closeDisabled && (
                        <i
                          className="bi bi-x absolute text-borders top-1 right-3 hover:text-primary text-3xl transition-all cursor-pointer z-50"
                          onClick={() => {
                            setIsOpen(false);
                          }}
                        ></i>
                      )}
                      {children}
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </motion.div>
            ))}
        </Dialog>
      </Transition>
    </div>
  );
};

export default DragContainerModal;
