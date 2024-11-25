"use client";

import MainTemplate from "@/components/page/MainTemplate";
import Accordion from "@/components/ui/Accordion";
import { useEffect, useState } from "react";
import InputForm from "@/components/forms/InputForm";
import SelectForm from "@/components/forms/SelectForm";
import { SelectItem } from "@nextui-org/react";

const MainAccordion = () => {
  const [defaultItem, setDefaultItem] = useState<number | null>(null);
  const [variant, setVariant] = useState<string | null>(null);
  const [changingAccord, setChangingAccord] = useState(false);

  const items = [
    {
      title: "item 1",
      subtitle: "test to item 1",
      element: (
        <p className="flex justify-center items-center text-lg h-[100px]">
          Item 1
        </p>
      ),
    },
    {
      title: "item 2",
      subtitle: "test to item 2",
      element: (
        <p className="flex justify-center items-center text-lg h-[100px]">
          Item 2
        </p>
      ),
    },
    {
      title: "item 3",
      subtitle: "test to item 3",
      element: (
        <p className="flex justify-center items-center text-lg h-[100px]">
          Item 3
        </p>
      ),
    },
    {
      title: "item 4",
      subtitle: "test to item 4",
      element: (
        <p className="flex justify-center items-center text-lg h-[100px]">
          Item 4
        </p>
      ),
    },
    {
      title: "item 5",
      subtitle: "test to item 5",
      element: (
        <p className="flex justify-center items-center text-lg h-[100px]">
          Item 5
        </p>
      ),
    },
    {
      title: "item 6",
      subtitle: "test to item 6",
      element: (
        <p className="flex justify-center items-center text-lg h-[100px]">
          Item 6
        </p>
      ),
    },
    {
      title: "item 7",
      subtitle: "test to item 7",
      element: (
        <p className="flex justify-center items-center text-lg h-[100px]">
          Item 7
        </p>
      ),
    },
  ];

  useEffect(() => {
    setChangingAccord(true);
    setTimeout(() => {
      setChangingAccord(false);
    }, 1);
  }, [defaultItem]);

  return (
    <MainTemplate
      name="accordion"
      properties={[
        "className?: ClassValue;",
        "defaultOpenedItem?: number;",
        'variant?: "divider" | "splitted" | "shadow";',
        "  items: {\n" +
          "    title: string;\n" +
          "    subtitle?: string;\n" +
          "    startContent?: JSX.Element;\n" +
          "    element: JSX.Element;\n" +
          "    classnames?: {\n" +
          "      header?: ClassValue;\n" +
          "      container?: ClassValue;\n" +
          "    };\n" +
          "  }[];",
      ]}
    >
      <div>
        {!changingAccord && (
          <Accordion
            items={items}
            //@ts-ignore
            variant={variant}
            defaultOpenedItem={defaultItem ?? undefined}
          />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <InputForm
          name="defaultItem"
          type="number"
          onChange={({ value }) =>
            value ? setDefaultItem(Number(value)) : setDefaultItem(null)
          }
        />
        <SelectForm
          name="Variant"
          onChange={({ value }) =>
            value ? setVariant(String(value)) : setVariant(null)
          }
        >
          <SelectItem key="divider" textValue="divider">
            Divider
          </SelectItem>
          <SelectItem key="splitted" textValue="splitted">
            Splitted
          </SelectItem>
          <SelectItem key="shadow" textValue="shadow">
            Shadow
          </SelectItem>
        </SelectForm>
      </div>
    </MainTemplate>
  );
};

export default MainAccordion;
