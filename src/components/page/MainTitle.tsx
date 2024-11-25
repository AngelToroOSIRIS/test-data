"use client";

import { useState } from "react";
import Title from "@/components/ui/Title";
import InputForm from "@/components/forms/InputForm";
import { Divider, SliderValue, Switch } from "@nextui-org/react";
import { Slider } from "@nextui-org/slider";
import { Code } from "@nextui-org/code";
import { motion } from "framer-motion";

const MainTitle = () => {
  const [center, setCenter] = useState(false);
  const [primary, setPrimary] = useState(false);
  const [value, setValue] = useState<SliderValue>(0);
  const [background, setBackground] = useState(false);
  const [text, setText] = useState<string>("Title component");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, position: "absolute" }}
      className="flex flex-col md:flex-row md:justify-between w-full mx-auto gap-2"
    >
      <div className="flex flex-col gap-3 bg-background rounded-large p-4 w-full ">
        <Title text="Demo Title.tsx" className="text-3xl" center />
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Title
          text={text}
          center={center}
          primary={primary}
          className="my-5"
          background={background}
          size={value !== 0 ? (value == 0.5 ? "medium" : "title") : "subtitle"}
        />
      </div>
      <div className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4">
        <Title text="Propiedades" size="medium" />
        <Code className="flex flex-col w-full mx-auto">
          <p>{"text?: string;"}</p>
          <p>{"center? : boolean;"}</p>
          <p>{"primary? : boolean;"}</p>
          <p>{"className?: string;"}</p>
          <p>{"background? : boolean;"}</p>
          <p>{"onClick? : () => void;"}</p>
          <p>{"size?: title | medium | subtitle;"}</p>
        </Code>
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Title text="Test" size="medium" primary />
        <InputForm
          name="text"
          type="text"
          placeholder="Ingrese texto"
          label={{ value: "Text", required: false }}
          onChange={({ value }) =>
            value ? setText(String(value)) : setText("Title component")
          }
        />
        <div className="flex justify-between">
          <Switch
            isSelected={center}
            onValueChange={setCenter}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Center
          </Switch>
          <Switch
            isSelected={primary}
            onValueChange={setPrimary}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Primary
          </Switch>
          <Switch
            isSelected={background}
            onValueChange={setBackground}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Background
          </Switch>
        </div>
        <Slider
          step={0.5}
          showSteps
          value={value}
          onChange={setValue}
          label="Size"
          renderValue={({ children, ...props }) => (
            <p>
              {children != 0
                ? children == 0.5
                  ? "Medium"
                  : "Title"
                : "Subtitle"}
            </p>
          )}
          maxValue={1}
          minValue={0}
          color="primary"
          classNames={{
            thumb: "bg-default-white",
            step: "bg-default",
            track: "bg-default",
            filler: "bg-primary",
          }}
        />
      </div>
    </motion.div>
  );
};

export default MainTitle;
