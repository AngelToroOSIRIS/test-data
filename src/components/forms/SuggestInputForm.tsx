"use client";

import { useState } from "react";
import { validateValue, Validations } from "@/hooks/useValidateForm";
import { cn } from "@/libs/utils";
import Subtitle from "@/components/forms/Subtitle";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import SuggestInput from "@/components/forms/SuggestInput";

interface Props {
  name: string;
  placeholder?: string;
  icon?: string;
  items: string[];
  validations?: (nameField: string) => Validations | undefined;
  tooltip?: { icon: string; content: string | React.ReactNode };
  required?: boolean;
  onlyInput?: boolean;
  className?: string;
  description?: string;
  defaultValue?: string | number;
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
  children?: any;
}

const SuggestInputForm = ({
  name,
  onlyInput,
  label,
  validations: getValidators,
  onChange,
  tooltip,
  className,
  placeholder,
  description,
  icon,
  required,
  items,
  children,
  defaultValue,
}: Props) => {
  const [error, setError] = useState<string | undefined>(undefined);

  const validations =
    typeof getValidators === "function" ? getValidators(name) : undefined;

  const handleChange = (value: any) => {
    const result = validateValue(value ? value : null, validations);

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
      <SuggestInput
        name={name}
        error={error}
        items={items}
        className={className}
        onChange={handleChange}
        description={description}
        defaultValue={defaultValue}
        required={!!(required ?? validations?.required)}
        placeholder={placeholder ?? "Seleccionar " + name}
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
      <SuggestInput
        name={name}
        error={error}
        items={items}
        className={className}
        onChange={handleChange}
        description={description}
        defaultValue={defaultValue}
        required={!!(required ?? validations?.required)}
        placeholder={placeholder ?? "Seleccionar " + name}
      />
    </div>
  );
};

export default SuggestInputForm;
