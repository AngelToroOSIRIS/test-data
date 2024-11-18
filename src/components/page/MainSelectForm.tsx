"use client";

import MainTemplate from "@/components/page/MainTemplate";
import SelectForm from "@/components/forms/SelectForm";
import { Divider, SelectItem, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";
import InputForm from "@/components/forms/InputForm";

const items: { key: number; label: string }[] = [
  { key: 1, label: "item 1" },
  { key: 2, label: "item 2" },
  { key: 3, label: "item 3" },
  { key: 4, label: "item 4" },
  { key: 5, label: "item 5" },
  { key: 6, label: "item 6" },
  { key: 7, label: "item 7" },
  { key: 8, label: "item 8" },
  { key: 9, label: "item 9" },
  { key: 10, label: "item 10" },
];

const MainSelectForm = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [value, setValue] = useState<string | number | null>(null);
  const [placeholder, setPlaceholder] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [defaultValue, setDefaultValue] = useState<string | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const [onlySelect, setOnlySelect] = useState<boolean>(false);
  const [changingSelect, setChangingSelect] = useState<boolean>(false);
  const [required, setRequired] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [requiredLabel, setRequiredLabel] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("Demo");
  const [iconTooltip, setIconTooltip] = useState<string>("info-circle");
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
    setChangingSelect(true);
    setTimeout(() => {
      setChangingSelect(false);
    }, 1);
  }, [defaultValue]);

  return (
    <MainTemplate
      name="SelectForm"
      properties={[
        "name: string;",
        "icon?: string;",
        "children?: any;",
        "required?: boolean;",
        "className?: string;",
        "onlySelect?: boolean;",
        "placeholder?: string;",
        "description?: string;",
        "isDisabled?: boolean;",
        "defaultValue?: string;",
        'variant?: "flat" | "bordered" | "faded" | "underlined";',
        "tooltip?: { icon: string; content: string | React.ReactNode };",
        "validations?: (nameField: string) => Validations | undefined;",
        "label?: { value?: string; required?: boolean; className?: string };",
        "onChange?: ({\n" +
          "    name,\n" +
          "    value,\n" +
          "  }: {\n" +
          "    name: string;\n" +
          "    value: string | number | null;\n" +
          "  }) => any;",
      ]}
    >
      <div className="flex flex-col gap-4">
        {!changingSelect && (
          <SelectForm
            name="demo"
            isDisabled={isDisabled}
            required={required}
            onlySelect={onlySelect}
            label={{ value: label, required: requiredLabel }}
            placeholder={placeholder ?? undefined}
            description={description ?? undefined}
            tooltip={
              showTooltip
                ? { icon: iconTooltip, content: contentTooltip }
                : { icon: "", content: "" }
            }
            icon={icon ?? undefined}
            defaultValue={defaultValue ?? undefined}
            onChange={({ value }) => setValue(value)}
          >
            {items.map((item) => (
              <SelectItem key={item.key} textValue={item.label}>
                {item.label}
              </SelectItem>
            ))}
          </SelectForm>
        )}
        <p className="bg-default w-auto rounded-large p-2">
          <b>Value:</b> {value ? `Item ${value}` : undefined}
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
        <InputForm
          name="icon"
          onChange={({ value }) =>
            value ? setIcon(String(value)) : setIcon(null)
          }
        />
        <div className="flex justify-between mx-auto gap-2">
          <Switch
            isSelected={onlySelect}
            onValueChange={setOnlySelect}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            OnlyInput
          </Switch>
          <Switch
            isSelected={required}
            onValueChange={setRequired}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            Required select
          </Switch>
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

export default MainSelectForm;
