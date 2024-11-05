"use client";

import { Fragment, useEffect, useState } from "react";
import { cn } from "@/libs/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Icon from "@/components/ui/Icon";

interface Step {
  index: number;
  value: number;
}

interface Props {
  drag?: boolean;
  clickeable?: boolean;
  defaultItem?: number;
  images: string[];
  buttons?: {
    show: boolean;
    position?: "bottom" | "side";
  };
}

const Carrousel = ({
  images,
  clickeable = true,
  drag = true,
  defaultItem,
  buttons,
}: Props) => {
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [selectedItem, setSelectedItem] = useState(
    defaultItem && defaultItem <= images.length ? defaultItem : 0,
  );

  const prevStepFn = (numItem: number) => {
    setDirection("left");

    setSelectedItem(numItem);
  };

  const nextStepFn = (numItem: number) => {
    setDirection("right");

    setSelectedItem(numItem);
  };

  return (
    <section className="relative">
      <div
        className={cn(
          "p-1 left-0 absolute overflow-visible bottom-3 w-full z-30",
        )}
      >
        <div
          className={cn(
            "flex justify-center w-full mx-auto items-center gap-2",
            { "w-full": images.length > 5 },
          )}
        >
          {images.length > 0 &&
            images.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center font-semibold justify-center select-none transition-all rounded-full bg-divider w-1 h-1 p-2",
                  {
                    "bg-primary text-default-white": selectedItem === i,
                  },
                  {
                    "text-default-400": i < selectedItem,
                  },
                  {
                    "bg-primary text-default-white": selectedItem === i,
                  },
                  { hidden: buttons && buttons.position === "bottom" },
                  {
                    "cursor-pointer hover:text-default-foreground hover:opacity-70 hover:scale-110":
                      clickeable && selectedItem !== i,
                  },
                )}
                onClick={() => {
                  if (!clickeable) return;
                  if (
                    (clickeable &&
                      selectedItem !== i &&
                      i == selectedItem + 1) ||
                    i == selectedItem - 1 ||
                    clickeable
                  ) {
                    if (selectedItem < i) {
                      nextStepFn(i);
                    } else {
                      prevStepFn(i);
                    }
                  }
                }}
              ></div>
            ))}
        </div>
      </div>

      {/* CHILDRENS */}
      <div className="relative overflow-hidden select-none min-h-[200px] rounded-md flex justify-center items-center mx-auto w-full">
        {images.length > 0 &&
          images.map((item, i) => (
            <AnimatePresence key={i} mode="wait">
              {selectedItem === i && (
                <motion.img
                  drag={drag ? "x" : false}
                  dragConstraints={{ right: 0, left: 0 }}
                  onDragEnd={(event, info) => {
                    if (info.offset.x > 100 && selectedItem > 0) {
                      prevStepFn(i - 1);
                    } else if (
                      info.offset.x < -100 &&
                      selectedItem < images.length - 1
                    ) {
                      nextStepFn(i + 1);
                    }
                  }}
                  initial={{
                    x: direction === "left" ? -2000 : 2000,
                  }}
                  transition={{ duration: 0.3 }}
                  animate={{ x: 0 }}
                  exit={{
                    position: "absolute",
                    x: direction === "left" ? 2000 : -2000,
                  }}
                  src={item}
                />
              )}
            </AnimatePresence>
          ))}
      </div>

      {/* BUTTONS */}
      {buttons?.show && (
        <div>
          <div
            className={cn({
              "flex gap-4 mx-auto items-center justify-center":
                buttons.position == "bottom",
              "flex justify-center": buttons.position == "side",
            })}
          >
            <Button
              color="primary"
              className={cn("rounded-full w-auto", {
                "absolute top-[50%] bottom-[50%] self-center items-center justify-center left-4 rounded-full":
                  buttons.position == "side",
                hidden: selectedItem == 0 && buttons.position === "side",
              })}
              isIconOnly
              isDisabled={selectedItem < 1}
              onClick={() => {
                prevStepFn(selectedItem - 1);
              }}
              startContent={<Icon icon="caret-left-fill" className="text-xl" />}
            />
            <Button
              color="primary"
              className={cn("rounded-full", {
                "absolute top-[50%] bottom-[50%] self-center items-center justify-center right-4 rounded-full":
                  buttons.position === "side",
                hidden:
                  selectedItem == images.length - 1 &&
                  buttons.position === "side",
              })}
              isIconOnly
              isDisabled={images.length <= selectedItem}
              onClick={() => {
                nextStepFn(selectedItem + 1);
              }}
              startContent={
                <Icon icon="caret-right-fill" className="text-xl" />
              }
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Carrousel;
