import Title from "@/components/ui/Title";
import { Divider, SelectItem, SliderValue, Switch } from "@nextui-org/react";
import AnimatedText from "@/components/ui/AnimateText";
import { Code } from "@nextui-org/code";
import { useEffect, useState } from "react";
import InputForm from "@/components/forms/InputForm";
import { motion } from "framer-motion";
import SelectForm from "@/components/forms/SelectForm";
import { Slider } from "@nextui-org/slider";

const MainAnimateText = () => {
  const [center, setCenter] = useState(false);
  const [value, setValue] = useState<SliderValue>(0);
  const [duration, setDuration] = useState<number>(0.5);
  const [secondText, setSecondText] = useState<string>();
  const [changingText, setChangingText] = useState<boolean>(false);
  const [text, setText] = useState<string>("Frase de prueba");
  const [animate, setAnimate] = useState<"updown" | "appear">("appear");

  useEffect(() => {
    setChangingText(true);
    setTimeout(() => {
      setChangingText(false);
    }, 1);
  }, [animate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col md:flex-row md:justify-between w-[95%] mx-auto gap-2"
    >
      <div className="flex flex-col gap-3 bg-background rounded-large p-4 w-full max-w-[900px]">
        <Title
          center
          size="title"
          className="text-3xl"
          text="Demo AnimateText.tsx"
        />
        <Divider className="w-[95%] bg-divider mx-auto" />
        {!changingText && (
          <AnimatedText
            text={text}
            center={center}
            animate={animate}
            duration={duration}
            classContainer="my-8"
            secondText={secondText ?? undefined}
            size={
              value !== 0 ? (value == 0.5 ? "medium" : "title") : "subtitle"
            }
          />
        )}
      </div>
      <div className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4">
        <Title text="Propiedades" size="medium" />
        <Code className="flex flex-col w-full mx-auto">
          <p>{"text: string;"}</p>
          <p>{"center?: boolean;"}</p>
          <p>{"duration?: number;"}</p>
          <p>{"secondText?: string;"}</p>
          <p>{"classContainer?: string;"}</p>
          <p>{'animate?: "updown" | "appear";'}</p>
          <p>{'size?: "title" | "medium" | "subtitle";'}</p>
        </Code>
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Title text="Test" size="medium" primary />
        <InputForm
          name="text"
          type="text"
          defaultValue={text}
          placeholder="Ingrese frase"
          label={{ value: "Frase", required: false }}
          onChange={({ value }) =>
            value ? setText(String(value)) : setText("Frase de prueba")
          }
        />
        <InputForm
          type="text"
          name="secondText"
          defaultValue={secondText}
          placeholder="Ingrese frase"
          label={{ value: "Segunda frase", required: false }}
          onChange={({ value }) =>
            value ? setSecondText(String(value)) : setSecondText(undefined)
          }
        />
        <SelectForm
          name="animate"
          label={{ required: false }}
          defaultValue={animate}
          onChange={({ value }) =>
            //   @ts-ignore
            value ? setAnimate(value) : setAnimate("appear")
          }
        >
          <SelectItem key="appear" textValue="appear">
            Apper
          </SelectItem>
          <SelectItem key="updown" textValue="updown">
            Updown
          </SelectItem>
        </SelectForm>
        <InputForm
          type="number"
          name="duration"
          placeholder="Ingrese duración"
          label={{ value: "Duración", required: false }}
          onChange={({ value }) => {
            value ? setDuration(Number(value)) : setDuration(0.5);
            setText("Frase de prueba");
            setSecondText(undefined);
          }}
        />
        <Switch
          isSelected={center}
          onValueChange={setCenter}
          classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
        >
          Center
        </Switch>
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

export default MainAnimateText;
