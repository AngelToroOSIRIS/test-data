"use client";

import { useState } from "react";
import Subtitle from "./Subtitle";
import Textarea from "./Textarea";
import { Validations, validateValue } from "@/hooks/useValidateForm";

interface Props {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  minRows?: number;
  label?: { value?: string; required?: boolean };
  validations?: (nameField: string) => Validations | undefined;
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

  return (
    <div className="text-start w-full">
      <Subtitle
        text={
          label?.value ??
          name[0].toString().toUpperCase() + name.toString().substring(1) + ":"
        }
        required={label?.required ?? true}
      />
      <Textarea
        name={name}
        minRows={minRows}
        defaultValue={defaultValue}
        placeholder={placeholder ?? "Ingresar " + name}
        error={error}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextareaForm;
