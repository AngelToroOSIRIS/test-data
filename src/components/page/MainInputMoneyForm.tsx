"use client";

import MainTemplate from "@/components/page/MainTemplate";
import InputForm from "@/components/forms/InputForm";
import { Divider, Switch } from "@nextui-org/react";
import { useEffect, useState } from "react";
import InputMoneyForm from "@/components/forms/InputMoneyForm";

const MainInputMoneyForm = () => {
  const [label, setLabel] = useState<string>("Demo");
  const [icon, setIcon] = useState<string | null>(null);
  const [changingInput, setChangingInput] = useState(false);
  const [onlyInput, setOnlyInput] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<string | null>(null);
  const [autoFocus, setAutoFocus] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [value, setValue] = useState<{ text: string; value: number } | null>(
    null,
  );
  const [requiredLabel, setRequiredLabel] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
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
    setChangingInput(true);
    setValue(null);
    setTimeout(() => {
      setChangingInput(false);
    }, 1);
  }, [defaultValue, autoFocus]);

  return (
    <MainTemplate
      name="InputMoneyForm"
      properties={[
        "name: string;",
        "icon?: string;",
        "className?: string;",
        "onlyInput?: boolean;",
        "autoFocus?: boolean;",
        "placeholder?: string;",
        "description?: string;",
        "defaultValue?: string;",
        "tooltip?: { icon: string; content: string | React.ReactNode };",
        "label?: { value?: string; required?: boolean; className?: string };",
        "validations?: (nameField: string) => Validations | undefined;",
        "onChange?: ({\n" +
          "    name,\n" +
          "    value,\n" +
          "  }: {\n" +
          "    name: string;\n" +
          "    value: { text: string; value: number } | null;\n" +
          "  }) => any;",
      ]}
    >
      <div className="flex flex-col gap-4">
        {!changingInput && (
          <InputMoneyForm
            name="demo"
            autoFocus={autoFocus}
            onlyInput={onlyInput}
            icon={icon ?? undefined}
            description={description ?? undefined}
            placeholder={placeholder ?? undefined}
            defaultValue={defaultValue ?? undefined}
            label={{ value: label, required: requiredLabel }}
            onChange={({ value }) => setValue(value)}
            tooltip={
              showTooltip
                ? { icon: iconTooltip, content: contentTooltip }
                : { icon: "", content: "" }
            }
          />
        )}
        <div className="flex flex-col gap-2 bg-default w-auto rounded-large p-2">
          <p>
            <b>Value text:</b>{" "}
            <span className="text-[#f38d35]">
              {value?.text ? '"' + value.text + '"' : ""}
            </span>
          </p>
          <p>
            <b>Value number:</b>
            <span className="text-blue"> {value?.value}</span>
          </p>
        </div>
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
            isSelected={autoFocus}
            onValueChange={setAutoFocus}
            classNames={{ thumb: "bg-default-white", wrapper: "bg-default" }}
          >
            AutoFocus
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

export default MainInputMoneyForm;
