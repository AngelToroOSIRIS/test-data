"use client";

import { useState } from "react";
import { validateValue, Validations } from "@/hooks/useValidateForm";
import Autocomplete from "@/components/forms/Autocomplete";
import Icon from "@/components/ui/Icon";
import Subtitle from "@/components/forms/Subtitle";
import { cn } from "@/libs/utils";
import Tooltip from "@/components/ui/Tooltip";

interface Props {
  items: any[];
  name: string;
  icon?: string;
  field: string;
  keyObj: string;
  children?: any;
  required?: boolean;
  className?: string;
  onlyInput?: boolean;
  description?: string;
  placeholder?: string;
  defaultValue?: string | number;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  validations?: (nameField: string) => Validations | undefined;
  tooltip?: { icon: string; content: string | React.ReactNode };
  label?: {
    value?: string;
    required?: boolean;
    className?: string;
  };
  onChange?: ({
    name,
    value,
  }: {
    name: string;
    value: string | number | null;
  }) => any;
}

export const AutocompleteForm = ({
  name,
  placeholder,
  description,
  icon,
  tooltip,
  label,
  onChange,
  validations: getValidators,
  items,
  keyObj,
  field,
  required,
  defaultValue,
  onlyInput = false,
  className,
}: Props) => {
  const [error, setError] = useState<string | undefined>(undefined);

  const validations =
    typeof getValidators === "function" ? getValidators(name) : undefined;

  const handleChange = (value: any) => {
    const result = validateValue(value ? value[keyObj] : null, validations);

    if (result.error) {
      setError(result.error);
    } else {
      setError(undefined);
    }

    if (onChange)
      onChange({
        name,
        value: result.value,
      });
    return { name, value: result.value };
  };

  if (onlyInput) {
    return (
      <Autocomplete
        className={className}
        description={description}
        placeholder={placeholder ?? "Seleccionar " + name}
        icon={icon}
        error={error}
        items={items}
        field={field}
        keyObj={keyObj}
        onChange={handleChange}
        defaultValue={defaultValue}
        required={!!(required ?? validations?.required)}
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
      <Autocomplete
        className={className}
        placeholder={placeholder ?? "Seleccionar " + name}
        error={error}
        items={items}
        field={field}
        description={description}
        keyObj={keyObj}
        onChange={handleChange}
        defaultValue={defaultValue}
        required={!!(required ?? validations?.required)}
      />
    </div>
  );
};
