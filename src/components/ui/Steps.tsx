"use client";

import { Fragment, useEffect, useState } from "react";
import { cn } from "@/libs/utils";
import { AnimatePresence, motion, steps } from "framer-motion";
import { Button, Progress } from "@nextui-org/react";
import Icon from "@/components/ui/Icon";

interface Step {
  index: number;
  value: number;
}

interface Props {
  step?: number;
  drag?: boolean;
  clickeable?: boolean;
  defaultItem?: number;
  children: React.ReactNode[];
  type?: "steps" | "carousel";
  actualValue?: (value: number) => void;
  external?: { back: () => void; next: () => void };
  buttons?: {
    show: boolean;
    position?: "bottom" | "side";
  };
}

const Steps = ({
  children,
  clickeable = false,
  drag = true,
  type = "steps",
  defaultItem,
  step,
  actualValue,
  buttons,
  external,
}: Props) => {
  const [stepsArray, setStepsArray] = useState<Step[]>([]);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [selectedStep, setSelectedStep] = useState(
    defaultItem && defaultItem <= children.length ? defaultItem : 1,
  );
  const [valueStep, setValueStep] = useState(0);

  const createSteps = (steps: number) => {
    const newStepsArray = Array.from({ length: steps }, (_, i) => ({
      index: i + 1,
      value: defaultItem && defaultItem > i + 1 ? 100 : 0,
    }));
    setStepsArray(newStepsArray);
  };

  const prevStepFn = (currentSelected: number) => {
    setDirection("left");

    const updatedSteps = stepsArray.map((item) => {
      if (item.index === currentSelected - 1) {
        return { ...item, value: 0 };
      }
      return item;
    });
    setStepsArray(updatedSteps);

    setSelectedStep(currentSelected - 1);
  };

  const nextStepFn = (currentSelected: number) => {
    setDirection("right");

    const updatedSteps = stepsArray.map((item) => {
      if (item.index === currentSelected) {
        return { ...item, value: 100 };
      }
      return item;
    });
    setStepsArray(updatedSteps);

    setSelectedStep(currentSelected + 1);
  };

  useEffect(() => {
    createSteps(children.length);
  }, [children.length]);

  useEffect(() => {
    if (step && step > 0 && step <= children.length) {
      if (step < selectedStep) {
        prevStepFn(step + 1);
      } else {
        nextStepFn(step - 1);
      }
    }
  }, [step]);

  useEffect(() => {
    if (actualValue) {
      actualValue(selectedStep);
    }
    setValueStep((100 / (children.length - 1)) * (selectedStep - 1));
  }, [selectedStep]);

  return (
    <>
      <div
        className={cn(
          "flex justify-between w-full p-1 overflow-auto items-center gap-2",
          {
            "absolute left-[50%] overflow-visible self-center items-center bottom-4 justify-center right-[50%] w-auto z-50":
              type == "carousel",
          },
        )}
      >
        {/* HEAD */}
        <div
          className={cn(
            "flex justify-between w-auto mx-auto items-center z-50 gap-2",
            { "w-full": children.length > 5 },
          )}
        >
          {stepsArray &&
            stepsArray.map((step, i) => (
              <Fragment key={i}>
                <div
                  className={cn(
                    "flex items-center font-semibold justify-center select-none transition-all rounded-full p-4 w-8 h-8 bg-default",
                    {
                      "bg-primary text-default-white":
                        selectedStep === step.index,
                    },
                    {
                      hidden: stepsArray.length > 5 && type === "steps",
                    },
                    {
                      "bg-divider w-1 h-1 p-2 hover:scale-110":
                        type == "carousel",
                    },
                    {
                      "text-default-400": step.index < selectedStep,
                    },
                    {
                      "bg-primary text-default-white":
                        selectedStep === step.index && type == "carousel",
                    },
                    {
                      "cursor-pointer hover:text-default-foreground hover:opacity-70":
                        clickeable &&
                        ((selectedStep !== step.index &&
                          step.index == selectedStep + 1) ||
                          step.index == selectedStep - 1 ||
                          type !== "steps"),
                    },
                  )}
                  onClick={() => {
                    if (!clickeable) return;

                    if (
                      (clickeable &&
                        selectedStep !== step.index &&
                        step.index == selectedStep + 1) ||
                      step.index == selectedStep - 1 ||
                      (clickeable && type !== "steps")
                    ) {
                      if (selectedStep < step.index) {
                        nextStepFn(selectedStep);
                      } else {
                        prevStepFn(selectedStep);
                      }
                    }
                  }}
                >
                  <p className={type === "carousel" ? "hidden" : "block"}>
                    {step.index}
                  </p>
                </div>
                {type == "steps" && (
                  <Progress
                    value={step.value}
                    size="sm"
                    color={step.value != 0 ? "primary" : "default"}
                    className={cn(
                      "last:hidden w-[50px] md:min-w-[100px] md:w-[100px]",
                      {
                        hidden: stepsArray.length > 5 && type === "steps",
                      },
                    )}
                  />
                )}
              </Fragment>
            ))}
          {stepsArray.length > 5 && type == "steps" && (
            <div className="w-full">
              <Progress
                size="md"
                color="primary"
                value={valueStep}
                label={"Completado"}
                className="w-full"
                classNames={{
                  labelWrapper: "font-semibold",
                }}
                showValueLabel={type == "steps" && children.length > 5}
              />
            </div>
          )}
        </div>
      </div>

      {/* CHILDRENS */}
      <div className="relative overflow-hidden mx-auto w-full">
        {children.length > 0 &&
          children.map((item, i) => (
            <AnimatePresence key={i} mode="wait">
              {selectedStep === i + 1 && (
                <motion.div
                  drag={drag ? "x" : false}
                  dragConstraints={{ right: 0, left: 0 }}
                  onDragEnd={(event, info) => {
                    if (info.offset.x > 100 && selectedStep > 1) {
                      prevStepFn(selectedStep);
                    } else if (
                      info.offset.x < -100 &&
                      selectedStep < children.length
                    ) {
                      nextStepFn(selectedStep);
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
                >
                  {item}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
      </div>

      {/* BUTTONS */}
      {buttons?.show && (
        <div>
          <div
            className={cn("", {
              "flex gap-4 mx-auto items-center justify-center":
                buttons.position == "bottom",
              "flex justify-center": buttons.position == "side",
            })}
          >
            <Button
              color="primary"
              className={cn("rounded-full", {
                "absolute top-[50%] bottom-[50%] self-center mt-[80px] items-center justify-center left-8 rounded-full":
                  buttons.position == "side",
                hidden: selectedStep == 1,
              })}
              isIconOnly={!external}
              isDisabled={!external && selectedStep < 2}
              onClick={() => {
                if (selectedStep < 2 && external) {
                  external.back();
                  return;
                }
                prevStepFn(selectedStep);
              }}
              startContent={
                selectedStep < 2 && external ? (
                  <p>Volver</p>
                ) : (
                  <Icon icon="caret-left-fill" className="text-lg" />
                )
              }
            />
            <Button
              color="primary"
              className={cn("rounded-full", {
                "absolute top-[50%] bottom-[50%] self-center mt-[80px] items-center justify-center right-8 rounded-full":
                  buttons.position === "side",
                hidden: selectedStep == children.length,
              })}
              isIconOnly={!external}
              isDisabled={!external && children.length <= selectedStep}
              onClick={() => {
                if (children.length <= selectedStep && external) {
                  external.next();
                  return;
                }
                nextStepFn(selectedStep);
              }}
              startContent={
                children.length <= selectedStep && external ? (
                  <p>Continuar</p>
                ) : (
                  <Icon icon="caret-right-fill" className="text-lg" />
                )
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Steps;
