"use client";

import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Title";
import { Code } from "@nextui-org/code";
import { SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}

const ModalIndex = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} classContainer="max-w-[500px]">
      <div className="flex flex-col gap-3">
        <Title text="Librerias" size="medium" />
        <div className="flex flex-col font-semibold gap-3">
          <div className="flex justify-between items-center gap-2">
            <p>- Next UI V2.6.11</p>
            <Code color="success">npm install @nextui-org/react</Code>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p>- Framer Motion V11.16.1</p>
            <Code color="success">npm install framer-motion</Code>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p>- Next Theme V0.4.3</p>
            <Code color="success">npm install next-themes</Code>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalIndex;
