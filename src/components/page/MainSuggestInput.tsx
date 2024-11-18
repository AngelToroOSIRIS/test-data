import React, { useEffect, useState } from "react";
import MainTemplate from "@/components/page/MainTemplate";
import InputForm from "@/components/forms/InputForm";
import { Divider, Switch } from "@nextui-org/react";
import SuggestInputForm from "@/components/forms/SuggestInputForm";

const MainSuggestInput = () => {
  const [value, setValue] = useState<string | number | null>(null);
  const [placeholder, setPlaceholder] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [iconTooltip, setIconTooltip] = useState<string>("info-circle");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [required, setRequired] = useState<boolean>(false);
  const [onlyInput, setOnlyInput] = useState<boolean>(false);
  const [requiredLabel, setRequiredLabel] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("Demo");
  const [changingSelect, setChangingSelect] = useState<boolean>(false);
  const [contentTooltip, setContentTooltip] = useState<string>(
    "Este campo es solo de prueba",
  );
  const [defaultValue, setDefaultValue] = useState<string | null>(null);
  const [icon, setIcon] = useState<string | null>(null);

  const itemsString = [
    "item 1",
    "item 2",
    "item 3",
    "item 4",
    "item 5",
    "item 6",
    "item 7",
    "item 8",
    "item 9",
    "item 10",
  ];

  useEffect(() => {
    setChangingSelect(true);
    setTimeout(() => {
      setChangingSelect(false);
    }, 1);
  }, [defaultValue]);

  return (
    <MainTemplate name="SuggestInputForm">
      <div className="flex flex-col gap-4">
        {!changingSelect && (
          <SuggestInputForm
            name="demo"
            items={itemsString}
            icon={icon ?? undefined}
            onlyInput={onlyInput}
            description={description ?? ""}
            placeholder={placeholder ?? undefined}
            defaultValue={defaultValue ?? undefined}
            required={required}
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
          <b>Value:</b> {value ? value : undefined}
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
          name="placeholcer"
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

export default MainSuggestInput;
