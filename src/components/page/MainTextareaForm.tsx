"use client";

import MainTemplate from "@/components/page/MainTemplate";
import TextareaForm from "@/components/forms/TextareaForm";
import { useEffect, useState } from "react";
import InputForm from "@/components/forms/InputForm";
import { Divider, Switch } from "@nextui-org/react";

const MainTextareaForm = () => {
  const [label, setLabel] = useState<string>("Demo");
  const [minRows, setMinRows] = useState<number>(6);
  const [value, setValue] = useState<string | number | null>(null);
  const [defaultValue, setDefaultValue] = useState<string | null>(null);
  const [requiredLabel, setRequiredLabel] = useState<boolean>(false);
  const [changingTextarea, setChangingTextarea] = useState(false);
  const [onlyTextarea, setOnlyTextarea] = useState<boolean>(false);
  const [iconTooltip, setIconTooltip] = useState<string>("info-circle");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [contentTooltip, setContentTooltip] = useState<string>(
    "Este campo es solo de prueba",
  );

  useEffect(() => {
    if (!showTooltip) {
      setIconTooltip("info-circle");
      setContentTooltip("Este campo es solo de prueba");
    }
  }, [showTooltip]);

  useEffect(() => {
    setChangingTextarea(true);
    setTimeout(() => {
      setChangingTextarea(false);
    }, 1);
  }, [defaultValue]);

  return (
    <MainTemplate
      name="TextareaForm"
      properties={[
        "name: string;",
        "minRows?: number;",
        "description?: string;",
        "placeholder?: string;",
        "defaultValue?: string;",
        "onlyTextarea?: boolean;",
        "validations?: (nameField: string) => Validations | undefined;",
        "tooltip?: { icon: string; content: string | React.ReactNode };",
        "label?: { value?: string; required?: boolean; className?: string };",
        "onChange: ({\n" +
          "    name,\n" +
          "    value,\n" +
          "  }: {\n" +
          "    name: string;\n" +
          "    value: string | number | null;\n" +
          "  }) => any;",
      ]}
    >
      <div className="flex flex-col gap-4">
        {!changingTextarea && (
          <>
            <TextareaForm
              name="demo"
              minRows={minRows}
              description={description ?? undefined}
              label={{ value: label, required: requiredLabel }}
              tooltip={
                showTooltip
                  ? { icon: iconTooltip, content: contentTooltip }
                  : { icon: "", content: "" }
              }
              placeholder={placeholder ?? undefined}
              onlyTextarea={onlyTextarea}
              defaultValue={defaultValue ?? undefined}
              onChange={({ value }) => setValue(value)}
            />
          </>
        )}
        <p className="bg-default w-auto rounded-large p-2">
          <b>Value:</b> {value}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end gap-4">
          <InputForm
            name="label"
            onChange={({ value }) =>
              value ? setLabel(String(value)) : setLabel("Demo")
            }
          />
          <Switch
            isSelected={requiredLabel}
            onValueChange={setRequiredLabel}
            classNames={{
              thumb: "bg-default-white",
              wrapper: "bg-default mb-3",
              label: "text-center mb-4",
            }}
          >
            required
          </Switch>
        </div>
        <InputForm
          name="placeholder"
          onChange={({ value }) =>
            value ? setPlaceholder(String(value)) : setPlaceholder(null)
          }
        />
        <InputForm
          name="minrows"
          description={"10 max"}
          defaultValue={"6"}
          onChange={({ value }) => {
            value ? setMinRows(Number(value)) : setMinRows(6);
          }}
        />
        <InputForm
          name="description"
          onChange={({ value }) =>
            value ? setDescription(String(value)) : setDescription(null)
          }
        />
        <InputForm
          name="defaultValue"
          onChange={({ value }) => {
            value ? setDefaultValue(String(value)) : setDefaultValue(null);
          }}
        />
        <div className="flex justify-between mx-auto gap-2">
          <Switch
            isSelected={onlyTextarea}
            onValueChange={setOnlyTextarea}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            OnlyTextarea
          </Switch>
          {/*<Switch*/}
          {/*    isSelected={autoFocus}*/}
          {/*    onValueChange={setAutoFocus}*/}
          {/*    classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}*/}
          {/*>*/}
          {/*    AutoFocus*/}
          {/*</Switch>*/}
          <Switch
            isSelected={showTooltip}
            onValueChange={setShowTooltip}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Show tooltip
          </Switch>
        </div>
        {showTooltip && (
          <div className="flex flex-col gap-4">
            <Divider className="bg-divider mx-auto w-[95%]" />
            <InputForm
              name="icon"
              onChange={({ value }) =>
                value
                  ? setIconTooltip(String(value))
                  : setIconTooltip("info-circle")
              }
            />
            <InputForm
              name="content"
              onChange={({ value }) =>
                value
                  ? setContentTooltip(String(value))
                  : setContentTooltip("Este campo es solo de prueba")
              }
            />
          </div>
        )}
      </div>
    </MainTemplate>
  );
};

export default MainTextareaForm;
