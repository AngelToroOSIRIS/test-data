import {
  Autocomplete as AutocompleteNextUI,
  AutocompleteItem,
} from "@nextui-org/react";
import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import Icon from "@/components/ui/Icon";
import React from "react";

interface Props {
  items: any[];
  defaultValue?: string | number;
  keyObj: string;
  customValue?: boolean;
  className?: ClassValue;
  field: string;
  required?: boolean;
  description?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  icon?: string;
  onChange?: (valueSelected: any) => void;
}

const Autocomplete = ({
  items,
  defaultValue,
  keyObj,
  className,
  customValue = false,
  field,
  required,
  description,
  placeholder,
  value,
  error,
  icon,
  onChange: onChangeParam,
}: Props) => {
  const defaultItem = defaultValue
    ? items.find((i) => String(i[keyObj]) === String(defaultValue))
    : undefined;

  return (
    <AutocompleteNextUI
      isClearable={!required}
      aria-label="autocomplete-input"
      onSelectionChange={(key) => {
        if (onChangeParam)
          onChangeParam(
            items.find((item) => String(item[keyObj]) === String(key)),
          );
      }}
      startContent={
        icon && <Icon icon={icon} className={error && "text-red"} />
      }
      defaultSelectedKey={
        defaultItem && defaultItem[field]
          ? defaultItem[keyObj].toString()
          : undefined
      }
      variant="bordered"
      size="lg"
      allowsCustomValue={customValue}
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
        <AutocompleteItem className="text-foreground" key={item[keyObj]}>
          {item[field]}
        </AutocompleteItem>
      ))}
    </AutocompleteNextUI>
  );
};

export default Autocomplete;
