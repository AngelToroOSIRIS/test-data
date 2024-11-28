"use client";

import { validateValue, Validations } from "@/hooks/useValidateForm";
import Subtitle from "./Subtitle";
import Tooltip from "../ui/Tooltip";
import Icon from "../ui/Icon";
import Input from "./Input";
import { cn } from "@/libs/utils";
import { useState } from "react";

const formatCurrency = (value: string) => {
  const prevValue = value.replace(/[^\d]/g, "");
  const formatValue = prevValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formatValue;
};

interface Props {
  name: string;
  icon?: string;
  className?: string;
  onlyInput?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  tooltip?: { icon: string; content: string | React.ReactNode };
  label?: { value?: string; required?: boolean; className?: string };
  validations?: (nameField: string) => Validations | undefined;
  onChange?: ({
    name,
    value,
  }: {
    name: string;
    value: { text: string; value: number } | null;
  }) => any;
}

const InputMoneyForm = ({
  name,
  defaultValue,
  icon = "currency-dollar",
  description,
  autoFocus = false,
  tooltip,
  className,
  placeholder,
  onlyInput,
  label,
  validations: getValidators,
  onChange,
}: Props) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string | null>(
    defaultValue ?? null,
  );

  const validations =
    typeof getValidators === "function" ? getValidators(name) : undefined;

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | null;
  }) => {
    if (!value) {
      setInputValue(null);
      if (onChange) {
        onChange({
          name,
          value: null,
        });
      }
      return;
    }

    let formattedValue = formatCurrency(value);

    const result = validateValue(formattedValue, validations);

    if (result.error) {
      setError(result.error);
    } else {
      setError(undefined);
    }

    setInputValue(formattedValue);

    const numberValue = formattedValue
      ? Number(formattedValue.replace(/[^\d]/g, ""))
      : null;

    if (onChange) {
      onChange({
        name,
        value:
          numberValue !== null
            ? { text: formattedValue, value: numberValue }
            : null,
      });
    }
  };

  if (onlyInput) {
    return (
      <Input
        name={name}
        type="text"
        icon={icon}
        error={error}
        autoFocus={autoFocus}
        className={className}
        onChange={handleChange}
        description={description}
        defaultValue={defaultValue}
        value={formatCurrency(inputValue ?? "")}
        placeholder={placeholder ?? "Ingresar " + name}
      />
    );
  }

  return (
    <div className="text-start w-full">
      <div className={cn("", { "flex gap-2": tooltip })}>
        <Subtitle
          text={
            label?.value ??
            name[0].toString().toUpperCase() +
              name.toString().substring(1) +
              ":"
          }
          required={label?.required ?? true}
          className={label?.className}
        />
        {tooltip && (
          <Tooltip content={tooltip.content}>
            <Icon
              className="text-default-400 hover:text-default-foreground transition-all"
              icon={tooltip.icon}
            />
          </Tooltip>
        )}
      </div>
      <Input
        name={name}
        icon={icon}
        type="text"
        error={error}
        className={className}
        autoFocus={autoFocus}
        onChange={handleChange}
        description={description}
        defaultValue={defaultValue}
        value={formatCurrency(inputValue ?? "")}
        placeholder={placeholder ?? "Ingresar " + name}
      />
    </div>
  );
};

export default InputMoneyForm;
