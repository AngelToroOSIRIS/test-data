"use client";

import { Fragment, MutableRefObject } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
  children: React.ReactNode[];
  closeDisabled?: boolean;
  ref: MutableRefObject<null>;
}

const DragContainerModal = ({ children, ref }: Props) => {
  return (
    <div ref={ref} className="fixed top-0 left-0 w-full h-screen">
      <Transition
        appear
        show={children && children.filter((i) => i).length > 0}
        as={Fragment}
      >
        <Dialog
          as="section"
          className="relative h-auto z-50"
          onClose={() => {
            // closeDisabled ? undefined : setIsOpen(false);
          }}
        >
          {children}
        </Dialog>
      </Transition>
    </div>
  );
};

export default DragContainerModal;
