import Title from "@/components/ui/Title";
import { Divider } from "@nextui-org/react";
import { Code } from "@nextui-org/code";
import Icon from "@/components/ui/Icon";
import { useState } from "react";
import InputForm from "@/components/forms/InputForm";

const MainIcon = () => {
  const [icon, setIcon] = useState<string>("emoji-laughing");
  const [title, setTitle] = useState<string>("Icon");

  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full max-w-[1000px] mx-auto gap-2">
      <div className="flex flex-col gap-3 bg-background rounded-large p-4 w-full max-w-[900px] ">
        <Title text="Demo Icon.tsx" size="title" className="text-3xl" center />
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Icon icon={icon} title={title} className="text-center text-8xl my-8" />
      </div>
      <div className="flex flex-col gap-4 bg-background w-full md:w-[85%] max-w-[800px] rounded-large p-4">
        <Title text="Propiedades" size="medium" />
        <Code className="flex flex-col w-full mx-auto">
          <p>{"icon: string;"}</p>
          <p>{"title?: string;"}</p>
          <p>{"onClick?: () => void;"}</p>
          <p>{"className?: string;"}</p>
        </Code>
        <Divider className="w-[95%] bg-divider mx-auto" />
        <Title text="Test" size="medium" primary />
        <InputForm
          name="icon"
          type="text"
          onChange={({ value }) =>
            value ? setIcon(String(value)) : setIcon("emoji-laughing")
          }
          placeholder="Ingrese icon"
          label={{ value: "Icon", required: false }}
        />
        <InputForm
          name="title"
          type="text"
          onChange={({ value }) =>
            value ? setTitle(String(value)) : setTitle("icon")
          }
          placeholder="Ingrese icon"
          label={{ value: "Title", required: false }}
        />
      </div>
    </div>
  );
};

export default MainIcon;
