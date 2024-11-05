"use client";

import MainTemplate from "@/components/page/MainTemplate";
import Password from "@/components/ui/Password";
import { useState } from "react";
import SelectForm from "@/components/forms/SelectForm";
import { Checkbox, CheckboxGroup, SelectItem } from "@nextui-org/react";
import InputForm from "@/components/forms/InputForm";
import Button from "@/components/ui/Button";

const MainPassword = () => {
  const [mode, setMode] = useState<"create" | "update">("create");
  const [text, setText] = useState<string>();
  const [texts, setTexts] = useState<string[]>([]);
  const [length, setLength] = useState<number>(8);
  const [selected, setSelected] = useState([""]);

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
        // invalidTexts={}
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
            onClick={() => {}}
          />
        </div>
        {texts && texts.length > 0 && (
          <>
            {texts.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </>
        )}
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
