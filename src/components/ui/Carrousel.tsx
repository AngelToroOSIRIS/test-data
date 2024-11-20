"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/libs/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button, ScrollShadow } from "@nextui-org/react";
import Icon from "@/components/ui/Icon";

interface Props {
  drag?: boolean;
  infinity?: boolean;
  defaultItem?: number;
  numberImgs?: boolean;
  fullscreen?: boolean;
  clickeable?: boolean;
  height?: "large" | "standard" | "auto";
  animate?: { show: boolean; time?: number };
  images: { sm: string; md: string; lg: string }[];
  showImages?: { show: boolean; position?: "left" | "right" };
  buttons?: {
    show: boolean;
    position?: "bottom" | "side";
  };
}

const Carrousel = ({
  images,
  animate,
  fullscreen = true,
  buttons,
  showImages,
  height = "auto",
  infinity = true,
  numberImgs = true,
  drag = true,
  defaultItem,
  clickeable = true,
}: Props) => {
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [isInteracting, setIsInteracting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState(
    defaultItem && defaultItem <= images.length ? defaultItem : 0,
  );

  const [imageErrors, setImageErrors] = useState<boolean[]>(
    new Array(images.length).fill(false),
  );
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowModal(false);
            }}
            className="fixed flex justify-center items-center top-0 left-0 w-full h-full z-40 bg-custom-black bg-opacity-85"
          >
            <Icon
              icon="x-lg"
              className="absolute top-3 right-3 bg-default flex items-center z-50 justify-center cursor-pointer p-1 w-6 h-6 rounded-large hover:text-primary transition-all"
            />
            <picture
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative overflow-hidden select-none rounded-md flex justify-center items-center mx-auto min-w-[500px] min-h-[500px]",
              )}
            >
              {/* TODO:fixed */}
              {images.length > 0 &&
                images
                  .filter((e, i) => !!!imageErrors[i])
                  .map((item, i) => {
                    return (
                      <Fragment key={i}>
                        <AnimatePresence mode="wait">
                          {imageErrors[i] && <p>Antonio</p>}

                          {!imageErrors[i] && selectedImage === i && (
                            <>
                              <motion.img
                                drag={drag ? "x" : false}
                                onError={() => handleImageError(i)}
                                onLoad={() => handleImageLoad(i)}
                                dragConstraints={{ right: 0, left: 0 }}
                                onDragStart={() => setIsInteracting(true)}
                                onDragEnd={(event, info) => {
                                  setIsInteracting(false);

                                  if (info.offset.x > 100) {
                                    if (selectedImage == 0) {
                                      return setSelectedImage(
                                        images.length - 1,
                                      );
                                    } else {
                                      setSelectedImage(selectedItem - 1);
                                    }
                                  } else if (info.offset.x < -100) {
                                    if (selectedItem == images.length - 1) {
                                      return setSelectedImage(0);
                                    } else {
                                      setSelectedImage(selectedImage + 1);
                                    }
                                  }
                                }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                                initial={{
                                  x: direction === "left" ? -2000 : 2000,
                                }}
                                exit={{
                                  position: "absolute",
                                  x: direction === "left" ? 2000 : -2000,
                                }}
                                src={item.lg}
                                className={cn(
                                  "object-cover object-center bg-default w-full h-full",
                                  {
                                    "animate-pulse": imageLoading[i],
                                  },
                                )}
                              />
                            </>
                          )}
                        </AnimatePresence>
                      </Fragment>
                    );
                  })}
            </picture>
            <div className="fixed bottom-4 flex justify-center items-center gap-4 mx-auto w-[100px]">
              <Button
                isIconOnly
                size="lg"
                color="default"
                onClick={() => {
                  if (selectedImage !== 0) {
                    setSelectedImage(selectedImage - 1);
                  } else {
                    setSelectedImage(images.length);
                  }
                }}
                className="p-2 rounded-full"
                startContent={
                  <Icon icon="caret-left-fill" className="text-xl" />
                }
              ></Button>
              <Button
                isIconOnly
                size="lg"
                color="default"
                onClick={() => {
                  if (selectedImage == images.length) {
                    setSelectedImage(0);
                  } else {
                    setSelectedImage(selectedImage + 1);
                  }
                }}
                className="p-2 rounded-full"
                startContent={
                  <Icon icon="caret-right-fill" className="text-xl" />
                }
              ></Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={cn("flex flex-col-reverse md:flex-row gap-2", {
          "md:flex-row-reverse": showImages && showImages.position == "right",
        })}
      >
        {showImages?.show && (
          <ScrollShadow
            className={cn(
              "flex flex-row md:flex-col min-w-[170px] snap-y max-h-[500px] gap-2",
              {
                "max-h-[400px]": height == "standard",
                "max-h-[1000px]": height == "large",
              },
            )}
          >
            {images.length > 0 &&
              images.map((img, i) => (
                <div key={i} className="relative snap-y ">
                  <img
                    src={img.sm}
                    onError={() => handleImageError(i)}
                    onLoad={() => handleImageLoad(i)}
                    onClick={() => {
                      setSelectedItem(i);
                    }}
                    className={cn(
                      "min-w-[150px] w-[150px] max-h-[100px] h-[100px] min-h-[100px] snap-center rounded-md object-cover transition-all",
                      { "cursor-pointer hover:opacity-hover": clickeable },
                      { "animate-pulse": imageLoading[i] },
                    )}
                  />
                  {imageErrors[i] && (
                    <div
                      onClick={() => {
                        setSelectedItem(i);
                      }}
                      className={cn(
                        "absolute inset-0 flex select-none min-w-[150px] w-[150px] snap-center max-h-[100px] h-[100px] min-h-[100px] flex-col items-center bg-default justify-center text-center text-sm text-default-500 rounded-md transition-all",
                        { "cursor-pointer hover:brightness-95": clickeable },
                      )}
                    >
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
                      "flex items-center font-semibold justify-center select-none transition-all rounded-full opacity-50 hover:opacity-100 bg-divider w-1 h-1 p-2",
                      {
                        "bg-primary text-default-white cursor-pointer":
                          selectedItem === i,
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
              "relative overflow-hidden select-none rounded-md flex justify-center items-center mx-auto w-full min-w-[200px] min-h-[200px] object-cover h-full",
            )}
          >
            {images.length > 0 &&
              images.map((item, i) => (
                <Fragment key={i}>
                  <AnimatePresence mode="wait">
                    {selectedItem === i && (
                      <>
                        {imageErrors[i] ? (
                          <motion.div
                            drag={drag ? "x" : false}
                            dragConstraints={{ right: 0, left: 0 }}
                            onDragStart={() => setIsInteracting(true)}
                            onDragEnd={(event, info) => {
                              setIsInteracting(false);

                              if (info.offset.x > 100) {
                                if (infinity && selectedItem == 0) {
                                  return prevStepFn(images.length - 1);
                                } else if (!infinity && selectedItem < 1) {
                                  return;
                                }
                                prevStepFn(i - 1);
                              } else if (info.offset.x < -100) {
                                if (
                                  infinity &&
                                  selectedItem == images.length - 1
                                ) {
                                  return nextStepFn(0);
                                } else if (
                                  !infinity &&
                                  selectedItem == images.length - 1
                                ) {
                                  return;
                                }
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
                            className="absolute inset-0 flex flex-col select-none items-center w-full h-full bg-default justify-center bg-gray-200 text-center text-lg text-default-500 rounded-md"
                          >
                            <Icon icon="ban" className="text-lg" />
                            <span>Imagen no disponible</span>
                          </motion.div>
                        ) : (
                          <motion.img
                            drag={drag ? "x" : false}
                            onError={() => handleImageError(i)}
                            onLoad={() => handleImageLoad(i)}
                            dragConstraints={{ right: 0, left: 0 }}
                            onDragStart={() => setIsInteracting(true)}
                            onDragEnd={(event, info) => {
                              setIsInteracting(false);

                              if (info.offset.x > 100) {
                                if (infinity && selectedItem == 0) {
                                  return prevStepFn(images.length - 1);
                                } else if (!infinity && selectedItem < 1) {
                                  return;
                                }
                                prevStepFn(i - 1);
                              } else if (info.offset.x < -100) {
                                if (
                                  infinity &&
                                  selectedItem == images.length - 1
                                ) {
                                  return nextStepFn(0);
                                } else if (
                                  !infinity &&
                                  selectedItem == images.length - 1
                                ) {
                                  return;
                                }
                                nextStepFn(i + 1);
                              }
                            }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                            initial={{
                              x: direction === "left" ? -2000 : 2000,
                            }}
                            exit={{
                              position: "absolute",
                              x: direction === "left" ? 2000 : -2000,
                            }}
                            src={item.lg}
                            className={cn(
                              "object-cover object-center bg-default w-full h-full",
                              { "animate-pulse": imageLoading[i] },
                            )}
                          />
                        )}
                      </>
                    )}
                  </AnimatePresence>
                </Fragment>
              ))}
            {numberImgs && (
              <div className="bg-background text-default-foreground font-medium absolute top-2 right-2 px-2 rounded-large">
                {selectedItem + 1 + "/" + images.length}
              </div>
            )}
            {fullscreen && !imageErrors[selectedItem] && (
              <Icon
                icon="arrows-fullscreen"
                onClick={() => {
                  setSelectedImage(selectedItem);
                  setShowModal(true);
                }}
                className="bg-background text-default-foreground absolute hover:text-primary cursor-pointer z-30 transition-all flex items-center justify-center bottom-2 right-2 p-2 rounded-large"
              />
            )}
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
                  size="sm"
                  color="default"
                  className={cn("rounded-full w-auto", {
                    "absolute top-[50%] bottom-[50%] self-center items-center justify-center opacity-40 left-3 rounded-full":
                      buttons.position == "side",
                    hidden:
                      !infinity &&
                      selectedItem == 0 &&
                      buttons.position === "side",
                  })}
                  isIconOnly
                  isDisabled={!infinity && selectedItem < 1}
                  onClick={() => {
                    if (infinity && selectedItem == 0) {
                      return prevStepFn(images.length - 1);
                    }
                    prevStepFn(selectedItem - 1);
                  }}
                  startContent={
                    <Icon icon="caret-left-fill" className="text-xl" />
                  }
                />
                <Button
                  size="sm"
                  color="default"
                  className={cn("rounded-full", {
                    "absolute top-[50%] bottom-[50%] self-center items-center justify-center opacity-40 right-3 rounded-full":
                      buttons.position === "side",
                    hidden:
                      !infinity &&
                      selectedItem == images.length - 1 &&
                      buttons.position === "side",
                  })}
                  isIconOnly
                  isDisabled={images.length <= selectedItem}
                  onClick={() => {
                    if (infinity && selectedItem == images.length - 1) {
                      return nextStepFn(0);
                    }
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
    </>
  );
};

export default Carrousel;
