"use client";

import { Textarea as TextareaNextUi } from "@nextui-org/react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  name: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  minRows?: number;
  error?: string;
  onChange?: ({ name, value }: { name: string; value: string | null }) => any;
  disabled?: boolean;
  description?: string;
}

const Textarea = ({
  name,
  placeholder,
  className,
  defaultValue,
  minRows = 6,
  error,
  onChange,
  disabled,
  description,
}: Props) => {
  return (
    <TextareaNextUi
      radius="lg"
      size="lg"
      variant="faded"
      classNames={{
        errorMessage: "text-sm font-medium",
        label: "hidden",
        input: "bg-default",
        inputWrapper: "bg-default border-divider",
      }}
      minRows={minRows}
      className={twMerge(clsx("outline-none select-none", className))}
      isDisabled={disabled}
      isInvalid={error ? true : false}
      errorMessage={error ?? null}
      description={description}
      placeholder={placeholder}
      defaultValue={defaultValue}
      name={name}
      onChange={(e) => {
        if (onChange) {
          const value = String(e.target.value).trim();
          onChange({
            name: String(e.target.name).trim(),
            value: value !== "" ? value : null,
          });
        }
      }}
    />
  );
};

export default Textarea;
