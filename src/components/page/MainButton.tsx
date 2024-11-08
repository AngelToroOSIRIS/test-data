import Title from "@/components/ui/Title";
import { Divider, ScrollShadow, SelectItem, Switch } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Code } from "@nextui-org/code";
import Button from "@/components/ui/Button";
import { useState } from "react";
import InputForm from "@/components/forms/InputForm";
import SelectForm from "@/components/forms/SelectForm";

const MainButton = () => {
  const [text, setText] = useState<string>("Buttom");
  const [icon, setIcon] = useState<string>("");
  const [iconR, setIconR] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [onDoubleClick, setOnDoubleClick] = useState(false);
  const [color, setColor] = useState<
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "green"
    | "blue"
    | "gray"
    | "red"
  >();

  const colors = [
    "primary",
    "secondary",
    "danger",
    "success",
    "green",
    "blue",
    "gray",
    "red",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col md:flex-row md:justify-between w-full mx-auto gap-2"
    >
      <div className="flex flex-col gap-3 bg-background rounded-large p-4 w-full max-w-[900px] ">
        <Title
          center
          size="title"
          className="text-3xl"
          text="Demo Button.tsx"
        />
        <Divider className="w-[95%] bg-divider mx-auto" />
        <div className="flex flex-col gap-2 mx-auto my-8">
          <Button
            text={text}
            icon={icon}
            title={title}
            iconR={iconR}
            color={color}
            animate={animate}
            loading={loading}
            disabled={disabled}
            className="w-auto mx-auto"
            onDoubleClick={() => {
              if (onDoubleClick) {
                alert("Hola mundo!");
              }
            }}
          />
          {onDoubleClick && (
            <p className="text-center font-semibold select-none text-lg text-default-400 ">
              Da doble click al botón
            </p>
          )}
        </div>
      </div>
      <ScrollShadow className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4 max-h-[800px]">
        <Title text="Propiedades" size="medium" />
        <Code className="flex flex-col w-full mx-auto min-h-[300px] overflow-x-auto">
          <p>{"text?: string;"}</p>
          <p>{"ref?: React.Ref<HTMLButtonElement | null>;"}</p>
          <p>{"animate?: boolean;"}</p>
          <p>{"icon?: string | React.ReactNode;"}</p>
          <p>{"iconR?: string | React.ReactNode;"}</p>
          <p>
            color?: {'"primary"'}
            <br />
            {'| "secondary"'}
            <br />
            {'| "danger"'}
            <br />
            {'| "success" '}
            <br />
            {'| "green" '}
            <br />
            {'| "blue" '}
            <br />
            {'| "gray" '}
            <br />
            {'| "red" '}
            <br />
          </p>
          <p>{"target?: string;"}</p>
          <p>{"title?: string;"}</p>
          <p>{"form?: string;"}</p>
          <p>{"loading?: boolean;"}</p>
          <p>{"disabled?: boolean;"}</p>
          <p>{"className?: string;"}</p>
          <p>{"onClick?: any;"}</p>
          <p>{"noSubmit?: boolean;"}</p>
          <p>{"onDoubleClick?: any;"}</p>
        </Code>
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Title text="Test" size="medium" primary />
        <InputForm
          name="text"
          type="text"
          placeholder="Ingrese texto"
          label={{ value: "Texto", required: false }}
          onChange={({ value }) =>
            value ? setText(String(value)) : setText("Button")
          }
        />
        <InputForm
          type="text"
          name="title"
          placeholder="Ingrese title"
          label={{ value: "Title", required: false }}
          onChange={({ value }) =>
            value ? setTitle(String(value)) : setTitle("")
          }
        />
        <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center">
          <InputForm
            name="icon"
            type="text"
            placeholder="Ingrese icon"
            label={{ value: "Icon", required: false }}
            onChange={({ value }) =>
              value ? setIcon(String(value)) : setIcon("emoji-laughing")
            }
          />
          <InputForm
            type="text"
            name="iconR"
            placeholder="Ingrese iconR"
            label={{ value: "IconR", required: false }}
            onChange={({ value }) =>
              value ? setIconR(String(value)) : setIconR("")
            }
          />
        </div>
        <SelectForm
          name="color"
          label={{ required: false }}
          onChange={({ value }) =>
            //   @ts-ignore
            value ? setColor(String(value)) : setColor("primary")
          }
        >
          {colors.map((color) => (
            <SelectItem
              key={color}
              className="text-default-foreground"
              textValue={color}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </SelectItem>
          ))}
        </SelectForm>
        <div className="flex justify-between mx-auto gap-8">
          <Switch
            isSelected={animate}
            onValueChange={setAnimate}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Animate
          </Switch>
          <Switch
            isSelected={loading}
            onValueChange={setLoading}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Loading
          </Switch>
        </div>
        <div className="flex justify-between mx-auto gap-8">
          <Switch
            isSelected={disabled}
            onValueChange={setDisabled}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Disabled
          </Switch>
          <Switch
            isSelected={onDoubleClick}
            onValueChange={setOnDoubleClick}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            DoubleTap
          </Switch>
        </div>
      </ScrollShadow>
    </motion.div>
  );
};

export default MainButton;
