"use client";

import { useState } from "react";
import Subtitle from "./Subtitle";
import Textarea from "./Textarea";
import { Validations, validateValue } from "@/hooks/useValidateForm";
import Input from "@/components/forms/Input";
import { cn } from "@/libs/utils";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";

interface Props {
  name: string;
  minRows?: number;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
  onlyTextarea?: boolean;
  validations?: (nameField: string) => Validations | undefined;
  tooltip?: { icon: string; content: string | React.ReactNode };
  label?: { value?: string; required?: boolean; className?: string };
  onChange: ({
    name,
    value,
  }: {
    name: string;
    value: string | number | null;
  }) => any;
}

const TextareaForm = ({
  name,
  defaultValue,
  placeholder,
  minRows,
  description,
  onlyTextarea = false,
  tooltip,
  label,
  validations: getValidators,
  onChange,
}: Props) => {
  const [error, setError] = useState<string | undefined>(undefined);

  const validations =
    typeof getValidators === "function" ? getValidators(name) : undefined;

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | null;
  }) => {
    const result = validateValue(value, validations);

    if (result.error) {
      setError(result.error);
    } else {
      setError(undefined);
    }

    onChange({
      name,
      value: result.value,
    });
    return { name, value: result.value };
  };

  if (onlyTextarea) {
    return (
      <Textarea
        name={name}
        minRows={minRows}
        defaultValue={defaultValue}
        description={description}
        placeholder={placeholder ?? "Ingresar " + name}
        error={error}
        onChange={handleChange}
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
      <Textarea
        name={name}
        minRows={minRows}
        defaultValue={defaultValue}
        description={description}
        placeholder={placeholder ?? "Ingresar " + name}
        error={error}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextareaForm;
