"use client";

import {useState} from "react";
import Input from "./Input";
import Subtitle from "./Subtitle";
import {Validations, validateValue} from "@/hooks/useValidateForm";

import Icon from "@/components/ui/Icon";
import {cn} from "@/libs/utils";
import Tooltip from "@/components/ui/Tooltip";

interface Props {
    type?: string;
    name: string;
    icon?: string;
    className?: string;
    placeholder?: string;
    description?: string;
    onlyInput?: boolean;
    defaultValue?: string;
    tooltip?: { icon: string; content: string | React.ReactNode };
    label?: { value?: string; required?: boolean; className?: string };
    validations?: (nameField: string) => Validations | undefined;
    onChange?: ({
                    name,
                    value,
                }: {
        name: string;
        value: string | number | null;
    }) => any;
}

const InputForm = ({
                       type = "text",
                       name,
                       defaultValue,
                       icon,
                       description,
                       tooltip,
                       className,
                       placeholder,
                       onlyInput,
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

        if (onChange)
            onChange({
                name,
                value: result.value,
            });
        return {name, value: result.value};
    };

    if (onlyInput) {
        return (
            <Input
                type={validations?.validateEmail ? "email" : type}
                name={name}
                icon={icon}
                className={className}
                defaultValue={defaultValue}
                placeholder={placeholder ?? "Ingresar " + name}
                error={error}
                onChange={handleChange}
            />
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
                    className={label?.className}
                />
                {tooltip && (
                    <Tooltip content={tooltip.content}>
                        <Icon className="text-default-400 hover:text-default-foreground transition-all"
                              icon={tooltip.icon}/>
                    </Tooltip>
                )}
            </div>
            <Input
                type={validations?.validateEmail ? "email" : type}
                name={name}
                icon={icon}
                description={description}
                className={className}
                defaultValue={defaultValue}
                placeholder={placeholder ?? "Ingresar " + name}
                error={error}
                onChange={handleChange}
            />
        </div>
    );
};

export default InputForm;
