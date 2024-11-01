"use client";

import { Chip } from "@nextui-org/chip";
import { StatesComponents } from "@/types/d";
import { motion } from "framer-motion";
import { SetStateAction } from "react";
import { useRouter } from "next/navigation";

interface Props {
  name: string;
  state: StatesComponents;
  setSelected: (value: SetStateAction<string>) => void;
}

const CardComponent = ({ name, state, setSelected }: Props) => {
  const router = useRouter();

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => {
        setSelected(name.toLowerCase());
        router.push(`?component=${name.toLowerCase()}`);
      }}
      className="flex items-center justify-center bg-background shadow-sm relative select-none w-[220px] md:w-[300px] rounded-large h-[150px] p-4 hover:cursor-pointer"
    >
      <p className="text-center text-xl md:text-2xl font-semibold">
        {name}.tsx
      </p>
      <Chip
        variant="flat"
        color={
          state !== "Sin iniciar"
            ? state === "En proceso"
              ? "warning"
              : "success"
            : "danger"
        }
        className="absolute bottom-2 right-2"
      >
        {state}
      </Chip>
    </motion.div>
  );
};

export default CardComponent;
