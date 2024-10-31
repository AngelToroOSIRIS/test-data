import Title from "@/components/ui/Title";
import { Divider } from "@nextui-org/react";
import AnimatedText from "@/components/ui/AnimateText";
import { Code } from "@nextui-org/code";
import { useState } from "react";
import InputForm from "@/components/forms/InputForm";
import { motion } from "framer-motion";

const MainAnimateText = () => {
  const [text, setText] = useState<string>("Frase de prueba");
  const [secondText, setSecondText] = useState<string>();
  const [duration, setDuration] = useState<number>(0.5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col md:flex-row md:justify-between w-full max-w-[1000px] mx-auto gap-2"
    >
      <div className="flex flex-col gap-3 bg-background rounded-large p-4 w-full max-w-[900px] ">
        <Title
          text="Demo AnimateText.tsx"
          size="title"
          className="text-3xl"
          center
        />
        <Divider className="w-[95%] bg-divider mx-auto" />
        <AnimatedText
          text={text}
          duration={duration}
          classContainer="my-8"
          secondText={secondText ?? undefined}
        />
      </div>
      <div className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4">
        <Title text="Propiedades" size="medium" />
        <Code className="flex flex-col w-full mx-auto">
          <p>{"text: string;"}</p>
          <p>{"secondText?: string;"}</p>
          <p>{"classContainer?: string;"}</p>
          <p>{"duration?: number;"}</p>
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
      </div>
    </motion.div>
  );
};

export default MainAnimateText;
