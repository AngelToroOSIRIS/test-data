import Title from "@/components/ui/Title";
import { Divider } from "@nextui-org/react";
import { Code } from "@nextui-org/code";
import Tooltip from "@/components/ui/Tooltip";
import { useState } from "react";
import InputForm from "@/components/forms/InputForm";
import Icon from "@/components/ui/Icon";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { motion } from "framer-motion";

const MainTooltip = () => {
  const [icon, setIcon] = useState<string>("info-circle");
  const [text, setText] = useState<String>("Tooltip text");
  const [content, setContent] = useState<string>("Tooltip content");
  const [showContent, setShowContent] = useState<"icon" | "text" | "node">(
    "node",
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col md:flex-row md:justify-between w-[95%] mx-auto gap-2"
    >
      <div className="flex flex-col gap-3 bg-background rounded-large p-4 w-full max-w-[900px] ">
        <Title
          text="Demo Tooltip.tsx"
          size="title"
          className="text-3xl"
          center
        />
        <Divider className="w-[95%] bg-divider mx-auto" />
        <div className="flex mx-auto my-8">
          <Tooltip content={content}>
            {showContent == "icon" && (
              <Icon
                icon={icon}
                className="text-default-400 text-center transition-all hover:text-default-foreground text-4xl"
              />
            )}
            {showContent == "text" && (
              <p className="text-lg text-center">{text}</p>
            )}
            {showContent == "node" && (
              <>
                <div className="bg-default rounded-large p-2 hidden md:block">
                  Hover me
                </div>
                <div className="bg-default rounded-large p-2 block md:hidden ">
                  Click me
                </div>
              </>
            )}
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4">
        <Title text="Propiedades" size="medium" />
        <Code className="flex flex-col w-full mx-auto overflow-x-auto">
          <p>{"content: string | React.ReactNode;"}</p>
          <p>{"children: React.ReactNode;"}</p>
          <p>
            classNames?: {"{"} <br />
            mobile?: string, <br />
            desktop?: string, trigger?: string; <br />
            {"}"}
          </p>
        </Code>
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Title text="Test" size="medium" primary />
        <InputForm
          name="icon"
          type="text"
          onChange={({ value }) =>
            value ? setContent(String(value)) : setContent("Tooltip text")
          }
          placeholder="Ingrese content"
          label={{ value: "Content", required: false }}
        />
        <RadioGroup
          label="Item"
          className="text-center mx-auto"
          orientation="horizontal"
          value={showContent}
          // @ts-ignore
          onValueChange={setShowContent}
        >
          <Radio value="node">Node</Radio>
          <Radio value="icon">Icon</Radio>
          <Radio value="text">Text</Radio>
        </RadioGroup>
        {showContent == "icon" && (
          <InputForm
            name="icon"
            type="text"
            onChange={({ value }) =>
              value ? setIcon(String(value)) : setIcon("info-circle")
            }
            placeholder="Ingrese icon"
            label={{ value: "Icon", required: false }}
          />
        )}
        {showContent == "text" && (
          <InputForm
            name="text"
            type="text"
            onChange={({ value }) =>
              value ? setText(String(value)) : setText("Title component")
            }
            placeholder="Ingrese texto"
            label={{ value: "Text", required: false }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default MainTooltip;
