"use client";

import { Chip } from "@nextui-org/chip";
import { StatesComponents } from "@/types/d";
import { motion } from "framer-motion";
import { SetStateAction } from "react";

interface Props {
  name: string;
  state: StatesComponents;
  setSelected: (value: SetStateAction<string>) => void;
}

const CardComponent = ({ name, state, setSelected }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={() => setSelected(name.toLowerCase())}
      className="flex items-center justify-center bg-background relative select-none w-[300px] rounded-large h-[150px] p-4 hover:cursor-pointer hover:text-primary transition-all"
    >
      <p className="text-center text-2xl font-semibold">{name}.tsx</p>
      <Chip
        color={
          state !== "Sin iniciar"
            ? state === "En proceso"
              ? "warning"
              : "success"
            : "default"
        }
        variant="flat"
        className="absolute bottom-2 right-2"
      >
        {state}
      </Chip>
    </motion.div>
  );
};

export default CardComponent;
