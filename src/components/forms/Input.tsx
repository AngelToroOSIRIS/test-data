import {Input as InputNextUi} from "@nextui-org/react";
import Icon from "../ui/Icon";
import {twMerge} from "tailwind-merge";
import clsx from "clsx";

interface Props {
    type?: string;
    name?: string;
    icon?: string;
    clearable?: boolean;
    placeholder?: string;
    className?: string;
    variant?: "flat" | "bordered" | "faded" | "underlined";
    defaultValue?: string;
    error?: string;
    onChange?: ({name, value}: { name: string; value: string | null }) => any;
    disabled?: boolean;
    description?: string;
}

const Input = ({
                   className,
                   type = "text",
                   name,
                   icon,
                   clearable = false,
                   placeholder,
                   variant = "faded",
                   defaultValue,
                   error,
                   onChange,
                   disabled,
                   description,
               }: Props) => {
    return (
        <InputNextUi
            isClearable={clearable}
            radius="lg"
            size="md"
            variant={variant}
            classNames={{
                inputWrapper: "py-0 h-[48px] bg-default border-divider",
                errorMessage: "text-sm font-medium",
                input: "bg-default text-base text-default-foreground",
                description: "text-default-700 text-xs"
            }}
            className={twMerge(clsx("mb-[10px] outline-none select-none transition-all", className))}
            startContent={
                icon && <Icon icon={icon} className={error && "text-red"}/>
            }
            isDisabled={disabled}
            isInvalid={!!error}
            errorMessage={error ?? null}
            description={description}
            type={type}
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
            autoComplete={
                name === "password"
                    ? "current-password"
                    : name === "email"
                        ? name
                        : undefined
            }
        />
    );
};

export default Input;
