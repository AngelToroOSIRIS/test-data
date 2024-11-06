import React from "react";
import { Select as SelectNextUi } from "@nextui-org/react";
import Icon from "../ui/Icon";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface Props {
  name?: string;
  icon?: string;
  placeholder?: string;
  required?: boolean;
  disallowEmptySelection?: boolean;
  value?: string;
  description?: string;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  defaultValue?: string;
  defaultValues?: string[];
  selectedKeys?: string[];
  selectionMode?: "multiple" | "single";
  className?: string;
  isDisabled?: boolean;
  disabledKeys?: string[];
  error?: string;
  onChange?: ({ name, value }: { name: string; value: string | null }) => any;
  children?: any;
}

const Select = ({
  name,
  icon,
  placeholder,
  description,
  required,
  disallowEmptySelection,
  className,
  isDisabled = false,
  disabledKeys,
  error,
  value,
  variant = "faded",
  defaultValue,
  defaultValues,
  selectionMode,
  onChange,
  children,
}: Props) => {
  return (
    <SelectNextUi
      aria-label={name}
      radius="lg"
      description={description}
      size="md"
      startContent={
        icon && (
          <Icon
            icon={icon}
            className={error ? "text-red" : "text-foreground-400"}
          />
        )
      }
      placeholder={placeholder ?? "Seleccionar una opción"}
      errorMessage={error ?? null}
      isInvalid={!!error}
      classNames={{
        trigger: "h-[48px] px-3 bg-default border-divider",
        errorMessage: "text-sm font-medium",
        value: "text-base text-default-foreground",
        selectorIcon: "text-default-foreground",
        popoverContent: "dark:bg-divider ",
      }}
      isDisabled={isDisabled}
      value={value}
      required={required}
      disabledKeys={disabledKeys}
      className={twMerge(
        clsx("outline-none text-default-foreground select-none", className),
      )}
      variant={variant}
      selectionMode={selectionMode}
      disallowEmptySelection={disallowEmptySelection}
      onChange={(e) => {
        if (onChange) {
          const value = String(e.target.value).trim();
          onChange({
            name: String(e.target.name).trim(),
            value: value !== "" ? value : null,
          });
        }
      }}
      name={name}
      defaultSelectedKeys={
        defaultValues
          ? defaultValues
          : defaultValue
            ? [defaultValue]
            : undefined
      }
    >
      {children}
    </SelectNextUi>
  );
};

export default Select;
