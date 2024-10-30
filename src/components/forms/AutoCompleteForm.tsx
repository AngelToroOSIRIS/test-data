"use client";

import {useState} from "react";
import {validateValue, Validations} from "@/hooks/useValidateForm";
import Autocomplete from "@/components/forms/Autocomplete";
import {Tooltip} from "@nextui-org/react";
import Icon from "@/components/ui/Icon";
import Subtitle from "@/components/forms/Subtitle";

interface Props {
    name: string;
    placeholder?: string;
    icon?: string;
    items: any[],
    keyObj: string,
    field: string,
    label?: { value?: string; required?: boolean; className?: string, tooltip?: string };
    onChange?: ({
                    name,
                    value,
                }: {
        name: string;
        value: string | number | null;
    }) => any;
    children?: any;
    validations?: (nameField: string) => Validations | undefined;
    required?: boolean;
    customValue?: boolean;
    defaultValue?: string | number;
    variant?: "flat" | "bordered" | "faded" | "underlined";
    onlyInput?: boolean;
    className?: string;
}

export const AutocompleteForm = ({
                                     name,
                                     placeholder,
                                     icon,
                                     customValue = false,
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
        return {name, value: result.value};
    };

    if (onlyInput) {
        return (
            <Autocomplete
                className={className}
                placeholder={placeholder ?? "Seleccionar " + name}
                icon={icon}
                error={error}
                items={items}
                customValue={customValue}
                field={field}
                keyObj={keyObj}
                onChange={handleChange}
                defaultValue={defaultValue}
                required={
                    !!(required ?? validations?.required)
                }
            />
        );
    }

    return (
        <div className="text-start w-full">
            <div className="flex items-center justify-start gap-2">
                <Subtitle
                    text={
                        label?.value ??
                        name[0].toString().toUpperCase() + name.toString().substring(1) + ":"
                    }
                    required={label?.required ?? true}
                    className={label?.className}
                />

                {label?.tooltip && (
                    <Tooltip content={label?.tooltip} className="select-none text-default-foreground" showArrow>
                        <p><Icon icon="info-circle-fill" className="text-warning"/></p>
                    </Tooltip>
                )}
            </div>
            <Autocomplete
                className={className}
                placeholder={placeholder ?? "Seleccionar " + name}
                error={error}
                customValue={customValue}
                items={items}
                field={field}
                keyObj={keyObj}
                onChange={handleChange}
                defaultValue={defaultValue}
                required={
                    !!(required ?? validations?.required)
                }
            />
        </div>
    );
};