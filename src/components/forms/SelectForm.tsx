"use client";

import {useState} from "react";
import Select from "./Select";
import Subtitle from "./Subtitle";
import {Validations, validateValue} from "@/hooks/useValidateForm";
import {cn} from "@/libs/utils";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";

interface Props {
    name: string;
    placeholder?: string;
    isDisabled?: boolean;
    icon?: string;
    label?: { value?: string; required?: boolean; className?: string };
    onChange?: ({
                    name,
                    value,
                }: {
        name: string;
        value: string | number | null;
    }) => any;
    children?: any;
    tooltip?: { icon: string; content: string | React.ReactNode };
    validations?: (nameField: string) => Validations | undefined;
    required?: boolean;
    defaultValue?: string;
    variant?: "flat" | "bordered" | "faded" | "underlined";
    onlySelect?: boolean;
    className?: string;
}

const SelectForm = ({
                        name,
                        placeholder,
                        icon,
                        label,
                        tooltip,
                        isDisabled,
                        onChange,
                        children,
                        validations: getValidators,
                        required,
                        defaultValue,
                        variant,
                        onlySelect = false,
                        className,
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

        if (onChange)
            onChange({
                name,
                value: result.value,
            });
        return {name, value: result.value};
    };

    if (onlySelect) {
        return (
            <Select
                className={className}
                name={name}
                isDisabled={isDisabled}
                placeholder={placeholder ?? "Seleccionar " + name}
                icon={icon}
                variant={variant}
                error={error}
                onChange={handleChange}
                defaultValue={defaultValue}
                disallowEmptySelection={
                    !!(required ?? validations?.required)
                }
            >
                {children}
            </Select>
        );
    }

    return (
        <div className="text-start w-full">
            <div className={cn("", {"flex gap-2": tooltip})}>
                <Subtitle
                    text={
                        label?.value ??
                        name[0].toString().toUpperCase() + name.toString().substring(1) + ":"
                    }
                    required={label?.required ?? true}
                    className={label?.className + cn({"text-default-400": isDisabled})}
                />
                {tooltip && (
                    <Tooltip content={tooltip.content}>
                        <Icon className="text-default-400 hover:text-default-foreground transition-all"
                              icon={tooltip.icon}/>
                    </Tooltip>
                )}
            </div>
            <Select
                className={className}
                name={name}
                isDisabled={isDisabled}
                placeholder={placeholder ?? "Seleccionar " + name}
                icon={icon}
                variant={variant}
                error={error}
                onChange={handleChange}
                defaultValue={defaultValue}
                disallowEmptySelection={
                    !!(required ?? validations?.required)
                }
            >
                {children}
            </Select>
        </div>
    );
};

export default SelectForm;
