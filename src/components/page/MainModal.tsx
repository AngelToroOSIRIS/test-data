"use client";

import Title from "@/components/ui/Title";
import { Button, Divider, Switch } from "@nextui-org/react";
import { Code } from "@nextui-org/code";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import { motion } from "framer-motion";

const MainModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closeDisabled, setCloseDisabled] = useState(false);
  const [closeButton, setCloseButton] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col md:flex-row md:justify-between w-full mx-auto gap-2"
    >
      <div className="flex flex-col gap-3 bg-background rounded-large p-4 w-full max-w-[900px] ">
        <Title text="Demo Modal.tsx" size="title" className="text-3xl" center />
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeDisabled={closeDisabled}
          closeButton={closeButton}
          classContainer="max-w-[500px]"
        >
          <div className="flex flex-col items-center gap-4">
            <Title text="Modal" size="title" className="text-3xl" center />
            <Divider className="w-[95%] bg-divider mx-auto" />
            <Switch
              isSelected={closeDisabled}
              onValueChange={setCloseDisabled}
              classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
            >
              close disabled
            </Switch>
            <Switch
              isSelected={closeButton}
              onValueChange={setCloseButton}
              classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
            >
              enable close button responsive
            </Switch>
          </div>
        </Modal>
        <Button className="w-auto mx-auto my-8" onClick={() => setIsOpen(true)}>
          Abrir modal
        </Button>
      </div>
      <div className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4">
        <Title text="Propiedades" size="medium" />
        <Code className="flex flex-col w-full mx-auto">
          <p>{"isOpen: boolean;"}</p>
          <p>{"closeButton?: boolean;"}</p>
          <p>{"classContainer?: string;"}</p>
          <p>{"closeDisabled?: boolean;"}</p>
          <p>{"children?: React.ReactNode;"}</p>
          <p>{"setIsOpen: (value: SetStateAction<boolean>) => void;"}</p>
        </Code>
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Title text="Test" size="medium" primary />
        <Switch
          isSelected={closeDisabled}
          onValueChange={setCloseDisabled}
          classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
        >
          close disabled
        </Switch>
        <Switch
          isSelected={closeButton}
          onValueChange={setCloseButton}
          classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
        >
          enable close button responsive
        </Switch>
      </div>
    </motion.div>
  );
};

export default MainModal;
