"use client";

import Icon from "@/components/ui/Icon";
import { cn } from "@/libs/utils";
import { AutocompleteItem } from "@nextui-org/react";
import { Autocomplete as AutocompleteNextUI } from "@nextui-org/autocomplete";
import React from "react";
import { ClassValue } from "clsx";
import { validateValue, Validations } from "@/hooks/useValidateForm";

interface Props {
  items: string[];
  name: string;
  defaultValue?: string | number;
  className?: ClassValue;
  required?: boolean;
  description?: string;
  validations?: (nameField: string) => Validations | undefined;
  placeholder?: string;
  value?: string;
  error?: string;
  icon?: string;
  onChange?: (valueSelected?: any) => void;
}

const SuggestInput = ({
  value,
  defaultValue,
  required,
  name,
  description,
  placeholder,
  icon,
  validations: getValidators,
  onChange: onChangeParam,
  className,
  error,
  items,
}: Props) => {
  const validations =
    typeof getValidators === "function" ? getValidators(name) : undefined;

  const result = validateValue(value ?? null, validations);

  return (
    <AutocompleteNextUI
      isClearable={!required}
      aria-label="suggest-input"
      onValueChange={onChangeParam}
      onSelectionChange={(key) => {
        if (onChangeParam) {
          if (key) {
            onChangeParam(items.find((item) => item === key));
          } else {
            if (onChangeParam) onChangeParam(result.value);
            return result.value;
          }
        }
      }}
      startContent={
        icon && <Icon icon={icon} className={error && "text-red"} />
      }
      defaultSelectedKey={defaultValue}
      variant="bordered"
      size="lg"
      allowsCustomValue={true}
      errorMessage={error ?? null}
      isInvalid={!!error}
      placeholder={placeholder ?? "Buscar..."}
      className={cn("outline-none select-none", className)}
      classNames={{
        listboxWrapper: "dark:bg-divider",
        popoverContent: "dark:bg-divider",
      }}
      listboxProps={{
        emptyContent: "Ningún resultado",
        classNames: {
          emptyContent: "text-default-foreground",
        },
      }}
      description={description}
      inputProps={{
        classNames: {
          inputWrapper:
            "py-0 h-[48px] bg-default border-divider group-data-[focus=true]:border-default-400",
          input: "bg-default font-normal text-base",
          errorMessage: "text-sm font-medium",
          description: "text-sm font-normal text-default-foreground/85",
        },
      }}
      autoFocus={false}
    >
      {items.map((item) => (
        <AutocompleteItem className="text-foreground" key={item}>
          {item}
        </AutocompleteItem>
      ))}
    </AutocompleteNextUI>
  );
};

export default SuggestInput;
