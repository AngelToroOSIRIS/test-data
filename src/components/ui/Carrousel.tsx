"use client";

import { useEffect, useState } from "react";
import { cn } from "@/libs/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button, ScrollShadow } from "@nextui-org/react";
import Icon from "@/components/ui/Icon";
import { log } from "node:util";

interface Props {
  drag?: boolean;
  clickeable?: boolean;
  showImages?: { show: boolean; position?: "left" | "right" };
  height?: "large" | "standard" | "auto";
  animate?: { show: boolean; time?: number };
  defaultItem?: number;
  images: string[];
  buttons?: {
    show: boolean;
    position?: "bottom" | "side";
  };
}

const Carrousel = ({
  images,
  animate,
  buttons,
  showImages,
  height = "auto",
  drag = true,
  defaultItem,
  clickeable = true,
}: Props) => {
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [isInteracting, setIsInteracting] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    defaultItem && defaultItem <= images.length ? defaultItem : 0,
  );

  // Estado para imágenes que fallan
  const [imageErrors, setImageErrors] = useState<boolean[]>(
    new Array(images.length).fill(false),
  );

  // Estado para saber si las imágenes están cargando
  const [imageLoading, setImageLoading] = useState<boolean[]>(
    new Array(images.length).fill(true),
  );

  const prevStepFn = (numItem: number) => {
    setDirection("left");
    setSelectedItem(numItem);
  };

  const nextStepFn = (numItem: number) => {
    setDirection("right");
    setSelectedItem(numItem);
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
    setImageLoading((prev) => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const handleImageLoad = (index: number) => {
    setImageLoading((prev) => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  useEffect(() => {
    if (animate?.show) {
      const interval = setInterval(
        () => {
          if (!isInteracting) {
            const nextItem = (selectedItem + 1) % images.length;
            nextStepFn(nextItem);
          }
        },
        animate.time ? animate.time * 1000 : 4000,
      );

      return () => clearInterval(interval);
    }
  }, [selectedItem, images.length, isInteracting, animate?.show]);

  return (
    <div
      className={cn("flex flex-col-reverse md:flex-row gap-2", {
        "md:flex-row-reverse": showImages && showImages.position == "right",
      })}
    >
      {showImages?.show && (
        <ScrollShadow
          className={cn(
            "flex flex-row md:flex-col min-w-[170px] max-h-[500px] gap-2",
            {
              "max-h-[400px]": height == "standard",
              "max-h-[1000px]": height == "large",
            },
          )}
        >
          {images.length > 0 &&
            images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  onError={() => handleImageError(i)}
                  onLoad={() => handleImageLoad(i)}
                  onClick={() => {
                    if (clickeable) {
                      setSelectedItem(i);
                    }
                  }}
                  className={cn(
                    "min-w-[150px] w-[150px] max-h-[100px] h-[100px] min-h-[100px] rounded-md object-cover transition-all",
                    { "cursor-pointer hover:opacity-hover": clickeable },
                    { "animate-pulse": imageLoading[i] },
                  )}
                />
                {imageErrors[i] && (
                  <div className="absolute inset-0 flex flex-col items-center cursor-not-allowed w-full h-full bg-default justify-center bg-gray-200 text-center text-sm text-default-500 rounded-md">
                    <Icon icon="ban" className="text-lg" />
                    <span>Imagen no disponible</span>
                  </div>
                )}
              </div>
            ))}
        </ScrollShadow>
      )}
      <section
        className={cn("relative overflow-hidden w-full mx-auto", {
          "h-[400px] max-h-[400px] min-h-[400px]": height == "standard",
          "h-[1000px] max-h-[1000px] min-h-[1000px]": height == "large",
        })}
      >
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
                      hidden:
                        buttons &&
                        buttons.show &&
                        buttons.position === "bottom",
                    },
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
        <picture
          className={cn(
            "relative overflow-hidden select-none rounded-md flex justify-center items-center mx-auto w-full object-cover h-full",
          )}
        >
          {images.length > 0 &&
            images.map((item, i) => (
              <AnimatePresence key={i} mode="wait">
                {selectedItem === i && (
                  <>
                    {imageErrors[i] ? (
                      <motion.div
                        drag={drag ? "x" : false}
                        dragConstraints={{ right: 0, left: 0 }}
                        onDragStart={() => setIsInteracting(true)}
                        onDragEnd={(event, info) => {
                          setIsInteracting(false);

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
                        className="absolute inset-0 flex flex-col items-center w-full h-full bg-default justify-center bg-gray-200 text-center text-lg text-default-500 rounded-md"
                      >
                        <Icon icon="ban" className="text-lg" />
                        <span>Imagen no disponible</span>
                      </motion.div>
                    ) : (
                      <motion.img
                        drag={drag ? "x" : false}
                        dragConstraints={{ right: 0, left: 0 }}
                        onDragStart={() => setIsInteracting(true)}
                        onLoad={() => handleImageLoad(i)}
                        onDragEnd={(event, info) => {
                          setIsInteracting(false);

                          if (info.offset.x > 100 && selectedItem > 0) {
                            prevStepFn(i - 1);
                          } else if (
                            info.offset.x < -100 &&
                            selectedItem < images.length - 1
                          ) {
                            nextStepFn(i + 1);
                          }
                        }}
                        title={"Imagen " + i}
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
                        className={cn(
                          "object-cover object-center w-full h-full",
                          { "animate-pulse": imageLoading[i] },
                        )}
                      />
                    )}
                  </>
                )}
              </AnimatePresence>
            ))}
        </picture>

        {/* BUTTONS */}
        {buttons?.show && (
          <div>
            <div
              className={cn({
                "flex gap-4 mx-auto items-center mt-2 justify-center":
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
                startContent={
                  <Icon icon="caret-left-fill" className="text-xl" />
                }
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
    </div>
  );
};

export default Carrousel;
