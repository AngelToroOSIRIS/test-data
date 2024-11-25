"use client";

import MainTemplate from "@/components/page/MainTemplate";
import { AutocompleteForm } from "@/components/forms/AutoCompleteForm";
import { useEffect, useState } from "react";
import InputForm from "@/components/forms/InputForm";
import { Divider, Switch } from "@nextui-org/react";

const MainAutoCompleteForm = () => {
  const [label, setLabel] = useState<string>("Demo");
  const [icon, setIcon] = useState<string | null>(null);
  const [required, setRequired] = useState<boolean>(false);
  const [onlyInput, setOnlyInput] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [value, setValue] = useState<string | number | null>(null);
  const [requiredLabel, setRequiredLabel] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [changingSelect, setChangingSelect] = useState<boolean>(false);
  const [iconTooltip, setIconTooltip] = useState<string>("info-circle");
  const [defaultValue, setDefaultValue] = useState<string | null>(null);
  const [contentTooltip, setContentTooltip] = useState<string>(
    "Este campo es solo de prueba",
  );

  const itemsObject = [
    { id: 1, label: "item 1" },
    { id: 2, label: "item 2" },
    { id: 3, label: "item 3" },
    { id: 4, label: "item 4" },
    { id: 5, label: "item 5" },
    { id: 6, label: "item 6" },
    { id: 7, label: "item 7" },
    { id: 8, label: "item 8" },
    { id: 9, label: "item 9" },
    { id: 10, label: "item 10" },
  ];

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
      name="AutoCompleteForm"
      properties={[
        "items: any[];",
        "name: string;",
        "icon?: string;",
        "field: string;",
        "keyObj: string;",
        "children?: any;",
        "required?: boolean;",
        "className?: string;",
        "onlyInput?: boolean;",
        "description: string;",
        "placeholder?: string;",
        "defaultValue?: string | number;",
        'variant?: "flat" | "bordered" | "faded" | "underlined";',
        "validations?: (nameField: string) => Validations | undefined;",
        "tooltip?: { icon: string; content: string | React.ReactNode };",
        "onChange?: ({\n" +
          "    name,\n" +
          "    value,\n" +
          "  }: {\n" +
          "    name: string;\n" +
          "    value: string | number | null;\n" +
          "  }) => any;",
        "label?: {\n" +
          "    value?: string;\n" +
          "    required?: boolean;\n" +
          "    className?: string;\n" +
          "  };",
      ]}
    >
      <div className="flex flex-col gap-4">
        {!changingSelect && (
          <AutocompleteForm
            name="Demo"
            keyObj={"id"}
            field={"label"}
            items={itemsObject}
            required={required}
            onlyInput={onlyInput}
            icon={icon ?? undefined}
            description={description ?? ""}
            placeholder={placeholder ?? undefined}
            defaultValue={defaultValue ?? undefined}
            label={{ value: label, required: requiredLabel }}
            onChange={({ value }) => (value ? setValue(value) : setValue(null))}
            tooltip={
              showTooltip
                ? { icon: iconTooltip, content: contentTooltip }
                : { icon: "", content: "" }
            }
          />
        )}
        <p className="bg-default w-auto rounded-large p-2">
          <b>Value:</b> {value ? "item " + value : undefined}
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
            isSelected={onlyInput}
            onValueChange={setOnlyInput}
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

export default MainAutoCompleteForm;
