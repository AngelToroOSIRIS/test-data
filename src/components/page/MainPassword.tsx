"use client";

import MainTemplate from "@/components/page/MainTemplate";
import Password from "@/components/ui/Password";
import { useEffect, useState } from "react";
import SelectForm from "@/components/forms/SelectForm";
import {
  Checkbox,
  CheckboxGroup,
  Divider,
  ScrollShadow,
  SelectItem,
} from "@nextui-org/react";
import InputForm from "@/components/forms/InputForm";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const MainPassword = () => {
  const [text, setText] = useState<string>();
  const [selected, setSelected] = useState([""]);
  const [length, setLength] = useState<number>(8);
  const [texts, setTexts] = useState<string[]>([]);
  const [changeText, setChangeText] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");

  const filterTexts = (text: string) => {
    const newText = texts.filter((t) => t != text);
    setTexts(newText);
  };

  const addText = () => {
    if (text) {
      setTexts([...texts, text]);
      setText(undefined);
    }
  };

  const refreshComponent = () => {
    setChangeText(true);
    setTimeout(() => {
      setChangeText(false);
      addText();
    }, 1);
  };

  return (
    <MainTemplate
      properties={[
        'mode?: "create" | "update";',
        "invalidTexts?: string[];",
        "length?: number;",
      ]}
      name="Password"
    >
      <Password
        mode={mode}
        length={length}
        invalidTexts={texts}
        callback={() => {}}
        requirements={{
          minLength: selected.includes("longitud"),
          lowerCase: selected.includes("minusculas"),
          upperCase: selected.includes("mayusculas"),
          chartSpecials: selected.includes("especiales"),
        }}
      />
      <div className="flex flex-col gap-4">
        <SelectForm
          name="modo"
          label={{ required: false }}
          // @ts-ignore
          onChange={({ value }) => (value ? setMode(value) : undefined)}
        >
          <SelectItem
            key="create"
            textValue="Create"
            className="text-default-foreground"
          >
            Create
          </SelectItem>
          <SelectItem
            key="update"
            textValue="Update"
            className="text-default-foreground"
          >
            Update
          </SelectItem>
        </SelectForm>
        <InputForm
          type="number"
          name="longitud"
          label={{ required: false }}
          onChange={({ value }) =>
            value ? setLength(Number(value)) : undefined
          }
        />
        <div className="flex items-end justify-between gap-4">
          {!changeText && (
            <>
              <InputForm
                name="textos invalidos"
                label={{ required: false }}
                onChange={({ value }) =>
                  value ? setText(String(value)) : setText(undefined)
                }
              />
              <Button
                icon="plus-lg"
                disabled={!text}
                className="w-auto mb-1"
                onClick={refreshComponent}
              />
            </>
          )}
        </div>
        <ScrollShadow className="flex flex-col max-h-[150px] gap-2">
          {texts && texts.length > 0 && (
            <>
              {texts.map((text, i) => (
                <p
                  className="flex w-full justify-between p-3 bg-default rounded-xl border-2 border-divider"
                  key={i}
                >
                  {text}
                  <Icon
                    icon="x-lg"
                    onClick={() => {
                      filterTexts(text);
                    }}
                    className="bg-soft-red p-1 flex justify-center cursor-pointer items-center bg-opacity-50 hover:bg-opacity-100 rounded-md hover:text-primary transition-all w-6 h-6"
                  />
                </p>
              ))}
            </>
          )}
        </ScrollShadow>
        <Divider className="bg-divider mx-auto w-[95%]" />
        <div>
          <CheckboxGroup
            value={selected}
            label="Validaciones"
            className="text-center"
            onValueChange={setSelected}
          >
            <Checkbox value="longitud">Longitud</Checkbox>
            <Checkbox value="mayusculas">Mayúscular</Checkbox>
            <Checkbox value="minusculas">Minúsculas</Checkbox>
            <Checkbox value="especiales">Caracteres especiales</Checkbox>
          </CheckboxGroup>
        </div>
      </div>
    </MainTemplate>
  );
};

export default MainPassword;
